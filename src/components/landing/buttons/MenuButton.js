import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

export default function MenuButton(props) {
    return (
        <Link to={`${props.to}`}>
            <Box
                sx={{
                    width: "20rem",
                    height: "6rem",
                    backgroundColor: "#121212",
                    border: "12px solid #30475E",
                    borderRadius: "8px",
                    transition: "background 0.1s, color 0.1s",
                    "&:hover": {
                        backgroundColor: "#30475E",
                    },
                }}
            >
                <div className="text-3xl text-white w-full text-center">
                    {props.menuName}
                </div>
            </Box>
        </Link>
    );
}
