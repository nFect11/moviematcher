import { Routes, Route } from "react-router-dom";
import MainMenu from "./MainMenu";
import Create from "./Create";
import Join from "./Join";

export default function MenuField() {
    return (
        <div>
            <Routes>
                <Route exact path="/" element={<MainMenu />} />
                <Route exact path="/create/" element={<Create />} />
                <Route exact path="/join/" element={<Join />} />
            </Routes>
        </div>
    );
}
