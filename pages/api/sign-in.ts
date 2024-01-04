import { NextApiRequest, NextApiResponse } from "next";
import { sql } from "@vercel/postgres";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === "POST") {
    try {
      const body: {
        email: string;
      } = JSON.parse(request.body);

      const data = await sql`SELECT * FROM account where email = ${body.email}`;

      if (data.rows.length !== 0) {
        return response.status(200).json({ data: data.rows[0] });
      } else {
        return response.status(404).json({ error: "Account was not found" });
      }
    } catch (error) {
      return response.status(500).json({ error });
    }
  }
}
