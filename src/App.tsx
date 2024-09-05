import * as React from "react";
import { useState } from "react";

import "./App.css";
import { TickTackToeGame } from "./components/TickTackToeGame";

function App() {
  return (
    <>
      <h1>TIC - TAC - TOE</h1>
      <div>
        <TickTackToeGame />
      </div>
      <div className="card">
        <p>
          Edit <code>code</code>
        </p>
      </div>
      <p className="read-the-docs">More by J. Bröckl</p>
    </>
  );
}

export default App;
