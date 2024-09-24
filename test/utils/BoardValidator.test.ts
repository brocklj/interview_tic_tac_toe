// BoardValidator.test.ts

import { expect, test } from 'vitest'
import { BoardValidator } from './../../src/utils/BoardValidator/BoardValidator'
import { BoardValidatorOutput, GameStatusEnum, BoardValidatorErrors } from './../../src/utils/BoardValidator/BoardValidator.d'
import { BoardErrors } from './../../src/utils/BoardValidator/Board'

// TODO: Refactor

test('Validation of given board and line - passed both', () => {

    const validator = new BoardValidator()

    const board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ]


    const expected: BoardValidatorOutput = {
        status: GameStatusEnum.PLAY
    }

    expect(validator.validateBoard(3, board)).toStrictEqual(expected)

    const board2 = [['X', 'O', 'X'], ['O', '', 'O'], ['X', 'O', 'X']]
    expect(validator.validateBoard(3, board2)).toStrictEqual(expected)

    const board3 = [
        ['', '', ''],
        ['', '', ''],
        ['', 'X', ''],
    ]


    const expected3: BoardValidatorOutput = {
        status: GameStatusEnum.PLAY
    }

    expect(validator.validateBoard(3, board3)).toStrictEqual(expected3)
})

test('Validation of given board and line - board length validation failed', () => {
    const validator = new BoardValidator()

    const board = [
        ['', '', ''],
        ['', '', ''],
    ]

    const expected: BoardValidatorOutput = {
        status: GameStatusEnum.ERROR,
        error: BoardValidatorErrors.EInvalidBoardSizeInput
    }

    expect(validator.validateBoard(3, board)).toStrictEqual(expected)

})


test('Validation of given board and line - line validation failed', () => {
    const validator = new BoardValidator()

    const board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ]

    const expected: BoardValidatorOutput = {
        status: GameStatusEnum.ERROR,
        error: BoardValidatorErrors.EInvalidLineLengthInput
    }

    expect(validator.validateBoard(2, board)).toStrictEqual(expected)

})

test('Validation of given board and line - Invalid board cell count values [height] ', () => {
    const validator = new BoardValidator()

    const board = [
        ['', '', ''],
        ['', '', ''],
        [''],
    ]

    const expected: BoardValidatorOutput = {
        status: GameStatusEnum.ERROR,
        error: BoardErrors.InvalidCellValuesHeight
    }

    expect(validator.validateBoard(2, board)).toStrictEqual(expected)

})

test('Validation of board winner and line - X or O won ', () => {
    const validator = new BoardValidator()

    const board = [
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', 'O', 'X', '', '', '', ''],
        ['', '', '', '', 'X', 'O', '', '', '', ''],
        ['', '', '', '', '', '', 'O', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
    ]

    const expected: BoardValidatorOutput = {
        status: GameStatusEnum.WIN,
    }

    expect(validator.validateBoard(3, board)).toStrictEqual(expected)

    const boradSecondaryDiagonal = [
        ['', '', '', '', '', '', 'X', '', '', ''],
        ['', '', '', '', 'O', 'X', '', '', '', ''],
        ['', '', '', '', 'X', 'O', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
    ]

    const expectedSecondaryDiagonal: BoardValidatorOutput = {
        status: GameStatusEnum.WIN,
    }

    expect(validator.validateBoard(3, boradSecondaryDiagonal)).toStrictEqual(expectedSecondaryDiagonal)

    

    const board2 = [
        ['X', 'O', 'O'],
        ['', 'X', ''],
        ['', '', 'X'],
    ]

    expect(validator.validateBoard(3, board2)).toStrictEqual(expected)

    const board3 = [
        ['', 'X','O'],
        ['', 'X','O'],
        ['', '', 'O']
    ]

    expect(validator.validateBoard(3, board3)).toStrictEqual(expected)

    const board4 = [
        ['', 'X', 'O'],
        ['', 'O', 'X'],
        ['O', '', '']
    ]

    expect(validator.validateBoard(3, board4)).toStrictEqual(expected)
})

test('Validation of TIE board and line', () => {
    const validator = new BoardValidator()

    const board = [
        ['X', 'O', 'X'],
        ['X', 'O', 'O'],
        ['O', 'X', 'X'],
    ]

    const expected: BoardValidatorOutput = {
        status: GameStatusEnum.TIE,
    }

    expect(validator.validateBoard(3, board)).toStrictEqual(expected)

})


// Errors testing

test('Error case: Player one must start the game', () => {
    const validator = new BoardValidator()

    const board = [
        ['', 'O', ''],
        ['', '', ''],
        ['', '', ''],
    ]

    const expected: BoardValidatorOutput = {
        status: GameStatusEnum.ERROR,
        error: BoardValidatorErrors.E1
    }

    expect(validator.validateBoard(3, board)).toStrictEqual(expected)

})

test('Error case: Player did move twice in a row', () => {
    const validator = new BoardValidator()

    const board =
        [['X', 'O', 'X'], ['', 'X', ''], ['', '', '']]

    const expected: BoardValidatorOutput = {
        status: GameStatusEnum.ERROR,
        error: BoardValidatorErrors.E2
    }

    expect(validator.validateBoard(3, board)).toStrictEqual(expected)

})

test('General error', () => {
    const validator = new BoardValidator()
    const board = [['O', 'O', ''], ['X', '', ''], ['', '', '']]
    const expected: BoardValidatorOutput = {
        status: GameStatusEnum.ERROR,
        error: BoardValidatorErrors.E0
    }

    expect(validator.validateBoard(3, board)).toStrictEqual(expected)
})


test('Error case: Player [one|two] played after game was already won', () => {
    const validator = new BoardValidator()

    const board = [
        ['X', 'X', 'X'],
        ['', '', ''],
        ['O', 'O', 'O']]


    const expected: BoardValidatorOutput = {
        status: GameStatusEnum.ERROR,
        error: BoardValidatorErrors.E3.replace('$player', 'two')
    }

    expect(validator.validateBoard(3, board)).toStrictEqual(expected)

    const board2 = [
        ['', '', 'X'],
        ['O', 'O', 'O'],
        ['X', 'X', 'X']
    ]


    const expected2: BoardValidatorOutput = {
        status: GameStatusEnum.ERROR,
        error: BoardValidatorErrors.E3.replace('$player', 'one')
    }

    expect(validator.validateBoard(3, board2)).toStrictEqual(expected2)

    const board3 = [
        ['X', 'X', 'X'],
        ['O', '', ''],
        ['O', 'O', 'O']]


    const expected3: BoardValidatorOutput = {
        status: GameStatusEnum.ERROR,
        error: BoardValidatorErrors.E3.replace('$player', 'two')
    }
    expect(validator.validateBoard(3, board3)).toStrictEqual(expected3)


    const board4 = [

        ['O', 'O', 'O'],
        ['X', '', ''],
        ['X', 'X', 'X'],

    ]

    const expected4: BoardValidatorOutput = {
        status: GameStatusEnum.ERROR,
        error: BoardValidatorErrors.E3.replace('$player', 'one')
    }
    expect(validator.validateBoard(3, board4)).toStrictEqual(expected4)

})

test('Validation of Test blocked diagonal', () => {
    const validator = new BoardValidator()

    const board = [
        ['O', '', 'O'],
        ['X', 'O', 'X'],
        ['X', 'O', 'X'],
    ]

    const expected: BoardValidatorOutput = {
        status: GameStatusEnum.PLAY,
    }

    expect(validator.validateBoard(3, board)).toStrictEqual(expected)


    const board2 = [
        ['X', '', 'X'],
        ['X', 'O', 'X'],
        ['O', '', 'O'],
    ]

    const expected2: BoardValidatorOutput = {
        status: GameStatusEnum.PLAY,
    }

    expect(validator.validateBoard(3, board2)).toStrictEqual(expected2)

})
