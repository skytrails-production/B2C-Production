import React, { useState } from 'react';
import "./Card.scss";
import stopImg from "./flightStop.svg"
import FlightDetail from './FlightDetail';
import dayjs from "dayjs";
const CardTvo = ({ flight }) => {
    const [isShow, setIsShow] = useState(false);
    const convertTvoTime = (timestamp) => {
        const time24HourFormat = dayjs(timestamp).format('HH:mm');
        return time24HourFormat
    }
    let originTime = convertTvoTime(flight?.Segments?.[0]?.[0]?.
        Origin?.DepTime);
    let destinationTime = convertTvoTime(flight?.Segments?.[0]?.[flight?.Segments?.[0]?.length - 1]?.

        Destination
        ?.ArrTime);
    const nextFlight = flight?.Segments?.[0];
    let layoverHours = 0;
    let layoverMinutes = 0;
    let layoverDuration = 0;

    if (nextFlight) {
        // console.log(item?.Segments?.[0]?.[0]?.Origin?.DepTime, item?.Segments?.[0]?.[item?.Segments?.[0]?.length - 1]?.Destination
        //   ?.ArrTime)
        const arrivalTime = dayjs(
            flight?.Segments?.[0]?.[0]?.Origin?.DepTime
        );
        const departureTime = dayjs(
            flight?.Segments?.[0]?.[flight?.Segments?.[0]?.length - 1]
                ?.Destination?.ArrTime
        );
        layoverDuration = departureTime.diff(
            arrivalTime,
            "minutes"
        ); // Calculate difference in minutes
        layoverHours = Math.floor(layoverDuration / 60); // Extract hours
        layoverMinutes = layoverDuration % 60;
    }


    return (
        <div className='card-flight'>
            <div className='card-box-1'>
                {/* <div className='meal'><p>
                    Free Meal Included
                </p></div> */}
                <div>



                    <div className='detail'>
                        <div className='flight-box-img'>
                            <div className='air-img'>
                                <img
                                    src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/${flight?.Segments?.[0]?.[0]?.Airline?.AirlineCode
                                        }.png`}
                                    alt="flight"
                                    style={{ borderRadius: "8px" }}


                                />
                            </div>
                            <div className='code-name'>
                                <p style={{ color: "#071C2C", }}>{flight?.Segments?.[0]?.[0]?.Airline?.AirlineName}

                                </p>
                                <p style={{ color: "#E73C348F", }}>{flight?.Segments?.[0]?.[0]?.Airline?.AirlineCode}{flight?.Segments?.[0]?.[0]?.Airline?.FlightNumber}</p>
                            </div>
                        </div>
                        <div className='detail-box-right'>


                            <div className='flight-box-2'>

                                <div className="flight-time-1">
                                    <p >{flight?.Segments?.[0]?.[0]?.
                                        Origin?.
                                        Airport?.CityName


                                    }</p>
                                    <p >{originTime}</p>

                                    <span >Terminal {flight?.Segments?.[0]?.[0]?.
                                        Origin?.
                                        Airport?.Terminal



                                    }</span>
                                </div>
                                <div className="flight-time-2">
                                    <p> {
                                        `${layoverHours}h ${layoverMinutes}m`}</p>
                                    <img src={stopImg} alt="" />
                                    <span>{flight?.Segments?.[0]?.length == 1
                                        ? "non-stop"
                                        : `${flight?.Segments?.[0]?.length - 1
                                        } stop's`}</span>
                                </div>
                                <div className="flight-time-1">
                                    <p >{flight?.Segments?.[0]?.[flight?.Segments?.[0]?.length - 1]?.Destination?.

                                        Airport
                                        ?.CityName}</p>
                                    <p >{destinationTime}</p>

                                    <span >Terminal {flight?.Segments?.[0]?.[flight?.Segments?.[0]?.length - 1]?.
                                        Destination?.
                                        Airport?.Terminal



                                    }</span>
                                </div>
                            </div>
                            <div className='flight-box-3'>
                                <p>₹ {flight?.Fare?.BaseFare}</p>
                                <button onClick={() => setIsShow((pre) => !pre)}>
                                    <span>View Details</span>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            {isShow &&
                <FlightDetail flight={flight} />
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

export default CardTvo
