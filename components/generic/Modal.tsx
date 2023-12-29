import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/Dialog";
import { ReactNode } from "react";

export default function Modal({
  trigger,
  content,
  title,
}: {
  trigger: ReactNode;
  content: ReactNode;
  title: string;
}) {
  return (
    <Dialog>
      <DialogTrigger>{trigger}</DialogTrigger>

      <DialogContent className="bg-transparent border-none p-0">
        <div className="bg-neutral-800 border border-gray-700 w-[35rem] px-12 py-8 rounded-xl">
          <h3 className="text-3xl font-bold mb-8">{title}</h3>

          {content}
        </div>
      </DialogContent>
    </Dialog>
  );
}
