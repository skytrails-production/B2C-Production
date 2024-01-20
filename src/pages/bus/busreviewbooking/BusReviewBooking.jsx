// import React from 'react';
// import Footer from '../../../layouts/Footer';
// import Blankdiv from '../../home/searchresult/Blankdiv';
// import Searchnavbar from '../../home/searchresult/Searchnavbar';
// import BusReasultForm from '../bussearchresult/BusReasultForm';
// import BusSearchReview from './BusSearchReview';
// // import "./bussearchresult.css";

// const BusReviewBooking = () => {
//   return (
//    <div className='bus_banner'>

//             <BusReasultForm/>

//         </div>
//   )
// }

// export default BusReviewBooking

import React, { useState } from "react";

// import { Box, Grid, Typography, Link, Button } from "@mui/material";
// import BusSaleSummary from "../busPassengerDetail/BusSaleSummary";
import BusSaleSummary from "../bussearchresult/BusSaleSummary";

// import ReadMoreIcon from "@mui/icons-material/ReadMore";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  busBookAction,
  busBookDetailsAction,
} from "../../../Redux/busSearch/busSearchAction";
// import { balanceSubtractRequest } from "../../../Redux/Auth/balaceSubtract/actionBalnceSubtract";
import { useEffect } from "react";
import "./busreviewbooking.css";
import dayjs from "dayjs";
import axios from "axios";
import Swal from "sweetalert2";
// import { apiURL } from "../../../Constants/constant";
import { motion } from "framer-motion";
import InsideNavbar from "../../../UI/BigNavbar/InsideNavbar";
import useRazorpay from "react-razorpay";
import PaymentLoader from "../../flight/FlightLoader/paymentLoader";
import { apiURL } from "../../../Constants/constant";

import Login from "../../../components/Login";
import Modal from "@mui/material/Modal";
// import loginGif from "../images/loginGif.gif"
import loginGif from "../../../images/loginGif.gif";
import CloseIcon from "@mui/icons-material/Close";

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

const BusReviewBooking = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reducerState = useSelector((state) => state);
  const [loaderPayment, setLoaderPayment] = useState(false);
  const [publishedPrice, setPublishedPrice] = useState(0);
  const apiUrlPayment = `${apiURL.baseURL}/skyTrails/api/transaction/easebussPayment`;
  // const [offerPrice, setOfferedPrice] = useState(0);
  // const [tds, setTds] = useState(0);
  // const [userData, setUserData] = useState(null);
  // const [busId, setBusId] = useState(0);
  // const isNavigate = reducerState?.getBusResult?.isLoadingBook || true;

  // console.log("======================", reducerState);
  const busBlockData =
    reducerState?.getBusResult?.busBlock?.data?.data?.BlockResult;
  // console.log("************************", busBlockData);
  const busFullData =
    reducerState?.getBusResult?.busResult?.data?.data?.BusSearchResult;
  const busBook =
    reducerState?.getBusResult?.busBook?.data?.data?.BookResult?.Error;
  const authenticUser = reducerState?.logIn?.loginData?.status;
  // console.log(busFullData, "bus full data");
  const seatData = sessionStorage.getItem("seatData");
  const passengerSessionStorage = sessionStorage.getItem("busPassName");
  const passengerSessionStorageParsed = JSON.parse(passengerSessionStorage);
  const parsedSeatData = JSON.parse(seatData);
  const passengerCount = parsedSeatData?.blockedSeatArray.length;
  const resultIndex = parsedSeatData?.resultIndex;
  const boardingPoint = parsedSeatData?.selectedOrigin;
  const droppingPoint = parsedSeatData?.selectedDropPoint;
  const seatObject = parsedSeatData?.blockedSeatArray;
  const markUpamount =
    reducerState?.markup?.markUpData?.data?.result[0]?.busMarkup;
  const published = seatObject.reduce(function (
    accumulator,
    currentValue,
    currentIndex,
    array
  ) {
    return accumulator + currentValue?.Price?.PublishedPriceRoundedOff;
  },
  0);
  // const tdsTotal = markUpamount + seatObject.reduce((accumulator, currentValue) => {
  //     return accumulator + currentValue?.Price?.TDS;
  // }, 0);

  // console.log(seatObject);
  // console.log(reducerState);
  useEffect(() => {
    if (seatData === undefined) {
      navigate("/BusPassengerDetail");
    }
  }, []);
  useEffect(() => {
    if (
      busBlockData?.Error?.ErrorCode !== 0 &&
      busBlockData?.Error?.ErrorCode !== undefined
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops",
        text: busBlockData?.Error?.ErrorMessage,

        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `,
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `,
        },
      });
      navigate("/");
    } else if (sessionStorage.getItem("storedPassengerData") === undefined) {
      navigate("/");
    }
  }, [busBlockData]);

  const offeredPrice = seatObject.reduce(
    (accumulator, currentValue, currentIndex, array) => {
      return accumulator + currentValue?.Price?.OfferedPrice;
    },
    0
  );
  const tdsTotal =
    markUpamount +
    seatObject.reduce((accumulator, currentValue) => {
      return accumulator + currentValue?.Price?.TDS;
    }, 0);
  // useEffect(() => {
  //   setOfferedPrice(offeredPrice);
  //   setPublishedPrice(published);
  //   setTds(tdsTotal);
  // }, []);

  useEffect(() => {
    if (loaderPayment == true) {
      handleBookBus();
    }
  }, [loaderPayment]);

  useEffect(() => {
    if (
      reducerState?.getBusResult?.busBook?.data?.data?.BookResult?.Error
        ?.ErrorMessage == ""
    ) {
      // setLoaderPayment(false);

      handleGetBookingDetails(
        reducerState?.getBusResult?.busBook?.data?.data?.BookResult?.BusId
      );
      // navigate("/Busbookingconfirmation");
    }
  }, [reducerState?.getBusResult?.busBook?.data?.data?.BookResult]);

  useEffect(() => {
    if (
      reducerState?.getBusResult?.busDetails?.data?.data?.GetBookingDetailResult
        ?.Error?.ErrorMessage == ""
    ) {
      setLoaderPayment(false);
      navigate("/Busbookingconfirmation");
    }
  }, [reducerState?.getBusResult?.busDetails?.data?.data]);

  // const userId = reducerState?.logIn?.loginData?.data?.data?.id;
  // const userBalance = reducerState?.userData?.userData?.data?.data?.balance;

  const [Razorpay, isLoaded] = useRazorpay();

  // const handlePayment = useCallback(async () => {

  //   try {
  //     const options = {
  //       key: "rzp_test_rSxJ8wZCLzTJck",
  //       amount: "300" * 100,
  //       currency: "INR",
  //       name: "The Skytrails",
  //       description: "Test Transaction",
  //       image: "https://travvolt.s3.amazonaws.com/Brand.png",
  //       // order_id: order.id,
  //       handler: (response) => {
  //         console.log(response);

  //         if (response.razorpay_payment_id) {
  //           setLoaderPayment(true);
  //         } else {
  //           // Handle payment failure
  //           console.log("Payment failed");
  //         }
  //       },
  //       // prefill: {
  //       //   name: "Piyush Garg",
  //       //   email: "youremail@example.com",
  //       //   contact: "9999999999"
  //       // },
  //       notes: {
  //         address: "Razorpay Corporate Office",
  //       },
  //       theme: {
  //         color: "#e73c34",
  //       },
  //     };

  //     const rzpay = new Razorpay(options);
  //     rzpay.open();
  //   } catch (error) {
  //     console.error("Error creating order:", error);
  //   }
  // }, [Razorpay]);

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleModalClose = () => {
    setIsLoginModalOpen(false);
  };
  // console.warn(fromSearchResults, "fromSearchResults")

  useEffect(() => {
    if (authenticUser == 200) {
      handleModalClose();
    }
  }, [authenticUser]);

 
  const handlePayment = async () => {
    if (authenticUser !== 200) {
      setIsLoginModalOpen(true);
    } else {
      const token = sessionStorage?.getItem("jwtToken");
      const payload = {
        firstname: passengerSessionStorageParsed[0].FirstName,
        phone: passengerSessionStorageParsed[0].Phoneno,
        amount: published + markUpamount,
        // amount: 1,
        email: passengerSessionStorageParsed[0].Email,
        productinfo: "ticket",
        bookingType: "BUS",
        surl: `${apiURL.baseURL}/skyTrails/api/transaction/successVerifyApi?merchantTransactionId=`,
        furl: `${apiURL.baseURL}/skyTrails/api/transaction/paymentFailure?merchantTransactionId=`,
      };

      try {
        const response = await fetch(apiUrlPayment, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          const data = await response.json();

          proceedPayment(data.result.access, "prod", data.result.key);
          // console.log("API call successful:", data);
        } else {
          // console.error("API call failed with status:", response.status);
          const errorData = await response.json();
          // console.error("Error details:", errorData);
        }
      } catch (error) {
        // Handle network errors or exceptions
        // console.error("API call failed with an exception:", error.message);
      }
    }
  };

  const proceedPayment = (accessKey, env, key) => {
    const easebuzzCheckout = new window.EasebuzzCheckout(key, env);
    const options = {
      access_key: `${accessKey}`,
      onResponse: async (response) => {
        // console.log(response, "response");
        if (response.status === "success") {
          try {
            // Make API call if payment status is 'success'
            const verifyResponse = await axios.post(
              `${apiURL.baseURL}/skyTrails/api/transaction/paymentSuccess?merchantTransactionId=${response.txnid}`
            );
            setLoaderPayment(true);
          } catch (error) {
            // console.error("Error verifying payment:", error);
            // Handle error
          }
        } else {
          try {
            // Make API call if payment status is 'success'
            const verifyResponse = await axios.post(
              `${apiURL.baseURL}/skyTrails/api/transaction/paymentFailure?merchantTransactionId=${response.txnid}`
            );
            // console.log(verifyResponse.data);
            // Handle verifyResponse as needed
          } catch (error) {
            // console.error("Error verifying payment:", error);
            // Handle error
          }
        }
      },
      theme: "#123456", // Replace with your desired color hex
    };

    // Initiate payment on button click
    easebuzzCheckout.initiatePayment(options);
  };
  const handleBookBus = () => {
    const payload = {
      EndUserIp: reducerState?.ip?.ipData,
      ResultIndex: JSON.stringify(resultIndex),
      TraceId: busBlockData?.TraceId,
      TokenId: reducerState?.ip?.tokenData,
      BoardingPointId: boardingPoint,
      DroppingPointId: droppingPoint,
      Passenger: busBlockData?.Passenger,
    };

    dispatch(busBookAction(payload));
    // navigate("/Busbookingconfirmation");
  };

  const handleGetBookingDetails = (busIdParam) => {
    const payload = {
      EndUserIp: reducerState?.ip?.ipData,
      TokenId: reducerState?.ip?.tokenData,
      TraceId: busFullData?.TraceId,
      BusId: busIdParam,
      SeatId: 0,
      IsBaseCurrencyRequired: false,
    };
    // busBookSave()
    dispatch(busBookDetailsAction(payload));
  };

  const selectedBus = busFullData.BusResults.find(
    (bus) => bus.ResultIndex === resultIndex
  );

  useEffect(() => {
    if (busBook?.ErrorCode === 0) {
      // navigate("/Busbookingconfirmation");
    } else if (
      busFullData?.Error?.ErrorCode !== 0 &&
      busFullData?.Error?.ErrorCode !== undefined
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops",
        text: busBook?.ErrorMessage,

        showClass: {
          popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `,
        },
        hideClass: {
          popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `,
        },
      });
    }
  }, [busBook]);

  // console.log(selectedBus, "selectedBus")
  const cancellationPolicy = selectedBus?.CancellationPolicies;

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
  const desiredFormat = `${day}${month}-${year} ${time} ${ampm}`;

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
  const desiredFormat1 = `${day1}${month1}-${year1} ${time1} ${ampm1}`;

  const cancelFromDate = dayjs(cancellationPolicy[0]?.FromDate.slice(0, 9));
  const cancelToDateTime = dayjs(cancellationPolicy[0]?.FromDate.slice(11, 18));
  // const cancelFromDateFormatted = cancelFromDate.format("DD MMM, YY");
  // const cancelToDateTimeFormatted = cancelToDateTime.format("DD MMM, YY");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const storedPassengerData = JSON.parse(sessionStorage.getItem("busPassName"));
  if (loaderPayment == false) {
    return (
      <>
        <div className="mainimgBusSearch">
          {/* <Navbar /> */}
          {/* <BigNavbar /> */}
          <InsideNavbar />
        </div>
        <div className="margin-pecentage py-4">
          <div className="container-xxl ">
            <div className="row">
              <motion.div
                variants={variants}
                initial="initial"
                whileInView="animate"
                className="col-lg-9 order-lg-1  order-md-2 order-sm-2"
              >
                <motion.div
                  variants={variants}
                  className="col-lg-12 shad"
                  style={{ marginTop: "-117px" }}
                >
                  <div className="busAllDetail">
                    <div className="heead">
                      <span>{selectedBus?.TravelName}</span>
                    </div>
                    <div className="busAllReview">
                      <div>
                        <p>Origin</p>
                        <span>
                          {selectedBus?.BoardingPointsDetails &&
                            selectedBus.BoardingPointsDetails.length > 0 &&
                            selectedBus.BoardingPointsDetails[0]
                              .CityPointLocation}
                        </span>
                      </div>
                      <div>
                        <p>Departure Date Time</p>
                        <span>{desiredFormat}</span>
                      </div>
                    </div>
                    <div className="busAllReview">
                      <div>
                        <p>Destination</p>
                        <span>
                          {selectedBus?.DroppingPointsDetails &&
                            selectedBus.DroppingPointsDetails.length > 0 &&
                            selectedBus.DroppingPointsDetails[0]
                              .CityPointLocation}
                        </span>
                      </div>
                      <div>
                        <p>Arrival Date Time</p>
                        <span>{desiredFormat1}</span>
                      </div>
                    </div>
                  </div>

                  {/* <div className="busAllDetail">
                  <div>
                    <p>
                      Bus Name
                    </p>
                    <span>
                      {selectedBus?.TravelName}
                    </span>
                  </div>
                  <div>
                    <p>
                      Origin
                    </p>
                    <span>
                      {selectedBus?.BoardingPointsDetails &&
                        selectedBus.BoardingPointsDetails.length > 0 &&
                        selectedBus.BoardingPointsDetails[0].CityPointLocation}
                    </span>
                  </div>
                  <div>
                    <p>
                      Destination
                    </p>
                    <span>
                      {selectedBus?.DroppingPointsDetails &&
                        selectedBus.DroppingPointsDetails.length > 0 &&
                        selectedBus.DroppingPointsDetails[0].CityPointLocation}
                    </span>
                  </div>
                  <div>
                    <p>
                      Departure Date Time
                    </p>
                    <span>
                      {desiredFormat}
                    </span>
                  </div>
                  <div>
                    <p>
                      Arrival Date Time
                    </p>
                    <span>
                      <span>{desiredFormat1}</span>
                    </span>
                  </div>
                </div> */}
                </motion.div>

                {/* <motion.div variants={variants} className="col-lg-12 my-3">
                
              </motion.div> */}

                <motion.div variants={variants} className="col-lg-12 my-3">
                  <div className="passengerDetBox">
                    <p>Passenger Details</p>
                    <span>{passengerCount} Adult(s)</span>
                  </div>
                </motion.div>
                <motion.div variants={variants} className="col-lg-12 my-3">
                  {storedPassengerData.map((passenger, index) => (
                    <div key={index} className="passDetails">
                      <div>
                        <p>Name:</p>
                        {/* <p>Age:</p> */}
                        <p>Email:</p>
                      </div>
                      <div>
                        <span>
                          {passenger.FirstName} {passenger.LastName}
                        </span>
                        {/* <span>{passenger.Age} Years Old</span> */}
                        <span>{passenger.Email}</span>
                      </div>
                    </div>
                  ))}
                </motion.div>

                <motion.div variants={variants} className="col-lg-12 my-3">
                  <div className="passengerDetBox">
                    <p>Cancellation Policy</p>
                  </div>
                </motion.div>
                <motion.div variants={variants} className="col-lg-12 my-3">
                  <div className="CancelRulesBus">
                    <table class="table table-striped tabCancel">
                      <thead>
                        <tr>
                          <th scope="col">Cancellation Time</th>
                          <th scope="col">Cancellation Charges</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cancellationPolicy?.map((item, index) => {
                          const cancelFromDate = dayjs(
                            item?.FromDate.slice(0, 10)
                          );
                          const cancelToDateTime = dayjs(
                            item?.ToDate.slice(0, 10)
                          ); // Make sure ToDate is the correct property name
                          const cancelFromDateFormatted =
                            cancelFromDate.format("DD MMM, YY");
                          const cancelToDateTimeFormatted =
                            cancelToDateTime.format("DD MMM, YY");

                          return (
                            <tr key={index}>
                              <td>
                                from {item?.FromDate.slice(11, 16)}{" "}
                                {cancelFromDateFormatted} to{" "}
                                {item.ToDate.slice(11, 16)}{" "}
                                {cancelToDateTimeFormatted}
                              </td>
                              <td>{item?.CancellationCharge}%</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </motion.div>

                <motion.div
                  variants={variants}
                  className="col-lg-12 mt-4 bookBus"
                >
                  <button onClick={handlePayment}>Book Ticket</button>
                </motion.div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="col-lg-3 order-lg-2 mb-md-4 mb-sm-4  order-md-1 order-sm-1"
              >
                <BusSaleSummary />
              </motion.div>
            </div>
          </div>
        </div>

        <Modal
          open={isLoginModalOpen}
          onClose={handleModalClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{ zIndex: "999999" }}
        >
          {/* <Box className="loginModalBox">
          <p>Please Login to Continue</p>
          <Login />
        </Box> */}
          <div class="login-page">
            <div class="container ">
              <div class="row d-flex justify-content-center">
                <div class="col-lg-5 ">
                  <div class="bg-white shadow roundedCustom">
                    <div class="">
                      <div class="col-md-12 ps-0  d-md-block">
                        <div class="form-right leftLogin h-100 text-white text-center ">
                          {/* <h2 class="fs-1" >Send OTP</h2> */}
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
  } else {
    return <PaymentLoader />;
  }
};

export default BusReviewBooking;
