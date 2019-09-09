import jwtDecode from 'jwt-decode';
import { getLocalStorage } from './storageUtil';

export const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    if (decoded.exp < Date.now() / 1000) {
      // Checking if token is expired.
      return true;
    }

    return false;
  } catch (e) {
    return false;
  }
};

export const getToken = () => getLocalStorage('token');

export const isAuthenticated = () => !!getToken() && !isTokenExpired(getToken());
