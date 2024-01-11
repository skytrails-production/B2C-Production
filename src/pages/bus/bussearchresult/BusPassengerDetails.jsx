import React, { useEffect, useState } from "react";
// import { styled } from "@mui/material/styles";

import "./buspassengerdetail.css";
import BusSaleSummary from "./BusSaleSummary";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { apiURL } from "../../../Constants/constant";
// import { busSeatBlockAction } from "../../../Redux/busSearch/busSearchAction";
import { busSeatBlockAction } from "../../../Redux/busSearch/busSearchAction";
import dayjs from "dayjs";
// import busArrow from '../../../Images/busArrow.png'
import { motion } from "framer-motion";
// import { busSearchAction } from "../../../Redux/busSearch/busSearchAction";
import Divider from "@mui/material/Divider";
import InsideNavbar from "../../../UI/BigNavbar/InsideNavbar";
// import LoginForm from "../../../components/Login";
// import Countrypicker from "../../../layouts/Countrypicker";

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

const BusPassengerDetail = () => {

  const navigate = useNavigate();
  const reducerState = useSelector((state) => state);
  // console.log("..................", reducerState);
  const dispatch = useDispatch();
  const busFullData =
    reducerState?.getBusResult?.busResult?.data?.data?.BusSearchResult;
  // console.log(busFullData, "bus full data");
  const passengerLists = [];
  const [accordionExpanded, setAccordionExpanded] = useState(false);
  const [sub, setSub] = useState(false);
  const seatData = sessionStorage.getItem("seatData");
  const parsedSeatData = JSON.parse(seatData);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  // console.log(parsedSeatData, "parsed seat data");
  const passengerCount = parsedSeatData?.blockedSeatArray.length;
  const resultIndex = parsedSeatData?.resultIndex;
  const boardingPoint = parsedSeatData?.selectedOrigin;
  const droppingPoint = parsedSeatData?.selectedDropPoint;
  const authenticUser = reducerState?.logIn?.loginData?.status;

  console.log(boardingPoint, "boarding point")
  console.log(droppingPoint, "boarding point")
  // console.log(passengerCount);
  const passengerTemplate = {
    LeadPassenger: true,
    PassengerId: 0,
    Title: "Mr.",
    Address: "",
    Age: 22,
    Email: "",
    FirstName: "",
    Gender: 1,
    IdNumber: null,
    IdType: null,
    LastName: "",
    Phoneno: "",
  };
  // const handleAccordionChange = (index) => (event, isExpanded) => {
  //   setAccordionExpanded(isExpanded ? index : false);
  // };
  for (let i = 0; i < passengerCount; i++) {
    passengerLists.push({
      ...passengerTemplate,
      LeadPassenger: i === 0, // Set the first passenger as the lead passenger
    });
  }
  // const [passengerList, setPassengerList] = useState(passengerLists);
  const allPassenger = [passengerLists]
  const [passengerData, setPassengerData] = useState(allPassenger.flat());

  const handleServiceChange = (e, index) => {
    const { name, value } = e.target;
    const updatedPassenger = [...passengerData];
    updatedPassenger[index] = {
      ...updatedPassenger[index],
      [name]: value,

    };

    setPassengerData(updatedPassenger);
  };
  // console.log(passengerData);
  function validateEmail(email) {
    const regex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return regex.test(email);
  }
  function validatePhoneNumber(phoneNumber) {
    const regex = /^\d{10}$/;
    return regex.test(phoneNumber);
  }
  // function validate() {
  //   if (
  //     passengerData.filter(
  //       (item) =>
  //         item.FirstName === "" ||
  //         item.LastName === "" ||
  //         item.Address === "" ||
  //         !validateEmail(item.Email) ||
  //         !validatePhoneNumber(item.Phoneno)
  //     ).length > 0
  //   ) {
  //     return true;
  //   }
  // }
  function handleSeatBlock() {
    const payload = {
      Passenger: passengerData?.map((item, index) => {
        return {
          ...item,
          Seat: parsedSeatData?.blockedSeatArray[index],
          Email: apiURL.flightEmail,
          Phoneno: apiURL.phoneNo,
        };

      }),

      EndUserIp: reducerState?.ip?.ipData,
      ResultIndex: JSON.stringify(resultIndex),
      TraceId: busFullData?.TraceId,
      TokenId: reducerState?.ip?.tokenData,
      BoardingPointId: boardingPoint,
      DroppingPointId: droppingPoint,
    };
    // console.log(payload);
    dispatch(busSeatBlockAction(payload));
    console.log(payload, "bus passenger payload");
    sessionStorage.setItem("busPassName", JSON.stringify(passengerData));
    navigate("/BusReviewBooking");
  }

  const selectedBus = busFullData.BusResults.find(
    (bus) => bus.ResultIndex === resultIndex
  );
  // const cancellationPolicy = selectedBus?.CancellationPolicies;
  // console.log(selectedBus, "selectedBus")
  const [showBtn, setShowBtn] = useState(false);
  const departureDate = dayjs(selectedBus?.DepartureTime);
  const arrivalDate = dayjs(selectedBus?.ArrivalTime);

  // Format the dates
  // const departureFormattedDate = departureDate.format("DD MMM, YY");
  // const arrivalFormattedDate = arrivalDate.format("DD MMM, YY");





  const dateString = selectedBus?.DepartureTime;
  const date = new Date(dateString);
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  const formattedDate = date.toLocaleString("en-US", options);

  const [month, day, year, time, ampm] = formattedDate.split(" ");
  // const desiredFormat = `${day}${month}-${year} ${time} ${ampm}`;

  const dateString1 = selectedBus?.ArrivalTime;
  const date1 = new Date(dateString1);
  const options1 = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  const formattedDate1 = date1.toLocaleString("en-US", options1);
  const [month1, day1, year1, time1, ampm1] = formattedDate1.split(" ");
  // const desiredFormat1 = `${day1}${month1}-${year1} ${time1} ${ampm1}`;

  // here i am calculation the duration between departure and arrival time

  const departureTime = new Date(selectedBus.DepartureTime).getTime();
  const arrivalTime = new Date(selectedBus.ArrivalTime).getTime();
  const timeDifference = arrivalTime - departureTime;
  const hours = Math.floor(timeDifference / (1000 * 60 * 60));
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const duration = `${hours}hr ${minutes}min`;



  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])



  // here i am calculation the duration between departure and arrival time 



  // console.warn(allPassenger, "allPassenger")
  function validatePhoneNumber(phoneNumber) {
    // Define the regular expression pattern for a valid phone number
    var phonePattern = /^\d{10}$/;

    // Test the phone number against the pattern
    return phonePattern.test(phoneNumber);
  }
  function validateEmail(email) {
    // Define the regular expression pattern for a valid phone number
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Test the phone number against the pattern
    return emailRegex.test(email);
  }
  function validateName(name) {
    // Check if the name is not empty
    if (!name) {
      return false;
    }

    // Check if the name contains only letters
    if (!/^[A-Za-z]+$/.test(name)) {
      return false;
    }

    // If all checks pass, the name is considered valid
    return true;
  }
  async function filterValidation(item) {

    const result = await (!validatePhoneNumber(item.Phoneno) && !validateEmail(item.Email) && !filterValidation(item.FirstName) && !validateName(item.LastName) && item?.Address === "")
    const ph = await validateName(item.LastName)
    console.warn("Please enter", ph, result)
    return result
  }
  async function validtion() {
    // const res =await passengerData.filter(filterValidation)
    const res = await passengerData.filter((item) => (validatePhoneNumber(item.Phoneno) && validateEmail(item.Email) && filterValidation(item.FirstName) && validateName(item.LastName) && item?.Address !== ""))
    const result = res.length === passengerData.length ? true : false
    console.warn(res, result, res.length, passengerData.length, "filter result", passengerData)
    return result

  }
  async function result() {
    const vali = await validtion()
    if (vali) {

      await setShowBtn(true)
    }
    else {
      await setShowBtn(false)
    }

    console.warn("setShowBtn(true)", showBtn)
  }
  useEffect(() => {
    // const result = validtion()

    result()
    // console.warn(passengerData, "allpassengers")
  }, [passengerData])
  useEffect(() => {
    if (reducerState?.getBusResult?.busResult?.data?.data?.BusSearchResult?.Error?.ErrorCode !== 0 || reducerState?.getBusResult?.busResult?.data?.data?.BusSearchResult?.Error?.ErrorCode === undefined || sessionStorage.getItem("seatData") === undefined) {
      navigate("/busResult")
    }
  }, [])
  if (reducerState?.getBusResult?.busResult?.data?.data?.BusSearchResult?.Error?.ErrorCode !== 0 || reducerState?.getBusResult?.busResult?.data?.data?.BusSearchResult?.Error?.ErrorCode === undefined || sessionStorage.getItem("seatData") === undefined) {
    return (
      <>
      </>
    )
  }

  console.log(selectedBus, "selected bus")
  return (
    <>
      <div className="mainimgBusSearch">
        {/* <Navbar /> */}
        {/* <BigNavbar /> */}
        <InsideNavbar />
      </div>

      <div className="margin-pecentage">
        <div className="container-xxl ">
          <div className="row">
            <div className="col-lg-9 order-lg-1  order-md-4 order-sm-4 ">
              <motion.div
                variants={variants}
                initial="initial"
                whileInView="animate"
                className="row "
              >
                <div className="col-lg-12" style={{ marginTop: "-100px" }}>
                  <div className="singleBusSearchBox">
                    <div className="singleBusSearchBoxOne">
                      <span>{selectedBus?.BusType}</span>
                    </div>
                    <div className="anotherBusResult">
                      <div className="singleBusSearchBoxTwo">
                        <span>{busFullData?.Origin}</span>
                        <p>{dayjs(selectedBus?.DepartureTime).format("DD MMM, YY")}</p>
                        <p style={{ fontSize: "14px" }}>
                          {dayjs(selectedBus?.DepartureTime).format("h:mm A")}
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

                        <span>{selectedBus?.AvailableSeats} Seats Left</span>
                      </div>

                      <div className="singleBusSearchBoxFour">
                        <span>{busFullData?.Destination}</span>
                        <p>{dayjs(selectedBus.ArrivalTime).format("DD MMM, YY")}</p>
                        <p style={{ fontSize: "14px" }}>
                          {dayjs(selectedBus.ArrivalTime).format("h:mm A")}
                        </p>
                      </div>

                      <div className="singleBusSearchBoxSeven">
                        <p>
                          ₹ {selectedBus?.BusPrice?.PublishedPriceRoundedOff}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <motion.div variants={variants} className="col-lg-12 mt-3">
                  <div className="titlePickup">
                    <p></p>
                  </div>
                  <div className="pickUpBox">
                    <div>
                      <div className="pickuppara">
                        <p>PickUp Point</p>
                      </div>
                      <div>
                        <p>
                          {selectedBus?.BoardingPointsDetails &&
                            selectedBus.BoardingPointsDetails.length > 0 &&
                            selectedBus.BoardingPointsDetails[boardingPoint - 1]?.CityPointLocation}
                        </p>
                      </div>
                      <div>
                        <span>{dayjs(selectedBus?.DepartureTime).format("h:mm A")}</span>
                      </div>
                    </div>

                    <div>
                      <div className="pickuppara">
                        <p>Drop Point</p>
                      </div>
                      <div>
                        <p>
                          {selectedBus?.DroppingPointsDetails &&
                            selectedBus.DroppingPointsDetails.length > 0 &&
                            selectedBus.DroppingPointsDetails[droppingPoint - 1]
                              ?.CityPointLocation}
                        </p>
                      </div>
                      <div>
                        <span>{dayjs(selectedBus.ArrivalTime).format("h:mm A")}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={variants} className="col-lg-12 mt-3">
                  <div className="bookflightPassenger">
                    <div className="headingBookFlight">
                      <h3>Guest Details</h3>
                    </div>
                    {passengerCount > 0 &&
                      Array.from({ length: passengerCount }, (_, index) => (
                        <div>
                          <label className="roomIndexGuest mb-3">
                            Passenger {index + 1}
                          </label>

                          <div className="bookFlightPassInner">
                            <div className="row g-3 mb-3">
                              <div className="col-lg-3 col-md-3">
                                <div class="form-floating">
                                  <input
                                    name="FirstName"
                                    placeholder="Enter your name"
                                    className="form-control"
                                    value={passengerData.FirstName}
                                    onChange={(e) =>
                                      handleServiceChange(e, index)
                                    }
                                  />
                                  {sub && !validateName(passengerData[index].FirstName) && (
                                    <span className="error10">Enter your Name</span>
                                  )}
                                  <label for="floatingInput">First Name</label>
                                </div>
                              </div>
                              <div className="col-lg-3 col-md-3">
                                <div class="form-floating">
                                  <input
                                    name="LastName"
                                    className="form-control"
                                    placeholder="Enter your last name"
                                    value={passengerData.LastName}
                                    onChange={(e) =>
                                      handleServiceChange(e, index)
                                    }
                                  />
                                  {sub && !validateName(passengerData[index].LastName) && (
                                    <span className="error10">Enter Last Name</span>
                                  )}
                                  <label for="floatingInput">Last Name</label>
                                </div>
                              </div>
                              <div className="col-lg-3 col-md-3">
                                <div class="form-floating">
                                  <input
                                    name="Email"
                                    type="email"
                                    className="form-control"
                                    placeholder="Enter your email"
                                    value={passengerData[index].Email}
                                    onChange={(e) =>
                                      handleServiceChange(e, index)
                                    }
                                  />

                                  {sub && !validateEmail(passengerData[index].Email) &&
                                    <span className="error10">Enter a valid email</span>}
                                  <label for="floatingInput">Enter Email</label>
                                </div>
                              </div>

                              <div className="col-lg-3 col-md-3">
                                <div class="form-floating">
                                  <input
                                    name="Phoneno"
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter your Phoneno"
                                    value={passengerData.Phoneno}
                                    onChange={(e) =>
                                      handleServiceChange(e, index)
                                    }
                                  />
                                  {sub && !validatePhoneNumber(passengerData[index].Phoneno) &&
                                    <span className="error10">Enter a valid phone number</span>}

                                  <label for="floatingInput">
                                    Phone Number
                                  </label>
                                </div>
                              </div>
                              <div className="col-lg-12 col-md-12">
                                <div class="form-floating">
                                  <input
                                    name="Address"
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter your address"
                                    value={passengerData.Address}
                                    onChange={(e) =>
                                      handleServiceChange(e, index)
                                    }
                                  />
                                  {sub && passengerData[index].Address === "" && (
                                    <span className="error10">Enter Address</span>
                                  )}
                                  <label for="floatingInput">
                                    Enter Address
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </motion.div>
                {/* 
                                  {authenticUser !== 200 ? (
                                      <div className="d-flex justify-content-center mt-4">
                                          <Countrypicker />
                                      </div>
  
                                  ) :
  
                                      ( */}
                {!showBtn ? <div onClick={() => setSub(true)} className=" col-lg-12 btn-busPassenger">
                  <button className="notval">Proceed to Book</button>
                </div> :
                  <div className="col-lg-12 btn-busPassenger">
                    <button onClick={handleSeatBlock}>Proceed to Book</button>
                  </div>}
                {/* )
                                  } */}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="col-lg-3 mt-2 mb-md-4 mb-sm-4 order-lg-2  order-md-1 order-sm-1 "
            >
              <BusSaleSummary />
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
  // console.log(reducerState, "reducer state")

};

export default BusPassengerDetail;
