import { useContext } from "react";
import { RoomContext } from "../contexts/roomContext";

export default function RoomDisplay() {
  const { room } = useContext(RoomContext);

  if (room === undefined) {
    return <div></div>;
  } else {
    return (
      <div>
        <div className="w-full text-center text-white">
          <span className="text-3xl">Room</span>
        </div>
        <div className="w-1/2 text-center text-white mx-auto">
          <div className="border-4 rounded-md text-4xl mt-4 py-2">
            {room?.uniqueRoom}
          </div>
        </div>
      </div>
    );
  }
}
