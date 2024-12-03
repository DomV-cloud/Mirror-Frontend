import apiClient from "../ApiClient";

export const getProgressById = async (progressId: string) => {
    return apiClient.get(`progress/get/${progressId}`);
  };
  