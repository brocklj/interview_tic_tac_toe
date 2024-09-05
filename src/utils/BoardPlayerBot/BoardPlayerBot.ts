import { PlayerEnum, PosType } from "../../common-types/Cell.d";
import { Board } from "../BoardValidator/Board";




export class BoardPlayerBot implements IBotPlayerBot {

    constructor() {

    }
    performNextMove(board: Board, currentPlayer: PlayerEnum): PosType | null {
        return null
    }

}


export interface IBotPlayerBot {

    performNextMove(board: Board, currentPlayer: PlayerEnum): PosType | null
}