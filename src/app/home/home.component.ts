import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';

import {User} from '../_models/user';
import {AuthenticationService} from '../_services/authentication.service';
import {UserService} from '../_services/user.service';
import {WebsocketService} from '../_services/websocket.service';
import {GameService} from '../_services/game.service';
import {Game} from '../_models/game';

@Component({templateUrl: 'home.component.html'})
export class HomeComponent implements OnInit, OnDestroy {
  currentUser: User;
  currentUserSubscription: Subscription;

  bestGames: Array<Game> = [];
  bestRecentlyGames: Array<Game> = [];
  mostPlayingGames: Array<Game> = [];

  constructor(private authenticationService: AuthenticationService,
              private userService: UserService,
              private websocketService: WebsocketService,
              private gameService: GameService) {


  }

  ngOnInit() {

    this.getBestGames();
    this.getBestRecentlyGames();
    this.getMostPlayingGames();

  }

  ngOnDestroy() {
  }


  getMostPlayingGames() {
    this.gameService.mostPlayingGames().subscribe((data: Array<Game>) => {
      this.mostPlayingGames = data;
    });
  }

  getBestGames() {
    this.gameService.bestGames().subscribe((data: Array<Game>) => {
      this.bestGames = data;
    });
  }

  getBestRecentlyGames() {
    this.gameService.bestRecentlyGames().subscribe((data: Array<Game>) => {
      this.bestRecentlyGames = data;
    });
  }

}
