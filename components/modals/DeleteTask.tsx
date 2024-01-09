import { useQuery } from "@tanstack/react-query";
import Icon from "../generic/Icon";
import Modal from "../project/Modal";
import { useProjects } from "@/context/ProjectsProvider";
import { cn } from "@/utils/cn";
import { fetchDeleteTask } from "@/utils/fetchers";
import { uiDeleteTask } from "@/utils/ui-update";
import { FormEvent } from "react";
import { DialogClose } from "../ui/Dialog";

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
  // projects context
  const { projects, setProjects } = useProjects();

  // query
  const { refetch, isLoading } = useQuery({
    queryKey: ["delete-task"],
    queryFn: () => fetchDeleteTask({ projectId, taskId }),
    enabled: false,
  });

  // delete task
  const deleteTask = async (e: FormEvent) => {
    e.preventDefault();

    if (isLoading) return;

    await refetch();

    uiDeleteTask({ projects, setProjects, projectId, taskId });
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
    <form className="flex flex-col gap-8" onSubmit={deleteTask}>
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
            className="py-2 bg-red-500 disabled:bg-red-600 rounded-xl text-white mt-4 font-bold flex items-center gap-2 justify-center"
            disabled={isLoading}
            type="submit"
          >
            Delete task
            {isLoading ? (
              <Icon icon="Spinner" className="animate-spin text-lg" />
            ) : (
              <Icon icon="ArrowRight" />
            )}
          </button>
        </DialogClose>
      </div>
    </form>
  );

  return <Modal title="Delete task" trigger={Trigger} content={Content} />;
}
