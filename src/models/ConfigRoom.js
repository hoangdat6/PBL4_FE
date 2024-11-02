
class ConfigGameDTO {
    constructor(ownerId, timeLimitForMove, timeLimitForMatch, firstMoveOption) {
        this.ownerId = ownerId;
        this.timeLimitForMove = timeLimitForMove;
        this.timeLimitForMatch = timeLimitForMatch;
        this.firstMoveOption = firstMoveOption;
    }
}

export default ConfigGameDTO;