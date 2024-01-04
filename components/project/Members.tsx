import { useState } from "react";
import Icon from "../generic/Icon";
import Modal from "../generic/Modal";
import { cn } from "@/utils/cn";
import { Member } from "@/types/Project.types";

export default function Members({ members }: { members: Member[] }) {
  const [userHover, setUserHover] = useState<number>();

  const addMember = () => {};

  const removeMember = () => {};

  console.log(members);

  const Trigger = (
    <div className="flex items-center gap-3 cursor-pointer px-6 py-3 rounded-xl bg-white bg-opacity-5 transition-all select-none border border-white border-opacity-10">
      <p className="text-neutral-400 font-bold">
        {members.length > 0 ? "Shared with" : "Share project"}
      </p>

      {members.length > 0 ? (
        <div className="flex">
          {members.map((user, index) => {
            return (
              <div
                key={user.id}
                className="w-8 h-8 bg-neutral-700 rounded-full border border-white border-opacity-10"
                style={{
                  marginRight: index !== members.length - 1 ? "-10px" : "0px",
                }}
              ></div>
            );
          })}
        </div>
      ) : (
        <Icon icon="Export" className="opacity-50" />
      )}
    </div>
  );

  const Content = (
    <div>
      {members.map((user, index) => {
        return (
          <div key={user.id}>
            <div
              onMouseEnter={() => setUserHover(index)}
              onMouseLeave={() => setUserHover(undefined)}
              className="flex justify-between items-center"
            >
              <div className="flex gap-4 items-center">
                <div className="w-11 h-11 bg-neutral-700 rounded-full border border-white border-opacity-10"></div>

                <div>
                  <p className="text-lg font-bold">{user.name}</p>
                  <p className="text-gray-500 font-bold mt-[-4px]">
                    {user.email}
                  </p>
                </div>
              </div>

              <Icon
                icon="Trash"
                className={cn(
                  "w-5 h-5 text-red-400 cursor-pointer transition-all",
                  userHover === index ? "opacity-100" : "opacity-0"
                )}
                onClick={removeMember}
              />
            </div>

            {index !== members.length - 1 && (
              <div className="border border-white border-opacity-5 my-4"></div>
            )}
          </div>
        );
      })}
    </div>
  );

  return <Modal trigger={Trigger} content={Content} title="Users" />;
}
