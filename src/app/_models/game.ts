import {User} from './user';

export interface Game {
  id?: number;
  maxScore?: number;
  fallDice?: number;
  numDice?: number;
  maxThrow?: number;
  averageScore?: number;
  createDate?;
  userCreator?: User;
}
