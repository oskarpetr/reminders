import Headline from "@/components/generic/Headline";
import Layout from "@/components/generic/Layout";
import { getAvatar } from "@/utils/avatar";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Profile() {
  // session context
  const { data: session } = useSession();

  // fields states
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [file, setFile] = useState<File>();
  const [avatar, setAvatar] = useState<string>();

  // error states
  const [errorName, setErrorName] = useState<string | undefined>();
  const [errorFile, setErrorFile] = useState<string | undefined>();

  // avatar ref
  const avatarRef = useRef<HTMLInputElement>(null);

  // edit profile
  const editProfile = async () => {
    if (name === "") {
      setErrorName("Name cannot be empty.");
      return;
    }

    setErrorName(undefined);

    await axios.patch(
      `/api/accounts/${parseInt(session?.user?.id as string)}/general`,
      { name: name }
    );
  };

  // convert file to base 64 string
  useEffect(() => {
    if (file) getBase64(file);
  }, [file]);

  // change avatar
  useEffect(() => {
    async function updateAvatar() {
      if (file === undefined) {
        setErrorFile("Select an avatar.");
        return;
      }

      if (file.size / 1000000 > 1) {
        setErrorFile("Avatar size must be smaller than 1MB.");
        setAvatar(undefined);
        return;
      }

      setErrorFile(undefined);

      await axios.patch(
        `/api/accounts/${parseInt(session?.user?.id as string)}/avatar`,
        { avatar: avatar }
      );
    }

    if (avatar) {
      updateAvatar();
    }
  }, [avatar]);

  // file to base 64 string
  function getBase64(file: File) {
    var reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      setAvatar(reader.result as string);
    };
  }

  // set new name and email
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
          <div>
            <div className="flex items-center gap-8">
              <Image
                src={avatar ? avatar : session?.user?.image!}
                alt="Avatar"
                height={96}
                width={96}
                className="rounded-full w-24 h-24 border border-white border-opacity-10"
                style={{ objectFit: "cover" }}
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
              className="bg-white bg-opacity-10 disabled:opacity-50 disabled:cursor-not-allowed border border-white border-opacity-10 rounded-xl px-6 py-2 focus:outline-none font-bold text-gray-300"
              placeholder="Enter email"
              disabled
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-4 text-center">
            <button
              className="px-6 py-2 w-full rounded-xl bg-white text-black font-semibold mt-4"
              onClick={editProfile}
            >
              Save changes
            </button>
            <p className="opacity-50 font-bold">
              Account changes will take place after loggin back in.
            </p>
          </div>
        </div>
      )}
    </Layout>
  );
}
