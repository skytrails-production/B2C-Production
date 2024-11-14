import { call, put, takeLatest } from "redux-saga/effects";
import { EDIT_REQUEST_MYPROFILE, LOGIN_REQUEST, LOGIN_REQUEST_SOCIAL, UPDATE_IMG_REQUEST_MYPROFILE } from "../Auth/logIn/actionType";
// import { LOGIN_REQUEST, LOGIN_SUCCESS, USER_DATA } from "../Auth/logIn/actionType";
import userApi from "../API/api";
import {
  editLoginIMAGE,
  fetchLogIn,
  UpdateLoginIMAGE,

} from "../Auth/logIn/actionLogin";

function* userLoginRequest(action) {
  try {
    const user = yield call(userApi.userB2CLogin, action.payload);
    yield put(fetchLogIn(user));
  } catch (error) {
    console.log("Login Error saga", error?.response?.data)
    var userNotFound;
    // var inValidOTP = true;
    if (error?.response?.data?.message === 'User Not found.') {
      userNotFound = true
      yield put(fetchLogIn({ userNotFound }));
    }
    else if (error?.response?.data?.message === 'Incorrect OTP') {
      yield put(fetchLogIn(error?.response?.data));
    }

  }
}
function* userLoginRequestWithSocialLogin(action) {
  try {
    const user = yield call(userApi.userB2CLoginWithSocial, action.payload);
    yield put(fetchLogIn(user));
  } catch (error) {
    console.log("Login Error saga", error?.response?.data)
  }
}
function* updateProfilePictureMyProfile(action) {
  try {
    const user = yield call(userApi.profilePicUpdate, action.payload);
    yield put(UpdateLoginIMAGE(user));
  } catch (error) {
    console.log("Login Error saga", error?.response?.data)
  }
}
function* editProfilePictureMyProfile(action) {
  try {
    const user = yield call(userApi.profileDataUpdate, action.payload);
    yield put(editLoginIMAGE(user));
  } catch (error) {
    console.log("Login Error saga", error?.response?.data)
  }
}


// function* userDataRequest() {
//   try {
//     const user = yield call(userApi.loginUserData);
//     console.log('User Data Response:', user); // Log the response
//     yield put(userData(user));
//   } catch (error) {
//     console.error('Error in userDataRequest:', error);
//     yield put(userData({}));
//   }
// }

export function* loginWatcher() {
  yield takeLatest(LOGIN_REQUEST, userLoginRequest);
  yield takeLatest(LOGIN_REQUEST_SOCIAL, userLoginRequestWithSocialLogin);
  yield takeLatest(UPDATE_IMG_REQUEST_MYPROFILE, updateProfilePictureMyProfile);
  yield takeLatest(EDIT_REQUEST_MYPROFILE, editProfilePictureMyProfile);
  // yield takeEvery(USER_DATA, userDataRequest);
}
