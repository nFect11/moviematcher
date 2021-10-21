import { createContext, useState } from "react";

const GenreContext = createContext({
  loveIt: [],
  hateIt: [],
  handleLoveIt: (event) => {},
  handleHateIt: (event) => {},
});

export function GenreContextProvider(props) {
  const [loveItItems, setLoveIt] = useState([]);
  const [hateItItems, setHateIt] = useState([]);

  const loveItHandler = (event) => {
    if (loveItItems.includes(event.target.name)) {
      setLoveIt(loveItItems.filter((genre) => genre !== event.target.name));
    } else {
      setHateIt(hateItItems.filter((genre) => genre !== event.target.name));
      setLoveIt(loveItItems.concat(event.target.name));
    }
  };
  const hateItHandler = (event) => {
    if (hateItItems.includes(event.target.name)) {
      setHateIt(hateItItems.filter((genre) => genre !== event.target.name));
    } else {
      setLoveIt(loveItItems.filter((genre) => genre !== event.target.name));
      setHateIt(hateItItems.concat(event.target.name));
    }
  };

  const context = {
    loveIt: loveItItems,
    hateIt: hateItItems,
    handleLoveIt: loveItHandler,
    handleHateIt: hateItHandler,
  };
  return (
    <GenreContext.Provider value={context}>
      {props.children}
    </GenreContext.Provider>
  );
}
export default GenreContext