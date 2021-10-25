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
  const [scoreList, setScoreList] = useState([]);
  const [movieScores, setMovieScores] = useState([]);

  const [currentMovie, setCurrentMovie] = useState({});

  // Discover API Call, Liste an Filmen maximal 20 lang, mit 20 pro Page
  // Liked movie wird Datenbank gepusht mit ID, Voter
  //Liked Movie Liste

  function getNextMovie() {
    for (let i = 0; i < room.movieScoreList.lenght; i++) {
      if (!moviesSeen.includes(room.movieScoreList[i].id)) {
        let axios = require("axios").default;
        let options = {
          method: "GET",
          url: `https://api.themoviedb.org/3/movie/${room.movieScoreList[i].id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`,
        };
        axios
          .request(options)
          .then((response) => {
            setCurrentMovie(response);
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
    setPage(page + 1);
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

    const { data } = await supabase
      .from("rooms")
      .update({
        movieScoreList: [
          ...prevData[0].movieScoreList,
          {
            id: currentMovie.id,
            poster_path: currentMovie.poster_path,
            voter: genreCtx.userId,
          },
        ],
      })
      .match({ id: room.id });

    getNextMovie();
  };

  const handleHate = (event) => {
    changeMoviesSeen([...moviesSeen, currentMovie.id]);
    getNextMovie();
  };

  useEffect(() => {
    let tempScores = [];
    let counter = 0;
    let flag = false;
    scoreList.forEach((x) => {
      tempScores.forEach((property) => {
        if (property.id === x.id && !flag && tempScores !== []) {
          tempScores[counter].votes = tempScores[counter].votes + 1;
          counter = 0;
          flag = true;
        }
        counter++;
      });
      counter = 0;
      !flag &&
        tempScores.push({ id: x.id, votes: 1, poster_path: x.poster_path });
      flag = false;
    });
    setMovieScores(tempScores);
  }, [scoreList]);

  const fetchNewMovies = () => {
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
        setMovieList([...response.data.results]);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    async function handlePageUpdate() {
      await fetchNewMovies();
      getNextMovie();
    }
    handlePageUpdate();
  }, [page, fetchNewMovies]);

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
      <div className="w-1/2 mx-auto mt-24">
        <ul className="grid grid-cols-3">
          {movieScores.map((x) => {
            return (
              <li>
                <img
                  className="w-24"
                  src={`${imgPath}${x.poster_path}`}
                  alt={x.id}
                />
                : {x.votes}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
