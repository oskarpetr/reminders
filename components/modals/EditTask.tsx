import Icon from "../generic/Icon";
import Modal from "../generic/Modal";
import { useState } from "react";
import { DialogClose } from "../ui/Dialog";
import { useProjects } from "@/context/ProjectsProvider";
import { DropdownMenuItem } from "../ui/dropdown-menu";

export default function EditTask({
  taskId,
  name,
  due,
}: {
  taskId: number;
  name: string;
  due: Date;
}) {
  const { projects, setProjects } = useProjects();

  const editTask = () => {
    // api call

    const projectsCopy = [...projects];

    setProjects(projectsCopy);
  };

  const Trigger = (
    <div className="flex items-center gap-2 px-6 py-3 cursor-pointer w-full">
      <Icon icon="PencilSimple" className="w-4 h-4 opacity-50" />
      <p className="text-white font-bold text-base">Edit task</p>
    </div>
  );

  const [editName, setEditName] = useState(name);
  const [editDue, setEditDue] = useState(due);

  const Content = (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <p className="font-bold ">Task name</p>
        <input
          className="bg-white bg-opacity-10 border border-white border-opacity-10 rounded-xl px-6 py-2 focus:outline-none font-bold text-gray-300"
          placeholder="Enter name"
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-4">
        <p className="font-bold">Due date</p>
        <input
          className="bg-white bg-opacity-10 border border-white border-opacity-10 rounded-xl px-6 py-2 focus:outline-none font-bold text-gray-300"
          placeholder="Enter date"
          type="date"
          value={editDue?.toString()}
          onChange={(e) => setEditDue(new Date(e.target.value))}
        />
      </div>

      <DialogClose asChild>
        <button
          className="py-2 bg-neutral-600 rounded-xl text-white mt-4 font-bold flex items-center gap-2 justify-center"
          onClick={editTask}
          type="submit"
        >
          Create task
          <Icon icon="ArrowRight" />
        </button>
      </DialogClose>
    </div>
  );

  return <Modal title="Add task" trigger={Trigger} content={Content} />;
}
