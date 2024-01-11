import * as types from "./actionType";

const initialState = {
  flightBookData: {},
  flightBookDataGDS: {},
  flightTicketDataGDS: {},
  isLogin: false,
  isLoading: false,
  isError: false,
};

export const flightBookReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.FLIGHT_BOOK_SUCCESS:
      return {
        ...state,
        flightBookData: payload?.data?.data?.Response,
        isLoading: false,
        isError: false,
      };

    case types.FLIGHT_BOOK_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };

    case types.FLIGHT_BOOK_SUCCESS_GDS:
      return {
        ...state,
        flightBookDataGDS: payload?.data?.data?.Response,
        isLoading: false,
        isError: false,
      };

    case types.FLIGHT_BOOK_REQUEST_GDS:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };

    case types.FLIGHT_TICKET_SUCCESS_GDS:
      return {
        ...state,
        flightTicketDataGDS: payload,
        isLoading: false,
        isError: false,
      };

    case types.FLIGHT_TICKET_REQUEST_GDS:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case types.FLIGHT_BOOK_CLEAR_ALL_REDUCER:
      return {
        flightBookData: {},
        flightBookDataGDS: {},
        flightTicketDataGDS: {},
        isLogin: false,
        isLoading: false,
        isError: false,
      }

    default:
      return state;
  }
};
