import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../_models/user';
import {ActivatedRoute} from '@angular/router';
import {WebsocketService} from '../_services/websocket.service';
import {UserService} from '../_services/user.service';
import {UserComment} from '../_models/user-comment';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertService} from '../_services/alert.service';
import {first} from 'rxjs/internal/operators';
import {Subscription} from 'rxjs/index';
import {Game} from '../_models/game';

@Component({
  selector: 'app-user-comment',
  templateUrl: './user-comment.component.html',
  styleUrls: ['./user-comment.component.css']
})
export class UserCommentComponent implements OnInit, OnDestroy {
  commentForm: FormGroup;
  loading = false;
  submitted = false;
  user: User = {};
  comments: Array<UserComment> = [];
  userSubscription: Subscription;
  games: Array<Game> = [];

  constructor(private webSocketService: WebsocketService,
              private userService: UserService,
              private route: ActivatedRoute,
              private alertService: AlertService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    this.userSubscription = this.webSocketService.getUsers().subscribe(data => {
      console.log('add comment', data);
      if (data.size > 0) {
        this.user = this.webSocketService.getUser(+id);
      }
    });

    this.loadComments(id);
    this.loadGames(id);
    this.commentForm = this.formBuilder.group({
      score: [0, Validators.required],
      text: ['', Validators.required]
    });
  }

  loadComments(id) {
    this.userService.getCommentOnUser(id).subscribe((data: Array<UserComment>) => {
      this.comments = data;
    });
  }

  loadGames(id) {
    this.userService.designedGames(id).subscribe((data: Array<Game>) => {
      this.games = data;
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  get f() {
    return this.commentForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.commentForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService.addComment(this.f.score.value, this.f.text.value, this.user.id)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('comment added successfully', false);
          this.loading = false;
          this.loadComments(this.user.id);
          this.loadGames(this.user.id);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
}
