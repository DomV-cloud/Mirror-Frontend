import { MeasurementDay } from "../../Enums/ProgressGoalMeasurement/MeasurementDay";

export interface IProgressGoalMeasurement {
  id: string;
  progressGoalId: string;
  measurementDay: MeasurementDay;
  nextMeasurementDate: Date;
  daysUntilNextMeasurement: number;
}
