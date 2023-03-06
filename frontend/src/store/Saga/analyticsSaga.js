import toast from "react-hot-toast";
import { call, takeEvery, put } from "redux-saga/effects";
import {
  addAnalyticsApi,
  getAllAnalyticsUserApi,
} from "../../services/analytics.services";
import {
  addAnalyticsFailed,
  addAnalyticsSuccess,
  getAllAnalyticsUserFailed,
  getAllAnalyticsUserSuccess,
} from "../Actions/analyticsAction";
import {
  ADD_ANALYTICS_REQUEST,
  GET_ALL_ANALYTICS_USER_REQUEST,
} from "../Constants/analyticsTypes";

function* getAllAnalyticsUser(action) {
  try {
    const data = yield call(getAllAnalyticsUserApi, {
      userId: action.payload.userId,
    });
    yield put(getAllAnalyticsUserSuccess(data));
  } catch (error) {
    toast.error(error.message);
    yield put(getAllAnalyticsUserFailed(error));
  }
}
function* addAnalytics(action) {
  try {
    const data = yield call(addAnalyticsApi, {
      value: action.payload.value,
    });
    yield put(addAnalyticsSuccess({ data, nextfunc: action.payload.nextfunc }));
  } catch (error) {
    toast.error(error.message);
    yield put(addAnalyticsFailed(error));
  }
}

function* anayticsSaga() {
  yield takeEvery(GET_ALL_ANALYTICS_USER_REQUEST, getAllAnalyticsUser);
  yield takeEvery(ADD_ANALYTICS_REQUEST, addAnalytics);
}

export default anayticsSaga;
