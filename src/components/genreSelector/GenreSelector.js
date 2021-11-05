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
    { name: "Western", genreId: "37" },
    { name: "Horror", genreId: "27" },
    { name: "Musical", genreId: "10402" },
  ];

  return (
    <div className="flex h-full w-full">
      <div className="m-auto text-center">
        <div id="likeGenre">
          <h1 className="text-white" style={{ fontSize: "2vw" }}>Select genres you'd like to watch</h1>
          <div className="flex-row flex-wrap gap-8">
            {GENRES.map((x) => {
              return (
                <button style={{ fontSize: "0.8vw" }}
                  name={x.genreId}
                  className={`font-semibold h-12 w-32 my-2 mx-2 ${
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
      </div>
    </div>
  );
}
