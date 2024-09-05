import * as React from "react";
import { useState } from "react";

import "./App.css";
import { TickTackToeGame } from "./components/TicTacToeGame";

function App() {
  return (
    <>
      <h1 className="title">TIC - TAC - TOE</h1>
      <div>
        <TickTackToeGame />
      </div>
      <div className="card">
        <p>          
        </p>
      </div>
      <p className="read-the-docs">More by J. Bröckl</p>
    </>
  );
}

export default App;
