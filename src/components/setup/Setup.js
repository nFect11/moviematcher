import { useState, useContext } from "react";
import CreateOrJoin from "../landing/CreateOrJoin";
import GenreSelector from "../genreSelector/GenreSelector";
import GenreSelectorHate from "../genreSelector/GenreSelectorHate";
import StreamingProvider from "../genreSelector/StreamingProvider";
import NavButtons from "./NavButtons";
import { useNavigate } from "react-router-dom";
import GenreContext from "../store/genre-context";

export default function Setup(props) {
  const [stepper, changeStepper] = useState(0);
  const genreCtx = useContext(GenreContext);

  console.log(props.inviteId);

  let navigate = useNavigate();

  const handleNext = () => {
      if (stepper === 0){
          localStorage.removeItem("lastRoom")
        changeStepper(stepper + 1);
      }
    if (stepper === 3) {
      localStorage.setItem("hateGenres", genreCtx.hateIt);
      localStorage.setItem("loveGenres", genreCtx.loveIt);
      localStorage.setItem("providers", genreCtx.streamingProvider);
      navigate("../swiper");
      return;
    } else {
      changeStepper(stepper + 1);
    }
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
        className="comps relative w-screen sm:w-4/5 lg:w-3/5 xl:w-1/2 h-5/6 md:h-3/4  mx-auto mt-8 lg:my-auto rounded-lg shadow-lg"
      >
        {(() => {
          switch (stepper) {
            case 0:
              return <CreateOrJoin next={handleNext} />;
            case 1:
              return <GenreSelector />;
            case 2:
              return <GenreSelectorHate />;
            case 3:
              return <StreamingProvider />;
            default:
              return <div></div>;
          }
        })()}
        {stepper > 0 && <NavButtons prev={handlePrev} next={handleNext} />}
      </div>
    </div>
  );
}
