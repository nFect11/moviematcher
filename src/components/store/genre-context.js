import { createContext, useState } from "react";

const GenreContext = createContext({
  loveIt: [],
  hateIt: [],
  streamingProvider: [],
  userName: "",
  userId: "",
  roomId: "",
  handleLoveIt: (event) => {},
  handleHateIt: (event) => {},
  handleStrProv: (event) => {},
  changeUserId: (event) => {},
  changeUserName: (event) => {},
  changeRoomId: (event) => {},
  setLoveIt: () => {},
  setHateIt: () => {},
  setProvider: () => {},
  setLobbyLeft: () => {},
});

export function GenreContextProvider(props) {
  const [loveItItems, setLoveIt] = useState([]);
  const [hateItItems, setHateIt] = useState([]);
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [streamingProviderItems, setStreamingProvider] = useState([]);
  const [roomId, changeRoomId] = useState("");
  const [lobbyLeft, changeLobbyLeft] = useState("true");

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
  const strProviderHandler = (event) => {
    if (streamingProviderItems.includes(event.target.name)) {
      setStreamingProvider(
        streamingProviderItems.filter(
          (provider) => provider !== event.target.name
        )
      );
    } else {
      setStreamingProvider(streamingProviderItems.concat(event.target.name));
    }
  };
  const userIdHandler = (event) => {
    setUserId(event);
  };
  const userNameHandler = (event) => {
    setUserName(event);
  };
  const roomIdHandler = (event) => {
    changeRoomId(event);
  };
  const setLobby = (event) => {
    changeLobbyLeft(event);
  };

  const context = {
    loveIt: loveItItems,
    hateIt: hateItItems,
    streamingProvider: streamingProviderItems,
    userId: userId,
    userName: userName,
    roomId: roomId,
    lobbyLeft: lobbyLeft,
    handleLoveIt: loveItHandler,
    handleHateIt: hateItHandler,
    handleStrProv: strProviderHandler,
    changeUserId: userIdHandler,
    changeUserName: userNameHandler,
    changeRoomId: roomIdHandler,
    setLoveIt: setLoveIt,
    setHateIt: setHateIt,
    setProvider: setStreamingProvider,
    setLobby: setLobby,
  };
  return (
    <GenreContext.Provider value={context}>
      {props.children}
    </GenreContext.Provider>
  );
}
export default GenreContext;
