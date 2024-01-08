import { cn } from "@/utils";
import { colors } from "@/utils/colors";
import { Dispatch, SetStateAction } from "react";
import Icon from "../generic/Icon";

export function SelectColor({
  selectedColor,
  setSelectedColor,
}: {
  selectedColor: string | undefined;
  setSelectedColor: Dispatch<SetStateAction<string | undefined>>;
}) {
  return (
    <div className="flex justify-between items-center gap-3">
      {Object.entries(colors).map((entry) => {
        return (
          <div
            key={entry[0]}
            onClick={() => setSelectedColor(entry[0])}
            style={{ backgroundColor: entry[1] }}
            className={cn(
              "w-10 h-10 rounded-full cursor-pointer flex items-center justify-center transition-all",
              selectedColor === entry[0]
                ? "border-[3px] border-white border-opacity-80"
                : null
            )}
          >
            <Icon
              icon="Check"
              className={cn(
                "text-xl transition-all",
                selectedColor === entry[0] ? "opacity-100" : "opacity-0"
              )}
            />
          </div>
        );
      })}
    </div>
  );
}
