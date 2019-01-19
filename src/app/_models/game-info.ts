export interface GameInfo {
  playersGameInfo?: Map<number, PlayerGameInfo>;
  playedGameId?: number;
  gameId?: number;
}

export interface PlayerGameInfo {
  currentScore?: number;
  score?: number;
  hold?: boolean;
  currentDices?: Array<number>;
  currentThrow?: number;
  win?: boolean;
}
