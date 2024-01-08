import Headline from "@/components/generic/Headline";
import Icon from "@/components/generic/Icon";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import bcrypt from "bcryptjs-react";
import Link from "next/link";

export default function SignIn() {
  // fields states
  const [file, setFile] = useState<File>();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");

  // error states
  const [errorName, setErrorName] = useState<string | undefined>();
  const [errorEmail, setErrorEmail] = useState<string | undefined>();
  const [errorPassword, setErrorPassword] = useState<string | undefined>();
  const [errorFile, setErrorFile] = useState<string | undefined>();

  // router
  const router = useRouter();

  // register
  const register = async (e: FormEvent) => {
    e.preventDefault();

    if (file === undefined) {
      setErrorFile("Select an avatar.");
      return;
    }

    setErrorFile(undefined);

    if (name === "") {
      setErrorName("Name cannot be empty.");
      return;
    }

    setErrorName(undefined);

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

    const encryptedPassword = await bcrypt.hashSync(
      password,
      bcrypt.genSaltSync(10)
    );

    try {
      await axios.post(`/api/accounts`, {
        name: name,
        email: email,
        password: encryptedPassword,
        avatar: avatar,
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 409) {
        setErrorEmail("Email already in use.");
        return;
      }
    }

    router.push("/sign-in");
  };

  // convert file to base 64 string
  useEffect(() => {
    if (file) getBase64(file);
  }, [file]);

  // file to base 64 string
  function getBase64(file: File) {
    var reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      setAvatar(reader.result as string);
    };
  }

  return (
    <div className="flex flex-col gap-8 h-screen justify-center items-center">
      <div className="w-[30rem] bg-white bg-opacity-10 border border-white border-opacity-10 px-16 py-8 rounded-xl">
        <Headline text="Sign up" />

        <form className="flex flex-col gap-8" onSubmit={register}>
          <div className="flex flex-col gap-2">
            <p className="font-bold">Avatar</p>

            <div className="flex items-center gap-6">
              <div className="relative">
                <input
                  className="bg-white cursor-pointer bg-opacity-10 border border-white border-opacity-10 rounded-full w-20 h-20 focus:outline-none font-bold text-gray-300"
                  placeholder="Choose file"
                  type="file"
                  accept=".png,.jpg,.jpeg"
                  onChange={(e) => {
                    if (e.target.files) {
                      setFile(e.target.files[0]);
                    }
                  }}
                />
                <Icon
                  icon={file ? "Check" : "Camera"}
                  className="absolute text-2xl top-7 left-7 pointer-events-none"
                />
              </div>

              {file && (
                <div>
                  <p className="font-bold">Selected avatar</p>
                  <p className="opacity-50">{file?.name}</p>
                </div>
              )}
            </div>

            {errorFile && (
              <p className="text-red-400 font-bold mt-2">{errorFile}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-bold">Name</p>
            <input
              className="bg-white bg-opacity-10 border border-white border-opacity-10 rounded-xl px-6 py-2 focus:outline-none font-bold text-gray-300"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            {errorName && (
              <p className="text-red-400 font-bold mt-2">{errorName}</p>
            )}
          </div>

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
            className="py-2 bg-neutral-600 rounded-xl text-white mt-4 font-bold flex items-center gap-2 justify-center"
            type="submit"
          >
            Sign up
            <Icon icon="ArrowRight" />
          </button>
        </form>
      </div>

      <div className="tracking-wide flex gap-1">
        <p className="opacity-50">Already have an account?</p>
        <Link href={"/sign-in"} className="font-bold opacity-80">
          Log in
        </Link>
      </div>
    </div>
  );
}
