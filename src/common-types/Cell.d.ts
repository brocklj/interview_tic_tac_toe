
export type CellType =
    // TODO: Better type limitation - the string tyoe makes this much much useful
    CellEnum.X | CellEnum.O | CellEnum.empty | string

export enum CellEnum {
    X = "X",
    O = "O",
    empty = ""
}