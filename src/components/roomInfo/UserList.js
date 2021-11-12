import { useContext } from "react";
import { RoomContext } from "../../contexts/roomContext";

export default function UserList() {
	const { room } = useContext(RoomContext);

	return (
		<div>
			<div className="w-full text-center text-white">
				<span className="text-xl font-bolds">Users</span>
			</div>
			<div style={{ fontSize: "1.2vw" }} className="w-full text-white text-center">
				<ul>
					{room?.users.map((user, index) => (
						<li key={index}>{user.name}</li>
					))}
				</ul>
			</div>
		</div>
	);
}
