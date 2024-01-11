
import * as types from "./actionType";

const initialState = {
  packageSearchResult: [],
  isLogin: false,
  isLoading: false,
  isError: false,
};

export const searchPackageReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.GET_SEARCH_PACKAGE_DATA:
      return {
        ...state,
        isLoading: false,
        isError: false,
      };

    case types.SET_SEARCH_PACKAGE_DATA:
      return {
        ...state,
        packageSearchResult: payload,
        isLoading: true,
        isError: false,
      };
    case types.CLEAR_PACKAGE_DATA:
      return {
        packageSearchResult: [],
        isLogin: false,
        isLoading: false,
        isError: false,
      };


    default:
      return state;
  }
};
