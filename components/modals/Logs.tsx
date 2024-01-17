import { Log as LogType } from "@/types/Project.types";
import Icon from "../generic/Icon";
import Modal from "../generic/Modal";
import Log from "../generic/Log";
import Tooltip from "../generic/Tooltip";

export default function Logs({ logs }: { logs: LogType[] }) {
  const Trigger = (
    <Tooltip
      trigger={
        <Icon
          icon="ArrowClockwise"
          className="opacity-50 w-5 h-5 cursor-pointer transition-all focus:outline-none outline-none text-white"
        />
      }
      content="Logs"
      direction="bottom"
    />
  );

  const Content = (
    <div className="max-h-[30rem] scroll scrollbar-hide overflow-y-scroll">
      {logs.length > 0 ? (
        logs.map((log, index) => {
          return (
            <Log
              key={log.date.toString()}
              log={log}
              last={index === logs.length - 1}
            />
          );
        })
      ) : (
        <p className="text-lg font-semibold opacity-50">
          No logs recorded so far.
        </p>
      )}
    </div>
  );

  return <Modal title="Logs" trigger={Trigger} content={Content} />;
}
