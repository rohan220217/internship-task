import {
  LOGIN_REQUEST,
  LOGIN_REQUEST_SUCCESS,
  LOGIN_REQUEST_FAILED,
  SIGNUP_REQUEST,
  SIGNUP_REQUEST_SUCCESS,
  SIGNUP_REQUEST_FAILED,
  FORGOTPASSWORD_REQUEST,
  FORGOTPASSWORD_REQUEST_SUCCESS,
  FORGOTPASSWORD_REQUEST_FAILED,
  USER_LOGOUT,
} from "../Constants/loginTypes";

var localStorageToken = localStorage.getItem("ag-token");
var localStorageisAdmin = localStorage.getItem("ag-user-type");

const initialState = {
  isAdmin: localStorageisAdmin ? localStorageisAdmin : false,
  token: localStorageToken ? localStorageToken : "",
  currentNewUserId: null,
  isLoginLoading: false,
  isSignupLoading: false,
  isForgotPassLoading: false,
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, isLoginLoading: true };

    case LOGIN_REQUEST_SUCCESS:
      localStorage.setItem("ag-token", action.payload.data.token);
      localStorage.setItem("ag-user-type", action.payload.data.isAdmin);
      if (action.payload.data.isAdmin) action.payload.navigateFn("/admin");
      else action.payload.navigateFn(`/user/${action.payload.data.userId}`);
      return {
        ...state,
        token: action.payload.data.token,
        isLoginLoading: false,
        isAdmin: action.payload.data.isAdmin,
      };

    case LOGIN_REQUEST_FAILED:
      return { ...state, isLoginLoading: false };

    case SIGNUP_REQUEST:
      return { ...state, isSignupLoading: true };

    case SIGNUP_REQUEST_SUCCESS:
      action.payload.nextfunc("/login");
      return {
        ...state,
        isSignupLoading: false,
        currentNewUserId: action.payload.data.userId,
      };

    case SIGNUP_REQUEST_FAILED:
      return { ...state, isSignupLoading: false };

    case FORGOTPASSWORD_REQUEST:
      return { ...state, isForgotPassLoading: true };

    case FORGOTPASSWORD_REQUEST_SUCCESS:
      action.payload.nextfunc("/login");
      return {
        ...state,
        isForgotPassLoading: false,
      };

    case FORGOTPASSWORD_REQUEST_FAILED:
      return { ...state, isForgotPassLoading: false };

    case USER_LOGOUT:
      localStorage.clear();
      return { ...state, token: "", isAdmin: false };

    default:
      return state;
  }
};
