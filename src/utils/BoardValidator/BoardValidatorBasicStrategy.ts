import { CellEnum, CellType } from "../../common-types/Cell.d";
import { Board } from "./Board";
import { BoardValidatorErrors, GameStatus, GameStatusEnum, IBoardValidationStrategy } from "./BoardValidator.d";

/*
Inputs:
    board: The game grid represented by a Board object with cells.
    lineLength: The required line length that a player needs to win (e.g., 3 for tic-tac-toe).
Variables:
    totalCells: Total number of cells on the grid.
    totalFilled: Number of filled cells.
    totalX and totalO: Number of "X" and "O" cells.
    winner: Stores the type of cell (X or O) that has won.
    isGameWon: A boolean value indicating if someone has won.
Main logic:
    It iterates through the game board (board), counts the filled cells, and checks if any player has met the win conditions using the function checkGameIsWon.
    If one of the players has won, it checks whether the game state follows the rules (e.g., a player cannot win if they had fewer or the same number of moves as their opponent).
    It determines whether the game has ended in a draw or if it should continue.
Win check:
    The function checkGameIsWon checks if the cell at position posX and posY belongs to a winning line.
    It checks the win conditions in all directions: rows, columns, and diagonals (both main and anti-diagonal).
    If a line of length equal to lineLength is found, the function returns true (the game is won).
Error handling:
    The code ensures that if the difference between the number of "X" and "O" moves is greater than 1, the game stops with an error. Additionally, it checks if the winning player has an invalid number of moves compared to their opponent.
    Output:
    The function returns the game status as a GameStatusEnum, either as WIN (win), TIE (draw), or PLAY (game continues).
    Overall, this function manages the logic for determining whether the game on the grid has ended, and if so, whether it ended in a win, a draw, or an error based on the rules.
*/


// Implemetation of Basic Strategy of board validation
export class BoardValidatorBasicStrategy implements IBoardValidationStrategy {
    public winner: CellType | null = null
    getGameStatus(board: Board, lineLength: number): GameStatus | null {

        const totalCells: number = board.width * board.height
        let totalFilled: number = 0
        let totalX: number = 0
        let totalO: number = 0        


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
                        this.winner = cell
                    }
                }
            }
        }

        // Throw error after already one player won
        if (isGameWon) {
            if (this.winner == CellEnum.X) {
                if (totalX <= totalO) {
                    throw new Error(BoardValidatorErrors.E3.replace(`$player`, `two`))
                }
            } else if (this.winner == CellEnum.O) {
                if (totalX >= totalO + 1) {
                    throw new Error(BoardValidatorErrors.E3.replace(`$player`, `one`))
                }
            }
        }

        if (totalO > 0 && totalX < 1) {
            throw new Error(BoardValidatorErrors.E1)
        }



        // TODO: Improve
        //{"lineLength": 3, "board": [["", "", ""], ["", "",""], ["","",""] ] }
        if (Math.abs(totalO - totalX) > 1) {
            throw new Error(BoardValidatorErrors.E2)
        }

        if (isGameWon) {
            return GameStatusEnum.WIN
        }

        if (totalO > totalX) {
            throw new Error(BoardValidatorErrors.E0)
        }

        // No another criteria for status has been met, but all cells are filled
        if (totalFilled >= totalCells) {
            return GameStatusEnum.TIE
        }
        if (totalFilled < totalCells) {
            return GameStatusEnum.PLAY
        }

        return null
    }


    private checkGameIsWon(posX: number, posY: number, board: Board, lineLength: number): boolean {

        const cell: CellType | null = board.value[posX][posY]
        if (cell == CellEnum.empty) {
            return false
        }


        // Check rows
        let cellInRowLineCountForward: number = 0
        let cellInRowLineCountBack: number = 0

        for (let x = posX + 1; x < board.width; x += 1) {
            const candidate = board.value[x][posY]
            if (candidate == cell) {
                cellInRowLineCountForward += 1
            } else {
                break
            }
        }

        for (let x = posX; x >= 0; x -= 1) {
            const candidate = board.value[x][posY]
            if (candidate == cell) {
                cellInRowLineCountBack += 1
            } else {
                break
            }
        }



        if ((cellInRowLineCountForward + cellInRowLineCountBack) >= lineLength) {
            return true
        }

        // Check columns

        let cellInColumnLineCountForward: number = 0
        let cellInColumnLineCountBack: number = 0

        for (let y = posY; y < board.width; y += 1) {
            const candidate = board.value[posX][y]
            if (candidate == cell) {
                cellInColumnLineCountForward += 1
            } else {
                break
            }
        }

        for (let y = posY - 1; y >= 0; y -= 1) {
            const candidate = board.value[posX][y]
            if (candidate == cell) {
                cellInColumnLineCountBack += 1
            } else {
                break
            }
        }



        if ((cellInColumnLineCountBack + cellInColumnLineCountForward) >= lineLength) {
            return true
        }


        // Check main diagonal line
        let cellInMainDiagonalLineCountForward: number = 0
        let cellInMainDiagonalLineCountBack: number = 0

        for (let i = 0; i < board.width; i += 1) {
            const candidate = board.value[posX + i] ? board.value[posX + i][posY + i] : null
            if (candidate == cell) {
                cellInMainDiagonalLineCountForward += 1
            } else {
                break
            }
        }
        for (let i = 0; i > 0; i -= 1) {
            const candidate = board.value[posX + i] ? board.value[posX + i][posY + i] : null
            if (candidate == cell) {
                cellInMainDiagonalLineCountBack += 1
            } else {
                break
            }
        }

        if ((cellInMainDiagonalLineCountForward + cellInMainDiagonalLineCountBack) >= lineLength) {
            return true
        }


        // Check another diagonal line
        let cellInAnotherDiagonalLineCountForward: number = 0
        let cellIAnotherDiagonalLineCountBack: number = 0

        for (let i = 0; i < board.width; i += 1) {
            const candidate = board.value[posX - i] ? board.value[posX - i][posY + i] : null
            if (candidate == cell) {
                cellInAnotherDiagonalLineCountForward += 1
            } else {
                break
            }
        }
        for (let i = posX + 1; i < board.width; i += 1) {
            const candidate = board.value[posX - i] ? board.value[posX - i][posY - i] : null
            if (candidate == cell) {
                cellIAnotherDiagonalLineCountBack += 1
            } else {
                break
            }
        }

        if ((cellInAnotherDiagonalLineCountForward + cellIAnotherDiagonalLineCountBack) >= lineLength) {
            return true
        }


        return false

    }

}