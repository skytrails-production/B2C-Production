import * as React from "react";
import moment from "moment";
import { useState, useRef, useCallback } from "react";
import {
  Grid,
  Box,
  Typography,
  Button,
  Accordion,
  AccordionDetails,
  AccordionSummary,

} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import StarIcon from "@mui/icons-material/Star";
import "./review.css";
import { useDispatch, useSelector, useReducer } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PassengersAction } from "../../../Redux/Passengers/passenger";
import { apiURL } from "../../../Constants/constant";
import { useEffect } from "react";
import HotelLoading from "../hotelLoading/HotelLoading";
import hotelNotFound from "../../../images/hotelNotFound.jpg"
import chevrondown from "../../../images/chevrondown.svg"
// import loginGif from "../../images/loginGif.gif";
// import Login from "../../components/Login";
import loginGif from "../../../images/loginGif.gif"
import Login from "../../../components/Login"
import Modal from "@mui/material/Modal";
import { motion } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import {validateEmail,validateName,validatePhoneNumber,validatePAN} from "../../../utility/validationFunctions"

const styleLoader = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "transparent",
  display: "flex",
  justifyContent: "center",
};

const Flightdetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const reducerState = useSelector((state) => state);
  const authenticUser = reducerState?.logIn?.loginData?.status;
  // const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const noOfRooms =
    reducerState?.hotelSearchResult?.ticketData?.data?.data?.HotelSearchResult
      ?.RoomGuests;
  let bookingStatus =
    reducerState?.hotelSearchResult?.bookRoom?.BookResult?.Status || false;
  const HotelIndex = sessionStorage.getItem("HotelIndex");
  // console.log(noOfRooms, "noOfRooms");
  const ResultIndex = sessionStorage.getItem("ResultIndex");
  const HotelCode = sessionStorage.getItem("HotelCode");
  // console.log(bookingStatus);
  const [bookingSuccess, setBookingSuccess] = useState(bookingStatus);
  const [passengerData, setPassengerData] = useState([]);
  const [sub, setSub] = useState(false);
  const [sub1, setSub1] = useState(false);
  const [sub3, setSub3] = useState(false);
  const [validationRes, setValidationRes] = useState(false);
  // console.warn(passengerData, "passengerdata>>>>>>.")

  const Imgresult =
    reducerState?.hotelSearchResult?.ticketData?.data?.data?.HotelSearchResult?.HotelResults?.[0]?.HotelPicture;
  // console.log("Imgresult", Imgresult);





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
  useState(() => {
    // console.log("*******")
  }, [sub3])
  useEffect(() => {
    if (bookingStatus == 1) {
      setBookingSuccess(false);
      navigate("/Guestdetail");
    }
  }, [bookingStatus]);

  useEffect(() => {
    //  console.log(handleSettingPassengerArr(noOfRooms))
    const allPassengerData = handleSettingPassengerArr(noOfRooms);
    // console.log("allPassengerData", allPassengerData);
    setPassengerData(allPassengerData);
    // console.log(passengerData, "passengerDataUseEffect");
  }, []);
  // console.warn(passengerData, "passengerData")

  const handleSettingPassengerArr = (roomCombination) => {
    const passengerData = [];
    const adultTempelate = {
      Title: "mr",
      FirstName: "",
      MiddleName: null,
      LastName: "",
      Phoneno: "",
      Email: "",
      PaxType: "",
      LeadPassenger: Boolean(),
      Age: "",
      PassportNo: null,
      PassportIssueDate: "0001-01-01T00: 00: 00",
      PassportExpDate: "0001-01-01T00: 00: 00",
      PAN: "",
      roomIndex: "",
    };

    const childTempelate = {
      Title: "mr",
      FirstName: "",
      MiddleName: null,
      LastName: "",
      Phoneno: null,
      Email: null,
      PaxType: "",
      LeadPassenger: Boolean(),
      Age: "",
      PassportNo: null,
      PassportIssueDate: "0001-01-01T00: 00: 00",
      PassportExpDate: "0001-01-01T00: 00: 00",
      PAN: "",
      roomIndex: "",
    };
    // console.log(roomCombination);
    roomCombination.map((item, indexRoom) => {
      const adultCount = item?.NoOfAdults;
      const childCount = item?.NoOfChild;
      if (adultCount > 0) {
        Array.from({ length: adultCount }, (value, index) => {
          if (index == 0) {
            passengerData.push({
              ...adultTempelate,
              roomIndex: indexRoom,
              PaxType: 1,
              adultIndex: index,
              LeadPassenger: true,
            });
          } else {
            passengerData.push({
              ...adultTempelate,
              roomIndex: indexRoom,
              PaxType: 1,
              adultIndex: index,
              LeadPassenger: false,
            });
          }
        });
      }
      if (childCount > 0) {
        Array.from({ length: childCount }, (value, index) => {
          passengerData.push({
            ...childTempelate,
            roomIndex: indexRoom,
            Age: item?.ChildAge[index],
            PaxType: 2,
            childIndex: index,
            LeadPassenger: false,
          });
        });
      }
    });

    return passengerData;
  };

  const emailRef = useRef();
  const phoneRef = useRef();
  const [emailVal, setEmail] = useState(false);
  const [contactVal, setContact] = useState(false);

  const [accordionExpanded, setAccordionExpanded] = React.useState(false);
  const handleAccordionChange = (index) => (event, isExpanded) => {
    setAccordionExpanded(isExpanded ? index : false);
  };

  const hotelInfo = reducerState?.hotelSearchResult?.hotelInfo?.HotelInfoResult;
  // const authenticUser = reducerState?.logIn?.loginData?.status;
  // console.log("Hotel information", hotelInfo);

  const hotelRoom =
    reducerState?.hotelSearchResult?.hotelRoom?.GetHotelRoomResult;

  const hotelRoomName =
    reducerState?.hotelSearchResult?.hotelRoom?.GetHotelRoomResult
      ?.HotelRoomsDetails[0]?.RoomTypeName;
  // console.log("hotel Room Name", hotelRoomName)
  const hotelCancellationPolicies =
    reducerState?.hotelSearchResult?.blockRoom?.BlockRoomResult
      ?.HotelRoomsDetails[0];
  const cancellationStartingDate =
    hotelCancellationPolicies?.CancellationPolicies[0]?.FromDate;
  const cancellationFormattedStartingDate = moment(
    cancellationStartingDate
  ).format("MMMM DD, YYYY");
  const cancellationEndingDate =
    hotelCancellationPolicies?.CancellationPolicies[0]?.ToDate;
  const cancellationFormattedEndingDate = moment(cancellationEndingDate).format(
    "MMMM DD, YYYY"
  );

  const cancellationCharge =
    hotelCancellationPolicies?.CancellationPolicies[0]?.Charge;

  const hotelData = hotelRoom?.HotelRoomsDetails[HotelIndex];
  // console.log("hotel Data", hotelData);
  const bookingId =
    reducerState?.hotelSearchResult?.bookRoom?.BookResult?.BookingId;
  // console.log(hotelCancellationPolicies?.CancellationPolicies[0]);
  const star = (data) => {
    const stars = [];
    for (let i = 0; i < data; i++) {
      stars.push(<StarIcon key={i} style={{ color: "#FF8900" }} />);
    }
    return stars;
  };

  const isLoad = reducerState?.hotelSearchResult?.blockRoom;

  useEffect(() => {
    if (isLoad.length == 0) {
      setLoader(true);
      // console.log("truehai bhai");
    }
  }, [isLoad]);

  useEffect(() => {
    if (isLoad.length >= 0) {
      setLoader(false);
      // console.log("truehai bhai");
    }
  }, [isLoad]);

  useEffect(() => {
    validation();
    // console.warn(passengerData, "passengerdata>>>>>>::::::::::::::::::::::::::::::::.")
  }, [setSub1, passengerData])

  const dateString = hotelData?.LastCancellationDate;
  const date1 = new Date(dateString);
  const time1 = date1.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const day = date1.getDate();
  const month = date1.toLocaleString("default", {
    month: "short",
  });
  const year = date1.getFullYear();
  const formattedDate = `${day} ${month} ${year}`;

  const handleServiceChange = (e, roomIndex, knowIndex) => {
    setSub1(sub1 + 1)
    if (
      roomIndex !== undefined &&
      roomIndex !== null &&
      knowIndex?.adultIndex !== undefined &&
      knowIndex?.adultIndex !== null
    ) {
      // console.log("adult");
      const { name, value } = e.target;
      const filteredPassenger = passengerData.filter((item, index) => {
        return (
          item.roomIndex == roomIndex &&
          item?.adultIndex == knowIndex?.adultIndex
        );
      });
      // console.log("filteredPassenger", filteredPassenger);
      const newFilteredPassenger = { ...filteredPassenger[0] };
      newFilteredPassenger[name] = value;
      const indexFind = passengerData.indexOf(filteredPassenger[0]);
      if (indexFind !== -1) {
        passengerData[indexFind] = newFilteredPassenger;
      }
    } else if (
      roomIndex !== undefined &&
      roomIndex !== null &&
      knowIndex?.childIndex !== undefined &&
      knowIndex?.childIndex !== null
    ) {
      // console.log("child");
      const { name, value } = e.target;
      const filteredPassenger = passengerData.filter((item, index) => {
        return (
          item.roomIndex == roomIndex &&
          item?.childIndex == knowIndex?.childIndex
        );
      });
      // console.log("filteredPassenger", filteredPassenger);
      const newFilteredPassenger = { ...filteredPassenger[0] };
      newFilteredPassenger[name] = value;
      const indexFind = passengerData.indexOf(filteredPassenger[0]);
      if (indexFind !== -1) {
        passengerData[indexFind] = newFilteredPassenger;
      }
    }

    // console.log("passengerDataNew", passengerData);
    const eml = document.getElementById("Email1").value;
    const con = document.getElementById("phoneNumber1").value;
    const val = validateEmail(eml);
    const valCon = validatePhoneNumber(con);
    setEmail(() => val);
    setContact(() => valCon);

    // console.warn(val, "email validationjfnjkdfnjdfjfddddddddddddddddddn");
  };





  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleModalClose = () => {
    setIsLoginModalOpen(false);
  };

  useEffect(() => {
    if (authenticUser == 200) {
      handleModalClose();
    }
  }, [authenticUser]);





  const handleClickSavePassenger = () => {

    if (authenticUser !== 200) {
      setIsLoginModalOpen(true);
    } else {

      dispatch(PassengersAction(passengerData));
      navigate("/hotel/hotelsearch/HotelBooknow/Reviewbooking/GuestDetail");
    }
  };

  const result =
    reducerState?.hotelSearchResult?.ticketData?.data?.data?.HotelSearchResult;
  // console.log(result, "result")
  let totalAdults = 0;
  let totalChildren = 0;



  result?.RoomGuests?.forEach((room) => {
    totalAdults += room?.NoOfAdults || 0;
    totalChildren += room?.NoOfChild || 0;
  });


  // const storedFormData = JSON.parse(sessionStorage.getItem("hotelFormData"));
  // const data = storedFormData.dynamicFormData[0];


  const [expandedOther, setExpandedOther] = React.useState(false);

  const handleOtherChange = (panel) => (event, notexpanted) => {
    setExpandedOther(notexpanted ? panel : false);
  };
  // function validatePAN(panNumber) {
  //   const regex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  //   return regex.test(panNumber);
  // }
  // function validatePhoneNumber(phoneNumber) {
  //   var phonePattern = /^\d{10}$/;
  //   return phonePattern.test(phoneNumber);
  // }
  // function validateEmail(email) {
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   return emailRegex.test(email);
  // }

  async function validation() {
    const email = await document.getElementById("Email1").value;
    const contact = await document.getElementById("phoneNumber1").value;
    const em = await validateEmail(email);
    const con = await validatePhoneNumber(contact);
    if (!em || !con) {
      setValidationRes(false)

      return
    }
    const trry = (item) => {
      // console.log(item.PAN, "pancard&&&&&&&&&&&&&&&&&&&&&7");
      if (validatePAN(item.PAN) && item.FirstName !== "" && item.LastName !== "" && toString(item.Age) !== "")
        return true;
    }
    // console.warn(passengerData, "passengerdata validation functionnnnnnnnnnn")
    const other = await passengerData.filter(
      (trry)
      // =>
      // toString(item.Age) === "" ||
      // item.FirstName === "" ||
      // item.LastName === "" ||
      // validatePAN(item.PAN) === true
      //  { console.log(item.PAN,"pancard&&&&&&&&&&&&&&&&&&&&&7");
      //   true}
    );
    const result = await (other.length === passengerData.length && passengerData.length ? true : false);
    setValidationRes(result)
    // console.warn(other, "resulttryyy");
    return result;
  }
  // console.warn("passengerDataNew", emailRef,"sss");

  useEffect(() => {
    // console.log(sub1, "sub1 JJJJJJJJJJJJJJJJJJJJJJJJJJJJj")
    validation()
  }, [sub1])


  const checkInDate = result?.CheckInDate instanceof Date
    ? result?.CheckInDate
    : new Date(result?.CheckInDate);

  // Check if checkInDate is a valid Date object
  if (isNaN(checkInDate)) {
    return <p>Invalid date</p>;
  }

  // Format the date to "20 Dec, 23"
  const formattedDateCheckIn = checkInDate.toLocaleString('en-US', {
    day: 'numeric',
    month: 'short',
    year: '2-digit',
  });

  // Get the day of the week (e.g., "Thursday")
  const dayOfWeek = checkInDate.toLocaleString('en-US', { weekday: 'long' });





  const checkOutDateValue = result?.CheckOutDate instanceof Date
    ? result?.CheckOutDate
    : new Date(result?.CheckOutDate);

  // Check if checkOutDateValue is a valid Date object
  if (isNaN(checkOutDateValue)) {
    return <p>Invalid date</p>;
  }

  // Format the date to "20 Dec, 23"
  const formattedCheckOutDate = checkOutDateValue.toLocaleString('en-US', {
    day: 'numeric',
    month: 'short',
    year: '2-digit',
  });

  // Get the day of the week (e.g., "Thursday")
  const dayOfWeekCheckOut = checkOutDateValue.toLocaleString('en-US', { weekday: 'long' });

  // const filterName = async (roomIndex, adultIndex) => {
  //   const res = await passengerData.filter(
  //     (item) =>

  //     (item.roomIndex ===
  //       roomIndex &&
  //       item.adultIndex ===
  //       adultIndex)
  //   )[0].FirstName
  //   // setSub3((pre)=>!pre)
  //   if (res === "") {
  //     // await console.log(roomIndex, adultIndex, true, "resssssssssssssssssssssssssssssssssssssssss")
  //     return true
  //   }
  //   else {
  //     // console.log(false, "resssssssssssssssssssssssssssssssssssssssss")
  //     return false
  //   }

  // }
  // console.log(reducerState,"reducer state")




  return (
    <>



      {loader ? (
        <HotelLoading />
      ) : (
        <div className="container" >
          <motion.div variants={variants} initial="initial"
            whileInView="animate" className="row">
            <motion.div variants={variants} className="col-lg-12 p-0" style={{ marginTop: "-116px" }}>
              <div className="hotelDetails">
                <div>
                  <div>
                    <p className="hotelName">
                      {hotelInfo?.HotelDetails?.HotelName}
                    </p>
                  </div>
                  <div >
                    <Box>{star(hotelInfo?.HotelDetails?.StarRating)}</Box>
                  </div>
                  <div>
                    <p className="text-start addReview">
                      {" "}
                      <b>Address:</b> {hotelInfo?.HotelDetails?.Address}
                    </p>
                  </div>
                  <div>
                  </div>
                </div>
                <div>
                  <div className="hotelImageReview">
                    <img src={Imgresult} onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = hotelNotFound;
                    }} alt="package-img" />
                  </div>
                </div>
              </div>
              {/* </div>
            </div> */}
            </motion.div>

            {/* room details area  */}

            <motion.div variants={variants} className="col-lg-12 p-0">
              <div className="roomDetails">
                <div className="row">
                  <div className="col-lg-9 mb-md-3">
                    <p className="titles ">{hotelData?.RoomTypeName}</p>
                    <p>{hotelData?.RoomPromotion}</p>
                    <p>{hotelData?.RatePlanName}</p>
                    <p className="text-hotelName"> {hotelRoomName}</p>
                  </div>
                  <div className="col-lg-3 adultss ">
                    <p>{totalAdults} Adult(s) {totalChildren.length > 0 ? `${totalChildren} Child(s)` : ""}</p>
                  </div>
                </div>
              </div>
            </motion.div>



            <motion.div variants={variants} className="col-lg-12 p-0">
              <div className="roomDetailsReviewDesc">
                <div className="row">
                  <motion.div variants={variants} className="col-lg-4">
                    <div className="checkInReview">
                      <span>Check-In</span>
                      <p>{formattedDateCheckIn}</p>
                      <h2>{dayOfWeek}</h2>

                    </div>
                  </motion.div>
                  <motion.div variants={variants} className="col-lg-4">
                    <div className="checkInReview">
                      <span>Check-Out</span>
                      <p>{formattedCheckOutDate} </p>
                      <h2>{dayOfWeekCheckOut}</h2>

                    </div>
                  </motion.div>
                  <motion.div variants={variants} className="col-lg-4">
                    <div className="checkInReview">
                      <span>{result?.NoOfRooms} Room(s) </span>
                      <p>{totalAdults} Adult(s) {totalChildren.length > 0 ? `${totalChildren} Child(s)` : ""}</p>

                    </div>
                  </motion.div>

                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* guest details section  */}

          <motion.div variants={variants} initial="initial"
            whileInView="animate" className="row">
            {/* <div className="col-lg-12">
              <div className="headText">
                <h2>Guest Details</h2>
              </div>
            </div> */}

            {/* <div className="headForm">
              <div className="row">
                <div className="col-lg-12">
                  <div className="row padd g-3">
                    <div className="col-lg-4 col-md-6">
                      <div className="form_input">
                        <label className="form_lable">Email*</label>
                        <input
                          name="Email"
                          id="Email1"
                          ref={emailRef}
                          placeholder="Enter your Email"
                          onChange={(e) =>
                            handleServiceChange(e, 0, { adultIndex: 0 })
                          }
                        />
                        {sub && !emailVal && (
                          <span id="error1">Enter a Valid Email</span>
                        )}
                      </div>
                    </div>

                    <div className="col-lg-4 col-md-6">
                      <div className="form_input">
                        <label className="form_lable">Phone No*</label>
                        <input
                          name="Phoneno"
                          id="phoneNumber1"
                          ref={phoneRef}
                          placeholder="Enter your name"
                          onChange={(e) =>
                            handleServiceChange(e, 0, { adultIndex: 0 })
                          }
                        />

                        {sub && !contactVal && (
                          <span id="error1">Enter a Valid Number</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}

            <motion.div variants={variants} className="col-lg-12 p-0 mt-3">
              <div className="bookflightPassenger">
                <form>
                  <div className="bookFlightPassInner">
                    <div className="bookAdultIndex">
                      <p>Your Booking Details will be sent to</p>
                    </div>
                    <div className="row g-3 mb-3">
                      <div className="col-lg-5 col-md-5">
                        {/* <div className="form-floating"> */}
                        <label for="floatingInput">Enter Email</label>
                        <input
                          name="Email"
                          id="Email1"
                          className="form-control"
                          ref={emailRef}
                          // placeholder="Enter your Email"
                          onChange={(e) =>
                            handleServiceChange(e, 0, { adultIndex: 0 })
                          }
                        />
                        {sub && !emailVal && (
                          <span id="error1">Enter a Valid Email</span>
                        )}
                        {/* <label for="floatingInput">Enter Email</label> */}
                        {/* </div> */}

                      </div>
                      <div className="col-lg-5 col-md-5">
                        {/* <div className="form-floating"> */}
                        <label for="floatingInput">Enter Phone</label>
                        <input
                          name="Phoneno"
                          id="phoneNumber1"
                          className="form-control"
                          ref={phoneRef}
                          // placeholder="Enter your name"
                          onChange={(e) =>
                            handleServiceChange(e, 0, { adultIndex: 0 })
                          }
                        />

                        {sub && !contactVal && (
                          <span id="error1">Enter a Valid Number</span>
                        )}
                        {/* <label for="floatingInput">Mobile Number</label> */}
                        {/* </div> */}


                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </motion.div>

            {/* <div className="col-lg-12">
              <div className="accordianSection">
                {noOfRooms.length > 0 &&
                  Array.from({ length: noOfRooms.length }, (_, roomIndex) => (
                    <Box sx={{ marginBottom: "15px" }}>
                      <div mb={2} key={roomIndex} className="services" py={1}>
                        <Accordion
                          expanded={accordionExpanded === roomIndex}
                          onChange={handleAccordionChange(roomIndex)}
                          sx={{
                            marginBottom: "15px",
                            backgroundColor: "rgba(187, 187, 187, 0.30)",
                          }}
                        >
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                            <label>Room {roomIndex + 1}</label>
                          </AccordionSummary>
                          <AccordionDetails>
                            <div>
                              {noOfRooms[roomIndex]?.NoOfAdults > 0 &&
                                Array.from(
                                  { length: noOfRooms[roomIndex]?.NoOfAdults },
                                  (_, adultIndex) => (
                                    <div className="guestDetailsForm">
                                      <p>
                                        Adult {adultIndex + 1}
                                        {adultIndex == 0 ? "(Lead Guest)" : ""}
                                      </p>
                                      <Grid container spacing={3} my={1}>
                                        <Grid item xs={12} sm={12} md={4}>
                                          <Box>
                                            <div className="form_input">
                                              <label
                                                hotel_form_input
                                                className="form_lable"
                                              >
                                                First name*
                                              </label>
                                              <input
                                                name="FirstName"
                                                placeholder="Enter your name"
                                                // value={passengerData.FirstName}
                                                onChange={(e) =>
                                                  setTimeout(() => {
                                                    console.warn(
                                                      passengerData.filter(
                                                        (item) =>
                                                          item.roomIndex ===
                                                          roomIndex &&
                                                          item.adultIndex ===
                                                          adultIndex
                                                      )[0].FirstName,
                                                      "%%%%%%%%%%%%%%%%%%%%%%%%%%%%%55"
                                                    );

                                                    handleServiceChange(
                                                      e,
                                                      roomIndex,
                                                      { adultIndex: adultIndex }
                                                    );
                                                  }, 500)
                                                }
                                              />

                                              {sub &&
                                                passengerData[roomIndex]
                                                  .FirstName === "" && (
                                                  <span className="error">
                                                    {
                                                      passengerData[roomIndex]
                                                        .FirstName
                                                    }
                                                  </span>
                                                )}
                                            </div>
                                          </Box>
                                        </Grid>
                                        <Grid
                                          item
                                          xs={12}
                                          sm={12}
                                          md={4}
                                          py={1}
                                        >
                                          <Box>
                                            <div className="form_input">
                                              <label
                                                hotel_form_input
                                                className="form_lable"
                                              >
                                                Last name*
                                              </label>
                                              <input
                                                name="LastName"
                                                placeholder="Enter your last name"
                                                // value={passengerData.LastName}
                                                onChange={(e) =>
                                                  setTimeout(() => {
                                                    handleServiceChange(
                                                      e,
                                                      roomIndex,
                                                      { adultIndex: adultIndex }
                                                    );
                                                  }, 300)
                                                }
                                              />
                                              {sub &&
                                                passengerData.filter(
                                                  (item) =>
                                                    item.roomIndex ===
                                                    roomIndex &&
                                                    item.adultIndex ===
                                                    adultIndex
                                                )[0].LastName === "" && (
                                                  <span className="error">
                                                    Enter Last Name{" "}
                                                  </span>
                                                )}
                                            </div>
                                          </Box>
                                        </Grid>
                                        <Grid
                                          item
                                          xs={12}
                                          sm={12}
                                          md={4}
                                          py={1}
                                        >
                                          <Box>
                                            <div className="form_input">
                                              <label
                                                hotel_form_input
                                                className="form_lable"
                                              >
                                                age*
                                              </label>
                                              <input
                                                name="Age"
                                                type="number"
                                                placeholder="Enter Age"
                                                // value={passengerData.Age}
                                                onChange={(e) =>
                                                  setTimeout(() => {
                                                    handleServiceChange(
                                                      e,
                                                      roomIndex,
                                                      { adultIndex: adultIndex }
                                                    );
                                                  }, 300)
                                                }
                                              />
                                              {sub &&
                                                passengerData.filter(
                                                  (item) =>
                                                    item.roomIndex ===
                                                    roomIndex &&
                                                    item.adultIndex ===
                                                    adultIndex
                                                )[0].Age === "" && (
                                                  <span className="error">
                                                    Enter Age{" "}
                                                  </span>
                                                )}
                                            </div>
                                          </Box>
                                        </Grid>
                                        <Grid
                                          item
                                          xs={12}
                                          sm={12}
                                          md={4}
                                          py={1}
                                        >
                                          <Box>
                                            <div className="form_input">
                                              <label
                                                hotel_form_input
                                                className="form_lable"
                                              >
                                                Pan Number*
                                              </label>
                                              <input
                                                name="PAN"
                                                type="text"
                                                placeholder="Write in Capital"
                                                // value={passengerData.PAN}
                                                onChange={(e) =>
                                                  setTimeout(() => {
                                                    handleServiceChange(
                                                      e,
                                                      roomIndex,
                                                      { adultIndex: adultIndex }
                                                    );
                                                  }, 300)
                                                }
                                              />
                                              {sub &&
                                                !validatePAN(
                                                  sub &&
                                                  passengerData.filter(
                                                    (item) =>
                                                      item.roomIndex ===
                                                      roomIndex &&
                                                      item.adultIndex ===
                                                      adultIndex
                                                  )[0].PAN
                                                ) && (
                                                  <span className="error">
                                                    Enter PAN{" "}
                                                  </span>
                                                )}
                                            </div>
                                          </Box>
                                        </Grid>
                                      </Grid>
                                    </div>
                                  )
                                )}
                              {noOfRooms[roomIndex]?.NoOfChild > 0 &&
                                Array.from(
                                  {
                                    length: noOfRooms[roomIndex]?.NoOfChild,
                                  },
                                  (_, childIndex) => (
                                    <div className="guestDetailsForm">
                                      Child {childIndex + 1}
                                      <Grid container spacing={3} my={1}>
                                        <Grid item xs={12} sm={12} md={4}>
                                          <Box>
                                            <div className="form_input">
                                              <label
                                                hotel_form_input
                                                className="form_lable"
                                              >
                                                First name*
                                              </label>
                                              <input
                                                name="FirstName"
                                                placeholder="Enter your name"
                                                // value={passengerData.FirstName}
                                                onChange={(e) =>
                                                  setTimeout(() => {
                                                    handleServiceChange(
                                                      e,
                                                      roomIndex,
                                                      { childIndex: childIndex }
                                                    );
                                                    {
                                                      console.warn(
                                                        passengerData.filter(
                                                          (item) =>
                                                            item.roomIndex ===
                                                            roomIndex &&
                                                            item.childIndex ===
                                                            childIndex
                                                        ),
                                                        "dddddddddddddddddddd"
                                                      );
                                                    }
                                                  })
                                                }
                                              />
                                              {sub &&
                                                passengerData.filter(
                                                  (item) =>
                                                    item.roomIndex ===
                                                    roomIndex &&
                                                    item.childIndex ===
                                                    childIndex
                                                )[0].FirstName === "" && (
                                                  <span className="error">
                                                    Enter First Name{" "}
                                                  </span>
                                                )}
                                            </div>
                                          </Box>
                                        </Grid>
                                        <Grid
                                          item
                                          xs={12}
                                          sm={12}
                                          md={4}
                                          py={1}
                                        >
                                          <Box>
                                            <div className="form_input">
                                              <label
                                                hotel_form_input
                                                className="form_lable"
                                              >
                                                Last name*
                                              </label>
                                              <input
                                                name="LastName"
                                                placeholder="Enter your last name"
                                                // value={passengerData.LastName}
                                                onChange={(e) =>
                                                  setTimeout(() => {
                                                    console.warn(
                                                      "Last name child",
                                                      passengerData.filter(
                                                        (item) =>
                                                          item.roomIndex ===
                                                          roomIndex &&
                                                          item.childIndex ===
                                                          childIndex
                                                      )[0].LastName
                                                    );
                                                    handleServiceChange(
                                                      e,
                                                      roomIndex,
                                                      { childIndex: childIndex }
                                                    );
                                                  })
                                                }
                                              />
                                              {sub &&
                                                passengerData.filter(
                                                  (item) =>
                                                    item.roomIndex ===
                                                    roomIndex &&
                                                    item.childIndex ===
                                                    childIndex
                                                )[0].LastName === "" && (
                                                  <span className="error">
                                                    Enter Last Name{" "}
                                                  </span>
                                                )}
                                            </div>
                                          </Box>
                                        </Grid>
                                        <Grid
                                          item
                                          xs={12}
                                          sm={12}
                                          md={4}
                                          py={1}
                                        >
                                          <Box>
                                            <div className="form_input">
                                              <label
                                                hotel_form_input
                                                className="form_lable"
                                              >
                                                age*
                                              </label>
                                              <input
                                                name="Age"
                                                type="text"
                                                placeholder="Enter Age"
                                                value={
                                                  noOfRooms[roomIndex]
                                                    ?.ChildAge[childIndex]
                                                }
                                              // onChange={(e) =>
                                              //   handleServiceChange(
                                              //     e,
                                              //     roomIndex,
                                              //     { childIndex: childIndex }
                                              //   )
                                              // }
                                              />
                                              {sub &&
                                                passengerData.filter(
                                                  (item) =>
                                                    item.roomIndex ===
                                                    roomIndex &&
                                                    item.childIndex ===
                                                    childIndex
                                                )[0].Age === "" && (
                                                  <span className="error">
                                                    Enter Age{" "}
                                                  </span>
                                                )}
                                            </div>
                                          </Box>
                                        </Grid>
                                        <Grid
                                          item
                                          xs={12}
                                          sm={12}
                                          md={4}
                                          py={1}
                                        >
                                          <Box>
                                            <div className="form_input">
                                              <label
                                                hotel_form_input
                                                className="form_lable"
                                              >
                                                PanNo*
                                              </label>
                                              <input
                                                name="PAN"
                                                type="text"
                                                placeholder="Enter PanNo"
                                                // value={passengerData.PAN}
                                                onChange={(e) =>
                                                  setTimeout(() => {
                                                    handleServiceChange(
                                                      e,
                                                      roomIndex,
                                                      { childIndex: childIndex }
                                                    );
                                                  })
                                                }
                                              />
                                              {sub &&
                                                !validatePAN(
                                                  passengerData.filter(
                                                    (item) =>
                                                      item.roomIndex ===
                                                      roomIndex &&
                                                      item.childIndex ===
                                                      childIndex
                                                  )[0].PAN
                                                ) && (
                                                  <span className="error">
                                                    Enter PAN{" "}
                                                  </span>
                                                )}
                                            </div>
                                          </Box>
                                        </Grid>
                                      </Grid>
                                    </div>
                                  )
                                )}
                            </div>
                          </AccordionDetails>
                        </Accordion>
                      </div>
                    </Box>
                  ))}
              </div>
            </div> */}

            <motion.div variants={variants} className="col-lg-12 p-0 mt-3">
              <div className="bookflightPassenger">
                <div className="headingBookFlight">
                  <h3>Guest Details</h3>
                </div>
                {noOfRooms.length > 0 &&
                  Array.from({ length: noOfRooms.length }, (_, roomIndex) => (
                    <div>
                      <label className="roomIndexGuest">Room {roomIndex + 1}</label>
                      {
                        noOfRooms[roomIndex]?.NoOfAdults > 0 &&
                        Array.from(
                          { length: noOfRooms[roomIndex]?.NoOfAdults },
                          (_, adultIndex) => (
                            <div className="bookFlightPassInner">
                              <div className="bookAdultIndex">
                                <p>
                                  Adult {adultIndex + 1}
                                  {adultIndex == 0 ? "(Lead Guest)" : ""}
                                </p>
                              </div>
                              <div className="row g-3 mb-3">
                                <div className="col-lg-3 col-md-3">
                                  {/* <div class="form-floating"> */}
                                  <label for="floatingInput">First Name</label>
                                  <input
                                    name="FirstName"
                                    // placeholder="Enter your name"
                                    class="form-control"
                                    onChange={(e) => {


                                      handleServiceChange(
                                        e,
                                        roomIndex,
                                        { adultIndex: adultIndex }
                                      );


                                    }

                                    }
                                  />

                                  {/* {sub &&
                                      filterName(roomIndex,adultIndex) && (
                                        <span className="error10">
                                          Enter First Name
                                        </span>)
                                    } */}
                                  {sub &&
                                    passengerData.filter(
                                      (item) =>
                                        item.roomIndex ===
                                        roomIndex &&
                                        item.adultIndex ===
                                        adultIndex
                                    )[0].FirstName === "" && (
                                      <span className="error10">
                                        Enter First Name{" "}
                                      </span>
                                    )}
                                  {/* <label for="floatingInput">First Name</label> */}
                                  {/* </div> */}
                                </div>
                                <div className="col-lg-3 col-md-3">
                                  {/* <div class="form-floating"> */}
                                  <label for="floatingInput">Last Name</label>
                                  <input
                                    name="LastName"
                                    // placeholder="Enter your last name"
                                    class="form-control"
                                    onChange={(e) =>
                                      setTimeout(() => {
                                        handleServiceChange(
                                          e,
                                          roomIndex,
                                          { adultIndex: adultIndex }
                                        );
                                      }, 300)
                                    }
                                  />
                                  {sub &&
                                    passengerData.filter(
                                      (item) =>
                                        item.roomIndex ===
                                        roomIndex &&
                                        item.adultIndex ===
                                        adultIndex
                                    )[0].LastName === "" && (
                                      <span className="error10">
                                        Enter Last Name{" "}
                                      </span>
                                    )}
                                  {/* <label for="floatingInput">Last Name</label> */}
                                  {/* </div> */}
                                </div>
                                <div className="col-lg-3 col-md-3">
                                  {/* <div class="form-floating"> */}
                                  <label for="floatingInput">Enter Age</label>
                                  <input
                                    name="Age"
                                    type="number"
                                    // placeholder="Enter Age"
                                    class="form-control"
                                    onChange={(e) =>
                                      setTimeout(() => {
                                        handleServiceChange(
                                          e,
                                          roomIndex,
                                          { adultIndex: adultIndex }
                                        );
                                      }, 300)
                                    }
                                  />
                                  {sub &&
                                    passengerData.filter(
                                      (item) =>
                                        item.roomIndex ===
                                        roomIndex &&
                                        item.adultIndex ===
                                        adultIndex
                                    )[0].Age === "" && (
                                      <span className="error10">
                                        Enter Age{" "}
                                      </span>
                                    )}
                                  {/* <label for="floatingInput">Enter Age</label> */}
                                  {/* </div> */}
                                </div>
                                <div className="col-lg-3 col-md-3">
                                  {/* <div class="form-floating"> */}
                                  <label for="floatingInput">Pan Number</label>
                                  <input
                                    name="PAN"
                                    type="text"
                                    placeholder="Write in Capital"
                                    className="form-control"
                                    onChange={(e) =>
                                      setTimeout(() => {
                                        handleServiceChange(
                                          e,
                                          roomIndex,
                                          { adultIndex: adultIndex }
                                        );
                                      }, 300)
                                    }
                                  />
                                  {sub &&
                                    !validatePAN(
                                      sub &&
                                      passengerData.filter(
                                        (item) =>
                                          item.roomIndex ===
                                          roomIndex &&
                                          item.adultIndex ===
                                          adultIndex
                                      )[0].PAN
                                    ) && (
                                      <span className="error10">
                                        Enter PAN{" "}
                                      </span>
                                    )}
                                  {/* <label for="floatingInput">Pan Number</label> */}
                                  {/* </div> */}
                                </div>
                              </div>

                            </div>
                          )
                        )
                      }

                      {noOfRooms[roomIndex]?.NoOfChild > 0 &&
                        Array.from(
                          {
                            length: noOfRooms[roomIndex]?.NoOfChild,
                          },
                          (_, childIndex) => (
                            <div className="bookFlightPassInner">
                              <div className="bookAdultIndex">
                                <p>
                                  Child {childIndex + 1}
                                </p>
                              </div>
                              <div className="row g-3 mb-3">
                                <div className="col-lg-3 col-md-3">
                                  <div class="form-floating">
                                    <input
                                      name="FirstName"
                                      placeholder="Enter your name"
                                      class="form-control"
                                      onChange={(e) => handleServiceChange(
                                        e,
                                        roomIndex,
                                        { childIndex: childIndex }
                                      )


                                      }
                                    />
                                    {sub &&
                                      passengerData.filter(
                                        (item) =>
                                          item.roomIndex ===
                                          roomIndex &&
                                          item.childIndex ===
                                          childIndex
                                      )[0].FirstName === "" && (
                                        <span className="error10">
                                          Enter First Name{" "}
                                        </span>
                                      )}
                                    <label for="floatingInput">First Name</label>
                                  </div>
                                </div>
                                <div className="col-lg-3 col-md-3">
                                  <div class="form-floating">
                                    <input
                                      name="LastName"
                                      placeholder="Enter your last name"
                                      class="form-control"
                                      onChange={(e) =>
                                        handleServiceChange(
                                          e,
                                          roomIndex,
                                          { childIndex: childIndex }
                                        )
                                      }
                                    />
                                    {sub &&
                                      passengerData.filter(
                                        (item) =>
                                          item.roomIndex ===
                                          roomIndex &&
                                          item.childIndex ===
                                          childIndex
                                      )[0].LastName === "" && (
                                        <span className="error10">
                                          Enter Last Name{" "}
                                        </span>
                                      )}
                                    <label for="floatingInput">Last Name</label>
                                  </div>
                                </div>
                                <div className="col-lg-3 col-md-3">
                                  <div class="form-floating">
                                    <input
                                      name="Age"
                                      className="form-control"
                                      type="text"
                                      placeholder="Enter Age"
                                      value={
                                        noOfRooms[roomIndex]
                                          ?.ChildAge[childIndex]
                                      }
                                    />
                                    {sub &&
                                      passengerData.filter(
                                        (item) =>
                                          item.roomIndex ===
                                          roomIndex &&
                                          item.childIndex ===
                                          childIndex
                                      )[0].Age === "" && (
                                        <span className="error10">
                                          Enter Age{" "}
                                        </span>
                                      )}
                                    <label for="floatingInput">Enter Age</label>
                                  </div>
                                </div>
                                <div className="col-lg-3 col-md-3">
                                  <div class="form-floating">
                                    <input
                                      name="PAN"
                                      type="text"
                                      placeholder="Enter PanNo"
                                      className="form-control"
                                      onChange={(e) =>
                                        handleServiceChange(
                                          e,
                                          roomIndex,
                                          { childIndex: childIndex })}
                                    />
                                    {sub &&
                                      !validatePAN(
                                        passengerData.filter(
                                          (item) =>
                                            item.roomIndex ===
                                            roomIndex &&
                                            item.childIndex ===
                                            childIndex
                                        )[0].PAN
                                      ) && (
                                        <span className="error10">
                                          Enter PAN{" "}
                                        </span>
                                      )}
                                    <label for="floatingInput">Pan Number</label>
                                  </div>
                                </div>
                              </div>

                            </div>
                          )
                        )}
                    </div>
                  ))}
              </div>
            </motion.div>


            <motion.div variants={variants} className="col-lg-12 p-0 mt-3">
              <div className="bookflightPassenger">
                <form>
                  <div className="bookFlightPassInner">
                    <div className="bookAdultIndex">
                      <p>Amenities</p>
                    </div>
                    <div className="row g-3 ">
                      <div className="col-lg-12 my-4">
                        <div className="hotelReviewAmetnities">
                          <div>
                            {
                              hotelInfo?.HotelDetails?.HotelFacilities.slice(0, 12).map((item, index) => {
                                return (
                                  <p><img src={chevrondown} />{item}</p>
                                )
                              })
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </motion.div>



            <motion.div variants={variants} className="col-lg-12 p-0 mt-3">
              <div className="bookflightPassenger">
                <form>
                  <div className="bookFlightPassInner">
                    <div className="bookAdultIndex">
                      <p>Cancellation and Charges</p>
                    </div>
                    <div className="row g-3 ">
                      <div className="hotelNameAccord">
                        <p>{hotelRoomName}</p>
                      </div>
                      <div className="otherDetailsData">
                        <div className="row">
                          <div className="col-lg-4">
                            <div className="cancelAccord">
                              <span>Cancelled on or After</span>
                              <p>{cancellationFormattedStartingDate}</p>
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <div className="cancelAccord">
                              <span>Cancelled on or Before</span>
                              <p>{cancellationFormattedEndingDate}</p>
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <div className="cancelAccord">
                              <span>Cancellation Charges</span>
                              <p>{cancellationCharge}%</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </motion.div>



            <div className="col-lg-12">

              <div className="reviewDescriptionButton">
                {
                  !validationRes ?

                    <button type="submit" className="notValidBtn" onClick={() => setSub(true)}>
                      Proceed to Book
                    </button> :
                    <button type="submit"
                      onClick={handleClickSavePassenger}
                    // onClick={() => setSub(true)}
                    >
                      Proceed to Book
                    </button>}
              </div>
            </div>

            <Modal open={bookingSuccess}>
              <Box sx={styleLoader}>
                <CircularProgress size={70} thickness={4} />
              </Box>
            </Modal>
          </motion.div>
        </div >
      )}


      <Modal
        open={isLoginModalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ zIndex: "999999" }}
      >
        <div class="login-page">
          <div class="container ">
            <div class="row d-flex justify-content-center">
              <div class="col-lg-5 ">
                <div class="bg-white shadow roundedCustom">
                  <div class="">
                    <div class="col-md-12 ps-0  d-md-block">
                      <div class="form-right leftLogin h-100 text-white text-center ">
                        <CloseIcon
                          className="closeIncon"
                          onClick={handleModalClose}
                        />
                        <div className="loginImg logg">
                          <img src={loginGif} alt="loginGif" />
                        </div>
                      </div>
                    </div>
                    <div class="col-md-12 pe-0">
                      <div class="form-left h-100 d-flex justify-content-center flex-column py-4 px-3">
                        <div class="row g-4">
                          <div
                            class="col-12"
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <label className="mb-3">
                              Please Login to Continue
                              <span class="text-danger">*</span>
                            </label>
                          </div>
                          <div
                            class="col-12"
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <Login />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>



    </>
  );
};

export default Flightdetail;
