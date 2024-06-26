import * as types from "./searchFlightType";
export const searchFlight = (data) => {
  return {
    type: types.SEARCH_FLIGHT,
    payload: data,
  };
};
export const clearSearch = () => {
  return {
    type: types.CLEAR_FLIGHT,
  };
};
