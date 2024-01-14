import Headline from "@/components/generic/Headline";
import Icon from "@/components/generic/Icon";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

export default function SignIn() {
  // router
  const router = useRouter();

  // fields states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // error states
  const [errorEmail, setErrorEmail] = useState<string | undefined>();
  const [errorPassword, setErrorPassword] = useState<string | undefined>();

  const [loading, setLoading] = useState(false);

  // log in
  const logIn = async (e: FormEvent) => {
    e.preventDefault();

    if (loading) return;

    const emailRegex = new RegExp(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    if (email === "") {
      setErrorEmail("Email cannot be empty.");
      return;
    }

    if (!emailRegex.test(email)) {
      setErrorEmail("Email must be in correct format.");
      return;
    }

    setErrorEmail(undefined);

    if (password === "") {
      setErrorPassword("Password cannot be empty.");
      return;
    }

    setErrorPassword(undefined);

    setLoading(true);

    const signInRes = await signIn("credentials", {
      email: email,
      password: password,
      callbackUrl: "/",
      redirect: false,
    });

    if (signInRes?.ok) {
      router.push(signInRes.url!);
      toast.success("You have been signed in.");
    } else {
      if (signInRes?.status === 401) {
        setErrorPassword("Wrong password.");
      }
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-8 h-screen justify-center items-center">
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

            {errorEmail && (
              <p className="text-red-400 font-bold mt-2">{errorEmail}</p>
            )}
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

            {errorPassword && (
              <p className="text-red-400 font-bold mt-2">{errorPassword}</p>
            )}
          </div>

          <button
            className="py-2 bg-neutral-600 disabled:bg-neutral-700 rounded-xl text-white mt-4 font-bold flex items-center gap-2 justify-center"
            disabled={loading}
            type="submit"
          >
            Sign in
            {loading ? (
              <Icon
                icon="Spinner"
                className="animate-spin text-lg text-white"
              />
            ) : (
              <Icon icon="ArrowRight" className="text-white" />
            )}
          </button>
        </form>
      </div>

      <div className="tracking-wide flex gap-1">
        <p className="opacity-50">Don&apos;t have an account yet?</p>
        <Link href={"/sign-up"} className="font-bold opacity-80">
          Register
        </Link>
      </div>
    </div>
  );
}
