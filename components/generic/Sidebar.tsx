import { Project } from "@/types/Project.types";
import { cn } from "@/utils/cn";
import colorToHex from "@/utils/colors";
import Link from "next/link";
import Icon from "./Icon";
import { useRouter } from "next/router";
import AddProject from "../modals/AddProject";
import { useProjects } from "@/context/ProjectsProvider";
import { useSession } from "next-auth/react";

export default function Sidebar({ project }: { project: Project | undefined }) {
  const { projects } = useProjects();
  const { data: session } = useSession();

  const menu = [
    {
      name: "Home",
      icon: "House",
      link: "/",
    },
    {
      name: "Logout",
      icon: "SignOut",
      link: "/sign-out",
    },
  ];

  const path = useRouter().pathname;

  return (
    <div className="w-[25rem] h-screen bg-white bg-opacity-5 fixed px-10 py-20 flex flex-col border-r border-white border-opacity-10">
      <Link
        href={"/profile"}
        className="flex gap-4 items-center px-6 py-4 bg-white bg-opacity-10 hover:bg-opacity-[15%] transition-all rounded-xl border border-white border-opacity-10"
      >
        <div className="w-12 h-12 bg-neutral-500 rounded-full border border-white border-opacity-10"></div>

        <div>
          <p className="text-lg font-bold">{session?.user?.name}</p>
          <p className="text-gray-400 font-bold mt-[-4px]">
            {session?.user?.email}
          </p>
        </div>
      </Link>

      <div className="flex flex-col gap-4 mt-16">
        <div className="flex gap-2 items-center">
          <p className="font-bold opacity-50">Projects</p>
          <p className="font-bold text-gray-300 bg-white bg-opacity-20 rounded-full px-2 text-sm">
            {projects.length}
          </p>
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

      <div className="flex flex-col gap-4 mt-8">
        <p className="font-bold opacity-50">Dashboard</p>

        <div className="flex flex-col gap-1">
          {menu.map((item) => {
            return (
              <Link
                key={item.name}
                href={item.link}
                className={cn(
                  "px-6 py-3 rounded-xl transition-all flex items-center gap-2",
                  path !== item.link
                    ? "hover:bg-white hover:bg-opacity-5"
                    : "bg-white bg-opacity-20"
                )}
              >
                <Icon icon={item.icon} className="text-xl opacity-80" />
                <p className="font-bold">{item.name}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
