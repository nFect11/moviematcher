import { useContext, useState } from "react";
import GetStarted from "./components/landing/GetStarted";
import LayoutMatcher from "./components/layout/LayoutMatcher";
import Setup from "./components/setup/Setup";
import { RoomProvider } from "./contexts/roomContext";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

export default function App() {
  
  return (
    <div className="App">
      <RoomProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<GetStarted />} />
            <Route path="/setup/" element={<Setup />} />
            <Route path="/swiper/" element={<LayoutMatcher />} />
          </Routes>
        </BrowserRouter>
      </RoomProvider>
    </div>
  );
}
