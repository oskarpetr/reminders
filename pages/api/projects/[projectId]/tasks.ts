import { NextApiRequest, NextApiResponse } from "next";
import { sql } from "@vercel/postgres";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { projectId } = request.query;

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
      const taskId = await sql`SELECT id FROM task ORDER BY id DESC LIMIT 1`;

      return response.status(200).json({ data: { taskId: taskId.rows[0].id } });
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
        name: string;
        due: string;
        done: boolean;
      } = request.body;

      console.log(
        `UPDATE task SET name = ${body.name}, due = ${body.due}, done = ${body.done} WHERE id = ${body.id}`
      );
      const data =
        await sql`UPDATE task SET name = ${body.name}, due = ${body.due}, done = ${body.done} WHERE id = ${body.id}`;

      return response.status(200).json({ data: data });
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
