import { NextApiRequest, NextApiResponse } from "next";
import { sql } from "@vercel/postgres";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  // log in
  if (request.method === "POST") {
    try {
      const body: {
        email: string;
      } = JSON.parse(request.body);

      // get user
      const user = await sql`SELECT * FROM account where email = ${body.email}`;

      // if user was found
      if (user.rows.length !== 0) {
        return response.status(200).json({ data: user.rows[0] });
      } else {
        return response.status(404).json({ error: "Account was not found" });
      }
    } catch (error) {
      return response.status(500).json({ error });
    }
  }
}
