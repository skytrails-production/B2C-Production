import { all } from "redux-saga/effects";

import { oneWayWatcher,oneWayWatcherCombined } from "./Saga/oneWaySaga";
import { returnWatcher } from "./Saga/returnSaga";
import { multicityWatcher } from "./Saga/multicitySaga";
import { ipWatcher } from "./Saga/ipSaga";
import { flightFareWatcher } from "./Saga/flightFareSaga";
import { flightBookWatcher } from "./Saga/flightBookSaga";
import { loginWatcher } from "./Saga/logInSaga";
import { hotelSearchWatcher } from "./Saga/hotelSaga";
import { busSearchWatcher } from "./Saga/busSearch";
import { searchResultWatcher } from "./Saga/searchPackageSaga";
import { searchOneResultWatcher } from "./Saga/searchOnePackageSaga";
import {
  getHolidayBookingWatcher,
  packageBookIDSaga,
} from "./Saga/BookPackage";
// import { busSeatWatcher } from "./Saga/BusSeatSaga";
import { watchSubmitFormData } from "./Saga/PacakgeBookingSaga";

import { watchMarkup } from "./Saga/markUpSaga";

import { passengersWatcher } from "./Saga/passengersDetailSaga";
import { hotelSearchWatcherGRN } from "./Saga/hotelSagaGRN";
import { flightListWatcher } from "./Saga/flightlListSaga";
import { tnplWatcher } from "./Saga/tnplSaga";
import { IteneraryWatcher } from "./Saga/itenarySaga";
import { getInventoryWatcher } from "./Saga/InventoryAuth";

export function* rootSaga() {
  yield all([
    loginWatcher(),
    oneWayWatcher(),
    oneWayWatcherCombined(),
    returnWatcher(),
    multicityWatcher(),
    ipWatcher(),
    flightFareWatcher(),
    flightBookWatcher(),
    hotelSearchWatcher(),
    hotelSearchWatcherGRN(),
    busSearchWatcher(),
    // busSeatWatcher(),
    searchResultWatcher(),
    searchOneResultWatcher(),
    getHolidayBookingWatcher(),
    watchSubmitFormData(),

    watchMarkup(),
    passengersWatcher(),
    searchResultWatcher(),
    searchOneResultWatcher(),
    tnplWatcher(),
    IteneraryWatcher(),
    flightListWatcher(),
    getInventoryWatcher(),
  ]);
}
