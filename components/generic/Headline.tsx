import { cn } from "@/utils/cn";
import { ReactNode } from "react";

export default function Headline({
  text,
  action,
  color = "white",
  element,
  size = "h1",
  margin = true,
}: {
  text: string;
  action?: ReactNode;
  color?: string;
  element?: ReactNode;
  size?: "h1" | "h2";
  margin?: boolean;
}) {
  return (
    <div
      className={cn("flex justify-between items-center", margin ? "mb-8" : "")}
    >
      <div className="flex items-center gap-8">
        {size === "h1" && (
          <h1
            className="text-white font-black text-4xl tracking-wide"
            style={{ color: color }}
          >
            {text}
          </h1>
        )}

        {size === "h2" && (
          <h1
            className="text-white font-bold text-3xl tracking-wide"
            style={{ color: color }}
          >
            {text}
          </h1>
        )}

        {action && action}
      </div>

      {element && element}
    </div>
  );
}
