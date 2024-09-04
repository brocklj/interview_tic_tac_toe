/*
// TODO:
// declare module 'BoardValidator' {
*/
import { Board } from "./Board"

export type GameStatus = GameStatusEnum


export enum GameStatusEnum {
    // If the game is still on (PLAY)
    PLAY = "PLAY",
    // If it ended with one of the the players winning
    WIN = "WIN",
    // If there is no valid move left but the players did not met winnning criteria (TIE)
    TIE = "TIE",
    // Board is not valid (ERROR)
    ERROR = "ERROR"

}

export interface BoardValidatorOutput {
    status: GameStatus,
    error?: string | null
}

/*  
    Error cases and their explanation
*/
export enum BoardValidatorErrors {

    EInvalidLineLengthInput = "Invalid input of lineLength",

    EInvalidBoardSizeInput = "Invalid size of board input",

    // General input error
    E0 = "Board input validation error",

    // Explanation: The first player always plays "X".
    E1 = "Player one must start the game",

    // Explanation: Player one did move twice in a row.
    E2 = "Players take turns making moves",

    // Explanation: Player X has already won before Player O could make third move
    E3 = "Player $player played after game was already won"

}

export interface IBoardValidationStrategy {
    getGameStatus(board: Board, lineLength: number): GameStatus | null
}