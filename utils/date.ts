import { Task } from "@/types/Project.types";
import { format } from "date-fns";

export function sqlDate(date: Date) {
  return format(date, "MM-dd-yyyy");
}

export function sortTasksByDate(tasks: Task[]) {
  return tasks.sort(
    (a, b) => new Date(a.due).getTime() - new Date(b.due).getTime()
  );
}
