import { Divider } from '@mui/material';
import dayjs from 'dayjs';
import React from 'react'
import { useSelector } from 'react-redux';

const ShowFlightInternational = ({ flight }) => {


    const reducerState = useSelector((state) => state);
    const markUpamount =
        reducerState?.markup?.markUpData?.data?.result[0]?.flightMarkup;





    // const grandTotal = Number(flight?.payloadReturnInternational?.Fare?.PublishedFare.toFixed(0)) + Number(markUpamount)
    const grandTotal = (Number(flight?.payloadReturnInternational?.Fare?.PublishedFare.toFixed(0)) + markUpamount * Number(flight?.payloadReturnInternational?.Fare?.PublishedFare.toFixed(0))).toFixed(0)

    return (
        <div>
            <div class="returnFlightResultBox">
                <div class="returnFlightResultBoxOne">
                    <div class="returnResultFlightDetails">
                        <div>
                            <img
                                src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/${flight?.payloadReturnInternational?.ValidatingAirline}.png`}
                                alt="flight"
                            />{" "}
                        </div>
                        <span>{
                            flight?.payloadReturnInternational?.Segments[0][0]?.Airline?.AirlineName
                        }</span>
                        <p>{
                            flight?.payloadReturnInternational?.Segments[0][0]?.Airline?.AirlineCode
                        }
                            {
                                flight?.payloadReturnInternational?.Segments[0][0]?.Airline?.FlightNumber
                            }</p>
                    </div>
                    <div class="returnResultOtherDetails">
                        <div class="returnResultTimingBox">
                            <span>{
                                flight?.payloadReturnInternational?.Segments[0][0]?.Origin?.Airport?.CityName
                            }</span>
                            <p>{dayjs(
                                flight?.payloadReturnInternational?.Segments[0][0]?.Origin?.DepTime
                            ).format("DD MMM, YY")}
                            </p>
                            <h5 class="daySize">{dayjs(
                                flight?.payloadReturnInternational?.Segments[0][0]?.Origin?.DepTime
                            ).format("h:mm A")}</h5>
                        </div>
                        <div class="returnResultDurationBox">
                            {
                                flight?.payloadReturnInternational?.Segments[0].length > 1 ?
                                    <h4>
                                        {`${Math.floor(
                                            flight?.payloadReturnInternational?.Segments[0][0]?.Duration /
                                            60
                                        )}hr ${flight?.payloadReturnInternational?.Segments[0][0]?.Duration %
                                        60
                                            }min`}{" "}
                                        -{" "}
                                        {`${Math.floor(
                                            flight?.payloadReturnInternational?.Segments[0][1]?.Duration /
                                            60
                                        )}hr ${flight?.payloadReturnInternational?.Segments[0][0]?.Duration %
                                        60
                                            }min`}
                                    </h4> : <h4>
                                        {`${Math.floor(
                                            flight?.payloadReturnInternational?.Segments[0][0]?.Duration /
                                            60
                                        )}hr ${flight?.payloadReturnInternational?.Segments[0][0]?.Duration %
                                        60
                                            }min`}
                                    </h4>}


                            {
                                flight?.payloadReturnInternational?.Segments[0].length > 1 ?
                                    (
                                        <div className=" stopBefReturn">
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
                                        <div className=" stopBefOneStop">
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
                                flight?.payloadReturnInternational?.Segments[0].length > 1 ?
                                    `${flight?.payloadReturnInternational?.Segments[0].length - 1} stop via ${flight?.payloadReturnInternational?.Segments[0][0]?.Destination?.Airport?.CityName}` : "Non Stop"}</p>

                            <span>
                                {
                                    flight?.payloadReturnInternational?.Segments[0][0]
                                        ?.NoOfSeatAvailable
                                }{" "}
                                Seats Left
                            </span>
                        </div>
                        <div class="returnResultTimingBox">
                            <span>
                                {
                                    flight?.payloadReturnInternational?.Segments[0][flight?.payloadReturnInternational?.Segments[0].length - 1]?.Destination
                                        ?.Airport?.CityName
                                }
                            </span>
                            <p>
                                {dayjs(
                                    flight?.payloadReturnInternational?.Segments?.[0][flight?.payloadReturnInternational?.Segments[0].length - 1]?.Destination?.ArrTime
                                ).format("DD MMM, YY")}
                            </p>
                            <h5 className="daySize">
                                {dayjs(
                                    flight?.payloadReturnInternational?.Segments?.[0][flight?.payloadReturnInternational?.Segments[0].length - 1]
                                        ?.Destination?.ArrTime
                                ).format("h:mm A")}
                            </h5>
                        </div>
                    </div>
                </div>
                <div class="returnFlightResultBoxOne">
                    <div class="returnResultFlightDetails">
                        <div>
                            <img
                                src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/${flight?.payloadReturnInternational?.ValidatingAirline}.png`}
                                alt="flight"
                            />{" "}
                        </div>
                        <span>
                            {
                                flight?.payloadReturnInternational?.Segments[flight?.payloadReturnInternational?.Segments?.length - 1][0]?.Airline
                                    ?.AirlineName
                            }
                        </span>
                        <p>
                            {
                                flight?.payloadReturnInternational?.Segments[flight?.payloadReturnInternational?.Segments?.length - 1][0]?.Airline
                                    ?.AirlineCode
                            }
                            {
                                flight?.payloadReturnInternational?.Segments[flight?.payloadReturnInternational?.Segments?.length - 1][0]?.Airline
                                    ?.FlightNumber
                            }
                        </p>
                    </div>
                    <div class="returnResultOtherDetails">
                        <div class="returnResultTimingBox">
                            <span>
                                {
                                    flight?.payloadReturnInternational?.Segments[flight?.payloadReturnInternational?.Segments?.length - 1][0]?.Origin
                                        ?.Airport?.CityName
                                }
                            </span>
                            <p>
                                {dayjs(
                                    flight?.payloadReturnInternational?.Segments[flight?.payloadReturnInternational?.Segments?.length - 1][0]?.Origin
                                        ?.DepTime
                                ).format("DD MMM, YY")}
                            </p>
                            <h5 className="daySize">
                                {dayjs(
                                    flight?.payloadReturnInternational?.Segments[flight?.payloadReturnInternational?.Segments?.length - 1][0]?.Origin
                                        ?.DepTime
                                ).format("h:mm A")}
                            </h5>
                        </div>
                        <div class="returnResultDurationBox">
                            {
                                flight?.payloadReturnInternational?.Segments[flight?.payloadReturnInternational?.Segments?.length - 1].length > 1 ?
                                    <h4>
                                        {`${Math.floor(
                                            flight?.payloadReturnInternational?.Segments[flight?.payloadReturnInternational?.Segments?.length - 1][0]?.Duration /
                                            60
                                        )}hr ${flight?.payloadReturnInternational?.Segments[0][0]?.Duration %
                                        60
                                            }min`}{" "}
                                        -{" "}
                                        {`${Math.floor(
                                            flight?.payloadReturnInternational?.Segments[flight?.payloadReturnInternational?.Segments?.length - 1][1]?.Duration /
                                            60
                                        )}hr ${flight?.payloadReturnInternational?.Segments[0][0]?.Duration %
                                        60
                                            }min`}
                                    </h4> : <h4>
                                        {`${Math.floor(
                                            flight?.payloadReturnInternational?.Segments[flight?.payloadReturnInternational?.Segments?.length - 1][0]?.Duration /
                                            60
                                        )}hr ${flight?.payloadReturnInternational?.Segments[flight?.payloadReturnInternational?.Segments?.length - 1][0]?.Duration %
                                        60
                                            }min`}
                                    </h4>}


                            {
                                flight?.payloadReturnInternational?.Segments[flight?.payloadReturnInternational?.Segments?.length - 1].length > 1 ?
                                    (
                                        <div className=" stopBefReturn">
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
                                        <div className=" stopBefOneStop">
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
                                flight?.payloadReturnInternational?.Segments[flight?.payloadReturnInternational?.Segments?.length - 1].length > 1 ?
                                    `${flight?.payloadReturnInternational?.Segments[flight?.payloadReturnInternational?.Segments?.length - 1].length - 1} stop via ${flight?.payloadReturnInternational?.Segments[flight?.payloadReturnInternational?.Segments?.length - 1][0]?.Destination?.Airport?.CityName}` : "Non Stop"}</p>

                            <span>
                                {
                                    flight?.payloadReturnInternational?.Segments[flight?.payloadReturnInternational?.Segments?.length - 1][0]
                                        ?.NoOfSeatAvailable
                                }{" "}
                                Seats Left
                            </span>
                        </div>
                        <div class="returnResultTimingBox">
                            <span>
                                {
                                    flight?.payloadReturnInternational?.Segments[flight?.payloadReturnInternational?.Segments?.length - 1][flight?.payloadReturnInternational?.Segments[flight?.payloadReturnInternational?.Segments?.length - 1].length - 1]?.Destination
                                        ?.Airport?.CityName
                                }
                            </span>
                            <p>
                                {dayjs(
                                    flight?.payloadReturnInternational?.Segments?.[flight?.payloadReturnInternational?.Segments?.length - 1][flight?.payloadReturnInternational?.Segments[flight?.payloadReturnInternational?.Segments?.length - 1].length - 1]?.Destination?.ArrTime
                                ).format("DD MMM, YY")}
                            </p>
                            <h5 className="daySize">
                                {dayjs(
                                    flight?.payloadReturnInternational?.Segments?.[flight?.payloadReturnInternational?.Segments?.length - 1][flight?.payloadReturnInternational?.Segments[flight?.payloadReturnInternational?.Segments?.length - 1].length - 1]
                                        ?.Destination?.ArrTime
                                ).format("h:mm A")}
                            </h5>
                        </div>
                    </div>
                </div>
                <div className="returnInternationalViewDetails">
                    {/* <p>₹ {item?.Fare?.PublishedFare}</p> */}
                    <span style={{ fontWeight: "600", fontSize: "15px", }}> {`₹ ${Number(flight?.payloadReturnInternational?.Fare?.PublishedFare.toFixed(0))}`}</span>

                </div>
            </div>
        </div>
    )
}

export default ShowFlightInternational
