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






export const successNumAfterSocialLogin = (user) => {
  return {
    type: types.VERIFY_NUM_AFTERSOCIALLOGIN_SUCCESS,
    payload: user,
  };
};



export const requestNumAfterSocialLogin = (user) => {
  // console.error("funtion", user);
  if (user) {
    return {
      type: types.VERIFY_NUM_AFTERSOCIALLOGIN_REQUEST,
      payload: user,
    };
  }
};




// UPDATE IMAGE IN MY PROFILE 


export const UpdateLoginIMAGE = (user) => {
  return {
    type: types.UPDATE_IMG_SUCCESS_MYPROFILE,
    payload: user,
  };
};



export const updateActionIMAGE = (user) => {
  // console.error("funtion", user);
  if (user) {
    return {
      type: types.UPDATE_IMG_REQUEST_MYPROFILE,
      payload: user,
    };
  }
};


// UPDATE IMAGE IN MY PROFILE 


// EDIT PROFILE SECTION 

export const editLoginIMAGE = (user) => {
  return {
    type: types.EDIT_SUCCESS_MYPROFILE,
    payload: user,
  };
};



export const editActionIMAGE = (user) => {
  // console.error("funtion", user);
  if (user) {
    return {
      type: types.EDIT_REQUEST_MYPROFILE,
      payload: user,
    };
  }
};


// EDIT PROFILE SECTION 



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
