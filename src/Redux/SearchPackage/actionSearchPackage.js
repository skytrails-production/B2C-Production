import * as types from "./actionType";

export const searchPackageData = (data) => {
  return {
    type: types.SET_SEARCH_PACKAGE_DATA,
    payload: data,
  };
};

export const searchPackageAction = (data) => {

  return {
    type: types.GET_SEARCH_PACKAGE_DATA,
    payload: data,
  }
};


export const searchPackageDataCategory = (data) => {
  return {
    type: types.SET_SEARCH_PACKAGE_DATA_CATEGORY,
    payload: data,
  };
};

export const searchPackageActionCategory = (data) => {

  return {
    type: types.GET_SEARCH_PACKAGE_DATA_CATEGORY,
    payload: data,
  }
};

export const searchPackageDataTopCountries = (data) => {
  return {
    type: types.SET_SEARCH_PACKAGE_DATA_COUNTRY,
    payload: data,
  };
};

export const searchPackageActionTopCountries = (data) => {

  return {
    type: types.GET_SEARCH_PACKAGE_DATA_COUNTRY,
    payload: data,
  }
};
export const clearPackageData = () => {
  return {
    type: types.CLEAR_PACKAGE_DATA,
    payload: [],
  };

};