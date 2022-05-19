import { OnInit, Component } from '@angular/core';

import {User} from "./_models/userModel";
import {Router} from "@angular/router";
import {AuthService} from "./_services/auth.service";
import {Role} from "./_models/Role";
import {NotificationService} from "./_services/notification.service";
import {UserService} from "./_services/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'project';
  currentUser: User;
  pts: number;
  constructor(  private router: Router,
                private authService: AuthService,
                private notifService: NotificationService,
                private userService: UserService
  ) {

  }

  ngOnInit(): void {
    this.authService.currentUser.subscribe(x => {
      this.currentUser = x;
    });
  }

  get isAdmin() {
    // tslint:disable-next-line:max-line-length
    // In a later version of this code. We will define a class User and have that encompass both the username and role. For now we will just hardcode it.
    return this.currentUser && this.currentUser.role === Role.admin;
  }

  get isUser() {

    return this.currentUser;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  notImplemented(message) {

    this.notifService.notImplementedWarning(message);
  }
  adminNotImplemented() {
    this.notifService.showNotif('"Admin" is not implemented', 'error');
  }
}
