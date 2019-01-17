import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {first} from 'rxjs/operators';

import {User} from '../_models/user';
import {AuthenticationService} from '../_services/authentication.service';
import {UserService} from '../_services/user.service';
import {WebsocketService} from '../_services/websocket.service';

@Component({templateUrl: 'home.component.html'})
export class HomeComponent implements OnInit, OnDestroy {
  currentUser: User;
  currentUserSubscription: Subscription;

  constructor(private authenticationService: AuthenticationService,
              private userService: UserService,
              private websocketService: WebsocketService) {

  }

  ngOnInit() {

  }

  ngOnDestroy() {
  }

}
