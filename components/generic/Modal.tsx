import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/Dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { ReactNode } from "react";
import Icon from "./Icon";

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
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-bold">{title}</h3>
            <DialogClose asChild>
              <Icon icon="X" className="text-xl cursor-pointer" />
            </DialogClose>
          </div>

          {content}
        </div>
      </DialogContent>
    </Dialog>
  );
}
