import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {User} from './_models/user';
import {AuthenticationService} from './_services/authentication.service';
import {WebsocketService} from './_services/websocket.service';
import {first} from "rxjs/internal/operators";
import {UserService} from "./_services/user.service";

@Component({selector: 'app-root', templateUrl: 'app.component.html'})
export class AppComponent implements OnInit {
  currentUser: User;

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private webSocketService: WebsocketService,
              private userService: UserService,
              private websocketService: WebsocketService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.webSocketService.setAllUser([]);
  }

  logout() {
    this.authenticationService.logout();
    this.webSocketService.disconnect();
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.loadAllUsers();

  }

  private loadAllUsers() {
    this.userService.getAll().pipe(first())
      .subscribe((users: Array<User>) => {
        this.websocketService.setAllUser(users);
      });
  }
}
