import { useContext } from "react";
import { RoomContext } from "../contexts/roomContext";

export function RoomDisplay() {
  const { room } = useContext(RoomContext);

  function getListWithVoteCounts(movies) {
    if (!movies) return {};
    let movieswithVoteCounts = {};

    for (let i = 0; i < movies.length; i++) {
      if (movieswithVoteCounts.hasOwnProperty(movies[i].id)) {
        movieswithVoteCounts[movies[i].id]["votes"] =
          movieswithVoteCounts[movies[i].id]["votes"] + 1;
      } else {
        movieswithVoteCounts[movies[i].id] = {
          votes: 1,
          img: movies[i].poster_path,
        };
      }
    }
    return movieswithVoteCounts;
  }
  const imgPath = "https://image.tmdb.org/t/p/original";
  if (room === 0) {
    return <div></div>;
  } else {
    return (
      <div className="absolute top-0 right-0 font-bold text-white pt-36 pr-36">
        <div>Room: {room?.id}</div>
        <div>Users: </div>
        {room?.users.map((user, index) => (
          <div key={index}>{user.name}</div>
        ))}

        <div>Movies: </div>
        {Object.keys(getListWithVoteCounts(room?.movieScoreList)).map(
          (movie, index) => (
            <div key={index}>
              <img
                className="w-24"
                src={`${imgPath}${
                  getListWithVoteCounts(room?.movieScoreList)[movie]["img"]
                }`}
                alt={"alt"}
              />
              <div>
                {getListWithVoteCounts(room?.movieScoreList)[movie]["votes"]}
              </div>
            </div>
          )
        )}
      </div>
    );
  }
}
