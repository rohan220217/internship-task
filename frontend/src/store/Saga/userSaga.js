import toast from "react-hot-toast";
import { call, takeEvery, put } from "redux-saga/effects";
import {
  deleteUserApi,
  getAllUsersApi,
  updateUserApi,
} from "../../services/user.services";
import {
  deleteUserFailed,
  deleteUserSuccess,
  filterActiveUsersSuccess,
  filterInactiveUsersSuccess,
  getAllUsersFailed,
  getAllUsersSuccess,
  updateUserFailed,
  updateUserSuccess,
} from "../Actions/userAction";
import {
  DELETE_USER_REQUEST,
  FILTER_ACTIVE_USERS,
  FILTER_INACTIVE_USERS,
  GET_ALLUSERS_REQUEST,
  UPDATE_USER_REQUEST,
} from "../Constants/userTypes";

function* getAllUsers(action) {
  try {
    const data = yield call(getAllUsersApi);
    yield put(getAllUsersSuccess(data));
  } catch (error) {
    toast.error(error.message);
    yield put(getAllUsersFailed(error));
  }
}
function* updateUser(action) {
  try {
    const data = yield call(updateUserApi, {
      userId: action.payload.userId,
      data: action.payload.data,
    });
    yield put(updateUserSuccess({ data, nextfunc: action.payload.nextfunc }));
  } catch (error) {
    toast.error(error.message);
    yield put(updateUserFailed(error));
  }
}
function* deleteUser(action) {
  try {
    const data = yield call(deleteUserApi, {
      userId: action.payload.userId,
    });
    yield put(deleteUserSuccess({ userId: action.payload.userId }));
  } catch (error) {
    toast.error(error.message);
    yield put(deleteUserFailed({ userId: action.payload.userId }));
  }
}

function* getAllActiveUsers(action) {
  try {
    const data = yield call(getAllUsersApi);
    yield put(filterActiveUsersSuccess({ data }));
  } catch (error) {
    toast.error(error.message);
  }
}

function* getAllInActiveUsers(action) {
  try {
    const data = yield call(getAllUsersApi);
    yield put(filterInactiveUsersSuccess({ data }));
  } catch (error) {
    toast.error(error.message);
  }
}
function* userSaga() {
  yield takeEvery(GET_ALLUSERS_REQUEST, getAllUsers);
  yield takeEvery(UPDATE_USER_REQUEST, updateUser);
  yield takeEvery(DELETE_USER_REQUEST, deleteUser);
  yield takeEvery(FILTER_ACTIVE_USERS, getAllActiveUsers);
  yield takeEvery(FILTER_INACTIVE_USERS, getAllInActiveUsers);
}

export default userSaga;
