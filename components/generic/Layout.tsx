import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import { Project } from "@/types/Project.types";
import ProjectsProvider from "@/context/ProjectsProvider";

export default function Layout({
  children,
  project,
}: {
  children: ReactNode;
  project: Project | undefined;
}) {
  return (
    <div className="flex">
      <Sidebar project={project} />

      <div className="px-20 py-20 ml-[25rem] w-[calc(100%-25rem)]">
        {children}
      </div>
    </div>
  );
}
