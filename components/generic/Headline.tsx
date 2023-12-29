import { ReactNode } from "react";

export default function Headline({
  text,
  icon,
  color = "white",
  element,
}: {
  text: string;
  icon?: ReactNode;
  color?: string;
  element?: ReactNode;
}) {
  return (
    <div className="mb-8 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <h1
          className="text-white font-black text-4xl tracking-wide"
          style={{ color: color }}
        >
          {text}
        </h1>

        {icon && icon}
      </div>

      {element && element}
    </div>
  );
}
