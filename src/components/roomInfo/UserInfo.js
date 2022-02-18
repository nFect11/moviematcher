import { useState, useContext, useEffect } from "react";
import GenreContext from "../store/genre-context";
import { RoomContext } from "../../contexts/roomContext";

export default function UserInfo() {
  const genreCtx = useContext(GenreContext);

  const { room } = useContext(RoomContext);
  const [username, changeUsername] = useState("");

  useEffect(() => {
    if (room !== 0) {
      for (let i = 0; i < room?.users.length; i++) {
        if (genreCtx.userId === room?.users[i].id)
          changeUsername(room?.users[i].name);
      }
    }
    // eslint-disable-next-line
  }, [room?.users]);

  return (
    <div>
      <div className="w-full text-center text-white">
        <span className="text-3xl">Username</span>
      </div>

      <div className="w-full text-white pt-4 text-center text-2xl">
        {username}
      </div>
    </div>
  );
}
