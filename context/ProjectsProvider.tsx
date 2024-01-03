import projectsData from "@/test-data/projects-data";
import { Project } from "@/types/Project.types";
import axios from "axios";
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

  useEffect(() => {
    async function fetchProjects() {
      const res = await axios.get("/api/projects");
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
