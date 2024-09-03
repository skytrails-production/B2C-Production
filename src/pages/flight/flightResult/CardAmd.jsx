import React, { useState } from 'react';
import "./Card.scss";
import stopImg from "./flightStop.svg"
import FlightDetail from './FlightDetail';
import dayjs from "dayjs";
import moment from "moment";
import FlightDetailAMD from './FlightDetailAMD';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
const CardAmd = ({ flight }) => {
    const [isShow, setIsShow] = useState(false);
    const flightList = useSelector((state) => state?.flightList);
    const [airlines, setAirlines] = useState([]);
    const [airports, setAirports] = useState([]);
    function findAirlineByCode(code) {
        // console.log(airlines)
        if (airlines.length !== 0) {
            const data = airlines?.find((airline) => airline?.airlineCode === code);
            if (data?.airlineName) {
                return data?.airlineName;
            }
            return;
        }
        return;
    }
    function findAirportByCode(code) {
        // console.log(airlines)
        if (airports.length !== 0) {
            const data = airports?.find((airport) => airport?.AirportCode === code);

            if (data?.AirportCode) {
                console.log(data)
                return data;
            }
            return;
        }
        return;
    }
    useEffect(() => {
        setAirlines(flightList?.flightDetails);
        setAirports(flightList?.aireportList);
    }, [
        flightList?.flightDetails,
        flightList?.aireportList,
    ]);
    // console.log(flight?.
    //     flightDetails?.flightInformation?.companyId?.marketingCarrier, flight?.
    //         flightDetails?.[0]?.flightInformation?.
    //         companyId?.marketingCarrier


    //     , "flight amd")
    function convertTo24HourFormat(timeStr) {
        // Parse the time string as HHmm
        const parsedTime = dayjs(timeStr, "HHmm");

        // Convert to 24-hour format
        return parsedTime.format("HH:mm");
    }
    let arivalPlace =
        flight?.flightDetails?.flightInformation ? flight?.flightDetails?.flightInformation?.location?.[1]?.
            locationId
            : flight?.flightDetails?.[flight?.flightDetails?.length - 1]?.flightInformation?.location?.[1]?.
                locationId
    // console.log(arivalPlace, "avivalplace")
    function convertTimeToHoursAndMinutesFlight(time) {
        if (time) {
            const hours = parseInt(time.slice(0, 2));
            const minutes = parseInt(time.slice(2, 4));
            return `${hours}h ${minutes}m`;
        }
        return;
    }
    let layover =
        convertTimeToHoursAndMinutesFlight(
            flight?.propFlightGrDetail?.flightProposal?.[1]
                ?.ref
        )
    return (
        <div className='card-flight'>
            <div className='card-box-1'>
                {/* <div className='meal'><p>
                    Free Meal Included AMD
                </p></div> */}
                <div>



                    <div className='detail'>
                        <div className='flight-box-img'>
                            <div className='air-img'>
                                <img
                                    src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/${flight?.
                                        flightDetails?.flightInformation?.companyId?.marketingCarrier || flight?.
                                            flightDetails?.[0]?.flightInformation?.
                                            companyId?.marketingCarrier}.png`}
                                    alt="flight"
                                    style={{ borderRadius: "8px" }}


                                />
                            </div>
                            <div className='code-name'>
                                <p style={{ color: "#071C2C", }}>{findAirlineByCode(flight?.
                                    flightDetails?.flightInformation?.companyId?.marketingCarrier || flight?.
                                        flightDetails?.[0]?.flightInformation?.
                                        companyId?.marketingCarrier)}</p>
                                <p style={{ color: "#E73C348F", }}>{flight?.
                                    flightDetails?.flightInformation?.companyId?.marketingCarrier || flight?.
                                        flightDetails?.[0]?.flightInformation?.
                                        companyId?.marketingCarrier}{
                                        flight?.
                                            flightDetails?.flightInformation?.
                                            flightOrtrainNumber ||
                                        flight?.
                                            flightDetails?.[0]?.flightInformation?.
                                            flightOrtrainNumber
                                    }</p>
                            </div>
                        </div>
                        <div className='detail-box-right'>


                            <div className='flight-box-2'>

                                <div className="flight-time-1">
                                    <p >{
                                        flight?.flightDetails?.flightInformation?.location?.[0]?.
                                            locationId
                                        || flight?.flightDetails?.[0]?.flightInformation?.location?.[0]?.
                                            locationId}

                                    </p>
                                    <p >{

                                        convertTo24HourFormat(
                                            flight?.flightDetails?.flightInformation
                                                ?.productDateTime.timeOfDeparture
                                            ||
                                            flight?.flightDetails[0]?.flightInformation
                                                ?.productDateTime.timeOfDeparture)}

                                    </p>

                                    <span >Terminal {
                                        flight?.flightDetails?.[0]?.flightInformation?.location?.[0]?.terminal ||
                                        flight?.flightDetails?.flightInformation?.location?.[0]?.terminal
                                    }</span>
                                </div>
                                <div className="flight-time-2">
                                    <p>{layover}</p>
                                    <img src={stopImg} alt="" />
                                    <span>{flight?.flightDetails?.flightInformation
                                        ? "non-stop"
                                        : `${flight?.flightDetails?.length - 1
                                        } stop's`}</span>
                                </div>
                                <div className="flight-time-1">
                                    <p >{arivalPlace}</p>
                                    <p >{convertTo24HourFormat(flight?.flightDetails?.flightInformation
                                        ?.productDateTime.timeOfArrival ||
                                        flight?.flightDetails[
                                            flight?.flightDetails.length - 1
                                        ]?.flightInformation?.productDateTime
                                            .timeOfArrival)}</p>

                                    <span >Terminal {flight?.flightDetails?.flightInformation?.location?.[1]?.terminal || flight?.flightDetails?.[flight?.flightDetails?.length - 1]?.flightInformation?.location?.[1]?.terminal}</span>
                                </div>
                            </div>
                            <div className='flight-box-3'>
                                <p>₹ {Number(
                                    Number(flight?.monetaryDetail?.[0]?.amount) -
                                    Number(flight?.monetaryDetail?.[1]?.amount)
                                ).toFixed(0)}</p>
                                <button onClick={() => {
                                    setIsShow((pre) => !pre);
                                    console.log(flight, "onclickkkkkk")
                                }}>
                                    <span>View Details</span>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            {
                isShow &&
                <FlightDetailAMD flight={flight} />
            }
       

            {/* <div className='card-box-2'>
        <button>
            <p>Flight starting at ₹1099/ month</p>
            <span>Book Now</span>
        </button>
    </div>
    <div className='card-box-3'>
        <div className='detail-options'>
            <button>FLIGHT DETAILS</button>
            <button>FARE SUMMARY</button>
            <button>CANCELLATION</button>
        </div>
        <div className='flight-information'>
            <div className='labale-flight'>
                <div className='labale-left'><p>Base Fare (1 Adult)</p></div>
                <div className='labale-right'><span>₹ 4,650</span></div>
            </div>
            <div className='labale-flight'>
                <div className='labale-left'><p>Taxes and Fees (1 Adult)</p></div>
                <div className='labale-right'><span>₹ 726</span></div>
            </div>
            <div className='labale-flight'>
                <div className='labale-left'><p>Total Fare ( 1 Adult)</p></div>
                <div className='labale-right'><span>₹ 5,376</span></div>
            </div>
            
        </div>
        <div className='card-flight'>
    <div className='card-box-1'>
        
        <div className='detail'>
            <div className='flight-box-1'>
                <div className=''>
                    <img
                        src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/${"AI"}.png`}
                        alt="flight"
                        style={{ borderRadius: "8px" }}
                        width={58}
                        height={58}
                    />
                </div>
                <div>
                    <p style={{ color: "#071C2C", fontSize: "18px" }}>Vistara</p>
                    <p style={{ color: "#E73C348F", fontSize: "14px", fontWeight: "500" }}>A1441</p>
                </div>
            </div>
            <div className='flight-box-2'>

                <div className="flight-time-1">
                    <p >DEL</p>
                    <p >16:00</p>

                    <span >Terminal 2</span>
                </div>
                <div className="flight-time-2">
                    <p>01h 55m</p>
                    <img src={stopImg} alt="" />
                    <span>9 Seat(s) left</span>
                </div>
                <div  className="flight-time-1">
                    <p >DEL</p>
                    <p >16:00</p>

                    <span >Terminal 2</span>
                </div>
            </div>
          

        </div>
    </div>
    <div className='card-box-1'>
        
        <div className='detail'>
            <div className='flight-box-1'>
                <div className=''>
                    <img
                        src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/${"AI"}.png`}
                        alt="flight"
                        style={{ borderRadius: "8px" }}
                        width={58}
                        height={58}
                    />
                </div>
                <div>
                    <p style={{ color: "#071C2C", fontSize: "18px" }}>Vistara</p>
                    <p style={{ color: "#E73C348F", fontSize: "14px", fontWeight: "500" }}>A1441</p>
                </div>
            </div>
            <div className='flight-box-2'>

                <div className="flight-time-1">
                    <p >DEL</p>
                    <p >16:00</p>

                    <span >Terminal 2</span>
                </div>
                <div className="flight-time-2">
                    <p>01h 55m</p>
                    <img src={stopImg} alt="" />
                    <span>9 Seat(s) left</span>
                </div>
                <div  className="flight-time-1">
                    <p >DEL</p>
                    <p >16:00</p>

                    <span >Terminal 2</span>
                </div>
            </div>
          

        </div>
    </div>

</div >
    </div> */}
        </div >
    )
}

export default CardAmd
