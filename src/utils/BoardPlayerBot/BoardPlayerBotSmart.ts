import { PlayerEnum, PosType } from "../../common-types/Cell.d";
import { Board } from "../BoardValidator/Board";
import { GameStatusEnum } from "../BoardValidator/BoardValidator.d";
import { BoardValidator } from "../BoardValidator/BoardValidator";
import { IBotPlayerBot } from "./BoardPlayerBot";
import { BoardPlayerBotRandomStrategy } from "./BoardPlayerBotRadomStrategy";




export class BoardPlayerBotSmart implements IBotPlayerBot {
    boardValidator = new BoardValidator()

    performNextMove(board: Board, currentPlayer: PlayerEnum): PosType | null {
        if (!currentPlayer || !board) {
            return null
        }
        const pos = this.bestMove(board, currentPlayer)

        return pos
    }


    minimax(board: Board, depth: number, isMaximizing: boolean, player: PlayerEnum, opponent: PlayerEnum): number {
        const game = this.boardValidator.validateBoard(board.lineLength, board.value)
        // console.log('status: ', game.status, 'error:', game.error )   
        if (game.status == GameStatusEnum.WIN) {
            if (this.boardValidator.winner == player) {
                return 1;
            }
            if (this.boardValidator.winner == opponent) {
                return -1;
            }
        } else if (game.status == GameStatusEnum.TIE || game.status == GameStatusEnum.ERROR) {
            return 0
        }

        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let x = 0; x < board.width; x++) {
                for (let y = 0; y < board.height; y++) {
                    if (board.value[x][y] === '') {
                        board.value[x][y] = player;
                        const score = this.minimax(board, depth + 1, false, opponent, player);
                        board.value[x][y] = '';
                        bestScore = Math.max(score, bestScore);
                    }
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let x = 0; x < board.width; x++) {
                for (let y = 0; y < board.height; y++) {
                    if (board.value[x][y] === '') {
                        board.value[x][y] = opponent;
                        const score = this.minimax(board, depth + 1, true, player, opponent);
                        board.value[x][y] = '';
                        bestScore = Math.min(score, bestScore);
                    }
                }
            }
            return bestScore;
        }
    }

    bestMove(board: Board, player: PlayerEnum): PosType | null {
        let bestScore = -Infinity;
        let pos: PosType | null = new BoardPlayerBotRandomStrategy().performNextMove(board)

        for (let x = board.isEmpty < 2 ? pos?.posX || 0 : 0; x < board.width; x++) {
            for (let y = board.isEmpty < 2 ? pos?.posY || 0 : 0; y < board.height; y++) {
                if (board.value[x][y] === '') {
                    board.value[x][y] = player;
                    const score = this.minimax(board, 0, true, player, player === PlayerEnum.X ? PlayerEnum.O : PlayerEnum.X);
                    board.value[x][y] = '';
                    if (score > bestScore) {
                        bestScore = score;
                        pos = { posX: x, posY: y };
                    }
                }
            }
        }

        return pos;
    }
}

