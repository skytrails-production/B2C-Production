

import React, { useState } from "react";
import BusSaleSummary from "../bussearchresult/BusSaleSummary";
import Busalesummarycoupon from "../bussearchresult/Busalesummarycoupon";

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
import { swalModal } from "../../../utility/swal";
// import { apiURL } from "../../../Constants/constant";
import { motion } from "framer-motion";
import useRazorpay from "react-razorpay";
import PaymentLoader from "../../flight/FlightLoader/paymentLoader";
import { apiURL } from "../../../Constants/constant";

import Login from "../../../components/Login";
import Modal from "@mui/material/Modal";
import flightPaymentLoding from "../../../images/loading/loading-ban.gif";
import loginnew from "../../../images/login-01.jpg";
import CloseIcon from "@mui/icons-material/Close";
import { checkSearchTime } from "../../../utility/utils";
import secureLocalStorage from "react-secure-storage";

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

  // const { onFinalAmountChange } = props;
  const navigate = useNavigate();
  const reducerState = useSelector((state) => state);
  const [transactionAmount, setTransactionAmount] = useState(null);
  const [sub, setSub] = useState(false);
  const [loaderPayment, setLoaderPayment] = useState(false);
  const [publishedPrice, setPublishedPrice] = useState(0);
  const [loaderPayment1, setLoaderPayment1] = useState(false);
  const apiUrlPayment = `${apiURL.baseURL}/skyTrails/api/transaction/easebussPayment`;

  // console.log("======================", reducerState);
  const [finalAmount, setFinalAmount] = useState(0);

  const handleFinalAmountChange = (amount) => {
    setFinalAmount(amount);
  };
  const [couponvalue, setCouponValue] = useState("");
  const handlecouponChange = (code) => {
    setCouponValue(code);
  };

  // console.log("couponvalue",couponvalue);

  const busBlockData =
    reducerState?.getBusResult?.busBlock?.data?.data?.BlockResult;
  // console.log("", busBlockData);
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
      swalModal("bus", busBlockData?.Error?.ErrorMessage, false);
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
      navigate("/Busbookingconfirmation", { state: { finalamount: finalAmount, couponvalue: couponvalue } });
    }
  }, [reducerState?.getBusResult?.busDetails?.data?.data]);


  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isDisableScroll, setIsDisableScroll] = useState(false);
  useEffect(() => {
    if (isDisableScroll) {
      document.body.classList.add("disableTrue");
      document.body.classList.remove("disableFalse");
    } else {
      document.body.classList.remove("disableTrue");
      document.body.classList.add("disableFalse");
    }
    return () => {
      document.body.classList.add("disableFalse");

      document.body.classList.remove("disableTrue");
    };
  }, [isDisableScroll]);

  const handleModalClose = () => {
    setIsLoginModalOpen(false);
  };
  // console.warn(fromSearchResults, "fromSearchResults")

  useEffect(() => {
    if (authenticUser == 200) {
      handleModalClose();
    }
  }, [authenticUser]);

  const token = secureLocalStorage?.getItem("jwtToken");
  // console.log(token, "token //////////////////")
  const totalAfterCoupon = sessionStorage?.getItem("totalaftercoupon");


  const handlePayment = async () => {
    if (authenticUser !== 200) {
      setSub(false);
      // setTimer11(false);
      setIsLoginModalOpen(true);
    } else {
      if (!checkSearchTime()) {
        navigate("/");
        return;
      } else {
        setLoaderPayment1(true);
        setIsDisableScroll(true);

        const token = secureLocalStorage?.getItem("jwtToken");
        const payload = {
          firstname: passengerSessionStorageParsed[0].FirstName,
          phone: passengerSessionStorageParsed[0].Phoneno,
          amount: Number(finalAmount).toFixed(2),
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
            setSub(false);
            setIsDisableScroll(false);
            // setTimer11(false);
            // console.error("Error details:", errorData);
          }
        } catch (error) {
          // Handle network errors or exceptions
          setIsDisableScroll(false);
          console.error("API call failed with an exception:", error.message);
        } finally {
          setLoaderPayment1(false);
        }
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
            const easeBuzzPayId = response.easepayid;
            const verifyResponse = await axios.post(
              `${apiURL.baseURL}/skyTrails/api/transaction/paymentSuccess?merchantTransactionId=${response.txnid}`,
              { easeBuzzPayId: easeBuzzPayId }
            );
            setLoaderPayment(true);
            setIsDisableScroll(false);
            // sessionStorage.removeItem("totalaftercoupon");
            // sessionStorage.removeItem("couponCode");
          } catch (error) {
            // console.error("Error verifying payment:", error);
            setIsDisableScroll(false);
            // Handle error
          }
        } else {
          try {
            // Make API call if payment status is 'success'
            const verifyResponse = await axios.post(
              `${apiURL.baseURL}/skyTrails/api/transaction/paymentFailure?merchantTransactionId=${response.txnid}`
            );
            setTransactionAmount(null);
            // sessionStorage.removeItem("totalaftercoupon");
            // sessionStorage.removeItem("couponCode");
            setToggle(false);

            setIsDisableScroll(false);
            // console.log(verifyResponse.data);
            // Handle verifyResponse as needed
          } catch (error) {
            console.error("Error verifying payment:", error);
            setIsDisableScroll(false);
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
      swalModal("bus", busBook?.ErrorMessage, false);

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
  const [toggle, setToggle] = useState(false);

  const cancelFromDate = dayjs(cancellationPolicy[0]?.FromDate.slice(0, 9));
  const cancelToDateTime = dayjs(cancellationPolicy[0]?.FromDate.slice(11, 18));
  const toggleState = (e) => {
    setToggle(e);
    // console.warn("toggling state", e);
  };
  const setTransactionAmountState = (e) => {
    setTransactionAmount(e);
    // console.log("setTransactionAmountState");
  };


  const storedPassengerData = JSON.parse(sessionStorage.getItem("busPassName"));
  // console.log("passengerdetails", storedPassengerData);
  if (loaderPayment == false) {
    return (
      <>
        <div className="mainimgBusSearch"></div>
        <div className=" py-4">
          <div className="container ">
            <div className="row">
              <motion.div
                variants={variants}
                initial="initial"
                whileInView="animate"
                className="col-lg-9 order-lg-1  order-md-2 order-sm-2 order-2"
              >
                <motion.div
                  variants={variants}
                  className="col-lg-12 shad martopBus"
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
                        <p>Departure Time</p>
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
                        <p>Arrival Time</p>
                        <span>{desiredFormat1}</span>
                      </div>
                    </div>
                  </div>


                </motion.div>
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
                        <p>Gender:</p>
                        <p>Age</p>
                      </div>
                      <div>
                        <span>
                          {passenger.FirstName} {passenger.LastName}
                        </span>
                        {/* <span>{passenger.Age} Years Old</span> */}
                        <span>{passenger.Email}</span>
                        {passenger.Gender == "1"
                          ? "Male"
                          : passenger.Gender == "2"
                            ? "Female"
                            : ""}
                        <span>{passenger.Age}</span>
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
                className="col-lg-3 order-lg-2 mb-md-4 mb-sm-4  order-md-1 order-1"
              >
                <Busalesummarycoupon
                  toggle={toggle}
                  onFinalAmountChange={handleFinalAmountChange}
                  toggleState={toggleState}
                  oncouponselect={handlecouponChange}
                  // transactionAmount={setTransactionAmountState}
                  Amount={transactionAmount}
                />
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
                            <img src={loginnew} alt="loginGif" />
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
        <Modal open={loaderPayment1} onClose={loaderPayment1}>
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img src={flightPaymentLoding} alt="" />
            {/* <h1>ghiiiii</h1> */}
          </div>
        </Modal>
      </>
    );
  } else {
    return <PaymentLoader />;
  }
};

export default BusReviewBooking;
