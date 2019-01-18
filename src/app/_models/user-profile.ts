import {Game} from './game';
import {UserComment} from './user-comment';
import {User} from './user';

export interface UserProfile {
  id?: number;
  firstName?: string;
  lastName?: string;
  birthday?: any;
  gender?: any;
  username?: string;
  password?: string;
  email?: string;
  role?: any;
  games?: Array<Game>;
  userComments?: Array<UserComment>;
  followings?: Array<User>;
  followers?: Array<User>;
}

