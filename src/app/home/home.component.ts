import { Component, OnInit } from '@angular/core';
import {UserService} from "../_services/user.service";
import {Problem} from "../_models/problem";
import {NotificationService} from "../_services/notification.service";
import {KatexModule} from "ng-katex";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  problems: Problem[] = [];
  displayedColumns: string[] = ['points', 'problem_name', 'difficulty'];
  constructor(private userService: UserService,
              private notifService: NotificationService) { }

  ngOnInit(): void {
    this.loadProblems();
  }

  loadProblems() {
    this.userService.getActivities().subscribe(
      problems => {
        this.problems = problems;
        console.log(this.problems);
      },
      error => {
        this.notifService.showNotif('Could not load problems', 'error');
      }
    )
  }

}
