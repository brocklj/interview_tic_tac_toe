import { PlayerEnum, PosType } from "../../common-types/Cell.d";
import { Board } from "../BoardValidator/Board";


export interface IBotPlayerBot {

    performNextMove(board: Board, currentPlayer: PlayerEnum): PosType | null
}