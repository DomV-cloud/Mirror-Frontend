import { ImageData } from "../Image/ImageDataType";
export interface UserMemory {
  memoryId: string;
  memoryName: string;
  description?: string;
  images: ImageData[];
  reminder: string;
}
