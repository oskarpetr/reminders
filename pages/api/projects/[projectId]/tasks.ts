import { NextApiRequest, NextApiResponse } from "next";
import { sql } from "@vercel/postgres";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { projectId } = request.query;
  const token = await getToken({ req: request, secret });

  // create task
  if (request.method === "POST") {
    try {
      const body: {
        name: string;
        due: string;
        done: boolean;
      } = request.body;

      // create task
      await sql`INSERT INTO task (name, due, done, project_id) VALUES (${
        body.name
      }, ${body.done}, ${projectId?.toString()});`;

      // get new task's id
      const getTaskId = await sql`SELECT id FROM task ORDER BY id DESC LIMIT 1`;
      const taskId = getTaskId.rows[0].id;

      // create log
      await sql`INSERT INTO log (account_id, project_id, task_id, action) VALUES (${
        token?.sub
      }, ${projectId?.toString()}, ${taskId}, 'TASK-CREATED')`;

      return response.status(200).json({ data: { taskId } });
    } catch (error) {
      return response.status(500).json({ error });
    }

    // get tasks by project id
  } else if (request.method === "GET") {
    try {
      // get tasks
      const tasks =
        await sql`SELECT task.id, task.name, task.due, task.done FROM task INNER JOIN project ON project.id = task.project_id WHERE task.project_id = ${projectId?.toString()}`;

      return response.status(200).json({ data: tasks.rows });
    } catch (error) {
      return response.status(500).json({ error });
    }

    // update task
  } else if (request.method === "PATCH") {
    try {
      const body: {
        id: number;
        name?: string;
        due?: string;
        done?: boolean;
      } = request.body;

      // if done property exists
      if (body.done !== undefined) {
        // update task's done
        await sql`UPDATE task SET done = ${body.done} WHERE id = ${body.id}`;

        // create log
        const completedText = body.done ? "TASK-COMPLETED" : "TASK-UNCOMPLETED";
        await sql`INSERT INTO log (account_id, project_id, task_id, action) VALUES (${
          token?.sub
        }, ${projectId?.toString()}, ${body.id}, ${completedText})`;
      }

      // if name property exists
      if (body.name !== undefined) {
        // update task's name
        await sql`UPDATE task SET name = ${body.name} WHERE id = ${body.id}`;

        // create log
        await sql`INSERT INTO log (account_id, project_id, task_id, action) VALUES (${
          token?.sub
        }, ${projectId?.toString()}, ${body.id}, 'TASK-RENAMED')`;
      }

      // if due property exists
      if (body.due !== undefined) {
        // update task's due
        await sql`UPDATE task SET due = ${body.due} WHERE id = ${body.id}`;

        // create log
        await sql`INSERT INTO log (account_id, project_id, task_id, action) VALUES (${
          token?.sub
        }, ${projectId?.toString()}, ${body.id}, 'TASK-DUE')`;
      }

      return response.status(200).json({});
    } catch (error) {
      return response.status(500).json({ error });
    }

    // delete task
  } else if (request.method === "DELETE") {
    try {
      const body: {
        id: number;
      } = request.body;

      // delete logs
      await sql`DELETE FROM log WHERE task_id = ${body.id}`;

      // delete task
      await sql`DELETE FROM task WHERE id = ${body.id}`;

      return response.status(200).json({});
    } catch (error) {
      return response.status(500).json({ error });
    }
  }
}
