import { IProgressGoal } from "../../Interfaces/ProgressGoal/IProgressGoal";
import { IProgressSection } from "../ProgressSection/ProgressSection";
import { IProgressGoalMeasurement } from "../../Interfaces/ProgressMeasurement/IProgressGoalMeasurement";
import { MeasurementDay } from "../../Enums/ProgressGoalMeasurement/MeasurementDay";

export interface IProgress {
  id: string;
  description?: string;
  sections: IProgressSection[];
  progressName: string;
  isAchieved?: boolean; // possible duplication
  isActive?: boolean;
  trackedDays: number;
  trackingProgressDay: MeasurementDay;
  percentageAchieved: number;
  updated?: string;
  Goal: IProgressGoal;
  Measurement: IProgressGoalMeasurement;
}

export type ProgressResponse = IProgress[];
