import React, { useEffect } from "react";
import FlightDetailsBookWraperCard from "./FlightDetailsBookWraperCard";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFlightQuotesAireselRequestOneway,
  clearAllFareQuotesRuleAirsel,
} from "../../Redux/FareQuoteRuleAirsel/actionFlightQuoteRuleAirsel";
const FlightDetailBookWraper = () => {
  const reducerState = useSelector((state) => state);

  const selectedFlight = reducerState.returnSelected?.returnSelectedFlight;

  return (
    <div className="py-2 rounded-md shadow-sm bg-white ">
      <FlightDetailsBookWraperCard
        type={"Departure"}
        flight={selectedFlight?.onward}
      />
      <div className="flex items-center">
        <div className=" rounded-r-full bg-gray-100 w-3 h-5"></div>

        <div className="border-t-2 border-gray-400 w-full border-dashed"></div>
        <div className=" rounded-l-full bg-gray-100 w-3 h-5"></div>
      </div>
      <FlightDetailsBookWraperCard
        type={"Return"}
        flight={selectedFlight?.return}
      />
    </div>
  );
};

export default FlightDetailBookWraper;
