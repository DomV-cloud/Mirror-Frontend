import { IProgressValue } from "../ProgressValue/ProgressValue";

export interface IProgressSection {
  sectionId: string;
  sectionName: string;
  progressValues: IProgressValue[];
}
