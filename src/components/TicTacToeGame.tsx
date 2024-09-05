import * as React from "react";
import { Board } from "../utils/BoardValidator/Board";
import { CellEnum, CellType, PlayerEnum } from "../common-types/Cell.d";
import { BoardComponent } from "./BoardComponent";
import { BoardValidator } from "../utils/BoardValidator/BoardValidator";
import {
  BoardValidatorOutput,
  GameStatusEnum,
} from "../utils/BoardValidator/BoardValidator.d";
import { StartForm } from "./StartForm";

import "./TicTacToeGame.css";
import { BoardPlayerBotRandomStrategy } from "../utils/BoardPlayerBot/BoardPlayerBotRadomStrategy";
import { PlayerConfig } from "../common-types/PlayerConfig";
import { BoardPlayerBotSmart } from "../utils/BoardPlayerBot/BoardPlayerBotSmart";

const boardValidator = new BoardValidator();

const randomPlayerBot = new BoardPlayerBotRandomStrategy();

const smartPlayerBot = new BoardPlayerBotSmart();

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
  // Use this to detect when Game has finished
  React.useEffect(() => {
    if (
      gameStatus?.status == GameStatusEnum.ERROR ||
      gameStatus?.status == GameStatusEnum.TIE ||
      gameStatus?.status == GameStatusEnum.WIN
    ) {
      if (step != TickTackToeGameStep.FINISH) {
        setStep(TickTackToeGameStep.FINISH);
      }
    }
  }, [gameStatus, step]);

  const [currentPlayer, setCurrentPlayer] = React.useState<CellType>(
    CellEnum.X
  );

  const [playerOne, setPlayerOne] = React.useState<PlayerConfig>(
    PlayerConfig.User
  );
  const [playerTwo, setPlayerTwo] = React.useState<PlayerConfig>(
    PlayerConfig.User
  );

  function startOver() {
    if (board) {
      onStartSubmit(
        board?.width,
        board?.height,
        lineLength,
        playerOne,
        playerTwo
      );
    }
    setStep(TickTackToeGameStep.START);
  }

  function onStartSubmit(
    width: number,
    height: number,
    lineLength: number,
    playerOne: PlayerConfig,
    playerTwo: PlayerConfig
  ) {
    const b = new Board(Board.generateBoardCell(width, height));
    setBoard(b);
    setLineLength(lineLength);
    setCurrentPlayer(CellEnum.X);
    setStep(TickTackToeGameStep.PLAY);
    setGameStatus(null);
    setPlayerOne(playerOne);
    setPlayerTwo(playerTwo);
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

  // User and Bot player configuration
  React.useEffect(() => {
    if (step != TickTackToeGameStep.PLAY) {
      return;
    }

    const currentUserConfig =
      currentPlayer == CellEnum.X ? playerOne : playerTwo;

    if (currentUserConfig != PlayerConfig.User) {
      if (board) {
        let pos;
        if (currentUserConfig == PlayerConfig.BotRandom) {
          pos = randomPlayerBot.performNextMove(board);
        }
        if (currentUserConfig == PlayerConfig.BotSmart) {
          pos = smartPlayerBot.performNextMove(
            board,
            currentPlayer as PlayerEnum
          );
        }
        if (pos) {
          setTimeout(() => {
            onCellClick(pos.posX, pos.posY);
          }, 1000);
        }
      }
    }
  }, [currentPlayer, board, step, playerOne, playerTwo, onCellClick]);

  return (
    <>
      {step == TickTackToeGameStep.START && (
        <>
          <StartForm onSubmit={onStartSubmit} />
        </>
      )}
      {step != TickTackToeGameStep.START && (
        <>
          <div className="infoBlock">
            {step == TickTackToeGameStep.PLAY && (
              <>
                <h2>
                  Player:{" "}
                  <span
                    style={{
                      color: `${currentPlayer == CellEnum.X ? "green" : "red"}`,
                    }}
                  >
                    {currentPlayer}
                  </span>
                </h2>
              </>
            )}
            {step == TickTackToeGameStep.FINISH && (
              <>
                {gameStatus?.status == GameStatusEnum.WIN && (
                  <h2
                    className="user-won title"
                    style={{
                      color: currentPlayer == CellEnum.X ? "green" : "red",
                    }}
                  >
                    User {currentPlayer} Won!
                  </h2>
                )}
                {gameStatus?.status == GameStatusEnum.TIE && (
                  <h2 className={"shake"}>TIE!</h2>
                )}
                {gameStatus?.status == GameStatusEnum.ERROR && (
                  <>
                    <h3>{gameStatus?.status} </h3>
                    <h4>{gameStatus?.error} </h4>
                  </>
                )}
              </>
            )}
          </div>
          <div>
            <BoardComponent
              board={board}
              onCellClick={(posX: number, posY: number) => {
                const currentUserConfig =
                  currentPlayer == CellEnum.X ? playerOne : playerTwo;                
                if (currentUserConfig == PlayerConfig.User) {
                  onCellClick(posX, posY);
                }
              }}
            />
          </div>
          <div>
            <p>
              | Board: {board?.width}x{board?.height} | Line Length:{" "}
              {lineLength} |
            </p>
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
