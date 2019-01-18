import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlayGameService {

  config = {
    apiUrl: 'http://localhost:8080'
  };

  constructor(private http: HttpClient) {
  }

  rollDice(id) {
    return this.http.get(`${this.config.apiUrl}/played-games/roll-dice/${id}`);
  }

  playGame(id: number) {
    return this.http.get(`${this.config.apiUrl}/played-games/play-game/${id}`);
  }

  hold(id: number) {
    return this.http.get(`${this.config.apiUrl}/played-games/hold/${id}`);
  }
}
