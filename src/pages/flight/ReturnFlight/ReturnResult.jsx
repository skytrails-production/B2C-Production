import React, { useState, useEffect } from 'react'
import {
    quoteAction,
    ruleAction,
    quoteActionReturn,
    ruleActionReturn,
} from "../../../Redux/FlightFareQuoteRule/actionFlightQuote";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import "./returnresult.css";
import dayjs from 'dayjs';
import { motion } from "framer-motion";
import Divider from "@mui/material/Divider";
import FlightLoader from '../FlightLoader/FlightLoader';


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


const ReturnResult = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const reducerState = useSelector((state) => state);
    const [loading, setLoading] = useState(false);
    const result = reducerState?.return?.returnData?.data?.data?.Response?.Results;
    let initialGoFlight;
    let initialReturnFlight;
    let onGoTime
    let IncomeTime
    const [ongoFlight, setOngoFlight] = useState(initialGoFlight);
    const [incomeGlight, setIncomeFlight] = useState(initialReturnFlight);

    const [selectedFlightIndex, setSelectedFlightIndex] = useState(null);

    const handleFlightSelection = (index) => {
        setSelectedFlightIndex(index);
    };
    const [selectedFlightIndexReturn, setSelectedFlightIndexReturn] = useState(null);

    console.log(result, "result")

    const handleFlightSelectionReturn = (index) => {
        setSelectedFlightIndexReturn(index);
    };

    if (result !== undefined) {
        initialGoFlight = result?.[0][0];
        initialReturnFlight = result?.[1][0];
        // destination =
        //     result[0][0]?.Segments[0][0]?.Destination?.Airport?.CityName;
        // origin = result[0][0]?.Segments[0][0]?.Origin?.Airport?.CityName;
        onGoTime = result?.[0][0]?.Segments[0][0]?.Destination?.ArrTime;
        IncomeTime = result?.[1][0]?.Segments[0][0]?.Destination?.ArrTime;
    }


    useEffect(() => {
        setOngoFlight(initialGoFlight);
        setIncomeFlight(initialReturnFlight);
    }, [initialGoFlight, initialReturnFlight]);
    useEffect(() => {
        sessionStorage.setItem("flightDetailsONGo", JSON.stringify(initialGoFlight));
        sessionStorage.setItem("flightDetailsIncome", JSON.stringify(initialReturnFlight));
    }, [])


    console.log(result, "initial go flight")


    const handleIndexId = (ResultIndex) => {
        setOngoFlight(ResultIndex)
    };

    const handleIndexIdreturn = (ResultIndex) => {
        setIncomeFlight(ResultIndex)
    };

    if (result === undefined) {
        return (
            <FlightLoader />
        )
    }



    const handleFareRuleAndQuote = async () => {
        // console.log(ongoFlight, "ongoFlight");
        // console.log(incomeGlight, "incomeGlight");
        // setLoading(true);
        const payload = {
            EndUserIp: reducerState?.ip?.ipData,
            TokenId: reducerState?.ip?.tokenData,
            TraceId: reducerState?.return?.returnData?.data?.data?.Response?.TraceId,
            ResultIndex: `${ongoFlight?.ResultIndex}`,
        };
        const payloadReturn = {
            EndUserIp: reducerState?.ip?.ipData,
            TokenId: reducerState?.ip?.tokenData,
            TraceId: reducerState?.return?.returnData?.data?.data?.Response?.TraceId,
            ResultIndex: `${incomeGlight?.ResultIndex}`,
        };
        await dispatch(ruleAction(payload));
        await dispatch(quoteAction(payload));
        await dispatch(ruleActionReturn(payloadReturn));
        await dispatch(quoteActionReturn(payloadReturn));
        navigate("/FlightresultReturn/Passengerdetail");

    };


    return (

        <>
            <div className='container-fluid'>

                <div className="row">
                    <div className="col-6">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="returnheadicons">
                                    <div>
                                        <p>Flight</p>
                                        <span><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                            <path d="M6 9.5L3 6.5M6 9.5L9 6.5M6 9.5L6 2.5" stroke="#21325D" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg></span>
                                    </div>
                                    <div>
                                        <p>Departure</p>
                                        <span><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                            <path d="M6 9.5L3 6.5M6 9.5L9 6.5M6 9.5L6 2.5" stroke="#21325D" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg></span>
                                    </div>
                                    <div>
                                        <p>Duration</p>
                                        <span><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                            <path d="M6 9.5L3 6.5M6 9.5L9 6.5M6 9.5L6 2.5" stroke="#21325D" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg></span>
                                    </div>
                                    <div>
                                        <p>Arrival</p>
                                        <span><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                            <path d="M6 9.5L3 6.5M6 9.5L9 6.5M6 9.5L6 2.5" stroke="#21325D" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg></span>
                                    </div>
                                    <div>
                                        <p>Offer Fare</p>
                                        <span><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                            <path d="M6 9.5L3 6.5M6 9.5L9 6.5M6 9.5L6 2.5" stroke="#21325D" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg></span>
                                    </div>
                                    {/* <div>
                                    <p>Select</p>
                                    <span><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                        <path d="M6 9.5L3 6.5M6 9.5L9 6.5M6 9.5L6 2.5" stroke="#21325D" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg></span>
                                </div> */}
                                </div>
                            </div>

                            {
                                result?.[0] !== undefined && (
                                    <div className="col-lg-12">
                                        {result[0].map((item, index) => {
                                            const isSelected = selectedFlightIndex === index;
                                            const duration = `${Math.floor(
                                                item?.Segments?.[0][0]?.Duration / 60
                                            )}hr ${item?.Segments?.[0][0]?.Duration % 60
                                                }min`;

                                            return (
                                                <>
                                                    <motion.div
                                                        variants={variants}
                                                        initial="initial"
                                                        whileInView="animate"
                                                    >
                                                        <motion.div variants={variants}
                                                            onClick={() => {
                                                                handleIndexId(item);
                                                                handleFlightSelection(index);
                                                                // console.log(item, "result index")
                                                            }}
                                                            className="mobileflexDesign">
                                                            <div className="columnFLightName d-flex d-sm-none">
                                                                <div>
                                                                    <img
                                                                        src={`${process.env.PUBLIC_URL}/FlightImages/${item?.AirlineCode}.png`}
                                                                        alt="flight"
                                                                    />{" "}
                                                                </div>
                                                                <span>
                                                                    {
                                                                        item?.Segments[0][0]?.Airline
                                                                            ?.AirlineName
                                                                    }
                                                                </span>
                                                                <p>
                                                                    {
                                                                        item?.Segments?.[0][0]?.Airline
                                                                            ?.AirlineCode
                                                                    }
                                                                    {
                                                                        item?.Segments?.[0][0]?.Airline
                                                                            ?.FlightNumber
                                                                    }

                                                                </p>
                                                            </div>
                                                            <motion.div
                                                                variants={variants}
                                                                className="singleFlightBox"
                                                            >
                                                                <div className="singleFlightBoxOne">
                                                                    <div>
                                                                        <img
                                                                            src={`${process.env.PUBLIC_URL}/FlightImages/${item?.AirlineCode}.png`}
                                                                            alt="flight"
                                                                        />{" "}
                                                                    </div>
                                                                    <span>
                                                                        {
                                                                            item?.Segments[0][0]?.Airline
                                                                                ?.AirlineName
                                                                        }
                                                                    </span>
                                                                    <p>
                                                                        {
                                                                            item?.Segments[0][0]?.Airline
                                                                                ?.AirlineCode
                                                                        }
                                                                        {
                                                                            item?.Segments[0][0]?.Airline
                                                                                ?.FlightNumber
                                                                        }
                                                                    </p>
                                                                </div>
                                                                <div className="singleFlightBoxTwo">
                                                                    <span>
                                                                        {
                                                                            item?.Segments[0][0]?.Origin
                                                                                ?.Airport?.CityName
                                                                        }
                                                                    </span>
                                                                    <p>
                                                                        {dayjs(
                                                                            item?.Segments[0][0]?.Origin
                                                                                ?.DepTime
                                                                        ).format("DD MMM, YY")}
                                                                    </p>
                                                                    <h5 className="daySize">
                                                                        {dayjs(
                                                                            item?.Segments[0][0]?.Origin
                                                                                ?.DepTime
                                                                        ).format("h:mm A")}
                                                                    </h5>
                                                                </div>

                                                                <div className="singleFlightBoxThree">
                                                                    {
                                                                        item?.Segments[0].length > 1 ?
                                                                            <h4>
                                                                                {`${Math.floor(
                                                                                    item?.Segments[0][0]?.Duration /
                                                                                    60
                                                                                )}hr ${item?.Segments[0][0]?.Duration %
                                                                                60
                                                                                    }min`}{" "}
                                                                                -{" "}
                                                                                {`${Math.floor(
                                                                                    item?.Segments[0][1]?.Duration /
                                                                                    60
                                                                                )}hr ${item?.Segments[0][0]?.Duration %
                                                                                60
                                                                                    }min`}
                                                                            </h4> : <h4>
                                                                                {`${Math.floor(
                                                                                    item?.Segments[0][0]?.Duration /
                                                                                    60
                                                                                )}hr ${item?.Segments[0][0]?.Duration %
                                                                                60
                                                                                    }min`}
                                                                            </h4>}


                                                                    {
                                                                        item?.Segments[0].length > 1 ?
                                                                            (
                                                                                <div className="stopBef">
                                                                                    <Divider
                                                                                        orientation="vertical"
                                                                                        flexItem
                                                                                        sx={{
                                                                                            backgroundColor: "#21325d",
                                                                                            marginX: "8px",
                                                                                            height: "3px",
                                                                                        }}
                                                                                        className=""
                                                                                    />
                                                                                </div>
                                                                            ) :

                                                                            (
                                                                                <div>
                                                                                    <Divider
                                                                                        orientation="vertical"
                                                                                        flexItem
                                                                                        sx={{
                                                                                            backgroundColor: "#21325d",
                                                                                            marginX: "8px",
                                                                                            height: "3px",
                                                                                        }}
                                                                                    />
                                                                                </div>
                                                                            )
                                                                    }
                                                                    <p>{
                                                                        item?.Segments[0].length > 1 ?
                                                                            `${item?.Segments[0].length - 1} stop via ${item?.Segments[0][0]?.Destination?.Airport?.CityName}` : "Non Stop"}</p>

                                                                    <span>
                                                                        {
                                                                            item?.Segments[0][0]
                                                                                ?.NoOfSeatAvailable
                                                                        }{" "}
                                                                        Seats Left
                                                                    </span>
                                                                </div>

                                                                <div className="singleFlightBoxFour">
                                                                    <span>
                                                                        {
                                                                            item?.Segments[0][item?.Segments[0].length - 1]?.Destination
                                                                                ?.Airport?.CityName
                                                                        }
                                                                    </span>
                                                                    <p>
                                                                        {dayjs(
                                                                            item?.Segments?.[0][item?.Segments[0].length - 1]?.Destination?.ArrTime
                                                                        ).format("DD MMM, YY")}
                                                                    </p>
                                                                    <h5 className="daySize">
                                                                        {dayjs(
                                                                            item?.Segments?.[0][item?.Segments[0].length - 1]
                                                                                ?.Destination?.ArrTime
                                                                        ).format("h:mm A")}
                                                                    </h5>
                                                                </div>

                                                                <div className="singleFlightBoxSeven">
                                                                    <p>₹ {item?.Fare?.PublishedFare}</p>
                                                                    <input type="radio" name='going' id={`going-${index}`} checked={isSelected} />
                                                                </div>
                                                            </motion.div>
                                                        </motion.div>
                                                    </motion.div>

                                                </>
                                            );
                                        })}
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="returnheadicons">
                                    <div>
                                        <p>Flight</p>
                                        <span><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                            <path d="M6 9.5L3 6.5M6 9.5L9 6.5M6 9.5L6 2.5" stroke="#21325D" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg></span>
                                    </div>
                                    <div>
                                        <p>Departure</p>
                                        <span><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                            <path d="M6 9.5L3 6.5M6 9.5L9 6.5M6 9.5L6 2.5" stroke="#21325D" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg></span>
                                    </div>
                                    <div>
                                        <p>Duration</p>
                                        <span><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                            <path d="M6 9.5L3 6.5M6 9.5L9 6.5M6 9.5L6 2.5" stroke="#21325D" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg></span>
                                    </div>
                                    <div>
                                        <p>Arrival</p>
                                        <span><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                            <path d="M6 9.5L3 6.5M6 9.5L9 6.5M6 9.5L6 2.5" stroke="#21325D" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg></span>
                                    </div>
                                    <div>
                                        <p>Offer Fare</p>
                                        <span><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                            <path d="M6 9.5L3 6.5M6 9.5L9 6.5M6 9.5L6 2.5" stroke="#21325D" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg></span>
                                    </div>
                                    {/* <div>
                                    <p>Select</p>
                                    <span><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                        <path d="M6 9.5L3 6.5M6 9.5L9 6.5M6 9.5L6 2.5" stroke="#21325D" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg></span>
                                </div> */}
                                </div>
                            </div>

                            <div className="col-lg-12">
                                {
                                    result?.[0] !== undefined && (
                                        <div className="col-lg-12">
                                            {result[1].map((item, index) => {
                                                const isSelected = selectedFlightIndexReturn === index;

                                                const duration = `${Math.floor(
                                                    item?.Segments?.[0][0]?.Duration / 60
                                                )}hr ${item?.Segments?.[0][0]?.Duration % 60
                                                    }min`;

                                                return (
                                                    <>
                                                        <motion.div
                                                            variants={variants}
                                                            initial="initial"
                                                            whileInView="animate"
                                                        >
                                                            <motion.div variants={variants}

                                                                onClick={() => {
                                                                    handleIndexIdreturn(item);
                                                                    handleFlightSelectionReturn(index)
                                                                    console.log(item, "result index")
                                                                }}
                                                                className="mobileflexDesign">
                                                                <div className="columnFLightName d-flex d-sm-none">
                                                                    <div>
                                                                        <img
                                                                            src={`${process.env.PUBLIC_URL}/FlightImages/${item?.AirlineCode}.png`}
                                                                            alt="flight"
                                                                        />{" "}
                                                                    </div>
                                                                    <span>
                                                                        {
                                                                            item?.Segments[0][0]?.Airline
                                                                                ?.AirlineName
                                                                        }
                                                                    </span>
                                                                    <p>
                                                                        {
                                                                            item?.Segments?.[0][0]?.Airline
                                                                                ?.AirlineCode
                                                                        }
                                                                        {
                                                                            item?.Segments?.[0][0]?.Airline
                                                                                ?.FlightNumber
                                                                        }

                                                                    </p>
                                                                </div>
                                                                <motion.div
                                                                    variants={variants}
                                                                    className="singleFlightBox"
                                                                >
                                                                    <div className="singleFlightBoxOne">
                                                                        <div>
                                                                            <img
                                                                                src={`${process.env.PUBLIC_URL}/FlightImages/${item?.AirlineCode}.png`}
                                                                                alt="flight"
                                                                            />{" "}
                                                                        </div>
                                                                        <span>
                                                                            {
                                                                                item?.Segments[0][0]?.Airline
                                                                                    ?.AirlineName
                                                                            }
                                                                        </span>
                                                                        <p>
                                                                            {
                                                                                item?.Segments[0][0]?.Airline
                                                                                    ?.AirlineCode
                                                                            }
                                                                            {
                                                                                item?.Segments[0][0]?.Airline
                                                                                    ?.FlightNumber
                                                                            }
                                                                        </p>
                                                                    </div>
                                                                    <div className="singleFlightBoxTwo">
                                                                        <span>
                                                                            {
                                                                                item?.Segments[0][0]?.Origin
                                                                                    ?.Airport?.CityName
                                                                            }
                                                                        </span>
                                                                        <p>
                                                                            {dayjs(
                                                                                item?.Segments[0][0]?.Origin
                                                                                    ?.DepTime
                                                                            ).format("DD MMM, YY")}
                                                                        </p>
                                                                        <h5 className="daySize">
                                                                            {dayjs(
                                                                                item?.Segments[0][0]?.Origin
                                                                                    ?.DepTime
                                                                            ).format("h:mm A")}
                                                                        </h5>
                                                                    </div>

                                                                    <div className="singleFlightBoxThree">
                                                                        {
                                                                            item?.Segments[0].length > 1 ?
                                                                                <h4>
                                                                                    {`${Math.floor(
                                                                                        item?.Segments[0][0]?.Duration /
                                                                                        60
                                                                                    )}hr ${item?.Segments[0][0]?.Duration %
                                                                                    60
                                                                                        }min`}{" "}
                                                                                    -{" "}
                                                                                    {`${Math.floor(
                                                                                        item?.Segments[0][1]?.Duration /
                                                                                        60
                                                                                    )}hr ${item?.Segments[0][0]?.Duration %
                                                                                    60
                                                                                        }min`}
                                                                                </h4> : <h4>
                                                                                    {`${Math.floor(
                                                                                        item?.Segments[0][0]?.Duration /
                                                                                        60
                                                                                    )}hr ${item?.Segments[0][0]?.Duration %
                                                                                    60
                                                                                        }min`}
                                                                                </h4>}


                                                                        {
                                                                            item?.Segments[0].length > 1 ?
                                                                                (
                                                                                    <div className="stopBef">
                                                                                        <Divider
                                                                                            orientation="vertical"
                                                                                            flexItem
                                                                                            sx={{
                                                                                                backgroundColor: "#21325d",
                                                                                                marginX: "8px",
                                                                                                height: "3px",
                                                                                            }}
                                                                                            className=""
                                                                                        />
                                                                                    </div>
                                                                                ) :

                                                                                (
                                                                                    <div>
                                                                                        <Divider
                                                                                            orientation="vertical"
                                                                                            flexItem
                                                                                            sx={{
                                                                                                backgroundColor: "#21325d",
                                                                                                marginX: "8px",
                                                                                                height: "3px",
                                                                                            }}
                                                                                        />
                                                                                    </div>
                                                                                )
                                                                        }
                                                                        <p>{
                                                                            item?.Segments[0].length > 1 ?
                                                                                `${item?.Segments[0].length - 1} stop via ${item?.Segments[0][0]?.Destination?.Airport?.CityName}` : "Non Stop"}</p>

                                                                        <span>
                                                                            {
                                                                                item?.Segments[0][0]
                                                                                    ?.NoOfSeatAvailable
                                                                            }{" "}
                                                                            Seats Left
                                                                        </span>
                                                                    </div>

                                                                    <div className="singleFlightBoxFour">
                                                                        <span>
                                                                            {
                                                                                item?.Segments[0][item?.Segments[0].length - 1]?.Destination
                                                                                    ?.Airport?.CityName
                                                                            }
                                                                        </span>
                                                                        <p>
                                                                            {dayjs(
                                                                                item?.Segments?.[0][item?.Segments[0].length - 1]?.Destination?.ArrTime
                                                                            ).format("DD MMM, YY")}
                                                                        </p>
                                                                        <h5 className="daySize">
                                                                            {dayjs(
                                                                                item?.Segments?.[0][item?.Segments[0].length - 1]
                                                                                    ?.Destination?.ArrTime
                                                                            ).format("h:mm A")}
                                                                        </h5>
                                                                    </div>

                                                                    <div className="singleFlightBoxSeven">
                                                                        <p>₹ {item?.Fare?.PublishedFare}</p>
                                                                        <input type="radio" name='coming' id={`coming-${index}`} checked={isSelected} />
                                                                    </div>
                                                                </motion.div>
                                                            </motion.div>
                                                        </motion.div>

                                                    </>
                                                );
                                            })}
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>




            </div>

            <div className='container-fluid' style={{ backgroundColor: "red", position: "fixed", bottom: "0" }}>
                <div className="row">
                    <div className="col-5">
                        <div className="row">
                            <div className="col-lg-12">

                                <motion.div
                                    variants={variants}
                                    initial="initial"
                                    whileInView="animate"
                                >
                                    <motion.div variants={variants}

                                        className="mobileflexDesign">
                                        <div className="columnFLightName d-flex d-sm-none">
                                            <div>
                                                <img
                                                    src={`${process.env.PUBLIC_URL}/FlightImages/${ongoFlight?.AirlineCode}.png`}
                                                    alt="flight"
                                                />{" "}
                                            </div>
                                            <span>
                                                {
                                                    ongoFlight?.Segments[0][0]?.Airline
                                                        ?.AirlineName
                                                }
                                            </span>
                                            <p>
                                                {
                                                    ongoFlight?.Segments?.[0][0]?.Airline
                                                        ?.AirlineCode
                                                }
                                                {
                                                    ongoFlight?.Segments?.[0][0]?.Airline
                                                        ?.FlightNumber
                                                }

                                            </p>
                                        </div>
                                        <motion.div
                                            variants={variants}
                                            className="singleFlightBox"
                                        >
                                            <div className="singleFlightBoxOne">
                                                <div>
                                                    <img
                                                        src={`${process.env.PUBLIC_URL}/FlightImages/${ongoFlight?.AirlineCode}.png`}
                                                        alt="flight"
                                                    />{" "}
                                                </div>
                                                <span>
                                                    {
                                                        ongoFlight?.Segments[0][0]?.Airline
                                                            ?.AirlineName
                                                    }
                                                </span>
                                                <p>
                                                    {
                                                        ongoFlight?.Segments[0][0]?.Airline
                                                            ?.AirlineCode
                                                    }
                                                    {
                                                        ongoFlight?.Segments[0][0]?.Airline
                                                            ?.FlightNumber
                                                    }
                                                </p>
                                            </div>
                                            <div className="singleFlightBoxTwo">
                                                <span>
                                                    {
                                                        ongoFlight?.Segments[0][0]?.Origin
                                                            ?.Airport?.CityName
                                                    }
                                                </span>
                                                <p>
                                                    {dayjs(
                                                        ongoFlight?.Segments[0][0]?.Origin
                                                            ?.DepTime
                                                    ).format("DD MMM, YY")}
                                                </p>
                                                <h5 className="daySize">
                                                    {dayjs(
                                                        ongoFlight?.Segments[0][0]?.Origin
                                                            ?.DepTime
                                                    ).format("h:mm A")}
                                                </h5>
                                            </div>

                                            <div className="singleFlightBoxThree">
                                                {
                                                    ongoFlight?.Segments[0].length > 1 ?
                                                        <h4>
                                                            {`${Math.floor(
                                                                ongoFlight?.Segments[0][0]?.Duration /
                                                                60
                                                            )}hr ${ongoFlight?.Segments[0][0]?.Duration %
                                                            60
                                                                }min`}{" "}
                                                            -{" "}
                                                            {`${Math.floor(
                                                                ongoFlight?.Segments[0][1]?.Duration /
                                                                60
                                                            )}hr ${ongoFlight?.Segments[0][0]?.Duration %
                                                            60
                                                                }min`}
                                                        </h4> : <h4>
                                                            {`${Math.floor(
                                                                ongoFlight?.Segments[0][0]?.Duration /
                                                                60
                                                            )}hr ${ongoFlight?.Segments[0][0]?.Duration %
                                                            60
                                                                }min`}
                                                        </h4>}


                                                {
                                                    ongoFlight?.Segments[0].length > 1 ?
                                                        (
                                                            <div className="stopBef">
                                                                <Divider
                                                                    orientation="vertical"
                                                                    flexItem
                                                                    sx={{
                                                                        backgroundColor: "#21325d",
                                                                        marginX: "8px",
                                                                        height: "3px",
                                                                    }}
                                                                    className=""
                                                                />
                                                            </div>
                                                        ) :

                                                        (
                                                            <div>
                                                                <Divider
                                                                    orientation="vertical"
                                                                    flexItem
                                                                    sx={{
                                                                        backgroundColor: "#21325d",
                                                                        marginX: "8px",
                                                                        height: "3px",
                                                                    }}
                                                                />
                                                            </div>
                                                        )
                                                }
                                                <p>{
                                                    ongoFlight?.Segments[0].length > 1 ?
                                                        `${ongoFlight?.Segments[0].length - 1} stop via ${ongoFlight?.Segments[0][0]?.Destination?.Airport?.CityName}` : "Non Stop"}</p>

                                                <span>
                                                    {
                                                        ongoFlight?.Segments[0][0]
                                                            ?.NoOfSeatAvailable
                                                    }{" "}
                                                    Seats Left
                                                </span>
                                            </div>

                                            <div className="singleFlightBoxFour">
                                                <span>
                                                    {
                                                        ongoFlight?.Segments[0][ongoFlight?.Segments[0].length - 1]?.Destination
                                                            ?.Airport?.CityName
                                                    }
                                                </span>
                                                <p>
                                                    {dayjs(
                                                        ongoFlight?.Segments?.[0][ongoFlight?.Segments[0].length - 1]?.Destination?.ArrTime
                                                    ).format("DD MMM, YY")}
                                                </p>
                                                <h5 className="daySize">
                                                    {dayjs(
                                                        ongoFlight?.Segments?.[0][ongoFlight?.Segments[0].length - 1]
                                                            ?.Destination?.ArrTime
                                                    ).format("h:mm A")}
                                                </h5>
                                            </div>

                                            <div className="singleFlightBoxSeven">
                                                <p>₹ {ongoFlight?.Fare?.PublishedFare}</p>

                                            </div>
                                        </motion.div>
                                    </motion.div>
                                </motion.div>


                            </div>
                        </div>
                    </div>

                    <div className="col-5">
                        <div className="row">
                            <div className="col-lg-12">

                                <motion.div
                                    variants={variants}
                                    initial="initial"
                                    whileInView="animate"
                                >
                                    <motion.div variants={variants}

                                        className="mobileflexDesign">
                                        <div className="columnFLightName d-flex d-sm-none">
                                            <div>
                                                <img
                                                    src={`${process.env.PUBLIC_URL}/FlightImages/${incomeGlight?.AirlineCode}.png`}
                                                    alt="flight"
                                                />{" "}
                                            </div>
                                            <span>
                                                {
                                                    incomeGlight?.Segments[0][0]?.Airline
                                                        ?.AirlineName
                                                }
                                            </span>
                                            <p>
                                                {
                                                    incomeGlight?.Segments?.[0][0]?.Airline
                                                        ?.AirlineCode
                                                }
                                                {
                                                    incomeGlight?.Segments?.[0][0]?.Airline
                                                        ?.FlightNumber
                                                }

                                            </p>
                                        </div>
                                        <motion.div
                                            variants={variants}
                                            className="singleFlightBox"
                                        >
                                            <div className="singleFlightBoxOne">
                                                <div>
                                                    <img
                                                        src={`${process.env.PUBLIC_URL}/FlightImages/${incomeGlight?.AirlineCode}.png`}
                                                        alt="flight"
                                                    />{" "}
                                                </div>
                                                <span>
                                                    {
                                                        incomeGlight?.Segments[0][0]?.Airline
                                                            ?.AirlineName
                                                    }
                                                </span>
                                                <p>
                                                    {
                                                        incomeGlight?.Segments[0][0]?.Airline
                                                            ?.AirlineCode
                                                    }
                                                    {
                                                        incomeGlight?.Segments[0][0]?.Airline
                                                            ?.FlightNumber
                                                    }
                                                </p>
                                            </div>
                                            <div className="singleFlightBoxTwo">
                                                <span>
                                                    {
                                                        incomeGlight?.Segments[0][0]?.Origin
                                                            ?.Airport?.CityName
                                                    }
                                                </span>
                                                <p>
                                                    {dayjs(
                                                        incomeGlight?.Segments[0][0]?.Origin
                                                            ?.DepTime
                                                    ).format("DD MMM, YY")}
                                                </p>
                                                <h5 className="daySize">
                                                    {dayjs(
                                                        incomeGlight?.Segments[0][0]?.Origin
                                                            ?.DepTime
                                                    ).format("h:mm A")}
                                                </h5>
                                            </div>

                                            <div className="singleFlightBoxThree">
                                                {
                                                    incomeGlight?.Segments[0].length > 1 ?
                                                        <h4>
                                                            {`${Math.floor(
                                                                incomeGlight?.Segments[0][0]?.Duration /
                                                                60
                                                            )}hr ${incomeGlight?.Segments[0][0]?.Duration %
                                                            60
                                                                }min`}{" "}
                                                            -{" "}
                                                            {`${Math.floor(
                                                                incomeGlight?.Segments[0][1]?.Duration /
                                                                60
                                                            )}hr ${incomeGlight?.Segments[0][0]?.Duration %
                                                            60
                                                                }min`}
                                                        </h4> : <h4>
                                                            {`${Math.floor(
                                                                incomeGlight?.Segments[0][0]?.Duration /
                                                                60
                                                            )}hr ${incomeGlight?.Segments[0][0]?.Duration %
                                                            60
                                                                }min`}
                                                        </h4>}


                                                {
                                                    incomeGlight?.Segments[0].length > 1 ?
                                                        (
                                                            <div className="stopBef">
                                                                <Divider
                                                                    orientation="vertical"
                                                                    flexItem
                                                                    sx={{
                                                                        backgroundColor: "#21325d",
                                                                        marginX: "8px",
                                                                        height: "3px",
                                                                    }}
                                                                    className=""
                                                                />
                                                            </div>
                                                        ) :

                                                        (
                                                            <div>
                                                                <Divider
                                                                    orientation="vertical"
                                                                    flexItem
                                                                    sx={{
                                                                        backgroundColor: "#21325d",
                                                                        marginX: "8px",
                                                                        height: "3px",
                                                                    }}
                                                                />
                                                            </div>
                                                        )
                                                }
                                                <p>{
                                                    incomeGlight?.Segments[0].length > 1 ?
                                                        `${incomeGlight?.Segments[0].length - 1} stop via ${incomeGlight?.Segments[0][0]?.Destination?.Airport?.CityName}` : "Non Stop"}</p>

                                                <span>
                                                    {
                                                        incomeGlight?.Segments[0][0]
                                                            ?.NoOfSeatAvailable
                                                    }{" "}
                                                    Seats Left
                                                </span>
                                            </div>

                                            <div className="singleFlightBoxFour">
                                                <span>
                                                    {
                                                        incomeGlight?.Segments[0][incomeGlight?.Segments[0].length - 1]?.Destination
                                                            ?.Airport?.CityName
                                                    }
                                                </span>
                                                <p>
                                                    {dayjs(
                                                        incomeGlight?.Segments?.[0][incomeGlight?.Segments[0].length - 1]?.Destination?.ArrTime
                                                    ).format("DD MMM, YY")}
                                                </p>
                                                <h5 className="daySize">
                                                    {dayjs(
                                                        incomeGlight?.Segments?.[0][incomeGlight?.Segments[0].length - 1]
                                                            ?.Destination?.ArrTime
                                                    ).format("h:mm A")}
                                                </h5>
                                            </div>

                                            <div className="singleFlightBoxSeven">
                                                <p>₹ {incomeGlight?.Fare?.PublishedFare}</p>

                                            </div>
                                        </motion.div>
                                    </motion.div>
                                </motion.div>


                            </div>
                        </div>
                    </div>

                    <div className="col-2">
                        <div className="buttonReturnBox">
                            <button onClick={handleFareRuleAndQuote}>Book Now</button>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default ReturnResult
