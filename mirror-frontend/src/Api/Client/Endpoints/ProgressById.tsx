import { PROGRESSES_PROGRESS_ID_GET } from "../../../Configuration/ApiEndpointUri/ProgressUri";
import apiClient from "../ApiClient";

export const getProgressById = async (progressId: string) => {
  const url = PROGRESSES_PROGRESS_ID_GET.replace("{progressId}", progressId);

  return apiClient.get(url);
};
  