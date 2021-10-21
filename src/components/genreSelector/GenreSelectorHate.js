import { useContext, useState } from "react";
import GenreContext from "../store/genre-context";

export default function GenreSelector() {

    const genreCtx = useContext(GenreContext)

  const GENRES = [
    "Comedy",
    "Fantasy",
    "Crime",
    "Drama",
    "Adventure",
    "History",
    "Thriller",
    "Animation",
    "Family",
    "Mystery",
    "Action",
    "Romance",
    "Sci-Fi",
    "War",
    "Western",
    "Horror",
    "Musical",
    "Sport",
  ];

  return (
    <div className="flex h-screen">
      <div className="m-auto text-center lg:w-1/4 sm:w-screen">
        <div id="likeGenre">
          <h1 className="text-white">Select genres you HATE</h1>
          <div className="flex-row flex-wrap gap-8">
            {GENRES.map((x) => {
              return (
                <button
                  name={x}
                  className={`font-semibold h-12 w-28 my-2 mx-1 ${genreCtx.loveIt.includes(x) ? "bg-green-300" : genreCtx.hateIt.includes(x) ? "bg-red-300" : "bg-gray-300"} rounded transition-all duration-200  ${genreCtx.loveIt.includes(x) ? "hover:bg-green-400" : genreCtx.hateIt.includes(x) ? "hover:bg-red-400" : "hover:bg-gray-400"}`}
                  onClick={genreCtx.handleHateIt}
                >
                  {x}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
