import { Project } from "@/types/Project.types";
import { Dispatch, SetStateAction } from "react";

export function uiCreateTask({
  projects,
  setProjects,
  projectId,
  taskId,
  name,
  due,
}: {
  projects: Project[];
  setProjects: Dispatch<SetStateAction<Project[]>>;
  projectId: number;
  taskId: number;
  name: string;
  due: Date;
}) {
  const projectsCopy = [...projects];
  const projectIndex = projectsCopy.findIndex((p) => p.id === projectId);
  projectsCopy[projectIndex].tasks.push({
    id: taskId,
    name: name,
    due: due,
    done: false,
  });

  setProjects(projectsCopy);
}

export function uiCreateProject({
  projects,
  setProjects,
  projectId,
  name,
  color,
  icon,
}: {
  projects: Project[];
  setProjects: Dispatch<SetStateAction<Project[]>>;
  projectId: number;
  name: string;
  color: string;
  icon: string;
}) {
  const projectsCopy = [...projects];
  projectsCopy.push({
    id: projectId,
    name,
    color,
    icon,
    tasks: [],
    members: [],
    logs: [],
  });

  setProjects(projectsCopy);
}

export function uiDeleteProject({
  projects,
  setProjects,
  projectId,
}: {
  projects: Project[];
  setProjects: Dispatch<SetStateAction<Project[]>>;
  projectId: number;
}) {
  const projectsCopy = [...projects];
  const projectIndex = projectsCopy.findIndex((p) => p.id === projectId);

  projectsCopy.splice(projectIndex, 1);
  setProjects(projectsCopy);
}

export function uiDeleteTask({
  projects,
  setProjects,
  projectId,
  taskId,
}: {
  projects: Project[];
  setProjects: Dispatch<SetStateAction<Project[]>>;
  projectId: number;
  taskId: number;
}) {
  const projectsCopy = [...projects];
  const projectIndex = projectsCopy.findIndex((p) => p.id === projectId);
  const taskIndex = projectsCopy[projectIndex].tasks.findIndex(
    (task) => task.id === taskId
  );

  projectsCopy[projectIndex].tasks.splice(taskIndex, 1);
  setProjects(projectsCopy);
}

export function uiEditProject({
  projects,
  setProjects,
  projectId,
  editName,
  editSelectedColor,
  editSelectedIcon,
}: {
  projects: Project[];
  setProjects: Dispatch<SetStateAction<Project[]>>;
  projectId: number;
  editName: string;
  editSelectedColor: string;
  editSelectedIcon: string;
}) {
  const projectsCopy = [...projects];
  const projectIndex = projectsCopy.findIndex(
    (project) => project.id === projectId
  );

  projectsCopy[projectIndex].name = editName;
  projectsCopy[projectIndex].color = editSelectedColor;
  projectsCopy[projectIndex].icon = editSelectedIcon;

  setProjects(projectsCopy);
}

export function uiEditTask({
  projects,
  setProjects,
  projectId,
  taskId,
  editName,
  editDue,
}: {
  projects: Project[];
  setProjects: Dispatch<SetStateAction<Project[]>>;
  projectId: number;
  taskId: number;
  editName: string;
  editDue: Date;
}) {
  const projectsCopy = [...projects];
  const projectIndex = projectsCopy.findIndex((p) => p.id === projectId);
  const taskIndex = projectsCopy[projectIndex].tasks.findIndex(
    (task) => task.id === taskId
  );

  projectsCopy[projectIndex].tasks[taskIndex].name = editName;
  projectsCopy[projectIndex].tasks[taskIndex].due = editDue;

  setProjects(projectsCopy);
}

export function uiCreateMember({
  projects,
  setProjects,
  projectId,
  member,
}: {
  projects: Project[];
  setProjects: Dispatch<SetStateAction<Project[]>>;
  projectId: number;
  member: { id: number; email: string; name: string };
}) {
  const projectsCopy = [...projects];
  const projectIndex = projects.findIndex(
    (project) => project.id === projectId
  );
  projectsCopy[projectIndex].members.push({
    id: member.id,
    email: member.email,
    name: member.name,
  });

  setProjects(projectsCopy);
}

export function uiDeleteMember({
  projects,
  setProjects,
  projectId,
  id,
}: {
  projects: Project[];
  setProjects: Dispatch<SetStateAction<Project[]>>;
  projectId: number;
  id: number;
}) {
  const projectsCopy = [...projects];
  const projectIndex = projects.findIndex(
    (project) => project.id === projectId
  );
  const memberIndex = projectsCopy[projectIndex].members.findIndex(
    (member) => member.id === id
  );
  projectsCopy[projectIndex].members.splice(memberIndex, 1);

  setProjects(projectsCopy);
}
