export interface Task {
  taskId: number;
  name: string;
  due: Date;
  done: boolean;
}

export interface Project {
  id: number;
  icon: string;
  name: string;
  color: string;
  tasks: Task[];
  users: number[];
}
