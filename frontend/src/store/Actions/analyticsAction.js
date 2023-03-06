import {
  GET_ALL_ANALYTICS_USER_REQUEST,
  GET_ALL_ANALYTICS_USER_REQUEST_SUCCESS,
  GET_ALL_ANALYTICS_USER_REQUEST_FAILED,
  ADD_ANALYTICS_REQUEST,
  ADD_ANALYTICS_REQUEST_SUCCESS,
  ADD_ANALYTICS_REQUEST_FAILED,
} from "../Constants/analyticsTypes";

export const getAllAnalyticsUser = (data) => {
  return { type: GET_ALL_ANALYTICS_USER_REQUEST, payload: data };
};

export const getAllAnalyticsUserSuccess = (data) => {
  return { type: GET_ALL_ANALYTICS_USER_REQUEST_SUCCESS, payload: data };
};

export const getAllAnalyticsUserFailed = (data) => {
  return { type: GET_ALL_ANALYTICS_USER_REQUEST_FAILED, payload: data };
};
export const addAnalytics = (data) => {
  return { type: ADD_ANALYTICS_REQUEST, payload: data };
};

export const addAnalyticsSuccess = (data) => {
  return { type: ADD_ANALYTICS_REQUEST_SUCCESS, payload: data };
};

export const addAnalyticsFailed = (data) => {
  return { type: ADD_ANALYTICS_REQUEST_FAILED, payload: data };
};
