import Link from "next/link";
import ProjectIcon from "./ProjectIcon";
import { Project } from "@/types/Project.types";
import MemberList from "./MemberList";

export default function Project({ project }: { project: Project }) {
  const tasksDue = project.tasks.filter((task) => !task.done);

  return (
    <Link href={`/projects/${project.id}`}>
      <div className="py-5 px-8 flex justify-between items-center bg-white hover:bg-opacity-[7%] bg-opacity-5 transition-all rounded-2xl border-[0.5px] border-white border-opacity-10">
        <div className="flex gap-4 items-center">
          <ProjectIcon color={project.color} icon={project.icon} />

          <div className="flex flex-col">
            <p className="text-white font-bold text-xl">{project.name}</p>
            {tasksDue.length > 0 ? (
              <p className="text-white font-bold text-opacity-50">
                {tasksDue.length} {tasksDue.length === 1 ? "Task" : "Tasks"} due
              </p>
            ) : (
              <p className="text-white font-bold text-opacity-50">
                No tasks due
              </p>
            )}
          </div>
        </div>

        <MemberList members={project.members} />
      </div>
    </Link>
  );
}
