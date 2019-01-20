import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserComment} from '../../_models/user-comment';
import {UserService} from '../../_services/user.service';

@Component({
  selector: 'app-user-check-comment',
  templateUrl: './user-check-comment.component.html',
  styleUrls: ['./user-check-comment.component.css']
})
export class UserCheckCommentComponent implements OnInit {
  @Input() comment: UserComment = {};
  @Output() removedComment = new EventEmitter<UserComment>();

  constructor(private userService: UserService) {
  }

  ngOnInit() {
  }

  acceptComment() {
    this.userService.acceptComment(this.comment.id).subscribe(data => {
      this.removedComment.emit(this.comment);
    });
  }

  declineComment() {
    this.userService.declineComment(this.comment.id).subscribe(data => {
      this.removedComment.emit(this.comment);
    });
  }
}
