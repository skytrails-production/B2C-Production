import * as types from "./oneWayActionType";

const initState = {
  oneWayData: [],

  isLoading: false,

  isError: false,

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
      };

    case types.ONE_WAY_SUCCESS:
      return {
        ...state,
        oneWayData: payload,
        isLoading: false,
        isError: false,
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
        showSuccessMessage: true,
      };

    default:
      return state;
  }
};


