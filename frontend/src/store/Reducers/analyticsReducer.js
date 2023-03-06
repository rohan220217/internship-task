import {
  ADD_ANALYTICS_REQUEST,
  ADD_ANALYTICS_REQUEST_FAILED,
  ADD_ANALYTICS_REQUEST_SUCCESS,
  GET_ALL_ANALYTICS_USER_REQUEST,
  GET_ALL_ANALYTICS_USER_REQUEST_FAILED,
  GET_ALL_ANALYTICS_USER_REQUEST_SUCCESS,
  GET_ALL_ANALYTIC_WEB_REQUEST,
  GET_ALL_ANALYTIC_WEB_REQUEST_FAILED,
  GET_ALL_ANALYTIC_WEB_REQUEST_SUCCESS,
  GET_COMPANY_REVENUE_REQUEST,
  GET_COMPANY_REVENUE_REQUEST_FAILED,
  GET_COMPANY_REVENUE_REQUEST_SUCCESS,
  GET_WEB_REVENUE_REQUEST,
  GET_WEB_REVENUE_REQUEST_FAILED,
  GET_WEB_REVENUE_REQUEST_SUCCESS,
} from "../Constants/analyticsTypes";

const initialState = {
  allAnalyticsUser: [],
  allAnalyticsWeb: [],
  allAnalyticsUserRevenue: [],
  allAnalyticsCompRevenue: [],
  isAllAnalyticsLoading: false,
  addAnalyticsLoading: false,
  isAllAnalyticsWebLoading: false,
  isAllAnalyticsUserRevenue: false,
  isAllAnalyticsCompRevenue: false,
};

export const analyticsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_ANALYTICS_USER_REQUEST:
      return { ...state, isAllAnalyticsLoading: true };

    case GET_ALL_ANALYTICS_USER_REQUEST_SUCCESS:
      return {
        ...state,
        isAllAnalyticsLoading: false,
        allAnalyticsUser: action.payload,
      };

    case GET_ALL_ANALYTICS_USER_REQUEST_FAILED:
      return { ...state, isAllAnalyticsLoading: false };

    case ADD_ANALYTICS_REQUEST:
      return { ...state, addAnalyticsLoading: true };

    case ADD_ANALYTICS_REQUEST_SUCCESS:
      action.payload.nextfunc();
      return {
        ...state,
        addAnalyticsLoading: false,
      };

    case ADD_ANALYTICS_REQUEST_FAILED:
      return { ...state, addAnalyticsLoading: false };

    case GET_ALL_ANALYTIC_WEB_REQUEST:
      return { ...state, isAllAnalyticsWebLoading: true };

    case GET_ALL_ANALYTIC_WEB_REQUEST_SUCCESS:
      return {
        ...state,
        isAllAnalyticsWebLoading: false,
        allAnalyticsWeb: action.payload.data,
      };

    case GET_ALL_ANALYTIC_WEB_REQUEST_FAILED:
      return { ...state, isAllAnalyticsWebLoading: false };

    case GET_WEB_REVENUE_REQUEST:
      return { ...state, isAllAnalyticsUserRevenue: true };

    case GET_WEB_REVENUE_REQUEST_SUCCESS:
      return {
        ...state,
        isAllAnalyticsUserRevenue: false,
        allAnalyticsUserRevenue: action.payload.data,
      };

    case GET_WEB_REVENUE_REQUEST_FAILED:
      return { ...state, isAllAnalyticsUserRevenue: false };

    case GET_COMPANY_REVENUE_REQUEST:
      return { ...state, isAllAnalyticsCompRevenue: true };

    case GET_COMPANY_REVENUE_REQUEST_SUCCESS:
      return {
        ...state,
        isAllAnalyticsCompRevenue: false,
        allAnalyticsCompRevenue: action.payload.data,
      };

    case GET_COMPANY_REVENUE_REQUEST_FAILED:
      return { ...state, isAllAnalyticsCompRevenue: false };

    default:
      return state;
  }
};
