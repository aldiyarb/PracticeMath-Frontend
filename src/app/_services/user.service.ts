import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {NotificationService} from './notification.service';
import {Difficulty} from "../_models/Difficulty";
import {Problem} from "../_models/problem";
import {User} from "../_models/userModel";
import {HttpClient} from "@angular/common/http";


@Injectable({ providedIn: 'root' })
export class UserService {


  problems: Problem[];


  constructor(private notif: NotificationService, private http: HttpClient) {
  }


  register(user: User) {
    return this.http.post(`http://localhost:3030/user/register`, user);
  }
  getAll() {
    return this.http.get<User[]>(`http://localhost:3030/user/allusers`);
  }
  getUser() {
    return this.http.get<User>(`http://localhost:3030/user/byusername`);
  }
  addCompleted(problem: Problem) {
    return this.http.post(`http://localhost:3030/user/completed`, problem);
  }
  addAttempted(problem: Problem) {
    return this.http.post(`http://localhost:3030/user/attempted`, problem);
  }
  addFavourite(problem: Problem) {
    return this.http.post(`http://localhost:3030/user/favourite`, problem);
  }
  getCompleted() {
    return this.http.get<Problem[]>(`http://localhost:3030/user/getcompleted`);
  }
  getAttempted() {
    return this.http.get<Problem[]>(`http://localhost:3030/user/getattempted`);
  }
  getFavourite() {
    return this.http.get<Problem[]>(`http://localhost:3030/user/getfavourite`);
  }
  delFavourite(problem: Problem) {
    return this.http.post(`http://localhost:3030/user/delfavourite`, problem)
  }
  updatePoints(points: number) {
    return this.http.post(`http://localhost:3030/user/points`, {"points" : points})
  }
  updateRetry(retry: number) {
    return this.http.post(`http://localhost:3030/user/retry`, {"retry" : retry})
  }





}
