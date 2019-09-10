export const apiPath = 'api/';

export const APP_HOST = process.env.APP_HOST || 'agence-test-horoku.herokuapp.com';
export const APP_PORT = process.env.PORT || 5000;
export const HOST = `${APP_HOST}:${APP_PORT}/`;

export const API_URL = `https://${HOST}${apiPath}`;
