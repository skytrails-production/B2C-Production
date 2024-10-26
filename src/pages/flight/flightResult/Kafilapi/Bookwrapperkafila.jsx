import React, { useEffect, useState } from "react";
import { apiURL } from "../../../../Constants/constant";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import FlightLoader from "../../FlightLoader/FlightLoader";
import { FiArrowRight } from "react-icons/fi";
import { IoPersonSharp } from "react-icons/io5";
import Modal from "@mui/material/Modal";
import { Checkbox } from "antd";
import { PassengersAction } from "../../../../Redux/Passengers/passenger";
import {
  validateEmail,
  validateName,
  validatePhoneNumber,
  isValidPassportNumber,
  validateGender,
  validatetitle,
} from "../../../../utility/validationFunctions";
import lineimg from "../../../../images/line-01.png";
import Bookrightkafila from "./Bookrightkafila";
import Box from "@mui/material/Box";
import flightPaymentLoding from "../../../../images/loading/loading-ban.gif";
import { swalModal } from "../../../../utility/swal";
import SecureStorage from "react-secure-storage";
import Kafilameal from "./Kafilameal";
import Kafilabaggage from "./Kafilabaggage";
import { Dialog, DialogActions, DialogContent } from "@mui/material";
import PaymentLoader from "../../FlightLoader/paymentLoader";

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
  background: "aliceblue",
  height: 400,
  borderRadius: "15px",
  bgcolor: "aliceblue",
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function Bookwrapperkafila({}) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const reducerState = useSelector((state) => state);

  const queryParams = new URLSearchParams(location.search);
  const { ResultIndex } = location.state;
  const sesstioResultIndex = ResultIndex;

  const authenticUser = reducerState?.logIn?.loginData?.status;

  // //////////////////////////////////////////STATES////////////////////////////////////////////////////////////////////////
  const [isDisableScroll, setIsDisableScroll] = useState(false);
  const [couponvalue, setCouponValue] = useState("");
  const [discountvalue, setdiscountValue] = useState("");
  const [fareresponse, setresponse] = useState(null);
  const [toggle, setToggle] = useState(false);
  const [loader, setLoader] = useState(true);
  const [cNumber, setCnumber] = useState("");
  const [email, setEmail] = useState("");
  const [mealdata, setmealdata] = useState("");
  const [V_aliation, setValidation] = useState(false);
  const [loaderPayment, setLoaderPayment] = useState(false);
  const [sub, setSub] = useState(false);
  const [farePrice, setFarePrice] = useState("");
  const [firstnamevalue, setfirstnamevalue] = useState("");
  const [lastnamevalue, setlastnamevalue] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(null);
  const [numbervalue, setnumbervalue] = useState("");
  const [totalBaggageFare, setTotalBaggageFare] = useState(0);
  const [selectedbaggage, setselectedbaggage] = useState([]);
  const [selectedmeal, setselectedmeal] = useState();
  const [totalmealFare, setTotalmealFare] = useState(0);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [openTravelModal, setOpenTravelModal] = React.useState(false);
  const [isDropdown, setIsDropdown] = useState(true);
  const [loaderPayment1, setLoaderPayment1] = useState(false);
  const [refundTxnId, setRefundTxnId] = useState(null);
  const [pnrresponse, setpnrResponse] = useState(null);
  const [currentAdultCount, setCurrentAdultCount] = useState(0);
  const [currentChildCount, setcurrentChildCount] = useState(0);
  const [currentinfantCount, setcurrentinfantCount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);

  const passengerTemplate = {
    Title: "",
    FirstName: "",
    LastName: "",
    PaxType: 1,
    DateOfBirth: "",
    Gender: "",
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
    Gender: "",
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
    Gender: "",
    PassportNo: "",
    PassportExpiry: "",
    Fare: farePrice,
    IsLeadPax: false,
    FFAirlineCode: null,
    FFNumber: "",
  };

  // //////////////////////////////FUNCTION//////////////////////////////

  const passengerLists = [];
  const passengerChildLists = [];
  const passengerInfantLists = [];

  const handleModalClose = () => {
    setIsLoginModalOpen(false);
  };

  const handleClose = () => setOpen(false);

  const adultCount = queryParams.get("adult");
  const childCount = queryParams.get("child");
  const infantCount = queryParams.get("infant");

  const isDummyTicketBooking = JSON.parse(
    sessionStorage.getItem("hdhhfb7383__3u8748")
  );

  // ///////////////////////////////////////////////////////////////////////////////////////////////

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

  const allPassenger = [
    passengerLists,
    passengerChildLists,
    passengerInfantLists,
  ];

  const [passengerList, setPassengerList] = useState(passengerLists);
  const [passengerData, setPassengerData] = useState(allPassenger.flat());

  // ///////////////////////////////amount calculation /////////////////////////////////////////////

  const paramdata = reducerState?.oneWay?.kafilatvoresponse?.Param;
  const isPassportRequired =
    reducerState?.searchFlight?.flightDetails?.from?.CountryCode !== "IN" ||
    reducerState?.searchFlight?.flightDetails?.to?.CountryCode !== "IN"
      ? true
      : false;

  const markUpamount =
    reducerState?.markup?.markUpData?.data?.result[0]?.flightMarkup;

  const taxvalue =
    markUpamount *
    parseInt(fareresponse?.data?.result?.FareBreakup?.Journeys?.[0]?.TotalFare);

  // ///////////////////////////////////////////////modal///////////////////////////////
  const bookticketvo = () => {
    setOpenTravelModal(true);
  };

  const handleTravelClickOpen = () => {
    if (authenticUser !== 200) {
      setIsLoginModalOpen(true);
    } else {
      setOpen(true);
    }
  };
  const handleTravelClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpenTravelModal(false);
      setOpen(false);
    }
  };

  // /////////////////////////passenger validation////////////////////////////////////////////////

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  };

  const datet = new Date();
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
    // console.log("Passengerdatabookwraper", passengerData);
  };
  const validation = async () => {
    const result = await passengerData.filter(
      (item) =>
        validateName(item.FirstName) &&
        validateName(item.LastName) &&
        validateDate(item.DateOfBirth) &&
        validateGender(item.Gender) &&
        validatetitle(item.Title) &&
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

  function convertDateFormat(inputDate) {
    const [year, month, day] = inputDate?.split("-");
    const newDate = new Date(year, month - 1, day);
    const outputDate = newDate?.toISOString()?.slice(0, 10);
    return outputDate;
  }

  const passengerdetail = (e) => {
    const isChecked = e.target.checked;
    // console.log(passengerData,"gasjdgajdgasjd");
    if (isChecked) {
      const fullName = reducerState?.logIn?.loginData?.data?.result?.username;
      const lastName = fullName ? fullName.split(" ").slice(1).join(" ") : "";
      const firstName = fullName ? fullName.split(" ")[0] : "";
      const phonenumber =
        reducerState?.logIn?.loginData?.data?.result?.phone?.mobile_number;

      setnumbervalue(phonenumber);
      setfirstnamevalue(firstName);
      setlastnamevalue(lastName);
      handleServiceChange(
        { target: { name: "FirstName", value: firstName } },
        0
      );
      handleServiceChange({ target: { name: "LastName", value: lastName } }, 0);
      handleServiceChange(
        { target: { name: "ContactNo", value: phonenumber } },
        0
      );
      // handleServiceChange()
    } else {
      setfirstnamevalue(" ");
      setlastnamevalue(" ");
      setnumbervalue("");
      handleServiceChange({ target: { name: "FirstName", value: "" } }, 0);
      handleServiceChange({ target: { name: "LastName", value: "" } }, 0);
      handleServiceChange({ target: { name: "ContactNo", value: "" } }, 0);
    }
  };

  // ///////////////////autofill passenger//////////////////////////
  const addAdult = () => {
    if (currentAdultCount < adultCount) {
      setCurrentAdultCount((prevCount) => prevCount + 1);
    }
  };

  const addChild = () => {
    if (currentChildCount < childCount) {
      setcurrentChildCount((prevCount) => prevCount + 1);
    }
  };

  const addinfant = () => {
    if (currentinfantCount < infantCount) {
      setcurrentinfantCount((prevCount) => prevCount + 1);
    }
  };

  let totalPassenger =
    Number(adultCount) + Number(childCount) + Number(infantCount);

  // ///////////////////////////coupon baggage  /////////////////////////////////////////////////
  const handleBaggageFareChange = (fare) => {
    setTotalBaggageFare(fare);
  };

  const handleselectedbaggage = (baggage) => {
    setselectedbaggage(baggage);
  };

  const handlemealcharge = (fare1) => {
    setTotalmealFare(fare1);
  };

  const handleselectedmeal = (meal) => {
    setselectedmeal(meal);
  };

  const toggleState = (e) => {
    setToggle(e);
  };

  const handleFinalAmountChange = (amount) => {
    setFinalAmount(amount);
  };

  const handledisocuntChange = (amount) => {
    setdiscountValue(amount);
  };

  const handlecouponChange = (code) => {
    setCouponValue(code);
  };

  // ////////////////////////////////////////////API///////////////////////////////////////////////////
  const apiUrlPayment = `${apiURL.baseURL}/skyTrails/api/transaction/easebussPayment`;

  const couponconfirmation = async () => {
    try {
      const token = SecureStorage.getItem("jwtToken");
      const response = await axios.get(
        `${apiURL.baseURL}/skyTrails/api/coupons/couponApplied/${couponvalue}`,

        {
          headers: {
            token: token,
          },
        }
      );
    } catch (error) {}
  };

  const kafilaapi = async () => {
    const payload = {
      Param: paramdata,
      SelectedFlights: [sesstioResultIndex],
    };
    try {
      const response = await axios.post(
        `${apiURL.baseURL}/skyTrails/api/kafila/kafilaFareCheck`,
        payload
      );
      setresponse(response);
      // ssrapi(response);
      setLoader(false);
    } catch (error) {}
  };

  // const ssrapi = async (fareresponse) => {
  //   const payload = {
  //     IsFareUpdate: fareresponse?.data?.result?.IsFareUpdate,
  //     IsAncl: fareresponse?.data?.result?.IsAncl,
  //     Param: fareresponse?.data?.result?.Param,
  //     SelectedFlight: fareresponse?.data?.result?.SelectedFlight,
  //     FareBreakup: fareresponse?.data?.result?.FareBreakup,
  //     GstData: fareresponse?.data?.result?.GstData,
  //     IsAncl: fareresponse?.data?.result?.IsAncl,

  //   };
  //   try {

  //     const response = await axios.post(
  //       `${apiURL.baseURL}/skyTrails/api/kafila/kafilaSSR`,
  //       payload
  //     );
  //     // setresponse(response);
  //     setmealdata(response);
  //     // console.log(response);
  //   } catch (error) { }
  // };

  const kafilapnr = async () => {
    const payloadvalue = {
      FareChkRes: {
        IsFareUpdate: fareresponse?.data?.result?.IsFareUpdate,
        IsAncl: fareresponse?.data?.result?.IsAncl,
        Param: paramdata,
        SelectedFlight: fareresponse?.data?.result?.SelectedFlight,
        FareBreakup: fareresponse?.data?.result?.FareBreakup,
        GstData: null,
      },
      PaxInfo: {
        GstData: {
          IsGst: false,
          GstDetails: null,
        },
        PaxEmail: apiURL.flightEmail,
        PaxMobile: passengerData[0]?.ContactNo,
        Passengers: passengerData?.map((item, index) => {
          const paxvalue =
            item?.PaxType === 1
              ? "ADT"
              : item?.PaxType === 2
              ? "CHD"
              : item?.PaxType === 3
              ? "INF"
              : null;

          return {
            PaxType: paxvalue,
            Title: item?.Title,
            FName: item?.FirstName,
            LName: item?.LastName,
            Gender: item?.Gender === 1 ? "Male" : "Female",
            Dob: item?.DateOfBirth,
            // Dob:null,
            // selectedbaggage?.[index] == undefined ? [] : [selectedbaggage?.[index]]
            Baggage: [],
            Special: [],
            Meal: [],

            Seat: null,
            Optional: {
              TicketNumber: "",
              PassportNo: item?.PassportNo,
              PassportExpiryDate: isPassportRequired
                ? item?.PassportExpiry
                : "",
              FrequentFlyerNo: "",
              Nationality: item?.CountryCode,
              ResidentCountry: item?.CountryCode,
            },
          };
        }),
      },
    };
    try {
      const response = await axios.post(
        `${apiURL.baseURL}/skyTrails/api/kafila/kafilaPnrcreation`,
        payloadvalue
      );
      // setresponse(response);
      // console.log("response aagya", response);
      setpnrResponse(response?.data);
      // console.log(response);
    } catch (error) {}
  };

  const refundAmount = async () => {
    try {
      const token = SecureStorage.getItem("jwtToken");
      const payload = {
        // refund_amount: 1,
        refund_amount:
          // parseInt(ResultIndex?.monetaryDetail?.[0]?.amount) +
          // markUpamount *
          //   parseInt(ResultIndex?.monetaryDetail?.[0]?.amount).toFixed(0),
          Number(finalAmount).toFixed(2),

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
    } finally {
    }
  };

  // console.log(fareresponse);

  useEffect(() => {
    if (fareresponse?.data?.result?.Error?.IsError === true) {
      navigate("/");
    }
  });

  // ////////////////////////////////////////////Payment////////////////////////////////////////////////////

  const handlePayment = async () => {
    const token = SecureStorage?.getItem("jwtToken");

    setLoaderPayment1(true);

    const payload = {
      firstname: passengerData[0]?.FirstName,
      phone: passengerData[0]?.ContactNo,
      origin: reducerState?.searchFlight?.flightDetails?.from?.name,
      destination: reducerState?.searchFlight?.flightDetails?.to?.name,
      oneyWayDate: reducerState?.searchFlight?.flightDetails?.departureDate,
      returnDate: "",
      amount: !isDummyTicketBooking ? parseInt(finalAmount) : 99,
      // amount: 1,

      email: passengerData[0]?.Email,
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
        console.error("API call failed with status:", response.status);
        const errorData = await response.json();
        console.error("Error details:", errorData);
        setIsDisableScroll(false);
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
            setRefundTxnId(response.easepayid);
            const verifyResponse = await axios.post(
              `${apiURL.baseURL}/skyTrails/api/transaction/paymentSuccess?merchantTransactionId=${response.txnid}`,
              { easeBuzzPayId: easeBuzzPayId }
            );
            setLoaderPayment(true);
            dispatch(PassengersAction(passengerData));
            // kafilapnr();
          } catch (error) {
            console.error("Error verifying payment:", error);
            // Handle error
          }

          couponconfirmation();
          setIsDisableScroll(false);
        } else {
          try {
            const verifyResponse = await axios.post(
              `${apiURL.baseURL}/skyTrails/api/transaction/paymentFailure?merchantTransactionId=${response.txnid}`
            );
            swalModal("py", verifyResponse.data.responseMessage, false);
            setTransactionAmount(null);
            setIsDisableScroll(false);
            sessionStorage.removeItem("couponCode");
            setToggle(false);
          } catch (error) {
            console.error("Error verifying payment:", error);
            setIsDisableScroll(false);
          }
        }
      },
      theme: "#123456",
    };

    easebuzzCheckout.initiatePayment(options);
  };

  // const handlePayment = () => {
  //   kafilapnr();
  // }

  useEffect(() => {
    if (loaderPayment == true) {
      kafilapnr();
    }
  }, [loaderPayment]);

  // ///////////////////////////////////flightdata///////////////////////////////////////////////////////
  const FCode = sesstioResultIndex?.FCode;
  const flightcode = FCode.split(",")[0];

  // departuretime
  const dateTime = new Date(sesstioResultIndex?.DDate);
  const hours = dateTime.getHours().toString().padStart(2, "0");
  const minutes = dateTime.getMinutes().toString().padStart(2, "0");
  const departuretime = `${hours}:${minutes}`;

  // /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    kafilaapi();
  }, []);

  // console.log(selectedmeal,"selectedmealselectedmealselectedmeal")

  useEffect(() => {
    if (pnrresponse?.result?.BookingInfo?.CurrentStatus === "CONFIRMED") {
      navigate("/bookedTicketkafila", {
        state: {
          // baggage: totalBaggageFare,
          // meal: totalmealFare,
          // totalSeatAmount:totalSeatAmount,
          finalvalue: finalAmount,
          // baggagedata: selectedbaggage,
          // seats: allSeats,
          // mealDynamic: selectedmeal,
          discount: discountvalue,
          sesstioResultIndex: sesstioResultIndex,
          pnrresponse: pnrresponse,
        },
      });
    } else if (
      pnrresponse?.result?.BookingInfo?.CurrentStatus === "FAILED" ||
      pnrresponse?.result?.BookingInfo?.CurrentStatus === "REJECTED"
    ) {
      refundAmount();
      console.log("error ");
      navigate("/bookedTicketkafila", {
        state: {
          // baggage: totalBaggageFare,
          // meal: totalmealFare,
          // totalSeatAmount:totalSeatAmount,
          finalvalue: finalAmount,
          // baggagedata: selectedbaggage,
          // seats: allSeats,
          // mealDynamic: selectedmeal,
          discount: discountvalue,
          sesstioResultIndex: sesstioResultIndex,
          pnrresponse: pnrresponse,
        },
      });
    }
  }, [pnrresponse]);

  // ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

  if (loader) {
    return <FlightLoader />;
  }

  // /////////////////////////////////////////////////////////////////////////////

  if (loaderPayment == false) {
    return (
      <div className="">
        <div className="container px-0 pt-4">
          <div className="row" style={{ width: "100%" }}>
            <motion.div
              variants={variants}
              initial="initial"
              whileInView="animate"
              className="col-lg-8"
            >
              <motion.div className="row">
                <motion.div variants={variants} className=" col-lg-12 ">
                  {
                    <div
                      className="booknowFlight"
                      style={{ borderRadius: "10px" }}
                    >
                      <div className="bookaboveBox">
                        <div style={{ width: "100%" }}>
                          <div className="itemticket">
                            <div>
                              <p>
                                {sesstioResultIndex?.Itinerary[0]?.SrcName}
                                <FiArrowRight style={{ margin: "5px" }} />{" "}
                                {
                                  sesstioResultIndex?.Itinerary[
                                    sesstioResultIndex?.Itinerary.length - 1
                                  ]?.DesName
                                }
                              </p>
                            </div>
                            {/* <div>
                            {TicketDetails?.AirlineRemark !== null &&
                              TicketDetails?.AirlineRemark !== "--." ? (
                              <p className="text-center w-100 mandaField-new">
                                {TicketDetails?.AirlineRemark}
                              </p>

                            ) : (
                              ""
                            )}
                          </div> */}
                          </div>

                          <div className="aboveSpan">
                            <span>
                              <img
                                src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/${flightcode}.png`}
                                style={{
                                  height: "50px",
                                  width: "50px",
                                  borderRadius: "5px",
                                }}
                              />
                            </span>
                            <span className="aboveSOne">{departuretime}</span>
                            {/* <span>Non Stop {duration}</span> */}
                            <span style={{ color: "#E73C34" }}>
                              {" "}
                              {/* {sesstioResultIndex?.Itinerary[0].length > 1
                              ? `${sesstioResultIndex?.Itinerary[0].length - 1
                              } stop via ${sesstioResultIndex?.Itinerary[0][0]
                                ?.Destination?.Airport?.CityName
                              }`
                              : "Non Stop"} */}
                            </span>
                          </div>
                        </div>
                      </div>

                      {sesstioResultIndex?.Itinerary?.map((item, index) => {
                        const dateTime = new Date(item?.DDate);
                        const hours = dateTime
                          .getHours()
                          .toString()
                          .padStart(2, "0");
                        const minutes = dateTime
                          .getMinutes()
                          .toString()
                          .padStart(2, "0");
                        const departuretime = `${hours}:${minutes}`;

                        const dateTimearrival = new Date(item?.ADate);
                        const hoursarrival = dateTimearrival
                          .getHours()
                          .toString()
                          .padStart(2, "0");
                        const minutesarrival = dateTimearrival
                          .getMinutes()
                          .toString()
                          .padStart(2, "0");
                        const departuretimearrival = `${hoursarrival}:${minutesarrival}`;

                        {
                          /* console.log(sesstioResultIndex,"sesstioResultIndexsesstioResultIndexsesstioResultIndex"); */
                        }

                        return (
                          <div>
                            <div
                              style={{
                                background: "rgb(247, 241, 255)",
                                borderRadius: "10px",
                                padding: " 8px",
                              }}
                            >
                              <div
                                key={index}
                                className="container flightdestination mb-4"
                                style={{ paddingTop: "13px" }}
                              >
                                <div className="row  w-100 flight-detailss">
                                  <div className="col-6 col-md-5 align-items-center mb-3 mb-md-0 flightdestination-right">
                                    <p className="flightdestination-right-para">
                                      {item?.SrcName}{" "}
                                    </p>
                                    <p className="flightdestination-right-para">
                                      {departuretime}
                                    </p>
                                    <p className="flightdestination-right-para1">
                                      {item?.DArpt}
                                      <p className="flightdestination-right-para1">
                                        {" "}
                                        Terminal-
                                        {item?.DTrmnl ? item?.DTrmnl : "X"}
                                      </p>
                                    </p>
                                  </div>
                                  <div
                                    className="col-12 col-md-2  mb-3 mb-md-0"
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      alignItems: "center",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <div style={{ fontSize: "12px" }}>
                                      {/* {timeString} */}
                                    </div>
                                    <div className="d-flex flex-column align-items-center">
                                      <img
                                        src={lineimg}
                                        alt=""
                                        style={{ width: "100%" }}
                                      />
                                    </div>
                                  </div>
                                  <div className="col-6 col-md-5 align-items-center flightdestination-right">
                                    <p className="flightdestination-right-para">
                                      {item?.DesName}{" "}
                                    </p>
                                    <p className="flightdestination-right-para">
                                      {departuretimearrival}
                                    </p>
                                    <p className="flightdestination-right-para1">
                                      {item?.AArpt}
                                      <p className="flightdestination-right-para1">
                                        {" "}
                                        Terminal-
                                        {item?.ATrmnl ? item?.ATrmnl : "Y"}
                                      </p>
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <hr style={{ opacity: "0.3" }} />
                              <p
                                style={{
                                  fontSize: "15px",
                                  color: "var(--black4)",
                                  fontWeight: 500,
                                  fontFamily: "Montserrat",
                                  padding: "5px",
                                }}
                              >
                                <i
                                  class="fa-solid fa-bag-shopping"
                                  style={{ color: "black" }}
                                ></i>{" "}
                                Baggage (ADULT) check-in{" "}
                                <span>
                                  {sesstioResultIndex?.FareRule?.CHKNBG}{" "}
                                </span>{" "}
                                cabin {sesstioResultIndex?.FareRule?.CBNBG}
                              </p>
                            </div>

                            {/* {layover !== "" && (
                            <div className="flightLayoverOuter">
                              <div className="flightLayover">

                                <p className="text-bold">
                                  Layover Time:{" "}
                                 {item?.layover}
                                </p>
                              </div>
                            </div>
                          )} */}
                          </div>
                        );
                      })}
                    </div>
                  }
                </motion.div>

                <motion.div variants={variants} className="col-lg-12 mt-3">
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
                    {sub && !V_aliation && (
                      <p
                        className="form-label"
                        style={{ color: "red", textAlign: "center" }}
                      >
                        <i class="fa-solid fa-circle-info"></i> Please fill all
                        the required fields.
                      </p>
                    )}

                    <div
                      onClick={addAdult}
                      style={{
                        cursor: "pointer",
                        padding: "12px",
                        fontWeight: 600,
                      }}
                    >
                      <p className="textcolor">
                        {" "}
                        +Add the Adult ({currentAdultCount}/{adultCount})
                      </p>

                      {sub && !V_aliation && currentAdultCount < adultCount && (
                        <p className="form-label" style={{ color: "red" }}>
                          Please add the remaining{" "}
                          {adultCount - currentAdultCount} adult(s)
                        </p>
                      )}
                    </div>

                    {currentAdultCount > 0 &&
                      Array.from({ length: currentAdultCount }, (_, index) => (
                        <div className="bookFlightPassInner" key={index}>
                          <div
                            className="bookAdultIndex"
                            style={{ display: "flex", gap: "12px" }}
                          >
                            <IoPersonSharp />{" "}
                            <p className="textcolor">Adult {index + 1}</p>
                          </div>
                          <div className="row g-3 mb-3">
                            <div className="col-lg-6 col-md-6">
                              <label
                                for="exampleInputEmail1"
                                class="form-label"
                              >
                                Title
                              </label>
                              <select
                                className="form-select "
                                name="Title"
                                value={passengerData[index].Title || ""}
                                onChange={(e) => handleServiceChange(e, index)}
                              >
                                <option value="">Select Title</option>
                                <option value="Mr">Mr.</option>
                                <option value="Mrs">Mrs.</option>
                                <option value="Miss">Miss</option>
                              </select>
                              {sub &&
                                !validatetitle(passengerData[index].Title) && (
                                  <span className="error10">Select Title</span>
                                )}
                            </div>

                            <div className="col-lg-6 col-md-6">
                              <label
                                for="exampleInputEmail1"
                                class="form-label"
                              >
                                First Name
                              </label>
                              <input
                                type="text"
                                name="FirstName"
                                value={
                                  index === 0
                                    ? firstnamevalue
                                    : passengerData[index]?.FirstName || ""
                                }
                                id="floatingInput"
                                className="form-control"
                                onChange={(e) => {
                                  if (index === 0) {
                                    setfirstnamevalue(e.target.value);
                                  }
                                  handleServiceChange(e, index);
                                }}
                                placeholder="First Name"
                              />
                              {sub &&
                                !validateName(
                                  passengerData[index].FirstName
                                ) && (
                                  <span className="error10">First name </span>
                                )}
                            </div>
                          </div>
                          <div className="row g-3 mb-3">
                            <div className="col-lg-6 col-md-6">
                              <label
                                for="exampleInputEmail1"
                                class="form-label"
                              >
                                Last Name
                              </label>
                              <input
                                type="text"
                                name="LastName"
                                value={
                                  index === 0
                                    ? lastnamevalue
                                    : passengerData[index]?.LastName || ""
                                }
                                id="floatingInput"
                                className="form-control"
                                onChange={(e) => {
                                  if (index === 0) {
                                    setlastnamevalue(e.target.value);
                                  }
                                  handleServiceChange(e, index);
                                }}
                                placeholder="Last Name"
                              />
                              {sub &&
                                !validateName(
                                  passengerData[index].LastName
                                ) && (
                                  <span className="error10">Last name </span>
                                )}
                            </div>
                            <div className="col-lg-6 col-md-6">
                              <label
                                for="exampleInputEmail1"
                                class="form-label"
                              >
                                Gender
                              </label>
                              <select
                                className="form-select"
                                name="Gender"
                                onChange={(e) => handleServiceChange(e, index)}
                              >
                                <option value="">Select Gender</option>
                                <option value="1">Male</option>
                                <option value="2">Female</option>
                              </select>
                              {sub &&
                                !validateGender(
                                  passengerData[index].Gender
                                ) && (
                                  <span className="error10">Select Gender</span>
                                )}
                            </div>
                          </div>
                          <div className="row g-3 mb-3">
                            <div className="col-lg-6 col-md-6">
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
                                onChange={(e) => handleServiceChange(e, index)}
                                max={maxDate}
                              ></input>
                              {sub &&
                                !validateDate(
                                  passengerData[index].DateOfBirth
                                ) && <span className="error10">DOB </span>}
                            </div>
                          </div>

                          {isPassportRequired == true ? (
                            <>
                              <div className="bookAdultIndex">
                                <p>Passport Details</p>
                              </div>
                              <div className="row g-3 mb-3">
                                <div className="col-lg-6 col-md-6">
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
                                <div className="col-lg-6 col-md-6">
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

                    {childCount > 0 && (
                      <div
                        onClick={addChild}
                        style={{
                          cursor: "pointer",
                          padding: "12px",
                          fontWeight: 600,
                        }}
                      >
                        <p className="textcolor">
                          {" "}
                          +Add the Child ({currentChildCount}/{childCount})
                        </p>

                        {sub &&
                          !V_aliation &&
                          currentChildCount < childCount && (
                            <p className="form-label" style={{ color: "red" }}>
                              Please add the remaining{" "}
                              {childCount - currentChildCount} child(s)
                            </p>
                          )}
                      </div>
                    )}

                    {currentChildCount > 0 &&
                      Array.from({ length: currentChildCount }, (_, index) => (
                        <div className="bookFlightPassInner" key={index}>
                          <div className="bookAdultIndex">
                            <p className="textcolor">Child {index + 1}</p>
                          </div>
                          <div className="row g-3 mb-3">
                            <div className="col-lg-6 col-md-6">
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
                                  <span className="error10">First name </span>
                                )}
                            </div>
                            <div className="col-lg-6 col-md-6">
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

                            <div className="col-lg-6 col-md-6">
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
                                <option value="">Select Gender</option>
                                <option value="1">Male</option>
                                <option value="2">Female</option>
                              </select>
                              {sub &&
                                !validateGender(
                                  passengerData[index + Number(adultCount)]
                                    .Gender
                                ) && (
                                  <span className="error10">Select Gender</span>
                                )}
                            </div>
                            <div className="col-lg-6 col-md-6">
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
                                <div className="col-lg-6 col-md-6">
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
                                      passengerData[index + Number(adultCount)]
                                        .PassportNo
                                    ) && (
                                      <span className="error10">
                                        Enter a valid Passport Number{" "}
                                      </span>
                                    )}
                                </div>
                                <div className="col-lg-6 col-md-6">
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
                    {infantCount > 0 && (
                      <div
                        onClick={addinfant}
                        style={{
                          cursor: "pointer",
                          padding: "12px",
                          fontWeight: 600,
                        }}
                      >
                        <p className="textcolor">
                          {" "}
                          +Add the infant ({currentinfantCount}/{infantCount})
                        </p>
                        {sub &&
                          !V_aliation &&
                          currentinfantCount < infantCount && (
                            <p className="form-label" style={{ color: "red" }}>
                              Please add the remaining{" "}
                              {infantCount - currentinfantCount} Infant(s)
                            </p>
                          )}
                      </div>
                    )}
                    {currentinfantCount > 0 &&
                      Array.from({ length: currentinfantCount }, (_, index) => (
                        <div className="bookFlightPassInner" key={{ index }}>
                          <div className="bookAdultIndex">
                            <p className="textcolor">Infant {index + 1}</p>
                          </div>
                          <div className="row g-3 mb-3">
                            <div className="col-lg-6 col-md-6">
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
                                  <span className="error10">First name </span>
                                )}
                            </div>
                            <div className="col-lg-6 col-md-6">
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
                                  <span className="error10">Last name </span>
                                )}
                            </div>

                            <div className="col-lg-6 col-md-6">
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
                                <option value="">Select Gender</option>
                                <option value="1">Male</option>
                                <option value="2">Female</option>
                              </select>
                              {sub &&
                                !validateGender(
                                  passengerData[
                                    index +
                                      Number(adultCount) +
                                      Number(childCount)
                                  ].Gender
                                ) && (
                                  <span className="error10">Select Gender</span>
                                )}
                            </div>
                            <div className="col-lg-6 col-md-6">
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
                                <div className="col-lg-6 col-md-6">
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
                                <div className="col-lg-6 col-md-6">
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
                  </div>
                </motion.div>

                {authenticUser == 200 ? (
                  <div
                    style={{
                      padding: "15px",
                      display: "flex",
                      justifyContent: "flex-end",
                      marginTop: "12px",
                      marginBottom: "12px",
                      backgroundColor: "#FFFBFB",
                    }}
                  >
                    <Checkbox
                      onChange={passengerdetail}
                      style={{ color: "#E73C34", fontWeight: "bold" }}
                    >
                      Booking flight for yourself
                    </Checkbox>
                  </div>
                ) : (
                  " "
                )}

                <motion.div variants={variants} className="col-lg-12 mt-3">
                  <div className="bookflightPassenger">
                    <form>
                      <div className="bookFlightPassInner">
                        <div className="bookAdultIndex">
                          <p>Your Booking Details will be sent to</p>
                        </div>
                        <div className="row g-3 mb-3">
                          <div className="col-lg-6 col-md-6">
                            <label for="exampleInputEmail1" class="form-label">
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
                            {sub && !validateEmail(passengerData[0].Email) && (
                              <span className="error10">
                                Enter a Valid Email{" "}
                              </span>
                            )}
                          </div>
                          <div className="col-lg-6 col-md-6">
                            <label for="exampleInputEmail1" class="form-label">
                              Mobile Number
                            </label>
                            <input
                              type="phone"
                              name="ContactNo"
                              value={numbervalue}
                              id="floatingInput"
                              class="form-control"
                              onChange={(e) => {
                                setnumbervalue(e.target.value);
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

                {/* <motion.div variants={variants} className="col-lg-12 mt-3">
                <div>
                  <div className="col-lg-12 mt-3">
                    <Kafilameal sesstioResultIndex={sesstioResultIndex} mealdata={
                      mealdata} mealfaredata={handlemealcharge} mealselect={handleselectedmeal}/>

                  </div>
                  <div className="col-lg-12 mt-3">
             
                  </div>

                 
                </div>
              </motion.div> */}

                {/* <motion.div variants={variants} className="col-lg-12 mt-3">
                <div>
                  <div className="col-lg-12">
                    <Kafilabaggage sesstioResultIndex={sesstioResultIndex} mealdata={
                      mealdata} baggagefaredata={handleBaggageFareChange} baggageselect={handleselectedbaggage} />
                  </div>


                </div>
              </motion.div> */}

                {/* {isDropdown && */}
                <div className="col-lg-12 my-4 smallButtMobile d-flex justify-content-between align-items-center">
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
                      onClick={() => setSub(true)}
                    >
                      Continue
                    </button>
                  )}

                  <div>
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                      // footer={null}
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
                            <div style={{ display: "flex" }}>
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
                                  Base Fare :{" "}
                                </span>
                              </div>
                              <p style={{ color: "black", fontSize: "15px" }}>
                                {" "}
                                {"₹"}{" "}
                                {parseInt(
                                  fareresponse?.data?.result?.FareBreakup
                                    ?.Journeys?.[0]?.BasicTotal
                                )}
                              </p>
                            </div>

                            <div style={{ display: "flex", color: "black" }}>
                              <span
                                style={{
                                  color: "black",
                                  fontSize: "18px",
                                  fontWeight: "600",
                                }}
                              >
                                Surcharge :{" "}
                              </span>
                              <p style={{ color: "black", fontSize: "15px" }}>
                                {" "}
                                {"₹"}
                                {parseInt(
                                  fareresponse?.data?.result?.FareBreakup
                                    ?.Journeys?.[0]?.TaxTotal
                                )}
                              </p>
                            </div>
                            <div style={{ display: "flex", color: "black" }}>
                              <span
                                style={{
                                  color: "black",
                                  fontSize: "18px",
                                  fontWeight: "600",
                                }}
                              >
                                Other TAX :{" "}
                              </span>
                              <p style={{ color: "black", fontSize: "15px" }}>
                                {"₹"}
                                {parseInt(
                                  Number(taxvalue) +
                                    Number(totalBaggageFare) +
                                    Number(totalmealFare)
                                )}
                              </p>
                            </div>

                            {discountvalue > 0 && (
                              <div style={{ display: "flex", color: "black" }}>
                                <span
                                  style={{
                                    color: "black",
                                    fontSize: "18px",
                                    fontWeight: "600",
                                  }}
                                >
                                  Discount Amount :
                                </span>
                                <p style={{ color: "black", fontSize: "15px" }}>
                                  {"₹"}
                                  {Number(discountvalue).toFixed(2)}
                                </p>
                              </div>
                            )}

                            <div style={{ display: "flex", color: "black" }}>
                              <span
                                style={{
                                  color: "black",
                                  fontSize: "18px",
                                  fontWeight: "600",
                                }}
                              >
                                Grand Total :
                              </span>
                              <p style={{ color: "black", fontSize: "15px" }}>
                                {"₹"}

                                {/* {grandtotalamount} */}
                                {parseInt(
                                  Number(finalAmount) +
                                    Number(totalBaggageFare) +
                                    Number(totalmealFare)
                                )}
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
                              onClick={bookticketvo}
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

                  <div></div>

                  <Dialog
                    sx={{ zIndex: "99999" }}
                    disableEscapeKeyDown
                    open={openTravelModal}
                    // onClose={handleTravelClose}
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
                {/* } */}
              </motion.div>
            </motion.div>
            <div className="d-none d-sm-block col-lg-4 ">
              <Bookrightkafila
                toggle={toggle}
                totalBaggageFare={totalBaggageFare}
                sesstioResultIndex={sesstioResultIndex}
                toggleState={toggleState}
                fareresponse={fareresponse}
                oncouponselect={handlecouponChange}
                disountamount={handledisocuntChange}
                transactionAmount={transactionAmount}
                onFinalAmountChange={handleFinalAmountChange}
                mellAmount={totalmealFare}
              />
            </div>

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
          </div>
        </div>
      </div>
    );
  } else {
    return <PaymentLoader />;
  }
}

export default Bookwrapperkafila;
