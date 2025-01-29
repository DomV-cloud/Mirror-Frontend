import axios from "axios";
import { API_BASE_URL } from "../../../Configuration/apiConstants";
import {
  USER__ACTIVE_PROGRESS_BY_ID,
  USER_MEMORY_BY_ID,
  USER_PROGRESSES_BY_ID,
} from "../../../Configuration/ApiEndpointUri/UserUri";

const api = axios.create({
  baseURL: API_BASE_URL, // Extrahuje base URL z PROGRESSES_GET PROGRESSES_GET.split('/progresses')[0]
  headers: {
    "Content-Type": "application/json",
  },
});

export const getUserProgressesById = (userId: string) => {
  const url = USER_PROGRESSES_BY_ID.replace("{userId}", userId);
  return api.get(url);
};

export const getActiveUserProgressById = (userId: string) => {
  const url = USER__ACTIVE_PROGRESS_BY_ID.replace("{userId}", userId);
  return api.get(url);
};

export const getUserMemoriesById = (userId: string) => {
  const url = USER_MEMORY_BY_ID.replace("{userId}", userId);
  return api.get(url);
};
