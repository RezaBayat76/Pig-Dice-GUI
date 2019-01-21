import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../_models/user';
import {UserService} from '../../_services/user.service';
import {AlertService} from '../../_services/alert.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @Input() user: User = {};

  @Input() showOnline = true;

  @Input() showFollowButton = true;
  @Input() showProfile = true;

  constructor(private userService: UserService,
              private alertService: AlertService) {
  }

  ngOnInit() {
  }

  follow() {
    this.userService.follow(this.user.id).subscribe(data => {
      this.alertService.success('Followed successfully');
      this.user.isFollowed = true;
    });
  }

  unFollow() {
    this.userService.unFollow(this.user.id).subscribe(data => {
      this.alertService.success('Un followed successfully');
      this.user.isFollowed = false;
    });
  }
}
