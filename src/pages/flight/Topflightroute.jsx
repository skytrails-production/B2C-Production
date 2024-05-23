import React from "react";
import "./Topflightroute.css";
import flightimg from "../../images/black-plane.svg";
import { useNavigate } from "react-router-dom";
import one from "../../images/flightRoute/1.png"
import two from "../../images/flightRoute/2.png"
import three from "../../images/flightRoute/3.png"
import four from "../../images/flightRoute/4.png"
import five from "../../images/flightRoute/5.png"
import six from "../../images/flightRoute/6.png"
import seven from "../../images/flightRoute/7.png"

const flightRoutes = [
  {
    id: 1,
    from: "Chennai",
    destination: "Mumbai",
    code: "BOM",
    arrivalCode: "MAA",
    code1: "MAA-BOM",
    imgages: one,
  },
  {
    id: 2,
    from: "Chandigarh",
    destination: "Delhi",
    code: "IXC",
    arrivalCode: "DEL",
    code1: "IXC-DEL",
    imgages: two,
  },
  {
    id: 3,
    from: "Patna",
    destination: "Delhi",
    code: "PAT",
    arrivalCode: "DEL",
    code1: "PAT-DEL",
    imgages: seven,
  },
  {
    id: 4,
    from: "Delhi",
    destination: "Pune",
    code: "DEL",
    arrivalCode: "PNQ",
    code1: "DEL-PNQ",
    imgages: two,
  },
  {
    id: 5,
    from: "Delhi",
    destination: "Goa",
    code: "DEL",
    arrivalCode: "GOI",
    code1: "DEL-GOI",
    imgages: three,
  },
  {
    id: 6,
    from: "Delhi",
    destination: "Bangalore",
    code: "DEL",
    arrivalCode: "BLR",
    code1: "DEL-BLR",
    imgages: four,
  },
  {
    id: 7,
    from: "Delhi",
    destination: "Mumbai",
    code: "DEL",
    arrivalCode: "BOM",
    code1: "DEL-BOM",
    imgages: five,
  },
  {
    id: 8,
    from: "Delhi",
    destination: "Hyderabad",
    code: "DEL",
    arrivalCode: "HYD",
    code1: "DEL-HYD",
    imgages: six,
  },
];

function Topflightroute() {

  const navigate = useNavigate();

  function getNextDayDateIfAfter9PM() {
    const currentDate = new Date();
    if (currentDate.getHours() >= 21) {
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return currentDate;
  }

  // Example usage:
  const todaydate = getNextDayDateIfAfter9PM();
  // console.log(todaydate);
  const handlePopularSearch = (popularParam) => {
    const updatedParam = [
      {
        Destination: popularParam.arrivalCode,
        FlightCabinClass: 1,
        Origin: popularParam.origincode,
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
          updatedAt: todaydate,
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
          name: popularParam.destination,
          updatedAt: todaydate,
          __v: 0,
          _id: "",
        },
        startDate: todaydate,
        totalCount: 0,
      },
    ];
    sessionStorage.setItem("onewayprop", JSON.stringify(updatedParam));
    sessionStorage.setItem("isPopularSearch", true);
    navigate(`/Searchresult?adult=${1}&child=${0}&infant=${0}`);
  };

  return (
    <section className="container " style={{ marginTop: "62px", marginBottom: "80px" }}>
      <div class="offerText my-5">
        <p>Best Flight Deals</p>

      </div>
      <div className="row g-5">
        {flightRoutes.map((route) => (
          <div
            key={route.id}
            className="col-lg-3 col-md-4 col-sm-6"
            style={{ cursor: "pointer" }}
            onClick={() => handlePopularSearch(route)}
          >
            <div className="flight-route-box">
              <div className="route-img-flight">
                <img src={route.imgages} alt={route.id} className="route-img" />
              </div>
              <div className="route-text-flight">
                <div className="route-content-span">
                  <span>{route.from}</span>
                  <span className="flightTopImg">
                    <img src={flightimg} alt={route.id} />
                  </span>
                  <span>{route.destination}</span>
                </div>
                <div className="route-sort-caption">{route.code1}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Topflightroute;
