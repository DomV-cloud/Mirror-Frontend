import { Progress } from "../Progress/ProgressType";

export interface User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    progresses: Progress[];
  }