import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  MapPinIcon,
  MagnifyingGlassIcon,
  ClockIcon,
} from "@heroicons/react/24/outline"; // Adjust import based on your icon library setup

const StayLocationMobile = ({ onLocationSelect, placeHolder = "Location" }) => {
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  const [value, setValue] = useState("");
  // const [showPopover, setShowPopover] = useState(autoFocus);
  const [searchResults, setSearchResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState(
    JSON.parse(localStorage.getItem("recentSearches")) || []
  );

  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  const handleSearch = async (keyword) => {
    if (keyword.length > 2) {
      try {
        const response = await axios.get(
          `https://back.theskytrails.com/skyTrails/tboandgrn/citylist?keyword=${keyword}`
        );
        // console.log(response, "response");
        const cityList = response?.data?.data?.cityList.map((city) => ({
          type: "city",
          ...city,
        }));
        const hotelList = response?.data?.data?.hotelList.map((hotel) => ({
          type: "hotel",
          ...hotel,
        }));
        setSearchResults([...cityList, ...hotelList]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  const debouncedSearch = debounce(handleSearch, 500);

  const handleChange = (e) => {
    const keyword = e.currentTarget.value;
    setValue(keyword);
    if (keyword.length > 0) {
      debouncedSearch(keyword);
    } else {
      setSearchResults([]);
    }
  };

  const handleSelectLocation = (location) => {
    let selectedLocation;
    if (location.type === "city") {
      selectedLocation = `${location.cityName} (${
        location?.grnCountryName !== null
          ? location?.grnCountryName
          : location?.tboCountryName
      })`;
    } else if (location.type === "hotel") {
      selectedLocation = `${location.hotelName} (${location.countryName})`;
    }
    setValue(selectedLocation);
    // setShowPopover(false);
    const updatedRecentSearches = [
      location,
      ...recentSearches.filter(
        (item) =>
          item.cityName !== location.cityName &&
          item.hotelName !== location.hotelName
      ),
    ].slice(0, 5);

    setRecentSearches(updatedRecentSearches);
    localStorage.setItem(
      "recentSearches",
      JSON.stringify(updatedRecentSearches)
    );

    if (onLocationSelect) {
      onLocationSelect(location);
    }
  };

  const renderRecentSearches = () => {
    return (
      <>
        <h3 className="block mt-2 sm:mt-0 px-4 sm:px-8 font-semibold text-base sm:text-lg text-neutral-800 ">
          Recent searches
        </h3>
        <div className="mt-2">
          {recentSearches.map((item, index) => (
            <span
              onClick={() => handleSelectLocation(item)} // Use the full `location` object
              key={index}
              className="flex px-4 sm:px-8 items-center space-x-3 sm:space-x-4 py-4 hover:bg-neutral-100 cursor-pointer"
            >
              <span className="block text-neutral-400">
                <ClockIcon className="h-4 sm:h-6 w-4 sm:w-6" />
              </span>
              {item?.type == "city" ? (
                <span className="block font-medium text-neutral-700 ">
                  {item?.cityName} (
                  {item?.grnCountryName !== null
                    ? item?.grnCountryName
                    : item?.tboCountryName}
                  )
                </span>
              ) : (
                <span className="block font-medium text-neutral-700 ">
                  {item?.hotelName} ({item?.countryName})
                </span>
              )}
            </span>
          ))}
        </div>
      </>
    );
  };

  const renderSearchResults = () => {
    return (
      <>
        {searchResults.map((item, index) => (
          <span
            onClick={() => handleSelectLocation(item)}
            key={index}
            className="flex px-4 sm:px-8 items-center space-x-3 sm:space-x-4 py-4 hover:bg-neutral-100 cursor-pointer"
          >
            <span className="block text-neutral-400">
              <MapPinIcon className="h-4 w-4 sm:h-6 sm:w-6" />
            </span>
            {item?.type == "city" ? (
              <span className="block font-medium text-neutral-700 ">
                {item?.cityName} (
                {item?.grnCountryName !== null
                  ? item?.grnCountryName
                  : item?.tboCountryName}
                )
              </span>
            ) : (
              <span className="block font-medium text-neutral-700 ">
                {item?.hotelName} ({item?.countryName})
              </span>
            )}
          </span>
        ))}
      </>
    );
  };

  return (
    <div className={`}`} ref={containerRef}>
      <div className="p-5">
        <span className="block font-semibold text-xl sm:text-2xl">
          {/* {headingText} */}
          Location
        </span>
        <div className="relative mt-5">
          <input
            className={`block w-full bg-transparent border border-1 focus:ring-0 p-2 rounded-md focus:outline-none focus:placeholder-neutral-300 xl:text-lg font-semibold placeholder-neutral-800 truncate`}
            placeholder={placeHolder}
            value={value}
            // autoFocus={showPopover}
            onChange={handleChange}
            ref={inputRef}
          />
          <span className="absolute right-2.5 top-1/2 -translate-y-1/2">
            <MagnifyingGlassIcon className="w-5 h-5 text-neutral-700 " />
          </span>
        </div>
        <div className="mt-7">
          {value ? renderSearchResults() : renderRecentSearches()}
        </div>
      </div>
    </div>
  );
};

export default StayLocationMobile;
