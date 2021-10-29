import React from "react";
import "./App.css";
import "antd/dist/antd.css";
import { Divider} from "antd";
import GameBoard from "./components/GameBoard";

function App() {
  return (
    <div className="App">
      <h1>N-puzzle game</h1>
      <Divider />
      <GameBoard />
    </div>
  );
}

export default App;
