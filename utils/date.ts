import { Task } from "@/types/Project.types";

export function sqlDate(date: Date) {
  const year = new Date(date).toLocaleString("default", { year: "numeric" });
  const month = new Date(date).toLocaleString("default", {
    month: "2-digit",
  });
  const day = new Date(date).toLocaleString("default", { day: "2-digit" });

  return [year, month, day].join("-");
}

export function sortTasksByDate(tasks: Task[]) {
  return tasks.sort(
    (a, b) => new Date(a.due).getTime() - new Date(b.due).getTime()
  );
}
