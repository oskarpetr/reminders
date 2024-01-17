import { NextApiRequest, NextApiResponse } from "next";
import { ref, uploadString } from "firebase/storage";
import { storage } from "@/utils/firebase";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { accountId } = request.query;

  // update avatar
  if (request.method === "PATCH") {
    try {
      const body: {
        avatar: string;
      } = request.body;

      // upload avatar
      const storageRef = ref(storage, `avatars/${accountId}`);
      await uploadString(storageRef, body.avatar, "data_url");

      return response.status(200).json({});
    } catch (error) {
      return response.status(500).json({ error });
    }
  }
}
