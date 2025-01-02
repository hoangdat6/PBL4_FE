/**
 *
 * @param board {
 *     "size": 20,
 *     "board": string
 *     "winLength": 5
 * }
 * @returns {any[][]|any}
 */

const parseBoard = (board) => {
    const { size, board: boardString } = board;
    try {
        const boardArray = JSON.parse(boardString);
        if (Array.isArray(boardArray) && boardArray.length === size) {
            return boardArray;
        } else {
            throw new Error("Invalid board size");
        }
    } catch (error) {
        console.error("Error parsing board:", error);
        return Array(size).fill().map(() => Array(size).fill(-1)); // Trả về mảng rỗng mặc định nếu lỗi
    }
}

const getWinningCells = (board) => {
    const directions = [
        { x: 1, y: 0 },  // Horizontal
        { x: 0, y: 1 },  // Vertical
        { x: 1, y: 1 },  // Diagonal down-right
        { x: 1, y: -1 }  // Diagonal up-right
    ];

    const isValidCell = (x, y) => x >= 0 && y >= 0 && x < board.length && y < board[0].length;

    const winningCells = [];

    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
            if (board[row][col] !== -1) {
                for (let { x, y } of directions) {
                    const cells = [];
                    for (let i = 0; i < 5; i++) {
                        const newRow = row + i * y;
                        const newCol = col + i * x;
                        if (isValidCell(newRow, newCol) && board[newRow][newCol] === board[row][col]) {
                            cells.push({ row: newRow, col: newCol });
                        } else {
                            break;
                        }
                    }
                    if (cells.length === 5) {
                        winningCells.push(cells); // Thêm dãy chiến thắng vào danh sách
                    }
                }
            }
        }
    }

    return winningCells;
};


const BoardUtils = {
    parseBoard,
    getWinningCells
}

export default BoardUtils;
