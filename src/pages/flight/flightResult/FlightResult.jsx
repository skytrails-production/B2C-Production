import React, { useEffect } from "react";
import CardAmd from "./CardAmd";
import CardTvo from "./CardTvo";
import "./flightResult.scss";
import flightNoResult from "../../../../src/images/img/flightnoresult.jpg";
const FlightResult = ({
  flights,
  airlineCodes,
  minPrice,
  maxPrice,
  priceRange,
  onFilter,
}) => {
  const handleClearFilter = () => {
    onFilter([], [], [minPrice, maxPrice], [], []);
  };

  return (
    <div className="flight_result_container">
      {flights?.length > 0 ? (
        flights.map((flight, index) => (
          <div className="container d-flex col gap-3 p-0" key={index}>
            {/* <h3>Flight {index + 1}</h3>
            <pre>{JSON.stringify(flight, null, 2)}</pre> */}
            {flight?.propFlightGrDetail ? (
              <CardAmd flight={flight} />
            ) : (
              <CardTvo flight={flight} />
            )}
          </div>
        ))
      ) : (
        <div className="filteredNotFound">
          <img src={flightNoResult} alt="filter" />
          <h1>Too many filters applied!</h1>
          <div>
            <label className="sidebar-label-container ps-0">
              <input
                type="checkbox"
                // onChange={handleRadioChange}

                value="All"
                name="test"
                // checked={selectedCategory.includes("test:All")}
              />
              {/* <span className="checkmark"></span> */}
              <span
                style={{
                  color: "#e73c34",
                }}
                onClick={() => handleClearFilter()}
              >
                Clear Filter
              </span>
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightResult;
