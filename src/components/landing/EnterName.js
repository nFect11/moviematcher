import { useContext, useEffect } from "react";
import GenreContext from "../store/genre-context";

export default function EnterName(props) {
  const genreCtx = useContext(GenreContext);

  useEffect(() => {
    genreCtx.changeUserId("_" + Math.random().toString(36).substr(2, 9));
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
        props.next();
      }
  }

  return (
    <div className="flex flex-col h-full justify-center items-center">
      <h1 className="text-white" style={{ fontSize: "2vw" }}>
        Enter a Name:
      </h1>
      <input
        style={{ fontSize: "2vw" }}
        value={genreCtx.userName}
        onChange={(e) => genreCtx.changeUserName(e.target.value)}
        onKeyDown={handleKeyDown} 
      />
    </div>
  );
}
