import { Divider } from '@mui/material';
import dayjs from 'dayjs';
import React from 'react'
import { useSelector } from 'react-redux';

const ShowOnewayItenary = ({ flight }) => {

    const reducerState = useSelector((state) => state);


    // console.log(flight, "flight")

    return (
        < div >
            <div>
                <div className="mobileflexDesign"       >
                    <div className="columnFLightName d-flex d-sm-none">
                        <div>
                            <img
                                src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/${flight?.payloadOneway?.ValidatingAirline}.png`}
                                alt="flight"
                            />{" "}
                        </div>
                        <span>
                            {
                                flight?.payloadOneway?.Segments[0][0]?.Airline
                                    ?.AirlineName
                            }
                        </span>
                        <p>
                            {
                                flight?.payloadOneway?.Segments?.[0][0]?.Airline
                                    ?.AirlineCode
                            }
                            {
                                flight?.payloadOneway?.Segments?.[0][0]?.Airline
                                    ?.FlightNumber
                            }
                        </p>
                    </div>
                    <div
                        className="singleFlightBox"
                    >
                        <div className="singleFlightBoxOne">
                            <div>
                                <img
                                    src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/${flight?.payloadOneway?.ValidatingAirline}.png`}
                                    alt="flight"
                                />{" "}
                            </div>
                            <span>
                                {
                                    flight?.payloadOneway?.Segments[0][0]?.Airline
                                        ?.AirlineName
                                }
                            </span>
                            <p>
                                {
                                    flight?.payloadOneway?.Segments[0][0]?.Airline
                                        ?.AirlineCode
                                }
                                {
                                    flight?.payloadOneway?.Segments[0][0]?.Airline
                                        ?.FlightNumber
                                }

                            </p>
                        </div>
                        <div className="singleFlightBoxTwo">
                            <span>
                                {
                                    flight?.payloadOneway?.Segments[0][0]?.Origin
                                        ?.Airport?.CityName
                                }
                            </span>
                            <p>
                                {dayjs(
                                    flight?.payloadOneway?.Segments[0][0]?.Origin
                                        ?.DepTime
                                ).format("DD MMM, YY")}
                            </p>
                            <h5 className="daySize">
                                {dayjs(
                                    flight?.payloadOneway?.Segments[0][0]?.Origin
                                        ?.DepTime
                                ).format("h:mm A")}
                            </h5>
                        </div>

                        <div className="singleFlightBoxThree">
                            {flight?.payloadOneway?.Segments[0].length > 1 ? (
                                <h4>
                                    {`${Math.floor(
                                        flight?.payloadOneway?.Segments[0][0]?.Duration /
                                        60
                                    )}hr ${flight?.payloadOneway?.Segments[0][0]?.Duration %
                                    60
                                        }min`}{" "}
                                    -{" "}
                                    {`${Math.floor(
                                        flight?.payloadOneway?.Segments[0][1]?.Duration /
                                        60
                                    )}hr ${flight?.payloadOneway?.Segments[0][1]?.Duration %
                                    60
                                        }min`}
                                </h4>
                            ) : (
                                <h4>
                                    {`${Math.floor(
                                        flight?.payloadOneway?.Segments[0][0]?.Duration /
                                        60
                                    )}hr ${flight?.payloadOneway?.Segments[0][0]?.Duration %
                                    60
                                        }min`}
                                </h4>
                            )}

                            {flight?.payloadOneway?.Segments[0].length > 1 ? (
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
                            ) : (
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
                            )}
                            <p>
                                {flight?.payloadOneway?.Segments[0].length > 1
                                    ? `${flight?.payloadOneway?.Segments[0].length - 1
                                    } stop via ${flight?.payloadOneway?.Segments[0][0]
                                        ?.Destination?.Airport?.CityName
                                    }`
                                    : "Non Stop"}
                            </p>

                            <span>
                                {
                                    flight?.payloadOneway?.Segments[0][0]
                                        ?.NoOfSeatAvailable
                                }{" "}
                                Seats Left
                            </span>
                        </div>

                        <div className="singleFlightBoxFour">
                            <span>
                                {
                                    flight?.payloadOneway?.Segments[0][
                                        flight?.payloadOneway?.Segments[0].length - 1
                                    ]?.Destination?.Airport?.CityName
                                }
                            </span>
                            <p>
                                {dayjs(
                                    flight?.payloadOneway?.Segments?.[0][
                                        flight?.payloadOneway?.Segments[0].length - 1
                                    ]?.Destination?.ArrTime
                                ).format("DD MMM, YY")}
                            </p>
                            <h5 className="daySize">
                                {dayjs(
                                    flight?.payloadOneway?.Segments?.[0][
                                        flight?.payloadOneway?.Segments[0].length - 1
                                    ]?.Destination?.ArrTime
                                ).format("h:mm A")}
                            </h5>
                        </div>

                        <div className="singleFlightBoxSeven">
                            <p>
                                ₹{" "}
                                {(flight?.payloadOneway?.Fare?.PublishedFare).toFixed(0)}
                            </p>
                            {/* <button
                                onClick={() => {
                                    handleFLightSelectForBook(flight?.payloadOneway);
                                }}
                            >
                                Select →
                            </button> */}

                        </div>
                    </div>
                    {flight?.payloadOneway?.AirlineRemark !== null &&
                        flight?.payloadOneway?.AirlineRemark !== "--." ? (
                        <p className="text-center w-100 mandaField">
                            {flight?.payloadOneway?.AirlineRemark}
                        </p>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </div >
    )
}

export default ShowOnewayItenary







