import { useContext, useState } from "react";
import GetStarted from "./components/landing/GetStarted";
import LayoutMatcher from "./components/layout/LayoutMatcher";
import Setup from "./components/setup/Setup";
import { RoomProvider } from "./contexts/roomContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Reconnect from "./components/roomInfo/Reconnect";
import GenreContext from "./components/store/genre-context";

export default function App() {
  const genreCtx = useContext(GenreContext);
  return (
    <div className="App">
      <RoomProvider>
        <BrowserRouter>
          {localStorage.getItem("lastRoom") !== null &&
          genreCtx.lobbyLeft === "true" ? (
            <Routes>
              <Route path="/*" element={<Reconnect />} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/" element={<GetStarted />} />
              <Route path="/setup/" element={<Setup />} />
              <Route path="/swiper/" element={<LayoutMatcher />} />
            </Routes>
          )}
        </BrowserRouter>
      </RoomProvider>
    </div>
  );
}
