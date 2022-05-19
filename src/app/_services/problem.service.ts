import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {NotificationService} from './notification.service';
import {Difficulty} from "../_models/Difficulty";
import {Problem} from "../_models/problem";
import {HttpClient} from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class ProblemService {

  problems: Problem[];

  private URL: string = 'home';
  constructor(private notif: NotificationService, private httpClient: HttpClient) {}



  addProblem(problem: Problem) {
    return this.httpClient.post(`http://localhost:3030/problem/addproblems`, problem);
  }
  getProblems() {
    return this.httpClient.get<Problem[]>('http://localhost:3030/problem/getproblems');
  }

  getProblem(id: String) {
    return this.httpClient.get<Problem>(`http://localhost:3030/problem/${id}`);

  }








}
