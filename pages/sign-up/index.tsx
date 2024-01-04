import Headline from "@/components/generic/Headline";
import Icon from "@/components/generic/Icon";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import bcrypt from "bcryptjs-react";

export default function SignIn() {
  const [file, setFile] = useState<File>();
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const signUp = async (e: FormEvent) => {
    e.preventDefault();

    axios.post(`/api/accounts`, {
      name: name,
      email: email,
      password: await bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
    });

    router.push("/sign-in");
  };

  useEffect(() => {
    if (file) {
      getBase64(file);
    }
  }, [file]);

  function getBase64(file: File) {
    var reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      setAvatar(reader.result as string);
    };
  }

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="w-[30rem] bg-white bg-opacity-10 border border-white border-opacity-10 px-16 py-8 rounded-xl">
        <Headline text="Sign up" />

        <form className="flex flex-col gap-8" onSubmit={signUp}>
          <div className="flex items-center gap-4">
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

            <p>{file?.name}</p>
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-bold">Name</p>
            <input
              className="bg-white bg-opacity-10 border border-white border-opacity-10 rounded-xl px-6 py-2 focus:outline-none font-bold text-gray-300"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
            onClick={signUp}
            type="submit"
          >
            Sign up
            <Icon icon="ArrowRight" />
          </button>
        </form>
      </div>
    </div>
  );
}
