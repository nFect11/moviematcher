import { Button } from "@mui/material";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";

export default function NavButtons(props) {
	return (
		<div className="grid grid-rows-1 grid-cols-2 justify-items-center pt-4">
			<Button
				sx={{
					fontSize: "1.2rem",
					backgroundColor: "#E9A6A6",
					color: "black",
					"&:hover": {
						backgroundColor: "#ffbfbf",
					},
                    fontWeight: 'bolder',

				}}
				className="w-2/3 md:w-1/2"
				onClick={props.prev}
				startIcon={<KeyboardArrowLeftOutlinedIcon />}
			>
				Prev
			</Button>
			<Button
				sx={{
					fontSize: "1.2rem",
					backgroundColor: "#E9A6A6",
					color: "black",
					"&:hover": {
						backgroundColor: "#ffbfbf",
					},
                    fontWeight: 'bolder',
				}}
				className="w-2/3 md:w-1/2"
				onClick={props.next}
				endIcon={<KeyboardArrowRightOutlinedIcon />}
			>
				Next
			</Button>
		</div>
	);
}
