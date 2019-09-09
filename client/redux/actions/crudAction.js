import history from '../../utils/history';

/**
 * Import all commonAction as an object.
 */
import * as commonAction from './commonAction';

/**
 * Import all httpService as an object.
 */
import * as httpService from '../../services/httpService';

/**
 * CRUD actions for the application.
 * Every time an action that requires the API is called, it first dispatch an "apiRequest" action.
 *
 * entity = 'Product', 'Employee', ...
 */

export const fetchAll = (entity) => (dispatch) =>
  httpService
    .fetchEntity(entity)
    .then((response) => {
      dispatch(commonAction.fetch(entity, response.data));
    })
    .catch((error) => {
      dispatch(commonAction.failure(error));
    });

export const fetchById = (entity, id) => (dispatch) =>
  httpService
    .fetchEntityById(entity, id)
    .then((response) => {
      dispatch(commonAction.selectItem(entity, response.data));
    })
    .catch((error) => {
      dispatch(commonAction.failure(error));
    });

export const storeItem = (entity, data) => (dispatch) =>
  httpService
    .storeEntity(entity, data)
    .then((response) => {
      history.goBack();
    })
    .catch((error) => {
      dispatch(commonAction.failure(error));
    });

export const updateItem = (entity, data, id) => (dispatch) =>
  httpService
    .updateEntity(entity, data, id)
    .then((response) => {
      history.goBack();
    })
    .catch((error) => {
      dispatch(commonAction.failure(error));
    });

export const destroyItem = (entity, id, data) => (dispatch) =>
  httpService
    .destroyEntity(entity, id)
    .then((response) => {
      dispatch(fetchAll(entity, data));
    })
    .catch((error) => {
      dispatch(commonAction.failure(error));
    });

export const submitForm = (entity, data, id) => (dispatch) => {
  if (id) {
    dispatch(updateItem(entity, data, id));
  } else {
    dispatch(storeItem(entity, data));
  }
};
