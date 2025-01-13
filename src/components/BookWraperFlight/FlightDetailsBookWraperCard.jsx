import React, { useState, useEffect } from "react";
import {
  standardizeFlightDetailResponse,
  standardizeFlightFareResponse,
  standardizeFlightBaggageResponse,
} from "../../utility/flightUtility/standardizeFlightResponse";
import {
  findAirlineByCode,
  findAirportByCode,
} from "../../utility/flightUtility/BookwarperUtility";

const FlightDetailsBookWraperCard = ({ type, flight }) => {
  const [flightDetail, setFlightDetail] = useState(null); // Set initial state to null to check later
  const [FlightBaggage, setFlightBaggage] = useState([]);

  useEffect(() => {
    if (flight) {
      const data = standardizeFlightDetailResponse(flight); // Get standardized data
      const baggage = standardizeFlightBaggageResponse(flight); // Get standardized data
      setFlightDetail(data); // Update state with data
      setFlightBaggage(baggage);
    }
  }, [flight]);
  const FlightDetailsCard = ({ item }) => {
    const {
      arrivalTime,
      dateOfArrival,
      dateOfDeparture,
      departureTime,
      destination,
      duration,
      flightName,
      flightNumber,
      origin,
      terminal,
      type,
    } = item || {};
    const airportOrigin = findAirportByCode(origin);
    const airportDestination = findAirportByCode(destination);

    return (
      <div className="flex flex-col gap-2 border-gray-200   border-1 rounded-md p-2 md:p-4">
        <div className="flex justify-between w-full ">
          <div className="flex gap-2">
            <img
              src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/${flightName}.png`}
              alt=""
              width="32px"
              height="32px"
              className="object-contain"
            />
            <div className="flex flex-col justify-between ">
              <p className="text-sm md:text-lg font-bold">
                {findAirlineByCode(flightName)?.airlineName || flightName} |{" "}
                {flightName} {flightNumber}
              </p>
              <p className="text-xs md:text-sm opacity-75">Airbus A321</p>
            </div>
          </div>
          <div className="text-sm md:text-lg">
            ECONOMY <span className="font-semibold">| SAVER</span>
          </div>
        </div>
        <div className="flex justify-between items-center gap-2">
          <div className="px-2 rounded-sm bg-indigo-200 ">
            <p className="text-xs md:text-sm">
              Start on{" "}
              <span className=" font-semibold">- {dateOfDeparture}</span>
            </p>
          </div>
          <div className="px-2 rounded-sm bg-indigo-200 ">
            <p className="text-xs md:text-sm">
              Start on <span className=" font-semibold">- {dateOfArrival}</span>
            </p>
          </div>
        </div>
        <div className="flex justify-between gap-1 md:gap-2">
          <div>
            <p className="text-xl font-bold">{departureTime}</p>
            <p className="text-xl font-semibold">{origin}</p>
          </div>
          <div className=" relative w-full flex   flex-col">
            <div className=" w-full  border-gray-400 absolute border-t-2 border-dashed top-3 "></div>
            <div className=" absolute top-0 left-0 right-0 bg-transparent flex justify-center  px-2">
              <div className="flex flex-col bg-white px-1">
                <span className="text-center text-lg font-semibold ">
                  {duration}
                </span>
                <span className="text-center">Duration</span>
              </div>
            </div>
          </div>
          <div>
            <p className="text-xl font-bold  text-right">{arrivalTime}</p>
            <p className="text-xl font-semibold text-right">{destination}</p>
          </div>
        </div>
        <div className="flex justify-between gap-2">
          <div>
            <p className="text-md font-semibold">{airportOrigin?.name || ""}</p>
            <p className="text-sm text-zinc-700 opacity-75">
              {airportOrigin?.code || ""}
              {airportOrigin?.CountryName || ""}
            </p>
            <p className="text-sm font-semibold  text-indigo-500">
              Terminal {terminal}
            </p>
          </div>

          <div>
            <p className="text-md font-semibold text-right">
              {airportDestination?.name}
            </p>
            <p className="text-sm text-zinc-700 text-right opacity-75">
              {airportDestination?.code || ""}{" "}
              {airportDestination?.CountryName || ""}
            </p>
            <p className="text-sm font-semibold  text-indigo-500 text-right">
              Terminal {terminal}
            </p>
          </div>
        </div>
        <div className="w-full border-t-[1px] border-gray-400"></div>
        <div className="flex justify-between items-start md:items-center w-full flex-col md:flex-row gap-2">
          <div
            className="text-xs md:text-sm font-gray-400 flex flex-col justify-start
           md:justify-between md:flex-row w-full  "
          >
            <p>Baggage - 7 Kgs (1 piece only)</p>
            <p>Cabin 15 Kgs (1 piece only) Check-In</p>
          </div>
          {/* <div className="flex items-end w-full md:w-auto justify-end">
            <button className="text-sm md:text-md text-indigo-500 font-semibold text-nowrap">
              View Baggage Details
            </button>
          </div> */}
        </div>
      </div>
    );
  };

  // Show a loader or placeholder while waiting for the data
  if (!flightDetail) {
    return <div>Loading...</div>;
  }
  // console.log(flightDetail, "flightDetailAMDd");
  return (
    <div className="bg-white flex flex-col gap-2 px-2 md:px-4 py-2">
      <div className="flex flex-col ">
        <div className="flex gap-2 items-center">
          <p className="text-sm  md:text-xl bg-primary-700 text-white rounded-md py-1 px-2">
            {type}
          </p>
          <p className="text-sm  md:text-xl font-bold">
            {flight?.origin} - {flight?.destination}
          </p>
        </div>
        <div>
          <p className="text-xs md:text-sm opacity-75">
            {flight?.stopes == 0 ? "Non" : flight?.stopes} Stop | All
            departure/arrival times are in local time
          </p>
        </div>
      </div>
      {flightDetail?.map((item) => {
        return <FlightDetailsCard item={item} />;
      })}
    </div>
  );
};

export default FlightDetailsBookWraperCard;
