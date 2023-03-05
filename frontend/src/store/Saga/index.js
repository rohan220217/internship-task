import { all } from "redux-saga/effects";
import loginSaga from "./loginSaga";
import userSaga from "./userSaga";

export default function* rootSaga() {
  yield all([
    loginSaga(),
    userSaga(),
  ]);
}
