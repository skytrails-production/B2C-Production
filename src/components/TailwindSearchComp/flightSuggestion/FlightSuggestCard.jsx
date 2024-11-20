import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { oneWayAction, oneWayActionCombined } from "../../../Redux/FlightSearch/oneWay";
import {
  searchaAirportListReq,
  searchFlightListReq,
} from "../../../Redux/FlightList/actionFlightList";
import { searchFlight } from "../../../Redux/SearchFlight/actionSearchFlight";
import dayjs from "dayjs";
// import Badge from "./Badge";
// import convertNumbThousand from "./convertNumbThousand";

const FlightSuggestCard = ({ className = "", data }) => {
  console.log(data, "datatata")

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const reducerState = useSelector((state) => state);

  const [selectedFrom, setSelectedFrom] = useState([]);
  const [selectedTo, setSelectedTo] = useState([]);
  const [flightclassName, setflightClassName] = useState("Y");

  function getNextDayDateIfAfter9PM() {
    const currentDate = new Date();
    if (currentDate.getHours() >= 21) {
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return currentDate;
  }

  const todaydate = getNextDayDateIfAfter9PM();

  function handleOnewaySubmit(event) {
    sessionStorage.setItem("SessionExpireTime", new Date());

    const payload = {
      EndUserIp: reducerState?.ip?.ipData,
      TokenId: reducerState?.ip?.tokenData,
      AdultCount: 1,
      ChildCount: 0,
      InfantCount: 0,
      DirectFlight: "false",
      OneStopFlight: "false",
      JourneyType: 1,
      PreferredAirlines: null,
      Segments: [
        {
          Origin: event.fromDetails.AirportCode,
          Destination: event.to.AirportCode,
          FlightCabinClass: 2,
          PreferredDepartureTime: dayjs(todaydate).format("DD MMM, YY"),
          PreferredArrivalTime: dayjs(todaydate).format("DD MMM, YY"),
        },
      ],
      Sources: null,
      from: event.fromDetails.AirportCode,
      to: event.to.AirportCode,
      date: dayjs(todaydate).format("DD MMM, YY"),
      cabinClass: "Y",
      px: 1,
    };
    setSelectedFrom(event?.fromDetails);
    setSelectedTo(event?.to);

    sessionStorage.setItem(
      "onewayprop",
      JSON.stringify([
        {
          Origin: event.fromDetails.AirportCode,
          Destination: event.to.AirportCode,
          FlightCabinClass: 2,
          PreferredDepartureTime: dayjs(todaydate).format("DD MMM, YY"),
          PreferredArrivalTime: dayjs(todaydate).format("DD MMM, YY"),
          selectedFrom: event.fromDetails,
          selectedTo: event.to,
          totalCount: 1,
          todaydate: dayjs(todaydate).format("DD MMM, YY"),
          activeIdAdult: 1,
          activeIdChild: 0,
          activeIdInfant: 0,
          flightclassName,
        },
      ])
    );
    const parsedDate = new Date(todaydate);

    const formattedDate = parsedDate.toISOString();

    dispatch(oneWayAction(payload));
    dispatch(oneWayActionCombined(payload));

    dispatch(searchFlightListReq());
    dispatch(searchaAirportListReq());

    const searchpy = {
      from: event.fromDetails,
      to: event.to,
      departureDate: formattedDate,
    };
    dispatch(searchFlight(searchpy));
    navigate(`/Searchresult?adult=${1}&child=${0}&infant=${0}`);
    // }
  }

  return (
    <div
      onClick={() => handleOnewaySubmit(data)}
      className={`nc-CardCategoryBox1 relative flex items-center p-2 sm:p-2 py-6 sm:py-6 [ nc-box-has-hover ] [ nc-dark-box-bg-has-hover ] ${className}`}
    >
      {/* <Badge
                className="absolute right-2 top-2"
                color="gray"
                name={convertNumbThousand(count)}
            /> */}

      <div className="relative flex-shrink-0 w-16 h-16 rounded-full overflow-hidden">
        <img
          src={data?.images}
          alt=""
          className="object-cover w-full h-full"
        />
      </div>
      <div className="ml-4 flex-grow overflow-hidden">
        <h2 className="text-base font-medium">
          <span className="line-clamp-1 flex gap-2 items-center">
            {data?.from}{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-plane-takeoff"
            >
              <path d="M2 22h20" />
              <path d="M6.36 17.4 4 17l-2-4 1.1-.55a2 2 0 0 1 1.8 0l.17.1a2 2 0 0 0 1.8 0L8 12 5 6l.9-.45a2 2 0 0 1 2.09.2l4.02 3a2 2 0 0 0 2.1.2l4.19-2.06a2.41 2.41 0 0 1 1.73-.17L21 7a1.4 1.4 0 0 1 .87 1.99l-.38.76c-.23.46-.6.84-1.07 1.08L7.58 17.2a2 2 0 0 1-1.22.18Z" />
            </svg>{" "}
            {data.destination}
          </span>
        </h2>
        <span className="block mt-2 text-sm text-neutral-500 dark:text-neutral-400">
          {data?.combineCode}
        </span>
      </div>
    </div>
  );
};

export default FlightSuggestCard;
