import {  takeLatest, call, put } from "redux-saga/effects";
import userApi from "../API/api";
import { searchFlight } from "../FlightList/actionFlightList";
import { ONE_WAY_REQUEST } from "../FlightSearch/oneWayActionType";

function* flightListRequest(action) {
  try {
    const data = yield call(userApi.flightList, action.payload);
    yield put(fetchOneWay(data));
  } catch (error) {
    console.log(error);
  }
}

export function* oneWayWatcher() {
  yield takeLatest(ONE_WAY_REQUEST, );
}
