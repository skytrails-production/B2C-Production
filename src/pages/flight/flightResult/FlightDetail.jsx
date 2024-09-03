import React from 'react'
import "./flightDetail.scss"
// import fromTo from "../../images/fromTo.png";
import fromTo from "../../../images/fromTo.png";
import { useLocation, useNavigate } from 'react-router-dom';


const FlightDetail = ({ flight }) => {
    console.log(flight, flight?.
        Segments?.[0]?.length, "flight tvo")
    function formatDateTime(dateString) {
        const date = new Date(dateString);

        const options = {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false  // Use 24-hour format
        };

        const formattedDate = date.toLocaleDateString('en-US', options);
        const time = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });

        return `${formattedDate} `;
    }
    function getTimeDifference(startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);

        const diffInMs = end - start; // Difference in milliseconds

        const diffInMinutes = Math.floor(diffInMs / 1000 / 60); // Difference in minutes

        const hours = Math.floor(diffInMinutes / 60);
        const minutes = diffInMinutes % 60;

        return `${hours} hours ${minutes} minutes`;
    }
    // Correct approach:
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

    const navigate = useNavigate()
    const handleIndexId = (ResultIndex) => {
        console.log(ResultIndex?.AirlineCode, "reuultined")
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
            {flight?.
                Segments?.[0]?.length == 1 ?
                <div className='flightDetail-box-1'>
                    <div className='flightDetail-img'>
                        <img
                            src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/${flight?.
                                Segments?.[0]?.[0]?.Airline?.
                                AirlineCode
                                }.png`}
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
                                <span>{formatDateTime(flight?.
                                    Segments?.[0]?.[0]?.Origin?.
                                    DepTime)}</span>
                                <p>{flight?.
                                    Segments?.[0]?.[0]?.Origin?.Airport?.
                                    AirportName

                                } ({flight?.Segments?.[0]?.[0]?.Origin?.Airport?.

                                    AirportCode}
                                    )</p>
                            </div>
                            <div className='flight-details-right-inne-1'>
                                <span>{formatDateTime(flight?.
                                    Segments?.[0]?.[0]?.Destination?.
                                    ArrTime)}</span>
                                <p>{flight?.
                                    Segments?.[0]?.[0]?.Destination?.Airport?.
                                    AirportName

                                } ({flight?.Segments?.[0]?.[0]?.Destination?.Airport?.

                                    AirportCode})
                                </p>
                            </div>

                        </div>
                        <div className='flight-details-right-inner '>
                            <div className='flight-details-right-inne-1'>
                                <span>
                                    Trip time: {getTimeDifference(flight?.
                                        Segments?.[0]?.[0]?.Origin?.
                                        DepTime, flight?.
                                            Segments?.[0]?.[0]?.Destination?.
                                        ArrTime)}</span>
                                <span>{`ANA · ${bookingClassItem} class · ${flight?.Segments?.[0]?.[0]?.Airline?.AirlineCode}${flight?.Segments?.[0]?.[0]?.Airline?.FlightNumber} `}</span>
                            </div>
                        </div>
                    </div>


                </div> :
                <>
                    {flight?.
                        Segments?.[0]?.map((item) => {
                            console.log(item, "item")
                            return (<div className='flightDetail-box-1'>
                                <div className='flightDetail-img'>
                                    <img
                                        src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/${item?.Airline?.
                                            AirlineCode}.png`}
                                        alt="flight"
                                        style={{ borderRadius: "8px" }}
                                        width={58}
                                        height={58}
                                    />
                                </div>
                                <div className='flight-details-right'>
                                    <div className='flight-details-right-img'>
                                        {/* <img src={fromTo} height={"100%"} alt="" /> */}
                                        <div className='roundSpan'></div>
                                        <div className='dottedSpan'></div>
                                        <div className='roundSpan'></div>
                                    </div>
                                    <div className='flight-details-right-inner flight-details-right-inner-border'>
                                        <div className='flight-details-right-inne-1'>
                                            <span>{formatDateTime(item?.Origin?.
                                                DepTime)}</span>
                                            <p>{item?.Origin?.Airport?.

                                                AirportName

                                            } ({item?.Origin?.Airport?.

                                                AirportCode})</p>
                                        </div>
                                        <div className='flight-details-right-inne-1'>
                                            <span>{formatDateTime(item?.Destination?.
                                                ArrTime)}</span>
                                            <p>{item?.Destination?.Airport?.
                                                AirportName

                                            } ({item?.Destination?.Airport?.

                                                AirportCode})</p>
                                        </div>

                                    </div>
                                    <div className='flight-details-right-inner'>
                                        <div className='flight-details-right-inne-1'>
                                            <span>
                                                Trip time: {getTimeDifference(item?.Origin?.
                                                    DepTime, item?.Destination?.
                                                    ArrTime)}</span>
                                            <span>{`ANA · ${bookingClassItem} class · ${item?.Airline?.AirlineCode}${item.Airline?.FlightNumber}`}</span>
                                        </div>
                                    </div>
                                </div>


                            </div>)
                        })}
                </>

            }
            <div className='book-now'>

                <button onClick={() => handleIndexId(flight)}>Book Now</button>
            </div>
        </div>
    )
}

export default FlightDetail
