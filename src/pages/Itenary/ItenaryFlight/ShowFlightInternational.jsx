import { Divider } from '@mui/material';
import dayjs from 'dayjs';
import React from 'react'
import { useSelector } from 'react-redux';

const ShowFlightInternational = () => {


    const reducerState = useSelector((state) => state);
    const markUpamount =
        reducerState?.markup?.markUpData?.data?.result[0]?.flightMarkup;

    const internationalFlight = reducerState.Itenerary?.selectedFlight?.[0]

    // const grandTotal = Number(internationalFlight?.payloadReturnInternational?.Fare?.PublishedFare.toFixed(0)) + Number(markUpamount)
    const grandTotal = (Number(internationalFlight?.payloadReturnInternational?.Fare?.PublishedFare.toFixed(0)) + markUpamount * Number(internationalFlight?.payloadReturnInternational?.Fare?.PublishedFare.toFixed(0))).toFixed(0)

    return (
        <div>
            <div class="returnFlightResultBox">
                <div class="returnFlightResultBoxOne">
                    <div class="returnResultFlightDetails">
                        <div>
                            <img
                                src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/${internationalFlight?.payloadReturnInternational?.ValidatingAirline}.png`}
                                alt="flight"
                            />{" "}
                        </div>
                        <span>{
                            internationalFlight?.payloadReturnInternational?.Segments[0][0]?.Airline?.AirlineName
                        }</span>
                        <p>{
                            internationalFlight?.payloadReturnInternational?.Segments[0][0]?.Airline?.AirlineCode
                        }
                            {
                                internationalFlight?.payloadReturnInternational?.Segments[0][0]?.Airline?.FlightNumber
                            }</p>
                    </div>
                    <div class="returnResultOtherDetails">
                        <div class="returnResultTimingBox">
                            <span>{
                                internationalFlight?.payloadReturnInternational?.Segments[0][0]?.Origin?.Airport?.CityName
                            }</span>
                            <p>{dayjs(
                                internationalFlight?.payloadReturnInternational?.Segments[0][0]?.Origin?.DepTime
                            ).format("DD MMM, YY")}
                            </p>
                            <h5 class="daySize">{dayjs(
                                internationalFlight?.payloadReturnInternational?.Segments[0][0]?.Origin?.DepTime
                            ).format("h:mm A")}</h5>
                        </div>
                        <div class="returnResultDurationBox">
                            {
                                internationalFlight?.payloadReturnInternational?.Segments[0].length > 1 ?
                                    <h4>
                                        {`${Math.floor(
                                            internationalFlight?.payloadReturnInternational?.Segments[0][0]?.Duration /
                                            60
                                        )}hr ${internationalFlight?.payloadReturnInternational?.Segments[0][0]?.Duration %
                                        60
                                            }min`}{" "}
                                        -{" "}
                                        {`${Math.floor(
                                            internationalFlight?.payloadReturnInternational?.Segments[0][1]?.Duration /
                                            60
                                        )}hr ${internationalFlight?.payloadReturnInternational?.Segments[0][0]?.Duration %
                                        60
                                            }min`}
                                    </h4> : <h4>
                                        {`${Math.floor(
                                            internationalFlight?.payloadReturnInternational?.Segments[0][0]?.Duration /
                                            60
                                        )}hr ${internationalFlight?.payloadReturnInternational?.Segments[0][0]?.Duration %
                                        60
                                            }min`}
                                    </h4>}


                            {
                                internationalFlight?.payloadReturnInternational?.Segments[0].length > 1 ?
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
                                internationalFlight?.payloadReturnInternational?.Segments[0].length > 1 ?
                                    `${internationalFlight?.payloadReturnInternational?.Segments[0].length - 1} stop via ${internationalFlight?.payloadReturnInternational?.Segments[0][0]?.Destination?.Airport?.CityName}` : "Non Stop"}</p>

                            <span>
                                {
                                    internationalFlight?.payloadReturnInternational?.Segments[0][0]
                                        ?.NoOfSeatAvailable
                                }{" "}
                                Seats Left
                            </span>
                        </div>
                        <div class="returnResultTimingBox">
                            <span>
                                {
                                    internationalFlight?.payloadReturnInternational?.Segments[0][internationalFlight?.payloadReturnInternational?.Segments[0].length - 1]?.Destination
                                        ?.Airport?.CityName
                                }
                            </span>
                            <p>
                                {dayjs(
                                    internationalFlight?.payloadReturnInternational?.Segments?.[0][internationalFlight?.payloadReturnInternational?.Segments[0].length - 1]?.Destination?.ArrTime
                                ).format("DD MMM, YY")}
                            </p>
                            <h5 className="daySize">
                                {dayjs(
                                    internationalFlight?.payloadReturnInternational?.Segments?.[0][internationalFlight?.payloadReturnInternational?.Segments[0].length - 1]
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
                                src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/${internationalFlight?.payloadReturnInternational?.ValidatingAirline}.png`}
                                alt="flight"
                            />{" "}
                        </div>
                        <span>
                            {
                                internationalFlight?.payloadReturnInternational?.Segments[internationalFlight?.payloadReturnInternational?.Segments?.length - 1][0]?.Airline
                                    ?.AirlineName
                            }
                        </span>
                        <p>
                            {
                                internationalFlight?.payloadReturnInternational?.Segments[internationalFlight?.payloadReturnInternational?.Segments?.length - 1][0]?.Airline
                                    ?.AirlineCode
                            }
                            {
                                internationalFlight?.payloadReturnInternational?.Segments[internationalFlight?.payloadReturnInternational?.Segments?.length - 1][0]?.Airline
                                    ?.FlightNumber
                            }
                        </p>
                    </div>
                    <div class="returnResultOtherDetails">
                        <div class="returnResultTimingBox">
                            <span>
                                {
                                    internationalFlight?.payloadReturnInternational?.Segments[internationalFlight?.payloadReturnInternational?.Segments?.length - 1][0]?.Origin
                                        ?.Airport?.CityName
                                }
                            </span>
                            <p>
                                {dayjs(
                                    internationalFlight?.payloadReturnInternational?.Segments[internationalFlight?.payloadReturnInternational?.Segments?.length - 1][0]?.Origin
                                        ?.DepTime
                                ).format("DD MMM, YY")}
                            </p>
                            <h5 className="daySize">
                                {dayjs(
                                    internationalFlight?.payloadReturnInternational?.Segments[internationalFlight?.payloadReturnInternational?.Segments?.length - 1][0]?.Origin
                                        ?.DepTime
                                ).format("h:mm A")}
                            </h5>
                        </div>
                        <div class="returnResultDurationBox">
                            {
                                internationalFlight?.payloadReturnInternational?.Segments[internationalFlight?.payloadReturnInternational?.Segments?.length - 1].length > 1 ?
                                    <h4>
                                        {`${Math.floor(
                                            internationalFlight?.payloadReturnInternational?.Segments[internationalFlight?.payloadReturnInternational?.Segments?.length - 1][0]?.Duration /
                                            60
                                        )}hr ${internationalFlight?.payloadReturnInternational?.Segments[0][0]?.Duration %
                                        60
                                            }min`}{" "}
                                        -{" "}
                                        {`${Math.floor(
                                            internationalFlight?.payloadReturnInternational?.Segments[internationalFlight?.payloadReturnInternational?.Segments?.length - 1][1]?.Duration /
                                            60
                                        )}hr ${internationalFlight?.payloadReturnInternational?.Segments[0][0]?.Duration %
                                        60
                                            }min`}
                                    </h4> : <h4>
                                        {`${Math.floor(
                                            internationalFlight?.payloadReturnInternational?.Segments[internationalFlight?.payloadReturnInternational?.Segments?.length - 1][0]?.Duration /
                                            60
                                        )}hr ${internationalFlight?.payloadReturnInternational?.Segments[internationalFlight?.payloadReturnInternational?.Segments?.length - 1][0]?.Duration %
                                        60
                                            }min`}
                                    </h4>}


                            {
                                internationalFlight?.payloadReturnInternational?.Segments[internationalFlight?.payloadReturnInternational?.Segments?.length - 1].length > 1 ?
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
                                internationalFlight?.payloadReturnInternational?.Segments[internationalFlight?.payloadReturnInternational?.Segments?.length - 1].length > 1 ?
                                    `${internationalFlight?.payloadReturnInternational?.Segments[internationalFlight?.payloadReturnInternational?.Segments?.length - 1].length - 1} stop via ${internationalFlight?.payloadReturnInternational?.Segments[internationalFlight?.payloadReturnInternational?.Segments?.length - 1][0]?.Destination?.Airport?.CityName}` : "Non Stop"}</p>

                            <span>
                                {
                                    internationalFlight?.payloadReturnInternational?.Segments[internationalFlight?.payloadReturnInternational?.Segments?.length - 1][0]
                                        ?.NoOfSeatAvailable
                                }{" "}
                                Seats Left
                            </span>
                        </div>
                        <div class="returnResultTimingBox">
                            <span>
                                {
                                    internationalFlight?.payloadReturnInternational?.Segments[internationalFlight?.payloadReturnInternational?.Segments?.length - 1][internationalFlight?.payloadReturnInternational?.Segments[internationalFlight?.payloadReturnInternational?.Segments?.length - 1].length - 1]?.Destination
                                        ?.Airport?.CityName
                                }
                            </span>
                            <p>
                                {dayjs(
                                    internationalFlight?.payloadReturnInternational?.Segments?.[internationalFlight?.payloadReturnInternational?.Segments?.length - 1][internationalFlight?.payloadReturnInternational?.Segments[internationalFlight?.payloadReturnInternational?.Segments?.length - 1].length - 1]?.Destination?.ArrTime
                                ).format("DD MMM, YY")}
                            </p>
                            <h5 className="daySize">
                                {dayjs(
                                    internationalFlight?.payloadReturnInternational?.Segments?.[internationalFlight?.payloadReturnInternational?.Segments?.length - 1][internationalFlight?.payloadReturnInternational?.Segments[internationalFlight?.payloadReturnInternational?.Segments?.length - 1].length - 1]
                                        ?.Destination?.ArrTime
                                ).format("h:mm A")}
                            </h5>
                        </div>
                    </div>
                </div>
                <div className="returnInternationalViewDetails">
                    {/* <p>₹ {item?.Fare?.PublishedFare}</p> */}
                    <span style={{ fontWeight: "600", fontSize: "15px", }}> {`₹ ${Number(internationalFlight?.payloadReturnInternational?.Fare?.PublishedFare.toFixed(0))}`}</span>

                </div>
            </div>
        </div>
    )
}

export default ShowFlightInternational
