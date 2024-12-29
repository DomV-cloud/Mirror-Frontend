import axios from 'axios';
import { API_BASE_URL } from '../../../Configuration/apiConstants';
import { MEMORY_GET_BY_ID } from '../../../Configuration/ApiEndpointUri/UserMemoryUri';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  export const getMemoryById = (memoryId: string) => {
      const url = MEMORY_GET_BY_ID.replace("{memoryId}", memoryId);
      return api.get(url);
    };
