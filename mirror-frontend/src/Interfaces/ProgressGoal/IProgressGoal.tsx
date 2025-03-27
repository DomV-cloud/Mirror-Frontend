import { IProgressGoalMeasurement } from "../ProgressMeasurement/IProgressGoalMeasurement";

export interface IProgressGoal {
  id: string;
  isAchieved?: boolean;
  trackedDays: number;
  percentageAchieved: number;
  Measurement: IProgressGoalMeasurement;
}
