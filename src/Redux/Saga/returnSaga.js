import { takeEvery, takeLatest, call, put } from "redux-saga/effects";

import userApi from "../API/api";
import { fetchReturn } from "../FlightSearch/Return/return";
import { RETURN_REQUEST } from "../FlightSearch/Return/returnActionType";

function* returnRequest(action) {
    try {
        const data = yield call(userApi.returnSearch, action.payload);
        yield put(fetchReturn(data));
    } catch (error) {
        console.log(error);
    }
}
export function* returnWatcher() {
    yield takeLatest(RETURN_REQUEST, returnRequest);
}
