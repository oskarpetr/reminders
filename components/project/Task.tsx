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

export default function Task({
  taskId,
  color,
  name,
  due,
  done,
}: {
  taskId: number;
  color: string;
  name: string;
  due: Date;
  done: boolean;
}) {
  const [taskDone, setTaskDone] = useState(done);
  const [taskHover, setTaskHover] = useState<number>();

  const editTask = () => {};

  const deleteTask = () => {};

  return (
    <div
      key={taskId}
      onMouseEnter={() => setTaskHover(taskId)}
      onMouseLeave={() => setTaskHover(undefined)}
      className="flex items-center justify-between border-b border-white border-opacity-10"
    >
      <div
        className="py-4 flex gap-4 items-center cursor-pointer select-none"
        onClick={() => setTaskDone((prev) => !prev)}
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
            {due.toLocaleDateString("en-US")}
          </p>
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <Icon
            icon="DotsThree"
            className={cn(
              "opacity-50 w-5 h-5 cursor-pointer transition-all focus:outline-none outline-none",
              taskId === taskHover ? "opacity-100" : "opacity-0"
            )}
          />
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56 bg-transparent border-none p-0 absolute right-[-1rem]">
          <div className="bg-neutral-800 border border-gray-700 rounded-xl">
            <DropdownMenuGroup>
              <DropdownMenuItem
                className="flex items-center gap-2 px-6 py-3 cursor-pointer"
                onClick={editTask}
              >
                <Icon icon="PencilSimple" className="w-4 h-4 opacity-50" />
                <p className="text-white font-bold text-base">Edit task</p>
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
