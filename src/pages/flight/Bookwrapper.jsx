import React, { useEffect, useState } from "react";
import { apiURL } from "../../Constants/constant";
import "./bookwrapper.css";
import FlightLoader from "./FlightLoader/FlightLoader";
import fromTo from "../../images/fromTo.png";
import "bootstrap/dist/css/bootstrap.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
// import DatePicker from "react-datepicker";
import Login from "../../components/Login";
import InsideNavbar from "../../UI/BigNavbar/InsideNavbar";
import { motion } from "framer-motion";
import {
  bookActionGDS,
  bookAction,
  bookTicketGDS,
} from "../../Redux/FlightBook/actionFlightBook";
import { FiArrowRight } from "react-icons/fi";
// import TripSecureComponent from "./TripSecureComponent";
import {
  quoteAction,
  resetFareData,
  ruleAction,
} from "../../Redux/FlightFareQuoteRule/actionFlightQuote";
import "./booknow.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { PassengersAction } from "../../Redux/Passengers/passenger";
import BookNowLeft from "./BookNowLeft";
// razorpay intergration
// import useRazorpay from "react-razorpay";
import PaymentLoader from "./FlightLoader/paymentLoader";
import Flighterror from "./Flighterror";
// import Swal from "sweetalert2";
import axios from "axios";
import dayjs from "dayjs";
// import Login from "./Login"
import Modal from "@mui/material/Modal";

import loginnew from "../../images/login-01.jpg"

// import CloseIcon from '@mui/icons-material/Close';
// import { validateEmail, validateName, validatePhoneNumber, isValidPassportNumber } from "../../utility/validationFunctions";
import { swalModal } from "../../utility/swal"
// import loginGif from "../images/loginGif.gif"
// import loginGif from "../../images/loginGif.gif";
import CloseIcon from "@mui/icons-material/Close";
import {
  validateEmail,
  validateName,
  validatePhoneNumber,
  isValidPassportNumber,
} from "../../utility/validationFunctions";


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

export default function BookWrapper() {
  const [openTravelModal, setOpenTravelModal] = React.useState(false);
  const [transactionAmount, setTransactionAmount] = useState(null);

  const handleTravelClickOpen = () => {
    if (authenticUser !== 200) {
      setIsLoginModalOpen(true);
    } else {
      setOpenTravelModal(true);
    }
  };

  // //////////////////////coupon api//////////////
  const couponconfirmation = async () => {
    try {
      const token = sessionStorage.getItem("jwtToken");
      const response = await axios.get(
        `${
          apiURL.baseURL
        }/skyTrails/api/coupons/couponApplied/${sessionStorage.getItem(
          "couponCode"
        )}`,

        {
          headers: {
            token: token,
          },
        }
      );
      // sessionStorage.removeItem("flightcoupon");
      // sessionStorage.removeItem("couponCode");
    } catch (error) {
      // console.log(error);
    }
  };

  const handleTravelClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpenTravelModal(false);
      // setToggle(false);
      // sessionStorage.removeItem("couponCode");
    }
  };

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const adultCount = queryParams.get("adult");
  const childCount = queryParams.get("child");
  const infantCount = queryParams.get("infant");
  const reducerState = useSelector((state) => state);
  const isDummyTicketBooking = JSON.parse(
    sessionStorage.getItem("hdhhfb7383__3u8748")
  );
  const [email, setEmail] = useState("");
  const [cNumber, setCnumber] = useState("");
  const [farePrice, setFarePrice] = useState("");
  const [toggle, setToggle] = useState(false);
  const [V_aliation, setValidation] = useState(false);
  const [loaderPayment, setLoaderPayment] = useState(false);
  const [errorMessage, setErrorMassage] = useState({
    error: false,
    Message: "",
  });
  const [sub, setSub] = useState(false);
  const toggleState = (e) => {
    setToggle(e);
    // console.warn("toggling state", e);
    // console.log("Ammount ////", transactionAmount);
  };
  const setTransactionAmountState = (e) => {
    setTransactionAmount(e);
    // console.log("setTransactionAmountState");
  };
  const handleClickButton = () => {
    // console.log("Button clicked!");
  };

  const TicketDetails = reducerState?.flightFare?.flightQuoteData?.Results;
  const cancellationPolicy =
    reducerState?.flightFare?.flightQuoteData?.Results?.MiniFareRules?.[0];
  const detailsOfCancel = cancellationPolicy?.filter(
    (rule) => rule.Type === "Cancellation"
  );

  const fareValue = reducerState?.flightFare?.flightQuoteData?.Results;
  const ResultIndex = sessionStorage.getItem("ResultIndex");
  const markUpamount =
    reducerState?.markup?.markUpData?.data?.result[0]?.flightMarkup;
  // const [paymentResponse, setPaymentResponse] = useState("");
  const isPassportRequired =
    reducerState?.flightFare?.flightQuoteData?.Results
      ?.IsPassportRequiredAtTicket;
  // const results =
  //   reducerState?.oneWay?.oneWayData?.data?.data?.Response?.Results;
  const apiUrlPayment = `${apiURL.baseURL}/skyTrails/api/transaction/easebussPayment`;

  const payload = {
    EndUserIp: reducerState?.ip?.ipData,
    TokenId: reducerState?.ip?.tokenData,
    TraceId: reducerState?.oneWay?.oneWayData?.data?.data?.Response?.TraceId,
    ResultIndex: ResultIndex,
  };
  // const [accordionExpanded, setAccordionExpanded] = React.useState(false);

  // const handleAccordionChange = (index) => (event, isExpanded) => {
  //   setAccordionExpanded(isExpanded ? index : false);
  // };
  useEffect(() => {
    dispatch(ruleAction(payload));
    dispatch(quoteAction(payload));
  }, []);

  useEffect(() => {
    dispatch(resetFareData());
  }, [dispatch]);

  // const [expanded, setExpanded] = React.useState("panel1");

  // const handleChange = (panel) => (event, newExpanded) => {
  //   setExpanded(newExpanded ? panel : false);
  // };

  // const [value, setValue] = React.useState("1");
  // console.log("reducerState", reducerState);

  // Add form of passenger
  const passengerTemplate = {
    Title: "Mr",
    FirstName: "",
    LastName: "",
    PaxType: 1,
    DateOfBirth: "",
    Gender: 1,
    PassportNo: "",
    PassportExpiry: "",
    AddressLine1: "test",
    AddressLine2: "test2",
    Fare: farePrice,
    City: "gurgaon",
    CountryCode: "IN",
    CellCountryCode: "+91-",
    ContactNo: cNumber,
    Nationality: "",
    Email: email,
    IsLeadPax: true,
    FFAirlineCode: null,
    FFNumber: "",
    GSTCompanyAddress: "",
    GSTCompanyContactNumber: "",
    GSTCompanyName: "",
    GSTNumber: "",
    GSTCompanyEmail: "",
  };
  const childPassenger = {
    Title: "Mr",
    FirstName: "",
    LastName: "",
    PaxType: 2,
    DateOfBirth: "",
    Gender: 1,
    PassportNo: "",
    PassportExpiry: "",
    Fare: farePrice,
    IsLeadPax: false,
    FFAirlineCode: null,
    FFNumber: "",
  };
  const infantPassenger = {
    Title: "Mr",
    FirstName: "",
    LastName: "",
    PaxType: 3,
    DateOfBirth: "",
    Gender: 1,
    PassportNo: "",
    PassportExpiry: "",
    Fare: farePrice,
    IsLeadPax: false,
    FFAirlineCode: null,
    FFNumber: "",
  };

  // Initialize the passenger list with the required number of passengers
  let totalPassenger =
    Number(adultCount) + Number(childCount) + Number(infantCount);
  const passengerLists = [];
  const passengerChildLists = [];
  const passengerInfantLists = [];

  useEffect(() => {
    if (fareValue) {
      let fareDetails = fareValue?.Fare;
      let fareBreakdown = fareValue?.FareBreakdown;
      // console.log("fareDetails: ", fareDetails);
      let arr = [];
      fareBreakdown.map((price, key) => {
        let obj1 = {
          Currency: price?.Currency,
          BaseFare: price?.BaseFare / price?.PassengerCount,
          Tax: price?.Tax / price?.PassengerCount,
          YQTax: price?.YQTax / price?.PassengerCount,
          AdditionalTxnFeePub:
            price?.AdditionalTxnFeePub / price?.PassengerCount,
          AdditionalTxnFeeOfrd:
            price?.AdditionalTxnFeeOfrd / price?.PassengerCount,
        };
        arr.push(obj1);
        // console.log(arr[1]);
        setFarePrice(arr);
      });
    }
  }, [fareValue]);

  useEffect(() => {
    if (loaderPayment == true) {
      handleButtonClick();
    }
  }, [loaderPayment]);

  useEffect(() => {
    if (reducerState?.flightBook?.flightBookData?.Error?.ErrorMessage === "") {
      setLoaderPayment(false);
      navigate("/bookedTicket");
      // sessionStorage.removeItem("flightcoupon");
      // sessionStorage.removeItem("couponCode");
    } else if (
      reducerState?.flightBook?.flightBookData?.Error?.ErrorCode !== 0 &&
      reducerState?.flightBook?.flightBookData?.Error?.ErrorCode !== undefined
    ) {
      swalModal("flight", reducerState?.flightBook?.flightBookData?.Error?.ErrorMessage, false)
      // Swal.fire({
      //   icon: "error",
      //   title: "Oops",
      //   text: reducerState?.flightBook?.flightBookData?.Error?.ErrorMessage,

      //   showClass: {
      //     popup: `
      //       animate__animated
      //       animate__fadeInUp
      //       animate__faster
      //     `,
      //   },
      //   hideClass: {
      //     popup: `
      //       animate__animated
      //       animate__fadeOutDown
      //       animate__faster
      //     `,
      //   },
      // });
      navigate("/");
      // sessionStorage.removeItem("flightcoupon");
      // sessionStorage.removeItem("couponCode");
    }
  }, [reducerState?.flightBook?.flightBookData?.Response]);
  useEffect(() => {
    if (
      reducerState?.flightFare?.flightQuoteData?.Error?.ErrorCode !== 0 &&
      reducerState?.flightFare?.flightQuoteData?.Error?.ErrorCode !== undefined
    ) {
      swalModal("flight", reducerState?.flightFare?.flightQuoteData?.Error?.ErrorMessage, false)
      // Swal.fire({
      //   icon: "error",
      //   title: "Oops",
      //   text: reducerState?.flightFare?.flightQuoteData?.Error?.ErrorMessage,

      //   showClass: {
      //     popup: `
      //       animate__animated
      //       animate__fadeInUp
      //       animate__faster
      //     `,
      //   },
      //   hideClass: {
      //     popup: `
      //       animate__animated
      //       animate__fadeOutDown
      //       animate__faster
      //     `,
      //   },
      // });
      navigate("/");
      // sessionStorage.removeItem("flightcoupon");
      // sessionStorage.removeItem("couponCode");
    }
  }, [reducerState?.flightFare?.flightQuoteData?.Error?.ErrorCode]);

  useEffect(() => {
    if (
      reducerState?.flightBook?.flightBookDataGDS?.Error?.ErrorMessage == "" &&
      !isDummyTicketBooking
    ) {
      getTicketForNonLCC();
    } 
    else if (
      reducerState?.flightBook?.flightBookDataGDS?.Error?.ErrorMessage == "" &&
      isDummyTicketBooking
    ) {
      setLoaderPayment(false);
      navigate("/bookedTicket");
      // sessionStorage.removeItem("flightcoupon");
      // sessionStorage.removeItem("couponCode");
    } else if (
      reducerState?.flightBook?.flightBookDataGDS?.Error?.ErrorCode !== 0 &&
      reducerState?.flightBook?.flightBookDataGDS?.Error?.ErrorCode !==
        undefined
    ) {
      swalModal("flight", reducerState?.flightBook?.flightBookDataGDS?.Error?.ErrorMessage, false)
      // Swal.fire({
      //   icon: "error",
      //   title: "Oops",
      //   text: reducerState?.flightBook?.flightBookDataGDS?.Error?.ErrorMessage,
      //   // timer: 3000,

      //   showClass: {
      //     popup: `
      //       animate__animated
      //       animate__fadeInUp
      //       animate__faster
      //     `,
      //   },
      //   hideClass: {
      //     popup: `
      //       animate__animated
      //       animate__fadeOutDown
      //       animate__faster
      //     `,
      //   },
      // });
      navigate("/");
      // sessionStorage.removeItem("flightcoupon");
      // sessionStorage.removeItem("couponCode");
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
      setLoaderPayment(false);
      navigate("/bookedTicket");
    }
  }, [reducerState?.flightBook?.flightTicketDataGDS?.data?.data?.Response]);

  for (let i = 0; i < adultCount; i++) {
    passengerLists.push({
      ...passengerTemplate,
      IsLeadPax: i === 0, // Set the first passenger as the lead passenger
    });
  }

  for (let i = 0; i < childCount; i++) {
    passengerChildLists.push({
      ...childPassenger,
      IsLeadPax: false, // Set the first passenger as the lead passenger
    });
  }
  for (let i = 0; i < infantCount; i++) {
    passengerInfantLists.push({
      ...infantPassenger,
      IsLeadPax: false, // Set the first passenger as the lead passenger
    });
  }

  // Set the initial state of the passenger list
  const [passengerList, setPassengerList] = useState(passengerLists);
  const allPassenger = [
    passengerLists,
    passengerChildLists,
    passengerInfantLists,
  ];
  const [passengerData, setPassengerData] = useState(allPassenger.flat());
  const handleServiceChange = (e, i) => {
    const { name, value } = e.target;
    const list = [...passengerData];
    if (i < adultCount) {
      if (!list[i]["Fare"]) {
        list[i]["Fare"] = farePrice[0];
      }
    }
    if (i >= adultCount && i < +adultCount + +childCount) {
      if (!list[i]["Fare"]) {
        list[i]["Fare"] = farePrice[1];
      }
    } else {
      if (!list[i]["Fare"]) {
        list[i]["Fare"] = farePrice[2];
      }
    }
    list[i][name] = value;
    setPassengerData(list);
    // console.warn(passengerData, "passenger data");
  };

  // console.log(passengerData, "passenger Data");

  // duration
  const totalMinutes = TicketDetails?.Segments[0][0]?.Duration;
  const durationHours = Math.floor(totalMinutes / 60);
  const durationMinutes = totalMinutes % 60;
  const duration_Time = `${durationHours} Hours and ${durationMinutes} minutes`;
  const authenticUser = reducerState?.logIn?.loginData?.status;
  // const notAuthenticUser = reducerState?.logIn?.loginData?.userNotFound;

  // razorpay integration part

  // const [Razorpay, isLoaded] = useRazorpay();

  // const handlePayment = useCallback(async () => {
  //   try {
  //     // Implement createOrder to create an order on your backend
  //     // const order = await createOrder(params);

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
  //           dispatch(PassengersAction(passengerData));
  //         } else {
  //           // Handle payment failure
  //           console.log("Payment failed");
  //         }
  //       },
  //       notes: {
  //         address: "Razorpay Corpora te Office",
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

  const handlePayment = async () => {
    const token = sessionStorage?.getItem("jwtToken");
    const payload = {
      firstname: passengerData[0].FirstName,
      phone: passengerData[0].ContactNo,
      amount:

        transactionAmount ||
        (!isDummyTicketBooking
          ? parseInt(
              reducerState?.flightFare?.flightQuoteData?.Results?.Fare
                ?.PublishedFare
            ) + parseInt(markUpamount)
          : 99),
      // amount: 1,


      email: passengerData[0].Email,
      productinfo: "ticket",
      bookingType: "FLIGHTS",
      surl: `${apiURL.baseURL}/skyTrails/successVerifyApi?merchantTransactionId=`,
      furl: `${apiURL.baseURL}/skyTrails/paymentFailure?merchantTransactionId=`,
    };

    // setToggle(false);
    handleTravelClose();

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
        console.error("API call failed with status:", response.status);
        const errorData = await response.json();
        console.error("Error details:", errorData);

      }
    } catch (error) {
      // Handle network errors or exceptions
      console.error("API call failed with an exception:", error.message);
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
            dispatch(PassengersAction(passengerData));
          } catch (error) {
            console.error("Error verifying payment:", error);
            // Handle error
          }
          if (sessionStorage.getItem("couponCode")) {
            couponconfirmation();
          }
          // sessionStorage.removeItem("flightcoupon");
          // sessionStorage.removeItem("couponCode");
        } else {
          try {
            // Make API call if payment status is 'success'
            const verifyResponse = await axios.post(
              `${apiURL.baseURL}/skyTrails/api/transaction/paymentFailure?merchantTransactionId=${response.txnid}`
            );
            // console.log(verifyResponse.data);
            swalModal("py", verifyResponse.data.responseMessage, false)
            // Handle verifyResponse as needed
          setTransactionAmount(null);
            sessionStorage.removeItem("couponCode");
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

  const handleButtonClick = () => {
    const payloadGDS = {
      ResultIndex: ResultIndex,
      Passengers: passengerData.map((item, index) => {
        return {
          ...item,
          PassportExpiry: isPassportRequired ? convertDateFormat(item?.PassportExpiry) : "",
          Email: apiURL.flightEmail,
          ContactNo: apiURL.phoneNo,
        };
      }),
      EndUserIp: reducerState?.ip?.ipData,
      TokenId: reducerState?.ip?.tokenData,
      TraceId: reducerState?.oneWay?.oneWayData?.data?.data?.Response?.TraceId,
    };

    if (fareValue?.IsLCC == false) {
      dispatch(bookActionGDS(payloadGDS));
    } else if (fareValue?.IsLCC == true) {
      getTicketForLCC();
    }
  };

  useEffect(() => {
    // console.warn(reducerState, "reducer state");
    if (
      reducerState?.flightFare?.flightQuoteData?.Error?.ErrorCode !== 0 &&
      reducerState?.flightFare?.flightQuoteData?.Error?.ErrorCode !== undefined
    ) {
      // navigate(`/flighterror?${reducerState?.flightFare?.flightQuoteData?.Error?.ErrorMessage}`);
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
      // navigate(`/flighterror?${reducerState?.flightFare?.flightRuleData?.Error?.ErrorMessage}`);
      setErrorMassage({
        error: true,
        Message: reducerState?.flightFare?.flightRuleData?.Error?.ErrorCode,
      });
    }
  });
  function convertDateFormat(inputDate) {
    // Split the input date string into year, month, and day
    const [year, month, day] = inputDate.split("-");

    // Create a new Date object using the components
    const newDate = new Date(year, month - 1, day);

    // Format the output date string as "yyyy-mm-ddTHH:mm:ss"
    const outputDate = newDate.toISOString().slice(0, 19).replace("T", "T00:00:00");
    // console.log(outputDate, "outputdate")

    return outputDate;
  }

  const getTicketForLCC = () => {
    const payloadLcc = {
      ResultIndex: ResultIndex,
      EndUserIp: reducerState?.ip?.ipData,
      TokenId: reducerState?.ip?.tokenData,
      TraceId:
        reducerState?.oneWay?.oneWayData?.data?.data?.Response?.TraceId ||
        reducerState?.return?.returnData?.data?.data?.Response?.TraceId,
      Passengers: passengerData.map((item, index) => {
        return {
          ...item,
          PassportExpiry: isPassportRequired ? convertDateFormat(item?.PassportExpiry) : "",
          Email: apiURL.flightEmail,
          ContactNo: apiURL.phoneNo,
        };
      }),
    };
    dispatch(bookAction(payloadLcc));
  };

  const getTicketForNonLCC = () => {
    const payLoadDomestic = {
      EndUserIp: reducerState?.ip?.ipData,
      TokenId: reducerState?.ip?.tokenData,
      TraceId: reducerState?.oneWay?.oneWayData?.data?.data?.Response?.TraceId,
      PNR: reducerState?.flightBook?.flightBookDataGDS?.Response?.PNR,
      BookingId:
        reducerState?.flightBook?.flightBookDataGDS?.Response?.BookingId,
    };
    const payLoadInternational = {
      EndUserIp: reducerState?.ip?.ipData,
      TokenId: reducerState?.ip?.tokenData,
      TraceId: reducerState?.oneWay?.oneWayData?.data?.data?.Response?.TraceId,
      PNR: reducerState?.flightBook?.flightBookDataGDS?.Response?.PNR,
      BookingId:
        reducerState?.flightBook?.flightBookDataGDS?.Response?.BookingId,
      Passengers: passengerData.map((item, index) => {
        return {
          ...item,
          Email: apiURL.flightEmail,
          ContactNo: apiURL.phoneNo,
        };
      }),
    };
    // console.warn(payLoadInternational, "payload international")
    if (isPassportRequired) {
      dispatch(bookTicketGDS(payLoadInternational));
    } else {
      dispatch(bookTicketGDS(payLoadDomestic));
    }
  };

  // formatted time of flights

  const duration = `${Math.floor(
    TicketDetails?.Segments[0][0]?.Duration / 60
  )}hr ${TicketDetails?.Segments[0][0]?.Duration % 60}min`;

  // check login and authentication when booking

  // const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleModalClose = () => {
    setIsLoginModalOpen(false)
  }

  useEffect(() => {
    if (authenticUser == 200) {
      handleModalClose();
    }
  }, [authenticUser])

  // check login and authentication when booking
  // function validatePhoneNumber(phoneNumber) {
  //   // Define the regular expression pattern for a valid phone number
  //   var phonePattern = /^\d{10}$/;

  //   // Test the phone number against the pattern
  //   return phonePattern.test(phoneNumber);
  // }
  // function validateEmail(email) {
  //   // Define the regular expression pattern for a valid phone number
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  //   // Test the phone number against the pattern
  //   return emailRegex.test(email);
  // }
  // function validateName(name) {
  //   // Check if the name is not empty
  //   if (!name) {
  //     return false;
  //   }

  //   // Check if the name contains only letters
  //   if (!/^[A-Za-z]+$/.test(name)) {
  //     return false;
  //   }

  //   // If all checks pass, the name is considered valid
  //   return true;
  // }
  const validation = async () => {
    const result = await passengerData.filter(
      (item) =>
        validateName(item.FirstName) &&
        validateName(item.LastName) &&
        validateDate(item.DateOfBirth)
        && (isPassportRequired ? isValidPassportNumber(item.PassportNo) : true)
    );
    // console.warn("result", result);
    if (
      result.length === passengerData.length &&
      validatePhoneNumber(passengerData[0].ContactNo) &&
      validateEmail(passengerData[0].Email)
    ) {
      return setValidation(true);
    } else setValidation(false);
  };
  useEffect(() => {
    validation();
  }, [passengerData]);
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  };
  const datet = new Date();

  // Set the minimum date to 12 years ago
  // const minDateValue = new Date(datet);
  const maxDateValue = new Date(datet);
  maxDateValue.setFullYear(datet.getFullYear() - 12);
  const minDateValueChild = new Date(datet);
  const maxDateValueChild = new Date(datet);
  const minDateValueInfer = new Date(datet);

  minDateValueChild.setFullYear(datet.getFullYear() - 11);
  maxDateValueChild.setFullYear(datet.getFullYear() - 2);
  minDateValueInfer.setFullYear(datet.getFullYear() - 2);

  const currentDate = formatDate(datet);
  const maxDate = formatDate(maxDateValue);
  const minDateChild = formatDate(minDateValueChild);
  const maxDateChild = formatDate(maxDateValueChild);
  const minDateInfer = formatDate(maxDateValueChild);
  const validateDate = (dateString) => {
    try {
      // Attempt to parse the date string using the specified format
      const parsedDate = new Date(dateString);
      if (isNaN(parsedDate)) {
        return false;
      }

      const formattedDate = parsedDate.toISOString().split("T")[0];
      return formattedDate === dateString;
    } catch (error) {
      // If an exception occurs, the date is not valid
      return false;
    }
  };
  // const Props = {
  //   transactionAmount: transactionAmount,
  //   handleClick: handleClickButton,
  // };

  if (errorMessage) {
    <Flighterror props={errorMessage.errorMessage} />;
  }

  // console.log(TicketDetails, "ticket details")
  if (loaderPayment == false) {

    return (
      <>
        <div className="mainimgFlightSearch">
          <InsideNavbar />
        </div>

        {!reducerState?.flightFare?.flightQuoteData?.Results === true ? (
          <FlightLoader />
        ) : (
          <div className="">
            <div className="container px-0 pt-4">
              <div className="row">
                <motion.div
                  variants={variants}
                  initial="initial"
                  whileInView="animate"
                  className="col-lg-9 col-md-9"
                >
                  <motion.div className="row">
                    <motion.div
                      variants={variants}
                      className="martop col-lg-12 "
                    >
                      {TicketDetails?.Segments[0].length == 2 ? (
                        <>
                          <div className="booknowFlight">
                            <div className="bookaboveBox">
                              <div>
                                <p>
                                  {
                                    TicketDetails?.Segments[0][0]?.Origin
                                      ?.Airport?.CityName
                                  }
                                  <FiArrowRight style={{ margin: "5px" }} />{" "}
                                  {
                                    TicketDetails?.Segments[0][1]?.Destination
                                      ?.Airport?.CityName
                                  }
                                </p>
                                <div className="aboveSpan">
                                  <span className="aboveSOne">
                                  {dayjs(TicketDetails?.Segments[0][0]?.Origin?.DepTime).format("DD MMM, YY")}
                                  </span>
                                  <span>
                                  {`1 stop via ${TicketDetails?.Segments[0][0]?.Destination?.Airport?.CityName}`}{" "}
                                    {duration}
                                  </span>
                                </div>
                              </div>

                              {/* <div className="aboveBelowSpan">
                                <span>Cancellation Fees Apply</span>
                                <span className="aboveSOne">
                                  View Fare Rules
                                </span>
                              </div> */}
                            </div>

                            <div className="bookcenteredBox">
                              <div>
                                <img
                                  src={`${process.env.PUBLIC_URL}/FlightImages/${TicketDetails?.Segments[0][0]?.Airline?.AirlineCode}.png`}
                                />{" "}
                              </div>
                              <span>
                                {
                                  TicketDetails?.Segments[0][0]?.Airline
                                    ?.AirlineName
                                }
                              </span>
                              <p>
                                {
                                  TicketDetails?.Segments[0][0]?.Airline
                                    ?.AirlineCode
                                }
                                {
                                  TicketDetails?.Segments[0][0]?.Airline
                                    ?.FlightNumber
                                }
                                {TicketDetails?.IsLCC === false ? (
                                  <span>LCC</span>
                                ) : (
                                  ""
                                )}
                              </p>
                            </div>

                            <div style={{ position: "relative" }}>
                              <div className="bookbottomBox">
                                <div>
                                  <div className="bookBottomOne">
                                  <p>{dayjs(TicketDetails?.Segments[0][0]?.Origin?.DepTime).format("h:mm A")}</p>
                                  <p>{dayjs(TicketDetails?.Segments[0][0]?.Destination?.ArrTime).format("h:mm A")}</p>

                                  </div>
                                  <div className="bookBottomTwo">
                                    <img src={fromTo} alt="icon" />
                                  </div>
                                  <div className="bookBottomThree">
                                    <p>
                                      {
                                        TicketDetails?.Segments[0][0]?.Origin
                                          ?.Airport?.CityName
                                      }{" "}
                                      <span>
                                        {
                                          TicketDetails?.Segments[0][0]?.Origin
                                            ?.Airport?.AirportName
                                        }
                                      </span>
                                    </p>
                                    <p>
                                      {
                                        TicketDetails?.Segments[0][0]?.Destination
                                        ?.Airport?.CityName
                                      }{" "}
                                      <span>
                                        {
                                          TicketDetails?.Segments[0][0]
                                            ?.Destination?.Airport?.AirportName
                                        }
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
                                    <span>{
                                      TicketDetails?.Segments[0][0]?.Baggage.split(" ")[0]
                                    }{" "} Kgs</span>
                                  </div>
                                  <div>
                                    <p>Cabin</p>
                                    <span>{
                                      TicketDetails?.Segments[0][0]?.CabinBaggage.split(" ")[0]
                                    }{" "} Kgs</span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="bookbottomBox ">
                              <div>
                                <div className="bookBottomOne">
                                <p>{dayjs(TicketDetails?.Segments[0][1]?.Origin?.DepTime).format("h:mm A")}</p>
                                <p>{dayjs(TicketDetails?.Segments[0][1]?.Destination?.ArrTime).format("h:mm A")}</p>
                                </div>
                                <div className="bookBottomTwo">
                                  <img src={fromTo} alt="icon" />
                                </div>
                                <div className="bookBottomThree">
                                  <p>
                                    {
                                      TicketDetails?.Segments[0][0]?.Destination
                                        ?.Airport?.CityName
                                    }{" "}
                                    <span>
                                      {
                                        TicketDetails?.Segments[0][0]
                                          ?.Destination?.Airport?.AirportName
                                      }
                                    </span>
                                  </p>
                                  <p>
                                    {
                                      TicketDetails?.Segments[0][1]?.Destination
                                        ?.Airport?.CityName
                                    }{" "}
                                    <span>
                                      {
                                        TicketDetails?.Segments[0][1]
                                          ?.Destination?.Airport?.AirportName
                                      }
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
                                  <span>{
                                    TicketDetails?.Segments[0][1]?.Baggage.split(" ")[0]
                                  }{" "} Kgs</span>
                                </div>
                                <div>
                                  <p>Cabin</p>
                                  <span>{
                                    TicketDetails?.Segments[0][1]?.CabinBaggage.split(" ")[0]
                                  }{" "} Kgs</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="booknowFlight">
                            <div className="bookaboveBox">
                              <div>
                                <p>
                                  {
                                    TicketDetails?.Segments[0][0]?.Origin
                                      ?.Airport?.CityName
                                  }
                                  <FiArrowRight style={{ margin: "5px" }} />{" "}
                                  {
                                    TicketDetails?.Segments[0][0]?.Destination
                                      ?.Airport?.CityName
                                  }
                                </p>
                                <div className="aboveSpan">
                                  <span className="aboveSOne">
                                  {dayjs(TicketDetails?.Segments[0][0]?.Origin?.DepTime).format("h:mm A")}
                                  </span>
                                  <span>Non Stop {duration}</span>
                                </div>
                              </div>

                              {/* <div className="aboveBelowSpan">
                                <span>Cancellation Fees Apply</span>
                                <span className="aboveSOne">
                                  View Fare Rules
                                </span>
                              </div> */}
                            </div>

                            <div className="bookcenteredBox">
                              <div>
                                <img
                                  src={`${process.env.PUBLIC_URL}/FlightImages/${TicketDetails?.Segments[0][0]?.Airline?.AirlineCode}.png`}
                                />{" "}
                              </div>
                              <span>
                                {
                                  TicketDetails?.Segments[0][0]?.Airline
                                    ?.AirlineName
                                }
                              </span>
                              <p>
                                {
                                  TicketDetails?.Segments[0][0]?.Airline
                                    ?.AirlineCode
                                }
                                {
                                  TicketDetails?.Segments[0][0]?.Airline
                                    ?.FlightNumber
                                }
                                {TicketDetails?.IsLCC === false ? (
                                  <span>LCC</span>
                                ) : (
                                  ""
                                )}
                              </p>
                            </div>

                            <div className="bookbottomBox">
                              <div>
                                <div className="bookBottomOne">
                                <p>{dayjs(TicketDetails?.Segments[0][0]?.Origin?.DepTime).format("h:mm A")}</p>
                                <p>{dayjs(TicketDetails?.Segments[0][0]?.Destination?.ArrTime).format("h:mm A")}</p>
                                </div>
                                <div className="bookBottomTwo">
                                  <img src={fromTo} alt="icon" />
                                </div>
                                <div className="bookBottomThree">
                                  <p>
                                    {
                                      TicketDetails?.Segments[0][0]?.Origin
                                        ?.Airport?.CityName
                                    }{" "}
                                    <span>
                                      {
                                        TicketDetails?.Segments[0][0]?.Origin
                                          ?.Airport?.AirportName
                                      }
                                    </span>
                                  </p>
                                  <p>
                                    {
                                      TicketDetails?.Segments[0][0]?.Destination
                                        ?.Airport?.CityName
                                    }{" "}
                                    <span>
                                      {
                                        TicketDetails?.Segments[0][0]
                                          ?.Destination?.Airport?.AirportName
                                      }
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
                                  <span>{
                                    TicketDetails?.Segments[0][0]?.Baggage.split(" ")[0]
                                  }{" "} Kgs</span>
                                </div>
                                <div>
                                  <p>Cabin</p>
                                  <span>{
                                    TicketDetails?.Segments[0][0]?.CabinBaggage.split(" ")[0]
                                  }{" "} Kgs</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </motion.div>
                    <motion.div variants={variants} className="col-lg-12 mt-3">
                      <div className="bookNowCancel">
                        <div className="bookCancleOne">
                          <p>Cancellation Refund Policy</p>
                          <div>
                            <img
                             src={`${process.env.PUBLIC_URL}/FlightImages/${TicketDetails?.Segments[0][0]?.Airline?.AirlineCode}.png`}
                            />{" "}
                            <span>
                              {
                                TicketDetails?.Segments[0][0]?.Airline
                                  ?.AirlineName
                              }
                            </span>
                          </div>
                          <span>Cancellation Penalty :</span>
                        </div>

                        <div className="bookCancleTwo">
                          <span>Cancel Between</span>
                          <div className="svgLineBox">
                            <div>
                              <div className="svgCircle"></div>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                max-width="560"
                                height="9"
                                viewBox="0 0 560 9"
                                fill="none"
                              >
                                <path
                                  d="M4 5L662 4"
                                  stroke="#dc817e"
                                  stroke-width="8"
                                  stroke-linecap="round"
                                />
                                <defs>
                                  <linearGradient
                                    id="paint0_linear_367_27446"
                                    x1="4.00583"
                                    y1="7.99358"
                                    x2="662.006"
                                    y2="7.98716"
                                    gradientUnits="userSpaceOnUse"
                                  >
                                    <stop stop-color="#41754C" />
                                    <stop
                                      offset="0.494792"
                                      stop-color="#E2C735"
                                    />
                                    <stop
                                      offset="0.494892"
                                      stop-color="#DFCB66"
                                    />
                                    <stop offset="1" stop-color="#DA3030" />
                                  </linearGradient>
                                </defs>
                              </svg>
                            </div>
                            <div>
                              <span>
                                From {detailsOfCancel?.[0]?.From}-
                                {detailsOfCancel?.[0]?.To}{" "}
                                {detailsOfCancel?.[0]?.Unit}
                              </span>
                              <span>
                                From {detailsOfCancel?.[1]?.From}-
                                {detailsOfCancel?.[1]?.To}{" "}
                                {detailsOfCancel?.[1]?.Unit}
                              </span>
                            </div>
                            <div>
                              <span>{detailsOfCancel?.[0]?.Details}</span>
                              <span>{detailsOfCancel?.[1]?.Details}</span>
                            </div>
                            {/* <div>
                      </div> */}
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div variants={variants} className="col-lg-12 mt-3">
                      <div className="bookflightPassenger">
                        <div className="headingBookFlight">
                          <h3>Traveller Details</h3>
                        </div>
                        {adultCount > 0 &&
                          Array.from({ length: adultCount }, (_, index) => (
                            <div className="bookFlightPassInner">
                              <div className="bookAdultIndex">
                                <p>Adult {index + 1}</p>
                              </div>
                              <div className="row g-3 mb-3">
                                <div className="col-lg-3 col-md-3">
                                  <label for="exampleInputEmail1"
                                    class="form-label">Title</label>
                                  <select
                                    className="form-select "
                                    name="Title"
                                    onChange={(e) =>
                                      handleServiceChange(e, index)
                                    }
                                  >
                                    <option value="Mr">Mr.</option>
                                    <option value="Mrs">Mrs.</option>
                                    <option value="Miss">Miss</option>
                                  </select>
                                </div>
                                <div className="col-lg-3 col-md-3">
                                  {/* <div class="form-floating">
                                    <input
                                      onChange={(e) =>
                                        handleServiceChange(e, index)
                                      }
                                      type="text"
                                      name="FirstName"
                                      class="form-control"
                                      id="floatingInput"
                                      placeholder="First Name"

                                    />
                                    <label for="floatingInput">
                                      First Name
                                    </label>
                                    {sub && !validateName(passengerData[index].FirstName) && <span className="error10">First name </span>}
                                  </div> */}

                                  <label for="exampleInputEmail1" class="form-label">First Name</label>
                                  <input type="text"
                                    name="FirstName"
                                    id="floatingInput"
                                    onChange={(e) =>
                                      handleServiceChange(e, index)
                                    }
                                    class="form-control">
                                    </input>
                                    {sub && !validateName(passengerData[index].FirstName) && <span className="error10">First name </span>}
                                    
                                </div>
                                <div className="col-lg-3 col-md-3">
                                  {/* <div class="form-floating">
                                    <input
                                      onChange={(e) =>
                                        handleServiceChange(e, index)
                                      }
                                      type="text"
                                      name="LastName"
                                      class="form-control"
                                      id="floatingInput"
                                      placeholder="Last Name"
                                    />
                                    <label for="floatingInput">Last Name</label>
                                    {sub && !validateName(passengerData[index].LastName) && <span className="error10">Last name </span>}
                                  </div> */}

                                  <label for="exampleInputEmail1" class="form-label">Last Name</label>
                                  <input type="text"
                                    name="LastName"
                                    id="floatingInput"
                                    class="form-control"
                                    onChange={(e) =>
                                      handleServiceChange(e, index)
                                    }
                                  >

                                  </input>
                                   {sub && !validateName(passengerData[index].LastName) && <span className="error10">Last name </span>}
                                </div>
                                <div className="col-lg-3 col-md-3">
                                  {/* <label htmlFor="DateOfBirth">DOB</label> */}
                                  {/* <div class="form-floating">
                                    <input
                                      type="date"
                                      placeholder="DOB"
                                      name="DateOfBirth"
                                      className="form-control"
                                      onChange={(e) =>
                                        handleServiceChange(e, index)
                                      }
                                      max={maxDate}
                                    />

                                    <label htmlFor="DateOfBirth">DOB</label>
                                    {sub && !validateDate(passengerData[index].DateOfBirth
                                    ) && <span className="error10">DOB </span>}

                                  </div> */}

                                  <label for="exampleInputEmail1" class="form-label">Date of Birth</label>
                                  <input type="date"
                                    name="DateOfBirth"
                                    id="floatingInput"
                                    class="form-control"
                                    onChange={(e) =>
                                      handleServiceChange(e, index)
                                    }
                                    max={maxDate}
                                  >

                                  </input>
                                  {sub && !validateDate(passengerData[index].DateOfBirth
                                  ) && <span className="error10">DOB </span>}
                                </div>
                              </div>

                              {/* passport details here */}
                              {isPassportRequired == true ? (
                                <>
                                  <div className="bookAdultIndex">
                                    <p>Passport Details</p>
                                  </div>
                                  <div className="row g-3 mb-3">
                                    <div className="col-lg-3 col-md-3">
                                      {/* <div class="form-floating">
                                        <input
                                          onChange={(e) =>
                                            handleServiceChange(e, index)
                                          }
                                          type="text"
                                          name="PassportNo"
                                          class="form-control"
                                          id="floatingInput"
                                          placeholder="Passport Number"
                                        />
                                        <label for="floatingInput">
                                          Passport Number
                                        </label>

                                      </div> */}
                                      <label for="exampleInputEmail1" class="form-label">Passport Number</label>
                                      <input type="text"
                                        name="PassportNo"
                                        id="floatingInput"
                                        class="form-control"
                                        onChange={(e) => {
                                          handleServiceChange(e, index);
                                        }}
                                      >

                                      </input>
                                      {sub && !isValidPassportNumber(passengerData[index].PassportNo
                                      ) && <span className="error10">Enter a Valid Passport Number </span>}
                                    </div>
                                    <div className="col-lg-3 col-md-3">
                                      {/* <label htmlFor="DateOfBirth">DOB</label> */}
                                      {/* <div class="form-floating">
                                    <input
                                      type="date"
                                      placeholder="DOB"
                                      name="DateOfBirth"
                                      className="form-control"
                                      onChange={(e) =>
                                        handleServiceChange(e, index)
                                      }
                                      max={maxDate}
                                    />

                                    <label htmlFor="DateOfBirth">DOB</label>
                                    {sub && !validateDate(passengerData[index].DateOfBirth
                                    ) && <span className="error10">DOB </span>}

                                  </div> */}


                                  <label for="exampleInputEmail1" class="form-label">Passport Expiry</label>
                                      <input
                                        type="date"
                                        name="PassportExpiry"
                                        id="floatingInput"
                                        class="form-control"
                                        onChange={(e) => {
                                          handleServiceChange(e, index);
                                          
                                        }}
                                        min={currentDate}
                                      ></input>
                                    </div>
                                    {/* <div className="col-lg-3 col-md-3">
                                     
                                      <label for="exampleInputEmail1" class="form-label">Passport Expiry</label>
                                      <input type="text"
                                        name="PassportExpiry"
                                        id="floatingInput"
                                        class="form-control"
                                        onChange={(e) =>
                                          handleServiceChange(e, index)
                                        }
                                      >
                                      </input>
                                    </div> */}
                                  </div>
                                </>
                              ) : (
                                ""
                              )}
                            </div>
                          ))}

                        {/* child details here  */}

                        {childCount > 0 &&
                          Array.from({ length: childCount }, (_, index) => (
                            <div className="bookFlightPassInner">
                              <div className="bookAdultIndex">
                                <p>Child {index + 1}</p>
                              </div>
                              <div className="row g-3 mb-3">
                                <div className="col-lg-3 col-md-3">
                                  {/* <div class="form-floating">
                                    <input
                                      onChange={(e) =>
                                        handleServiceChange(
                                          e,
                                          index + Number(adultCount)
                                        )
                                      }
                                      type="text"
                                      name="FirstName"
                                      class="form-control"
                                      id="floatingInput"
                                      placeholder="First Name"
                                    />
                                    <label for="floatingInput">
                                      First Name
                                    </label>
                                    {sub && !validateName(passengerData[index + Number(adultCount)].FirstName) && <span className="error10">First name  </span>}
                                  </div> */}

                                  <label
                                    for="exampleInputEmail1"
                                    class="form-label"
                                  >
                                    First Name
                                  </label>
                                  <input
                                    type="text"
                                    name="FirstName"
                                    id="floatingInput"
                                    class="form-control"
                                    onChange={(e) =>
                                      handleServiceChange(
                                        e,
                                        index + Number(adultCount)
                                      )
                                    }
                                  >

                                  </input>
                                  {sub && !validateName(passengerData[index + Number(adultCount)].FirstName) && <span className="error10">First name  </span>}
                                </div>
                                <div className="col-lg-3 col-md-3">
                                  {/* <div class="form-floating">
                                    <input
                                      onChange={(e) =>
                                        handleServiceChange(
                                          e,
                                          index + Number(adultCount)
                                        )
                                      }
                                      type="text"
                                      name="LastName"
                                      class="form-control"
                                      id="floatingInput"
                                      placeholder="Last Name"
                                    />
                                    <label for="floatingInput">Last Name</label>
                                    {sub && !validateName(passengerData[index + Number(adultCount)].LastName) && <span className="error10">Last name </span>}
                                  </div> */}

                                  <label
                                    for="exampleInputEmail1"
                                    class="form-label"
                                  >
                                    Last Name
                                  </label>
                                  <input
                                    type="text"
                                    name="LastName"
                                    id="floatingInput"
                                    class="form-control"
                                    onChange={(e) =>
                                      handleServiceChange(
                                        e,
                                        index + Number(adultCount)
                                      )
                                    }
                                  ></input>
                                </div>

                                <div className="col-lg-3 col-md-3">
                                  <label
                                    for="exampleInputEmail1"
                                    class="form-label"
                                  >
                                    Gender
                                  </label>
                                  <select
                                    className="form-select"
                                    name="Gender"
                                    onChange={(e) =>
                                      handleServiceChange(
                                        e,
                                        index + Number(adultCount)
                                      )
                                    }
                                  >
                                    <option value="1">Female</option>
                                    <option value="2">Male</option>
                                  </select>
                                </div>
                                <div className="col-lg-3 col-md-3">
                                  <label
                                    for="exampleInputEmail1"
                                    class="form-label"
                                  >
                                    Date of Birth
                                  </label>
                                  <input
                                    type="date"
                                    name="DateOfBirth"
                                    id="floatingInput"
                                    class="form-control"
                                    onChange={(e) =>
                                      handleServiceChange(
                                        e,
                                        index + Number(adultCount)
                                      )
                                    }
                                    max={maxDateChild}
                                    min={minDateChild}
                                  ></input>
                                   {sub && !validateDate(passengerData[index + Number(adultCount)].DateOfBirth) && <span className="error10">DOB </span>}
                                  {/* <div class="form-floating">
                                    <input
                                      type="date"
                                      name="DateOfBirth"
                                      className="form-control"
                                      onChange={(e) =>
                                        handleServiceChange(
                                          e,
                                          index + Number(adultCount)
                                        )
                                      }
                                      max={maxDateChild}
                                      min={minDateChild}
                                    />
                                    <label htmlFor="DateOfBirth">DOB</label>
                                    {sub && !validateDate(passengerData[index + Number(adultCount)].DateOfBirth) && <span className="error10">DOB </span>}
                                  </div> */}
                                </div>
                              </div>
                              {/* passport details here */}
                              {isPassportRequired == true ? (
                                <>
                                  <div className="bookAdultIndex">
                                    <p>Passport Details</p>
                                  </div>
                                  <div className="row g-3 mb-3">
                                    <div className="col-lg-3 col-md-3">
                                      {/* <div class="form-floating">
                                        <input
                                          onChange={(e) =>
                                            handleServiceChange(
                                              e,
                                              index + Number(adultCount)
                                            )
                                          }
                                          type="text"
                                          name="PassportNo"
                                          class="form-control"
                                          id="floatingInput"
                                          placeholder="Passport Number"
                                        />
                                        <label for="floatingInput">
                                          Passport Number
                                        </label>
                                      </div> */}

                                      <label for="exampleInputEmail1" class="form-label">Passport Number</label>
                                      <input
                                        type="text"
                                        name="PassportNo"
                                        id="floatingInput"
                                        class="form-control"
                                        onChange={(e) =>
                                          handleServiceChange(
                                            e,
                                            index + Number(adultCount)
                                          )
                                        }
                                      ></input>
                                      {sub && !isValidPassportNumber(passengerData[index + Number(adultCount)].PassportNo) && <span className="error10">Enter a valid Passport Number </span>}
                                    </div>
                                    <div className="col-lg-3 col-md-3">
                                      {/* <div class="form-floating">
                                        <input
                                          onChange={(e) =>
                                            handleServiceChange(
                                              e,
                                              index + Number(adultCount)
                                            )
                                          }
                                          type="text"
                                          name="PassportExpiry"
                                          class="form-control"
                                          id="floatingInput"
                                          placeholder="Passport Expiry"
                                        />
                                        <label for="floatingInput">
                                          Passport Expiry
                                        </label>
                                      </div> */}
                                      <label
                                        for="exampleInputEmail1"
                                        class="form-label"
                                      >
                                        Passport Expiry
                                      </label>
                                      <input
                                        type="date"
                                        name="PassportExpiry"
                                        id="floatingInput"
                                        class="form-control"
                                        min={currentDate}
                                        onChange={(e) =>
                                          handleServiceChange(
                                            e,
                                            index + Number(adultCount)
                                          )
                                        }
                                      ></input>
                                    </div>
                                  </div>
                                </>
                              ) : (
                                ""
                              )}
                            </div>
                          ))}

                        {/* child details here  */}

                        {/* infant details here  */}

                        {infantCount > 0 &&
                          Array.from({ length: infantCount }, (_, index) => (
                            <div className="bookFlightPassInner">
                              <div className="bookAdultIndex">
                                <p>Infant {index + 1}</p>
                              </div>
                              <div className="row g-3 mb-3">
                                <div className="col-lg-3 col-md-3">
                                  {/* <div class="form-floating">
                                    <input
                                      onChange={(e) =>
                                        handleServiceChange(
                                          e,
                                          index +
                                          Number(adultCount) +
                                          Number(childCount)
                                        )
                                      }
                                      type="text"
                                      name="FirstName"
                                      class="form-control"
                                      id="floatingInput"
                                      placeholder="First Name"
                                    />
                                    <label for="floatingInput">
                                      First Name
                                    </label>
                                    {sub && !validateName(passengerData[index + Number(adultCount) + Number(childCount)].FirstName) && <span className="error10">First name </span>}
                                  </div> */}

                                  <label for="exampleInputEmail1" class="form-label">First Name</label>
                                  <input
                                    type="text"
                                    name="FirstName"
                                    id="floatingInput"
                                    class="form-control"
                                    onChange={(e) =>
                                      handleServiceChange(
                                        e,
                                        index +
                                          Number(adultCount) +
                                          Number(childCount)
                                      )
                                    }
                                  ></input>
                                   {sub && !validateName(passengerData[index + Number(adultCount) + Number(childCount)].FirstName) && <span className="error10">First name </span>}
                                </div>
                                <div className="col-lg-3 col-md-3">
                                  {/* <div class="form-floating">
                                    <input
                                      onChange={(e) =>
                                        handleServiceChange(
                                          e,
                                          index +
                                          Number(adultCount) +
                                          Number(childCount)
                                        )
                                      }
                                      type="text"
                                      name="LastName"
                                      class="form-control"
                                      id="floatingInput"
                                      placeholder="Last Name"
                                    />
                                    <label for="floatingInput">Last Name</label>
                                    {sub && !validateName(passengerData[index + Number(adultCount) + Number(childCount)].LastName) && <span className="error10">Last name </span>}
                                  </div> */}

                                  <label for="exampleInputEmail1" class="form-label">Last Name</label>
                                  <input
                                    type="text"
                                    name="LastName"
                                    id="floatingInput"
                                    class="form-control"
                                    onChange={(e) =>
                                      handleServiceChange(
                                        e,
                                        index +
                                          Number(adultCount) +
                                          Number(childCount)
                                      )
                                    }
                                  ></input>
                                  {sub && !validateName(passengerData[index + Number(adultCount) + Number(childCount)].LastName) && <span className="error10">Last name </span>}
                                </div>

                                <div className="col-lg-3 col-md-3">
                                  <label
                                    for="exampleInputEmail1"
                                    class="form-label"
                                  >
                                    Gender
                                  </label>
                                  <select
                                    className="form-select"
                                    name="Gender"
                                    onChange={(e) =>
                                      handleServiceChange(
                                        e,
                                        index +
                                          Number(adultCount) +
                                          Number(childCount)
                                      )
                                    }
                                  >
                                    <option value="1">Female</option>
                                    <option value="2">Male</option>
                                  </select>
                                </div>
                                <div className="col-lg-3 col-md-3">
                                  {/* <div class="form-floating">
                                    <input
                                      type="date"
                                      name="DateOfBirth"
                                      className="form-control"
                                      onChange={(e) =>
                                        handleServiceChange(
                                          e,
                                          index +
                                          Number(adultCount) +
                                          Number(childCount)
                                        )
                                      }
                                      min={minDateInfer}
                                      max={currentDate}
                                    />
                                    <label htmlFor="DateOfBirth">DOB</label>
                                    {sub && !validateDate(passengerData[index + Number(adultCount) + Number(childCount)].DateOfBirth) && <span className="error10">DOB </span>}
                                  </div> */}
                                  <label
                                    for="exampleInputEmail1"
                                    class="form-label"
                                  >
                                    Date of Birth
                                  </label>
                                  <input
                                    type="date"
                                    name="DateOfBirth"
                                    id="floatingInput"
                                    class="form-control"
                                    onChange={(e) =>
                                      handleServiceChange(
                                        e,
                                        index +
                                          Number(adultCount) +
                                          Number(childCount)
                                      )
                                    }
                                    min={minDateInfer}
                                    max={currentDate}
                                  ></input>
                                    {sub && !validateDate(passengerData[index + Number(adultCount) + Number(childCount)].DateOfBirth) && <span className="error10">DOB </span>}
                                </div>
                              </div>
                              {/* passport details here */}
                              {isPassportRequired == true ? (
                                <>
                                  <div className="bookAdultIndex">
                                    <p>Passport Details</p>
                                  </div>
                                  <div className="row g-3 mb-3">
                                    <div className="col-lg-3 col-md-3">
                                      {/* <div class="form-floating">
                                        <input
                                          onChange={(e) =>
                                            handleServiceChange(
                                              e,
                                              index +
                                              Number(adultCount) +
                                              Number(childCount)
                                            )
                                          }
                                          type="text"
                                          name="PassportNo"
                                          class="form-control"
                                          id="floatingInput"
                                          placeholder="Passport Number"
                                        />
                                        <label for="floatingInput">
                                          Passport Number
                                        </label>
                                      </div> */}
                                      <label for="exampleInputEmail1" class="form-label">Passport Number</label>
                                      <input
                                        type="text"
                                        name="PassportNo"
                                        id="floatingInput"
                                        class="form-control"
                                        onChange={(e) =>
                                          handleServiceChange(
                                            e,
                                            index +
                                              Number(adultCount) +
                                              Number(childCount)
                                          )
                                        }
                                      >

                                      </input>
                                    </div>
                                    <div className="col-lg-3 col-md-3">
                                      {/* <div class="form-floating">
                                        <input
                                          onChange={(e) =>
                                            handleServiceChange(
                                              e,
                                              index +
                                              Number(adultCount) +
                                              Number(childCount)
                                            )
                                          }
                                          type="text"
                                          name="PassportExpiry"
                                          class="form-control"
                                          id="floatingInput"
                                          placeholder="Passport Expiry"
                                        />
                                        <label for="floatingInput">
                                          Passport Expiry
                                        </label>
                                      </div> */}

                                      <label for="exampleInputEmail1" class="form-label">Passport Expiry</label>
                                      <input
                                        type="date"
                                        name="PassportExpiry"
                                        id="floatingInput"
                                        class="form-control"
                                        min={currentDate}
                                        onChange={(e) => {
                                          handleServiceChange(
                                            e,
                                            index +
                                              Number(adultCount) +
                                              Number(childCount)
                                          );
                                          // console.log(
                                          //   e.target.value,
                                          //   "e.target.value="
                                          // );
                                        }}
                                      ></input>
                                    </div>
                                  </div>
                                </>
                              ) : (
                                ""
                              )}
                            </div>
                          ))}

                        {/* infant details here  */}
                      </div>
                    </motion.div>

                    <motion.div variants={variants} className="col-lg-12 mt-3">
                      <div className="bookflightPassenger">
                        <form>
                          <div className="bookFlightPassInner">
                            <div className="bookAdultIndex">
                              <p>Your Booking Details will be sent to</p>
                            </div>
                            <div className="row g-3 mb-3">
                              <div className="col-lg-5 col-md-5">
                                {/* <div className="form-floating custom-input">
                                  <input
                                    onChange={(e) => {
                                      handleServiceChange(e, 0)
                                    }}
                                    type="email"
                                    name="Email"
                                    className="form-control"
                                    id="floatingInput"
                                    placeholder="Email"
                                  />
                                  <label for="floatingInput">Enter Email</label>
                                  {sub && !validateEmail(passengerData[0].Email) && <span className="error10">Enter a Valid Email </span>}
                                </div> */}

                                <label
                                  for="exampleInputEmail1"
                                  class="form-label"
                                >
                                  Enter Email
                                </label>
                                <input
                                  type="text"
                                  name="Email"
                                  id="floatingInput"
                                  class="form-control"
                                  onChange={(e) => {
                                    handleServiceChange(e, 0);
                                  }}
                                ></input>
                                {sub && !validateEmail(passengerData[0].Email) && <span className="error10">Enter a Valid Email </span>}
                              </div>
                              <div className="col-lg-5 col-md-5">
                                {/* <div className="form-floating">
                                  <input
                                    onChange={(e) => {
                                      handleServiceChange(e, 0)
                                    }}
                                    type="phone"
                                    name="ContactNo"
                                    className="form-control"
                                    id="floatingInput"
                                    placeholder="Mobile Number"
                                  />
                                  <label for="floatingInput">
                                    Mobile Number
                                  </label>
                                  {sub && !validatePhoneNumber(passengerData[0].ContactNo) && <span className="error10">Enter a valid Phone Number </span>}
                                </div> */}

                                <label
                                  for="exampleInputEmail1"
                                  class="form-label"
                                >
                                  Mobile Number
                                </label>
                                <input
                                  type="phone"
                                  name="ContactNo"
                                  id="floatingInput"
                                  class="form-control"
                                  onChange={(e) => {
                                    handleServiceChange(e, 0);
                                  }}
                                ></input>
                                {sub && !validatePhoneNumber(passengerData[0].ContactNo) && <span className="error10">Enter a valid Phone Number </span>}
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </motion.div>

                    {/* trip security  */}
                    {/* <motion.div variants={variants} className="col-lg-12">
                      <TripSecureComponent />
                    </motion.div> */}

                    {/* trip security  */}

                    <div className="d-block mt-3 d-sm-none col-lg-3 col-md-3">
                      <BookNowLeft />
                    </div>

                    <div className="col-lg-12 my-4 smallButtMobile">
                    {V_aliation ? <button
                        className="bookWrapperButton"
                        type="submit"
                        onClick={() => handleTravelClickOpen()}
                      >
                        Continue
                      </button> : <button
                        className="bookWrapperButton validationFalse"
                        // type="submit"
                        onClick={() => setSub(true)}
                      >
                        Continue
                      </button>}

                      <Dialog
                        sx={{ zIndex: "99999" }}
                        disableEscapeKeyDown
                        open={openTravelModal}
                        onClose={handleTravelClose}
                      >
                        <DialogContent>
                          Are you Sure Your details are Correct ?
                        </DialogContent>
                        <DialogActions>
                          <button
                            className="modalDialogueButtonOne"
                            onClick={handleTravelClose}
                          >
                            Re Check
                          </button>
                          <button
                            className="modalDialogueButtonTwo"
                            onClick={handlePayment}
                          >
                            Pay Now
                          </button>
                        </DialogActions>
                      </Dialog>
                    </div>
                  </motion.div>
                </motion.div>
                <div className="d-none d-sm-block col-lg-3 col-md-3">
                  <BookNowLeft
                    toggle={toggle}
                    toggleState={toggleState}
                    transactionAmount={setTransactionAmountState}
                    Amount={transactionAmount}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

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
      </>
    );
  } else {
    return <PaymentLoader />;
  }
}