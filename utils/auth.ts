import axios from "axios";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs-react";
import { NextAuthOptions } from "next-auth";
import { getAvatar } from "./avatar";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials || !credentials?.email || !credentials.password)
            return null;

          const devUrl = "http://localhost:3000/api/sign-in";
          const prodUrl = "https://reminders.oskarpetr.dev/api/sign-in";
          const req = await fetch(
            process.env.NODE_ENV === "development" ? devUrl : prodUrl,
            {
              method: "POST",
              body: JSON.stringify({ email: credentials.email }),
            }
          );

          const res = await req.json();
          const user = res.data;

          if (req.status !== 200 || !user) return null;

          const passwordMatch = bcrypt.compareSync(
            credentials.password,
            user.password
          );

          if (!passwordMatch) return null;

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: getAvatar(user.id),
          };
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
  },
};

export default NextAuth(authOptions);
