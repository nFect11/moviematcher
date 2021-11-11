import MovieCard from "../movies/MovieCard";
import { RoomDisplay } from "../RoomDisplay";
import Scoreboard from "../scoreboard/Scoreboard";

export default function LayoutMatcher() {
  return (
    <div className="main-area w-screen h-screen">
      <div className="comps room-info rounded-lg"> {false && <RoomDisplay />}</div>
      <div className="comps navigation"></div>
      <div className="comps movie-area rounded-lg"> <MovieCard /> </div>
      <div className="comps ranking"><h1>Scoreboard</h1> <Scoreboard /> </div>
      <div className="comps footer"></div>
      <div className="comps settings">
        <div className="comps likedGenres"></div>
        <div className="comps dislikedGenres"></div>
        <div className="comps services"></div>
      </div>
    </div>
  );
}
