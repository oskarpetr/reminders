import Headline from "@/components/generic/Headline";
import Icon from "@/components/generic/Icon";
import Layout from "@/components/generic/Layout";
import { getAvatar } from "@/utils/avatar";
import { fetchUpdateProfile } from "@/utils/fetchers";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

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

  // query
  const updateProfileQuery = useQuery({
    queryKey: ["update-profile"],
    queryFn: () =>
      fetchUpdateProfile({
        name: name!,
        id: parseInt(session?.user?.id as string),
      }),
    enabled: false,
  });

  // query
  const updateAvatarQuery = useQuery({
    queryKey: ["update-avatar"],
    queryFn: () =>
      fetchUpdateProfile({
        name: name!,
        id: parseInt(session?.user?.id as string),
      }),
    enabled: false,
  });

  // edit profile
  const editProfile = async () => {
    if (updateProfileQuery.isLoading) return;

    if (name === "") {
      setErrorName("Name cannot be empty.");
      return;
    }

    setErrorName(undefined);

    const res = await updateProfileQuery.refetch();

    if (res.isError) {
      toast.error("An error has occured.");
      return;
    }

    toast.success("Your account has been updated.");
  };

  // convert file to base 64 string
  useEffect(() => {
    if (file) getBase64(file);
  }, [file]);

  // change avatar
  useEffect(() => {
    async function updateAvatar() {
      if (updateAvatarQuery.isLoading) return;

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

      const res = await updateAvatarQuery.refetch();

      if (res.isError) {
        toast.error("An error has occured.");
        return;
      }

      toast.success("Your avatar has been updated.");
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
                  className="px-6 py-2 disabled:bg-neutral-200 rounded-xl flex items-center gap-2 justify-center bg-white text-black font-semibold cursor-pointer"
                  disabled={updateAvatarQuery.isLoading}
                  onClick={() => avatarRef.current?.click()}
                >
                  Upload avatar
                  {updateAvatarQuery.isLoading && (
                    <Icon
                      icon="Spinner"
                      className="animate-spin text-lg text-black"
                    />
                  )}
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
              className="px-6 py-2 disabled:bg-neutral-200 flex items-center gap-2 justify-center w-full rounded-xl bg-white text-black font-semibold mt-4"
              disabled={updateProfileQuery.isLoading}
              onClick={editProfile}
            >
              Save changes
              {updateProfileQuery.isLoading && (
                <Icon
                  icon="Spinner"
                  className="animate-spin text-lg text-black"
                />
              )}
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
