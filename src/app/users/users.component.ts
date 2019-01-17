import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../_models/user';
import {UserService} from '../_services/user.service';
import {AuthenticationService} from '../_services/authentication.service';
import {WebsocketService} from '../_services/websocket.service';
import {Subscription} from 'rxjs/index';
import {first} from 'rxjs/internal/operators';

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

  constructor(private authenticationService: AuthenticationService,
              private userService: UserService,
              private websocketService: WebsocketService) {

    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;

    });
    this.usersSubscription = this.websocketService.getUsers().subscribe(usersMap => {
      this.users = [];
      usersMap.forEach(value => {
        this.users.push(value);
      });

    });

  }

  ngOnInit() {
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
    this.usersSubscription.unsubscribe();
  }
}
