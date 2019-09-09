import {
  ENTITY_FAILURE,
  ENTITY_CREATE,
  ENTITY_UPDATE,
  ENTITY_FETCH,
  ENTITY_DELETE,
  SELECT_ENTITY_ITEM,
  CLEAR_ENTITY_LIST,
} from '../constants/actionType';

export const failure = (error) => ({
  type: ENTITY_FAILURE,
  error,
});

export const add = (entity, data) => ({
  type: ENTITY_CREATE,
  entity,
  data,
});

export const update = (entity, data) => ({
  type: ENTITY_UPDATE,
  entity,
  data,
});

export const fetch = (entity, data) => ({
  type: ENTITY_FETCH,
  entity,
  data,
});

export const destroy = (entity, id) => ({
  type: ENTITY_DELETE,
  entity,
  id,
});

export const selectItem = (entity, data) => ({
  type: SELECT_ENTITY_ITEM,
  entity,
  data,
});

export const clearList = (entity) => ({
  type: CLEAR_ENTITY_LIST,
  entity,
});
