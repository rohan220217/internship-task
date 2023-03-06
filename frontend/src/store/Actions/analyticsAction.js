import {
  GET_ALL_ANALYTICS_USER_REQUEST,
  GET_ALL_ANALYTICS_USER_REQUEST_SUCCESS,
  GET_ALL_ANALYTICS_USER_REQUEST_FAILED,
  ADD_ANALYTICS_REQUEST,
  ADD_ANALYTICS_REQUEST_SUCCESS,
  ADD_ANALYTICS_REQUEST_FAILED,
  GET_ALL_ANALYTIC_WEB_REQUEST,
  GET_ALL_ANALYTIC_WEB_REQUEST_SUCCESS,
  GET_ALL_ANALYTIC_WEB_REQUEST_FAILED,
  GET_WEB_REVENUE_REQUEST,
  GET_WEB_REVENUE_REQUEST_SUCCESS,
  GET_WEB_REVENUE_REQUEST_FAILED,
  GET_COMPANY_REVENUE_REQUEST,
  GET_COMPANY_REVENUE_REQUEST_SUCCESS,
  GET_COMPANY_REVENUE_REQUEST_FAILED,
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

export const getAllAnalyticsWeb = (data) => {
  return { type: GET_ALL_ANALYTIC_WEB_REQUEST, payload: data };
};

export const getAllAnalyticsWebSuccess = (data) => {
  return { type: GET_ALL_ANALYTIC_WEB_REQUEST_SUCCESS, payload: data };
};

export const getAllAnalyticsWebFailed = (data) => {
  return { type: GET_ALL_ANALYTIC_WEB_REQUEST_FAILED, payload: data };
};

export const getWebRevenue = (data) => {
  return { type: GET_WEB_REVENUE_REQUEST, payload: data };
};

export const getWebRevenueSuccess = (data) => {
  return { type: GET_WEB_REVENUE_REQUEST_SUCCESS, payload: data };
};

export const getWebRevenueFailed = (data) => {
  return { type: GET_WEB_REVENUE_REQUEST_FAILED, payload: data };
};

export const getCompanyRevenue = (data) => {
  return { type: GET_COMPANY_REVENUE_REQUEST, payload: data };
};

export const getCompanyRevenueSuccess = (data) => {
  return { type: GET_COMPANY_REVENUE_REQUEST_SUCCESS, payload: data };
};

export const getCompanyRevenueFailed = (data) => {
  return { type: GET_COMPANY_REVENUE_REQUEST_FAILED, payload: data };
};
