import * as types from "./searchFlightType";
export const searchFlightList = (data) => {
  return {
    type: types.SEARCH_FLIGHT_LIST,
    payload: data,
  };
};
export const clearFlightList = () => {
  return {
    type: types.CLEAR_FLIGHT_LIST,
  };
};
