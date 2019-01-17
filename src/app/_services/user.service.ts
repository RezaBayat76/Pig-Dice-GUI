import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../_models/user';
import {UserComment} from "../_models/user-comment";


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
}
