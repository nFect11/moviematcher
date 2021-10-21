import { useState } from "react";
import * as data from "../../json/db.json";
import MovieCard from "./MovieCard";

export default function MovieList() {

  const [count, setCount] = useState(0);



  return (
    <div className="">
      <MovieCard movie={data.movies[count]} />
      <button onClick={() => setCount(count + 1)}>Next Movie</button>
    </div>
  );
}
