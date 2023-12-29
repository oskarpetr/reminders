import { useState } from "react";
import Icon from "../generic/Icon";
import Modal from "../generic/Modal";
import { cn } from "@/utils/cn";

export default function Users({ users }: { users: any[] }) {
  const [userHover, setUserHover] = useState<number>();

  const removeUser = () => {};

  const Trigger = (
    <div className="flex items-center gap-4 cursor-pointer px-6 py-3 rounded-lg hover:bg-white hover:bg-opacity-[3%] transition-all select-none">
      <p className="text-gray-500 font-bold">Shared with</p>

      <div className="flex">
        {users.map((user, index) => {
          return (
            <div
              key={user}
              className="w-8 h-8 bg-neutral-700 rounded-full border border-white border-opacity-10"
              style={{
                marginRight: index !== users.length - 1 ? "-10px" : "0px",
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );

  const Content = (
    <div>
      {users.map((user, index) => {
        return (
          <div key={user}>
            <div
              onMouseEnter={() => setUserHover(index)}
              onMouseLeave={() => setUserHover(undefined)}
              className="flex justify-between items-center"
            >
              <div className="flex gap-4 items-center">
                <div className="w-11 h-11 bg-neutral-700 rounded-full border border-white border-opacity-10"></div>

                <div>
                  <p className="text-lg font-bold">Full name</p>
                  <p className="text-gray-500 font-bold mt-[-4px]">
                    fullname@company.com
                  </p>
                </div>
              </div>

              <Icon
                icon="Trash"
                className={cn(
                  "w-5 h-5 text-red-400 cursor-pointer transition-all",
                  userHover === index ? "opacity-100" : "opacity-0"
                )}
                onClick={removeUser}
              />
            </div>

            {index !== users.length - 1 && (
              <div className="border border-white border-opacity-5 my-4"></div>
            )}
          </div>
        );
      })}
    </div>
  );

  return <Modal trigger={Trigger} content={Content} title="Users" />;
}
