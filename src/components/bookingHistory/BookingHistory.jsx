import React, { useEffect, useState } from "react";
import "./bookingHistory.css";
import FlightHistory from "./FlightHistory";
import HotelHistory from "./HotelHistory";
import BusHistory from "./BusHistory";
import GrnHotelHistory from "./GrnHotelHistory";

const BookingHistory = () => {
  const [filterType, setFilterType] = useState("FLIGHT");
  const filterOptions = ["FLIGHT", "HOTEL", "BUS"];

  const renderFunction = () => {
    if (filterType === "FLIGHT") {
      return <FlightHistory />;
    } else if (filterType === "HOTEL") {
      return <GrnHotelHistory />;
    } else {
      return <BusHistory />;
    }
  };

  return (
    <div className="mt-3">
      <div className="container flex justify-start space-x-4 mb-4">
        {filterOptions.map((type) => (
          <button
            key={type}
            className={`px-4 py-2 font-semibold ${
              filterType === type
                ? "bg-primary-6000 hover:bg-primary-700 text-white border rounded-3xl "
                : " text-black"
            }`}
            onClick={() => setFilterType(type)}
          >
            {type.charAt(0) + type.slice(1).toLowerCase()}
          </button>
        ))}
      </div>
      <div className="container">{renderFunction()}</div>
    </div>
  );
};

export default BookingHistory;
