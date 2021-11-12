import { useState } from "react";
import CreateOrJoin from "../landing/CreateOrJoin";
import GenreSelector from "../genreSelector/GenreSelector";
import GenreSelectorHate from "../genreSelector/GenreSelectorHate";
import StreamingProvider from "../genreSelector/StreamingProvider";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Button } from "@mui/material";
import JoinRoom from "../landing/JoinRoom";

export default function Setup(props) {
  const [stepper, changeStepper] = useState(0);

  const handleNext = () => {
      if(stepper === 4){
        props.start()
        return
      }else{
    changeStepper(stepper + 1);}
  };
  const handleDoubleNext = () => {
    changeStepper(stepper + 2);
    console.log("Test");
  };
  const handlePrev = () => {
    if (stepper > 0) {
      changeStepper(stepper - 1);
    }
  };

  return (

      <div className="h-screen w-screen flex">
        <div
          id="shadow-box"
          className="comps relative w-1/3 h-1/3 mx-auto my-auto rounded-lg shadow-lg"
        >
          <div className="absolute -left-20 top-1/2">
            <Button fontSize="large" onClick={handlePrev}>
              <NavigateBeforeIcon />
            </Button>
          </div>
          {(() => {
            switch (stepper) {
              case 0:
                return (
                  <CreateOrJoin
                    next={handleNext}
                    doubleNext={handleDoubleNext}
                  />
                );
              case 1:
                return <JoinRoom next={handleNext} />;
              case 2:
                return <GenreSelector />;
              case 3:
                return <GenreSelectorHate />;
              case 4:
                return <StreamingProvider />;
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
      </div>
  );
}
