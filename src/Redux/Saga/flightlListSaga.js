import { takeLatest, call, put } from "redux-saga/effects";
import userApi from "../API/api";
import {
   searchFlightList,
   searchAirportList
  } from "../FlightList/actionFlightList";
  import {
 SEARCH_FLIGHT_LIST 
,CLEAR_FLIGHT_LIST ,SEARCH_AIRPORT_LIST ,
CLEAR_AIRPORT_LIST,SEARCH_AIRPORT_LIST_REQ,SEARCH_FLIGHT_LIST_REQ
  } from "../FlightList/searchFlightType";

  function* flightListRequest(){
    try{
        const data=yield call(userApi.flightList,)
        yield put(searchFlightList(data?.data?.data))
    }catch(e){
        console.log(e)
    }
  }
  function * airportListRequest(){
    try{
        const data=yield call(userApi.airportList,)
        yield put(searchAirportList(data?.data?.data))
    }
    catch(e){
        console.log(e)
    }
  }

  export function* flightListWatcher(){
    yield takeLatest(SEARCH_FLIGHT_LIST_REQ,flightListRequest);
    yield takeLatest(SEARCH_AIRPORT_LIST_REQ,airportListRequest)
  }
  
