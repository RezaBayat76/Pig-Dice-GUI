import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Game} from '../_models/game';
import {GameComment} from '../_models/game-comment';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  config = {
    apiUrl: 'http://localhost:8080'
  };

  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get<Array<Game>>(`${this.config.apiUrl}/games`);
  }

  addGame(value) {
    return this.http.post(`${this.config.apiUrl}/games/add-game`, value);
  }

  getComments(id: number) {
    return this.http.get<Array<GameComment>>(`${this.config.apiUrl}/games/comments/${id}`);
  }

  addComment(score, text, id) {
    return this.http.post(`${this.config.apiUrl}/games/add-comment`, {
      score: score,
      text: text,
      gameId: id
    });
  }

  getGameById(id) {
    return this.http.get<Game>(`${this.config.apiUrl}/games/${id}`);
  }

  mostPlayingGames() {
    return this.http.get<Array<Game>>(`${this.config.apiUrl}/games/most-playing`);
  }

  bestGames() {
    return this.http.get<Array<Game>>(`${this.config.apiUrl}/games/best-games`);

  }

  bestRecentlyGames() {
    return this.http.get<Array<Game>>(`${this.config.apiUrl}/games/best-recently`);

  }

  updateScore(updateScore: { gameId: number; score: number; playedGameId: number }) {
    return this.http.post(`${this.config.apiUrl}/games/update-score`, updateScore);

  }
}
