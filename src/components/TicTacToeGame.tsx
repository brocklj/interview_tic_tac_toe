import * as React from "react";
import { Board } from "../utils/BoardValidator/Board";
import { CellEnum, CellType } from "../common-types/Cell.d";
import { BoardComponent } from "./BoardComponent";
import { BoardValidator } from "../utils/BoardValidator/BoardValidator";
import {
  BoardValidatorOutput,
  GameStatusEnum,
} from "../utils/BoardValidator/BoardValidator.d";
import { StartForm } from "./StartForm";

import "./TicTacToeGame.css";

const boardValidator = new BoardValidator();

export function TickTackToeGame() {
  const [gameStatus, setGameStatus] =
    React.useState<BoardValidatorOutput | null>();

  const [lineLength, setLineLength] = React.useState(3);
  const [board, setBoard] = React.useState<Board | null>(
    new Board(Board.generateBoardCell(4, 4))
  );
  const [step, setStep] = React.useState<TickTackToeGameStep>(
    TickTackToeGameStep.START
  );

  const [currentPlayer, setCurrentPlayer] = React.useState<CellType>(
    CellEnum.X
  );

  function startOver() {
    if (board) {
      onStartSubmit(board?.width, board?.height, lineLength);
    }
    setStep(TickTackToeGameStep.START);
  }

  function onStartSubmit(width: number, height: number, lineLength: number) {
    const b = new Board(Board.generateBoardCell(width, height));
    setBoard(b);
    setLineLength(lineLength);
    setCurrentPlayer(CellEnum.X);
    setStep(TickTackToeGameStep.PLAY);
    setGameStatus(null);
  }

  const onCellClick = React.useCallback(
    (posX: number, posY: number) => {
      if (
        board != null &&
        (gameStatus?.status == GameStatusEnum.PLAY || !gameStatus)
      ) {
        board.value[posX][posY] = currentPlayer;
        const status = boardValidator.validateBoard(lineLength, board.value);
        setGameStatus(status);

        if (status.status == GameStatusEnum.PLAY) {
          setCurrentPlayer(
            currentPlayer == CellEnum.X ? CellEnum.O : CellEnum.X
          );
          setBoard(new Board(board.value));
        }
      }
    },
    [gameStatus, currentPlayer, board, lineLength]
  );

  return (
    <>
      {step == TickTackToeGameStep.START && (
        <>
          <StartForm onSubmit={onStartSubmit} />
        </>
      )}
      {step == TickTackToeGameStep.PLAY && (
        <>
          <div className="infoBlock">
            <h2>Player: {currentPlayer} </h2>
            <h3>{gameStatus?.status} </h3>
            <h4>{gameStatus?.error} </h4>
          </div>
          <div>
            {<BoardComponent board={board} onCellClick={onCellClick} />}
          </div>
          <div>
            <button className="starover-button" onClick={startOver}>
              ⟳ Start Over
            </button>
          </div>
        </>
      )}
    </>
  );
}

enum TickTackToeGameStep {
  START,
  PLAY,
  FINISH,
}
