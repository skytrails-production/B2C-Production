import * as types from "./actionType";

export const fetchRule = (data) => {
  return {
    type: types.RULE_SUCCESS,
    payload: data,
  };
};

export const ruleAction = (data) => {
  if (data) {
    return {
      type: types.RULE_REQUEST,
      payload: data,
    };
  }
};

export const fetchQuote = (data) => {
  return {
    type: types.QUOTE_SUCCESS,
    payload: data,
  };
};

export const quoteAction = (data) => {
  if (data) {
    return {
      type: types.QUOTE_REQUEST,
      payload: data,
    };
  }
};

export const resetFareData = () => ({

  type: types.CLEAR_FARE_DETAILS_REDUCER,
});
export const resetAllFareData = () => ({

  type: types.CLEAR_ALL_FARE_DETAILS_REDUCER,
});
