import { Button } from "@mui/material";
import { RoomContext } from "../../contexts/roomContext";
import { supabase } from "../../utils/supabaseClient";
import { useContext, useEffect, useState } from "react";
import GenreContext from "../store/genre-context";

export default function CreateOrJoin(props) {
	const genreCtx = useContext(GenreContext);
	const { setRoom } = useContext(RoomContext);

	useEffect(() => {
		genreCtx.changeUserId("_" + Math.random().toString(36).substr(2, 9));
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
		<div className="h-full flex flex-col justify-around items-center">
			<div className="flex flex-col h-1/2 justify-center items-center">
				<h1 className="text-white" style={{ fontSize: "2vw" }}>
					Name:
				</h1>
				<input
					style={{ fontSize: "2vw" }}
					value={genreCtx.userName}
					onChange={(e) => genreCtx.changeUserName(e.target.value)}
				/>
			</div>
			<div className="h-1/2 grid grid-flow-col justify-around items-center">
				<Button
					onClick={handleCreateGroup}
					disabled={genreCtx.userName === ""}
					variant="contained"
					className="h-1/2 p-8 min-w-full"
				>
					Create a group
				</Button>
				<Button
					disabled={genreCtx.userName === ""}
          variant="contained"
					className="h-1/2 p-8"
				>
					Join a group
				</Button>
			</div>
		</div>
	);
}
