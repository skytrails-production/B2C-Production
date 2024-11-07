import { MoveRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  oneWayAction,
  oneWayActionCombined,
} from "../../../../Redux/FlightSearch/oneWay";
import { searchFlight } from "../../../../Redux/SearchFlight/actionSearchFlight";
import { useNavigate } from "react-router-dom";

// Tailwind CSS is automatically included if you follow the setup steps

const RecentSearches = () => {
  const [searches, setSearches] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reducerState = useSelector((state) => state);

  useEffect(() => {
    const storedSearches =
      JSON.parse(localStorage.getItem("homeRecentSearch")) || [];
    setSearches(storedSearches);
  }, []);

  const handleCardClick = (search) => {
    sessionStorage.setItem("SessionExpireTime", new Date());

    const payload = {
      EndUserIp: reducerState?.ip?.ipData,
      TokenId: reducerState?.ip?.tokenData,
      AdultCount: search?.activeIdAdult,
      ChildCount: search?.activeIdChild,
      InfantCount: search?.activeIdInfant,
      DirectFlight: "false",
      OneStopFlight: "false",
      JourneyType: 1,
      PreferredAirlines: null,
      Segments: [
        {
          Origin: search?.selectedFrom?.AirportCode,
          Destination: search?.selectedFrom?.AirportCode,
          FlightCabinClass: search?.FlightCabinClass,
          PreferredDepartureTime: search?.newDepartDate,
          PreferredArrivalTime: search?.newDepartDate,
        },
      ],
      Sources: null,
      to: search?.selectedTo?.AirportCode,
      from: search?.selectedFrom?.AirportCode,
      date: search?.newDepartDate,
      cabinClass: search?.FlightCabinClass,
      px: search?.activeIdAdult,
    };

    const totalCount = search?.totalCount;

    sessionStorage.setItem(
      "onewayprop",
      JSON.stringify([
        {
          Origin: search?.selectedFrom?.AirportCode,
          Destination: search?.selectedTo?.AirportCode,
          FlightCabinClass: search?.FlightCabinClass,
          PreferredDepartureTime: search?.newDepartDate,
          PreferredArrivalTime: search?.newDepartDate,
          PreferredArrivalTimeCld: search?.newDepartDate,
          selectedFrom: search?.selectedFrom,
          selectedTo: search?.selectedTo,
          totalCount,
          newDepartDate: search?.newDepartDate,
          activeIdAdult: search?.activeIdAdult,
          activeIdChild: search?.activeIdChild,
          activeIdInfant: search?.activeIdInfant,
          flightclassName: search?.FlightCabinClass,
        },
      ])
    );

    const parsedDate = new Date(search?.newDepartDate);
    const formattedDate = parsedDate.toISOString();
    const localOffset = parsedDate.getTimezoneOffset() * 60000;
    const adjustedDate = new Date(parsedDate.getTime() - localOffset);

    const formattedDate1 = adjustedDate.toISOString().split("T")[0]; // Keep
    dispatch(oneWayAction(payload));
    dispatch(oneWayActionCombined(payload));

    const searchpy = {
      from: { ...search?.selectedFrom },
      to: { ...search?.selectedTo },
      departureDate: formattedDate,
      parsedDate: formattedDate1,
    };
    dispatch(searchFlight(searchpy));
    navigate(
      `/Searchresult?adult=${search?.activeIdAdult}&child=${search?.activeIdChild}&infant=${search?.activeIdInfant}`
    );
  };

  return (
    <div className="container mx-auto mt-10">
      <div className="grid grid-cols-5 gap-4 md:grid-cols-4">
        {searches
          .slice()
          .reverse()
          .slice(0, 4)
          .map((search, index) => (
            <div
              key={index}
              className="bg-white p-2 rounded-lg shadow-md flex justify-between items-center cursor-pointer hover:bg-blue-100 transition duration-200"
              onClick={() => handleCardClick(search)}
            >
              <div>
                <h3 className="text-sm flex gap-2 items-center mb-0 font-semibold">
                  {search?.selectedFrom?.name}
                  <MoveRight className="w-4 h-4" />
                  {search?.selectedTo?.name}
                </h3>
                <p className="text-gray-600 text-sm ">
                  {search.PreferredDepartureTime}
                </p>
                <p className="text-gray-500 text-xs ">
                  1 Adult, 0 Child, 0 Infant
                </p>
              </div>
              <div className="flex items-center justify-end">
                <span className="bg-primary-6000 hover:bg-primary-700 text-white rounded-full w-8 h-8 flex items-center justify-center">
                  →
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default RecentSearches;
