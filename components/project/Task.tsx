import { cn } from "@/utils/cn";
import colorToHex from "@/utils/colors";
import { useState } from "react";
import { useProjects } from "@/context/ProjectsProvider";
import EditTask from "../modals/EditTask";
import axios from "axios";
import DeleteTask from "../modals/DeleteTask";

export default function Task({
  id,
  color,
  name,
  due,
  done,
  projectId,
}: {
  id: number;
  color: string;
  name: string;
  due: Date;
  done: boolean;
  projectId: number;
}) {
  const { projects, setProjects } = useProjects();

  const [taskDone, setTaskDone] = useState(done);
  const [taskHover, setTaskHover] = useState<number>();

  const editTask = () => {
    axios.patch(`/api/projects/${projectId}/tasks`, {
      id: id,
      done: !done,
    });

    const projectsCopy = [...projects];
    const projectIndex = projectsCopy.findIndex((p) => p.id === projectId);
    const taskIndex = projectsCopy[projectIndex].tasks.findIndex(
      (task) => task.id === id
    );

    projectsCopy[projectIndex].tasks[taskIndex].done = !done;

    setProjects(projectsCopy);
  };

  return (
    <div
      key={id}
      onMouseEnter={() => setTaskHover(id)}
      onMouseLeave={() => setTaskHover(undefined)}
      className="flex items-center justify-between border-b border-white border-opacity-10"
    >
      <div
        className="py-4 flex gap-4 items-center cursor-pointer select-none"
        onClick={() => {
          editTask();
          setTaskDone((prev) => !prev);
        }}
      >
        <div className="h-5 w-5 rounded-full border border-gray-500 flex justify-center items-center">
          <div
            className={cn(
              "w-4 h-4 bg-white rounded-full transition-all",
              taskDone ? "opacity-100" : "opacity-0"
            )}
            style={{
              background: colorToHex(color),
            }}
          ></div>
        </div>

        <div>
          <p
            className={cn(
              "text-xl font-bold transition-all",
              taskDone ? "text-gray-400" : null
            )}
          >
            {name}
          </p>
          <p className="text-gray-500 font-bold">
            {new Date(due).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="flex gap-4">
        <EditTask
          taskId={id}
          name={name}
          due={due}
          taskHover={taskHover}
          setTaskHover={setTaskHover}
          projectId={projectId}
        />
        <DeleteTask
          taskId={id}
          projectId={projectId}
          name={name}
          taskHover={taskHover}
        />
      </div>
    </div>
  );
}
