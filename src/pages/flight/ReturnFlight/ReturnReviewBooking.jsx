import React from 'react'
import FlightLoader from '../FlightLoader/FlightLoader';
import Alert from '@mui/material/Alert';
import { isValidPassportNumber } from "./passportValidation"
import dayjs from "dayjs";
// import fromTo from "../../images/fromTo.png";
import fromTo from "../../../images/fromTo.png"
import { FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";
import { useDispatch, useSelector, useReducer } from "react-redux";
import { useNavigate } from "react-router-dom";


const ReturnReviewBooking = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const adults = sessionStorage.getItem("adults");
    const childs = sessionStorage.getItem("childs");
    const infants = sessionStorage.getItem("infants");
    const reducerState = useSelector((state) => state);
    const fareValue = reducerState?.flightFare?.flightQuoteData?.Results;
    const isPassportRequired =
        reducerState?.flightFare?.flightQuoteData?.Results
            ?.IsPassportRequiredAtTicket;
    const fareValueReturn =
        isPassportRequired ? reducerState?.flightFare?.flightQuoteData?.Results :
            reducerState?.flightFare?.flightQuoteDataReturn?.Results;
    const fareRule = isPassportRequired ?
        reducerState?.flightFare?.flightRuleData?.FareRules
        : reducerState?.flightFare?.flightRuleDataReturn?.FareRules;
    const fareRuleReturn =
        reducerState?.flightFare?.flightRuleDataReturn?.FareRules;
    const data = reducerState?.oneWay?.oneWayData?.data?.data?.Response;
    const result = reducerState?.flightFare?.flightQuoteData?.Results
    const flightDeparture = reducerState?.flightFare?.flightQuoteData?.Results?.Segments;
    const flightReturn = isPassportRequired ? reducerState?.flightFare?.flightQuoteData?.Results?.Segments : reducerState?.flightFare?.flightQuoteDataReturn?.Results?.Segments;


    console.log(flightDeparture, "flight departure")
    console.log(flightReturn, "flight rturn")


    return (
        <div>
            <div className="container px-0 pt-4">
                <div className="row">
                    <div className="col-lg-9">
                        <div className="row">

                            {/* for departure  */}

                            <div className="col-lg-12 mb-3">
                                <div className="booknowFlight">
                                    <div className="bookaboveBox">
                                        <div>
                                            <p className="text-center">Departure</p>
                                            <p>
                                                {
                                                    flightDeparture?.[0][0]?.Origin
                                                        ?.Airport?.CityName
                                                }
                                                <FiArrowRight style={{ margin: "5px" }} />{" "}
                                                {
                                                    flightDeparture?.[0][flightDeparture[0].length - 1]?.Destination
                                                        ?.Airport?.CityName
                                                }
                                            </p>
                                            <div className="aboveSpan">
                                                <span className="aboveSOne">
                                                    {dayjs(flightDeparture?.[0][0]?.Origin?.DepTime).format("DD MMM, YY")}
                                                </span>
                                                <span>
                                                    {flightDeparture?.[0].length > 1 ? `${flightDeparture?.[0].length - 1} stop via ${flightDeparture[0][0]?.Destination?.Airport?.CityName}` : "Non Stop"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bookcenteredBox">
                                        <div>
                                            <img
                                                src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/${flightDeparture?.[0][0]?.Airline?.AirlineCode}.png`}
                                            />{" "}
                                        </div>
                                        <span>
                                            {
                                                flightDeparture?.[0][0]?.Airline
                                                    ?.AirlineName
                                            }
                                        </span>
                                        <p>
                                            {
                                                flightDeparture?.[0][0]?.Airline
                                                    ?.AirlineCode
                                            }
                                            {
                                                flightDeparture?.[0][0]?.Airline
                                                    ?.FlightNumber
                                            }

                                        </p>
                                    </div>
                                    {
                                        flightDeparture?.[0]?.map((item, index) => {
                                            return (
                                                <div style={{ position: "relative" }}>

                                                    <div className="bookbottomBox">



                                                        <div>
                                                            <div className="bookBottomOne">
                                                                <p>{dayjs(item?.Origin?.DepTime).format("h:mm A")}</p>
                                                                <p>{dayjs(item?.Destination?.ArrTime).format("h:mm A")}</p>

                                                            </div>
                                                            <div className="bookBottomTwo">
                                                                <img src={fromTo} alt="icon" />
                                                            </div>
                                                            <div className="bookBottomThree">
                                                                <p>
                                                                    {
                                                                        item?.Origin
                                                                            ?.Airport?.CityName
                                                                    }{" "}
                                                                    <span>
                                                                        {
                                                                            item?.Origin
                                                                                ?.Airport?.AirportName
                                                                        }
                                                                    </span>
                                                                </p>
                                                                <p>
                                                                    {
                                                                        item?.Destination
                                                                            ?.Airport?.CityName
                                                                    }{" "}
                                                                    <span>
                                                                        {
                                                                            item
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
                                                                    flightDeparture[0][0]?.Baggage.split(" ")[0]
                                                                }{" "} Kgs</span>
                                                            </div>
                                                            <div>
                                                                <p>Cabin</p>
                                                                <span>{
                                                                    flightDeparture[0][0]?.CabinBaggage.split(" ")[0]
                                                                }{" "} Kgs</span>
                                                            </div>
                                                        </div>

                                                    </div>

                                                </div>
                                            )
                                        })
                                    }
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
                                                {
                                                    flightReturn?.[0]?.[0]?.Origin
                                                        ?.Airport?.CityName
                                                }
                                                <FiArrowRight style={{ margin: "5px" }} />{" "}
                                                {
                                                    flightReturn?.[0][flightReturn?.[0].length - 1]?.Destination
                                                        ?.Airport?.CityName
                                                }
                                            </p>
                                            <div className="aboveSpan">
                                                <span className="aboveSOne">
                                                    {dayjs(flightReturn?.[0][0]?.Origin?.DepTime).format("DD MMM, YY")}
                                                </span>
                                                <span>
                                                    {/* {`${flightReturn[0].length -1} stop via ${flightReturn[0][0]?.Destination?.Airport?.CityName}`}{" "} */}
                                                    {flightReturn?.[0].length > 1 ? `${flightReturn?.[0].length - 1} stop via ${flightReturn?.[0][0]?.Destination?.Airport?.CityName}` : "Non Stop"}
                                                    {/* {duration} */}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bookcenteredBox">
                                        <div>
                                            <img
                                                src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/${flightReturn?.[0][0]?.Airline?.AirlineCode}.png`}
                                            />{" "}
                                        </div>
                                        <span>
                                            {
                                                flightReturn?.[0][0]?.Airline
                                                    ?.AirlineName
                                            }
                                        </span>
                                        <p>
                                            {
                                                flightReturn?.[0][0]?.Airline
                                                    ?.AirlineCode
                                            }
                                            {
                                                flightReturn?.[0][0]?.Airline
                                                    ?.FlightNumber
                                            }

                                        </p>
                                    </div>
                                    {
                                        flightReturn?.[0]?.map((item, index) => {
                                            return (
                                                <div style={{ position: "relative" }}>

                                                    <div className="bookbottomBox">



                                                        <div>
                                                            <div className="bookBottomOne">
                                                                <p>{dayjs(item?.Origin?.DepTime).format("h:mm A")}</p>
                                                                <p>{dayjs(item?.Destination?.ArrTime).format("h:mm A")}</p>

                                                            </div>
                                                            <div className="bookBottomTwo">
                                                                <img src={fromTo} alt="icon" />
                                                            </div>
                                                            <div className="bookBottomThree">
                                                                <p>
                                                                    {
                                                                        item?.Origin
                                                                            ?.Airport?.CityName
                                                                    }{" "}
                                                                    <span>
                                                                        {
                                                                            item?.Origin
                                                                                ?.Airport?.AirportName
                                                                        }
                                                                    </span>
                                                                </p>
                                                                <p>
                                                                    {
                                                                        item?.Destination
                                                                            ?.Airport?.CityName
                                                                    }{" "}
                                                                    <span>
                                                                        {
                                                                            item
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
                                                                    flightDeparture?.[0][0]?.Baggage.split(" ")[0]
                                                                }{" "} Kgs</span>
                                                            </div>
                                                            <div>
                                                                <p>Cabin</p>
                                                                <span>{
                                                                    flightDeparture?.[0][0]?.CabinBaggage.split(" ")[0]
                                                                }{" "} Kgs</span>
                                                            </div>
                                                        </div>

                                                    </div>

                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReturnReviewBooking
