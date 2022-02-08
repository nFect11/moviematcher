import { useEffect, useContext } from "react";
import ReactTooltip from "react-tooltip";
import { RoomContext } from "../../contexts/roomContext";

export default function Scoreboard(props) {
  const { room } = useContext(RoomContext);

  function voterList(votedMovie) {
    let nameList = [];
    votedMovie.votes.forEach((voterName) => {
      for (let i = 0; i < room?.users.length; i++) {
        if (voterName === room?.users[i].id) {
          nameList.push(room?.users[i].name);
        }
      }
    });
    return nameList;
  }

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
        id: movies[i].id,
      });
    }

    movieswithVoteCounts.sort(function (a, b) {
      if (a["votes"].length < b["votes"].length) return 1;
      if (a["votes"].length > b["votes"].length) return -1;
      return 0;
    });

    return movieswithVoteCounts;
  }

  const openMovieInfo = (event) => {
    let axios = require("axios").default;
    let options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/${event.target.name}?api_key=8da79493434d544b51390e63bbf6eee2&language=en-US&append_to_response=videos,watch/providers`,
    };
    axios
      .request(options)
      .then((response) => {
        props.scoreboardInfo(response.data);
        console.log(response.data["watch/providers"].results.DE.flatrate);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const imgPath = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    ReactTooltip.rebuild();
  }, [room?.movieScoreList]);

  return (
    <div
      className={`w-full scoreboard grid grid-cols-3 gap-10 min-h-80vh max-h-80vh pt-2 pl-2 pr-2 overflow-y-scroll `}
    >
      {getListWithVoteCounts(room?.movieScoreList).map((movie, index) => (
        <div key={index}>
          <button
            data-for={`${index}`}
            data-tip
            data-iscapture="true"
            onClick={openMovieInfo}
          >
            <div className="relative ">
              <img
                className={`h-1/4 rounded ${
                  room?.users.length === movie.votes.length && `outline-green`
                }`}
                name={`${movie.id}`}
                src={`${imgPath}${movie.img}`}
                alt={"alt"}
              />
            </div>
          </button>
          <ReactTooltip
            id={`${index}`}
            place="right"
            type="dark"
            effect="float"
            multiline={true}
          >
            <table className="text-lg">
              <tr className="leading-8">
                <td>Title:</td>
                <td className="text-right">{movie.title}</td>
              </tr>
              <tr className="leading-8">
                <td>Votes:</td>
                <td
                  className={`text-right ${
                    room?.users.length === movie.votes.length &&
                    `text-green-400`
                  }`}
                >
                  {movie.votes.length}
                </td>
              </tr>
              <tr>
                <td className="leading-8 align-text-top">Voter:</td>
                <td className="text-right leading-6">
                  <ul>
                    {voterList(movie).map((x) => {
                      return <li>{x}</li>;
                    })}
                  </ul>
                </td>
              </tr>
            </table>
          </ReactTooltip>
        </div>
      ))}
    </div>
  );
}
