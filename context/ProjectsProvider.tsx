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

// projects context type
interface ProjectsContextType {
  projects: Project[];
  setProjects: Dispatch<SetStateAction<Project[]>>;
  loading: boolean;
}

// projects context
const ProjectsContext = createContext<ProjectsContextType>({
  projects: [],
  setProjects: () => {},
  loading: true,
});

// fetch projects
async function fetchProjects(email: string) {
  const res = await axios.get("/api/projects", {
    headers: { Authorization: email },
  });

  const data: Project[] = res.data.data;

  let projects: Project[] = [];
  for (let project of data) {
    const res = await axios.get(`/api/projects/${project.id}`);
    projects.push(res.data.data);
  }

  return projects;
}

// projects provider
export default function ProjectsProvider({ children }: PropsWithChildren) {
  const [tempProjects, setTempProjects] = useState<Project[] | undefined>();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();

  useEffect(() => {
    async function getProjects(email: string) {
      const projects = await fetchProjects(email);
      setTempProjects(projects);
    }

    if (status === "authenticated" && loading === true) {
      getProjects(session?.user.email!);

      if (tempProjects !== undefined) {
        setProjects(tempProjects);
        setLoading(false);
      }
    }
  }, [status, tempProjects]);

  return (
    <ProjectsContext.Provider value={{ projects, setProjects, loading }}>
      {children}
    </ProjectsContext.Provider>
  );
}

// use projects hook
export const useProjects = () => {
  return useContext(ProjectsContext);
};
