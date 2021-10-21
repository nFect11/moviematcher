import { useContext } from "react";
import { RoomContext } from "../contexts/roomContext";

export function RoomDisplay() {
  const { room } = useContext(RoomContext);

  return (
    <div className="absolute top-0 right-0">
      <div>Room: {room?.id}</div>
      <div>Users: </div>
      {room?.users.map((user, index) => (
        <div key={index}>{user.name}</div>
      ))}
    </div>
  );
}
