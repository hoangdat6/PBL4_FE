
class GameState {
    constructor(roomCode, startPlayerId, nthMove, board, size, winLength, lastMove, isGameStated, player1Ino, player2Info, gameConfig) {
        this.roomCode = roomCode;
        this.startPlayerId = startPlayerId;
        this.nthMove = nthMove;
        this.lastMove = lastMove;
        this.isGameStated = isGameStated;
        this.gameConfig = {
            totalTime: gameConfig.totalTime,
            moveDuration: gameConfig.moveDuration,
            firstMoveOption: gameConfig.firstMoveOption
        }
        this.player1Info = {
            id: player1Ino.id,
            name: player1Ino.name,
            score: player1Ino.score,
            avatar: player1Ino.avatar,
            checker: startPlayerId === player1Ino.id ? 0 : 1,
            rank: player1Ino.rank,
            isTurn: false,
            timeInfo: {
                remainTime: player1Ino.remainTime,
                remainMoveDuration: player1Ino.remainMoveDuration,
                playedTime: player1Ino.playedTime
            }
        };
        this.player2Info = {
            id: player2Info.id,
            name: player2Info.name,
            score: player2Info.score,
            avatar: player2Info.avatar,
            checker: startPlayerId === player2Info.id ? 0 : 1,
            rank: player2Info.rank,
            isTurn: false,
            timeInfo: {
                remainTime: player2Info.remainTime,
                remainMoveDuration: player2Info.remainMoveDuration,
                playedTime: player2Info.playedTime
            }
        };
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
            isGameStated: this.isGameStated,
            player1Info: this.player1Info,
            player2Info: this.player2Info,
            gameConfig: this.gameConfig,
        };
    }
}

export default GameState;
