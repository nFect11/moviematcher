import { useContext } from "react";
import GetStarted from "./components/landing/GetStarted";
import LayoutMatcher from "./components/layout/LayoutMatcher";
import Setup from "./components/setup/Setup";
import { RoomProvider } from "./contexts/roomContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Reconnect from "./components/roomInfo/Reconnect";
import GenreContext from "./components/store/genre-context";
import Landing from "./components/landing/Landing";

import Create from "./components/landing/Create";
import Join from "./components/landing/Join";
import MainMenu from "./components/landing/MainMenu";
import Logo from "./images/LogoNeu.png";
import MenuField from "./components/landing/MenuField";

export default function App() {
    const genreCtx = useContext(GenreContext);
    /* return (
        <div className="flex flex-col App">
            <div className="m-auto">
                <img className="w-full" src={Logo} alt="Logo" />

                <BrowserRouter>
                    <Routes>
                        <Route exact path="/" element={<MainMenu />} />
                        <Route exact path="/create" element={<Create />} />
                        <Route exact path="/join" element={<Join />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </div>
    ); */

    return (
        <div className="App">
            <div className="invert">
                <img src={Logo} className="w-1/4 mx-auto" />
            </div>

            <MenuField />
        </div>
    );
    /* return (
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
                          <Route path="/" element={<Landing />} />
                          <Route path="/setup/" element={<Setup />} />
                          <Route
                              path="/swiper/"
                              element={<LayoutMatcher />}
                          />
                      </Routes>
                  )}
              </BrowserRouter>
          </RoomProvider>
      </div>
  );  */
}
