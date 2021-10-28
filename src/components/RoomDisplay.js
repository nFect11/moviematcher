/* eslint-disable jsx-a11y/anchor-is-valid */
import { useContext, useEffect, useState } from "react";
import { RoomContext } from "../contexts/roomContext";
import GenreContext from "./store/genre-context";
import ReactTooltip from "react-tooltip";

export function RoomDisplay() {
  const { room } = useContext(RoomContext);
  const genreCtx = useContext(GenreContext);

    const [username, changeUsername] = useState("")
  useEffect(() => { 
    for (let i = 0; i < room?.users.length; i++) {
      if (genreCtx.userId === room?.users[i].id) changeUsername(room?.users[i].name);
    }
  },[room?.users])

  function voterList(votedMovie) {
    let nameList = "";
    votedMovie.votes.forEach((voterName) => {
      for (let i = 0; i < room?.users.length; i++) {
        if (voterName === room?.users[i].id) {
          nameList += `${room?.users[i].name}<br />`;
        }
      }
    });
    return nameList;
  }
  useEffect(() => {
    ReactTooltip.rebuild();
  },[room?.movieScoreList]);

  function getListWithVoteCounts(movies) {
    if (!movies) return [];
    let movieswithVoteCounts = [];

    outerLoop: for (let i = 0; i < movies.length; i++) {
      for (let j = 0; j < movieswithVoteCounts.length; j++) {
        if (movieswithVoteCounts[j]["movie"] === movies[i].id) {
          movieswithVoteCounts[j]["votes"].push(movies[i].voter);
          continue outerLoop;
        }
      }

      movieswithVoteCounts.push({
        movie: movies[i].id,
        votes: [movies[i].voter],
        img: movies[i].poster_path,
        title: movies[i].title,
      });
    }

    movieswithVoteCounts.sort(function (a, b) {
      if (a["votes"].length < b["votes"].length) return 1;
      if (a["votes"].length > b["votes"].length) return -1;
      return 0;
    });


    return movieswithVoteCounts;
  }

  const imgPath = "https://image.tmdb.org/t/p/original";
  if (room === 0) {
    return <div></div>;
  } else {
    return (
      <div className="absolute top-0 right-0 font-bold text-white mt-36 mr-36 w-1/5">
        <div>Username: {username}</div>
        <div>Room: {room?.id}</div>
        <div>Users: </div>

        {room?.users.map((user, index) => (
          <div key={index}>{user.name}</div>
        ))}
        <section>
          <div>Movies: </div>
          {getListWithVoteCounts(room?.movieScoreList).map((movie, index) => (
            <div key={index}>
              <button
                data-for="main"
                data-tip={`${movie.title}<br />${voterList(movie)}`}
                data-iscapture="true"
              >
                <img
                  className="w-1/5"
                  src={`${imgPath}${movie.img}`}
                  alt={"alt"}
                />
              </button>
              <div>{movie.votes.length}</div>
            </div>
          ))}
          <ReactTooltip
            id="main"
            place="right"
            type="dark"
            effect="float"
            multiline={true}
          />
        </section>
      </div>
    );
  }
}
