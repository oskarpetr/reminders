import { NextApiRequest, NextApiResponse } from "next";
import { sql } from "@vercel/postgres";
import { ref, uploadString } from "firebase/storage";
import { storage } from "@/utils/firebase";

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
        avatar: string;
      } = request.body;

      const emailUser =
        await sql`SELECT COUNT(*) FROM account WHERE email = ${body.email}`;

      if (parseInt(emailUser.rows[0].count) === 1) {
        return response.status(409).json({ error: "Email already in use." });
      }

      const data =
        await sql`INSERT INTO account (name, email, password) VALUES (${body.name}, ${body.email}, ${body.password})`;

      const user =
        await sql`SELECT id FROM account WHERE email = ${body.email}`;

      const storageRef = ref(storage, `avatars/${user.rows[0].id}`);
      await uploadString(storageRef, body.avatar, "data_url");

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
