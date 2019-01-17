import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GameComment} from '../_models/game-comment';
import {GameService} from '../_services/game.service';
import {ActivatedRoute} from '@angular/router';
import {AlertService} from '../_services/alert.service';
import {first} from 'rxjs/internal/operators';

@Component({
  selector: 'app-game-comment',
  templateUrl: './game-comment.component.html',
  styleUrls: ['./game-comment.component.css']
})
export class GameCommentComponent implements OnInit {
  commentForm: FormGroup;
  loading = false;
  submitted = false;
  id: number;
  comments: Array<GameComment> = [];


  constructor(private gameService: GameService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private alertService: AlertService) {
  }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.loadComments();
    this.commentForm = this.formBuilder.group({
      score: [0, Validators.required],
      text: ['', Validators.required]
    });
  }


  loadComments() {
    this.gameService.getComments(this.id).subscribe((data: Array<GameComment>) => {
      this.comments = data;
    });
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
    this.gameService.addComment(this.f.score.value, this.f.text.value, this.id)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('comment added successfully', false);
          this.loading = false;
          this.loadComments();
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
}
