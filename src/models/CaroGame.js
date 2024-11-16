
class CaroGame {
    constructor(roomCode, startPlayerId, nthMove, board, size, winLength, lastMove) {
        this.roomCode = roomCode;
        this.startPlayerId = startPlayerId;
        this.nthMove = nthMove;
        this.lastMove = lastMove;
        this.boardState = {
            board: this.parseBoard(board, size),
            size: size,
            winLength: winLength
        };
    }

    // Phương thức để chuyển đổi chuỗi board thành mảng 2D với kích thước size
    parseBoard(boardString, size) {
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

    // Phương thức để lấy trạng thái hiện tại
    getCurrentState() {
        return {
            roomCode: this.roomCode,
            startPlayerId: this.startPlayerId,
            nthMove: this.nthMove,
            lastMove: this.lastMove,
            boardState: this.boardState,
        };
    }
}

export default CaroGame;
