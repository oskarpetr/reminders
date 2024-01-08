import Icon from "../generic/Icon";
import Modal from "../project/Modal";
import { Dispatch, SetStateAction, useState } from "react";
import { useProjects } from "@/context/ProjectsProvider";
import { cn } from "@/utils";
import axios from "axios";
import { sqlDate } from "@/utils/date";

export default function EditTask({
  taskId,
  projectId,
  name,
  due,
  taskHover,
  setTaskHover,
}: {
  taskId: number;
  projectId: number;
  name: string;
  due: Date;
  taskHover: number | undefined;
  setTaskHover: Dispatch<SetStateAction<number | undefined>>;
}) {
  // projects context
  const { projects, setProjects } = useProjects();

  // edit task
  const editTask = () => {
    if (editName === "") {
      setErrorName("Task name cannot be empty.");
      return;
    }

    setErrorName(undefined);

    if (sqlDate(due) === sqlDate(editDue) && name === editName) {
      setTaskHover(undefined);
      setOpen(false);
      return;
    }

    const editObj: any = { id: taskId };

    if (sqlDate(due) !== sqlDate(editDue)) {
      editObj.due = sqlDate(editDue);
    }

    if (name !== editName) {
      editObj.name = editName;
    }

    axios.patch(`/api/projects/${projectId}/tasks`, editObj);

    const projectsCopy = [...projects];
    const projectIndex = projectsCopy.findIndex((p) => p.id === projectId);
    const taskIndex = projectsCopy[projectIndex].tasks.findIndex(
      (task) => task.id === taskId
    );

    projectsCopy[projectIndex].tasks[taskIndex].name = editName;
    projectsCopy[projectIndex].tasks[taskIndex].due = editDue;

    setProjects(projectsCopy);
    setTaskHover(undefined);
    setOpen(false);
  };

  const Trigger = (
    <Icon
      icon="PencilSimple"
      className={cn(
        "opacity-50 w-5 h-5 cursor-pointer transition-all focus:outline-none outline-none",
        taskId === taskHover ? "opacity-50" : "opacity-0"
      )}
    />
  );

  // edit fields states
  const [editName, setEditName] = useState(name);
  const [editDue, setEditDue] = useState(due);

  // error states
  const [errorName, setErrorName] = useState<string | undefined>();

  // modal state
  const [open, setOpen] = useState(false);

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

        {errorName && <p className="text-red-400 font-bold">{errorName}</p>}
      </div>

      <div className="flex flex-col gap-4">
        <p className="font-bold">Due date</p>
        <input
          className="bg-white bg-opacity-10 border border-white border-opacity-10 rounded-xl px-6 py-2 focus:outline-none font-bold text-gray-300"
          placeholder="Enter date"
          type="date"
          value={sqlDate(editDue)}
          onChange={(e) => setEditDue(new Date(e.target.value))}
        />
      </div>

      <button
        className="py-2 bg-neutral-600 rounded-xl text-white mt-4 font-bold flex items-center gap-2 justify-center"
        onClick={editTask}
        type="submit"
      >
        Edit task
        <Icon icon="ArrowRight" />
      </button>
    </div>
  );

  return (
    <Modal
      title="Edit task"
      trigger={Trigger}
      content={Content}
      open={open}
      setOpen={setOpen}
    />
  );
}
