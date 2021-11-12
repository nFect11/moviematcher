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
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let randomStr = "";

    for (let i = 0; i < 4; i++) {
      const randomNum = Math.floor(Math.random() * characters.length);
      randomStr += characters[randomNum];
    }

    const { data } = await supabase.from("rooms").insert([
      {
        uniqueRoom: randomStr,
        users: [{ name: name, id: genreCtx.userId }],
        movieScoreList: [],
      },
    ]);

    setRoom(data[0]);
    
    connect(data[0].id);
    props.start();
  }

  async function handleJoin() {
    const { data: prevData } = await supabase
      .from("rooms")
      .select("id, users")
      .match({ uniqueRoom: idToConnect });

    const { data } = await supabase
      .from("rooms")
      .update({
        users: [...prevData[0].users, { name: name, id: genreCtx.userId }],
      })
      .match({ uniqueRoom: idToConnect });
    setRoom(data[0]);

    connect(prevData[0].id);
    props.start();
  }

  return (
    <div className="h-screen relative flex">
      <div className="w-1/3 h-1/2 mx-auto my-auto rounded-lg bg-gray-100 shadow-lg">
        <div className="mt-3 text-center ">
          <input value={name} onChange={(e) => setName(e.target.value)} />
          <button
            onClick={handleCreateGroup}
            disabled={name === ""}
            className={`font-semibold text-white bg-green-500 rounded ${
              name === "" && "cursor-not-allowed"
            }`}
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
            type="text"
            value={idToConnect}
            onChange={(e) => {
              setIdToConnect(e.target.value.toUpperCase());
            }}
          />
          <button
            onClick={handleJoin}
            disabled={idToConnect === null || name === ""}
            className={`font-semibold text-white bg-green-500 rounded ${
              (idToConnect === null || name === "") && "cursor-not-allowed"
            }`}
          >
            Join
          </button>
        </div>
      </div>
    </div>
  );
}
