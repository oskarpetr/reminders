import colorToHex from "@/utils/colors";
import Icon from "../generic/Icon";
import Modal from "../project/Modal";
import { FormEvent, useState } from "react";
import { useProjects } from "@/context/ProjectsProvider";
import axios from "axios";
import { sqlDate } from "@/utils/date";

export default function AddTask({
  color,
  projectId,
}: {
  color: string;
  projectId: number;
}) {
  // projects context
  const { projects, setProjects } = useProjects();

  // create task
  const createTask = async (e: FormEvent) => {
    e.preventDefault();

    if (name === "") {
      setErrorName("Task name cannot be empty.");
      return;
    }

    setErrorName(undefined);

    const res = await axios.post(`/api/projects/${projectId}/tasks`, {
      name: name,
      due: sqlDate(due),
      done: false,
    });

    const taskId = res.data.data.taskId;

    const projectsCopy = [...projects];
    const projectIndex = projectsCopy.findIndex((p) => p.id === projectId);
    projectsCopy[projectIndex].tasks.push({
      id: taskId,
      name: name,
      due: due,
      done: false,
    });

    setProjects(projectsCopy);
    setOpen(false);
  };

  const Trigger = (
    <div
      className="px-6 py-2 rounded-xl transition-all flex items-center gap-2 hover:bg-white hover:bg-opacity-5"
      style={{ backgroundColor: colorToHex(color) }}
    >
      <Icon icon="Plus" className="text-xl opacity-80" />
      <p className="font-bold">Task</p>
    </div>
  );

  // fields state
  const [name, setName] = useState("");
  const [due, setDue] = useState(new Date());

  // name error state
  const [errorName, setErrorName] = useState<string | undefined>();

  // modal state
  const [open, setOpen] = useState(false);

  const Content = (
    <form className="flex flex-col gap-8" onSubmit={createTask}>
      <div className="flex flex-col gap-4">
        <p className="font-bold">Task name</p>
        <input
          className="bg-white bg-opacity-10 border border-white border-opacity-10 rounded-xl px-6 py-2 focus:outline-none font-bold text-gray-300"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {errorName && <p className="text-red-400 font-bold">{errorName}</p>}
      </div>

      <div className="flex flex-col gap-4">
        <p className="font-bold">Due date</p>
        <input
          className="bg-white bg-opacity-10 border border-white border-opacity-10 rounded-xl px-6 py-2 focus:outline-none font-bold text-gray-300 placeholder:text-gray-300"
          placeholder="Enter date"
          type="date"
          value={sqlDate(due)}
          onChange={(e) => setDue(new Date(e.target.value))}
        />
      </div>

      <button
        className="py-2 bg-neutral-600 rounded-xl text-white mt-4 font-bold flex items-center gap-2 justify-center"
        type="submit"
      >
        Create task
        <Icon icon="ArrowRight" />
      </button>
    </form>
  );

  return (
    <Modal
      title="Add task"
      trigger={Trigger}
      content={Content}
      open={open}
      setOpen={setOpen}
    />
  );
}
