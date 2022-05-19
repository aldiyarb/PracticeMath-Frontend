import { Component, OnInit, Input} from '@angular/core';
import {User} from "../_models/userModel";
import {UserService} from "../_services/user.service";
import {AuthService} from "../_services/auth.service";
import {Router} from "@angular/router";
/*
  Avatar component to display user avatar.
 */
@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css']
})
export class AvatarComponent implements OnInit {
  color: string ='#FFFFFF';
  bgcolor: string ='#000000';

  size: string = 'small';
  @Input() user: User;
  currUser: User;
  constructor(private authService: AuthService, public route: Router) { }

  ngOnInit(): void {
    this.authService.currentUser.subscribe(user => {
      this.currUser = user
      console.log(user)
      console.log(this.user)
      if (!(user.username == this.user.username)) {
        this.bgcolor = '#808080';
      }
    });
  }
}
