import React, { useCallback, useEffect, useState } from "react";
import ReturnFlightResult from "./ReturnFlightResult";
import ReturnFlightSleletonBigRight from "./ReturnFlightSleletonBigRight";
import ReturnFlightSmallFilter from "./ReturnFlightSmallFilter";
import ReturnSmallSkeleton from "./ReturnSmallSkeleton";
import ReturnFlightBigFilter from "./ReturnFlightBigFilter";
import ReturnFlightSleletonBig from "./ReturnFlightSleletonBig";
import NoFlightResult from "../../../../components/NoFlightResult";
import { EditOutlined } from "@ant-design/icons";
import Oneway2 from "../../../../components/Oneway2";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ReturnSearchForm from "../../../../components/TailwindSearchComp/heroSection/flightSearchForm/returnSearchForm/ReturnSearchForm";
import ReturnSearchResultForm from "../../../../components/TailwindSearchComp/heroSection/flightSearchForm/returnSearchForm/ReturnSearchResultForm";
import { clearAllFareQuotesRuleAirsel } from "../../../../Redux/FareQuoteRuleAirsel/actionFlightQuoteRuleAirsel";

const ReturnFlightMain = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [isPrice, setIsprice] = useState(true);
  const [loaderFilter, setLoaderFilter] = useState(false);
  const reducerState = useSelector((state) => state);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [airlineCodes, setAirlineCodes] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [minDuration, setMinDuration] = useState(0);
  const [maxDuration, setMaxDuration] = useState(1200);
  const [durationRange, setDurationRange] = useState([0, 1200]);
  const [airlines, setAirlines] = useState([]);
  const [airports, setAirports] = useState([]);
  const [stopsAirline, setStopsAirline] = useState(null);
  const [standardizedFlights1, setStandardizedFlights1] = useState(
    reducerState?.return?.returnData?.[0]?.journeyFlight ||
      reducerState?.return?.returnData?.journeyFlight ||
      []
  );
  const [standardizedFlights2, setStandardizedFlights2] = useState(
    reducerState?.return?.returnData?.[0]?.returnFlight ||
      reducerState?.return?.returnData?.returnFlight ||
      []
  );

  const [jornyFlights, setJornyFlights] = useState([]);
  const [retrunFlights, setReturnFlights] = useState([]);

  const calculatePriceRange = (data) => {
    let min = Infinity;
    let max = -Infinity;
    let minDur = Infinity;
    let maxDur = -Infinity;
    let stopes = {
      nonStop: { count: 0, minPrice: Infinity },
      oneStop: { count: 0, minPrice: Infinity },
      moreThanOneStop: { count: 0, minPrice: Infinity },
    };
    let stopesReturn = {
      nonStop: { count: 0, minPrice: Infinity },
      oneStop: { count: 0, minPrice: Infinity },
      moreThanOneStop: { count: 0, minPrice: Infinity },
    };
    let Airlines = {};
    const findStopes = (flight, stopes) => {
      if (flight.stopes == 0) {
        let count = stopes.nonStop.count + 1;
        let flightPrice = flight.price;
        let stopPrice = stopes.nonStop.minPrice;
        let stopMinPrice = Math.min(stopPrice, flightPrice);
        stopes.nonStop = { count: count, minPrice: stopMinPrice };
      } else if (flight.stopes == 1) {
        let count = stopes.oneStop.count + 1;
        let flightPrice = flight.price;
        let stopPrice = stopes.oneStop.minPrice;
        let stopMinPrice = Math.min(stopPrice, flightPrice);
        stopes.oneStop = { count: count, minPrice: stopMinPrice };
      } else {
        let count = stopes.moreThanOneStop.count + 1;
        let flightPrice = flight.price;
        let stopPrice = stopes.moreThanOneStop.minPrice;
        let stopMinPrice = Math.min(stopPrice, flightPrice);
        stopes.moreThanOneStop = { count: count, minPrice: stopMinPrice };
      }
    };
    const findAireLine = (flight, Airlines, price) => {
      let flightName = flight?.flightName;
      if (!Airlines[flightName]) {
        Airlines[flightName] = { count: 0, minPrice: Infinity };
      }
      Airlines[flightName].count++;
      Airlines[flightName].minPrice = Math.min(
        Airlines[flightName].minPrice,
        price
      );
    };
    standardizedFlights1?.forEach((flight) => {
      let price = flight?.price;
      let dur = flight?.layover;

      // console.log(flight, "calculatePriceRange");
      min = Math.min(min, price);
      max = Math.max(max, price);
      findStopes(flight, stopes);
      findAireLine(flight, Airlines, price);

      //duration baad mai krung
    });
    standardizedFlights2?.forEach((flight) => {
      let price = flight?.price;
      let dur = flight?.layover;
      // console.log(flight, "calculatePriceRange");
      min = Math.min(min, price);
      max = Math.max(max, price);
      findStopes(flight, stopesReturn);
      findAireLine(flight, Airlines, price);
      //duration baad mai krung
    });
    let newStopsAirline = {
      JourneyStopes: stopes,
      ReturnStopes: stopesReturn,
      Airlines: Airlines,
    };
    // console.log(newStopsAirline, "newStopsAirline");
    setMinPrice(min);
    setMaxPrice(max);
    setPriceRange([min, max]);
    setMinDuration(minDur);
    setMaxDuration(maxDur);
    setDurationRange([minDur, maxDur]);
    setStopsAirline(newStopsAirline);
  };
  const handleFilter = useCallback(
    (
      selectedCodes,
      selectedStops,
      priceRange,
      selectedTimes,
      selectedArrivalTimes,
      durationRange,
      selectedStopsReturn,
      selectedTimesReturn,
      selectedArrivalTimesReturn,
      airlineCodes
    ) => {
      // console.log(
      //   selectedStops,
      //   priceRange,
      //   selectedTimes,
      //   selectedArrivalTimes,

      //   selectedStopsReturn,
      //   selectedTimesReturn,
      //   selectedArrivalTimesReturn,
      //   airlineCodes,
      //   "selectedStops"
      // );
      if (Array.isArray(standardizedFlights1)) {
        const filteredJorny = standardizedFlights1?.filter((flight) => {
          let airCode = flight?.flightName;
          let stops = flight?.stopes;
          let price = flight?.price;
          let departureTime = "";
          let arrivalTime = "";
          let normalizedDepartureTime = "";
          let normalizedArrivalTime = "";

          const matchprice =
            !priceRange ||
            (price >= priceRange?.[0] && price <= priceRange?.[1]);

          const matchStops =
            selectedStops?.length === 0 || selectedStops?.includes(stops);

          const matchAirline =
            airlineCodes?.length === 0 || airlineCodes?.includes(airCode);

          const matchTime =
            selectedTimes?.length === 0 ||
            selectedTimes?.some((timeRange) => {
              const [startHour, endHour] = timeRange;
              const flightHour = parseInt(
                flight?.departureTime?.split(":")[0],
                10
              );
              return flightHour >= startHour && flightHour <= endHour;
            });
          const matchArrivalTime =
            selectedArrivalTimes?.length === 0 ||
            selectedArrivalTimes?.some((timeRange) => {
              const [startHour, endHour] = timeRange;
              const flightHour = parseInt(
                flight?.arrivalTime?.split(":")[0],
                10
              );
              return flightHour >= startHour && flightHour <= endHour;
            });
          // console.log(matchTime, "matchTime");
          return (
            matchprice &&
            matchStops &&
            matchTime &&
            matchArrivalTime &&
            matchAirline
          );
        });

        const filteredReturn = standardizedFlights2?.filter((flight) => {
          let airCode = flight?.flightName;
          let stops = flight?.stopes;
          let price = flight?.price;
          let departureTime = "";
          let arrivalTime = "";
          let normalizedDepartureTime = "";
          let normalizedArrivalTime = "";
          // console.log("peicernfe", priceRange, standardizedFlights2?.length);

          const matchprice =
            !priceRange ||
            (price >= priceRange?.[0] && price <= priceRange?.[1]);

          const matchAirline =
            airlineCodes?.length === 0 || airlineCodes?.includes(airCode);

          const matchStops =
            selectedStopsReturn?.length === 0 ||
            selectedStopsReturn?.includes(stops);

          const matchTime =
            selectedTimesReturn?.length === 0 ||
            selectedTimesReturn?.some((timeRange) => {
              const [startHour, endHour] = timeRange;
              const flightHour = parseInt(
                flight?.departureTime?.split(":")[0],
                10
              );
              return flightHour >= startHour && flightHour <= endHour;
            });
          const matchArrivalTime =
            selectedArrivalTimesReturn?.length === 0 ||
            selectedArrivalTimesReturn?.some((timeRange) => {
              const [startHour, endHour] = timeRange;
              const flightHour = parseInt(
                flight?.arrivalTime?.split(":")[0],
                10
              );
              return flightHour >= startHour && flightHour <= endHour;
            });
          // console.log(
          //   matchprice,
          //   matchStops,
          //   matchTime,
          //   matchArrivalTime,
          //   "matchTime"
          // );
          return (
            matchprice &&
            matchStops &&
            matchTime &&
            matchArrivalTime &&
            matchAirline
          );
        });

        setJornyFlights([...filteredJorny]);
        setReturnFlights([...filteredReturn]);
        // console.log(
        //   filteredJorny?.length,
        //   filteredReturn?.length,
        //   "after filter"
        // );
      }
    },
    [standardizedFlights1, standardizedFlights2]
  );
  useEffect(() => {
    if (!reducerState?.return?.isLoadingFilter) {
      setLoaderFilter(false);
      // calculatePriceRange();
      setStandardizedFlights1(
        reducerState?.return?.returnData?.[0]?.journeyFlight ||
          reducerState?.return?.returnData?.[0]?.journeyFlight ||
          []
      );
      setStandardizedFlights2(
        reducerState?.return?.returnData?.[0]?.returnFlight ||
          reducerState?.return?.returnData?.returnFlight ||
          []
      );
      setJornyFlights(
        reducerState?.return?.returnData?.[0]?.journeyFlight ||
          reducerState?.return?.returnData?.journeyFlight ||
          []
      );
      setReturnFlights(
        reducerState?.return?.returnData?.[0]?.returnFlight ||
          reducerState?.return?.returnData?.returnFlight ||
          []
      );
    } else {
      setLoaderFilter(true);
    }

    if (!reducerState?.return?.isLoading) {
      setLoader(false);
      setStandardizedFlights1(
        reducerState?.return?.returnData?.[0]?.journeyFlight ||
          reducerState?.return?.returnData?.journeyFlight ||
          []
      );
      setStandardizedFlights2(
        reducerState?.return?.returnData?.[0]?.returnFlight ||
          reducerState?.return?.returnData?.returnFlight ||
          []
      );
      if (reducerState?.return?.isLoadingFilter) {
        // console.log(
        //   "inside filterloding",
        //   reducerState?.return?.returnData?.journeyFlight
        // );
        setJornyFlights(
          reducerState?.return?.returnData?.journeyFlight ||
            reducerState?.return?.returnData?.[0]?.journeyFlight ||
            []
        );
        setReturnFlights(
          reducerState?.return?.returnData?.returnFlight ||
            reducerState?.return?.returnData?.[0]?.returnFlight ||
            []
        );
      }
    } else {
      setLoader(true);
    }
  }, [reducerState?.return?.returnData, reducerState?.return]);
  useEffect(() => {
    calculatePriceRange();
    // console.log(
    //   standardizedFlights1?.length,
    //   loaderFilter,
    //   "standardizedFlightsdd1"
    // );
    if (
      standardizedFlights1?.length > 0
      // && loaderFilter
    ) {
      setJornyFlights(standardizedFlights1);
      setReturnFlights(standardizedFlights2);
      console.log(
        standardizedFlights1,
        standardizedFlights2,
        "standardizedFlightsdd"
      );
    }
  }, [standardizedFlights1, standardizedFlights2]);
  useEffect(() => {
    dispatch(clearAllFareQuotesRuleAirsel());
  }, []);
  console.log(reducerState, "reducerState");

  return (
    <div className="bg-indigo-50">
      {/* <div className="flightMainOneWayDiv visibleBig "> */}
      <div className="sticky top-0 left-0 z-40 hidden md:flex  w-full z-3 bg-gradient-to-b from-primary-6000 via-primary-6000 to-primary-6000">
        {/* <Oneway2 /> */}
        <div className="custom-container p-2 flex justify-center items-center">
          <ReturnSearchResultForm />
        </div>
      </div>
      {/* </div> */}
      <div className=" visibleSmall stickyHotelDetails">
        <section
          style={{ borderTop: "1px solid lightgray", background: "white" }}
        >
          <div className="container ">
            <div className="smallHotelEditBox">
              <div className="smallHotelEditDetails">
                <p>
                  {
                    // `${flightDetails?.from?.name}-${flightDetails?.to?.name}`
                  }
                </p>
                <span>
                  {/* {formattedDate} |{travller == 1 ? "Room" : "Rooms"} |{" "}
                  {travller} Guests */}
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

      <div className="custom-container mt-3">
        {/* {reducerState?.oneWay?.isError && !loaderFilter && <NoFlightResult />} */}
        {
          // !reducerState?.oneWay?.isError
          true && (
            <div className="row">
              <div className="col-lg-3 visibleBig p-0">
                {!loaderFilter &&
                minPrice !== Infinity &&
                maxPrice !== -Infinity ? (
                  <ReturnFlightBigFilter
                    airlineCodes={airlineCodes}
                    minPrice={minPrice}
                    maxPrice={maxPrice}
                    priceRange={priceRange}
                    minDuration={minDuration}
                    maxDuration={maxDuration}
                    durationRange={durationRange}
                    onFilter={handleFilter}
                    stopsAirline={stopsAirline}

                    // Passing handleFilter as prop
                  />
                ) : (
                  <ReturnFlightSleletonBig />
                )}
              </div>

              <div className="col-lg-12 visibleSmall stikcyHotelFilter">
                {
                  //   loaderFilter || !filteredFlights
                  loader ? (
                    <ReturnSmallSkeleton />
                  ) : (
                    <ReturnFlightSmallFilter
                      //   airlineCodes={airlineCodes}
                      //   minPrice={minPrice}
                      //   maxPrice={maxPrice}
                      //   priceRange={priceRange}
                      //   minDuration={minDuration}
                      //   maxDuration={maxDuration}
                      //   durationRange={durationRange}
                      //   onFilter={handleFilter}
                      jornyFlights={jornyFlights}
                    />
                  )
                }
              </div>
              <div className="col-lg-9">
                {!loader ? (
                  // &&
                  // jornyFlights?.length > 0
                  <ReturnFlightResult
                    //   flights={sortedFlights}
                    //   // flights={filteredFlights}
                    //   airlineCodes={airlineCodes}
                    //   minPrice={minPrice}
                    //   maxPrice={maxPrice}
                    //   priceRange={priceRange}
                    //   onFilter={handleFilter}
                    jornyFlights={jornyFlights}
                    retrunFlights={retrunFlights}
                  />
                ) : (
                  <ReturnFlightSleletonBigRight />
                )}
              </div>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default ReturnFlightMain;
