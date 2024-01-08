import { Log as LogType } from "@/types/Project.types";
import Icon from "../generic/Icon";
import Modal from "../project/Modal";
import Log from "../generic/Log";

export default function Logs({ logs }: { logs: LogType[] }) {
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
