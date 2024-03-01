import React, { useEffect, useState } from "react";
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
import Accordion from "react-bootstrap/Accordion";
import { Typography, Button } from "@mui/material";
import ReturnSummaryWithCoupon from './ReturnSummaryWithCoupon';
import InsideNavbar from "../../../UI/BigNavbar/InsideNavbar"
import Modal from "@mui/material/Modal";
import loginnew from "../../../images/login-01.jpg"
import Login from "../../../components/Login"
import CloseIcon from "@mui/icons-material/Close";


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
    const Passengers = reducerState?.passengers?.passengersData;
    const PassengersReturn = reducerState?.passengers?.passengerDataReturn;
    const flightDeparture = reducerState?.flightFare?.flightQuoteData?.Results?.Segments;
    const flightReturn = isPassportRequired ? reducerState?.flightFare?.flightQuoteData?.Results?.Segments : reducerState?.flightFare?.flightQuoteDataReturn?.Results?.Segments;
    const authenticUser = reducerState?.logIn?.loginData?.status;

    console.log(flightDeparture, "flight departure")
    console.log(flightReturn, "flight rturn")

    const [openTravelModal, setOpenTravelModal] = React.useState(false);

    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    const handleModalClose = () => {
        setIsLoginModalOpen(false)
    }

    useEffect(() => {
        if (authenticUser == 200) {
            handleModalClose();
        }
    }, [authenticUser])

    const handlePayment = () => {
        if (authenticUser !== 200) {
            setIsLoginModalOpen(true);
        }
    };

    return (
        <div>
            <div className="mainimgFlightSearch">
                <InsideNavbar />
            </div>
            <div className="container px-0 pt-4">
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
                                                {
                                                    flightDeparture?.[0][0]?.Origin
                                                        ?.Airport?.CityName
                                                }
                                                <FiArrowRight style={{ margin: "5px" }} />{" "}
                                                {
                                                    flightDeparture[0][flightDeparture[0].length - 1]?.Destination
                                                        ?.Airport?.CityName
                                                }
                                            </p>
                                            <div className="aboveSpan">
                                                <span className="aboveSOne">
                                                    {dayjs(flightDeparture[0][0]?.Origin?.DepTime).format("DD MMM, YY")}
                                                </span>
                                                <span>
                                                    {flightDeparture[0].length > 1 ? `${flightDeparture[0].length - 1} stop via ${flightDeparture[0][0]?.Destination?.Airport?.CityName}` : "Non Stop"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>


                                    {
                                        flightDeparture[0]?.map((item, index) => {

                                            const nextFlight = flightDeparture[0][index + 1];
                                            let layoverHours = 0;
                                            let layoverMinutes = 0;

                                            if (nextFlight) {
                                                const arrivalTime = dayjs(item?.Destination?.ArrTime);
                                                const departureTime = dayjs(nextFlight?.Origin?.DepTime);
                                                const layoverDuration = departureTime.diff(arrivalTime, 'minutes'); // Calculate difference in minutes
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
                                                        <span>
                                                            {
                                                                item?.Airline
                                                                    ?.AirlineName
                                                            }
                                                        </span>
                                                        <p>
                                                            {
                                                                item?.Airline
                                                                    ?.AirlineCode
                                                            }
                                                            {
                                                                item?.Airline
                                                                    ?.FlightNumber
                                                            }

                                                        </p>
                                                    </div>

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
                                                                                ?.Airport?.AirportName?.slice(0, 26)
                                                                        }
                                                                        {" "}Terminal-{item?.Origin?.Airport?.Terminal ? item?.Origin?.Airport?.Terminal : "X"}
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
                                                                                ?.Destination?.Airport?.AirportName?.slice(0, 26)
                                                                        }
                                                                        {" "}Terminal-{item?.Destination?.Airport?.Terminal ? item?.Destination?.Airport?.Terminal : "Y"}
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
                                                    <div>
                                                        {(layoverHours !== 0 && layoverMinutes !== 0) && (
                                                            <p className="text-bold">Layover Time: {layoverHours} hours {layoverMinutes} minutes</p>
                                                        )}
                                                    </div>
                                                </>
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
                                    {
                                        flightReturn?.[0]?.map((item, index) => {

                                            const nextFlight = flightReturn?.[0][index + 1];
                                            let layoverHours = 0;
                                            let layoverMinutes = 0;

                                            if (nextFlight) {
                                                const arrivalTime = dayjs(item?.Destination?.ArrTime);
                                                const departureTime = dayjs(nextFlight?.Origin?.DepTime);
                                                const layoverDuration = departureTime.diff(arrivalTime, 'minutes'); // Calculate difference in minutes
                                                layoverHours = Math.floor(layoverDuration / 60); // Extract hours
                                                layoverMinutes = layoverDuration % 60;
                                            }
                                            return (
                                                <>


                                                    <div className="bookcenteredBox">
                                                        <div>
                                                            <img
                                                                src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/${item?.Airline
                                                                    ?.AirlineCode}.png`}
                                                            />{" "}
                                                        </div>
                                                        <span>
                                                            {
                                                                item?.Airline
                                                                    ?.AirlineName
                                                            }
                                                        </span>
                                                        <p>
                                                            {
                                                                item?.Airline
                                                                    ?.AirlineCode
                                                            }
                                                            {
                                                                item?.Airline
                                                                    ?.FlightNumber
                                                            }

                                                        </p>
                                                    </div>

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
                                                                                ?.Airport?.AirportName?.slice(0, 26)
                                                                        }
                                                                        {" "}Terminal-{item?.Origin?.Airport?.Terminal ? item?.Origin?.Airport?.Terminal : "X"}
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
                                                                                ?.Destination?.Airport?.AirportName?.slice(0, 26)
                                                                        }
                                                                        {" "}Terminal-{item?.Destination?.Airport?.Terminal ? item?.Destination?.Airport?.Terminal : "Y"}
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
                                                    <div>
                                                        {(layoverHours !== 0 && layoverMinutes !== 0) && (
                                                            <p className="text-bold">Layover Time: {layoverHours} hours {layoverMinutes} minutes</p>
                                                        )}
                                                    </div>
                                                </>
                                            )
                                        })
                                    }
                                </div>
                            </div>




                            <div className="col-lg-12 accor_dian mt-4" >
                                {fareRule &&
                                    fareRule.length > 0 &&
                                    fareRule.map((dat) => {
                                        return (
                                            <div my={2}>
                                                <Accordion
                                                    defaultActiveKey={null}
                                                >
                                                    <Accordion.Item>
                                                        <Accordion.Header>
                                                            <p>Detailed Fare Rules</p>
                                                        </Accordion.Header>
                                                        <Accordion.Body>
                                                            <div className="htmlFare"
                                                                dangerouslySetInnerHTML={{
                                                                    __html: dat?.FareRuleDetail,
                                                                }}
                                                            />
                                                        </Accordion.Body>
                                                    </Accordion.Item>
                                                </Accordion>
                                            </div>
                                        );
                                    })}
                            </div>
                            <div className="col-lg-8 my-3">
                                {Passengers?.map((passenger, key) => {
                                    return (
                                        <>
                                            <div style={{ marginBottom: "15px" }}>
                                                <p >
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

                                            <div key={key} className="passDetails">
                                                <div>
                                                    <p>Name:</p>
                                                    <p>Gender</p>
                                                    {passenger.Email && <p>Email:</p>}

                                                </div>
                                                <div>
                                                    <span>
                                                        {passenger.Title} {passenger.FirstName} {passenger.LastName}
                                                    </span>
                                                    <span>
                                                        {passenger.Gender === 1
                                                            ? "Male"
                                                            : passenger.Gender === 2
                                                                ? "Female"
                                                                : "Transgender"}
                                                    </span>
                                                    <span>{passenger.Email}</span>
                                                </div>
                                            </div>
                                        </>
                                    );
                                })}
                            </div>



                        </div>
                    </div>


                    <div className="col-lg-3 col-md-3">
                        <ReturnSummaryWithCoupon />

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
        </div>
    )
}

export default ReturnReviewBooking
