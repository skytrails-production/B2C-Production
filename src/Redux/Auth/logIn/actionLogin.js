import * as types from "./actionType";

export const fetchLogIn = (user) => {
  return {
    type: types.LOGIN_SUCCESS,
    payload: user,
  };
};

export const userData = (response) => {
  return {
    type: types.USER_DATA,
    payload: response,
  };
};

export const loginAction = (user) => {
  console.error("funtion", user);
  if (user) {
    return {
      type: types.LOGIN_REQUEST,
      payload: user,
    };
  }
};

export const logoutAction = () => {
  return {
    type: types.LOGOUT_REQUEST,
  };
};
