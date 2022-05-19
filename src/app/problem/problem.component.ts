import {Component, Input, OnInit} from '@angular/core';
import { Problem } from '../_models/problem';
import {Difficulty} from "../_models/Difficulty";
import {NotificationService} from "../_services/notification.service";
import {HttpClient} from "@angular/common/http";
import {ProblemService} from "../_services/problem.service";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../_services/user.service";
import {User} from "../_models/userModel";
import {AuthService} from "../_services/auth.service";
import {first} from "rxjs";
/*
  Displays the problem that a user is currently solving.
 */
@Component({
  selector: 'app-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.css']
})
export class ProblemComponent implements OnInit {
  favouriteIDS: string[] = [];
  submissions: number[] = [];
  completed: Problem[];
  completedIds: string[] = [];
  pointsClaimed: boolean = false;
  submitted: boolean = false;
  correctAns: boolean = false;
  inputAns: string;
  ansInt: number;
  showHint: boolean = false;
  user: User;
  attempts: number;
  private problem: Problem;
  private points: number;
  private difficulty: string;
  private description: string;
  private answer: string;
  private hints: string;

  constructor(private notifService: NotificationService, private httpClient: HttpClient,
              private problemService: ProblemService, private route: ActivatedRoute,
              private userService: UserService, private authService: AuthService) { }

  /*
    Helper function
   */
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
    this.route.paramMap.subscribe(params => {
      this.problemService.getProblem(params.get('id')).subscribe(problem => {
        this.problem = problem})
      });
    // this.authService.currentUser.subscribe(user => {
    //   this.points = user.points
    //   this.attempts = user.retry;
    //   this.user = user});
    this.userService.getUser().subscribe(user => {
      this.user = user[0];
      this.points = user[0].points;
      this.attempts = user[0].retry;
    })
    this.userService.getCompleted().subscribe(problems => {
      this.completed = problems;
      problems.forEach(problem => {
        this.completedIds.push(problem.toString());
      });
    });
    this.userService.getFavourite().subscribe(problems => {
      problems.forEach(problem => this.favouriteIDS.push(problem.toString()));
    });


  }
  /*
    Helper function to refresh after user tries to resolve the problem.
   */
  redo() {
    this.showHint = false
    this.submitted = false;
    this.correctAns = false;
    this.inputAns = '';
  }
  /*
    Helper function to refresh after user tries to resolve the problem.
   */
  redoOnClick() {
    this.retry();
    this.showHint = false
    this.submitted = false;
    this.correctAns = false;
    this.inputAns = '';
  }
  /*
    Returns the current problem object
   */
  getProblem(): Problem {
    return this.problem;
  }
  /*
    Display hints after a user has clicked on a certain button
   */
  showHintOnClick() {
    this.showHint = true;
  }
  /*
    Sends a POST request to the backend to add a problem to the list of current user's
    favourite functions in the db.
   */
  addToFavourites() {
    if (!this.favouriteIDS.includes(this.problem.id)) {
      this.userService.addFavourite(this.problem).pipe(first()).subscribe(
        resp => {
          this.notifService.showNotif('Added to favourites', 'ok');
        }, error => {
          this.notifService.showNotif(error);
        })
    }
    else {
      this.notifService.showNotif('Already in favourites', 'error');
    }
  }

  /*
    Helper function to refresh after user tries to resolve the problem.
   */
  retry() {
    if (this.attempts > 0) {
      this.attempts = this.attempts - 1;
      this.userService.updateRetry(this.attempts).subscribe(res => {
          this.notifService.showNotif('You have ' + this.attempts + ' free retries', 'OK');
        },
        err => {
          this.notifService.showNotif(err, "OK");
        }
      )
      this.userService.getUser().subscribe(user => {
        this.attempts = user[0].retry;
      })
    }
    else {
      this.notifService.showNotif('No more free retries');
    }


  }

  /*
    Subtracts 2 points from the user and sends a POST request to update
    the amount of points the current user has.
   */
  pay2Redo() {
    if (this.points >= 2) {
      this.points -= 2;
      this.showHint = false
      this.submitted = false;
      this.correctAns = false;
      this.inputAns = '';
      this.userService.updatePoints(this.points).subscribe(res => {
        this.notifService.showNotif('-2 coins', 'ok');
      })
    }
    else {
      this.notifService.showNotif('Not enough points: ' + this.user.points, 'dismiss');
    }

  }
  /*
    Function that handles submission of the answer to the problem
   */
  submitOnClick() {
    //this.user.attempted.push(this.userService.problems[this.problem.id - 1]);
    //Add to user's attempted once clicked through the POST request
    this.userService.addAttempted(this.problem).pipe(first()).subscribe(
      resp => {
      }, error => {
        this.notifService.showNotif(error);
      }
    )

    this.submissions.push(parseInt(this.inputAns));
    this.ansInt = parseInt(this.problem.answer);
    if (parseInt(this.inputAns) === parseInt(this.problem.answer)) {
      this.correctAns = true;
      //If the answer is correct check if the problem has been completed
      if (!this.completedIds.includes(this.problem.id)) {
        console.log(this.completedIds.includes(this.problem.id));
        //If not send the POST request to update points
        this.points = this.user.points + this.problem.points;
        this.userService.updatePoints(this.points).pipe(first()).subscribe(
          resp => {

          }, error => {
            this.notifService.showNotif(error); });
        //Send the POST request to update the list of completed problems of the current user
        this.userService.addCompleted(this.problem).pipe(first()).subscribe(
          resp => {
          }, error => {
            this.notifService.showNotif(error);
          }
        )

        //this.user.completed.push(this.userService.problems[this.problem.id - 1]);
        this.notifService.showNotif(this.problem.points + ' point/s awarded', 'dismiss');

      }
      else {
        this.pointsClaimed = true;
        this.notifService.showNotif('Points already claimed', 'dismiss');

      }
    }
    else {
      this.correctAns = false;
    }
    this.submitted = true;
  }
}
