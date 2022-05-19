import { Component, OnInit } from '@angular/core';
import {User} from "../_models/userModel";
import {AuthService} from "../_services/auth.service";
import {UserService} from "../_services/user.service";
import {Role} from "../_models/Role";
import {Problem} from "../_models/problem";
/*
  Displays rankings of the users based on points
 */
@Component({
  selector: 'app-rankings',
  templateUrl: './rankings.component.html',
  styleUrls: ['./rankings.component.css']
})
export class RankingsComponent implements OnInit {
  problems: Problem[];
  users: User[];
  user: User;
  username: string;
  constructor(private authService: AuthService, private userService: UserService) { }

  /*
    Upon loading sends a GET request to the backend to retrieve all users and sort them by the
    number of points for displaying.
   */
  ngOnInit(): void {
    this.userService.getAll().subscribe(users => {
      users.sort((a,b) => {
        return b.points - a.points;
      })
      this.users = users;
    })
    this.authService.currentUser.subscribe(user => (this.user = user));

  }

}
