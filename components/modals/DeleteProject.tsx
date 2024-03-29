import { useQuery } from "@tanstack/react-query";
import Icon from "../generic/Icon";
import Modal from "../generic/Modal";
import { useProjects } from "@/context/ProjectsProvider";
import { useRouter } from "next/router";
import { FormEvent } from "react";
import { fetchDeleteProject } from "@/utils/fetchers";
import { uiDeleteProject } from "@/utils/ui-update";
import { DialogClose } from "../ui/Dialog";
import { toast } from "sonner";

export default function DeleteProject({
  projectId,
  name,
}: {
  projectId: number;
  name: string;
}) {
  // projects context
  const { projects, setProjects } = useProjects();

  // router
  const router = useRouter();

  // query
  const { refetch, isLoading } = useQuery({
    queryKey: ["delete-project"],
    queryFn: () => fetchDeleteProject({ projectId }),
    enabled: false,
  });

  // delete task
  const deleteTask = async (e: FormEvent) => {
    e.preventDefault();

    if (isLoading) return;

    const res = await refetch();

    if (res.isError) {
      toast.error("An error has occured.");
      return;
    }

    uiDeleteProject({ projects, setProjects, projectId });

    toast.success("Project has been deleted.");

    router.push("/");
  };

  const Trigger = (
    <button className="px-6 py-2 rounded-xl transition-all flex items-center gap-2 bg-white bg-opacity-10 hover:bg-white hover:bg-opacity-20">
      <Icon icon="Trash" className="text-xl opacity-80 text-white" />
      <p className="font-bold">Delete</p>
    </button>
  );

  const Content = (
    <form className="flex flex-col gap-8" onSubmit={deleteTask}>
      <p className="opacity-50">
        Do you want to really delete the project &quot;
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
            Delete project
            {isLoading ? (
              <Icon
                icon="Spinner"
                className="animate-spin text-lg text-white"
              />
            ) : (
              <Icon icon="ArrowRight" className="text-white" />
            )}
          </button>
        </DialogClose>
      </div>
    </form>
  );

  return <Modal title="Delete project" trigger={Trigger} content={Content} />;
}
