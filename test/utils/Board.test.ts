import { expect, test } from "vitest"
import { Board } from "../../src/utils/BoardValidator/Board"

test('Board.ts test generating', () => {
    const board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ]

    expect(Board.generateBoardCell(3, 3)).toStrictEqual(board)
})