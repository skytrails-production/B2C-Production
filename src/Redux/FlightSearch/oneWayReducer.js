import * as types from "./oneWayActionType";

const initState = {
  oneWayData: [],

  isLoading: false,
  isLoadingFilter: false,

  isError: false,
  isErrorCombine: false,

  showSuccessMessage: false,
};

export const oneWayReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.ONE_WAY_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
        oneWayData: []
      };
    case types.ONE_WAY_REQUEST_COMBINED:
      return {
        ...state,
        isLoadingFilter: true,
        isErrorCombine: false,
        oneWayData: []
      };
    case types.ONE_WAY_FAIL:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case types.ONE_WAY_FAIL_COMBINED:
      return {
        ...state,
        isLoadingFilter: false,
        isErrorCombine: true,
      };

    case types.ONE_WAY_SUCCESS:
      return {
        ...state,
        oneWayData: payload,
        isLoading: false,
        isError: false,
        showSuccessMessage: true,
      };
    case types.ONE_WAY_SUCCESS_COMBINED:
      return {
        ...state,
        oneWayData: payload,
        isLoadingFilter: false,
        isErrorCombine: false,
        showSuccessMessage: true,
      };

    case types.CLEAR_ONEWAY_REDUCER:
      // console.log('=======================================');
      // console.log('Resetting OneWay search state');
      return {
        ...state,
        oneWayData: [],
        isLoading: false,
        isError: false,
        isLoadingFilter: false,
        isErrorCombine: false,
        showSuccessMessage: true,
      };

    default:
      return state;
  }
};


