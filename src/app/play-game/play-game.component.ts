import {Component, OnInit} from '@angular/core';
import {PlayGameService} from '../_services/play-game.service';
import {ActivatedRoute} from '@angular/router';
import {GameService} from '../_services/game.service';
import {Game} from '../_models/game';

@Component({
  selector: 'app-play-game',
  templateUrl: './play-game.component.html',
  styleUrls: ['./play-game.component.css']
})
export class PlayGameComponent implements OnInit {

  id: number;
  currentDices: Array<number> = [];
  game: Game = {};
  diceImagePath1: string;
  diceImagePath2: string;

  constructor(private playGameService: PlayGameService,
              private gameService: GameService,
              private route: ActivatedRoute) {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.gameService.getGameById(this.id).subscribe(data => {
      this.game = data;
    });
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
}
