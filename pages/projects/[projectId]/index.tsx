"use client";

import Headline from "@/components/generic/Headline";
import Layout from "@/components/generic/Layout";
import colorToHex from "@/utils/colors";
import { useParams } from "next/navigation";
import { Project } from "@/types/Project.types";
import { useRouter } from "next/router";
import { useProjects } from "@/context/ProjectsProvider";
import AddTask from "@/components/modals/AddTask";
import Task from "@/components/project/Task";

export default function Project() {
  const { projects } = useProjects();

  let { projectId } = useParams() ?? { projectId: 1 };
  const routerReady = useRouter().isReady;

  const project = projects!.find(
    (project) => project.id === parseInt(projectId as string)
  )!;

  return (
    routerReady &&
    project && (
      <Layout project={project}>
        <Headline
          text={project.name}
          icon={<AddTask color={project.color} projectId={project.id} />}
          color={colorToHex(project.color)}
          // element={<Users users={project.users} />}
        />

        {project.tasks.length !== 0 ? (
          project.tasks.map((task) => {
            return (
              <Task
                key={task.id}
                {...task}
                color={project.color}
                projectId={project.id}
              />
            );
          })
        ) : (
          <p className="text-lg font-semibold opacity-50">
            No tasks created so far.
          </p>
        )}
      </Layout>
    )
  );
}
