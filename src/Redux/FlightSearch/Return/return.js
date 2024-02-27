import * as types from "./returnActionType";

export const fetchReturn = (data) => {
  return {
    type: types.RETURN_SUCCESS,
    payload: data,
  };
};

export const returnAction = (data) => {
  if (data) {
    return {
      type: types.RETURN_REQUEST,
      payload: data,
    };
  }
};
// export const oneWayEMTAction = (data) => {
//   if (data) {
//     return {
//       type: types.ONE_WAY_REQUEST,
//       payload: data,
//     };
//   }
// };

export const clearReturnReducer = () => {
  return {
    type: types.CLEAR_RETURN_REDUCER,
  };
};
