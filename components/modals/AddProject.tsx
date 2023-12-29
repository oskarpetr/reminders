import { colors } from "@/utils/colors";
import Icon from "../generic/Icon";
import Modal from "../generic/Modal";
import { Dispatch, SetStateAction, useState } from "react";
import { cn } from "@/utils";
import icons from "@/utils/icons";
import { DialogClose } from "../ui/Dialog";

export default function AddProject() {
  const createProject = () => {};

  const Trigger = (
    <div className="px-6 py-3 rounded-xl transition-all flex items-center gap-2 hover:bg-white hover:bg-opacity-5 cursor-pointer">
      <Icon icon="Plus" className="text-xl opacity-50" />
      <p className="font-bold opacity-50">Add project</p>
    </div>
  );

  const [name, setName] = useState("");
  const [selectedColor, setSelectedColor] = useState<string>();
  const [selectedIcon, setSelectedIcon] = useState<string>();

  const Content = (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <p className="font-bold ">Project name</p>
        <input
          className="bg-white bg-opacity-10 border border-white border-opacity-10 rounded-xl px-6 py-2 focus:outline-none font-bold text-gray-300"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-4">
        <p className="font-bold">Project color</p>

        <SelectColor
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
        />
      </div>

      <div className="flex flex-col gap-4">
        <p className="font-bold">Project icon</p>

        <SelectIcon
          selectedColor={selectedColor}
          selectedIcon={selectedIcon}
          setSelectedIcon={setSelectedIcon}
        />
      </div>

      <DialogClose asChild>
        <button
          className="py-2 bg-neutral-600 rounded-xl text-white mt-4 font-bold flex items-center gap-2 justify-center"
          onClick={createProject}
          type="submit"
        >
          Create project
          <Icon icon="ArrowRight" />
        </button>
      </DialogClose>
    </div>
  );

  return <Modal title="Add project" trigger={Trigger} content={Content} />;
}

function SelectColor({
  selectedColor,
  setSelectedColor,
}: {
  selectedColor: string | undefined;
  setSelectedColor: Dispatch<SetStateAction<string | undefined>>;
}) {
  return (
    <div className="flex justify-between items-center gap-3">
      {Object.values(colors).map((color) => {
        return (
          <div
            key={color}
            onClick={() => setSelectedColor(color)}
            style={{ backgroundColor: color }}
            className={cn(
              "w-10 h-10 rounded-full cursor-pointer flex items-center justify-center transition-all",
              selectedColor === color
                ? "border-[3px] border-white border-opacity-80"
                : null
            )}
          >
            <Icon
              icon="Check"
              className={cn(
                "text-xl transition-all",
                selectedColor === color ? "opacity-100" : "opacity-0"
              )}
            />
          </div>
        );
      })}
    </div>
  );
}

function SelectIcon({
  selectedIcon,
  setSelectedIcon,
  selectedColor,
}: {
  selectedIcon: string | undefined;
  setSelectedIcon: Dispatch<SetStateAction<string | undefined>>;
  selectedColor: string | undefined;
}) {
  return (
    <div className="flex justify-between items-center flex-wrap gap-3">
      {Object.values(icons).map((icon) => {
        return (
          <div
            key={icon}
            onClick={() => setSelectedIcon(icon)}
            style={{ backgroundColor: selectedColor ?? "gray" }}
            className={cn(
              "w-10 h-10 rounded-full cursor-pointer flex items-center justify-center transition-all",
              selectedIcon === icon
                ? "border-[3px] border-white border-opacity-80"
                : null
            )}
          >
            <Icon icon={icon} className="text-xl" />
          </div>
        );
      })}
    </div>
  );
}
