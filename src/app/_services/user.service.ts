import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../_models/user';
import {UserComment} from '../_models/user-comment';
import {UserProfile} from '../_models/user-profile';
import {Game} from "../_models/game";


@Injectable({providedIn: 'root'})
export class UserService {
  config = {
    apiUrl: 'http://localhost:8080'
  };

  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get<Array<User>>(`${this.config.apiUrl}/users`);
  }

  getById(id: number) {
    return this.http.get(`${this.config.apiUrl}/users/${id}`);
  }

  register(user: User) {
    return this.http.post(`${this.config.apiUrl}/users/register`, user);
  }

  update(user: User) {
    return this.http.put(`${this.config.apiUrl}/users/${user.id}`, user);
  }

  delete(id: number) {
    return this.http.delete(`${this.config.apiUrl}/users/${id}`);
  }

  getCommentOnUser(id) {
    return this.http.get<Array<UserComment>>(`${this.config.apiUrl}/users/comments/${id}`);
  }

  addComment(score, text, id) {
    return this.http.post(`${this.config.apiUrl}/users/add-comment`, {
      score: score,
      text: text,
      mentionUserID: id
    });
  }

  follow(id: number) {
    return this.http.get(`${this.config.apiUrl}/users/follow/${id}`);
  }

  unFollow(id: number) {
    return this.http.get(`${this.config.apiUrl}/users/unfollow/${id}`);
  }

  getFollowings() {
    return this.http.get(`${this.config.apiUrl}/users/followings`);
  }

  getProfile() {
    return this.http.get<UserProfile>(`${this.config.apiUrl}/users/profile`);
  }

  editProfile(user: User) {
    return this.http.put(`${this.config.apiUrl}/users/edit-profile`, user);
  }

  uncheckedComments() {
    return this.http.get<Array<UserComment>>(`${this.config.apiUrl}/users/unchecked-comments`);
  }

  acceptComment(id: number) {
    return this.http.get(`${this.config.apiUrl}/users/accept-comment/${id}`);
  }

  declineComment(id: number) {
    return this.http.get(`${this.config.apiUrl}/users/decline-comment/${id}`);

  }

  designedGames(id: number) {
    return this.http.get<Array<Game>>(`${this.config.apiUrl}/users/designed-games/${id}`);

  }
}
