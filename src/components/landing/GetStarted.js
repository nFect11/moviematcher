import { Button } from "@mui/material";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import logoWhite from "../../images/LogoWhite.png";

export default function GetStarted(props) {
	return (
		<div className="flex flex-col w-screen h-screen justify-center items-center">
			<div className="lg:w-2/5 sm: w-4/5">
				<img className="w-full" src={logoWhite} alt="Logo" />
				<h2 className="text-white text-justify py-8 text-xl">
					Are you sick of endlessly browsing through Netflix, Prime or
					Disney+ with your friends trying to find an entertaining
					movie?<br />MovieMatcher tries to provide a solution to this
					conundrum with a Tinder-like voting system.<br />Just enter a
					name, either create or join a room and select your desired
					genres and streaming services.<br />When you are voting with your
					friends you might notice that you'll sometimes vote for
					movies which don't match your selected genres. This is an
					intended feature. By the off chance you'll like a movie not
					matching your genre taste, it increases the possibility of
					finding a movie entertaining for everyone.
				</h2>
				<Button
					onClick={props.start}
					className="w-full btn"
					sx={{fontSize: "1.2rem", backgroundColor: "#E9A6A6"}}
					variant="contained"
					startIcon={<KeyboardArrowRightOutlinedIcon />}
					endIcon={<KeyboardArrowRightOutlinedIcon />}
				>
					Let's go
				</Button>
			</div>
		</div>
	);
}
