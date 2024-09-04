
export type CellType =
    // TODO: Better type limitation - string makes not this much useful
    CellEnum.X | CellEnum.O | string

export enum CellEnum {
    X = "X",
    O = "O"
}