import Headline from "@/components/generic/Headline";
import Icon from "@/components/generic/Icon";
import { useState } from "react";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const signIn = () => {};

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="w-[30rem] bg-white bg-opacity-10 border border-white border-opacity-10 px-16 py-8 rounded-xl">
        <Headline text="Sign in" />

        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <p className="font-bold ">Username</p>
            <input
              className="bg-white bg-opacity-10 border border-white border-opacity-10 rounded-xl px-6 py-2 focus:outline-none font-bold text-gray-300"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-4">
            <p className="font-bold ">Password</p>
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
            onClick={signIn}
            type="submit"
          >
            Sign in
            <Icon icon="ArrowRight" />
          </button>
        </div>
      </div>
    </div>
  );
}
