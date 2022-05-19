import { Component, OnInit } from '@angular/core';
import {Problem} from "../_models/problem";
import {AuthService} from "../_services/auth.service";
import {User} from "../_models/userModel";
import {NotificationService} from "../_services/notification.service";
import {UserService} from "../_services/user.service";
import {ProblemService} from "../_services/problem.service";
/*
  Favourite component which displays the list of favourite problems of the current user
 */
@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {
  favourites: Problem[] = [];
  ct: number
  user: User;
  constructor(private authService: AuthService, private notifService: NotificationService,
              private userService: UserService, private problemService: ProblemService) { }

  ngOnInit(): void {
    this.loadFavourites()
  }
  /*
    Loads favourite problems of the current user by sending the GET request
    to the backend using problem service
   */
  loadFavourites() {
    this.userService.getFavourite().subscribe(problems => {
      problems.forEach(p => {
        this.problemService.getProblem(p.toString()).subscribe(x => {
          this.favourites.push(x);
        });
      });
    });
  }
  /*
    Deletes a favourite problem of the current user by sending the POST request
    to the backend using problem service
   */
  deleteFavourite(problem) {
    this.userService.delFavourite(problem).subscribe(() => {
      this.favourites = null;
      this.loadFavourites();
    });


  }

}
