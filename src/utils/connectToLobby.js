import { supabase } from "./supabaseClient";

export function connectToExistingLobby(id) {}

localStorage.setItem("lastRoom", localStorage.getItem("room"));
localStorage.removeItem("room");

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
