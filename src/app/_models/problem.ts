import {Difficulty} from "./Difficulty";

export class Problem {
  id: string;
  points: number;
  difficulty: Difficulty;
  description: string;
  task: string;
  answer: string;
  hints: string;
}
