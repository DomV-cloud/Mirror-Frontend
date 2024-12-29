export interface ImageData {
  id: string;
  url: string | null;
  fileName: string;
  contentType: string;
  content: string; // Binary data in Base64
}
