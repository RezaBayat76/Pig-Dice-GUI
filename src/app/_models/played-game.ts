import {User} from './user';
import {Game} from './game';

export interface PlayedGame {
  id?: number;
  firstPlayer?: User;
  secondPlayer?: User;
  winner?: User;
  score?: number;
  createDate?: any;
  game?: Game;
}
