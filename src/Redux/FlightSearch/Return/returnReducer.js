import * as types from "./returnActionType";

const initState = {
  returnData: [],

  isLoading: false,

  isError: false,

  showSuccessMessage: false,
};

export const returnReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.RETURN_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };

    case types.RETURN_SUCCESS:
      return {
        ...state,
        returnData: payload,
        isLoading: false,
        isError: false,
        showSuccessMessage: true,
      };

    default:
      return state;
  }
};
