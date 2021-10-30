import { useEffect, useContext } from "react";
import ReactTooltip from "react-tooltip";
import { RoomContext } from "../../contexts/roomContext";

export default function Scoreboard() {
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

  useEffect(() => {
    ReactTooltip.rebuild();
  }, [room?.movieScoreList]);

  return (
    <div>
      <section>
        <div className="grid grid-cols-3 gap-10 min-h-192 max-h-192 overflow-y-scroll">
          {getListWithVoteCounts(room?.movieScoreList).map((movie, index) => (
            <div key={index}>
              <button data-for={`${index}`} data-tip data-iscapture="true">
                <div className="relative "><img
                  className="h-64 rounded"
                  src={`${imgPath}${movie.img}`}
                  alt={"alt"}
                /></div>
                <div className="absolute bottom-0 right-0 bg-gray-800">
                    Test
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
                    <td className="text-right">{movie.votes.length}</td>
                  </tr>
                  <tr>
                    <td className="leading-8 align-text-top">Voter:</td>
                    <td className="text-right leading-6">
                    <ul>
                        {voterList(movie).map(x => {
                            return <li>{x}</li>
                        })}
                    </ul>
                  </td>
                  </tr>
                  
                </table>
              </ReactTooltip>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
