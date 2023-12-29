"use client";

import Headline from "@/components/generic/Headline";
import Layout from "@/components/generic/Layout";
import ProjectIcon from "@/components/project/ProjectIcon";
import Task from "@/components/project/Task";
import Users from "@/components/project/Users";
import colorToHex from "@/utils/colors";
import { useParams } from "next/navigation";
import { Project } from "@/types/Project.types";
import projects from "@/test-data/projects-data";
import { useRouter } from "next/router";

export default function Project() {
  let { projectId } = useParams() ?? { projectId: projects[0].id };
  const routerReady = useRouter().isReady;

  const project =
    projects.find((project) => project.id === parseInt(projectId as string)) ??
    projects[0];

  return (
    routerReady && (
      <Layout project={project}>
        <Headline
          text={project.name}
          icon={<ProjectIcon color={project.color} icon={project.icon} />}
          color={colorToHex(project.color)}
          element={<Users users={project.users} />}
        />

        {project.tasks.map((task) => {
          return <Task key={task.taskId} {...task} color={project.color} />;
        })}
      </Layout>
    )
  );
}
