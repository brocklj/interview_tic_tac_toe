
export type CellType =
    // TODO: Better type limitation - the string tyoe makes this much much useful
    CellEnum.X | CellEnum.O | CellEnum.empty | string

export enum CellEnum {
    X = PlayerEnum.X,
    O = PlayerEnum.O,
    empty = ""
}

export enum PlayerEnum {
    X = "X",
    O = "O",
}

export type PosType = {
    posX: number,
    posY: number
}