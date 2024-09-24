import * as React from "react";

import "./StartForm.css";
import { Board } from "../utils/BoardValidator/Board";
import { BoardValidator } from "../utils/BoardValidator/BoardValidator";
import { PlayerConfig } from "../common-types/PlayerConfig";

export function StartForm({
  onSubmit,
  ...props
}: {
  width: number;
  height: number;
  lineLength: number;
  playerOne: PlayerConfig;
  playerTwo: PlayerConfig;
  onSubmit: (
    width: number,
    height: number,
    lineLength: number,
    playerOne: PlayerConfig,
    playerTwo: PlayerConfig
  ) => void;
}) {
  const [width, setWidth] = React.useState(props.width.toString() || "3");
  const [height, setHeight] = React.useState(props.height.toString() || "3");
  const [lineLength, setLineLength] = React.useState(
    props.lineLength.toString() || "3"
  );
  const [playerOne, setPlayerOne] = React.useState(
    props.playerOne ||
      // TODO: Better temporarily build fix
      PlayerConfig.User.toString()
  );
  const [playerTwo, setPlayerTwo] = React.useState(
    props.playerTwo || PlayerConfig.User.toString()
  );

  const [error, setError] = React.useState("");

  function submitEvent(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const w = parseInt(width);
    const h = parseInt(height);
    const lh = parseInt(lineLength);

    try {
      const b = new Board(Board.generateBoardCell(w, h), parseInt(lineLength));

      const v = new BoardValidator();
      const validationOutput = v.validateBoard(lh, b.value);

      if (validationOutput.status == "ERROR") {
        throw Error(validationOutput.error || "");
      }

      onSubmit(w, h, lh, parseInt(playerOne), parseInt(playerTwo));
    } catch (error: Error | unknown) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  }

  return (
    <div>
      <form
        action="#"
        name="StartForm"
        className="startForm"
        onSubmit={submitEvent}
      >
        <fieldset>
          <legend>Width</legend>
          <input
            type="number"
            min={3}
            max={10}
            name="width"
            placeholder="Width"
            value={width}
            onChange={(event) => {
              setWidth(event.target.value || "");
            }}
          />
        </fieldset>
        <fieldset>
          <legend>Height</legend>
          <input
            type="number"
            min={3}
            max={10}
            name="height"
            placeholder="Height"
            value={height}
            onChange={(event) => {
              setHeight(event.target.value || "");
            }}
          />
        </fieldset>
        <fieldset>
          <legend>Line Length</legend>
          <input
            min={3}
            max={Math.min(parseInt(width), parseFloat(height))}
            type="number"
            name="lineLength"
            placeholder="Line Length"
            value={lineLength}
            onChange={(event) => {
              setLineLength(event.target.value);
            }}
          />
        </fieldset>

        <p>{error && "Error: " + error}</p>
        <p>Player Settings</p>
        <fieldset>
          <legend style={{ color: "green" }}>Player X</legend>
          <select
            name="pX"
            id="pX"
            value={playerOne}
            onChange={(e) => setPlayerOne(e.target.value)}
          >
            <option value="">User 1</option>
            <option value={PlayerConfig.BotRandom}>BOT random</option>
            <option value={PlayerConfig.BotSmart}>BOT smart (WIP)</option>
          </select>
        </fieldset>

        <fieldset>
          <legend style={{ color: "red" }}>Player O</legend>
          <select
            name="pY"
            id="pY"
            value={playerTwo}
            onChange={(e) => setPlayerTwo(e.target.value)}
          >
            <option value="">User 2</option>
            <option value={PlayerConfig.BotRandom}>BOT random</option>
            <option value={PlayerConfig.BotSmart}>BOT smart (WIP)</option>
          </select>
        </fieldset>

        <input className="submitButton" type="submit" value="🚀 START GAME" />
      </form>
    </div>
  );
}
