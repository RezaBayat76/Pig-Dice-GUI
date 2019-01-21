import {Component, OnDestroy, OnInit} from '@angular/core';
import {WebsocketService} from "../_services/websocket.service";
import {User} from "../_models/user";

@Component({
  selector: 'app-guest-online-user',
  templateUrl: './guest-online-user.component.html',
  styleUrls: ['./guest-online-user.component.css']
})
export class GuestOnlineUserComponent implements OnInit, OnDestroy {

  onlineUsers: Array<User> = [];

  constructor(private webSocketService: WebsocketService) {
  }

  ngOnInit() {
    this.webSocketService.setUser(JSON.parse(localStorage.getItem('currentUser')));
    this.webSocketService.connect();

    this.webSocketService.getOnlineUser().subscribe(data => {
      this.onlineUsers = [];
      data.forEach(value => {
        value.isOnline = true;
        this.onlineUsers.push(value);
      });
    });

  }


  ngOnDestroy() {
    this.webSocketService.disconnect();
  }

}
