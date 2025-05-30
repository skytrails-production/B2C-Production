import React, { useState, useEffect } from "react";
import HotelResult from "./HotelResult";
import { useSelector } from "react-redux";
import { FaPen } from "react-icons/fa";
import HotelFilterBox from "./HotelFilterBox";
import { EditOutlined } from "@ant-design/icons";
import HolidayResultSkeleton from "../NewPackagePages/HolidayPackageSearchResult/holidayresultSkeletonPage/HolidayResultSkeleton";
// import HotelMobileFilter from "./HotelMobileFilter";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { apiURL } from "../../Constants/constant";
import ResultSearchForm from "./resultSearchForm/ResultSearchForm";
// import HotelResultProgressLoader from "./HotelResultProgressLoader";
import BlurredLoader from "../../components/BlurredLoader";
import { Helmet } from "react-helmet-async";

const HotelResultMain = () => {
  const reducerState = useSelector((state) => state);
  const [loader, setLoader] = useState(true);
  const [hotelData, setHotelData] = useState([]);
  const navigate = useNavigate();
  const grnPayload = JSON.parse(sessionStorage.getItem("revisithotel"));
  const cityCode = JSON.parse(sessionStorage.getItem("grnPayload"));
  // const [secondLoader, setSecondLoader] = useState(false);

  useEffect(() => {
    if (
      reducerState?.hotelSearchResultGRN?.ticketData?.data?.data?.hotels
        ?.length > 0
    ) {
      setHotelData(
        reducerState?.hotelSearchResultGRN?.ticketData?.data?.data?.hotels
      );
      setLoader(false);
      // setSecondLoader(true);
    } else if (
      reducerState?.hotelSearchResultGRN?.ticketData?.data?.data
        ?.no_of_hotels == 0
    ) {
      setLoader(false);
      // setSecondLoader(true);
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

  // console.log(reducerState, "reducer state in the result main");

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
    return (
      <>
        <BlurredLoader />
        <HolidayResultSkeleton />
      </>
    );
  }

  let totalAdults = 0;
  let totalChildren = 0;

  grnPayload?.[0]?.rooms?.forEach((room) => {
    totalAdults += room?.adults || 0;
    totalChildren += room?.children_ages?.length || 0;
  });

  return (
    <>
      <Helmet>
        {/* <title>
              The Skytrails - Hotel Booking, Flight Booking, Bus Booking
            </title>
            <link rel="canonical" href="/hotel" />
            <meta name="description" content="hotel" />
            <meta
              name="keywords"
              content="hotel,romantic getaways,family-hotels,luxury hotels,budget-friendly accommodations,pet-friendly hotels ,book hotels online,hotel deals,best hotel offers,last minute hotel booking,compare hotel prices "
            /> */}
        <title>
          Discover the Best Hotel Offers and Save More with The SkyTrails
        </title>
        <meta
          name="description"
          content="Find your dream stay with The SkyTrails. Book cheap, budget, and luxury hotels at the best prices. Enjoy free cancellations and a smooth booking experience."
        />
        <meta name="robots" content="INDEX, FOLLOW" />

        <meta property="og:site_name" content="The SkyTrails" />
        <meta property="og:url" content="https://theskytrails.com/st-hotel" />
        <meta
          property="og:image"
          content="https://theskytrails.com/static/media/hotelBeach.688b493455328b1dfb64.jpg"
        />
        <meta
          property="og:description"
          content="Find your dream stay with The SkyTrails. Book cheap, budget, and luxury hotels at the best prices. Enjoy free cancellations and a smooth booking experience."
        />
        <meta charSet="utf-8" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Discover the Best Hotel Offers and Save More with The SkyTrails"
        />

        <meta name="package_type" content="Flight" />
        <meta
          name="keywords"
          content="Cheap hotel booking for honeymoon couples, family holiday hotels, international stays, luxury lodging options, discount accommodation packages."
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Discover the Best Hotel Offers and Save More with The SkyTrails"
        />
        <meta
          name="twitter:description"
          content="Find your dream stay with The SkyTrails. Book cheap, budget, and luxury hotels at the best prices. Enjoy free cancellations and a smooth booking experience."
        />
        <meta
          name="twitter:image"
          content="https://theskytrails.com/static/media/logoSky.63ff4d7e95a8ed4a90ba8f28c3b8958a.svg"
        />
        <meta name="twitter:image:alt" content="The SkyTrails logo" />
        <meta name="twitter:creator" content="@Theskytrails" />
        <meta name="twitter:site" content="@Theskytrails" />

        <link
          rel="shortcut icon"
          href="https://theskytrails.com/favicon.ico"
          type="image/x-icon"
        />
        <link
          rel="icon"
          href="https://theskytrails.com/favicon.ico"
          type="image/x-icon"
        />
        <link rel="canonical" href="https://theskytrails.com/st-hotel" />
      </Helmet>
      <div className="bg-indigo-50">
        {/* <div className="visibleBigHotel">
        <ResultSearchForm toggleLoader={toggleLoader} />
      </div> */}
        <div className=" sticky top-0 left-0 z-40 hidden md:flex  w-full z-3 bg-gradient-to-b from-primary-6000 via-primary-6000 to-primary-6000">
          {/* <Oneway2 /> */}
          <div className="container p-2 flex justify-center items-center">
            <ResultSearchForm toggleLoader={toggleLoader} />
          </div>
        </div>
        {/* <HotelResultProgressLoader /> */}
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
    </>
  );
};

export default HotelResultMain;
