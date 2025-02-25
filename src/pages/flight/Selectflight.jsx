import React, { useState, useEffect } from "react";
// import { styled } from "@mui/material/styles";
import moment from "moment";
import { FiArrowRight } from "react-icons/fi";

import { useSelector } from "react-redux";

import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";

import "./selectflight.css";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
// import Paper from "@mui/material/Paper";
import { motion, AnimatePresence } from "framer-motion";
import { ImCancelCircle } from "react-icons/im";
// import Swal from "sweetalert2";
import dayjs from "dayjs";
// import hotelFilter from "../../images/hotelFilter.png"
import flightNoResult from "../../images/img/flightnoresult.jpg";
import { Skeleton } from "@mui/material";

import "./selectflight.css";
import fromTo from "../../images/fromTo.png";

import { useAnimation } from "framer-motion";

import NoResult from "../../components/NoFlightResult";
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

function NewItems({
  results,
  currentItems,
  selectedCategory,
  handleRadioChange,
}) {
  const [loader, setLoader] = useState(true);
  // console.log(results, "itemjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj");
  const [openModal, setOpenModal] = useState(false);
  const [openModal1, setOpenModal1] = useState(true);
  const [totalTravalTime, setTotaltravalTime] = useState("");

  const [sesstioResultIndex, setSesstioResultIndex] = useState([]);
  // console.log(sesstioResultIndex, "sesstioResultIndex")
  const reducerState = useSelector((state) => state);
  const [airlines, setAirlines] = useState([]);
  const [airports, setAirports] = useState([]);
  useEffect(() => {
    setAirlines(reducerState?.flightList?.flightDetails);
    setAirports(reducerState?.flightList?.aireportList);
  }, [
    reducerState?.flightList?.flightDetails,
    reducerState?.flightList?.aireportList,
  ]);

  const [viewDetailItem, setViewDetailItem] = useState([]);
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
  const arrivalPlace = results?.result?.[0]
    ? results?.result?.[0].Segments?.[0]?.[
        results?.result?.[0]?.Segments?.[0]?.length - 1
      ]?.Destination?.Airport?.CityName
    : null;

  // ///////////////////////filteredata///////////////////////////////

  // const segmentLength = results.result[0].Segments?.[0][0]?.length || results.result[0].flightDetails[0]?.length

  {
    results?.result?.map((item, index) => {
      const arrival = moment(
        item?.Segments?.[0]?.[item?.Segments?.[0]?.length - 1]?.Destination
          ?.ArrTime,
        "HHmm"
      ).format("hh:mm");
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

    const currentMin = Math.min(min, priceFromPublishedFare);

    return currentMin;
  }, Infinity);

  const [priceRangeValue, setPriceRangeValue] = useState(maxPrice + 5001);

  const handlePriceRangeChange = (event) => {
    setPriceRangeValue(event.target.value);
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
    const timeString = time?.toString().padStart(4, "0");

    // Extract hours and minutes
    const hours = parseInt(timeString?.substring(0, 2), 10);
    const minutes = parseInt(timeString?.substring(2), 10);

    // Calculate total hours
    const totalHours = hours + minutes / 60;
    return totalHours;
  }

  // const time = '0115'; // Time represented as a string
  // console.log(convertToHours(time));

  const maxtime = results?.result?.reduce((max, item) => {
    // const durationmax = convertToHoursAMD(item?.propFlightGrDetail?.flightProposal[1]?.ref);
    const tvoDepTime = item?.Segments?.[0]?.[0]?.Origin?.DepTime;
    const tvoArrTime =
      item?.Segments?.[0]?.length === 1
        ? item?.Segments?.[0]?.[0]?.Destination?.ArrTime
        : item?.Segments?.[0]?.[item?.Segments?.[0]?.length - 1]?.Destination
            ?.ArrTime;

    // console.log()

    const durationItemFormattedTime = tvoDepTime
      ? getDifferenceInHoursTVO(tvoDepTime, tvoArrTime)
      : convertToHoursAMD(item?.propFlightGrDetail?.flightProposal[1]?.ref);
    // ||
    //  convertMinutesToHoursAndMinutes(durationItem);
    // console.log(durationItemFormattedTime,"tvoDepTimetvoDepTime")
    // const durationmax =tvoDepTime?getDifferenceInHoursTVO(tvoDepTime,tvoArrTime):convertToHoursAMD( item?.propFlightGrDetail?.flightProposal[1]?.ref);
    const currentmax = Math.max(max, durationItemFormattedTime);
    // console.log(tvoDepTime,tvoArrTime,durationmax,durationItemFormattedTime,currentmax,"current maxxxxxxxxxxx")
    // console.log(    durationmax,"kkkkkkkk")

    return Math.ceil(currentmax);
  }, 0);

  const mintime = results?.result?.reduce((min, item) => {
    const tvoDepTime = item?.Segments?.[0]?.[0]?.Origin?.DepTime;
    const tvoArrTime =
      item?.Segments?.[0]?.length === 1
        ? item?.Segments?.[0]?.[0]?.Destination?.ArrTime
        : item?.Segments?.[0]?.[item?.Segments?.[0]?.length - 1]?.Destination
            ?.ArrTime;
    const durationmin = tvoDepTime
      ? getDifferenceInHoursTVO(tvoDepTime, tvoArrTime)
      : convertToHoursAMD(item?.propFlightGrDetail?.flightProposal[1]?.ref);
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

  const [timeduration, setTimeduration] = useState("0hr 00min");

  // console.log("timeduration", timeduration);
  const [layoverRangeValue, setLayoverRangeValue] = useState(maxtime || 24);
  const handleLayoverRangeChange = (event) => {
    setLayoverRangeValue(event.target.value);
  };
  // console.log(reducerState)
  useEffect(() => {
    setTimeduration(maxtime);
    setLayoverRangeValue(maxtime + 1);
  }, [maxtime]);
  const handledurationValueChange = (event) => {
    const newValue = parseInt(event.target.value);
    setTimeduration(newValue);
    // You can perform additional actions based on the new value of the slider
  };

  const controls = useAnimation();

  useEffect(() => {
    setPriceRangeValue(maxPrice + 5001);
  }, [maxPrice]);
  function convertTimeToHoursAndMinutes(time) {
    if (time) {
      const hours = parseInt(time.slice(0, 2));
      const minutes = parseInt(time.slice(2, 4));
      return `${hours} hours and ${minutes} minutes`;
    }
    return;
  }
  function convertTimeToHoursAndMinutesFlight(time) {
    if (time) {
      const hours = parseInt(time.slice(0, 2));
      const minutes = parseInt(time.slice(2, 4));
      return `${hours}h ${minutes}m`;
    }
    return;
  }
  function convertTimeToHoursAndMinutesAMDFilter(time) {
    if (time) {
      const hours = parseInt(time.slice(0, 2));
      const minutes = parseInt(time.slice(2, 4));
      return `${hours} hours and ${minutes} minutes`;
    }
    return;
  }
  // console.log(reducerState, "reduv")
  // console.log("sesstioResultIndex", sesstioResultIndex);

  const filteredDatanew =
    results?.result &&
    results?.result.filter((item) => {
      const durationItem = item?.propFlightGrDetail?.flightProposal[1]?.ref;

      const tvoDepTime = item?.Segments?.[0]?.[0]?.Origin?.DepTime;
      const tvoArrTime =
        item?.Segments?.[0]?.length === 1
          ? item?.Segments?.[0]?.[0]?.Destination?.ArrTime
          : item?.Segments?.[0]?.[item?.Segments?.[0]?.length - 1]?.Destination
              ?.ArrTime;
      const durationItemFormattedTime = tvoDepTime
        ? getDifferenceInHoursTVO(tvoDepTime, tvoArrTime)
        : convertToHoursAMD(item?.propFlightGrDetail?.flightProposal[1]?.ref);

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
        item?.flightDetails?.[0]?.flightInformation?.companyId
          ?.marketingCarrier;

      const totalamount =
        item?.Fare?.PublishedFare || item?.monetaryDetail?.[0]?.amount;

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
      const priceInRange =
        totalamount && priceRangeValue
          ? Number(totalamount) <= priceRangeValue
          : true;
      const layoverTime =
        durationItemFormattedTime && layoverRangeValue
          ? durationItemFormattedTime <= layoverRangeValue
          : true;

      return (
        categoryFilters.every((filter) => filter) && priceInRange && layoverTime
      );
    });

  // console.log("filteredDatanew", selectedCategory, filteredDatanew?.length, selectedCategory, "selectedCategory");

  // /////////////////////////////////////////////
  // console.log(reducerState, "reducer  state")

  function findAirlineByCode(code) {
    // console.log(airlines)
    if (airlines.length !== 0) {
      const data = airlines?.find((airline) => airline?.airlineCode === code);
      if (data?.airlineName) {
        return data?.airlineName;
      }
      return;
    }
    return;
  }
  function findAirportByCode(code) {
    // console.log(airlines)
    if (airports.length !== 0) {
      const data = airports?.find((airport) => airport?.AirportCode === code);

      if (data?.AirportCode) {
        return data?.name;
      }
      return;
    }
    return;
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

  function calculateTravelTime(
    dateOfArrival,
    timeOfArrival,
    dateOfDeparture,
    timeOfDeparture
  ) {
    if (dateOfArrival && timeOfArrival && dateOfDeparture && timeOfDeparture) {
      // console.log(dateOfArrival, timeOfArrival, dateOfDeparture, timeOfDeparture, "dateOfArrival, timeOfArrival, dateOfDeparture, timeOfDeparture")

      // Parse the arrival and departure datetime strings

      const arrivalDateTime = dayjs(
        `${dateOfArrival.slice(0, 2)}-${dateOfArrival.slice(
          2,
          4
        )}-${dateOfArrival.slice(4, 6)}T${timeOfArrival.slice(
          0,
          2
        )}:${timeOfArrival.slice(2, 4)}`
      );
      const departureDateTime = dayjs(
        `${dateOfDeparture.slice(0, 2)}-${dateOfDeparture.slice(
          2,
          4
        )}-${dateOfDeparture.slice(4, 6)}T${timeOfDeparture.slice(
          0,
          2
        )}:${timeOfDeparture.slice(2, 4)}`
      );

      // Calculate the difference in milliseconds
      const duration = arrivalDateTime.diff(departureDateTime);

      // Convert the duration to hours and minutes
      const durationHours = Math.floor(duration / (1000 * 60 * 60));
      const durationMinutes = Math.floor(
        (duration % (1000 * 60 * 60)) / (1000 * 60)
      );
      setTotaltravalTime(
        `${durationHours} hours and ${durationMinutes} minutes`
      );
      // console.log(`${durationHours} hours and ${durationMinutes} minutes`, "`${durationHours} hours and ${durationMinutes} minutes`")

      return `${durationHours} hours and ${durationMinutes} minutes`;
    }
    return;
  }
  useEffect(() => {
    if (sesstioResultIndex?.flightDetails) {
      const dateOfArrival =
        sesstioResultIndex?.flightDetails?.flightInformation?.productDateTime
          ?.dateOfArrival ||
        sesstioResultIndex?.flightDetails?.[
          sesstioResultIndex?.flightDetails?.length - 1
        ]?.flightInformation?.productDateTime?.dateOfArrival;
      const timeOfArrival =
        sesstioResultIndex?.flightDetails?.flightInformation?.productDateTime
          ?.timeOfArrival ||
        sesstioResultIndex?.flightDetails?.[
          sesstioResultIndex?.flightDetails?.length - 1
        ]?.flightInformation?.productDateTime?.timeOfArrival;
      const dateOfDeparture =
        sesstioResultIndex?.flightDetails?.flightInformation?.productDateTime
          ?.dateOfDeparture ||
        sesstioResultIndex?.flightDetails?.[0]?.flightInformation
          ?.productDateTime?.dateOfDeparture;
      const timeOfDeparture =
        sesstioResultIndex?.flightDetails?.flightInformation?.productDateTime
          ?.timeOfDeparture ||
        sesstioResultIndex?.flightDetails?.[0]?.flightInformation
          ?.productDateTime?.timeOfDeparture;
      // console.log(dateOfArrival, timeOfArrival, dateOfDeparture, timeOfDeparture,"dateOfArrival, timeOfArrival, dateOfDeparture, timeOfDeparture")
      calculateTravelTime(
        dateOfArrival,
        timeOfArrival,
        dateOfDeparture,
        timeOfDeparture
      );
    }
  }, [sesstioResultIndex]);
  useEffect(() => {
    // console.log(reducerState?.oneWay, "reducerState?.oneWay?.isLoadingmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm")
    if (reducerState?.oneWay?.isLoading) {
      setLoader(true);
    } else {
      setLoader(false);
    }
  }, [reducerState?.oneWay]);

  function handleaViewDetail(item) {
    setSesstioResultIndex(item);
    // console.log(item,"itemmmmmmm");
    setOpenModal(true);
    setOpenModal1(true);
  }
  function convertMinutes() {
    // Calculate hours and remaining minutes

    const totalDuration = sesstioResultIndex?.Segments?.[0]?.reduce(
      (accumulator, segment) => {
        return Number(accumulator) + Number(segment.Duration);
      },
      0
    );
    let hours = Math.floor(totalDuration / 60);
    let remainingMinutes = totalDuration % 60;
    // console.log(`${hours} hour(s) and ${remainingMinutes} minute(s)`)

    return ` ${hours} h ${remainingMinutes} m`;
  }

  const [filterdatalength, setFilterDatalength] = useState(1);
  useEffect(() => {
    // console.log(filteredDatanew !== undefined, "check")
    if (filteredDatanew !== undefined) {
      setFilterDatalength(filteredDatanew.length);

      // console.log(filteredDatanew.length, "filteredDatanew")
    }
  }, [filteredDatanew?.length]);
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
      return formattedDescription;
    } else {
      renderDescription = null;
      return null;
    }
  }
  // console.log(sesstioResultIndex, sesstioResultIndex?.Segments?.[0]?.[sesstioResultIndex?.Segments?.[0]?.length - 1]?.Destination?.ArrTime, "sesstioResultIndex")
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 600);
  const [isFilterOpen, setIsFilterOpen] = useState(989 < window.innerWidth);

  useEffect(() => {
    const handleResize = () => setIsFilterOpen(989 < window.innerWidth);
    // console.log(window.innerWidth , window.innerWidth< 600)

    // Add the resize event listener
    window.addEventListener("resize", handleResize);
    // console.log(window.innerWidth ,"window.innerWidth ")

    // Clean up the event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, [window.innerWidth]);
  // useEffect(() => {
  //   console.log(reducerState)
  // }, []);
  const [resultsAvailable, setResultsAvailable] = useState(false);

  useEffect(() => {
    if (!loader) {
      const timer = setTimeout(() => {
        setResultsAvailable(true);
        // console.log("resuable");
      }, 300); // 3 milliseconds

      // Cleanup the timer
      return () => clearTimeout(timer);
    } else {
      setResultsAvailable(false);
    }
  }, [loader]);

  return (
    <>
      {/* {(!resultsAvailable) &&<FlightProgressBar duration={10000} resultsAvailable={!loader} />} */}
      {reducerState?.oneWay?.isError && <NoResult />}
      {!reducerState?.oneWay?.isError && (
        <div
          className="d-flex flex-column flex-lg-row "
          style={{ margin: "40px", gap: "14px" }}
        >
          <div className="col col-lg-3">
            {!loader &&
            filteredDatanew &&
            !reducerState?.oneWay?.isLoadingFilter ? (
              <div className="container filterpart-1">
                <div className="filter-new-data">
                  <div
                    onClick={() => setIsFilterOpen((pre) => !pre)}
                    className="filter-name"
                  >
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
                        value="All"
                        name="test"
                        checked={selectedCategory.includes("test:All")}
                        onClick={() => {
                          setPriceRangeValue(maxPrice);
                          setLayoverRangeValue(maxFormattedTime);
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

                {isFilterOpen && (
                  <>
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
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
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
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <h2 className="select-filter-heading">Layover</h2>
                        <span className="slider-value-new" id="tooltip">
                          {" "}
                          {layoverRangeValue}
                          {"h"}
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
                            {mintime}
                            {"h"}
                          </span>
                          <span className="slider-value-new">
                            {""}
                            {maxtime}
                            {"h"}
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
                            checked={selectedCategory.includes(
                              "timeDepart:after6PM"
                            )}
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
                                `${
                                  item?.ValidatingAirline ||
                                  item?.flightDetails?.flightInformation
                                    ?.companyId?.marketingCarrier ||
                                  item?.flightDetails?.[0]?.flightInformation
                                    ?.companyId?.marketingCarrier
                                }`
                            )
                          ),
                        ].map((airline, index) => (
                          <label
                            key={index}
                            className="checkbox-options-new  ps-0 "
                          >
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
                  </>
                )}
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
                          setLayoverRangeValue(maxFormattedTime);
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
              filterdatalength > 0 ? (
                filteredDatanew.map((item, index) => {
                  {
                    /* console.log(item, "vitem"); */
                  }
                  const nextFlight = item?.Segments?.[0];
                  let layoverHours = 0;
                  let layoverMinutes = 0;
                  let layoverDuration = 0;

                  if (nextFlight) {
                    // console.log(item?.Segments?.[0]?.[0]?.Origin?.DepTime, item?.Segments?.[0]?.[item?.Segments?.[0]?.length - 1]?.Destination
                    //   ?.ArrTime)
                    const arrivalTime = dayjs(
                      item?.Segments?.[0]?.[0]?.Origin?.DepTime
                    );
                    const departureTime = dayjs(
                      item?.Segments?.[0]?.[item?.Segments?.[0]?.length - 1]
                        ?.Destination?.ArrTime
                    );
                    layoverDuration = departureTime.diff(
                      arrivalTime,
                      "minutes"
                    ); // Calculate difference in minutes
                    layoverHours = Math.floor(layoverDuration / 60); // Extract hours
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
                          src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/${
                            item?.ValidatingAirline ||
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
                              findAirlineByCode(
                                item?.flightDetails?.flightInformation
                                  ?.companyId?.marketingCarrier ||
                                  item?.flightDetails[0]?.flightInformation
                                    ?.companyId?.marketingCarrier
                              )}
                          </p>
                          <p className="flight-number-new text-center text-sm-start">
                            {item.AirlineCode +
                              item?.Segments?.[0][0]?.Airline.FlightNumber ||
                              item?.flightDetails?.flightInformation?.companyId
                                ?.marketingCarrier +
                                item?.flightDetails?.flightInformation
                                  ?.flightOrtrainNumber ||
                              item?.flightDetails[0]?.flightInformation
                                ?.companyId?.marketingCarrier +
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
                          gap: "15px",
                        }}
                      >
                        <div>
                          <p style={{ textAlign: "center" }}>
                            {item?.Segments?.[0][0]?.Origin?.Airport
                              ?.CityName || departurePlace}
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
                        <div>
                          <div className="flight-time-new">
                            {/* { "item?.flightDetails?.[0]?.flightInformation?.productDateTime?.dateOfArrival"} */}
                            {item?.Segments &&
                              item?.Segments[0] &&
                              `${layoverHours}h ${layoverMinutes}m`}

                            {item?.propFlightGrDetail &&
                              convertTimeToHoursAndMinutesFlight(
                                item?.propFlightGrDetail?.flightProposal?.[1]
                                  ?.ref
                              )}
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
                          <div className="text-center fs-6 fw-medium">
                            {item?.Segments?.[0]?.length == 1 ||
                            item?.flightDetails?.flightInformation
                              ? "non-stop"
                              : `${
                                  item?.Segments?.[0]?.length - 1 ||
                                  item?.flightDetails?.length - 1
                                } stops`}
                          </div>
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
                                  item?.Segments?.[0][
                                    item?.Segments[0]?.length - 1
                                  ]?.Destination?.ArrTime
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
                          </p>
                        </div>
                      </div>

                      <div>
                        <p className="flight-date-new text-center">
                          ₹
                          {/* {Number(
                            item?.Fare?.BaseFare ||
                              
                              item?.paxFareDetail?.totalFareAmount
                          ).toFixed(0)} */}
                          {Number(
                            item?.Fare?.BaseFare ||
                              Number(item?.monetaryDetail?.[0]?.amount) -
                                Number(item?.monetaryDetail?.[1]?.amount)
                          ).toFixed(0)}
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
              ) : (
                <div className="filteredNotFound">
                  <img src={flightNoResult} alt="filter" />
                  <h1>Too many filters applied!</h1>
                  <div>
                    <label className="sidebar-label-container ps-0">
                      <input
                        type="checkbox"
                        onChange={handleRadioChange}
                        onClick={() => {
                          setPriceRangeValue(maxPrice);
                          setLayoverRangeValue(maxFormattedTime);
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
              )
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
                            <div
                              style={{ height: "80px", width: "80px" }}
                            ></div>
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
                <div className="modalContainerInner">
                  <div className="modalSearchResHeader">
                    <div className="modalSearchResHeaderDiv">
                      <div>
                        <AnimatePresence>
                          {/* {
                          openModal1 && */}
                          <motion.h1
                            exit={{ x: -50, transition: { duration: 3 } }}
                          >
                            {" "}
                            Flight Detail
                          </motion.h1>
                          {/* } */}
                        </AnimatePresence>
                        <div className="modalheaderDiverder"></div>
                      </div>
                    </div>
                    <div
                      className="searchResHeaderCross"
                      onClick={() => setOpenModal(false)}
                    >
                      <ImCancelCircle />
                    </div>
                  </div>
                  {sesstioResultIndex?.monetaryDetail && (
                    <div className="searchResModalBody">
                      <div className="searchResModalBodyInfo">
                        <div className="searchResModalBodyRow searchResModalBodyRowFont1">
                          <div>
                            {
                              reducerState?.searchFlight?.flightDetails?.from
                                ?.name
                            }
                          </div>
                          {/* <FaArrowRight /> */}
                          <FiArrowRight style={{ margin: "5px" }} />{" "}
                          <div>
                            {
                              reducerState?.searchFlight?.flightDetails?.to
                                ?.name
                            }
                          </div>
                        </div>
                        <div className="searchResModalBodyRow searchResModalBodyRowFont2">
                          <div>
                            {dayjs(
                              reducerState?.searchFlight?.flightDetails
                                ?.departureDate
                            ).format("ddd, D MMM")}
                          </div>
                          <div>
                            {sesstioResultIndex?.flightDetails
                              ?.flightInformation
                              ? "• Non Stop"
                              : `• ${
                                  sesstioResultIndex?.flightDetails?.length - 1
                                } stops`}
                          </div>
                          <div>
                            •
                            {convertTimeToHoursAndMinutes(
                              sesstioResultIndex?.propFlightGrDetail
                                ?.flightProposal?.[1]?.ref
                            )}
                          </div>
                        </div>
                        <div
                          style={{
                            color: "#e73c34",
                            fontSize: "12px",
                            fontWeight: "600",
                          }}
                        >
                          {refundText(
                            sesstioResultIndex?.fare?.[0]?.pricingMessage
                              ?.description ||
                              sesstioResultIndex?.fare?.[0]?.pricingMessage
                                ?.description
                          )}
                        </div>
                      </div>
                      <div className="searchResModalBodyMap">
                        {sesstioResultIndex?.flightDetails
                          ?.flightInformation ? (
                          <div className="searchResModalBodyMapItemCon">
                            <div className="bookcenteredBox">
                              <div>
                                <img
                                  src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/${sesstioResultIndex?.flightDetails?.flightInformation?.companyId?.marketingCarrier}.png`}
                                />{" "}
                              </div>
                              <span>
                                {findAirlineByCode(
                                  sesstioResultIndex?.flightDetails
                                    ?.flightInformation?.companyId
                                    ?.marketingCarrier
                                )}
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
                                  <img
                                    className="searchFlightFromTo d-none d-sm-block"
                                    src={fromTo}
                                    alt="icon"
                                  />
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
                                      {findAirportByCode(
                                        sesstioResultIndex?.flightDetails
                                          ?.flightInformation?.location[0]
                                          ?.locationId
                                      )}
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
                                        findAirportByCode(
                                          sesstioResultIndex?.flightDetails
                                            ?.flightInformation?.location[1]
                                            ?.locationId
                                        )
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
                                      ? sesstioResultIndex?.baggage
                                          ?.freeBagAllownceInfo?.baggageDetails
                                          ?.freeAllowance * 23
                                      : Number(
                                          sesstioResultIndex?.baggage
                                            ?.freeBagAllownceInfo
                                            ?.baggageDetails?.freeAllowance
                                        ) === 0 ||
                                        sesstioResultIndex?.baggage
                                          ?.freeBagAllownceInfo?.baggageDetails
                                          ?.freeAllowance === "0"
                                      ? "No baggage"
                                      : sesstioResultIndex?.baggage
                                          ?.freeBagAllownceInfo?.baggageDetails
                                          ?.freeAllowance}
                                    {sesstioResultIndex?.baggage
                                      ?.freeBagAllownceInfo?.baggageDetails
                                      ?.quantityCode === "N"
                                      ? sesstioResultIndex?.baggage
                                          ?.freeBagAllownceInfo?.baggageDetails
                                          ?.unitQualifier === "K"
                                        ? "KG"
                                        : "LB"
                                      : Number(
                                          sesstioResultIndex?.baggage
                                            ?.freeBagAllownceInfo
                                            ?.baggageDetails?.freeAllowance
                                        ) !== 0 ||
                                        sesstioResultIndex?.baggage
                                          ?.freeBagAllownceInfo?.baggageDetails
                                          ?.freeAllowance !== "0"
                                      ? "KG"
                                      : ""}
                                    {/* {item?.Baggage?.split(" ")[0]} */}
                                  </span>
                                </div>
                                <div>
                                  <p>Cabin</p>
                                  <span>7 KG</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          sesstioResultIndex?.flightDetails?.map(
                            (item, index) => {
                              let layover;
                              if (
                                index <
                                sesstioResultIndex?.flightDetails?.length - 1
                              ) {
                                const prevDateOfArrival =
                                  sesstioResultIndex?.flightDetails?.[index]
                                    ?.flightInformation?.productDateTime
                                    ?.dateOfArrival;
                                const nextDateOfDeparture =
                                  sesstioResultIndex?.flightDetails?.[index + 1]
                                    ?.flightInformation?.productDateTime
                                    ?.dateOfDeparture;
                                const prevTimeOfArrival =
                                  sesstioResultIndex?.flightDetails?.[index]
                                    ?.flightInformation?.productDateTime
                                    ?.timeOfArrival;
                                const nextTimeOfDeparture =
                                  sesstioResultIndex?.flightDetails?.[index + 1]
                                    ?.flightInformation?.productDateTime
                                    ?.timeOfDeparture;

                                function calculateLayoverTime(
                                  prevDateOfArrival,
                                  prevTimeOfArrival,
                                  nextDateOfDeparture,
                                  nextTimeOfDeparture
                                ) {
                                  // Parse the previous arrival datetime
                                  const prevArrivalDateTime = new Date(
                                    `20${prevDateOfArrival.slice(
                                      4,
                                      6
                                    )}-${prevDateOfArrival.slice(
                                      2,
                                      4
                                    )}-${prevDateOfArrival.slice(
                                      0,
                                      2
                                    )}T${prevTimeOfArrival.slice(
                                      0,
                                      2
                                    )}:${prevTimeOfArrival.slice(2, 4)}:00`
                                  );

                                  // Parse the next departure datetime
                                  const nextDepartureDateTime = new Date(
                                    `20${nextDateOfDeparture.slice(
                                      4,
                                      6
                                    )}-${nextDateOfDeparture.slice(
                                      2,
                                      4
                                    )}-${nextDateOfDeparture.slice(
                                      0,
                                      2
                                    )}T${nextTimeOfDeparture.slice(
                                      0,
                                      2
                                    )}:${nextTimeOfDeparture.slice(2, 4)}:00`
                                  );

                                  // Calculate the difference in milliseconds
                                  const layoverDuration =
                                    nextDepartureDateTime - prevArrivalDateTime;

                                  // Convert the duration to total minutes
                                  const totalMinutes = Math.floor(
                                    layoverDuration / (1000 * 60)
                                  );

                                  // Calculate the hours and minutes from total minutes
                                  const layoverHours = Math.floor(
                                    totalMinutes / 60
                                  );
                                  const layoverMinutes = totalMinutes % 60;

                                  return `${layoverHours} hours and ${layoverMinutes} minutes`;
                                }
                                layover = calculateLayoverTime(
                                  prevDateOfArrival,
                                  prevTimeOfArrival,
                                  nextDateOfDeparture,
                                  nextTimeOfDeparture
                                );
                              }

                              return (
                                // <>hii</>
                                <div className="searchResModalBodyMapItem">
                                  <div className="searchResModalBodyMapItemCon">
                                    <div className="bookcenteredBox">
                                      <div>
                                        <img
                                          src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/${sesstioResultIndex?.flightDetails[index]?.flightInformation?.companyId?.marketingCarrier}.png`}
                                        />{" "}
                                      </div>
                                      <span>
                                        {findAirlineByCode(
                                          sesstioResultIndex?.flightDetails[
                                            index
                                          ]?.flightInformation?.companyId
                                            ?.marketingCarrier
                                        )}
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
                                                ?.productDateTime
                                                ?.timeOfDeparture
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
                                          <img
                                            className="searchFlightFromTo d-none d-sm-block"
                                            src={fromTo}
                                            alt="icon"
                                          />
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
                                              {findAirportByCode(
                                                sesstioResultIndex
                                                  ?.flightDetails[index]
                                                  ?.flightInformation
                                                  ?.location[0]?.locationId
                                              )}
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
                                              {findAirportByCode(
                                                sesstioResultIndex
                                                  ?.flightDetails[index]
                                                  ?.flightInformation
                                                  ?.location[1]?.locationId
                                              )}
                                              {", "}
                                              Terminal-
                                              {
                                                sesstioResultIndex
                                                  ?.flightDetails[index]
                                                  ?.flightInformation
                                                  ?.location[1]?.terminal
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
                                              ?.freeBagAllownceInfo
                                              ?.baggageDetails?.quantityCode ===
                                            "N"
                                              ? sesstioResultIndex?.baggage
                                                  ?.freeBagAllownceInfo
                                                  ?.baggageDetails
                                                  ?.freeAllowance * 23
                                              : Number(
                                                  sesstioResultIndex?.baggage
                                                    ?.freeBagAllownceInfo
                                                    ?.baggageDetails
                                                    ?.freeAllowance
                                                ) === 0 ||
                                                sesstioResultIndex?.baggage
                                                  ?.freeBagAllownceInfo
                                                  ?.baggageDetails
                                                  ?.freeAllowance === "0"
                                              ? "No baggage"
                                              : sesstioResultIndex?.baggage
                                                  ?.freeBagAllownceInfo
                                                  ?.baggageDetails
                                                  ?.freeAllowance}
                                            {sesstioResultIndex?.baggage
                                              ?.freeBagAllownceInfo
                                              ?.baggageDetails?.quantityCode ===
                                            "N"
                                              ? sesstioResultIndex?.baggage
                                                  ?.freeBagAllownceInfo
                                                  ?.baggageDetails
                                                  ?.unitQualifier === "K"
                                                ? "KG"
                                                : "LB"
                                              : Number(
                                                  sesstioResultIndex?.baggage
                                                    ?.freeBagAllownceInfo
                                                    ?.baggageDetails
                                                    ?.freeAllowance
                                                ) !== 0 ||
                                                sesstioResultIndex?.baggage
                                                  ?.freeBagAllownceInfo
                                                  ?.baggageDetails
                                                  ?.freeAllowance !== "0"
                                              ? "KG"
                                              : ""}
                                            {/* {item?.Baggage?.split(" ")[0]} */}
                                          </span>
                                        </div>
                                        <div>
                                          <p>Cabin</p>
                                          <span>7 KG</span>
                                        </div>
                                      </div>
                                    </div>
                                    <div></div>
                                  </div>

                                  {index <
                                    sesstioResultIndex?.flightDetails?.length -
                                      1 && (
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
                  )}
                  {sesstioResultIndex?.AirlineCode && (
                    <div className="searchResModalBody">
                      <div className="searchResModalBodyInfo">
                        <div className="searchResModalBodyRow searchResModalBodyRowFont1">
                          <div>
                            {
                              reducerState?.searchFlight?.flightDetails?.from
                                ?.name
                            }
                          </div>
                          {/* <FaArrowRight /> */}
                          <FiArrowRight style={{ margin: "5px" }} />{" "}
                          <div>
                            {
                              reducerState?.searchFlight?.flightDetails?.to
                                ?.name
                            }
                          </div>
                        </div>

                        <div className="bookaboveBox">
                          <div>
                            <div className="aboveSpan">
                              <span className="aboveSOne">
                                {dayjs(
                                  reducerState?.searchFlight?.flightDetails
                                    ?.departureDate
                                ).format("ddd, D MMM")}
                              </span>
                              {/* <span>Non Stop {duration}</span> */}
                              <span>
                                {" "}
                                {sesstioResultIndex?.Segments[0].length > 1
                                  ? `${
                                      sesstioResultIndex?.Segments[0].length - 1
                                    } stop via ${
                                      sesstioResultIndex?.Segments[0][0]
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
                        {sesstioResultIndex?.Segments[0]?.map((item, index) => {
                          let layover;
                          if (
                            index <
                            sesstioResultIndex?.flightDetails?.length - 1
                          ) {
                            const prevDateOfArrival =
                              sesstioResultIndex?.flightDetails?.[index]
                                ?.flightInformation?.productDateTime
                                ?.dateOfArrival;
                            const nextDateOfDeparture =
                              sesstioResultIndex?.flightDetails?.[index + 1]
                                ?.flightInformation?.productDateTime
                                ?.dateOfDeparture;
                            const prevTimeOfArrival =
                              sesstioResultIndex?.flightDetails?.[index]
                                ?.flightInformation?.productDateTime
                                ?.timeOfArrival;
                            const nextTimeOfDeparture =
                              sesstioResultIndex?.flightDetails?.[index + 1]
                                ?.flightInformation?.productDateTime
                                ?.timeOfDeparture;

                            function calculateLayoverTime(
                              prevDateOfArrival,
                              prevTimeOfArrival,
                              nextDateOfDeparture,
                              nextTimeOfDeparture
                            ) {
                              // Parse the previous arrival datetime
                              const prevArrivalDateTime = new Date(
                                `20${prevDateOfArrival.slice(
                                  4,
                                  6
                                )}-${prevDateOfArrival.slice(
                                  2,
                                  4
                                )}-${prevDateOfArrival.slice(
                                  0,
                                  2
                                )}T${prevTimeOfArrival.slice(
                                  0,
                                  2
                                )}:${prevTimeOfArrival.slice(2, 4)}:00`
                              );

                              // Parse the next departure datetime
                              const nextDepartureDateTime = new Date(
                                `20${nextDateOfDeparture.slice(
                                  4,
                                  6
                                )}-${nextDateOfDeparture.slice(
                                  2,
                                  4
                                )}-${nextDateOfDeparture.slice(
                                  0,
                                  2
                                )}T${nextTimeOfDeparture.slice(
                                  0,
                                  2
                                )}:${nextTimeOfDeparture.slice(2, 4)}:00`
                              );

                              // Calculate the difference in milliseconds
                              const layoverDuration =
                                nextDepartureDateTime - prevArrivalDateTime;

                              // Convert the duration to total minutes
                              const totalMinutes = Math.floor(
                                layoverDuration / (1000 * 60)
                              );

                              // Calculate the hours and minutes from total minutes
                              const layoverHours = Math.floor(
                                totalMinutes / 60
                              );
                              const layoverMinutes = totalMinutes % 60;

                              return `${layoverHours} hours and ${layoverMinutes} minutes`;
                            }
                            layover = calculateLayoverTime(
                              prevDateOfArrival,
                              prevTimeOfArrival,
                              nextDateOfDeparture,
                              nextTimeOfDeparture
                            );
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
                            layoverHours = Math.floor(layoverDuration / 60); // Extract hours
                            layoverMinutes = layoverDuration % 60;
                          }
                          return (
                            // <>hii</>
                            <div className="searchResModalBodyMapItem">
                              <div className="searchResModalBodyMapItemCon">
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
                                      <img
                                        className="searchFlightFromTo d-none d-sm-block"
                                        src={fromTo}
                                        alt="icon"
                                      />
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
                                <div></div>
                              </div>

                              {layoverDuration !== 0 && (
                                <div className="flightLayoverOuter">
                                  <div className="flightLayover">
                                    {/* <p className="text-bold">
                                        Layover Time: {layover}
                                      </p> */}
                                    <p className="text-bold">
                                      Layover Time:{" "}
                                      {layoverHours !== 0 &&
                                        `${layoverHours} hours`}{" "}
                                      {layoverMinutes !== 0 &&
                                        `${layoverMinutes} minutes`}
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <div className="modalSelectFilghtFooter">
                    <div>
                      <div style={{ fontSize: "24px", fontWeight: "700" }}>
                        ₹
                        {Number(
                          sesstioResultIndex?.monetaryDetail?.[0]?.amount
                        ) -
                          Number(
                            sesstioResultIndex?.monetaryDetail?.[1]?.amount
                          ) || sesstioResultIndex?.Fare?.BaseFare}
                      </div>
                      <div style={{ fontSize: "12px", fontWeight: "400" }}>
                        FOR 1 ADULT
                      </div>
                    </div>
                    <div
                      className="modalSearchflightBtn"
                      style={{
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
                        fontSize: "18px",
                      }}
                      onClick={() => {
                        handleIndexId(sesstioResultIndex);
                      }}
                    >
                      Book
                    </div>
                  </div>
                </div>
              </motion.div>
            </Modal>
          </AnimatePresence>
        </div>
      )}
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

  return (
    <>
      <NewItems
        results={newResultsCombined}
        currentItems={currentItems}
        selectedCategory={selectedCategory}
        handelClearOne={handelClearOne}
        handleRadioChange={handleRadioChange}
      />
    </>
  );
}
