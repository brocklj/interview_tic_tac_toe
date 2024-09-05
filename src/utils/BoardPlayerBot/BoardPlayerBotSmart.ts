import { PlayerEnum, PosType } from "../../common-types/Cell";
import { Board } from "../BoardValidator/Board";
import { IBotPlayerBot } from "./BoardPlayerBot";




export class BoardPlayerBotSmart implements IBotPlayerBot {

    constructor() {

    }

    // TODO: To implement
    performNextMove(board: Board, currentPlayer: PlayerEnum): PosType | null {
        if(!currentPlayer || !board) {
            return null
        } 
        // TODO:    
        return null
    }
}

