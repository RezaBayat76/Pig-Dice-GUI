import {Component, OnInit} from '@angular/core';
import {UserService} from '../_services/user.service';
import {UserProfile} from '../_models/user-profile';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../_models/user';
import {first} from 'rxjs/internal/operators';
import {AlertService} from '../_services/alert.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userProfile: UserProfile;
  profileForm: FormGroup;
  submitted: boolean;
  loading: boolean;

  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private alertService: AlertService) {

  }

  ngOnInit() {
    this.getProfile();
  }

  getProfile() {
    this.userService.getProfile().subscribe((data: UserProfile) => {
      this.userProfile = data;
      this.profileForm = this.formBuilder.group({
        username: [this.userProfile.username, Validators.required],
        firstName: [this.userProfile.firstName, Validators.required],
        lastName: [this.userProfile.lastName, Validators.required],
        email: [this.userProfile.email, Validators.required],
        password: [this.userProfile.password, Validators.required]
      });
    });
  }


  get f() {
    return this.profileForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.profileForm);

    // stop here if form is invalid
    if (this.profileForm.invalid) {
      return;
    }
    this.loading = true;
    const user: User = {
      id: this.userProfile.id,
      firstName: this.f.firstName.value,
      lastName: this.f.lastName.value,
      birthday: this.userProfile.birthday,
      gender: this.userProfile.gender,
      username: this.userProfile.username,
      password: this.f.password.value,
      email: this.f.email.value,
    };

    this.userService.editProfile(user)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('successfully updated');
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
}
