import axios from "axios";
import { sqlDate } from "./date";

export async function fetchCreateTask({
  projectId,
  name,
  due,
}: {
  projectId: number;
  name: string;
  due: Date;
}) {
  return await axios.post(`/api/projects/${projectId}/tasks`, {
    name,
    due: sqlDate(due),
    done: false,
  });
}

export async function fetchCreateProject({
  name,
  color,
  icon,
}: {
  name: string;
  color: string;
  icon: string;
}) {
  return await axios.post("/api/projects", { name, color, icon });
}

export async function fetchCreateAccount({
  name,
  email,
  encryptedPassword,
  avatar,
}: {
  name: string;
  email: string;
  encryptedPassword: string;
  avatar: string;
}) {
  return await axios.post(`/api/accounts`, {
    name: name,
    email: email,
    password: encryptedPassword,
    avatar: avatar,
  });
}

export async function fetchDeleteProject({ projectId }: { projectId: number }) {
  return await axios.delete(`/api/projects/${projectId}`);
}

export async function fetchDeleteTask({
  projectId,
  taskId,
}: {
  projectId: number;
  taskId: number;
}) {
  return await axios.delete(`/api/projects/${projectId}/tasks`, {
    data: { id: taskId },
  });
}

export async function fetchEditProject({
  projectId,
  editName,
  editSelectedColor,
  editSelectedIcon,
}: {
  projectId: number;
  editName: string;
  editSelectedColor: string;
  editSelectedIcon: string;
}) {
  return await axios.patch(`/api/projects/${projectId}`, {
    name: editName,
    color: editSelectedColor,
    icon: editSelectedIcon,
  });
}

export async function fetchEditTask({
  projectId,
  editObj,
}: {
  projectId: number;
  editObj: { id: number; name: string; due: string };
}) {
  return await axios.patch(`/api/projects/${projectId}/tasks`, editObj);
}

export async function fetchEditCompletedTask({
  projectId,
  id,
  done,
}: {
  projectId: number;
  id: number;
  done: boolean;
}) {
  return await axios.patch(`/api/projects/${projectId}/tasks`, {
    id: id,
    done: done,
  });
}

export async function fetchCreateMember({
  projectId,
  newMemberEmail,
}: {
  projectId: number;
  newMemberEmail: string;
}) {
  return await axios.post(`/api/projects/${projectId}/members`, {
    email: newMemberEmail,
  });
}

export async function fetchDeleteMember({
  projectId,
  id,
}: {
  projectId: number;
  id: number;
}) {
  return await axios.delete(`/api/projects/${projectId}/members`, {
    data: { accountId: id },
  });
}

export async function fetchUpdateProfile({
  name,
  id,
}: {
  name: string;
  id: number;
}) {
  return await axios.patch(`/api/accounts/${id}/general`, { name });
}

export async function fetchUpdateAvatar({
  avatar,
  id,
}: {
  avatar: string;
  id: number;
}) {
  return await axios.patch(`/api/accounts/${id}/avatar`, { avatar });
}
