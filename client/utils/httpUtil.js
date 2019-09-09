import { httpBase } from './httpBaseUtil';

export const fetch = (endpoint) => httpBase().get(endpoint);

export const store = (endpoint, data) => httpBase().post(endpoint, data);

export const update = (endpoint, data) => httpBase().put(endpoint, data);

export const destroy = (endpoint) => httpBase().delete(endpoint);
