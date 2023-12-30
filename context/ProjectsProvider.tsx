import projectsData from "@/test-data/projects-data";
import { Project } from "@/types/Project.types";
import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
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
  const [projects, setProjects] = useState(projectsData);

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
