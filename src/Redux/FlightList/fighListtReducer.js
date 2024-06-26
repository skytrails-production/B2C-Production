import * as types from "./searchFlightType";

const initialState = {
  flightDetails: {},
};

export const flightListReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.SEARCH_FLIGHT_LIST:
      return {
        flightDetails: payload,
      };
    case types.CLEAR_FLIGHT_LIST:
      return {
        flightDetails: {},
      };

    default:
      return state;
  }
};
