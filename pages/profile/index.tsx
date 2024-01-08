import Headline from "@/components/generic/Headline";
import Layout from "@/components/generic/Layout";
import { getUserId } from "@/utils/avatar";
import axios from "axios";
import { getCsrfToken, useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Profile() {
  const { data: session, update } = useSession();

  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [file, setFile] = useState<File>();
  const [avatar, setAvatar] = useState<string>();

  const [errorName, setErrorName] = useState<string | undefined>();
  const [errorEmail, setErrorEmail] = useState<string | undefined>();

  const avatarRef = useRef<HTMLInputElement>(null);

  const editProfile = async () => {
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

    if (!emailRegex.test(email!)) {
      setErrorEmail("Email must be in correct format.");
      return;
    }

    setErrorEmail(undefined);

    await axios.patch(
      `/api/accounts/${getUserId(session?.user?.image!)}/general`,
      {
        name: name,
        email: email,
      }
    );
  };

  useEffect(() => {
    if (file) {
      getBase64(file);
    }
  }, [file]);

  useEffect(() => {
    if (avatar) {
      axios.patch(`/api/accounts/${getUserId(session?.user?.image!)}/avatar`, {
        avatar: avatar,
      });
    }
  }, [avatar]);

  function getBase64(file: File) {
    var reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      setAvatar(reader.result as string);
    };
  }

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name!);
      setEmail(session.user.email!);
    }
  }, [session?.user]);

  return (
    <Layout project={undefined}>
      <Headline text="Profile" />

      {session?.user && (
        <div className="flex flex-col gap-8 w-[30rem]">
          <div className="flex items-center gap-8">
            <Image
              src={session?.user?.image!}
              alt="Avatar"
              height={96}
              width={96}
              className="rounded-full"
            />

            <div className="flex flex-col gap-2">
              <p className="font-bold">Avatar image</p>
              <button
                className="px-6 py-2 rounded-xl bg-white text-black font-semibold cursor-pointer"
                onClick={() => avatarRef.current?.click()}
              >
                Upload avatar
              </button>

              <input
                ref={avatarRef}
                onChange={(e) => {
                  if (e.target.files) {
                    setFile(e.target.files[0]);
                  }
                }}
                type="file"
                className="px-6 py-2 rounded-xl bg-white text-black font-semibold opacity-0 absolute"
              />
            </div>
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {errorEmail && (
              <p className="text-red-400 font-bold mt-2">{errorEmail}</p>
            )}
          </div>

          <button
            className="px-6 py-2 rounded-xl bg-white text-black font-semibold mt-4"
            onClick={editProfile}
          >
            Save changes
          </button>
        </div>
      )}
    </Layout>
  );
}
