/* eslint-disable jsx-a11y/anchor-is-valid */
import { useContext, useEffect, useState } from "react";
import { RoomContext } from "../contexts/roomContext";
import GenreContext from "./store/genre-context";
import ReactTooltip from "react-tooltip";

export function RoomDisplay() {
  const { room } = useContext(RoomContext);
  const genreCtx = useContext(GenreContext);

  function voterList(votedMovie) {
    let nameList = "";
    votedMovie.voter.forEach((voterName) => {
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
  });

  function getListWithVoteCounts(movies) {
    if (!movies) return [];
    let existsFlag = false;
    let movieswithVoteCounts = [];

    //for (let i = 0; i < movies.length; i++) {
    //  if (movieswithVoteCounts.hasOwnProperty(movies[i].id)) {
    //    movieswithVoteCounts[movies[i].id]["votes"] =
    //      movieswithVoteCounts[movies[i].id]["votes"] + 1;
    //  } else {
    //    movieswithVoteCounts[movies[i].id] = {
    //      votes: 1,
    //      img: movies[i].poster_path,
    //    };
    //  }
    //}

    for (let i = 0; i < movies.length; i++) {
      existsFlag = false;
      for (let j = 0; j < movieswithVoteCounts.length; j++) {
        if (movieswithVoteCounts[j].id === movies[i].id) {
          if (!movieswithVoteCounts[j].voter.includes(movies[i].voter)) {
            movieswithVoteCounts[j].voter.push(movies[i].voter);
          }
          existsFlag = true;
          break;
        }
      }
      !existsFlag &&
        movieswithVoteCounts.push({
          id: movies[i].id,
          img: movies[i].poster_path,
          voter: [genreCtx.userId],
        });
    }
    movieswithVoteCounts.sort((a, b) =>
      a.voter.length > b.voter.length
        ? 1
        : b.voter.length > a.voter.length
        ? -1
        : 0
    );
    movieswithVoteCounts.reverse();
    return movieswithVoteCounts;
  }
  const imgPath = "https://image.tmdb.org/t/p/original";
  if (room === 0) {
    return <div></div>;
  } else {
    return (
      <div className="absolute top-0 right-0 font-bold text-white mt-36 mr-36 w-1/5">
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
                data-tip={voterList(movie)}
                data-iscapture="true"
              >
                <img
                  className="w-1/5"
                  src={`${imgPath}${movie.img}`}
                  alt={"alt"}
                />
              </button>
              <div>{movie.voter.length}</div>
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
