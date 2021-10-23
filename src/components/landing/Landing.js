import { getThemeProps } from "@mui/system";
import { useContext, useEffect, useState } from "react";
import { RoomContext } from "../../contexts/roomContext";
import { supabase } from "../../utils/supabaseClient";
import GenreContext from "../store/genre-context";

export default function Landing(props) {
  const { setRoom } = useContext(RoomContext);
  const [name, setName] = useState("");
  const [idToConnect, setIdToConnect] = useState(null);
  const genreCtx = useContext(GenreContext);

  useEffect(() => {
    genreCtx.changeUserId("_" + Math.random().toString(36).substr(2, 9));
  }, []);

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

  async function handleCreateGroup() {
    const { data } = await supabase
      .from("rooms")
      .insert([
        { users: [{ name: name, id: genreCtx.userId }], movieScoreList: [] },
      ]);

    setRoom(data[0]);

    connect(data[0].id);
    props.start();
  }

  async function handleJoin() {
    const { data: prevData } = await supabase
      .from("rooms")
      .select("users")
      .match({ id: idToConnect });

    const { data } = await supabase
      .from("rooms")
      .update({
        users: [...prevData[0].users, { name: name, id: genreCtx.userId }],
      })
      .match({ id: idToConnect });
    setRoom(data[0]);

    connect(idToConnect);
    props.start();
  }

  return (
    <div className="h-screen bg-gray-800">
      <div className="pt-64">
        <h1 className="text-xl text-center text-white">
          Invite your friend to a group
        </h1>
        <h1 className="text-xl text-center text-white">
          or browse for yourself
        </h1>
      </div>
      <div className="mt-3 text-center ">
        <input value={name} onChange={(e) => setName(e.target.value)} />
        <button
          onClick={handleCreateGroup}
          className="font-semibold text-white bg-green-500 rounded"
        >
          Click to create a group
        </button>
      </div>
      <div className="mt-3 text-center">
        <h1 className="text-xl text-center text-white">
          Or enter a code to join a group
        </h1>
      </div>
      <div className="mt-3 text-center">
          
        <input
          type="number"
          value={idToConnect}
          onChange={(e) => setIdToConnect(e.target.value)}
        />
        <button
          onClick={handleJoin}
          className="font-semibold text-white bg-green-500 rounded"
        >
          Join
        </button>
      </div>
    </div>
  );
}
