import { ReactNode } from "react";
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Tooltip as TooltipUI,
} from "../ui/tooltip";

export default function Tooltip({
  trigger,
  content,
  direction,
}: {
  trigger: ReactNode;
  content: string;
  direction: "top" | "bottom" | "left" | "right";
}) {
  return (
    <TooltipProvider>
      <TooltipUI delayDuration={200}>
        <TooltipTrigger>{trigger}</TooltipTrigger>
        <TooltipContent
          side={direction}
          className="bg-neutral-800 border border-white border-opacity-10 m-2 rounded-xl py-2"
        >
          <p className="font-bold opacity-80">{content}</p>
        </TooltipContent>
      </TooltipUI>
    </TooltipProvider>
  );
}
