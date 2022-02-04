import { useState } from "react";
import GetStarted from "./components/landing/GetStarted";
import LayoutMatcher from "./components/layout/LayoutMatcher";
import Setup from "./components/setup/Setup";
import { RoomProvider } from "./contexts/roomContext";
import { Landing } from "./components/design/landing";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const [step, changeStep] = useState(0);

  const handleNext = () => {
    changeStep(step + 1);
  };

  return (
    <div className="App">
      <RoomProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<GetStarted />} />
            <Route path="/setup/" element={<Setup />} />
            <Route path="/swiper/" element={<LayoutMatcher />} />

            {/* {(() => {
              switch (step) {
                case 0:
                  return <GetStarted start={handleNext} />;
                case 1:
                  return <Setup start={handleNext} />;
                case 2:
                  return <LayoutMatcher />;
                default:
                  return <div></div>;
              }
            })()} */}
          </Routes>
        </BrowserRouter>
      </RoomProvider>
    </div>
  );
}

export default App;
