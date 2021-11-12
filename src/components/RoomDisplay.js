import { useContext} from "react";
import { RoomContext } from "../contexts/roomContext";

export default function RoomDisplay() {
	const { room } = useContext(RoomContext);

	if (room === undefined) {
		return <div></div>;
	} else {
		return (
			<div>
				<div className="w-full text-center text-white">
					<span className="text-xl">Room</span>
				</div>
				<div className="w-full text-center">
					<div
						className="border-2 rounded-md"
						style={{ fontSize: "2vw" }}
					>
						{room?.uniqueRoom}
					</div>
				</div>
			</div>
		);
	}
}