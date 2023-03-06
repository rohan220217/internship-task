import {
  ADD_ANALYTICS_REQUEST,
  ADD_ANALYTICS_REQUEST_FAILED,
  ADD_ANALYTICS_REQUEST_SUCCESS,
  GET_ALL_ANALYTICS_USER_REQUEST,
  GET_ALL_ANALYTICS_USER_REQUEST_FAILED,
  GET_ALL_ANALYTICS_USER_REQUEST_SUCCESS,
} from "../Constants/analyticsTypes";

const initialState = {
  allAnalyticsUser: [],
  isAllAnalyticsLoading: false,
  addAnalyticsLoading: false,
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

    default:
      return state;
  }
};
