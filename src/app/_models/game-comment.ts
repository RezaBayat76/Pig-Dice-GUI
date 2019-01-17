import {User} from './user';

export interface GameComment {
  id?: number;
  score?: number;
  text?: string;
  accepted?: boolean;
  user?: User;
}
