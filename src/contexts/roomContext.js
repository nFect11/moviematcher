import { createContext, useCallback, useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";

export const RoomContext = createContext();

export function RoomProvider({ children }) {
  const [room, setRoom] = useState(0);
  const updateRoom = useCallback(
    async function () {
      const { data } = await supabase
        .from("rooms")
        .select("id, users")
        .match({ id: room.id });
      setRoom(data[0]);
      console.log(room.users);
    },
    [room]
  );

  useEffect(
    function () {
      if (room) {
        const mySubscription = supabase
          .from("rooms:id=eq." + room.id)
          .on("UPDATE", (payload) => {
            updateRoom();
          })
          .subscribe();
      }
    },
    [room, setRoom]
  );

  return (
    <RoomContext.Provider value={{ room, setRoom }}>
      {children}
    </RoomContext.Provider>
  );
}
