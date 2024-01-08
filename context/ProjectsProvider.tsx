import { Project } from "@/types/Project.types";
import axios from "axios";
import { useSession } from "next-auth/react";
import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface ProjectsContextType {
  projects: Project[];
  setProjects: Dispatch<SetStateAction<Project[]>>;
}

const ProjectsContext = createContext<ProjectsContextType>({
  projects: [],
  setProjects: () => {},
});

export default function ProjectsProvider({ children }: PropsWithChildren) {
  const [projects, setProjects] = useState<Project[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    async function fetchProjects() {
      const res = await axios.get("/api/projects", {
        headers: { Authorization: session?.user?.email },
      });
      const data: Project[] = res.data.data;

      let projs: Project[] = [];
      for (let proj of data) {
        const res = await axios.get(`/api/projects/${proj.id}`);
        projs.push(res.data.data);
      }

      setProjects(projs);
    }

    fetchProjects();
  }, []);

  return (
    <ProjectsContext.Provider
      value={{ projects: projects, setProjects: setProjects }}
    >
      {children}
    </ProjectsContext.Provider>
  );
}

export const useProjects = () => {
  return useContext(ProjectsContext);
};
