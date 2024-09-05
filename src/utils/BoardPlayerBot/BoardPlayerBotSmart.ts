import { PlayerEnum, PosType } from "../../common-types/Cell";
import { Board } from "../BoardValidator/Board";
import { IBotPlayerBot } from "./BoardPlayerBot";




export class BoardPlayerBotSmart implements IBotPlayerBot {

    constructor() {

    }
    performNextMove(board: Board, currentPlayer: PlayerEnum): PosType | null {
        if(!currentPlayer || !board) {
            return null
        } 
        

        return null
    }
}

