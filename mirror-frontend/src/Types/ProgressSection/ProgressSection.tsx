import { ProgressValue } from "../ProgressValue/ProgressValue";

export interface ProgressSection {
  sectionId: string;
  sectionName: string;
  progressValues: ProgressValue[];
}
