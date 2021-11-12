import { useState } from "react";
import GetStarted from "./components/landing/GetStarted";
import LayoutMatcher from "./components/layout/LayoutMatcher";
import Setup from "./components/setup/Setup";
import { RoomProvider } from "./contexts/roomContext";
function App() {
  const [step, changeStep] = useState(0);

  const handleNext = () => {
    changeStep(step + 1);
  };

  return (
    <div className="App">
      <RoomProvider>
        {(() => {
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
        })()}
      </RoomProvider>
    </div>
  );
}

export default App;
