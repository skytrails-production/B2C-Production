import { combineReducers } from "redux";
import { oneWayReducer } from "./FlightSearch/oneWayReducer";
import { ipReducer } from "./IP/ipReducer";
import { flightFareReducer } from "./FlightFareQuoteRule/flightFareReducer";
import { flightBookReducer } from "./FlightBook/flightBookReducer";
import { logInReducer } from "./Auth/logIn/logInReducer";
import { clearHotelReducer } from "./Hotel/hotel";
import { hotelReducer } from "./Hotel/hotelReducer";
import { hotelReducerGRN } from "./HotelGRN/hotelReducer";
import { searchPackageReducer } from "./SearchPackage/searchPackageReducer";
import { searchOnePackageReducer } from "./OnePackageSearchResult/searchOnePackageReducer";
import { LOGOUT_REQUEST } from "./Auth/logIn/actionType";
import { packageBookingReducer } from "./HolidayBook/bookingHolidayReducer"
import storage from "redux-persist/lib/storage/session";
import { passengersReducer } from "./Passengers/passengerReducer";
// import {packageBookingReducer} from "./HolidayBook/bookingHolidayReducer"
import { returnReducer } from "./FlightSearch/Return/returnReducer";
import { multicityReducer } from "./FlightSearch/Multicity/multicityReducer";
import { busSearchReducer } from "./busSearch/busSearchReducer";
import { packageBookIDReducer } from "./HolidayBookingRequest/bookingHolidayReducer";
import { packageBookingIDReducer } from "./BookingPackageData/bookingHolidayReducer";
import { markUpDataReducer } from "./markup/markupReducer";

const appReducer = combineReducers({
  logIn: logInReducer,
  oneWay: oneWayReducer,
  return: returnReducer,
  multicity: multicityReducer,
  ip: ipReducer,
  flightFare: flightFareReducer,
  flightBook: flightBookReducer,
  hotelSearchResult: hotelReducer,
  hotelSearchResultGRN: hotelReducerGRN,
  getBusResult: busSearchReducer,
  searchResult: searchPackageReducer,
  searchOneResult: searchOnePackageReducer,
  packageBook: packageBookingReducer,
  packageBookingID: packageBookingIDReducer,
  markup: markUpDataReducer,
  passengers: passengersReducer,

});

const rootReducer = (state, action) => {
  if (action.type === LOGOUT_REQUEST) {
    storage.removeItem("persist:root");
    sessionStorage.clear();
    localStorage.clear();
    return appReducer(undefined, action);
  } else
    if (action.type === "CLEAR_ONEWAY_REDUCER") {
      return {
        ...state,
        oneWay: oneWayReducer(undefined, action),
      };
    }
    else if (action.type === "CLEAR_BUS_SEARCH_REDUCER") {
      return {
        ...state,
        getBusResult: busSearchReducer(undefined, action),
      };
    }
  // else if (action.type === "CLEAR_HOTEL_REDUCER") {
  //   return {
  //     ...state,
  //     hotelSearchResult: hotelReducer(undefined, action),
  //   };
  // } else if (action.type === "CLEAR_FARE_DETAILS_REDUCER") {
  //   return {
  //     ...state,
  //     flightFare: flightFareReducer(undefined, action),
  //   };
  // }
  return appReducer(state, action);
};
export default rootReducer;


// import { combineReducers } from "redux";
// import { oneWayReducer } from "./FlightSearch/oneWayReducer";
// import { ipReducer } from "./IP/ipReducer";
// import { flightFareReducer } from "./FlightFareQuoteRule/flightFareReducer";

// const appReducer = combineReducers({
//     oneWay: oneWayReducer,
//     ip: ipReducer,
//     flightFare: flightFareReducer,
// });

// const rootReducer = (state, action) => {
// //   if (action.type === LOGOUT_REQUEST || action.type == ADMIN_SIGN_OUT_REQUEST) {
// //     storage.removeItem("persist:root");
// //     return appReducer(undefined, action);
// //   }
// if (action.type === "CLEAR_ONEWAY_REDUCER") {
//     return {
//       ...state,
//       oneWay: oneWayReducer(undefined, action),
//     };
//   }
//   return appReducer(state, action);
// };
// export default rootReducer;
