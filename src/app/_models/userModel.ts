import {Role} from "./Role";
import {Problem} from "./problem";

export class User {
  retry: number;
  username: string;
  role: Role;
  token?: string;
  points: number;
  completed: Problem[];
  attempted: Problem[];
  favourite: Problem[];
}
