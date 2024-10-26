import React, { useEffect, useState } from "react";
import "../flightDetail.scss";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import duration from "dayjs/plugin/duration";
import { useLocation, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { useLocation, useNavigate } from "react-router-dom";

function KafilaDetails({flight}) {
  const bookingClass = JSON.parse(sessionStorage.getItem("onewayprop"))?.[0]
    ?.flightclassName;

    // console.log(flight)

    const location = useLocation();
    const queryParams = new URLSearchParams(location?.search);
    const adultCount = queryParams.get("adult");
    const childCount = queryParams.get("child");
    const infantCount = queryParams.get("infant");

  const ClassItems = [
    // { id: 1,value:"Y", label: "All" },
    { id: 2, value: "Y", label: "Economy" },
    { id: 3, value: "W", label: "Premium Economy" },
    { id: 4, value: "C", label: "Business" },
    // { id: 5, label: "Premium Business" },
    { id: 6, value: "F", label: "First" },
  ];
  const bookingClassItem = ClassItems.find(
    (item) => item.value === bookingClass
  )?.label;

    const FCode = flight?.FCode;
    const flightcode  = FCode.split(',')[0];



// departuretime
const dateTime = new Date(flight?.DDate);
const hours = dateTime.getHours().toString().padStart(2, '0'); 
const minutes = dateTime.getMinutes().toString().padStart(2, '0'); 
const departuretime = `${hours}:${minutes}`;

// arrival 
const dateTimearrival = new Date(flight?.ADate);
const hoursarrival = dateTimearrival.getHours().toString().padStart(2, '0'); 
const minutesarrival = dateTimearrival.getMinutes().toString().padStart(2, '0');
const departuretimearrival = `${hoursarrival}:${minutesarrival}`;
// console.log(departuretime); 


// datedeparture
const departuredate = new Date(flight?.DDate);
const departuredatevalue = departuredate.toISOString().split('T')[0]; // Extracts "2024-10-10"

const arrivaldate = new Date(flight?.ADate);
const darrivaldatevalue = arrivaldate.toISOString().split('T')[0]; // Extracts "2024-10-10"


// tripduration
const duration = flight?.Itinerary?.[0]?.Dur;
const parts = duration.split(':');
const durationhours = parts[1].replace('h', ''); 
const durationminutes = parts[2].replace('m', '');
// const totalduration = `${durationhours}h:${durationminutes}m`;


const navigate = useNavigate();
const handleIndexId = (ResultIndex) => {
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
    else if (ResultIndex?.ADate){
      navigate(
        `bookKafila?adult=${adultCount}&child=${childCount}&infant=${infantCount}`,
        { state: { ResultIndex } }
      );
    }
  };



  return (
    <>

<div className="flightDetail-cnt">
{flight?.Itinerary?.length == 1 ? (
              <div className="flightDetail-box-1">
                <div className="air-img">
                  <img
                    src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/${flightcode}.png`}
                    alt="flight"
                    style={{ borderRadius: "8px" }}
                    width={58}
                    height={58}
                  />
                </div>
                <div className="flight-details-right">
                  <div className="flight-details-right-img">
                    {/* <img src={fromTo} height={"100%"} alt="" /> */}

                    <span className="roundSpan"></span>
                    <span className="dottedSpan"></span>
                    <span className="roundSpan2"></span>
                  </div>
                  <div className="flight-details-right-inner flight-details-right-inner-border">
                    <div className="flight-details-right-inne-1">
                      <span>{departuredatevalue} {departuretime}</span>
                      <p> {flight?.Itinerary?.[0]?.DArpt} {flight?.Itinerary?.[0]?.SrcName}</p>
                    </div>
                    <div className="flight-details-right-inne-1">
                      <span>{darrivaldatevalue} {departuretimearrival}</span>
                      <p>{flight?.Itinerary?.[flight?.Itinerary?.length-1]?.AArpt} {flight?.Itinerary?.[flight?.Itinerary?.length-1]?.DesName}</p>
                    </div>
                  </div>
                  <div className="flight-details-right-inner2">
                    <div className="flight-details-right-inne-1 detRightDetails">
                      <span>
                        Trip time:{" "}
                        {flight?.Itinerary?.[0]?.Dur}
                      </span>
                      <span>{`· ${bookingClassItem} · ${
                        flight?.FName 
                      }${
                        flightcode
                      }`}</span>
                    </div>
                  </div>
                </div>
              </div>
              
):(
  <>
          {flight?.Itinerary?.map((item, index) => {
            // console.log(item, "item")
            function calculateTimeDifferenceISO(departureTime, arrivalTime) {
              // Convert the ISO date-time strings to Date objects
              const departure = new Date(departureTime);
              const arrival = new Date(arrivalTime);

              // Calculate the difference in milliseconds
              const difference = arrival - departure;

              // Convert milliseconds to minutes
              const minutes = Math.floor(difference / 1000 / 60);

              // Calculate hours and minutes
              const hours = Math.floor(minutes / 60);
              const remainingMinutes = minutes % 60;

              return `${hours} hours ${remainingMinutes} minutes`;
            }
            // console.log(item, "itemmmmmmmmm`")
            const duration = item?.Dur;
            let isNext = index < flight?.Itinerary?.length - 1;
            let layoverTime;
            {/* console.log(isNext,"isNextisNextisNextisNextisNextisNextisNextisNextisNext"); */}
            if (isNext) {
              let departureTime = item?.ADate;
              let arrivalTime = flight?.Itinerary?.[index + 1]?.DDate;
              // console.log(departureTime, arrivalTime, flight?.
              // Segments?.[0][index + 1], "departureTime,arrivalTime")
              {/* flight?.Segments?.[0][index + 1]?.Origin?.DepTime; */}
              layoverTime = calculateTimeDifferenceISO(
                departureTime,
                arrivalTime
              );
              // console.log(layoverTime, "layovertime")
            }

            {/* const layovertime = item?.lay */}


            const dateTime = new Date(item?.DDate);
const hours = dateTime.getHours().toString().padStart(2, '0'); 
const minutes = dateTime.getMinutes().toString().padStart(2, '0'); 
const departuretime1 = `${hours}:${minutes}`;

// arrival 
const dateTimearrival = new Date(item?.ADate);
const hoursarrival = dateTimearrival.getHours().toString().padStart(2, '0'); 
const minutesarrival = dateTimearrival.getMinutes().toString().padStart(2, '0');
const departuretimearrival1 = `${hoursarrival}:${minutesarrival}`;


const departuredate = new Date(item?.DDate);
const options1 = { weekday: 'long', month: 'long', day: 'numeric' };
{/* const departuredatevalue = departuredate.toISOString().split('T')[0]; // Extracts "2024-10-10" */}
const departuredatevalue = departuredate.toLocaleDateString('en-US', options1);

const arrivaldate = new Date(item?.ADate);
{/* const darrivaldatevalue = arrivaldate.toISOString().split('T')[0]; */}
const options = { weekday: 'long', month: 'long', day: 'numeric' };
const darrivaldatevalue = arrivaldate.toLocaleDateString('en-US', options);



            return (
              <>
                <div className="flightDetail-box-1">
                  <div className="flightDetail-img">
                    <img
                      src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/${flightcode}.png`}
                      alt="flight"
                      style={{ borderRadius: "8px" }}
                      width={58}
                      height={58}
                    />
                  </div>
                  <div className="flight-details-right">
                    <div className="flight-details-right-img">
                      {/* <img src={fromTo} height={"100%"} alt="" /> */}
                      <div className="roundSpan"></div>
                      <div className="dottedSpan"></div>
                      <div className="roundSpan2"></div>
                    </div>
                    <div className="flight-details-right-inner flight-details-right-inner-border">
                      <div className="flight-details-right-inne-1">
                        <span>{departuredatevalue} {departuretime1}</span>
                        {/* <span>{item?.DDate}</span> */}
                        <p>
                          {item?.DArpt} (
                          {item?.Src})
                        </p>
                      </div>
                      <div className="flight-details-right-inne-1">
                        <span>
                        {darrivaldatevalue} {departuretimearrival1}
                          {/* {item?.ADate} */}
                        </span>
                        <p>
                        {item?.AArpt} (
                          {item?.Des})
                        </p>
                      </div>
                    </div>
                    <div className="flight-details-right-inner2">
                      <div className="flight-details-right-inne-1 detRightDetails">
                        <span>
                          Trip time:{" "}
                          {duration}
                        </span>
                        <span>{`ANA · ${bookingClassItem} class · ${item?.FName}${item?.FNo}`}</span>
                      </div>
                    </div>
                  </div>
                </div>
                {isNext && (
                  <div className="layoverBox">
                    <p>
                      Transit time: {layoverTime} -
                      {item?.DesName} (
                      {item?.AArpt})
                    </p>
                  </div>
                )}
              </>
            );
          })}
        </>
)}
              <div className="book-now">
        <button onClick={() => handleIndexId(flight)}>Book Now</button>
      </div>

      </div>

             
            </>
  )
}

export default KafilaDetails