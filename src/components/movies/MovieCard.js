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
  const { room, setRoom } = useContext(RoomContext);
  const genreCtx = useContext(GenreContext);
  //State
  const [likedMovies, changeLikedMovies] = useState([]);
  const [moviesSeen, changeMoviesSeen] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [scoreList, setScoreList] = useState([]);
  const [movieScores, setMovieScores] = useState([]);

  const [count, setCount] = useState(0);

  const handleLike = (event) => {
    let skipSeenMovies = 1;
    let flag = true;
    changeLikedMovies([
      ...likedMovies,
      { id: movieList[count].id, poster_path: movieList[count].poster_path },
    ]);
    changeMoviesSeen([...moviesSeen, movieList[count].id]);
    console.log(movieList.length, count);
    if (movieList.length - count < 5 && count !== 0) {
      setPage(page + 1);
    }
    while (flag) {
      if (movieList.length < count + skipSeenMovies) {
        return;
      }
      if (movieList[count + skipSeenMovies].voter === genreCtx.userId) {
        skipSeenMovies++;
        continue;
      }
      if (moviesSeen.includes(movieList[count + skipSeenMovies].id)) {
        skipSeenMovies++;
      } else {
        flag = false;
      }
    }
    setCount(count + skipSeenMovies);
  };
  const handleHate = (event) => {
    let flag = true;
    let skipSeenMovies = 1;
    changeMoviesSeen([...moviesSeen, movieList[count].id]);
    if (movieList.length - count < 5 && count !== 0) {
      setPage(page + 1);
    }
    while (flag) {
      if (movieList.length < count + skipSeenMovies) {
        return;
      }
      if (movieList[count + skipSeenMovies].voter === genreCtx.userId) {
        skipSeenMovies++;
        continue;
      }
      if (moviesSeen.includes(movieList[count + skipSeenMovies].id)) {
        skipSeenMovies++;
      } else {
        flag = false;
      }
    }
    setCount(count + skipSeenMovies);
  };

  const getScoreList = async () => {
    const { data } = await supabase
      .from("rooms")
      .select("movieScoreList")
      .match({ id: room.id });
    setScoreList(data[0].movieScoreList);
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
    console.log("Fetching movies...");
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
    async function fetchLikedMovies() {
      const { data } = await supabase
        .from("rooms")
        .select("movieScoreList")
        .match({ id: room.id });
      setMovieList([...movieList, data]);
    }
    fetchLikedMovies();
  };

  useEffect(() => {
    fetchNewMovies();
    getScoreList();
  }, [page]);

  useEffect(() => {
    async function pushScore() {
      const { data: prevData } = await supabase
        .from("rooms")
        .select("movieScoreList")
        .match({ id: room.id });

      const { data } = await supabase.from("rooms").update({
        movieScoreList: [
          ...prevData[0].movieScoreList,
          {
            id: likedMovies[likedMovies.length - 1].id,
            poster_path: likedMovies[likedMovies.length - 1].poster_path,
            voter: genreCtx.userId,
          },
        ],
      });
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
    <div className="grid grid-cols-3">
      <div></div>
      <div className="w-3/4 mx-auto pt-24">
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
      <div className="w-1/2 mx-auto pt-24">
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
