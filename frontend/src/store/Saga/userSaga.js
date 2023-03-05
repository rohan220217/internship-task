import toast from "react-hot-toast";
import { call, takeEvery, put } from "redux-saga/effects";
import { getAllUsersApi } from "../../services/user.services";
import { getAllUsersFailed, getAllUsersSuccess } from "../Actions/userAction";
import { GET_ALLUSERS_REQUEST } from "../Constants/userTypes";

function* getAllUsers(action) {
  try {
    const data = yield call(getAllUsersApi);
    yield put(getAllUsersSuccess(data));
  } catch (error) {
    toast.error(error.message);
    yield put(getAllUsersFailed(error));
  }
}

function* userSaga() {
  yield takeEvery(GET_ALLUSERS_REQUEST, getAllUsers);
}

export default userSaga;
