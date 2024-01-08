import Icon from "../generic/Icon";
import Modal from "../project/Modal";
import { FormEvent, useState } from "react";
import { useProjects } from "@/context/ProjectsProvider";
import axios from "axios";
import { SelectIcon } from "../project/SelectIcon";
import { SelectColor } from "../project/SelectColor";
import DeleteProject from "./DeleteProject";

export default function EditProject({
  name,
  color,
  icon,
  projectId,
}: {
  name: string;
  color: string;
  icon: string;
  projectId: number;
}) {
  // projects context
  const { projects, setProjects } = useProjects();

  // edit project
  const editProject = async (e: FormEvent) => {
    e.preventDefault();

    if (editName === "") {
      setErrorName("Project name cannot be empty.");
      return;
    }

    setErrorName(undefined);

    if (editSelectedColor === undefined) {
      setErrorColor("Select a project color.");
      return;
    }

    setErrorColor(undefined);

    if (editSelectedIcon === undefined) {
      setErrorIcon("Select a project icon.");
      return;
    }

    setErrorIcon(undefined);

    const res = await axios.patch(`/api/projects/${projectId}`, {
      name: editName,
      color: editSelectedColor,
      icon: editSelectedIcon,
    });

    const projectsCopy = [...projects];
    const projectIndex = projectsCopy.findIndex(
      (project) => project.id === projectId
    );

    projectsCopy[projectIndex].name = editName;
    projectsCopy[projectIndex].color = editSelectedColor;
    projectsCopy[projectIndex].icon = editSelectedIcon;

    setProjects(projectsCopy);
    setOpen(false);
  };

  const Trigger = (
    <Icon
      icon="GearSix"
      className="opacity-50 w-5 h-5 cursor-pointer transition-all focus:outline-none outline-none"
    />
  );

  // edit fields states
  const [editName, setEditName] = useState(name);
  const [editSelectedColor, setEditSelectedColor] = useState<
    string | undefined
  >(color);
  const [editSelectedIcon, setEditSelectedIcon] = useState<string | undefined>(
    icon
  );

  // error states
  const [errorName, setErrorName] = useState<string | undefined>();
  const [errorColor, setErrorColor] = useState<string | undefined>();
  const [errorIcon, setErrorIcon] = useState<string | undefined>();

  // modal state
  const [open, setOpen] = useState(false);

  const Content = (
    <form className="flex flex-col gap-8" onSubmit={editProject}>
      <div className="flex flex-col gap-4">
        <p className="font-bold ">Project name</p>
        <input
          className="bg-white bg-opacity-10 border border-white border-opacity-10 rounded-xl px-6 py-2 focus:outline-none font-bold text-gray-300"
          placeholder="Enter name"
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
        />

        {errorName && <p className="text-red-400 font-bold">{errorName}</p>}
      </div>

      <div className="flex flex-col gap-4">
        <p className="font-bold">Project color</p>

        <SelectColor
          selectedColor={editSelectedColor}
          setSelectedColor={setEditSelectedColor}
        />

        {errorColor && <p className="text-red-400 font-bold">{errorColor}</p>}
      </div>

      <div className="flex flex-col gap-4">
        <p className="font-bold">Project icon</p>

        <SelectIcon
          selectedColor={editSelectedColor}
          selectedIcon={editSelectedIcon}
          setSelectedIcon={setEditSelectedIcon}
        />

        {errorIcon && <p className="text-red-400 font-bold">{errorIcon}</p>}
      </div>

      <button
        className="py-2 bg-neutral-600 rounded-xl text-white mt-4 font-bold flex items-center gap-2 justify-center"
        type="submit"
      >
        Edit project
        <Icon icon="ArrowRight" />
      </button>
    </form>
  );

  return (
    <Modal
      title="Settings"
      action={<DeleteProject name={name} projectId={projectId} />}
      trigger={Trigger}
      content={Content}
      open={open}
      setOpen={setOpen}
    />
  );
}
