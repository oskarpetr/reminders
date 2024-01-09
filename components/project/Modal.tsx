import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { Dispatch, ReactNode, SetStateAction } from "react";
import Icon from "../generic/Icon";
import Headline from "../generic/Headline";

export default function Modal({
  trigger,
  content,
  title,
  action,
  onClose,
  open,
  setOpen,
}: {
  trigger: ReactNode;
  content: ReactNode;
  title: string;
  action?: ReactNode;
  onClose?: () => void;
  open?: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <Dialog
      onOpenChange={setOpen ? setOpen : (open) => !open && onClose && onClose()}
      open={open && open}
    >
      <DialogTrigger>{trigger}</DialogTrigger>

      <DialogContent className="bg-transparent border-none p-0">
        <div className="bg-neutral-800 border border-gray-700 w-[35rem] px-12 py-8 rounded-xl">
          <div className="flex items-center justify-between mb-8">
            <Headline text={title} action={action} size="h2" margin={false} />
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
