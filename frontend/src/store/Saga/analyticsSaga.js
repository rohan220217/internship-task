import toast from "react-hot-toast";
import { call, takeEvery, put } from "redux-saga/effects";
import {
  addAnalyticsApi,
  getAllAnalyticsUserApi,
  getAllAnalyticsWebApi,
  getWebRevenueApi,
  getCompanyRevenueApi
} from "../../services/analytics.services";
import {
  addAnalyticsFailed,
  addAnalyticsSuccess,
  getAllAnalyticsUserFailed,
  getAllAnalyticsUserSuccess,
  getAllAnalyticsWebSuccess,
  getCompanyRevenueFailed,
  getCompanyRevenueSuccess,
  getWebRevenueFailed,
  getWebRevenueSuccess,
} from "../Actions/analyticsAction";
import {
  ADD_ANALYTICS_REQUEST,
  GET_ALL_ANALYTICS_USER_REQUEST,
  GET_ALL_ANALYTIC_WEB_REQUEST,
  GET_COMPANY_REVENUE_REQUEST,
  GET_WEB_REVENUE_REQUEST,
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
function* getAllAnalyticsWeb(action) {
  try {
    const data = yield call(getAllAnalyticsWebApi);
    yield put(getAllAnalyticsWebSuccess({ data }));
  } catch (error) {
    toast.error(error.message);
    yield put(getAllAnalyticsUserFailed(error));
  }
}
function* getWebRevenue(action) {
  try {
    const data = yield call(getWebRevenueApi);
    yield put(getWebRevenueSuccess({ data }));
  } catch (error) {
    toast.error(error.message);
    yield put(getWebRevenueFailed(error));
  }
}
function* getCompanyRevenue(action) {
  try {
    const data = yield call(getCompanyRevenueApi);
    yield put(getCompanyRevenueSuccess({ data }));
  } catch (error) {
    toast.error(error.message);
    yield put(getCompanyRevenueFailed(error));
  }
}

function* anayticsSaga() {
  yield takeEvery(GET_ALL_ANALYTICS_USER_REQUEST, getAllAnalyticsUser);
  yield takeEvery(ADD_ANALYTICS_REQUEST, addAnalytics);
  yield takeEvery(GET_ALL_ANALYTIC_WEB_REQUEST, getAllAnalyticsWeb);
  yield takeEvery(GET_WEB_REVENUE_REQUEST, getWebRevenue);
  yield takeEvery(GET_COMPANY_REVENUE_REQUEST, getCompanyRevenue);
}

export default anayticsSaga;
