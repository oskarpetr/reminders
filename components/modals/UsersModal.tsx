// import { Dispatch, SetStateAction, useState } from "react";
// import Dialog from "../ui/Dialog";
// import Icon from "../generic/Icon";

// export default function UsersModal({
//   users,
//   usersModal,
//   setUsersModal,
// }: {
//   users: any[];
//   usersModal: boolean;
//   setUsersModal: Dispatch<SetStateAction<boolean>>;
// }) {
//   const [userHover, setUserHover] = useState<number>();

//   const removeUser = () => {};

//   return (
//     <Modal isOpen={usersModal} setOpen={setUsersModal} title="Users">
//       <div>
//         {users.map((user, index) => {
//           return (
//             <div
//               key={user}
//               onMouseEnter={() => setUserHover(index)}
//               onMouseLeave={() => setUserHover(undefined)}
//             >
//               <div className="flex justify-between items-center">
//                 <div className="flex gap-4 items-center">
//                   <div className="w-11 h-11 bg-neutral-700 rounded-full border border-white border-opacity-10"></div>

//                   <div>
//                     <p className="text-lg font-semibold">Full name</p>
//                     <p className="text-gray-500 font-bold mt-[-4px]">
//                       fullname@company.com
//                     </p>
//                   </div>
//                 </div>

//                 {userHover === index && (
//                   <Icon
//                     icon="X"
//                     className="w-5 h-5 cursor-pointer"
//                     onClick={removeUser}
//                   />
//                 )}
//               </div>

//               {index !== users.length - 1 && (
//                 <div className="border border-white border-opacity-5 my-4"></div>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </Modal>
//   );
// }
