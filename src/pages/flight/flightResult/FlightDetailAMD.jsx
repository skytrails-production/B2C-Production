import React, { useEffect, useState } from 'react'
import "./flightDetail.scss"
// import fromTo from "../../images/fromTo.png";
import fromTo from "../../../images/fromTo.png";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import duration from 'dayjs/plugin/duration';
import { useSelector } from 'react-redux';
import {  useLocation, useNavigate } from 'react-router-dom';

dayjs.extend(customParseFormat);
dayjs.extend(duration);


// Extend Day.js with the customParseFormat plugin
dayjs.extend(customParseFormat);
const TimeDifference = (dateOfArrival, timeOfArrival, dateOfDeparture, timeOfDeparture) => {
    console.log(dateOfDeparture, timeOfArrival, timeOfDeparture, dateOfArrival, "dateeeeeee")


    // const calculateTimeDifference = () => {
    //     // Combine date and time strings
    //     const departure = `${dateOfDeparture}${timeOfDeparture}`;
    //     const arrival = `${dateOfArrival}${timeOfArrival}`;

    //     // Parse date and time as DDMMYYHHmm
    //     const departureTime = dayjs(departure, "DDMMYYHHmm");
    //     const arrivalTime = dayjs(arrival, "DDMMYYHHmm");

    //     // Check if parsing was successful
    //     if (!departureTime.isValid() || !arrivalTime.isValid()) {
    //         return 'Invalid date/time format';
    //     }

    //     // Calculate the difference in milliseconds
    //     const diffInMs = arrivalTime.diff(departureTime);

    //     // Convert difference to duration
    //     const diffDuration = dayjs.duration(diffInMs);

    //     // Format the difference as "X hours Y minutes"
    //     const hours = Math.floor(diffDuration.asHours());
    //     const minutes = diffDuration.minutes();

    //     return `${hours} hours ${minutes} minutes`;
    // };

    // return (
    //     calculateTimeDifference()

    // );
    function parseDateTime(date, time) {
        const day = parseInt(date.slice(0, 2), 10);
        const month = parseInt(date.slice(2, 4), 10) - 1; // Months are 0-based in JavaScript
        const year = 2000 + parseInt(date.slice(4), 10); // Assuming years are in 20XX format
        const hours = parseInt(time.slice(0, 2), 10);
        const minutes = parseInt(time.slice(2), 10);
        return new Date(year, month, day, hours, minutes);
    }

    // Parse the dates and times
    const arrivalDateTime = parseDateTime(dateOfArrival, timeOfArrival);
    const departureDateTime = parseDateTime(dateOfDeparture, timeOfDeparture);

    // Calculate the difference in milliseconds
    let differenceInMilliseconds = arrivalDateTime - departureDateTime;

    // Handle the case where the arrival time is earlier than the departure time on the same date
    if (differenceInMilliseconds < 0) {
        differenceInMilliseconds += 24 * 60 * 60 * 1000; // Add 24 hours
    }

    // Convert milliseconds to minutes
    const differenceInMinutes = Math.floor(differenceInMilliseconds / (1000 * 60));

    // Calculate hours and remaining minutes
    const hours = Math.floor(differenceInMinutes / 60);
    const minutes = differenceInMinutes % 60;

    return `${hours} hours ${minutes} minutes`;

};

const ConvertDate = ({ dateStr }) => {
    // Function to convert date
    const convertToReadableDate = (dateStr) => {
        // Parse the date string as DDMMYY
        const parsedDate = dayjs(dateStr, "DDMMYY");
        // Convert to the desired format: "dddd, MMMM D"
        return parsedDate.format("dddd, MMMM D");
    };

    // Call the function with the provided dateStr prop
    const formattedDate = convertToReadableDate(dateStr);

    return (
        formattedDate
    );
};
function convertTo24HourFormat(timeStr) {
    // Parse the time string as HHmm
    const parsedTime = dayjs(timeStr, "HHmm");

    // Convert to 24-hour format
    return parsedTime.format("HH:mm");
}

const FlightDetailAMD = ({ flight }) => {
    const flightList = useSelector((state) => state?.flightList);
    const [airlines, setAirlines] = useState([]);
    const [airports, setAirports] = useState([]);
    useEffect(() => {
        setAirlines(flightList?.flightDetails);
        setAirports(flightList?.aireportList);
    }, [
        flightList?.flightDetails,
        flightList?.aireportList,
    ]);
    console.log(flight, flight?.flightDetails?.flightInformation?.productDateTime
        , "flightAmdffff");
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
    const bookingClass = JSON.parse(sessionStorage.getItem("onewayprop"))?.[0]?.
        flightclassName
        ;
    // This should log the correct value
    const ClassItems = [
        // { id: 1,value:"Y", label: "All" },
        { id: 2, value: "Y", label: "Economy" },
        { id: 3, value: "W", label: "Premium Economy" },
        { id: 4, value: "C", label: "Business" },
        // { id: 5, label: "Premium Business" },
        { id: 6, value: "F", label: "First" },
    ];
    const bookingClassItem = ClassItems.find(item => item.value === bookingClass)?.label;
    console.log(bookingClassItem?.label, bookingClass, "bookingClass");
    const location = useLocation();
    const queryParams = new URLSearchParams(location?.search);
    const adultCount = queryParams.get("adult");
    const childCount = queryParams.get("child");
    const infantCount = queryParams.get("infant");
    function formatDateString(dateString) {
        // Parse the date assuming it's in DDMMYY format
        const parsedDate = dayjs(dateString, 'DDMMYY');
        
        // Format the date to 'dddd, MMMM D'
        return parsedDate.format('dddd, MMMM D');
    }
    
    const navigate=useNavigate()
    const handleIndexId = (ResultIndex) => {
        console.log(ResultIndex, "ResultIndex")
        if (ResultIndex?.AirlineCode) {
          navigate(
            `booknow?adult=${adultCount}&child=${childCount}&infant=${infantCount} `,
            { state: { ResultIndex } }
          );
        } else if (ResultIndex?.flightDetails) {
          navigate(
            `booknowAmd?adult=${adultCount}&child=${childCount}&infant=${infantCount}`,
            { state: { ResultIndex } }
          );
        }
       
      };

    return (
        <div className='flightDetail-cnt'>
            {flight?.flightDetails?.flightInformation
                ?
                <div className='flightDetail-box-1'>
                    <div className='air-img'>
                        <img
                            src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/${flight?.flightDetails?.flightInformation?.companyId?.marketingCarrier
                                }.png`}
                            alt="flight"
                            style={{ borderRadius: "8px" }}
                            width={38}
                            height={38}
                        />
                    </div>
                    <div className='flight-details-right'>
                        <div className='flight-details-right-img'>
                            {/* <img src={fromTo} height={"100%"} alt="" /> */}
                            <span className='roundSpan'></span>
                                <span className='dottedSpan'></span>
                                <span className='roundSpan'></span>
                        </div>
                        <div className='flight-details-right-inner flight-details-right-inner-border'>
                            <div className='flight-details-right-inne-1'>
                                <span>{`${
                                    formatDateString(
                                    flight?.flightDetails?.flightInformation?.productDateTime
                                        ?.
                                        dateOfDeparture
                                    )
                                    }· ${convertTo24HourFormat(flight?.flightDetails?.flightInformation?.productDateTime
                                        ?.
                                        timeOfDeparture
                                    )}`}  </span>
                                <p>{`${findAirportByCode(flight?.flightDetails?.flightInformation?.
                                    location?.[0]?.locationId)?.code
                                    } (${flight?.flightDetails?.flightInformation?.
                                        location?.[0]?.locationId
                                    })`}</p>
                            </div>
                            <div className='flight-details-right-inne-1'>
                                <span>{`${
                                    formatDateString(
                                    flight?.flightDetails?.flightInformation?.productDateTime
                                        ?.
                                        dateOfArrival
                                    )
                                    }· ${convertTo24HourFormat(flight?.flightDetails?.flightInformation?.productDateTime
                                        ?.
                                        timeOfArrival

                                    )}`} </span>
                                <p>{`${findAirportByCode(flight?.flightDetails?.flightInformation?.
                                    location?.[1]?.locationId)?.code
                                    } (${flight?.flightDetails?.flightInformation?.
                                        location?.[1]?.locationId
                                    })`}</p>
                            </div>

                        </div>
                        <div className='flight-details-right-inner'>
                            <div className='flight-details-right-inne-1'>
                                <span>
                                    Trip time: {TimeDifference(flight?.flightDetails?.flightInformation?.productDateTime
                                        ?.
                                        dateOfArrival,
                                        flight?.flightDetails?.flightInformation?.productDateTime
                                            ?.
                                            timeOfArrival,
                                        flight?.flightDetails?.flightInformation?.productDateTime?.
                                            dateOfDeparture,
                                        flight?.flightDetails?.flightInformation?.productDateTime
                                            ?.
                                            timeOfDeparture,

                                    )}</span>
                                <span>{`ANA · ${bookingClassItem} class · ${flight?.
                                    flightDetails?.flightInformation?.companyId?.marketingCarrier ||flight?.
                                    flightDetails?.flightInformation?.
                                        companyId?.marketingCarrier}${
                                            flight?.
                                    flightDetails?.flightInformation?.
                                            flightOrtrainNumber ||
                                        flight?.
                                            flightDetails?.[0]?.flightInformation?.
                                            flightOrtrainNumber
                                    } · NH 847`}</span>
                            </div>
                        </div>
                    </div>


                </div> :
                flight?.flightDetails?.map((item, i) => {
                    console.log(item, "item");
                    return <div className='flightDetail-box-1'>
                        <div className='air-img'>
                            <img
                                src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/${item?.
                                    flightInformation?.companyId?.marketingCarrier}.png`}
                                alt="flight"
                                style={{ borderRadius: "8px" }}
                                width={58}
                                height={58}
                            />
                        </div>
                        <div className='flight-details-right'>
                            <div className='flight-details-right-img'>
                                {/* <img src={fromTo} height={"100%"} alt="" /> */}
                                
                                <span className='roundSpan'></span>
                                <span className='dottedSpan'></span>
                                <span className='roundSpan'></span>
                              
                            </div>
                            <div className='flight-details-right-inner flight-details-right-inner-border'>
                                <div className='flight-details-right-inne-1'>
                                    <span>{`${
                                        formatDateString(
                                        item?.flightInformation?.productDateTime
                                            ?.
                                            dateOfDeparture
                                        )
                                        } · ${convertTo24HourFormat(item?.flightInformation?.productDateTime
                                            ?.
                                            timeOfDeparture
                                        )}`}</span>
                                    <p>{`${findAirportByCode(item?.flightInformation?.
                                        location?.[0]?.locationId)?.code
                                        } (${item?.flightInformation?.
                                            location?.[0]?.locationId
                                        })`}</p>
                                </div>
                                <div className='flight-details-right-inne-1'>
                                    <span>{`${
                                        formatDateString(
                                        item?.flightInformation?.productDateTime
                                            ?.

                                            dateOfArrival

                                        )
                                        } · ${convertTo24HourFormat(item?.flightInformation?.productDateTime
                                            ?.

                                            timeOfArrival

                                        )}`}</span>
                                    <p>{`${findAirportByCode(item?.flightInformation?.
                                        location?.[1]?.locationId)?.code
                                        } (${item?.flightInformation?.
                                            location?.[1]?.locationId
                                        })`}</p>
                                </div>

                            </div>
                            <div className='flight-details-right-inner'>
                                <div className='flight-details-right-inne-1'>
                                    <span>
                                        Trip time: {TimeDifference(item?.flightInformation?.productDateTime
                                            ?.
                                            dateOfArrival,
                                            item?.flightInformation?.productDateTime
                                                ?.
                                                timeOfArrival,
                                            item?.flightInformation?.productDateTime?.
                                                dateOfDeparture,
                                            item?.flightInformation?.productDateTime
                                                ?.
                                                timeOfDeparture,

                                        )}</span>
                                    <span>{`· ${bookingClassItem} class · ${ item?.flightInformation?.companyId?.marketingCarrier || item?.flightInformation?.
                                        companyId?.marketingCarrier}${
                                            item?.flightInformation?.
                                            flightOrtrainNumber ||
                                        flight?.
                                            flightDetails?.[0]?.flightInformation?.
                                            flightOrtrainNumber
                                    }`}</span>
                                </div>
                            </div>
                        </div>


                    </div>
                })
            }

            <div className='book-now'>

                <button onClick={()=>handleIndexId(flight)}>Book Now</button>
            </div>

        </div>
    )
}

export default FlightDetailAMD
