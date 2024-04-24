import React, { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { Typography, Button } from "@mui/material";
import { useDispatch, useSelector, useReducer } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    PassengersAction,
    PassengersActionReturn,
} from "../../../Redux/Passengers/passenger";
import FlightLoader from "../FlightLoader/FlightLoader";
import Alert from "@mui/material/Alert";
import { isValidPassportNumber } from "./passportValidation";
import dayjs from "dayjs";
// import fromTo from "../../images/fromTo.png";
import fromTo from "../../../images/fromTo.png";
import { FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";
import ReturnSummary from "./ReturnSummary";
import { swalModal } from "../../../utility/swal"

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

const ReturnPassenger = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const adults = sessionStorage.getItem("adults");
    const childs = sessionStorage.getItem("childs");
    const infants = sessionStorage.getItem("infants");
    const reducerState = useSelector((state) => state);
    const [farePrice, setFarePrice] = useState("");
    const [farePriceReturn, setFarePriceReturn] = useState("");
    const [sub, setSub] = useState(false);
    const [showAleart, setShowAleart] = useState(false);
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
    const flightDeparture =
        reducerState?.flightFare?.flightQuoteData?.Results?.Segments;
    const flightReturn =
        reducerState?.flightFare?.flightQuoteDataReturn?.Results?.Segments;

    const cancellationPolicy =
        reducerState?.flightFare?.flightQuoteData?.Results?.MiniFareRules?.[0];
    const detailsOfCancel = cancellationPolicy?.filter(
        (rule) => rule.Type === "Cancellation"
    );

    // console.log(cancellationPolicy, "details of cancel");

    useEffect(() => {
        if (
            adults === undefined ||
            adults === null ||
            childs === undefined ||
            childs === null ||
            infants === undefined ||
            infants === null) {
            navigate("/ReturnResult");
        }
        else if
            (reducerState?.
                flightFare?.flightQuoteData?.
                Error?.ErrorCode !== undefined && reducerState?.
                    flightFare?.flightQuoteData?.
                    Error?.ErrorCode !== 0) {
            swalModal("flight", reducerState?.
                flightFare?.flightQuoteData?.
                Error?.ErrorMessage)
            navigate("/ReturnResult");
        }
        else if

            (reducerState?.
                flightFare?.flightQuoteDataReturn?.
                Error?.ErrorCode !== undefined && reducerState?.
                    flightFare?.flightQuoteDataReturn?.
                    Error?.ErrorCode !== 0) {
            swalModal("flight", reducerState?.
                flightFare?.flightQuoteDataReturn?.
                Error?.ErrorMessage)
            navigate("/ReturnResult");
        }
        else if
            (reducerState?.
                flightFare?.
                flightRuleData?.
                Error?.ErrorCode !== undefined && reducerState?.
                    flightFare?.
                    flightRuleData?.
                    Error?.ErrorCode !== 0) {
            swalModal("flight", reducerState?.
                flightFare?.flightRuleData?.
                Error?.ErrorMessage)
            navigate("/ReturnResult");
        }
        else if
            (reducerState?.
                flightFare?.
                flightRuleDataReturn
                ?.
                Error?.ErrorCode !== undefined && reducerState?.
                    flightFare?.
                    flightRuleDataReturn
                    ?.
                    Error?.ErrorCode !== 0) {
            swalModal("flight", reducerState?.
                flightFare?.flightRuleDataReturn?.
                Error?.ErrorMessage)
            navigate("/ReturnResult");
        }
        else if (!reducerState?.
            flightFare?.isLoading && reducerState?.
                flightFare?.
                flightRuleDataReturn
                ?.
                Error?.ErrorCode !== 0 && reducerState?.
                    flightFare?.
                    flightRuleData?.
                    Error?.ErrorCode !== 0 && reducerState?.
                        flightFare?.flightQuoteDataReturn?.
                        Error?.ErrorCode !== 0 && reducerState?.
                            flightFare?.flightQuoteData?.
                            Error?.ErrorCode !== 0) {
            navigate("/ReturnResult");
        }
    }, [reducerState?.
        flightFare]);

    const passengerTemplate = {
        Title: "Mr",
        FirstName: "",
        LastName: "",
        PaxType: 1,
        DateOfBirth: "",
        Gender: 1,
        PassportNo: "",
        PassportExpiry: "",
        AddressLine1: "gaya",
        AddressLine2: "",
        Fare: farePrice[0],
        // Fare: 1,
        City: "Gurgaon",
        CountryCode: "IN",
        CellCountryCode: "+91-",
        ContactNo: "",
        Nationality: "IN",
        Email: "",
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
        Fare: farePrice[1],
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
        Fare: farePrice[2],
        IsLeadPax: false,
        FFAirlineCode: null,
        FFNumber: "",
    };

    // console.log(farePrice[0], "fare price");

    let totalPassenger = Number(adults) + Number(childs) + Number(infants);
    const passengerLists = [];
    const passengerChildLists = [];
    const passengerInfantLists = [];
    useEffect(() => {
        if (fareValue && fareValueReturn) {
            const fareDetails = fareValue?.Fare;
            const fareBreakdown = fareValue?.FareBreakdown;
            const fareBreakdownReturn = fareValueReturn?.FareBreakdown;
            const arr = [];
            const arrReturn = [];

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
            fareBreakdownReturn?.map((price, index) => {
                let objReturn = {
                    Currency: price?.Currency,
                    BaseFare: price?.BaseFare / price?.PassengerCount,
                    Tax: price?.Tax / price?.PassengerCount,
                    YQTax: price?.YQTax / price?.PassengerCount,
                    AdditionalTxnFeePub:
                        price?.AdditionalTxnFeePub / price?.PassengerCount,
                    AdditionalTxnFeeOfrd:
                        price?.AdditionalTxnFeeOfrd / price?.PassengerCount,
                };
                arrReturn.push(objReturn);
                setFarePriceReturn(arrReturn);
            });
        }
    }, [fareValue, fareValueReturn]);
    for (let i = 0; i < adults; i++) {
        passengerLists.push({
            ...passengerTemplate,
            IsLeadPax: i === 0, // Set the first passenger as the lead passenger
        });
    }

    for (let i = 0; i < childs; i++) {
        passengerChildLists.push({
            ...childPassenger,
            IsLeadPax: false, // Set the first passenger as the lead passenger
        });
    }
    for (let i = 0; i < infants; i++) {
        passengerInfantLists.push({
            ...infantPassenger,
            IsLeadPax: false, // Set the first passenger as the lead passenger
        });
    }

    const [passengerList, setPassengerList] = useState(passengerLists);
    const allPassenger = [
        passengerLists,
        passengerChildLists,
        passengerInfantLists,
    ];
    const [passengerData, setPassengerData] = useState(allPassenger.flat());
    const [isGST, setIsGst] = useState(false);

    const handleServiceChange = (e, i) => {
        const { name, value } = e.target;
        const list = [...passengerData];
        if (i < adults) {
            if (!list[i]["Fare"]) {
                list[i]["Fare"] = farePrice[0];
            }
        }
        if (i >= adults && i < +adults + +childs) {
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

    // console.log(passengerData, "passenger data")

    const fareQuoteData = reducerState?.flightFare?.flightQuoteData?.Results;
    function validatePhoneNumber(phoneNumber) {
        var phonePattern = /^\d{10}$/;
        return phonePattern.test(phoneNumber);
    }
    function validateEmail1(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function isValidEmail(email, phoneNumber, passport) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        var phonePattern = /^\d{10}$/;
        const result2 = validatePhoneNumber(phoneNumber);
        const result1 = validateEmail1(email);
        const result3 = isPassportRequired ? isValidPassportNumber(passport) : true;
        const result = result1 && result2 && result3;
        // console.warn(result, "Please fill all the details/////");
        return result;
    }
    function convertDateFormat(inputDate) {
        const [year, month, day] = inputDate.split("-");
        const newDate = new Date(year, month - 1, day);
        const outputDate = newDate
            .toISOString()
            .slice(0, 19)
            .replace("T", "T00:00:00");
        return outputDate;
    }

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

    // console.log(passengerData, "passemger data");
    const handleSubmit = () => {
        setSub(true);

        const valid = passengerData.filter(
            (item) =>
                item.FirstName === "" || item.LastName === "" || item.DateOfBirth === ""
        );

        const emailVal = passengerList.filter(
            (item) => !isValidEmail(item.Email, item.ContactNo, item.PassportNo)
        );

        if (valid.length !== 0 || emailVal.length !== 0) {
            setShowAleart(true);
            setTimeout(() => {
                setShowAleart(false);
            }, 3000);
            return;
        }

        const passengerDataReturn = passengerData?.map((item, index) => {
            if (item?.PaxType == 1) {
                return {
                    ...item,
                    PassportExpiry: isPassportRequired
                        ? convertDateFormat(item.PassportExpiry)
                        : "",
                    Fare: farePriceReturn[0],
                };
            } else if (item?.PaxType == 2) {
                return {
                    ...item,
                    PassportExpiry: isPassportRequired
                        ? convertDateFormat(item.PassportExpiry)
                        : "",
                    Fare: farePriceReturn[1],
                };
            } else {
                return {
                    ...item,
                    PassportExpiry: isPassportRequired
                        ? convertDateFormat(item.PassportExpiry)
                        : "",
                    Fare: farePriceReturn[2],
                };
            }
        });

        dispatch(PassengersAction(passengerData));
        dispatch(PassengersActionReturn(passengerDataReturn));

        navigate("/FlightresultReturn/Passengerdetail/returnreviewbooking");
    };

    const [Loading, setLoading] = useState(true);

    useEffect(() => {
        if (flightDeparture?.[0]?.[0]?.Airline?.AirlineCode === undefined) {
            setLoading(true);
        } else setLoading(false);
    }, [flightDeparture?.[0]?.[0]?.Airline?.AirlineCode]);

    if (Loading) {
        return (
            <div>
                <FlightLoader />
            </div>
        );
    }

    // console.log(flightReturn, "flight return");

    return (
        <div>
            <div className="mainimgFlightSearch">
            </div>
            <div
                style={{
                    position: "fixed",
                    top: "20%",
                    left: 0,
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 99999,
                }}
            >
                {showAleart && (
                    <Alert severity="error">Please fill all the details</Alert>
                )}
            </div>
            <div className="container  px-0 pt-4">
                <div className="row">
                    <div className="col-lg-9 martop">
                        <div className="row">
                            {/* for departure  */}

                            <div className="col-lg-12 mb-3">
                                <div className="booknowFlight">
                                    <div className="bookaboveBox">
                                        <div>
                                            <p className="text-center">Departure</p>
                                            <p>
                                                {flightDeparture?.[0][0]?.Origin?.Airport?.CityName}
                                                <FiArrowRight style={{ margin: "5px" }} />{" "}
                                                {
                                                    flightDeparture[0][flightDeparture[0].length - 1]
                                                        ?.Destination?.Airport?.CityName
                                                }
                                            </p>
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
                                            <p>
                                                {flightReturn?.[0]?.[0]?.Origin?.Airport?.CityName}
                                                <FiArrowRight style={{ margin: "5px" }} />{" "}
                                                {
                                                    flightReturn?.[0][flightReturn?.[0].length - 1]
                                                        ?.Destination?.Airport?.CityName
                                                }
                                            </p>
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

                            <motion.div variants={variants} className="col-lg-12 mt-3">
                                <div className="bookflightPassenger">
                                    <div className="headingBookFlight">
                                        <h3>Traveller Details</h3>
                                    </div>
                                    {adults > 0 &&
                                        Array.from({ length: adults }, (err, i) => (
                                            <div className="bookFlightPassInner">
                                                <div className="bookAdultIndex">
                                                    <p>Adult {i + 1}</p>
                                                </div>
                                                <div className="row g-3 mb-3">
                                                    <div className="col-lg-3 col-md-3">
                                                        <label for="exampleInputEmail1" class="form-label">
                                                            Title
                                                        </label>
                                                        <select
                                                            className="form-select "
                                                            name="Title"
                                                            onChange={(e) => handleServiceChange(e, i)}
                                                        >
                                                            <option value="Mr">Mr.</option>
                                                            <option value="Mrs">Mrs.</option>
                                                            <option value="Miss">Miss</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-lg-3 col-md-3">
                                                        <label for="exampleInputEmail1" class="form-label">
                                                            First Name
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="FirstName"
                                                            id="floatingInput"
                                                            onChange={(e) => handleServiceChange(e, i)}
                                                            class="form-control"
                                                        ></input>
                                                        {passengerData[i].FirstName == "" && sub && (
                                                            <span id="error1">Enter First Name</span>
                                                        )}
                                                    </div>
                                                    <div className="col-lg-3 col-md-3">
                                                        <label for="exampleInputEmail1" class="form-label">
                                                            Last Name
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="LastName"
                                                            id="floatingInput"
                                                            class="form-control"
                                                            onChange={(e) => handleServiceChange(e, i)}
                                                        ></input>
                                                        {passengerData[i].LastName == "" && sub && (
                                                            <span id="error1">Enter Last Name</span>
                                                        )}
                                                    </div>
                                                    <div className="col-lg-3 col-md-3">
                                                        <label for="exampleInputEmail1" class="form-label">
                                                            Date of Birth
                                                        </label>
                                                        <input
                                                            type="date"
                                                            name="DateOfBirth"
                                                            id="floatingInput"
                                                            class="form-control"
                                                            onChange={(e) => handleServiceChange(e, i)}
                                                            max={maxDate}
                                                        ></input>
                                                        {passengerData[i].DateOfBirth == "" && sub && (
                                                            <span id="error1">Enter DOB</span>
                                                        )}
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
                                                                        handleServiceChange(e, i);
                                                                    }}
                                                                ></input>
                                                                {!isValidPassportNumber(
                                                                    passengerData[i].PassportNo
                                                                ) &&
                                                                    sub && (
                                                                        <span id="error1">
                                                                            Enter Valid Passport number
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
                                                                        handleServiceChange(e, i);
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

                                    {/* child details here  */}

                                    {childs > 0 &&
                                        Array.from({ length: childs }, (err, i) => (
                                            <div className="bookFlightPassInner">
                                                <div className="bookAdultIndex">
                                                    <p>Child {i + 1}</p>
                                                </div>
                                                <div className="row g-3 mb-3">
                                                    <div className="col-lg-3 col-md-3">
                                                        <label for="exampleInputEmail1" class="form-label">
                                                            First Name
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="FirstName"
                                                            id="floatingInput"
                                                            class="form-control"
                                                            onChange={(e) =>
                                                                handleServiceChange(e, i + Number(adults))
                                                            }
                                                        ></input>
                                                        {passengerData[Number(adults) + i].FirstName ==
                                                            "" &&
                                                            sub && <span id="error1">Enter First Name</span>}
                                                    </div>
                                                    <div className="col-lg-3 col-md-3">
                                                        <label for="exampleInputEmail1" class="form-label">
                                                            Last Name
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="LastName"
                                                            id="floatingInput"
                                                            class="form-control"
                                                            onChange={(e) =>
                                                                handleServiceChange(e, i + Number(adults))
                                                            }
                                                            required
                                                        ></input>
                                                    </div>

                                                    <div className="col-lg-3 col-md-3">
                                                        <label for="exampleInputEmail1" class="form-label">
                                                            Gender
                                                        </label>
                                                        <select
                                                            className="form-select"
                                                            name="Gender"
                                                            onChange={(e) =>
                                                                handleServiceChange(e, i + Number(adults))
                                                            }
                                                        >
                                                            <option value="1">Female</option>
                                                            <option value="2">Male</option>
                                                            <option value="3">Others</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-lg-3 col-md-3">
                                                        <label for="exampleInputEmail1" class="form-label">
                                                            Date of Birth
                                                        </label>
                                                        <input
                                                            type="date"
                                                            name="DateOfBirth"
                                                            id="floatingInput"
                                                            class="form-control"
                                                            max={maxDateChild}
                                                            min={minDateChild}
                                                            onChange={(e) =>
                                                                handleServiceChange(e, i + Number(adults))
                                                            }
                                                        ></input>
                                                        {passengerData[Number(adults) + i].DateOfBirth ==
                                                            "" &&
                                                            sub && <span id="error1">Enter DOB</span>}
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
                                                                    onChange={(e) =>
                                                                        handleServiceChange(e, i + Number(adults))
                                                                    }
                                                                />
                                                                {!isValidPassportNumber(
                                                                    passengerData[Number(adults) + i].PassportNo
                                                                ) &&
                                                                    sub && (
                                                                        <span id="error1">
                                                                            Enter a valid passport
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
                                                                    min={currentDate}
                                                                    onChange={(e) =>
                                                                        handleServiceChange(e, i + Number(adults))
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

                                    {infants > 0 &&
                                        Array.from({ length: infants }, (err, i) => (
                                            <div className="bookFlightPassInner">
                                                <div className="bookAdultIndex">
                                                    <p>Infant {i + 1}</p>
                                                </div>
                                                <div className="row g-3 mb-3">
                                                    <div className="col-lg-3 col-md-3">
                                                        <label for="exampleInputEmail1" class="form-label">
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
                                                                    i + Number(adults) + Number(childs)
                                                                )
                                                            }
                                                        />
                                                        {passengerData[i + Number(adults) + Number(childs)]
                                                            .FirstName == "" &&
                                                            sub && <span id="error1">Enter First Name</span>}
                                                    </div>
                                                    <div className="col-lg-3 col-md-3">
                                                        <label for="exampleInputEmail1" class="form-label">
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
                                                                    i + Number(adults) + Number(childs)
                                                                )
                                                            }
                                                        />
                                                        {passengerData[i + Number(adults) + Number(childs)]
                                                            .LastName == "" &&
                                                            sub && <span id="error1">Enter Last Name</span>}
                                                    </div>

                                                    <div className="col-lg-3 col-md-3">
                                                        <label for="exampleInputEmail1" class="form-label">
                                                            Gender
                                                        </label>
                                                        <select
                                                            className="form-select"
                                                            name="Gender"
                                                            onChange={(e) =>
                                                                handleServiceChange(
                                                                    e,
                                                                    i + Number(adults) + Number(childs)
                                                                )
                                                            }
                                                        >
                                                            <option value="1">Female</option>
                                                            <option value="2">Male</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-lg-3 col-md-3">
                                                        <label for="exampleInputEmail1" class="form-label">
                                                            Date of Birth
                                                        </label>
                                                        <input
                                                            type="date"
                                                            name="DateOfBirth"
                                                            id="floatingInput"
                                                            class="form-control"
                                                            required
                                                            min={minDateInfer}
                                                            max={currentDate}
                                                            onChange={(e) =>
                                                                handleServiceChange(
                                                                    e,
                                                                    i + Number(adults) + Number(childs)
                                                                )
                                                            }
                                                        />
                                                        {passengerData[i + Number(adults) + Number(childs)]
                                                            .DateOfBirth == "" &&
                                                            sub && <span id="error1">Enter DOB</span>}
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
                                                                    onChange={(e) =>
                                                                        handleServiceChange(
                                                                            e,
                                                                            i + Number(adults) + Number(childs)
                                                                        )
                                                                    }
                                                                />
                                                                {!isValidPassportNumber(
                                                                    passengerData[
                                                                        i + Number(adults) + Number(childs)
                                                                    ].PassportNo
                                                                ) &&
                                                                    sub && (
                                                                        <span id="error1">
                                                                            Enter a valid Passport Number
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
                                                                    min={currentDate}
                                                                    onChange={(e) =>
                                                                        handleServiceChange(
                                                                            e,
                                                                            i + Number(adults) + Number(childs)
                                                                        )
                                                                    }
                                                                />
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
                                                    <label for="exampleInputEmail1" class="form-label">
                                                        Enter Email
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="Email"
                                                        id="floatingInput"
                                                        class="form-control"
                                                        onChange={(e) => handleServiceChange(e, 0)}
                                                    />
                                                    {!validateEmail1(passengerData[0].Email) && sub && (
                                                        <span id="error1">Enter Email</span>
                                                    )}
                                                </div>
                                                <div className="col-lg-5 col-md-5">
                                                    <label for="exampleInputEmail1" class="form-label">
                                                        Mobile Number
                                                    </label>
                                                    <input
                                                        type="phone"
                                                        name="ContactNo"
                                                        id="floatingInput"
                                                        class="form-control"
                                                        onChange={(e) => handleServiceChange(e, 0)}
                                                    />
                                                    {!validatePhoneNumber(passengerData[0].ContactNo) ==
                                                        true &&
                                                        sub && <span id="error1">Enter Contact</span>}
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </motion.div>

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

                            <div className="col-lg-12 mt-5 mb-4 leftDetBut">
                                <button
                                    onClick={handleSubmit}
                                    type="submit"
                                    className="bookWrapperButton"
                                >
                                    Proceed to Book
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-3">
                        <ReturnSummary />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReturnPassenger;
