import React, { useEffect, useState } from "react";
import { apiURL } from "../../Constants/constant";
import "./bookwrapper.css";
import FlightLoader from "./FlightLoader/FlightLoader";
import fromTo from "../../images/fromTo.png";
import "bootstrap/dist/css/bootstrap.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Login from "../../components/Login";
import { motion } from "framer-motion";
import userApi from "../../Redux/API/api";
import { IoAdd } from "react-icons/io5";
import { GrFormSubtract } from "react-icons/gr";
import { PiSuitcaseRollingThin } from "react-icons/pi";
import { MdClose } from "react-icons/md";
import {
  bookActionGDS,
  bookAction,
  bookTicketGDS,
} from "../../Redux/FlightBook/actionFlightBook";
import { FiArrowRight } from "react-icons/fi";
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
import PaymentLoader from "./FlightLoader/paymentLoader";
import Flighterror from "./Flighterror";
import axios from "axios";
import dayjs from "dayjs";
import Modal from "@mui/material/Modal";
import Accordion from "react-bootstrap/Accordion";
import loginnew from "../../images/login-01.jpg";
import { useNetworkState } from "react-use";
import SecureStorage from "react-secure-storage";
import { swalModal } from "../../utility/swal";
import { LuBaggageClaim } from "react-icons/lu";
import CloseIcon from "@mui/icons-material/Close";
import {
  validateEmail,
  validateName,
  validatePhoneNumber,
  isValidPassportNumber,
} from "../../utility/validationFunctions";
import flightPaymentLoding from "../../images/loading/loading-ban.gif";
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

export default function BookWrapper() {
  const [openTravelModal, setOpenTravelModal] = React.useState(false);
  const [transactionAmount, setTransactionAmount] = useState(null);



  const notOnline = useNetworkState();
  useEffect(() => {
    if (notOnline) {
    }
  }, [notOnline]);




  const handleTravelClickOpen = () => {
    if (authenticUser !== 200) {
      setIsLoginModalOpen(true);
    } else {
      setOpenTravelModal(true);
    }
  };

  const couponconfirmation = async () => {
    try {
      const token = SecureStorage.getItem("jwtToken");
      const response = await axios.get(
        `${apiURL.baseURL
        }/skyTrails/api/coupons/couponApplied/${sessionStorage.getItem(
          "couponCode"
        )}`,

        {
          headers: {
            token: token,
          },
        }
      );
    } catch (error) { }
  };

  const handleTravelClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpenTravelModal(false);
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
  const bookingDataLcc = reducerState?.flightBook?.flightBookData?.Response;
  const bookingDataNonLcc =
    reducerState?.flightBook?.flightTicketDataGDS?.data?.data?.Response
      ?.Response || reducerState?.flightBook?.flightBookDataGDS?.Response;
  const PassengersSaved = reducerState?.passengers?.passengersData;
  const markUpamount =
    reducerState?.markup?.markUpData?.data?.result[0]?.flightMarkup;
  const couponvalue = sessionStorage.getItem("couponCode");
  const [email, setEmail] = useState("");
  const [cNumber, setCnumber] = useState("");
  const [farePrice, setFarePrice] = useState("");
  const [toggle, setToggle] = useState(false);
  const [V_aliation, setValidation] = useState(false);
  const [loaderPayment, setLoaderPayment] = useState(false);
  const [loaderPayment1, setLoaderPayment1] = useState(false);
  const [isDisableScroll, setIsDisableScroll] = useState(false);
  const [showADD, setShowAdd] = useState(false);
  const [showADDMELL, setShowAddMell] = useState(false);
  const [refundTxnId, setRefundTxnId] = useState(null);
  const [showBaggage, setShowBaggage] = useState(false);
  const [showMell, setShowMell] = useState(false);
  // const [showBaggage, setShowBaggage] = useState(false);
  const [baggageList, setBaggageList] = useState([]);
  const [mellList, setMellList] = useState([]);
  const [baggageListNub, setBaggageListNub] = useState([]);
  const [MellListNub, setMellListNub] = useState([]);
  const [baggageData, setBaggageData] = useState([]);
  const [mellData, setMellData] = useState([]);
  const [baggageCountNub, setBaggageCountNub] = useState(0);
  const [baggageFare, setBaggageFare] = useState(0);
  const [mellFare, setMellFare] = useState(0);
  const [baggageBool, setBaggageBool] = useState(true);
  const [mellBool, setMellBool] = useState(true);

  const bagageFuncton = (type, bag, index) => {
    if (type == "+" && baggageData?.length < Number(adultCount) + Number(childCount)) {
      setBaggageData((pre) => [...baggageData, bag]);
      let arr = [...baggageListNub]
      arr[index] = arr[index] + 1
      setBaggageListNub(arr)
      setBaggageFare((pre) => pre + bag?.Price
      )
      // console.log("+++++++++++++++++", baggageData?.length, Number(adultCount) + Number(childCount))


    } if (type === "-" && baggageData?.length && 0 < baggageListNub[index]) {
      let arr = [...baggageListNub]
      arr[index] = arr[index] - 1
      setBaggageListNub(arr)
      setBaggageBool(true)
      let chd = true;
      let sub = baggageData.filter((bagg) => {
        // console.log(bagg?.Weight, bag?.Weight)
        if (bagg?.Weight === bag?.Weight && chd) {
          setBaggageBool(false)
          chd = false
          return false
        }
        else {
          return true
        }
      })
      setBaggageData(sub)
      setBaggageFare((pre) => pre - bag?.Price)
    }
    // console.log(baggageData, "baggageDatadddddddddddd", baggageListNub)
  }
  const mellFuncton = (type, bag, index) => {
    if (type == "+" && mellData?.length < Number(adultCount) + Number(childCount)) {
      setMellData((pre) => [...mellData, bag]);
      let arr = [...MellListNub]
      arr[index] = arr[index] + 1
      setMellListNub(arr)
      setMellFare((pre) => pre + bag?.Price
      )
      // console.log("+++++++++++++++++", baggageData?.length, Number(adultCount) + Number(childCount))


    } if (type === "-" && mellData?.length && 0 < MellListNub[index]) {
      let arr = [...MellListNub]
      arr[index] = arr[index] - 1
      setMellListNub(arr)
      setMellBool(true)
      let chd = true;
      let sub = mellData.filter((bagg) => {
        // console.log(bagg?.Weight, bag?.Weight)
        if (bagg?.AirlineDescription
          === bag?.AirlineDescription
          && chd) {
          setMellBool(false)
          chd = false
          return false
        }
        else {
          return true
        }
      })
      setMellData(sub)
      setMellFare((pre) => pre - bag?.Price)
    }
    // console.log(baggageData, "baggageDatadddddddddddd", baggageListNub)
  }


  const [errorMessage, setErrorMassage] = useState({
    error: false,
    Message: "",
  });
  const [sub, setSub] = useState(false);
  const toggleState = (e) => {
    setToggle(e);
  };
  const setTransactionAmountState = (e) => {
    setTransactionAmount(e);
  };

  const TicketDetails = reducerState?.flightFare?.flightQuoteData?.Results;
  const cancellationPolicy =
    reducerState?.flightFare?.flightQuoteData?.Results?.MiniFareRules?.[0];
  const detailsOfCancel = cancellationPolicy?.filter(
    (rule) => rule.Type === "Cancellation"
  );

  const fareValue = reducerState?.flightFare?.flightQuoteData?.Results;
  const ResultIndex = sessionStorage.getItem("ResultIndex");

  const isPassportRequired =
    reducerState?.flightFare?.flightQuoteData?.Results
      ?.IsPassportRequiredAtTicket;

  const fareRule = reducerState?.flightFare?.flightRuleData?.FareRules;
  const apiUrlPayment = `${apiURL.baseURL}/skyTrails/api/transaction/easebussPayment`;

  const payload = {
    EndUserIp: reducerState?.ip?.ipData,
    TokenId: reducerState?.ip?.tokenData,
    TraceId: reducerState?.oneWay?.oneWayData?.data?.data?.Response?.TraceId,
    ResultIndex: ResultIndex,
  };


  useEffect(() => {
    dispatch(ruleAction(payload));
    dispatch(quoteAction(payload));
  }, []);

  useEffect(() => {
    dispatch(resetFareData());
  }, [dispatch]);
  useEffect(() => {
    const ssr = async () => {
      try {

        const payload = {
          EndUserIp: reducerState?.ip?.ipData,
          TokenId: reducerState?.ip?.tokenData,
          TraceId: reducerState?.oneWay?.oneWayData?.data?.data?.Response?.TraceId,
          ResultIndex: ResultIndex,
        };
        const res = await axios({
          method: "POST",
          url: `${apiURL.baseURL}/skyTrails/flight/ssr`,
          data: payload,
          headers: {
            "Content-Type": "application/json",

          },
        });
        setBaggageList(res.data)
        setMellList(res.data)
        let baglis = [...Array(res?.data?.data?.Response?.Baggage[0]?.length)].fill(0);
        let mell = [...Array(res?.data?.data?.Response?.MealDynamic[0]?.length)].fill(0);
        setBaggageListNub(baglis)
        setMellListNub(mell)



        // console.log(
        //   // res?.data?.data?.Response?.Baggage[0]?.length, baggageListNub[0], 
        //   mell,
        //   "ssrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr")
      } catch (error) {
        console.warn(error);
      }
    }
    if (TicketDetails) {

      ssr();
    }
  }
    , [TicketDetails])



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

  // useEffect( async () => {
  //   if (reducerState?.flightBook?.flightBookData?.Error?.ErrorMessage === "") {
  //     setLoaderPayment(false);
  //     navigate("/bookedTicket");
  //   } else if (
  //     reducerState?.flightBook?.flightBookData?.Error?.ErrorCode !== 0 &&
  //     reducerState?.flightBook?.flightBookData?.Error?.ErrorCode !== undefined
  //   ) {

  //     try {
  //       const token = SecureStorage.getItem("jwtToken");
  //       const payload = {

  //         "refund_amount": transactionAmount ||
  //           (!isDummyTicketBooking
  //             ? (Number(fareValue?.Fare?.PublishedFare) + Number(markUpamount) * Number(fareValue?.Fare?.PublishedFare)).toFixed(0)
  //             : 99),
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

  // console.log(baggageList?.data?.Response
  //   , "baggagelisttttttttttttttt")
  useEffect(() => {
    const fetchData = async () => {
      if (reducerState?.flightBook?.flightBookData?.Error?.ErrorMessage === "") {
        setLoaderPayment(false);
        // SecureStorage.setItem("baggageData", baggageData)
        addBookingDetails()
        navigate("/bookedTicket");
      }
      else if (
        reducerState?.flightBook?.flightBookData?.Error?.ErrorCode !== 0 &&
        reducerState?.flightBook?.flightBookData?.Error?.ErrorCode !== undefined
      ) {

        try {
          const token = SecureStorage.getItem("jwtToken");
          const payload = {
            "refund_amount": transactionAmount ||
              (!isDummyTicketBooking
                ? (Number(fareValue?.Fare?.PublishedFare) + Number(markUpamount) * Number(fareValue?.Fare?.PublishedFare)).toFixed(0)
                : 99),
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
          // reducerState?.flightBook?.flightBookData?.Error?.ErrorMessage,
          "Booking failed, your amount will be refunded within 72 hours.",
          false
        );
        navigate("/"); //Abhi k liye comment kiya hai
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

  }, [reducerState?.flightBook?.flightBookData?.Response]);


  useEffect(() => {
    const fetchData = async () => {
      if (reducerState?.flightBook?.flightBookDataGDS?.Error?.ErrorMessage === "") {
        setLoaderPayment(false);
        addBookingDetails()
        // SecureStorage.setItem("baggageData", baggageData)
        navigate("/bookedTicket");
      }
      else if (
        reducerState?.flightBook?.flightBookDataGDS?.Error?.ErrorCode !== 0 &&
        reducerState?.flightBook?.flightBookDataGDS?.Error?.ErrorCode !== undefined
      ) {

        try {
          const token = SecureStorage.getItem("jwtToken");
          const payload = {
            "refund_amount": transactionAmount ||
              (!isDummyTicketBooking
                ? (Number(fareValue?.Fare?.PublishedFare) + Number(markUpamount) * Number(fareValue?.Fare?.PublishedFare)).toFixed(0)
                : 99),
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
          // reducerState?.flightBook?.flightBookData?.Error?.ErrorMessage,
          "Booking failed, your amount will be refunded within 72 hours.",
          false
        );
        navigate("/");// Abhi k liye comment kiya hai
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
      navigate("/");// Abhi k liye comment kiya hai
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
      // SecureStorage.setItem("baggageData", baggageData)
      setLoaderPayment(false);
      addBookingDetails()
      navigate("/bookedTicket");
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
      navigate("/");//Abhi k liye comment kiya hai
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
      addBookingDetails()
      // SecureStorage.setItem("baggageData", baggageData)
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
  const baggageCount = (width) => {
    const length = baggageData.filter((bag) => {
      if (bag.Weight === width) {
        return true
      }
    })
    if (length.length === 0) {
      return "ADD"
    }
    else {
      return length.length
    }
  }
  const handlePayment = async () => {
    console.log(transactionAmount, baggageFare, "transactionAmount + baggageFare ")
    const token = SecureStorage?.getItem("jwtToken");
    setLoaderPayment1(true);
    // setIsDisableScroll(true);
    const payload = {
      firstname: passengerData[0].FirstName,
      phone: passengerData[0].ContactNo,
      amount:
        transactionAmount && (transactionAmount + baggageFare + mellFare) ||
        (!isDummyTicketBooking
          ? parseInt(
            reducerState?.flightFare?.flightQuoteData?.Results?.Fare
              ?.PublishedFare
          ) +
          markUpamount *
          parseInt(
            reducerState?.flightFare?.flightQuoteData?.Results?.Fare
              ?.PublishedFare
          ) + baggageFare + mellFare

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

        setIsDisableScroll(false);
      }
    } catch (error) {
      // Handle network errors or exceptions
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
        // console.log(response, "response");
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
          setIsDisableScroll(false);
        } else {
          try {
            // Make API call if payment status is 'success'
            const verifyResponse = await axios.post(
              `${apiURL.baseURL}/skyTrails/api/transaction/paymentFailure?merchantTransactionId=${response.txnid}`
            );
            // console.log(verifyResponse.data);
            swalModal("py", verifyResponse.data.responseMessage, false);
            // Handle verifyResponse as needed
            setTransactionAmount(null);
            setIsDisableScroll(false);
            sessionStorage.removeItem("couponCode");
            // setTimer11(false);

            setToggle(false);
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

  const handleButtonClick = () => {
    const payloadGDS = {
      ResultIndex: ResultIndex,
      Passengers: passengerData.map((item, index) => {

        if (index < baggageData.length && index < mellData.length) {


          return {
            ...item,
            Email: apiURL.flightEmail,
            ContactNo: apiURL.phoneNo,
            PassportExpiry: isPassportRequired
              ? convertDateFormat(item?.PassportExpiry)
              : "",
            Baggage: [baggageData[index]],
            MealDynamic: [mellData[index]]
          }
        }
        else if (index < baggageData.length) {
          return {
            ...item, Email: apiURL.flightEmail,
            ContactNo: apiURL.phoneNo,
            PassportExpiry: isPassportRequired
              ? convertDateFormat(item?.PassportExpiry)
              : "",
            Baggage: [baggageData[index]],
          }
        }
        else if (index < mellData.length) {


          return {
            ...item,
            Email: apiURL.flightEmail,
            ContactNo: apiURL.phoneNo,
            PassportExpiry: isPassportRequired
              ? convertDateFormat(item?.PassportExpiry)
              : "",
            MealDynamic: [mellData[index]]
          }
        }
        else {
          return {
            ...item, Email: apiURL.flightEmail,
            ContactNo: apiURL.phoneNo,
            PassportExpiry: isPassportRequired
              ? convertDateFormat(item?.PassportExpiry)
              : "",
          }
        }
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
    const [year, month, day] = inputDate?.split("-");

    // Create a new Date object using the components
    const newDate = new Date(year, month - 1, day);

    // Format the output date string as "yyyy-mm-ddTHH:mm:ss"
    const outputDate = newDate
      .toISOString()
      .slice(0, 19)
      .replace("T", "T00:00:00");
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

        if (index < baggageData.length && index < mellData.length) {


          return {
            ...item,
            Email: apiURL.flightEmail,
            ContactNo: apiURL.phoneNo,
            PassportExpiry: isPassportRequired
              ? convertDateFormat(item?.PassportExpiry)
              : "",
            Baggage: [baggageData[index]],
            MealDynamic: [mellData[index]]
          }
        }
        else if (index < baggageData.length) {
          return {
            ...item, Email: apiURL.flightEmail,
            ContactNo: apiURL.phoneNo,
            PassportExpiry: isPassportRequired
              ? convertDateFormat(item?.PassportExpiry)
              : "",
            Baggage: [baggageData[index]],
          }
        }
        else if (index < mellData.length) {


          return {
            ...item,
            Email: apiURL.flightEmail,
            ContactNo: apiURL.phoneNo,
            PassportExpiry: isPassportRequired
              ? convertDateFormat(item?.PassportExpiry)
              : "",
            MealDynamic: [mellData[index]]
          }
        }
        else {
          return {
            ...item, Email: apiURL.flightEmail,
            ContactNo: apiURL.phoneNo,
            PassportExpiry: isPassportRequired
              ? convertDateFormat(item?.PassportExpiry)
              : "",
          }
        }
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

        if (index < baggageData.length && index < mellData.length) {


          return {
            ...item,
            Email: apiURL.flightEmail,
            ContactNo: apiURL.phoneNo,
            PassportExpiry: isPassportRequired
              ? convertDateFormat(item?.PassportExpiry)
              : "",
            Baggage: [baggageData[index]],
            MealDynamic: [mellData[index]]
          }
        }
        else if (index < baggageData.length) {
          return {
            ...item, Email: apiURL.flightEmail,
            ContactNo: apiURL.phoneNo,
            PassportExpiry: isPassportRequired
              ? convertDateFormat(item?.PassportExpiry)
              : "",
            Baggage: [baggageData[index]],
          }
        }
        else if (index < mellData.length) {


          return {
            ...item,
            Email: apiURL.flightEmail,
            ContactNo: apiURL.phoneNo,
            PassportExpiry: isPassportRequired
              ? convertDateFormat(item?.PassportExpiry)
              : "",
            MealDynamic: [mellData[index]]
          }
        }
        else {
          return {
            ...item, Email: apiURL.flightEmail,
            ContactNo: apiURL.phoneNo,
            PassportExpiry: isPassportRequired
              ? convertDateFormat(item?.PassportExpiry)
              : "",
          }
        }
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
    setIsLoginModalOpen(false);
  };

  useEffect(() => {
    if (authenticUser == 200) {
      handleModalClose();
    }
  }, [authenticUser]);
  useEffect(() => {
    if (baggageList) {
      // console.log(baggageList?.
      //   data?.
      //   Response?.Baggage


      //   , "baggageList")
      setShowAdd(true)
    }
    if (mellList) {
      setShowAddMell(true)
    }
  }, [baggageList])


  const validation = async () => {
    const result = await passengerData.filter(
      (item) =>
        validateName(item.FirstName) &&
        validateName(item.LastName) &&
        validateDate(item.DateOfBirth) &&
        (isPassportRequired ? isValidPassportNumber(item.PassportNo) : true)
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

      const formattedDate = parsedDate?.toISOString()?.split("T")[0];
      return formattedDate === dateString;
    } catch (error) {
      // If an exception occurs, the date is not valid
      return false;
    }
  };
  const addBookingDetails = () => {
    let subBag = baggageFare === 0 ? 0 : baggageFare * markUpamount;
    let subMel = baggageFare === 0 ? 0 : mellFare * markUpamount;
    if (bookingDataLcc) {
      // console.log("lccCheck");
      const payloadLCC = {
        userId: reducerState?.logIn?.loginData?.data?.result?._id,
        bookingId: `${bookingDataLcc?.BookingId}`,
        oneWay: true,
        ticketType: "Original Ticket",
        pnr: bookingDataLcc?.PNR,
        origin: bookingDataLcc?.FlightItinerary?.Origin,
        destination: bookingDataLcc?.FlightItinerary?.Destination,
        paymentStatus: "success",
        totalAmount: couponvalue
          ? parseInt(bookingDataLcc?.FlightItinerary?.Fare?.OfferedFare) +
          parseInt(bookingDataNonLcc?.FlightItinerary?.Fare?.PublishedFare) *
          markUpamount - subBag - subMel
          //  + Number(baggageFare)
          : parseInt(bookingDataLcc?.FlightItinerary?.Fare?.PublishedFare)
          //  + parseInt(baggageFare)
          + (markUpamount *
            parseInt(bookingDataLcc?.FlightItinerary?.Fare?.PublishedFare)) - subBag - subMel,
        airlineDetails: bookingDataLcc?.FlightItinerary?.Segments.map(
          (item, index) => {
            return {
              Airline: {
                AirlineCode: item.Airline.AirlineCode,
                AirlineName: item.Airline.AirlineName,
                FlightNumber: item.Airline.FlightNumber,
                FareClass: item.Airline.FareClass,
              },
              Origin: {
                AirportCode: item.Origin.Airport.AirportCode,
                AirportName: item.Origin.Airport.AirportName,
                CityName: item.Origin.Airport.CityName,
                Terminal: item.Origin.Airport.Terminal,
                DepTime: item.Origin.DepTime,
              },
              Destination: {
                AirportCode: item.Destination.Airport.AirportCode,
                AirportName: item.Destination.Airport.AirportName,
                CityName: item.Destination.Airport.CityName,
                Terminal: item.Destination.Airport.Terminal,
                ArrTime: item.Destination.ArrTime,
              },
              Baggage: item.Baggage,
            };
          }
        ),
        passengerDetails: bookingDataLcc?.FlightItinerary?.Passenger?.map(
          (item, index) => {
            return {
              title: item?.Title,
              firstName: item?.FirstName,
              lastName: item?.LastName,
              gender: item?.Gender,
              ContactNo:
                PassengersSaved[index]?.ContactNo == undefined
                  ? ""
                  : PassengersSaved[index]?.ContactNo,
              DateOfBirth: item?.DateOfBirth,
              email:
                PassengersSaved[index]?.Email == undefined
                  ? ""
                  : PassengersSaved[index]?.Email,
              addressLine1: item?.addressLine1,
              city: item?.City,
              TicketNumber: item?.Ticket?.TicketNumber,
              amount: item?.Fare?.PublishedFare?.toFixed(),
            };
          }
        ),
        baggage: baggageData,
        mealDynamic: mellData,

      };
      userApi.flightBookingDataSave(payloadLCC);
    } else {
      // console.log("nonlccCheck");
      const payloadNonLcc = {
        userId: reducerState?.logIn?.loginData?.data?.result?._id,
        bookingId: `${bookingDataNonLcc?.BookingId}`,
        oneWay: true,
        ticketType: "Original Ticket",
        pnr: bookingDataNonLcc?.PNR,
        origin: bookingDataNonLcc?.FlightItinerary?.Origin,
        destination: bookingDataNonLcc?.FlightItinerary?.Destination,
        paymentStatus: "success",
        totalAmount: couponvalue
          ? parseInt(bookingDataNonLcc?.FlightItinerary?.Fare?.OfferedFare) +
          parseInt(bookingDataNonLcc?.FlightItinerary?.Fare?.PublishedFare) *
          markUpamount
          : parseInt(bookingDataNonLcc?.FlightItinerary?.Fare?.PublishedFare) +
          markUpamount *
          parseInt(bookingDataNonLcc?.FlightItinerary?.Fare?.PublishedFare),
        airlineDetails: bookingDataNonLcc?.FlightItinerary?.Segments.map(
          (item, index) => {
            return {
              Airline: {
                AirlineCode: item.Airline.AirlineCode,
                AirlineName: item.Airline.AirlineName,
                FlightNumber: item.Airline.FlightNumber,
                FareClass: item.Airline.FareClass,
              },
              Origin: {
                AirportCode: item.Origin.Airport.AirportCode,
                AirportName: item.Origin.Airport.AirportName,
                CityName: item.Origin.Airport.CityName,
                Terminal: item.Origin.Airport.Terminal,
                DepTime: item.Origin.DepTime,
              },
              Destination: {
                AirportCode: item.Destination.Airport.AirportCode,
                AirportName: item.Destination.Airport.AirportName,
                CityName: item.Destination.Airport.CityName,
                Terminal: item.Destination.Airport.Terminal,
                ArrTime: item.Destination.ArrTime,
              },
              Baggage: item.Baggage,
            };
          }
        ),
        passengerDetails: bookingDataNonLcc?.FlightItinerary?.Passenger?.map(
          (item, index) => {
            return {
              title: item?.Title,
              firstName: item?.FirstName,
              lastName: item?.LastName,
              gender: item?.Gender,
              ContactNo:
                PassengersSaved[index]?.ContactNo == undefined
                  ? ""
                  : PassengersSaved[index]?.ContactNo,
              DateOfBirth: item?.DateOfBirth,
              email:
                PassengersSaved[index]?.Email == undefined
                  ? ""
                  : PassengersSaved[index]?.Email,
              addressLine1: item?.addressLine1,
              city: item?.City,
              TicketNumber: item?.Ticket?.TicketNumber,
              amount: item?.Fare?.PublishedFare?.toFixed(),
            };
          }
        ),
        baggage: baggageData,
        mealDynamic: mellData,
      };
      userApi.flightBookingDataSave(payloadNonLcc);
    }
  };

  // const Props = {
  //   transactionAmount: transactionAmount,
  //   handleClick: handleClickButton,
  // };

  if (errorMessage) {
    <Flighterror props={errorMessage.errorMessage} />;
  }

  // console.log(TicketDetails, "ticket details");
  if (loaderPayment == false) {
    return (
      <>
        <div className="mainimgFlightSearch">
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
                      {
                        // TicketDetails?.Segments[0].length == 2 ?

                        <div className="booknowFlight">
                          <div className="bookaboveBox">
                            <div>
                              {TicketDetails?.AirlineRemark !== null &&
                                TicketDetails?.AirlineRemark !== "--." ? (
                                <p className="text-center w-100 mandaField">
                                  {TicketDetails?.AirlineRemark}
                                </p>
                              ) : (
                                ""
                              )}

                              <p>
                                {
                                  TicketDetails?.Segments[0][0]?.Origin?.Airport
                                    ?.CityName
                                }
                                <FiArrowRight style={{ margin: "5px" }} />{" "}
                                {
                                  TicketDetails?.Segments[0][
                                    TicketDetails?.Segments[0].length - 1
                                  ]?.Destination?.Airport?.CityName
                                }
                              </p>
                              <div className="aboveSpan">
                                <span className="aboveSOne">
                                  {dayjs(
                                    TicketDetails?.Segments[0][0]?.Origin
                                      ?.DepTime
                                  ).format("h:mm A")}
                                </span>
                                {/* <span>Non Stop {duration}</span> */}
                                <span>
                                  {" "}
                                  {TicketDetails?.Segments[0].length > 1
                                    ? `${TicketDetails?.Segments[0].length - 1
                                    } stop via ${TicketDetails?.Segments[0][0]
                                      ?.Destination?.Airport?.CityName
                                    }`
                                    : "Non Stop"}
                                </span>
                              </div>
                            </div>
                          </div>

                          {TicketDetails?.Segments[0]?.map((item, index) => {
                            const nextFlight =
                              TicketDetails?.Segments[0][index + 1];
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
                                    <div className="bookBottomTwo">
                                      <img src={fromTo} alt="icon" />
                                    </div>
                                    <div className="bookBottomThree">
                                      <p>
                                        {item?.Origin?.Airport?.CityName}{" "}
                                        <span>
                                          {item?.Origin?.Airport?.AirportName}
                                          {", "}
                                          Terminal-
                                          {item?.Origin?.Airport?.Terminal
                                            ? item?.Origin?.Airport?.Terminal
                                            : "X"}
                                        </span>
                                      </p>
                                      <p>
                                        {item?.Destination?.Airport?.CityName}{" "}
                                        <span>
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
                                  <div className="bookBottomFour">
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
                                  {(layoverDuration !== 0) && (
                                    <p className="text-bold">Layover Time: {layoverHours !== 0 && `${layoverHours} hours`} {layoverMinutes !== 0 && `${layoverMinutes} minutes`}</p>
                                  )}
                                </div>
                              </>
                            );
                          })}

                          <div style={{ display: "flex", gap: "15px", alignItems: "center", fontSize: "12px", fontWeight: "300" }} >
                            {showADDMELL &&
                              <button className="bagADDBtn" onClick={() => setShowMell(true)}>Add Meal +</button>}
                            {showADD &&
                              <button className="bagADDBtn" onClick={() => setShowBaggage(true)}>Add Baggage +</button>}
                          </div>

                        </div>
                      }

                    </motion.div>

                    {/* <motion.div variants={variants} className="col-lg-12 mt-3">
                      <div className="bookNowCancel">
                        <div className="bookCancleOne">
                          <p>Cancellation Refund Policy</p>
                          <div>
                            <img
                              src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/${TicketDetails?.Segments[0][0]?.Airline?.AirlineCode}.png`}
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

                          </div>
                        </div>
                      </div>
                    </motion.div> */}

                    <div className="col-lg-12 accor_dian mt-4">
                      {fareRule && (
                        <div my={2}>
                          <Accordion defaultActiveKey={null}>
                            <Accordion.Item>
                              <Accordion.Header>
                                <p>Fare Rule and Cancellation Policy</p>
                              </Accordion.Header>
                              <Accordion.Body>
                                <div
                                  className="htmlFare"
                                  dangerouslySetInnerHTML={{
                                    __html: fareRule?.[0]?.FareRuleDetail,
                                  }}
                                />
                              </Accordion.Body>
                            </Accordion.Item>
                          </Accordion>
                        </div>
                      )}
                    </div>

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
                                  <label
                                    for="exampleInputEmail1"
                                    class="form-label"
                                  >
                                    Title
                                  </label>
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
                                    onChange={(e) =>
                                      handleServiceChange(e, index)
                                    }
                                    class="form-control"
                                  ></input>
                                  {sub &&
                                    !validateName(
                                      passengerData[index].FirstName
                                    ) && (
                                      <span className="error10">
                                        First name{" "}
                                      </span>
                                    )}
                                </div>
                                <div className="col-lg-3 col-md-3">
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
                                      handleServiceChange(e, index)
                                    }
                                  ></input>
                                  {sub &&
                                    !validateName(
                                      passengerData[index].LastName
                                    ) && (
                                      <span className="error10">
                                        Last name{" "}
                                      </span>
                                    )}
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
                                      handleServiceChange(e, index)
                                    }
                                    max={maxDate}
                                  ></input>
                                  {sub &&
                                    !validateDate(
                                      passengerData[index].DateOfBirth
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
                                      <label
                                        for="exampleInputEmail1"
                                        class="form-label"
                                      >
                                        Passport Number
                                      </label>
                                      <input
                                        type="text"
                                        name="PassportNo"
                                        id="floatingInput"
                                        class="form-control"
                                        onChange={(e) => {
                                          handleServiceChange(e, index);
                                        }}
                                      ></input>
                                      {sub &&
                                        !isValidPassportNumber(
                                          passengerData[index].PassportNo
                                        ) && (
                                          <span className="error10">
                                            Enter a Valid Passport Number{" "}
                                          </span>
                                        )}
                                    </div>
                                    <div className="col-lg-3 col-md-3">
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
                                        onChange={(e) => {
                                          handleServiceChange(e, index);
                                        }}
                                        min={currentDate}
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
                                  ></input>
                                  {sub &&
                                    !validateName(
                                      passengerData[index + Number(adultCount)]
                                        .FirstName
                                    ) && (
                                      <span className="error10">
                                        First name{" "}
                                      </span>
                                    )}
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
                                  {sub &&
                                    !validateDate(
                                      passengerData[index + Number(adultCount)]
                                        .DateOfBirth
                                    ) && <span className="error10">DOB </span>}
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

                                      <label
                                        for="exampleInputEmail1"
                                        class="form-label"
                                      >
                                        Passport Number
                                      </label>
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
                                      {sub &&
                                        !isValidPassportNumber(
                                          passengerData[
                                            index + Number(adultCount)
                                          ].PassportNo
                                        ) && (
                                          <span className="error10">
                                            Enter a valid Passport Number{" "}
                                          </span>
                                        )}
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
                                        index +
                                        Number(adultCount) +
                                        Number(childCount)
                                      )
                                    }
                                  ></input>
                                  {sub &&
                                    !validateName(
                                      passengerData[
                                        index +
                                        Number(adultCount) +
                                        Number(childCount)
                                      ].FirstName
                                    ) && (
                                      <span className="error10">
                                        First name{" "}
                                      </span>
                                    )}
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
                                        index +
                                        Number(adultCount) +
                                        Number(childCount)
                                      )
                                    }
                                  ></input>
                                  {sub &&
                                    !validateName(
                                      passengerData[
                                        index +
                                        Number(adultCount) +
                                        Number(childCount)
                                      ].LastName
                                    ) && (
                                      <span className="error10">
                                        Last name{" "}
                                      </span>
                                    )}
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
                                  {sub &&
                                    !validateDate(
                                      passengerData[
                                        index +
                                        Number(adultCount) +
                                        Number(childCount)
                                      ].DateOfBirth
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
                                      <label
                                        for="exampleInputEmail1"
                                        class="form-label"
                                      >
                                        Passport Number
                                      </label>
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
                                      ></input>
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
                                {sub &&
                                  !validateEmail(passengerData[0].Email) && (
                                    <span className="error10">
                                      Enter a Valid Email{" "}
                                    </span>
                                  )}
                              </div>
                              <div className="col-lg-5 col-md-5">
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
                                {sub &&
                                  !validatePhoneNumber(
                                    passengerData[0].ContactNo
                                  ) && (
                                    <span className="error10">
                                      Enter a valid Phone Number{" "}
                                    </span>
                                  )}
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
                      <BookNowLeft
                        toggle={toggle}
                        toggleState={toggleState}
                        transactionAmount={setTransactionAmountState}
                        Amount={transactionAmount}
                        baggAmount={baggageFare}
                      />
                    </div>

                    <div className="col-lg-12 my-4 smallButtMobile">
                      {V_aliation ? (
                        <button
                          className="bookWrapperButton"
                          type="submit"
                          onClick={() => handleTravelClickOpen()}
                        >
                          Continue
                        </button>
                      ) : (
                        <button
                          className="bookWrapperButton validationFalse"
                          // type="submit"
                          onClick={() => setSub(true)}
                        >
                          Continue
                        </button>
                      )}

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
                    baggAmount={baggageFare}
                    mellAmount={mellFare}
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
        <Modal open={showBaggage} onClose={showBaggage}>
          <div className="overlayBg"

          >

            <div className="bagMnContainer" >
              <div className="bagClose" onClick={() => setShowBaggage(false)} ><MdClose size={20} /></div>
              <div style={{
                fontSize: "18px",
                fontWeight: "700"
              }}>Add Extra Baggage</div>
              <div className="baggageAireLine">
                <div style={{ display: "flex", gap: "10px" }}>
                  {baggageList?.data?.Response?.Baggage?.[0][0]?.AirlineCode ?

                    <img
                      src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/${baggageList?.data?.Response?.Baggage?.[0][0]?.AirlineCode}.png`} alt={`filght img`}
                      style={{ height: "50px", objectFit: "contain" }}
                    /> :
                    <img
                      src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/${TicketDetails?.Segments[0][0]?.Airline?.AirlineCode}.png`}
                    />}
                  {" "}
                  <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div style={{ fontWeight: "600" }}>
                      {TicketDetails?.Segments[0][0]?.Origin?.Airport
                        ?.CityName}-{TicketDetails?.Segments[0][0]
                          ?.Destination?.Airport?.CityName
                      }

                    </div>
                    <div>
                      {baggageData.length} of {Number(adultCount) + Number(childCount)} selected

                    </div>
                  </div>
                </div>
              </div>
              <div>Included Check-in baggage per person - 15 KGS</div>
              <div className="extraBaggageSection">{baggageList?.data?.Response?.Error?.ErrorCode === 0 ?

                baggageList?.data?.Response?.Baggage?.[0]?.map((bag, index) => {
                  // if (0 < bag?.price) {



                  return (<div className="bagListMap" style={{ display: bag?.Price === 0 ? "none" : "flex" }}>
                    <div className="bagListLeft" >

                      <PiSuitcaseRollingThin
                        size={30} />
                      <div className="bagAdditional">Additional <span> {bag?.Weight} KG </span></div>
                    </div>
                    <div className="bagListRight" >
                      <div className="bagListRightPrice" style={{ fontSize: "18px", fontWeight: "400" }}>₹ {bag?.Price}</div>
                      <div className="qtyCounter" >
                        <div className="qtyCounterBtn" onClick={() => bagageFuncton("-", bag, index

                        )}>


                          < GrFormSubtract />
                        </div>
                        {baggageListNub[index]} <div className="qtyCounterBtn" onClick={() => bagageFuncton("+", bag, index)}>
                          <IoAdd />
                        </div>
                      </div>
                    </div>
                  </div>)
                  // } else {
                  //   return <div>hiii{bag?.Price}</div>
                  // }
                }
                ) : <div>
                  No SSR details found.</div>
              }
              </div>
              {0 < baggageData.length && <div className="bagPriceCon" >


                <div> {baggageData.length} of {Number(adultCount) + Number(childCount)} Baggage(s) Selected</div>
                <div className="bagPriceConRight" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "15px" }}>

                  <div>
                    <div style={{ fontSize: "12px" }}>Added to fare</div>
                    <div style={{ fontWeight: "700" }}>₹ {baggageFare}</div>
                  </div>
                  <div onClick={() => setShowBaggage(false)} className="buttonBag">Done</div>
                </div>
              </div>}
            </div>
          </div>
        </Modal>
        <Modal open={showMell} onClose={showBaggage}>
          <div className="overlayBg"

          >

            <div className="bagMnContainer" >
              <div className="bagClose" onClick={() => setShowMell(false)} ><MdClose size={20} /></div>
              <div style={{
                fontSize: "18px",
                fontWeight: "700"
              }}>Add Extra Meal</div>
              <div className="baggageAireLine">
                <div style={{ display: "flex", gap: "10px" }}>
                  {baggageList?.data?.Response?.Baggage?.[0][0]?.AirlineCode ?

                    <img
                      src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/${baggageList?.data?.Response?.Baggage?.[0][0]?.AirlineCode}.png`} alt={`filght img`}
                      style={{ height: "50px", objectFit: "contain" }}
                    /> :
                    <img
                      src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/${TicketDetails?.Segments[0][0]?.Airline?.AirlineCode}.png`}
                    />}
                  {" "}
                  <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div style={{ fontWeight: "600" }}>
                      {TicketDetails?.Segments[0][0]?.Origin?.Airport
                        ?.CityName}-{TicketDetails?.Segments[0][0]
                          ?.Destination?.Airport?.CityName
                      }

                    </div>
                    <div>
                      {mellData.length} of {Number(adultCount) + Number(childCount)} selected

                    </div>
                  </div>
                </div>
              </div>
              <div>Included  Meal per person </div>
              <div className="extraBaggageSection">{mellList?.data?.Response?.Error?.ErrorCode === 0 ?

                mellList?.data?.Response?.MealDynamic?.[0]?.map((bag, index) => {
                  // if (0 < bag?.price) {



                  return (<div className="bagListMap" style={{ display: bag?.Price === 0 ? "none" : "flex" }}>
                    <div className="bagListLeft" >

                      <PiSuitcaseRollingThin
                        size={30} />
                      <div className="bagAdditional">
                        {/* Additional  */}
                        <span> {bag?.AirlineDescription} </span></div>
                    </div>
                    <div className="bagListRight" >
                      <div className="bagListRightPrice" style={{ fontSize: "18px", fontWeight: "400" }}>₹ {bag?.Price}</div>
                      <div className="qtyCounter" >
                        <div className="qtyCounterBtn" onClick={() => mellFuncton("-", bag, index

                        )}>


                          < GrFormSubtract />
                        </div>
                        {MellListNub[index]} <div className="qtyCounterBtn" onClick={() => mellFuncton("+", bag, index)}>
                          <IoAdd />
                        </div>
                      </div>
                    </div>
                  </div>)
                  // } else {
                  //   return <div>hiii{bag?.Price}</div>
                  // }
                }
                ) : <div>
                  No SSR details found.</div>
              }
              </div>
              {0 < mellData?.length && <div className="bagPriceCon" >


                <div> {mellData?.length} of {Number(adultCount) + Number(childCount)}  Meal(s) Selected</div>
                <div className="bagPriceConRight" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "15px" }}>

                  <div>
                    <div style={{ fontSize: "12px" }}>Added to fare</div>
                    <div style={{ fontWeight: "700" }}>₹ {mellFare}</div>
                  </div>
                  <div onClick={() => setShowMell(false)} className="buttonBag">Done</div>
                </div>
              </div>}
            </div>
          </div>
        </Modal>
      </>
    );
  } else {
    return <PaymentLoader />;
  }
}
