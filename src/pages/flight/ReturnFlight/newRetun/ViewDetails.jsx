import React, { useState, useEffect } from "react";
import { CiAlarmOn } from "react-icons/ci";
import { TiArrowRight } from "react-icons/ti";
import { useLocation } from "react-router-dom";
import {
  FlightDetailsAmadeusResponse,
  FlightDetailsKafilaResponse,
  FlightDetailsTBOResponse,
  standardizeFlightDetailResponse,
  standardizeFlightFareResponse,
  standardizeFlightBaggageResponse,
} from "../../../../utility/flightUtility/standardizeFlightResponse";
import {
  findAirlineByCode,
  findAirportByCode,
} from "../../../../utility/flightUtility/BookwarperUtility";
// const Tabs = ["Flight Information", "Fare Details", "Baggage", "Cancellation"];
const Tabs = ["Flight Information", "Fare Details", "Baggage"];

const FlightDetail = ({ item }) => {
  const [flightDetail, setFlightDetail] = useState(null); // Set initial state to null to check later

  useEffect(() => {
    if (item) {
      const data = standardizeFlightDetailResponse(item); // Get standardized data
      setFlightDetail(data); // Update state with data
    }
  }, [item]);

  // Show a loader or placeholder while waiting for the data
  if (!flightDetail) {
    return <div>Loading...</div>;
  }
  // console.log(item, flightDetail, "flightDetailAMD");

  return (
    <>
      {Array.isArray(flightDetail) &&
        flightDetail?.map((item) => {
          return (
            <div className="mt-2 flex flex-col gap-2">
              <div className="flex  items-center ">
                <p className="font-semibold text-md">
                  {findAirportByCode(item?.origin)?.name}
                </p>
                <TiArrowRight />
                <p className="font-semibold text-md">
                  {findAirportByCode(item?.destination)?.name}
                </p>
              </div>
              <div className="flex w-full justify-between">
                <div className="w-[20px] h-[20px]">
                  <img
                    src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/${item?.flightName}.png`}
                    width={"20px"}
                    height={"20px"}
                  />
                </div>
                <div>
                  <p className="text-sm">
                    {findAirlineByCode(item?.flightName)?.airlineName}
                  </p>
                  <p className="text-sm">
                    {item?.flightName}-{item?.flightNumber}
                  </p>
                  <p className="text-sm">(ECONOMY)</p>
                </div>
                <div>
                  <p className="text-xl font-semibold">{item?.departureTime}</p>
                  <p className="text-sm font-semibold">
                    Lucknow({item?.origin})
                  </p>
                  <p className="text-sm">{item?.dateOfDeparture}</p>
                  <p className="text-sm">Terminal-3</p>
                </div>
                <div className="flex   flex-col gap-2 items-center">
                  <CiAlarmOn className="font-bold text-sm text-black" />
                  <p className="text-sm">{item?.duration || "01h 10m"}</p>
                </div>
                <div>
                  <p className="text-xl font-semibold">{item?.arrivalTime}</p>
                  <p className="text-sm font-semibold">
                    Bangalore({item?.destination})
                  </p>
                  <p className="text-sm">{item?.dateOfArrival}</p>
                  <p className="text-sm">Terminal-{item?.terminal}</p>
                </div>
              </div>
              {/* <div className="w-full flex justify-between items-center">
                <div className="flex-1  border-t-2 border-dashed"></div>
                <div className="border-2 border-dashed  top-1 flex gap-2 py-1 px-2 rounded-full ">
                  <p className="text-[12px] ">LAYOVER</p>
                  <p className=" text-[12px] text-red-500">1H:40M</p>
                </div>
                <div className="flex-1  border-t-2 border-dashed"></div>
              </div> */}
            </div>
          );
        })}
    </>
  );
};
const FareDetails = ({ item }) => {
  const [FlightFare, setFlightFare] = useState([]);
  const location = useLocation();
  const querayParams = new URLSearchParams(location?.search);
  const adult = querayParams.get("Adult");
  const child = querayParams.get("Child");
  const infant = querayParams.get("Infant");
  useEffect(() => {
    if (item) {
      // console.log(item, "itemmmViwedetails");
      const data = standardizeFlightFareResponse(item, adult, child, infant); // Get standardized data
      setFlightFare(data); // Update state with data
    }
  }, [item]);
  if (!FlightFare) {
    return <div>Loading...</div>;
  }
  const totalBase =
    FlightFare?.Adt?.Basic + FlightFare?.Chd?.Basic + FlightFare?.Inf?.Basic;
  const totalTax =
    FlightFare?.Adt?.Taxes + FlightFare?.Chd?.Taxes + FlightFare?.Inf?.Taxes;
  const grandTotal =
    FlightFare?.Adt?.Total + FlightFare?.Chd?.Total + FlightFare?.Inf?.Total;
  return (
    <div className="max-w-md mx-auto py-2  mt-2 rounded-lg ">
      <div className="border-t border-b ">
        {0 < FlightFare?.Adt?.Basic && (
          <div className="flex justify-between text-sm mb-1">
            <span>{adult} x Adult</span>
            <span className="font-medium">₹{FlightFare?.Adt?.Basic}</span>
          </div>
        )}
        {0 < FlightFare?.Chd?.Basic && (
          <div className="flex justify-between text-sm mb-1">
            <span>{child} x Child</span>
            <span className="font-medium">₹{FlightFare?.Chd?.Basic}</span>
          </div>
        )}
        {0 < FlightFare?.Inf?.Basic && (
          <div className="flex justify-between text-sm mb-1">
            <span>{infant} x Infant</span>
            <span className="font-medium">₹{FlightFare?.Inf?.Basic}</span>
          </div>
        )}
        <div className="flex justify-between text-sm mb-1">
          <span>Total (Base Fare)</span>
          <span className="font-medium">₹{totalBase}</span>
        </div>
        <div className="flex justify-between text-sm mb-1">
          <span>Fee & Surcharges</span>
          <span className="font-medium">+ ₹{totalTax}</span>
        </div>
      </div>
      <div className="flex justify-between text-base font-semibold mt-2">
        <span>Grand Total</span>
        <span className="text-green-600">₹{grandTotal}</span>
      </div>
    </div>
  );
};
const Baggage = ({ item }) => {
  const [FlightBaggage, setFlightBaggage] = useState([]);
  useEffect(() => {
    if (item) {
      const data = standardizeFlightBaggageResponse(item); // Get standardized data
      setFlightBaggage(data); // Update state with data
    }
  }, [item]);
  if (!FlightBaggage) {
    return <div>Loading...</div>;
  }
  return (
    <div className="max-w-md mx-auto mt-2 bg-white rounded-lg shadow-md">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 text-left text-sm font-bold py-1 ">
              Airline
            </th>
            <th className="border border-gray-300 px-4 text-left text-sm font-bold py-1">
              Check-in Baggage
            </th>
            <th className="border border-gray-300 px-4 text-left text-sm font-bold py-1">
              Cabin Baggage
            </th>
          </tr>
        </thead>
        <tbody>
          {FlightBaggage.map((baggage, index) => (
            <tr key={index}>
              <td className="border border-gray-300 px-4  text-sm">
                {baggage.Airline}
              </td>
              <td className="border border-gray-300 px-4 ">
                {baggage.Baggage}
              </td>
              <td className="border border-gray-300 px-4 ">
                {baggage.CabinBaggage}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
const ViewDetails = ({ item }) => {
  const [selectedTab, setSelectedTab] = useState("Flight Information");
  const onChange = (key) => {
    setSelectedTab(key);
    // console.log(key, selectedTab, "selected tab");
  };

  return (
    <div>
      <div className="flex mt-2 w-full justify-between items-center  rounded-md bg-slate-50 text-sm ">
        {Tabs?.map((item, index) => {
          return (
            <div
              className={`px-2 py-2 rounded-full  text-sm ${
                item == selectedTab
                  ? "bg-indigo-700 text-white font-bold"
                  : " text-gray-500"
              } `}
              key={index}
              onClick={() => onChange(item)}
            >
              {item}
            </div>
          );
        })}
      </div>
      {"Flight Information" == selectedTab && <FlightDetail item={item} />}
      {"Fare Details" == selectedTab && <FareDetails item={item} />}
      {"Baggage" == selectedTab && <Baggage item={item} />}
    </div>
  );
};

export default ViewDetails;
