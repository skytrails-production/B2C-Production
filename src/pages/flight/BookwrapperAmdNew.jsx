import React, { useEffect, useState, useRef } from "react";
import { apiURL } from "../../Constants/constant";
import "./bookwrapper.css";
import FlightLoader from "./FlightLoader/FlightLoader";

import "bootstrap/dist/css/bootstrap.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";

import Box from "@mui/material/Box";
import DialogContent from "@mui/material/DialogContent";
import Login from "../../components/Login";
import InsideNavbar from "../../UI/BigNavbar/InsideNavbar";
import { motion } from "framer-motion";
import SecureStorage from "react-secure-storage";

import moment from "moment";
import {
  quoteAction,
  resetFareData,
  ruleAction,
} from "../../Redux/FlightFareQuoteRule/actionFlightQuote";
import "./booknow.css";
import { useDispatch, useSelector } from "react-redux";
// import Box from '@mui/material/Box';
import { useLocation, useNavigate } from "react-router-dom";
import { PassengersAction } from "../../Redux/Passengers/passenger";
import BookNowLeft from "./BookNowLeft";
import BookNowLeftAmd from "./BookNowLeftAmd";
import PaymentLoader from "./FlightLoader/paymentLoader";
import Flighterror from "./Flighterror";
import axios from "axios";

import Modal from "@mui/material/Modal";
import Accordion from "react-bootstrap/Accordion";
import loginnew from "../../images/login-01.jpg";
import { useNetworkState } from "react-use";
// import { useLocation } from "react-router-dom";
import { swalModal } from "../../utility/swal";
import { XMLParser } from "fast-xml-parser";
import CloseIcon from "@mui/icons-material/Close";
import userApi from "../../Redux/API/api";

import flightPaymentLoding from "../../images/loading/loading-ban.gif";
import { Checkbox } from "antd";
import AirSeatMap from "../../components/AirSeatMap/AirSeatMap";
import { IoIosArrowForward } from "react-icons/io";
import Authentic from "../Auth/Authentic";
import { datasaveTodb } from "../../utility/dataSave";
import { useSeatUtility } from "../../utility/flightUtility/BookwarperUtility";
import {
  fetchData,
  startHBookingProcessAMD,
} from "../../utility/flightUtility/flightbookingAmdUtility";
import { couponconfirmation } from "../../utility/couponutility/couponUtility";
import BookWarpaerDetailsAmd from "../../components/BookWraperFlight/BookWarpaerDetailsAmd";
import PassengersDetails from "../../components/BookWraperFlight/PassengersDetails";
import { EditOutlined } from "@ant-design/icons";
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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 475,
  height: 400,
  borderRadius: "15px",
  bgcolor: "background.paper",
  background: "aliceblue",
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BookWrapper() {
  const location = useLocation();
  // const navigate = useNavigate();
  const { ResultIndex } = location.state;
  const sesstioResultIndex = ResultIndex;
  const [openTravelModal, setOpenTravelModal] = React.useState(false);
  const [transactionAmount, setTransactionAmount] = useState(null);
  const [xmlData, setXmlData] = useState("");
  const [jsonData, setJsonData] = useState(null);
  const [checkOk, setChaeckOk] = useState(1);
  const [statusOk, setStatusOk] = useState(true);
  const [jsonSavePnrData, setJsonSaveData] = useState(null);
  console.log(sesstioResultIndex, "session result index");
  const [isSeatsShow, setIsSeatsShow] = useState({
    loading: true,
    isSeat: true,
  });
  const dispatch = useDispatch();
  const seatListPayload = useSeatUtility();

  const [open, setOpen] = React.useState(false);
  const [isSeatMapopen, setIsSeatMapOpen] = useState(false);
  // const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const adultCount = queryParams.get("adult");
  // const adultCount = 2;
  const childCount = queryParams.get("child");
  // const childCount = 2;
  const infantCount = queryParams.get("infant");
  // const infantCount = 2;
  const reducerState = useSelector((state) => state);
  const isDummyTicketBooking = JSON.parse(
    sessionStorage.getItem("hdhhfb7383__3u8748")
  );
  const [email, setEmail] = useState("");
  const [cNumber, setCnumber] = useState("");
  const [farePrice, setFarePrice] = useState("");
  const [toggle, setToggle] = useState(false);
  const [V_aliation, set_Validation] = useState(false);
  const [loaderPayment, setLoaderPayment] = useState(false);
  const [loaderPayment1, setLoaderPayment1] = useState(false);
  const [isDisableScroll, setIsDisableScroll] = useState(false);
  const [refundTxnId, setRefundTxnId] = useState(null);
  const arrivalMomentt = moment(`${"010724"} ${"0555"}`, "DDMMYYYY HHmm");
  const AmountList = useSelector((state) => state?.airlineSeatMap?.seatList);
  const [totalSeatAmount, setTotalSeatAmount] = useState(0);

  useEffect(() => {
    let totalSeatAmountlocal = 0;
    let totalSeatAmountlocall = AmountList.forEach((d) => {
      d.reduce((acc, curr) => {
        console.log(acc + curr.amount, "arrrrr");
        totalSeatAmountlocal = acc + curr.amount;
        return acc + curr?.amount;
      }, totalSeatAmountlocal);
    });
    setTotalSeatAmount(totalSeatAmountlocal);
  }, [AmountList]);
  const [finalAmount, setFinalAmount] = useState(0);

  const handleFinalAmountChange = (amount) => {
    setFinalAmount(amount);
  };

  const [couponvalue, setCouponValue] = useState("");
  const handlecouponChange = (code) => {
    setCouponValue(code);
  };

  const [discountvalue, setdiscountValue] = useState("");

  const handledisocuntChange = (amount) => {
    setdiscountValue(amount);
  };

  const arrTimeISOt = arrivalMomentt.toISOString();

  let depTimeString = String(
    jsonSavePnrData?.originDestinationDetails?.itineraryInfo?.travelProduct
      ?.product?.depTime
  );
  let depDateString = String(
    jsonSavePnrData?.originDestinationDetails?.itineraryInfo?.travelProduct
      ?.product?.depDate
  );
  let arrTimeString1 = String(
    jsonSavePnrData?.originDestinationDetails?.itineraryInfo?.travelProduct
      ?.product?.arrTime
  );
  let arrDateString = String(
    jsonSavePnrData?.originDestinationDetails?.itineraryInfo?.travelProduct
      ?.product?.arrDate
  );
  if (arrTimeString1 && arrTimeString1.length === 2) {
    arrTimeString1 = "00" + arrTimeString1;
  }
  if (arrTimeString1 && arrTimeString1.length === 3) {
    arrTimeString1 = "0" + arrTimeString1;
  }
  if (depTimeString && depTimeString.length === 2) {
    depTimeString = "00" + depTimeString;
  }
  if (depTimeString && depTimeString.length === 3) {
    depTimeString = "0" + depTimeString;
  }
  if (depDateString && depDateString.length === 5) {
    depDateString = "0" + depDateString;
  }
  if (depDateString && depDateString.length === 4) {
    depDateString = "00" + depDateString;
  }
  if (arrDateString && arrDateString.length === 5) {
    arrDateString = "0" + arrDateString;
  }
  if (arrDateString && arrDateString.length === 4) {
    arrDateString = "00" + arrDateString;
  }

  const arrivalMoment = moment(
    `${arrDateString} ${arrTimeString1}`,
    "DDMMYYYY HHmm"
  );
  const departureMoment = moment(
    `${depDateString} ${depTimeString}`,
    "DDMMYYYY HHmm"
  );
  const depTimeISO1 = departureMoment.toISOString();

  const arrTimeISO1 = arrivalMoment.toISOString();

  // Output: "2024-09-26T10:15:00.000Z"
  const navigate = useNavigate();

  // return <div>hiiii</div>;
  const refundAmount = async ({ refundTxnId, finalAmount }) => {
    try {
      const token = SecureStorage.getItem("jwtToken");
      const payload = {
        refund_amount: 1,
        // refund_amount:
        // parseInt(ResultIndex?.monetaryDetail?.[0]?.amount) +
        // markUpamount *
        //   parseInt(ResultIndex?.monetaryDetail?.[0]?.amount).toFixed(0),
        // Number(finalAmount)+Number(totalSeatAmount).toFixed(2),

        txnId: refundTxnId,
      };

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
  };
  const convertXmlToJson = () => {
    const parser = new XMLParser();
    const result = parser.parse(xmlData);
    let convertData;
    if (xmlData !== "") {
      convertData =
        result["soapenv:Envelope"]["soapenv:Body"][
          "Air_SellFromRecommendationReply"
        ];
      setJsonData(convertData);
    }
  };

  useEffect(() => {
    convertXmlToJson();
  }, [xmlData]);
  useEffect(() => {
    // console.log(jsonData,"jsondataaaaaaa")
    if (jsonData?.itineraryDetails?.segmentInformation?.actionDetails) {
      if (
        jsonData?.itineraryDetails?.segmentInformation?.actionDetails
          ?.statusCode !== "OK"
      ) {
        setStatusOk(false);
        swalModal(
          "flight",
          // reducerState?.flightBook?.flightBookData?.Error?.ErrorMessage,
          "No Class Available",
          false
        );

        navigate(
          `/Searchresult?adult=${adultCount}&child=${childCount}&infant=${infantCount}`
        );
      } else {
        setStatusOk(true);
      }
    } else {
      jsonData?.itineraryDetails?.segmentInformation?.map((i) => {
        if (i?.actionDetails?.statusCode !== "OK") {
          // console.log(i,"statusCodestatusCode")
          setStatusOk(false);
          swalModal(
            "flight",
            // reducerState?.flightBook?.flightBookData?.Error?.ErrorMessage,
            "No Class Available",
            false
          );
          navigate(
            `/Searchresult?adult=${adultCount}&child=${childCount}&infant=${infantCount}`
          );
        }
      });
    }
  }, [jsonData]);

  const handleTravelClickOpen = () => {
    if (authenticUser !== 200) {
      setIsLoginModalOpen(true);
    } else {
      setOpen(true);
      // setOpenTravelModal(true);
    }
  };

  const handleTravelClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpenTravelModal(false);
      setOpen(false);
    }
  };

  const [airesellRes, setAirsellRes] = useState(null);

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
  // const ResultIndex = JSON?.parse(sessionStorage.getItem("ResultIndex"));
  const markUpamount =
    reducerState?.markup?.markUpData?.data?.result[0]?.flightMarkup;

  const fareRule = reducerState?.flightFare?.flightRuleData?.FareRules;
  const apiUrlPayment = `${apiURL.baseURL}/skyTrails/api/transaction/easebussPayment`;

  const payload = {
    EndUserIp: reducerState?.ip?.ipData,
    TokenId: reducerState?.ip?.tokenData,
    // TraceId: reducerState?.oneWay?.oneWayData?.data?.data?.Response?.tvoTraceId,
    TraceId: reducerState?.oneWay?.oneWayData?.data?.tvoTraceId,
    ResultIndex: ResultIndex?.ResultIndex,
  };

  useEffect(() => {
    dispatch(resetFareData());
  }, [dispatch]);
  useEffect(() => {
    if (airesellRes?.data?.headers?.StatusCode === "UNS") {
      navigate(
        `/Searchresult?adult=${adultCount}&child=${childCount}&infant=${infantCount}`
      );
    }
  }, [airesellRes]);

  useEffect(() => {
    if (isDisableScroll) {
      // document.body.classList.add("disableTrue");
      // document.body.classList.remove("disableFalse");
      document.body.classList.remove("disableTrue");
      document.body.classList.add("disableFalse");
    } else {
      document.body.classList.remove("disableTrue");
      document.body.classList.add("disableFalse");
    }

    return () => {
      document.body.classList.add("disableFalse");

      document.body.classList.remove("disableTrue");
    };
  }, [isDisableScroll]);

  // Initialize the passenger list with the required number of passengers
  let totalPassenger =
    Number(adultCount) + Number(childCount) + Number(infantCount);

  const [passengerData, setPassengerData] = useState([]);

  useEffect(() => {
    if (fareValue) {
      let fareDetails = fareValue?.Fare;
      let fareBreakdown = fareValue?.FareBreakdown;

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

        setFarePrice(arr);
      });
    }
  }, [fareValue]);

  useEffect(() => {
    if (loaderPayment == true) {
      // handleButtonClick();
      // xmlpassengerData();
      startHBookingProcessAMD({
        sesstioResultIndex,
        jsonData,
        adultCount,
        childCount,
        passengerData,
        infantCount,
        seatListPayload,
        navigate,
        totalSeatAmount,
        airesellRes,
        finalAmount,
        arrTimeISO1,
        depTimeISO1,
        ResultIndex,
        jsonData,
        jsonData,
        discountvalue,
        setJsonSaveData,
      });
    }
  }, [loaderPayment]);
  useEffect(() => {
    fetchData({
      sesstioResultIndex,
      setAirsellRes,
      setXmlData,
      adultCount,
      childCount,
      infantCount,
    });
  }, []);

  const authenticUser = reducerState?.logIn?.loginData?.status;

  const grandTotal =
    parseInt(ResultIndex?.monetaryDetail?.[0]?.amount) +
    markUpamount *
      parseInt(ResultIndex?.monetaryDetail?.[0]?.amount).toFixed(0);
  // console.log( parseInt(ResultIndex?.monetaryDetail?.[0]?.amount) + markUpamount * parseInt(ResultIndex?.monetaryDetail?.[0]?.amount) ,"bhjsdgsdbfuydgbfuyfegbfuyfedyufbfedyfb")
  const handlePayment = async () => {
    // console.log(passengerData)
    const token = SecureStorage?.getItem("jwtToken");
    setLoaderPayment1(true);
    setIsDisableScroll(true);
    const payload = {
      firstname: passengerData?.[0]?.firstName,
      phone: passengerData?.[0]?.ContactNo,
      amount: (Number(finalAmount) + Number(totalSeatAmount)).toFixed(2),
      // transactionAmount ||
      // grandTotal,

      // amount: 1,

      email: passengerData[0]?.email,
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
      } else {
        const errorData = await response.json();

        setIsDisableScroll(false);
      }
    } catch (error) {
      // Handle network errors or exceptions

      setIsDisableScroll(false);
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
            setRefundTxnId(response.easepayid);
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

          setIsDisableScroll(false);
        } else {
          try {
            // Make API call if payment status is 'success'
            const verifyResponse = await axios.post(
              `${apiURL.baseURL}/skyTrails/api/transaction/paymentFailure?merchantTransactionId=${response.txnid}`
            );

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
    // console.log(jsonSavePnrData, "jsonSavePnrData")
    if (jsonSavePnrData) {
      if (
        jsonSavePnrData?.pnrHeader?.reservationInfo?.reservation?.controlNumber
      ) {
        couponconfirmation(couponvalue);
        navigate(
          `/bookedTicketSucess/${jsonSavePnrData?.pnrHeader?.reservationInfo?.reservation?.controlNumber}`,
          {
            state: {
              PNR: jsonSavePnrData?.pnrHeader?.reservationInfo?.reservation
                ?.controlNumber,
              datavalue: jsonSavePnrData,
              sesstioResultIndex: sesstioResultIndex,
              finalAmount: finalAmount + totalSeatAmount,
              arrTimeISO1: arrTimeISO1,
              depTimeISO1: depTimeISO1,
              jsonData,
              jsonData,
              discountvalue: discountvalue,
            },
          }
        );
      } else {
        refundAmount();
        navigate(
          `/bookedTicketSucess/${jsonSavePnrData?.pnrHeader?.reservationInfo?.reservation?.controlNumber}`,
          {
            state: {
              PNR: jsonSavePnrData?.pnrHeader?.reservationInfo?.reservation
                ?.controlNumber,
              datavalue: jsonSavePnrData,
              sesstioResultIndex: sesstioResultIndex,
              finalAmount: finalAmount + totalSeatAmount,
              arrTimeISO1: arrTimeISO1,
              depTimeISO1: depTimeISO1,
              ResultIndex: ResultIndex,
              jsonData: jsonData,
              discountvalue: discountvalue,
            },
          }
        );
      }
    }
  }, [jsonSavePnrData]);

  const finalamountvalue1 =
    Number(sesstioResultIndex?.monetaryDetail?.[0]?.amount) +
    Number(markUpamount) *
      Number(sesstioResultIndex?.monetaryDetail?.[0]?.amount);
  const taxvaluetotal = Number(
    Number(markUpamount) *
      Number(sesstioResultIndex?.monetaryDetail?.[0]?.amount)
  );

  const bookticketamd = () => {
    setOpenTravelModal(true);
  };

  const dropdownRef = useRef(null);
  const [isDropdown, setIsDropdown] = useState(false);

  const toggleDropdown = () => {
    setIsDropdown((pre) => !pre);
    if (dropdownRef.current) {
      const elementPosition = dropdownRef.current.getBoundingClientRect().top;
      console.log(elementPosition, dropdownRef.current, "elementposition");
      window.scrollTo({
        top: isDropdown ? 0 : Number(elementPosition) + 470,
        behavior: "smooth",
      });
    }
  };

  if (errorMessage) {
    <Flighterror props={errorMessage.errorMessage} />;
  }

  if (loaderPayment == false) {
    return (
      <>
        {!reducerState?.flightFare?.flightQuoteData?.Results === true &&
        ResultIndex?.ResultIndex ? (
          <FlightLoader />
        ) : (
          <div className="">
            <div className="container px-0 pt-4">
              <div className="row" style={{ width: "100%" }}>
                <motion.div
                  variants={variants}
                  initial="initial"
                  whileInView="animate"
                  className="col-lg-8 "
                >
                  <motion.div className="row">
                    <BookWarpaerDetailsAmd
                      sesstioResultIndex={sesstioResultIndex}
                      isSeatMapopen={isSeatMapopen}
                      setIsDropdown={setIsDropdown}
                      setIsSeatMapOpen={setIsSeatMapOpen}
                    />

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
                    {/* {!isSeatMapopen ? ( */}
                    <PassengersDetails
                      sub={sub}
                      passengerDataa={passengerData}
                      setPassengerDataa={setPassengerData}
                      set_Validation={set_Validation}
                      isSeatMapopen={isSeatMapopen}
                      setIsDropdown={setIsDropdown}
                      setIsSeatMapOpen={setIsSeatMapOpen}
                    />
                    {/* ) : (
                      <div
                        variants={variants}
                        onClick={() => {
                          setIsDropdown(false);
                          setIsSeatMapOpen(false);
                        }}
                        className="col-lg-12 mt-3"
                      >
                        <div className="bookflightPassenger">
                          <div
                            className="headingBookFlight-new"
                            style={{
                              padding: "12px",
                              color: "#E73C34",
                              backgroundColor: "#FFFBFB",
                            }}
                          >
                            <h3>Passenger Details</h3>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignContent: "center",
                            }}
                          >
                            <p>mohit joshi,god groot,Rajan Mishra</p>
                            <EditOutlined />
                          </div>
                        </div>
                      </div>
                    )
                    } */}

                    {!isDropdown && (
                      <div ref={dropdownRef} className="col-lg-12 mt-3">
                        {V_aliation ? (
                          <button
                            className="bookWrapperButton"
                            type="submit"
                            onClick={() => {
                              toggleDropdown();
                              isSeatsShow.isSeat && !isSeatsShow.loading
                                ? setIsSeatMapOpen(true)
                                : handleTravelClickOpen();
                            }}
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
                      </div>
                    )}
                    {/* {isSeatsShow?.loading || */}
                    {/* // (isSeatsShow?.isSeat && ( */}
                    <div ref={dropdownRef} className="col-lg-12 mt-3">
                      <div
                        className={`bookflightPassenger ${
                          isDropdown ? "" : "cnt-dis"
                        }`}
                      >
                        <>
                          <div>
                            <div
                              style={{
                                // height: "50px",

                                display: "flex",
                                // justifyContent: "center",
                                alignItems: "start",
                                gap: "5px",
                              }}
                              className="toggle-bar-seat"
                              onClick={() => {
                                isDropdown && toggleDropdown();
                                setIsSeatMapOpen(false);
                                console.log(isSeatMapopen, "isSeatMapopenm");
                              }}
                            >
                              <p>Selecting the Ideal Plane Seat</p>{" "}
                              <span
                                className={`arrow-dropdown ${
                                  isDropdown ? "open" : ""
                                }`}
                              >
                                <IoIosArrowForward />
                              </span>
                            </div>
                            {
                              <AirSeatMap
                                isDropdown={isDropdown}
                                state={ResultIndex}
                                passengerData={passengerData}
                                isSeatsShow={isSeatsShow}
                                setIsSeatsShow={setIsSeatsShow}
                                isSeatMapopen={isSeatMapopen}
                              />
                            }
                          </div>
                        </>
                      </div>
                    </div>
                    {/* ))} */}

                    <div className="d-block mt-3 d-sm-none col-lg-4 ">
                      <BookNowLeft
                        toggle={toggle}
                        toggleState={toggleState}
                        oncouponselect={handlecouponChange}
                        disountdata={handledisocuntChange}
                        onFinalAmountChange={handleFinalAmountChange}
                        transactionAmount={setTransactionAmountState}
                        Amount={transactionAmount}
                      />
                    </div>
                    {isDropdown && (
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
                            // onClick={() => handleTravelClickOpen()}
                          >
                            Continue
                          </button>
                        )}

                        <div>
                          {/* <Button onClick={handleOpen}>Open modal</Button> */}
                          <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                          >
                            <Box sx={style}>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "flex-end",
                                }}
                              >
                                <button
                                  style={{
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer",
                                    fontSize: "24px",
                                    fontWeight: "bold",
                                  }}
                                  onClick={handleClose}
                                  aria-label="Close"
                                >
                                  &times;
                                </button>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  height: "100%",
                                  justifyContent: "space-evenly",
                                }}
                              >
                                <h1
                                  style={{
                                    textAlign: "center",
                                    color: "black",
                                    fontWeight: "bold",
                                  }}
                                >
                                  Total Fare
                                </h1>
                                <div
                                  className="TotGstFlight"
                                  style={{
                                    borderRadius: "9px",
                                    backgroundColor: "aliceblue",
                                  }}
                                >
                                  <div
                                    style={{ display: "flex", color: "black" }}
                                  >
                                    <div
                                      style={{
                                        display: "flex",
                                        gap: "12px",
                                        color: "black",
                                      }}
                                    >
                                      <span
                                        style={{
                                          color: "black",
                                          fontSize: "18px",
                                          fontWeight: "600",
                                        }}
                                      >
                                        Base Fare:{" "}
                                      </span>
                                    </div>
                                    <p
                                      style={{
                                        color: "black",
                                        fontSize: "15px",
                                      }}
                                    >
                                      {"₹"}
                                      {Number(
                                        sesstioResultIndex?.monetaryDetail?.[0]
                                          ?.amount
                                      ) -
                                        Number(
                                          sesstioResultIndex
                                            ?.monetaryDetail?.[1]?.amount
                                        )}
                                    </p>
                                  </div>

                                  <div
                                    style={{ display: "flex", color: "black" }}
                                  >
                                    <span
                                      style={{
                                        color: "black",
                                        fontSize: "18px",
                                        fontWeight: "600",
                                      }}
                                    >
                                      Surcharges:{" "}
                                    </span>
                                    <p
                                      style={{
                                        color: "black",
                                        fontSize: "15px",
                                      }}
                                    >
                                      {"₹"}
                                      {Number(
                                        sesstioResultIndex?.monetaryDetail?.[1]
                                          ?.amount
                                      ).toFixed(0)}
                                    </p>
                                  </div>

                                  <div
                                    style={{ display: "flex", color: "black" }}
                                  >
                                    <span
                                      style={{
                                        color: "black",
                                        fontSize: "18px",
                                        fontWeight: "600",
                                      }}
                                    >
                                      Other Fare:{" "}
                                    </span>
                                    <p
                                      style={{
                                        color: "black",
                                        fontSize: "15px",
                                      }}
                                    >
                                      {"₹"}
                                      {(
                                        Number(taxvaluetotal) +
                                        Number(totalSeatAmount)
                                      ).toFixed(2)}
                                    </p>
                                  </div>

                                  {discountvalue > 0 && (
                                    <div
                                      style={{
                                        display: "flex",
                                        color: "black",
                                      }}
                                    >
                                      <span
                                        style={{
                                          color: "black",
                                          fontSize: "18px",
                                          fontWeight: "600",
                                        }}
                                      >
                                        Discount Amount:
                                      </span>
                                      <p
                                        style={{
                                          color: "black",
                                          fontSize: "15px",
                                        }}
                                      >
                                        {"₹"}
                                        {Number(discountvalue).toFixed(2)}
                                      </p>
                                    </div>
                                  )}

                                  <div
                                    style={{ display: "flex", color: "black" }}
                                  >
                                    <span
                                      style={{
                                        color: "black",
                                        fontSize: "18px",
                                        fontWeight: "600",
                                      }}
                                    >
                                      Grand Total:
                                    </span>
                                    <p
                                      style={{
                                        color: "black",
                                        fontSize: "15px",
                                      }}
                                    >
                                      {"₹"}
                                      {(
                                        Number(finalAmount) +
                                        Number(totalSeatAmount)
                                      ).toFixed(2)}
                                    </p>
                                  </div>
                                </div>
                                <div
                                  className=" mt-4 smallButtMobile"
                                  style={{
                                    display: "flex",
                                    flexDirection: "row-reverse",
                                  }}
                                >
                                  <button
                                    onClick={bookticketamd}
                                    style={{ padding: "10px 13px" }}
                                    className="bookWrapperButton"
                                  >
                                    Continue
                                  </button>
                                </div>
                              </div>
                            </Box>
                          </Modal>
                        </div>
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
                    )}
                  </motion.div>
                </motion.div>
                <div className="d-none d-sm-block col-lg-4 ">
                  {
                    <BookNowLeftAmd
                      onFinalAmountChange={handleFinalAmountChange}
                      disountdata={handledisocuntChange}
                      oncouponselect={handlecouponChange}
                    />
                  }
                </div>
              </div>
            </div>
          </div>
        )}

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
          </div>
        </Modal>
        <Authentic
          isOpen={isLoginModalOpen}
          onClose={handleModalClose}
          // isLogoutOpen={logoutModalVisible}
          // onLogoutClose={closeLogoutModal}
        />
      </>
    );
  } else {
    return <PaymentLoader />;
  }
}
