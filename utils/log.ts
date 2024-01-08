export type Action =
  | "TASK-RENAMED"
  | "TASK-COMPLETED"
  | "TASK-UNCOMPLETED"
  | "TASK-CREATED"
  | "TASK-DUE";

export function getAction(action: Action) {
  if (action === "TASK-RENAMED") {
    return "has renamed the task";
  } else if (action === "TASK-COMPLETED") {
    return "has completed the task";
  } else if (action === "TASK-UNCOMPLETED") {
    return "has uncompleted the task";
  } else if (action === "TASK-CREATED") {
    return "has created the task";
  } else if (action === "TASK-DUE") {
    return "has changed the due date on the task";
  }
}
