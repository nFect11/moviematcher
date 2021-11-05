import { Button } from "@mui/material";
import { RoomContext } from "../../contexts/roomContext";
import { supabase } from "../../utils/supabaseClient";
import { useContext, useEffect } from "react";
import GenreContext from "../store/genre-context";

export default function CreateOrJoin() {
  const genreCtx = useContext(GenreContext);

  useEffect(() => {
    genreCtx.changeUserId("_" + Math.random().toString(36).substr(2, 9));
  }, []);

  return (
    <div className="h-full flex flex-col justify-around items-center">
      <div className="flex flex-col h-1/2 justify-center items-center">
        <h1 className="text-white" style={{ fontSize: "2vw" }}>
          Name:
        </h1>
        <input
          style={{ fontSize: "2vw" }}
          value={genreCtx.userName}
          onChange={(e) => genreCtx.changeUserName(e.target.value)}
        />
      </div>
      <div className="h-1/2 flex flex-row justify-around items-center">
        <Button className="w-4/5 h-1/4">Create a group</Button>
        <Button className="w-4/5 h-1/4">Join a group</Button>
      </div>
    </div>
  );
}
