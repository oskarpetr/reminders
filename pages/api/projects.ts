import { NextApiRequest, NextApiResponse } from "next";
import { sql } from "@vercel/postgres";
import { getToken } from "next-auth/jwt";

interface Body {
  name: string;
  icon: string;
  color: string;
}

const secret = process.env.NEXTAUTH_SECRET;

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const token = await getToken({ req: request, secret });

  // create project
  if (request.method === "POST") {
    try {
      const body: Body = request.body;

      // create project
      await sql`INSERT INTO project (name, icon, color) VALUES (${body.name}, ${body.icon}, ${body.color})`;

      // get new project's id
      const getProjectId =
        await sql`SELECT id FROM project ORDER BY id DESC LIMIT 1`;
      const projectId = getProjectId.rows[0].id;

      // create initial member
      await sql`INSERT INTO member (project_id, account_id) VALUES (${projectId}, ${token?.sub})`;

      return response.status(200).json({ data: { projectId } });
    } catch (error) {
      return response.status(500).json({ error });
    }

    // get projects by user
  } else if (request.method === "GET") {
    try {
      // get projects
      const projects =
        await sql`SELECT project.id, project.name, project.icon, project.color FROM project
        INNER JOIN member ON member.project_id = project.id
        INNER JOIN account ON account.id = member.account_id
        WHERE account.email = ${token?.email}`;

      return response.status(200).json({ data: projects.rows });
    } catch (error) {
      return response.status(500).json({ error });
    }
  }
}
