import {Component, OnDestroy, OnInit} from '@angular/core';
import {Game} from "../_models/game";
import {Subscription} from "rxjs/index";
import {GameService} from "../_services/game.service";
import {first} from "rxjs/internal/operators";

@Component({
  selector: 'app-game-starter',
  templateUrl: './game-starter.component.html',
  styleUrls: ['./game-starter.component.css']
})
export class GameStarterComponent implements OnInit, OnDestroy {

  games: Array<Game> = [];
  gamesSubscription: Subscription;

  constructor(private gameService: GameService) {

  }

  ngOnInit() {
    this.loadGames();
  }

  ngOnDestroy(): void {
    this.gamesSubscription.unsubscribe();
  }


  loadGames() {
    this.gamesSubscription = this.gameService.getAll().pipe(first())
      .subscribe((games: Array<Game>) => {
        this.games = games;
      });
  }

}
