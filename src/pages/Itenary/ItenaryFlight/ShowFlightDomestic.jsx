import { Divider } from '@mui/material';
import dayjs from 'dayjs';
import React from 'react'
import { useSelector } from 'react-redux'

const ShowFlightDomestic = ({ flight }) => {

    const reducerState = useSelector((state) => state);

    const domesticFLight = flight?.[0]

    // console.log(domesticFLight, "domestc flight")

    return (
        <div>
            <div class="returnFlightResultBox">

                <div class="returnFlightResultBoxOne" style={{ flex: 10 }}>

                    <div class="returnResultFlightDetails">
                        <div>
                            <img
                                src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/${domesticFLight?.payloadGoing?.ValidatingAirline}.png`}
                                alt="flight"
                            />{" "}
                        </div>
                        <span>{
                            domesticFLight?.payloadGoing?.Segments[0][0]?.Airline
                                ?.AirlineName
                        }</span>
                        <p>{
                            domesticFLight?.payloadGoing?.Segments[0][0]?.Airline
                                ?.AirlineCode
                        }
                            {
                                domesticFLight?.payloadGoing?.Segments[0][0]?.Airline
                                    ?.FlightNumber
                            }</p>
                    </div>
                    <div class="returnResultOtherDetails">
                        <div class="returnResultTimingBox">
                            <span>{
                                domesticFLight?.payloadGoing?.Segments[0][0]?.Origin
                                    ?.Airport?.CityName
                            }</span>
                            <p>{dayjs(
                                domesticFLight?.payloadGoing?.Segments[0][0]?.Origin
                                    ?.DepTime
                            ).format("DD MMM, YY")}
                            </p>
                            <h5 class="daySize">{dayjs(
                                domesticFLight?.payloadGoing?.Segments[0][0]?.Origin
                                    ?.DepTime
                            ).format("h:mm A")}</h5>
                        </div>
                        <div class="returnResultDurationBox">
                            {
                                domesticFLight?.payloadGoing?.Segments[0].length > 1 ?
                                    <h4>
                                        {`${Math.floor(
                                            domesticFLight?.payloadGoing?.Segments[0][0]?.Duration /
                                            60
                                        )}hr ${domesticFLight?.payloadGoing?.Segments[0][0]?.Duration %
                                        60
                                            }min`}{" "}
                                        -{" "}
                                        {`${Math.floor(
                                            domesticFLight?.payloadGoing?.Segments[0][1]?.Duration /
                                            60
                                        )}hr ${domesticFLight?.payloadGoing?.Segments[0][0]?.Duration %
                                        60
                                            }min`}
                                    </h4> : <h4>
                                        {`${Math.floor(
                                            domesticFLight?.payloadGoing?.Segments[0][0]?.Duration /
                                            60
                                        )}hr ${domesticFLight?.payloadGoing?.Segments[0][0]?.Duration %
                                        60
                                            }min`}
                                    </h4>}


                            {
                                domesticFLight?.payloadGoing?.Segments[0].length > 1 ?
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
                                domesticFLight?.payloadGoing?.Segments[0].length > 1 ?
                                    `${domesticFLight?.payloadGoing?.Segments[0].length - 1} stop via ${domesticFLight?.payloadGoing?.Segments[0][0]?.Destination?.Airport?.CityName}` : "Non Stop"}</p>

                            <span>
                                {
                                    domesticFLight?.payloadGoing?.Segments[0][0]
                                        ?.NoOfSeatAvailable
                                }{" "}
                                Seats Left
                            </span>
                        </div>
                        <div class="returnResultTimingBox">
                            <span>
                                {
                                    domesticFLight?.payloadGoing?.Segments[0][domesticFLight?.payloadGoing?.Segments[0].length - 1]?.Destination
                                        ?.Airport?.CityName
                                }
                            </span>
                            <p>
                                {dayjs(
                                    domesticFLight?.payloadGoing?.Segments?.[0][domesticFLight?.payloadGoing?.Segments[0].length - 1]?.Destination?.ArrTime
                                ).format("DD MMM, YY")}
                            </p>
                            <h5 className="daySize">
                                {dayjs(
                                    domesticFLight?.payloadGoing?.Segments?.[0][domesticFLight?.payloadGoing?.Segments[0].length - 1]
                                        ?.Destination?.ArrTime
                                ).format("h:mm A")}
                            </h5>
                        </div>
                    </div>
                </div>

                <div className="singleFlightBoxSeven singleFlightBoxSevenReturn" style={{ flex: 2 }}>

                    <span style={{ fontWeight: "600", fontSize: "15px", }}>₹ {(domesticFLight?.payloadGoing?.Fare?.PublishedFare).toFixed(0)}</span>
                    {/* <input type="radio" name='going' id={`going-${index}`} checked={isSelected} /> */}
                </div>
            </div>




            <div class="returnFlightResultBox">

                <div class="returnFlightResultBoxOne" style={{ flex: 10 }}>

                    <div class="returnResultFlightDetails">
                        <div>
                            <img
                                src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/${domesticFLight?.payloadReturn?.ValidatingAirline}.png`}
                                alt="flight"
                            />{" "}
                        </div>
                        <span>{
                            domesticFLight?.payloadReturn?.Segments[0][0]?.Airline
                                ?.AirlineName
                        }</span>
                        <p>{
                            domesticFLight?.payloadReturn?.Segments[0][0]?.Airline
                                ?.AirlineCode
                        }
                            {
                                domesticFLight?.payloadReturn?.Segments[0][0]?.Airline
                                    ?.FlightNumber
                            }</p>
                    </div>
                    <div class="returnResultOtherDetails">
                        <div class="returnResultTimingBox">
                            <span>{
                                domesticFLight?.payloadReturn?.Segments[0][0]?.Origin
                                    ?.Airport?.CityName
                            }</span>
                            <p>{dayjs(
                                domesticFLight?.payloadReturn?.Segments[0][0]?.Origin
                                    ?.DepTime
                            ).format("DD MMM, YY")}
                            </p>
                            <h5 class="daySize">{dayjs(
                                domesticFLight?.payloadReturn?.Segments[0][0]?.Origin
                                    ?.DepTime
                            ).format("h:mm A")}</h5>
                        </div>
                        <div class="returnResultDurationBox">
                            {
                                domesticFLight?.payloadReturn?.Segments[0].length > 1 ?
                                    <h4>
                                        {`${Math.floor(
                                            domesticFLight?.payloadReturn.Segments[0][0]?.Duration /
                                            60
                                        )}hr ${domesticFLight?.payloadReturn?.Segments[0][0]?.Duration %
                                        60
                                            }min`}{" "}
                                        -{" "}
                                        {`${Math.floor(
                                            domesticFLight?.payloadReturn?.Segments[0][1]?.Duration /
                                            60
                                        )}hr ${domesticFLight?.payloadReturn?.Segments[0][0]?.Duration %
                                        60
                                            }min`}
                                    </h4> : <h4>
                                        {`${Math.floor(
                                            domesticFLight?.payloadReturn?.Segments[0][0]?.Duration /
                                            60
                                        )}hr ${domesticFLight?.payloadReturn?.Segments[0][0]?.Duration %
                                        60
                                            }min`}
                                    </h4>}


                            {
                                domesticFLight?.payloadReturn?.Segments[0].length > 1 ?
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
                                domesticFLight?.payloadReturn?.Segments[0].length > 1 ?
                                    `${domesticFLight?.payloadReturn?.Segments[0].length - 1} stop via ${domesticFLight?.payloadReturn?.Segments[0][0]?.Destination?.Airport?.CityName}` : "Non Stop"}</p>

                            <span>
                                {
                                    domesticFLight?.payloadReturn?.Segments[0][0]
                                        ?.NoOfSeatAvailable
                                }{" "}
                                Seats Left
                            </span>
                        </div>
                        <div class="returnResultTimingBox">
                            <span>
                                {
                                    domesticFLight?.payloadReturn?.Segments[0][domesticFLight?.payloadReturn?.Segments[0].length - 1]?.Destination
                                        ?.Airport?.CityName
                                }
                            </span>
                            <p>
                                {dayjs(
                                    domesticFLight?.payloadReturn?.Segments?.[0][domesticFLight?.payloadReturn?.Segments[0].length - 1]?.Destination?.ArrTime
                                ).format("DD MMM, YY")}
                            </p>
                            <h5 className="daySize">
                                {dayjs(
                                    domesticFLight?.payloadReturn?.Segments?.[0][domesticFLight?.payloadReturn?.Segments[0].length - 1]
                                        ?.Destination?.ArrTime
                                ).format("h:mm A")}
                            </h5>
                        </div>
                    </div>
                </div>

                <div className="singleFlightBoxSeven singleFlightBoxSevenReturn" style={{ flex: 2 }}>

                    <span style={{ fontWeight: "600", fontSize: "15px", }}>₹ {(domesticFLight?.payloadReturn?.Fare?.PublishedFare).toFixed(0)}</span>
                    {/* <input type="radio" name='going' id={`going-${index}`} checked={isSelected} /> */}
                </div>
            </div>

        </div>
    )
}

export default ShowFlightDomestic
