export interface Task {
  id: number;
  name: string;
  due: Date;
  done: boolean;
}

export interface Member {
  id: number;
  name: string;
  email: string;
}

export interface Log {
  action: string;
  task: string;
  account: string;
  account_id: number;
  date: Date;
}

export interface Project {
  id: number;
  icon: string;
  name: string;
  color: string;
  tasks: Task[];
  members: Member[];
  logs: Log[];
}
