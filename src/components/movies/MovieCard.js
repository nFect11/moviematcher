import Button from "@mui/material/Button";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import InfoIcon from "@mui/icons-material/Info";
import { useContext, useState } from "react";
import { RoomContext } from "../../contexts/roomContext";
import { supabase } from "../../utils/supabaseClient";

export default function MovieCard(props) {
  const { room, setRoom } = useContext(RoomContext);
  const [likedMovies, changeLikedMovies] = useState([]);
  const [moviesSeen, changeMoviesSeen] = useState([]);

  const handleLike = (event) => {
    changeLikedMovies([...likedMovies, props.movie.id]);
    changeMoviesSeen([...moviesSeen, props.movie.id]);
  };
  const handleHate = (event) => {
    changeMoviesSeen([...moviesSeen, props.movie.id]);
  };

  function handleLikeERR() {
    const { data: prevData } = supabase
      .from("rooms")
      .select("movieScoreList")
      .match({ id: room.id });

    const { data } = supabase
      .from("rooms")
      .update({
        movieScoreList: [
          ...prevData[0].movieScoreList,
          { movieId: props.movie.id, movieScore: 1 },
        ],
      })
      .match({ id: room.id });
    setRoom(data[0]);
  }

  const imgPath = "https://image.tmdb.org/t/p/original";
  return (
    <div className="w-1/5 m-auto">
      <div>
        <img
          className="rounded"
          id={props.movie.id}
          src={`${imgPath}${props.movie.poster_path}`}
          alt={props.movie.title}
          onError={(ev) => {
            ev.target.onError = null;
            ev.target.src = "https://via.placeholder.com/300x450";
          }}
        />
      </div>
      <div className="grid grid-cols-3">
        <Button
          onClick={handleHate}
          variant="contained"
          startIcon={<ClearIcon />}
          color="error"
        >
          Hate
        </Button>
        <Button variant="contained">
          <InfoIcon />
        </Button>
        <Button
          onClick={handleLike}
          variant="contained"
          endIcon={<DoneIcon />}
          color="success"
        >
          Like
        </Button>
      </div>
    </div>
  );
}
