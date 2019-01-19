import {Component, OnInit} from '@angular/core';
import {UserService} from '../_services/user.service';
import {UserProfile} from '../_models/user-profile';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../_models/user';
import {first} from 'rxjs/internal/operators';
import {AlertService} from '../_services/alert.service';
import {WebsocketService} from '../_services/websocket.service';

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
  onlineUsers: Array<User> = [];

  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private alertService: AlertService,
              private webSocketService: WebsocketService) {

    this.webSocketService.getOnlineUser().subscribe(data => {
      this.onlineUsers = [];
      data.forEach(value => {
        value.isOnline = true;
        value.isFollowed = false;
        if (this.userProfile && this.userProfile.followings.findIndex(a => a.id === value.id) !== -1) {
          value.isFollowed = true;
        }
        this.onlineUsers.push(value);

      });
    });

  }

  ngOnInit() {
    this.getProfile();
  }

  getProfile() {
    this.userService.getProfile()

      .subscribe((data: UserProfile) => {
        this.userProfile = data;
        this.getFollowings();
        this.profileForm = this.formBuilder.group({
          username: [this.userProfile.username, Validators.required],
          firstName: [this.userProfile.firstName, Validators.required],
          lastName: [this.userProfile.lastName, Validators.required],
          email: [this.userProfile.email, Validators.required],
          password: [this.userProfile.password, Validators.required]
        });
      });
  }

  getFollowings() {
    this.userService.getFollowings().subscribe((data: Array<number>) => {
        data.forEach(value => {
          const index = this.userProfile.followers.findIndex(value2 => value2.id === value);
          if (index !== -1) {
            this.userProfile.followers[index].isFollowed = true;
          }
        });
        data.forEach(value => {
          this.userProfile.followings.map(a => {
            a.isFollowed = true;
            return a;
          });
        });

        if (this.onlineUsers) {

          this.onlineUsers.forEach(value => {
            value.isOnline = true;
            value.isFollowed = false;
            if (this.userProfile && this.userProfile.followings.findIndex(a => a.id === value.id) !== -1) {
              value.isFollowed = true;
            }

          });
        }
      }
    );
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
