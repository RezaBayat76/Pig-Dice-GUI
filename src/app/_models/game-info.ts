export interface GameInfo {
  playersGameInfo?: Map<number, PlayerGameInfo>;
}

export interface PlayerGameInfo {
  currentScore?: number;
  score?: number;
  hold?: boolean;
  currentDices?: Array<number>;
  currentThrow?: number;
  isWin?: boolean;
}
