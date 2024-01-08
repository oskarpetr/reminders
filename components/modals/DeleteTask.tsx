import Icon from "../generic/Icon";
import Modal from "../generic/Modal";
import { useState } from "react";
import { DialogClose } from "../ui/Dialog";
import { useProjects } from "@/context/ProjectsProvider";
import { cn } from "@/utils";
import axios from "axios";

export default function DeleteTask({
  taskId,
  projectId,
  taskHover,
  name,
}: {
  taskId: number;
  projectId: number;
  taskHover: number | undefined;
  name: string;
}) {
  const { projects, setProjects } = useProjects();

  const deleteTask = async () => {
    await axios.delete(`/api/projects/${projectId}/tasks`, {
      data: { id: taskId },
    });

    const projectsCopy = [...projects];
    const projectIndex = projectsCopy.findIndex((p) => p.id === projectId);
    const taskIndex = projectsCopy[projectIndex].tasks.findIndex(
      (task) => task.id === taskId
    );

    projectsCopy[projectIndex].tasks.splice(taskIndex, 1);

    setProjects(projectsCopy);
  };

  const Trigger = (
    <Icon
      icon="TrashSimple"
      className={cn(
        "opacity-50 w-5 h-5 cursor-pointer transition-all focus:outline-none outline-none",
        taskId === taskHover ? "opacity-50" : "opacity-0"
      )}
    />
  );

  const Content = (
    <div className="flex flex-col gap-8">
      <p className="opacity-50">
        Do you want to really delete the task &quot;
        <span className="font-bold">{name}</span>&quot;? Be careful, this action
        cannot be reverted.
      </p>

      <div className="flex gap-4">
        <DialogClose asChild className="w-full">
          <button
            className="py-2 bg-neutral-700 rounded-xl text-white mt-4 font-bold flex items-center gap-2 justify-center"
            type="submit"
          >
            Cancel
          </button>
        </DialogClose>

        <DialogClose asChild className="w-full">
          <button
            className="py-2 bg-red-500 rounded-xl text-white mt-4 font-bold flex items-center gap-2 justify-center"
            onClick={deleteTask}
            type="submit"
          >
            Delete task
            <Icon icon="ArrowRight" />
          </button>
        </DialogClose>
      </div>
    </div>
  );

  return <Modal title="Delete task" trigger={Trigger} content={Content} />;
}
