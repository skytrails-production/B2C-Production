import React, { useState, useEffect } from "react";
// import { styled } from "@mui/material/styles";
import FlightLoader from "./FlightLoader/FlightLoader";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Divider from "@mui/material/Divider";
import "./selectflight.css";
import { useLocation, useNavigate } from "react-router-dom";
// import Paper from "@mui/material/Paper";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { clearbookTicketGDS } from "../../Redux/FlightBook/actionFlightBook";
import { resetAllFareData } from "../../Redux/FlightFareQuoteRule/actionFlightQuote";
import dayjs from "dayjs";
// import hotelFilter from "../../images/hotelFilter.png"
import flightNoResult from "../../images/img/flightnoresult.jpg";
import { Skeleton } from "@mui/material";

const variants = {
  initial: {
    y: 50,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
    },
  },
};

function Items({ currentItems, selectedCategory, handleRadioChange }) {
  // const dispatch = useDispatch();
  const location = useLocation();
  const dispatch = useDispatch();
  const [value, setValue] = useState(true);
  const reducerState = useSelector((state) => state);
  // const [flightDetailsValue, setFlightDetailsValue] = React.useState("1");
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const adultCount = queryParams.get("adult");
  const childCount = queryParams.get("child");
  const infantCount = queryParams.get("infant");

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
  const results =
    reducerState?.oneWay?.oneWayData?.data?.data?.Response?.Results;
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

  const handleIndexId = (ResultIndex) => {
    navigate(
      `booknow?adult=${adultCount}&child=${childCount}&infant=${infantCount} `
    );
    sessionStorage.setItem("ResultIndex", ResultIndex);
  };

  // const TicketDetails = reducerState?.flightFare?.flightQuoteData?.Results;
  const [anchorEl, setAnchorEl] = React.useState(null);

  // console.warn("current data", currentItems)

  const filteredData =
    currentItems &&
    currentItems.filter((item) => {
      const segmentLength = results?.[0][item]?.Segments?.[0].length;
      const depTime = new Date(
        results?.[0][item]?.Segments?.[0][0]?.Origin?.DepTime
      );
      const hour = depTime.getHours();
      const airlineName =
        results?.[0][item]?.Segments?.[0][0]?.Airline?.AirlineName;

      // Check each selected category
      const categoryFilters = selectedCategory.map((category) => {
        switch (category) {
          case "1":
            return segmentLength === 1;
          case "2":
            return segmentLength === 2;
          case "before6AM":
            return hour < 6;
          case "6AMto12PM":
            return hour >= 6 && hour < 12;
          case "12PMto6PM":
            return hour >= 12 && hour < 18;
          case "after6PM":
            return hour >= 18;
          default:
            // For airline categories
            return airlineName === category;
        }
      });

      // Apply AND logic for all selected categories
      return categoryFilters.every((filter) => filter);
    });
   

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // useEffect(() => {
  //   console.warn(results, "flight result", currentItems);
  // }, [results, filteredData, currentItems]);

  return (
    <section className="margin-pecentage my-4">
      <div className="container-xxl">
        <div className="row">
          <div className="col-lg-3">
            <div className="flightFilterBox">
              <div className="filterTitle">
                <p>Select Filters</p>
              </div>
              <div className="innerFilter">
                <div>
                  <h2 className="sidebar-title">Suggesterd to you</h2>

                  <div>
                    <label className="sidebar-label-container">
                      <input
                        type="checkbox"
                        onChange={handleRadioChange}
                        value="All"
                        name="test"
                      />
                      <span className="checkmark"></span>All
                    </label>

                    <label className="sidebar-label-container">
                      <input
                        type="checkbox"
                        onChange={handleRadioChange}
                        value="1"
                        name="test"
                      />
                      <span className="checkmark"></span>Non Stop
                    </label>

                    <label className="sidebar-label-container">
                      <input
                        type="checkbox"
                        onChange={handleRadioChange}
                        value="2"
                        name="test"
                      />
                      <span className="checkmark"></span>One Stop
                    </label>

                    <label className="sidebar-label-container">
                      <input
                        type="checkbox"
                        onChange={handleRadioChange}
                        value="SpiceJet"
                        name="test"
                      />
                      <span className="checkmark"></span>SpiceJet
                    </label>

                    <label className="sidebar-label-container">
                      <input
                        type="checkbox"
                        onChange={handleRadioChange}
                        value="Vistara"
                        name="test"
                      />
                      <span className="checkmark"></span>Vistara
                    </label>
                  </div>
                  <Divider
                    sx={{ marginBottom: "15px", backgroundColor: "gray" }}
                  />
                </div>

                <div>
                  <h2 className="sidebar-title">Departure Time</h2>

                  <div>
                    <label className="sidebar-label-container">
                      <input
                        type="checkbox"
                        onChange={handleRadioChange}
                        value="before6AM"
                        name="test"
                      />
                      <span className="checkmark"></span>Before 6 AM
                    </label>

                    <label className="sidebar-label-container">
                      <input
                        type="checkbox"
                        onChange={handleRadioChange}
                        value="6AMto12PM"
                        name="test"
                      />
                      <span className="checkmark"></span>6 AM - 12 PM
                    </label>

                    <label className="sidebar-label-container">
                      <input
                        type="checkbox"
                        onChange={handleRadioChange}
                        value="12PMto6PM"
                        name="test"
                      />
                      <span className="checkmark"></span>12 PM - 6 PM
                    </label>

                    <label className="sidebar-label-container">
                      <input
                        type="checkbox"
                        onChange={handleRadioChange}
                        value="after6PM"
                        name="test"
                      />
                      <span className="checkmark"></span>After 6 PM
                    </label>
                  </div>

                  <Divider
                    sx={{ marginBottom: "15px", backgroundColor: "gray" }}
                  />
                </div>

                <div>
                  <h2 className="sidebar-title">Airlines</h2>

                  <div>
                    <label className="sidebar-label-container">
                      <input
                        type="checkbox"
                        onChange={handleRadioChange}
                        value="Air India"
                        name="test"
                      />
                      <span className="checkmark"></span>Air India
                    </label>

                    <label className="sidebar-label-container">
                      <input
                        type="checkbox"
                        onChange={handleRadioChange}
                        value="Indigo"
                        name="test"
                      />
                      <span className="checkmark"></span>Indigo
                    </label>

                    <label className="sidebar-label-container">
                      <input
                        type="checkbox"
                        onChange={handleRadioChange}
                        value="SpiceJet"
                        name="test"
                      />
                      <span className="checkmark"></span>SpiceJet
                    </label>

                    <label className="sidebar-label-container">
                      <input
                        type="checkbox"
                        onChange={handleRadioChange}
                        value="Vistara"
                        name="test"
                      />
                      <span className="checkmark"></span>Vistara
                    </label>
                  </div>
                  <Divider
                    sx={{ marginBottom: "15px", backgroundColor: "gray" }}
                  />
                </div>
              </div>
            </div>
          </div>

          {reducerState?.oneWay?.isLoading === true ? (
            <div className="col-lg-9">
              {[1, 2, 3, 5, 6, 7, 8].map((item) => (
                <motion.div
                  variants={variants}
                  initial="initial"
                  whileInView="animate"
                >
                  <motion.div
                    variants={variants}
                    className="singleFlightBox"
                    style={{ height: "130px" }}
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
                            <h1 style={{ height: "10px", width: "70px" }}></h1>
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
                            <h1 style={{ height: "10px", width: "70px" }}></h1>
                          </Skeleton>
                        }
                      </span>
                      <p>
                        <Skeleton>
                          <h1 style={{ height: "8px", width: "70px" }}></h1>
                        </Skeleton>
                      </p>
                      <Skeleton>
                        <h1 style={{ height: "8px", width: "70px" }}></h1>
                      </Skeleton>
                    </div>

                    <div className="singleFlightBoxThree">
                      <Skeleton>
                        <h1 style={{ height: "8px", width: "70px" }}></h1>
                      </Skeleton>

                      <Skeleton>
                        {" "}
                        <h1 style={{ height: "8px", width: "70px" }}></h1>
                      </Skeleton>

                      <span></span>
                    </div>

                    <div className="singleFlightBoxFour">
                      <span>
                        {
                          <Skeleton>
                            {" "}
                            <h1 style={{ height: "8px", width: "70px" }}></h1>
                          </Skeleton>
                        }
                      </span>
                      <Skeleton>
                        {" "}
                        <h1
                          style={{
                            height: "50px",
                            width: "70px",
                            borderRadius: "25%",
                          }}
                        ></h1>
                      </Skeleton>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="col-lg-9">
              {filteredData &&
                filteredData.map((item) => {
                  // const handleClick = (event) => {
                  //   setAnchorEl(event.currentTarget);
                  // };

                  // const handleClose = () => {
                  //   setAnchorEl(null);
                  // };

                  // const open = Boolean(anchorEl);
                  // const id = open ? "simple-popover" : undefined;

                  // const handleChange = (event, newValue) => {
                  //   setFlightDetailsValue(newValue);
                  // };

                  // Date

                  const duration = `${Math.floor(
                    results?.[0][item]?.Segments?.[0][0]?.Duration / 60
                  )}hr ${
                    results?.[0][item]?.Segments?.[0][0]?.Duration % 60
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
                      {results?.[0][item]?.Segments?.[0].length == 2 ? (
                        <motion.div
                          variants={variants}
                          initial="initial"
                          whileInView="animate"
                        >
                          <motion.div
                            variants={variants}
                            className="singleFlightBox"
                          >
                            <div className="singleFlightBoxOne">
                              <div>
                                <img
                                  src={`${process.env.PUBLIC_URL}/FlightImages/${results[0][item]?.AirlineCode}.png`}
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
                              <h5 style={{ fontSize: "14px" }}>
                                {dayjs(
                                  results?.[0][item]?.Segments[0][0]?.Origin
                                    ?.DepTime
                                ).format("h:mm A")}
                              </h5>
                            </div>

                            <div className="singleFlightBoxThree">
                              <h4>
                                {`${Math.floor(
                                  results[0][item]?.Segments[0][0]?.Duration /
                                    60
                                )}hr ${
                                  results[0][item]?.Segments[0][0]?.Duration %
                                  60
                                }min`}{" "}
                                -{" "}
                                {`${Math.floor(
                                  results[0][item]?.Segments[0][1]?.Duration /
                                    60
                                )}hr ${
                                  results[0][item]?.Segments[0][0]?.Duration %
                                  60
                                }min`}
                              </h4>
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
                              <p>{`1 stop via ${results[0][item]?.Segments[0][0]?.Destination?.Airport?.CityName}`}</p>

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
                                  results[0][item]?.Segments[0][1]?.Destination
                                    ?.Airport?.CityName
                                }
                              </span>
                              <p>
                                {dayjs(
                                  results?.[0][item]?.Segments?.[0][1]
                                    ?.Destination?.ArrTime
                                ).format("DD MMM, YY")}
                              </p>
                              <h5 style={{ fontSize: "14px" }}>
                                {dayjs(
                                  results?.[0][item]?.Segments?.[0][1]
                                    ?.Destination?.ArrTime
                                ).format("h:mm A")}
                              </h5>
                            </div>

                            <div className="singleFlightBoxSeven">
                              <p>₹ {results[0][item]?.Fare?.PublishedFare}</p>
                              <button
                                onClick={() => {
                                  handleIndexId(results[0][item]?.ResultIndex);
                                }}
                              >
                                View Details →
                              </button>
                            </div>
                          </motion.div>
                        </motion.div>
                      ) : (
                        <motion.div
                          variants={variants}
                          initial="initial"
                          whileInView="animate"
                        >
                          <motion.div
                            variants={variants}
                            className="singleFlightBox"
                          >
                            <div className="singleFlightBoxOne">
                              <div>
                                <img
                                  src={`${process.env.PUBLIC_URL}/FlightImages/${results?.[0][item]?.AirlineCode}.png`}
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
                                {/* {results?.[0][item]?.IsLCC === false ? (
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
                                  results?.[0][item]?.Segments?.[0][0]?.Origin
                                    ?.Airport?.CityName
                                }
                              </span>
                              <p>
                                {dayjs(
                                  results?.[0][item]?.Segments[0][0]?.Origin
                                    ?.DepTime
                                ).format("DD MMM, YY")}
                              </p>
                              <h5 style={{ fontSize: "14px" }}>
                                {dayjs(
                                  results?.[0][item]?.Segments[0][0]?.Origin
                                    ?.DepTime
                                ).format("h:mm A")}
                              </h5>
                            </div>

                            <div className="singleFlightBoxThree">
                              <h4>{duration}</h4>

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

                              <p>Non Stop</p>

                              <span>
                                {
                                  results?.[0][item]?.Segments?.[0][0]
                                    ?.NoOfSeatAvailable
                                }{" "}
                                Seats Left
                              </span>
                            </div>

                            <div className="singleFlightBoxFour">
                              <span>
                                {
                                  results?.[0][item]?.Segments?.[0][0]
                                    ?.Destination?.Airport?.CityName
                                }
                              </span>
                              <p>
                                {dayjs(
                                  results?.[0][item]?.Segments?.[0][0]
                                    ?.Destination?.ArrTime
                                ).format("DD MMM, YY")}
                              </p>
                              <h5 style={{ fontSize: "14px" }}>
                                {dayjs(
                                  results?.[0][item]?.Segments?.[0][0]
                                    ?.Destination?.ArrTime
                                ).format("h:mm A")}
                              </h5>
                            </div>

                            <div className="singleFlightBoxSeven">
                              <p>₹ {results?.[0][item]?.Fare?.PublishedFare}</p>
                              <button
                                onClick={() => {
                                  handleIndexId(
                                    results?.[0][item]?.ResultIndex
                                  );
                                }}
                              >
                                View Details →
                              </button>
                            </div>
                          </motion.div>
                        </motion.div>
                      )}
                    </>
                  );
                })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default function BasicGrid() {
  const reducerState = useSelector((state) => state);
  const results =
    reducerState?.oneWay?.oneWayData?.data?.data?.Response?.Results;

  const items = [...Array(results?.[0].length).keys()];
  const itemsPerPage = 50;
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
 

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
  //   if (reducerState?.oneWay?.oneWayData?.data?.data?.Response?.Error?.ErrorCode !== 0
  //     //  && reducerState?.oneWay?.oneWayData?.data?.data?.Response?.Error?.ErrorCode !== 2 && reducerState?.oneWayData?.showSuccessMessage
  //     // === false
  //   ) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Error",
  //       text: reducerState?.oneWay?.oneWayData?.data?.data?.Response?.Error?.ErrorMessage,

  //     })
  //     // navigate(`/`)
  //     console.warn(reducerState?.oneWay?.oneWayData?.data?.data?.Response?.Error?.ErrorMessage, "page not found")
  //   }
  // }, [reducerState?.oneWay])

  const [selectedCategory, setSelectedCategory] = useState([]);
  useEffect(() => {
    const uniqueData = results[0].filter((item, index, array) => {
      const isUnique = !array
        .slice(0, index)
        .some(
          prevItem =>
            prevItem.AirlineCode === item.AirlineCode &&
            prevItem.Segments?.[0]?.[prevItem.Segments[0].length - 1]?.Origin
              ?.DepTime ===
              item.Segments?.[0]?.[prevItem.Segments[0].length - 1]?.Origin
                ?.DepTime,
        );
      return isUnique;
    });
    // currentItems=uniqueData;
    const itemss = [...Array(uniqueData?.length).keys()];
    setCurrentItems(itemss)
    // console.warn("filter;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;",uniqueData,"current items",itemss)
  }, [results]);
  // useEffect(() => {
  //   console.warn("new basis grid", currentItems);
  //   const itemss = [...Array(results?.[0].length).keys()];
  //   setCurrentItems(itemss);
  // }, [results]);

  const handleRadioChange = (event) => {
    const selectedValue = event.target.value;

    // If "All" checkbox is selected, clear selectedCategory and uncheck all checkboxes
    if (selectedValue === "All") {
      setSelectedCategory([]);
      document.querySelectorAll('input[name="test"]').forEach((checkbox) => {
        checkbox.checked = false;
      });
    } else {
      // If other checkbox is selected, update selectedCategory as before
      setSelectedCategory((prevSelectedCategory) => {
        if (prevSelectedCategory.includes(selectedValue)) {
          return prevSelectedCategory.filter(
            (value) => value !== selectedValue
          );
        } else {
          return [...prevSelectedCategory, selectedValue];
        }
      });
    }
  };

  // console.log(selectedCategory, "selected")
  // console.warn(result,)

  return (
    <>
      <Items
        currentItems={currentItems}
        selectedCategory={selectedCategory}
        handleRadioChange={handleRadioChange}
      />
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
