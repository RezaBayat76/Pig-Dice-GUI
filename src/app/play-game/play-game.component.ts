import {Component, OnInit} from '@angular/core';
import {PlayGameService} from '../_services/play-game.service';
import {ActivatedRoute} from '@angular/router';
import {GameService} from '../_services/game.service';
import {Game} from '../_models/game';
import {WebsocketService} from '../_services/websocket.service';
import {PlayedGame} from '../_models/played-game';
import {GameInfo} from '../_models/game-info';

@Component({
  selector: 'app-play-game',
  templateUrl: './play-game.component.html',
  styleUrls: ['./play-game.component.css']
})
export class PlayGameComponent implements OnInit {

  success = true;
  loading = true;
  hold: boolean;
  id: number;
  currentDices: Array<number> = [];
  game: Game = {};
  diceImagePath1: string;
  diceImagePath2: string;
  playingGame: PlayedGame;
  gameInfo: GameInfo = {};


  constructor(private webSocketService: WebsocketService,
              private playGameService: PlayGameService,
              private gameService: GameService,
              private route: ActivatedRoute) {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.playingGame = this.webSocketService.playingGame;
    if (this.playingGame) {
      this.initialGame();
    } else {
      this.success = false;
    }
  }

  ngOnInit() {
  }

  rollDice() {
    this.diceImagePath1 = null;
    this.diceImagePath2 = null;
    this.playGameService.rollDice(this.id).subscribe((data: Array<number>) => {
      this.currentDices = data;
      this.diceImagePath1 = '../../assets/dice-' + data[0] + '.png';
      if (this.game.numDice = 2) {
        this.diceImagePath2 = '../../assets/dice-' + data[1] + '.png';
      }
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

    this.webSocketService.getGameInfo().subscribe(
      data => {
        this.gameInfo = data;
      }
    );

  }
}
