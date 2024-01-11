import * as types from "./actionType";

export const searchPackageData = (data) => {
  return {
    type: types.SET_SEARCH_PACKAGE_DATA,
    payload: data,
  };
};

export const searchPackageAction = (data) => {
  // console.log("searchPac  kageAction", data);
  return {
    type: types.GET_SEARCH_PACKAGE_DATA,
    payload: data,
  }
};
export const clearPackageData = () => {
  // console.log("searchPac  kageAction", data);
  return {
    type: types.CLEAR_PACKAGE_DATA,
    payload: [],
  };

};