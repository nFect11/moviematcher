import { useContext, useEffect, useState } from "react";
import { RoomContext } from "../contexts/roomContext";
import Scoreboard from "./scoreboard/Scoreboard";
import GenreContext from "./store/genre-context";



export function RoomDisplay() {
  const { room } = useContext(RoomContext);
  const genreCtx = useContext(GenreContext);

  const [username, changeUsername] = useState("");

  useEffect(() => {
    for (let i = 0; i < room?.users.length; i++) {
      if (genreCtx.userId === room?.users[i].id)
        changeUsername(room?.users[i].name);
    }
  }, [room?.users]);

  if (room === undefined) {
    return <div></div>;
  } else {
    return (
      <div className="absolute top-0 right-0 font-bold text-white">
          <div>Test</div>
        <div>Username: {username}</div>
        <div>Room: {room?.uniqueRoom}</div>
        <div>Users: </div>
        {room?.users.map((user, index) => (
          <div key={index}>{user.name}</div>
        ))}
        <Scoreboard />
      </div>
    );
  }
}
