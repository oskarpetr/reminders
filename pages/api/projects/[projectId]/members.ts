import { NextApiRequest, NextApiResponse } from "next";
import { sql } from "@vercel/postgres";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { projectId } = request.query;

  // create member
  if (request.method === "POST") {
    try {
      const body: {
        email: string;
      } = request.body;

      // get user
      const user =
        await sql`SELECT id, name, email FROM account WHERE email = ${body.email}`;

      // check if member exists
      if (user.rows.length === 0) {
        return response.status(404).json({ error: "Account was not found." });
      }

      // create member
      await sql`INSERT INTO member (project_id, account_id) VALUES (${projectId?.toString()}, ${
        user.rows[0].id
      });`;

      return response.status(200).json({ data: user.rows[0] });
    } catch (error) {
      return response.status(500).json({ error });
    }

    // get members by project id
  } else if (request.method === "GET") {
    try {
      // get members
      const data =
        await sql`SELECT account.id, account.name, account.email FROM account
            INNER JOIN member ON member.account_id = account.id
            INNER JOIN project ON project.id = member.project_id
            WHERE project.id = ${projectId?.toString()}`;

      return response.status(200).json({ data: data.rows });
    } catch (error) {
      return response.status(500).json({ error });
    }

    // delete member
  } else if (request.method === "DELETE") {
    try {
      const body: {
        accountId: number;
      } = request.body;

      // delete member
      await sql`DELETE FROM member WHERE project_id = ${projectId?.toString()} AND account_id = ${
        body.accountId
      }`;

      return response.status(200).json({});
    } catch (error) {
      return response.status(500).json({ error });
    }
  }
}
