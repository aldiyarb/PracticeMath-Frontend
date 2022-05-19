import { Component, OnInit } from '@angular/core';
import {Difficulty} from "../_models/Difficulty";
import {UserService} from "../_services/user.service";
import {Problem} from "../_models/problem";
import {ProblemService} from "../_services/problem.service";
import {first} from "rxjs";
import {NotificationService} from "../_services/notification.service";
/*
  Admin component that serves for the addition of new problems
 */
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  newProblem: Problem = new Problem();
  points: number;
  difficulty: Difficulty.easy;
  description: string;
  task: string;
  answer: string;
  hints: string;
  difficulties: Difficulty[] = [Difficulty.easy, Difficulty.medium, Difficulty.hard];
  constructor(private userService: UserService, private problemService: ProblemService,
              private notifService: NotificationService) { }

  ngOnInit(): void {

  }

  /*
    Saves a problem and adds it to the database using problem service by
    sending a request to the backend.
   */
  saveProblem() {
    this.newProblem.task = this.task;
    this.newProblem.points = this.points;
    this.newProblem.description = this.description;
    this.newProblem.answer = this.answer;
    this.newProblem.hints = this.hints;
    this.newProblem.difficulty = this.difficulty;
    this.problemService.addProblem(this.newProblem).pipe(first()).subscribe(
      resp => {
        this.notifService.showNotif('New Task Created!', 'OK');
      }, error => {
        this.notifService.showNotif(error); });
    this.userService.problems.push(this.newProblem);
  }

}
