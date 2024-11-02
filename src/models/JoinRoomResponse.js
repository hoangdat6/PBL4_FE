class JoinRoomResponse {
    constructor(roomCode, participantType, isStarted) {
        this.roomCode = roomCode;
        this.participantType = participantType;
        this.isStarted = isStarted;
    }
}
export default JoinRoomResponse;