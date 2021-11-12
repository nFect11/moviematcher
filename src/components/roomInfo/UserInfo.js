import { useState, useContext, useEffect } from "react";
import GenreContext from "../store/genre-context";
import { RoomContext } from "../../contexts/roomContext";

export default function UserInfo() {
	const genreCtx = useContext(GenreContext);

	const { room } = useContext(RoomContext);
	const [username, changeUsername] = useState("");

	useEffect(() => {
		for (let i = 0; i < room?.users.length; i++) {
			if (genreCtx.userId === room?.users[i].id)
				changeUsername(room?.users[i].name);
		}
        // eslint-disable-next-line
	}, [room?.users]);

	return (
		<div>
			<div className="w-full text-center text-white">
				<span className="text-xl">Username</span>
			</div>

			<div className="w-full text-white text-center" style={{ fontSize: "1.5vw" }}>
				{username}
			</div>
		</div>
	);
}
