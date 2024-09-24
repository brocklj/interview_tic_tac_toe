import { CellType, PlayerEnum } from "../../common-types/Cell.d";
import { Board } from "./Board";
import { BoardValidatorErrors, BoardValidatorOutput, GameStatus, GameStatusEnum, IBoardValidationStrategy } from "./BoardValidator.d"
import { BoardValidatorBasicStrategy } from "./BoardValidatorBasicStrategy";

export class BoardValidator {

    winner: CellType | PlayerEnum | null = null

    constructor(private strategy: IBoardValidationStrategy = new BoardValidatorBasicStrategy()) { }

    public validateBoard(lineLength: number, cells: CellType[][]): BoardValidatorOutput {
        try {
            const board = new Board(cells, lineLength)

            const isLineLengthValid = BoardValidator.checkLineLength(lineLength, board);
            if (!isLineLengthValid) {
                throw new Error(BoardValidatorErrors.EInvalidLineLengthInput)
            }

            const status: GameStatus | null = this.strategy.getGameStatus(board, lineLength)

            if (status == GameStatusEnum.WIN) {
                this.winner = this.strategy.winner
            }

            // If status is still NULL then throw a general error
            if (!status) {
                throw new Error(BoardValidatorErrors.E0)
            }

            return {
                status
            }

        } catch (error) {
            return {
                status: GameStatusEnum.ERROR,
                error: error instanceof Error ? error.message : null
            }
        }
    }

    static checkLineLength(lineLength: number, board: Board): boolean {
        return 3 <= lineLength && lineLength <= Math.min(board.width, board.height)
    }

}

