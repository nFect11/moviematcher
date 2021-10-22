import { useContext, useEffect, useState } from "react";
import GenreContext from "../store/genre-context";
import MovieCard from "./MovieCard";

export default function MovieList() {
  const genreCtx = useContext(GenreContext);

  const [movieList, setMovieList] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const loveGenreList = genreCtx.loveIt.join('|');
  const hateGenreList = genreCtx.hateIt.join('|');
  const watchProviders = genreCtx.streamingProvider.join('|');

  useEffect(() => {
    let axios = require("axios").default;
    let options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/discover/movie",
      params: {
        api_key: "8da79493434d544b51390e63bbf6eee2",
        with_genres: loveGenreList,
        without_genres: hateGenreList,
        with_watch_providers: watchProviders,
        watch_region: "DE",
        page: page,
        with_watch_monetization_types: "flatrate"
      },
    };
    axios
      .request(options)
      .then((response) => {
        setMovieList(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [page]);

  const [count, setCount] = useState(0);

  if (isLoading || movieList.results.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen">
      <MovieCard movie={movieList.results[count]} />
      <button
        onClick={() => {
          if (count < movieList.results.length - 1) {
            console.log(count);
            console.log(movieList.results.length);
            setCount(count + 1);
          } else if (count === 19) {
            setCount(0);
            setPage(page + 1);
          }
        }}
      >
        Next Movie
      </button>
    </div>
  );
}
