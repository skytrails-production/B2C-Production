import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import axios from "axios";
import { apiURL } from "../../../Constants/constant";
import InsideNavbar from "../../../UI/BigNavbar/InsideNavbar";
// import StarIcon from "@mui/icons-material/Star";
// import starsvg from "../../../images/star.svg";
// import starBlank from "../../../images/starBlank.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import "./seatlayout.css";
import { motion } from "framer-motion";
// import steering from "../../../images/steering.svg";
import busGif from "../../../images/busGif.gif";
import busFilter from "../../../images/busFilter.png";
import dayjs from "dayjs";
import { Helmet } from "react-helmet-async";

const variants = {
  initial: {
    clipPath: "circle(1524px at 50% 50px)",
    transition: {
      type: "spring",
      stiffness: 20,
    },
  },
  animate: {
    clipPath: "circle(0px at 50% 50px)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

const variants2 = {
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

function BusResult() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate("");
  const reducerState = useSelector((state) => state);
  // const [openAccordian, setOpenAccordian] = useState(false);
  const [resultIndex, setResultIndex] = useState("");
  const [origin, setOrigin] = useState([]);
  const [destination, setDestination] = useState([]);
  const [resulttIndex, setResulttIndex] = useState("");
  const [selectedOrigin, setSelectedOrigin] = useState("");
  const [selectedDropPoint, setSelectedDropPoint] = useState("");
  const [openSeatLayout, setOpenSeatLayout] = useState(false);
  const upperArray = [];
  const lowerArray = [];
  const [blockedSeatArray, setBlockedSeatArray] = useState([]);
  const [flatArray, setFlatArray] = useState([]);
  // const [seatLayoutData, setSeatLayoutData] = useState({});
  const [layout, setLayout] = useState([]);
  const [loadingLayout, setLoadingLayout] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [sortOption, setSortOption] = useState("lowToHigh");

  const busFullData =
    reducerState?.getBusResult?.busResult?.data?.data?.BusSearchResult;
  // const busDetailsData =
  //   reducerState?.getBusResult?.busResult?.data?.data?.BusSearchResult
  //     ?.BusResults;
  const busDataResult =
    reducerState?.getBusResult?.busResult?.data?.data?.BusSearchResult
      ?.BusResults;
  useEffect(() => {
    // console.warn(origin, destination, "origin destanition :::::::::::::::::")
    if (origin.length > 0) {
      setSelectedOrigin(origin[0]);
      setSelectedDropPoint(destination[0]);
    }
  }, [origin]);

  useEffect(() => {
    if (
      reducerState?.getBusResult?.busResult?.data?.data?.BusSearchResult?.Error
        ?.ErrorCode !== 0 ||
      reducerState?.getBusResult?.busResult?.data?.data?.BusSearchResult?.Error
        ?.ErrorCode === undefined
    ) {
      navigate("/bus");
    }
  }, []);

  // console.log(origin, "origin");
  // console.log(destination, "destination");

  // setSelectedOrigin(origin?.[0]?.CityPointIndex)
  // setSelectedDropPoint()
  // console.log(selectedOrigin)

  function handleclick(resultIndexPara) {
    setBlockedSeatArray([]);
    setResultIndex(resultIndexPara);
    setLoadingLayout(true);
    setOpenSeatLayout(true);
    const requestData = {
      EndUserIp: reducerState?.ip?.ipData,
      ResultIndex: resultIndexPara,
      TraceId: busFullData?.TraceId,
      TokenId: reducerState?.ip?.tokenData,
    };

    try {
      axios
        .post(`${apiURL.baseURL}/skyTrails/bus/seatlayout`, requestData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          // setSeatLayoutData(response.data);

          const finalLayout = handleSeatLayoutStringTwo(
            response.data?.data?.GetBusSeatLayOutResult?.SeatLayoutDetails
              ?.HTMLLayout
          );

          setLayout((prev) => finalLayout);
          const SeatDetailsArray =
            response.data?.data?.GetBusSeatLayOutResult?.SeatLayoutDetails
              ?.SeatLayout?.SeatDetails;
          let singleArray = SeatDetailsArray?.reduce(
            (acc, currentArray) => [...acc, ...currentArray],
            []
          );
          setFlatArray(singleArray);
          busDataResult.map((item, index) => {
            if (item?.ResultIndex === resultIndexPara) {
              setOrigin(item?.BoardingPointsDetails);
              setDestination(item?.DroppingPointsDetails);
            }
          });
          setResulttIndex(resultIndexPara);
          setLoadingLayout(false);
        });
    } catch (error) {
      console.error("Try-Catch Error:", error);
    }

    // setOpen(true);
  }

  flatArray?.forEach((obj) => {
    if (obj?.IsUpper === true) {
      upperArray.push(obj);
    } else if (obj?.IsUpper === false) {
      lowerArray.push(obj);
    }
  });

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const [activeSort, setActiveSort] = useState("Relevance");

  const handleSortClick = (sortOption) => {
    setActiveSort(sortOption);
  };
  function handleSeatLayoutStringTwo(inputString) {
    let busSeatLayoutString = `${inputString}`;

    let seatObjects = [];

    let tempDiv = document.createElement("div");
    tempDiv.innerHTML = busSeatLayoutString;

    let seatDivs = tempDiv.querySelectorAll(
      ".hseat, .bhseat, .vhseat, .bhseat, .bseat, .vseat, .nseat, .rhseat"
    );
    // console.log(seatDivs);

    seatDivs.forEach((seatDiv) => {
      // Check if the seat div is inside the upper part of the bus
      if (seatDiv.closest(".outerseat")) {
        const upperCheck = seatDiv.closest(".outerseat");
        const lowerDivCheck = upperCheck.querySelector(".lower");
        if (lowerDivCheck) {
          seatObjects.push({
            type: "lower",
            id: seatDiv.id,
            class: seatDiv.getAttribute("class"),
            top: seatDiv.style.top,
            left: seatDiv.style.left,
            onclick: seatDiv.getAttribute("onclick"),
          });
        }

        // Conditionally check for SeatType 2 and add sleeper seat
        else {
          seatObjects.push({
            type: "upper",
            id: seatDiv.id,
            class: seatDiv.getAttribute("class"),
            top: seatDiv.style.top,
            left: seatDiv.style.left,
            onclick: seatDiv.getAttribute("onclick"),
          });
        }
      }
      // Check if the seat div is inside the lower part of the bus
      else if (seatDiv.closest(".outerlowerseat")) {
        seatObjects.push({
          type: "lower",
          id: seatDiv.id,
          class: seatDiv.getAttribute("class"),
          top: seatDiv.style.top,
          left: seatDiv.style.left,
          onclick: seatDiv.getAttribute("onclick"),
        });
      }
    });

    return seatObjects;
  }

  // const [selectedSeats, setSelectedSeats] = useState([]);

  function addOrRemoveSeat(e, object) {
    if (object.SeatStatus === false) {
      return;
    }
    // console.log(object, "onbj")
    const isSeatSelected = blockedSeatArray.includes(object);
    if (isSeatSelected) {
      const updatedBlockedSeatArray = blockedSeatArray.filter(
        (seatObject) => seatObject !== object
      );
      setBlockedSeatArray(updatedBlockedSeatArray);
    } else {
      setBlockedSeatArray([...blockedSeatArray, object]);
    }
  }

  // console.log(blockedSeatArray, "blocked seat array")

  function handleClose() {
    setBlockedSeatArray([]);
    setSelectedDropPoint("");
    setSelectedOrigin("");
    setOrigin([]);
    setDestination([]);
    setOpenSeatLayout(false);
    //  setModal((prev) => !prev);
  }
  function handleContinue() {
    // console.warn(selectedOrigin, selectedDropPoint, "selectedOrigin,selectedDropPoint,")
    if (
      blockedSeatArray.length === 0 ||
      selectedOrigin === "" ||
      destination.length === 0 ||
      selectedDropPoint === "" ||
      origin === ""
    ) {
      return;
    }
    const dataToSave = {
      blockedSeatArray: blockedSeatArray,
      selectedOrigin: selectedOrigin.CityPointIndex,
      selectedDropPoint: selectedDropPoint.CityPointIndex,
      resultIndex: resulttIndex,
    };

    // Save the combined state object to session storage
    sessionStorage.setItem("seatData", JSON.stringify(dataToSave));
    navigate("/BusPassengerDetail");
  }

  if (
    reducerState?.getBusResult?.busResult?.data?.data?.BusSearchResult?.Error
      ?.ErrorCode !== 0 ||
    reducerState?.getBusResult?.busResult?.data?.data?.BusSearchResult?.Error
      ?.ErrorCode === undefined
  ) {
    return <></>;
  }

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleRadioChange = (event) => {
    const selectedValue = event.target.value;
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

  // console.log(lowerArray, "selected category")

  const sortedAndFilteredResults = busDataResult
    ?.filter((item) => {
      const depTime = new Date(item?.DepartureTime);
      const hour = depTime.getHours();

      const categoryFilters = selectedCategory?.map((category) => {
        switch (category) {
          case "before6AM":
            return hour < 6;
          case "6AMto12PM":
            return hour >= 6 && hour < 12;
          case "12PMto6PM":
            return hour >= 12 && hour < 18;
          case "after6PM":
            return hour >= 18;
          case "Non AC":
            return item?.BusType?.toLowerCase().includes("non a/c");
          case "AC":
            return !item?.BusType?.toLowerCase().includes("non a/c");
          case "Sleeper":
            return item?.BusType?.toLowerCase().includes("sleeper");
          case "Seater":
            return item?.BusType?.toLowerCase().includes("seater");
          case "800":
            return item?.BusPrice?.PublishedPriceRoundedOff <= 800;
          case "1200":
            return (
              item?.BusPrice?.PublishedPriceRoundedOff > 800 &&
              item?.BusPrice?.PublishedPriceRoundedOff <= 1200
            );
          case "2000":
            return (
              item?.BusPrice?.PublishedPriceRoundedOff > 1200 &&
              item?.BusPrice?.PublishedPriceRoundedOff <= 2000
            );
          case "3000":
            return (
              item?.BusPrice?.PublishedPriceRoundedOff > 2000 &&
              item?.BusPrice?.PublishedPriceRoundedOff <= 3000
            );
          case "3001":
            return item?.BusPrice?.PublishedPriceRoundedOff > 3000;
          default:
            return true;
        }
      });

      return categoryFilters?.every((filter) => filter);
    })
    .sort((a, b) =>
      sortOption === "lowToHigh"
        ? a?.BusPrice?.PublishedPriceRoundedOff -
        b?.BusPrice?.PublishedPriceRoundedOff
        : b?.BusPrice?.PublishedPriceRoundedOff -
        a?.BusPrice?.PublishedPriceRoundedOff
    );

  // console.log(layout, " bus data result")
  // console.log(busDataResult, " busDataResult")
  // console.log(lowerArray, " busFullData")

  const hasUpperSeats = layout.some((item) => item?.type === "upper");

  return (
    <>
      <Helmet>
        <title>Bus Result</title>
        <link rel="canonical" href="/busresult" />
        <meta name="description" content="bus" />
        <meta
          name="keywords"
          content="online bus booking,cheap bus ticket,compare bus fare,best bus deal,last minute bus booking,luxury bus travel,comfortable bus journeys,overnight bus trips,scenic bus routes,student bus passes,sleeper bus with AC,bus with Wi-Fi and charging points,pet-friendly bus travel,luggage allowance on buses"
        />
      </Helmet>
      <div className="mainimgBusSearch">
        {/* <Navbar /> */}
        {/* <BigNavbar /> */}
        <InsideNavbar />
      </div>
      <section className="my-4 mx-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-9 scrollDesign">
              <div className="flightFilterBox">
                <div className="filterTitle">
                  <p>Select Filters</p>
                </div>
                <div className="innerFilter">
                  <div className="busDepartureMain">
                    <h2 className="sidebar-title">Sort By</h2>
                    <select
                      className="highSelect"
                      value={sortOption}
                      onChange={handleSortChange}
                    >
                      <option value="lowToHigh">Low to High</option>
                      <option value="highToLow">High to Low</option>
                    </select>
                  </div>

                  <div>

                    <div>
                      <label className="sidebar-label-container ps-0">
                        <input
                          type="checkbox"
                          onChange={handleRadioChange}
                          value="All"
                          name="test"
                        />
                        {/* <span className="checkmark"></span> */}
                        <span style={{ color: selectedCategory.length > 0 ? "red" : "gray" }}>Clear Filter</span>
                      </label>

                    </div>
                    <Divider
                      sx={{ marginBottom: "15px", backgroundColor: "transparent" }}
                    />
                  </div>

                  <div className="busDepartureMain">
                    <h2 className="sidebar-title">Bus Type</h2>

                    <div>
                      {/* <label className="sidebar-label-container">
                        <input
                          type="checkbox"
                          onChange={handleRadioChange}
                          value="All"
                          name="test"
                        />
                        <span className="checkmark"></span>All
                      </label> */}

                      <label className="sidebar-label-container ps-0">
                        <div className="svgBOx">
                          <input
                            type="checkbox"
                            onChange={handleRadioChange}
                            value="Non AC"
                            name="test"
                          />
                          {/* <span className="checkmark"></span>Non AC */}
                          <div>
                            <span className="checkedSVG pe-2">
                              <svg id="fi_13285168" height="19" width="19" enable-background="new 0 0 25 25" viewBox="0 0 492 492" xmlns="http://www.w3.org/2000/svg"><g><g><path d="m372.16 321.72h-181.02c-2.76 0-5-2.24-5-5s2.24-5 5-5h181.03c11.06 0 20.06-9 20.06-20.06v-89.84c0-11.06-9-20.06-20.06-20.06h-41.07c-2.76 0-5-2.24-5-5s2.24-5 5-5h41.07c16.57 0 30.06 13.48 30.06 30.06v89.84c-.01 16.58-13.49 30.06-30.07 30.06zm-208.62 0h-43.19c-16.57 0-30.06-13.48-30.06-30.06v-89.84c0-16.57 13.48-30.06 30.06-30.06h183.15c2.76 0 5 2.24 5 5s-2.24 5-5 5h-183.14c-11.06 0-20.06 9-20.06 20.06v89.84c0 11.06 9 20.06 20.06 20.06h43.19c2.76 0 5 2.24 5 5s-2.24 5-5.01 5z"></path></g><g><path d="m345.88 321.72c-2.76 0-5-2.24-5-5v-28.11c0-2.3-1.87-4.17-4.17-4.17h-108.29c-2.76 0-5-2.24-5-5s2.24-5 5-5h108.29c7.81 0 14.17 6.36 14.17 14.17v28.11c0 2.76-2.24 5-5 5zm-199.24 0c-2.76 0-5-2.24-5-5v-28.11c0-7.81 6.36-14.17 14.17-14.17h45.02c2.76 0 5 2.24 5 5s-2.24 5-5 5h-45.02c-2.3 0-4.17 1.87-4.17 4.17v28.11c0 2.76-2.24 5-5 5z"></path></g><g><path d="m318.38 303.08h-108.6c-2.76 0-5-2.24-5-5s2.24-5 5-5h108.6c2.76 0 5 2.24 5 5s-2.24 5-5 5z"></path></g><g><path d="m367.88 206.82h-61.85c-2.76 0-5-2.24-5-5s2.24-5 5-5h61.85c2.76 0 5 2.24 5 5s-2.23 5-5 5zm-89.43 0h-75.58c-2.76 0-5-2.24-5-5s2.24-5 5-5h75.58c2.76 0 5 2.24 5 5s-2.24 5-5 5z"></path></g><g><path d="m367.88 239.82h-94.85c-2.76 0-5-2.24-5-5s2.24-5 5-5h94.85c2.76 0 5 2.24 5 5s-2.23 5-5 5zm-122.44 0h-42.58c-2.76 0-5-2.24-5-5s2.24-5 5-5h42.58c2.76 0 5 2.24 5 5s-2.23 5-5 5z"></path></g><g><path d="m363.61 275.27c-8.82 0-16-7.18-16-16s7.18-16 16-16 16 7.18 16 16-7.18 16-16 16zm0-22c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z"></path></g><g><path d="m128.91 275.27c-8.82 0-16-7.18-16-16s7.18-16 16-16 16 7.18 16 16-7.17 16-16 16zm0-22c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z"></path></g></g><g><g><path d="m246.26 467.74c-59.03 0-114.53-22.99-156.27-64.73s-64.73-97.24-64.73-156.27 22.99-114.53 64.73-156.27 97.24-64.73 156.27-64.73 114.53 22.99 156.27 64.73 64.73 97.24 64.73 156.27-22.99 114.53-64.73 156.27-97.24 64.73-156.27 64.73zm0-431.9c-54.03 0-108.07 20.57-149.2 61.7-39.85 39.85-61.8 92.84-61.8 149.2s21.95 109.35 61.8 149.2c82.27 82.27 216.13 82.27 298.4 0 39.85-39.85 61.8-92.84 61.8-149.2s-21.95-109.35-61.8-149.2c-41.13-41.13-95.17-61.7-149.2-61.7z"></path></g><g><path d="m246.19 448.16c-48.05 0-96.16-17.12-134.5-51.62-1.02-.92-1.62-2.21-1.65-3.58s.49-2.7 1.46-3.67l277.32-277.32c.97-.97 2.3-1.5 3.67-1.46s2.67.63 3.58 1.65c71.59 79.56 68.34 201.22-7.41 276.97-39.25 39.25-90.82 59.03-142.47 59.03zm-123.85-55.58c75.63 64.43 188.5 60.21 259.24-10.52 70.74-70.74 74.96-183.6 10.52-259.24zm-21.15-8.5c-.04 0-.08 0-.11 0-1.36-.03-2.66-.62-3.58-1.63-34.99-38.3-53.66-88.03-52.56-140.02 1.1-52.15 22.03-101.19 58.93-138.09s85.94-57.83 138.09-58.93c51.99-1.11 101.71 17.56 140.02 52.56 1.01.92 1.6 2.21 1.63 3.58.03 1.36-.5 2.68-1.46 3.65l-277.43 277.41c-.94.94-2.21 1.47-3.53 1.47zm145.11-328.87c-49.03 0-97.97 18.82-135.36 56.2-71.29 71.29-75.08 184.67-9.54 260.38l269.92-269.92c-36.01-31.16-80.56-46.66-125.02-46.66z"></path></g></g></svg>
                            </span>
                            <span>Non AC</span>
                          </div>
                        </div>
                      </label>

                      <label className="sidebar-label-container ps-0">

                        {/* <span className="checkmark"></span>AC */}

                        <div className="svgBOx">
                          <input
                            type="checkbox"
                            onChange={handleRadioChange}
                            value="AC"
                            name="test"
                          />
                          {/* <span className="checkmark"></span>AC */}
                          <div>
                            <span className="checkedSVG pe-2">
                              <svg id="fi_4343580" enable-background="new 0 0 501.213 501.213" height="19" viewBox="0 0 501.213 501.213" width="19" xmlns="http://www.w3.org/2000/svg"><g><path d="m475.242 370.564-6.416-29.306-35.375 7.745-40.056-25.666 47.514-10.403-6.417-29.306-76.819 16.819-32.065-20.546v-58.65l31.991-20.766 76.918 16.365 6.243-29.343-47.575-10.122 39.904-25.903 35.42 7.536 6.243-29.343-26.826-5.708 5.707-26.826-29.344-6.243-7.536 35.421-39.903 25.903 10.122-47.575-29.343-6.243-16.365 76.918-31.626 20.529-44.032-22.016v-37.015l55.606-55.607-21.212-21.213-34.394 34.394v-47.574l25.606-25.607-21.212-21.213-19.394 19.393-19.393-19.393-21.213 21.213 25.606 25.607v47.574l-34.393-34.394-21.213 21.213 55.606 55.607v37.016l-44.084 22.042-31.796-20.373-16.82-76.82-29.306 6.416 10.403 47.514-40.056-25.666-7.746-35.375-29.304 6.416 5.866 26.792-26.792 5.866 6.416 29.306 35.375-7.745 40.056 25.666-47.514 10.403 6.417 29.306 76.819-16.819 32.065 20.546v58.65l-31.991 20.767-76.919-16.365-6.243 29.343 47.575 10.122-39.902 25.902-35.42-7.536-6.243 29.343 26.826 5.708-5.707 26.826 29.344 6.243 7.536-35.421 39.903-25.903-10.122 47.575 29.343 6.243 16.365-76.918 31.626-20.529 44.032 22.016v37.016l-55.608 55.607 21.213 21.213 34.394-34.393v47.574l-25.607 25.606 21.213 21.213 19.394-19.393 19.393 19.393 21.213-21.213-25.606-25.607v-47.573l34.393 34.393 21.213-21.213-55.606-55.607v-37.016l44.084-22.042 31.796 20.374 16.82 76.82 29.306-6.417-10.403-47.513 40.056 25.666 7.746 35.375 29.306-6.417-5.866-26.792zm-179.636-91.728-45 22.5-45-22.5v-56.459l45-22.5 45 22.5z"></path></g></svg>
                            </span>
                            <span>AC</span>
                          </div>
                        </div>
                      </label>

                      <label className="sidebar-label-container ps-0">

                        {/* <span className="checkmark"></span>Seater */}

                        <div className="svgBOx">
                          <input
                            type="checkbox"
                            onChange={handleRadioChange}
                            value="Seater"
                            name="test"
                          />
                          {/* <span className="checkmark"></span>Seater */}
                          <div>
                            <span className="checkedSVG pe-2">
                              <svg id="fi_6151135" height="19" viewBox="0 0 128 128" width="19" xmlns="http://www.w3.org/2000/svg"><circle cx="41.77" cy="103.939" r="8.34" transform="matrix(.973 -.23 .23 .973 -22.763 12.377)"></circle><path d="m41.77 93.617a10.017 10.017 0 0 1 9.01 5.3 12.772 12.772 0 0 0 4.63-9.35 20.4 20.4 0 0 0 -3.1-11.82 100.4 100.4 0 0 1 -6.37-11.747 89.7 89.7 0 0 1 -6.81-21.64c-.24-1.32-.5-2.59-.78-3.79a9.427 9.427 0 0 0 -9.19-7.34c-.43 0-.82.04-1.24.08l-.16.01a11.208 11.208 0 0 0 -1.227.263v-4.083a9.215 9.215 0 0 0 9-7.995l1.467-11.105a9.214 9.214 0 0 0 -7.91-10.333c-.39-.05-8.49-1.026-10.34 7.92l-1.47 11.113a9.211 9.211 0 0 0 7.253 10.21v5.027a10.945 10.945 0 0 0 -5.7 13.153l15.25 49.56a10.19 10.19 0 0 1 7.687-3.433z"></path><path d="m110.59 99.547a11.309 11.309 0 0 0 -4.45-7.73 11.54 11.54 0 0 0 -8.65-2.32l-41.37 5.52a14.06 14.06 0 0 1 -4.51 5.8 10.019 10.019 0 0 1 .5 3.14 10.354 10.354 0 0 1 -10.34 10.343c-.34 0-.67-.02-1-.05v4.24h62.36s9.151-3.902 7.46-18.943z"></path><path d="m40.77 120.487v1.39a6.116 6.116 0 0 0 6.11 6.11h50.85a6.114 6.114 0 0 0 6.1-6.11v-1.45l-.09.06z"></path></svg>
                            </span>
                            <span>Seater</span>
                          </div>
                        </div>
                      </label>

                      <label className="sidebar-label-container ps-0">

                        {/* <span className="checkmark"></span>Sleeper */}


                        <div className="svgBOx">
                          <input
                            type="checkbox"
                            onChange={handleRadioChange}
                            value="Sleeper"
                            name="test"
                          />
                          {/* <span className="checkmark"></span>Seater */}
                          <div>
                            <span className="checkedSVG pe-2">
                              <svg id="fi_9567116" height="19" viewBox="0 0 50 50" width="19" xmlns="http://www.w3.org/2000/svg"><g id="XMLID_3876_"><path id="XMLID_3879_" d="m4.9436 27.8333v-15.6249c0-1.0816-.8768-1.9584-1.9583-1.9584-1.0816 0-1.9584.8768-1.9584 1.9584v25.5833c0 1.0816.8768 1.9584 1.9584 1.9584 1.0815 0 1.9583-.8768 1.9583-1.9584v-3.6689l40.1129-.0943v3.6689c0 1.0816.8768 1.9584 1.9583 1.9584s1.9583-.8768 1.9583-1.9584v-3.6689-5.1227-1.1668z"></path><path id="XMLID_3878_" d="m48.9731 26.1557h-29.7708v-7.375c0-2.1401 1.7349-3.875 3.875-3.875h18.0729c4.3205 0 7.8229 3.5024 7.8229 7.8229z"></path><circle id="XMLID_3877_" cx="12.234" cy="20.531" r="4.781"></circle></g></svg>
                            </span>
                            <span>Sleeper</span>
                          </div>
                        </div>
                      </label>
                    </div>
                    {/* <Divider
                      sx={{ marginBottom: "15px", marginTop: "15px", backgroundColor: "lightgray" }}
                    /> */}
                  </div>

                  <div className="busDepartureMain">
                    <h2 className="sidebar-title">Departure Time</h2>

                    <div>
                      <label className="sidebar-label-container  ps-0">
                        {/* <span className="checkmark"></span> */}

                        <div className="svgBOx">
                          <input
                            type="checkbox"
                            onChange={handleRadioChange}
                            value="before6AM"
                            name="test"
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
                            name="test"
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
                            name="test"
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
                            name="test"
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
                  </div>

                  <div>
                    <h2 className="sidebar-title">By Price</h2>

                    <div>
                      <label className="sidebar-label-container">
                        <input
                          type="checkbox"
                          onChange={handleRadioChange}
                          value="800"
                          name="test"
                        />
                        <span className="checkmark"></span>₹0 - 800
                      </label>

                      <label className="sidebar-label-container">
                        <input
                          type="checkbox"
                          onChange={handleRadioChange}
                          value="1200"
                          name="test"
                        />
                        <span className="checkmark"></span>₹800 - 1200
                      </label>

                      <label className="sidebar-label-container">
                        <input
                          type="checkbox"
                          onChange={handleRadioChange}
                          value="2000"
                          name="test"
                        />
                        <span className="checkmark"></span>₹1200 - 2000
                      </label>

                      <label className="sidebar-label-container">
                        <input
                          type="checkbox"
                          onChange={handleRadioChange}
                          value="3000"
                          name="test"
                        />
                        <span className="checkmark"></span>₹2000 - 3000
                      </label>
                      <label className="sidebar-label-container">
                        <input
                          type="checkbox"
                          onChange={handleRadioChange}
                          value="3001"
                          name="test"
                        />
                        <span className="checkmark"></span>₹3000 and Above
                      </label>
                    </div>
                    <Divider
                      sx={{ marginBottom: "15px", backgroundColor: "gray" }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-9 col-md-9">
              <div className="row">
                {sortedAndFilteredResults &&
                  sortedAndFilteredResults.length > 0 ? (
                  sortedAndFilteredResults?.map((busDetails) => {
                    // here i am calculation the duration between departure and arrival time

                    const departureTime = new Date(
                      busDetails?.DepartureTime
                    ).getTime();
                    const arrivalTime = new Date(
                      busDetails?.ArrivalTime
                    ).getTime();
                    const timeDifference = arrivalTime - departureTime;
                    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
                    const minutes = Math.floor(
                      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
                    );
                    const duration = `${hours}hr ${minutes}min`;

                    return (
                      <motion.div
                        variants={variants2}
                        initial="initial"
                        whileInView="animate"
                        className="col-lg-12"
                        key={busDetails?.ResultIndex}
                      >
                        <div className="singleBusSearchBox">
                          <div className="singleBusSearchBoxOne">
                            <span>{busDetails?.TravelName}</span>
                          </div>
                          <div className="singleBusSearchBoxOne">
                            <span
                              style={{
                                fontSize: "12px",
                                color: "#444",
                                fontWeight: "700",
                              }}
                            >
                              {busDetails?.BusType}
                            </span>
                          </div>
                          <div className="anotherBusResult">
                            <div className="singleBusSearchBoxTwo">
                              <span>{busFullData?.Origin}</span>
                              <p>
                                {dayjs(busDetails?.DepartureTime).format(
                                  "DD MMM, YY"
                                )}
                              </p>
                              <p style={{ fontSize: "14px" }}>
                                {dayjs(busDetails?.DepartureTime).format(
                                  "h:mm A"
                                )}
                              </p>
                            </div>

                            <div className="singleBusSearchBoxThree">
                              <h4>{duration}</h4>

                              <div>
                                <Divider
                                  orientation="vertical"
                                  flexItem
                                  sx={{
                                    // backgroundColor: "green",
                                    marginX: "8px",
                                    height: "2px",
                                    border: "1px dashed #777",
                                  }}
                                />
                              </div>

                              <span>
                                {busDetails?.AvailableSeats} Seats Left
                              </span>
                            </div>

                            <div className="singleBusSearchBoxFour">
                              <span>{busFullData?.Destination}</span>
                              <p>
                                {dayjs(busDetails?.ArrivalTime).format(
                                  "DD MMM, YY"
                                )}
                              </p>
                              <p style={{ fontSize: "14px" }}>
                                {dayjs(busDetails?.ArrivalTime).format(
                                  "h:mm A"
                                )}
                              </p>
                            </div>

                            <div className="singleBusSearchBoxSeven">
                              <p>From
                                ₹{" "}
                                {busDetails?.BusPrice?.PublishedPriceRoundedOff}
                              </p>
                              <button
                                onClick={() =>
                                  handleclick(busDetails?.ResultIndex)
                                }
                              >
                                Show Seats →
                              </button>
                            </div>
                          </div>
                        </div>
                        {resultIndex == busDetails?.ResultIndex &&
                          openSeatLayout && (
                            <motion.div
                              variants={variants}
                              initial="animate"
                              animate="initial"
                              className="sealLayoutDiv"
                            >
                              {!loadingLayout ? (
                                <div className="layOutParent">
                                  <div className="seatTypeDetails">
                                    <div>
                                      <p>Available</p>
                                      <span></span>
                                    </div>
                                    <div>
                                      <p>Ladies Seat</p>
                                      <span
                                        style={{ backgroundColor: "pink" }}
                                      ></span>
                                    </div>
                                    <div>
                                      <p>Unavailable</p>
                                      <span
                                        style={{ backgroundColor: "#a9a9a9" }}
                                      ></span>
                                    </div>
                                  </div>
                                  <div className="layOutParentInner seatBoxCustom">
                                    <div className="customBusBox">
                                      {hasUpperSeats && (
                                        <div class="outerseat rott">
                                          <div className="">
                                            <p>Upper</p>
                                          </div>

                                          <div class="busSeatlft">
                                            <div class="upper"></div>
                                          </div>
                                          <div class="busSeatrgt">
                                            <div class="busSeat upperBoxCustom">
                                              <div class="seatcontainer clearfix">
                                                {layout?.map((item, index) => {
                                                  if (item?.type === "upper") {
                                                    const divStyle = {
                                                      top: item?.top || 0,
                                                      left: item?.left || 0,
                                                    };
                                                    return (
                                                      <Box
                                                        class={item?.class}
                                                        id={item?.id}
                                                        style={{
                                                          ...divStyle,
                                                          position: "absolute",
                                                        }}
                                                      >
                                                        <svg
                                                          onClick={(e) =>
                                                            addOrRemoveSeat(
                                                              e,
                                                              upperArray?.[
                                                              index
                                                              ]
                                                            )
                                                          }
                                                          width="40"
                                                          height="29"
                                                          viewBox="0 0 60 30"
                                                          xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                          <rect
                                                            x="0.5"
                                                            y="0.5"
                                                            width="59"
                                                            height="29"
                                                            rx="3.5"
                                                            fill={
                                                              blockedSeatArray.includes(
                                                                upperArray?.[
                                                                index
                                                                ]
                                                              )
                                                                ? "#21325d"
                                                                : upperArray?.[
                                                                  index
                                                                ]
                                                                  ?.IsLadiesSeat ===
                                                                  true
                                                                  ? "pink"
                                                                  : upperArray?.[
                                                                    index
                                                                  ]
                                                                    ?.SeatStatus ===
                                                                    false
                                                                    ? "#A9A9A9"
                                                                    : "#fff"
                                                            }
                                                            stroke="#21325d"
                                                          ></rect>
                                                          <rect
                                                            x="56.5"
                                                            y="5.5"
                                                            width="3"
                                                            height="19"
                                                            rx="1.5"
                                                            fill="white"
                                                            stroke="#21325d"
                                                          ></rect>
                                                        </svg>
                                                      </Box>
                                                    );
                                                  }
                                                })}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                    <div className="customBusBox">
                                      <div class="outerlowerseat steeringBoxLower">
                                        <p>Lower</p>
                                        <div className="svgStreering">
                                          <svg
                                            x="0px"
                                            y="0px"
                                            viewBox="0 0 24 24"
                                            width="1.3rem"
                                            height="1.3rem"
                                            fill="currentColor"
                                            style={{
                                              color: "rgb(122, 122, 122)",
                                            }}
                                          >
                                            <g transform="matrix(0.022438, 0, 0, 0.022438, 0.781086, 0.781028)">
                                              <g transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)">
                                                <path d="M4456.6,4992.6c-1186-146.8-2204.3-655.9-3009.9-1500.5C757.8,2770.3,335.5,1928.7,152.8,922.4c-68.9-392.3-71.9-1230.9,0-1617.3c128.8-715.8,437.3-1458.6,835.6-2021.6c242.6-344.4,829.6-934.4,1171-1174c937.4-661.9,2126.4-985.3,3234.6-883.5c694.8,65.9,1144.1,191.7,1773,497.2c518.1,254.5,853.6,497.1,1287.8,931.4c197.7,197.7,446.3,482.2,551.1,628.9C9221.6-2411,9539-1782,9652.8-1431.7c335.4,1009.3,329.4,2129.4-18,3141.7c-122.8,365.4-404.3,913.5-634.9,1239.9c-239.6,341.4-829.6,928.4-1174,1171c-560.1,395.3-1317.8,709.8-2006.6,832.6C5492.8,5010.5,4765,5031.5,4456.6,4992.6z M5585.7,4019.2c1233.9-182.7,2330.1-964.4,2914.1-2081.5l152.7-296.5H4998.7H1341.8l107.8,218.6c380.4,760.7,1000.3,1389.7,1755.1,1773C3947.4,4010.2,4762.1,4142,5585.7,4019.2z M5352,997.3c545.1-191.7,691.9-904.5,266.6-1290.8c-161.7-143.8-302.5-197.7-518.1-200.6c-212.6,0-356.4,53.9-518.1,203.7c-173.7,155.8-245.6,320.5-245.6,560.1C4336.8,805.6,4848.9,1174,5352,997.3z M1955.8,23.9c290.5-74.9,679.9-254.6,928.4-434.3c275.5-197.7,637.9-596,802.6-886.5c263.6-464.2,407.3-1078.2,365.4-1554.4c-21-239.6-119.8-703.8-164.7-775.7c-32.9-56.9-188.7-12-566,164.7c-425.3,200.7-760.7,437.3-1111.1,790.7c-622.9,620-994.3,1350.7-1123.1,2216.3c-24,155.7-44.9,350.4-44.9,431.3v146.8l338.4-18C1563.4,95.8,1824,59.9,1955.8,23.9z M8949-27c0-80.9-21-272.5-44.9-428.3c-128.8-865.6-500.2-1599.3-1123.1-2216.3c-353.4-353.4-691.8-593-1111.1-790.7c-425.3-197.7-404.3-197.7-461.2-12c-128.8,440.2-137.8,1132.1-18,1536.4c74.9,245.6,263.6,649.9,392.3,838.6c488.2,709.8,1371.7,1198,2195.3,1210l170.7,3V-27z"></path>
                                              </g>
                                            </g>
                                          </svg>
                                        </div>
                                        <div class="busSeatlft">
                                          <div class="lower"></div>
                                        </div>
                                        <div class="busSeatrgt">
                                          <div class="busSeat upperBoxCustom">
                                            <div class="seatcontainer seatContTwo clearfix">
                                              {layout?.map((item, index) => {
                                                if (item?.type === "lower") {
                                                  const divStyle = {
                                                    top: item?.top || 0,
                                                    left: item?.left || 0,
                                                  };
                                                  // console.log()
                                                  return (
                                                    <Box
                                                      class={item?.class}
                                                      id={item?.id}
                                                      style={{
                                                        ...divStyle,
                                                        position: "absolute",
                                                      }}
                                                    >
                                                      {lowerArray?.[
                                                        index -
                                                        upperArray.length
                                                      ]?.SeatType == 2 ? (
                                                        <div>
                                                          <svg
                                                            onClick={(e) =>
                                                              addOrRemoveSeat(
                                                                e,
                                                                lowerArray?.[
                                                                index -
                                                                upperArray.length
                                                                ]
                                                              )
                                                            }
                                                            width="40"
                                                            height="29"
                                                            viewBox="0 0 60 30"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                          >
                                                            <rect
                                                              x="0.5"
                                                              y="0.5"
                                                              width="59"
                                                              height="29"
                                                              rx="3.5"
                                                              fill={
                                                                blockedSeatArray.includes(
                                                                  lowerArray?.[
                                                                  index -
                                                                  upperArray.length
                                                                  ]
                                                                )
                                                                  ? "#21325d"
                                                                  : lowerArray?.[
                                                                    index -
                                                                    upperArray.length
                                                                  ]
                                                                    ?.IsLadiesSeat ===
                                                                    true
                                                                    ? "pink"
                                                                    : lowerArray?.[
                                                                      index -
                                                                      upperArray.length
                                                                    ]
                                                                      ?.SeatStatus ===
                                                                      false
                                                                      ? "#A9A9A9"
                                                                      : "#fff"
                                                              }
                                                              stroke="#21325d"
                                                            ></rect>
                                                            <rect
                                                              x="56.5"
                                                              y="5.5"
                                                              width="3"
                                                              height="19"
                                                              rx="1.5"
                                                              fill="white"
                                                              stroke={
                                                                lowerArray?.[
                                                                  index -
                                                                  upperArray.length
                                                                ]
                                                                  ?.isLadiesSeat ===
                                                                  true
                                                                  ? "pink"
                                                                  : "#21325d"
                                                              }
                                                            ></rect>
                                                          </svg>
                                                        </div>
                                                      ) : (
                                                        <div>
                                                          <svg
                                                            onClick={(e) =>
                                                              addOrRemoveSeat(
                                                                e,
                                                                lowerArray?.[
                                                                index -
                                                                upperArray.length
                                                                ]
                                                              )
                                                            }
                                                            width="21"
                                                            height="21"
                                                            viewBox="0 0 31 31"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                          >
                                                            <path
                                                              d="M21.7568 5.58197H15.5946C15.0811 5.58197 12 5.58197 12 3.04098C12 1.0082 13.7117 0.5 14.5676 0.5H24.3243C29.6649 0.906557 30.5 5.41257 30.5 7.61475V23.8852C30.5 29.5 24.8378 30.5 23.8108 30.5H14.5676C13.027 30.5 12 30.4918 12 27.9508C12 25.918 13.7117 25 14.5676 25H20.2162C22 25 25 24.9016 25 22.8689V8.5C25 6.06066 22.955 5.58197 21.7568 5.58197Z"
                                                              fill={
                                                                blockedSeatArray.includes(
                                                                  lowerArray?.[
                                                                  index -
                                                                  upperArray.length
                                                                  ]
                                                                )
                                                                  ? "#21325d"
                                                                  : lowerArray?.[
                                                                    index -
                                                                    upperArray.length
                                                                  ]
                                                                    ?.IsLadiesSeat ===
                                                                    true
                                                                    ? "pink"
                                                                    : lowerArray?.[
                                                                      index -
                                                                      upperArray.length
                                                                    ]
                                                                      ?.SeatStatus ===
                                                                      false
                                                                      ? "#A9A9A9"
                                                                      : "#fff"
                                                              }
                                                            ></path>
                                                            <rect
                                                              y="3"
                                                              width="25"
                                                              height="25"
                                                              rx="4"
                                                              fill={
                                                                blockedSeatArray.includes(
                                                                  lowerArray?.[
                                                                  index -
                                                                  upperArray.length
                                                                  ]
                                                                )
                                                                  ? "#21325d"
                                                                  : lowerArray?.[
                                                                    index -
                                                                    upperArray.length
                                                                  ]
                                                                    ?.IsLadiesSeat ===
                                                                    true
                                                                    ? "pink"
                                                                    : lowerArray?.[
                                                                      index -
                                                                      upperArray.length
                                                                    ]
                                                                      ?.SeatStatus ===
                                                                      false
                                                                      ? "#A9A9A9"
                                                                      : "#fff"
                                                              }
                                                            ></rect>
                                                            <path
                                                              fill-rule="evenodd"
                                                              clip-rule="evenodd"
                                                              d="M12.6453 0.584801C13.2694 0.142591 14.0033 0 14.5 0H24.0192L24.0383 0.00144939C26.7974 0.210319 28.557 1.48384 29.613 3.00722C30.6547 4.50993 31 6.23503 31 7.38095V23.619C31 27.0066 29.3925 28.8849 27.6249 29.8885C25.8951 30.8706 24.0471 31 23.5 31H14.5C13.7143 31 12.9166 30.8758 12.3339 30.3023C11.7554 29.7329 11.5 28.8309 11.5 27.5556C11.5 26.4111 11.9958 25.6483 12.6453 25.188C13.2694 24.7458 14.0033 24.6032 14.5 24.6032H20C21.8074 24.6032 22.9511 24.4744 23.6378 24.1576C23.9623 24.0079 24.1634 23.8251 24.2909 23.6056C24.4219 23.3799 24.5 23.0722 24.5 22.6349V8.36508C24.5 7.37872 24.0285 6.78849 23.4249 6.42192C22.7947 6.03916 22.0173 5.90476 21.5 5.90476H15.4937C15.2321 5.90479 14.2825 5.90487 13.383 5.56442C12.9242 5.39078 12.4507 5.11854 12.0903 4.68726C11.7232 4.24785 11.5 3.6743 11.5 2.95238C11.5 1.80788 11.9958 1.04508 12.6453 0.584801ZM13.2297 1.38345C12.8376 1.66127 12.5 2.12863 12.5 2.95238C12.5 3.46062 12.6518 3.80969 12.8628 4.06224C13.0806 4.32292 13.3883 4.512 13.742 4.64589C14.4602 4.91773 15.2523 4.92063 15.5 4.92063H21.5C22.1493 4.92063 23.122 5.08148 23.9501 5.58443C24.8049 6.10357 25.5 6.98953 25.5 8.36508V22.6349C25.5 23.1818 25.4031 23.6737 25.1591 24.0938C24.9116 24.5202 24.5377 24.8294 24.0622 25.0487C23.1489 25.47 21.7926 25.5873 20 25.5873H14.5C14.1633 25.5873 13.6472 25.6907 13.2297 25.9866C12.8376 26.2644 12.5 26.7318 12.5 27.5556C12.5 28.7405 12.7446 29.3147 13.0411 29.6064C13.3334 29.8941 13.7857 30.0159 14.5 30.0159H23.5C23.9529 30.0159 25.6049 29.8992 27.1251 29.0361C28.6075 28.1945 30 26.6283 30 23.619V7.38095C30 6.3946 29.6952 4.87208 28.787 3.56183C27.8953 2.27557 26.4102 1.17316 23.9805 0.984127H14.5C14.1633 0.984127 13.6472 1.08757 13.2297 1.38345Z"
                                                              fill={
                                                                blockedSeatArray.includes(
                                                                  lowerArray?.[
                                                                  index -
                                                                  upperArray.length
                                                                  ]
                                                                )
                                                                  ? "#fff"
                                                                  : "#21325d"
                                                              }
                                                            ></path>
                                                            <path
                                                              fill-rule="evenodd"
                                                              clip-rule="evenodd"
                                                              d="M1.73348 3.71775C2.66649 3.13928 3.76564 2.95312 4.5 2.95312H12.5V3.93725H4.5C3.90103 3.93725 3.00018 4.09554 2.26652 4.55041C1.55974 4.98861 1 5.70162 1 6.88963V24.1119C0.999994 24.8094 1.12107 25.6617 1.64631 26.3337C2.15222 26.9809 3.11019 27.5563 5 27.5563H12.5V28.5404H5C2.88981 28.5404 1.59777 27.8857 0.853684 26.9337C0.128916 26.0065 -6.67546e-06 24.8905 2.59235e-10 24.1119V6.88963C2.59235e-10 5.32209 0.773597 4.31287 1.73348 3.71775Z"
                                                              fill="#21325d"
                                                            ></path>
                                                          </svg>
                                                        </div>
                                                      )}
                                                    </Box>
                                                  );
                                                }
                                              })}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div>
                                    <div className="seatOrgDes">
                                      <div className="seatPriceBox">
                                        <div className="seatNameBox">
                                          {" "}
                                          <Typography>Seats:</Typography>
                                          {blockedSeatArray?.map(
                                            (seat, index) => {
                                              return (
                                                <Typography
                                                  sx={{
                                                    color: "blue",
                                                  }}
                                                >
                                                  {seat?.SeatName}
                                                </Typography>
                                                // <p>{seat?.Seatname}</p>
                                              );
                                            }
                                          )}
                                        </div>
                                        <div>
                                          {(() => {
                                            const totalSeatPrice =
                                              blockedSeatArray.reduce(
                                                (totalPrice, seat) => {
                                                  return (
                                                    totalPrice +
                                                    (seat?.SeatFare || 0)
                                                  );
                                                },
                                                0
                                              );
                                            return (
                                              <div className="seatFareBox">
                                                <p>Price:</p>
                                                <h2>
                                                  ₹ {totalSeatPrice.toFixed(2)}
                                                </h2>
                                              </div>
                                            );
                                          })()}
                                        </div>
                                      </div>
                                      <div className="originBoxSelect">
                                        <label>Origin</label>
                                        <select
                                          class="form-select"
                                          value={selectedOrigin?.CityPointIndex}
                                          onChange={(e) =>
                                            setSelectedOrigin(
                                              origin[e.target.value - 1]
                                            )
                                          }
                                        >
                                          {origin.map((name, index) =>
                                            index === 0 ? (
                                              <option
                                                key={index}
                                                selected
                                                value={name?.CityPointIndex}
                                              >
                                                {name?.CityPointName}
                                              </option>
                                            ) : (
                                              <option
                                                key={index}
                                                value={name?.CityPointIndex}
                                              >
                                                {name?.CityPointName}
                                              </option>
                                            )
                                          )}
                                        </select>
                                      </div>

                                      <div className="originBoxSelect">
                                        <label>Destination</label>
                                        <select
                                          class="form-select"
                                          value={
                                            selectedDropPoint?.CityPointIndex
                                          }
                                          onChange={(e) =>
                                            setSelectedDropPoint(
                                              destination[e.target.value - 1]
                                            )
                                          }
                                        >
                                          {destination.map((name, index) =>
                                            index === 0 ? (
                                              <option
                                                key={index}
                                                selected
                                                value={name?.CityPointIndex}
                                              >
                                                {name?.CityPointName}
                                              </option>
                                            ) : (
                                              <option
                                                key={index}
                                                value={name?.CityPointIndex}
                                              >
                                                {name?.CityPointName}
                                              </option>
                                            )
                                          )}
                                        </select>
                                      </div>

                                      <div className="buttonLayoutBox">
                                        <button onClick={handleClose}>
                                          Close
                                        </button>
                                        <button onClick={handleContinue}>
                                          Continue
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div className="loadBusGif">
                                  <img src={busGif} alt="busgif" />
                                </div>
                              )}
                            </motion.div>
                          )}
                      </motion.div>
                    );
                  })
                ) : (
                  <div className="filteredNotFound">
                    <img src={busFilter} alt="filter image" />
                    <h1>Result not found</h1>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default BusResult;

// {
//   lowerArray?.Height === 2 ? (
//     <div>
//       <svg
//         onClick={(e) =>
//           addOrRemoveSeat(
//             e,
//             lowerArray?.[
//             index -
//             upperArray.length
//             ]
//           )
//         }
//         width="40"
//         height="29"
//         viewBox="0 0 60 30"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <rect
//           x="0.5"
//           y="0.5"
//           width="59"
//           height="29"
//           rx="3.5"
//           fill={
//             blockedSeatArray.includes(
//               lowerArray?.[
//               index -
//               upperArray.length
//               ]
//             )
//               ? "#21325d"
//               : lowerArray?.[
//                 index -
//                 upperArray.length
//               ]?.SeatStatus ===
//                 false
//                 ? "#A9A9A9"
//                 : "#fff"
//           }
//           stroke="#21325d"
//         ></rect>
//         <rect
//           x="56.5"
//           y="5.5"
//           width="3"
//           height="19"
//           rx="1.5"
//           fill="white"
//           stroke="#21325d"
//         ></rect>
//       </svg>
//     </div>
//   ) : (
//   <div>
//     <svg
//       onClick={(e) =>
//         addOrRemoveSeat(
//           e,
//           lowerArray?.[
//           index -
//           upperArray.length
//           ]
//         )
//       }
//       width="23"
//       height="23"
//       viewBox="0 0 31 31"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <path
//         d="M21.7568 5.58197H15.5946C15.0811 5.58197 12 5.58197 12 3.04098C12 1.0082 13.7117 0.5 14.5676 0.5H24.3243C29.6649 0.906557 30.5 5.41257 30.5 7.61475V23.8852C30.5 29.5 24.8378 30.5 23.8108 30.5H14.5676C13.027 30.5 12 30.4918 12 27.9508C12 25.918 13.7117 25 14.5676 25H20.2162C22 25 25 24.9016 25 22.8689V8.5C25 6.06066 22.955 5.58197 21.7568 5.58197Z"
//         fill={
//           blockedSeatArray.includes(
//             lowerArray?.[
//             index -
//             upperArray.length
//             ]
//           )
//             ? "#21325d"
//             : lowerArray?.[
//               index -
//               upperArray.length
//             ]?.SeatStatus ===
//               false
//               ? "#A9A9A9"
//               : "#fff"
//         }
//       ></path>
//       <rect
//         y="3"
//         width="25"
//         height="25"
//         rx="4"
//         fill={
//           blockedSeatArray.includes(
//             lowerArray?.[
//             index -
//             upperArray.length
//             ]
//           )
//             ? "#21325d"
//             : lowerArray?.[
//               index -
//               upperArray.length
//             ]?.SeatStatus ===
//               false
//               ? "#A9A9A9"
//               : "#fff"
//         }
//       ></rect>
//       <path
//         fill-rule="evenodd"
//         clip-rule="evenodd"
//         d="M12.6453 0.584801C13.2694 0.142591 14.0033 0 14.5 0H24.0192L24.0383 0.00144939C26.7974 0.210319 28.557 1.48384 29.613 3.00722C30.6547 4.50993 31 6.23503 31 7.38095V23.619C31 27.0066 29.3925 28.8849 27.6249 29.8885C25.8951 30.8706 24.0471 31 23.5 31H14.5C13.7143 31 12.9166 30.8758 12.3339 30.3023C11.7554 29.7329 11.5 28.8309 11.5 27.5556C11.5 26.4111 11.9958 25.6483 12.6453 25.188C13.2694 24.7458 14.0033 24.6032 14.5 24.6032H20C21.8074 24.6032 22.9511 24.4744 23.6378 24.1576C23.9623 24.0079 24.1634 23.8251 24.2909 23.6056C24.4219 23.3799 24.5 23.0722 24.5 22.6349V8.36508C24.5 7.37872 24.0285 6.78849 23.4249 6.42192C22.7947 6.03916 22.0173 5.90476 21.5 5.90476H15.4937C15.2321 5.90479 14.2825 5.90487 13.383 5.56442C12.9242 5.39078 12.4507 5.11854 12.0903 4.68726C11.7232 4.24785 11.5 3.6743 11.5 2.95238C11.5 1.80788 11.9958 1.04508 12.6453 0.584801ZM13.2297 1.38345C12.8376 1.66127 12.5 2.12863 12.5 2.95238C12.5 3.46062 12.6518 3.80969 12.8628 4.06224C13.0806 4.32292 13.3883 4.512 13.742 4.64589C14.4602 4.91773 15.2523 4.92063 15.5 4.92063H21.5C22.1493 4.92063 23.122 5.08148 23.9501 5.58443C24.8049 6.10357 25.5 6.98953 25.5 8.36508V22.6349C25.5 23.1818 25.4031 23.6737 25.1591 24.0938C24.9116 24.5202 24.5377 24.8294 24.0622 25.0487C23.1489 25.47 21.7926 25.5873 20 25.5873H14.5C14.1633 25.5873 13.6472 25.6907 13.2297 25.9866C12.8376 26.2644 12.5 26.7318 12.5 27.5556C12.5 28.7405 12.7446 29.3147 13.0411 29.6064C13.3334 29.8941 13.7857 30.0159 14.5 30.0159H23.5C23.9529 30.0159 25.6049 29.8992 27.1251 29.0361C28.6075 28.1945 30 26.6283 30 23.619V7.38095C30 6.3946 29.6952 4.87208 28.787 3.56183C27.8953 2.27557 26.4102 1.17316 23.9805 0.984127H14.5C14.1633 0.984127 13.6472 1.08757 13.2297 1.38345Z"
//         fill={
//           blockedSeatArray.includes(
//             lowerArray?.[
//             index -
//             upperArray.length
//             ]
//           )
//             ? "#fff"
//             : "#21325d"
//         }
//       ></path>
//       <path
//         fill-rule="evenodd"
//         clip-rule="evenodd"
//         d="M1.73348 3.71775C2.66649 3.13928 3.76564 2.95312 4.5 2.95312H12.5V3.93725H4.5C3.90103 3.93725 3.00018 4.09554 2.26652 4.55041C1.55974 4.98861 1 5.70162 1 6.88963V24.1119C0.999994 24.8094 1.12107 25.6617 1.64631 26.3337C2.15222 26.9809 3.11019 27.5563 5 27.5563H12.5V28.5404H5C2.88981 28.5404 1.59777 27.8857 0.853684 26.9337C0.128916 26.0065 -6.67546e-06 24.8905 2.59235e-10 24.1119V6.88963C2.59235e-10 5.32209 0.773597 4.31287 1.73348 3.71775Z"
//         fill="#21325d"
//       ></path>
//     </svg>
//   </div>
// )
// }

//                                                   </Box >
//                                                 );
//                                               }
//                                             })}
