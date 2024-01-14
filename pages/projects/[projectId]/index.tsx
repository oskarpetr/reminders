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
import { sortTasksByDate } from "@/utils/date";
import Members from "@/components/modals/Members";
import EditProject from "@/components/modals/EditProject";
import Logs from "@/components/modals/Logs";
import { useEffect } from "react";

export default function Project() {
  // projects context
  const { projects } = useProjects();

  // router
  const router = useRouter();

  // project id
  let { projectId } = useParams() ?? { projectId: 1 };

  // router ready
  const routerReady = router.isReady;

  // find project
  const project = projects.find(
    (project) => project.id === parseInt(projectId as string)
  );

  return (
    routerReady &&
    project && (
      <Layout project={project}>
        <Headline
          text={project.name}
          action={<AddTask color={project.color} projectId={project.id} />}
          color={colorToHex(project.color)}
          element={
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-4">
                <Logs logs={project.logs} />
                <EditProject
                  name={project.name}
                  color={project.color}
                  icon={project.icon}
                  projectId={project.id}
                />
              </div>

              <Members members={project.members} projectId={project.id} />
            </div>
          }
        />

        {project.tasks.length !== 0 ? (
          sortTasksByDate(project.tasks).map((task) => {
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
