import React, { useCallback } from "react";
import { Checkbox, Input, Slider } from "antd";
import debounce from "lodash/debounce";
import starsvg from "./../../images/star.svg";
import starBlank from "./../../images/starBlank.svg";
import "../flight/popularfilter.css";
import { ListFilter } from "lucide-react";

const HotelFilterBox = ({
  onCategoryChange,
  onPriceChange,
  onSortChange,
  onSearchTermChange,
  onClearFilters,
  minPrice,
  maxPrice,
  searchTerm,
  selectedCategories,
  priceRange,
  sortBy,
  onLocationChange,
  locations,
  selectedLocations,
}) => {
  const handleCategoryChange = (event) => {
    const value = parseInt(event.target.value, 10);
    const updatedCategories = selectedCategories?.includes(value)
      ? selectedCategories?.filter((category) => category !== value)
      : [...selectedCategories, value];
    onCategoryChange(updatedCategories);
  };

  const handleLocationChange = (event) => {
    const value = event.target.value;
    const updatedLocations = selectedLocations.includes(value)
      ? selectedLocations.filter((location) => location !== value)
      : [...selectedLocations, value];

    onLocationChange(updatedLocations);
  };

  const handlePriceChange = (value) => {
    onPriceChange(value);
  };

  const handleSortChange = (event) => {
    onSortChange(event.target.value);
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

  const handleClearFilters = () => {
    onClearFilters();
  };

  return (
    <div className="holidayFilterMainBox ">
      <div className="holidayFilterClear">
        <h5
          style={{ cursor: "pointer", fontSize: "15px", fontWeight: "700" }}
          onClick={handleClearFilters}
        >
          Clear Filters
        </h5>
      </div>

      <div className="holidayFilterSearch">
        <p className="">Search By Name</p>
        <Input
          type="text"
          placeholder="Hotel Name"
          value={searchTerm}
          onChange={handleSearchChange}
          className="rounded-md border-1 border-gray-300"
        />
      </div>

      <div className="busDepartureMain" style={{ background: "#fff" }}>
        <p className="">Sort By Price</p>
        <div>
          <label className="sidebar-label-container ps-0">
            <div className="svgBOx">
              <input
                type="checkbox"
                value="highToLow"
                checked={sortBy === "highToLow"}
                onChange={handleSortChange}
              />
              <div>
                <span className="checkedSVG pe-2">
                  <ListFilter />
                </span>
                <span>High to Low</span>
              </div>
            </div>
          </label>

          <label className="sidebar-label-container ps-0">
            <div className="svgBOx">
              <input
                type="checkbox"
                value="lowToHigh"
                checked={sortBy === "lowToHigh"}
                onChange={handleSortChange}
              />
              <div>
                <span className="checkedSVG pe-2">
                  <ListFilter className="transform  rotate-180" />
                </span>
                <span>Low to High</span>
              </div>
            </div>
          </label>
        </div>
      </div>

      <div className="PackagetagFilters">
        <p>by star Rating</p>
        <Checkbox
          value="3"
          checked={selectedCategories.includes(3)}
          onChange={handleCategoryChange}
        >
          <div className="flex flex-row gap-1">
            {[1, 2, 3, 4, 5].map((item, index) => (
              <div key={index} className="flex flex-row gap-2">
                {index <= 2 ? (
                  <img className="pe-2" src={starsvg} alt="" />
                ) : (
                  <img className="pe-2" src={starBlank} alt="" />
                )}
              </div>
            ))}
          </div>
        </Checkbox>
        <Checkbox
          value="4"
          checked={selectedCategories.includes(4)}
          onChange={handleCategoryChange}
        >
          <div className="flex flex-row gap-1">
            {[1, 2, 3, 4, 5].map((item, index) => (
              <div key={index}>
                {index <= 3 ? (
                  <img className="pe-2" src={starsvg} alt="" />
                ) : (
                  <img className="pe-2" src={starBlank} alt="" />
                )}
              </div>
            ))}
          </div>
        </Checkbox>
        <Checkbox
          value="5"
          checked={selectedCategories.includes(5)}
          onChange={handleCategoryChange}
        >
          <div className="flex flex-row gap-1">
            {[1, 2, 3, 4, 5].map((item, index) => (
              <div key={index}>
                {index <= 4 ? (
                  <img className="pe-2" src={starsvg} alt="" />
                ) : (
                  <img className="pe-2" src={starBlank} alt="" />
                )}
              </div>
            ))}
          </div>
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

        <div className="d-flex flex-row justify-content-between align-items-center ">
          <span style={{ fontWeight: "600", fontSize: "13px" }}>
            ₹ {priceRange?.[0]}
          </span>
          <span style={{ fontWeight: "600", fontSize: "13px" }}>
            ₹ {priceRange?.[1]}
          </span>
        </div>
      </div>

      <div className="PackagetagFilters">
        <p className="">Filter by Location</p>

        {locations.map((location) => (
          <Checkbox
            key={location}
            value={location}
            checked={selectedLocations.includes(location)}
            onChange={handleLocationChange}
          >
            {location}
          </Checkbox>
        ))}
      </div>
    </div>
  );
};

export default HotelFilterBox;
