import { Log } from "@/types/Project.types";
import Icon from "../generic/Icon";
import Modal from "../generic/Modal";
import Image from "next/image";
import { getAvatar } from "@/utils/avatar";
import { Action, getAction } from "@/utils/log";

export default function Logs({ logs }: { logs: Log[] }) {
  const Trigger = (
    <Icon
      icon="ArrowClockwise"
      className="opacity-50 w-5 h-5 cursor-pointer transition-all focus:outline-none outline-none"
    />
  );

  const Content = (
    <div className="h-[30rem] scroll scrollbar-hide overflow-y-scroll">
      {logs.map((log, index) => {
        return (
          <Log
            key={log.date.toString()}
            log={log}
            last={index === logs.length - 1}
          />
        );
      })}
    </div>
  );

  return <Modal title="Logs" trigger={Trigger} content={Content} />;
}

function Log({ log, last }: { log: Log; last: boolean }) {
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
