import { useState } from "react";
import Icon from "../generic/Icon";
import Modal from "../project/Modal";
import { cn } from "@/utils/cn";
import { Member } from "@/types/Project.types";
import axios from "axios";
import { useProjects } from "@/context/ProjectsProvider";
import Image from "next/image";
import { getAvatar } from "@/utils/avatar";

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

  // add member
  const addMember = async () => {
    if (newMemberEmail === "") {
      setError("New member email cannot be empty.");
      return;
    }

    try {
      const res = await axios.post(`/api/projects/${projectId}/members`, {
        email: newMemberEmail,
      });

      const member = res.data.data;

      const projectsCopy = [...projects];
      const projectIndex = projects.findIndex(
        (project) => project.id === projectId
      );
      projectsCopy[projectIndex].members.push({
        id: member.id,
        email: member.email,
        name: member.name,
      });

      setProjects(projectsCopy);

      setError(undefined);
      setNewMember(false);
      setNewMemberEmail("");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        setError("This account does not exist.");
        return;
      }
    }
  };

  // remove member
  const removeMember = async (id: number) => {
    await axios.delete(`/api/projects/${projectId}/members`, {
      data: {
        accountId: id,
      },
    });

    const projectsCopy = [...projects];
    const projectIndex = projects.findIndex(
      (project) => project.id === projectId
    );
    const memberIndex = projectsCopy[projectIndex].members.findIndex(
      (member) => member.id === id
    );
    projectsCopy[projectIndex].members.splice(memberIndex, 1);

    setProjects(projectsCopy);
  };

  const Trigger = (
    <div className="flex items-center gap-3 cursor-pointer px-6 py-2 rounded-xl bg-white bg-opacity-5 transition-all select-none border border-white border-opacity-10">
      <p className="text-neutral-400 font-bold">
        {members.length > 1 ? "Shared with" : "Share project"}
      </p>

      {members.length > 1 ? (
        <div className="flex">
          {members.map((user, index) => {
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
              ></Image>
            );
          })}
        </div>
      ) : (
        <Icon icon="Export" className="opacity-50 text-lg" />
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
                <Image
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

              <Icon
                icon="Trash"
                className={cn(
                  "w-5 h-5 text-red-400 cursor-pointer transition-all",
                  userHover === index ? "opacity-100" : "opacity-0"
                )}
                onClick={() => removeMember(user.id)}
              />
            </div>

            {index !== members.length - 1 && (
              <div className="border border-white border-opacity-5 my-4"></div>
            )}
          </div>
        );
      })}

      {newMember && (
        <div className="flex flex-col gap-4 mt-4 border-t border-white border-opacity-10 pt-4">
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
              className="w-full py-2 rounded-xl transition-all flex items-center justify-center gap-2 bg-white text-black hover:bg-white hover:bg-opacity-80"
              onClick={addMember}
            >
              Invite
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const AddMember = (
    <button
      className="px-6 py-2 rounded-xl transition-all flex items-center gap-2 bg-white bg-opacity-10 hover:bg-white hover:bg-opacity-20"
      onClick={() => setNewMember(true)}
    >
      <Icon icon="Plus" className="text-xl opacity-80" />
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