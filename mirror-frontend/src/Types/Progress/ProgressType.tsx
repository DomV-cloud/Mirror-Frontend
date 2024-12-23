export interface ProgressValue {
    progressColumnValue: string;  
    progressDate_Day: number; 
    progressDate_Month: number;
    progressDate_Year: number;
  }
  
  export interface Progress {
    description?: string;
    progressValue: ProgressValue[];
    progressName: string;
    isAchieved?: boolean;
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
  