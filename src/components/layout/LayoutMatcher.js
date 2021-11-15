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

export default function LayoutMatcher() {
  const [leaderboard, toggleLeaderboard] = useState(true);
  const [group, toggleGroup] = useState(true);

  const handleLeaderClick = () => {
    toggleLeaderboard(!leaderboard);
  };
  const handleGroupClick = () => {
    toggleGroup(!group);
  };

  return (
    <div className="relative main-area w-screen h-2/3 margin-top">
      <div className="comps movie-area rounded-lg">
        <MovieCard />
      </div>
      <div
        className={`absolute comps w-screen h-full top-0 left-0 ${
          leaderboard && `hidden`
        }`}
      >
        <Scoreboard />
      </div>
      <div
        className={`absolute comps w-screen h-full top-0 left-0 ${
          group && `hidden`
        }`}
      >
        <div className="comps likedGenres">
          <UserInfo />
        </div>
        <div className="comps dislikedGenres">
          <RoomDisplay />
        </div>
        <div className="comps services">
          <UserList />
        </div>
      </div>
      <div className="w-full comps ranking rounded-lg mobileOnly">
        <h1>Scoreboard</h1> <Scoreboard />
      </div>

      <div className="comps settings rounded-lg mobileOnly">
        <div className="comps likedGenres mobileOnly">
          <UserInfo />
        </div>
        <div className="comps dislikedGenres mobileOnly">
          <RoomDisplay />
        </div>
        <div className="comps services mobileOnly">
          <UserList />
        </div>
      </div>
      <div className="h-screen absolute">
        <div className="absolute navi bottom-0">
          <div className="grid grid-cols-3 grid-rows-1 w-screen h-6vh">
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
