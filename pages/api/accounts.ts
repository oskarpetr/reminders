import { NextApiRequest, NextApiResponse } from "next";
import { sql } from "@vercel/postgres";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === "POST") {
    try {
      const body: {
        name: string;
        email: string;
        password: string;
      } = request.body;

      const data =
        await sql`INSERT INTO account (name, email, password) VALUES (${body.name}, ${body.email}, ${body.password})`;

      return response.status(200).json({ data });
    } catch (error) {
      return response.status(500).json({ error });
    }
  } else if (request.method === "GET") {
    // try {
    //   const data = await sql`SELECT * FROM project`;
    //   return response.status(200).json({ data: data.rows });
    // } catch (error) {
    //   return response.status(500).json({ error });
    // }
  }
}
