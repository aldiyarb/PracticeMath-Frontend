import {Component, Input, OnInit} from '@angular/core';
import {User} from "../_models/userModel";
/*
  Displays the rankings card of the user
 */
@Component({
  selector: 'app-rank',
  templateUrl: './rank.component.html',
  styleUrls: ['./rank.component.css']
})
export class RankComponent implements OnInit {

  @Input() user: User;
  @Input() rank: number;
  successRate: number;
  constructor() { }

  ngOnInit(): void {
    this.successRate = Math.floor(this.user.completed.length / this.user.attempted.length * 100);
  }

}
