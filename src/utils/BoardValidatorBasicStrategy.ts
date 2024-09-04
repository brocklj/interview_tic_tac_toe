import { CellEnum, CellType } from "../common-types/Cell.d";
import { Board } from "./Board";
import { BoardValidatorErrors, GameStatus, GameStatusEnum, IBoardValidationStrategy } from "./BoardValidator.d";


// Implemetation of Basic Strategy of board validation
export class BoardValidatorBasicStrategy implements IBoardValidationStrategy {



    getGameStatus(board: Board, lineLength: number): GameStatus | null {

        const totalCells: number = board.width * board.height
        let totalFilled: number = 0
        let totalX: number = 0
        let totalO: number = 0
        let winner: CellType | null = null


        let isGameWon = false
        for (const [posX, row] of board.value.entries()) {
            for (const [posY, cell] of row.entries()) {
                if (cell.length > 0) {
                    totalFilled += 1
                    switch (cell) {
                        case CellEnum.X:
                            totalX += 1;
                            break;
                        case CellEnum.O:
                            totalO += 1;
                            break;
                    }
                    if (!isGameWon) {
                        isGameWon = this.checkGameIsWon(posX, posY, board, lineLength)
                        winner = cell
                    }
                }
            }
        }

        // Throw error after already one player won
        if (isGameWon) {
            if (winner == CellEnum.X) {
                if (totalX <= totalO) {
                    throw new Error(BoardValidatorErrors.E3.replace(`$player`, `two`))
                }
            } else if (winner == CellEnum.O) {
                if (totalX >= totalO) {
                    throw new Error(BoardValidatorErrors.E3.replace(`$player`, `one`))
                }                
            }

            console.log("winner: " + winner + ` totalX: ${totalX} totalO: ${totalO}`)
            return GameStatusEnum.WIN
        }

        if (totalO > 0 && totalX < 1) {
            throw new Error(BoardValidatorErrors.E1)
        }

        if(totalO > totalX) {
            throw new Error(BoardValidatorErrors.E0)
        }

        // TODO: Improve
        if (totalFilled > 1 && totalO != totalX) {
             throw new Error(BoardValidatorErrors.E2)
        }

        // No another criteria for status has been met, but all cells are filled
        if (totalFilled >= totalCells) {
            return GameStatusEnum.TIE
        } else if (totalFilled < totalCells) {
            return GameStatusEnum.PLAY
        }
        return null
    }

    private checkGameIsWon(posX: number, posY: number, board: Board, lineLength: number, cellInLineCount: number = 0, visited: string[] = []): boolean {

        if (posX > board.width || posX < 0 || posY > board.height || posY < 0) {
            return false
        }

        

        const cell: CellType | null = board.value[posX] ? board.value[posX][posY] : null
        if (cell == null) {
            return false
        }

        if (lineLength == cellInLineCount) {

            console.log(cell + lineLength + " " + cellInLineCount)
            return true
        }        
 
        const candidateLeft: CellType | null = board.value[posX - 1] ? board.value[posX - 1][posY] : null
        if (cell == candidateLeft && !visited.includes(`${posX}|${posY}`)) {
            visited.push(`${posX}|${posY}`)
            return this.checkGameIsWon(posX - 1, posY, board, lineLength, cellInLineCount + 1, visited)
        }
        const candidateTop: CellType | null = board.value[posX] ? board.value[posX][posY - 1] : null
        if (cell == candidateTop && !visited.includes(`${posX}|${posY}`)) {
            visited.push(`${posX}|${posY}`)
            return this.checkGameIsWon(posX, posY - 1, board, lineLength, cellInLineCount + 1, visited)
        }
        const candidateRight: CellType | null = board.value[posX + 1] ? board.value[posX + 1][posY] : null
        if (cell == candidateRight && !visited.includes(`${posX}|${posY}`)) {
            visited.push(`${posX}|${posY}`)
            return this.checkGameIsWon(posX + 1, posY, board, lineLength, cellInLineCount + 1, visited)
        }
        const candidateBottom: CellType | null = board.value[posX] ? board.value[posX][posY + 1] : null
        if (cell == candidateBottom && !visited.includes(`${posX}|${posY}`)) {
            visited.push(`${posX}|${posY}`)
            return this.checkGameIsWon(posX, posY + 1, board, lineLength, cellInLineCount + 1, visited)
        }

        return false

    }

}