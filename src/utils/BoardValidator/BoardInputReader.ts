import * as readline from 'readline';
import { BoardData } from './BoardValidator.d';
import { BoardValidator } from './BoardValidator';

// Define the function that processes the board data
function processBoardData(lineLength: number, board: string[][]): void {
    console.log(`Line Length: ${lineLength}`);
    console.log('Board:');
    board.forEach(row => console.log(row.join(' ')));
    const validator = new BoardValidator()
    const output = validator.validateBoard(lineLength, board)

    console.log(JSON.stringify(output))
}

// Create the console input reader
function readInputFromConsole(callback: (lineLength: number, board: string[][]) => void): void {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    console.log("Please input the JSON data:");

    rl.on('line', (input) => {
        try {
            // Parse the input JSON string
            const jsonData: BoardData = JSON.parse(input);
      
            const { lineLength, board } = jsonData;
            if(lineLength == null) {
                throw Error("JSON parsing errot: Missing property lineLength")
            }
            if(board == null) {
                throw Error("JSON parsing errot: Missing property board")
            }
          
            callback(lineLength, board);
        } catch (err: Error | unknown) {
            console.error('Error parsing JSON:',  err instanceof Error ? err.message : null);
        } finally {
            // Close the readline interface
            rl.close();
        }
    });
}

// Use the input reader
readInputFromConsole(processBoardData);
