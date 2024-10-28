// src/types/progress.ts
export interface ProgressValue {
    progressColumnValue: string;  
    progressDate_Day: number; 
    progressDate_Month: number;
    progressDate_Year: number;
  }
  
  export interface Progress {
    description: string;
    progressColumnHead: string;
    progressValue: ProgressValue[];
  }
  
  export type ProgressResponse = Progress[];
  