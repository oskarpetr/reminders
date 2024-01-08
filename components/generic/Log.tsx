import { Log } from "@/types/Project.types";
import { getAvatar } from "@/utils/avatar";
import { Action, getAction } from "@/utils/log";
import Image from "next/image";

export default function Log({ log, last }: { log: Log; last: boolean }) {
  return (
    <div>
      <div key={log.date.toString()} className="flex gap-4 items-center">
        <Image
          src={getAvatar(log.account_id)}
          alt="Avatar"
          width={48}
          height={48}
          className="w-12 h-12 rounded-full"
          style={{ objectFit: "cover" }}
        />

        <div>
          <p className="font-bold opacity-50 text-sm">
            {new Date(log.date).toLocaleString()}
          </p>
          <p className="tracking-wide">
            <span className="font-bold">{log.account}</span>{" "}
            <span className="opacity-75">
              {getAction(log.action as Action)}
            </span>{" "}
            <span className="font-bold">&quot;{log.task}&quot;</span>.
          </p>
        </div>
      </div>

      {!last && (
        <div className="border border-white border-opacity-5 my-4"></div>
      )}
    </div>
  );
}
