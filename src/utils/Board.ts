import { CellType } from "../common-types/Cell";


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
    }
}

export enum BoardErrors {
    InvalidCellValuesHeight = "Invalid board cell values [height]"
}