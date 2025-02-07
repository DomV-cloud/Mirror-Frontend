import { ProgressValue } from "../ProgressValue/ProgressValue";

export interface ProgressSection {
  id: string;
  sectionName: string;
  progressValues: ProgressValue[];
}
