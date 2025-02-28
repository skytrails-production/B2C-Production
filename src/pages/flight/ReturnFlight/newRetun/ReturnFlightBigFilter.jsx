import React, { useState, useRef } from "react";
import { Slider, Checkbox } from "antd";
// import "../../flightResult/flightBigFilter.scss";
import "../../../NewPackagePages/HolidayPackageSearchResult/packageResultFilter.scss";
import { useSelector } from "react-redux";
import {
  Icon1,
  Icon2,
  Icon3,
  Icon4,
  IconTime,
} from "../../../../utility/flightUtility/timeSvg";
import { findAirlineByCode } from "../../../../utility/flightUtility/BookwarperUtility";
import { formattedPrice } from "../../../../utility/utils";
const svgs = [Icon1, Icon2, Icon3, Icon4];
const ReturnFlightBigFilter = ({
  airlineCodes,
  minPrice,
  maxPrice,
  priceRange,
  onFilter,
  minDuration,
  maxDuration,
  durationRange,
  stopsAirline,
}) => {
  const [selectedCodes, setSelectedCodes] = useState([]);
  const [selectedStops, setSelectedStops] = useState([]);
  const [selectedStopsReturn, setSelectedStopsRetrun] = useState([]);
  const [currentPriceRange, setCurrentPriceRange] = useState(priceRange);

  const [currentDurationRange, setCurrentDurationRange] =
    useState(durationRange);
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [selectedTimesReturn, setSelectedTimesReturn] = useState([]);
  const [selectedLandingTimes, setSelectedLandingTimes] = useState([]);
  const [selectedLandingTimesReturn, setSelectedLandingTimesReturn] = useState(
    []
  );
  const debounceTimer = useRef(null); // Use ref to store the timer
  const flightList = useSelector((state) => state?.flightList);
  const [airlines, setAirlines] = useState([]);
  const [airports, setAirports] = useState([]);
  const handlePriceChange = (value) => {
    // Update the price range state
    setCurrentPriceRange(value);

    // Clear any existing timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // Set a new timer to delay the filter function
    debounceTimer.current = setTimeout(() => {
      onFilter(
        selectedCodes,
        selectedStops,
        value, // Use the latest price range
        selectedTimes,
        selectedLandingTimes,
        currentDurationRange,
        selectedStopsReturn,
        selectedTimesReturn,
        selectedLandingTimesReturn,
        airlines
      );
    }, 300); // 300ms delay (adjust as needed)
  };
  const handleAirlineChange = (event) => {
    const { value, checked } = event.target;
    // console.log(value, checked, "valueChecked");
    const airlineValue = value;
    setAirlines((prev) => {
      const updateAirline = checked
        ? [...prev, airlineValue]
        : prev.filter((air) => air !== airlineValue);
      onFilter(
        selectedCodes,
        selectedStops,
        currentPriceRange,
        selectedTimes,
        selectedLandingTimes,
        currentDurationRange,
        selectedStopsReturn,
        selectedTimesReturn,
        selectedLandingTimesReturn,
        updateAirline
      );
      // console.log(updateAirline, "updateAirline");
      return updateAirline;
    }); // 300ms delay (adjust as needed)
  };
  const handleStopChange = (event) => {
    const { value, checked } = event.target;
    const stopValue = parseInt(value, 10);
    setSelectedStops((prev) => {
      const updateStop = checked
        ? [...prev, stopValue]
        : prev.filter((stop) => stop !== stopValue);
      onFilter(
        selectedCodes,
        updateStop,
        currentPriceRange,
        selectedTimes,
        selectedLandingTimes,
        currentDurationRange,
        selectedStopsReturn,
        selectedTimesReturn,
        selectedLandingTimesReturn,
        airlines
      );
      return updateStop;
    });
  };
  const handleStopChangeRetrun = (event) => {
    const { value, checked } = event.target;
    const stopValue = parseInt(value, 10);
    setSelectedStopsRetrun((prev) => {
      const updateStopsreturn = checked
        ? [...prev, stopValue]
        : prev.filter((stop) => stop !== stopValue);
      onFilter(
        selectedCodes,
        selectedStops,
        currentPriceRange,
        selectedTimes,
        selectedLandingTimes,
        currentDurationRange,
        updateStopsreturn,
        selectedTimesReturn,
        selectedLandingTimesReturn,
        airlines
      );
      return updateStopsreturn;
    });
  };
  const handleTimeChange = (event) => {
    const { value, checked } = event.target;
    const timeRange = value.split("-").map((v) => parseInt(v, 10));
    setSelectedTimes((prev) => {
      const updateSelectedTimes = checked
        ? [...prev, timeRange]
        : prev.filter((range) => range.join("-") !== value);
      // console.log(updateSelectedTimes, "updateSelectedTimes");
      onFilter(
        selectedCodes,
        selectedStops,
        currentPriceRange,
        updateSelectedTimes,
        selectedLandingTimes,
        currentDurationRange,
        selectedStopsReturn,
        selectedTimesReturn,
        selectedLandingTimesReturn,
        airlines
      );
      return updateSelectedTimes;
    });
  };
  const handleTimeChangeReturn = (event) => {
    const { value, checked } = event.target;
    const timeRange = value.split("-").map((v) => parseInt(v, 10));
    setSelectedTimesReturn((prev) => {
      const updateSelectedTimesReturn = checked
        ? [...prev, timeRange]
        : prev.filter((range) => range.join("-") !== value);
      onFilter(
        selectedCodes,
        selectedStops,
        currentPriceRange,
        selectedTimes,
        selectedLandingTimes,
        currentDurationRange,
        selectedStopsReturn,
        updateSelectedTimesReturn,
        selectedLandingTimesReturn,
        airlines
      );
      return updateSelectedTimesReturn;
    });
  };
  const handleLandingTimeChange = (event) => {
    const { value, checked } = event.target;
    const timeRange = value.split("-").map((v) => parseInt(v, 10));
    setSelectedLandingTimes((prev) => {
      const updateSelectedLandingTimes = checked
        ? [...prev, timeRange]
        : prev.filter((range) => range.join("-") !== value);
      onFilter(
        selectedCodes,
        selectedStops,
        currentPriceRange,
        selectedTimes,
        updateSelectedLandingTimes,
        currentDurationRange,
        selectedStopsReturn,
        selectedTimesReturn,
        selectedLandingTimesReturn,
        airlines
      );
      return updateSelectedLandingTimes;
    });
  };
  const handleLandingTimeChangeReturn = (event) => {
    const { value, checked } = event.target;
    const timeRange = value.split("-").map((v) => parseInt(v, 10));
    setSelectedLandingTimesReturn((prev) => {
      const updateLandingTimesReturn = checked
        ? [...prev, timeRange]
        : prev.filter((range) => range.join("-") !== value);
      onFilter(
        selectedCodes,
        selectedStops,
        currentPriceRange,
        selectedTimes,
        selectedLandingTimes,
        currentDurationRange,
        selectedStopsReturn,
        selectedTimesReturn,
        updateLandingTimesReturn,
        airlines
      );

      return updateLandingTimesReturn;
    });
  };
  const StopFilter = ({ handleStopChange, stops, selected }) => {
    // console.log(handleStopChange, stops, selected, "handleStopChange");

    return (
      <div className="PackagetagFilters flight-filter-aireline">
        <p className="font-semibold text-gray-800">Filter By Stop's</p>
        <>
          {stops &&
            Object?.keys(stops)?.map((key, index) => {
              // console.log(stops, "ffffff");
              const isItem = stops?.[key]?.count > 0;
              const price = stops?.[key]?.minPrice;
              const count = stops?.[key]?.count;

              let itemShow = isItem ? (
                <div
                  key={`${key}-${index}`}
                  className="flex justify-between items-center w-full"
                >
                  <Checkbox
                    value={index}
                    className="flex-1 w-full"
                    checked={selected?.includes(index)}
                    onChange={handleStopChange}
                  >
                    {key == "moreThanOneStop" ? "2+ stops" : key}
                  </Checkbox>
                  <div className=" flex  items-center   gap-1 justify-between p-0 !font-medium">
                    <div className="flex">
                      {/* <p className="text-gray-800 text-nowrap text-sm">₹ </p> */}
                      <p className="!font-medium text-gray-800 !text-sm">
                        {formattedPrice(price)}
                      </p>
                    </div>
                    <p className="p-0 !text-sm !font-medium text-gray-800">{`(${count})`}</p>
                  </div>
                </div>
              ) : null;
              return itemShow;
            })}
        </>
      </div>
    );
  };
  const TimeFilter = ({ title, handleTimeChange, selected }) => {
    return (
      <div className="busDepartureMain">
        <h2 className="sidebar-title">{title}</h2>

        <div>
          {/* <span className="checkmark"></span> */}
          {svgs?.map((SvgComponent, index) => {
            let timeValue = IconTime?.[index]?.value;
            let timeSplit = IconTime?.[index]?.value.split("-");
            let exists = selected.some((item) => {
              return item[0] == timeSplit[0] && item[1] == timeSplit[1];
            });

            return (
              <label
                key={`${title}-${index}`}
                className="sidebar-label-container  ps-0"
              >
                <div className="svgBOx">
                  <input
                    type="checkbox"
                    onChange={handleTimeChange}
                    value={IconTime?.[index]?.value}
                    name="departTime"
                    checked={exists}
                  />
                  <div>
                    <span className="checkedSVG pe-2">
                      <SvgComponent />
                    </span>
                    <span>{IconTime?.[index]?.title}</span>
                  </div>
                </div>
              </label>
            );
          })}
        </div>
      </div>
    );
  };
  const AirlineFilter = () => {
    // console.log("AirlineFilter", stopsAirline);
    const Airlines = stopsAirline?.Airlines;
    return (
      <div className="flight-filter-aireline">
        <p className=" text-gray-800">Filter By Airlines</p>
        <div className="flight-filter-aireline-item flex flex-col gap-2 ">
          {Airlines &&
            Object?.keys(Airlines)?.map((key, index) => {
              const Price = Airlines?.[key]?.minPrice;
              // console.log(airlines);
              return (
                <div
                  key={`${key}+${index}`}
                  className="w-full flex-1 flex justify-between items-center"
                >
                  <Checkbox
                    key={`Airlines-${index}`}
                    value={key}
                    className="w-full flex items-center  "
                    checked={airlines.includes(key)}
                    onChange={handleAirlineChange}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        margin: "0px",
                        padding: "0px",
                        gap: "5px",
                      }}
                    >
                      <img
                        src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/${key}.png`}
                        alt="flight"
                        style={{ borderRadius: "8px" }}
                        width={22}
                        height={22}
                      />
                      <p
                        style={{
                          margin: "0px !important",
                          fontSize: "14px",
                          fontWeight: "500",
                        }}
                      >
                        {findAirlineByCode(key)?.airlineName}
                      </p>
                    </div>
                  </Checkbox>
                  <div className=" flex flex-1 items-center w-[70px] min-w-[50px] gap-1">
                    {/* <p className="text-gray-700 text-sm text-nowrap ">₹ </p> */}
                    <p className="flex-1 text-gray-700 text-sm ">
                      {formattedPrice(Price)}
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  };
  return (
    <div className=" max-h-[74vh] overflow-y-scroll  top-28 sticky bg-white p-3  ">
      <div className="holidayFilterClear">
        <h5
          className=" text-gray-800 cursor-pointer"
          // onClick={handleClearFilters}
        >
          Clear Filters
        </h5>
      </div>
      <div className="holidayFilterSlider flight-filter-aireline mt-3">
        <p className=" text-gray-800">Filter By Price</p>
        <Slider
          range
          step={400}
          min={minPrice}
          max={maxPrice}
          value={currentPriceRange}
          onChange={handlePriceChange}
        />

        <div className="d-flex flex-row justify-content-between align-items-center ">
          <span style={{ fontWeight: "600", fontSize: "13px" }}>
            {formattedPrice(minPrice)}
          </span>
          <span style={{ fontWeight: "600", fontSize: "13px" }}>
            {formattedPrice(maxPrice)}
          </span>
        </div>
      </div>

      <StopFilter
        handleStopChange={handleStopChange}
        stops={stopsAirline?.JourneyStopes}
        selected={selectedStops}
      />
      <TimeFilter
        title={"Departure Time"}
        handleTimeChange={handleTimeChange}
        selected={selectedTimes}
      />
      <TimeFilter
        title={"Arrival Time"}
        handleTimeChange={handleLandingTimeChange}
        selected={selectedLandingTimes}
      />
      <StopFilter
        handleStopChange={handleStopChangeRetrun}
        stops={stopsAirline?.ReturnStopes}
        selected={selectedStopsReturn}
      />

      <TimeFilter
        title={"Departure Time"}
        handleTimeChange={handleTimeChangeReturn}
        selected={selectedTimesReturn}
      />
      <TimeFilter
        title={"Arrival Time"}
        handleTimeChange={handleLandingTimeChangeReturn}
        selected={selectedLandingTimesReturn}
      />
      <AirlineFilter />
    </div>
  );
};

export default ReturnFlightBigFilter;
