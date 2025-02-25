import { ProgressSection } from "../ProgressSection/ProgressSection";

export interface Progress {
  id: string;
  description?: string;
  sections: ProgressSection[];
  progressName: string;
  isAchieved?: boolean; // possible duplication
  isActive?: boolean;
  trackedDays: number;
  trackingProgressDay: TrackingProgressDays;
  percentageAchieved: number;
  updated?: string;
}

export enum TrackingProgressDays {
  Monday = "Monday",
  Tuesday = "Tuesday",
  Wednesday = "Wednesday",
  Thursday = "Thursday",
  Friday = "Friday",
  Saturday = "Saturday",
  Sunday = "Sunday",
}

export type ProgressResponse = Progress[];
