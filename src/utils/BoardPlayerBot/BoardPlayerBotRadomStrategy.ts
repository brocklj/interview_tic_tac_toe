import { PosType, } from "../../common-types/Cell.d";
import { Board } from "../BoardValidator/Board";
import { IBotPlayerBot } from "./BoardPlayerBot";


export class BoardPlayerBotRandomStrategy implements IBotPlayerBot {
    public performNextMove(board: Board): PosType | null {

        const empties = this.getEmptyPos(board)


        const targetPos = empties[randomIntFroInterval(0, empties.length - 1)]


        return targetPos
    }

    private getEmptyPos(board: Board): PosType[] {
        const output: PosType[] = []
        for (const [x, row] of board.value.entries()) {
            for (const [y, cell] of row.entries()) {
                if (cell == '') {
                    output.push({ posX: x, posY: y })
                }
            }
        }
        return output
    }

}

function randomIntFroInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
