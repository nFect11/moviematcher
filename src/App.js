import { useState } from "react";
import GetStarted from "./components/landing/GetStarted";
import Menu from "./components/Menu"
import Setup from "./components/setup/Setup";

function App() {
  const [step, changeStep] = useState(0);

  const handleNext = () => {
    changeStep(step + 1);
  };

  return (
    <div className="App">
      {(() => {
        switch (step) {
          case 0:
            return <GetStarted start={handleNext} />;
          case 1:
            return <Setup />;
          default:
            return <div></div>;
        }
      })()}
      
    </div>
  );
}

export default App;
