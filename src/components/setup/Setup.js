import { useState } from "react";
import CreateOrJoin from "../landing/CreateOrJoin";
import GenreSelector from "../genreSelector/GenreSelector";
import GenreSelectorHate from "../genreSelector/GenreSelectorHate";
import StreamingProvider from "../genreSelector/StreamingProvider";
import JoinRoom from "../landing/JoinRoom";
import NavButtons from "./NavButtons";

export default function Setup(props) {
	const [stepper, changeStepper] = useState(0);

	const handleNext = () => {
		if (stepper === 4) {
			props.start();
			return;
		} else {
			changeStepper(stepper + 1);
		}
	};
	const handleDoubleNext = () => {
		changeStepper(stepper + 2);
	};
	const handlePrev = () => {
		if (stepper > 0) {
			changeStepper(stepper - 1);
		}
	};

	return (
		<div className="h-screen w-screen flex">
			<div
				id="shadow-box"
				className="comps relative w-screen sm:w-4/5 lg:w-3/5 xl:w-1/2 h-5/6 md:h-3/4  mx-auto mt-8 lg:my-auto rounded-lg shadow-lg"
			>
				{(() => {
					switch (stepper) {
						case 0:
							return (
								<CreateOrJoin
									next={handleNext}
									doubleNext={handleDoubleNext}
								/>
							);
						case 1:
							return <JoinRoom next={handleNext} />;
						case 2:
							return <GenreSelector />;
						case 3:
							return <GenreSelectorHate />;
						case 4:
							return <StreamingProvider />;
						default:
							return <div></div>;
					}
				})()}
				{stepper > 1 && (<NavButtons prev={handlePrev} next={handleNext} />)}
			</div>
		</div>
	);
}
