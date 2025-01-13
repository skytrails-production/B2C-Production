import React, { useState, useEffect } from "react";
import HotelResult from "./HotelResult";
import { useSelector } from "react-redux";
import { FaPen } from "react-icons/fa";
import HotelFilterBox from "./HotelFilterBox";
import { EditOutlined } from "@ant-design/icons";
import HolidayResultSkeleton from "../NewPackagePages/HolidayPackageSearchResult/holidayresultSkeletonPage/HolidayResultSkeleton";
import HotelMobileFilter from "./HotelMobileFilter";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { apiURL } from "../../Constants/constant";
import ResultSearchForm from "./resultSearchForm/ResultSearchForm";

const HotelResultMain = () => {
  const reducerState = useSelector((state) => state);
  const [loader, setLoader] = useState(true);
  const [hotelData, setHotelData] = useState([]);
  const navigate = useNavigate();
  const grnPayload = JSON.parse(sessionStorage.getItem("revisithotel"));
  const cityCode = JSON.parse(sessionStorage.getItem("grnPayload"));

  useEffect(() => {
    if (
      reducerState?.hotelSearchResultGRN?.ticketData?.data?.data?.hotels
        ?.length > 0
    ) {
      setHotelData(
        reducerState?.hotelSearchResultGRN?.ticketData?.data?.data?.hotels
      );
      setLoader(false);
    } else if (
      reducerState?.hotelSearchResultGRN?.ticketData?.data?.data
        ?.no_of_hotels == 0
    ) {
      setLoader(false);
    }
  }, [reducerState?.hotelSearchResultGRN?.ticketData]);

  const getMinMaxPrices = (hotels) => {
    const validHotels = hotels.filter(
      (hotel) => hotel && hotel.min_rate && hotel.min_rate.price
    );

    if (validHotels.length === 0) {
      return { min: 0, max: 0 };
    }

    const prices = validHotels.map((hotel) => hotel.min_rate.price);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
    };
  };

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 0]);
  const [sortBy, setSortBy] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [errors, setErrors] = useState(false);
  const [locations, setLocations] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const { min, max } = getMinMaxPrices(hotelData);

  useEffect(() => {
    setPriceRange([min, max]);
  }, [min, max]);

  useEffect(() => {
    fetch(
      `${apiURL.baseURL}/skyTrails/grnconnect/locationamelist?cityCode=${cityCode?.cityCode}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setLocations(data.data);
        }
      })
      .catch((error) => console.error("Error fetching locations:", error));
  }, [cityCode?.cityCode]);

  const handleCategoryChange = (categories) => {
    setSelectedCategories(categories);
  };

  const handlePriceChange = (value) => {
    setPriceRange(value);
  };

  const handleSortChange = (sort) => {
    setSortBy(sort);
  };

  const handleSearchTermChange = (term) => {
    setSearchTerm(term);
  };

  const handleLocationChange = (locations) => setSelectedLocations(locations);

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([min, max]);
    setSortBy(null);
    setSearchTerm("");
    setSelectedLocations([]);
  };

  useEffect(() => {
    if (
      reducerState?.hotelSearchResultGRN?.ticketData?.data?.data?.errors?.[0]
        ?.code == "1501"
    ) {
      setErrors(true);
    } else if (
      reducerState?.hotelSearchResultGRN?.ticketData?.data?.data
        ?.no_of_hotels == 0
    ) {
      setErrors(true);
    } else if (
      reducerState?.hotelSearchResultGRN?.ticketData?.data?.data?.errors?.[0]
        ?.code == "5111"
    ) {
      setErrors(true);
    } else {
      setErrors(false);
    }
  }, [reducerState?.hotelSearchResultGRN?.ticketData?.data?.data]);

  const toggleLoader = () => {
    setLoader(true);
  };

  if (loader) {
    return <HolidayResultSkeleton />;
  }

  let totalAdults = 0;
  let totalChildren = 0;

  grnPayload?.[0]?.rooms?.forEach((room) => {
    totalAdults += room?.adults || 0;
    totalChildren += room?.children_ages?.length || 0;
  });

  console.log(reducerState, "reducer in the hotel resultttttt");

  return (
    <div>
      <div className="visibleBigHotel">
        <ResultSearchForm toggleLoader={toggleLoader} />
      </div>
      <div className=" visibleSmall stickyHotelDetails">
        <section
          style={{ borderTop: "1px solid lightgray", background: "white" }}
        >
          <div className="container ">
            <div className="smallHotelEditBox">
              <div className="smallHotelEditDetails">
                <p>{grnPayload?.[0]?.cityName}</p>
                <span>
                  {dayjs(grnPayload?.[0]?.checkin).format("DD MMM")}-
                  {dayjs(grnPayload?.[0]?.checkout).format("DD MMM")} |{" "}
                  {grnPayload?.[0]?.rooms?.length}{" "}
                  {grnPayload?.[0]?.rooms.length == 0 ? "Room" : "Rooms"} |{" "}
                  {Number(totalAdults) + Number(totalChildren)} Guests
                </span>
              </div>
              <div
                onClick={() => {
                  navigate("/st-hotel");
                }}
              >
                <EditOutlined />
              </div>
            </div>
          </div>
        </section>
      </div>

      {loader ? (
        <HolidayResultSkeleton />
      ) : (
        <div className="container">
          {errors ? (
            <div className="mb-64 mt-10 text-center">
              <h1 className="text-xl md:text-3xl lg:text-3xl xl:text-3xl font-bold text-gray-900">
                No result found for the requested search criteria !
              </h1>
              <p className="text-red-600 flex items-center gap-2 justify-center">
                Please Modify Your search <FaPen />
              </p>
            </div>
          ) : (
            <div className="row pt-4">
              <div className=" col-lg-3 visibleBig p-0">
                <HotelFilterBox
                  onCategoryChange={handleCategoryChange}
                  onPriceChange={handlePriceChange}
                  onSortChange={handleSortChange}
                  onSearchTermChange={handleSearchTermChange}
                  onClearFilters={handleClearFilters}
                  minPrice={min}
                  maxPrice={max}
                  searchTerm={searchTerm}
                  selectedCategories={selectedCategories}
                  priceRange={priceRange}
                  sortBy={sortBy}
                  onLocationChange={handleLocationChange}
                  locations={locations}
                  selectedLocations={selectedLocations}
                />
              </div>

              {/* <div className="col-lg-12 visibleSmall stikcyHotelFilter">
                <HotelMobileFilter
                  onCategoryChange={handleCategoryChange}
                  onPriceChange={handlePriceChange}
                  onSortChange={handleSortChange}
                  onSearchTermChange={handleSearchTermChange}
                  onClearFilters={handleClearFilters}
                  minPrice={min}
                  maxPrice={max}
                  searchTerm={searchTerm}
                  selectedCategories={selectedCategories}
                  priceRange={priceRange}
                  sortBy={sortBy}
                />
              </div> */}

              <div className=" col-lg-9 col-md-12 ">
                <HotelResult
                  hotels={hotelData}
                  selectedCategories={selectedCategories}
                  priceRange={priceRange}
                  sortBy={sortBy}
                  searchTerm={searchTerm}
                  selectedLocations={selectedLocations}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HotelResultMain;
