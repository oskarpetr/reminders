import { Member } from "@/types/Project.types";
import { getAvatar } from "@/utils/avatar";
import Image from "next/image";

export default function MemberList({ members }: { members: Member[] }) {
  return (
    members.length > 1 && (
      <div className="flex items-center">
        {members.slice(0, 3).map((user, index) => {
          return (
            <Image
              key={user.id}
              alt={user.name}
              className="h-6 w-6 rounded-full border border-white border-opacity-10"
              width={24}
              height={24}
              src={getAvatar(user.id)}
              style={{
                marginRight: index !== members.length - 1 ? "-5px" : "0px",
                objectFit: "cover",
              }}
            />
          );
        })}

        {members.length - 3 > 0 && (
          <p className="font-bold text-[12px] h-6 w-8 flex justify-center items-center rounded-full bg-neutral-700 border-white border border-opacity-20">
            +{members.length - 3}
          </p>
        )}
      </div>
    )
  );
}
