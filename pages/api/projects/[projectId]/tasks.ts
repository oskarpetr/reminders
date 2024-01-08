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

  if (request.method === "POST") {
    try {
      const body: {
        name: string;
        due: string;
        done: boolean;
      } = request.body;

      await sql`INSERT INTO task (name, due, done, project_id) VALUES (${
        body.name
      }, ${body.due}, ${body.done}, ${projectId?.toString()});`;
      const taskData = await sql`SELECT id FROM task ORDER BY id DESC LIMIT 1`;
      const taskId = taskData.rows[0].id;

      await sql`INSERT INTO log (account_id, project_id, task_id, action) VALUES (${
        token?.sub
      }, ${projectId?.toString()}, ${taskId}, 'TASK-CREATED')`;

      return response.status(200).json({ data: { taskId: taskId } });
    } catch (error) {
      return response.status(500).json({ error });
    }
  } else if (request.method === "GET") {
    try {
      const data =
        await sql`SELECT task.id, task.name, task.due, task.done FROM task INNER JOIN project ON project.id = task.project_id WHERE task.project_id = ${projectId?.toString()}`;

      return response.status(200).json({ data: data.rows });
    } catch (error) {
      return response.status(500).json({ error });
    }
  } else if (request.method === "PATCH") {
    try {
      const body: {
        id: number;
        name?: string;
        due?: string;
        done?: boolean;
      } = request.body;

      if (body.done !== undefined) {
        await sql`UPDATE task SET done = ${body.done} WHERE id = ${body.id}`;

        const completedText = body.done ? "TASK-COMPLETED" : "TASK-UNCOMPLETED";
        await sql`INSERT INTO log (account_id, project_id, task_id, action) VALUES (${
          token?.sub
        }, ${projectId?.toString()}, ${body.id}, ${completedText})`;
      }

      if (body.name !== undefined) {
        await sql`UPDATE task SET name = ${body.name} WHERE id = ${body.id}`;
        console.log("renamed");
        await sql`INSERT INTO log (account_id, project_id, task_id, action) VALUES (${
          token?.sub
        }, ${projectId?.toString()}, ${body.id}, 'TASK-RENAMED')`;
      }

      if (body.due !== undefined) {
        await sql`UPDATE task SET due = ${body.due} WHERE id = ${body.id}`;
        await sql`INSERT INTO log (account_id, project_id, task_id, action) VALUES (${
          token?.sub
        }, ${projectId?.toString()}, ${body.id}, 'TASK-DUE')`;
      }

      return response.status(200);
    } catch (error) {
      return response.status(500).json({ error });
    }
  } else if (request.method === "DELETE") {
    try {
      const body: {
        id: number;
      } = request.body;
      const data = await sql`DELETE FROM task WHERE id = ${body.id}`;

      return response.status(200).json({ data: data });
    } catch (error) {
      return response.status(500).json({ error });
    }
  }
}
