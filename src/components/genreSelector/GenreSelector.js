import { useContext } from "react";
import GenreContext from "../store/genre-context";

export default function GenreSelector() {
  const genreCtx = useContext(GenreContext);

  const GENRES = [
    { name: "Comedy", genreId: "35" },
    { name: "Fantasy", genreId: "14" },
    { name: "Crime", genreId: "80" },
    { name: "Drama", genreId: "18" },
    { name: "Adventure", genreId: "12" },
    { name: "History", genreId: "36" },
    { name: "Thriller", genreId: "53" },
    { name: "Animation", genreId: "16" },
    { name: "Family", genreId: "10751" },
    { name: "Mystery", genreId: "9648" },
    { name: "Action", genreId: "28" },
    { name: "Romance", genreId: "10749" },
    { name: "Sci-Fi", genreId: "878" },
    { name: "War", genreId: "10752" },
    { name: "Horror", genreId: "27" },
    { name: "Musical", genreId: "10402" },
  ];

  return (
    <div className="flex flex-col text-center h-full w-full">
          <h1 className="text-white p-8 md:p-4 text-3xl">
            Select genres you <span className="text-green-500">DO</span> like to
            watch
          </h1>
          <div className="w-full grid grid-cols-2 gap-y-8 md:gap-y-12 xl:gap-y-16 md:grid-cols-3 xl:grid-cols-4 justify-items-center justify-around genre-scroll overflow-y-auto">
            {GENRES.map((x) => {
              return (
                <button
                  name={x.genreId}
                  className={`font-semibold text-2xl w-40 md:w-44 h-16 ${
                    genreCtx.loveIt.includes(x.genreId)
                      ? "bg-green-300"
                      : genreCtx.hateIt.includes(x.genreId)
                      ? "bg-red-300"
                      : "bg-gray-300"
                  } rounded transition-all duration-200  ${
                    genreCtx.loveIt.includes(x.genreId)
                      ? "hover:bg-green-400"
                      : genreCtx.hateIt.includes(x.genreId)
                      ? "hover:bg-red-400"
                      : "hover:bg-gray-400"
                  }`}
                  onClick={genreCtx.handleLoveIt}
                >
                  {x.name}
                </button>
              );
            })}
          </div>
      </div>
  );
}
