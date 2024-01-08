import Link from "next/link";
import ProjectIcon from "./ProjectIcon";
import { Project } from "@/types/Project.types";

export default function Project({ project }: { project: Project }) {
  const tasksDue = project.tasks.filter((task) => !task.done);

  return (
    <Link href={`/projects/${project.id}`}>
      <div className="py-5 px-8 flex justify-between items-center bg-white bg-opacity-5 rounded-2xl border border-white border-opacity-10">
        <div className="flex gap-4 items-center">
          <ProjectIcon color={project.color} icon={project.icon} />

          <div className="flex flex-col">
            <p className="text-white font-bold text-xl">{project.name}</p>
            {project.tasks.length > 0 ? (
              <p className="text-white font-bold text-opacity-50">
                {tasksDue.length} {tasksDue.length === 1 ? "Task" : "Tasks"} due
              </p>
            ) : (
              <p className="text-white font-bold text-opacity-50">No tasks</p>
            )}
          </div>
        </div>

        {/* <div className="flex">
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
        </div> */}
      </div>
    </Link>
  );
}
