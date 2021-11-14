import { Button } from "@mui/material";
import { RoomContext } from "../../contexts/roomContext";
import { supabase } from "../../utils/supabaseClient";
import { useContext, useEffect } from "react";
import GenreContext from "../store/genre-context";

export default function CreateOrJoin(props) {
	const genreCtx = useContext(GenreContext);
	const { setRoom } = useContext(RoomContext);

	useEffect(() => {
		genreCtx.changeUserId("_" + Math.random().toString(36).substr(2, 9));
		// eslint-disable-next-line
	}, []);

	async function handleCreateGroup() {
		const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		let randomStr = "";

		for (let i = 0; i < 4; i++) {
			const randomNum = Math.floor(Math.random() * characters.length);
			randomStr += characters[randomNum];
		}

		const { data } = await supabase.from("rooms").insert([
			{
				uniqueRoom: randomStr,
				users: [{ name: genreCtx.userName, id: genreCtx.userId }],
				movieScoreList: [],
			},
		]);

		setRoom(data[0]);

		connect(data[0].id);
		props.doubleNext();
	}

	function connect(id) {
		supabase
			.from("rooms:id=eq." + id)
			.on("UPDATE", (payload) => {
				async function updateRoom() {
					const { data: data1 } = await supabase
						.from("rooms")
						.select("*")
						.match({ id: id });

					setRoom(data1[0]);
				}
				updateRoom();
			})
			.subscribe();
	}

	return (
		<div className="h-full flex flex-col justify-between items-center">
			<h1 className="text-white pt-8 text-7xl">Name:</h1>
			<input
				value={genreCtx.userName}
				className="w-4/5 text-6xl"
				onChange={(e) => genreCtx.changeUserName(e.target.value)}
			/>
			<div className="h-1/2 w-full grid grid-flow-row md:grid-flow-col items-center justify-items-center">
				<Button
					onClick={handleCreateGroup}
					disabled={genreCtx.userName === ""}
					sx={{ fontSize: "2.1rem", backgroundColor: "#864879", "&:hover": {
						backgroundColor: "#d47bc7",
					}, }}
					variant="contained"
					className="w-4/5 md:w-3/4 h-4/5 md:h-2/5"
				>
					Create
					<br />
					group
				</Button>
				<Button
					disabled={genreCtx.userName === ""}
					sx={{
						fontSize: "2.1rem",
						backgroundColor: "#864879",
						"&:hover": {
							backgroundColor: "#d47bc7",
						},
					}}
					onClick={props.next}
					variant="contained"
					className="w-4/5 md:w-3/4 h-4/5 md:h-2/5"
				>
					Join
					<br />
					group
				</Button>
			</div>
		</div>
	);
}
