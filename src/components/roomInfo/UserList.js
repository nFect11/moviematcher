import { useContext } from "react";
import { RoomContext } from "../../contexts/roomContext";

export default function UserList() {
  const { room } = useContext(RoomContext);

  return (
    <div>
      <div className="w-full text-center text-white">
        <span className="text-3xl font-bolds">Users</span>
      </div>
      <div className="w-full text-2xl pt-4 text-white pl-12">
        <ul className="list-disc">
          {room !== 0 &&
            room?.users.map((user, index) => <li key={index}>{user.name}</li>)}
        </ul>
      </div>
    </div>
  );
}
