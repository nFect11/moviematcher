import { Button } from "@mui/material";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";

export default function GetStarted(props) {
  return (
    <div className="flex flex-col w-screen h-screen justify-center items-center">
      <div className="w-1/3">
        <img
          className="w-full"
          src="https://via.placeholder.com/1000x500"
          alt="Logo"
        />
        <h2>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
          efficitur, massa ac semper tempus, lacus massa gravida neque, eget
          congue massa lectus vitae felis. Nulla auctor augue id mauris aliquam
          dignissim. Integer vitae lectus eget nibh congue sollicitudin nec vel
          nisl. Maecenas eget tempor lectus. Nunc ut ligula magna. Nullam
          condimentum ipsum dui, efficitur pretium urna commodo non. Nullam
          venenatis nulla convallis libero gravida, nec placerat nisi varius.
          Vivamus dictum mauris in dui varius, ornare feugiat ante fermentum.
          Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
          posuere cubilia curae; Aenean eleifend bibendum nisl quis
          pellentesque. Proin viverra eu.
        </h2>
          <Button
          onClick={props.start}
            className="h-24 w-full"
            id="get-started"
            variant="contained"
            startIcon={<KeyboardArrowRightOutlinedIcon />}
            endIcon={<KeyboardArrowRightOutlinedIcon />}
          >
            Get Started
          </Button>
      </div>
    </div>
  );
}
