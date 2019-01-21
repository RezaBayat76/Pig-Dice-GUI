import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {User} from '../_models/user';
import {UserService} from '../_services/user.service';
import {AuthenticationService} from '../_services/authentication.service';
import {WebsocketService} from '../_services/websocket.service';
import {Subscription} from 'rxjs/index';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {
  users: Array<User> = [];
  currentUser: User;
  currentUserSubscription: Subscription;
  usersSubscription: Subscription;

  @Input() showOnline = false;

  constructor(private authenticationService: AuthenticationService,
              private userService: UserService,
              private websocketService: WebsocketService) {

    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;

    });
    this.usersSubscription = this.websocketService.getUsers().subscribe(usersMap => {
      this.users = [];
      usersMap.forEach(value => {
        console.log(value);
        console.log(this.showOnline);
        if (this.showOnline) {
          console.log(value.isOnline)
          if (value.isOnline) {
            this.users.push(value);

          }
        } else {
          this.users.push(value);
        }
        console.log(this.users);
      });

    });

  }

  ngOnInit() {
    this.getFollowings();
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
    this.usersSubscription.unsubscribe();
  }

  getFollowings() {
    this.userService.getFollowings().subscribe((data: Array<number>) => {
      data.forEach(value => {
        const index = this.users.findIndex(value2 => value2.id === value);
        if (index !== -1) {
          this.users[index].isFollowed = true;
        }
      });
    });
  }
}
