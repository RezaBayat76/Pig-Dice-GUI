import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {first} from 'rxjs/internal/operators';
import {GameService} from '../_services/game.service';
import {AlertService} from '../_services/alert.service';

@Component({
  selector: 'app-design-game',
  templateUrl: './design-game.component.html',
  styleUrls: ['./design-game.component.css']
})
export class DesignGameComponent implements OnInit {
  designGameForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private alertService: AlertService,
              private gameService: GameService) {
  }

  ngOnInit() {
    this.designGameForm = this.formBuilder.group({
      maxScore: [100, Validators.required],
      fallDice: [3, Validators.required],
      numDice: [3, Validators.required]
    });
  }

  get f() {
    return this.designGameForm.controls;
  }


  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.designGameForm.invalid) {
      return;
    }

    this.loading = true;
    this.gameService.addGame(this.designGameForm.value)
      .subscribe(
        data => {
          this.alertService.success('add game successful', true);
          this.router.navigate(['/start-game']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
}
