import { cn } from "@/utils/cn";
import colorToHex from "@/utils/colors";
import { useState } from "react";
import { useProjects } from "@/context/ProjectsProvider";
import EditTask from "../modals/EditTask";
import DeleteTask from "../modals/DeleteTask";
import { format, intlFormatDistance } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { fetchEditCompletedTask } from "@/utils/fetchers";
import { uiEditCompletedTask } from "@/utils/ui-update";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import Tooltip from "../generic/Tooltip";

export default function Task({
  id,
  color,
  name,
  due,
  done,
  projectId,
}: {
  id: number;
  color: string;
  name: string;
  due: Date;
  done: boolean;
  projectId: number;
}) {
  // projects context
  const { projects, setProjects } = useProjects();

  // session context
  const { data: session } = useSession();

  // task done state
  const [taskDone, setTaskDone] = useState(done);

  // task hover state
  const [taskHover, setTaskHover] = useState<number>();

  // date variables
  const dateIsInPast = new Date(due).getTime() < new Date().getTime();

  // query
  const { refetch, isLoading } = useQuery({
    queryKey: ["add-task"],
    queryFn: () => fetchEditCompletedTask({ projectId, id, done: !done }),
    enabled: false,
  });

  // edit task
  const editTask = async () => {
    const res = await refetch();

    if (res.isError) {
      toast.error("An error has occured.");
      return;
    }

    uiEditCompletedTask({
      projects,
      setProjects,
      projectId,
      id,
      done: !done,
      account: session?.user.name!,
      accountId: parseInt(session?.user.id as string),
      taskName: name,
    });
  };

  return (
    <div
      key={id}
      onMouseEnter={() => setTaskHover(id)}
      onMouseLeave={() => setTaskHover(undefined)}
      className="flex items-center justify-between border-b border-white border-opacity-5"
    >
      <div
        className="py-4 flex gap-4 items-center cursor-pointer select-none"
        onClick={() => {
          editTask();
          setTaskDone((prev) => !prev);
        }}
      >
        <Tooltip
          trigger={
            <div className="h-5 w-5 rounded-full border border-gray-500 flex justify-center items-center">
              <div
                className={cn(
                  "w-4 h-4 bg-white rounded-full transition-all",
                  taskDone ? "opacity-100" : "opacity-0"
                )}
                style={{
                  background: colorToHex(color),
                }}
              ></div>
            </div>
          }
          content={!done ? "Complete" : "Uncomplete"}
          direction="bottom"
        />

        <div>
          <p
            className={cn(
              "text-xl font-bold transition-all",
              taskDone ? "text-gray-400" : null
            )}
          >
            {name}
          </p>

          <Tooltip
            trigger={
              <p
                className={`font-bold flex gap-2 ${
                  dateIsInPast && !done
                    ? "text-red-400 text-opacity-60"
                    : "text-neutral-500 text-opacity-90"
                }`}
              >
                {intlFormatDistance(new Date(due), new Date())}
              </p>
            }
            content={format(new Date(due), "d MMMM, yyyy")}
            direction="right"
          />
        </div>
      </div>

      <div className="flex gap-4">
        <EditTask
          taskId={id}
          name={name}
          due={due}
          taskHover={taskHover}
          setTaskHover={setTaskHover}
          projectId={projectId}
        />
        <DeleteTask
          taskId={id}
          projectId={projectId}
          name={name}
          taskHover={taskHover}
        />
      </div>
    </div>
  );
}
