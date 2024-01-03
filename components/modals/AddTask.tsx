import colorToHex from "@/utils/colors";
import Icon from "../generic/Icon";
import Modal from "../generic/Modal";
import { useState } from "react";
import { DialogClose } from "../ui/Dialog";
import { useProjects } from "@/context/ProjectsProvider";
import axios from "axios";
import sqlDate from "@/utils/date";

export default function AddTask({
  color,
  projectId,
}: {
  color: string;
  projectId: number;
}) {
  const { projects, setProjects } = useProjects();

  const createTask = async () => {
    const res = await axios.post(`/api/projects/${projectId}/tasks`, {
      name: name,
      due: sqlDate(due),
      done: false,
      project_id: projectId,
    });

    const taskId = res.data.data.projectId;

    const projectsCopy = [...projects];
    const projectIndex = projectsCopy.findIndex((p) => p.id === projectId);
    projectsCopy[projectIndex].tasks.push({
      id: taskId,
      name: name,
      due: due,
      done: false,
    });

    setProjects(projectsCopy);
  };

  const Trigger = (
    <div
      className="px-6 py-2 rounded-xl transition-all flex items-center gap-2 hover:bg-white hover:bg-opacity-5 cursor-pointer"
      style={{ backgroundColor: colorToHex(color) }}
    >
      <Icon icon="Plus" className="text-xl opacity-80" />
      <p className="font-bold">Add task</p>
    </div>
  );

  const [name, setName] = useState("");
  const [due, setDue] = useState(new Date());

  const Content = (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <p className="font-bold ">Task name</p>
        <input
          className="bg-white bg-opacity-10 border border-white border-opacity-10 rounded-xl px-6 py-2 focus:outline-none font-bold text-gray-300"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-4">
        <p className="font-bold">Due date</p>
        <input
          className="bg-white bg-opacity-10 border border-white border-opacity-10 rounded-xl px-6 py-2 focus:outline-none font-bold text-gray-300"
          placeholder="Enter date"
          type="date"
          value={due.toString()}
          onChange={(e) => setDue(new Date(e.target.value))}
        />
      </div>

      <DialogClose asChild>
        <button
          className="py-2 bg-neutral-600 rounded-xl text-white mt-4 font-bold flex items-center gap-2 justify-center"
          onClick={createTask}
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
