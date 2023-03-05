import {
  GET_ALLUSERS_REQUEST,
  GET_ALLUSERS_REQUEST_FAILED,
  GET_ALLUSERS_REQUEST_SUCCESS,
} from "../Constants/userTypes";

const initialState = {
  allUsers: [],
  isAllUsersLoading: false,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALLUSERS_REQUEST:
      return { ...state, isAllUsersLoading: true };

    case GET_ALLUSERS_REQUEST_SUCCESS:
      return {
        ...state,
        isAllUsersLoading: false,
        allUsers: action.payload,
      };

    case GET_ALLUSERS_REQUEST_FAILED:
      return { ...state, isAllUsersLoading: false };

    default:
      return state;
  }
};
