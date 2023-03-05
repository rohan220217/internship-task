import {
  GET_ALLUSERS_REQUEST,
  GET_ALLUSERS_REQUEST_SUCCESS,
  GET_ALLUSERS_REQUEST_FAILED,
 
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
