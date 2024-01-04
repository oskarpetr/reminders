import { NextApiRequest, NextApiResponse } from "next";
import { sql } from "@vercel/postgres";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { projectId } = request.query;

  if (request.method === "GET") {
    try {
      const project =
        await sql`SELECT * FROM project WHERE project.id = ${projectId?.toString()}`;

      const tasks =
        await sql`SELECT task.id, task.name, task.due, task.done FROM task INNER JOIN project ON project.id = task.project_id WHERE task.project_id = ${projectId?.toString()}`;

      const members =
        await sql`SELECT account.id, account.name, account.email FROM account
            INNER JOIN member ON member.account_id = account.id
            INNER JOIN project ON project.id = member.project_id
            WHERE project.id = ${projectId?.toString()}`;

      return response.status(200).json({
        data: { ...project.rows[0], tasks: tasks.rows, members: members.rows },
      });
    } catch (error) {
      return response.status(500).json({ error });
    }
  }
}
