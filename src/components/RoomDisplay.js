import { useContext } from "react";
import { RoomContext } from "../contexts/roomContext";

export function RoomDisplay() {
  const { room } = useContext(RoomContext);
if(room === 0){return <div></div>}
else{
  return (
    <div className="absolute top-0 right-0 text-white font-bold pt-36 pr-36">
      <div>Room: {room?.id}</div>
      <div>Users: </div>
      {room?.users.map((user, index) => (
        <div key={index}>{user.name}</div>
      ))}
    </div>
  );}
}
    