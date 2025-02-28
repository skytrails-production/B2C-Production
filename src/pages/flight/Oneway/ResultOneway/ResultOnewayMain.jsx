import React, { useCallback, useEffect, useState } from "react";
import OnewayFlightResult from "./OnewayFlightResult";
import ReturnFlightSleletonBigRight from "../../ReturnFlight/newRetun/ReturnFlightSleletonBigRight";
// import ReturnFlightSleletonBig from "./ReturnFlightSleletonBig";
import { EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import OnewaySearchResultform from "./OnewaySearchResultform";
import { clearAllFareQuotesRuleAirsel } from "../../../../Redux/FareQuoteRuleAirsel/actionFlightQuoteRuleAirsel";
import ReturnFlightSleletonBig from "../../ReturnFlight/newRetun/ReturnFlightSleletonBig";
import OnewayFlightBigFilter from "./OnewayFlightBigFilter";

const ResultOnewayMain = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [loaderFilter, setLoaderFilter] = useState(false);
  const reducerState = useSelector((state) => state);
  const [airlineCodes, setAirlineCodes] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [minDuration, setMinDuration] = useState(0);
  const [maxDuration, setMaxDuration] = useState(1200);
  const [durationRange, setDurationRange] = useState([0, 1200]);
  const [stopsAirline, setStopsAirline] = useState(null);
  const [standardizedFlights1, setStandardizedFlights1] = useState(
    reducerState?.return?.returnData?.[0]?.journeyFlight || []
  );
  //   const [standardizedFlights2, setStandardizedFlights2] = useState(
  //     reducerState?.return?.returnData?.[0]?.returnFlight || []
  //   );

  const [jornyFlights, setJornyFlights] = useState([]);
  //   const [retrunFlights, setReturnFlights] = useState([]);

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
    // let stopesReturn = {
    //   nonStop: { count: 0, minPrice: Infinity },
    //   oneStop: { count: 0, minPrice: Infinity },
    //   moreThanOneStop: { count: 0, minPrice: Infinity },
    // };
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
      min = Math.min(min, price);
      max = Math.max(max, price);
      findStopes(flight, stopes);
      findAireLine(flight, Airlines, price);
    });
    // standardizedFlights2?.forEach((flight) => {
    //   let price = flight.price;
    //   let dur = flight.layover;
    //   min = Math.min(min, price);
    //   max = Math.max(max, price);
    //   findStopes(flight, stopesReturn);
    //   findAireLine(flight, Airlines, price);
    // });
    let newStopsAirline = {
      JourneyStopes: stopes,
      //   ReturnStopes: stopesReturn,
      Airlines: Airlines,
    };
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
      if (Array.isArray(standardizedFlights1)) {
        const filteredJorny = standardizedFlights1?.filter((flight) => {
          let airCode = flight?.flightName;
          let stops = flight?.stopes;
          let price = flight?.price;

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

        // const filteredReturn = standardizedFlights2?.filter((flight) => {
        //   let airCode = flight?.flightName;
        //   let stops = flight?.stopes;
        //   let price = flight?.price;
        //   const matchprice =
        //     !priceRange ||
        //     (price >= priceRange?.[0] && price <= priceRange?.[1]);

        //   const matchAirline =
        //     airlineCodes?.length === 0 || airlineCodes?.includes(airCode);

        //   const matchStops =
        //     selectedStopsReturn?.length === 0 ||
        //     selectedStopsReturn?.includes(stops);

        //   const matchTime =
        //     selectedTimesReturn?.length === 0 ||
        //     selectedTimesReturn?.some((timeRange) => {
        //       const [startHour, endHour] = timeRange;
        //       const flightHour = parseInt(
        //         flight?.departureTime?.split(":")[0],
        //         10
        //       );
        //       return flightHour >= startHour && flightHour <= endHour;
        //     });
        //   const matchArrivalTime =
        //     selectedArrivalTimesReturn?.length === 0 ||
        //     selectedArrivalTimesReturn?.some((timeRange) => {
        //       const [startHour, endHour] = timeRange;
        //       const flightHour = parseInt(
        //         flight?.arrivalTime?.split(":")[0],
        //         10
        //       );
        //       return flightHour >= startHour && flightHour <= endHour;
        //     });
        //   return (
        //     matchprice &&
        //     matchStops &&
        //     matchTime &&
        //     matchArrivalTime &&
        //     matchAirline
        //   );
        // });

        setJornyFlights([...filteredJorny]);
        // setReturnFlights([...filteredReturn]);
      }
    },
    [standardizedFlights1]
  );
  useEffect(() => {
    if (!reducerState?.return?.isLoadingFilter) {
      setLoaderFilter(false);
      // calculatePriceRange();
      setStandardizedFlights1(
        reducerState?.return?.returnData?.[0]?.journeyFlight || []
      );
      //   setStandardizedFlights2(
      //     reducerState?.return?.returnData?.[0]?.returnFlight || []
      //   );
      setJornyFlights(
        reducerState?.return?.returnData?.[0]?.journeyFlight || []
      );
      //   setReturnFlights(
      //     reducerState?.return?.returnData?.[0]?.returnFlight || []
      //   );
    } else {
      setLoaderFilter(true);
    }

    if (!reducerState?.return?.isLoading) {
      setLoader(false);
      setStandardizedFlights1(
        reducerState?.return?.returnData?.[0]?.journeyFlight || []
      );
      //   setStandardizedFlights2(
      //     reducerState?.return?.returnData?.[0]?.returnFlight || []
      //   );
      if (reducerState?.return?.isLoadingFilter) {
        setJornyFlights(reducerState?.return?.returnData?.journeyFlight || []);
        // setReturnFlights(reducerState?.return?.returnData?.returnFlight || []);
      }
    } else {
      setLoader(true);
    }
  }, [reducerState?.return?.returnData, reducerState?.return]);
  useEffect(() => {
    // console.log(reducerState, "reducer state in thee result oneway main");
    calculatePriceRange();
    if (
      standardizedFlights1?.length > 0
      // && loaderFilter
    ) {
      setJornyFlights(standardizedFlights1);
      //   setReturnFlights(standardizedFlights2);
      // console.log(loaderFilter, standardizedFlights1, "standardizedFlightsdd");
    }
  }, [standardizedFlights1]);
  useEffect(() => {
    dispatch(clearAllFareQuotesRuleAirsel());
  }, []);

  return (
    <div className="bg-indigo-50 pb-4">
      {/* <div className="flightMainOneWayDiv visibleBig "> */}
      <div className=" sticky top-0 left-0 z-40 hidden md:flex  w-full z-3 bg-gradient-to-b from-primary-6000 via-primary-6000 to-primary-6000">
        {/* <Oneway2 /> */}
        <div className="container p-2 flex justify-center items-center">
          <OnewaySearchResultform />
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
                  {/* {`${flightDetails?.from?.name}-${flightDetails?.to?.name}`} */}
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

      <div className="container mt-3">
        {true && (
          <div className="row">
            <div className="col-lg-3 visibleBig p-0">
              {!loaderFilter &&
              minPrice !== Infinity &&
              maxPrice !== -Infinity ? (
                <OnewayFlightBigFilter
                  airlineCodes={airlineCodes}
                  minPrice={minPrice}
                  maxPrice={maxPrice}
                  priceRange={priceRange}
                  minDuration={minDuration}
                  maxDuration={maxDuration}
                  durationRange={durationRange}
                  onFilter={handleFilter}
                  stopsAirline={stopsAirline}
                />
              ) : (
                <ReturnFlightSleletonBig />
              )}
            </div>

            <div className="col-lg-9">
              {!loader ? (
                <OnewayFlightResult
                  jornyFlights={jornyFlights}
                  //   retrunFlights={retrunFlights}
                />
              ) : (
                <ReturnFlightSleletonBigRight />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultOnewayMain;
