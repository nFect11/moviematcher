import ClearIcon from "@mui/icons-material/Clear";
import DoneIcon from "@mui/icons-material/Done";
import InfoIcon from "@mui/icons-material/Info";
import Button from "@mui/material/Button";
import { useContext, useEffect, useState } from "react";
import { RoomContext } from "../../contexts/roomContext";
import { supabase } from "../../utils/supabaseClient";
import GenreContext from "../store/genre-context";

export default function MovieCard(props) {
  // Context
  const { room } = useContext(RoomContext);
  const genreCtx = useContext(GenreContext);
  //State
  const [likedMovies, changeLikedMovies] = useState([]);
  const [moviesSeen, changeMoviesSeen] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const [currentMovie, setCurrentMovie] = useState({});

  //Randomize movie list array to prevent showing the same order of movies and mix in movies from other users
  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  function getNextMovie() {
    for (let i = 0; i < room.movieScoreList.length; i++) {
      if (!moviesSeen.includes(room.movieScoreList[i].id)) {
        let axios = require("axios").default;
        let options = {
          method: "GET",
          url: `https://api.themoviedb.org/3/movie/${room.movieScoreList[i].id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`,
        };
        axios
          .request(options)
          .then((response) => {
            setCurrentMovie(response.data);
            setLoading(false);
          })
          .catch((error) => {
            console.error(error);
          });

        return;
      }
    }

    for (let i = 0; i < movieList.length; i++) {
      if (!moviesSeen.includes(movieList[i].id)) {
        setCurrentMovie(movieList[i]);
        return;
      }
    }
    fetchNewMovies(page);
  }

  const handleLike = async (event) => {
    changeLikedMovies([
      ...likedMovies,
      { id: currentMovie.id, poster_path: currentMovie.poster_path },
    ]);
    changeMoviesSeen([...moviesSeen, currentMovie.id]);

    const { data: prevData } = await supabase
      .from("rooms")
      .select("movieScoreList")
      .match({ id: room.id });

    await supabase
      .from("rooms")
      .update({
        movieScoreList: [
          ...prevData[0].movieScoreList,
          {
            id: currentMovie.id,
            title: currentMovie.title,
            poster_path: currentMovie.poster_path,
            voter: genreCtx.userId,
          },
        ],
      })
      .match({ id: room.id });
  };

  const handleHate = (event) => {
    changeMoviesSeen([...moviesSeen, currentMovie.id]);
  };

  useEffect(
    function () {
      getNextMovie();
    },
    [moviesSeen]
  );

  const fetchNewMovies = (pageToFetch) => {
    let tempMoviesList = [];
    setPage(page + 1);
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
        page: pageToFetch,
        with_watch_monetization_types: "flatrate",
      },
    };
    axios
      .request(options)
      .then((response) => {
        tempMoviesList = shuffle([...response.data.results]);
        setMovieList(tempMoviesList);
        setCurrentMovie(tempMoviesList[0]);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchNewMovies(page);
  }, []);

  const imgPath = "https://image.tmdb.org/t/p/original";
  if (isLoading || movieList.length === 0) {
    return <div>Loading...</div>;
  }
  return (
    <div className="grid grid-cols-3">
      <div></div>
      <div className="w-3/4 mx-auto mt-24 shadow-lg">
        <div>
          <img
            className="rounded"
            src={`${imgPath}${currentMovie.poster_path}`}
            alt={currentMovie.title}
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
    </div>
  );
}
