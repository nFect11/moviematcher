import MovieCard from "../movies/MovieCard";
import RoomDisplay from "../RoomDisplay";
import Scoreboard from "../scoreboard/Scoreboard";
// eslint-disable-next-line
import logoWhite from "../../images/LogoWhite.png";
import UserInfo from "../roomInfo/UserInfo";
import UserList from "../roomInfo/UserList";
import { Button } from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";
import TheatersIcon from "@mui/icons-material/Theaters";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import { useState } from "react";
import MovieInfo from "../movies/MovieInfo";
import Backdrop from "../movies/Backdrop";

export default function LayoutMatcher() {
  const [leaderboard, toggleLeaderboard] = useState(true);
  const [group, toggleGroup] = useState(true);
  const [modal, changeModal] = useState(false);
  const [movieInfo, changeMovieInfo] = useState(null);

  const handleLeaderClick = () => {
    toggleGroup(true);
    toggleLeaderboard(!leaderboard);
  };
  const handleGroupClick = () => {
    toggleLeaderboard(true);
    toggleGroup(!group);
  };
  const handleMovieClick = () => {
    toggleLeaderboard(true);
    toggleGroup(true);
  };
  const handleModal = () => {
    changeModal(!modal);
  };
  const handleMovieInfo = (movie) => {
    changeMovieInfo(movie);
    changeModal(!modal);
  };

  return (
    <div className="relative main-area w-screen h-2/3">
      {modal && <MovieInfo modal={handleModal} />}
      <div className="comps movie-area rounded-lg lg:mt-16">
        <MovieCard modalMovie={handleMovieInfo} />
      </div>
      <div
        className={`absolute comps w-screen movie-area h-full pl-2 top-0 pt-4 left-0 ${
          leaderboard && `hidden`
        }`}
      >
        <Scoreboard />
      </div>
      {modal && <MovieInfo modal={handleModal} movie={movieInfo} />}
      {modal && <Backdrop modal={handleModal} />}
      <div
        className={`grid grid-rows-3 absolute comps w-screen movie-area h-full top-0 left-0 ${
          group && `hidden`
        }`}
      >
        <div className="comps">
          <UserInfo />
        </div>
        <div className="comps">
          <RoomDisplay />
        </div>
        <div className="comps">
          <UserList />
        </div>
      </div>
      <div className="w-full lg:mt-16 comps ranking rounded-lg mobileOnly">
        <Scoreboard />
      </div>

      <div className="comps settings rounded-lg mobileOnly lg:mt-16">
        <div className="comps likedGenres mobileOnly rounded-lg">
          <UserInfo />
        </div>
        <div className="comps dislikedGenres mobileOnly rounded-lg">
          <RoomDisplay />
        </div>
        <div className="comps services mobileOnly rounded-lg">
          <UserList />
        </div>
      </div>
      <div className="h-screen absolute">
        <div className="fixed navi bottom-4">
          <div className="grid grid-cols-3 grid-rows-1 w-screen h-5vh">
            <Button
              variant="contained"
              onClick={handleGroupClick}
              sx={{
                fontSize: "1.3rem",
                backgroundColor: "#E9A6A6",
                "&:hover": {
                  backgroundColor: "#ffbfbf",
                },
              }}
            >
              <GroupsIcon fontSize="large" />
            </Button>
            <Button
              onClick={handleMovieClick}
              variant="contained"
              sx={{
                backgroundColor: "#E9A6A6",
                "&:hover": {
                  backgroundColor: "#ffbfbf",
                },
              }}
            >
              <TheatersIcon fontSize="large" />
            </Button>
            <Button
              onClick={handleLeaderClick}
              variant="contained"
              sx={{
                fontSize: "1.3rem",
                backgroundColor: "#E9A6A6",
                "&:hover": {
                  backgroundColor: "#ffbfbf",
                },
              }}
            >
              <LeaderboardIcon fontSize="large" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
