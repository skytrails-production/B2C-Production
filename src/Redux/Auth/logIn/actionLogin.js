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
  // console.error("funtion", user);
  if (user) {
    return {
      type: types.LOGIN_REQUEST,
      payload: user,
    };
  }
};



// login with social (google facebook)

export const fetchLogInSocial = (user) => {
  return {
    type: types.LOGIN_SUCCESS_SOCIAL,
    payload: user,
  };
};

export const userDataSocial = (response) => {
  return {
    type: types.USER_DATA,
    payload: response,
  };
};

export const loginActionSocial = (user) => {
  console.error("user details", user);
  if (user) {
    return {
      type: types.LOGIN_REQUEST_SOCIAL,
      payload: user,
    };
  }
};


export const logoutAction = () => {
  return {
    type: types.LOGOUT_REQUEST,
  };
};
export const LoginFail = () => {
  return {
    type: types.LOGIN_FAILURE,
  };
};
