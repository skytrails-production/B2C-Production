import React, { useState, useEffect, useCallback } from "react";
import FlightResult from "./FlightResult";
import FlightBigFilter from "./FlightBigFilter";
import FlightSmallFilter from "./FlightSmallFilter";
import FlightSleletonBig from "./FlightSkeleton/FlightSleletonBig";
import FlightSleletonBigRight from "./FlightSkeleton/FlightSleletonBigRight";
// import flightData from "./FlightData";
import moment, { duration } from "moment";
import Oneway2 from "../../../components/Oneway2";
import { useSelector } from "react-redux";
import { EditOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import SmallSkeleton from "../../NewPackagePages/HolidayPackageSearchResult/holidayresultSkeletonPage/HoliResFilterSmall";
import NoResult from "../../../components/NoFlightResult";
import "./flightMain.scss";
import dayjs from "dayjs";
import { findCheapestFlights } from "../../../utility/Duplicateremoveflight";
const FlightMain = () => {
  const navigate = useNavigate();
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [airlineCodes, setAirlineCodes] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [priceRange, setPriceRange] = useState([0, 0]);
  const [minDuration, setMinDuration] = useState(0);
  const [maxDuration, setMaxDuration] = useState(1200);
  const [durationRange, setDurationRange] = useState([0, 1200]);
  const [loader, setLoader] = useState(true);
  const [loaderFilter, setLoaderFilter] = useState(true);
  const [airlines, setAirlines] = useState([]);
  const [airports, setAirports] = useState([]);
  // Set default duration range

  // Function to convert time string (e.g. "0320") to minutes
  const timeStringToMinutes = (timeStr) => {
    const hours = parseInt(timeStr.slice(0, 2));
    const minutes = parseInt(timeStr.slice(2, 4));
    return hours * 60 + minutes;
  };

  // Function to convert duration string (e.g. "0d:8h:10m") to minutes
  const parseDurationString = (durationStr) => {
    const dayMatch = durationStr.match(/(\d+)d/);
    const hourMatch = durationStr.match(/(\d+)h/);
    const minuteMatch = durationStr.match(/(\d+)m/);

    const days = dayMatch ? parseInt(dayMatch[1]) : 0;
    const hours = hourMatch ? parseInt(hourMatch[1]) : 0;
    const minutes = minuteMatch ? parseInt(minuteMatch[1]) : 0;

    return days * 24 * 60 + hours * 60 + minutes;
  };

  // Function to extract duration from different formats
  const extractDuration = (flight) => {
    if (flight.flightDetails) {
      // Handle the first and second type of API response
      return flight.flightDetails.flightInformation
        ? timeStringToMinutes(
            flight.flightDetails.flightInformation.attributeDetails
              .attributeDescription
          )
        : flight.flightDetails.reduce(
            (acc, fd) =>
              acc +
              timeStringToMinutes(
                fd.flightInformation.attributeDetails.attributeDescription
              ),
            0
          );
    } else if (flight.Dur) {
      // Handle the third type of response (Dur string, e.g. "0d:8h:10m")
      return parseDurationString(flight.Dur);
    } else if (flight.Segments) {
      // Handle the fourth type of API response
      return flight.Segments[0].reduce((acc, seg) => acc + seg.Duration, 0);
    }
    return 0;
  };

  // Filter flights based on duration

  const reducerState = useSelector((state) => state);
  const flightData = reducerState?.oneWay?.oneWayData?.data?.result;
  const flightDetails = reducerState?.searchFlight?.flightDetails;
  // console.log(reducerState, flightData, flightDetails, "flightData");
  const dateStr = flightDetails?.departureDate;

  // Parse the date string using Day.js
  const date = dayjs(dateStr);

  // console.log(reducerState,"reducerStatereducerStatereducerStatereducerStatereducerState");

  // Format the date as "DD MMM"
  const formattedDate = date.format("DD MMM");

  const location = useLocation();
  const queryParams = new URLSearchParams(location?.search);
  const adultCount = queryParams.get("adult");
  const childCount = queryParams.get("child");
  const infantCount = queryParams.get("infant");
  function formatDuration(durationMinutes) {
    const hours = Math.floor(durationMinutes / 60); // Get whole hours

    return hours; // Return formatted string
  }
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
    let minDur = Infinity;
    let maxDur = -Infinity;

    data.forEach((flight) => {
      let price = 0;
      let dur = 0;
      //  console.log(flight?.ADate,"pricekafila0");

      if (flight?.Segments) {
        price = flight?.Fare?.BaseFare;
      } else if (flight?.monetaryDetail) {
        price = parseInt(flight.monetaryDetail[0].amount, 10);
      } else if (flight?.ADate) {
        price = flight?.Fare?.BasicTotal;
      }
      dur = extractDuration(flight);

      // console.log(flight?.Fare?.BasicTotal,"flight?.Fare?.BasicTotal");

      min = Math.min(min, price);
      max = Math.max(max, price);
      minDur = formatDuration(Math.min(minDur, dur));
      maxDur = formatDuration(Math.max(maxDur, dur));
    });

    setMinPrice(min);
    setMaxPrice(max);
    setPriceRange([min, max]);
    setMinDuration(minDur);
    setMaxDuration(maxDur);
    setDurationRange([minDur, maxDur]);
    // console.log(minDur, maxDur, "minmaxduration");
  }, []);

  // console.log(flightData, "flightDataflightDataflightDataflightDataflightDataflightDataflightDataflightDataflightData");

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
        } else if (flight?.ADate) {
          flight?.Itinerary?.forEach((segment) => {
            codes.add(segment?.FCode);
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
      selectedArrivalTimes,
      durationRange
    ) => {
      const filtered = flightData?.filter((flight) => {
        // console.log(flight,"flightflightflightflightflightflightflightflightflightflightflight");
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
        } else if (flight?.ADate) {
          // console.log("kafilaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
          airlineCodes = flight?.Itinerary.map(
            (segment) => (segment?.FCode).split(",")[0]
          );
          // console.log(airlineCodes,"airlineCodesairlineCodesairlineCodesairlineCodes");
          stops = flight?.Itinerary.length - 1;

          // console.log(stops,"stopsstopsstopsstopsstopsstops");
          price = flight?.Fare?.BasicTotal || 0;

          // console.log(price, "price");
          departureTime = flight?.DDate || "";

          normalizedDepartureTime = dayjs(departureTime).format("HH:mm");
          // console.log(normalizedDepartureTime,"departureTimedepartureTimedepartureTimedepartureTime");

          if (flight?.Itinerary.length === 1) {
            arrivalTime = flight?.ADate || "";
          } else {
            const lastSegment = flight?.Itinerary[flight?.Itinerary.length - 1];
            arrivalTime = lastSegment?.ADate || "";
          }
          normalizedArrivalTime = dayjs(arrivalTime).format("HH:mm");

          // console.log(normalizedArrivalTime,"normalizedArrivalTimenormalizedArrivalTime");
        }

        const matchCodes =
          selectedCodes?.length === 0 ||
          selectedCodes?.some((code) => airlineCodes.includes(code));

        // console.log(selectedCodes,"matchCodesmatchCodesmatchCodes");

        const matchStops =
          selectedStops?.length === 0 || selectedStops.includes(stops);

        const matchPrice = price >= priceRange[0] && price <= priceRange[1];
        const duration = formatDuration(extractDuration(flight));

        const matchDuration =
          duration >= durationRange?.[0] && duration <= durationRange?.[1];

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
            // console.log(timeRange, "timeRange");
            const [startHour, endHour] = timeRange;
            const flightHour = parseInt(
              normalizedArrivalTime.split(":")[0],
              10
            );

            return flightHour >= startHour && flightHour < endHour;
          });

        // console.log("matchArrivalTime",matchArrivalTime);
        return (
          matchCodes &&
          matchStops &&
          matchPrice &&
          matchTime &&
          matchArrivalTime &&
          matchDuration
        );
      });
      // console.log(filtered, "filteredfilteredfilteredfilteredfilteredhojaaaaaaaaaaaaaaaaaaaaaaaaaa");
      setFilteredFlights(filtered);
    },
    [flightData]
  );

  const travller =
    Number(adultCount) + Number(childCount) + Number(infantCount);

  const sortedFlights = filteredFlights?.sort((a, b) => {
    const baseFare =
      a?.Fare?.BaseFare || a?.Fare?.BasicTotal || a?.TotalPublishFare || 0;
    const baseFare2 =
      b?.Fare?.BaseFare || b?.Fare?.BasicTotal || b?.TotalPublishFare || 0;
    const totalPublishFareA = a?.TotalPublishFare || 0;
    const totalPublishFareB = b?.TotalPublishFare || 0;
    const basicTotalA = a?.Fare?.BasicTotal || 0;
    const basicTotalB = b?.Fare?.BasicTotal || 0;

    if (baseFare !== baseFare2) {
      return baseFare - baseFare2;
    } else if (totalPublishFareA !== totalPublishFareB) {
      return totalPublishFareA - totalPublishFareB;
    } else {
      return basicTotalA - basicTotalB;
    }
  });

  return (
    <div>
      {/* <div className="flightMainOneWayDiv visibleBig "> */}
      <div className="mainimgFlightSearchResult visibleBigHotel">
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
                  minDuration={minDuration}
                  maxDuration={maxDuration}
                  durationRange={durationRange}
                  onFilter={handleFilter}

                  // Passing handleFilter as prop
                />
              )}
            </div>

            <div className="col-lg-12 visibleSmall stikcyHotelFilter">
              {loaderFilter || !filteredFlights ? (
                <SmallSkeleton />
              ) : (
                <FlightSmallFilter
                  airlineCodes={airlineCodes}
                  minPrice={minPrice}
                  maxPrice={maxPrice}
                  priceRange={priceRange}
                  minDuration={minDuration}
                  maxDuration={maxDuration}
                  durationRange={durationRange}
                  onFilter={handleFilter}
                />
              )}
            </div>
            <div className="col-lg-9">
              {loader || !filteredFlights ? (
                <FlightSleletonBigRight />
              ) : (
                <FlightResult
                  flights={sortedFlights}
                  // flights={filteredFlights}
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
