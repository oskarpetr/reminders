import { cn } from "@/utils/cn";
import colorToHex from "@/utils/colors";
import { useState } from "react";
import Icon from "../generic/Icon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useProjects } from "@/context/ProjectsProvider";
import EditTask from "../modals/EditTask";
import axios from "axios";
import sqlDate from "@/utils/date";

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

  const editTask = ({
    newDone,
    newDue,
    newName,
  }: {
    newDone?: boolean;
    newDue?: Date;
    newName?: string;
  }) => {
    axios.patch(`/api/projects/${projectId}/tasks`, {
      id: id,
      name: newName ?? name,
      due: sqlDate(newDue ?? due),
      done: newDone ?? done,
    });

    const projectsCopy = [...projects];
    const projectIndex = projectsCopy.findIndex((p) => p.id === projectId);
    const taskIndex = projectsCopy[projectIndex].tasks.findIndex(
      (task) => task.id === id
    );

    if (newDone) {
      projectsCopy[projectIndex].tasks[taskIndex].done = newDone;
    }

    if (newDue) {
      projectsCopy[projectIndex].tasks[taskIndex].due = newDue;
    }

    if (newName) {
      projectsCopy[projectIndex].tasks[taskIndex].name = newName;
    }

    setProjects(projectsCopy);
  };

  const deleteTask = async () => {
    await axios.delete(`/api/projects/${projectId}/tasks`, {
      data: { id: id },
    });

    const projectsCopy = [...projects];
    const projectIndex = projectsCopy.findIndex((p) => p.id === projectId);
    const taskIndex = projectsCopy[projectIndex].tasks.findIndex(
      (task) => task.id === id
    );

    projectsCopy[projectIndex].tasks.splice(taskIndex, 1);

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
          editTask({ newDone: !done });
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
            {new Date(due).toLocaleDateString("en-US")}
          </p>
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <Icon
            icon="DotsThree"
            className={cn(
              "opacity-50 w-5 h-5 cursor-pointer transition-all focus:outline-none outline-none",
              id === taskHover ? "opacity-100" : "opacity-0"
            )}
          />
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56 bg-transparent border-none p-0 absolute right-[-1rem]">
          <div className="bg-neutral-800 border border-gray-700 rounded-xl">
            <DropdownMenuGroup>
              <DropdownMenuItem className="p-0">
                <EditTask taskId={id} name={name} due={due} />
              </DropdownMenuItem>

              <div className="border-b border-gray-700"></div>

              <DropdownMenuItem
                className="flex items-center gap-2 px-6 py-3 cursor-pointer"
                onClick={deleteTask}
              >
                <Icon icon="TrashSimple" className="w-4 h-4 opacity-50" />
                <p className="text-white font-bold text-base">Delete task</p>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
