import Icon from "../generic/Icon";
import Modal from "../project/Modal";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { useProjects } from "@/context/ProjectsProvider";
import { cn } from "@/utils";
import axios from "axios";
import { sqlDate } from "@/utils/date";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import { useQuery } from "@tanstack/react-query";
import { uiEditTask } from "@/utils/ui-update";
import { fetchEditTask } from "@/utils/fetchers";

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

  // edit fields states
  const [editName, setEditName] = useState(name);
  const [editDue, setEditDue] = useState(due);
  const [editObj, setEditObj] = useState<{
    id: number;
    name: string;
    due: string;
  }>();

  // error states
  const [errorName, setErrorName] = useState<string | undefined>();

  // modal state
  const [open, setOpen] = useState(false);

  // query
  const { refetch, isLoading } = useQuery({
    queryKey: ["edit-task"],
    queryFn: () =>
      fetchEditTask({
        projectId,
        editObj: editObj!,
      }),
    enabled: false,
  });

  // edit task
  const editTask = async (e: FormEvent) => {
    e.preventDefault();

    if (isLoading) return;

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

    const edit: any = { id: taskId };

    if (name !== editName) {
      edit.name = editName;
    }

    if (sqlDate(due) !== sqlDate(editDue)) {
      edit.due = sqlDate(editDue);
    }

    setEditObj(edit);

    await refetch();

    uiEditTask({ projects, setProjects, projectId, taskId, editName, editDue });

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

  const Content = (
    <form className="flex flex-col gap-8" onSubmit={editTask}>
      <div className="flex flex-col gap-4">
        <p className="font-bold ">Task name</p>
        <input
          className="bg-white bg-opacity-10 border border-white border-opacity-10 rounded-xl px-6 py-2 focus:outline-none font-bold text-neutral-300"
          placeholder="Enter name"
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
        />

        {errorName && <p className="text-red-400 font-bold">{errorName}</p>}
      </div>

      <div className="flex flex-col gap-4">
        <p className="font-bold">Due date</p>

        <Popover>
          <PopoverTrigger asChild>
            <div className="flex cursor-pointer items-center gap-2 bg-white bg-opacity-10 border border-white border-opacity-10 rounded-xl px-6 py-2 focus:outline-none font-bold text-gray-300 placeholder:text-gray-300">
              <Icon icon="CalendarBlank" className="opacity-50" />
              {due ? (
                <p className="text-neutral-300">
                  {format(editDue, "dd/MM/yyyy")}
                </p>
              ) : (
                <p>Pick a date</p>
              )}
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 border-none bg-transparent">
            <Calendar
              mode="single"
              selected={editDue}
              onSelect={setEditDue}
              initialFocus
              className="bg-neutral-800 rounded-xl border border-white border-opacity-20"
            />
          </PopoverContent>
        </Popover>
      </div>

      <button
        className="py-2 bg-neutral-600 disabled:bg-neutral-700 rounded-xl text-white mt-4 font-bold flex items-center gap-2 justify-center"
        disabled={isLoading}
        type="submit"
      >
        Edit task
        {isLoading ? (
          <Icon icon="Spinner" className="animate-spin text-lg" />
        ) : (
          <Icon icon="ArrowRight" />
        )}
      </button>
    </form>
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
