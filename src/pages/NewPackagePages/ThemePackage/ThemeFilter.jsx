import React, { useState, useEffect, useCallback } from "react";
import { Select, Slider, Checkbox, Input, Button } from "antd";
// import "./packageResultFilter.scss";
import debounce from "lodash/debounce";
const { Option } = Select;

const ThemeFilter = ({
  uniqueDestinations,
  onFilterChange,
  onPriceChange,
  minPrice,
  maxPrice,
  priceRange,
  selectedTag,
  onTagChange,
  flightIncluded,
  onFlightChange,
  hotelIncluded,
  onHotelChange,
  selectedDays,
  onDaysChange,
  onSearchTermChange,
  searchTerm,
  onClearFilters, // New prop
  selectedDestinations, // Add this line
  setSelectedDestinations, // Add this line
}) => {
  const [currentPriceRange, setCurrentPriceRange] = useState(priceRange);

  useEffect(() => {
    onFilterChange(
      selectedDestinations,
      currentPriceRange,
      selectedTag,
      flightIncluded,
      hotelIncluded,
      selectedDays
    );
  }, [
    selectedDestinations,
    currentPriceRange,
    selectedTag,
    flightIncluded,
    hotelIncluded,
    selectedDays,
  ]);

  const handleDestinationChange = (values) => {
    setSelectedDestinations(values);
  };

  const handlePriceChange = (value) => {
    setCurrentPriceRange(value);
    onPriceChange(value);
  };

  const handleTagChange = (e) => {
    onTagChange(e.target.value);
    console.log("value in the pack res fil", e.target.value);
  };

  const handleFlightOptionChange = (e) => {
    const value = e.target.value;
    onFlightChange(flightIncluded === value ? "" : value);
  };
  const handleHotelOptionChange = (e) => {
    const value = e.target.value;
    onHotelChange(hotelIncluded === value ? "" : value);
  };

  const handleDaysChange = (e) => {
    const value = e.target.value;
    onDaysChange(value);
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    onSearchTermChange(value);
    debouncedSearch(value);
  };

  const debouncedSearch = useCallback(
    debounce((value) => {
      onSearchTermChange(value);
    }, 300),
    []
  );

  const handleClear = () => {
    setSelectedDestinations([]);
    onClearFilters();
  };

  return (
    <div className="holidayFilterMainBox shadow-md bg-white">
      <div className="holidayFilterClear">
        <h5
          style={{ cursor: "pointer", fontSize: "15px", fontWeight: "700" }}
          onClick={handleClear}
        >
          Clear Filters
        </h5>
      </div>
      <div className="holidayFilterSearch">
        <p className="">Search By Name</p>
        <Input
          type="text"
          placeholder="Search by Package Name"
          value={searchTerm}
          onChange={handleSearchChange}
          className="rounded-md border-1 border-gray-300"
        />
      </div>

      <div className="holidayFilterSelectMulti">
        <p className="">Cities</p>
        <Select
          mode="multiple"
          style={{ width: "100%" }}
          placeholder="Please select destinations"
          value={selectedDestinations}
          onChange={handleDestinationChange}
        >
          {uniqueDestinations.map((destination) => (
            <Option key={destination} value={destination}>
              {destination}
            </Option>
          ))}
        </Select>
      </div>

      <div className="PackagetagFilters">
        <p>Flight Options</p>
        <Checkbox
          value="flight"
          checked={flightIncluded === "flight"}
          onChange={handleFlightOptionChange}
        >
          Flight Included
        </Checkbox>
        <Checkbox
          value="no-flight"
          checked={flightIncluded === "no-flight"}
          onChange={handleFlightOptionChange}
        >
          Flight Not Included
        </Checkbox>
      </div>
      <div className="PackagetagFilters">
        <p>Hotel Options</p>
        <Checkbox
          value="hotel"
          checked={hotelIncluded === "hotel"}
          onChange={handleHotelOptionChange}
        >
          Hotel Included
        </Checkbox>
        <Checkbox
          value="no-hotel"
          checked={hotelIncluded === "no-hotel"}
          onChange={handleHotelOptionChange}
        >
          Hotel Not Included
        </Checkbox>
      </div>

      <div className="holidayFilterSlider">
        <p>Filter By Price</p>
        <Slider
          range
          step={400}
          min={minPrice}
          max={maxPrice}
          value={priceRange}
          onChange={handlePriceChange}
        />

        <div className="flex-row d-flex justify-content-between align-items-center ">
          <span style={{ fontWeight: "600", fontSize: "13px" }}>
            ₹ {priceRange?.[0]}
          </span>
          <span style={{ fontWeight: "600", fontSize: "13px" }}>
            ₹ {priceRange?.[1]}
          </span>
        </div>
      </div>

      <div className="PackagetagFilters">
        <p>Themes</p>
        <Checkbox
          value="honeymoon"
          checked={selectedTag === "honeymoon"}
          onChange={handleTagChange}
        >
          Honeymoon
        </Checkbox>
        <Checkbox
          value="family"
          checked={selectedTag === "family"}
          onChange={handleTagChange}
        >
          Family
        </Checkbox>
        <Checkbox
          value="family"
          checked={selectedTag === "luxury"}
          onChange={handleTagChange}
        >
          Luxury
        </Checkbox>
        <Checkbox
          value="family"
          checked={selectedTag === "budget"}
          onChange={handleTagChange}
        >
          Budget
        </Checkbox>
        <Checkbox
          value="anniversary"
          checked={selectedTag === "group"}
          onChange={handleTagChange}
        >
          Group
        </Checkbox>
        <Checkbox
          value="couples"
          checked={selectedTag === "couples"}
          onChange={handleTagChange}
        >
          Couples
        </Checkbox>
        <Checkbox
          value="solo"
          checked={selectedTag === "solo"}
          onChange={handleTagChange}
        >
          Solo
        </Checkbox>
      </div>
      <div className="PackagetagFilters">
        <p>Filter By Days</p>
        <Checkbox
          value="0-5"
          checked={selectedDays.includes("0-5")}
          onChange={handleDaysChange}
        >
          0-5 days
        </Checkbox>
        <Checkbox
          value="5-7"
          checked={selectedDays.includes("5-7")}
          onChange={handleDaysChange}
        >
          5-7 days
        </Checkbox>
        <Checkbox
          value="7-10"
          checked={selectedDays.includes("7-10")}
          onChange={handleDaysChange}
        >
          7-10 days
        </Checkbox>
        <Checkbox
          value="10+"
          checked={selectedDays.includes("10+")}
          onChange={handleDaysChange}
        >
          10+ days
        </Checkbox>
      </div>
    </div>
  );
};

export default ThemeFilter;
