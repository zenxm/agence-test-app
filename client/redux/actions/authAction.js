// Import actionType constants
import {
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT_SUCCESS,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
} from '../constants/actionType';

export const loginSuccess = (data) => ({
  type: LOG_IN_SUCCESS,
  data,
});

export const loginFailure = (error) => ({
  type: LOG_IN_FAILURE,
  error,
});

export const logoutSuccess = () => ({
  type: LOG_OUT_SUCCESS,
});

export const signupSuccess = (data) => ({
  type: SIGN_UP_SUCCESS,
  data,
});

export const signupFailure = (error) => ({
  type: SIGN_UP_FAILURE,
  error,
});
