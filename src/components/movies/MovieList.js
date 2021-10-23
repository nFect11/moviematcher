import { rootShouldForwardProp } from "@mui/material/styles/styled";
import { useContext, useEffect, useState } from "react";
import { RoomDisplay } from "../RoomDisplay";
import GenreContext from "../store/genre-context";
import MovieCard from "./MovieCard";
import { supabase } from "../../utils/supabaseClient";
import { RoomContext } from "../../contexts/roomContext";


export default function MovieList() {
  const genreCtx = useContext(GenreContext);
  const {room, setRoom} = useContext(RoomContext);



  return (
    <div className="h-screen">
      <MovieCard
      />
      <ul>

      </ul>
    </div>
  );
}
