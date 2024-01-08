import { NextApiRequest, NextApiResponse } from "next";
import { sql } from "@vercel/postgres";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { id } = request.query;

  // update account
  if (request.method === "PATCH") {
    try {
      const body: {
        name: string;
        email: string;
      } = request.body;

      // update account
      await sql`UPDATE account SET name = ${body.name}, email = ${
        body.email
      } WHERE id = ${id?.toString()}`;

      return response.status(200);
    } catch (error) {
      return response.status(500).json({ error });
    }
  }
}
