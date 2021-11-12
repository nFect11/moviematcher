import { useContext, useState } from "react";
import { RoomContext } from "../../contexts/roomContext";
import { supabase } from "../../utils/supabaseClient";
import GenreContext from "../store/genre-context";
import { Button } from "@mui/material";

export default function JoinRoom(props) {
  const { setRoom } = useContext(RoomContext);
  const [idToConnect, setIdToConnect] = useState(null);
  const genreCtx = useContext(GenreContext);

  function connect(id) {
    supabase
      .from("rooms:id=eq." + id)
      .on("UPDATE", (payload) => {
        async function updateRoom() {
          const { data: data1 } = await supabase
            .from("rooms")
            .select("*")
            .match({ id: id });

          setRoom(data1[0]);
        }
        updateRoom();
      })
      .subscribe();
  }

  async function handleJoin() {
    const { data: prevData } = await supabase
      .from("rooms")
      .select("id, users")
      .match({ uniqueRoom: idToConnect });

    const { data } = await supabase
      .from("rooms")
      .update({
        users: [
          ...prevData[0].users,
          { name: genreCtx.userName, id: genreCtx.userId },
        ],
      })
      .match({ uniqueRoom: idToConnect });
    setRoom(data[0]);

    connect(prevData[0].id);
    props.next();
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
        handleJoin()
    }
  };

  return (
    

<div className="h-full flex flex-col justify-around items-center">
      <div className="flex flex-col h-1/2 justify-center items-center">
        <h1 className="text-white" style={{ fontSize: "2vw" }}>
          Room ID:
        </h1>
        <input
        style={{ fontSize: "2vw" }}
        type="text"
        value={idToConnect}
        onChange={(e) => {
          setIdToConnect(e.target.value.toUpperCase());
        }}
        onKeyDown={handleKeyDown}
      />
      </div>
      <div className="h-1/2 grid grid-flow-col justify-center items-center">
        
        <div>
          <Button
            disabled={idToConnect === ""}
            onClick={handleJoin}
            variant="contained"
            className="h-1/2 p-8"
            style={{ fontSize: "1.3vw" }}
          >
            Join a group
          </Button>
        </div>
      </div>
    </div>


  );
}
