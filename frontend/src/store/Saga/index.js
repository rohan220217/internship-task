import { all } from "redux-saga/effects";
import loginSaga from "./loginSaga";
import userSaga from "./userSaga";
import analyticsSaga from "./analyticsSaga";

export default function* rootSaga() {
  yield all([
    loginSaga(),
    analyticsSaga(),
    userSaga(),
  ]);
}
