import * as types from "./actionType";

const initialState = {
  loginData: [],
  userData: [],
  isLogin: false,
  isLoading: false,
  isError: false,
};

export const logInReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        loginData: payload,
        token: payload,
        isLogin: true,
        isLoading: false,
        isError: false,
      };
    case types.USER_DATA:
      return {
        ...state,
        userData: payload,
        isLogin: true,
        isLoading: false,
        isError: false,
      };

    case types.LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case types.LOGIN_FAILURE:
      return {
        loginData: [],
        userData: [],
        isLogin: false,
        isLoading: false,
        isError: false,
      };
    case types.LOGOUT_REQUEST:
      return {
        loginData: [],
        userData: [],
        isLogin: false,
        isLoading: false,
        isError: false,
      };

    default:
      return state;
  }
};
