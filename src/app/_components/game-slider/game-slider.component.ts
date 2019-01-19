import {Component, Input, OnInit} from '@angular/core';
import {Game} from "../../_models/game";

@Component({
  selector: 'app-game-slider',
  templateUrl: './game-slider.component.html',
  styleUrls: ['./game-slider.component.css']
})
export class GameSliderComponent implements OnInit {

  @Input() games: Array<Game> = [];

  constructor() {
  }

  ngOnInit() {
  }

}
