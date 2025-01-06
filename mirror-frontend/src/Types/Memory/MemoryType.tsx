import { ImageData } from "../Image/ImageDataType";
export interface UserMemory {
  userId: string;
  memoryId: string;
  memoryName: string;
  description?: string;
  images: ImageData[];
  reminder: string;
}
