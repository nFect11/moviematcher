import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Create from "./Create";
import Join from "./Join";
import MainMenu from "./MainMenu";
import Logo from "../../images/Logo.png";

export default function Landing() {
    return (
        <div className="flex flex-col w-screen">
            <div className="m-auto">
                <img className="w-full" src={Logo} alt="Logo" />
                LANDING
                <BrowserRouter>
                    <Routes>
                        <Route exact path="/" element={<MainMenu />} />
                        <Route exact path="/create" element={<Create />} />
                        <Route exact path="/join" element={<Join />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </div>
    );
}
