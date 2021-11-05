import { useState } from "react";
import CreateOrJoin from "../landing/CreateOrJoin";
import GenreSelector from "../genreSelector/GenreSelector";
import GenreSelectorHate from "../genreSelector/GenreSelectorHate";
import StreamingProvider from "../genreSelector/StreamingProvider";
import MovieList from "../movies/MovieList";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Button } from "@mui/material";
import { RoomDisplay } from "../RoomDisplay";

export default function Setup() {
  const [step, changeStep] = useState(0);

  const handleNext = () => {
    changeStep(step + 1);
  };
  const handlePrev = () => {
    if (step > 0) {
      changeStep(step - 1);
    }
  };

  return (
    <div className="h-screen w-screen flex">
      <div
        id="shadow-box"
        className="relative w-1/3 h-1/3 mx-auto my-auto rounded-lg shadow-lg"
      >
        <div className="absolute -left-20 top-1/2">
          <Button fontSize="large" onClick={handlePrev}>
            <NavigateBeforeIcon />
          </Button>
        </div>
        {(() => {
          switch (step) {
            case 0:
              return <CreateOrJoin prev={handlePrev} next={handleNext} />;
            case 1:
              return <GenreSelector />;
            case 2:
              return <GenreSelectorHate />;
            case 3:
              return <StreamingProvider />;
            case 4:
              return <MovieList />;
            default:
              return <div></div>;
          }
        })()}
        <div className="absolute -right-20 top-1/2">
          <Button fontSize="large" onClick={handleNext}>
            <NavigateNextIcon />
          </Button>
        </div>
      </div>
      <RoomDisplay />
    </div>
  );
}
