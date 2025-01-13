import React, { useEffect, useState } from "react";

import { GrSubtractCircle, GrAddCircle } from "react-icons/gr";
import { useSelector } from "react-redux";
import { standardizeFlightFareResponse } from "../../utility/flightUtility/standardizeFlightResponse";

const BookWrapperSummary = () => {
  const adult = sessionStorage.getItem("adults");
  const child = sessionStorage.getItem("childs");
  const infant = sessionStorage.getItem("infants");
  const [FlightFareOnward, setFlightFareOnward] = useState([]);
  const [FlightFareReturn, setFlightFareReturn] = useState([]);
  const reducerState = useSelector((state) => state);
  const markUP =
    reducerState?.markup?.markUpData?.data?.result?.[0]?.flightMarkup;
  // console.log(markUP, "markUp");

  const Onward = reducerState?.returnSelected?.returnSelectedFlight?.onward;
  const Return = reducerState?.returnSelected?.returnSelectedFlight?.return;
  useEffect(() => {
    if ((Onward, Return)) {
      const onwardData = standardizeFlightFareResponse(
        Onward,
        adult,
        child,
        infant
      ); // Get standardized data
      const returnData = standardizeFlightFareResponse(
        Return,
        adult,
        child,
        infant
      ); // Get standardized data
      setFlightFareOnward(onwardData); // Update state with data
      setFlightFareReturn(returnData); // Update state with data
    }
  }, []);
  if (!FlightFareOnward || !FlightFareReturn) {
    return <div>Loading...</div>;
  }
  const totalBase =
    FlightFareOnward?.Adt?.Basic +
    FlightFareOnward?.Chd?.Basic +
    FlightFareOnward?.Inf?.Basic +
    FlightFareReturn?.Adt?.Basic +
    FlightFareReturn?.Chd?.Basic +
    FlightFareReturn?.Inf?.Basic;
  const totalTax =
    FlightFareOnward?.Adt?.Taxes +
    FlightFareOnward?.Chd?.Taxes +
    FlightFareOnward?.Inf?.Taxes +
    FlightFareReturn?.Adt?.Taxes +
    FlightFareReturn?.Chd?.Taxes +
    FlightFareReturn?.Inf?.Taxes;
  const grandTotal =
    FlightFareOnward?.Adt?.Total +
    FlightFareOnward?.Chd?.Total +
    FlightFareOnward?.Inf?.Total +
    FlightFareReturn?.Adt?.Total +
    FlightFareReturn?.Chd?.Total +
    FlightFareReturn?.Inf?.Total;
  const passengersStr = `${0 < adult ? adult + " Adult" : ""} ${
    0 < child ? child + "Child" : ""
  }${0 < infant ? infant + "Infant" : ""} `;

  return (
    <div className="w-full sm:w-4/12 ">
      <div className="bg-white flex flex-col rounded-md shadow-sm gap-2">
        <div className="p-2 md:px-4 py-2">
          <p className="text-lg font-bold">FARE SUMMARY</p>
          <p>{passengersStr}</p>
        </div>
        <div className="border-t-[1px] border-gray-200 w-full"></div>
        <div className="flex  flex-1 flex-col justify-between mx-2 md:mx-4 border-b-[1px] border-gray-400">
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center ">
              {true ? <GrAddCircle /> : <GrSubtractCircle />}
              <p className="font-semibold"> Base Fare</p>
            </div>
            <p className="font-bold">₹{totalBase?.toFixed(2)}</p>
          </div>
          {/* <div className="flex w-full justify-between  ">
            <div className="flex gap-2 items-center">
              <p className="text-sm text-gray-400">
                Adult ({adult} x ₹
                {FlightFareOnward?.Adt?.Total + FlightFareReturn?.Adt?.Total})
              </p>
              <p className="text-sm text-gray-400">
                Adult ({adult} x ₹
                {FlightFareOnward?.Adt?.Total + FlightFareReturn?.Adt?.Total})
              </p>
              <p className="text-sm text-gray-400">
                Adult ({adult} x ₹
                {FlightFareOnward?.Adt?.Total + FlightFareReturn?.Adt?.Total})
              </p>
            </div>
            <p className="text-sm text-gray-400">₹{totalBase}</p>
          </div> */}
        </div>

        <div className="flex  flex-1 justify-between mx-2 md:mx-4 border-0 border-t-[1px] border-gray-200">
          <div className="flex gap-2 items-center ">
            <p className="font-semibold"> Taxes and Surcharges</p>
          </div>
          <p className="font-bold">
            ₹{(totalTax + grandTotal * markUP)?.toFixed(2)}
          </p>
        </div>
        <div className="border-0 border-t-[1px] border-gray-200 w-full"></div>
        <div className="flex justify-between items-center p-2 md:px-4 py-2 text-indigo-600">
          <p className="text-md font-semibold">Grand Total</p>
          <p className=" text-lg font-semibold">
            ₹{(grandTotal + grandTotal * markUP)?.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookWrapperSummary;
