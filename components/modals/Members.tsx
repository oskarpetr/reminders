import { FormEvent, useState } from "react";
import Icon from "../generic/Icon";
import Modal from "../generic/Modal";
import { cn } from "@/utils/cn";
import { Member } from "@/types/Project.types";
import axios from "axios";
import { useProjects } from "@/context/ProjectsProvider";
import { getAvatar } from "@/utils/avatar";
import { useQuery } from "@tanstack/react-query";
import { fetchCreateMember, fetchDeleteMember } from "@/utils/fetchers";
import { uiCreateMember, uiDeleteMember } from "@/utils/ui-update";
import { toast } from "sonner";
import MemberList from "../project/MemberList";

export default function Members({
  members,
  projectId,
}: {
  members: Member[];
  projectId: number;
}) {
  // projects context
  const { projects, setProjects } = useProjects();

  // user hover state
  const [userHover, setUserHover] = useState<number>();

  // edit fields state
  const [newMember, setNewMember] = useState(false);
  const [newMemberEmail, setNewMemberEmail] = useState("");

  // error states
  const [error, setError] = useState<string | undefined>();

  // query
  const createMemberQuery = useQuery({
    queryKey: ["create-member"],
    queryFn: () =>
      fetchCreateMember({
        projectId,
        newMemberEmail,
      }),
    enabled: false,
  });

  // query
  const deleteMemberQuery = useQuery({
    queryKey: ["delete-member"],
    queryFn: () =>
      fetchDeleteMember({
        projectId,
        id: userHover!,
      }),
    enabled: false,
  });

  // create member
  const createMember = async (e: FormEvent) => {
    e.preventDefault();

    if (createMemberQuery.isLoading) return;

    if (newMemberEmail === "") {
      setError("New member email cannot be empty.");
      return;
    }

    const emailDuplicate = members.some(
      (member) => member.email === newMemberEmail
    );

    if (emailDuplicate) {
      setError("Member already exists.");
      return;
    }

    const res = await createMemberQuery.refetch();

    if (res.isError) {
      toast.error("An error has occured.");
      return;
    }

    if (axios.isAxiosError(error) && error.response?.status === 404) {
      setError("This account does not exist.");
      return;
    }

    const member = res.data?.data.data;
    uiCreateMember({ projects, setProjects, projectId, member });

    setError(undefined);
    setNewMember(false);
    setNewMemberEmail("");

    toast.success("Member has been added.");
  };

  // delete member
  const deleteMember = async () => {
    const res = await deleteMemberQuery.refetch();

    if (res.isError) {
      toast.error("An error has occured.");
      return;
    }

    uiDeleteMember({ projects, setProjects, projectId, id: userHover! });

    toast.success("Member has been removed.");
  };

  const Trigger = (
    <div className="flex items-center gap-3 cursor-pointer px-6 py-2 rounded-xl bg-white bg-opacity-5 transition-all select-none border border-white border-opacity-10">
      <p className="text-neutral-400 font-bold">
        {members.length > 1 ? "Shared with" : "Share project"}
      </p>

      {members.length === 1 && (
        <Icon icon="Export" className="opacity-50 text-lg text-white" />
      )}
      <MemberList members={members} />
    </div>
  );

  const Content = (
    <div>
      {members.map((user, index) => {
        return (
          <div key={user.id}>
            <div
              onMouseEnter={() => setUserHover(user.id)}
              onMouseLeave={() => setUserHover(undefined)}
              className="flex justify-between items-center"
            >
              <div className="flex gap-4 items-center">
                <img
                  src={getAvatar(user.id)}
                  alt={user.name}
                  height={48}
                  width={48}
                  className="w-12 h-12 rounded-full border border-white border-opacity-10"
                  style={{ objectFit: "cover" }}
                />

                <div>
                  <p className="text-lg font-bold">{user.name}</p>
                  <p className="text-gray-500 font-bold mt-[-4px]">
                    {user.email}
                  </p>
                </div>
              </div>

              {deleteMemberQuery.isLoading ? (
                <Icon
                  icon="Spinner"
                  className="animate-spin text-lg text-white"
                />
              ) : (
                <Icon
                  icon="Trash"
                  className={cn(
                    "w-5 h-5 cursor-pointer transition-all text-white",
                    userHover === user.id ? "opacity-100" : "opacity-0"
                  )}
                  onClick={deleteMember}
                />
              )}
            </div>

            {index !== members.length - 1 && (
              <div className="border border-white border-opacity-5 my-4"></div>
            )}
          </div>
        );
      })}

      {newMember && (
        <form
          className="flex flex-col gap-4 mt-4 border-t border-white border-opacity-10 pt-4"
          onSubmit={createMember}
        >
          <p className="font-bold">New member</p>
          <input
            className="bg-white bg-opacity-10 border border-white border-opacity-10 rounded-xl px-6 py-2 focus:outline-none font-bold text-gray-300"
            placeholder="Enter email"
            type="email"
            value={newMemberEmail}
            onChange={(e) => setNewMemberEmail(e.target.value)}
          />

          {error && <p className="text-red-400 font-bold mb-4">{error}</p>}

          <div className="flex gap-4">
            <button
              className="w-full py-2 rounded-xl transition-all flex items-center justify-center gap-2 bg-white bg-opacity-10 hover:bg-white hover:bg-opacity-20"
              onClick={() => setNewMember(false)}
            >
              Cancel
            </button>

            <button
              className="w-full disabled:bg-opacity-80 py-2 rounded-xl transition-all flex items-center justify-center gap-2 bg-primary hover:bg-opacity-80"
              disabled={createMemberQuery.isLoading}
              type="submit"
            >
              Invite
              {createMemberQuery.isLoading ? (
                <Icon
                  icon="Spinner"
                  className="animate-spin text-lg text-white"
                />
              ) : (
                <Icon icon="ArrowRight" className="text-white" />
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );

  const AddMember = (
    <button
      className="px-6 py-2 rounded-xl transition-all flex items-center gap-2 bg-white bg-opacity-10 hover:bg-white hover:bg-opacity-20"
      onClick={() => setNewMember(true)}
    >
      <Icon icon="Plus" className="text-xl opacity-80 text-white" />
      <p className="font-bold">Add</p>
    </button>
  );

  return (
    <Modal
      trigger={Trigger}
      content={Content}
      title="Members"
      action={AddMember}
      onClose={() => {
        setNewMember(false);
        setError(undefined);
      }}
    />
  );
}
