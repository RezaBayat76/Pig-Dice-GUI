import {Injectable} from '@angular/core';
import * as Stomp from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import {User} from '../_models/user';
import {BehaviorSubject, Observable} from 'rxjs/index';


@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private connected = false;
  private stompClient = null;
  users: Map<number, User> = new Map();
  onlineUsers: Map<number, User> = new Map();
  user: User;
  private userSubject = new BehaviorSubject<Map<number, User>>(this.users);
  private onlineUserSubject = new BehaviorSubject<Map<number, User>>(this.onlineUsers);


  constructor() {
  }


  setUser(user: User) {
    this.user = user;
  }

  setAllUser(users: Array<User>) {
    this.users = new Map();
    users.forEach(user => {
      this.users.set(user.id, user);
    });
    this.onlineUsers.forEach((value, key) => {
      this.users.get(key).isOnline = true;
    });
    this.updateusers();
  }

  private updateusers() {
    this.userSubject.next(this.users);
  }

  getUsers(): Observable<Map<number, User>> {
    this.updateusers();
    return this.userSubject.asObservable();
  }

  private updateOnlineUsers() {
    this.users.forEach(value => value.isOnline = false);
    if (this.users && this.users.size > 0) {
      this.onlineUsers.forEach((value, key) => {
        this.users.get(key).isOnline = true;
      });
    }

    this.onlineUserSubject.next(this.onlineUsers);
  }

  getOnlineUser(): Observable<Map<number, User>> {
    return this.onlineUserSubject.asObservable();
  }

  connect() {
    if (this.connected) {
      return;
    }
    const socket = new SockJS('http://localhost:8080/pig-dice-endpoint');
    this.stompClient = Stomp.Stomp.over(socket);

    const _this = this;
    this.stompClient.connect({}, function (frame) {
      console.log('Connected: ' + frame);
      _this.stompClient.subscribe('/topic/user/online-users', function (message) {
        console.log('online userssssss')
        console.log(message.body);
        _this.onlineUsers = new Map();

        const users = JSON.parse(message.body);
        users.users.forEach(user => {
          user.isOnline = true;
          _this.onlineUsers.set(user.id, user);
        });
        _this.updateOnlineUsers();
      });


      _this.stompClient.subscribe('/topic/user-online', function (message) {
        console.log(message.body);
        const user = JSON.parse(message.body);
        user.isOnline = true;
        _this.onlineUsers.set(user.id, user);
        _this.updateOnlineUsers();
      });


      _this.stompClient.subscribe('/topic/user-offline', function (message) {
        console.log(message.body);
        const user = JSON.parse(message.body);
        _this.onlineUsers.delete(user.id);
        _this.updateOnlineUsers();
      });

      _this.stompClient.subscribe('/topic/new-user', function (message) {
        console.log(message.body);
        const user = JSON.parse(message.body);
        _this.users.set(user.id, user);
        _this.updateusers();
      });

      _this.stompClient.send('/app/start',
        {},
        JSON.stringify(_this.user)
      );
      _this.connected = true;
    });
  }

  disconnect() {
    if (this.stompClient != null) {
      this.stompClient.disconnect();
    }
    this.connected = false;

    console.log('Disconnected!');
  }

  getUser(id: number) {
    return this.users.get(id);
  }
}
