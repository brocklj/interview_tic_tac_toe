import { CellType } from "../common-types/Cell";
import { Board } from "./Board";
import { BoardValidatorErrors, BoardValidatorOutput, GameStatus, GameStatusEnum, IBoardValidationStrategy } from "./BoardValidator.d"
import { BoardValidatorBasicStrategy } from "./BoardValidatorBasicStrategy";

export class BoardValidator {

    constructor(private strategy: IBoardValidationStrategy = new BoardValidatorBasicStrategy()) { }

    public validateBoard(lineLength: number, cells: CellType[][]): BoardValidatorOutput {
        try {
            const board = new Board(cells)
            const isBoardValid = this.checkBoardLength(board)
            if (!isBoardValid) {
                throw new Error(BoardValidatorErrors.EInvalidBoardSizeInput)
            }

            const isLineLengthValid = this.checkLineLength(lineLength, board);
            if (!isLineLengthValid) {
                throw new Error(BoardValidatorErrors.EInvalidLineLengthInput)
            }

            const status: GameStatus | null = this.strategy.getGameStatus(board, lineLength)

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


    private checkBoardLength(board: Board): boolean {
        return (board.width >= 3 && board.width <= 10) && (board.height >= 3 && board.height <= 10)
    }

    private checkLineLength(lineLength: number, board: Board): boolean {
        return 3 <= lineLength && lineLength <= Math.min(board.width, board.height)
    }

}

