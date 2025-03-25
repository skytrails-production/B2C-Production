import React, { useState, useEffect, useRef } from "react";
import { Slider, Checkbox, Flex } from "antd";
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

const OnewayFlightBigFilter = ({
  airlineCodes,
  minPrice,
  maxPrice,
  priceRange,
  onFilter,
  minDuration,
  maxDuration,
  durationRange,
  stopsAirline,
  airlines,
  handleAirlineChange,
  selectedStops,

  selectedTimes,

  selectedLandingTimes,

  setSelectedTimes,

  setSelectedLandingTimes,

  handleCheckboxChange,
  handleStopChange,
  handlePriceChange,
}) => {
  const StopFilter = ({ handleStopChange, stops, selected }) => {
    return (
      <div className="PackagetagFilters flight-filter-aireline">
        <p className=" text-gray-800 font-medium">Filter By Stop's</p>
        <>
          {stops &&
            Object?.keys(stops)?.map((key, index) => {
              // console.log(stops, "ffffff");
              const isItem = stops?.[key]?.count > 0;
              const price = stops?.[key]?.minPrice;
              const count = stops?.[key]?.count;

              let itemShow = isItem ? (
                <div className="flex justify-between items-center w-full">
                  <Checkbox
                    key={`stops-${index}`}
                    value={index}
                    className="flex-1 w-full"
                    checked={selected?.includes(index)}
                    onChange={handleStopChange}
                  >
                    {key == "moreThanOneStop" ? "2+ stops" : key.toLowerCase()}
                  </Checkbox>
                  <div className=" flex  items-center   gap-1 justify-between p-0 !font-medium">
                    <div className="flex">
                      {/* <p className="text-gray-800 text-nowrap text-sm">₹ </p> */}
                      <p className="text-gray-800 text-nowrap text-sm">
                        {formattedPrice(price)}
                      </p>
                    </div>
                    <p className="p-0 !text-sm !font-medium">{`(${count})`}</p>
                  </div>
                </div>
              ) : null;
              return itemShow;
            })}
        </>
      </div>
    );
  };
  const TimeFilter = ({
    title,
    handleTimeChange,
    selected,
    stateUpdater,
    filterKey,
  }) => {
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
                key={`SvgComponent-${index}`}
                className="sidebar-label-container  ps-0"
              >
                <div className="svgBOx">
                  <input
                    type="checkbox"
                    // onChange={handleTimeChange}
                    onChange={(e) =>
                      handleTimeChange(e, stateUpdater, filterKey)
                    }
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
    const Airlines = stopsAirline?.Airlines;
    return (
      <div className="flex flex-col gap-2">
        <p className="text-sm text-gray-800 font-medium">Filter By Airlines</p>
        <div className="flex flex-col gap-2">
          {Airlines &&
            Object?.keys(Airlines)?.map((key, index) => {
              const Price = Airlines?.[key]?.minPrice;

              return (
                <div
                  key={`Airlines-${index}`}
                  className="w-full flex-1 flex justify-between items-center"
                >
                  <Checkbox
                    key={`Airlinesc-${index}`}
                    value={key}
                    className="w-full flex items-center  "
                    checked={airlines.includes(key)}
                    onChange={handleAirlineChange}
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/${key}.png`}
                        alt="flight"
                        width={22}
                        height={22}
                        className=" rounded-md"
                      />
                      <p className="text-sm font-medium">
                        {findAirlineByCode(key)?.airlineName}
                      </p>
                    </div>
                  </Checkbox>
                  <div className=" flex flex-1 items-center w-[70px] min-w-[50px] gap-1">
                    <p className="flex-1  text-gray-800 text-sm font-medium">
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
    <div className=" max-h-screen overflow-y-scroll  top-28 sticky bg-white p-3  ">
      <div className="holidayFilterClear">
        <h5
          className=" cursor-pointer font-semibold text-gray-800"

          // onClick={handleClearFilters}
        >
          Clear Filters
        </h5>
      </div>
      <div className="holidayFilterSlider flight-filter-aireline mt-3">
        <p className="text-gray-800 font-medium">Filter By Price</p>
        <Slider
          range
          step={400}
          min={minPrice}
          max={maxPrice}
          value={priceRange}
          onChange={handlePriceChange}
        />

        <div className="d-flex flex-row justify-content-between align-items-center ">
          <span className="text-gray-800 text-sm font-medium">
            {formattedPrice(minPrice)}
          </span>
          <span className="text-gray-800  text-sm font-medium">
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
        // handleTimeChange={handleTimeChange}
        handleTimeChange={handleCheckboxChange}
        selected={selectedTimes}
        stateUpdater={setSelectedTimes}
        filterKey={"selectedTimes"}
      />
      <TimeFilter
        title={"Arrival Time"}
        // handleTimeChange={handleLandingTimeChange}
        handleTimeChange={handleCheckboxChange}
        selected={selectedLandingTimes}
        stateUpdater={setSelectedLandingTimes}
        filterKey={"selectedLandingTimes"}
      />
      <AirlineFilter />
    </div>
  );
};

export default OnewayFlightBigFilter;
