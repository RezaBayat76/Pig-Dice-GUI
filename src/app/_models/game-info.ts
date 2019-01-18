export interface GameInfo {
  playersGameInfo?: Map<number, PlayerGameInfo>;
}

export interface PlayerGameInfo {

  currentScore: number;
  hold: boolean;

}
