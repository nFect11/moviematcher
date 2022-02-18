import GenreContext from "../store/genre-context";
import { useContext, useEffect } from "react";
import Backdrop from "../movies/Backdrop";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { RoomContext } from "../../contexts/roomContext";
import { supabase } from "../../utils/supabaseClient";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import CancelIcon from "@mui/icons-material/Cancel";

export default function Reconnect() {
  const genreCtx = useContext(GenreContext);
  const navigate = useNavigate();
  const { room, setRoom } = useContext(RoomContext);

  function resetLobby() {
    localStorage.clear();
    window.location.href = "/";
  }
  async function reconnect() {
    const { data: prevData } = await supabase
      .from("rooms")
      .select("*")
      .match({ uniqueRoom: localStorage.getItem("lastRoom") });
    setRoom(prevData[0]);
    connect(prevData[0].id);
  }
  function connect(id) {
    console.log("Connecting");
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
  function settingsAndReconnect() {
    reconnect();
    genreCtx.setHateIt([localStorage.getItem("hateGenres")]);
    genreCtx.setLoveIt([localStorage.getItem("loveGenres")]);
    genreCtx.setProvider([localStorage.getItem("providers")]);
    genreCtx.changeUserId(localStorage.getItem("userId"));
    genreCtx.changeUserName(localStorage.getItem("name"));
    genreCtx.changeRoomId(localStorage.getItem("lastRoom"));
    navigate("/swiper", { replace: true });
    genreCtx.setLobby("false");
  }

  return (
    <div>
      <Backdrop />
      <div className="fixed left-1/10 top-1/10 w-4/5 h-4/5 md:left-1/5 md:w-3/5 mx-auto rounded-lg bg-gray-900 text-white z-20 text-4xl">
        <div className="flex flex-col h-full">
          <div className="m-auto">Do you want to rejoin?</div>
          <div className="m-auto">
            <Button
              variant="outlined"
              onClick={resetLobby}
              startIcon={<CancelIcon />}
            >
              Delete
            </Button>
            <Button
              variant="contained"
              onClick={settingsAndReconnect}
              endIcon={<ChangeCircleIcon />}
            >
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
