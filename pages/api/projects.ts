import { NextApiRequest, NextApiResponse } from "next";
import { sql } from "@vercel/postgres";

interface Body {
  name: string;
  icon: string;
  color: string;
}

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === "POST") {
    try {
      const body: Body = request.body;

      await sql`INSERT INTO project (name, icon, color) VALUES (${body.name}, ${body.icon}, ${body.color})`;
      const projectId =
        await sql`SELECT id FROM project ORDER BY id DESC LIMIT 1`;

      return response
        .status(200)
        .json({ data: { projectId: projectId.rows[0].id } });
    } catch (error) {
      return response.status(500).json({ error });
    }
  } else if (request.method === "GET") {
    try {
      const data = await sql`SELECT * FROM project`;

      return response.status(200).json({ data: data.rows });
    } catch (error) {
      return response.status(500).json({ error });
    }
  }
}
