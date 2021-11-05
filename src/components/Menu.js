import { useState } from "react";
import { RoomProvider } from "../contexts/roomContext";
import GenreSelector from "./genreSelector/GenreSelector";
import GenreSelectorHate from "./genreSelector/GenreSelectorHate";
import StreamingProvider from "./genreSelector/StreamingProvider";
import GetStarted from "./landing/GetStarted";
import Landing from "./landing/Landing";
import MovieList from "./movies/MovieList";
import { RoomDisplay } from "./RoomDisplay";

export default function Menu() {
  const [step, changeStep] = useState(0);

  const handlePrevious = () => {
    if (step > 1) {
      changeStep(step - 1);
    }
  };
  const handleNext = () => {
    changeStep(step + 1);
  };

  return (
    <RoomProvider>
      <div className="">
        <div>
          {(() => {
            switch (step) {
              case 0:
                return <GetStarted start={handleNext} />;
              case 1:
                return <Landing start={handleNext} />;
              case 2:
                return <GenreSelector />;
              case 3:
                return <GenreSelectorHate />;
              case 4:
                return <StreamingProvider />;
              case 5:
                return <MovieList />;

              default:
                <div></div>;
            }
          })()}
          <RoomDisplay />
        </div>
        <button
          className={`absolute top-10 bg-gray-400 w-28 cursor-pointer ${
            step <= 1 && "hidden"
          }`}
          onClick={handlePrevious}
        >
          Previous
        </button>
        <button
          className={`absolute top-10 ml-48 bg-gray-400 w-28 ${
            step === 0 && "hidden"
          }`}
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </RoomProvider>
  );
}
