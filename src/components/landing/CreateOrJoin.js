import { Button } from "@mui/material";
import { RoomContext } from "../../contexts/roomContext";
import { supabase } from "../../utils/supabaseClient";
import { useContext, useEffect, useState } from "react";
import GenreContext from "../store/genre-context";
import Backdrop from "../movies/Backdrop";
import JoinModal from "./JoinModal";

export default function CreateOrJoin(props) {
  const genreCtx = useContext(GenreContext);
  const { setRoom } = useContext(RoomContext);
  const [modalOpen, toggleModal] = useState(false);

  useEffect(() => {
    genreCtx.changeUserId("_" + Math.random().toString(36).substr(2, 9));
    // eslint-disable-next-line
  }, []);

  async function handleCreateGroup() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let randomStr = "";

    for (let i = 0; i < 4; i++) {
      const randomNum = Math.floor(Math.random() * characters.length);
      randomStr += characters[randomNum];
    }
    genreCtx.changeRoomId(randomStr);
    const { data } = await supabase.from("rooms").insert([
      {
        uniqueRoom: randomStr,
        users: [{ name: genreCtx.userName, id: genreCtx.userId }],
        movieScoreList: [],
      },
    ]);
    setRoom(data[0]);

    localStorage.setItem("lastRoom", randomStr);
    localStorage.setItem("name", genreCtx.userName);
    localStorage.setItem("userId", genreCtx.userId);

    connect(data[0].id);
    props.next();
  }

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

  function openJoinModal() {
    toggleModal(!modalOpen);
  }

  return (
    <div className="h-full flex flex-col justify-between items-center">
      {modalOpen && <JoinModal next={props.next} />}
      {modalOpen && <Backdrop modal={openJoinModal} />}

      <input
        value={genreCtx.userName}
        placeholder="Name"
        className="w-4/5 text-6xl mt-8"
        onChange={(e) => genreCtx.changeUserName(e.target.value)}
      />
      <div className="h-1/2 w-full grid grid-flow-row md:grid-flow-col items-center justify-items-center">
        <Button
          onClick={handleCreateGroup}
          disabled={
            genreCtx.userName === "" || localStorage.getItem("room") != null
          }
          sx={{
            fontSize: "2.1rem",
            backgroundColor: "#F76E11",
            "&:hover": {
              backgroundColor: "#d47bc7",
            },
          }}
          variant="contained"
          className="w-4/5 md:w-3/4 h-4/5 md:h-2/5"
        >
          Create
          <br />
          group
        </Button>
        <Button
          disabled={genreCtx.userName === ""}
          sx={{
            fontSize: "2.1rem",
            backgroundColor: "#F76E11",
            "&:hover": {
              backgroundColor: "#d47bc7",
            },
          }}
          onClick={openJoinModal}
          variant="contained"
          className="w-4/5 md:w-3/4 h-4/5 md:h-2/5"
        >
          Join
          <br />
          group
        </Button>
      </div>
    </div>
  );
}
