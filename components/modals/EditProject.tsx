import Icon from "../generic/Icon";
import Modal from "../project/Modal";
import { FormEvent, useState } from "react";
import { useProjects } from "@/context/ProjectsProvider";
import axios from "axios";
import { SelectIcon } from "../project/SelectIcon";
import { SelectColor } from "../project/SelectColor";
import DeleteProject from "./DeleteProject";
import { useQuery } from "@tanstack/react-query";
import { fetchEditProject } from "@/utils/fetchers";
import { uiEditProject } from "@/utils/ui-update";

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

  // query
  const { refetch, isLoading } = useQuery({
    queryKey: ["edit-project"],
    queryFn: () =>
      fetchEditProject({
        projectId,
        editName,
        editSelectedColor: editSelectedColor!,
        editSelectedIcon: editSelectedIcon!,
      }),
    enabled: false,
  });

  // edit project
  const editProject = async (e: FormEvent) => {
    e.preventDefault();

    if (isLoading) return;

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

    await refetch();

    uiEditProject({
      projects,
      setProjects,
      projectId,
      editName,
      editSelectedColor,
      editSelectedIcon,
    });

    setOpen(false);
  };

  const Trigger = (
    <Icon
      icon="GearSix"
      className="opacity-50 w-5 h-5 cursor-pointer transition-all focus:outline-none outline-none"
    />
  );

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
        className="py-2 bg-neutral-600 disabled:bg-neutral-700 rounded-xl text-white mt-4 font-bold flex items-center gap-2 justify-center"
        disabled={isLoading}
        type="submit"
      >
        Edit project
        {isLoading ? (
          <Icon icon="Spinner" className="animate-spin text-lg" />
        ) : (
          <Icon icon="ArrowRight" />
        )}
      </button>
    </form>
  );

  return (
    <Modal
      title="Edit project"
      action={<DeleteProject name={name} projectId={projectId} />}
      trigger={Trigger}
      content={Content}
      open={open}
      setOpen={setOpen}
    />
  );
}
