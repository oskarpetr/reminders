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

      {/* <div
          className="p-3 border border-gray-500 absolute bottom-10 right-10 bg-white bg-opacity-5 rounded-full hover:bg-opacity-10 transition-all"
          onClick={() => console.log("JA MILUJU KUNG PAO.")}
        >
          <Icon
            icon="PawPrint"
            className="w-8 h-8  cursor-pointer select-none"
          />
        </div> */}
    </div>
  );
}
