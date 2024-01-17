import { NextApiRequest, NextApiResponse } from "next";
import { sql } from "@vercel/postgres";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { accountId } = request.query;

  // update account
  if (request.method === "PATCH") {
    try {
      const body: {
        name: string;
      } = request.body;

      // update account
      await sql`UPDATE account SET name = ${
        body.name
      } WHERE id = ${accountId?.toString()}`;

      return response.status(200).json({});
    } catch (error) {
      return response.status(500).json({ error });
    }
  }
}
