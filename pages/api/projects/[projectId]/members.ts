import { NextApiRequest, NextApiResponse } from "next";
import { sql } from "@vercel/postgres";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { projectId } = request.query;

  if (request.method === "POST") {
    // try {
    //   const body: {
    //     name: string;
    //     due: string;
    //     done: boolean;
    //     project_id: number;
    //   } = request.body;
    //   await sql`INSERT INTO task (name, due, done, project_id) VALUES (${body.name}, ${body.due}, ${body.done}, ${body.project_id});`;
    //   const taskId = await sql`SELECT id FROM task ORDER BY id DESC LIMIT 1`;
    //   return response.status(200).json({ data: { taskId: taskId.rows[0].id } });
    // } catch (error) {
    //   return response.status(500).json({ error });
    // }
  } else if (request.method === "GET") {
    try {
      const data =
        await sql`SELECT account.id, account.name, account.email FROM account
            INNER JOIN member ON member.account_id = account.id
            INNER JOIN project ON project.id = member.project_id
            WHERE project.id = ${projectId?.toString()}`;

      return response.status(200).json({ data: data.rows });
    } catch (error) {
      return response.status(500).json({ error });
    }
  } else if (request.method === "DELETE") {
    // try {
    //   const body: {
    //     id: number;
    //   } = request.body;
    //   const data = await sql`DELETE FROM task WHERE id = ${body.id}`;
    //   return response.status(200).json({ data: data });
    // } catch (error) {
    //   return response.status(500).json({ error });
    // }
  }
}
