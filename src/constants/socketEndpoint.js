export const GAME_PROGRESS_TOPIC = (roomCode) => `/topic/game-progress/${roomCode}`;
export const GAME_STATE_TOPIC = (roomCode) => `/topic/game-state/${roomCode}`;
export const GAME_END_TOPIC = (roomCode) => `/topic/game-end/${roomCode}`;
export const PLAY_AGAIN_TOPIC = (roomCode) => `/topic/play-again/${roomCode}`;

// app
export const SEND_MOVE = (roomCode) => `/app/move/${roomCode}`;
export const SEND_PLAY_AGAIN = (roomCode) => `/app/play-again/${roomCode}`;