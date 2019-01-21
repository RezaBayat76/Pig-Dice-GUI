import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../_services/authentication.service';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.css']
})
export class GuestComponent implements OnInit {
  guestForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.guestForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.guestForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.guestForm.invalid) {
      return;
    }
    const user = {
      username: this.f.name.value,
      role: 'GUEST',
      id : 0
    };
    this.authenticationService.setGuestUser(user);
    this.loading = true;
    this.router.navigate(['/guest-main']);
  }

}
