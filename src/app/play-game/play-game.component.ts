import {Component, OnDestroy, OnInit} from '@angular/core';
import {PlayGameService} from '../_services/play-game.service';
import {ActivatedRoute} from '@angular/router';
import {GameService} from '../_services/game.service';
import {WebsocketService} from '../_services/websocket.service';
import {PlayedGame} from '../_models/played-game';
import {GameInfo} from '../_models/game-info';
import {User} from '../_models/user';
import {Subscription} from 'rxjs/index';

@Component({
  selector: 'app-play-game',
  templateUrl: './play-game.component.html',
  styleUrls: ['./play-game.component.css']
})
export class PlayGameComponent implements OnInit, OnDestroy {

  score = 5;

  finished = false;
  success = true;
  loading = true;
  hold: boolean;
  id: number;
  diceImagePath1: string;
  diceImagePath2: string;
  playingGame: PlayedGame;
  gameInfo: GameInfo = {};
  currentPlayer: User;
  competitorPlayer: User;
  winner: User;

  gameInfoSubscription: Subscription;


  constructor(private webSocketService: WebsocketService,
              private playGameService: PlayGameService,
              private gameService: GameService,
              private route: ActivatedRoute) {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.playingGame = this.webSocketService.playingGame;
    this.currentPlayer = JSON.parse(localStorage.getItem('currentUser'));
    if (this.playingGame) {
      if (this.playingGame.firstPlayer.id === this.currentPlayer.id) {
        this.competitorPlayer = this.playingGame.secondPlayer;
      } else {
        this.competitorPlayer = this.playingGame.firstPlayer;
      }
      this.initialGame();
    } else {
      this.success = false;
    }
  }

  ngOnInit() {
    this.winner = undefined;
    this.gameInfo = {};

  }

  rollDice() {
    this.diceImagePath1 = null;
    this.diceImagePath2 = null;
    this.playGameService.rollDice(this.id).subscribe(data => {

    });
  }

  setHold() {
    this.diceImagePath1 = null;
    this.diceImagePath2 = null;
    this.playGameService.hold(this.id).subscribe(data => {
    });
  }

  initialGame() {
    this.webSocketService.disconnectedGame().subscribe(
      data => {
        this.success = false;
      }
    );

    this.webSocketService.hold().subscribe(
      (data: boolean) => {
        this.hold = data;
      });

    this.gameInfoSubscription = this.webSocketService.getGameInfo().subscribe(
      data => {
        if (data.playersGameInfo) {
          this.diceImagePath1 = null;
          this.diceImagePath2 = null;
          console.log(data);

          this.gameInfo = data;

          if (this.gameInfo.playersGameInfo[this.currentPlayer.id].currentDices.length > 0) {

            this.setDice(this.gameInfo.playersGameInfo[this.currentPlayer.id].currentDices);
          } else if (this.gameInfo.playersGameInfo[this.competitorPlayer.id].currentDices.length > 0) {
            this.setDice(this.gameInfo.playersGameInfo[this.competitorPlayer.id].currentDices);

          }

          if (this.gameInfo.playersGameInfo[this.currentPlayer.id].win) {
            this.finished = true;
            this.winner = this.currentPlayer;
          } else if (this.gameInfo.playersGameInfo[this.competitorPlayer.id].win) {
            this.finished = true;
            this.winner = this.competitorPlayer;
          }
        }
      }
    );
  }


  setDice(rollDice: Array<number>) {
    this.diceImagePath1 = '../../assets/dice-' + rollDice[0] + '.png';
    if (rollDice[1]) {
      this.diceImagePath2 = '../../assets/dice-' + rollDice[1] + '.png';
    }
  }

  setScore() {
    this.gameService.updateScore(
      {
        gameId: this.gameInfo.gameId,
        score: this.score,
        playedGameId: this.gameInfo.playedGameId
      })
      .subscribe(
        data => {

        });

  }

  ngOnDestroy() {
    if (this.gameInfoSubscription) {
      this.gameInfoSubscription.unsubscribe();
    }
  }
}
