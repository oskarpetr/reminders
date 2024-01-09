import { cn } from "@/utils/cn";
import colorToHex from "@/utils/colors";
import icons from "@/utils/icons";
import { Dispatch, SetStateAction } from "react";
import Icon from "../generic/Icon";

export function SelectIcon({
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
            style={{ backgroundColor: colorToHex(selectedColor!) ?? "gray" }}
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
