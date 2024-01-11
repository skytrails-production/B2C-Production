import { takeEvery, call, put, takeLatest } from "redux-saga/effects";
import userApi from "../API/api";
// import {} from "../Auth/logIn/actionLogin";
import {
  fetchBook,
  fetchBookGDS,
  fetchTicketGDS,
} from "../FlightBook/actionFlightBook";

import {
  FLIGHT_BOOK_REQUEST,
  FLIGHT_BOOK_REQUEST_GDS,
  FLIGHT_TICKET_REQUEST_GDS,
} from "../FlightBook/actionType";

function* bookRequest(action) {
  try {
    const user = yield call(userApi.flightGetTicketLcc, action.payload);
    yield put(fetchBook(user));
  } catch (error) {
    yield put(fetchBook({}));
  }
}

function* bookRequestGDS(action) {
  try {
    const user = yield call(userApi.flightBookGDS, action.payload);
    yield put(fetchBookGDS(user));
  } catch (error) {
    yield put(fetchBookGDS({}));
  }
}

function* bookTicketRequestGDS(action) {
  try {
    const data = yield call(userApi.flightGetTicketNonLcc, action.payload);
    yield put(fetchTicketGDS(data));
  } catch (error) {
    yield put(fetchTicketGDS({}));
  }
}

export function* flightBookWatcher() {
  yield takeLatest(FLIGHT_BOOK_REQUEST, bookRequest);
  yield takeLatest(FLIGHT_BOOK_REQUEST_GDS, bookRequestGDS);
  yield takeLatest(FLIGHT_TICKET_REQUEST_GDS, bookTicketRequestGDS);
}
