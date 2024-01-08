import Icon from "../generic/Icon";
import Modal from "../project/Modal";
import { DialogClose } from "../ui/Dialog";
import { useProjects } from "@/context/ProjectsProvider";
import axios from "axios";
import { useRouter } from "next/router";

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

  // delete task
  const deleteTask = async () => {
    console.log("s");
    const res = await axios.delete(`/api/projects/${projectId}`);

    console.log("s");
    const projectsCopy = [...projects];
    const projectIndex = projectsCopy.findIndex((p) => p.id === projectId);

    projectsCopy.splice(projectIndex, 1);
    setProjects(projectsCopy);

    console.log("s");
    router.push("/");
  };

  const Trigger = (
    <button className="px-6 py-2 rounded-xl transition-all flex items-center gap-2 bg-white bg-opacity-10 hover:bg-white hover:bg-opacity-20">
      <Icon icon="TrashSimple" className="text-xl opacity-80" />
      <p className="font-bold">Delete</p>
    </button>
  );

  const Content = (
    <div className="flex flex-col gap-8">
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
            className="py-2 bg-red-500 rounded-xl text-white mt-4 font-bold flex items-center gap-2 justify-center"
            onClick={deleteTask}
            type="submit"
          >
            Delete project
            <Icon icon="ArrowRight" />
          </button>
        </DialogClose>
      </div>
    </div>
  );

  return <Modal title="Delete project" trigger={Trigger} content={Content} />;
}
