import Headline from "@/components/generic/Headline";
import Project from "../components/project/Project";
import Layout from "@/components/generic/Layout";
import { useProjects } from "@/context/ProjectsProvider";
import { getToken } from "next-auth/jwt";

export default function Home() {
  const { projects } = useProjects();

  return (
    <Layout project={undefined}>
      <Headline text="Reminders" />

      {projects.length !== 0 ? (
        <div className="flex flex-col gap-4 mt-8">
          <p className="text-lg font-semibold opacity-50">Recent projects</p>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 xl:gap-8">
            {projects.map((project) => {
              return <Project key={project.id} project={project} />;
            })}
          </div>
        </div>
      ) : (
        <p className="text-lg font-semibold opacity-50">
          No projects were found.
        </p>
      )}
    </Layout>
  );
}
