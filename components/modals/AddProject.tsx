import Icon from "../generic/Icon";
import Modal from "../project/Modal";
import { FormEvent, useState } from "react";
import { useProjects } from "@/context/ProjectsProvider";
import { useRouter } from "next/navigation";
import { SelectIcon } from "../project/SelectIcon";
import { SelectColor } from "../project/SelectColor";
import { useQuery } from "@tanstack/react-query";
import { fetchCreateProject } from "@/utils/fetchers";
import { uiCreateProject } from "@/utils/ui-update";
import { toast } from "sonner";

export default function AddProject() {
  // projects context
  const { projects, setProjects } = useProjects();

  // router
  const router = useRouter();

  // fields states
  const [name, setName] = useState("");
  const [selectedColor, setSelectedColor] = useState<string>();
  const [selectedIcon, setSelectedIcon] = useState<string>();

  // error states
  const [errorName, setErrorName] = useState<string | undefined>();
  const [errorColor, setErrorColor] = useState<string | undefined>();
  const [errorIcon, setErrorIcon] = useState<string | undefined>();

  // modal state
  const [open, setOpen] = useState(false);

  // query
  const { refetch, isLoading } = useQuery({
    queryKey: ["add-project"],
    queryFn: () =>
      fetchCreateProject({ name, color: selectedColor!, icon: selectedIcon! }),
    enabled: false,
  });

  // create project
  const createProject = async (e: FormEvent) => {
    e.preventDefault();

    if (isLoading) return;

    if (name === "") {
      setErrorName("Project name cannot be empty.");
      return;
    }

    setErrorName(undefined);

    if (selectedColor === undefined) {
      setErrorColor("Select a project color.");
      return;
    }

    setErrorColor(undefined);

    if (selectedIcon === undefined) {
      setErrorIcon("Select a project icon.");
      return;
    }

    setErrorIcon(undefined);

    const res = await refetch();

    if (res.data) {
      const projectId = res.data.data.data.projectId;

      uiCreateProject({
        projects,
        setProjects,
        projectId,
        name,
        color: selectedColor,
        icon: selectedIcon,
      });

      setOpen(false);
      router.push(`/projects/${projectId}`);

      toast.success("Project has been created.");
    }
  };

  const Trigger = (
    <div className="px-6 py-3 rounded-xl transition-all flex items-center gap-2 hover:bg-white hover:bg-opacity-5">
      <Icon icon="Plus" className="text-xl opacity-50 text-white" />
      <p className="font-bold opacity-50">Add project</p>
    </div>
  );

  const Content = (
    <form className="flex flex-col gap-8" onSubmit={createProject}>
      <div className="flex flex-col gap-4">
        <p className="font-bold ">Project name</p>
        <input
          className="bg-white bg-opacity-10 border border-white border-opacity-10 rounded-xl px-6 py-2 focus:outline-none font-bold text-gray-300"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {errorName && <p className="text-red-400 font-bold">{errorName}</p>}
      </div>

      <div className="flex flex-col gap-4">
        <p className="font-bold">Project color</p>

        <SelectColor
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
        />

        {errorColor && <p className="text-red-400 font-bold">{errorColor}</p>}
      </div>

      <div className="flex flex-col gap-4">
        <p className="font-bold">Project icon</p>

        <SelectIcon
          selectedColor={selectedColor}
          selectedIcon={selectedIcon}
          setSelectedIcon={setSelectedIcon}
        />

        {errorIcon && <p className="text-red-400 font-bold">{errorIcon}</p>}
      </div>

      <button
        className="py-2 bg-neutral-600 disabled:bg-neutral-700 rounded-xl text-white mt-4 font-bold flex items-center gap-2 justify-center"
        type="submit"
        disabled={isLoading}
      >
        Create project
        {isLoading ? (
          <Icon icon="Spinner" className="animate-spin text-lg text-white" />
        ) : (
          <Icon icon="ArrowRight" className="text-white" />
        )}
      </button>
    </form>
  );

  return (
    <Modal
      title="Add project"
      trigger={Trigger}
      content={Content}
      open={open}
      setOpen={setOpen}
    />
  );
}
