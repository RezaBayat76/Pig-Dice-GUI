import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PlayGameService {

  config = {
    apiUrl: 'http://localhost:8080'
  }

  constructor(private http: HttpClient) {
  }

  rollDice(id) {
    return this.http.get<Array<number>>(`${this.config.apiUrl}/played-games/roll-dice/${id}`);
  }
}
