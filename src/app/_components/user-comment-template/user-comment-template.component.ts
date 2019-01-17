import {Component, Input, OnInit} from '@angular/core';
import {UserComment} from '../../_models/user-comment';

@Component({
  selector: 'app-user-comment-template',
  templateUrl: './user-comment-template.component.html',
  styleUrls: ['./user-comment-template.component.css']
})
export class UserCommentTemplateComponent implements OnInit {

  @Input() comment: UserComment = {};
  constructor() { }

  ngOnInit() {
  }

}
