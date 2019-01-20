import {Component, OnInit} from '@angular/core';
import {UserService} from '../_services/user.service';
import {GameService} from '../_services/game.service';
import {AlertService} from '../_services/alert.service';
import {UserComment} from '../_models/user-comment';
import {GameComment} from '../_models/game-comment';

@Component({
  selector: 'app-admin-check-comments',
  templateUrl: './admin-check-comments.component.html',
  styleUrls: ['./admin-check-comments.component.css']
})
export class AdminCheckCommentsComponent implements OnInit {

  userComments: Array<UserComment> = [];
  gameComments: Array<GameComment> = [];

  constructor(private userService: UserService,
              private gameService: GameService,
              private alertService: AlertService) {
  }

  ngOnInit() {
    this.getUserComments();
    this.getGameComments();
  }

  getUserComments() {
    this.userService.uncheckedComments().subscribe((data: Array<UserComment>) => {
      this.userComments = data;
    });
  }

  getGameComments() {
    this.gameService.uncheckedComments().subscribe((data: Array<GameComment>) => {
      this.gameComments = data;
    });
  }

  removeGameComment(comment: GameComment) {
    const index = this.gameComments.findIndex(cm => cm.id === comment.id);
    if (index !== -1) {
      this.gameComments.splice(index, 1);
    }
  }

  removeUserComment(comment: GameComment) {
    const index = this.userComments.findIndex(cm => cm.id === comment.id);
    if (index !== -1) {
      this.userComments.splice(index, 1);
    }
  }

}
