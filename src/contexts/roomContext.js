import { createContext, useEffect, useState } from "react";

export const RoomContext = createContext();

export function RoomProvider({ children }) {
  const [room, setRoom] = useState(null);

  useEffect(
    function () {
      console.log(room);
    },
    [room]
  );

  return (
    <RoomContext.Provider value={{ room, setRoom }}>
      {children}
    </RoomContext.Provider>
  );
}
