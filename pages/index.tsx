import Headline from "@/components/generic/Headline";
import Project from "../components/project/Project";
import Layout from "@/components/generic/Layout";
import { useProjects } from "@/context/ProjectsProvider";
import SkeletonProjects from "@/components/skeleton/SkeletonProjects";

export default function Home() {
  // projects context
  const { projects, loading } = useProjects();

  let tasksCompleted = 0;
  let tasksDue = 0;
  let missedDeadlineTasks = 0;

  projects.forEach((project) => {
    project.tasks.forEach((task) => {
      if (task.done) {
        tasksCompleted++;
      } else {
        tasksDue++;
      }

      if (new Date(task.due).getTime() < new Date().getTime() && !task.done) {
        missedDeadlineTasks++;
      }
    });
  });

  const widgets = [
    {
      title: "Tasks completed",
      value: tasksCompleted,
    },
    {
      title: "Tasks still due",
      value: tasksDue,
    },
    {
      title: "Missed deadlines",
      value: missedDeadlineTasks,
    },
  ];

  return (
    <Layout project={undefined}>
      <Headline text="Reminders" />

      {loading ? (
        <div className="flex flex-col gap-4 mt-8">
          <p className="text-lg font-semibold opacity-50">Recent projects</p>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <SkeletonProjects />
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-16">
          <div className="flex flex-col gap-4 mt-8">
            <p className="text-lg font-semibold opacity-50">Recent projects</p>

            {projects.length !== 0 ? (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {projects.map((project) => {
                  return <Project key={project.id} project={project} />;
                })}
              </div>
            ) : (
              <p className="font-semibold opacity-30">
                No projects were found.
              </p>
            )}
          </div>

          <div className="flex flex-col gap-4 mt-8">
            <p className="text-lg font-semibold opacity-50">Widgets</p>

            <div className="flex gap-6">
              {widgets.map((widget) => {
                return (
                  <div
                    key={widget.title}
                    className="bg-white bg-opacity-10 w-40 h-40 flex flex-col justify-between rounded-2xl border-white border border-opacity-10 p-6"
                  >
                    <p className="font-bold opacity-80">{widget.title}</p>
                    <p className="font-bold text-4xl">{widget.value} </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
