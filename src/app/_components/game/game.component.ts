import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Game} from '../../_models/game';
import {WebsocketService} from '../../_services/websocket.service';
import {PlayGameService} from '../../_services/play-game.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  @ViewChild('exampleModal') modal;

  @Input() game: Game = {};
  loading: boolean;
  display;


  constructor(private webSocketService: WebsocketService,
              private playGameServie: PlayGameService,
              private router: Router) {
  }

  ngOnInit() {
  }


  showDialog() {
    this.display = true;
  }


  startGame() {
    this.loading = true;

    this.webSocketService.startPlayingGame().subscribe(
      data => {
        this.loading = false;
        this.display = false;
        this.router.navigate(['/start-game/' + data.id]);
      });

    this.playGameServie.playGame(this.game.id)
      .subscribe(data => {

      });
  }

}
