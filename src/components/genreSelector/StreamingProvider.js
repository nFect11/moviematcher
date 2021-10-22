import { useContext } from "react";
import GenreContext from "../store/genre-context";

export default function StreamingProvider() {
  const genreCtx = useContext(GenreContext);
  const imgPath = "https://image.tmdb.org/t/p/original";
  const PROVIDER = [
    {
      name: "Netflix",
      provId: "8",
      logoUrl: "/9A1JSVmSxsyaBK4SUFsYVqbAYfW.jpg",
    },
    {
      name: "Amazon Prime",
      provId: "9",
      logoUrl: "/68MNrwlkpF7WnmNPXLah69CR5cb.jpg",
    },
    {
      name: "Disney+",
      provId: "337",
      logoUrl: "/dgPueyEdOwpQ10fjuhL2WYFQwQs.jpg",
    },
    {
      name: "Apple iTunes",
      provId: "2",
      logoUrl: "/q6tl6Ib6X5FT80RMlcDbexIo4St.jpg",
    },
    {
      name: "Sky Ticket",
      provId: "30",
      logoUrl: "/12H7kZk3kjUCXdUVkdJaSv4xyzH.jpg",
    },
  ];

  return (
    <div className="flex h-screen">
      <div className="m-auto text-center lg:w-1/4 sm:w-screen">
        <div id="likeGenre">
          <h1 className="text-white">Select your available Providers</h1>
          <div className="flex-row flex-wrap gap-8">
            {PROVIDER.map((x) => {
              return (
                <button onClick={genreCtx.handleStrProv}>
                  <img
                    src={`${imgPath}${x.logoUrl}`}
                    name={x.provId}
                    className={`${
                      genreCtx.streamingProvider.includes(x.provId)
                        ? ""
                        : "opacity-70"
                    }`}
                    alt={x.name}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
