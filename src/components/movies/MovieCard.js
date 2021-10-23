import Button from "@mui/material/Button";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import InfoIcon from "@mui/icons-material/Info";
import { useContext, useEffect, useState } from "react";
import { supabase } from "../../utils/supabaseClient";
import { RoomContext } from "../../contexts/roomContext";
import GenreContext from "../store/genre-context";

export default function MovieCard(props) {
  const { room, setRoom } = useContext(RoomContext);
  const [likedMovies, changeLikedMovies] = useState([]);
  const [moviesSeen, changeMoviesSeen] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const genreCtx = useContext(GenreContext);

  const [count, setCount] = useState(0);

  const handleLike = (event) => {
    changeLikedMovies([...likedMovies, event.target.name]);
    changeMoviesSeen([...moviesSeen, event.target.name]);
    if (count + 3                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                === 0 && count !== 0) {
      setPage(page + 1);
    }
    setCount(count + 1);
    console.log(movieList);
  };
  const handleHate = (event) => {
    changeMoviesSeen([...moviesSeen, event.target.name]);
    if (count % 18 === 0 && count !== 0) {
      setPage(page + 1);
    }
    setCount(count + 1);
  };

  useEffect(() => {
    let axios = require("axios").default;
    let options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/discover/movie",
      params: {
        api_key: "8da79493434d544b51390e63bbf6eee2",
        with_genres: genreCtx.loveIt.join("|"),
        without_genres: genreCtx.hateIt.join("|"),
        with_watch_providers: genreCtx.streamingProvider.join("|"),
        watch_region: "DE",
        page: page,
        with_watch_monetization_types: "flatrate",
      },
    };
    axios
      .request(options)
      .then((response) => {
        setMovieList([...movieList, ...response.data.results]);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [page]);

  useEffect(() => {
    async function pushScore() {
      const { data: prevData } = await supabase
        .from("rooms")
        .select("movieScoreList")
        .match({ id: room.id });

      const { data } = await supabase
        .from("rooms")
        .update({
          movieScoreList: [
            ...prevData[0].movieScoreList,
            {
              movieId: likedMovies[likedMovies.length - 1],
              voter: genreCtx.userId,
            },
          ],
        })
        .match({ id: room.id });
    }
    if (likedMovies.length !== 0) {
      pushScore();
    }
  }, [likedMovies]);

  const imgPath = "https://image.tmdb.org/t/p/original";
  if (isLoading || movieList.length === 0) {
    return <div>Loading...</div>;
  }
  return (
    <div className="w-1/5 mx-auto pt-52">
      <div>
        <img
          className="rounded"
          src={`${imgPath}${movieList[count].poster_path}`}
          alt={movieList[count].title}
        />
      </div>
      <div className="grid grid-cols-3">
        <Button
          name={movieList[count].id}
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
          name={movieList[count].id}
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
