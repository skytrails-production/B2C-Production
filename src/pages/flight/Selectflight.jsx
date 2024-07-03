import React, { useState, useEffect } from "react";
// import { styled } from "@mui/material/styles";
import moment from "moment";
import { FiArrowRight } from "react-icons/fi";
import FlightLoader from "./FlightLoader/FlightLoader";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Divider from "@mui/material/Divider";
import "./selectflight.css";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
// import Paper from "@mui/material/Paper";
import { motion, AnimatePresence } from 'framer-motion';
import { ImCancelCircle } from "react-icons/im";
// import Swal from "sweetalert2";
import { clearbookTicketGDS } from "../../Redux/FlightBook/actionFlightBook";
import {
  resetAllFareData,
  setLoading,
} from "../../Redux/FlightFareQuoteRule/actionFlightQuote";
import dayjs from "dayjs";
// import hotelFilter from "../../images/hotelFilter.png"
import flightNoResult from "../../images/img/flightnoresult.jpg";
import { Skeleton } from "@mui/material";
import { Segment } from "@mui/icons-material";
import "./selectflight.css";
import fromTo from "../../images/fromTo.png";
import { FaArrowRight } from "react-icons/fa";
import { useAnimation } from 'framer-motion';
// import { useInView } from 'react-intersection-observer';
const variants = {
  initial: {
    x: 50,
    opacity: 0,
  },
  animate: {
    x: 1,
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
    },
  },
  exit: {
    x: 50,
    opacity: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
    },
  },
};

function Items({
  currentItems,
  selectedCategory,
  handleRadioChange,
  results,
  handelClearOne,
}) {
  // const dispatch = useDispatch();
  const location = useLocation();
  const dispatch = useDispatch();
  // const [value, setValue] = useState(true);
  const [valueShow, setValueShow] = useState(false);
  const reducerState = useSelector((state) => state);
  // const [flightDetailsValue, setFlightDetailsValue] = React.useState("1");
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const adultCount = queryParams.get("adult");
  const childCount = queryParams.get("child");
  const infantCount = queryParams.get("infant");
  // console.warn(currentItems,"current")

  useEffect(() => {
    dispatch(clearbookTicketGDS());
    dispatch(resetAllFareData());
  }, []);
  // console.warn(reducerState)

  // const flightImg =
  //   reducerState?.oneWay?.oneWayData?.data?.data?.Response?.Results?.[0]?.map(
  //     (ele) => ele?.AirlineCode
  //   );

  // const clickme = () => {
  //   setValue(!value);
  // };
  // const results =[...newResults]
  // useEffect(()=>{
  // console.warn(results, "result Items item");
  // },[results])
  // reducerState?.oneWay?.oneWayData?.data?.data?.Response?.Results;
  // useEffect(() => {
  //   const uniqueData = results[0].filter((item, index, array) => {
  //     const isUnique = !array
  //       .slice(0, index)
  //       .some(
  //         prevItem =>
  //           prevItem.AirlineCode === item.AirlineCode &&
  //           prevItem.Segments?.[0]?.[prevItem.Segments[0].length - 1]?.Origin
  //             ?.DepTime ===
  //             item.Segments?.[0]?.[prevItem.Segments[0].length - 1]?.Origin
  //               ?.DepTime,
  //       );
  //     return isUnique;
  //   });
  //   // currentItems=uniqueData;
  //   console.warn("filter;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;",uniqueData,"current items",currentItems)
  // }, [results]);

  // const items = [...Array(results?.[0].length).keys()];

  // toggle the filter for small device

  const variants2 = {
    open: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        // staggerChildren: 0.1,
      },
    },
    closed: {
      x: -500,
      opacity: 0,

      transition: {
        duration: 0.5,
        // staggerChildren: 0.1,
      },
    },
  };

  const [openFilter, setOpenFilter] = useState(false);

  const handleFilterOpen = () => {
    setOpenFilter(!openFilter);
  };

  const handleIndexId = (ResultIndex) => {
    // navigate(
    //   `booknow?adult=${adultCount}&child=${childCount}&infant=${infantCount} `
    // );
    // console.log("hiiii", ResultIndex);
    window.open(
      `booknow?adult=${adultCount}&child=${childCount}&infant=${infantCount} `,
      "_blank"
    );
    // sessionStorage.setItem("ResultIndex", ResultIndex);
  };

  // const TicketDetails = reducerState?.flightFare?.flightQuoteData?.Results;
  // const [anchorEl, setAnchorEl] = React.useState(null);

  // console.warn("current data", currentItems)

  const maxPrice = currentItems?.reduce((max, hotel) => {
    return Math.max(max, results[0][hotel]?.Fare?.PublishedFare || 0);
  }, 0);
  const minPrice = currentItems?.reduce((min, hotel) => {
    return Math.min(min, results[0][hotel]?.Fare?.PublishedFare || Infinity);
  }, Infinity);

  const [priceRangeValue, setPriceRangeValue] = useState(maxPrice + 5001);

  const handlePriceRangeChange = (event) => {
    setPriceRangeValue(event.target.value);
  };

  useEffect(() => {
    setPriceRangeValue(maxPrice + 5001);
  }, [maxPrice]);

  const filteredData =
    currentItems &&
    currentItems.filter((item) => {
      const segmentLength = results?.[0][item]?.Segments?.[0].length;
      const depTime = new Date(
        results?.[0][item]?.Segments?.[0][0]?.Origin?.DepTime
      );
      const hour = depTime.getHours();
      const ArrTime = new Date(
        results?.[0][item]?.Segments?.[0][
          segmentLength - 1
        ]?.Destination?.ArrTime
      );
      const hourArr = ArrTime.getHours();
      const airlineName =
        results?.[0][item]?.Segments?.[0][0]?.Airline?.AirlineName;
      const categoryFilters = selectedCategory.map((category) => {
        const [groupName, value] = category.split(":");
        switch (groupName) {
          case "stop":
            switch (value) {
              case "1":
                return segmentLength === 1;
              case "2":
                return segmentLength === 2;
            }

          case "flightname":
            return airlineName === value;

          case "timeDepart":
            switch (value) {
              case "before6AM":
                return hour < 6;
              case "6AMto12PM":
                return hour >= 6 && hour < 12;
              case "12PMto6PM":
                return hour >= 12 && hour < 18;
              case "after6PM":
                return hour >= 18;
            }

          case "timeArrival":
            switch (value) {
              case "ARRbefore6AM":
                return hourArr < 6;
              case "ARR6AMto12PM":
                return hourArr >= 6 && hourArr < 12;
              case "ARR12PMto6PM":
                return hourArr >= 12 && hourArr < 18;
              case "ARRafter6PM":
                return hourArr >= 18;
            }

          default:
            return false;
        }
      });
      const priceInRange =
        results[0][item]?.Fare?.PublishedFare <= priceRangeValue;
      // Apply AND logic for all selected categories
      // console.log("priceInRange", priceInRange);
      return categoryFilters.every((filter) => filter) && priceInRange;
    });

  // useEffect(() => {
  //   console.warn(results, "flight result", currentItems);
  // }, [results, filteredData, currentItems]);

  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowLoader(false);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, []);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [xMaxLocation, setxMaxLocation] = useState(0);

  const handleMouseMove = (e) => {
    // setCursorPosition({...pre, x: e.clientX, y: e.clientY });
    if (xMaxLocation === 0) {
      setxMaxLocation(e.clientX);
    }
    if (
      minPrice + 10 <= Number(priceRangeValue) &&
      Number(priceRangeValue) < maxPrice - 5050
    ) {
      if (xMaxLocation < e.clientX) {
        setCursorPosition((prevState) => ({ ...prevState, x: xMaxLocation }));
      } else {
        setCursorPosition((prevState) => ({ ...prevState, x: e.clientX }));
      }
    }
    if (xMaxLocation < e.clientX) {
      setCursorPosition((prevState) => ({ ...prevState, x: xMaxLocation }));
    }
    // console.log(minPrice, Number(priceRangeValue), maxPrice)
    if (cursorPosition.y === 0) {
      setCursorPosition((prevState) => ({ ...prevState, y: e.clientY }));
    }
    // console.log(e.clientX,e.clientY,)
  };
  useEffect(() => {
    if (xMaxLocation < cursorPosition.x) {
      setCursorPosition((prevState) => ({ ...prevState, x: xMaxLocation }));
      // console.log(xMaxLocation)
    }
  }, [cursorPosition]);
  // return (

  // );

  // console.log("results[0][item]?.AirlineRemark",results[0][item]?.AirlineRemark)

  // console.log(results?.[0][0]?.Segments?.[0][results?.[0][0]?.Segments.length - 1]?.Origin?.DepTime)

  const arrSegmentLength = results?.[0]?.[0]?.Segments?.[0]?.length;

  // const arrSegmentLength1 = results;

  useEffect(() => {
    if (!valueShow) {
      window.scrollTo(0, 0);
    }
  }, [filteredData]);

  return (
    // <section className="margin-pecentage my-4">
    <>
      <div>{showLoader && <FlightLoader />}</div>
      <div className="container mt-4">
        <div className="row position-relative">
          {/* design for mobile device  */}

          <div
            className="d-flex d-sm-none  topFilterBoxMobile"
            onClick={handleFilterOpen}
          >
            <p>Apply Filters</p>
            <span>
              <svg
                height="20"
                viewBox="0 0 24 24"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
                id="fi_7094575"
              >
                <g id="Glyph">
                  <path d="m17 5a3 3 0 1 1 3 3 3 3 0 0 1 -3-3zm-15 1h12a1 1 0 0 0 0-2h-12a1 1 0 0 0 0 2zm6 3a3 3 0 0 0 -2.82 2h-3.18a1 1 0 0 0 0 2h3.18a3 3 0 1 0 2.82-4zm14 2h-8a1 1 0 0 0 0 2h8a1 1 0 0 0 0-2zm-12 7h-8a1 1 0 0 0 0 2h8a1 1 0 0 0 0-2zm12 0h-3.18a3 3 0 1 0 0 2h3.18a1 1 0 0 0 0-2z"></path>
                </g>
              </svg>
            </span>
          </div>
          <motion.div
            className=" col-lg-3 col-md-3 scrollDesignMobileFlight"
            animate={openFilter ? "open" : "closed"}
            variants={variants2}
          >
            <div className="FilterBoxMobileFlight">
              {/* <div className="filterTitle">
                <p>Select Filters</p>
              </div> */}
              <div className="innerFilter">
                <div>
                  <div>
                    <label className="sidebar-label-container ps-0">
                      <input
                        type="checkbox"
                        onChange={handleRadioChange}
                        value="All"
                        name="test"
                        checked={selectedCategory.includes("test:All")}
                      />
                      {/* <span className="checkmark"></span> */}
                      <span
                        style={{
                          color: selectedCategory.length > 0 ? "red" : "gray",
                        }}
                      >
                        Clear Filter
                      </span>
                    </label>
                  </div>
                  {/* <Divider
                    sx={{ marginBottom: "15px", backgroundColor: "gray" }}
                  /> */}
                </div>

                <div className="busDepartureMain">
                  <h2 className="sidebar-title">Suggested for you</h2>

                  <div>
                    <label className="sidebar-label-container  ps-0">
                      {/* <span className="checkmark"></span> */}

                      <div className="svgBOx">
                        <input
                          type="checkbox"
                          onChange={handleRadioChange}
                          value="1"
                          name="stop"
                          checked={selectedCategory.includes("stop:1")}
                        />
                        <div>
                          <span className="checkedSVG pe-2">
                            <svg
                              id="fi_2089699"
                              enable-background="new 0 0 515.556 515.556"
                              height="19"
                              viewBox="0 0 515.556 515.556"
                              width="19"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="m257.778 0c-142.137 0-257.778 115.641-257.778 257.778s115.641 257.778 257.778 257.778 257.778-115.641 257.778-257.778-115.642-257.778-257.778-257.778zm-193.334 257.778c0-41.69 13.397-80.235 35.924-111.846l269.255 269.255c-31.611 22.526-70.156 35.924-111.846 35.924-106.609 0-193.333-86.723-193.333-193.333zm350.743 111.846-269.256-269.256c31.611-22.526 70.156-35.924 111.846-35.924 106.61 0 193.333 86.723 193.333 193.333 0 41.691-13.397 80.236-35.923 111.847z"></path>
                            </svg>
                          </span>
                          <span>Non Stop</span>
                        </div>
                      </div>
                    </label>

                    <label className="sidebar-label-container  ps-0">
                      {/* <span className="checkmark"></span> */}
                      <div className="svgBOx">
                        <input
                          type="checkbox"
                          onChange={handleRadioChange}
                          value="2"
                          name="stop"
                          checked={selectedCategory.includes("stop:2")}
                        />
                        <div>
                          <span className="checkedSVG pe-2">
                            <svg
                              height="19"
                              viewBox="0 0 32 32"
                              width="19"
                              xmlns="http://www.w3.org/2000/svg"
                              id="fi_4212317"
                            >
                              <g id="_62-Stopwatch" data-name="62-Stopwatch">
                                <path d="m25.15 10.26 1.56-1.55a1 1 0 1 0 -1.42-1.42l-1.55 1.56a11.9 11.9 0 0 0 -6.74-2.8v-2.05h2a1 1 0 0 0 0-2h-6a1 1 0 0 0 0 2h2v2.05a12 12 0 1 0 10.15 4.21zm-9.15 17.74a10 10 0 1 1 10-10 10 10 0 0 1 -10 10z"></path>
                                <path d="m16 10a8 8 0 1 0 8 8 8 8 0 0 0 -8-8zm3.71 11.71a1 1 0 0 1 -1.42 0l-3-3a1 1 0 0 1 -.29-.71v-5a1 1 0 0 1 2 0v4.59l2.71 2.7a1 1 0 0 1 0 1.42z"></path>
                              </g>
                            </svg>
                          </span>
                          <span>One Stop</span>
                        </div>
                      </div>
                    </label>

                    <label className="sidebar-label-container  ps-0">
                      {/* <span className="checkmark"></span> */}
                      <div className="svgBOx">
                        <input
                          type="checkbox"
                          onChange={handleRadioChange}
                          value="SpiceJet"
                          name="flightname"
                          checked={selectedCategory.includes(
                            "flightname:SpiceJet"
                          )}
                        />
                        <div>
                          <span className="checkedSVG pe-2">
                            <img
                              src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/SG.png`}
                              alt="flight"
                            />{" "}
                          </span>
                          <span>SpiceJet</span>
                        </div>
                      </div>
                    </label>

                    <label className="sidebar-label-container  ps-0">
                      {/* <span className="checkmark"></span> */}
                      <div className="svgBOx">
                        <input
                          type="checkbox"
                          onChange={handleRadioChange}
                          value="Vistara"
                          name="flightname"
                          checked={selectedCategory.includes(
                            "flightname:Vistara"
                          )}
                        />
                        <div>
                          <span className="checkedSVG pe-2">
                            <img
                              src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/UK.png`}
                              alt="flight"
                            />{" "}
                          </span>
                          <span>Vistara</span>
                        </div>
                      </div>
                    </label>
                  </div>

                  {/* <Divider
                      sx={{ marginBottom: "15px", marginTop: "15px", backgroundColor: "lightgray" }}
                    /> */}

                  {/* <Divider
                    sx={{ marginBottom: "15px", backgroundColor: "gray" }}
                  /> */}
                </div>

                <div className="PackageDepartureMain">
                  <h2 className="sidebar-title">By Price</h2>
                  <div className="position-relative">
                    <input
                      type="range"
                      id="rangePriceRange"
                      min={minPrice + 1}
                      max={maxPrice + 1}
                      step="5000"
                      value={priceRangeValue}
                      onChange={handlePriceRangeChange}
                      onMouseOver={() => setValueShow(true)}
                      onMouseOut={() => setValueShow(false)}
                    />
                    {valueShow && (
                      <span style={{ position: "absolute" }} id="tooltip">
                        {" "}
                        ₹{priceRangeValue}
                      </span>
                    )}
                    <span>
                      Max price ₹{""}
                      {priceRangeValue}
                    </span>
                  </div>
                  <Divider
                    sx={{ marginBottom: "15px", backgroundColor: "gray" }}
                  />
                </div>

                <div className="busDepartureMain">
                  <h2 className="sidebar-title">
                    Departure From{" "}
                    {results.length > 0 &&
                      results?.[0][0]?.Segments?.[0][0]?.Origin?.Airport
                        ?.CityName}
                  </h2>

                  <div>
                    <label className="sidebar-label-container  ps-0">
                      {/* <span className="checkmark"></span> */}

                      <div className="svgBOx">
                        <input
                          type="checkbox"
                          onChange={handleRadioChange}
                          value="before6AM"
                          name="timeDepart"
                          checked={selectedCategory.includes(
                            "timeDepart:before6AM"
                          )}
                        />
                        <div>
                          <span className="checkedSVG pe-2">
                            <svg
                              id="Capa_1"
                              enable-background="new 0 0 512 512"
                              height="19"
                              viewBox="0 0 512 512"
                              width="19"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="m211.709 313.959c17.085 6.479 31.841 12.076 44.291 12.076s27.206-5.596 44.291-12.076c22.154-8.402 47.264-17.925 76.207-17.925 11.314 0 22.44.935 33.357 2.542-3.398-81.931-71.103-147.541-153.855-147.541-82.722 0-150.409 65.564-153.851 147.454 10.858-1.56 21.957-2.455 33.354-2.455 28.942 0 54.052 9.523 76.206 17.925z" />
                              <path d="m502.205 356.969-4.758-1.765c-36.837-13.672-78.589-29.169-120.949-29.169-23.445 0-44.859 8.121-65.568 15.975-19.019 7.213-36.982 14.025-54.929 14.025s-35.911-6.813-54.929-14.025c-20.709-7.854-42.124-15.975-65.568-15.975-43.64 0-84.687 15.472-124.382 30.435l-1.405.529c-7.752 2.921-11.668 11.574-8.746 19.326 2.921 7.752 11.574 11.668 19.326 8.746l1.406-.53c38.893-14.66 75.627-28.507 113.801-28.507 17.947 0 35.911 6.813 54.93 14.025 20.709 7.854 42.123 15.975 65.567 15.975s44.858-8.121 65.567-15.975c19.019-7.213 36.983-14.025 54.93-14.025 36.972 0 74.356 13.875 110.51 27.294l4.777 1.772c1.718.636 3.478.938 5.208.938 6.096 0 11.827-3.743 14.068-9.794 2.877-7.768-1.088-16.398-8.856-19.275z" />
                              <path d="m15 320.034h31c8.284 0 15-6.716 15-15s-6.716-15-15-15h-31c-8.284 0-15 6.716-15 15s6.716 15 15 15z" />
                              <path d="m39.788 197.524 26.847 15.5c2.362 1.364 4.941 2.012 7.486 2.012 5.184 0 10.226-2.69 13.004-7.502 4.142-7.174 1.684-16.348-5.49-20.49l-26.847-15.5c-7.176-4.144-16.348-1.684-20.49 5.49s-1.684 16.348 5.49 20.49z" />
                              <path d="m138.01 130.669c2.778 4.812 7.82 7.502 13.004 7.502 2.544 0 5.124-.648 7.486-2.012 7.174-4.142 9.632-13.315 5.49-20.49l-15.5-26.847c-4.142-7.173-13.314-9.633-20.49-5.49-7.174 4.142-9.632 13.315-5.49 20.49z" />
                              <path d="m256 110.035c8.284 0 15-6.716 15-15v-31c0-8.284-6.716-15-15-15s-15 6.716-15 15v31c0 8.284 6.716 15 15 15z" />
                              <path d="m353.5 136.16c2.362 1.364 4.941 2.012 7.486 2.012 5.184 0 10.226-2.69 13.004-7.502l15.5-26.847c4.142-7.174 1.684-16.348-5.49-20.49-7.176-4.143-16.349-1.684-20.49 5.49l-15.5 26.847c-4.142 7.174-1.684 16.347 5.49 20.49z" />
                              <path d="m437.879 215.037c2.544 0 5.124-.648 7.486-2.012l26.847-15.5c7.174-4.142 9.632-13.316 5.49-20.49s-13.315-9.633-20.49-5.49l-26.847 15.5c-7.174 4.142-9.632 13.316-5.49 20.49 2.778 4.812 7.82 7.502 13.004 7.502z" />
                              <path d="m451 305.035c0 8.284 6.716 15 15 15h31c8.284 0 15-6.716 15-15s-6.716-15-15-15h-31c-8.284 0-15 6.715-15 15z" />
                              <path d="m419.34 433.944-.357-.136c-21.791-8.301-54.72-20.847-83.983-20.847-16.094 0-30.715 5.586-44.854 10.988-12.13 4.635-23.588 9.012-34.146 9.012s-22.016-4.377-34.146-9.012c-14.139-5.402-28.759-10.988-44.854-10.988-25.122 0-41.314 5.75-68.142 15.276-4.805 1.706-10.02 3.558-15.771 5.552-7.827 2.713-11.973 11.258-9.259 19.085 2.149 6.201 7.958 10.091 14.172 10.091 1.629 0 3.288-.268 4.914-.832 5.829-2.021 11.114-3.897 15.983-5.626 26.195-9.301 38.15-13.546 58.104-13.546 10.559 0 22.016 4.377 34.146 9.012 14.139 5.402 28.759 10.988 44.854 10.988s30.715-5.586 44.854-10.988c12.13-4.635 23.588-9.012 34.146-9.012 23.742 0 53.567 11.362 73.303 18.881l.357.136c7.741 2.95 16.408-.936 19.357-8.677s-.936-16.408-8.678-19.357z" />
                            </svg>
                          </span>
                          <span>Before 6 AM</span>
                        </div>
                      </div>
                    </label>

                    <label className="sidebar-label-container  ps-0">
                      {/* <span className="checkmark"></span> */}
                      <div className="svgBOx">
                        <input
                          type="checkbox"
                          onChange={handleRadioChange}
                          value="6AMto12PM"
                          name="timeDepart"
                          checked={selectedCategory.includes(
                            "timeDepart:6AMto12PM"
                          )}
                        />
                        <div>
                          <span className="checkedSVG pe-2">
                            <svg
                              height="19"
                              viewBox="0 0 64 64"
                              width="19"
                              xmlns="http://www.w3.org/2000/svg"
                              id="fi_2955890"
                            >
                              <g id="Sun">
                                <path d="m31.97461 15.00244a17.00317 17.00317 0 1 0 17 17.00342 17.021 17.021 0 0 0 -17-17.00342z"></path>
                                <path d="m59.002 29.00537h-3.99663a3.00049 3.00049 0 0 0 0 6.001h3.99663a3.00049 3.00049 0 0 0 0-6.001z"></path>
                                <path d="m31.97461 51.99854a3.00307 3.00307 0 0 0 -2.99854 3.00046v4.00049a2.99829 2.99829 0 1 0 5.99658 0v-4.00049a3.00266 3.00266 0 0 0 -2.99804-3.00046z"></path>
                                <path d="m11.99316 32.00586a3.00307 3.00307 0 0 0 -2.99854-3.00049h-3.99608a3.00049 3.00049 0 0 0 0 6.001h3.99609a3.00307 3.00307 0 0 0 2.99853-3.00051z"></path>
                                <path d="m31.97461 12.00146a3.00307 3.00307 0 0 0 2.99853-3.00046v-4.00051a2.99829 2.99829 0 1 0 -5.99658 0v4.00051a3.00266 3.00266 0 0 0 2.99805 3.00046z"></path>
                                <path d="m50.36182 17.85919 2.82874-2.82874a2.99828 2.99828 0 1 0 -4.24017-4.24023l-2.8288 2.8288a2.99828 2.99828 0 1 0 4.24023 4.24017z"></path>
                                <path d="m50.36145 46.15283a2.9983 2.9983 0 1 0 -4.24023 4.24023l2.82878 2.82874a2.9983 2.9983 0 1 0 4.24023-4.24023z"></path>
                                <path d="m13.5874 46.15247-2.82874 2.8288a2.99826 2.99826 0 1 0 4.24017 4.24017l2.8288-2.82874a2.9983 2.9983 0 1 0 -4.24023-4.24023z"></path>
                                <path d="m13.58777 17.85889a2.9983 2.9983 0 1 0 4.24023-4.24024l-2.8288-2.8288a2.9983 2.9983 0 1 0 -4.2402 4.24024z"></path>
                              </g>
                            </svg>
                          </span>
                          <span>6 AM - 12 PM</span>
                        </div>
                      </div>
                    </label>

                    <label className="sidebar-label-container  ps-0">
                      {/* <span className="checkmark"></span> */}
                      <div className="svgBOx">
                        <input
                          type="checkbox"
                          onChange={handleRadioChange}
                          value="12PMto6PM"
                          name="timeDepart"
                          checked={selectedCategory.includes(
                            "timeDepart:12PMto6PM"
                          )}
                        />
                        <div>
                          <span className="checkedSVG pe-2">
                            <svg
                              id="fi_3223045"
                              height="19"
                              viewBox="0 0 512 512"
                              width="19"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="m205.746 77.478a10 10 0 0 0 10-10v-37.632a10 10 0 0 0 -20 0v37.632a10 10 0 0 0 10 10z"></path>
                              <path d="m118.029 93.661a10 10 0 0 0 17.321-10l-18.817-32.59a10 10 0 0 0 -17.32 10z"></path>
                              <path d="m31.226 136.379 32.589 18.821a10 10 0 1 0 10-17.32l-32.589-18.821a10 10 0 1 0 -10 17.32z"></path>
                              <path d="m57.632 225.592a10 10 0 0 0 -10-10h-37.632a10 10 0 0 0 0 20h37.632a10 10 0 0 0 10-10z"></path>
                              <path d="m77.476 299.649a10 10 0 0 0 -13.661-3.66l-32.589 18.816a10 10 0 1 0 10 17.32l32.589-18.815a10 10 0 0 0 3.661-13.661z"></path>
                              <path d="m342.688 156.536a9.953 9.953 0 0 0 4.99-1.341l32.59-18.816a10 10 0 1 0 -10-17.32l-32.59 18.816a10 10 0 0 0 5.01 18.661z"></path>
                              <path d="m279.8 97.321a10 10 0 0 0 13.66-3.66l18.815-32.59a10 10 0 0 0 -17.32-10l-18.815 32.59a10 10 0 0 0 3.66 13.66z"></path>
                              <path d="m162.525 290.2q5.259 0 10.478.515a85.595 85.595 0 0 1 99.564-41.8 105.477 105.477 0 0 1 42.621-34.329 109.99 109.99 0 1 0 -192.315 83.314 105.421 105.421 0 0 1 39.652-7.7z"></path>
                              <path d="m438.936 338.585a85.6 85.6 0 0 0 -158.164-64.635 65.622 65.622 0 0 0 -95.433 39.313 85.985 85.985 0 1 0 -22.814 168.891h267.4a72.067 72.067 0 0 0 9.011-143.569z"></path>
                            </svg>
                          </span>
                          <span>12 PM - 6 PM</span>
                        </div>
                      </div>
                    </label>

                    <label className="sidebar-label-container  ps-0">
                      {/* <span className="checkmark"></span> */}
                      <div className="svgBOx">
                        <input
                          type="checkbox"
                          onChange={handleRadioChange}
                          value="after6PM"
                          name="timeDepart"
                          checked={selectedCategory.includes(
                            "timeDepart:after6PM"
                          )}
                        />
                        <div>
                          <span className="checkedSVG pe-2">
                            <svg
                              height="19"
                              viewBox="0 -41 512.00002 512"
                              width="19"
                              xmlns="http://www.w3.org/2000/svg"
                              id="fi_1146677"
                            >
                              <path d="m251.710938 297.488281c-2.390626 0-4.832032.140625-7.261719.398438l-14.554688 1.582031-1.941406-14.511719c-4.828125-36.25-36.105469-63.574219-72.742187-63.574219-40.46875 0-73.386719 32.925782-73.386719 73.394532 0 4.140625.351562 8.3125 1.042969 12.394531l3.71875 21.871094-21.683594-4.699219c-3.761719-.8125-7.601563-1.21875-11.402344-1.21875-29.503906 0-53.5 23.992188-53.5 53.5 0 29.503906 23.996094 53.507812 53.5 53.507812h198.210938c36.574218 0 66.320312-29.753906 66.320312-66.320312 0-36.570312-29.746094-66.324219-66.320312-66.324219zm0 0"></path>
                              <path d="m481.632812 258.789062c-2.949218.171876-5.890624.25-8.808593.25-53.953125 0-103.222657-28.515624-130.066407-75.882812-28.296874-49.941406-25.816406-110.480469 6.480469-158l17.09375-25.15625-30.355469 1.742188c-27.644531 1.589843-53.941406 9.351562-78.15625 23.074218-41.75 23.664063-71.785156 62.152344-84.578124 108.398438-5.378907 19.453125-7.429688 39.277344-6.238282 58.84375 41.875 4.808594 76.921875 34.976562 87.976563 75.484375 50.609375 1.699219 91.457031 42.617187 93.007812 93.265625 30.1875-.21875 59.980469-8.121094 86.957031-23.421875 24.222657-13.722657 44.386719-32.289063 59.953126-55.191407l17.101562-25.144531zm0 0"></path>
                            </svg>
                          </span>
                          <span>After 6 PM</span>
                        </div>
                      </div>
                    </label>
                  </div>

                  {/* <Divider
                    sx={{ marginBottom: "15px", backgroundColor: "gray" }}
                  /> */}
                </div>

                <div className="busDepartureMain">
                  <h2 className="sidebar-title">
                    Arrival at{" "}
                    {results.length > 0 &&
                      results?.[0][0]?.Segments?.[0][arrSegmentLength - 1]
                        ?.Destination?.Airport?.CityName}
                  </h2>

                  <div>
                    <label className="sidebar-label-container  ps-0">
                      {/* <span className="checkmark"></span> */}

                      <div className="svgBOx">
                        <input
                          type="checkbox"
                          onChange={handleRadioChange}
                          value="ARRbefore6AM"
                          name="timeArrival"
                          checked={selectedCategory.includes(
                            "timeArrival:ARRbefore6AM"
                          )}
                        />
                        <div>
                          <span className="checkedSVG pe-2">
                            <svg
                              id="Capa_1"
                              enable-background="new 0 0 512 512"
                              height="19"
                              viewBox="0 0 512 512"
                              width="19"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="m211.709 313.959c17.085 6.479 31.841 12.076 44.291 12.076s27.206-5.596 44.291-12.076c22.154-8.402 47.264-17.925 76.207-17.925 11.314 0 22.44.935 33.357 2.542-3.398-81.931-71.103-147.541-153.855-147.541-82.722 0-150.409 65.564-153.851 147.454 10.858-1.56 21.957-2.455 33.354-2.455 28.942 0 54.052 9.523 76.206 17.925z" />
                              <path d="m502.205 356.969-4.758-1.765c-36.837-13.672-78.589-29.169-120.949-29.169-23.445 0-44.859 8.121-65.568 15.975-19.019 7.213-36.982 14.025-54.929 14.025s-35.911-6.813-54.929-14.025c-20.709-7.854-42.124-15.975-65.568-15.975-43.64 0-84.687 15.472-124.382 30.435l-1.405.529c-7.752 2.921-11.668 11.574-8.746 19.326 2.921 7.752 11.574 11.668 19.326 8.746l1.406-.53c38.893-14.66 75.627-28.507 113.801-28.507 17.947 0 35.911 6.813 54.93 14.025 20.709 7.854 42.123 15.975 65.567 15.975s44.858-8.121 65.567-15.975c19.019-7.213 36.983-14.025 54.93-14.025 36.972 0 74.356 13.875 110.51 27.294l4.777 1.772c1.718.636 3.478.938 5.208.938 6.096 0 11.827-3.743 14.068-9.794 2.877-7.768-1.088-16.398-8.856-19.275z" />
                              <path d="m15 320.034h31c8.284 0 15-6.716 15-15s-6.716-15-15-15h-31c-8.284 0-15 6.716-15 15s6.716 15 15 15z" />
                              <path d="m39.788 197.524 26.847 15.5c2.362 1.364 4.941 2.012 7.486 2.012 5.184 0 10.226-2.69 13.004-7.502 4.142-7.174 1.684-16.348-5.49-20.49l-26.847-15.5c-7.176-4.144-16.348-1.684-20.49 5.49s-1.684 16.348 5.49 20.49z" />
                              <path d="m138.01 130.669c2.778 4.812 7.82 7.502 13.004 7.502 2.544 0 5.124-.648 7.486-2.012 7.174-4.142 9.632-13.315 5.49-20.49l-15.5-26.847c-4.142-7.173-13.314-9.633-20.49-5.49-7.174 4.142-9.632 13.315-5.49 20.49z" />
                              <path d="m256 110.035c8.284 0 15-6.716 15-15v-31c0-8.284-6.716-15-15-15s-15 6.716-15 15v31c0 8.284 6.716 15 15 15z" />
                              <path d="m353.5 136.16c2.362 1.364 4.941 2.012 7.486 2.012 5.184 0 10.226-2.69 13.004-7.502l15.5-26.847c4.142-7.174 1.684-16.348-5.49-20.49-7.176-4.143-16.349-1.684-20.49 5.49l-15.5 26.847c-4.142 7.174-1.684 16.347 5.49 20.49z" />
                              <path d="m437.879 215.037c2.544 0 5.124-.648 7.486-2.012l26.847-15.5c7.174-4.142 9.632-13.316 5.49-20.49s-13.315-9.633-20.49-5.49l-26.847 15.5c-7.174 4.142-9.632 13.316-5.49 20.49 2.778 4.812 7.82 7.502 13.004 7.502z" />
                              <path d="m451 305.035c0 8.284 6.716 15 15 15h31c8.284 0 15-6.716 15-15s-6.716-15-15-15h-31c-8.284 0-15 6.715-15 15z" />
                              <path d="m419.34 433.944-.357-.136c-21.791-8.301-54.72-20.847-83.983-20.847-16.094 0-30.715 5.586-44.854 10.988-12.13 4.635-23.588 9.012-34.146 9.012s-22.016-4.377-34.146-9.012c-14.139-5.402-28.759-10.988-44.854-10.988-25.122 0-41.314 5.75-68.142 15.276-4.805 1.706-10.02 3.558-15.771 5.552-7.827 2.713-11.973 11.258-9.259 19.085 2.149 6.201 7.958 10.091 14.172 10.091 1.629 0 3.288-.268 4.914-.832 5.829-2.021 11.114-3.897 15.983-5.626 26.195-9.301 38.15-13.546 58.104-13.546 10.559 0 22.016 4.377 34.146 9.012 14.139 5.402 28.759 10.988 44.854 10.988s30.715-5.586 44.854-10.988c12.13-4.635 23.588-9.012 34.146-9.012 23.742 0 53.567 11.362 73.303 18.881l.357.136c7.741 2.95 16.408-.936 19.357-8.677s-.936-16.408-8.678-19.357z" />
                            </svg>
                          </span>
                          <span>Before 6 AM</span>
                        </div>
                      </div>
                    </label>

                    <label className="sidebar-label-container  ps-0">
                      {/* <span className="checkmark"></span> */}
                      <div className="svgBOx">
                        <input
                          type="checkbox"
                          onChange={handleRadioChange}
                          value="ARR6AMto12PM"
                          name="timeArrival"
                          checked={selectedCategory.includes(
                            "timeArrival:ARR6AMto12PM"
                          )}
                        />
                        <div>
                          <span className="checkedSVG pe-2">
                            <svg
                              height="19"
                              viewBox="0 0 64 64"
                              width="19"
                              xmlns="http://www.w3.org/2000/svg"
                              id="fi_2955890"
                            >
                              <g id="Sun">
                                <path d="m31.97461 15.00244a17.00317 17.00317 0 1 0 17 17.00342 17.021 17.021 0 0 0 -17-17.00342z"></path>
                                <path d="m59.002 29.00537h-3.99663a3.00049 3.00049 0 0 0 0 6.001h3.99663a3.00049 3.00049 0 0 0 0-6.001z"></path>
                                <path d="m31.97461 51.99854a3.00307 3.00307 0 0 0 -2.99854 3.00046v4.00049a2.99829 2.99829 0 1 0 5.99658 0v-4.00049a3.00266 3.00266 0 0 0 -2.99804-3.00046z"></path>
                                <path d="m11.99316 32.00586a3.00307 3.00307 0 0 0 -2.99854-3.00049h-3.99608a3.00049 3.00049 0 0 0 0 6.001h3.99609a3.00307 3.00307 0 0 0 2.99853-3.00051z"></path>
                                <path d="m31.97461 12.00146a3.00307 3.00307 0 0 0 2.99853-3.00046v-4.00051a2.99829 2.99829 0 1 0 -5.99658 0v4.00051a3.00266 3.00266 0 0 0 2.99805 3.00046z"></path>
                                <path d="m50.36182 17.85919 2.82874-2.82874a2.99828 2.99828 0 1 0 -4.24017-4.24023l-2.8288 2.8288a2.99828 2.99828 0 1 0 4.24023 4.24017z"></path>
                                <path d="m50.36145 46.15283a2.9983 2.9983 0 1 0 -4.24023 4.24023l2.82878 2.82874a2.9983 2.9983 0 1 0 4.24023-4.24023z"></path>
                                <path d="m13.5874 46.15247-2.82874 2.8288a2.99826 2.99826 0 1 0 4.24017 4.24017l2.8288-2.82874a2.9983 2.9983 0 1 0 -4.24023-4.24023z"></path>
                                <path d="m13.58777 17.85889a2.9983 2.9983 0 1 0 4.24023-4.24024l-2.8288-2.8288a2.9983 2.9983 0 1 0 -4.2402 4.24024z"></path>
                              </g>
                            </svg>
                          </span>
                          <span>6 AM - 12 PM</span>
                        </div>
                      </div>
                    </label>

                    <label className="sidebar-label-container  ps-0">
                      {/* <span className="checkmark"></span> */}
                      <div className="svgBOx">
                        <input
                          type="checkbox"
                          onChange={handleRadioChange}
                          value="ARR12PMto6PM"
                          name="timeArrival"
                          checked={selectedCategory.includes(
                            "timeArrival:ARR12PMto6PM"
                          )}
                        />
                        <div>
                          <span className="checkedSVG pe-2">
                            <svg
                              id="fi_3223045"
                              height="19"
                              viewBox="0 0 512 512"
                              width="19"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="m205.746 77.478a10 10 0 0 0 10-10v-37.632a10 10 0 0 0 -20 0v37.632a10 10 0 0 0 10 10z"></path>
                              <path d="m118.029 93.661a10 10 0 0 0 17.321-10l-18.817-32.59a10 10 0 0 0 -17.32 10z"></path>
                              <path d="m31.226 136.379 32.589 18.821a10 10 0 1 0 10-17.32l-32.589-18.821a10 10 0 1 0 -10 17.32z"></path>
                              <path d="m57.632 225.592a10 10 0 0 0 -10-10h-37.632a10 10 0 0 0 0 20h37.632a10 10 0 0 0 10-10z"></path>
                              <path d="m77.476 299.649a10 10 0 0 0 -13.661-3.66l-32.589 18.816a10 10 0 1 0 10 17.32l32.589-18.815a10 10 0 0 0 3.661-13.661z"></path>
                              <path d="m342.688 156.536a9.953 9.953 0 0 0 4.99-1.341l32.59-18.816a10 10 0 1 0 -10-17.32l-32.59 18.816a10 10 0 0 0 5.01 18.661z"></path>
                              <path d="m279.8 97.321a10 10 0 0 0 13.66-3.66l18.815-32.59a10 10 0 0 0 -17.32-10l-18.815 32.59a10 10 0 0 0 3.66 13.66z"></path>
                              <path d="m162.525 290.2q5.259 0 10.478.515a85.595 85.595 0 0 1 99.564-41.8 105.477 105.477 0 0 1 42.621-34.329 109.99 109.99 0 1 0 -192.315 83.314 105.421 105.421 0 0 1 39.652-7.7z"></path>
                              <path d="m438.936 338.585a85.6 85.6 0 0 0 -158.164-64.635 65.622 65.622 0 0 0 -95.433 39.313 85.985 85.985 0 1 0 -22.814 168.891h267.4a72.067 72.067 0 0 0 9.011-143.569z"></path>
                            </svg>
                          </span>
                          <span>12 PM - 6 PM</span>
                        </div>
                      </div>
                    </label>

                    <label className="sidebar-label-container  ps-0">
                      {/* <span className="checkmark"></span> */}
                      <div className="svgBOx">
                        <input
                          type="checkbox"
                          onChange={handleRadioChange}
                          value="ARRafter6PM"
                          name="timeArrival"
                          checked={selectedCategory.includes(
                            "timeArrival:ARRafter6PM"
                          )}
                        />
                        <div>
                          <span className="checkedSVG pe-2">
                            <svg
                              height="19"
                              viewBox="0 -41 512.00002 512"
                              width="19"
                              xmlns="http://www.w3.org/2000/svg"
                              id="fi_1146677"
                            >
                              <path d="m251.710938 297.488281c-2.390626 0-4.832032.140625-7.261719.398438l-14.554688 1.582031-1.941406-14.511719c-4.828125-36.25-36.105469-63.574219-72.742187-63.574219-40.46875 0-73.386719 32.925782-73.386719 73.394532 0 4.140625.351562 8.3125 1.042969 12.394531l3.71875 21.871094-21.683594-4.699219c-3.761719-.8125-7.601563-1.21875-11.402344-1.21875-29.503906 0-53.5 23.992188-53.5 53.5 0 29.503906 23.996094 53.507812 53.5 53.507812h198.210938c36.574218 0 66.320312-29.753906 66.320312-66.320312 0-36.570312-29.746094-66.324219-66.320312-66.324219zm0 0"></path>
                              <path d="m481.632812 258.789062c-2.949218.171876-5.890624.25-8.808593.25-53.953125 0-103.222657-28.515624-130.066407-75.882812-28.296874-49.941406-25.816406-110.480469 6.480469-158l17.09375-25.15625-30.355469 1.742188c-27.644531 1.589843-53.941406 9.351562-78.15625 23.074218-41.75 23.664063-71.785156 62.152344-84.578124 108.398438-5.378907 19.453125-7.429688 39.277344-6.238282 58.84375 41.875 4.808594 76.921875 34.976562 87.976563 75.484375 50.609375 1.699219 91.457031 42.617187 93.007812 93.265625 30.1875-.21875 59.980469-8.121094 86.957031-23.421875 24.222657-13.722657 44.386719-32.289063 59.953126-55.191407l17.101562-25.144531zm0 0"></path>
                            </svg>
                          </span>
                          <span>After 6 PM</span>
                        </div>
                      </div>
                    </label>
                  </div>

                  {/* <Divider
                      sx={{ marginBottom: "15px", marginTop: "15px", backgroundColor: "lightgray" }}
                    /> */}

                  {/* <Divider
                    sx={{ marginBottom: "15px", backgroundColor: "gray" }}
                  /> */}
                </div>

                <div className="busDepartureMain">
                  <h2 className="sidebar-title">Airlines</h2>

                  <div>
                    <label className="sidebar-label-container  ps-0">
                      {/* <span className="checkmark"></span> */}

                      <div className="svgBOx">
                        <input
                          type="checkbox"
                          onChange={handleRadioChange}
                          value="Air India"
                          name="flightname"
                          checked={selectedCategory.includes(
                            "flightname:Air India"
                          )}
                        />
                        <div>
                          <span className="checkedSVG pe-2">
                            <img
                              src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/AI.png`}
                              alt="flight"
                            />{" "}
                          </span>
                          <span>Air India</span>
                        </div>
                      </div>
                    </label>

                    <label className="sidebar-label-container  ps-0">
                      {/* <span className="checkmark"></span> */}
                      <div className="svgBOx">
                        <input
                          type="checkbox"
                          onChange={handleRadioChange}
                          value="Indigo"
                          name="flightname"
                          checked={selectedCategory.includes(
                            "flightname:Indigo"
                          )}
                        />
                        <div>
                          <span className="checkedSVG pe-2">
                            <img
                              src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/6E.png`}
                              alt="flight"
                            />{" "}
                          </span>
                          <span>Indigo</span>
                        </div>
                      </div>
                    </label>

                    <label className="sidebar-label-container  ps-0">
                      {/* <span className="checkmark"></span> */}
                      <div className="svgBOx">
                        <input
                          type="checkbox"
                          onChange={handleRadioChange}
                          value="SpiceJet"
                          name="flightname"
                          checked={selectedCategory.includes(
                            "flightname:SpiceJet"
                          )}
                        />
                        <div>
                          <span className="checkedSVG pe-2">
                            <img
                              src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/SG.png`}
                              alt="flight"
                            />{" "}
                          </span>
                          <span>SpiceJet</span>
                        </div>
                      </div>
                    </label>

                    <label className="sidebar-label-container  ps-0">
                      {/* <span className="checkmark"></span> */}
                      <div className="svgBOx">
                        <input
                          type="checkbox"
                          onChange={handleRadioChange}
                          value="Vistara"
                          name="flightname"
                          checked={selectedCategory.includes(
                            "flightname:Vistara"
                          )}
                        />
                        <div>
                          <span className="checkedSVG pe-2">
                            <img
                              src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/UK.png`}
                              alt="flight"
                            />{" "}
                          </span>
                          <span>Vistara</span>
                        </div>
                      </div>
                    </label>
                  </div>

                  {/* <Divider
                      sx={{ marginBottom: "15px", marginTop: "15px", backgroundColor: "lightgray" }}
                    /> */}
                </div>
              </div>
            </div>
          </motion.div>
          {/* design for mobile device  */}

          <div className="d-none d-sm-block col-lg-3 col-md-3 scrollDesign">
            <div className="flightFilterBox">
              <div className="filterTitle">
                <p>Select Filters</p>
              </div>
              <div className="ClearFilterOneyOneContainer">
                {selectedCategory.map((item, index) => (
                  <div
                    onClick={() => handelClearOne(item)}
                    className="ClearFilterOneyOneItemDev"
                  >
                    <div className="ClearFilterOneyOneItem">{item} </div>
                    <div className="ClearFilterOneyOneItemX">X</div>
                  </div>
                ))}
              </div>
              <div className="innerFilter">
                <div>
                  <div>
                    <label className="sidebar-label-container ps-0">
                      <input
                        type="checkbox"
                        onChange={handleRadioChange}
                        value="All"
                        name="test"
                        checked={selectedCategory.includes("test:All")}
                      />
                      {/* <span className="checkmark"></span> */}
                      <span
                        style={{
                          color: selectedCategory.length > 0 ? "red" : "gray",
                        }}
                      >
                        Clear Filter
                      </span>
                    </label>
                  </div>
                  {/* <Divider
                    sx={{ marginBottom: "15px", backgroundColor: "gray" }}
                  /> */}
                </div>

                <div className="busDepartureMain">
                  <h2 className="sidebar-title">Suggested for you</h2>

                  <div>
                    <label className="sidebar-label-container  ps-0">
                      {/* <span className="checkmark"></span> */}

                      <div className="svgBOx">
                        <input
                          type="checkbox"
                          onChange={handleRadioChange}
                          value="1"
                          name="stop"
                          checked={selectedCategory.includes("stop:1")}
                        />
                        <div>
                          <span className="checkedSVG pe-2">
                            <svg
                              id="fi_2089699"
                              enable-background="new 0 0 515.556 515.556"
                              height="19"
                              viewBox="0 0 515.556 515.556"
                              width="19"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="m257.778 0c-142.137 0-257.778 115.641-257.778 257.778s115.641 257.778 257.778 257.778 257.778-115.641 257.778-257.778-115.642-257.778-257.778-257.778zm-193.334 257.778c0-41.69 13.397-80.235 35.924-111.846l269.255 269.255c-31.611 22.526-70.156 35.924-111.846 35.924-106.609 0-193.333-86.723-193.333-193.333zm350.743 111.846-269.256-269.256c31.611-22.526 70.156-35.924 111.846-35.924 106.61 0 193.333 86.723 193.333 193.333 0 41.691-13.397 80.236-35.923 111.847z"></path>
                            </svg>
                          </span>
                          <span>Non Stop</span>
                        </div>
                      </div>
                    </label>

                    <label className="sidebar-label-container  ps-0">
                      {/* <span className="checkmark"></span> */}
                      <div className="svgBOx">
                        <input
                          type="checkbox"
                          onChange={handleRadioChange}
                          value="2"
                          name="stop"
                          checked={selectedCategory.includes("stop:2")}
                        />
                        <div>
                          <span className="checkedSVG pe-2">
                            <svg
                              height="19"
                              viewBox="0 0 32 32"
                              width="19"
                              xmlns="http://www.w3.org/2000/svg"
                              id="fi_4212317"
                            >
                              <g id="_62-Stopwatch" data-name="62-Stopwatch">
                                <path d="m25.15 10.26 1.56-1.55a1 1 0 1 0 -1.42-1.42l-1.55 1.56a11.9 11.9 0 0 0 -6.74-2.8v-2.05h2a1 1 0 0 0 0-2h-6a1 1 0 0 0 0 2h2v2.05a12 12 0 1 0 10.15 4.21zm-9.15 17.74a10 10 0 1 1 10-10 10 10 0 0 1 -10 10z"></path>
                                <path d="m16 10a8 8 0 1 0 8 8 8 8 0 0 0 -8-8zm3.71 11.71a1 1 0 0 1 -1.42 0l-3-3a1 1 0 0 1 -.29-.71v-5a1 1 0 0 1 2 0v4.59l2.71 2.7a1 1 0 0 1 0 1.42z"></path>
                              </g>
                            </svg>
                          </span>
                          <span>One Stop</span>
                        </div>
                      </div>
                    </label>

                    <label className="sidebar-label-container  ps-0">
                      {/* <span className="checkmark"></span> */}
                      <div className="svgBOx">
                        <input
                          type="checkbox"
                          onChange={handleRadioChange}
                          value="SpiceJet"
                          name="flightname"
                          checked={selectedCategory.includes(
                            "flightname:SpiceJet"
                          )}
                        />
                        <div>
                          <span className="checkedSVG pe-2">
                            <img
                              src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/SG.png`}
                              alt="flight"
                            />{" "}
                          </span>
                          <span>SpiceJet</span>
                        </div>
                      </div>
                    </label>

                    <label className="sidebar-label-container  ps-0">
                      {/* <span className="checkmark"></span> */}
                      <div className="svgBOx">
                        <input
                          type="checkbox"
                          onChange={handleRadioChange}
                          value="Vistara"
                          name="flightname"
                          checked={selectedCategory.includes(
                            "flightname:Vistara"
                          )}
                        />
                        <div>
                          <span className="checkedSVG pe-2">
                            <img
                              src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/UK.png`}
                              alt="flight"
                            />{" "}
                          </span>
                          <span>Vistara</span>
                        </div>
                      </div>
                    </label>
                  </div>

                  {/* <Divider
                      sx={{ marginBottom: "15px", marginTop: "15px", backgroundColor: "lightgray" }}
                    /> */}

                  {/* <Divider
                    sx={{ marginBottom: "15px", backgroundColor: "gray" }}
                  /> */}
                </div>

                <div className="PackageDepartureMain">
                  <h2 className="sidebar-title">By Price</h2>
                  <div className="position-relative">
                    <input
                      type="range"
                      id="rangePriceRange"
                      min={minPrice + 1}
                      max={maxPrice + 1}
                      step="5000"
                      value={priceRangeValue}
                      onChange={handlePriceRangeChange}
                      // onMouseDown={()=>{setValueShow(true);
                      // }
                      // }
                      onMouseOver={() => setValueShow(true)}
                      // onMouseUp={()=>setValueShow(true)}

                      onMouseLeave={() => {
                        setValueShow(false);
                        setCursorPosition({ x: 0, y: 0 });
                      }}
                      onMouseOut={() => {
                        setValueShow(false);
                        setCursorPosition({ x: 0, y: 0 });
                      }}
                      onMouseMove={(e) => handleMouseMove(e)}
                    />
                    {valueShow && (
                      <span
                        className="btn btn-secondary"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        data-bs-title="Tooltip on top"
                        style={{
                          position: "fixed",
                          left: cursorPosition.x - 20,
                          top: cursorPosition.y - 60,
                        }}
                      >
                        {" "}
                        ₹{priceRangeValue}
                      </span>
                    )}
                    <span>
                      Max price ₹{""}
                      {priceRangeValue}
                    </span>
                  </div>
                  <Divider
                    sx={{ marginBottom: "15px", backgroundColor: "gray" }}
                  />
                </div>
                {/* <div style={{ position: "fixed", top: cursorPosition.x, left: cursorPosition.y, zIndex: 9999 }}>{"priceRangeValue"}</div> */}

                <div className="busDepartureMain">
                  <h2 className="sidebar-title">
                    Departure From{" "}
                    {results.length > 0 &&
                      results?.[0][0]?.Segments?.[0][0]?.Origin?.Airport
                        ?.CityName}
                  </h2>

                  <div>
                    <label className="sidebar-label-container  ps-0">
                      {/* <span className="checkmark"></span> */}

                      <div className="svgBOx">
                        <input
                          type="checkbox"
                          onChange={handleRadioChange}
                          value="before6AM"
                          name="timeDepart"
                          checked={selectedCategory.includes(
                            "timeDepart:before6AM"
                          )}
                        />
                        <div>
                          <span className="checkedSVG pe-2">
                            <svg
                              id="Capa_1"
                              enable-background="new 0 0 512 512"
                              height="19"
                              viewBox="0 0 512 512"
                              width="19"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="m211.709 313.959c17.085 6.479 31.841 12.076 44.291 12.076s27.206-5.596 44.291-12.076c22.154-8.402 47.264-17.925 76.207-17.925 11.314 0 22.44.935 33.357 2.542-3.398-81.931-71.103-147.541-153.855-147.541-82.722 0-150.409 65.564-153.851 147.454 10.858-1.56 21.957-2.455 33.354-2.455 28.942 0 54.052 9.523 76.206 17.925z" />
                              <path d="m502.205 356.969-4.758-1.765c-36.837-13.672-78.589-29.169-120.949-29.169-23.445 0-44.859 8.121-65.568 15.975-19.019 7.213-36.982 14.025-54.929 14.025s-35.911-6.813-54.929-14.025c-20.709-7.854-42.124-15.975-65.568-15.975-43.64 0-84.687 15.472-124.382 30.435l-1.405.529c-7.752 2.921-11.668 11.574-8.746 19.326 2.921 7.752 11.574 11.668 19.326 8.746l1.406-.53c38.893-14.66 75.627-28.507 113.801-28.507 17.947 0 35.911 6.813 54.93 14.025 20.709 7.854 42.123 15.975 65.567 15.975s44.858-8.121 65.567-15.975c19.019-7.213 36.983-14.025 54.93-14.025 36.972 0 74.356 13.875 110.51 27.294l4.777 1.772c1.718.636 3.478.938 5.208.938 6.096 0 11.827-3.743 14.068-9.794 2.877-7.768-1.088-16.398-8.856-19.275z" />
                              <path d="m15 320.034h31c8.284 0 15-6.716 15-15s-6.716-15-15-15h-31c-8.284 0-15 6.716-15 15s6.716 15 15 15z" />
                              <path d="m39.788 197.524 26.847 15.5c2.362 1.364 4.941 2.012 7.486 2.012 5.184 0 10.226-2.69 13.004-7.502 4.142-7.174 1.684-16.348-5.49-20.49l-26.847-15.5c-7.176-4.144-16.348-1.684-20.49 5.49s-1.684 16.348 5.49 20.49z" />
                              <path d="m138.01 130.669c2.778 4.812 7.82 7.502 13.004 7.502 2.544 0 5.124-.648 7.486-2.012 7.174-4.142 9.632-13.315 5.49-20.49l-15.5-26.847c-4.142-7.173-13.314-9.633-20.49-5.49-7.174 4.142-9.632 13.315-5.49 20.49z" />
                              <path d="m256 110.035c8.284 0 15-6.716 15-15v-31c0-8.284-6.716-15-15-15s-15 6.716-15 15v31c0 8.284 6.716 15 15 15z" />
                              <path d="m353.5 136.16c2.362 1.364 4.941 2.012 7.486 2.012 5.184 0 10.226-2.69 13.004-7.502l15.5-26.847c4.142-7.174 1.684-16.348-5.49-20.49-7.176-4.143-16.349-1.684-20.49 5.49l-15.5 26.847c-4.142 7.174-1.684 16.347 5.49 20.49z" />
                              <path d="m437.879 215.037c2.544 0 5.124-.648 7.486-2.012l26.847-15.5c7.174-4.142 9.632-13.316 5.49-20.49s-13.315-9.633-20.49-5.49l-26.847 15.5c-7.174 4.142-9.632 13.316-5.49 20.49 2.778 4.812 7.82 7.502 13.004 7.502z" />
                              <path d="m451 305.035c0 8.284 6.716 15 15 15h31c8.284 0 15-6.716 15-15s-6.716-15-15-15h-31c-8.284 0-15 6.715-15 15z" />
                              <path d="m419.34 433.944-.357-.136c-21.791-8.301-54.72-20.847-83.983-20.847-16.094 0-30.715 5.586-44.854 10.988-12.13 4.635-23.588 9.012-34.146 9.012s-22.016-4.377-34.146-9.012c-14.139-5.402-28.759-10.988-44.854-10.988-25.122 0-41.314 5.75-68.142 15.276-4.805 1.706-10.02 3.558-15.771 5.552-7.827 2.713-11.973 11.258-9.259 19.085 2.149 6.201 7.958 10.091 14.172 10.091 1.629 0 3.288-.268 4.914-.832 5.829-2.021 11.114-3.897 15.983-5.626 26.195-9.301 38.15-13.546 58.104-13.546 10.559 0 22.016 4.377 34.146 9.012 14.139 5.402 28.759 10.988 44.854 10.988s30.715-5.586 44.854-10.988c12.13-4.635 23.588-9.012 34.146-9.012 23.742 0 53.567 11.362 73.303 18.881l.357.136c7.741 2.95 16.408-.936 19.357-8.677s-.936-16.408-8.678-19.357z" />
                            </svg>
                          </span>
                          <span>Before 6 AM</span>
                        </div>
                      </div>
                    </label>

                    <label className="sidebar-label-container  ps-0">
                      {/* <span className="checkmark"></span> */}
                      <div className="svgBOx">
                        <input
                          type="checkbox"
                          onChange={handleRadioChange}
                          value="6AMto12PM"
                          name="timeDepart"
                          checked={selectedCategory.includes(
                            "timeDepart:6AMto12PM"
                          )}
                        />
                        <div>
                          <span className="checkedSVG pe-2">
                            <svg
                              height="19"
                              viewBox="0 0 64 64"
                              width="19"
                              xmlns="http://www.w3.org/2000/svg"
                              id="fi_2955890"
                            >
                              <g id="Sun">
                                <path d="m31.97461 15.00244a17.00317 17.00317 0 1 0 17 17.00342 17.021 17.021 0 0 0 -17-17.00342z"></path>
                                <path d="m59.002 29.00537h-3.99663a3.00049 3.00049 0 0 0 0 6.001h3.99663a3.00049 3.00049 0 0 0 0-6.001z"></path>
                                <path d="m31.97461 51.99854a3.00307 3.00307 0 0 0 -2.99854 3.00046v4.00049a2.99829 2.99829 0 1 0 5.99658 0v-4.00049a3.00266 3.00266 0 0 0 -2.99804-3.00046z"></path>
                                <path d="m11.99316 32.00586a3.00307 3.00307 0 0 0 -2.99854-3.00049h-3.99608a3.00049 3.00049 0 0 0 0 6.001h3.99609a3.00307 3.00307 0 0 0 2.99853-3.00051z"></path>
                                <path d="m31.97461 12.00146a3.00307 3.00307 0 0 0 2.99853-3.00046v-4.00051a2.99829 2.99829 0 1 0 -5.99658 0v4.00051a3.00266 3.00266 0 0 0 2.99805 3.00046z"></path>
                                <path d="m50.36182 17.85919 2.82874-2.82874a2.99828 2.99828 0 1 0 -4.24017-4.24023l-2.8288 2.8288a2.99828 2.99828 0 1 0 4.24023 4.24017z"></path>
                                <path d="m50.36145 46.15283a2.9983 2.9983 0 1 0 -4.24023 4.24023l2.82878 2.82874a2.9983 2.9983 0 1 0 4.24023-4.24023z"></path>
                                <path d="m13.5874 46.15247-2.82874 2.8288a2.99826 2.99826 0 1 0 4.24017 4.24017l2.8288-2.82874a2.9983 2.9983 0 1 0 -4.24023-4.24023z"></path>
                                <path d="m13.58777 17.85889a2.9983 2.9983 0 1 0 4.24023-4.24024l-2.8288-2.8288a2.9983 2.9983 0 1 0 -4.2402 4.24024z"></path>
                              </g>
                            </svg>
                          </span>
                          <span>6 AM - 12 PM</span>
                        </div>
                      </div>
                    </label>

                    <label className="sidebar-label-container  ps-0">
                      {/* <span className="checkmark"></span> */}
                      <div className="svgBOx">
                        <input
                          type="checkbox"
                          onChange={handleRadioChange}
                          value="12PMto6PM"
                          name="timeDepart"
                          checked={selectedCategory.includes(
                            "timeDepart:12PMto6PM"
                          )}
                        />
                        <div>
                          <span className="checkedSVG pe-2">
                            <svg
                              id="fi_3223045"
                              height="19"
                              viewBox="0 0 512 512"
                              width="19"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="m205.746 77.478a10 10 0 0 0 10-10v-37.632a10 10 0 0 0 -20 0v37.632a10 10 0 0 0 10 10z"></path>
                              <path d="m118.029 93.661a10 10 0 0 0 17.321-10l-18.817-32.59a10 10 0 0 0 -17.32 10z"></path>
                              <path d="m31.226 136.379 32.589 18.821a10 10 0 1 0 10-17.32l-32.589-18.821a10 10 0 1 0 -10 17.32z"></path>
                              <path d="m57.632 225.592a10 10 0 0 0 -10-10h-37.632a10 10 0 0 0 0 20h37.632a10 10 0 0 0 10-10z"></path>
                              <path d="m77.476 299.649a10 10 0 0 0 -13.661-3.66l-32.589 18.816a10 10 0 1 0 10 17.32l32.589-18.815a10 10 0 0 0 3.661-13.661z"></path>
                              <path d="m342.688 156.536a9.953 9.953 0 0 0 4.99-1.341l32.59-18.816a10 10 0 1 0 -10-17.32l-32.59 18.816a10 10 0 0 0 5.01 18.661z"></path>
                              <path d="m279.8 97.321a10 10 0 0 0 13.66-3.66l18.815-32.59a10 10 0 0 0 -17.32-10l-18.815 32.59a10 10 0 0 0 3.66 13.66z"></path>
                              <path d="m162.525 290.2q5.259 0 10.478.515a85.595 85.595 0 0 1 99.564-41.8 105.477 105.477 0 0 1 42.621-34.329 109.99 109.99 0 1 0 -192.315 83.314 105.421 105.421 0 0 1 39.652-7.7z"></path>
                              <path d="m438.936 338.585a85.6 85.6 0 0 0 -158.164-64.635 65.622 65.622 0 0 0 -95.433 39.313 85.985 85.985 0 1 0 -22.814 168.891h267.4a72.067 72.067 0 0 0 9.011-143.569z"></path>
                            </svg>
                          </span>
                          <span>12 PM - 6 PM</span>
                        </div>
                      </div>
                    </label>

                    <label className="sidebar-label-container  ps-0">
                      {/* <span className="checkmark"></span> */}
                      <div className="svgBOx">
                        <input
                          type="checkbox"
                          onChange={handleRadioChange}
                          value="after6PM"
                          name="timeDepart"
                          checked={selectedCategory.includes(
                            "timeDepart:after6PM"
                          )}
                        />
                        <div>
                          <span className="checkedSVG pe-2">
                            <svg
                              height="19"
                              viewBox="0 -41 512.00002 512"
                              width="19"
                              xmlns="http://www.w3.org/2000/svg"
                              id="fi_1146677"
                            >
                              <path d="m251.710938 297.488281c-2.390626 0-4.832032.140625-7.261719.398438l-14.554688 1.582031-1.941406-14.511719c-4.828125-36.25-36.105469-63.574219-72.742187-63.574219-40.46875 0-73.386719 32.925782-73.386719 73.394532 0 4.140625.351562 8.3125 1.042969 12.394531l3.71875 21.871094-21.683594-4.699219c-3.761719-.8125-7.601563-1.21875-11.402344-1.21875-29.503906 0-53.5 23.992188-53.5 53.5 0 29.503906 23.996094 53.507812 53.5 53.507812h198.210938c36.574218 0 66.320312-29.753906 66.320312-66.320312 0-36.570312-29.746094-66.324219-66.320312-66.324219zm0 0"></path>
                              <path d="m481.632812 258.789062c-2.949218.171876-5.890624.25-8.808593.25-53.953125 0-103.222657-28.515624-130.066407-75.882812-28.296874-49.941406-25.816406-110.480469 6.480469-158l17.09375-25.15625-30.355469 1.742188c-27.644531 1.589843-53.941406 9.351562-78.15625 23.074218-41.75 23.664063-71.785156 62.152344-84.578124 108.398438-5.378907 19.453125-7.429688 39.277344-6.238282 58.84375 41.875 4.808594 76.921875 34.976562 87.976563 75.484375 50.609375 1.699219 91.457031 42.617187 93.007812 93.265625 30.1875-.21875 59.980469-8.121094 86.957031-23.421875 24.222657-13.722657 44.386719-32.289063 59.953126-55.191407l17.101562-25.144531zm0 0"></path>
                            </svg>
                          </span>
                          <span>After 6 PM</span>
                        </div>
                      </div>
                    </label>
                  </div>

                  {/* <Divider
                    sx={{ marginBottom: "15px", backgroundColor: "gray" }}
                  /> */}
                </div>

                <div className="busDepartureMain">
                  <h2 className="sidebar-title">
                    Arrival at{" "}
                    {results.length > 0 &&
                      results?.[0][0]?.Segments?.[0][arrSegmentLength - 1]
                        ?.Destination?.Airport?.CityName}
                  </h2>

                  <div>
                    <label className="sidebar-label-container  ps-0">
                      {/* <span className="checkmark"></span> */}

                      <div className="svgBOx">
                        <input
                          type="checkbox"
                          onChange={handleRadioChange}
                          value="ARRbefore6AM"
                          name="timeArrival"
                          checked={selectedCategory.includes(
                            "timeArrival:ARRbefore6AM"
                          )}
                        />
                        <div>
                          <span className="checkedSVG pe-2">
                            <svg
                              id="Capa_1"
                              enable-background="new 0 0 512 512"
                              height="19"
                              viewBox="0 0 512 512"
                              width="19"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="m211.709 313.959c17.085 6.479 31.841 12.076 44.291 12.076s27.206-5.596 44.291-12.076c22.154-8.402 47.264-17.925 76.207-17.925 11.314 0 22.44.935 33.357 2.542-3.398-81.931-71.103-147.541-153.855-147.541-82.722 0-150.409 65.564-153.851 147.454 10.858-1.56 21.957-2.455 33.354-2.455 28.942 0 54.052 9.523 76.206 17.925z" />
                              <path d="m502.205 356.969-4.758-1.765c-36.837-13.672-78.589-29.169-120.949-29.169-23.445 0-44.859 8.121-65.568 15.975-19.019 7.213-36.982 14.025-54.929 14.025s-35.911-6.813-54.929-14.025c-20.709-7.854-42.124-15.975-65.568-15.975-43.64 0-84.687 15.472-124.382 30.435l-1.405.529c-7.752 2.921-11.668 11.574-8.746 19.326 2.921 7.752 11.574 11.668 19.326 8.746l1.406-.53c38.893-14.66 75.627-28.507 113.801-28.507 17.947 0 35.911 6.813 54.93 14.025 20.709 7.854 42.123 15.975 65.567 15.975s44.858-8.121 65.567-15.975c19.019-7.213 36.983-14.025 54.93-14.025 36.972 0 74.356 13.875 110.51 27.294l4.777 1.772c1.718.636 3.478.938 5.208.938 6.096 0 11.827-3.743 14.068-9.794 2.877-7.768-1.088-16.398-8.856-19.275z" />
                              <path d="m15 320.034h31c8.284 0 15-6.716 15-15s-6.716-15-15-15h-31c-8.284 0-15 6.716-15 15s6.716 15 15 15z" />
                              <path d="m39.788 197.524 26.847 15.5c2.362 1.364 4.941 2.012 7.486 2.012 5.184 0 10.226-2.69 13.004-7.502 4.142-7.174 1.684-16.348-5.49-20.49l-26.847-15.5c-7.176-4.144-16.348-1.684-20.49 5.49s-1.684 16.348 5.49 20.49z" />
                              <path d="m138.01 130.669c2.778 4.812 7.82 7.502 13.004 7.502 2.544 0 5.124-.648 7.486-2.012 7.174-4.142 9.632-13.315 5.49-20.49l-15.5-26.847c-4.142-7.173-13.314-9.633-20.49-5.49-7.174 4.142-9.632 13.315-5.49 20.49z" />
                              <path d="m256 110.035c8.284 0 15-6.716 15-15v-31c0-8.284-6.716-15-15-15s-15 6.716-15 15v31c0 8.284 6.716 15 15 15z" />
                              <path d="m353.5 136.16c2.362 1.364 4.941 2.012 7.486 2.012 5.184 0 10.226-2.69 13.004-7.502l15.5-26.847c4.142-7.174 1.684-16.348-5.49-20.49-7.176-4.143-16.349-1.684-20.49 5.49l-15.5 26.847c-4.142 7.174-1.684 16.347 5.49 20.49z" />
                              <path d="m437.879 215.037c2.544 0 5.124-.648 7.486-2.012l26.847-15.5c7.174-4.142 9.632-13.316 5.49-20.49s-13.315-9.633-20.49-5.49l-26.847 15.5c-7.174 4.142-9.632 13.316-5.49 20.49 2.778 4.812 7.82 7.502 13.004 7.502z" />
                              <path d="m451 305.035c0 8.284 6.716 15 15 15h31c8.284 0 15-6.716 15-15s-6.716-15-15-15h-31c-8.284 0-15 6.715-15 15z" />
                              <path d="m419.34 433.944-.357-.136c-21.791-8.301-54.72-20.847-83.983-20.847-16.094 0-30.715 5.586-44.854 10.988-12.13 4.635-23.588 9.012-34.146 9.012s-22.016-4.377-34.146-9.012c-14.139-5.402-28.759-10.988-44.854-10.988-25.122 0-41.314 5.75-68.142 15.276-4.805 1.706-10.02 3.558-15.771 5.552-7.827 2.713-11.973 11.258-9.259 19.085 2.149 6.201 7.958 10.091 14.172 10.091 1.629 0 3.288-.268 4.914-.832 5.829-2.021 11.114-3.897 15.983-5.626 26.195-9.301 38.15-13.546 58.104-13.546 10.559 0 22.016 4.377 34.146 9.012 14.139 5.402 28.759 10.988 44.854 10.988s30.715-5.586 44.854-10.988c12.13-4.635 23.588-9.012 34.146-9.012 23.742 0 53.567 11.362 73.303 18.881l.357.136c7.741 2.95 16.408-.936 19.357-8.677s-.936-16.408-8.678-19.357z" />
                            </svg>
                          </span>
                          <span>Before 6 AM</span>
                        </div>
                      </div>
                    </label>

                    <label className="sidebar-label-container  ps-0">
                      {/* <span className="checkmark"></span> */}
                      <div className="svgBOx">
                        <input
                          type="checkbox"
                          onChange={handleRadioChange}
                          value="ARR6AMto12PM"
                          name="timeArrival"
                          checked={selectedCategory.includes(
                            "timeArrival:ARR6AMto12PM"
                          )}
                        />
                        <div>
                          <span className="checkedSVG pe-2">
                            <svg
                              height="19"
                              viewBox="0 0 64 64"
                              width="19"
                              xmlns="http://www.w3.org/2000/svg"
                              id="fi_2955890"
                            >
                              <g id="Sun">
                                <path d="m31.97461 15.00244a17.00317 17.00317 0 1 0 17 17.00342 17.021 17.021 0 0 0 -17-17.00342z"></path>
                                <path d="m59.002 29.00537h-3.99663a3.00049 3.00049 0 0 0 0 6.001h3.99663a3.00049 3.00049 0 0 0 0-6.001z"></path>
                                <path d="m31.97461 51.99854a3.00307 3.00307 0 0 0 -2.99854 3.00046v4.00049a2.99829 2.99829 0 1 0 5.99658 0v-4.00049a3.00266 3.00266 0 0 0 -2.99804-3.00046z"></path>
                                <path d="m11.99316 32.00586a3.00307 3.00307 0 0 0 -2.99854-3.00049h-3.99608a3.00049 3.00049 0 0 0 0 6.001h3.99609a3.00307 3.00307 0 0 0 2.99853-3.00051z"></path>
                                <path d="m31.97461 12.00146a3.00307 3.00307 0 0 0 2.99853-3.00046v-4.00051a2.99829 2.99829 0 1 0 -5.99658 0v4.00051a3.00266 3.00266 0 0 0 2.99805 3.00046z"></path>
                                <path d="m50.36182 17.85919 2.82874-2.82874a2.99828 2.99828 0 1 0 -4.24017-4.24023l-2.8288 2.8288a2.99828 2.99828 0 1 0 4.24023 4.24017z"></path>
                                <path d="m50.36145 46.15283a2.9983 2.9983 0 1 0 -4.24023 4.24023l2.82878 2.82874a2.9983 2.9983 0 1 0 4.24023-4.24023z"></path>
                                <path d="m13.5874 46.15247-2.82874 2.8288a2.99826 2.99826 0 1 0 4.24017 4.24017l2.8288-2.82874a2.9983 2.9983 0 1 0 -4.24023-4.24023z"></path>
                                <path d="m13.58777 17.85889a2.9983 2.9983 0 1 0 4.24023-4.24024l-2.8288-2.8288a2.9983 2.9983 0 1 0 -4.2402 4.24024z"></path>
                              </g>
                            </svg>
                          </span>
                          <span>6 AM - 12 PM</span>
                        </div>
                      </div>
                    </label>

                    <label className="sidebar-label-container  ps-0">
                      {/* <span className="checkmark"></span> */}
                      <div className="svgBOx">
                        <input
                          type="checkbox"
                          onChange={handleRadioChange}
                          value="ARR12PMto6PM"
                          name="timeArrival"
                          checked={selectedCategory.includes(
                            "timeArrival:ARR12PMto6PM"
                          )}
                        />
                        <div>
                          <span className="checkedSVG pe-2">
                            <svg
                              id="fi_3223045"
                              height="19"
                              viewBox="0 0 512 512"
                              width="19"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="m205.746 77.478a10 10 0 0 0 10-10v-37.632a10 10 0 0 0 -20 0v37.632a10 10 0 0 0 10 10z"></path>
                              <path d="m118.029 93.661a10 10 0 0 0 17.321-10l-18.817-32.59a10 10 0 0 0 -17.32 10z"></path>
                              <path d="m31.226 136.379 32.589 18.821a10 10 0 1 0 10-17.32l-32.589-18.821a10 10 0 1 0 -10 17.32z"></path>
                              <path d="m57.632 225.592a10 10 0 0 0 -10-10h-37.632a10 10 0 0 0 0 20h37.632a10 10 0 0 0 10-10z"></path>
                              <path d="m77.476 299.649a10 10 0 0 0 -13.661-3.66l-32.589 18.816a10 10 0 1 0 10 17.32l32.589-18.815a10 10 0 0 0 3.661-13.661z"></path>
                              <path d="m342.688 156.536a9.953 9.953 0 0 0 4.99-1.341l32.59-18.816a10 10 0 1 0 -10-17.32l-32.59 18.816a10 10 0 0 0 5.01 18.661z"></path>
                              <path d="m279.8 97.321a10 10 0 0 0 13.66-3.66l18.815-32.59a10 10 0 0 0 -17.32-10l-18.815 32.59a10 10 0 0 0 3.66 13.66z"></path>
                              <path d="m162.525 290.2q5.259 0 10.478.515a85.595 85.595 0 0 1 99.564-41.8 105.477 105.477 0 0 1 42.621-34.329 109.99 109.99 0 1 0 -192.315 83.314 105.421 105.421 0 0 1 39.652-7.7z"></path>
                              <path d="m438.936 338.585a85.6 85.6 0 0 0 -158.164-64.635 65.622 65.622 0 0 0 -95.433 39.313 85.985 85.985 0 1 0 -22.814 168.891h267.4a72.067 72.067 0 0 0 9.011-143.569z"></path>
                            </svg>
                          </span>
                          <span>12 PM - 6 PM</span>
                        </div>
                      </div>
                    </label>

                    <label className="sidebar-label-container  ps-0">
                      {/* <span className="checkmark"></span> */}
                      <div className="svgBOx">
                        <input
                          type="checkbox"
                          onChange={handleRadioChange}
                          value="ARRafter6PM"
                          name="timeArrival"
                          checked={selectedCategory.includes(
                            "timeArrival:ARRafter6PM"
                          )}
                        />
                        <div>
                          <span className="checkedSVG pe-2">
                            <svg
                              height="19"
                              viewBox="0 -41 512.00002 512"
                              width="19"
                              xmlns="http://www.w3.org/2000/svg"
                              id="fi_1146677"
                            >
                              <path d="m251.710938 297.488281c-2.390626 0-4.832032.140625-7.261719.398438l-14.554688 1.582031-1.941406-14.511719c-4.828125-36.25-36.105469-63.574219-72.742187-63.574219-40.46875 0-73.386719 32.925782-73.386719 73.394532 0 4.140625.351562 8.3125 1.042969 12.394531l3.71875 21.871094-21.683594-4.699219c-3.761719-.8125-7.601563-1.21875-11.402344-1.21875-29.503906 0-53.5 23.992188-53.5 53.5 0 29.503906 23.996094 53.507812 53.5 53.507812h198.210938c36.574218 0 66.320312-29.753906 66.320312-66.320312 0-36.570312-29.746094-66.324219-66.320312-66.324219zm0 0"></path>
                              <path d="m481.632812 258.789062c-2.949218.171876-5.890624.25-8.808593.25-53.953125 0-103.222657-28.515624-130.066407-75.882812-28.296874-49.941406-25.816406-110.480469 6.480469-158l17.09375-25.15625-30.355469 1.742188c-27.644531 1.589843-53.941406 9.351562-78.15625 23.074218-41.75 23.664063-71.785156 62.152344-84.578124 108.398438-5.378907 19.453125-7.429688 39.277344-6.238282 58.84375 41.875 4.808594 76.921875 34.976562 87.976563 75.484375 50.609375 1.699219 91.457031 42.617187 93.007812 93.265625 30.1875-.21875 59.980469-8.121094 86.957031-23.421875 24.222657-13.722657 44.386719-32.289063 59.953126-55.191407l17.101562-25.144531zm0 0"></path>
                            </svg>
                          </span>
                          <span>After 6 PM</span>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="busDepartureMain">
                  <h2 className="sidebar-title">Airlines</h2>
                  <div>
                    {[
                      ...new Set(
                        currentItems?.map(
                          (item) =>
                            `${results[0][item]?.Segments[0][0]?.Airline?.AirlineName}, ${results[0][item]?.Segments[0][0]?.Airline?.AirlineCode}`
                        )
                      ),
                    ].map((airline, index) => (
                      <label
                        key={index}
                        className="sidebar-label-container  ps-0"
                      >
                        <div className="svgBOx">
                          <input
                            type="checkbox"
                            onChange={handleRadioChange}
                            value={airline.split(",")[0]}
                            name="flightname"
                            checked={selectedCategory.includes(
                              `flightname:${airline.split(",")[0]}`
                            )}
                          />
                          <div>
                            <span className="checkedSVG imgBoxFilter pe-2">
                              <img
                                src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/${airline
                                  .split(",")[1]
                                  .trim()}.png`}
                                alt="flight"
                              />{" "}
                            </span>
                            <span>{airline.split(",")[0]}</span>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {reducerState?.oneWay?.isLoading === true ? (
            <div className="col-lg-9 col-md-9">
              {[1, 2, 3, 5, 6, 7, 8].map((item) => (
                <motion.div
                  variants={variants}
                  initial="initial"
                  whileInView="animate"
                >
                  <motion.div
                    variants={variants}
                    className="singleFlightBox mb-3"
                    style={{ height: "130px", padding: "15px" }}
                  >
                    <div className="singleFlightBoxOne">
                      <div>
                        <Skeleton>
                          <div style={{ height: "80px", width: "80px" }}></div>
                        </Skeleton>
                      </div>
                      <span>
                        {
                          <Skeleton>
                            <p style={{ height: "10px", width: "70px" }}></p>
                          </Skeleton>
                        }
                      </span>
                      <p>
                        { }
                        { }
                      </p>
                    </div>
                    <div className="singleFlightBoxTwo">
                      <span>
                        {
                          <Skeleton>
                            {" "}
                            <p style={{ height: "10px", width: "70px" }}></p>
                          </Skeleton>
                        }
                      </span>
                      <p>
                        <Skeleton>
                          <p style={{ height: "8px", width: "70px" }}></p>
                        </Skeleton>
                      </p>
                      <Skeleton>
                        <p style={{ height: "8px", width: "70px" }}></p>
                      </Skeleton>
                    </div>

                    <div className="singleFlightBoxThree">
                      <Skeleton>
                        <p style={{ height: "8px", width: "70px" }}></p>
                      </Skeleton>

                      <Skeleton>
                        {" "}
                        <p style={{ height: "8px", width: "70px" }}></p>
                      </Skeleton>

                      <span></span>
                    </div>

                    <div className="singleFlightBoxFour">
                      <span>
                        {
                          <Skeleton>
                            {" "}
                            <p style={{ height: "8px", width: "70px" }}></p>
                          </Skeleton>
                        }
                      </span>
                      <Skeleton>
                        {" "}
                        <p
                          style={{
                            height: "50px",
                            width: "70px",
                            borderRadius: "25%",
                          }}
                        ></p>
                      </Skeleton>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="col-lg-9 col-md-9">
              {0 < filteredData.length ?
                filteredData.map((item) => {
                  // Date

                  const duration = `${Math.floor(
                    results?.[0][item]?.Segments?.[0][0]?.Duration / 60
                  )}hr ${results?.[0][item]?.Segments?.[0][0]?.Duration % 60
                    }min`;

                  // console.warn(reducerState?.oneWay?.oneWayData?.data?.data?.Response?.Error?.ErrorCode, "filtred data")

                  if (reducerState?.oneWay?.isLoading === true) {
                    return;
                    {
                      /* <FlightLoader />; */
                    }
                  } else if (
                    reducerState?.oneWay?.oneWayData?.data?.data?.Response
                      ?.Error?.ErrorCode === 2 ||
                    reducerState?.oneWay?.oneWayData?.data?.data?.Response
                      ?.Error?.ErrorCode === undefined
                  ) {
                    return (
                      <div className="filteredNotFound">
                        <img src={flightNoResult} alt="filter" />
                        <h1>Result not found</h1>
                      </div>
                    );
                  }

                  return (
                    <>
                      <motion.div
                        variants={variants}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true, amount: 0.8 }}
                      >
                        <motion.div
                          variants={variants}
                          className="mobileflexDesign"
                        >
                          {/* {results[0][item]?.AirlineRemark !== null &&
                          results[0][item]?.AirlineRemark !== "--." ? (
                            <p className=" mandaField  " >
                              {results[0][item]?.AirlineRemark}
                            </p>
                          ) : (
                            ""
                          )} */}
                          <div
                            className=""
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "start",
                              width: "100%",
                            }}
                          >
                            {" "}
                            {results[0][item]?.AirlineRemark &&
                              results[0][item]?.AirlineRemark.includes(
                                "Free Meal will be included"
                              ) ? (
                              <p className="mandaField">Free Meal included</p>
                            ) : (
                              " "
                            )}
                          </div>

                          <div className="columnFLightName d-flex d-sm-none">
                            <div>
                              <img
                                src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/${results?.[0][item]?.ValidatingAirline}.png`}
                                alt="flight"
                              />{" "}
                            </div>
                            <span>
                              {
                                results?.[0][item]?.Segments[0][0]?.Airline
                                  ?.AirlineName
                              }
                            </span>
                            <p>
                              {
                                results?.[0][item]?.Segments?.[0][0]?.Airline
                                  ?.AirlineCode
                              }
                              {
                                results?.[0][item]?.Segments?.[0][0]?.Airline
                                  ?.FlightNumber
                              }
                            </p>
                          </div>
                          <motion.div
                            variants={variants}
                            className="singleFlightBox"
                          >
                            <div className="singleFlightBoxOne">
                              <div>
                                <img
                                  src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/${results[0][item]?.ValidatingAirline}.png`}
                                  alt="flight"
                                />{" "}
                              </div>
                              <span>
                                {
                                  results[0][item]?.Segments[0][0]?.Airline
                                    ?.AirlineName
                                }
                              </span>
                              <p>
                                {
                                  results[0][item]?.Segments[0][0]?.Airline
                                    ?.AirlineCode
                                }
                                {
                                  results[0][item]?.Segments[0][0]?.Airline
                                    ?.FlightNumber
                                }
                                {/* {results[0][item]?.IsLCC === false ? (
                                    <span style={{ background: "green", color: "white" }}>
                                      LCC
                                    </span>
                                  ) : (
                                    ""
                                  )} */}
                              </p>
                            </div>
                            <div className="singleFlightBoxTwo">
                              <span>
                                {
                                  results[0][item]?.Segments[0][0]?.Origin
                                    ?.Airport?.CityName
                                }
                              </span>
                              <p>
                                {dayjs(
                                  results?.[0][item]?.Segments[0][0]?.Origin
                                    ?.DepTime
                                ).format("DD MMM, YY")}
                              </p>
                              <h5 className="daySize">
                                {dayjs(
                                  results?.[0][item]?.Segments[0][0]?.Origin
                                    ?.DepTime
                                ).format("h:mm A")}
                              </h5>
                            </div>

                            <div className="singleFlightBoxThree">
                              {results[0][item]?.Segments[0].length > 1 ? (
                                <h4>
                                  {`${Math.floor(
                                    results[0][item]?.Segments[0][0]?.Duration /
                                    60
                                  )}hr ${results[0][item]?.Segments[0][0]?.Duration %
                                  60
                                    }min`}{" "}
                                  -{" "}
                                  {`${Math.floor(
                                    results[0][item]?.Segments[0][1]?.Duration /
                                    60
                                  )}hr ${results[0][item]?.Segments[0][0]?.Duration %
                                  60
                                    }min`}
                                </h4>
                              ) : (
                                <h4>
                                  {`${Math.floor(
                                    results[0][item]?.Segments[0][0]?.Duration /
                                    60
                                  )}hr ${results[0][item]?.Segments[0][0]?.Duration %
                                  60
                                    }min`}
                                </h4>
                              )}

                              {results[0][item]?.Segments[0].length > 1 ? (
                                <div className="stopBef">
                                  <Divider
                                    orientation="vertical"
                                    flexItem
                                    sx={{
                                      backgroundColor: "#21325d",
                                      marginX: "8px",
                                      height: "3px",
                                    }}
                                    className=""
                                  />
                                </div>
                              ) : (
                                <div>
                                  <Divider
                                    orientation="vertical"
                                    flexItem
                                    sx={{
                                      backgroundColor: "#21325d",
                                      marginX: "8px",
                                      height: "3px",
                                    }}
                                  />
                                </div>
                              )}
                              <p>
                                {results[0][item]?.Segments[0].length > 1
                                  ? `${results[0][item]?.Segments[0].length - 1
                                  } stop via ${results[0][item]?.Segments[0][0]
                                    ?.Destination?.Airport?.CityName
                                  }`
                                  : "Non Stop"}
                              </p>

                              <span>
                                {
                                  results[0][item]?.Segments[0][0]
                                    ?.NoOfSeatAvailable
                                }{" "}
                                Seats Left
                              </span>
                            </div>

                            <div className="singleFlightBoxFour">
                              <span>
                                {
                                  results[0][item]?.Segments[0][
                                    results[0][item]?.Segments[0].length - 1
                                  ]?.Destination?.Airport?.CityName
                                }
                              </span>
                              <p>
                                {dayjs(
                                  results?.[0][item]?.Segments?.[0][
                                    results[0][item]?.Segments[0].length - 1
                                  ]?.Destination?.ArrTime
                                ).format("DD MMM, YY")}
                              </p>
                              <h5 className="daySize">
                                {dayjs(
                                  results?.[0][item]?.Segments?.[0][
                                    results[0][item]?.Segments[0].length - 1
                                  ]?.Destination?.ArrTime
                                ).format("h:mm A")}
                              </h5>
                            </div>

                            <div className="singleFlightBoxSeven">
                              <p className="text-center">
                                ₹{" "}
                                {(results[0][
                                  item
                                ]?.Fare?.PublishedFare).toFixed(0)}
                              </p>
                              <button
                                onClick={() => {
                                  
                                  handleIndexId(results[0][item]?.ResultIndex);
                                }}
                              >
                                View Details →
                              </button>
                            </div>
                          </motion.div>
                          {results[0][item]?.AirlineRemark !== null &&
                            results[0][item]?.AirlineRemark !== "--." ? (
                            <p className="text-center w-100 mandaField">
                              {results[0][item]?.AirlineRemark}
                            </p>
                          ) : (
                            ""
                          )}
                        </motion.div>
                      </motion.div>
                    </>
                  );
                }) :

                <div className="filteredNotFound">
                  <img src={flightNoResult} alt="filter" />
                  <h1>Result not found</h1>
                </div>
              }
              {reducerState?.oneWay?.oneWayData?.data?.data?.Response?.Error
                ?.ErrorCode !== 0 &&
                reducerState?.oneWay?.oneWayData?.data?.data?.Response?.Error
                  ?.ErrorCode !== undefined && (
                  <div className="noResultOuterDiv">
                    <div className="noResultContainer">
                      <div className="noResultContainerInner">
                        <div className="noResultImgDiv">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="213.828"
                            height="100.382"
                            viewBox="0 0 213.828 100.382"
                          >
                            <g
                              id="Group_165"
                              data-name="Group 165"
                              transform="translate(-576 -305.81)"
                            >
                              <g
                                id="Group_162"
                                data-name="Group 162"
                                transform="translate(-28.485 -14.975)"
                              >
                                <g
                                  id="Group_161"
                                  data-name="Group 161"
                                  transform="translate(604.485 320.784)"
                                >
                                  <g
                                    id="Group_65"
                                    data-name="Group 65"
                                    transform="translate(22.82 89.285)"
                                  >
                                    <g
                                      id="Group_62"
                                      data-name="Group 62"
                                      transform="translate(0 0)"
                                    >
                                      <path
                                        id="Path_65"
                                        data-name="Path 65"
                                        d="M75.583,769.364l-1.751,4.816,1.751,1.751,1.751-1.751Z"
                                        transform="translate(-73.029 -768.561)"
                                        fill="#dde8eb"
                                      />
                                      <path
                                        id="Path_66"
                                        data-name="Path 66"
                                        d="M74.386,775.537a.8.8,0,0,1-.568-.235l-1.751-1.751a.8.8,0,0,1-.187-.842l1.751-4.815a.8.8,0,0,1,1.509,0l1.751,4.815a.8.8,0,0,1-.187.842L74.954,775.3A.8.8,0,0,1,74.386,775.537Zm-.822-2.76.822.822.822-.822-.822-2.259Z"
                                        transform="translate(-71.832 -767.364)"
                                        fill="#a9c3d9"
                                      />
                                    </g>
                                    <g
                                      id="Group_64"
                                      data-name="Group 64"
                                      transform="translate(1.751 6.567)"
                                    >
                                      <g id="Group_63" data-name="Group 63">
                                        <path
                                          id="Path_67"
                                          data-name="Path 67"
                                          d="M77,787.951a.8.8,0,0,1-.8-.8v-2.627a.8.8,0,0,1,1.606,0v2.627A.8.8,0,0,1,77,787.951Z"
                                          transform="translate(-76.193 -783.718)"
                                          fill="#a9c3d9"
                                        />
                                      </g>
                                    </g>
                                  </g>
                                  <g
                                    id="Group_69"
                                    data-name="Group 69"
                                    transform="translate(30.126 85.035)"
                                  >
                                    <g
                                      id="Group_66"
                                      data-name="Group 66"
                                      transform="translate(0)"
                                    >
                                      <path
                                        id="Path_68"
                                        data-name="Path 68"
                                        d="M94.589,758.779l-2.561,7.042,2.561,2.561,2.561-2.561Z"
                                        transform="translate(-91.226 -757.976)"
                                        fill="#dde8eb"
                                      />
                                      <path
                                        id="Path_69"
                                        data-name="Path 69"
                                        d="M93.392,767.988h0a.8.8,0,0,1-.568-.235l-2.561-2.561a.8.8,0,0,1-.187-.842l2.561-7.042a.8.8,0,0,1,1.509,0l2.561,7.042a.8.8,0,0,1-.187.842l-2.561,2.561A.8.8,0,0,1,93.392,767.988Zm-1.631-3.57,1.631,1.631,1.631-1.631-1.631-4.485Z"
                                        transform="translate(-90.029 -756.779)"
                                        fill="#a9c3d9"
                                      />
                                    </g>
                                    <g
                                      id="Group_68"
                                      data-name="Group 68"
                                      transform="translate(2.561 9.602)"
                                    >
                                      <g id="Group_67" data-name="Group 67">
                                        <path
                                          id="Path_70"
                                          data-name="Path 70"
                                          d="M97.209,786.141a.8.8,0,0,1-.8-.8V781.5a.8.8,0,0,1,1.606,0v3.841A.8.8,0,0,1,97.209,786.141Z"
                                          transform="translate(-96.406 -780.694)"
                                          fill="#a9c3d9"
                                        />
                                      </g>
                                    </g>
                                  </g>
                                  <g
                                    id="Group_91"
                                    data-name="Group 91"
                                    transform="translate(30.917 11.644)"
                                  >
                                    <g
                                      id="Group_71"
                                      data-name="Group 71"
                                      transform="translate(20.879 0)"
                                    >
                                      <g id="Group_70" data-name="Group 70">
                                        <path
                                          id="Path_71"
                                          data-name="Path 71"
                                          d="M144.8,592.069a.8.8,0,0,1-.8-.8V574.8a.8.8,0,0,1,1.606,0v16.463A.8.8,0,0,1,144.8,592.069Z"
                                          transform="translate(-144 -574)"
                                          fill="#a9c3d9"
                                        />
                                      </g>
                                    </g>
                                    <g
                                      id="Group_73"
                                      data-name="Group 73"
                                      transform="translate(17.266 46.577)"
                                    >
                                      <g id="Group_72" data-name="Group 72">
                                        <path
                                          id="Path_72"
                                          data-name="Path 72"
                                          d="M135.8,699.235a.8.8,0,0,1-.1-1.6l59.426-7.63a.8.8,0,0,1,.2,1.593l-59.426,7.629A.76.76,0,0,1,135.8,699.235Z"
                                          transform="translate(-135 -690)"
                                          fill="#a9c3d9"
                                        />
                                      </g>
                                    </g>
                                    <g
                                      id="Group_74"
                                      data-name="Group 74"
                                      transform="translate(17.266 47.736)"
                                    >
                                      <path
                                        id="Path_73"
                                        data-name="Path 73"
                                        d="M187.592,694.888l-16.061,39.394H137V701.358Z"
                                        transform="translate(-136.197 -694.085)"
                                        fill="#dde8eb"
                                      />
                                      <path
                                        id="Path_74"
                                        data-name="Path 74"
                                        d="M170.334,733.888H135.8a.8.8,0,0,1-.8-.8V700.16a.8.8,0,0,1,.7-.8l50.592-6.469a.8.8,0,0,1,.846,1.1l-16.061,39.394A.8.8,0,0,1,170.334,733.888Zm-33.728-1.606h33.189l15.337-37.62-48.526,6.2Z"
                                        transform="translate(-135 -692.887)"
                                        fill="#a9c3d9"
                                      />
                                    </g>
                                    <g
                                      id="Group_76"
                                      data-name="Group 76"
                                      transform="translate(17.266 80.305)"
                                    >
                                      <g id="Group_75" data-name="Group 75">
                                        <path
                                          id="Path_75"
                                          data-name="Path 75"
                                          d="M173.145,775.606H135.8a.8.8,0,1,1,0-1.606h37.342a.8.8,0,1,1,0,1.606Z"
                                          transform="translate(-135 -774)"
                                          fill="#a9c3d9"
                                        />
                                      </g>
                                    </g>
                                    <g
                                      id="Group_78"
                                      data-name="Group 78"
                                      transform="translate(26.902 50.89)"
                                    >
                                      <g id="Group_77" data-name="Group 77">
                                        <path
                                          id="Path_76"
                                          data-name="Path 76"
                                          d="M159.8,738.589a.8.8,0,0,1-.732-1.133l16.3-36.241a.8.8,0,1,1,1.465.658l-16.3,36.241A.8.8,0,0,1,159.8,738.589Z"
                                          transform="translate(-158.999 -700.741)"
                                          fill="#a9c3d9"
                                        />
                                      </g>
                                    </g>
                                    <g
                                      id="Group_80"
                                      data-name="Group 80"
                                      transform="translate(34.933 50.89)"
                                    >
                                      <g id="Group_79" data-name="Group 79">
                                        <path
                                          id="Path_77"
                                          data-name="Path 77"
                                          d="M179.8,738.589a.8.8,0,0,1-.732-1.133l16.3-36.241a.8.8,0,1,1,1.465.658l-16.3,36.241A.8.8,0,0,1,179.8,738.589Z"
                                          transform="translate(-178.999 -700.741)"
                                          fill="#a9c3d9"
                                        />
                                      </g>
                                    </g>
                                    <g
                                      id="Group_81"
                                      data-name="Group 81"
                                      transform="translate(6.826 38.948)"
                                    >
                                      <rect
                                        id="Rectangle_31"
                                        data-name="Rectangle 31"
                                        width="11.402"
                                        height="48.458"
                                        transform="translate(0.376 1.023)"
                                        fill="#dde8eb"
                                      />
                                      <path
                                        id="Path_78"
                                        data-name="Path 78"
                                        d="M120.243,720.789H109.8a.8.8,0,0,1-.8-.8V671.8a.8.8,0,0,1,.8-.8h10.44a.8.8,0,0,1,.8.8v48.183A.8.8,0,0,1,120.243,720.789Zm-9.637-1.606h8.834V672.606h-8.834Z"
                                        transform="translate(-109 -671)"
                                        fill="#a9c3d9"
                                      />
                                    </g>
                                    <g
                                      id="Group_83"
                                      data-name="Group 83"
                                      transform="translate(11.478 78.452)"
                                    >
                                      <g
                                        id="Group_82"
                                        data-name="Group 82"
                                        transform="translate(0 0)"
                                      >
                                        <rect
                                          id="Rectangle_32"
                                          data-name="Rectangle 32"
                                          width="2.85"
                                          height="9.977"
                                          fill="#a9c3d9"
                                        />
                                      </g>
                                    </g>
                                    <g
                                      id="Group_84"
                                      data-name="Group 84"
                                      transform="translate(0 30.114)"
                                    >
                                      <path
                                        id="Path_79"
                                        data-name="Path 79"
                                        d="M116.485,659.834H95.606L94,651h24.092Z"
                                        transform="translate(-93.197 -650.197)"
                                        fill="#dde8eb"
                                      />
                                      <path
                                        id="Path_80"
                                        data-name="Path 80"
                                        d="M115.288,659.44H94.409a.8.8,0,0,1-.79-.66l-1.606-8.834A.8.8,0,0,1,92.8,649h24.092a.8.8,0,0,1,.79.946l-1.606,8.834A.8.8,0,0,1,115.288,659.44Zm-20.209-1.606h19.539l1.314-7.227H93.765Z"
                                        transform="translate(-92 -649)"
                                        fill="#a9c3d9"
                                      />
                                    </g>
                                    <g
                                      id="Group_85"
                                      data-name="Group 85"
                                      transform="translate(0 16.463)"
                                    >
                                      <path
                                        id="Path_81"
                                        data-name="Path 81"
                                        d="M116.485,625.833H95.606L94,617h24.092Z"
                                        transform="translate(-93.197 -616.197)"
                                        fill="#dde8eb"
                                      />
                                      <path
                                        id="Path_82"
                                        data-name="Path 82"
                                        d="M115.288,625.44H94.409a.8.8,0,0,1-.79-.66l-1.606-8.834A.8.8,0,0,1,92.8,615h24.092a.8.8,0,0,1,.79.946l-1.606,8.834A.8.8,0,0,1,115.288,625.44Zm-20.209-1.606h19.539l1.314-7.227H93.765Z"
                                        transform="translate(-92 -615)"
                                        fill="#a9c3d9"
                                      />
                                    </g>
                                    <g
                                      id="Group_86"
                                      data-name="Group 86"
                                      transform="translate(6.826 25.296)"
                                    >
                                      <rect
                                        id="Rectangle_33"
                                        data-name="Rectangle 33"
                                        width="11.402"
                                        height="5.701"
                                        transform="translate(0.376 0.423)"
                                        fill="#dde8eb"
                                      />
                                      <path
                                        id="Path_83"
                                        data-name="Path 83"
                                        d="M120.243,643.424H109.8a.8.8,0,0,1-.8-.8V637.8a.8.8,0,0,1,.8-.8h10.44a.8.8,0,0,1,.8.8v4.818A.8.8,0,0,1,120.243,643.424Zm-9.637-1.606h8.834v-3.212h-8.834Z"
                                        transform="translate(-109 -637)"
                                        fill="#a9c3d9"
                                      />
                                    </g>
                                    <g
                                      id="Group_88"
                                      data-name="Group 88"
                                      transform="translate(1.501 32.845)"
                                    >
                                      <g
                                        id="Group_87"
                                        data-name="Group 87"
                                        transform="translate(0 0)"
                                      >
                                        <rect
                                          id="Rectangle_34"
                                          data-name="Rectangle 34"
                                          width="22.804"
                                          height="1.425"
                                          fill="#a9c3d9"
                                        />
                                      </g>
                                    </g>
                                    <g
                                      id="Group_90"
                                      data-name="Group 90"
                                      transform="translate(1.501 20.018)"
                                    >
                                      <g
                                        id="Group_89"
                                        data-name="Group 89"
                                        transform="translate(0 0)"
                                      >
                                        <rect
                                          id="Rectangle_35"
                                          data-name="Rectangle 35"
                                          width="22.804"
                                          height="1.425"
                                          fill="#a9c3d9"
                                        />
                                      </g>
                                    </g>
                                  </g>
                                  <g
                                    id="Group_93"
                                    data-name="Group 93"
                                    transform="translate(21.281 98.775)"
                                  >
                                    <g id="Group_92" data-name="Group 92">
                                      <path
                                        id="Path_84"
                                        data-name="Path 84"
                                        d="M239.452,792.606H68.8a.8.8,0,1,1,0-1.606H239.452a.8.8,0,1,1,0,1.606Z"
                                        transform="translate(-68 -791)"
                                        fill="#3c464c"
                                      />
                                    </g>
                                  </g>
                                  <g
                                    id="Group_95"
                                    data-name="Group 95"
                                    transform="translate(12.447 98.775)"
                                  >
                                    <g
                                      id="Group_94"
                                      data-name="Group 94"
                                      transform="translate(0)"
                                    >
                                      <path
                                        id="Path_85"
                                        data-name="Path 85"
                                        d="M51.621,792.606H46.8a.8.8,0,1,1,0-1.606h4.818a.8.8,0,1,1,0,1.606Z"
                                        transform="translate(-46 -791)"
                                        fill="#3c464c"
                                      />
                                    </g>
                                  </g>
                                  <g
                                    id="Group_139"
                                    data-name="Group 139"
                                    transform="translate(59.024 65.85)"
                                  >
                                    <g
                                      id="Group_96"
                                      data-name="Group 96"
                                      transform="translate(0.803 0)"
                                    >
                                      <path
                                        id="Path_86"
                                        data-name="Path 86"
                                        d="M186.076,725.053,173.227,711H166l6.826,14.455Z"
                                        transform="translate(-165.197 -710.197)"
                                        fill="#19a5ff"
                                      />
                                      <path
                                        id="Path_87"
                                        data-name="Path 87"
                                        d="M171.629,725.061a.8.8,0,0,1-.726-.46l-6.826-14.455A.8.8,0,0,1,164.8,709h7.227a.8.8,0,0,1,.593.261l12.849,14.053a.8.8,0,0,1-.568,1.345l-13.25.4Zm-5.559-14.455,6.06,12.833,10.975-.333-11.429-12.5Z"
                                        transform="translate(-164 -709)"
                                        fill="#3c464c"
                                      />
                                    </g>
                                    <g
                                      id="Group_97"
                                      data-name="Group 97"
                                      transform="translate(4.015 14.053)"
                                    >
                                      <path
                                        id="Path_88"
                                        data-name="Path 88"
                                        d="M264.745,758.849H193.273c-3.533,0-13.25-2.811-19.273-6.424h0A6.443,6.443,0,0,1,180.424,746h84.32c3.533,0,8.432,6.424,8.432,6.424C273.177,755.958,268.278,758.849,264.745,758.849Z"
                                        transform="translate(-173.197 -745.197)"
                                        fill="#ededed"
                                      />
                                      <path
                                        id="Path_89"
                                        data-name="Path 89"
                                        d="M263.548,758.455H192.076c-3.539,0-13.364-2.746-19.686-6.539a.8.8,0,0,1-.39-.689A7.236,7.236,0,0,1,179.227,744h84.32c3.821,0,8.544,6.051,9.071,6.74a.806.806,0,0,1,.164.487C272.783,755.42,267.267,758.455,263.548,758.455Zm-89.924-7.676c6.018,3.48,15.244,6.07,18.453,6.07h71.472c3.231,0,7.372-2.565,7.618-5.361-1.447-1.833-5.157-5.882-7.618-5.882h-84.32A5.629,5.629,0,0,0,173.624,750.779Z"
                                        transform="translate(-172 -744)"
                                        fill="#3c464c"
                                      />
                                    </g>
                                    <g
                                      id="Group_98"
                                      data-name="Group 98"
                                      transform="translate(0 15.66)"
                                    >
                                      <path
                                        id="Path_90"
                                        data-name="Path 90"
                                        d="M179.659,752.654,170.023,750H164l4.818,3.056Z"
                                        transform="translate(-163.197 -749.197)"
                                        fill="#19a5ff"
                                      />
                                      <path
                                        id="Path_91"
                                        data-name="Path 91"
                                        d="M167.621,752.662a.8.8,0,0,1-.43-.124l-4.818-3.056A.8.8,0,0,1,162.8,748h6.023a.8.8,0,0,1,.213.029l9.637,2.654a.8.8,0,0,1-.184,1.576l-10.841.4Zm-2.053-3.056,2.272,1.441,5.384-.2-4.508-1.242Z"
                                        transform="translate(-162 -748)"
                                        fill="#3c464c"
                                      />
                                    </g>
                                    <g
                                      id="Group_100"
                                      data-name="Group 100"
                                      transform="translate(8.031 4.381)"
                                    >
                                      <g id="Group_99" data-name="Group 99">
                                        <path
                                          id="Path_92"
                                          data-name="Path 92"
                                          d="M186.809,721.517H182.8a.8.8,0,1,1,0-1.606h4.006a.8.8,0,1,1,0,1.606Z"
                                          transform="translate(-182 -719.911)"
                                          fill="#3c464c"
                                        />
                                      </g>
                                    </g>
                                    <g
                                      id="Group_102"
                                      data-name="Group 102"
                                      transform="translate(10.841 8.395)"
                                    >
                                      <g id="Group_101" data-name="Group 101">
                                        <path
                                          id="Path_93"
                                          data-name="Path 93"
                                          d="M194.668,731.514H189.8a.8.8,0,1,1,0-1.606h4.865a.8.8,0,1,1,0,1.606Z"
                                          transform="translate(-189 -729.908)"
                                          fill="#3c464c"
                                        />
                                      </g>
                                    </g>
                                    <g
                                      id="Group_104"
                                      data-name="Group 104"
                                      transform="translate(90.343 16.463)"
                                    >
                                      <g id="Group_103" data-name="Group 103">
                                        <path
                                          id="Path_94"
                                          data-name="Path 94"
                                          d="M396.637,751.606H387.8a.8.8,0,0,1,0-1.606h8.834a.8.8,0,0,1,0,1.606Z"
                                          transform="translate(-387 -750)"
                                          fill="#3c464c"
                                        />
                                      </g>
                                    </g>
                                    <g
                                      id="Group_106"
                                      data-name="Group 106"
                                      transform="translate(23.69 17.667)"
                                    >
                                      <g id="Group_105" data-name="Group 105">
                                        <path
                                          id="Path_95"
                                          data-name="Path 95"
                                          d="M223.008,754.606h-1.2a.8.8,0,1,1,0-1.606h1.2a.8.8,0,1,1,0,1.606Z"
                                          transform="translate(-221 -753)"
                                          fill="#3c464c"
                                        />
                                      </g>
                                    </g>
                                    <g
                                      id="Group_108"
                                      data-name="Group 108"
                                      transform="translate(30.115 17.667)"
                                    >
                                      <g id="Group_107" data-name="Group 107">
                                        <path
                                          id="Path_96"
                                          data-name="Path 96"
                                          d="M239.008,754.606h-1.2a.8.8,0,1,1,0-1.606h1.2a.8.8,0,1,1,0,1.606Z"
                                          transform="translate(-237 -753)"
                                          fill="#3c464c"
                                        />
                                      </g>
                                    </g>
                                    <g
                                      id="Group_110"
                                      data-name="Group 110"
                                      transform="translate(36.539 17.667)"
                                    >
                                      <g id="Group_109" data-name="Group 109">
                                        <path
                                          id="Path_97"
                                          data-name="Path 97"
                                          d="M255.008,754.606h-1.2a.8.8,0,1,1,0-1.606h1.2a.8.8,0,1,1,0,1.606Z"
                                          transform="translate(-253 -753)"
                                          fill="#3c464c"
                                        />
                                      </g>
                                    </g>
                                    <g
                                      id="Group_112"
                                      data-name="Group 112"
                                      transform="translate(42.963 17.667)"
                                    >
                                      <g id="Group_111" data-name="Group 111">
                                        <path
                                          id="Path_98"
                                          data-name="Path 98"
                                          d="M271.008,754.606h-1.2a.8.8,0,1,1,0-1.606h1.2a.8.8,0,1,1,0,1.606Z"
                                          transform="translate(-269 -753)"
                                          fill="#3c464c"
                                        />
                                      </g>
                                    </g>
                                    <g
                                      id="Group_114"
                                      data-name="Group 114"
                                      transform="translate(49.388 17.667)"
                                    >
                                      <g id="Group_113" data-name="Group 113">
                                        <path
                                          id="Path_99"
                                          data-name="Path 99"
                                          d="M287.008,754.606h-1.2a.8.8,0,1,1,0-1.606h1.2a.8.8,0,1,1,0,1.606Z"
                                          transform="translate(-285 -753)"
                                          fill="#3c464c"
                                        />
                                      </g>
                                    </g>
                                    <g
                                      id="Group_116"
                                      data-name="Group 116"
                                      transform="translate(55.812 17.667)"
                                    >
                                      <g id="Group_115" data-name="Group 115">
                                        <path
                                          id="Path_100"
                                          data-name="Path 100"
                                          d="M303.008,754.606h-1.2a.8.8,0,1,1,0-1.606h1.2a.8.8,0,1,1,0,1.606Z"
                                          transform="translate(-301 -753)"
                                          fill="#3c464c"
                                        />
                                      </g>
                                    </g>
                                    <g
                                      id="Group_118"
                                      data-name="Group 118"
                                      transform="translate(62.237 17.667)"
                                    >
                                      <g id="Group_117" data-name="Group 117">
                                        <path
                                          id="Path_101"
                                          data-name="Path 101"
                                          d="M319.008,754.606h-1.2a.8.8,0,1,1,0-1.606h1.2a.8.8,0,1,1,0,1.606Z"
                                          transform="translate(-317 -753)"
                                          fill="#3c464c"
                                        />
                                      </g>
                                    </g>
                                    <g
                                      id="Group_120"
                                      data-name="Group 120"
                                      transform="translate(68.661 17.667)"
                                    >
                                      <g id="Group_119" data-name="Group 119">
                                        <path
                                          id="Path_102"
                                          data-name="Path 102"
                                          d="M335.008,754.606h-1.2a.8.8,0,1,1,0-1.606h1.2a.8.8,0,1,1,0,1.606Z"
                                          transform="translate(-333 -753)"
                                          fill="#3c464c"
                                        />
                                      </g>
                                    </g>
                                    <g
                                      id="Group_122"
                                      data-name="Group 122"
                                      transform="translate(75.086 17.667)"
                                    >
                                      <g id="Group_121" data-name="Group 121">
                                        <path
                                          id="Path_103"
                                          data-name="Path 103"
                                          d="M351.008,754.606h-1.2a.8.8,0,1,1,0-1.606h1.2a.8.8,0,1,1,0,1.606Z"
                                          transform="translate(-349 -753)"
                                          fill="#3c464c"
                                        />
                                      </g>
                                    </g>
                                    <g
                                      id="Group_124"
                                      data-name="Group 124"
                                      transform="translate(81.51 17.667)"
                                    >
                                      <g id="Group_123" data-name="Group 123">
                                        <path
                                          id="Path_104"
                                          data-name="Path 104"
                                          d="M367.008,754.606h-1.2a.8.8,0,1,1,0-1.606h1.2a.8.8,0,1,1,0,1.606Z"
                                          transform="translate(-365 -753)"
                                          fill="#3c464c"
                                        />
                                      </g>
                                    </g>
                                    <g
                                      id="Group_126"
                                      data-name="Group 126"
                                      transform="translate(28.508 20.076)"
                                    >
                                      <g id="Group_125" data-name="Group 125">
                                        <path
                                          id="Path_105"
                                          data-name="Path 105"
                                          d="M247.054,763.818a.793.793,0,0,1-.19-.023l-13.25-3.212A.8.8,0,0,1,233.8,759h10.44a.857.857,0,0,1,.1.006l26.9,3.212a.8.8,0,0,1-.19,1.595l-26.855-3.207h-3.671l6.718,1.629a.8.8,0,0,1-.189,1.583Z"
                                          transform="translate(-233 -759)"
                                          fill="#3c464c"
                                        />
                                      </g>
                                    </g>
                                    <g
                                      id="Group_129"
                                      data-name="Group 129"
                                      transform="translate(38.948 22.887)"
                                    >
                                      <g
                                        id="Group_127"
                                        data-name="Group 127"
                                        transform="translate(0 1.205)"
                                      >
                                        <rect
                                          id="Rectangle_36"
                                          data-name="Rectangle 36"
                                          width="5.701"
                                          height="5.701"
                                          transform="translate(1.432 0.155)"
                                          fill="#b8b8b8"
                                        />
                                        <path
                                          id="Path_106"
                                          data-name="Path 106"
                                          d="M266.227,776.227H259.8a.8.8,0,0,1-.8-.8V769.8a.8.8,0,0,1,.8-.8h6.424a.8.8,0,0,1,.8.8v5.621A.8.8,0,0,1,266.227,776.227Zm-5.621-1.606h4.818v-4.015h-4.818Z"
                                          transform="translate(-259 -769)"
                                          fill="#3c464c"
                                        />
                                      </g>
                                      <g
                                        id="Group_128"
                                        data-name="Group 128"
                                        transform="translate(3.212)"
                                      >
                                        <path
                                          id="Path_107"
                                          data-name="Path 107"
                                          d="M282.652,776.03h-9.637A4.027,4.027,0,0,1,269,772.015h0A4.027,4.027,0,0,1,273.015,768h9.637C284.86,768,284.86,776.03,282.652,776.03Z"
                                          transform="translate(-268.197 -767.197)"
                                          fill="#b8b8b8"
                                        />
                                        <path
                                          id="Path_108"
                                          data-name="Path 108"
                                          d="M281.455,775.636h-9.637a4.818,4.818,0,1,1,0-9.636h9.637c1.815,0,2.459,2.6,2.459,4.818S283.27,775.636,281.455,775.636Zm-9.637-8.03a3.212,3.212,0,1,0,0,6.424h9.637c.072,0,.287-.178.488-.728a7.64,7.64,0,0,0,.365-2.484c0-2.086-.605-3.212-.853-3.212Z"
                                          transform="translate(-267 -766)"
                                          fill="#3c464c"
                                        />
                                      </g>
                                    </g>
                                    <g
                                      id="Group_131"
                                      data-name="Group 131"
                                      transform="translate(90.343 26.902)"
                                    >
                                      <g id="Group_130" data-name="Group 130">
                                        <path
                                          id="Path_109"
                                          data-name="Path 109"
                                          d="M387.8,779.614a.8.8,0,0,1-.8-.8V776.8a.8.8,0,0,1,1.606,0v2.008A.8.8,0,0,1,387.8,779.614Z"
                                          transform="translate(-387 -776)"
                                          fill="#3c464c"
                                        />
                                      </g>
                                    </g>
                                    <g
                                      id="Group_133"
                                      data-name="Group 133"
                                      transform="translate(32.925 26.902)"
                                    >
                                      <g id="Group_132" data-name="Group 132">
                                        <path
                                          id="Path_110"
                                          data-name="Path 110"
                                          d="M244.8,779.614a.8.8,0,0,1-.8-.8V776.8a.8.8,0,0,1,1.606,0v2.008A.8.8,0,0,1,244.8,779.614Z"
                                          transform="translate(-244 -776)"
                                          fill="#3c464c"
                                        />
                                      </g>
                                    </g>
                                    <g
                                      id="Group_134"
                                      data-name="Group 134"
                                      transform="translate(88.336 28.91)"
                                    >
                                      <circle
                                        id="Ellipse_11"
                                        data-name="Ellipse 11"
                                        cx="2.138"
                                        cy="2.138"
                                        r="2.138"
                                        transform="translate(0.502 1.037)"
                                        fill="#b8b8b8"
                                      />
                                      <path
                                        id="Path_111"
                                        data-name="Path 111"
                                        d="M384.811,786.621a2.811,2.811,0,1,1,2.811-2.811A2.814,2.814,0,0,1,384.811,786.621Zm0-4.015a1.2,1.2,0,1,0,1.2,1.2A1.206,1.206,0,0,0,384.811,782.606Z"
                                        transform="translate(-382 -781)"
                                        fill="#3c464c"
                                      />
                                    </g>
                                    <g
                                      id="Group_135"
                                      data-name="Group 135"
                                      transform="translate(30.918 28.91)"
                                    >
                                      <circle
                                        id="Ellipse_12"
                                        data-name="Ellipse 12"
                                        cx="2.138"
                                        cy="2.138"
                                        r="2.138"
                                        transform="translate(0.911 1.037)"
                                        fill="#b8b8b8"
                                      />
                                      <path
                                        id="Path_112"
                                        data-name="Path 112"
                                        d="M241.811,786.621a2.811,2.811,0,1,1,2.811-2.811A2.814,2.814,0,0,1,241.811,786.621Zm0-4.015a1.2,1.2,0,1,0,1.2,1.2A1.206,1.206,0,0,0,241.811,782.606Z"
                                        transform="translate(-239 -781)"
                                        fill="#3c464c"
                                      />
                                    </g>
                                    <g
                                      id="Group_137"
                                      data-name="Group 137"
                                      transform="translate(26.501 26.902)"
                                    >
                                      <g id="Group_136" data-name="Group 136">
                                        <path
                                          id="Path_113"
                                          data-name="Path 113"
                                          d="M228.8,779.614a.8.8,0,0,1-.8-.8V776.8a.8.8,0,0,1,1.606,0v2.008A.8.8,0,0,1,228.8,779.614Z"
                                          transform="translate(-228 -776)"
                                          fill="#3c464c"
                                        />
                                      </g>
                                    </g>
                                    <g
                                      id="Group_138"
                                      data-name="Group 138"
                                      transform="translate(24.493 28.91)"
                                    >
                                      <circle
                                        id="Ellipse_13"
                                        data-name="Ellipse 13"
                                        cx="2.138"
                                        cy="2.138"
                                        r="2.138"
                                        transform="translate(0.209 1.037)"
                                        fill="#b8b8b8"
                                      />
                                      <path
                                        id="Path_114"
                                        data-name="Path 114"
                                        d="M225.811,786.621a2.811,2.811,0,1,1,2.811-2.811A2.814,2.814,0,0,1,225.811,786.621Zm0-4.015a1.2,1.2,0,1,0,1.2,1.2A1.206,1.206,0,0,0,225.811,782.606Z"
                                        transform="translate(-223 -781)"
                                        fill="#3c464c"
                                      />
                                    </g>
                                  </g>
                                  <g
                                    id="Group_141"
                                    data-name="Group 141"
                                    transform="translate(87.934 32.122)"
                                  >
                                    <g
                                      id="Group_140"
                                      data-name="Group 140"
                                      transform="translate(0 0)"
                                    >
                                      <path
                                        id="Path_115"
                                        data-name="Path 115"
                                        d="M303.632,641.061a.8.8,0,0,1-.769-.574,4.837,4.837,0,0,0-4.269-3.423.8.8,0,0,1-.709-.56,7.828,7.828,0,0,0-13.043-3.148.8.8,0,0,1-1.347-.356,8.633,8.633,0,0,0-16.74.259.8.8,0,0,1-.881.613A4.33,4.33,0,0,0,262.332,635a.806.806,0,0,1-.759.183,3.954,3.954,0,0,0-3.451.637.8.8,0,0,1-1.221-.343,5.218,5.218,0,0,0-10.053,1.966,5.132,5.132,0,0,0,.607,2.434.8.8,0,0,1-.709,1.18H234.8a.8.8,0,1,1,0-1.606h10.744a6.824,6.824,0,0,1,12.431-5.422,5.539,5.539,0,0,1,3.6-.494,5.929,5.929,0,0,1,3.794-1.311,10.24,10.24,0,0,1,19.274-.84,9.436,9.436,0,0,1,14.6,4.136,6.455,6.455,0,0,1,5.157,4.5.8.8,0,0,1-.54,1A.786.786,0,0,1,303.632,641.061Z"
                                        transform="translate(-234 -625)"
                                        fill="#c5e2f7"
                                      />
                                    </g>
                                  </g>
                                  <g
                                    id="Group_146"
                                    data-name="Group 146"
                                    transform="translate(135.314)"
                                  >
                                    <g
                                      id="Group_143"
                                      data-name="Group 143"
                                      transform="translate(16.061 0)"
                                    >
                                      <g id="Group_142" data-name="Group 142">
                                        <path
                                          id="Path_116"
                                          data-name="Path 116"
                                          d="M453.649,559.455a.8.8,0,0,1-.8-.726,5.4,5.4,0,0,0-5.4-4.895,5.5,5.5,0,0,0-1.192.134.8.8,0,0,1-.95-.571,9.238,9.238,0,0,0-17.537-.851.8.8,0,0,1-1.285.312,5.6,5.6,0,0,0-8.243.835.8.8,0,0,1-1,.24,4.759,4.759,0,0,0-2.127-.5,4.824,4.824,0,0,0-4.818,4.818c0,.1.008.2.016.3l0,.041a.8.8,0,0,1-.8.86H392.8a.8.8,0,1,1,0-1.606h15.9a6.432,6.432,0,0,1,6.412-6.023,6.326,6.326,0,0,1,2.245.409A7.2,7.2,0,0,1,426.694,551a10.844,10.844,0,0,1,19.943,1.274,6.885,6.885,0,0,1,.809-.048,7,7,0,0,1,7,6.348.8.8,0,0,1-.723.876C453.7,559.454,453.674,559.455,453.649,559.455Z"
                                          transform="translate(-392 -545)"
                                          fill="#c5e2f7"
                                        />
                                      </g>
                                    </g>
                                    <g
                                      id="Group_145"
                                      data-name="Group 145"
                                      transform="translate(0 12.849)"
                                    >
                                      <g id="Group_144" data-name="Group 144">
                                        <path
                                          id="Path_117"
                                          data-name="Path 117"
                                          d="M362.44,578.606H352.8a.8.8,0,1,1,0-1.606h9.637a.8.8,0,1,1,0,1.606Z"
                                          transform="translate(-352 -577)"
                                          fill="#c5e2f7"
                                        />
                                      </g>
                                    </g>
                                  </g>
                                  <g
                                    id="Group_151"
                                    data-name="Group 151"
                                    transform="translate(0 8.834)"
                                  >
                                    <g
                                      id="Group_148"
                                      data-name="Group 148"
                                      transform="translate(0 0)"
                                    >
                                      <g id="Group_147" data-name="Group 147">
                                        <path
                                          id="Path_118"
                                          data-name="Path 118"
                                          d="M24.235,576.637H15.8a.8.8,0,0,1,0-1.606h7.71a4.024,4.024,0,0,1,3.588-3.2,5.622,5.622,0,0,1,11.13-.015h4.474a.8.8,0,1,1,0,1.606h-5.22a.8.8,0,0,1-.8-.8,4.015,4.015,0,0,0-8.031-.018c0,.016,0,.034,0,.046a.8.8,0,0,1-.9.8,2.39,2.39,0,0,0-2.712,2.387A.8.8,0,0,1,24.235,576.637Z"
                                          transform="translate(-15 -567)"
                                          fill="#c5e2f7"
                                        />
                                      </g>
                                    </g>
                                    <g
                                      id="Group_150"
                                      data-name="Group 150"
                                      transform="translate(30.114 4.818)"
                                    >
                                      <g id="Group_149" data-name="Group 149">
                                        <path
                                          id="Path_119"
                                          data-name="Path 119"
                                          d="M95.22,580.606H90.8a.8.8,0,1,1,0-1.606H95.22a.8.8,0,1,1,0,1.606Z"
                                          transform="translate(-90 -579)"
                                          fill="#c5e2f7"
                                        />
                                      </g>
                                    </g>
                                  </g>
                                  <g
                                    id="Group_156"
                                    data-name="Group 156"
                                    transform="translate(147.36 62.036)"
                                  >
                                    <g
                                      id="Group_153"
                                      data-name="Group 153"
                                      transform="translate(0 0)"
                                    >
                                      <g id="Group_152" data-name="Group 152">
                                        <path
                                          id="Path_120"
                                          data-name="Path 120"
                                          d="M420.145,708.936H404.485a.8.8,0,0,1-.8-.8,3.417,3.417,0,0,0-3.413-3.413c-.076,0-.151.006-.225.012a.838.838,0,0,1-.869-.628,3.813,3.813,0,0,0-7.539.817.8.8,0,0,1-.8.8H382.8a.8.8,0,1,1,0-1.606h7.286a5.42,5.42,0,0,1,10.473-.995,5.028,5.028,0,0,1,4.662,4.207h14.921a.8.8,0,1,1,0,1.606Z"
                                          transform="translate(-382 -699.5)"
                                          fill="#c5e2f7"
                                        />
                                      </g>
                                    </g>
                                    <g
                                      id="Group_155"
                                      data-name="Group 155"
                                      transform="translate(40.554 7.83)"
                                    >
                                      <g id="Group_154" data-name="Group 154">
                                        <path
                                          id="Path_121"
                                          data-name="Path 121"
                                          d="M488.22,720.606H483.8a.8.8,0,1,1,0-1.606h4.417a.8.8,0,1,1,0,1.606Z"
                                          transform="translate(-483 -719)"
                                          fill="#c5e2f7"
                                        />
                                      </g>
                                    </g>
                                  </g>
                                  <g
                                    id="Group_158"
                                    data-name="Group 158"
                                    transform="translate(96.175 5.004)"
                                  >
                                    <g
                                      id="Group_157"
                                      data-name="Group 157"
                                      transform="translate(0 0)"
                                    >
                                      <path
                                        id="Path_122"
                                        data-name="Path 122"
                                        d="M256.992,560.86a.8.8,0,0,1-.5-.177l-1.665-1.335a.8.8,0,0,1,1.005-1.253l1.38,1.107,9.723-1.728a.8.8,0,0,1,.281,1.581l-10.081,1.792A.834.834,0,0,1,256.992,560.86Z"
                                        transform="translate(-254.524 -557.462)"
                                        fill="#c5e2f7"
                                      />
                                    </g>
                                  </g>
                                  <g
                                    id="Group_160"
                                    data-name="Group 160"
                                    transform="translate(101.481 5.73)"
                                  >
                                    <g
                                      id="Group_159"
                                      data-name="Group 159"
                                      transform="translate(0 0)"
                                    >
                                      <path
                                        id="Path_123"
                                        data-name="Path 123"
                                        d="M268.542,562.926a.8.8,0,0,1-.528-1.409l2.355-2.05a.8.8,0,1,1,1.055,1.211l-2.354,2.05A.8.8,0,0,1,268.542,562.926Z"
                                        transform="translate(-267.738 -559.27)"
                                        fill="#c5e2f7"
                                      />
                                    </g>
                                  </g>
                                </g>
                              </g>
                              <g
                                id="Group_164"
                                data-name="Group 164"
                                transform="translate(1.763 1.763)"
                              >
                                <circle
                                  id="Ellipse_14"
                                  data-name="Ellipse 14"
                                  cx="8.5"
                                  cy="8.5"
                                  r="8.5"
                                  transform="translate(691.237 359.237)"
                                  fill="#dde8eb"
                                />
                                <g
                                  id="Group_163"
                                  data-name="Group 163"
                                  transform="translate(695.813 363.813)"
                                >
                                  <rect
                                    id="Rectangle_39"
                                    data-name="Rectangle 39"
                                    width="1.531"
                                    height="9.568"
                                    rx="0.766"
                                    transform="translate(7.848 6.766) rotate(135)"
                                    fill="#19a5ff"
                                  />
                                  <rect
                                    id="Rectangle_40"
                                    data-name="Rectangle 40"
                                    width="1.531"
                                    height="9.568"
                                    rx="0.766"
                                    transform="translate(6.766 0) rotate(45)"
                                    fill="#19a5ff"
                                  />
                                </g>
                              </g>
                            </g>
                          </svg>
                        </div>
                        <div className="noResultContentDiv">
                          <h6>Oops! No flights found</h6>
                          <p>
                            There were no flights found for this date & route
                            combination
                          </p>
                        </div>
                        <div
                          className="noResultBtnDiv"
                          onClick={() => navigate("/")}
                        // style={{}}
                        >
                          Modify Search & Try Again
                        </div>
                      </div>
                    </div>
                  </div>
                )}
            </div>
          )}
        </div>
      </div>
    </>
    // </section >
  );
  // return(
  //   <div>loding</div>
  // )
}

function NewItems({
  results,
  currentItems,
  selectedCategory,
  handleRadioChange,
}) {
  const [loader, setLoader] = useState(true);

  const [openModal, setOpenModal] = useState(false);
  const [openModal1, setOpenModal1] = useState(true);
  const [totalTravalTime, setTotaltravalTime] = useState("");

  const [sesstioResultIndex, setSesstioResultIndex] = useState([]);
  // console.log(sesstioResultIndex, "sesstioResultIndex")
  const reducerState = useSelector((state) => state);
  const [airlines, setAirlines] = useState([]);
  const [airports, setAirports] = useState([]);
  useEffect(() => {
    setAirlines(reducerState?.flightList?.flightDetails)
    setAirports(reducerState?.flightList?.aireportList)
  }, [reducerState?.flightList?.flightDetails, reducerState?.flightList?.aireportList])

  const [viewDetailItem, setViewDetailItem] = useState([])
  useState(() => {
    if (results?.result) {
      setLoader(false);
    }
  }, [results?.result]);
  // if (loading) {
  //   return <div>loading</div>;
  // }
  const location = useLocation();
  const queryParams = new URLSearchParams(location?.search);
  const adultCount = queryParams.get("adult");
  const childCount = queryParams.get("child");
  const infantCount = queryParams.get("infant");
  // console.log("newItemsssssssssss", results.result);
  const navigate = useNavigate();
  // console.log(results?.results, results?.result?.[0]?.Segments?.[0]?.[results?.result?.[0].Segments?.[0]?.length - 1], "resultttttttttttttttttttttttttt")
  const departurePlace =
    results?.result?.[0]?.Segments?.[0]?.[0]?.Origin?.Airport?.CityName;
  const arrivalPlace = results?.result?.[0] ?
    results?.result?.[0].Segments?.[0]?.[results?.result?.[0]?.Segments?.[0]?.length - 1]
      ?.Destination?.Airport?.CityName : null;

  // ///////////////////////filteredata///////////////////////////////

  // const segmentLength = results.result[0].Segments?.[0][0]?.length || results.result[0].flightDetails[0]?.length

  {
    results?.result?.map((item, index) => {
      // const segmentlength = item?.Segments?.[0]?.length ;
      // const segmentLength = item?.Segments?.[0]?.length ||
      //               (item?.flightDetails ||
      //                item?.flightDetails.flightInformation ? 1 : 0);

      //  const segmentlength=  Object.keys(flightdetails).length;

      // const maxPrice = results?.result?.reduce((max, hotel) => {
      //   return Math.max(max, results?.result?.paxFareDetail.totalFareAmount
      //     || 0);
      // }, 0);
      // for(const flightDepTime of item?.Segments[0]){
      // const departureTime = moment(
      //   item?.Segments[0][0]?.Origin?.DepTime,
      //   "HHmm"
      // ).format("hh:mm");
      // console.log("departureTime==============",departureTime);

      // }

      // const departuretime = item?.segments?.[0][1]?.departureTime
      // console.log("item?.Segments",item?.Segments[0][0]);
      // const airlines =
      //   item?.ValidatingAirline ||
      //   item?.Segments?.[0]?.[0]?.Airline?.AirlineName ||
      //   item?.flightDetails?.flightInformation?.companyId?.marketingCarrier ||
      //   item?.flightDetails?.[0]?.flightInformation?.companyId?.marketingCarrier;

      // const departureTime = moment(
      //   item?.Segments?.[0][0]?.Origin?.DepTime,
      //   "HHmm"
      // ).format("hh:mm");

      const arrival = moment(
        item?.Segments?.[0]?.[item?.Segments?.[0]?.length - 1]?.Destination
          ?.ArrTime,
        "HHmm"
      ).format("hh:mm");

      // console.log("arrival", arrival);
      // console.log("departureTime",departureTime);
    });
  }

  const maxPrice = results?.result?.reduce((max, item) => {
    const priceFromPublishedFare =
      item?.Fare?.PublishedFare || item?.monetaryDetail?.[0]?.amount || 0;
    const currentMax = Math.max(max, priceFromPublishedFare);

    return currentMax;
  }, 0);

  const minPrice = results?.result?.reduce((min, item) => {
    const priceFromPublishedFare =
      item?.Fare?.PublishedFare || item?.monetaryDetail?.[0]?.amount || 0;
    // console.log(      item?.Fare?.PublishedFare ,item?.TotalPublishFare,"minPriceeeeeeeeeeeeeeeee")
    const currentMin = Math.min(min, priceFromPublishedFare);

    return currentMin;
  }, Infinity);

  const [priceRangeValue, setPriceRangeValue] = useState(maxPrice + 5001);


  const handlePriceRangeChange = (event) => {
    setPriceRangeValue(event.target.value);
  };
  // layo0verfilterresulttttttttttttttttttttttttttttttt

  const formatMinutesToTime = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}hr ${minutes < 10 ? '0' : ''}${minutes}min`;
  };









  function getDifferenceInHoursTVO(startTime, endTime) {
    const start = new Date(startTime);
    const end = new Date(endTime);

    const differenceInMilliseconds = end - start;
    const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60);

    return differenceInHours;
  }
  function convertToHoursAMD(time) {
    // Convert time to string and pad with leading zeros if necessary
    const timeString = time.toString().padStart(4, '0');

    // Extract hours and minutes
    const hours = parseInt(timeString.substring(0, 2), 10);
    const minutes = parseInt(timeString.substring(2), 10);

    // Calculate total hours
    const totalHours = hours + minutes / 60;
    return totalHours;
  }

  // const time = '0115'; // Time represented as a string
  // console.log(convertToHours(time));





  const maxtime = results?.result?.reduce((max, item) => {
    // const durationmax = convertToHoursAMD(item?.propFlightGrDetail?.flightProposal[1]?.ref);
    const tvoDepTime = item?.Segments?.[0]?.[0]?.Origin?.DepTime
    const tvoArrTime = item?.Segments?.[0]?.length === 1 ? item?.Segments?.[0]?.[0]?.Destination?.ArrTime : item?.Segments?.[0]?.[item?.Segments?.[0]?.length - 1]?.Destination?.ArrTime

    // console.log()


    const durationItemFormattedTime = tvoDepTime ? getDifferenceInHoursTVO(tvoDepTime, tvoArrTime) : convertToHoursAMD(item?.propFlightGrDetail?.flightProposal[1]?.ref)
    // ||
    //  convertMinutesToHoursAndMinutes(durationItem);
    // console.log(durationItemFormattedTime,"tvoDepTimetvoDepTime")
    // const durationmax =tvoDepTime?getDifferenceInHoursTVO(tvoDepTime,tvoArrTime):convertToHoursAMD( item?.propFlightGrDetail?.flightProposal[1]?.ref);
    const currentmax = Math.max(max, durationItemFormattedTime);
    // console.log(tvoDepTime,tvoArrTime,durationmax,durationItemFormattedTime,currentmax,"current maxxxxxxxxxxx")
    // console.log(    durationmax,"kkkkkkkk")

    return Math.ceil(currentmax);
  }, 0)



  const mintime = results?.result?.reduce((min, item) => {
    const tvoDepTime = item?.Segments?.[0]?.[0]?.Origin?.DepTime
    const tvoArrTime = item?.Segments?.[0]?.length === 1 ? item?.Segments?.[0]?.[0]?.Destination?.ArrTime : item?.Segments?.[0]?.[item?.Segments?.[0]?.length - 1]?.Destination?.ArrTime
    const durationmin = tvoDepTime ? getDifferenceInHoursTVO(tvoDepTime, tvoArrTime) : convertToHoursAMD(item?.propFlightGrDetail?.flightProposal[1]?.ref);
    const currentmin = Math.min(min, durationmin);
    // console.log(    durationmin,"llllllllllllllllllllll")

    return Math.ceil(currentmin);
  }, Infinity);


  const convertMinutesToHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    // return `${hours}hr ${minutes < 10 ? '0' : ''}${minutes}min`;
    return hours;
  };

  const maxFormattedTime = convertMinutesToHoursAndMinutes(maxtime);
  const minFormattedTime = convertMinutesToHoursAndMinutes(mintime);

  // console.log("Minimum Time:", minFormattedTime);
  // console.log("Maximum Time:", maxFormattedTime);

  // console.log("currentmin//////////////////",mintime,maxtime);


  const [timeduration, setTimeduration] = useState('0hr 00min');



  // console.log("timeduration", timeduration);
  const [layoverRangeValue, setLayoverRangeValue] = useState(maxtime || 24);
  const handleLayoverRangeChange = (event) => {
    setLayoverRangeValue(event.target.value);
  };
  // console.log(reducerState)
  useEffect(() => {
    setTimeduration(maxtime);
    setLayoverRangeValue(maxtime + 1)
  }, [maxtime]);
  const handledurationValueChange = (event) => {
    const newValue = parseInt(event.target.value);
    setTimeduration(newValue);
    // You can perform additional actions based on the new value of the slider
  };


  const controls = useAnimation();
  // const { ref, inView } = useInView({
  //   triggerOnce: true, // Trigger the animation only once
  //   threshold: 0.1 // Adjust this value to trigger animation earlier or later
  // });

  // ReactuseEffect(() => {
  //   if (inView) {
  //     controls.start({
  //       opacity: 1,
  //       y: 0,
  //       transition: { duration: 0.6 }
  //     });
  //   }
  // }, [controls, inView]);
  useEffect(() => {
    setPriceRangeValue(maxPrice + 5001);
  }, [maxPrice]);
  function convertTimeToHoursAndMinutes(time) {
    if (time) {

      const hours = parseInt(time.slice(0, 2));
      const minutes = parseInt(time.slice(2, 4));
      return `${hours} hours and ${minutes} minutes`;
    }
    return
  }
  function convertTimeToHoursAndMinutesFlight(time) {
    if (time) {

      const hours = parseInt(time.slice(0, 2));
      const minutes = parseInt(time.slice(2, 4));
      return `${hours}h ${minutes}m`;
    }
    return
  }
  function convertTimeToHoursAndMinutesAMDFilter(time) {
    if (time) {

      const hours = parseInt(time.slice(0, 2));
      const minutes = parseInt(time.slice(2, 4));
      return `${hours} hours and ${minutes} minutes`;
    }
    return
  }
  // console.log(reducerState, "reduv")

  const filteredDatanew =
    results?.result &&
    results?.result.filter((item) => {
      const durationItem = item?.propFlightGrDetail?.flightProposal[1]?.ref

      const tvoDepTime = item?.Segments?.[0]?.[0]?.Origin?.DepTime
      const tvoArrTime = item?.Segments?.[0]?.length === 1 ? item?.Segments?.[0]?.[0]?.Destination?.ArrTime : item?.Segments?.[0]?.[item?.Segments?.[0]?.length - 1]?.Destination?.ArrTime
      const durationItemFormattedTime = tvoDepTime ? getDifferenceInHoursTVO(tvoDepTime, tvoArrTime) : convertToHoursAMD(item?.propFlightGrDetail?.flightProposal[1]?.ref)

      // console.log()

      // console.log(tvoDepTime,tvoArrTime,"tvoDepTimetvoDepTime")

      // const durationItemFormattedTime = convertMinutesToHoursAndMinutes(durationItem);
      // let segmentLength = 0;
      // if (item?.Segments?.[0]?.length == 2 || item?.flightDetails) {
      //   segmentLength = 2;
      // }
      // if (item?.Segments?.[0]?.length == 1 || item?.flightDetails) {
      //   segmentLength = 1;
      // }
      let segmentLength = 0;

      if (item?.flightDetails) {
        if (
          typeof item.flightDetails === "object" &&
          item?.flightDetails?.flightInformation
        ) {
          segmentLength = 1;
        } else if (Array.isArray(item?.flightDetails)) {
          segmentLength = 2;
        }
      } else if (item?.Segments?.[0]?.length) {
        segmentLength = item?.Segments?.[0].length;
      }

      // console.log("segmentLength", segmentLength);

      const departureTime = item?.Segments
        ? moment(item?.Segments?.[0]?.[0]?.Origin?.DepTime).format("HH")
        : moment(
          item?.Segments?.[0]?.[0]?.Origin?.DepTime ||
          item?.flightDetails?.flightInformation?.productDateTime
            .timeOfDeparture ||
          item?.flightDetails?.[0]?.flightInformation?.productDateTime
            .timeOfDeparture,
          "HHmm"
        ).format("HH");
      const arrivaltime = item?.Segments
        ? moment(
          item?.Segments?.[0][item?.Segments?.[0]?.length - 1]?.Destination
            ?.ArrTime
        ).format("HH")
        : moment(
          item?.flightDetails?.flightInformation?.productDateTime
            .timeOfArrival ||
          item?.flightDetails?.[item?.flightDetails?.length - 1]
            ?.flightInformation?.productDateTime?.timeOfArrival,
          "HHmm"
        ).format("HH");
      const airlineName =
        item?.ValidatingAirline ||
        item?.flightDetails?.flightInformation?.companyId?.marketingCarrier ||
        item?.flightDetails?.[0]?.flightInformation?.companyId?.marketingCarrier;

      const totalamount = item?.Fare?.PublishedFare || item?.monetaryDetail?.[0]?.amount;

      const categoryFilters = selectedCategory.map((category) => {
        const [groupName, value] = category.split(":");
        switch (groupName) {
          case "stop":
            switch (value) {
              case "1":
                return segmentLength === 1;
              case "2":
                return segmentLength === 2;
            }

          case "flightname":
            return airlineName === value;

          case "timeDepart":
            switch (value) {
              case "before6AM":
                return departureTime < 6;
              case "6AMto12PM":
                return departureTime >= 6 && departureTime < 12;
              case "12PMto6PM":
                return departureTime >= 12 && departureTime < 18;
              case "after6PM":
                return departureTime >= 18;
            }

          case "timeArrival":
            switch (value) {
              case "ARRbefore6AM":
                return arrivaltime < 6;
              case "ARR6AMto12PM":
                return arrivaltime >= 6 && arrivaltime < 12;
              case "ARR12PMto6PM":
                return arrivaltime >= 12 && arrivaltime < 18;
              case "ARRafter6PM":
                return arrivaltime >= 18;
            }

          default:
            return false;
        }
      });
      // console.log(totalamount,"totalAmount")
      const priceInRange = totalamount && priceRangeValue ? Number(totalamount) <= priceRangeValue : true;
      const layoverTime = durationItemFormattedTime && layoverRangeValue ? durationItemFormattedTime <= layoverRangeValue : true;

      return categoryFilters.every((filter) => filter) && priceInRange && layoverTime;
    });

  // console.log("filteredDatanew", selectedCategory, filteredDatanew?.length, selectedCategory, "selectedCategory");

  // /////////////////////////////////////////////
  // console.log(reducerState, "reducer  state")

  function findAirlineByCode(code) {
    // console.log(airlines)
    if (airlines.length !== 0) {

      const data = airlines?.find(airline => airline?.airlineCode === code)
      if (data?.airlineName) {

        return data?.airlineName;
      }
      return
    }
    return

  }
  function findAirportByCode(code) {
    // console.log(airlines)
    if (airports.length !== 0) {
      const data = airports?.find(airport => airport?.AirportCode === code)


      if (data?.AirportCode) {
        return data?.name;


      }
      return
    }
    return

  }
  function dateConversion(startTimeParam, endTimeParam) {
    const startTime = moment(startTimeParam, "HHmm");
    let endTime = moment(endTimeParam, "HHmm");
    if (startTime.isAfter(endTime)) {
      endTime = endTime.add(1, "day"); // Add one day to the end time
    }
    // Calculate the time difference
    const timeDiffMinutes = endTime.diff(startTime, "minutes");

    // Calculate the hours and minutes
    const hours = Math.floor(timeDiffMinutes / 60);
    const minutes = timeDiffMinutes % 60;
    return `${hours}hr${minutes}min`;
  }

  // function calculatePrice(adultCount, childCount, infantCount, item) {
  //   console.log(
  //     item[0].paxFareDetail.totalFareAmount,
  //     item[1].paxFareDetail.totalFareAmount,
  //     "jhvfhjfd",
  //     adultCount,
  //     childCount
  //   );
  //   let finalPrice = 0;
  //   if (adultCount > 0) {
  //     finalPrice = finalPrice + item[0]?.paxFareDetail?.totalFareAmount;
  //   }
  //   if (childCount > 0) {
  //     finalPrice = finalPrice + item[1]?.paxFareDetail?.totalFareAmount;
  //   }
  //   if (infantCount > 0) {
  //     finalPrice = finalPrice + item[2]?.paxFareDetail?.totalFareAmount;
  //   }
  //   return finalPrice;
  // }
  const handleIndexId = (ResultIndex) => {
    if (ResultIndex?.AirlineCode) {
      navigate(
        `booknow?adult=${adultCount}&child=${childCount}&infant=${infantCount} `,
        { state: { ResultIndex } }
      );
    } else if (ResultIndex?.flightDetails) {
      navigate(
        `booknowAmd?adult=${adultCount}&child=${childCount}&infant=${infantCount}`,
        { state: { ResultIndex } }
      );
    }
    // console.log("hiiii");
    // window.open(
    //   `booknow?adult=${adultCount}&child=${childCount}&infant=${infantCount} `,
    //   "_blank"
    // );
    // sessionStorage.setItem("ResultIndex", ResultIndex);
    // sessionStorage.setItem("ResultIndex", JSON.stringify(ResultIndex));
  };
  function convertTime(timeString) {
    // Extract hours and minutes from the time string
    let hours = parseInt(timeString.substring(0, 2));
    let minutes = parseInt(timeString.substring(2));

    // Determine if it's AM or PM
    let period = hours >= 12 ? "PM" : "AM";

    // Convert hours to 12-hour format
    hours = hours % 12;
    hours = hours === 0 ? 12 : hours; // Handle midnight (0 hours)

    // Add leading zero to minutes if needed
    minutes = minutes < 10 ? "0" + minutes : minutes;

    // Construct the final formatted time string
    let formattedTime = hours + ":" + minutes + " " + period;

    return formattedTime;
  }


  function calculateTravelTime(dateOfArrival, timeOfArrival, dateOfDeparture, timeOfDeparture) {
    if (dateOfArrival && timeOfArrival && dateOfDeparture && timeOfDeparture) {
      // console.log(dateOfArrival, timeOfArrival, dateOfDeparture, timeOfDeparture, "dateOfArrival, timeOfArrival, dateOfDeparture, timeOfDeparture")


      // Parse the arrival and departure datetime strings

      const arrivalDateTime = dayjs(`${dateOfArrival.slice(0, 2)}-${dateOfArrival.slice(2, 4)}-${dateOfArrival.slice(4, 6)}T${timeOfArrival.slice(0, 2)}:${timeOfArrival.slice(2, 4)}`);
      const departureDateTime = dayjs(`${dateOfDeparture.slice(0, 2)}-${dateOfDeparture.slice(2, 4)}-${dateOfDeparture.slice(4, 6)}T${timeOfDeparture.slice(0, 2)}:${timeOfDeparture.slice(2, 4)}`);

      // Calculate the difference in milliseconds
      const duration = arrivalDateTime.diff(departureDateTime);

      // Convert the duration to hours and minutes
      const durationHours = Math.floor(duration / (1000 * 60 * 60));
      const durationMinutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
      setTotaltravalTime(`${durationHours} hours and ${durationMinutes} minutes`)
      // console.log(`${durationHours} hours and ${durationMinutes} minutes`, "`${durationHours} hours and ${durationMinutes} minutes`")

      return `${durationHours} hours and ${durationMinutes} minutes`;
    }
    return
  }
  useEffect(() => {
    if (sesstioResultIndex?.flightDetails) {

      const dateOfArrival = sesstioResultIndex?.flightDetails?.flightInformation?.productDateTime?.dateOfArrival || sesstioResultIndex?.flightDetails?.[sesstioResultIndex?.flightDetails?.length - 1]?.flightInformation?.productDateTime?.dateOfArrival
      const timeOfArrival = sesstioResultIndex?.flightDetails?.flightInformation?.productDateTime?.timeOfArrival || sesstioResultIndex?.flightDetails?.[sesstioResultIndex?.flightDetails?.length - 1]?.flightInformation?.productDateTime?.timeOfArrival
      const dateOfDeparture = sesstioResultIndex?.flightDetails?.flightInformation?.productDateTime?.dateOfDeparture || sesstioResultIndex?.flightDetails?.[0]?.flightInformation?.productDateTime?.dateOfDeparture
      const timeOfDeparture = sesstioResultIndex?.flightDetails?.flightInformation?.productDateTime?.timeOfDeparture || sesstioResultIndex?.flightDetails?.[0]?.flightInformation?.productDateTime?.timeOfDeparture
      // console.log(dateOfArrival, timeOfArrival, dateOfDeparture, timeOfDeparture,"dateOfArrival, timeOfArrival, dateOfDeparture, timeOfDeparture")
      calculateTravelTime(dateOfArrival, timeOfArrival, dateOfDeparture, timeOfDeparture)
    }

  }, [sesstioResultIndex])
  useEffect(() => {
    // console.log(reducerState?.oneWay?.isLoading, "reducerState?.oneWay?.isLoadingmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm")
    if (reducerState?.oneWay?.isLoading) {
      setLoader(true)
    }
    else {
      setLoader(false)
    }
  }, [reducerState?.oneWay])

  function handleaViewDetail(item) {
    setSesstioResultIndex(item)
    setOpenModal(true)
    setOpenModal1(true)


  }
  function convertMinutes() {
    // Calculate hours and remaining minutes

    const totalDuration = sesstioResultIndex?.Segments?.[0]?.reduce((accumulator, segment) => {
      return Number(accumulator) + Number(segment.Duration);
    }, 0);
    let hours = Math.floor(totalDuration / 60);
    let remainingMinutes = totalDuration % 60;
    // console.log(`${hours} hour(s) and ${remainingMinutes} minute(s)`)

    return ` ${hours} h ${remainingMinutes} m`;
  }
  function convertMinutesTVOFilter() {
    // Calculate hours and remaining minutes

    const totalDuration = sesstioResultIndex?.Segments?.[0]?.reduce((accumulator, segment) => {
      return Number(accumulator) + Number(segment.Duration);
    }, 0);
    let hours = Math.floor(totalDuration / 60);
    let remainingMinutes = totalDuration % 60;
    // console.log(`${hours} hour(s) and ${remainingMinutes} minute(s)`)

    return hours;
  }


  const [filterdatalength, setFilterDatalength] = useState(1)
  useEffect(() => {
    // console.log(filteredDatanew !== undefined, "check")
    if (filteredDatanew !== undefined) {
      setFilterDatalength(filteredDatanew.length)

      // console.log(filteredDatanew.length, "filteredDatanew")
    }
  }, [filteredDatanew?.length])
  // console.log(filteredDatanew, "filteredDatanew")
  function refundText(description) {


    let renderDescription = null;

    if (Array.isArray(description)) {

      renderDescription = null;
    } else if (typeof description === "string") {

      const words = description.split(" ");


      const formattedDescription = words
        .map((word, index) => (index === 0 ? word : word.toLowerCase()))
        .join(" ");
      renderDescription = (
        <p style={{ color: "green" }}>{formattedDescription}</p>
      );
      return formattedDescription
    } else {

      renderDescription = null;
      return null
    }
  }
  // console.log(sesstioResultIndex, sesstioResultIndex?.Segments?.[0]?.[sesstioResultIndex?.Segments?.[0]?.length - 1]?.Destination?.ArrTime, "sesstioResultIndex")
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 600);
  const [isFilterOpen, setIsFilterOpen] = useState(989 < window.innerWidth);

  useEffect(() => {
    const handleResize = () => setIsFilterOpen(989 < window.innerWidth);
    // console.log(window.innerWidth , window.innerWidth< 600)

    // Add the resize event listener
    window.addEventListener('resize', handleResize);
    // console.log(window.innerWidth ,"window.innerWidth ")

    // Clean up the event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, [window.innerWidth]);




  return (
    <>
      <div className="d-flex flex-column flex-lg-row " style={{ margin: "40px", gap: "14px" }}>
        <div className="col col-lg-3">
          {!loader && filteredDatanew ? (
            <div className="container filterpart-1">
              <div className="filter-new-data">
                <div className="filter-name">
                  <div onClick={() => setIsFilterOpen(pre => !pre)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M9.33147 8V13.2533C9.35813 13.4533 9.29147 13.6667 9.13813 13.8067C9.07646 13.8685 9.0032 13.9175 8.92255 13.951C8.8419 13.9844 8.75545 14.0016 8.66813 14.0016C8.58082 14.0016 8.49437 13.9844 8.41372 13.951C8.33307 13.9175 8.25981 13.8685 8.19813 13.8067L6.85813 12.4667C6.78542 12.3956 6.73014 12.3087 6.6966 12.2127C6.66306 12.1167 6.65218 12.0142 6.6648 11.9133V8H6.6448L2.8048 3.08C2.69654 2.94102 2.64769 2.76484 2.66893 2.58995C2.69016 2.41507 2.77976 2.2557 2.91813 2.14667C3.0448 2.05333 3.1848 2 3.33147 2H12.6648C12.8115 2 12.9515 2.05333 13.0781 2.14667C13.2165 2.2557 13.3061 2.41507 13.3273 2.58995C13.3486 2.76484 13.2997 2.94102 13.1915 3.08L9.35147 8H9.33147Z"
                        fill="black"
                      />
                    </svg>
                  </div>
                  <div>Filter</div>
                </div>

                <div>
                  <label className="sidebar-label-container ps-0">
                    <input
                      type="checkbox"
                      onChange={handleRadioChange}
                      value="All"
                      name="test"
                      checked={selectedCategory.includes("test:All")}

                      onClick={() => {
                        setPriceRangeValue(maxPrice);
                        setLayoverRangeValue(maxFormattedTime)
                      }}
                    />
                    {/* <span className="checkmark"></span> */}
                    <span
                      style={{
                        color: selectedCategory.length > 0 ? "red" : "gray",
                      }}
                    >
                      Clear Filter
                    </span>
                  </label>
                </div>
              </div>

              {/* <div style={{display:"flex", flexDirection:"row",justifyContent: "space-evenly"}}>
                    <label className="sidebar-label-container  ps-0">
                  

                      <div className="svgBOx">
                        <input
                          type="checkbox"
                          onChange={handleRadioChange}
                          value="1"
                          name="stop"
                          checked={selectedCategory.includes("stop:1")}
                        />
                        <div>
                          <span className="checkedSVG pe-2">
                            <svg
                              id="fi_2089699"
                              enable-background="new 0 0 515.556 515.556"
                              height="19"
                              viewBox="0 0 515.556 515.556"
                              width="19"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="m257.778 0c-142.137 0-257.778 115.641-257.778 257.778s115.641 257.778 257.778 257.778 257.778-115.641 257.778-257.778-115.642-257.778-257.778-257.778zm-193.334 257.778c0-41.69 13.397-80.235 35.924-111.846l269.255 269.255c-31.611 22.526-70.156 35.924-111.846 35.924-106.609 0-193.333-86.723-193.333-193.333zm350.743 111.846-269.256-269.256c31.611-22.526 70.156-35.924 111.846-35.924 106.61 0 193.333 86.723 193.333 193.333 0 41.691-13.397 80.236-35.923 111.847z"></path>
                            </svg>
                          </span>
                          <span>Non Stop</span>
                        </div>
                      </div>
                    </label>

                    <label className="sidebar-label-container  ps-0">
                      
                      <div className="svgBOx">
                        <input
                          type="checkbox"
                          onChange={handleRadioChange}
                          value="2"
                          name="stop"
                          checked={selectedCategory.includes("stop:2")}
                        />
                        <div>
                          <span className="checkedSVG pe-2">
                            <svg
                              height="19"
                              viewBox="0 0 32 32"
                              width="19"
                              xmlns="http://www.w3.org/2000/svg"
                              id="fi_4212317"
                            >
                              <g id="_62-Stopwatch" data-name="62-Stopwatch">
                                <path d="m25.15 10.26 1.56-1.55a1 1 0 1 0 -1.42-1.42l-1.55 1.56a11.9 11.9 0 0 0 -6.74-2.8v-2.05h2a1 1 0 0 0 0-2h-6a1 1 0 0 0 0 2h2v2.05a12 12 0 1 0 10.15 4.21zm-9.15 17.74a10 10 0 1 1 10-10 10 10 0 0 1 -10 10z"></path>
                                <path d="m16 10a8 8 0 1 0 8 8 8 8 0 0 0 -8-8zm3.71 11.71a1 1 0 0 1 -1.42 0l-3-3a1 1 0 0 1 -.29-.71v-5a1 1 0 0 1 2 0v4.59l2.71 2.7a1 1 0 0 1 0 1.42z"></path>
                              </g>
                            </svg>
                          </span>
                          <span>One Stop</span>
                        </div>
                      </div>
                    </label>

                    
                  </div> */}
              {isFilterOpen && <>

                <div
                  className="stop-filter-new"
                  style={{ width: "100%", gap: "17px" }}
                >
                  <label
                    htmlFor="stop-dropdown"
                    className="select-filter-heading"
                  >
                    Select Stop:
                  </label>

                  <div className="checkbox-options-new">
                    <input
                      type="checkbox"
                      onChange={handleRadioChange}
                      value="1"
                      name="stop"
                      checked={selectedCategory.includes("stop:1")}
                    />
                    nonstop
                  </div>
                  <div className="checkbox-options-new">
                    <input
                      type="checkbox"
                      onChange={handleRadioChange}
                      value="2"
                      name="stop"
                      checked={selectedCategory.includes("stop:2")}
                    />
                    onestop
                  </div>
                </div>

                <div className="w-100">
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <h2 className="select-filter-heading">By Price</h2>
                    <span className="slider-value-new" id="tooltip">
                      {" "}
                      ₹{priceRangeValue}
                    </span>
                  </div>

                  <div className="position-relative">
                    <input
                      type="range"
                      id="rangePriceRange"
                      min={minPrice + 1}
                      max={maxPrice + 1}
                      step="5000"
                      value={priceRangeValue}

                      onChange={handlePriceRangeChange}
                    />
                    {/* {valueShow && ( */}
                    {/* <span style={{ position: "absolute" }} id="tooltip">
                {" "}
                ₹{priceRangeValue}
              </span> */}
                    {/* )} */}
                    <div
                      className=""
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span className="slider-value-new">
                        ₹{""}
                        {minPrice}
                      </span>
                      <span className="slider-value-new">
                        ₹{""}
                        {maxPrice}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="w-100">
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <h2 className="select-filter-heading">Layover</h2>
                    <span className="slider-value-new" id="tooltip">
                      {" "}
                      {layoverRangeValue}{"h"}
                    </span>
                  </div>

                  <div className="position-relative">
                    <input
                      type="range"
                      id="layover"
                      min={mintime}
                      max={maxtime}
                      step="1"
                      value={layoverRangeValue}
                      onChange={handleLayoverRangeChange}
                    />
                    {/* {valueShow && ( */}
                    {/* <span style={{ position: "absolute" }} id="tooltip">
                {" "}
                ₹{priceRangeValue}
              </span> */}
                    {/* )} */}
                    <div
                      className=""
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span className="slider-value-new">
                        {""}
                        {mintime}{"h"}
                      </span>
                      <span className="slider-value-new">
                        {""}
                        {maxtime}{"h"}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="select-filter-heading">
                    Outbound Flight Times{" "}
                    {results?.result?.Segments?.[0][0]?.Origin?.Airport
                      ?.CityName || departurePlace}
                  </h2>

                  <div className="filter-checkbox-timimg col  flex-sm-row flex-lg-column">
                    <label className="checkbox-options-new ps-0">
                      <input
                        type="checkbox"
                        onChange={handleRadioChange}
                        value="before6AM"
                        name="timeDepart"
                        checked={selectedCategory.includes(
                          "timeDepart:before6AM"
                        )}
                      />
                      Before 6 AM
                    </label>

                    <label className="checkbox-options-new ps-0">
                      <input
                        type="checkbox"
                        onChange={handleRadioChange}
                        value="6AMto12PM"
                        name="timeDepart"
                        checked={selectedCategory.includes(
                          "timeDepart:6AMto12PM"
                        )}
                      />
                      6 AM - 12 PM
                    </label>

                    <label className="checkbox-options-new ps-0">
                      <input
                        type="checkbox"
                        onChange={handleRadioChange}
                        value="12PMto6PM"
                        name="timeDepart"
                        checked={selectedCategory.includes(
                          "timeDepart:12PMto6PM"
                        )}
                      />
                      12 PM - 6 PM
                    </label>

                    <label className="checkbox-options-new ps-0">
                      <input
                        type="checkbox"
                        onChange={handleRadioChange}
                        value="after6PM"
                        name="timeDepart"
                        checked={selectedCategory.includes("timeDepart:after6PM")}
                      />
                      After 6 PM
                    </label>
                  </div>
                </div>

                <div>
                  <h2 className="select-filter-heading">
                    Arrival at{" "}
                    {results?.result?.Segments?.[0][
                      results?.result?.Segments[0]?.length - 1
                    ]?.Destination?.Airport?.CityName || arrivalPlace}
                  </h2>



                  <div className="filter-checkbox-timimg col  flex-sm-row flex-lg-column ">
                    <label className="checkbox-options-new ps-0">
                      <input
                        type="checkbox"
                        onChange={handleRadioChange}
                        value="ARRbefore6AM"
                        name="timeArrival"
                        checked={selectedCategory.includes(
                          "timeArrival:ARRbefore6AM"
                        )}
                      />
                      <div>
                        <span>Before 6 AM</span>
                      </div>
                    </label>

                    <label className="checkbox-options-new ps-0">
                      <input
                        type="checkbox"
                        onChange={handleRadioChange}
                        value="ARR6AMto12PM"
                        name="timeArrival"
                        checked={selectedCategory.includes(
                          "timeArrival:ARR6AMto12PM"
                        )}
                      />
                      <div>
                        <span>6 AM - 12 PM</span>
                      </div>
                    </label>

                    <label className="checkbox-options-new ps-0">
                      <input
                        type="checkbox"
                        onChange={handleRadioChange}
                        value="ARR12PMto6PM"
                        name="timeArrival"
                        checked={selectedCategory.includes(
                          "timeArrival:ARR12PMto6PM"
                        )}
                      />
                      <div>
                        <span>12 PM - 6 PM</span>
                      </div>
                    </label>

                    <label className="checkbox-options-new ps-0">
                      <input
                        type="checkbox"
                        onChange={handleRadioChange}
                        value="ARRafter6PM"
                        name="timeArrival"
                        checked={selectedCategory.includes(
                          "timeArrival:ARRafter6PM"
                        )}
                      />
                      <div>
                        <span>After 6 PM</span>
                      </div>
                    </label>
                  </div>
                </div>

                <div>
                  <h2 className="select-filter-heading">Airlines</h2>
                  <div className="filter-checkbox-timimg">
                    {[
                      ...new Set(
                        results?.result?.map(
                          (item) =>
                            `${item?.ValidatingAirline ||
                            item?.flightDetails?.flightInformation?.companyId
                              ?.marketingCarrier ||
                            item?.flightDetails?.[0]?.flightInformation?.companyId
                              ?.marketingCarrier
                            }`
                        )
                      ),
                    ].map((airline, index) => (
                      <label key={index} className="checkbox-options-new  ps-0 " >
                        <div className="svgBOx" style={{ gap: "12px" }}>
                          <input
                            type="checkbox"
                            onChange={handleRadioChange}
                            value={airline.split(",")[0]}
                            name="flightname"
                            checked={selectedCategory.includes(
                              `flightname:${airline.split(",")[0]}`
                            )}
                          />
                          <div>
                            <span className="checkedSVG imgBoxFilter pe-2">
                              <img
                                src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/${airline.split(
                                  ","
                                )}.png`}
                                alt="flight"
                              />{" "}
                            </span>
                            <span>{findAirlineByCode(airline)}</span>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </>}
            </div>
          ) : (
            <div className="container filterpart-1">
              <div className="filter-new-data">
                <div className="filter-name">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M9.33147 8V13.2533C9.35813 13.4533 9.29147 13.6667 9.13813 13.8067C9.07646 13.8685 9.0032 13.9175 8.92255 13.951C8.8419 13.9844 8.75545 14.0016 8.66813 14.0016C8.58082 14.0016 8.49437 13.9844 8.41372 13.951C8.33307 13.9175 8.25981 13.8685 8.19813 13.8067L6.85813 12.4667C6.78542 12.3956 6.73014 12.3087 6.6966 12.2127C6.66306 12.1167 6.65218 12.0142 6.6648 11.9133V8H6.6448L2.8048 3.08C2.69654 2.94102 2.64769 2.76484 2.66893 2.58995C2.69016 2.41507 2.77976 2.2557 2.91813 2.14667C3.0448 2.05333 3.1848 2 3.33147 2H12.6648C12.8115 2 12.9515 2.05333 13.0781 2.14667C13.2165 2.2557 13.3061 2.41507 13.3273 2.58995C13.3486 2.76484 13.2997 2.94102 13.1915 3.08L9.35147 8H9.33147Z"
                        fill="black"
                      />
                    </svg>
                  </div>
                  <div>Filter</div>
                </div>
                <div>
                  <label className="sidebar-label-container ps-0">
                    <input
                      type="checkbox"
                      onChange={handleRadioChange}
                      onClick={() => {
                        setPriceRangeValue(maxPrice);
                        setLayoverRangeValue(maxFormattedTime)
                      }}
                      value="All"
                      name="test"
                    // checked={selectedCategory.includes("test:All")}
                    />
                    {/* <span className="checkmark"></span> */}
                    <span
                    // style={{
                    //   color: selectedCategory.length > 0 ? "red" : "gray",
                    // }}
                    >
                      Clear Filter
                    </span>
                  </label>
                </div>
              </div>

              <div
                className="stop-filter-new"
                style={{ width: "100%", gap: "17px" }}
              >
                <label
                  htmlFor="stop-dropdown"
                  className="select-filter-heading line"
                  style={{
                    backgroundColor: "#D1D5DB",
                    width: "100%",
                    height: "20px",
                  }}
                >
                  {/* Select Stop: */}
                </label>

                <div className="checkbox-options-new">
                  <div
                    style={{
                      width: "20px",
                      height: "20px",
                      backgroundColor: "#D1D5DB",
                    }}
                    className="line"
                  />
                  <div
                    style={{
                      width: "50px",
                      height: "20px",
                      backgroundColor: "#D1D5DB",
                      width: "75%",
                    }}
                    className="line"
                  ></div>
                </div>
              </div>

              <div className="w-100">
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h2 className="select-filter-heading">By Price</h2>
                  <span className="slider-value-new" id="tooltip">
                    {" "}
                    {/* ₹{priceRangeValue} */}
                  </span>
                </div>

                <div className="position-relative">
                  <div
                    style={{
                      width: "50px",
                      height: "20px",
                      backgroundColor: "#D1D5DB",
                      width: "75%",
                    }}
                    className="line"
                  />

                  <div
                    className=""
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <span className="slider-value-new">
                      {/* ₹{""} */}
                      {/* {minPrice} */}
                    </span>
                    <span className="slider-value-new">
                      {/* ₹{""} */}
                      {/* {maxPrice} */}
                    </span>
                  </div>
                </div>
              </div>
              {["Departure", "Arrival", "Airlines"]?.map((item) => {
                return (
                  <div style={{ width: "75%" }}>
                    <h2 className="select-filter-heading">Departure</h2>
                    <div className="filter-checkbox-timimg">
                      {[1, 2, 3, 4].map((item) => {
                        return (
                          <div className="checkbox-options-new">
                            <div
                              style={{
                                width: "20px",
                                height: "20px",
                                backgroundColor: "#D1D5DB",
                              }}
                              className="line"
                            />
                            <div
                              style={{
                                width: "50px",
                                height: "20px",
                                backgroundColor: "#D1D5DB",
                                width: "75%",
                              }}
                              className="line"
                            ></div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="col  col-lg-9 ">
          {/* {filteredDatanew &&
            filteredDatanew.map((item) => { */}
          {/* <div>{filterdatalength}</div> */}
          {!loader && filteredDatanew ? (

            filterdatalength > 0 ?
              filteredDatanew.map((item, index) => {

                const nextFlight = item?.Segments?.[0]
                let layoverHours = 0;
                let layoverMinutes = 0;
                let layoverDuration = 0;
                
                
                if (nextFlight) {
                  // console.log(item?.Segments?.[0]?.[0]?.Origin?.DepTime, item?.Segments?.[0]?.[item?.Segments?.[0]?.length - 1]?.Destination
                  //   ?.ArrTime)
                  const arrivalTime = dayjs(
                    item?.Segments?.[0]?.[0]?.Origin?.DepTime,


                  );
                  const departureTime = dayjs(
                    item?.Segments?.[0]?.[item?.Segments?.[0]?.length - 1]?.Destination
                      ?.ArrTime
                  );
                  layoverDuration = departureTime.diff(
                    arrivalTime,
                    "minutes"
                  ); // Calculate difference in minutes
                  layoverHours = Math.floor(
                    layoverDuration / 60
                  ); // Extract hours
                  layoverMinutes = layoverDuration % 60;
                }

                return (
                  <div
                    className="newdata-searchlist flex-column flex-md-row"
                    style={{
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "5px",
                    }}
                  >
                    <div style={{ display: "flex", gap: "12px" }}>
                      {" "}
                      <img
                        src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/${item?.ValidatingAirline ||
                          item?.flightDetails?.flightInformation?.companyId
                            ?.marketingCarrier ||
                          item?.flightDetails[0]?.flightInformation?.companyId
                            ?.marketingCarrier
                          }.png`}
                        alt="flight"
                        style={{ borderRadius: "8px" }}
                        width={50}
                        height={50}
                      />{" "}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "12px",
                        }}
                      >
                        <p className="flight-name-new">
                          {item?.Segments?.[0]?.[0]?.Airline?.AirlineName ||

                            // item?.flightDetails?.flightInformation?.companyId
                            //   ?.marketingCarrier +
                            // item?.flightDetails?.flightInformation
                            //   ?.flightOrtrainNumber ||
                            // item?.flightDetails[0]?.flightInformation?.companyId
                            //   ?.marketingCarrier +
                            // item?.flightDetails[0]?.flightInformation
                            //   ?.flightOrtrainNumber
                            // }
                            // {
                            findAirlineByCode(
                              item?.flightDetails?.flightInformation?.companyId
                                ?.marketingCarrier || item?.flightDetails[0]?.flightInformation?.companyId
                                ?.marketingCarrier)
                          }
                        </p>
                        <p className="flight-number-new text-center text-sm-start">
                          {item.AirlineCode +
                            item?.Segments?.[0][0]?.Airline.FlightNumber ||
                            item?.flightDetails?.flightInformation?.companyId
                              ?.marketingCarrier +
                            item?.flightDetails?.flightInformation
                              ?.flightOrtrainNumber ||
                            item?.flightDetails[0]?.flightInformation?.companyId
                              ?.marketingCarrier +
                            item?.flightDetails[0]?.flightInformation
                              ?.flightOrtrainNumber}
                        </p>
                      </div>
                    </div>

                    <div
                      className="flex-column flex-sm-row "
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "15px"
                      }}
                    >
                      <div>
                        <p style={{ textAlign: "center" }}>
                          {item?.Segments?.[0][0]?.Origin?.Airport?.CityName ||
                            departurePlace}
                        </p>

                        <p className="flight-date-new text-center">
                          {dayjs(
                            item?.Segments?.[0][0]?.Origin?.DepTime ||
                            moment(
                              item?.flightDetails?.flightInformation
                                ?.productDateTime.dateOfDeparture ||
                              item?.flightDetails[0]?.flightInformation
                                ?.productDateTime.dateOfDeparture,
                              "DDMMYYYY"
                            ).format("YYYY-MM-DD")
                          ).format("DD MMM, YY")}
                        </p>
                        <p className="flight-date-new text-center">
                          {/* {moment(
                          item?.Segments?.[0][0]?.Origin?.DepTime ||
                            item?.flightDetails?.flightInformation
                              ?.productDateTime.timeOfDeparture ||
                            item?.flightDetails[0]?.flightInformation
                              ?.productDateTime.timeOfDeparture,
                          "HHmm"
                        ).format("hh:mm A")}  */}
                          <p className="flight-date-new text-center">
                            {item?.Segments
                              ? moment(
                                item?.Segments?.[0][0]?.Origin?.DepTime
                              ).format("hh:mm A")
                              : moment(
                                item?.Segments?.[0][0]?.Origin?.DepTime ||
                                item?.flightDetails?.flightInformation
                                  ?.productDateTime.timeOfDeparture ||
                                item?.flightDetails[0]?.flightInformation
                                  ?.productDateTime.timeOfDeparture,
                                "HHmm"
                              ).format("hh:mm A")}
                          </p>
                        </p>
                      </div>
                      <div >
                        <div className="flight-time-new">
                          {/* { "item?.flightDetails?.[0]?.flightInformation?.productDateTime?.dateOfArrival"} */}
                          {item?.Segments && item?.Segments[0] && `${layoverHours}h ${layoverMinutes}m`}

                          {/* {item?.Segments && item?.Segments[0].length > 1 ? (
                            <h4>
                              {`${Math.floor(
                                item?.Segments[0][0]?.Duration / 60
                              )}hr ${item?.Segments[0][0]?.Duration % 60
                                }min`}{" "}
                              -{" "}
                              {`${Math.floor(
                                item?.Segments[0][1]?.Duration / 60
                              )}hr ${item?.Segments[0][0]?.Duration % 60}min`}
                            </h4>
                          ) : (
                            item?.Segments && (
                              <h4>
                                {`${Math.floor(
                                  item?.Segments?.[0][0]?.Duration / 60
                                )}hr ${item?.Segments?.[0][0]?.Duration % 60}min`}
                              </h4>
                            )
                          )} */}

                          {/* {item?.propFlightGrDetail &&
                            item?.flightDetails.length > 1
                            ? dateConversion(
                              item?.flightDetails[0]?.flightInformation
                                ?.productDateTime.timeOfDeparture,
                              item?.flightDetails[0]?.flightInformation
                                ?.productDateTime.timeOfArrival
                            ) +
                            " - " +
                            dateConversion(
                              item?.flightDetails[1]?.flightInformation
                                ?.productDateTime.timeOfDeparture,
                              item?.flightDetails[1]?.flightInformation
                                ?.productDateTime.timeOfArrival
                            )
                            : item?.propFlightGrDetail &&
                            dateConversion(
                              item?.flightDetails?.flightInformation
                                ?.productDateTime.timeOfDeparture,
                              item?.flightDetails?.flightInformation
                                ?.productDateTime.timeOfArrival
                            )} */}
                          {item?.propFlightGrDetail && convertTimeToHoursAndMinutesFlight(item?.propFlightGrDetail?.flightProposal?.[1]?.ref)

                          }
                        </div>

                        <div className="flex-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="107"
                            height="20"
                            viewBox="0 0 107 20"
                            fill="none"
                          >
                            <path
                              d="M1.0498 9.71515C0.773662 9.71515 0.549805 9.93901 0.549805 10.2151C0.549805 10.4913 0.773662 10.7151 1.0498 10.7151V9.71515ZM106.403 10.5687C106.599 10.3734 106.599 10.0569 106.403 9.8616L103.221 6.67962C103.026 6.48435 102.71 6.48435 102.514 6.67962C102.319 6.87488 102.319 7.19146 102.514 7.38672L105.343 10.2151L102.514 13.0436C102.319 13.2388 102.319 13.5554 102.514 13.7507C102.71 13.9459 103.026 13.9459 103.221 13.7507L106.403 10.5687ZM1.0498 10.7151H106.05V9.71515H1.0498V10.7151Z"
                              fill="#A0B5C6"
                            />
                            <path
                              d="M62.81 10C62.81 9.28828 62.2243 8.71742 61.5126 8.73225L57.6352 8.8138L54.5214 2.63074L52.579 2.63074L54.0692 8.88053L50.0658 8.96949L49.0204 7.50898L47.256 7.50898L48.457 10L47.256 12.491L49.0204 12.491L50.0658 11.0305L54.0618 11.1121L52.5716 17.3619L54.514 17.3619L57.6352 11.1862L61.52 11.2603C62.2243 11.2826 62.81 10.7117 62.81 10Z"
                              fill="#D9DDFF"
                            />
                          </svg>
                        </div>
                        <div className="text-center fs-6 fw-medium">{item?.Segments?.[0]?.length == 1 || item?.flightDetails?.flightInformation ? "non-stop" : `${item?.Segments?.[0]?.length - 1 || item?.flightDetails?.length - 1} stop's`}</div>
                      </div>

                      <div>
                        {" "}
                        <p
                          style={{ textAlign: "center" }}
                          className="flight-date-new text-center"
                        >
                          {item?.Segments?.[0][item?.Segments[0]?.length - 1]
                            ?.Destination?.Airport?.CityName || arrivalPlace}
                        </p>
                        <p className="flight-date-new text-center">
                          {dayjs(
                            item?.Segments?.[0][item?.Segments[0]?.length - 1]
                              ?.Destination?.ArrTime ||
                            moment(
                              item?.flightDetails?.flightInformation
                                ?.productDateTime.dateOfDeparture ||
                              item?.flightDetails[
                                item?.flightDetails.length - 1
                              ]?.flightInformation?.productDateTime
                                .dateOfArrival,
                              "DDMMYYYY"
                            ).format("YYYY-MM-DD")
                          ).format("DD MMM, YY")}
                        </p>
                        <p className="flight-date-new text-center">
                          {item?.Segments
                            ? moment(
                              item?.Segments?.[0][item?.Segments[0]?.length - 1]
                                ?.Destination?.ArrTime
                            ).format("hh:mm A")
                            : moment(
                              item?.flightDetails?.flightInformation
                                ?.productDateTime.timeOfArrival ||
                              item?.flightDetails[
                                item?.flightDetails.length - 1
                              ]?.flightInformation?.productDateTime
                                .timeOfArrival,
                              "HHmm"
                            ).format("hh:mm A")}
                          {/* {moment(
                          item?.Segments?.[0][item?.Segments[0]?.length - 1]
                            ?.Destination?.ArrTime ||
                            item?.flightDetails?.flightInformation
                              ?.productDateTime.timeOfArrival ||
                            item?.flightDetails[item?.flightDetails.length - 1]
                              ?.flightInformation?.productDateTime
                              .timeOfArrival,
                          "HHmm"
                        ).format("hh:mm A")} */}
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className="flight-date-new text-center">
                        ₹
                        {Number(

                          item?.Fare?.PublishedFare || item?.monetaryDetail?.[0]?.amount
                        ).toFixed()
                        }
                      </p>
                      <button
                        onClick={() => {
                          // console.log(item,item?.monetaryDetail?.[0]?.amount, "handleIndexId");
                          // handleIndexId(results[0][item]?.ResultIndex);
                          // handleIndexId(item);
                          handleaViewDetail(item);
                        }}
                        className="flight-view-button-new"
                      >
                        View Details →
                      </button>
                    </div>
                  </div>
                );
              })
              : <div className="filteredNotFound">
                <img src={flightNoResult} alt="filter" />
                <h1>Too many filters applied!</h1>
                <div>
                  <label className="sidebar-label-container ps-0">
                    <input
                      type="checkbox"
                      onChange={handleRadioChange}
                      onClick={() => {
                        setPriceRangeValue(maxPrice);
                        setLayoverRangeValue(maxFormattedTime)
                      }}

                      value="All"
                      name="test"
                    // checked={selectedCategory.includes("test:All")}
                    />
                    {/* <span className="checkmark"></span> */}
                    <span
                      style={{
                        color: "#e73c34",
                      }}
                    >
                      Clear Filter
                    </span>
                  </label>
                </div>
              </div>

          ) : (
            <div className="col-lg-9 col-md-9 w-100">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((item) => (
                <motion.div
                  variants={variants}
                  initial="initial"
                  whileInView="animate"
                >
                  <motion.div
                    variants={variants}
                    className="singleFlightBox mb-3 line"
                    style={{
                      height: "130px",
                      padding: "15px",
                      display: "flex",
                      justifyContent: "space-between",
                      // backgroundColor: "#d3d3d345",
                      backgroundColor: "#F6F7FF",
                    }}
                  >
                    <div
                      className="singleFlightBoxOne"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        // width: "100%",
                        flexDirection: "column",
                      }}
                    >
                      <div>
                        <Skeleton>
                          <div style={{ height: "80px", width: "80px" }}></div>
                        </Skeleton>
                      </div>
                      <span>
                        {
                          <Skeleton>
                            <p style={{ height: "10px", width: "70px" }}></p>
                          </Skeleton>
                        }
                      </span>
                      <p>
                        { }
                        { }
                      </p>
                    </div>
                    <div
                      className="singleFlightBoxTwo"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "space-around",
                      }}
                    >
                      <span>
                        {
                          <Skeleton>
                            {" "}
                            <p style={{ height: "10px", width: "70px" }}></p>
                          </Skeleton>
                        }
                      </span>
                      <p>
                        <Skeleton>
                          <p style={{ height: "8px", width: "70px" }}></p>
                        </Skeleton>
                      </p>
                      <Skeleton>
                        <p style={{ height: "8px", width: "70px" }}></p>
                      </Skeleton>
                    </div>

                    <div
                      className="singleFlightBoxThree"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "space-around",
                      }}
                    >
                      <Skeleton>
                        <p style={{ height: "8px", width: "70px" }}></p>
                      </Skeleton>

                      <Skeleton>
                        {" "}
                        <p style={{ height: "8px", width: "70px" }}></p>
                      </Skeleton>

                      <span></span>
                    </div>

                    <div
                      className="singleFlightBoxFour"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "space-around",
                      }}
                    >
                      <span>
                        {
                          <Skeleton>
                            {" "}
                            <p style={{ height: "8px", width: "70px" }}></p>
                          </Skeleton>
                        }
                      </span>
                      <Skeleton>
                        {" "}
                        <p
                          style={{
                            height: "50px",
                            width: "70px",
                            borderRadius: "25%",
                          }}
                        ></p>
                      </Skeleton>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          )}
          {/* })} */}
        </div>
        <AnimatePresence>
          <Modal open={openModal} onClose={openModal}>

            <motion.div
              variants={variants}
              initial="initial"
              exit={{ opacity: 0, x: -50, transition: { duration: 0.5 } }}
              whileInView="animate"
              className="modalContainer"



            >
              <div className="modalContainerInner" >
                <div className="modalSearchResHeader" >
                  <div className="modalSearchResHeaderDiv">
                    <div>
                      <AnimatePresence>
                        {/* {
                          openModal1 && */}
                        <motion.h1 exit={{ x: -50, transition: { duration: 3 } }}> Flight Detail</motion.h1>
                        {/* } */}
                      </AnimatePresence>
                      <div className="modalheaderDiverder"></div>
                    </div>
                  </div>
                  <div className="searchResHeaderCross" onClick={() => setOpenModal(false)}>

                    <ImCancelCircle />
                  </div>
                </div>
                {
                  sesstioResultIndex?.monetaryDetail &&

                  <div className="searchResModalBody" >
                    <div className="searchResModalBodyInfo">
                      <div className="searchResModalBodyRow searchResModalBodyRowFont1">


                        <div>
                          {reducerState?.searchFlight?.flightDetails?.from?.name}
                        </div>
                        {/* <FaArrowRight /> */}
                        <FiArrowRight style={{ margin: "5px" }} />{" "}
                        <div>
                          {reducerState?.searchFlight?.flightDetails?.to?.name}
                        </div>
                      </div>
                      <div className="searchResModalBodyRow searchResModalBodyRowFont2">
                        <div >{dayjs(reducerState?.searchFlight?.flightDetails?.departureDate).format('ddd, D MMM')}</div>
                        <div>{sesstioResultIndex?.flightDetails?.flightInformation ? "• Non Stop" : `• ${sesstioResultIndex?.flightDetails?.length - 1} stops`}</div>
                        <div>
                          •
                          {convertTimeToHoursAndMinutes(sesstioResultIndex?.propFlightGrDetail?.flightProposal?.[1]?.ref)

                          }

                        </div>


                      </div>
                      <div style={{ color: "#e73c34", fontSize: "12px", fontWeight: "600" }}>

                        {refundText(sesstioResultIndex?.fare?.[0]?.pricingMessage?.description || sesstioResultIndex?.fare?.[0]?.pricingMessage?.description)}
                      </div>

                    </div>
                    <div className="searchResModalBodyMap">


                      {sesstioResultIndex?.flightDetails
                        ?.flightInformation ? (
                        <div className="searchResModalBodyMapItemCon" >
                          <div className="bookcenteredBox">
                            <div>
                              <img
                                src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/${sesstioResultIndex?.flightDetails?.flightInformation?.companyId?.marketingCarrier}.png`}
                              />{" "}
                            </div>
                            <span>
                              {
                                findAirlineByCode(sesstioResultIndex?.flightDetails?.flightInformation?.companyId
                                  ?.marketingCarrier)}
                              {/* {
                                sesstioResultIndex?.flightDetails?.flightInformation?.companyId
                                  ?.marketingCarrier} */}

                            </span>
                            <p>
                              {
                                sesstioResultIndex?.flightDetails
                                  ?.flightInformation?.companyId
                                  ?.marketingCarrier
                              }
                              {
                                sesstioResultIndex?.flightDetails
                                  ?.flightInformation?.flightOrtrainNumber
                              }
                            </p>
                          </div>
                          <div className="bookbottomBox flex-column flex-md-row">
                            <div>
                              <div className="bookBottomOne d-none d-sm-flex">
                                <p>
                                  {convertTime(
                                    sesstioResultIndex?.flightDetails
                                      ?.flightInformation?.productDateTime
                                      ?.timeOfDeparture
                                  )}
                                </p>
                                <p>
                                  {convertTime(
                                    sesstioResultIndex?.flightDetails
                                      ?.flightInformation?.productDateTime
                                      ?.timeOfArrival
                                  )}
                                </p>
                              </div>
                              <div className="bookBottomTwo bookBottomTwo2 d-none d-sm-flex">
                                <img className="searchFlightFromTo d-none d-sm-block" src={fromTo} alt="icon" />
                              </div>
                              <div className="bookBottomThree gy-4 gy-sm-0">
                                <p>
                                  {/* {item?.Origin?.Airport?.CityName}{" "} */}
                                  {
                                    sesstioResultIndex?.flightDetails
                                      ?.flightInformation?.location[0]
                                      ?.locationId
                                  }
                                  <span className="spanSearchTerminal">
                                    {
                                      findAirportByCode(sesstioResultIndex?.flightDetails
                                        ?.flightInformation?.location[0]
                                        ?.locationId)

                                    }
                                    {", "}
                                    Terminal-
                                    {/* {item?.Origin?.Airport?.Terminal
                                                ? item?.Origin?.Airport
                                                    ?.Terminal
                                                : "X"} */}
                                    {
                                      sesstioResultIndex?.flightDetails
                                        ?.flightInformation?.location[0]
                                        ?.terminal
                                    }
                                  </span>
                                </p>
                                <p>
                                  {
                                    // item?.Destination?.Airport
                                    //   ?.CityName
                                  }
                                  {
                                    sesstioResultIndex?.flightDetails
                                      ?.flightInformation?.location[1]
                                      ?.locationId
                                  }{" "}
                                  <span className="spanSearchTerminal">
                                    {
                                      // item?.Destination?.Airport
                                      //   ?.AirportName
                                      findAirportByCode(sesstioResultIndex?.flightDetails
                                        ?.flightInformation?.location[1]
                                        ?.locationId)
                                    }
                                    {", "}
                                    Terminal-
                                    {/* {item?.Destination?.Airport
                                                ?.Terminal
                                                ? item?.Destination?.Airport
                                                    ?.Terminal
                                                : "Y"} */}
                                    {
                                      sesstioResultIndex?.flightDetails
                                        ?.flightInformation?.location[1]
                                        ?.terminal
                                    }
                                  </span>
                                </p>
                              </div>
                            </div>
                            <div className="bookBottomFour justify-content-between col-sm-12 col-md-auto">
                              <div>
                                <p>Baggage</p>
                                <span>ADULT</span>
                              </div>
                              <div>
                                <p>Check-in</p>
                                <span>
                                  {sesstioResultIndex?.baggage
                                    ?.freeBagAllownceInfo?.baggageDetails
                                    ?.quantityCode === "N"
                                    ? (sesstioResultIndex?.baggage?.freeBagAllownceInfo?.baggageDetails?.freeAllowance * 23)
                                    : (Number(sesstioResultIndex?.baggage?.freeBagAllownceInfo?.baggageDetails?.freeAllowance) === 0 ||
                                      sesstioResultIndex?.baggage?.freeBagAllownceInfo?.baggageDetails?.freeAllowance === "0"
                                      ? "No baggage" : sesstioResultIndex?.baggage?.freeBagAllownceInfo?.baggageDetails?.freeAllowance)}
                                  {sesstioResultIndex?.baggage
                                    ?.freeBagAllownceInfo?.baggageDetails
                                    ?.quantityCode === "N"
                                    ? sesstioResultIndex?.baggage
                                      ?.freeBagAllownceInfo?.baggageDetails?.unitQualifier === "K" ? "KG" : "LB"
                                    : Number(sesstioResultIndex?.baggage?.freeBagAllownceInfo?.baggageDetails?.freeAllowance) !== 0 ||
                                      sesstioResultIndex?.baggage?.freeBagAllownceInfo?.baggageDetails?.freeAllowance !== "0" ? "KG" : ""}
                                  {/* {item?.Baggage?.split(" ")[0]} */}
                                </span>
                              </div>
                              <div>
                                <p>Cabin</p>
                                <span>
                                  {/* {sesstioResultIndex?.baggage
                                        ?.freeBagAllownceInfo?.baggageDetails
                                        ?.quantityCode !== "N"
                                        ? "7KG"
                                        : "Included"} */}
                                  7 KG
                                </span>
                              </div>
                            </div>
                          </div>
                          {/* <div>
                                      {layoverDuration !== 0 && (
                                        <p className="text-bold">
                                          Layover Time:{" "}
                                          {layoverHours !== 0 &&
                                            `${layoverHours} hours`}{" "}
                                          {layoverMinutes !== 0 &&
                                            `${layoverMinutes} minutes`}
                                        </p>
                                      )}
                                    </div> */}
                          {/* klkkk */}
                        </div>
                      ) : (
                        sesstioResultIndex?.flightDetails?.map(
                          (item, index) => {
                            let layover;
                            if (index < sesstioResultIndex?.flightDetails?.length - 1) {
                              const prevDateOfArrival = sesstioResultIndex?.flightDetails?.[index]?.flightInformation?.productDateTime?.dateOfArrival
                              const nextDateOfDeparture = sesstioResultIndex?.flightDetails?.[index + 1]?.flightInformation?.productDateTime?.dateOfDeparture
                              const prevTimeOfArrival = sesstioResultIndex?.flightDetails?.[index]?.flightInformation?.productDateTime?.timeOfArrival
                              const nextTimeOfDeparture = sesstioResultIndex?.flightDetails?.[index + 1]?.flightInformation?.productDateTime?.timeOfDeparture

                              // console.log(sesstioResultIndex, prevDateOfArrival, prevTimeOfArrival, nextDateOfDeparture, nextTimeOfDeparture, "prevDateOfArrival, prevTimeOfArrival, nextDateOfDeparture, nextTimeOfDeparture")
                              function calculateLayoverTime(prevDateOfArrival, prevTimeOfArrival, nextDateOfDeparture, nextTimeOfDeparture) {

                                // Parse the previous arrival datetime
                                const prevArrivalDateTime = new Date(
                                  `20${prevDateOfArrival.slice(4, 6)}-${prevDateOfArrival.slice(2, 4)}-${prevDateOfArrival.slice(0, 2)}T${prevTimeOfArrival.slice(0, 2)}:${prevTimeOfArrival.slice(2, 4)}:00`
                                );

                                // Parse the next departure datetime
                                const nextDepartureDateTime = new Date(
                                  `20${nextDateOfDeparture.slice(4, 6)}-${nextDateOfDeparture.slice(2, 4)}-${nextDateOfDeparture.slice(0, 2)}T${nextTimeOfDeparture.slice(0, 2)}:${nextTimeOfDeparture.slice(2, 4)}:00`
                                );

                                // Calculate the difference in milliseconds
                                const layoverDuration = nextDepartureDateTime - prevArrivalDateTime;

                                // Convert the duration to total minutes
                                const totalMinutes = Math.floor(layoverDuration / (1000 * 60));

                                // Calculate the hours and minutes from total minutes
                                const layoverHours = Math.floor(totalMinutes / 60);
                                const layoverMinutes = totalMinutes % 60;

                                return `${layoverHours} hours and ${layoverMinutes} minutes`;
                              }
                              layover = calculateLayoverTime(prevDateOfArrival, prevTimeOfArrival, nextDateOfDeparture, nextTimeOfDeparture)


                            }


                            // console.log("flights[i].flightInformation.productDateTime",flights[i])




                            // const nextFlight =
                            //   TicketDetails?.Segments[0][index + 1];
                            // let layoverHours = 0;
                            // let layoverMinutes = 0;
                            // let layoverDuration = 0;

                            // if (nextFlight) {
                            //   const arrivalTime = dayjs(
                            //     item?.Destination?.ArrTime
                            //   );
                            //   const departureTime = dayjs(
                            //     nextFlight?.Origin?.DepTime
                            //   );
                            //   layoverDuration = departureTime.diff(
                            //     arrivalTime,
                            //     "minutes"
                            //   ); // Calculate difference in minutes
                            //   layoverHours = Math.floor(
                            //     layoverDuration / 60
                            //   ); // Extract hours
                            //   layoverMinutes = layoverDuration % 60;
                            // }
                            return (
                              // <>hii</>
                              <div className="searchResModalBodyMapItem">
                                <div className="searchResModalBodyMapItemCon" >
                                  <div className="bookcenteredBox">
                                    <div>
                                      <img
                                        src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/${sesstioResultIndex?.flightDetails[index]?.flightInformation?.companyId?.marketingCarrier}.png`}
                                      />{" "}
                                    </div>
                                    <span>
                                      {
                                        findAirlineByCode(
                                          sesstioResultIndex?.flightDetails[
                                            index
                                          ]?.flightInformation?.companyId
                                            ?.marketingCarrier)
                                      }

                                    </span>
                                    <p>
                                      {
                                        sesstioResultIndex?.flightDetails[
                                          index
                                        ]?.flightInformation?.companyId
                                          ?.marketingCarrier
                                      }
                                      {
                                        sesstioResultIndex?.flightDetails[
                                          index
                                        ]?.flightInformation
                                          ?.flightOrtrainNumber
                                      }
                                    </p>
                                  </div>
                                  <div className="bookbottomBox flex-column flex-md-row">
                                    <div>
                                      <div className="bookBottomOne d-none d-sm-flex">
                                        <p>
                                          {convertTime(
                                            sesstioResultIndex?.flightDetails[
                                              index
                                            ]?.flightInformation
                                              ?.productDateTime?.timeOfDeparture
                                          )}
                                        </p>
                                        <p>
                                          {convertTime(
                                            sesstioResultIndex?.flightDetails[
                                              index
                                            ]?.flightInformation
                                              ?.productDateTime?.timeOfArrival
                                          )}
                                        </p>
                                      </div>
                                      <div className="bookBottomTwo bookBottomTwo2 d-none d-sm-flex">
                                        <img className="searchFlightFromTo d-none d-sm-block" src={fromTo} alt="icon" />
                                      </div>
                                      <div className="bookBottomThree gy-4 gy-sm-0">
                                        <p>
                                          {/* {item?.Origin?.Airport?.CityName}{" "} */}
                                          {
                                            sesstioResultIndex?.flightDetails[
                                              index
                                            ]?.flightInformation?.location[0]
                                              ?.locationId
                                          }
                                          <span className="spanSearchTerminal">
                                            {
                                              findAirportByCode(sesstioResultIndex?.flightDetails[
                                                index
                                              ]?.flightInformation?.location[0]
                                                ?.locationId)
                                            }
                                            {", "}
                                            Terminal-
                                            {/* {item?.Origin?.Airport?.Terminal
                                                ? item?.Origin?.Airport
                                                    ?.Terminal
                                                : "X"} */}
                                            {
                                              sesstioResultIndex
                                                ?.flightDetails[index]
                                                ?.flightInformation
                                                ?.location[0]?.terminal
                                            }
                                          </span>
                                        </p>
                                        <p>
                                          {
                                            // item?.Destination?.Airport
                                            //   ?.CityName
                                          }
                                          {
                                            sesstioResultIndex?.flightDetails[
                                              index
                                            ]?.flightInformation?.location[1]
                                              ?.locationId
                                          }{" "}
                                          <span className="spanSearchTerminal">
                                            {
                                              findAirportByCode(sesstioResultIndex?.flightDetails[
                                                index
                                              ]?.flightInformation?.location[1]
                                                ?.locationId)
                                            }
                                            {", "}
                                            Terminal-
                                            {/* {item?.Destination?.Airport
                                                ?.Terminal
                                                ? item?.Destination?.Airport
                                                    ?.Terminal
                                                : "Y"} */}
                                            {
                                              sesstioResultIndex
                                                ?.flightDetails[index]
                                                ?.flightInformation
                                                ?.location[0]?.terminal
                                            }
                                          </span>
                                        </p>
                                      </div>
                                    </div>
                                    <div className="bookBottomFour justify-content-between col-sm-12 col-md-auto">
                                      <div>
                                        <p>Baggage</p>
                                        <span>ADULT</span>
                                      </div>
                                      <div>
                                        <p>Check-in</p>
                                        <span>
                                          {/* {sesstioResultIndex?.baggage
                                            ?.freeBagAllownceInfo?.baggageDetails
                                            ?.quantityCode === "N"
                                            ? (sesstioResultIndex?.baggage?.freeBagAllownceInfo?.baggageDetails?.freeAllowance * 23)
                                            : (sesstioResultIndex?.baggage?.freeBagAllownceInfo?.baggageDetails?.freeAllowance)}
                                          {
                                            
                                            sesstioResultIndex?.baggage
                                              ?.freeBagAllownceInfo?.baggageDetails?.unitQualifier === "L" ? "LB" : "KG"
                                            
                                          } */}
                                          {sesstioResultIndex?.baggage
                                            ?.freeBagAllownceInfo?.baggageDetails
                                            ?.quantityCode === "N"
                                            ? (sesstioResultIndex?.baggage?.freeBagAllownceInfo?.baggageDetails?.freeAllowance * 23)
                                            : (Number(sesstioResultIndex?.baggage?.freeBagAllownceInfo?.baggageDetails?.freeAllowance) === 0 ||
                                              sesstioResultIndex?.baggage?.freeBagAllownceInfo?.baggageDetails?.freeAllowance === "0"
                                              ? "No baggage" : sesstioResultIndex?.baggage?.freeBagAllownceInfo?.baggageDetails?.freeAllowance)}
                                          {sesstioResultIndex?.baggage
                                            ?.freeBagAllownceInfo?.baggageDetails
                                            ?.quantityCode === "N"
                                            ? sesstioResultIndex?.baggage
                                              ?.freeBagAllownceInfo?.baggageDetails?.unitQualifier === "K" ? "KG" : "LB"
                                            : Number(sesstioResultIndex?.baggage?.freeBagAllownceInfo?.baggageDetails?.freeAllowance) !== 0 ||
                                              sesstioResultIndex?.baggage?.freeBagAllownceInfo?.baggageDetails?.freeAllowance !== "0" ? "KG" : ""}
                                          {/* {item?.Baggage?.split(" ")[0]} */}
                                        </span>
                                      </div>
                                      <div>
                                        <p>Cabin</p>
                                        <span>
                                          {
                                            // sesstioResultIndex?.baggage
                                            //   ?.freeBagAllownceInfo?.baggageDetails
                                            //   ?.quantityCode !== "N"
                                            //   ? "7KG"
                                            //   : "Included"
                                            // item?.CabinBaggage?.split(
                                            //   " "
                                            // )[0]
                                          }
                                          7 KG
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div>
                                  </div>

                                </div>

                                {index < sesstioResultIndex?.flightDetails?.length - 1 && (
                                  <div className="flightLayoverOuter">
                                    <div className="flightLayover">
                                      <p className="text-bold">
                                        Layover Time: {layover}
                                      </p>
                                    </div>
                                  </div>
                                )}

                              </div>
                            );
                          }
                        )
                      )}
                    </div>
                  </div>
                }
                {
                  sesstioResultIndex?.AirlineCode &&

                  <div className="searchResModalBody" >
                    <div className="searchResModalBodyInfo">
                      <div className="searchResModalBodyRow searchResModalBodyRowFont1">


                        <div>
                          {reducerState?.searchFlight?.flightDetails?.from?.name}
                        </div>
                        {/* <FaArrowRight /> */}
                        <FiArrowRight style={{ margin: "5px" }} />{" "}
                        <div>
                          {reducerState?.searchFlight?.flightDetails?.to?.name}
                        </div>
                      </div>
                      {/* <div className="searchResModalBodyRow searchResModalBodyRowFont2">
                        <div >{dayjs(reducerState?.searchFlight?.flightDetails?.departureDate).format('ddd, D MMM')}</div>
                        <div>{sesstioResultIndex?.flightDetails?.flightInformation ? "• Non Stop" : `• ${sesstioResultIndex?.flightDetails?.length - 1} stops`}</div>
                        <div>
                          •
                          {convertTimeToHoursAndMinutes(sesstioResultIndex?.propFlightGrDetail?.flightProposal?.[1]?.ref)

                          }
                        </div>


                      </div> */}
                      <div className="bookaboveBox">
                        <div>


                          {/* <p>
                                {
                                  sesstioResultIndex?.Segments[0][0]?.Origin?.Airport
                                    ?.CityName
                                }
                                <FiArrowRight style={{ margin: "5px" }} />{" "}
                                {
                                  sesstioResultIndex?.Segments[0][
                                    sesstioResultIndex?.Segments[0].length - 1
                                  ]?.Destination?.Airport?.CityName
                                }
                              </p> */}
                          <div className="aboveSpan">
                            <span className="aboveSOne">
                              {dayjs(reducerState?.searchFlight?.flightDetails?.departureDate).format('ddd, D MMM')}
                            </span>
                            {/* <span>Non Stop {duration}</span> */}
                            <span>
                              {" "}
                              {sesstioResultIndex?.Segments[0].length > 1
                                ? `${sesstioResultIndex?.Segments[0].length - 1
                                } stop via ${sesstioResultIndex?.Segments[0][0]
                                  ?.Destination?.Airport?.CityName
                                }`
                                : "Non Stop"}
                              {convertMinutes()}
                            </span>

                          </div>
                        </div>
                      </div>

                    </div>
                    <div className="searchResModalBodyMap">


                      {
                        sesstioResultIndex?.Segments[0]?.map(
                          (item, index) => {
                            let layover;
                            if (index < sesstioResultIndex?.flightDetails?.length - 1) {
                              const prevDateOfArrival = sesstioResultIndex?.flightDetails?.[index]?.flightInformation?.productDateTime?.dateOfArrival
                              const nextDateOfDeparture = sesstioResultIndex?.flightDetails?.[index + 1]?.flightInformation?.productDateTime?.dateOfDeparture
                              const prevTimeOfArrival = sesstioResultIndex?.flightDetails?.[index]?.flightInformation?.productDateTime?.timeOfArrival
                              const nextTimeOfDeparture = sesstioResultIndex?.flightDetails?.[index + 1]?.flightInformation?.productDateTime?.timeOfDeparture

                              // console.log(sesstioResultIndex, prevDateOfArrival, prevTimeOfArrival, nextDateOfDeparture, nextTimeOfDeparture, "prevDateOfArrival, prevTimeOfArrival, nextDateOfDeparture, nextTimeOfDeparture")
                              function calculateLayoverTime(prevDateOfArrival, prevTimeOfArrival, nextDateOfDeparture, nextTimeOfDeparture) {

                                // Parse the previous arrival datetime
                                const prevArrivalDateTime = new Date(
                                  `20${prevDateOfArrival.slice(4, 6)}-${prevDateOfArrival.slice(2, 4)}-${prevDateOfArrival.slice(0, 2)}T${prevTimeOfArrival.slice(0, 2)}:${prevTimeOfArrival.slice(2, 4)}:00`
                                );

                                // Parse the next departure datetime
                                const nextDepartureDateTime = new Date(
                                  `20${nextDateOfDeparture.slice(4, 6)}-${nextDateOfDeparture.slice(2, 4)}-${nextDateOfDeparture.slice(0, 2)}T${nextTimeOfDeparture.slice(0, 2)}:${nextTimeOfDeparture.slice(2, 4)}:00`
                                );

                                // Calculate the difference in milliseconds
                                const layoverDuration = nextDepartureDateTime - prevArrivalDateTime;

                                // Convert the duration to total minutes
                                const totalMinutes = Math.floor(layoverDuration / (1000 * 60));

                                // Calculate the hours and minutes from total minutes
                                const layoverHours = Math.floor(totalMinutes / 60);
                                const layoverMinutes = totalMinutes % 60;

                                return `${layoverHours} hours and ${layoverMinutes} minutes`;
                              }
                              layover = calculateLayoverTime(prevDateOfArrival, prevTimeOfArrival, nextDateOfDeparture, nextTimeOfDeparture)


                            }


                            // console.log("flights[i].flightInformation.productDateTime",flights[i])




                            const nextFlight =
                              sesstioResultIndex?.Segments[0][index + 1];
                            let layoverHours = 0;
                            let layoverMinutes = 0;
                            let layoverDuration = 0;

                            if (nextFlight) {
                              const arrivalTime = dayjs(
                                item?.Destination?.ArrTime
                              );
                              const departureTime = dayjs(
                                nextFlight?.Origin?.DepTime
                              );
                              layoverDuration = departureTime.diff(
                                arrivalTime,
                                "minutes"
                              ); // Calculate difference in minutes
                              layoverHours = Math.floor(
                                layoverDuration / 60
                              ); // Extract hours
                              layoverMinutes = layoverDuration % 60;
                            }
                            return (
                              // <>hii</>
                              <div className="searchResModalBodyMapItem">
                                <div className="searchResModalBodyMapItemCon" >
                                  <div className="bookcenteredBox">
                                    <div>
                                      <img
                                        src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/${item?.Airline?.AirlineCode}.png`}
                                      />{" "}
                                    </div>
                                    <span>{item?.Airline?.AirlineName}</span>
                                    <p>
                                      {item?.Airline?.AirlineCode}
                                      {item?.Airline?.FlightNumber}
                                    </p>
                                  </div>
                                  <div className="bookbottomBox flex-column flex-md-row">
                                    <div>
                                      <div className="bookBottomOne d-none d-sm-flex">
                                        <p>
                                          {dayjs(item?.Origin?.DepTime).format(
                                            "h:mm A"
                                          )}
                                        </p>
                                        <p>
                                          {dayjs(
                                            item?.Destination?.ArrTime
                                          ).format("h:mm A")}
                                        </p>
                                      </div>
                                      <div className="bookBottomTwo  bookBottomTwo2 d-none d-sm-flex">
                                        <img className="searchFlightFromTo d-none d-sm-block" src={fromTo} alt="icon" />
                                      </div>
                                      <div className="bookBottomThree gy-4 gy-sm-0">
                                        <p className="bookBottomThreeP">
                                          {item?.Origin?.Airport?.CityName}{" "}
                                          <span className="spanSearchTerminal">
                                            {item?.Origin?.Airport?.AirportName}
                                            {", "}
                                            Terminal-
                                            {item?.Origin?.Airport?.Terminal
                                              ? item?.Origin?.Airport?.Terminal
                                              : "X"}
                                          </span>
                                        </p>
                                        <p className="bookBottomThreeP">
                                          {item?.Destination?.Airport?.CityName}{" "}
                                          <span className="spanSearchTerminal">
                                            {
                                              item?.Destination?.Airport
                                                ?.AirportName
                                            }
                                            {", "}
                                            Terminal-
                                            {item?.Destination?.Airport?.Terminal
                                              ? item?.Destination?.Airport
                                                ?.Terminal
                                              : "Y"}
                                          </span>
                                        </p>
                                      </div>
                                    </div>
                                    <div className="bookBottomFour justify-content-between col-sm-12 col-md-auto">
                                      <div>
                                        <p>Baggage</p>
                                        <span>ADULT</span>
                                      </div>
                                      <div>
                                        <p>Check-in</p>
                                        <span>
                                          {item?.Baggage?.split(" ")[0]}
                                        </span>
                                      </div>
                                      <div>
                                        <p>Cabin</p>
                                        <span>
                                          {item?.CabinBaggage?.split(" ")[0]}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div>
                                  </div>

                                </div>

                                {(layoverDuration !== 0) && (
                                  <div className="flightLayoverOuter">
                                    <div className="flightLayover">
                                      {/* <p className="text-bold">
                                        Layover Time: {layover}
                                      </p> */}
                                      <p className="text-bold">Layover Time: {layoverHours !== 0 && `${layoverHours} hours`} {layoverMinutes !== 0 && `${layoverMinutes} minutes`}</p>
                                    </div>
                                  </div>
                                )}

                              </div>
                            );
                          }
                        )
                      }
                    </div>
                  </div>
                }

                <div className="modalSelectFilghtFooter">
                  <div>
                    <div style={{ fontSize: "24px", fontWeight: "700" }}>₹{sesstioResultIndex?.monetaryDetail?.[0]?.amount || sesstioResultIndex?.TotalPublishFare}</div>
                    <div style={{ fontSize: "12px", fontWeight: "400" }}>FOR 1 ADULT</div>

                  </div>
                  <div className="modalSearchflightBtn" style={{
                    background: "#e73c34",
                    color: "#fff",
                    boxShadow: "0 1px 7px 0 rgba(0, 0, 0, .22)",
                    width: "100px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "20px",
                    height: "35px",
                    cursor: "pointer",
                    fontSize: "18px"
                  }}
                    onClick={() => {
                      handleIndexId(sesstioResultIndex);
                    }}
                  >Book</div>
                </div>
              </div>
            </motion.div>
          </Modal>
        </AnimatePresence>

      </div>
    </>
  );
}

export default function BasicGrid() {
  const reducerState = useSelector((state) => state);
  const results =
    reducerState?.oneWay?.oneWayData?.data?.data?.Response?.Results;
  // console.log(reducerState?.oneWay?.oneWayData?.data, "results");
  const newResultsCombined = reducerState?.oneWay?.oneWayData?.data;
  // console.log(newResultsCombined?.statusCode, "newResultsCombined");
  const items = [...Array(results?.[0].length).keys()];
  const itemsPerPage = 50;
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [loader, setLoader] = useState(true);
  const handelClearOne = (item) => {
    let select = selectedCategory.filter((item1) => item1 !== item);
    setSelectedCategory(select);
  };

  const navigate = useNavigate();
  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };
  // useEffect(() => {
  //   sessionStorage.removeItem("ResultIndex");
  // }, []);
  // useEffect(() => {
  //   if (newResultsCombined?.statusCode === 200) {
  //     setLoading(false);
  //   }
  // }, [newResultsCombined?.statusCode]);

  const [selectedCategory, setSelectedCategory] = useState([]);
  const [newResults, setNewResult] = useState([]);

  // console.log(results, "results");

  useEffect(() => {
    const uniqueData = !results
      ? []
      : results[0]?.filter((item, index, array) => {
        const isUnique = !array
          .slice(0, index)
          .some(
            (prevItem) =>
              prevItem.AirlineCode === item.AirlineCode &&
              prevItem.Segments?.[0]?.[prevItem.Segments[0].length - 1]
                ?.Origin?.DepTime ===
              item.Segments?.[0]?.[prevItem.Segments[0].length - 1]?.Origin
                ?.DepTime
          );
        return isUnique;
      });
    const itemss = [...Array(uniqueData?.length).keys()];
    setNewResult([[...uniqueData]]);
    setCurrentItems(itemss);
  }, [results]);

  const handleRadioChange = (event) => {
    const selectedValue = event.target.value;
    const radioGroupName = event.target.name;

    if (selectedValue === "All") {
      setSelectedCategory([]);
      document.querySelectorAll('input[type="checkbox"]').forEach((radio) => {
        radio.checked = false;
      });

      return;
    }
    // console.log(reducerState);
    setSelectedCategory((prevSelectedCategory) => {
      let updatedCategory = [...prevSelectedCategory];
      const isValueSelected = updatedCategory.some(
        (category) => category === `${radioGroupName}:${selectedValue}`
      );
      updatedCategory = isValueSelected
        ? updatedCategory.filter(
          (category) => category !== `${radioGroupName}:${selectedValue}`
        )
        : [
          ...updatedCategory.filter(
            (category) => !category.startsWith(`${radioGroupName}:`)
          ),
          `${radioGroupName}:${selectedValue}`,
        ];

      return updatedCategory;
    });
  };

  // console.log("currentItems", currentItems);

  return (
    <>
      {/* <Items
        currentItems={currentItems}
        results={newResults}
        selectedCategory={selectedCategory}
        handleRadioChange={handleRadioChange}
        handelClearOne={handelClearOne}
      /> */}
      {/* {newResultsCombined?.statusCode === 200 ? ( */}
      <NewItems
        results={newResultsCombined}
        currentItems={currentItems}
        selectedCategory={selectedCategory}
        handelClearOne={handelClearOne}
        handleRadioChange={handleRadioChange}
      />
      {/* ) : (
        <div className="col-lg-9 col-md-9">
          {[1, 2, 3, 5, 6, 7, 8].map((item) => (
            <motion.div
              variants={variants}
              initial="initial"
              whileInView="animate"
            >
              <motion.div
                variants={variants}
                className="singleFlightBox mb-3"
                style={{ height: "130px", padding: "15px" }}
              >
                <div className="singleFlightBoxOne">
                  <div>
                    <Skeleton>
                      <div style={{ height: "80px", width: "80px" }}></div>
                    </Skeleton>
                  </div>
                  <span>
                    {
                      <Skeleton>
                        <p style={{ height: "10px", width: "70px" }}></p>
                      </Skeleton>
                    }
                  </span>
                  <p>
                    {}
                    {}
                  </p>
                </div>
                <div className="singleFlightBoxTwo">
                  <span>
                    {
                      <Skeleton>
                        {" "}
                        <p style={{ height: "10px", width: "70px" }}></p>
                      </Skeleton>
                    }
                  </span>
                  <p>
                    <Skeleton>
                      <p style={{ height: "8px", width: "70px" }}></p>
                    </Skeleton>
                  </p>
                  <Skeleton>
                    <p style={{ height: "8px", width: "70px" }}></p>
                  </Skeleton>
                </div>

                <div className="singleFlightBoxThree">
                  <Skeleton>
                    <p style={{ height: "8px", width: "70px" }}></p>
                  </Skeleton>

                  <Skeleton>
                    {" "}
                    <p style={{ height: "8px", width: "70px" }}></p>
                  </Skeleton>

                  <span></span>
                </div>

                <div className="singleFlightBoxFour">
                  <span>
                    {
                      <Skeleton>
                        {" "}
                        <p style={{ height: "8px", width: "70px" }}></p>
                      </Skeleton>
                    }
                  </span>
                  <Skeleton>
                    {" "}
                    <p
                      style={{
                        height: "50px",
                        width: "70px",
                        borderRadius: "25%",
                      }}
                    ></p>
                  </Skeleton>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      )} */}

      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={10}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination justify-content-center"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
    </>
  );
}
