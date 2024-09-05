import { CellType } from "../../common-types/Cell.d";
import { BoardValidatorErrors } from "./BoardValidator.d";


export class Board {

    private _value: CellType[][]
    public get value(): CellType[][] {
        return this._value
    }

    private _width: number = 0
    public get width(): number {
        return this._width
    }


    private _height: number = 0
    public get height(): number {
        return this._height
    }

    /*
      @Throws Error('Invalid board cell value')
      @Returns number
    */
    private getHeight(): number | null {
        let height: number | null = null

        for (const column of this._value) {
            if (height == null) {
                height = column.length
            } else {
                if (column.length != height) {
                    throw new Error(BoardErrors.InvalidCellValuesHeight)
                }
            }
        }

        return height
    }

    constructor(cells: CellType[][]) {
        this._value = cells
        this._width = this.value.length
        this._height = this.getHeight() || 0

        Board.checkBoardLength(this)
    }

    static generateBoardCell(width: number, height: number): CellType[][] {
        // TODO: Intializing through Array's costrucrutor is probably necessary
        const generatedBoard = Array(width)
        const columns = Array(height)

        columns.fill('', 0, height)

        for (let i = 0; i < width; i += 1) {
            generatedBoard[i] = Array.from(columns)
        }

        return generatedBoard

    }

    static checkBoardLength(board: Board): boolean {
        const isValid = Board.checkDimensions(board.width, board.height)
        if (!isValid) {
            throw new Error(BoardValidatorErrors.EInvalidBoardSizeInput)
        }

        return isValid
    }

    static checkDimensions(width: number, height: number ): boolean {
        return (width >= 3 && width <= 10) && (height >= 3 && height <= 10)
    }
}

export enum BoardErrors {
    InvalidCellValuesHeight = "Invalid board cell values [height]"
}