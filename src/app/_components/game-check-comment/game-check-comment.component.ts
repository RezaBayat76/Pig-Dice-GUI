import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GameComment} from '../../_models/game-comment';
import {GameService} from '../../_services/game.service';

@Component({
  selector: 'app-game-check-comment',
  templateUrl: './game-check-comment.component.html',
  styleUrls: ['./game-check-comment.component.css']
})
export class GameCheckCommentComponent implements OnInit {

  @Input() comment: GameComment = {};
  @Output() removedComment = new EventEmitter<GameComment>();

  constructor(private gameService: GameService) {
  }

  ngOnInit() {
  }

  acceptComment() {
    this.gameService.acceptComment(this.comment.id).subscribe(data => {
      this.removedComment.emit(data);
    });
  }

  declineComment() {
    this.gameService.declineComment(this.comment.id).subscribe(data => {
      this.removedComment.emit(data);
    });
  }

}
