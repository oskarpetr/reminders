import { Project } from "@/types/Project.types";
import { cn } from "@/utils/cn";
import colorToHex from "@/utils/colors";
import Link from "next/link";
import Icon from "./Icon";
import { useRouter } from "next/router";
import AddProject from "../modals/AddProject";
import { useProjects } from "@/context/ProjectsProvider";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { getAvatar } from "@/utils/avatar";

export default function Sidebar({ project }: { project: Project | undefined }) {
  // projects context
  const { projects } = useProjects();

  // session context
  const { data: session } = useSession();

  // menu
  const menu = [
    {
      name: "Home",
      icon: "House",
      action: "/",
    },
    {
      name: "Profile",
      icon: "User",
      action: "/profile",
    },
    {
      name: "Logout",
      icon: "SignOut",
      action: () => signOut(),
    },
  ];

  // sidebar path
  const path = useRouter().pathname;

  // user id
  const userId = session?.user?.id;

  return (
    <div className="w-[25rem] h-screen bg-white bg-opacity-5 fixed px-10 py-20 flex flex-col border-r border-white border-opacity-10">
      <Link
        href={"/profile"}
        className="flex gap-4 items-center px-6 py-4 bg-white bg-opacity-10 hover:bg-opacity-[15%] transition-all rounded-xl border border-white border-opacity-10"
      >
        <Image
          src={getAvatar(parseInt(userId as string))}
          alt="Avatar"
          className="h-12 w-12 rounded-full border border-white border-opacity-10"
          width={48}
          height={48}
          style={{ objectFit: "cover" }}
        />

        <div>
          <p className="text-lg font-bold">{session?.user?.name}</p>
          <p className="text-gray-400 font-bold mt-[-4px]">
            {session?.user?.email}
          </p>
        </div>
      </Link>

      <div className="flex flex-col gap-4 mt-16">
        <div className="flex items-center gap-4">
          <p className="font-bold opacity-50">Dashboard</p>
          <div className="border-white border-b border-opacity-10 w-full"></div>
        </div>

        <div className="flex flex-col gap-1">
          {menu.map((item) => {
            if (typeof item.action === "string") {
              return (
                <Link
                  key={item.name}
                  href={item.action}
                  className={cn(
                    "px-6 py-3 rounded-xl transition-all flex items-center gap-2",
                    path !== item.action
                      ? "hover:bg-white hover:bg-opacity-5"
                      : "bg-white bg-opacity-20"
                  )}
                >
                  <Icon icon={item.icon} className="text-xl opacity-80" />
                  <p className="font-bold">{item.name}</p>
                </Link>
              );
            } else if (typeof item.action === "function") {
              return (
                <button
                  key={item.name}
                  onClick={item.action}
                  className="px-6 py-3 rounded-xl transition-all flex items-center gap-2 hover:bg-white hover:bg-opacity-5"
                >
                  <Icon icon={item.icon} className="text-xl opacity-80" />
                  <p className="font-bold">{item.name}</p>
                </button>
              );
            }
          })}
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-8">
        <div className="flex gap-4 items-center">
          <div className="flex gap-2 items-center">
            <p className="font-bold opacity-50">Projects</p>
            <p className="font-bold text-gray-300 bg-white bg-opacity-20 rounded-full px-2 text-sm">
              {projects.length}
            </p>
          </div>

          <div className="border-white border-b border-opacity-10 w-full"></div>
        </div>

        <div className="flex flex-col gap-1">
          {projects.map((proj) => {
            return (
              <Link
                key={proj.id}
                href={`/projects/${proj.id}`}
                className={cn(
                  "px-6 py-3 rounded-xl transition-all flex items-center gap-2",
                  project?.id !== proj.id
                    ? "hover:bg-white hover:bg-opacity-5"
                    : null
                )}
                style={
                  project?.id === proj.id
                    ? { backgroundColor: colorToHex(proj.color) }
                    : {}
                }
              >
                <Icon icon={proj!.icon} className="text-xl opacity-80" />
                <p className="font-bold">{proj.name}</p>
              </Link>
            );
          })}

          <AddProject />
        </div>
      </div>
    </div>
  );
}
