import colorToHex from "@/utils/colors";
import Icon from "../generic/Icon";
import Modal from "../project/Modal";
import { FormEvent, useState } from "react";
import { useProjects } from "@/context/ProjectsProvider";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import { useQuery } from "@tanstack/react-query";
import { fetchCreateTask } from "@/utils/fetchers";
import { uiCreateTask } from "@/utils/ui-update";
import { toast } from "sonner";

export default function AddTask({
  color,
  projectId,
}: {
  color: string;
  projectId: number;
}) {
  // projects context
  const { projects, setProjects } = useProjects();

  // fields state
  const [name, setName] = useState("");
  const [due, setDue] = useState<Date | undefined>(new Date());

  // name error state
  const [errorName, setErrorName] = useState<string | undefined>();

  // modal state
  const [open, setOpen] = useState(false);

  // query
  const { refetch, isLoading } = useQuery({
    queryKey: ["add-task"],
    queryFn: () => fetchCreateTask({ projectId, name, due: due! }),
    enabled: false,
  });

  // create task
  const createTask = async (e: FormEvent) => {
    e.preventDefault();

    if (isLoading) return;

    if (name === "") {
      setErrorName("Task name cannot be empty.");
      return;
    }

    setErrorName(undefined);

    const res = await refetch();

    uiCreateTask({
      projects,
      setProjects,
      projectId,
      taskId: res.data?.data.data.taskId,
      name,
      due: due!,
    });

    setOpen(false);
    toast.success("Task has been created.");
  };

  const Trigger = (
    <div
      className="px-6 py-2 rounded-xl transition-all flex items-center gap-2 hover:bg-white hover:bg-opacity-5"
      style={{ backgroundColor: colorToHex(color) }}
    >
      <Icon icon="Plus" className="text-xl opacity-80 text-white" />
      <p className="font-bold">Task</p>
    </div>
  );

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

        <Popover>
          <PopoverTrigger asChild>
            <div className="flex cursor-pointer items-center gap-2 bg-white bg-opacity-10 border border-white border-opacity-10 rounded-xl px-6 py-2 focus:outline-none font-bold text-gray-300 placeholder:text-neutral-300">
              <Icon icon="CalendarBlank" className="text-white" />
              {due ? (
                <p className="text-neutral-300">{format(due, "dd/MM/yyyy")}</p>
              ) : (
                <p>Pick a date</p>
              )}
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 border-none bg-transparent">
            <Calendar
              mode="single"
              selected={due}
              onSelect={setDue}
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
        Create task
        {isLoading ? (
          <Icon icon="Spinner" className="animate-spin text-lg text-white" />
        ) : (
          <Icon icon="ArrowRight" className="text-white" />
        )}
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
