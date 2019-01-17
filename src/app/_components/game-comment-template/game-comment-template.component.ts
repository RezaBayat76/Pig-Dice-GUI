import {Component, Input, OnInit} from '@angular/core';
import {GameComment} from '../../_models/game-comment';

@Component({
  selector: 'app-game-comment-template',
  templateUrl: './game-comment-template.component.html',
  styleUrls: ['./game-comment-template.component.css']
})
export class GameCommentTemplateComponent implements OnInit {

  @Input() comment: GameComment = {};
  constructor() { }

  ngOnInit() {
  }

}
