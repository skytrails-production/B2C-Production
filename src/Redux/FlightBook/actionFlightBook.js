import * as types from "./actionType";

export const fetchBook = (data) => {
  return {
    type: types.FLIGHT_BOOK_SUCCESS,
    payload: data,
  };
};

export const bookAction = (data) => {
  if (data) {
    return {
      type: types.FLIGHT_BOOK_REQUEST,
      payload: data,
    };
  }
};

export const fetchBookGDS = (data) => {
  return {
    type: types.FLIGHT_BOOK_SUCCESS_GDS,
    payload: data,
  };
};

export const bookActionGDS = (data) => {
  if (data) {
    return {
      type: types.FLIGHT_BOOK_REQUEST_GDS,
      payload: data,
    };
  }
};

export const fetchTicketGDS = (data) => {
  return {
    type: types.FLIGHT_TICKET_SUCCESS_GDS,
    payload: data,
  };
};

export const bookTicketGDS = (data) => {
  if (data) {
    return {
      type: types.FLIGHT_TICKET_REQUEST_GDS,
      payload: data,
    };
  }
}
export const clearbookTicketGDS = () => {

  return {
    type: types.FLIGHT_BOOK_CLEAR_ALL_REDUCER,
    payload: [],

  }
};
