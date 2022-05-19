import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Problem} from "../_models/problem";
import {Difficulty} from "../_models/Difficulty";
import {User} from "../_models/userModel";
import {AuthService} from "../_services/auth.service";
import {UserService} from "../_services/user.service";
import {Router} from "@angular/router";
/*
  Displays problem card on the home page and favourite page.
 */
@Component({
  selector: 'app-problem-card',
  templateUrl: './problem-card.component.html',
  styleUrls: ['./problem-card.component.css']
})
export class ProblemCardComponent implements OnInit {
  user: User;
  @Input() problem: Problem;
  @Output() deleteEvent = new EventEmitter<Problem>();
  private points: number;
  private difficulty: string;
  private description: string;
  private answer: string;
  private hints: string;
  private task: string;
  status: number;
  completed: Problem[];
  attempted: Problem[];
  constructor(private authService: AuthService, private userService: UserService, public route: Router) {
    this.authService.currentUser.subscribe(user => (this.user = user));
    this.status = 0;

  }
  //Helper function to get the difficulty of the problem
  findDifficulty(): string {
    if (this.problem.difficulty === 0) {
      return 'easy';
    } else if  (this.problem.difficulty === 1) {
      return 'medium';
    } else {
      return 'hard';
    }
  }
  ngOnInit(): void {
    this.points = this.problem.points;
    this.difficulty = this.findDifficulty();
    this.description = this.problem.description;
    this.answer = this.problem.answer;
    this.hints = this.problem.hints;
    this.task = this.problem.task;
    this.userService.getAttempted().subscribe(problems => {
      this.attempted = problems
      problems.forEach(problem => {
        if (problem.toString() == this.problem.id.toString()) {
          if (this.status != 2) {
            this.status = 1;
          }
        }
      })
    })
    this.userService.getCompleted().subscribe(problems => {
      this.completed = problems
      problems.forEach(problem => {
        if (problem.toString() == this.problem.id.toString()) {
          this.status = 2;
        }
      })
    });

  }

  //Emits an event to delete from the favorite list
  deleteFavourite(problem) {
    this.deleteEvent.emit(problem);
  }
  //Getter functions
  getPoints(): number {
    return this.points;
  }
  getDifficulty(): string {
    return this.difficulty;
  }
  getTask(): string {
    return this.task;
  }

}
