import { Component, OnInit } from '@angular/core';
import {UserService} from "../_services/user.service";
import {Problem} from "../_models/problem";
import {NotificationService} from "../_services/notification.service";
import {KatexModule} from "ng-katex";
import {Difficulty} from "../_models/Difficulty";
import {ProblemService} from "../_services/problem.service";
import {User} from "../_models/userModel";
import {AuthService} from "../_services/auth.service";
/*
  Displays the home component, which consists of user info and available problems for solving
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  pts: number
  currentUser: User
  problems: Problem[] = [];
  displayedColumns: string[] = ['points', 'task', 'difficulty'];
  constructor(private userService: UserService,
              private notifService: NotificationService,
              private authService: AuthService,
              private problemService: ProblemService) { }

  ngOnInit(): void {
    this.loadProblems();
    this.authService.currentUser.subscribe(x => {
      this.currentUser = x;
    })
    this.updateCoins();

  }
  /*
    Loads all problems from the db by sending a GET request to the backend
    using problem service
   */
  loadProblems() {
    this.problemService.getProblems().subscribe(
      problems => {
        this.problems = problems;
        console.log(this.problems);
      },
      error =>  {
        this.notifService.showNotif(error, 'ok');
      }
    )
  }
  /*
    Updates the amount of coins a user has by sending a POST request to the backend
    using user service
   */
  updateCoins() {
    this.userService.getUser().subscribe(x => {
      this.pts = x[0].points;
    })
  }



}
