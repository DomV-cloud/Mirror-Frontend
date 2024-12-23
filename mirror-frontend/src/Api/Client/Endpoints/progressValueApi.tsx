// src/services/api.ts
import axios from 'axios';
import { PROGRESSES_GET, PROGRESSES_POST, PROGRESSES_PROGRESS_ID_GET, PROGRESSES_PROGRESS_ID_PUT } from '../../../Configuration/ApiEndpointUri/ProgressUri';
import { API_BASE_URL } from '../../../Configuration/apiConstants';


const api = axios.create({
  baseURL: API_BASE_URL, // Extrahuje base URL z PROGRESSES_GET PROGRESSES_GET.split('/progresses')[0]
  headers: {
    'Content-Type': 'application/json',
  },
});

export const createProgress = (data: any) => {
  return api.post(PROGRESSES_POST, data);
};

export const updateProgress = (progressId: string, data: any) => {
  const url = PROGRESSES_PROGRESS_ID_PUT.replace("{progressId}", progressId);
  return api.put(url, data);
};

export const getAllProgresses = () => {
  return api.get(PROGRESSES_GET);
};

export const deleteProgress = (id: string) => {
  const url = `${PROGRESSES_GET}/${id}`;
  return api.delete(url);
};

export const getProgressById = (progressId: string) => {
  const url = PROGRESSES_PROGRESS_ID_GET.replace("{progressId}", progressId);
  return api.get(url);
};

