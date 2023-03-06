import {
  GET_ALLUSERS_REQUEST,
  GET_ALLUSERS_REQUEST_FAILED,
  GET_ALLUSERS_REQUEST_SUCCESS,
  UPDATE_USER_REQUEST,
  UPDATE_USER_REQUEST_SUCCESS,
  UPDATE_USER_REQUEST_FAILED,
  DELETE_USER_REQUEST,
  DELETE_USER_REQUEST_SUCCESS,
  DELETE_USER_REQUEST_FAILED,
  FILTER_ACTIVE_USERS,
  FILTER_INACTIVE_USERS,
  FILTER_ACTIVE_USERS_SUCCESS,
  FILTER_INACTIVE_USERS_SUCCESS
} from "../Constants/userTypes";

const initialState = {
  allUsers: [],
  isAllUsersLoading: false,
  isUpdateUserLoading: false,
  isDeleteUserLoading: [],
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

    case UPDATE_USER_REQUEST:
      return { ...state, isUpdateUserLoading: true };

    case UPDATE_USER_REQUEST_SUCCESS: {
      let tempAllUsers = [...state.allUsers];
      const updatedUserIndex = tempAllUsers.findIndex(
        (user) => user._id === action.payload.data._id
      );
      tempAllUsers[updatedUserIndex] = {
        ...tempAllUsers[updatedUserIndex],
        ...action.payload.data,
      };
      action.payload.nextfunc();
      return {
        ...state,
        isUpdateUserLoading: false,
        allUsers: tempAllUsers,
      };
    }
    case UPDATE_USER_REQUEST_FAILED:
      return { ...state, isUpdateUserLoading: false };

    case DELETE_USER_REQUEST: {
      const tempisDeleteUserLoading = [...state.isDeleteUserLoading];
      tempisDeleteUserLoading.push(action.payload.userId);

      return { ...state, isDeleteUserLoading: tempisDeleteUserLoading };
    }

    case DELETE_USER_REQUEST_SUCCESS: {
      const updatedUsers = [...state.allUsers].filter(
        (user) => user._id != action.payload.userId
      );

      const tempisDeleteUserLoading = [...state.isDeleteUserLoading].filter(
        (user) => user._id != action.payload.userId
      );
      return {
        ...state,
        isDeleteUserLoading: tempisDeleteUserLoading,
        allUsers: updatedUsers,
      };
    }

    case DELETE_USER_REQUEST_FAILED: {
      const tempisDeleteUserLoading = [...state.isDeleteUserLoading].filter(
        (user) => user._id != action.payload.userId
      );
      return { ...state, isDeleteUserLoading: tempisDeleteUserLoading };
    }

    case FILTER_ACTIVE_USERS_SUCCESS: {
      const tempAllUsers = action.payload.data.filter(
        (user) => user.userStatus === "Active"
      );
      return { ...state, allUsers: tempAllUsers };
    }
    case FILTER_INACTIVE_USERS_SUCCESS: {
      const tempAllUsers = action.payload.data.filter(
        (user) => user.userStatus === "InActive"
      );
      return { ...state, allUsers: tempAllUsers };
    }
    default:
      return state;
  }
};
