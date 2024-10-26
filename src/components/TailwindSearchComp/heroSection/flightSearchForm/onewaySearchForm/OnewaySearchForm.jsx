import React, { useState, Fragment, useEffect } from "react";
import FlightDateBox from "./FlightDateBox";
import FlightLocationFrom from "../FlightLocationFrom";
import FlightLocationTo from "../FlightLocationTo";
import { useNavigate } from "react-router-dom";
import { clearbookTicketGDS } from "../../../../../Redux/FlightBook/actionFlightBook";
import {
  oneWayAction,
  resetOneWay,
  oneWayActionCombined,
} from "../../../../../Redux/FlightSearch/oneWay";
import {
  searchaAirportListReq,
  searchFlightListReq,
} from "../../../../../Redux/FlightList/actionFlightList";
import {
  searchFlight,
  clearSearch,
} from "../../../../../Redux/SearchFlight/actionSearchFlight";
import { resetAllFareData } from "../../../../../Redux/FlightFareQuoteRule/actionFlightQuote";
import { returnActionClear } from "../../../../../Redux/FlightSearch/Return/return";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";

const OnewaySearchForm = ({ adult, child, infant, flightClass }) => {
  const [fromCity, setFromCity] = useState(null);
  const [toCity, setToCity] = useState(null);
  const [departDate, setDepartDate] = useState(null);
  const dispatch = useDispatch();
  const reducerState = useSelector((state) => state);
  const [newDepartDateCld, setNewDepartDateCld] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(clearbookTicketGDS());
    dispatch(resetAllFareData());
    dispatch(returnActionClear());
    dispatch(clearSearch());
    dispatch(resetOneWay());
    dispatch(clearbookTicketGDS());
    dispatch(resetAllFareData());
    dispatch(searchFlightListReq());
    dispatch(searchaAirportListReq());
  }, []);

  const handleFromSelect = (location) => {
    setFromCity(location);
  };
  const handleToSelect = (location) => {
    setToCity(location);
  };

  const handleDateChange = (dates) => {
    setDepartDate(dayjs(dates.startDate).format("DD MMM, YY"));
    setNewDepartDateCld(dayjs(dates.startDate).format("DD MMM, YY"));
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
      JourneyType: 1,
      PreferredAirlines: null,
      Segments: [
        {
          Origin: fromCity.AirportCode,
          Destination: toCity.AirportCode,
          FlightCabinClass: flightClass?.id,
          PreferredDepartureTime: departDate,
          PreferredArrivalTime: departDate,
        },
      ],
      Sources: null,
      to: toCity.AirportCode,
      from: fromCity.AirportCode,
      date: departDate,
      cabinClass: flightClass?.value,
      px: adult,
    };

    sessionStorage.setItem(
      "onewayprop",
      JSON.stringify([
        {
          Origin: fromCity.AirportCode,
          Destination: toCity.AirportCode,
          FlightCabinClass: flightClass?.value,
          PreferredDepartureTime: departDate,
          PreferredArrivalTime: departDate,
          PreferredArrivalTimeCld: newDepartDateCld,
          selectedFrom: fromCity,
          selectedTo: toCity,
          totalCount,
          newDepartDate: departDate,
          activeIdAdult: adult,
          activeIdChild: child,
          activeIdInfant: infant,
          flightclassName: flightClass.value,
        },
      ])
    );

    // logic to show recent searches at the home page

    // Retrieve the current search data from localStorage or initialize as an empty array
    let storedSearches =
      JSON.parse(localStorage.getItem("homeRecentSearch")) || [];

    // Prepare the new search data
    const newSearchData = {
      FlightCabinClass: flightClass?.value,
      PreferredDepartureTime: departDate,
      PreferredArrivalTime: departDate,
      PreferredArrivalTimeCld: newDepartDateCld,
      selectedFrom: fromCity,
      selectedTo: toCity,
      totalCount,
      newDepartDate: departDate,
      activeIdAdult: adult,
      activeIdChild: child,
      activeIdInfant: infant,
      flightclassName: flightClass.value,
    };

    // Check if the new search data (based on date) already exists in the stored data
    const isDuplicate = storedSearches.some(
      (search) =>
        search.PreferredDepartureTime === newSearchData.PreferredDepartureTime
    );

    // If not a duplicate, add it to the stored searches
    if (!isDuplicate) {
      storedSearches.push(newSearchData);

      // If the length of stored searches exceeds 5, remove the oldest entry
      if (storedSearches.length > 5) {
        storedSearches.shift(); // Remove the first (oldest) entry
      }

      // Save the updated array back to localStorage
      localStorage.setItem("homeRecentSearch", JSON.stringify(storedSearches));
    }
    const parsedDate = new Date(departDate);
    const formattedDate = parsedDate.toISOString();
    const localOffset = parsedDate.getTimezoneOffset() * 60000;
    const adjustedDate = new Date(parsedDate.getTime() - localOffset);

    const formattedDate1 = adjustedDate.toISOString().split("T")[0]; // Keep
    dispatch(oneWayAction(payload));
    dispatch(oneWayActionCombined(payload));

    const searchpy = {
      from: { ...fromCity },
      to: { ...toCity },
      departureDate: formattedDate,
      parsedDate: formattedDate1,
    };
    dispatch(searchFlight(searchpy));
    navigate(`/Searchresult?adult=${adult}&child=${child}&infant=${infant}`);
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
          <FlightDateBox
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

export default OnewaySearchForm;