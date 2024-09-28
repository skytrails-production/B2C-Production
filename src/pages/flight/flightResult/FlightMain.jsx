import React, { useState, useEffect, useCallback } from "react";
import FlightResult from "./FlightResult";
import FlightBigFilter from "./FlightBigFilter";
import FlightSmallFilter from "./FlightSmallFilter";
import FlightSleletonBig from "./FlightSkeleton/FlightSleletonBig";
import FlightSleletonBigRight from "./FlightSkeleton/FlightSleletonBigRight";
// import flightData from "./FlightData";
import moment from "moment";
import Oneway2 from "../../../components/Oneway2";
import { useSelector } from "react-redux";
import { EditOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import SmallSkeleton from "../../NewPackagePages/HolidayPackageSearchResult/holidayresultSkeletonPage/HoliResFilterSmall";
import NoResult from "../../../components/NoFlightResult";
import "./flightMain.scss";
import dayjs from "dayjs";
const FlightMain = () => {
  const navigate = useNavigate();
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [airlineCodes, setAirlineCodes] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [priceRange, setPriceRange] = useState([0, 0]);
  const [loader, setLoader] = useState(true);
  const [loaderFilter, setLoaderFilter] = useState(true);
  const [airlines, setAirlines] = useState([]);
  const [airports, setAirports] = useState([]);

  const reducerState = useSelector((state) => state);
  const flightData = reducerState?.oneWay?.oneWayData?.data?.result;
  const flightDetails = reducerState?.searchFlight?.flightDetails;
  // console.log(reducerState, flightData, flightDetails, "flightData");
  const dateStr = flightDetails?.departureDate;

  // Parse the date string using Day.js
  const date = dayjs(dateStr);

  // Format the date as "DD MMM"
  const formattedDate = date.format("DD MMM");

  const location = useLocation();
  const queryParams = new URLSearchParams(location?.search);
  const adultCount = queryParams.get("adult");
  const childCount = queryParams.get("child");
  const infantCount = queryParams.get("infant");
  useEffect(() => {
    setAirlines(reducerState?.flightList?.flightDetails);
    setAirports(reducerState?.flightList?.aireportList);
  }, [
    reducerState?.flightList?.flightDetails,
    reducerState?.flightList?.aireportList,
  ]);
  useEffect(() => {
    // console.log(
    //   reducerState?.oneWay,
    //   "reducerState?.oneWay?.isLoadingmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm"
    // );
    if (reducerState?.oneWay?.isLoading) {
      setLoader(true);
    } else {
      setLoader(false);
    }
    if (reducerState?.oneWay?.isLoadingFilter) {
      setLoaderFilter(true);
    } else {
      setLoaderFilter(false);
    }
  }, [reducerState?.oneWay]);

  const calculatePriceRange = useCallback((data) => {
    let min = Infinity;
    let max = -Infinity;

    data.forEach((flight) => {
      let price = 0;

      if (flight.Fare) {
        price = flight.Fare.BaseFare;
      } else if (flight.monetaryDetail) {
        price = parseInt(flight.monetaryDetail[0].amount, 10);
      }

      min = Math.min(min, price);
      max = Math.max(max, price);
    });

    setMinPrice(min);
    setMaxPrice(max);
    setPriceRange([min, max]);
  }, []);

  useEffect(() => {
    if (flightData?.length > 0) {
      calculatePriceRange(flightData);

      const codes = new Set();

      flightData.forEach((flight) => {
        if (flight?.Segments) {
          flight?.Segments?.[0].forEach((segment) => {
            codes.add(segment?.Airline?.AirlineCode);
          });
        } else if (flight?.flightDetails) {
          const flightDetailsArray = Array.isArray(flight?.flightDetails)
            ? flight?.flightDetails
            : [flight?.flightDetails];

          flightDetailsArray.forEach((detail) => {
            codes.add(detail?.flightInformation?.companyId?.marketingCarrier);
          });
        }
      });

      setAirlineCodes(Array.from(codes));
      setFilteredFlights(flightData);
    }
  }, [flightData, calculatePriceRange]);

  const handleFilter = useCallback(
    (
      selectedCodes,
      selectedStops,
      priceRange,
      selectedTimes,
      selectedArrivalTimes
    ) => {
      const filtered = flightData?.filter((flight) => {
        let airlineCodes = [];
        let stops = 0;
        let price = 0;
        let departureTime = "";
        let arrivalTime = "";
        let normalizedDepartureTime = "";
        let normalizedArrivalTime = "";

        if (flight?.Segments) {
          airlineCodes = flight?.Segments[0].map(
            (segment) => segment.Airline.AirlineCode
          );
          stops = flight.Segments[0].length - 1;
          price = flight.Fare?.BaseFare || 0;
          departureTime = flight.Segments?.[0]?.[0]?.Origin?.DepTime || "";
          normalizedDepartureTime = dayjs(departureTime).format("HH:mm");

          // Determine the correct arrival time
          if (flight.Segments[0].length === 1) {
            arrivalTime = flight.Segments[0][0]?.Destination?.ArrTime || "";
          } else {
            const lastSegment =
              flight.Segments[0][flight.Segments[0].length - 1];
            arrivalTime = lastSegment?.Destination?.ArrTime || "";
          }
          normalizedArrivalTime = dayjs(arrivalTime).format("HH:mm");
        } else if (flight?.flightDetails) {
          const flightDetailsArray = Array.isArray(flight.flightDetails)
            ? flight.flightDetails
            : [flight.flightDetails];

          airlineCodes = flightDetailsArray.map(
            (detail) => detail.flightInformation.companyId.marketingCarrier
          );
          stops = flightDetailsArray.length - 1;
          price = parseInt(flight.monetaryDetail[0]?.amount || 0, 10);
          departureTime =
            flightDetailsArray[0]?.flightInformation?.productDateTime
              ?.timeOfDeparture || "";

          // Determine the correct arrival time
          if (flightDetailsArray.length === 1) {
            arrivalTime =
              flightDetailsArray[0]?.flightInformation?.productDateTime
                ?.timeOfArrival || "";
          } else {
            const lastFlightDetail =
              flightDetailsArray[flightDetailsArray.length - 1];
            arrivalTime =
              lastFlightDetail?.flightInformation?.productDateTime
                ?.timeOfArrival || "";
          }
          normalizedDepartureTime = moment(departureTime, [
            "HH:mm",
            "h:mm A",
          ]).format("HH:mm");
          // Normalize departure and arrival times using moment

          normalizedArrivalTime = moment(arrivalTime, [
            "HH:mm",
            "h:mm A",
          ]).format("HH:mm");
        }

        const matchCodes =
          selectedCodes?.length === 0 ||
          selectedCodes.some((code) => airlineCodes.includes(code));

        const matchStops =
          selectedStops?.length === 0 || selectedStops.includes(stops);

        const matchPrice = price >= priceRange[0] && price <= priceRange[1];
        // console.log(selectedTimes, "selectedTimes")
        const matchTime =
          selectedTimes.length === 0 ||
          selectedTimes.some((timeRange) => {
            // console.log(timeRange, "timeRangeeeeeee")
            const [startHour, endHour] = timeRange;
            const flightHour = parseInt(
              normalizedDepartureTime.split(":")[0],
              10
            );
            // if (flight?.Segments?.[0]?.[0]?.Origin?.DepTime) {

            // console.log(normalizedDepartureTime,"===",departureTime, flight?.Segments?.[0]?.[0]?.Origin?.DepTime, flightHour, startHour, endHour, flightHour < endHour, "normalizedDepartureTime")
            // }

            return flightHour >= startHour && flightHour < endHour;
          });
        // const matchTime = selectedTimes.length === 0 ||
        //     selectedTimes.some((timeRange) => {
        //         console.log(timeRange, "timeRangeeeeeee");
        //         const [startHour, endHour] = timeRange;
        //         const flightHour = parseInt(normalizedDepartureTime.split(":")[0], 10);

        //         // Handle case where endHour is 24 (i.e., crossing midnight)
        //         if (endHour === 24) {
        //             return flightHour >= startHour || flightHour < endHour;
        //         }

        //         return flightHour >= startHour && flightHour < endHour;
        //     });

        const matchArrivalTime =
          selectedArrivalTimes?.length === 0 ||
          selectedArrivalTimes.some((timeRange) => {
            const [startHour, endHour] = timeRange;
            const flightHour = parseInt(
              normalizedArrivalTime.split(":")[0],
              10
            );

            return flightHour >= startHour && flightHour < endHour;
          });

        return (
          matchCodes &&
          matchStops &&
          matchPrice &&
          matchTime &&
          matchArrivalTime
        );
      });

      setFilteredFlights(filtered);
    },
    [flightData]
  );
  const travller =
    Number(adultCount) + Number(childCount) + Number(infantCount);

  return (
    <div>
      {/* <div className="flightMainOneWayDiv visibleBig "> */}
      <div className="mainimgHotelSearchResult visibleBigHotel">
        <Oneway2 />
      </div>
      {/* </div> */}
      <div className=" visibleSmall stickyHotelDetails">
        <section
          style={{ borderTop: "1px solid lightgray", background: "white" }}
        >
          <div className="container ">
            <div className="smallHotelEditBox">
              <div className="smallHotelEditDetails">
                <p>{`${flightDetails?.from?.name}-${flightDetails?.to?.name}`}</p>
                <span>
                  {formattedDate} |{travller == 1 ? "Room" : "Rooms"} |{" "}
                  {travller} Guests
                </span>
              </div>
              <div
                onClick={() => {
                  navigate("/");
                }}
              >
                <EditOutlined />
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="container mt-3">
        {reducerState?.oneWay?.isError && !loaderFilter && <NoResult />}
        {!reducerState?.oneWay?.isError && (
          <div className="row">
            <div className="col-lg-3 visibleBig p-0">
              {loaderFilter ? (
                <FlightSleletonBig />
              ) : (
                <FlightBigFilter
                  airlineCodes={airlineCodes}
                  minPrice={minPrice}
                  maxPrice={maxPrice}
                  priceRange={priceRange}
                  onFilter={handleFilter} // Passing handleFilter as prop
                />
              )}
            </div>

            <div className="col-lg-12 visibleSmall stikcyHotelFilter">
              {loaderFilter || (!filteredFlights) ? (
                <SmallSkeleton />
              ) : (
                <FlightSmallFilter
                  airlineCodes={airlineCodes}
                  minPrice={minPrice}
                  maxPrice={maxPrice}
                  priceRange={priceRange}
                  onFilter={handleFilter}
                />
              )}
            </div>
            <div className="col-lg-9">
              {loader || (!filteredFlights) ? (
                <FlightSleletonBigRight />
              ) : (
                <FlightResult
                  flights={filteredFlights}
                  airlineCodes={airlineCodes}
                  minPrice={minPrice}
                  maxPrice={maxPrice}
                  priceRange={priceRange}
                  onFilter={handleFilter}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightMain;
