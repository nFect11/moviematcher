import { useState } from "react";
import CreateOrJoin from "../landing/CreateOrJoin";
import GenreSelector from "../genreSelector/GenreSelector";
import GenreSelectorHate from "../genreSelector/GenreSelectorHate";
import StreamingProvider from "../genreSelector/StreamingProvider";
import MovieList from "../movies/MovieList";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Button } from "@mui/material";
import { RoomDisplay } from "../RoomDisplay";
import { RoomProvider } from "../../contexts/roomContext";

export default function Setup() {
	const [stepper, changeStepper] = useState(0);

	const handleNext = () => {
		changeStepper(stepper + 1);
	};
	const handleDoubleNext = () => {
		changeStepper(stepper + 2);
		console.log("Test")
	}
	const handlePrev = () => {
		if (stepper > 0) {
			changeStepper(stepper - 1);
		}
	};	

	return (
		<RoomProvider>
			<div className="h-screen w-screen flex">
				<div
					id="shadow-box"
					className="relative w-1/3 h-1/3 mx-auto my-auto rounded-lg shadow-lg"
				>
					<div className="absolute -left-20 top-1/2">
						<Button fontSize="large" onClick={handlePrev}>
							<NavigateBeforeIcon />
						</Button>
					</div>
					{(() => {
						switch (stepper) {
							case 0:
								return (
									<CreateOrJoin
										prev={handlePrev}
										next={handleNext}
										doubleNext={handleDoubleNext}
									/>
								);
							case 1:
								return <GenreSelector />;
							case 2:
								return <GenreSelectorHate />;
							case 3:
								return <StreamingProvider />;
							case 4:
								return <MovieList />;
							default:
								return <div></div>;
						}
					})()}
					<div className="absolute -right-20 top-1/2">
						<Button fontSize="large" onClick={handleNext}>
							<NavigateNextIcon />
						</Button>
					</div>
				</div>
				{stepper > 0 && <RoomDisplay />}
			</div>
		</RoomProvider>
	);
}
