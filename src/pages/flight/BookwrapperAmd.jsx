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
import InsideNavbar from "../../UI/BigNavbar/InsideNavbar";
import { motion } from "framer-motion";
import SecureStorage from "react-secure-storage";
import { FiArrowRight } from "react-icons/fi";
import moment from "moment";
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
import BookNowLeftAmd from "./BookNowLeftAmd";
import PaymentLoader from "./FlightLoader/paymentLoader";
import Flighterror from "./Flighterror";
import axios from "axios";
import dayjs from "dayjs";
import Modal from "@mui/material/Modal";
import Accordion from "react-bootstrap/Accordion";
import loginnew from "../../images/login-01.jpg";
import { useNetworkState } from "react-use";
// import { useLocation } from "react-router-dom";
import { swalModal } from "../../utility/swal";
import { XMLParser } from "fast-xml-parser";
import CloseIcon from "@mui/icons-material/Close";
import userApi from "../../Redux/API/api";
import {
  validateEmail,
  validateName,
  validatePhoneNumber,
  isValidPassportNumber,
} from "../../utility/validationFunctions";
import flightPaymentLoding from "../../images/loading/loading-ban.gif";
import { Checkbox } from 'antd';

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
  const dispatch = useDispatch();
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
  const [V_aliation, setValidation] = useState(false);
  const [loaderPayment, setLoaderPayment] = useState(false);
  const [loaderPayment1, setLoaderPayment1] = useState(false);
  const [isDisableScroll, setIsDisableScroll] = useState(false);
  const [refundTxnId, setRefundTxnId] = useState(null);
  const arrivalMomentt = moment(`${"010724"} ${"0555"}`, "DDMMYYYY HHmm");


  const [finalAmount, setFinalAmount] = useState(0);

const handleFinalAmountChange = (amount) => {
  setFinalAmount(amount);
};

const [couponvalue, setCouponValue] = useState("");
const handlecouponChange = (code) => {
  setCouponValue(code);
};

// console.log("couponvalue",couponvalue);



// console.log("ResultIndex",ResultIndex);


// console.log("amount",finalAmount);
  // '1800' '0555'
  const arrTimeISOt = arrivalMomentt.toISOString();
  // console.log(arrTimeISOt, "arrTimeISOttttttttttttttttttttttttttttttt")

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

  function convertExcelDateTimeToISO(excelDate, excelTime) {
    // Convert Excel date to JavaScript Date object
    var date = new Date(Date.UTC(1900, 0, excelDate - 1)); // Subtract 1 because Excel starts counting from 1/1/1900

    // Extract hours and minutes from Excel time
    var hours = Math.floor(excelTime / 100); // Extract hours
    var minutes = excelTime % 100; // Extract minutes

    // Set hours and minutes to the Date object
    date.setUTCHours(hours, minutes, 0, 0); // Set hours, minutes, seconds, milliseconds (we set seconds and milliseconds to 0)

    // Convert Date object to ISO 8601 format
    var isoDate = date?.toISOString();

    return isoDate;
  }

  // Parse and format the arrival time and date

  // if (arrTimeString1 && arrTimeString1.length === 2) {

  //   arrTimeString1 = '00' + arrTimeString1;
  // }
  // if (arrTimeString1 && arrTimeString1.length === 3) {

  //   arrTimeString1 = '0' + arrTimeString1;

  // }
  // if (depTimeString && depTimeString.length === 2) {
  //   depTimeString = '00' + depTimeString;
  // }
  const arrivalMoment = moment(
    `${arrDateString} ${arrTimeString1}`,
    "DDMMYYYY HHmm"
  );
  const departureMoment = moment(
    `${depDateString} ${depTimeString}`,
    "DDMMYYYY HHmm"
  );
  const depTimeISO1 = departureMoment.toISOString();
  // const depTimeISO1=depDateString !=="undefined"? convertExcelDateTimeToISO(depDateString, depTimeString):null
  // const arrTimeISO1=arrDateString !=="undefined" ? convertExcelDateTimeToISO(arrDateString, arrTimeString1):null
  const arrTimeISO1 = arrivalMoment.toISOString();

  // Output: "2024-09-26T10:15:00.000Z"
  const navigate = useNavigate();

  // return <div>hiiii</div>;

 

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
  const convertXmlToJsonSavePnr = async (res) => {
    const parser = new XMLParser();
    const result = await parser.parse(res);
    let convertData;
    if (res !== "") {
      convertData = result["soapenv:Envelope"]["soapenv:Body"]["PNR_Reply"];
      setJsonSaveData(convertData);
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

  const notOnline = useNetworkState();
  // useEffect(() => {
  //   if (notOnline) {
  //   }
  // }, [notOnline]);

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
        `${
          apiURL.baseURL
        }/skyTrails/api/coupons/couponApplied/${couponvalue}`,

        {
          headers: {
            token: token,
          },
        }
      );
    } catch (error) {
      console.log(error);

    }
  };




  const handleTravelClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpenTravelModal(false);
    }
  };

  // const [isTVO, setIsTvo] = useState(
  //   prp
  //     ? true
  //     : false
  // );
  const [airesellRes, setAirsellRes] = useState(null);
  function convertDateFormatAAMD(originalDate) {
    // Extract day, month, and year from the original date string
    const day = originalDate.substring(0, 2);
    const monthAbbrev = getMonthAbbreviation(originalDate.substring(2, 4));
    const yearAbbrev = originalDate.substring(4);

    // Form the desired format
    const convertedDate = `${day}${monthAbbrev}${yearAbbrev}`;

    return convertedDate;
  }

  function getMonthAbbreviation(month) {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    // Convert month number to abbreviation
    return months[parseInt(month) - 1];
  }
  let xmlContinue = "";
  let dataElementsMaster = "";

  const xmlpassengerData = async () => {
    for (let i = 0; i < Number(adultCount) + Number(childCount); i++) {
      xmlContinue += `<travellerInfo>
      <elementManagementPassenger>
          <reference>
              <qualifier>PR</qualifier>
              <number>${i + 1}</number>
          </reference>
          <segmentName>NM</segmentName>
      </elementManagementPassenger>
      <passengerData>
          <travellerInformation>
              <traveller>
                  <surname>${passengerData[i]?.lastName}</surname>
                 
                  <quantity>${
                    passengerData[i]?.PaxType === 1 ? adultCount : childCount
                  }</quantity>
              </traveller>
              <passenger>
                  <firstName>${passengerData[i]?.firstName}</firstName>
                  <type>${
                    passengerData[i]?.PaxType === 1 ? "ADT" : "CHD"
                    // : passengerData[i]?.PaxType === 2
                    // ? "CHD"
                    // :
                  }</type>
              </passenger>
              </travellerInformation>
              ${
                passengerData[i]?.PaxType !== 1
                  ? `<dateOfBirth>
                      <dateAndTimeDetails>
                          <qualifier>706</qualifier>
                          <date>${convertDateFormatAmd(
                            passengerData[i]?.DateOfBirth
                          )}</date>
                      </dateAndTimeDetails>
                    </dateOfBirth>`
                  : ""
              }
      </passengerData>
      ${
        i < infantCount
          ? ` <passengerData>
          <travellerInformation>
              <traveller>
                  <surname>${
                    //   ,
                    passengerData[Number(adultCount) + Number(childCount) + i]
                      ?.lastName
                  }</surname>
                  <quantity>${infantCount}</quantity>
              </traveller>
              <passenger>
                  <firstName>${
                    passengerData[Number(adultCount) + Number(childCount) + i]
                      ?.firstName
                  }</firstName>
                  <type>${
                    "INF"
                    // passengerData[i]?.PaxType === 1 ? "ADT" : "CHD"
                    // : passengerData[i]?.PaxType === 2
                    // ? "CHD"
                    // :
                  }</type>
              </passenger>
              </travellerInformation>
              ${
                // passengerData[i]?.PaxType !== 1
                // ?
                `<dateOfBirth>
                      <dateAndTimeDetails>
                          <qualifier>706</qualifier>
                          <date>${convertDateFormatAmd(
                            passengerData[
                              Number(adultCount) + Number(childCount) + i
                            ]?.DateOfBirth
                          )}</date>
                      </dateAndTimeDetails>
                    </dateOfBirth>`
                // : ""
              }
      </passengerData>`
          : ""
      }
  </travellerInfo>`;
      dataElementsMaster += `<dataElementsIndiv>
            <elementManagementData>
                <reference>
                    <qualifier>OT</qualifier>
                    <number>${i + 1}</number>
                </reference>
                <segmentName>AP</segmentName>
            </elementManagementData>
            <freetextData>
                <freetextDetail>
                    <subjectQualifier>3</subjectQualifier>
                    <type>P02</type>
                </freetextDetail>
                <longFreetext>${passengerData[0]?.email}</longFreetext>
            </freetextData>
            <referenceForDataElement>
                <reference>
                    <qualifier>PR</qualifier>
                    <number>${i + 1}</number>
                </reference>
            </referenceForDataElement>
        </dataElementsIndiv>
        <dataElementsIndiv>
            <elementManagementData>
                <reference>
                    <qualifier>OT</qualifier>
                    <number>${i + 1}</number>
                </reference>
                <segmentName>AP</segmentName>
            </elementManagementData>
            <freetextData>
                <freetextDetail>
                    <subjectQualifier>3</subjectQualifier>
                    <type>7</type>
                    <status>A</status>
                </freetextDetail>
                <longFreetext>${passengerData[0]?.ContactNo}</longFreetext>
            </freetextData>
            <referenceForDataElement>
                <reference>
                    <qualifier>PR</qualifier>
                    <number>${i + 1}</number>
                </reference>
            </referenceForDataElement>
        </dataElementsIndiv>`;
      // ` <dataElementsIndiv>
      //           <elementManagementData>
      //               <reference>
      //                   <qualifier>OT</qualifier>
      //                   <number>${i+1}</number>
      //               </reference>
      //               <segmentName>AP</segmentName>
      //           </elementManagementData>
      //           <freetextData>
      //               <freetextDetail>
      //                   <subjectQualifier>3</subjectQualifier>
      //                   <type>P02</type>
      //               </freetextDetail>
      //               <longFreetext>${passengerData[0]?.Email}</longFreetext>
      //           </freetextData>
      //           <referenceForDataElement>
      //               <reference>
      //                   <qualifier>PR</qualifier>
      //                   <number>${i+1}</number>
      //               </reference>
      //           </referenceForDataElement>
      //       </dataElementsIndiv>
      //       <dataElementsIndiv>
      //           <elementManagementData>
      //               <reference>
      //                   <qualifier>OT</qualifier>
      //                   <number>2</number>
      //               </reference>
      //               <segmentName>AP</segmentName>
      //           </elementManagementData>
      //           <freetextData>
      //               <freetextDetail>
      //                   <subjectQualifier>5</subjectQualifier>
      //                   <type>N</type>
      //               </freetextDetail>
      //               <longFreetext>E+certportal@trav.net/F</longFreetext>
      //           </freetextData>
      //           <referenceForDataElement>
      //               <reference>
      //                   <qualifier>PT</qualifier>
      //                   <number>2</number>
      //               </reference>
      //           </referenceForDataElement>
      //       </dataElementsIndiv>
      //       <dataElementsIndiv>
      //           <elementManagementData>
      //               <reference>
      //                   <qualifier>OT</qualifier>
      //                   <number>1</number>
      //               </reference>
      //               <segmentName>AP</segmentName>
      //           </elementManagementData>
      //           <freetextData>
      //               <freetextDetail>
      //                   <subjectQualifier>3</subjectQualifier>
      //                   <type>7</type>
      //                   <status>A</status>
      //               </freetextDetail>
      //               <longFreetext>${passengerData[0]?.ContactNo}</longFreetext>
      //           </freetextData>
      //           <referenceForDataElement>
      //               <reference>
      //                   <qualifier>PR</qualifier>
      //                   <number>1</number>
      //               </reference>
      //           </referenceForDataElement>
      //       </dataElementsIndiv>
      //       <dataElementsIndiv>
      //           <elementManagementData>
      //               <reference>
      //                   <qualifier>OT</qualifier>
      //                   <number>1</number>
      //               </reference>
      //               <segmentName>TK</segmentName>
      //           </elementManagementData>
      //           <ticketElement>
      //               <passengerType>PAX</passengerType>
      //               <ticket>
      //                   <indicator>OK</indicator>
      //               </ticket>
      //           </ticketElement>
      //       </dataElementsIndiv>
      //       <dataElementsIndiv>
      //           <elementManagementData>
      //               <segmentName>FP</segmentName>
      //           </elementManagementData>
      //           <formOfPayment>
      //               <fop>
      //                   <identification>CA</identification>
      //               </fop>
      //           </formOfPayment>
      //       </dataElementsIndiv>
      //       <dataElementsIndiv>
      //           <elementManagementData>
      //               <segmentName>RF</segmentName>
      //           </elementManagementData>
      //           <freetextData>
      //               <freetextDetail>
      //                   <subjectQualifier>3</subjectQualifier>
      //                   <type>P22</type>
      //               </freetextDetail>
      //               <longFreetext>10612</longFreetext>
      //           </freetextData>
      //       </dataElementsIndiv>
      //       <dataElementsIndiv>
      //           <elementManagementData>
      //               <segmentName>OS</segmentName>
      //           </elementManagementData>
      //           <freetextData>
      //               <freetextDetail>
      //                   <subjectQualifier>3</subjectQualifier>
      //                   <type>P27</type>
      //                   <companyId>UK</companyId>
      //               </freetextDetail>
      //               <longFreetext>PAX CTCM 9627466902</longFreetext>
      //           </freetextData>
      //       </dataElementsIndiv>`;
    }

    let amadiesPayload = `<PNR_AddMultiElements
    xmlns="http://xml.amadeus.com/PNRADD_17_1_1A">
    <pnrActions>
        <optionCode>0</optionCode>
    </pnrActions>
 ${xmlContinue}
  
    <dataElementsMaster>
        <marker1 />
        ${dataElementsMaster}
        
          <dataElementsIndiv>
            <elementManagementData>
                <reference>
                    <qualifier>OT</qualifier>
                    <number>1</number>
                </reference>
                <segmentName>TK</segmentName>
            </elementManagementData>
            <ticketElement>
                <passengerType>PAX</passengerType>
                <ticket>
                    <indicator>OK</indicator>
                </ticket>
            </ticketElement>
        </dataElementsIndiv>
        <dataElementsIndiv>
            <elementManagementData>
                <segmentName>FP</segmentName>
            </elementManagementData>
            <formOfPayment>
                <fop>
                    <identification>CA</identification>
                </fop>
            </formOfPayment>
        </dataElementsIndiv>
        <dataElementsIndiv>
            <elementManagementData>
                <segmentName>RF</segmentName>
            </elementManagementData>
            <freetextData>
                <freetextDetail>
                    <subjectQualifier>3</subjectQualifier>
                    <type>P22</type>
                </freetextDetail>
                <longFreetext>62</longFreetext>
            </freetextData>
        </dataElementsIndiv>
        <dataElementsIndiv>
            <elementManagementData>
                <segmentName>OS</segmentName>
            </elementManagementData>
            <freetextData>
                <freetextDetail>
                    <subjectQualifier>3</subjectQualifier>
                    <type>P27</type>
                    <companyId>${
                      sesstioResultIndex?.flightDetails?.flightInformation
                        ?.companyId?.marketingCarrier ||
                      sesstioResultIndex?.flightDetails[0]?.flightInformation
                        ?.companyId?.marketingCarrier
                    }</companyId>
                </freetextDetail>
                <longFreetext>PAX CTCM ${
                  passengerData[0]?.ContactNo
                }</longFreetext>
            </freetextData>
        </dataElementsIndiv>
       
    </dataElementsMaster>
</PNR_AddMultiElements>`;

    fetchDataAmadesContinue(amadiesPayload);
  };

  // const [isTVO, setIsTvo] = useState(ResultIndex?.ResultIndex ? true : false);
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
  const isPassportRequired =
    reducerState?.searchFlight?.flightDetails?.from?.CountryCode !== "IN " ||
    reducerState?.searchFlight?.flightDetails?.to?.CountryCode !== "IN "
      ? true
      : false;

  const fareRule = reducerState?.flightFare?.flightRuleData?.FareRules;
  const apiUrlPayment = `${apiURL.baseURL}/skyTrails/api/transaction/easebussPayment`;

  const payload = {
    EndUserIp: reducerState?.ip?.ipData,
    TokenId: reducerState?.ip?.tokenData,
    // TraceId: reducerState?.oneWay?.oneWayData?.data?.data?.Response?.tvoTraceId,
    TraceId: reducerState?.oneWay?.oneWayData?.data?.tvoTraceId,
    ResultIndex: ResultIndex?.ResultIndex,
  };
  function appendSegment() {
    let text = "";

    for (let i = 0; i < sesstioResultIndex?.flightDetails?.length; i++) {
      let isOther = false;
      let index = 0;
      if (0 < childCount || 0 < infantCount) {
        isOther = true;
        if (i < adultCount) {
          index = 0;
        } else if (adultCount < i && i < childCount) {
          index = 1;
        } else if (adultCount < i && childCount < i && i < infantCount) {
          index = 2;
        }
      }
      isOther = false;

      text += ` <segmentInformation>
                        <travelProductInformation>
                            <flightDate>
                                <departureDate>${
                                  isOther
                                    ? sesstioResultIndex[0]?.flightDetails[i]
                                        ?.flightInformation?.productDateTime
                                        ?.dateOfDeparture
                                    : sesstioResultIndex?.flightDetails[i]
                                        ?.flightInformation?.productDateTime
                                        ?.dateOfDeparture
                                }</departureDate>
                            </flightDate>
                            <boardPointDetails>
                                <trueLocationId>${
                                  isOther
                                    ? sesstioResultIndex[0]?.flightDetails[i]
                                        ?.flightInformation?.location[0]
                                        ?.locationId
                                    : sesstioResultIndex?.flightDetails[i]
                                        ?.flightInformation?.location[0]
                                        ?.locationId
                                }</trueLocationId>
                            </boardPointDetails>
                            <offpointDetails>
                                <trueLocationId>${
                                  isOther
                                    ? sesstioResultIndex[0]?.flightDetails[i]
                                        ?.flightInformation?.location[1]
                                        ?.locationId
                                    : sesstioResultIndex?.flightDetails[i]
                                        ?.flightInformation?.location[1]
                                        ?.locationId
                                }</trueLocationId>
                            </offpointDetails>
                            <companyDetails>
                                <marketingCompany>${
                                  isOther
                                    ? sesstioResultIndex[0]?.flightDetails[i]
                                        ?.flightInformation?.companyId
                                        ?.marketingCarrier
                                    : sesstioResultIndex?.flightDetails[i]
                                        ?.flightInformation?.companyId
                                        ?.marketingCarrier
                                }</marketingCompany>
                            </companyDetails>
                            <flightIdentification>
                                <flightNumber>${
                                  isOther
                                    ? sesstioResultIndex[0]?.flightDetails[i]
                                        ?.flightInformation?.flightOrtrainNumber
                                    : sesstioResultIndex?.flightDetails[i]
                                        ?.flightInformation?.flightOrtrainNumber
                                }</flightNumber>
                                <bookingClass>${
                                  sesstioResultIndex[0]?.fareDetails
                                    ?.groupOfFares?.productInformation
                                    ?.cabinProduct?.rbd ||
                                  sesstioResultIndex?.fareDetails?.groupOfFares
                                    ?.productInformation?.cabinProduct?.rbd ||
                                  sesstioResultIndex[0]?.fareDetails
                                    ?.groupOfFares?.productInformation
                                    ?.cabinProduct?.rbd ||
                                  sesstioResultIndex?.fareDetails?.groupOfFares[
                                    i
                                  ]?.productInformation?.cabinProduct?.rbd ||
                                  sesstioResultIndex?.fareDetails?.groupOfFares
                                    ?.productInformation?.cabinProduct?.rbd ||
                                  sesstioResultIndex?.fareDetails
                                    ?.groupOfFares[0]?.productInformation
                                    ?.cabinProduct?.rbd ||
                                  sesstioResultIndex?.fareDetails
                                    ?.groupOfFares[0]?.productInformation
                                    ?.cabinProduct?.rbd ||
                                  sesstioResultIndex[0]?.fareDetails
                                    ?.groupOfFares[0]?.productInformation
                                    ?.cabinProduct?.rbd ||
                                  sesstioResultIndex?.fareDetails
                                    ?.groupOfFares[0]?.productInformation
                                    ?.cabinProduct[0]?.rbd
                                }</bookingClass>
                            </flightIdentification>
                        </travelProductInformation>
                        <relatedproductInformation>
                            <quantity>${
                              Number(adultCount) + Number(childCount)
                            }</quantity>
                            <statusCode>NN</statusCode>
                        </relatedproductInformation>
                    </segmentInformation>
  `;
    }

    return text;
  }

  const segmentImformation = sesstioResultIndex?.flightDetails
    ?.flightInformation
    ? `
       <segmentInformation>
                        <travelProductInformation>
                            <flightDate>
                                <departureDate>${
                                  sesstioResultIndex[0]?.flightDetails
                                    ?.flightInformation?.productDateTime
                                    ?.dateOfDeparture ||
                                  sesstioResultIndex?.flightDetails[0]
                                    ?.flightInformation?.productDateTime
                                    ?.dateOfDeparture ||
                                  sesstioResultIndex[0]?.flightDetails
                                    ?.flightDetails?.flightInformation
                                    ?.productDateTime?.dateOfDeparture ||
                                  sesstioResultIndex?.flightDetails
                                    ?.flightDetails?.flightInformation
                                    ?.productDateTime?.dateOfDeparture ||
                                  sesstioResultIndex?.flightDetails
                                    ?.flightInformation?.productDateTime
                                    ?.dateOfDeparture
                                }</departureDate>
                            </flightDate>
                            <boardPointDetails>
                                <trueLocationId>${
                                  sesstioResultIndex?.flightDetails
                                    ?.flightInformation?.location[0]?.locationId
                                }</trueLocationId>
                            </boardPointDetails>
                            <offpointDetails>
                                <trueLocationId>${
                                  sesstioResultIndex?.flightDetails
                                    ?.flightInformation?.location[1]?.locationId
                                }</trueLocationId>
                            </offpointDetails>
                            <companyDetails>
                                <marketingCompany>${
                                  sesstioResultIndex?.flightDetails
                                    ?.flightInformation?.companyId
                                    ?.marketingCarrier
                                }</marketingCompany>
                            </companyDetails>
                            <flightIdentification>
                                <flightNumber>${
                                  sesstioResultIndex?.flightDetails
                                    ?.flightInformation?.flightOrtrainNumber
                                }</flightNumber>
                                <bookingClass>${
                                  // sesstioResultIndex?.fareDetails?.groupOfFares
                                  //   ?.productInformation
                                  //   ? sesstioResultIndex?.fareDetails
                                  //       ?.groupOfFares?.productInformation
                                  //       ?.cabinProduct?.rbd
                                  //   : sesstioResultIndex[0]?.fareDetails
                                  //       ?.groupOfFares[0]?.productInformation
                                  //       ?.cabinProduct?.rbd

                                  sesstioResultIndex[0]?.fareDetails
                                    ?.groupOfFares?.productInformation
                                    ?.cabinProduct?.rbd ||
                                  sesstioResultIndex?.fareDetails?.groupOfFares
                                    ?.productInformation?.cabinProduct?.rbd ||
                                  sesstioResultIndex[0]?.fareDetails
                                    ?.groupOfFares?.productInformation
                                    ?.cabinProduct?.rbd ||
                                  sesstioResultIndex?.fareDetails
                                    ?.groupOfFares[0]?.productInformation
                                    ?.cabinProduct?.rbd ||
                                  sesstioResultIndex?.fareDetails?.groupOfFares
                                    ?.productInformation?.cabinProduct?.rbd ||
                                  sesstioResultIndex?.fareDetails
                                    ?.groupOfFares[0]?.productInformation
                                    ?.cabinProduct?.rbd ||
                                  sesstioResultIndex[0]?.fareDetails
                                    ?.groupOfFares[0]?.productInformation
                                    ?.cabinProduct?.rbd ||
                                  sesstioResultIndex?.fareDetails
                                    ?.groupOfFares[0]?.productInformation
                                    ?.cabinProduct[0]?.rbd
                                }</bookingClass>
                            </flightIdentification>
                        </travelProductInformation>
                        <relatedproductInformation>
                            <quantity>${
                              Number(adultCount) + Number(childCount)
                            }</quantity>
                            <statusCode>NN</statusCode>
                        </relatedproductInformation>
                    </segmentInformation>
  `
    : appendSegment();

  // useEffect(() => {
  //   console.log(
  //     reducerState?.oneWay?.oneWayData?.data?.tvoTraceId,
  //     reducerState,
  //     JSON.parse(sessionStorage?.getItem("ResultIndex")),
  //     ' JSON.parse(sessionStorage?.getItem("ResultIndex"))?.flightDetails',

  //     // sesstioResultIndex?.flightDetails
  //     segmentImformation
  //     // ?.flightInformation
  //     //                     ? sesstioResultIndex?.flightDetails
  //     //                         ?.flightInformation?.location[0]?.locationId
  //     //                     :
  //     // sesstioResultIndex?.flightDetails[
  //     //   sesstioResultIndex?.flightDetails?.length - 1
  //     // ]?.flightInformation?.location[0]?.locationId
  //     // sesstioResultIndex?.flightDetails?.flightInformation?.location[0]
  //     //   ?.locationId

  //     // ?.flightInformation?.location[1]?.locationId
  //     // ?.location[0]?.locationId,
  //     // [0].flightInformation?.location[0]
  //     // ?.flightDetails[0]?
  //     //   .flightInformation?.location[0]?.locationId,
  //     // ,
  //     // "reducer state"
  //   );
  //   if (ResultIndex?.ResultIndex) {
  //     sessionStorage.getItem("ResultIndex");
  //     dispatch(ruleAction(payload));
  //     dispatch(quoteAction(payload));
  //   } else {
  //   }
  // }, []);

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

  const passengerTemplate = {
    title: "Mr",
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    addressLine1: "delhi",
    city: "Delhi",
    TicketNumber: "Hold",
    amount: null,
    FirstName: "",
    LastName: "",
    PaxType: 1,
    DateOfBirth: "",
    Gender: 1,
    passportNo: "",
    passportExpiry: "",
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
    title: "Mr",
    firstName: "",
    lastName: "",
    gender: "",

    email: "",
    addressLine1: "delhi",
    city: "Delhi",
    TicketNumber: "Hold",
    amount: null,
    Title: "Mr",
    FirstName: "",
    LastName: "",
    PaxType: 2,
    DateOfBirth: "",
    Gender: 1,
    passportNo: "",
    passportExpiry: "",
    Fare: farePrice,
    IsLeadPax: false,
    FFAirlineCode: null,
    FFNumber: "",
  };
  const infantPassenger = {
    title: "Mr",
    firstName: "",
    lastName: "",

    gender: "",
    email: "",
    addressLine1: "delhi",
    city: "Delhi",
    TicketNumber: "Hold",
    amount: null,
    Title: "Mr",
    FirstName: "",
    LastName: "",
    PaxType: 3,
    DateOfBirth: "",
    Gender: 1,
    passportNo: "",
    passportExpiry: "",
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
      xmlpassengerData();
    }
  }, [loaderPayment]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios({
        method: "POST",
        url: `${apiURL.baseURL}/skyTrails/amadeus/airsell`,
        data: `<Air_SellFromRecommendation>
                <messageActionDetails>
                    <messageFunctionDetails>
                        <messageFunction>183</messageFunction>
                        <additionalMessageFunction>M1</additionalMessageFunction>
                    </messageFunctionDetails>
                </messageActionDetails>
                <itineraryDetails>
                    <originDestinationDetails>
                        <origin>${
                          sesstioResultIndex?.flightDetails?.flightInformation
                            ? sesstioResultIndex?.flightDetails
                                ?.flightInformation?.location[0]?.locationId
                            : sesstioResultIndex?.flightDetails[0]
                                ?.flightInformation?.location[0]?.locationId
                        }</origin>
                        <destination>${
                          sesstioResultIndex?.flightDetails?.flightInformation
                            ? sesstioResultIndex?.flightDetails
                                ?.flightInformation?.location[1]?.locationId
                            : sesstioResultIndex?.flightDetails[
                                sesstioResultIndex?.flightDetails?.length - 1
                              ]?.flightInformation?.location[1]?.locationId
                        }</destination>
                    </originDestinationDetails>
                    <message>
                        <messageFunctionDetails>
                            <messageFunction>183</messageFunction>
                        </messageFunctionDetails>
                    </message>
                  
                    ${segmentImformation}

                </itineraryDetails>
            </Air_SellFromRecommendation>`,
        headers: {
          "Content-Type": "text/xml",
          //  token: token,
        },
      });
      setAirsellRes(res?.data);
      setXmlData(res?.data?.data?.data);
    };
    fetchData();
  }, []);

  const farepricepnrwithbookingclass = async (ress) => {
    // console.log(airesellRes?.data?.MessageID, "ffffffffffffffffffffffffff");
    const res = await axios({
      method: "POST",
      url: `${apiURL.baseURL}/skyTrails/amadeus/farepricepnrwithbookingclass`,
      data: {
        amadeusMessageID: ress?.MessageID,
        amadeusUniqueID: ress?.UniqueID,
        amadeusSessionID: ress?.SessionId,
        amadeusSequenceNumber: ress?.SequenceNumber,
        amadeusSecurityToken: ress?.SecurityToken,
        flightCode:
          sesstioResultIndex?.flightDetails?.flightInformation?.companyId
            ?.marketingCarrier,
      },
      headers: {
        "Content-Type": "application/json",

        //  token: token,
      },
    });

    if (res?.data?.status === 200) {
      fetchDataAmadesticketcreatetstfrompricing(res?.data?.data?.headers);
    }
  };
  const fetchDataAmadesticketcreatetstfrompricing = async (ress) => {
    const res = await axios({
      method: "POST",
      url: `${apiURL.baseURL}/skyTrails/amadeus/ticketcreatetstfrompricing`,
      data: {
        amadeusMessageID: ress?.MessageID,
        amadeusUniqueID: ress?.UniqueID,
        amadeusSessionID: ress?.SessionId,
        amadeusSequenceNumber: ress?.SequenceNumber,
        amadeusSecurityToken: ress?.SecurityToken,
        totalPax: parseInt(adultCount) + parseInt(childCount),
      },
      headers: {
        "Content-Type": "application/json",

        //  token: token,
      },
    });

    if (res?.data?.status === 200) {
      // fetchDataAmadesticketcreatetstfrompricing(res?.data?.data?.headers);
      fetchDataSavepnr(res?.data?.data?.headers);
    }
  };
  const fetchDataSavepnr = async (ress) => {
    const res = await axios({
      method: "POST",
      url: `${apiURL.baseURL}/skyTrails/amadeus/savepnr`,
      data: {
        amadeusMessageID: ress?.MessageID,
        amadeusUniqueID: ress?.UniqueID,
        amadeusSessionID: ress?.SessionId,
        amadeusSequenceNumber: ress?.SequenceNumber,
        amadeusSecurityToken: ress?.SecurityToken,
      },
      headers: {
        "Content-Type": "application/json",

        //  token: token,
      },
    });
    if (res?.data?.status === 200 && res?.data?.data?.headers?.Pnr) {
      // sessionStorage.setItem("PNR", res?.data?.data?.headers?.Pnr);

      convertXmlToJsonSavePnr(res?.data?.data?.data);
      // saveDb(res);
      // couponconfirmation();
      // navigate(`/bookedTicketSucess/${res?.data?.data?.headers?.Pnr}`);
    } else {
      refundAmount();
    }
  };

  const fetchDataAmadesContinue = async (amadiesPayload) => {
    const res = await axios({
      method: "POST",
      url: `${apiURL.baseURL}/skyTrails/amadeus/pnraddmultielements`,
      data: amadiesPayload,
      // headers: { ...airesellRes?.data?.headers, "Content-Type": "text/xml" },
      headers: {
        "Content-Type": "text/xml",
        amadeusMessageID: airesellRes?.data?.headers?.MessageID,
        amadeusUniqueID: airesellRes?.data?.headers?.UniqueID,
        amadeusSessionID: airesellRes?.data?.headers?.SessionId,
        amadeusSequenceNumber: airesellRes?.data?.headers?.SequenceNumber,
        amadeusSecurityToken: airesellRes?.data?.headers?.SecurityToken,
        //  token: token,
      },
    });

    if (res?.data?.status === 200) {
      // fetchDataAmadesticketcreatetstfrompricing(res?.data?.data?.headers);
      farepricepnrwithbookingclass(res?.data?.data?.headers);
    }
  };

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

  const refundAmount = async () => {
    try {
      const token = SecureStorage.getItem("jwtToken");
      const payload = {
        // refund_amount: 1,
        refund_amount:
          // parseInt(ResultIndex?.monetaryDetail?.[0]?.amount) +
          // markUpamount *
          //   parseInt(ResultIndex?.monetaryDetail?.[0]?.amount).toFixed(0),
          Number(finalAmount),

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
      saveDb();
      
    }

    swalModal(
      "flight",
      // reducerState?.flightBook?.flightBookData?.Error?.ErrorMessage,
      "Booking failed, your amount will be refunded within 72 hours.",
      false
    );
    navigate("/");
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (
  //       reducerState?.flightBook?.flightBookDataGDS?.Error?.ErrorMessage === ""
  //     ) {
  //       setLoaderPayment(false);
  //       navigate("/bookedTicket");
  //     } else if (
  //       reducerState?.flightBook?.flightBookDataGDS?.Error?.ErrorCode !== 0 &&
  //       reducerState?.flightBook?.flightBookDataGDS?.Error?.ErrorCode !==
  //         undefined
  //     ) {
  //       try {
  //         const token = SecureStorage.getItem("jwtToken");
  //         const payload = {
  //           refund_amount:
  //             transactionAmount ||
  //             (!isDummyTicketBooking
  //               ? (
  //                   Number(fareValue?.Fare?.PublishedFare) +
  //                   Number(markUpamount) *
  //                     Number(fareValue?.Fare?.PublishedFare)
  //                 ).toFixed(0)
  //               : 99),
  //           // "refund_amount": 1,
  //           txnId: refundTxnId,
  //         };

  //         const res = await axios({
  //           method: "POST",
  //           url: `${apiURL.baseURL}/skyTrails/api/transaction/refundPolicy`,
  //           data: payload,
  //           headers: {
  //             "Content-Type": "application/json",
  //             token: token,
  //           },
  //         });
  //       } catch (error) {
  //         console.warn(error);
  //       }

  //       swalModal(
  //         "flight",
  //         // reducerState?.flightBook?.flightBookData?.Error?.ErrorMessage,
  //         "Booking failed, your amount will be refunded within 72 hours.",
  //         false
  //       );
  //       navigate("/");
  //     }
  //   };

  //   fetchData(); // Call the async function

  //   // Cleanup function (if needed)
  //   const cleanup = () => {
  //     // Perform cleanup tasks here if needed
  //     // For example, unsubscribe from event listeners or clear timers
  //   };

  //   // Return cleanup function
  //   return cleanup;
  // }, [reducerState?.flightBook?.flightBookDataGDS?.Response]);

  // useEffect(() => {
  //   if (
  //     reducerState?.flightFare?.flightQuoteData?.Error?.ErrorCode !== 0 &&
  //     reducerState?.flightFare?.flightQuoteData?.Error?.ErrorCode !== undefined
  //   ) {
  //     swalModal(
  //       "flight",
  //       reducerState?.flightFare?.flightQuoteData?.Error?.ErrorMessage,
  //       false
  //     );
  //     navigate("/");
  //   }
  // }, [reducerState?.flightFare?.flightQuoteData?.Error?.ErrorCode]);

  // useEffect(() => {
  //   if (
  //     reducerState?.flightBook?.flightBookDataGDS?.Error?.ErrorMessage == "" &&
  //     !isDummyTicketBooking
  //   ) {
  //     getTicketForNonLCC();
  //   } else if (
  //     reducerState?.flightBook?.flightBookDataGDS?.Error?.ErrorMessage == "" &&
  //     isDummyTicketBooking
  //   ) {
  //     setLoaderPayment(false);
  //     navigate("/bookedTicket");
  //   } else if (
  //     reducerState?.flightBook?.flightBookDataGDS?.Error?.ErrorCode !== 0 &&
  //     reducerState?.flightBook?.flightBookDataGDS?.Error?.ErrorCode !==
  //       undefined
  //   ) {
  //     swalModal(
  //       "flight",
  //       reducerState?.flightBook?.flightBookDataGDS?.Error?.ErrorMessage,
  //       false
  //     );
  //     navigate("/");
  //   }
  // }, [reducerState?.flightBook?.flightBookDataGDS?.Response]);

  // useEffect(() => {
  //   if (
  //     reducerState?.flightBook?.flightTicketDataGDS?.data?.data?.Response?.Error
  //       ?.ErrorCode === 0 ||
  //     (reducerState?.flightBook?.flightTicketDataGDS?.data?.data?.Response
  //       ?.Error?.ErrorCode !== 0 &&
  //       reducerState?.flightBook?.flightTicketDataGDS?.data?.data?.Response
  //         ?.Error?.ErrorCode !== undefined)
  //   ) {
  //     setLoaderPayment(false);
  //     navigate("/bookedTicket");
  //   }
  // }, [reducerState?.flightBook?.flightTicketDataGDS?.data?.data?.Response]);

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
  };

  // const totalMinutes = TicketDetails?.Segments[0][0]?.Duration;
  // const durationHours = Math.floor(totalMinutes / 60);
  // const durationMinutes = totalMinutes % 60;
  // const duration_Time = `${durationHours} Hours and ${durationMinutes} minutes`;
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
  const [airlines, setAirlines] = useState(
    reducerState?.flightList?.flightDetails
  );
  const [airports, setAireport] = useState(
    reducerState?.flightList?.aireportList
  );
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
      amount: Number(finalAmount),
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
          // if (sessionStorage.getItem("couponCode")) {
            // couponconfirmation();
          // }
          // sessionStorage.removeItem("flightcoupon");
          // sessionStorage.removeItem("couponCode");
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
  function findAirlineByCode(code) {
    const data = airlines?.find((airline) => airline?.airlineCode === code);

    return data?.airlineName;
  }
  function findAirportByCode(code) {
    const data = airports?.find((airport) => airport?.AirportCode === code);

    return data;
  }
  function convertDateFormatAmd(originalDate) {
    // Convert to Date object
    const dateObj = new Date(originalDate);

    // Get day
    const day = dateObj.getDate();

    // Get month in abbreviated form
    const monthAbbrev = dateObj.toLocaleString("default", { month: "short" });

    // Get year in abbreviated form
    const yearAbbrev = dateObj.getFullYear().toString().slice(-2);

    // Form the desired format
    const convertedDate = `${day}${monthAbbrev}${yearAbbrev}`;

    return convertedDate;
  }

  const saveDb = async (res) => {
    let nonStop = [
      {
        Airline: {
          AirlineCode:
            jsonSavePnrData?.originDestinationDetails?.itineraryInfo
              ?.travelProduct?.companyDetail?.identification,
          AirlineName: findAirlineByCode(
            jsonSavePnrData?.originDestinationDetails?.itineraryInfo
              ?.travelProduct?.companyDetail?.identification
          ),
          FlightNumber:
            jsonSavePnrData?.originDestinationDetails?.itineraryInfo
              ?.travelProduct?.productDetails?.identification,
          FareClass:
            jsonSavePnrData?.originDestinationDetails?.itineraryInfo
              ?.travelProduct?.productDetails?.classOfService,
        },
        Origin: {
          AirportCode:
            jsonSavePnrData?.originDestinationDetails?.itineraryInfo
              ?.travelProduct?.boardpointDetail?.cityCode,
          AirportName: reducerState?.searchReducer?.search?.[0]?.code,
          CityName: reducerState?.searchReducer?.search?.[0]?.name,
          Terminal:
            jsonSavePnrData?.originDestinationDetails?.itineraryInfo
              ?.flightDetail?.arrivalStationInfo?.terminal,
          DepTime: depTimeISO1,
        },
        Destination: {
          AirportCode:
            jsonSavePnrData?.originDestinationDetails?.itineraryInfo
              ?.travelProduct?.offpointDetail?.cityCode,
          AirportName: reducerState?.searchReducer?.search?.[1]?.code,
          CityName: reducerState?.searchReducer?.search?.[1]?.name,
          Terminal:
            jsonSavePnrData?.originDestinationDetails?.itineraryInfo
              ?.flightDetail?.departureInformation?.departTerminal,
          ArrTime: arrTimeISO1,
        },
        Baggage:
          (sesstioResultIndex?.flight?.baggage?.freeBagAllownceInfo
            ?.baggageDetails?.quantityCode ||
            sesstioResultIndex?.baggage?.freeBagAllownceInfo?.baggageDetails
              ?.quantityCode) === "W"
            ? `${
                sesstioResultIndex?.flight?.baggage?.freeBagAllownceInfo
                  ?.baggageDetails?.freeAllowance ||
                sesstioResultIndex?.baggage?.freeBagAllownceInfo?.baggageDetails
                  ?.freeAllowance
              } ${
                sesstioResultIndex?.flight?.baggage?.freeBagAllownceInfo
                  ?.baggageDetails?.unitQualifier ||
                sesstioResultIndex?.baggage?.freeBagAllownceInfo?.baggageDetails
                  ?.unitQualifier === "K"
                  ? "KG"
                  : `${
                      sesstioResultIndex?.flight?.baggage?.freeBagAllownceInfo
                        ?.baggageDetails?.unitQualifier ||
                      sesstioResultIndex?.flight?.baggage?.freeBagAllownceInfo
                        ?.baggageDetails?.unitQualifier
                    }`
              }`
            : `(${
                sesstioResultIndex?.baggage?.freeBagAllownceInfo?.baggageDetails
                  ?.freeAllowance ||
                sesstioResultIndex?.flight?.baggage?.freeBagAllownceInfo
                  ?.baggageDetails?.freeAllowance
              } × 23KG)`,
      },
    ];
    const times = jsonSavePnrData?.originDestinationDetails?.itineraryInfo
      ?.elementManagementItinerary
      ? nonStop
      : jsonSavePnrData?.originDestinationDetails?.itineraryInfo.map(
          (itinerary, index) => {
            let depTime = String(itinerary?.travelProduct?.product?.depTime);
            let depDate = String(itinerary?.travelProduct?.product?.depDate);
            let arrTime = String(itinerary?.travelProduct?.product?.arrTime);
            let arrDate = String(itinerary?.travelProduct?.product?.arrDate);
            // console.log(itinerary,"itineraryitineraryitinerary")

            // Ensure depTime and arrTime are properly formatted
            if (depTime && depTime.length === 2) {
              depTime = "00" + depTime;
            }
            if (arrTime && arrTime.length === 2) {
              arrTime = "00" + arrTime;
            }
            if (depTime && depTime.length === 3) {
              depTime = "0" + depTime;
            }
            if (arrTime && arrTime.length === 3) {
              arrTime = "0" + arrTime;
            }
            if (depDate && depDate.length === 5) {
              depDate = "0" + depDate;
            }
            if (depDate && depDate.length === 4) {
              depDate = "00" + depDate;
            }
            if (arrDate && arrDate.length === 4) {
              arrDate = "00" + arrDate;
            }
            if (arrDate && arrDate.length === 5) {
              arrDate = "0" + arrDate;
            }

            // console.log(itinerary,"itineraryitineraryitinerary",depTime,arrTime)

            // Parse depDate and depTime into ISO format for departure
            const depDateTimeString = `${depDate}${depTime}`;
            const departureMoment = moment(depDateTimeString, "YYMMDDHHmm");
            const depTimeISO = departureMoment.isValid()
              ? departureMoment.toISOString()
              : null;

            // Parse arrDate and arrTime into ISO format for arrival
            const arrDateTimeString = `${arrDate}${arrTime}`;
            const arrivalMoment = moment(arrDateTimeString, "YYMMDDHHmm");
            const arrTimeISO = arrivalMoment.isValid()
              ? arrivalMoment.toISOString()
              : null;

            // console.log(depDateTimeString,departureMoment,depTimeISO,arrDateTimeString,arrivalMoment,arrTimeISO,arrDate,depDate,"deppppppppppp")

            return {
              depTime: depTimeISO,
              depDate,
              arrTime: arrTimeISO,
              arrDate,
            };
          }
        );

    let depTimeString = String(
      jsonData?.itineraryDetails?.segmentInformation?.flightDetails?.flightDate
        ?.departureTime
    );
    let depDateString = String(
      jsonData?.itineraryDetails?.segmentInformation?.flightDetails?.flightDate
        ?.departureDate
    );
    let arrTimeString = String(
      jsonData?.itineraryDetails?.segmentInformation?.flightDetails?.flightDate
        ?.arrivalTime
    );
    let arrDateString = String(
      jsonData?.itineraryDetails?.segmentInformation?.flightDetails?.flightDate
        ?.arrivalDate
    );
    if (depTimeString && depTimeString.length === 2) {
      depTimeString = "00" + depTimeString;
    }
    if (arrTimeString && arrTimeString.length === 2) {
      arrTimeString = "00" + arrTimeString;
    }
    if (depTimeString && depTimeString.length === 3) {
      depTimeString = "0" + depTimeString;
    }
    if (arrTimeString && arrTimeString.length === 3) {
      arrTimeString = "0" + arrTimeString;
    }
    if (depDateString && depDateString.length === 5) {
      depDateString = "0" + depDateString;
    }
    if (arrDateString && arrDateString.length === 4) {
      arrDateString = "00" + arrDateString;
    }
    // console.log(depTimeString,arrTimeString,depDateString,arrDateString,"")

    // Parse and format the departure time and date
    const departureMoment = moment(
      `${depDateString} ${depTimeString}`,
      "DDMMYYYY HHmm"
    );
    const depTimeISO = departureMoment.toISOString();

    // Output: "2024-09-26T10:15:00.000Z"

    // Parse and format the arrival time and date
    const arrivalMoment = moment(
      `${arrDateString} ${arrTimeString}`,
      "DDMMYYYY HHmm"
    );
    const arrTimeISO = arrivalMoment.toISOString();
    // console.log(jsonSavePnrData,"jsonSavePnrDataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    // console.log(arrTimeISO,departureMoment,depTimeString,arrDateString,"arrTimeISO,departureMoment,depTimeString,arrDateString")

    const payload = {
      ticketType: "Orignal Ticket",
      oneWay: true,
      bookingId: "SKY" + Date.now(),
      // pnr: res?.data?.data?.headers?.Pnr,
      pnr: jsonSavePnrData?.pnrHeader?.reservationInfo?.reservation
        ?.controlNumber,
      paymentStatus: "success",
      // pnr: "hjhh",
      bookingStatus: jsonSavePnrData?.pnrHeader?.reservationInfo?.reservation
        ?.controlNumber
        ? "BOOKED"
        : "FAILED",
      totalAmount:
        // parseInt(ResultIndex?.monetaryDetail?.[0]?.amount) +
        // markUpamount *
        //   parseInt(ResultIndex?.monetaryDetail?.[0]?.amount).toFixed(0),
        Number(finalAmount),
      origin: reducerState?.searchFlight?.flightDetails?.from?.name,
      destination: reducerState?.searchFlight?.flightDetails?.to?.name,
      airlineDetails: jsonSavePnrData?.originDestinationDetails?.itineraryInfo
        ?.elementManagementItinerary
        ? nonStop
        : jsonSavePnrData?.originDestinationDetails?.itineraryInfo.map(
            (stopss, index) => {
              const depTimeISO = times[index]?.depTime;
              const arrTimeISO = times[index]?.arrTime;

              return {
                Airline: {
                  AirlineCode:
                    stopss?.travelProduct?.companyDetail?.identification,
                  AirlineName:
                    stopss?.travelProduct?.companyDetail?.identification,
                  FlightNumber:
                    stopss?.travelProduct?.productDetails?.identification,
                  FareClass:
                    stopss?.travelProduct?.productDetails?.classOfService,
                },
                Origin: {
                  AirportCode:
                    stopss?.travelProduct?.boardpointDetail?.cityCode,
                  // AirportName: reducerState?.searchReducer?.search?.[0]?.code,
                  // CityName: reducerState?.searchReducer?.search?.[0]?.name,
                  AirportName: findAirportByCode(
                    stopss?.travelProduct?.boardpointDetail?.cityCode
                  )?.code,
                  CityName: findAirportByCode(
                    stopss?.travelProduct?.boardpointDetail?.cityCode
                  )?.name,
                  Terminal: stopss?.flightDetail?.arrivalStationInfo?.terminal,
                  DepTime: depTimeISO,
                },
                Destination: {
                  AirportCode: stopss?.travelProduct?.offpointDetail?.cityCode,
                  // AirportName: reducerState?.searchReducer?.search?.[1]?.code,
                  // CityName: reducerState?.searchReducer?.search?.[1]?.name,
                  AirportName: findAirportByCode(
                    stopss?.travelProduct?.offpointDetail?.cityCode
                  )?.code,
                  CityName: findAirportByCode(
                    stopss?.travelProduct?.offpointDetail?.cityCode
                  )?.name,
                  Terminal:
                    stopss?.flightDetail?.departureInformation?.departTerminal,
                  ArrTime: arrTimeISO,
                },
                Baggage:
                  (sesstioResultIndex?.flight?.baggage?.freeBagAllownceInfo
                    ?.baggageDetails?.quantityCode ||
                    sesstioResultIndex?.baggage?.freeBagAllownceInfo
                      ?.baggageDetails?.quantityCode) === "W"
                    ? `${
                        sesstioResultIndex?.flight?.baggage?.freeBagAllownceInfo
                          ?.baggageDetails?.freeAllowance ||
                        sesstioResultIndex?.baggage?.freeBagAllownceInfo
                          ?.baggageDetails?.freeAllowance
                      } ${
                        sesstioResultIndex?.flight?.baggage?.freeBagAllownceInfo
                          ?.baggageDetails?.unitQualifier ||
                        sesstioResultIndex?.baggage?.freeBagAllownceInfo
                          ?.baggageDetails?.unitQualifier === "K"
                          ? "KG"
                          : `${
                              sesstioResultIndex?.flight?.baggage
                                ?.freeBagAllownceInfo?.baggageDetails
                                ?.unitQualifier ||
                              sesstioResultIndex?.flight?.baggage
                                ?.freeBagAllownceInfo?.baggageDetails
                                ?.unitQualifier
                            }`
                      }`
                    : `(${
                        sesstioResultIndex?.baggage?.freeBagAllownceInfo
                          ?.baggageDetails?.freeAllowance ||
                        sesstioResultIndex?.sesstioResultIndex?.baggage
                          ?.freeBagAllownceInfo?.baggageDetails?.freeAllowance
                      } × 23KG)`,
              };
            }
          ),
      // airlineDetails: [
      //   {
      //     Airline: {
      //       AirlineCode:
      //         sesstioResultIndex?.flightDetails?.flightInformation?.companyId
      //           ?.marketingCarrier ||
      //         sesstioResultIndex?.flightDetails[0]?.flightInformation?.companyId
      //           ?.marketingCarrier,
      //       AirlineName:
      //         sesstioResultIndex?.flightDetails?.flightInformation?.companyId
      //           ?.marketingCarrier ||
      //         sesstioResultIndex?.flightDetails[0]?.flightInformation?.companyId
      //           ?.marketingCarrier,
      //       FlightNumber:
      //         sesstioResultIndex?.flightDetails?.flightInformation
      //           ?.flightOrtrainNumber ||
      //         sesstioResultIndex?.flightDetails[0]?.flightInformation
      //           ?.flightOrtrainNumber,
      //       FareClass:
      //         sesstioResultIndex[0]?.fareDetails?.groupOfFares
      //           ?.productInformation?.cabinProduct?.rbd ||
      //         sesstioResultIndex?.fareDetails?.groupOfFares?.productInformation
      //           ?.cabinProduct?.rbd,
      //     },
      //     Origin: {
      //       AirportCode:
      //         reducerState?.searchFlight?.flightDetails?.from?.AirportCode,
      //       AirportName: reducerState?.searchFlight?.flightDetails?.from?.code,
      //       CityName: reducerState?.searchFlight?.flightDetails?.from?.name,
      //       Terminal:
      //         sesstioResultIndex?.flightDetails?.flightInformation?.location[0]
      //           ?.locationId ||
      //         sesstioResultIndex?.flightDetails[0].flightInformation
      //           ?.location[0]?.locationId,
      //       DepTime: depTimeISO,
      //     },
      //     Destination: {
      //       AirportCode:
      //         reducerState?.searchFlight?.flightDetails?.to?.AirportCode,
      //       AirportName: reducerState?.searchFlight?.flightDetails?.to?.code,
      //       CityName: reducerState?.searchFlight?.flightDetails?.to?.name,
      //       Terminal:
      //         sesstioResultIndex?.flightDetails?.flightInformation?.location[
      //           sesstioResultIndex?.flightDetails?.flightInformation?.location
      //             ?.length - 1
      //         ]?.locationId ||
      //         sesstioResultIndex?.flightDetails[
      //           sesstioResultIndex?.flightDetails?.length - 1
      //         ].flightInformation?.location[
      //           sesstioResultIndex?.flightDetails?.flightInformation?.location
      //             ?.length - 1
      //         ]?.locationId,
      //       DepTime: arrTimeISO,
      //     },
      //     Baggage: `${
      //       sesstioResultIndex?.baggage?.freeBagAllownceInfo?.baggageDetails
      //         ?.quantityCode === "W"
      //         ? `${sesstioResultIndex?.baggage?.freeBagAllownceInfo?.baggageDetails?.freeAllowance}`
      //         : Number(
      //             sesstioResultIndex?.baggage?.freeBagAllownceInfo
      //               ?.baggageDetails?.freeAllowance
      //           ) * 23
      //     } ${
      //       sesstioResultIndex?.baggage?.freeBagAllownceInfo?.baggageDetails
      //         ?.unitQualifier === "K"
      //         ? "KG"
      //         : "LB"
      //     }`,
      //   },
      //   ,
      // ],
      passengerDetails: reducerState?.passengers?.passengersData?.map(
        (item) => ({
          ...item,
          amount:
            // (transactionAmount || parseInt(ResultIndex?.TotalPublishFare)) /
            // reducerState?.passengers?.passengersData?.length,
            (Number(finalAmount) || parseInt(ResultIndex?.TotalPublishFare)) /
            reducerState?.passengers?.passengersData?.length,
          gender: item?.title == "Miss" ? "Female" : "Male",
        })
      ),
      dateOfJourney: "dateOfJourney",
    };
    // console.log(payload, "saveDbbbbbbbbbbbbbbbbbbb")

    const response = await userApi.flightBookingDB(payload);
    if (
      response?.data?.statusCode === 200 &&
      jsonSavePnrData?.pnrHeader?.reservationInfo?.reservation?.controlNumber
    ) {
      couponconfirmation();
      navigate(`/bookedTicketSucess/${jsonSavePnrData?.pnrHeader?.reservationInfo?.reservation?.controlNumber}`, {
        state: { PNR: jsonSavePnrData?.pnrHeader?.reservationInfo?.reservation?.controlNumber },
      });
    }
  };
  // console.log(jsonSavePnrData, "jsonSavePNR")
  // const handleButtonClick = () => {
  //   const payloadGDS = {
  //     ResultIndex: ResultIndex,
  //     Passengers: passengerData.map((item, index) => {
  //       return {
  //         ...item,
  //         PassportExpiry: isPassportRequired
  //           ? convertDateFormat(item?.PassportExpiry)
  //           : "",
  //         Email: apiURL.flightEmail,
  //         ContactNo: apiURL.phoneNo,
  //       };
  //     }),
  //     EndUserIp: reducerState?.ip?.ipData,
  //     TokenId: reducerState?.ip?.tokenData,
  //     TraceId: reducerState?.oneWay?.oneWayData?.data?.data?.Response?.TraceId,
  //   };

  //   if (fareValue?.IsLCC == false) {
  //     dispatch(bookActionGDS(payloadGDS));
  //   } else if (fareValue?.IsLCC == true) {
  //     getTicketForLCC();
  //   }
  // };

  // useEffect(() => {
  //   // console.warn(reducerState, "reducer state");
  //   if (
  //     reducerState?.flightFare?.flightQuoteData?.Error?.ErrorCode !== 0 &&
  //     reducerState?.flightFare?.flightQuoteData?.Error?.ErrorCode !== undefined
  //   ) {
  //     // navigate(`/flighterror?${reducerState?.flightFare?.flightQuoteData?.Error?.ErrorMessage}`);
  //     setErrorMassage({
  //       error: true,
  //       Message: reducerState?.flightFare?.flightQuoteData?.Error?.ErrorMessage,
  //     });

  //     return;
  //   }
  //   if (
  //     reducerState?.flightFare?.flightRuleData?.Error?.ErrorCode !== 0 &&
  //     reducerState?.flightFare?.flightRuleData?.Error?.ErrorCode !== undefined
  //   ) {
  //     // navigate(`/flighterror?${reducerState?.flightFare?.flightRuleData?.Error?.ErrorMessage}`);
  //     setErrorMassage({
  //       error: true,
  //       Message: reducerState?.flightFare?.flightRuleData?.Error?.ErrorCode,
  //     });
  //   }
  // });

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




  // const getTicketForLCC = () => {
  //   const payloadLcc = {
  //     ResultIndex: ResultIndex,
  //     EndUserIp: reducerState?.ip?.ipData,
  //     TokenId: reducerState?.ip?.tokenData,
  //     TraceId:
  //       reducerState?.oneWay?.oneWayData?.data?.data?.Response?.TraceId ||
  //       reducerState?.return?.returnData?.data?.data?.Response?.TraceId,
  //     Passengers: passengerData.map((item, index) => {
  //       return {
  //         ...item,
  //         PassportExpiry: isPassportRequired
  //           ? convertDateFormat(item?.PassportExpiry)
  //           : "",
  //         Email: apiURL.flightEmail,
  //         ContactNo: apiURL.phoneNo,
  //       };
  //     }),
  //   };
  //   dispatch(bookAction(payloadLcc));
  // };

  // const getTicketForNonLCC = () => {
  //   const payLoadDomestic = {
  //     EndUserIp: reducerState?.ip?.ipData,
  //     TokenId: reducerState?.ip?.tokenData,
  //     TraceId: reducerState?.oneWay?.oneWayData?.data?.data?.Response?.TraceId,
  //     PNR: reducerState?.flightBook?.flightBookDataGDS?.Response?.PNR,
  //     BookingId:
  //       reducerState?.flightBook?.flightBookDataGDS?.Response?.BookingId,
  //   };
  //   const payLoadInternational = {
  //     EndUserIp: reducerState?.ip?.ipData,
  //     TokenId: reducerState?.ip?.tokenData,
  //     TraceId: reducerState?.oneWay?.oneWayData?.data?.data?.Response?.TraceId,
  //     PNR: reducerState?.flightBook?.flightBookDataGDS?.Response?.PNR,
  //     BookingId:
  //       reducerState?.flightBook?.flightBookDataGDS?.Response?.BookingId,
  //     Passengers: passengerData.map((item, index) => {
  //       return {
  //         ...item,
  //         Email: apiURL.flightEmail,
  //         ContactNo: apiURL.phoneNo,
  //       };
  //     }),
  //   };
  //   // console.warn(payLoadInternational, "payload international")
  //   if (isPassportRequired) {
  //     dispatch(bookTicketGDS(payLoadInternational));
  //   } else {
  //     dispatch(bookTicketGDS(payLoadDomestic));
  //   }
  // };

  // formatted time of flights

  // const duration = `${Math.floor(
  //   TicketDetails?.Segments[0][0]?.Duration / 60
  // )}hr ${TicketDetails?.Segments[0][0]?.Duration % 60}min`;

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
    // console.log(jsonSavePnrData, "jsonSavePnrData")
    if (jsonSavePnrData) {
      saveDb();
    }
  }, [jsonSavePnrData]);

  const validation = async () => {
    const result = passengerData?.filter(
      (item) =>
        validateName(item?.firstName) &&
        validateName(item?.lastName) &&
        validateDate(item?.DateOfBirth) &&
        (isPassportRequired ? isValidPassportNumber(item?.passportNo) : true)
    );
    // console.warn("result", result);
    if (
      result.length === passengerData.length &&
      validatePhoneNumber(passengerData?.[0].ContactNo) &&
      validateEmail(passengerData?.[0]?.email)
    ) {
      return setValidation(true);
    } else setValidation(false);
  };

  useEffect(() => {
    validation();
  }, [passengerData]);
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
  const searchFlight = reducerState?.searchFlight?.flightDetail;

  // const Props = {
  //   transactionAmount: transactionAmount,
  //   handleClick: handleClickButton,
  // };

  // console.log(reducerState   ,"reducerState");
  const[firstnamevalue, setfirstnamevalue]= useState('');
  const[lastnamevalue, setlastnamevalue] = useState('');
  const[numbervalue, setnumbervalue] = useState('');

//   const passengerdetail = (e) => {
//     const isChecked = e.target.checked;
//     if (isChecked) {
//     const fullName = reducerState?.logIn?.loginData?.data?.result?.username ;
//     const lastName = fullName ? fullName.split(' ').slice(1).join(' ') : '';
//     const firstName = fullName ? fullName.split(' ')[0] : '';
//     const phonenumber = reducerState?.logIn?.loginData?.data?.result?.phone?.mobile_number

// // console.log(firstName,lastName,phonenumber);
// setnumbervalue(phonenumber);
// setfirstnamevalue(firstName);
// setlastnamevalue(lastName);
// // handleServiceChange()
//     }else{
//       setfirstnamevalue(' ');
//       setlastnamevalue(' ');
//       setnumbervalue('');
//     }
   
//   };

const passengerdetail = (e) => {
  const isChecked = e.target.checked;
  // console.log(passengerData,"gasjdgajdgasjd");
  if (isChecked) {
  const fullName = reducerState?.logIn?.loginData?.data?.result?.username ;
  const lastName = fullName ? fullName.split(' ').slice(1).join(' ') : '';
  const firstName = fullName ? fullName.split(' ')[0] : '';
  const phonenumber = reducerState?.logIn?.loginData?.data?.result?.phone?.mobile_number

// console.log(firstName,lastName,phonenumber);
setnumbervalue(phonenumber);
setfirstnamevalue(firstName);
setlastnamevalue(lastName);
handleServiceChange({ target: { name: 'firstName', value: firstName } }, 0);
handleServiceChange({ target: { name: 'lastName', value: lastName } }, 0);
handleServiceChange({ target: { name: 'ContactNo', value: phonenumber } }, 0);
// handleServiceChange()
  }else{
    setfirstnamevalue(' ');
    setlastnamevalue(' ');
    setnumbervalue('');
    handleServiceChange({ target: { name: 'firstName', value: '' } }, 0);
  handleServiceChange({ target: { name: 'lastName', value: '' } }, 0);
  handleServiceChange({ target: { name: 'ContactNo', value: '' } }, 0);
  }
 
};






  if (errorMessage) {
    <Flighterror props={errorMessage.errorMessage} />;
  }

  // console.log("amdPage", "ticket details");
  if (loaderPayment == false) {
    return (
      <>
        {/* <div className="mainimgFlightSearch">
          <InsideNavbar />
        </div> */}

        {!reducerState?.flightFare?.flightQuoteData?.Results === true &&
        ResultIndex?.ResultIndex ? (
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
                              {/* {TicketDetails?.AirlineRemark !== null &&
                              TicketDetails?.AirlineRemark !== "--." ? (
                                <p className="text-center w-100 mandaField">
                                  {TicketDetails?.AirlineRemark}
                                </p>
                              ) : (
                                ""
                              )} */}

                              <p>
                                {
                                  //"sesstioResultIndex?.flightDetails"
                                  sesstioResultIndex?.flightDetails
                                    ?.flightInformation
                                    ? sesstioResultIndex?.flightDetails
                                        ?.flightInformation?.location[0]
                                        ?.locationId
                                    : sesstioResultIndex?.flightDetails[0]
                                        .flightInformation?.location[0]
                                        ?.locationId
                                }
                                <FiArrowRight style={{ margin: "5px" }} />{" "}
                                {sesstioResultIndex?.flightDetails
                                  ?.flightInformation
                                  ? sesstioResultIndex?.flightDetails
                                      ?.flightInformation?.location[1]
                                      ?.locationId
                                  : sesstioResultIndex?.flightDetails[
                                      sesstioResultIndex?.flightDetails.length -
                                        1
                                    ].flightInformation?.location[1]
                                      ?.locationId}
                              </p>
                              <div className="aboveSpan">
                                <span className="aboveSOne">
                                  {sesstioResultIndex?.flightDetails
                                    ?.flightInformation
                                    ? convertTime(
                                        sesstioResultIndex?.flightDetails
                                          ?.flightInformation?.productDateTime
                                          ?.timeOfDeparture
                                      )
                                    : convertTime(
                                        sesstioResultIndex?.flightDetails[0]
                                          ?.flightInformation?.productDateTime
                                          ?.timeOfDeparture
                                      )}
                                </span>
                                {/* <span>Non Stop {duration}</span> */}
                                <span>
                                  {" "}
                                  {sesstioResultIndex?.flightDetails.length < 1
                                    ? `${
                                        sesstioResultIndex?.flightDetails
                                          .length - 1
                                      } stop via ${
                                        sesstioResultIndex?.flightDetails
                                          ?.flightInformation[0]?.location[1]
                                          ?.locationId
                                      }`
                                    : "Non Stop"}
                                </span>
                              </div>
                            </div>
                          </div>

                          {sesstioResultIndex?.flightDetails
                            ?.flightInformation ? (
                            <>
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
                              <div className="bookbottomBox">
                                <div>
                                  <div className="bookBottomOne">
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
                                  <div className="bookBottomTwo">
                                    <img src={fromTo} alt="icon" />
                                  </div>
                                  <div className="bookBottomThree">
                                    <p>
                                      {/* {item?.Origin?.Airport?.CityName}{" "} */}
                                      {
                                        sesstioResultIndex?.flightDetails
                                          ?.flightInformation?.location[0]
                                          ?.locationId
                                      }
                                      <span>
                                        {
                                          findAirportByCode(
                                            sesstioResultIndex?.flightDetails
                                              ?.flightInformation?.location[0]
                                              ?.locationId
                                          )?.name
                                        }
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
                                      <span>
                                        {
                                          findAirportByCode(
                                            sesstioResultIndex?.flightDetails
                                              ?.flightInformation?.location[1]
                                              ?.locationId
                                          )?.name
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
                                <div className="bookBottomFour">
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
                                            ?.freeBagAllownceInfo
                                            ?.baggageDetails?.freeAllowance * 23
                                        : Number(
                                            sesstioResultIndex?.baggage
                                              ?.freeBagAllownceInfo
                                              ?.baggageDetails?.freeAllowance
                                          ) === 0
                                        ? "No baggage"
                                        : sesstioResultIndex?.baggage
                                            ?.freeBagAllownceInfo
                                            ?.baggageDetails?.freeAllowance}
                                      {sesstioResultIndex?.baggage
                                        ?.freeBagAllownceInfo?.baggageDetails
                                        ?.quantityCode === "N"
                                        ? sesstioResultIndex?.baggage
                                            ?.freeBagAllownceInfo
                                            ?.baggageDetails?.unitQualifier ===
                                          "K"
                                          ? "KG"
                                          : "LB"
                                        : Number(
                                            sesstioResultIndex?.baggage
                                              ?.freeBagAllownceInfo
                                              ?.baggageDetails?.freeAllowance
                                          ) !== 0 ||
                                          sesstioResultIndex?.baggage
                                            ?.freeBagAllownceInfo
                                            ?.baggageDetails?.freeAllowance !==
                                            "0"
                                        ? "KG"
                                        : ""}

                                      {/* {item?.Baggage?.split(" ")[0]} */}
                                    </span>
                                  </div>
                                  <div>
                                    <p>Cabin</p>
                                    <span>
                                      {/* {sesstioResultIndex?.baggage
                                        ?.freeBagAllownceInfo?.baggageDetails
                                        ?.quantityCode !== "N"
                                        ? "7KG"
                                        : "Included"} */}
                                      Included
                                    </span>
                                  </div>
                                </div>
                              </div>
                              {/* <div>
                                      {layoverDuration !== 0 && (
                                        <p className="text-bold">
                                          Layover Time:{" "}
                                          {layoverHours !== 0 &&
                                            `${layoverHours} hours`}{" "}
                                          {layoverMinutes !== 0 &&
                                            `${layoverMinutes} minutes`}
                                        </p>
                                      )}
                                    </div> */}
                              {/* klkkk */}
                            </>
                          ) : (
                            sesstioResultIndex?.flightDetails?.map(
                              (item, index) => {
                                // const nextFlight =
                                //   TicketDetails?.Segments[0][index + 1];
                                // let layoverHours = 0;
                                // let layoverMinutes = 0;
                                // let layoverDuration = 0;

                                // if (nextFlight) {
                                //   const arrivalTime = dayjs(
                                //     item?.Destination?.ArrTime
                                //   );
                                //   const departureTime = dayjs(
                                //     nextFlight?.Origin?.DepTime
                                //   );
                                //   layoverDuration = departureTime.diff(
                                //     arrivalTime,
                                //     "minutes"
                                //   ); // Calculate difference in minutes
                                //   layoverHours = Math.floor(
                                //     layoverDuration / 60
                                //   ); // Extract hours
                                //   layoverMinutes = layoverDuration % 60;
                                // }
                                return (
                                  // <>hii</>
                                  <>
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
                                    <div className="bookbottomBox">
                                      <div>
                                        <div className="bookBottomOne">
                                          <p>
                                            {convertTime(
                                              sesstioResultIndex?.flightDetails[
                                                index
                                              ]?.flightInformation
                                                ?.productDateTime?.timeOfArrival
                                            )}
                                          </p>
                                          <p>
                                            {convertTime(
                                              sesstioResultIndex?.flightDetails[
                                                index
                                              ]?.flightInformation
                                                ?.productDateTime
                                                ?.timeOfDeparture
                                            )}
                                          </p>
                                        </div>
                                        <div className="bookBottomTwo">
                                          <img src={fromTo} alt="icon" />
                                        </div>
                                        <div className="bookBottomThree">
                                          <p>
                                            {/* {item?.Origin?.Airport?.CityName}{" "} */}
                                            {
                                              sesstioResultIndex?.flightDetails[
                                                index
                                              ]?.flightInformation?.location[1]
                                                ?.locationId
                                            }
                                            <span>
                                              {
                                                findAirportByCode(
                                                  sesstioResultIndex
                                                    ?.flightDetails[index]
                                                    ?.flightInformation
                                                    ?.location[1]?.locationId
                                                )?.name
                                              }
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
                                            <span>
                                              {
                                                // item?.Destination?.Airport
                                                //   ?.AirportName
                                                findAirportByCode(
                                                  sesstioResultIndex
                                                    ?.flightDetails[index]
                                                    ?.flightInformation
                                                    ?.location[1]?.locationId
                                                )?.name
                                              }
                                              {", "}
                                              Terminal-
                                              {/* {item?.Destination?.Airport
                                                ?.Terminal
                                                ? item?.Destination?.Airport
                                                    ?.Terminal
                                                : "Y"} */}
                                              {
                                                sesstioResultIndex
                                                  ?.flightDetails[index]
                                                  ?.flightInformation
                                                  ?.location[0]?.terminal
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
                                          <span>
                                            {sesstioResultIndex?.baggage
                                              ?.freeBagAllownceInfo
                                              ?.baggageDetails?.quantityCode ===
                                            "N"
                                              ? sesstioResultIndex?.baggage
                                                  ?.freeBagAllownceInfo
                                                  ?.baggageDetails
                                                  ?.freeAllowance * 23
                                              : sesstioResultIndex?.baggage
                                                  ?.freeBagAllownceInfo
                                                  ?.baggageDetails
                                                  ?.freeAllowance}
                                            {
                                              // sesstioResultIndex?.baggage
                                              // ?.freeBagAllownceInfo?.baggageDetails
                                              // ?.quantityCode === "N"
                                              // ?
                                              sesstioResultIndex?.baggage
                                                ?.freeBagAllownceInfo
                                                ?.baggageDetails
                                                ?.unitQualifier === "L"
                                                ? "LB"
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
                                                : ""
                                              // :"KG"
                                            }
                                            {/* {item?.Baggage?.split(" ")[0]} */}
                                          </span>
                                        </div>
                                        <div>
                                          <p>Cabin</p>
                                          <span>
                                            {
                                              // sesstioResultIndex?.baggage
                                              //   ?.freeBagAllownceInfo?.baggageDetails
                                              //   ?.quantityCode !== "N"
                                              //   ? "7KG"
                                              //   : "Included"
                                              // item?.CabinBaggage?.split(
                                              //   " "
                                              // )[0]
                                            }
                                            Included
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                    {/* <div>
                                      {layoverDuration !== 0 && (
                                        <p className="text-bold">
                                          Layover Time:{" "}
                                          {layoverHours !== 0 &&
                                            `${layoverHours} hours`}{" "}
                                          {layoverMinutes !== 0 &&
                                            `${layoverMinutes} minutes`}
                                        </p>
                                      )}
                                    </div> */}
                                    {/* klkkk */}
                                  </>
                                );
                              }
                            )
                          )}
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
                                    name="title"
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
                                  {/* <input
                                    type="text"
                                    name="firstName"
                                    id="floatingInput"
                                    value={index === 0 ? firstnamevalue: ' '}
                                    onChange={(e) =>
                                      handleServiceChange(e, index)
                                    }
                                    class="form-control"
                                  ></input> */}
                                  <input
        type="text"
        name="firstName"
        value={index === 0 ? firstnamevalue : passengerData[index]?.firstName || ''}
        id="floatingInput"
        className="form-control"
        onChange={(e) => {
          if (index === 0) {
            setfirstnamevalue(e.target.value);
          }
          handleServiceChange(e, index);
        }}
        // placeholder="First Name"
      />
                                  {sub &&
                                    !validateName(
                                      passengerData[index]?.firstName
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
                                  {/* <input
                                    type="text"
                                    name="lastName"
                                    id="floatingInput"
                                    value={index === 0 ?  lastnamevalue: " "}
                                    class="form-control"
                                    onChange={(e) =>
                                      handleServiceChange(e, index)
                                    }
                                  ></input> */}
                                   <input
                                    type="text"
                                    name="lastName"
                                    id="floatingInput"
                                    value={index === 0 ? lastnamevalue : passengerData[index]?.lastName || ''}
                                    class="form-control"
                                    onChange={(e) => {
          if (index === 0) {
            setlastnamevalue(e.target.value);
          }
          handleServiceChange(e, index);
        }}
                                  ></input>
                                  {sub &&
                                    !validateName(
                                      passengerData[index]?.lastName
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
                                      passengerData[index]?.DateOfBirth
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
                                        name="passportNo"
                                        id="floatingInput"
                                        class="form-control"
                                        onChange={(e) => {
                                          handleServiceChange(e, index);
                                        }}
                                      ></input>
                                      {sub &&
                                        !isValidPassportNumber(
                                          passengerData[index]?.passportNo
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
                                        name="passportExpiry"
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
                                    name="firstName"
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
                                        ?.firstName
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
                                    name="lastName"
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
                                    name="gender"
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
                                        name="passportNo"
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
                                          ]?.passportNo
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
                                        name="passportExpiry"
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
                                    name="firstName"
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
                                      ]?.firstName
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
                                    name="lastName"
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
                                      ]?.lastName
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
                                    name="gender"
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
                                      ]?.DateOfBirth
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
                                        name="passportNo"
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
                                        name="passportExpiry"
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

                         {authenticUser == 200 ? <Checkbox onChange={passengerdetail}>Booking flight for yourself</Checkbox> : " " } 
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
                                  name="email"
                                  id="floatingInput"
                                  class="form-control"
                                  onChange={(e) => {
                                    handleServiceChange(e, 0);
                                  }}
                                ></input>
                                {sub &&
                                  !validateEmail(passengerData[0].email) && (
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
                                  value={numbervalue}
                                  id="floatingInput"
                                  class="form-control"
                                  onChange={(e) => {
                                    // if (index === 0) {
                                      setnumbervalue(e.target.value);
          // }
                                    handleServiceChange(e, 0);
                                  }}
                                ></input>
                                {sub &&
                                  !validatePhoneNumber(
                                    passengerData[0]?.ContactNo
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
                        oncouponselect={handlecouponChange}
                         onFinalAmountChange={handleFinalAmountChange}
                        transactionAmount={setTransactionAmountState}
                        Amount={transactionAmount}
                      />
                    </div>

                    <div className="col-lg-12 my-4 smallButtMobile">
                      {V_aliation ? (
                        <button
                          className="bookWrapperButton"
                          type="submit"
                          onClick={() => handleTravelClickOpen()}
                          // onClick={() => xmlpassengerData()}
                          // onClick={() => handleTravelClickOpen()}
                          // onClick={() => skip()}
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
                  {<BookNowLeftAmd onFinalAmountChange={handleFinalAmountChange}  oncouponselect={handlecouponChange}/>}
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
      </>
    );
  } else {
    return <PaymentLoader />;
  }
}
