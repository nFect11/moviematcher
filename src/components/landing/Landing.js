import { useContext, useState } from "react";
import { RoomContext } from "../../contexts/roomContext";
import { supabase } from "../../utils/supabaseClient";

export default function Landing() {
  const { room, setRoom } = useContext(RoomContext);
  const [name, setName] = useState("");
  const [idToConnect, setIdToConnect] = useState();

  async function handleCreateGroup() {
    const { data } = await supabase
      .from("rooms")
      .insert([{ users: [{ name: name, wants: [], hates: [], hasSeen: [] }], movieScoreList: []}]);
    setRoom(data[0]);
    console.log(data)
  }

  async function handleJoin() {
    const { data: prevData } = await supabase
      .from("rooms")
      .select("users")
      .match({ id: idToConnect });

    const { data } = await supabase
      .from("rooms")
      .update({
        users: [...prevData[0].users, { name: name, wants: [], hates: [] }],
      })
      .match({ id: idToConnect });
    setRoom(data[0]);
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
          Join{" "}
        </button>
      </div>
    </div>
  );
}
