import {User} from './user';

export interface UserComment {
  id?: number;
  score?: number;
  text?: string;
  accepted?: boolean;
  userCreator?: User;
  mentionUser?: User;
}
