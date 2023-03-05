import {
  LOGIN_REQUEST,
  LOGIN_REQUEST_SUCCESS,
  LOGIN_REQUEST_FAILED,
  SIGNUP_REQUEST,
  SIGNUP_REQUEST_SUCCESS,
  SIGNUP_REQUEST_FAILED,
  USER_LOGOUT,
} from "../Constants/loginTypes";

var localStorageToken = localStorage.getItem("ag-token");
var localStorageisAdmin = localStorage.getItem("ag-user-type");

const initialState = {
  isAdmin: localStorageisAdmin ? localStorageisAdmin : false,
  token: localStorageToken ? localStorageToken : "",
  isLoginLoading: false,
  isSignupLoading: false,
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, isLoginLoading: true };

    case LOGIN_REQUEST_SUCCESS:
      localStorage.setItem("ag-token", action.payload.token);
      localStorage.setItem("ag-user-type", action.payload.isAdmin);
      return {
        ...state,
        token: action.payload.token,
        isLoginLoading: false,
        isAdmin: action.payload.isAdmin,
      };

    case LOGIN_REQUEST_FAILED:
      return { ...state, isLoginLoading: false };

    case SIGNUP_REQUEST:
      return { ...state, isSignupLoading: true };

    case SIGNUP_REQUEST_SUCCESS:
      action.payload.nextfunc('/login');
      return {
        ...state,
        isSignupLoading: false,
      };

    case SIGNUP_REQUEST_FAILED:
      return { ...state, isSignupLoading: false };

    case USER_LOGOUT:
      localStorage.clear();
      return { ...state, token: "", isAdmin: false };

    default:
      return state;
  }
};
