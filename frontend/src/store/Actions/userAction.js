import {
  GET_ALLUSERS_REQUEST,
  GET_ALLUSERS_REQUEST_SUCCESS,
  GET_ALLUSERS_REQUEST_FAILED,
  UPDATE_USER_REQUEST,
  UPDATE_USER_REQUEST_SUCCESS,
  UPDATE_USER_REQUEST_FAILED,
  DELETE_USER_REQUEST,
  DELETE_USER_REQUEST_SUCCESS,
  DELETE_USER_REQUEST_FAILED,
  FILTER_ACTIVE_USERS,
  FILTER_INACTIVE_USERS,
  FILTER_ACTIVE_USERS_SUCCESS,
  FILTER_INACTIVE_USERS_SUCCESS,
} from "../Constants/userTypes";

export const getAllUsers = (data) => {
  return { type: GET_ALLUSERS_REQUEST, payload: data };
};

export const getAllUsersSuccess = (data) => {
  return { type: GET_ALLUSERS_REQUEST_SUCCESS, payload: data };
};

export const getAllUsersFailed = (data) => {
  return { type: GET_ALLUSERS_REQUEST_FAILED, payload: data };
};

export const updateUser = (data) => {
  return { type: UPDATE_USER_REQUEST, payload: data };
};

export const updateUserSuccess = (data) => {
  return { type: UPDATE_USER_REQUEST_SUCCESS, payload: data };
};

export const updateUserFailed = (data) => {
  return { type: UPDATE_USER_REQUEST_FAILED, payload: data };
};

export const deleteUser = (data) => {
  return { type: DELETE_USER_REQUEST, payload: data };
};

export const deleteUserSuccess = (data) => {
  return { type: DELETE_USER_REQUEST_SUCCESS, payload: data };
};

export const deleteUserFailed = (data) => {
  return { type: DELETE_USER_REQUEST_FAILED, payload: data };
};

export const filterActiveUsers = (data) => {
  return { type: FILTER_ACTIVE_USERS, payload: data };
};
export const filterActiveUsersSuccess = (data) => {
  return { type: FILTER_ACTIVE_USERS_SUCCESS, payload: data };
};
export const filterInactiveUsers = (data) => {
  return { type: FILTER_INACTIVE_USERS, payload: data };
};
export const filterInactiveUsersSuccess = (data) => {
  return { type: FILTER_INACTIVE_USERS_SUCCESS, payload: data };
};
