import MovieCard from "../movies/MovieCard";
import RoomDisplay from "../RoomDisplay";
import Scoreboard from "../scoreboard/Scoreboard";
import logoWhite from "../../images/LogoWhite.png";
import UserInfo from "../roomInfo/UserInfo";
import UserList from "../roomInfo/UserList";

export default function LayoutMatcher() {
	return (
		<div className="main-area w-screen h-screen">
			<div className="logo-div">
				<div className="justify-center">
					<img className="w-full" src={logoWhite} alt="Logo" />
				</div>
			</div>
			<div className="comps room-info rounded-lg">
			</div>
			<div className="comps navigation rounded-lg"></div>
			<div className="comps movie-area rounded-lg">
				<MovieCard />
			</div>
			<div className="comps ranking rounded-lg">
				<h1>Scoreboard</h1> <Scoreboard />
			</div>
			<div className="comps footer rounded-lg"></div>
			<div className="comps settings rounded-lg">
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
		</div>
	);
}
