import React from "react";
import "./Topflightroute.css";
import image5 from "../../images/hyderabad.jpg";
import flightimg from "../../images/black-plane (1).png";
import { useNavigate } from "react-router-dom";
import imgage1 from "../../images/mumbai.jpg";
import image2 from "../../images/goa1.jpg";
import image3 from "../../images/pune.jpg";
import image4 from "../../images/banglore.jpg";

const flightRoutes = [
  {
    id: 1,
    from: "Chennai",
    destination: "Mumbai",
    code: "BOM",
    arrivalCode: "MAA",
    code1: "DEL-PNQ",
    imgages:imgage1
  },
  {
    id: 2,
    from: "Delhi",
    destination: "Pune",
    code: "DEL",
    arrivalCode: "PNQ",
    code1: "DEL-PNQ",
    imgages:image3
  },
  {
    id: 3,
    from: "Delhi",
    destination: "Goa",
    code: "DEL",
    arrivalCode: "GOI",
    code1: "DEL-GOI",
    imgages:image2
  },
  {
    id: 4,
    from: "Delhi",
    destination: "Bangalore",
    code: "DEL",
    arrivalCode: "BLR",
    code1: "DEL-BLR",
    imgages:image4
  },
  {
    id: 5,
    from: "Delhi",
    destination: "Mumbai",
    code: "DEL",
    arrivalCode: "BOM",
    code1: "DEL-BOM",
    imgages:imgage1
  },
  {
    id: 6,
    from: "Delhi",
    destination: "Hyderabad",
    code: "DEL",
    arrivalCode: "HYD",
    code1: "DEL-HYD",
    imgages:image5
  },
];

function Topflightroute({
  selectedFrom,
  selectedTo,
  activeIdClass,
  formData,
  totalCount,
  startDate,
  activeIdAdult,
  activeIdChild,
  activeIdInfant,
}) {
  const navigate = useNavigate();
//  const todaydate = new Date();
 function getNextDayDateIfAfter9PM() {
  // Get the current date and time
  const currentDate = new Date();
  // currentDate.setHours(21, 0, 0, 0);
  
  // Check if the current time is greater than 9 PM (21:00)
  if (currentDate.getHours() >= 21) {
    // Increment the date by 1 to get the next day's date
    currentDate.setDate(currentDate.getDate() + 1);
  }

  // Return the updated date
  return currentDate;
}

// Example usage:
const todaydate = getNextDayDateIfAfter9PM();
console.log(todaydate);
  const handlePopularSearch = (popularParam) => {
    console.log(popularParam,"popularParam")
    const updatedParam = [
      {
        Destination:popularParam.arrivalCode,
        FlightCabinClass: 1,
        Origin:popularParam.origincode,
        PreferredArrivalTime: todaydate,
        PreferredDepartureTime: todaydate,
        activeIdAdult: 1,
        activeIdChild: 0,
        activeIdInfant: 0,
        selectedFrom: {
          AirportCode: popularParam.code,
          CityCode: popularParam.code,
          CountryCode: "IN ",
          code: popularParam.code,
          createdAt: todaydate,
          id: popularParam.id,
          name: popularParam.from,
          updatedAt:todaydate,
          __v: 0,
          _id: "",
        },
        selectedTo: {
          AirportCode: popularParam.arrivalCode,
          CityCode: popularParam.arrivalCode,
          CountryCode: "IN ",
          code: popularParam.arrivalCode,
          createdAt: todaydate,
          id: popularParam.origincode,
          name:popularParam.destination,
          updatedAt: todaydate,
          __v: 0,
          _id: "",
        },
        startDate: todaydate,
        totalCount: 0,
      },
    ];
    // console.log(updatedParam, "updatedParam/....................")
    sessionStorage.setItem("onewayprop", JSON.stringify(updatedParam));
    navigate(`/Searchresult?adult=${1}&child=${0}&infant=${0}`);
  };



  return (
    <section className="container" style={{ marginTop: "82px" }}>
      <div className="Top-flight-route">
        <div className="inner-content">
          <div className="topflight-heading">
            <div className="flight-routes-heading">Top Flight Routes</div>
          </div>

          <div className="Flight-grid-route">
            {flightRoutes.map((route) => (
              <div
                key={route.id}
                className="flight-route-box"
                onClick={() => handlePopularSearch(route)}
              >
                <div className="route-img-flight">
                  <img src={route.imgages} alt="" className="route-img" />
                </div>
                <div className="route-text-flight">
                  <div className="route-content-span">
                    <span>{route.from}</span>
                    <span>
                      <img src={flightimg} alt="" />
                    </span>
                    <span>{route.destination}</span>
                  </div>
                  <div className="route-sort-caption">{route.code1}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Topflightroute;
