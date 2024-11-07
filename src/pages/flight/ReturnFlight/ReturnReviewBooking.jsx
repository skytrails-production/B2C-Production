import React, { useEffect, useState } from "react";
import FlightLoader from "../FlightLoader/FlightLoader";
import Alert from "@mui/material/Alert";
import { isValidPassportNumber } from "./passportValidation";
import dayjs from "dayjs";
// import fromTo from "../../images/fromTo.png";
import fromTo from "../../../images/fromTo.png";
import { FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";
import { useDispatch, useSelector, useReducer } from "react-redux";
import { useNavigate } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import { Typography, Button } from "@mui/material";

import PaymentLoader from "../FlightLoader/paymentLoader";
import Flighterror from "../Flighterror";
// import Swal from "sweetalert2";
import {
  bookAction,
  bookActionGDS,
  bookTicketGDS,
  bookActionReturn,
  bookActionGDSReturn,
  bookTicketGDSReturn,
  flightReducerClear,
} from "../../../Redux/FlightBook/actionFlightBook";
import axios from "axios";
import ReturnSummaryWithCoupon from "./ReturnSummaryWithCoupon";
import Modal from "@mui/material/Modal";
import loginnew from "../../../images/login-01.jpg";
import Login from "../../../components/Login";
import CloseIcon from "@mui/icons-material/Close";
import flightPaymentLoding from "../../../images/loading/loading-ban.gif";
import { apiURL } from "../../../Constants/constant";
import { PassengersAction } from "../../../Redux/Passengers/passenger";
import { swalModal } from "../../../utility/swal";
import SecureStorage from "react-secure-storage";
const ReturnReviewBooking = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const adults = sessionStorage.getItem("adults");
  const childs = sessionStorage.getItem("childs");
  const infants = sessionStorage.getItem("infants");
  const ResultIndexGoing = sessionStorage.getItem("goingResultIndex");
  const ResultIndexReturn = sessionStorage.getItem("ReturnResultIndex");
  const reducerState = useSelector((state) => state);
  const [loaderPayment, setLoaderPayment] = useState(false);
  const [loaderPayment1, setLoaderPayment1] = useState(false);
  const fareValue = reducerState?.flightFare?.flightQuoteData?.Results;
  const isPassportRequired =
    reducerState?.flightFare?.flightQuoteData?.Results
      ?.IsPassportRequiredAtTicket;
  const fareValueReturn = isPassportRequired
    ? reducerState?.flightFare?.flightQuoteData?.Results
    : reducerState?.flightFare?.flightQuoteDataReturn?.Results;
  const fareRule = isPassportRequired
    ? reducerState?.flightFare?.flightRuleData?.FareRules
    : reducerState?.flightFare?.flightRuleDataReturn?.FareRules;
  const fareRuleReturn =
    reducerState?.flightFare?.flightRuleDataReturn?.FareRules;
  const data = reducerState?.oneWay?.oneWayData?.data?.data?.Response;
  const result = reducerState?.flightFare?.flightQuoteData?.Results;
  const Passengers = reducerState?.passengers?.passengersData;
  const PassengersReturn = reducerState?.passengers?.passengerDataReturn;
  const flightDeparture =
    reducerState?.flightFare?.flightQuoteData?.Results?.Segments;
  const flightReturn =
    reducerState?.flightFare?.flightQuoteDataReturn?.Results?.Segments;
  const authenticUser = reducerState?.logIn?.loginData?.status;
  // console.log(reducerState, "reducer state review return");
  const isDummyTicketBooking = JSON.parse(
    sessionStorage.getItem("hdhhfb7383__3u8748")
  );
  const [errorMessage, setErrorMassage] = useState({
    error: false,
    Message: "",
  });
  const [transactionAmount, setTransactionAmount] = useState(null);
  const [toggle, setToggle] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isDisableScroll, setIsDisableScroll] = useState(false);

  const [refundTxnId, setRefundTxnId] = useState(null)

  const token = SecureStorage.getItem("jwtToken");
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

  const apiUrlPayment = `${apiURL.baseURL}/skyTrails/api/transaction/easebussPayment`;
  const markUpamount =
    reducerState?.markup?.markUpData?.data?.result[0]?.flightMarkup;

  const handleModalClose = () => {
    setIsLoginModalOpen(false);
  };

  const toggleState = (e) => {
    setToggle(e);
  };

  useEffect(() => {
    if (authenticUser == 200) {
      handleModalClose();
    }
  }, [authenticUser]);

  const [couponvalue, setCouponValue] = useState("");


  const handlecouponChange = (code) => {
    setCouponValue(code);
  };

  // coupon logic here
  const couponconfirmation = async () => {
    try {
      const token = SecureStorage.getItem("jwtToken");
      const response = await axios.get(
        `${apiURL.baseURL
          }/skyTrails/api/coupons/couponApplied/${couponvalue}`,

        {
          headers: {
            token: token,
          },
        }
      );
    } catch (error) {
      // console.log(error);
    }
  };
  // coupon logic here

  useEffect(() => {
    if (loaderPayment == true) {
      handleGoingFlight();
    }
  }, [loaderPayment]);

  // for going flight

  // useEffect(async () => {
  //   if (reducerState?.flightBook?.flightBookData?.Error?.ErrorMessage === "") {
  //     // setLoaderPayment(false);
  //     handleReturnFlight();
  //     // navigate("/bookedTicket");
  //   } else if (
  //     reducerState?.flightBook?.flightBookData?.Error?.ErrorCode !== 0 &&
  //     reducerState?.flightBook?.flightBookData?.Error?.ErrorCode !== undefined
  //   ) {

  //     try {
  //       const token = SecureStorage.getItem("jwtToken");
  //       const payload = {
  //         "refund_amount": transactionAmount ||
  //           (Number(fareValue?.Fare?.PublishedFare) + Number(fareValueReturn?.Fare?.PublishedFare) + (Number(markUpamount) * Number(fareValue?.Fare?.PublishedFare) + Number(fareValueReturn?.Fare?.PublishedFare))).toFixed(0),

  //         "txnId": refundTxnId,
  //       }

  //       const res = await axios({
  //         method: "POST",
  //         url: `${apiURL.baseURL}/skyTrails/api/transaction/refundPolicy`,
  //         data: payload,
  //         headers: {
  //           "Content-Type": "application/json",
  //           token: token,
  //         },
  //       });
  //     } catch (error) {
  //       console.warn(error);
  //     }

  //     swalModal(
  //       "flight",
  //       reducerState?.flightBook?.flightBookData?.Error?.ErrorMessage,
  //       false
  //     );
  //     navigate("/");
  //   }
  // }, [reducerState?.flightBook?.flightBookData?.Response]);
  
  const [finalAmount, setFinalAmount] = useState(0);

  const handleFinalAmountChange = (amount) => {
    setFinalAmount(amount);
  };


  useEffect(() => {
    const fetchData = async () => {

      if (reducerState?.flightBook?.flightBookData?.Error?.ErrorMessage === "") {
        // setLoaderPayment(false);
        handleReturnFlight();
        // navigate("/bookedTicket");
      } else if (
        reducerState?.flightBook?.flightBookData?.Error?.ErrorCode !== 0 &&
        reducerState?.flightBook?.flightBookData?.Error?.ErrorCode !== undefined
      ) {

        try {
          const token = SecureStorage.getItem("jwtToken");
          const payload = {
            "refund_amount": Number(finalAmount).toFixed(2),
            // ||
            //   (Number(fareValue?.Fare?.PublishedFare) + Number(fareValueReturn?.Fare?.PublishedFare) + (Number(markUpamount) * Number(fareValue?.Fare?.PublishedFare) + Number(fareValueReturn?.Fare?.PublishedFare))).toFixed(0),
            // "refund_amount": 2,
            "txnId": refundTxnId,

          }

          // console.log("i am chaling in the going flight")
          const res = await axios({
            method: "POST",
            url: `${apiURL.baseURL}/skyTrails/api/transaction/refundPolicy`,
            data: payload,
            headers: {
              "Content-Type": "application/json",
              token: token,
            },
          });
        } catch (error) {
          console.warn(error);
        }

        swalModal(
          "flight",
          // reducerState?.flightBook?.flightBookData?.Error?.ErrorMessage,
          "Booking failed, your amount will be refunded within 72 hours.",
          false
        );
        navigate("/");
      }
    };

    fetchData(); // Call the async function

    // Cleanup function
    const cleanup = () => {
      // Perform cleanup tasks here if needed
      // For example, unsubscribe from event listeners or clear timers
    };

    // Return cleanup function
    return cleanup;

  }, [reducerState?.flightBook?.flightBookData?.Response]);

  useEffect(() => {
    const fetchData = async () => {

      if (reducerState?.flightBook?.flightBookDataGDS?.Error?.ErrorMessage === "") {
        // setLoaderPayment(false);
        handleReturnFlight();
        // navigate("/bookedTicket");
      } else if (
        reducerState?.flightBook?.flightBookDataGDS?.Error?.ErrorCode !== 0 &&
        reducerState?.flightBook?.flightBookDataGDS?.Error?.ErrorCode !== undefined
      ) {

        try {
          const token = SecureStorage.getItem("jwtToken");
          const payload = {
            "refund_amount": Number(finalAmount).toFixed(2),
            //  ||
            //   (Number(fareValue?.Fare?.PublishedFare) + Number(fareValueReturn?.Fare?.PublishedFare) + (Number(markUpamount) * Number(fareValue?.Fare?.PublishedFare) + Number(fareValueReturn?.Fare?.PublishedFare))).toFixed(0),
            // "refund_amount": 2,
            "txnId": refundTxnId,

          }

          // console.log("i am chaling in the going flight")
          const res = await axios({
            method: "POST",
            url: `${apiURL.baseURL}/skyTrails/api/transaction/refundPolicy`,
            data: payload,
            headers: {
              "Content-Type": "application/json",
              token: token,
            },
          });
        } catch (error) {
          console.warn(error);
        }

        swalModal(
          "flight",
          // reducerState?.flightBook?.flightBookData?.Error?.ErrorMessage,
          "Booking failed, your amount will be refunded within 72 hours.",
          false
        );
        navigate("/");
      }
    };

    fetchData(); // Call the async function

    // Cleanup function
    const cleanup = () => {
      // Perform cleanup tasks here if needed
      // For example, unsubscribe from event listeners or clear timers
    };

    // Return cleanup function
    return cleanup;

  }, [reducerState?.flightBook?.flightBookDataGDS?.Response]);


  useEffect(() => {
    if (
      reducerState?.flightFare?.flightQuoteData?.Error?.ErrorCode !== 0 &&
      reducerState?.flightFare?.flightQuoteData?.Error?.ErrorCode !== undefined
    ) {
      swalModal(
        "flight",
        reducerState?.flightFare?.flightQuoteData?.Error?.ErrorMessage,
        false
      );
      navigate("/");
    }
  }, [reducerState?.flightFare?.flightQuoteData?.Error?.ErrorCode]);

  useEffect(() => {
    if (
      reducerState?.flightBook?.flightBookDataGDS?.Error?.ErrorMessage == "" &&
      !isDummyTicketBooking
    ) {
      getTicketForNonLCC();
    } else if (
      reducerState?.flightBook?.flightBookDataGDS?.Error?.ErrorMessage == "" &&
      isDummyTicketBooking
    ) {
      // setLoaderPayment(false);
      handleReturnFlight();
      // navigate("/bookedTicket");
    } else if (
      reducerState?.flightBook?.flightBookDataGDS?.Error?.ErrorCode !== 0 &&
      reducerState?.flightBook?.flightBookDataGDS?.Error?.ErrorCode !==
      undefined
    ) {
      swalModal(
        "flight",
        reducerState?.flightBook?.flightBookDataGDS?.Error?.ErrorMessage,
        false
      );
      navigate("/");
    }
  }, [reducerState?.flightBook?.flightBookDataGDS?.Response]);

  useEffect(() => {
    if (
      reducerState?.flightBook?.flightTicketDataGDS?.data?.data?.Response?.Error
        ?.ErrorCode === 0 ||
      (reducerState?.flightBook?.flightTicketDataGDS?.data?.data?.Response
        ?.Error?.ErrorCode !== 0 &&
        reducerState?.flightBook?.flightTicketDataGDS?.data?.data?.Response
          ?.Error?.ErrorCode !== undefined)
    ) {
      // setLoaderPayment(false);
      // navigate("/bookedTicket");
      handleReturnFlight();
    }
  }, [reducerState?.flightBook?.flightTicketDataGDS?.data?.data?.Response]);
  // console.log(reducerState, "resucer state")

  // for going flight






  // for return flight

  // useEffect(async () => {
  //   if (
  //     reducerState?.flightBook?.flightBookDataReturn?.Error?.ErrorMessage === ""
  //   ) {
  //     setLoaderPayment(false);
  //     navigate("/bookedTicketWithReturn");
  //   } else if (
  //     reducerState?.flightBook?.flightBookDataReturn?.Error?.ErrorCode !== 0 &&
  //     reducerState?.flightBook?.flightBookDataReturn?.Error?.ErrorCode !== undefined
  //   ) {

  //     try {
  //       const token = SecureStorage.getItem("jwtToken");
  //       const payload = {
  //         "refund_amount": transactionAmount - (Number(fareValue?.Fare?.PublishedFare) + (Number(markUpamount) * Number(fareValue?.Fare?.PublishedFare))) ||
  //           (Number(fareValueReturn?.Fare?.PublishedFare) + (Number(markUpamount) * Number(fareValueReturn?.Fare?.PublishedFare))).toFixed(0),
  //         "txnId": refundTxnId,
  //       }

  //       const res = await axios({
  //         method: "POST",
  //         url: `${apiURL.baseURL}/skyTrails/api/transaction/refundPolicy`,
  //         data: payload,
  //         headers: {
  //           "Content-Type": "application/json",
  //           token: token,
  //         },
  //       });
  //     } catch (error) {
  //       console.warn(error);
  //     }

  //     swalModal(
  //       "flight",
  //       reducerState?.flightBook?.flightBookDataReturn?.Error?.ErrorMessage,
  //       false
  //     );
  //     navigate("/");
  //   }
  // }, [reducerState?.flightBook?.flightBookDataReturn?.Response]);


  useEffect(() => {
    const fetchData = async () => {
      if (
        reducerState?.flightBook?.flightBookDataReturn?.Error?.ErrorMessage === ""
      ) {
        couponconfirmation();
        setLoaderPayment(false);
        navigate("/bookedTicketWithReturn", { state: { finalamount: finalAmount } });
      } else if (
        reducerState?.flightBook?.flightBookDataReturn?.Error?.ErrorCode !== 0 &&
        reducerState?.flightBook?.flightBookDataReturn?.Error?.ErrorCode !== undefined
      ) {

        try {
          const token = SecureStorage.getItem("jwtToken");
          const payload = {
            "refund_amount":Number(finalAmount).toFixed(2),
            // "refund_amount": finalAmount - (Number(fareValue?.Fare?.PublishedFare) + (Number(markUpamount) * Number(fareValue?.Fare?.PublishedFare))) ||
            //   (Number(fareValueReturn?.Fare?.PublishedFare) + (Number(markUpamount) * Number(fareValueReturn?.Fare?.PublishedFare))).toFixed(0),
            // "refund_amount": 1,
            "txnId": refundTxnId,
          }

          const res = await axios({
            method: "POST",
            url: `${apiURL.baseURL}/skyTrails/api/transaction/refundPolicy`,
            data: payload,
            headers: {
              "Content-Type": "application/json",
              token: token,
            },
          });
        } catch (error) {
          console.warn(error);
        }

        swalModal(
          "flight",
          "Booking failed, your amount will be refunded within 72 hours.",
          // reducerState?.flightBook?.flightBookDataReturn?.Error?.ErrorMessage,
          false
        );
        navigate("/");
      }
    };

    fetchData(); // Call the async function

    // Cleanup function (if needed)
    const cleanup = () => {
      // Perform cleanup tasks here if needed
      // For example, unsubscribe from event listeners or clear timers
    };

    // Return cleanup function
    return cleanup;

  }, [reducerState?.flightBook?.flightBookDataReturn?.Response]);

  useEffect(() => {
    const fetchData = async () => {
      if (
        reducerState?.flightBook?.flightBookDataGDSReturn?.Error?.ErrorMessage === ""
      ) {
        couponconfirmation();
        setLoaderPayment(false);
        navigate("/bookedTicketWithReturn", { state: { finalamount: finalAmount } });
      } else if (
        reducerState?.flightBook?.flightBookDataGDSReturn?.Error?.ErrorCode !== 0 &&
        reducerState?.flightBook?.flightBookDataGDSReturn?.Error?.ErrorCode !== undefined
      ) {

        try {
          const token = SecureStorage.getItem("jwtToken");
          const payload = {
            // "refund_amount": finalAmount - (Number(fareValue?.Fare?.PublishedFare) + (Number(markUpamount) * Number(fareValue?.Fare?.PublishedFare))) ||
            //   (Number(fareValueReturn?.Fare?.PublishedFare) + (Number(markUpamount) * Number(fareValueReturn?.Fare?.PublishedFare))).toFixed(0),
            // "refund_amount": 1,
            "refund_amount":Number(finalAmount).toFixed(2),
            "txnId": refundTxnId,
          }

          const res = await axios({
            method: "POST",
            url: `${apiURL.baseURL}/skyTrails/api/transaction/refundPolicy`,
            data: payload,
            headers: {
              "Content-Type": "application/json",
              token: token,
            },
          });
        } catch (error) {
          console.warn(error);
        }

        swalModal(
          "flight",
          "Booking failed, your amount will be refunded within 72 hours.",
          // reducerState?.flightBook?.flightBookDataReturn?.Error?.ErrorMessage,
          false
        );
        navigate("/");
      }
    };

    fetchData(); // Call the async function

    // Cleanup function (if needed)
    const cleanup = () => {
      // Perform cleanup tasks here if needed
      // For example, unsubscribe from event listeners or clear timers
    };

    // Return cleanup function
    return cleanup;

  }, [reducerState?.flightBook?.flightBookDataGDSReturn?.Response]);

  useEffect(() => {
    if (
      reducerState?.flightFare?.flightQuoteDataReturn?.Error?.ErrorCode !== 0 &&
      reducerState?.flightFare?.flightQuoteDataReturn?.Error?.ErrorCode !==
      undefined
    ) {
      swalModal(
        "flight",
        reducerState?.flightFare?.flightQuoteDataReturn?.Error?.ErrorMessage,
        false
      );
      navigate("/");
    }
    else if (reducerState?.passengers?.passengerDataReturn.length === 0
    ) {
      navigate("/FlightresultReturn/Passengerdetail");
    }
  }, [reducerState?.flightFare?.flightQuoteDataReturn?.Error?.ErrorCode]);

  useEffect(() => {
    if (
      reducerState?.flightBook?.flightBookDataGDSReturn?.Error?.ErrorMessage ==
      "" &&
      !isDummyTicketBooking
    ) {
      getTicketForNonLCCReturn();
    } else if (
      reducerState?.flightBook?.flightBookDataGDSReturn?.Error?.ErrorMessage ==
      "" &&
      isDummyTicketBooking
    ) {
      couponconfirmation();
      setLoaderPayment(false);
      navigate("/bookedTicketWithReturn", { state: { finalamount: finalAmount } });
    } else if (
      reducerState?.flightBook?.flightBookDataGDSReturn?.Error?.ErrorCode !==
      0 &&
      reducerState?.flightBook?.flightBookDataGDSReturn?.Error?.ErrorCode !==
      undefined
    ) {
      swalModal(
        "flight",
        reducerState?.flightBook?.flightBookDataGDSReturn?.Error?.ErrorMessage,
        false
      );
      navigate("/");
    }
  }, [reducerState?.flightBook?.flightBookDataGDSReturn?.Response]);

  useEffect(() => {
    if (
      reducerState?.flightBook?.flightTicketDataGDSReturn?.data?.data?.Response
        ?.Error?.ErrorCode === 0 ||
      (reducerState?.flightBook?.flightTicketDataGDSReturn?.data?.data?.Response
        ?.Error?.ErrorCode !== 0 &&
        reducerState?.flightBook?.flightTicketDataGDSReturn?.data?.data
          ?.Response?.Error?.ErrorCode !== undefined)
    ) {
      couponconfirmation();
      setLoaderPayment(false);
      navigate("/bookedTicketWithReturn", { state: { finalamount: finalAmount } });
    }
  }, [
    reducerState?.flightBook?.flightTicketDataGDSReturn?.data?.data?.Response,
  ]);

  // for return flight

  // ticket apis

  const getTicketForNonLCC = () => {
    const payload = {
      EndUserIp: reducerState?.ip?.ipData,
      TokenId: reducerState?.ip?.tokenData,
      TraceId: reducerState?.oneWay?.oneWayData?.data?.data?.Response?.TraceId,
      PNR: reducerState?.flightBook?.flightBookDataGDS?.Response?.PNR,
      BookingId:
        reducerState?.flightBook?.flightBookDataGDS?.Response?.BookingId,
    };
    dispatch(bookTicketGDS(payload));
  };

  const getTicketForNonLCCReturn = () => {
    const payload = {
      EndUserIp: reducerState?.ip?.ipData,
      TokenId: reducerState?.ip?.tokenData,
      TraceId: reducerState?.oneWay?.oneWayData?.data?.data?.Response?.TraceId,
      PNR: reducerState?.flightBook?.flightBookDataGDSReturn?.Response?.PNR,
      BookingId:
        reducerState?.flightBook?.flightBookDataGDSReturn?.Response?.BookingId,
    };

    dispatch(bookTicketGDSReturn(payload));
  };

  const getTicketForLCC = () => {
    const payloadLcc = {
      ResultIndex: ResultIndexGoing,
      EndUserIp: reducerState?.ip?.ipData,
      TokenId: reducerState?.ip?.tokenData,
      TraceId: reducerState?.return?.returnData?.data?.data?.Response?.TraceId,
      Passengers: Passengers.map((item, index) => {
        return {
          ...item,
          Email: apiURL.flightEmail,
          // ContactNo: apiURL.phoneNo,
          ContactNo:Passengers[0].ContactNo,
          PassportExpiry: "",
        };
      }),
    };
    dispatch(bookAction(payloadLcc));
  };

  const getTicketForLCCReturn = () => {
    const payloadLccReturn = {
      ResultIndex: ResultIndexReturn,
      EndUserIp: reducerState?.ip?.ipData,
      TokenId: reducerState?.ip?.tokenData,
      TraceId: reducerState?.return?.returnData?.data?.data?.Response?.TraceId,
      Passengers: PassengersReturn.map((item, index) => {
        return {
          ...item,
          Email: apiURL.flightEmail,
          // ContactNo: apiURL.phoneNo,
          ContactNo: PassengersReturn[0].ContactNo,
          PassportExpiry: "",
        };
      }),
    };
    dispatch(bookActionReturn(payloadLccReturn));
  };

  // ticket apis

  // ********************** easebuzz payment gateway integration *************************
  // console.log(transactionAmount, "markup amount");

  const setTransactionAmountState = (e) => {
    setTransactionAmount(e);
  };

  const handlePayment = async () => {
    if (authenticUser !== 200) {
      setIsLoginModalOpen(true);
    }

    const token = SecureStorage?.getItem("jwtToken");
    // console.log(token, "token")
    setLoaderPayment1(true);
    const payload = {
      firstname: Passengers[0].FirstName,
      phone: Passengers[0].ContactNo,
      amount: 2,
      // amount:
      // Number(finalAmount).toFixed(2) ||
      //   (!isDummyTicketBooking
      //     ? 
      //     // Number(
      //     //   fareValue?.Fare?.PublishedFare +
      //     //   fareValueReturn?.Fare?.PublishedFare +
      //     //   markUpamount *
      //     //   (fareValue?.Fare?.PublishedFare +
      //     //     fareValueReturn?.Fare?.PublishedFare)
      //     // ).toFixed(0)
      //     Number( finalAmount).toFixed(2)
      //     : 99),


      // (!isDummyTicketBooking
      //     ? parseInt(
      //        ( reducerState?.flightFare?.flightQuoteData?.Results?.Fare
      //           ?.PublishedFare)+ ( reducerState?.flightFare?.flightQuoteDataReturn?.Results?.Fare
      //             ?.PublishedFare)
      //       ) +
      //       markUpamount *
      //         parseInt(
      //             ( reducerState?.flightFare?.flightQuoteData?.Results?.Fare
      //                 ?.PublishedFare)+ ( reducerState?.flightFare?.flightQuoteDataReturn?.Results?.Fare
      //                   ?.PublishedFare)
      //         )
      //     : 99),
      //   amount: 1,

      email: Passengers[0].Email,
      productinfo: "ticket",
      bookingType: "FLIGHTS",
      surl: `${apiURL.baseURL}/skyTrails/successVerifyApi?merchantTransactionId=`,
      furl: `${apiURL.baseURL}/skyTrails/paymentFailure?merchantTransactionId=`,
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
      } else {
        console.error("API call failed with status:", response.status);
        const errorData = await response.json();
        console.error("Error details:", errorData);
      }
    } catch (error) {
      console.error("API call failed with an exception:", error.message);
    } finally {
      setLoaderPayment1(false);
    }
  };

  const proceedPayment = (accessKey, env, key) => {
    const easebuzzCheckout = new window.EasebuzzCheckout(key, env);
    const options = {
      access_key: `${accessKey}`,
      onResponse: async (response) => {
        if (response.status === "success") {
          try {
            // Make API call if payment status is 'success'
            const easeBuzzPayId = response.easepayid;
            setRefundTxnId(response.easepayid)
            const verifyResponse = await axios.post(
              `${apiURL.baseURL}/skyTrails/api/transaction/paymentSuccess?merchantTransactionId=${response.txnid}`,
              { easeBuzzPayId: easeBuzzPayId }
            );
            setLoaderPayment(true);
            dispatch(PassengersAction(Passengers));
          } catch (error) {
            console.error("Error verifying payment:", error);
          }
          // if (sessionStorage.getItem("couponCode")) {
          //   couponconfirmation();
          // }
        } else {
          try {
            // Make API call if payment status is 'success'
            const verifyResponse = await axios.post(
              `${apiURL.baseURL}/skyTrails/api/transaction/paymentFailure?merchantTransactionId=${response.txnid}`
            );

            // swalModal("py", verifyResponse.data.responseMessage, false);
            swalModal("py", "Transaction Cancelled", false);

            setTransactionAmount(null);
            sessionStorage.removeItem("couponCode");
            // setTimer11(false);

            setToggle(false);
          } catch (error) {
            console.error("Error verifying payment:", error);
            // Handle error
          }
        }
      },
      theme: "#123456", // Replace with your desired color hex
    };

    // Initiate payment on button click
    easebuzzCheckout.initiatePayment(options);
  };

  // ********************** easebuzz payment gateway integration *************************

  const handleGoingFlight = () => {
    const payloadGDS = {
      ResultIndex: ResultIndexGoing,
      Passengers: Passengers.map((item, index) => {
        return {
          ...item,
          PassportExpiry: "",
          Email: apiURL.flightEmail,
          // ContactNo: apiURL.phoneNo,
            ContactNo:Passengers[0]?.ContactNo,
        };
      }),
      EndUserIp: reducerState?.ip?.ipData,
      TokenId: reducerState?.ip?.tokenData,
      TraceId: reducerState?.return?.returnData?.data?.data?.Response?.TraceId,
    };

    if (fareValue?.IsLCC == false) {
      dispatch(bookActionGDS(payloadGDS));
    } else if (fareValue?.IsLCC == true) {
      getTicketForLCC();
    }
  };

  const handleReturnFlight = () => {
    const payloadGDS = {
      ResultIndex: ResultIndexReturn,
      Passengers: Passengers.map((item, index) => {
        return {
          ...item,
          PassportExpiry: "",
          Email: apiURL.flightEmail,
          // ContactNo: apiURL.phoneNo,
          ContactNo: Passengers[0]?.ContactNo,
        };
      }),
      EndUserIp: reducerState?.ip?.ipData,
      TokenId: reducerState?.ip?.tokenData,
      TraceId: reducerState?.return?.returnData?.data?.data?.Response?.TraceId,
      PassportExpiry: "",
    };

    if (fareValue?.IsLCC == false) {
      dispatch(bookActionGDSReturn(payloadGDS));
    } else if (fareValue?.IsLCC == true) {
      getTicketForLCCReturn();
    }
  };

  // console.log(reducerState, "reducer state");

  // going flight error

  useEffect(() => {
    if (
      reducerState?.flightFare?.flightQuoteData?.Error?.ErrorCode !== 0 &&
      reducerState?.flightFare?.flightQuoteData?.Error?.ErrorCode !== undefined
    ) {
      setErrorMassage({
        error: true,
        Message: reducerState?.flightFare?.flightQuoteData?.Error?.ErrorMessage,
      });
      return;
    }
    if (
      reducerState?.flightFare?.flightRuleData?.Error?.ErrorCode !== 0 &&
      reducerState?.flightFare?.flightRuleData?.Error?.ErrorCode !== undefined
    ) {
      setErrorMassage({
        error: true,
        Message: reducerState?.flightFare?.flightRuleData?.Error?.ErrorCode,
      });
    }
  });

  // going flight error

  // return flight error

  useEffect(() => {
    if (
      reducerState?.flightFare?.flightQuoteDataReturn?.Error?.ErrorCode !== 0 &&
      reducerState?.flightFare?.flightQuoteDataReturn?.Error?.ErrorCode !==
      undefined
    ) {
      setErrorMassage({
        error: true,
        Message:
          reducerState?.flightFare?.flightQuoteDataReturn?.Error?.ErrorMessage,
      });
      return;
    }
    if (
      reducerState?.flightFare?.flightRuleDataReturn?.Error?.ErrorCode !== 0 &&
      reducerState?.flightFare?.flightRuleDataReturn?.Error?.ErrorCode !==
      undefined
    ) {
      setErrorMassage({
        error: true,
        Message:
          reducerState?.flightFare?.flightRuleDataReturn?.Error?.ErrorCode,
      });
    }
  });

  if (!flightDeparture) {
    return (
      <div></div>
    )
  }
  // return flight error

  return (
    <div>
      <div className="mainimgFlightSearch">
      </div>
      <div className="container px-0 pt-4">
        <div className="row">
          <div className="col-lg-9 ">
            <div className="row">
              {/* for departure  */}

              <div className="col-lg-12 mb-3">
                <div className="booknowFlight">
                  <div className="bookaboveBox">
                    <div>
                      <p className="text-center">Departure</p>
                      <h4 className="flex items-center gap-2 lg:text-xxl  font-bold">
                        {flightDeparture?.[0][0]?.Origin?.Airport?.CityName}
                        <FiArrowRight style={{ margin: "5px" }} />{" "}
                        {
                          flightDeparture[0][flightDeparture[0].length - 1]
                            ?.Destination?.Airport?.CityName
                        }
                      </h4>
                      <div className="aboveSpan">
                        <span className="aboveSOne">
                          {dayjs(flightDeparture[0][0]?.Origin?.DepTime).format(
                            "DD MMM, YY"
                          )}
                        </span>
                        <span>
                          {flightDeparture[0].length > 1
                            ? `${flightDeparture[0].length - 1} stop via ${flightDeparture[0][0]?.Destination?.Airport
                              ?.CityName
                            }`
                            : "Non Stop"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {flightDeparture[0]?.map((item, index) => {
                    const nextFlight = flightDeparture[0][index + 1];
                    let layoverHours = 0;
                    let layoverMinutes = 0;
                    let layoverDuration = 0;

                    if (nextFlight) {
                      const arrivalTime = dayjs(item?.Destination?.ArrTime);
                      const departureTime = dayjs(nextFlight?.Origin?.DepTime);
                      layoverDuration = departureTime.diff(arrivalTime, 'minutes'); // Calculate difference in minutes
                      layoverHours = Math.floor(layoverDuration / 60); // Extract hours
                      layoverMinutes = layoverDuration % 60;
                    }
                    return (
                      <>
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

                        <div className="bookbottomBox">
                          <div>
                            <div className="bookBottomOne">
                              <p>
                                {dayjs(item?.Origin?.DepTime).format("h:mm A")}
                              </p>
                              <p>
                                {dayjs(item?.Destination?.ArrTime).format(
                                  "h:mm A"
                                )}
                              </p>
                            </div>
                            <div className="bookBottomTwo">
                              <img src={fromTo} alt="icon" />
                            </div>
                            <div className="bookBottomThree">
                              <p>
                                {item?.Origin?.Airport?.CityName}{" "}
                                <span>
                                  {item?.Origin?.Airport?.AirportName?.slice(
                                    0,
                                    26
                                  )}{" "}
                                  Terminal-
                                  {item?.Origin?.Airport?.Terminal
                                    ? item?.Origin?.Airport?.Terminal
                                    : "X"}
                                </span>
                              </p>
                              <p>
                                {item?.Destination?.Airport?.CityName}{" "}
                                <span>
                                  {item?.Destination?.Airport?.AirportName?.slice(
                                    0,
                                    26
                                  )}{" "}
                                  Terminal-
                                  {item?.Destination?.Airport?.Terminal
                                    ? item?.Destination?.Airport?.Terminal
                                    : "Y"}
                                </span>
                              </p>
                            </div>
                          </div>

                          <div className="bookBottomFour">
                            <div>
                              <p>Baggage</p>
                              <span>ADULT</span>
                            </div>
                            <div>
                              <p>Check-in</p>
                              <span>
                                {flightDeparture[0][0]?.Baggage.split(" ")[0]}{" "}

                              </span>
                            </div>
                            <div>
                              <p>Cabin</p>
                              <span>
                                {
                                  flightDeparture[0][0]?.CabinBaggage.split(
                                    " "
                                  )[0]
                                }{" "}

                              </span>
                            </div>
                          </div>
                        </div>
                        <div>
                          {(layoverDuration !== 0) && (
                            <p className="text-bold">Layover Time: {layoverHours !== 0 && `${layoverHours} hours`} {layoverMinutes !== 0 && `${layoverMinutes} minutes`}</p>

                          )}
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>

              {/* for departure  */}

              {/* for return  */}

              <div className="col-lg-12">
                <div className="booknowFlight">
                  <div className="bookaboveBox">
                    <div>
                      <p className="text-center">Return</p>
                      <h4 className="flex items-center gap-2  lg:text-xxl  font-bold">
                        {flightReturn?.[0]?.[0]?.Origin?.Airport?.CityName}
                        <FiArrowRight style={{ margin: "5px" }} />{" "}
                        {
                          flightReturn?.[0][flightReturn?.[0].length - 1]
                            ?.Destination?.Airport?.CityName
                        }
                      </h4>
                      <div className="aboveSpan">
                        <span className="aboveSOne">
                          {dayjs(flightReturn?.[0][0]?.Origin?.DepTime).format(
                            "DD MMM, YY"
                          )}
                        </span>
                        <span>
                          {/* {`${flightReturn[0].length -1} stop via ${flightReturn[0][0]?.Destination?.Airport?.CityName}`}{" "} */}
                          {flightReturn?.[0].length > 1
                            ? `${flightReturn?.[0].length - 1} stop via ${flightReturn?.[0][0]?.Destination?.Airport
                              ?.CityName
                            }`
                            : "Non Stop"}
                          {/* {duration} */}
                        </span>
                      </div>
                    </div>
                  </div>
                  {flightReturn?.[0]?.map((item, index) => {
                    const nextFlight = flightReturn?.[0][index + 1];
                    let layoverHours = 0;
                    let layoverMinutes = 0;
                    let layoverDuration = 0;

                    if (nextFlight) {
                      const arrivalTime = dayjs(item?.Destination?.ArrTime);
                      const departureTime = dayjs(nextFlight?.Origin?.DepTime);
                      layoverDuration = departureTime.diff(arrivalTime, 'minutes'); // Calculate difference in minutes
                      layoverHours = Math.floor(layoverDuration / 60); // Extract hours
                      layoverMinutes = layoverDuration % 60;
                    }
                    return (
                      <>
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

                        <div className="bookbottomBox">
                          <div>
                            <div className="bookBottomOne">
                              <p>
                                {dayjs(item?.Origin?.DepTime).format("h:mm A")}
                              </p>
                              <p>
                                {dayjs(item?.Destination?.ArrTime).format(
                                  "h:mm A"
                                )}
                              </p>
                            </div>
                            <div className="bookBottomTwo">
                              <img src={fromTo} alt="icon" />
                            </div>
                            <div className="bookBottomThree">
                              <p>
                                {item?.Origin?.Airport?.CityName}{" "}
                                <span>
                                  {item?.Origin?.Airport?.AirportName?.slice(
                                    0,
                                    26
                                  )}{" "}
                                  Terminal-
                                  {item?.Origin?.Airport?.Terminal
                                    ? item?.Origin?.Airport?.Terminal
                                    : "X"}
                                </span>
                              </p>
                              <p>
                                {item?.Destination?.Airport?.CityName}{" "}
                                <span>
                                  {item?.Destination?.Airport?.AirportName?.slice(
                                    0,
                                    26
                                  )}{" "}
                                  Terminal-
                                  {item?.Destination?.Airport?.Terminal
                                    ? item?.Destination?.Airport?.Terminal
                                    : "Y"}
                                </span>
                              </p>
                            </div>
                          </div>

                          <div className="bookBottomFour">
                            <div>
                              <p>Baggage</p>
                              <span>ADULT</span>
                            </div>
                            <div>
                              <p>Check-in</p>
                              <span>
                                {flightDeparture?.[0][0]?.Baggage.split(" ")[0]}{" "}

                              </span>
                            </div>
                            <div>
                              <p>Cabin</p>
                              <span>
                                {
                                  flightDeparture?.[0][0]?.CabinBaggage.split(
                                    " "
                                  )[0]
                                }{" "}

                              </span>
                            </div>
                          </div>
                        </div>
                        <div>
                          {(layoverDuration !== 0) && (
                            <p className="text-bold">Layover Time: {layoverHours !== 0 && `${layoverHours} hours`} {layoverMinutes !== 0 && `${layoverMinutes} minutes`}</p>

                          )}
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>

              <div className="col-lg-12 accor_dian mt-4">
                {fareRule &&
                  fareRule.length > 0 &&

                  <div my={2}>
                    <Accordion
                      defaultActiveKey={null}
                    >
                      <Accordion.Item>
                        <Accordion.Header>
                          <p>Detailed Fare Rules and Cancellation Policy</p>
                        </Accordion.Header>
                        <Accordion.Body>
                          <div className="htmlFare"
                            dangerouslySetInnerHTML={{
                              __html: fareRule[0]?.FareRuleDetail,
                            }}
                          />
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </div>

                }
              </div>
              <div className="col-lg-12 my-3">
                <div className="bg-white border border-gray-200 p-4 rounded-md">
                {Passengers?.map((passenger, key) => {
                  return (
                    <>
                      <div style={{ marginBottom: "15px" }}>
                        <p className="font-medium text-lg">
                          Passenger {key + 1}{" "}
                          <span
                            style={{
                              color: "black",
                              fontSize: 16,
                              fontFamily: "Montserrat",
                              fontWeight: "500",
                              wordWrap: "break-word",
                            }}
                          >
                            (
                            {passenger.PaxType === 1
                              ? "Adult"
                              : passenger.PaxType === 2
                                ? "Child"
                                : "Infant"}
                            )
                          </span>
                        </p>
                      </div>

                      <div key={key} className="flex align-middle items-center gap-5">
                        <div>
                          <p>Name:</p>
                          <p>Gender</p>
                          {passenger.Email && <p>Email:</p>}
                        </div>
                        <div>
                          <p>
                            {passenger.Title} {passenger.FirstName}{" "}
                            {passenger.LastName}
                          </p>
                          <p>
                            {passenger.Gender === "1"
                              ? "Male"
                              : "Female"
                            }
                          </p>
                          <p>{passenger.Email}</p>
                        </div>
                      </div>
                    </>
                  );
                })}
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-3">
            <ReturnSummaryWithCoupon
              toggle={toggle}
              oncouponselect={handlecouponChange}
              onFinalAmountChange={handleFinalAmountChange}
              toggleState={toggleState}
              transactionAmount={setTransactionAmountState}
              Amount={transactionAmount}
            />
          </div>
        </div>
        <div className="col-lg-12 my-4 smallButtMobile">
          <button
            className="bookWrapperButton"
            type="submit"
            onClick={() => handlePayment()}
          >
            Continue
          </button>
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
                          <img src={loginnew} alt="loginnew" />
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
    </div>
  );
};

export default ReturnReviewBooking;
