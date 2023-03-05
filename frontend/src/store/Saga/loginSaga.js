import toast from "react-hot-toast";
import { call, takeEvery, put } from "redux-saga/effects";
import {
  loginRequestApi,
  singupRequestApi,
  forgotPassRequestApi,
} from "../../services/login.services";
import {
  forgotPasswordFailed,
  forgotPasswordSuccess,
  loginFailed,
  loginSuccess,
  signupFailed,
  signupSuccess,
} from "../Actions/loginAction";
import {
  FORGOTPASSWORD_REQUEST,
  LOGIN_REQUEST,
  SIGNUP_REQUEST,
} from "../Constants/loginTypes";

function* loginRequest(action) {
  try {
    const data = yield call(loginRequestApi, action.payload.value);
    yield put(loginSuccess({ data, navigateFn: action.payload.navigateFn }));
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

function* forgotPassRequest(action) {
  try {
    const data = yield call(forgotPassRequestApi, action.payload.value);
    yield put(
      forgotPasswordSuccess({ data, nextfunc: action.payload.navigateFn })
    );
  } catch (error) {
    toast.error(error.message);
    yield put(forgotPasswordFailed(error));
  }
}

function* loginSaga() {
  yield takeEvery(LOGIN_REQUEST, loginRequest);
  yield takeEvery(SIGNUP_REQUEST, signupRequest);
  yield takeEvery(FORGOTPASSWORD_REQUEST, forgotPassRequest);
}

export default loginSaga;
