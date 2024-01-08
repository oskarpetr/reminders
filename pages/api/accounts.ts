import { NextApiRequest, NextApiResponse } from "next";
import { sql } from "@vercel/postgres";
import { ref, uploadString } from "firebase/storage";
import { storage } from "@/utils/firebase";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  // create account
  if (request.method === "POST") {
    try {
      const body: {
        name: string;
        email: string;
        password: string;
        avatar: string;
      } = request.body;

      // get email
      const emailInUse =
        await sql`SELECT COUNT(*) FROM account WHERE email = ${body.email}`;

      // if email already exists
      if (parseInt(emailInUse.rows[0].count) === 1) {
        return response.status(409).json({ error: "Email already in use." });
      }

      // create account
      await sql`INSERT INTO account (name, email, password) VALUES (${body.name}, ${body.email}, ${body.password})`;

      // get new user's id
      const getUserId =
        await sql`SELECT id FROM account WHERE email = ${body.email}`;

      // upload avatar
      const storageRef = ref(storage, `avatars/${getUserId.rows[0].id}`);
      await uploadString(storageRef, body.avatar, "data_url");

      return response.status(200).json({});
    } catch (error) {
      return response.status(500).json({ error });
    }
  }
}
