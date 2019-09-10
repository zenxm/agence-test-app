// Import custom utils
import { fetch, fetchQuery, store, update, destroy } from '../utils/httpUtil';
import { getPathParam } from '../utils/serializeUtil';

export const fetchEntity = (entityName) => fetch(entityName.toLowerCase());

export const fetchEntityQuery = (entityName, query) => fetchQuery(entityName.toLowerCase(), query);

export const fetchEntityById = (entityName, dataId) =>
  fetch(getPathParam(entityName.toLowerCase(), dataId));

export const storeEntity = (entityName, data) => store(entityName.toLowerCase(), data);

export const updateEntity = (entityName, data, dataId) =>
  update(getPathParam(entityName.toLowerCase(), dataId), data);

export const destroyEntity = (entityName, dataId) =>
  destroy(getPathParam(entityName.toLowerCase(), dataId));
