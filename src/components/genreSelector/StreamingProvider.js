import { useContext } from "react";
import GenreContext from "../store/genre-context";
import appleTv from "../../images/providers/appleTv.jpg";
import disneyPlus from "../../images/providers/disneyPlus.jpg";
import netflix from "../../images/providers/netflix.jpg";
import prime from "../../images/providers/prime.jpg";
import skyTicket from "../../images/providers/skyTicket.jpg";

export default function StreamingProvider(props) {
  const genreCtx = useContext(GenreContext);
  const PROVIDER = [
    {
      name: "Netflix",
      provId: "8",
      logoUrl: netflix,
    },
    {
      name: "Amazon Prime",
      provId: "9",
      logoUrl: prime,
    },
    {
      name: "Disney+",
      provId: "337",
      logoUrl: disneyPlus,
    },
    {
      name: "Apple iTunes",
      provId: "2",
      logoUrl: appleTv,
    },
    {
      name: "Sky Ticket",
      provId: "30",
      logoUrl: skyTicket,
    },
  ];

  return (
    <div className="flex flex-col text-center h-full w-full justify-items-center">
      <h1 className="text-white p-8 md:p-4 text-3xl">
        Select your available streaming services
      </h1>
      <div className="w-full grid grid-cols-2 gap-y-8 md:gap-y-12 xl:gap-y-16 justify-items-center justify-around genre-scroll overflow-y-auto">
        {PROVIDER.map((x) => {
          return (
            <button onClick={genreCtx.handleStrProv}>
              <img
                src={x.logoUrl}
                name={x.provId}
                className={`rounded-lg w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 xl:w-60 xl:h-60 filter ${
                  genreCtx.streamingProvider.includes(x.provId)
                    ? ""
                    : "grayscale opacity-25"
                }`}
                alt={x.name}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
