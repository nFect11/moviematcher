import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { GenreContextProvider } from "./components/store/genre-context";
import "./fonts/proxima.ttf";
import { BrowserRouter } from "react-router-dom";
import { RoomProvider } from "./contexts/roomContext";

ReactDOM.render(
    <GenreContextProvider>
        <RoomProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </RoomProvider>
    </GenreContextProvider>,
    document.getElementById("root")
);
