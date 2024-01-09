import Headline from "@/components/generic/Headline";
import Project from "../components/project/Project";
import Layout from "@/components/generic/Layout";
import { useProjects } from "@/context/ProjectsProvider";
import Skeleton from "react-loading-skeleton";

export default function Home() {
  // projects context
  const { projects, loading } = useProjects();

  return (
    <Layout project={undefined}>
      <Headline text="Reminders" />

      {loading || (!loading && projects.length === 0) ? (
        <div className="flex flex-col gap-4 mt-8">
          <p className="text-lg font-semibold opacity-50">Recent projects</p>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {new Array(3).fill(null).map((_) => {
              return (
                <div
                  key={Math.random()}
                  className="py-5 px-8 flex justify-between items-center bg-white bg-opacity-5 rounded-2xl border border-white border-opacity-10"
                >
                  <div className="flex gap-4 items-center">
                    <Skeleton width={40} height={40} circle />

                    <div className="flex flex-col">
                      <Skeleton height={24} borderRadius={8} width={192} />
                      <Skeleton height={20} borderRadius={8} width={96} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <>
          {projects.length !== 0 ? (
            <div className="flex flex-col gap-4 mt-8">
              <p className="text-lg font-semibold opacity-50">
                Recent projects
              </p>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
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
        </>
      )}
    </Layout>
  );
}
