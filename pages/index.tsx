import Headline from "@/components/generic/Headline";
import Project from "../components/project/Project";
import Layout from "@/components/generic/Layout";
import { useProjects } from "@/context/ProjectsProvider";
// import dbConnection from "@/utils/db";
import sql from "mssql";
import { useEffect } from "react";

export default function Home() {
  // const query = async () => {
  //   await sql.connect(
  //     "Server=localhost,1433;Database=Reminders;User Id=SA;Password=Heslo1234.;Encrypt=true"
  //   );
  //   const result = await sql.query`select * from [Project]`;

  //   console.log(result);
  // };

  // useEffect(() => {
  //   query();
  // }, []);

  const { projects } = useProjects();

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
