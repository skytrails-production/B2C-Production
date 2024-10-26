import React, { useState, useEffect, Fragment } from "react";

import FlightLocationFrom from "../FlightLocationFrom";
import FlightLocationTo from "../FlightLocationTo";
import ReturnDateBox from "./ReturnDateBox";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

import { ipAction, tokenAction } from "../../../../../Redux/IP/actionIp";
import {
  returnAction,
  returnActionClear,
} from "../../../../../Redux/FlightSearch/Return/return";
import { swalModal } from "../../../../../utility/swal";
import { clearbookTicketGDS } from "../../../../../Redux/FlightBook/actionFlightBook";
import { resetAllFareData } from "../../../../../Redux/FlightFareQuoteRule/actionFlightQuote";

const ReturnSearchForm = ({ adult, child, infant, flightClass }) => {
  const [fromCity, setFromCity] = useState(null);
  const [toCity, setToCity] = useState(null);
  const [departDate, setDepartDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const dispatch = useDispatch();
  const reducerState = useSelector((state) => state);
  const [newDepartDateCld, setNewDepartDateCld] = useState("");
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();

  const handleFromSelect = (location) => {
    setFromCity(location);
  };
  const handleToSelect = (location) => {
    setToCity(location);
  };

  useEffect(() => {
    dispatch(returnActionClear());
    dispatch(returnActionClear());
    dispatch(ipAction());
    dispatch(clearbookTicketGDS());
    dispatch(resetAllFareData());
  }, []);

  useEffect(() => {
    const payload = {
      EndUserIp: reducerState?.ip?.ipData,
    };
    dispatch(tokenAction(payload));
  }, [reducerState?.ip?.ipData]);

  useEffect(() => {
    if (reducerState?.return?.isLoading === true) {
      setLoader(true);
    }
  }, [reducerState?.return?.isLoading]);

  const returnResults =
    reducerState?.return?.returnData?.data?.data?.Response?.Results;

  useEffect(() => {
    if (returnResults) {
      if (returnResults[1] !== undefined) {
        navigate(`/ReturnResult`);
      } else {
        navigate("/ReturnResultInternational");
      }
    }

    if (returnResults) {
      setLoader(false);
    }
  }, [reducerState?.return?.returnData?.data?.data?.Response?.Results]);

  useEffect(() => {
    if (
      reducerState?.return?.returnData?.data?.data?.Response?.Error
        ?.ErrorCode !== 0 &&
      reducerState?.return?.returnData?.data?.data?.Response?.Error
        ?.ErrorCode !== undefined
    ) {
      // navigate("/return")
      dispatch(returnActionClear());
      swalModal(
        "flight",
        reducerState?.return?.returnData?.data?.data?.Response?.Error
          ?.ErrorMessage,
        false
      );
      setLoader(false);
    }
  }, [
    reducerState?.return?.returnData?.data?.data?.Response?.Error?.ErrorCode,
  ]);

  const handleDateChange = (dates) => {
    setDepartDate(dayjs(dates.startDate).format("DD MMM, YY"));
    setReturnDate(dayjs(dates.endDate).format("DD MMM, YY"));
  };

  const totalCount = adult + child + infant;

  const handleSubmit = async () => {
    sessionStorage.setItem("SessionExpireTime", new Date());

    const payload = {
      EndUserIp: reducerState?.ip?.ipData,
      TokenId: reducerState?.ip?.tokenData,
      AdultCount: adult,
      ChildCount: child,
      InfantCount: infant,
      DirectFlight: "false",
      OneStopFlight: "false",
      JourneyType: "2",
      PreferredAirlines: null,
      Segments: [
        {
          Origin: fromCity.AirportCode,
          Destination: toCity.AirportCode,
          FlightCabinClass: flightClass?.id,
          PreferredDepartureTime: departDate,
          PreferredArrivalTime: departDate,
        },
        {
          Origin: toCity.AirportCode,
          Destination: fromCity.AirportCode,
          FlightCabinClass: flightClass?.id,
          PreferredDepartureTime: returnDate,
          PreferredArrivalTime: returnDate,
        },
      ],
      Sources: null,
    };

    sessionStorage.setItem("adults", adult);
    sessionStorage.setItem("childs", child);
    sessionStorage.setItem("infants", infant);

    dispatch(returnAction(payload));
  };

  const renderForm = () => {
    return (
      <form className="w-full relative rounded-[10px]   bg-white ">
        <div className="flex flex-1 rounded-full">
          <FlightLocationFrom
            placeHolder="Flying from"
            desc="Where do you want to fly from?"
            className="flex-1"
            onLocationSelect={handleFromSelect}
          />
          <div className="self-center border-r border-slate-200  h-8"></div>
          <FlightLocationTo
            placeHolder="Flying to"
            desc="Where you want to fly to?"
            className="flex-1"
            divHideVerticalLineClass=" -inset-x-0.5"
            onLocationSelect={handleToSelect}
          />
          <div className="self-center border-r border-slate-200  h-8"></div>
          <ReturnDateBox
            // selectsRange={dropOffLocationType !== "oneWay"}
            className="flex-1"
            onSubmit={handleSubmit}
            onDateChange={handleDateChange}
          />
        </div>
      </form>
    );
  };

  return renderForm();
};

export default ReturnSearchForm;
