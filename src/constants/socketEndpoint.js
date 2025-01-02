export const GAME_PROGRESS_TOPIC = (roomCode) => `/topic/game-progress/${roomCode}`;
export const GAME_STATE_TOPIC = (roomCode) => `/user/queue/game-state/${roomCode}`;
export const GAME_END_TOPIC = (roomCode) => `/topic/end-game/${roomCode}`;
export const PLAY_AGAIN_TOPIC = (roomCode) => `/topic/play-again/${roomCode}`;
export const GAME_START_TOPIC = (roomCode) => `/user/queue/game-start/${roomCode}`;
export const SPECTATORS_TOPIC = (roomCode) => `/user/queue/spectators/${roomCode}`;
export const GAME_START_TOPIC_FRIEND = `/user/queue/matchmaking`;
// app
export const SEND_MOVE = (roomCode) => `/app/move/${roomCode}`;
export const SEND_PLAY_AGAIN = (roomCode) => `/app/play-again/${roomCode}`;
export const SEND_WINNER = (roomCode) => `/app/winner/${roomCode}`;