import { takeLatest, call, put } from "redux-saga/effects";
import userApi from "../API/api";

import { GET_SEARCH_PACKAGE_DATA } from "../SearchPackage/actionType";
import { searchPackageData } from "../SearchPackage/actionSearchPackage";

function* searchResult(action) {
  try {
    const data = yield call(userApi.searchPackage, action.payload);
    yield put(searchPackageData(data));
  } catch (error) {
    // console.log(error);
  }
}
export function* searchResultWatcher() {
  yield takeLatest(GET_SEARCH_PACKAGE_DATA, searchResult);
}
