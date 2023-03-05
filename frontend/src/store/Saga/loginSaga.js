import toast from "react-hot-toast";
import { call, takeEvery, put } from "redux-saga/effects";
import {
  loginRequestApi,
  singupRequestApi,
} from "../../services/login.services";
import {
  loginFailed,
  loginSuccess,
  signupFailed,
  signupSuccess,
} from "../Actions/loginAction";
import { LOGIN_REQUEST, SIGNUP_REQUEST } from "../Constants/loginTypes";

function* loginRequest(action) {
  try {
    const data = yield call(loginRequestApi, action.payload);
    yield put(loginSuccess(data));
  } catch (error) {
    toast.error(error.message);
    yield put(loginFailed(error));
  }
}

function* signupRequest(action) {
  try {
    const data = yield call(singupRequestApi, action.payload.value);
    yield put(signupSuccess({ data, nextfunc: action.payload.nextfunc }));
  } catch (error) {
    toast.error(error.message);
    yield put(signupFailed(error));
  }
}

function* loginSaga() {
  yield takeEvery(LOGIN_REQUEST, loginRequest);
  yield takeEvery(SIGNUP_REQUEST, signupRequest);
}

export default loginSaga;
