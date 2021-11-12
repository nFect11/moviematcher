import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { GenreContextProvider } from "./components/store/genre-context";

ReactDOM.render(
  <GenreContextProvider>
    <App />
  </GenreContextProvider>,
  document.getElementById("root")
);
