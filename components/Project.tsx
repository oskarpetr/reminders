import Link from "next/link";
import colorToHex from "@/utils/colors";
import ProjectIcon from "./project/ProjectIcon";
import { Project } from "@/types/Project.types";

export default function Project({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.id}`}>
      <div className="py-6 px-8 flex justify-between items-center bg-white bg-opacity-5 rounded-2xl border border-white border-opacity-10">
        <div className="flex gap-4 items-center">
          <ProjectIcon color={colorToHex(project.color)} icon={project.icon} />

          <div className="flex flex-col">
            <p className="text-white font-bold text-xl">{project.name}</p>
            <p className="text-white font-bold text-opacity-50">
              {project.tasks.length} Tasks due
            </p>
          </div>
        </div>

        <div className="flex">
          {project.users.map((user, index) => {
            return (
              <div
                key={user}
                className="w-8 h-8 bg-neutral-700 rounded-full border border-white border-opacity-10"
                style={{
                  marginRight:
                    index !== project.users.length - 1 ? "-10px" : "0px",
                }}
              ></div>
            );
          })}
        </div>
      </div>
    </Link>
  );
}
