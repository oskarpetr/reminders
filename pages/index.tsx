import Headline from "@/components/generic/Headline";
import Project from "../components/Project";
import Layout from "@/components/generic/Layout";
import projects from "@/test-data/projects-data";
// import dbConnection from "@/utils/db";

export default function Home() {
  // const query = async () => {
  //   dbConnection.query("SELECT * FROM USER", (error, results) => {
  //     if (error) throw error;
  //     console.log(results);
  //   });
  // };

  return (
    <Layout project={undefined}>
      <Headline text="Reminders" />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {projects.map((project) => {
          return <Project key={project.id} project={project} />;
        })}
      </div>
    </Layout>
  );
}
