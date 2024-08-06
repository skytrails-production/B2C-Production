import { takeLatest, call, put } from "redux-saga/effects";
import userApi from "../API/api";

import { GET_SEARCH_PACKAGE_DATA, GET_SEARCH_PACKAGE_DATA_CATEGORY, GET_SEARCH_PACKAGE_DATA_COUNTRY } from "../SearchPackage/actionType";
import { searchPackageData, searchPackageDataCategory, searchPackageDataTopCountries } from "../SearchPackage/actionSearchPackage";

function* searchResult(action) {
  try {
    const data = yield call(userApi.searchPackage, action.payload);
    yield put(searchPackageData(data));
  } catch (error) {
    // console.log(error);
  }
}
function* searchResultCategory(action) {
  try {
    const data = yield call(userApi.searchPackageCategory, action.payload);
    yield put(searchPackageDataCategory(data));
  } catch (error) {
    // console.log(error);
  }
}
function* searchResultTopCountries(action) {
  try {
    const data = yield call(userApi.searchPackageCountry, action.payload);
    yield put(searchPackageDataTopCountries(data));
  } catch (error) {
    // console.log(error);
  }
}
export function* searchResultWatcher() {
  yield takeLatest(GET_SEARCH_PACKAGE_DATA, searchResult);
  yield takeLatest(GET_SEARCH_PACKAGE_DATA_CATEGORY, searchResultCategory);
  yield takeLatest(GET_SEARCH_PACKAGE_DATA_COUNTRY, searchResultTopCountries);
}
