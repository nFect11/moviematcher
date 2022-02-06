import { useContext, useState } from "react";
import { RoomContext } from "../../contexts/roomContext";
import { supabase } from "../../utils/supabaseClient";
import GenreContext from "../store/genre-context";
import { Button } from "@mui/material";

export default function JoinModal(props) {
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
  async function checkRoomAvailability() {
    const { data: prevData } = await supabase
      .from("rooms")
      .select("id, users")
      .match({ uniqueRoom: idToConnect });

    if (prevData.length === 0) {
      console.log("Room not available");
      alert("Invalid room name!");
      return;
    } else {
      genreCtx.changeRoomId(idToConnect);
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
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      checkRoomAvailability();
    }
  };
  return (
    <div className="fixed left-1/10 top-1/10 w-4/5 h-4/5 md:left-1/5 md:w-3/5 mx-auto rounded-lg bg-gray-900 z-20 ">
      <div className="h-full flex flex-col justify-around items-center">
        <h1 className="text-white pt-8 text-7xl">Room ID:</h1>
        <input
          type="text"
          className="w-4/5 text-6xl"
          value={idToConnect}
          onChange={(e) => {
            setIdToConnect(e.target.value.toUpperCase());
          }}
          onKeyDown={handleKeyDown}
        />

        <Button
          disabled={idToConnect === ""}
          sx={{ fontSize: "2.1rem", backgroundColor: "#864879" }}
          onClick={checkRoomAvailability}
          variant="contained"
          className="w-full md:w-3/4 h-1/5"
        >
          Join
          <br />
          group
        </Button>
      </div>
    </div>
  );
}
