import { NextApiRequest, NextApiResponse } from "next";
import { sql } from "@vercel/postgres";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { projectId } = request.query;

  // get project
  if (request.method === "GET") {
    try {
      // get project
      const project =
        await sql`SELECT * FROM project WHERE project.id = ${projectId?.toString()}`;

      // get tasks
      const tasks =
        await sql`SELECT task.id, task.name, task.due, task.done FROM task INNER JOIN project ON project.id = task.project_id WHERE task.project_id = ${projectId?.toString()}`;

      // get members
      const members =
        await sql`SELECT account.id, account.name, account.email FROM account
            INNER JOIN member ON member.account_id = account.id
            INNER JOIN project ON project.id = member.project_id
            WHERE project.id = ${projectId?.toString()}`;

      // get logs
      const logs =
        await sql`SELECT log.action, task.name as task, account.name as account, log.date, log.account_id as account_id FROM log
            INNER JOIN project ON project.id = log.project_id
            INNER JOIN task ON task.id = log.task_id
            INNER JOIN account ON account.id = log.account_id
            WHERE log.project_id = ${projectId?.toString()}`;

      return response.status(200).json({
        data: {
          ...project.rows[0],
          tasks: tasks.rows,
          members: members.rows,
          logs: logs.rows,
        },
      });
    } catch (error) {
      return response.status(500).json({ error });
    }

    // update project
  } else if (request.method === "PATCH") {
    try {
      const body: {
        name: string;
        color: string;
        icon: boolean;
      } = request.body;

      // update project
      await sql`UPDATE project SET name = ${body.name}, color = ${
        body.color
      }, icon = ${body.icon} WHERE id = ${projectId?.toString()}`;

      return response.status(200).json({});
    } catch (error) {
      return response.status(500).json({ error });
    }

    // delete project
  } else if (request.method === "DELETE") {
    try {
      // delete logs
      await sql`DELETE FROM log WHERE project_id = ${projectId?.toString()}`;

      // delete tasks
      await sql`DELETE FROM task WHERE project_id = ${projectId?.toString()}`;

      // delete members
      await sql`DELETE FROM member WHERE project_id = ${projectId?.toString()}`;

      // delete project
      await sql`DELETE FROM project WHERE id = ${projectId?.toString()}`;

      return response.status(200).json({});
    } catch (error) {
      return response.status(500).json({ error });
    }
  }
}
