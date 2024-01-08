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
        email: string;
      } = request.body;
      const user =
        await sql`SELECT id, name, email FROM account WHERE email = ${body.email}`;

      if (user.rows.length === 0) {
        return response.status(404).json({ error: "Account was not found." });
      }

      await sql`INSERT INTO member (project_id, account_id) VALUES (${projectId?.toString()}, ${
        user.rows[0].id
      });`;

      return response.status(200).json({ data: user.rows[0] });
    } catch (error) {
      return response.status(500).json({ error });
    }
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
    try {
      const body: {
        accountId: number;
      } = request.body;
      console.log(body.accountId);
      console.log(projectId);
      const data =
        await sql`DELETE FROM member WHERE project_id = ${projectId?.toString()} AND account_id = ${
          body.accountId
        }`;
      return response.status(200).json({ data: data });
    } catch (error) {
      return response.status(500).json({ error });
    }
  }
}
