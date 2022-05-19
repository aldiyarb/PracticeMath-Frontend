import {Component, Input, OnInit} from '@angular/core';
import { Problem } from '../_models/problem';
import {Difficulty} from "../_models/Difficulty";
import {NotificationService} from "../_services/notification.service";

@Component({
  selector: 'app-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.css']
})
export class ProblemComponent implements OnInit {

  @Input() problem: Problem;

  private points: number;
  private difficulty: Difficulty;
  private description: string;
  private answer: string;
  private hints: string;

  constructor(private notifService: NotificationService) { }

  ngOnInit(): void {
    this.points = this.problem.points;
    this.difficulty = this.problem.difficulty;
    this.description = this.problem.description;
    this.answer = this.problem.answer;
    this.hints = this.problem.hints;
  }

}
