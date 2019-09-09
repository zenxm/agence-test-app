import axios from 'axios';

import { API_URL } from '../config/config';
// import { getLocalStorage } from './storageUtil';

export const httpBase = () => {
  const api = axios.create({
    baseURL: `${API_URL}`,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      // 'X-XSRF-TOKEN': getLocalStorage('token'),
    },
    responseType: 'json',
  });

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) {
        // redirect to login page
      }
      if (error.response.status === 404) {
        // redirect to 404 page
      }
      if (error.response.status === 500) {
        // redirect to 500 page
      }
      return Promise.reject(error);
    },
  );

  return api;
};
