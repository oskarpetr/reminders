import Headline from "@/components/generic/Headline";
import Icon from "@/components/generic/Icon";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

export default function SignIn() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const logIn = async (e: FormEvent) => {
    e.preventDefault();

    const signInRes = await signIn("credentials", {
      email: email,
      password: password,
      callbackUrl: "/",
      redirect: false,
    });

    if (signInRes?.ok) {
      router.push(signInRes.url!);
    }
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="w-[30rem] bg-white bg-opacity-10 border border-white border-opacity-10 px-16 py-8 rounded-xl">
        <Headline text="Sign in" />

        <form className="flex flex-col gap-8" onSubmit={logIn}>
          <div className="flex flex-col gap-2">
            <p className="font-bold">Email</p>
            <input
              className="bg-white bg-opacity-10 border border-white border-opacity-10 rounded-xl px-6 py-2 focus:outline-none font-bold text-gray-300"
              placeholder="Enter email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-bold">Password</p>
            <input
              className="bg-white bg-opacity-10 border border-white border-opacity-10 rounded-xl px-6 py-2 focus:outline-none font-bold text-gray-300"
              placeholder="Enter password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            className="py-2 bg-neutral-600 rounded-xl text-white mt-4 font-bold flex items-center gap-2 justify-center"
            type="submit"
          >
            Sign in
            <Icon icon="ArrowRight" />
          </button>
        </form>
      </div>
    </div>
  );
}
