import React, { useEffect, useState } from "react";
import "./flightDetail.scss";
// import fromTo from "../../images/fromTo.png";
// import fromTo from "../../../images/fromTo.png";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import duration from "dayjs/plugin/duration";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

dayjs.extend(customParseFormat);
dayjs.extend(duration);

dayjs.extend(customParseFormat);
const TimeDifference = (
  dateOfArrival,
  timeOfArrival,
  dateOfDeparture,
  timeOfDeparture
) => {
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
  const differenceInMinutes = Math.floor(
    differenceInMilliseconds / (1000 * 60)
  );

  // Calculate hours and remaining minutes
  const hours = Math.floor(differenceInMinutes / 60);
  const minutes = differenceInMinutes % 60;

  return `${hours} hours ${minutes} minutes`;
};

// const ConvertDate = ({ dateStr }) => {
//     const convertToReadableDate = (dateStr) => {
//         const parsedDate = dayjs(dateStr, "DDMMYY");
//         return parsedDate.format("dddd, MMMM D");
//     };
//     const formattedDate = convertToReadableDate(dateStr);

//     return (
//         formattedDate
//     );
// };
function convertTo24HourFormat(timeStr) {
  // Parse the time string as HHmm
  const parsedTime = dayjs(timeStr, "HHmm");

  // Convert to 24-hour format
  return parsedTime.format("HH:mm");
}

const FlightDetailAMD = ({ flight }) => {
  const flightList = useSelector((state) => state?.flightList);
  // const [airlines, setAirlines] = useState([]);
  const [airports, setAirports] = useState([]);
  useEffect(() => {
    // setAirlines(flightList?.flightDetails);
    setAirports(flightList?.aireportList);
  }, [flightList?.flightDetails, flightList?.aireportList]);
  // console.log(flight
  //     , "flightAmdffff");
  // function findAirlineByCode(code) {
  //     // console.log(airlines)
  //     if (airlines.length !== 0) {
  //         const data = airlines?.find((airline) => airline?.airlineCode === code);
  //         if (data?.airlineName) {
  //             return data?.airlineName;
  //         }
  //         return;
  //     }
  //     return;
  // }
  function findAirportByCode(code) {
    // console.log(airports, "airports")
    if (airports.length !== 0) {
      const data = airports?.find((airport) => airport?.AirportCode === code);

      if (data?.AirportCode) {
        // console.log(data, "dataaaaaaaaaaaa")
        return data;
      }
      return;
    }
    return;
  }
  const bookingClass = JSON.parse(sessionStorage.getItem("onewayprop"))?.[0]
    ?.flightclassName;
  // This should log the correct value
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
  // console.log(bookingClassItem?.label, bookingClass, "bookingClass");
  const location = useLocation();
  const queryParams = new URLSearchParams(location?.search);
  const adultCount = queryParams.get("adult");
  const childCount = queryParams.get("child");
  const infantCount = queryParams.get("infant");
  function formatDateString(dateString) {
    // Parse the date assuming it's in DDMMYY format
    const parsedDate = dayjs(dateString, "DDMMYY");

    // Format the date to 'dddd, MMMM D'
    return parsedDate.format("dddd, MMMM D");
  }

  const navigate = useNavigate();
  const handleIndexId = (ResultIndex) => {
    // console.log(ResultIndex, "ResultIndex")
    if (ResultIndex?.AirlineCode) {
      navigate(
        `booknow?adult=${adultCount}&child=${childCount}&infant=${infantCount} `,
        { state: { ResultIndex } }
      );
    }
     else if (ResultIndex?.flightDetails) {
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
    <div className="flightDetail-cnt">
      {flight?.flightDetails?.flightInformation ? (
        <div className="flightDetail-box-1">
          <div className="air-img">
            <img
              src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/${flight?.flightDetails?.flightInformation?.companyId?.marketingCarrier}.png`}
              alt="flight"
              style={{ borderRadius: "8px" }}
              width={38}
              height={38}
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
                <span>
                  {`${formatDateString(
                    flight?.flightDetails?.flightInformation?.productDateTime
                      ?.dateOfDeparture
                  )}· ${convertTo24HourFormat(
                    flight?.flightDetails?.flightInformation?.productDateTime
                      ?.timeOfDeparture
                  )}`}{" "}
                </span>
                <p>{`${
                  findAirportByCode(
                    flight?.flightDetails?.flightInformation?.location?.[0]
                      ?.locationId
                  )?.code
                } (${
                  flight?.flightDetails?.flightInformation?.location?.[0]
                    ?.locationId
                })`}</p>
              </div>
              <div className="flight-details-right-inne-1">
                <span>
                  {`${formatDateString(
                    flight?.flightDetails?.flightInformation?.productDateTime
                      ?.dateOfArrival
                  )}· ${convertTo24HourFormat(
                    flight?.flightDetails?.flightInformation?.productDateTime
                      ?.timeOfArrival
                  )}`}{" "}
                </span>
                <p>{`${
                  findAirportByCode(
                    flight?.flightDetails?.flightInformation?.location?.[1]
                      ?.locationId
                  )?.code
                } (${
                  flight?.flightDetails?.flightInformation?.location?.[1]
                    ?.locationId
                })`}</p>
              </div>
            </div>
            <div className="flight-details-right-inner2">
              <div className="flight-details-right-inne-1 detRightDetails">
                <span>
                  Trip time:{" "}
                  {TimeDifference(
                    flight?.flightDetails?.flightInformation?.productDateTime
                      ?.dateOfArrival,
                    flight?.flightDetails?.flightInformation?.productDateTime
                      ?.timeOfArrival,
                    flight?.flightDetails?.flightInformation?.productDateTime
                      ?.dateOfDeparture,
                    flight?.flightDetails?.flightInformation?.productDateTime
                      ?.timeOfDeparture
                  )}
                </span>
                <span>{`ANA · ${bookingClassItem} class · ${
                  flight?.flightDetails?.flightInformation?.companyId
                    ?.marketingCarrier ||
                  flight?.flightDetails?.flightInformation?.companyId
                    ?.marketingCarrier
                }${
                  flight?.flightDetails?.flightInformation
                    ?.flightOrtrainNumber ||
                  flight?.flightDetails?.[0]?.flightInformation
                    ?.flightOrtrainNumber
                } · NH 847`}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        flight?.flightDetails?.map((item, index) => {
          function calculateTimeDifference(
            dateOfDeparture,
            timeOfDeparture,
            dateOfArrival,
            timeOfArrival
          ) {
            // Convert date and time strings to Date objects
            const departure = new Date(
              `20${dateOfDeparture.slice(4, 6)}-${dateOfDeparture.slice(
                2,
                4
              )}-${dateOfDeparture.slice(0, 2)}T${timeOfDeparture.slice(
                0,
                2
              )}:${timeOfDeparture.slice(2, 4)}:00`
            );

            const arrival = new Date(
              `20${dateOfArrival.slice(4, 6)}-${dateOfArrival.slice(
                2,
                4
              )}-${dateOfArrival.slice(0, 2)}T${timeOfArrival.slice(
                0,
                2
              )}:${timeOfArrival.slice(2, 4)}:00`
            );

            // Calculate the difference in milliseconds
            const difference = arrival - departure;

            // Convert milliseconds to minutes
            const minutes = Math.floor(difference / 1000 / 60);

            // Calculate hours and minutes
            const hours = Math.floor(minutes / 60);
            const remainingMinutes = minutes % 60;
            // console.log(`${hours} hours ${remainingMinutes} minutes`)

            return `${hours} hours ${remainingMinutes} minutes`;
          }
          let layoverimeDifference;
          let isNotlast = index < flight?.flightDetails?.length - 1;
          if (isNotlast) {
            let dateOfDeparture =
              item?.flightInformation?.productDateTime?.dateOfArrival;
            let timeOfDeparture =
              item?.flightInformation?.productDateTime?.timeOfArrival;
            let dateOfArrival =
              flight?.flightDetails?.[index + 1]?.flightInformation
                .productDateTime?.dateOfDeparture;

            let timeOfArrival =
              flight?.flightDetails[index + 1]?.flightInformation
                ?.productDateTime?.timeOfDeparture;
            layoverimeDifference = calculateTimeDifference(
              dateOfDeparture,
              timeOfDeparture,
              dateOfArrival,
              timeOfArrival
            );
            // console.log(dateOfDeparture, timeOfDeparture, dateOfArrival, timeOfArrival, "dateOfDeparture, timeOfDeparture, dateOfArrival, timeOfArrival");
          }
          // Output: "1 hours 30 minutes"
          let layoverCity = findAirportByCode(
            item?.flightInformation?.location[1]?.locationId
          )?.name;

          return (
            <>
              <div className="flightDetail-box-1">
                <div className="air-img">
                  <img
                    src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/${item?.flightInformation?.companyId?.marketingCarrier}.png`}
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
                      <span>{`${formatDateString(
                        item?.flightInformation?.productDateTime
                          ?.dateOfDeparture
                      )} · ${convertTo24HourFormat(
                        item?.flightInformation?.productDateTime
                          ?.timeOfDeparture
                      )}`}</span>
                      <p>{`${
                        findAirportByCode(
                          item?.flightInformation?.location?.[0]?.locationId
                        )?.code
                      } (${
                        item?.flightInformation?.location?.[0]?.locationId
                      })`}</p>
                    </div>
                    <div className="flight-details-right-inne-1">
                      <span>{`${formatDateString(
                        item?.flightInformation?.productDateTime?.dateOfArrival
                      )} · ${convertTo24HourFormat(
                        item?.flightInformation?.productDateTime?.timeOfArrival
                      )}`}</span>
                      <p>{`${
                        findAirportByCode(
                          item?.flightInformation?.location?.[1]?.locationId
                        )?.code
                      } (${
                        item?.flightInformation?.location?.[1]?.locationId
                      })`}</p>
                    </div>
                  </div>
                  <div className="flight-details-right-inner2">
                    <div className="flight-details-right-inne-1 detRightDetails">
                      <span>
                        Trip time:{" "}
                        {TimeDifference(
                          item?.flightInformation?.productDateTime
                            ?.dateOfArrival,
                          item?.flightInformation?.productDateTime
                            ?.timeOfArrival,
                          item?.flightInformation?.productDateTime
                            ?.dateOfDeparture,
                          item?.flightInformation?.productDateTime
                            ?.timeOfDeparture
                        )}
                      </span>
                      <span>{`· ${bookingClassItem} class · ${
                        item?.flightInformation?.companyId?.marketingCarrier ||
                        item?.flightInformation?.companyId?.marketingCarrier
                      }${
                        item?.flightInformation?.flightOrtrainNumber ||
                        flight?.flightDetails?.[0]?.flightInformation
                          ?.flightOrtrainNumber
                      }`}</span>
                    </div>
                  </div>
                </div>
              </div>
              {isNotlast && (
                <div className="layoverBox">
                  <p>
                    Transit time:
                    {layoverimeDifference} - {layoverCity}(
                    {item?.flightInformation?.location[1]?.locationId})
                  </p>
                </div>
              )}
              {/* {layoverDuration !== 0 && (
                                <div className="layoverBox">

                                    <p className="">
                                        Transit Time:{" "}
                                        {layoverHours !== 0 &&
                                            `${layoverHours} hours`}{" "}
                                        {layoverMinutes !== 0 &&
                                            `${layoverMinutes} minutes`}
                                    </p>

                                </div>
                            )} */}
            </>
          );
        })
      )}

      <div className="book-now">
        <button onClick={() => handleIndexId(flight)}>Book Now</button>
      </div>
    </div>
  );
};

export default FlightDetailAMD;
