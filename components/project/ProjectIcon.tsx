import colorToHex from "@/utils/colors";
import Icon from "../generic/Icon";

export default function ProjectIcon({
  color,
  icon,
}: {
  color: string;
  icon: string;
}) {
  return (
    <div
      className="h-10 w-10 rounded-full flex justify-center items-center"
      style={{ backgroundColor: colorToHex(color) }}
    >
      <Icon icon={icon} className="text-white text-xl" />
    </div>
  );
}
