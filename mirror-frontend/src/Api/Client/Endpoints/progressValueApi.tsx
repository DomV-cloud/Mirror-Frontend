// src/services/api.ts
import axios from 'axios';
import { API_BASE_URL } from '../../../Configuration/apiConstants';


// Create an Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    //'ApiKey': certificateApi.API_KEY, TODO: BUT WITH JWT TOKEN
  },
});

// API Methods
export const createProgress = (data: any) => {
  return api.post('/create', data);
};

export const updateProgress = (data: any) => {
  return api.post('/update', data);
};

export const getAllProgresses = () => {
  return api.get('/progress/all');
};

export const deleteProgress = (id: number) => {
  return api.delete(`/delete/${id}`);
};