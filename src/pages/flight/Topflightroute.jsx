import React, { useState, useEffect, useRef } from "react";
import "./Topflightroute.scss";
import Img from "../../LazyLoading/Img";
import flightimg from "../../images/black-plane.svg";
import { useNavigate } from "react-router-dom";

import one from "../../images/flightRoute/one.svg";
import two from "../../images/flightRoute/two.svg";
import three from "../../images/flightRoute/three.svg";
import four from "../../images/flightRoute/four.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  searchaAirportListReq,
  searchFlightListReq,
} from "../../Redux/FlightList/actionFlightList";
import { oneWayAction } from "../../Redux/FlightSearch/oneWay";
import { searchFlight } from "../../Redux/SearchFlight/actionSearchFlight";
import dayjs from "dayjs";

const flightRoutes = [
  {
    id: 1,
    from: "Chennai",
    destination: "Mumbai",
    code: "BOM",
    arrivalCode: "MAA",
    code1: "MAA-BOM",
    imgages: one,
    fromDetails: {
      AirportCode: "MAA",
      CityCode: "MAA",
      CountryCode: "IN ",
      code: "Chennai International Airport",
      createdAt: "2023-01-30T14:58:34.428Z",
      id: "Maa",
      name: "Chennai",
      updatedAt: "2023-01-30T14:58:34.428Z",
      __v: 0,
      _id: "63d7db1a64266cbf450e07c2",
    },
    to: {
      AirportCode: "BOM",
      CityCode: "BOM",
      CountryCode: "IN ",
      code: "Chhatrapati Shivaji Maharaj International Airport",
      createdAt: "2023-01-30T14:58:34.428Z",
      id: "BOM",
      name: "Mumbai",
      updatedAt: "2023-01-30T14:58:34.428Z",
      __v: 0,
      _id: "63d7db1a64266cbf450e07c2",
    },
  },
  {
    id: 2,
    from: "Delhi",
    destination: "Mumbai",
    code: "DEL",
    arrivalCode: "BOM",
    code1: "DEL-BOM",
    imgages: two,
    fromDetails: {
      AirportCode: "DEL",
      CityCode: "DEL",
      CountryCode: "IN ",
      code: "Indira Gandhi Airport",
      createdAt: "2023-01-30T14:58:34.428Z",
      id: "DEL",
      name: "Delhi",
      updatedAt: "2023-01-30T14:58:34.428Z",
      __v: 0,
      _id: "63d7db1a64266cbf450e07c1",
    },

    to: {
      AirportCode: "BOM",
      CityCode: "BOM",
      CountryCode: "IN ",
      code: "Chhatrapati Shivaji Maharaj International Airport",
      createdAt: "2023-01-30T14:58:34.428Z",
      id: "BOM",
      name: "Mumbai",
      updatedAt: "2023-01-30T14:58:34.428Z",
      __v: 0,
      _id: "63d7db1a64266cbf450e07c2",
    },
  },

  {
    id: 3,
    from: "Hyderabad",
    destination: "Mumbai",
    code: "HYD",
    arrivalCode: "BOM",
    code1: "HYD-BOM",
    imgages: three,
    fromDetails: {
      AirportCode: "HYD",
      CityCode: "HYD",
      CountryCode: "IN ",
      code: "Rajiv Gandhi International Airport",
      createdAt: "2023-01-30T14:58:34.428Z",
      id: "HYD",
      name: "Hyderabad",
      updatedAt: "2023-01-30T14:58:34.428Z",
      __v: 0,
      _id: "668278aa909eb1823ba942db",
    },
    to: {
      AirportCode: "BOM",
      CityCode: "BOM",
      CountryCode: "IN ",
      code: "Chhatrapati Shivaji Maharaj International Airport",
      createdAt: "2023-01-30T14:58:34.428Z",
      id: "BOM",
      name: "Mumbai",
      updatedAt: "2023-01-30T14:58:34.428Z",
      __v: 0,
      _id: "63d7db1a64266cbf450e07c2",
    },
  },
  {
    id: 4,
    from: "Chandigarh",
    destination: "Delhi",
    code: "IXC",
    arrivalCode: "DEL",
    code1: "IXC-DEL",
    imgages: four,
    fromDetails: {
      AirportCode: "IXC",
      CityCode: "IXC",
      CountryCode: "IN ",
      code: "Chandigarh",
      createdAt: "2023-01-30T14:58:34.428Z",
      id: "IXC",
      name: "Chandigarh",
      updatedAt: "2023-01-30T14:58:34.428Z",
      __v: 0,
      _id: "668278aa909eb1823ba94368",
    },
    to: {
      AirportCode: "DEL",
      CityCode: "DEL",
      CountryCode: "IN ",
      code: "Indira Gandhi Airport",
      createdAt: "2023-01-30T14:58:34.428Z",
      id: "DEL",
      name: "Delhi",
      updatedAt: "2023-01-30T14:58:34.428Z",
      __v: 0,
      _id: "63d7db1a64266cbf450e07c1",
    },
  },
  {
    id: 5,
    from: "Patna",
    destination: "Delhi",
    code: "PAT",
    arrivalCode: "DEL",
    code1: "PAT-DEL",
    imgages: one,
    fromDetails: {
      AirportCode: "PAT",
      CityCode: "PAT",
      CountryCode: "IN ",
      code: "Patna",
      createdAt: "2023-01-30T14:58:34.428Z",
      id: "PAT",
      name: "Patna",
      updatedAt: "2023-01-30T14:58:34.428Z",
      __v: 0,
      _id: "668278aa909eb1823ba94886",
    },
    to: {
      AirportCode: "DEL",
      CityCode: "DEL",
      CountryCode: "IN ",
      code: "Indira Gandhi Airport",
      createdAt: "2023-01-30T14:58:34.428Z",
      id: "DEL",
      name: "Delhi",
      updatedAt: "2023-01-30T14:58:34.428Z",
      __v: 0,
      _id: "63d7db1a64266cbf450e07c1",
    },
  },
];

function Topflightroute() {
  const carouselContainer = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const reducerState = useSelector((state) => state);

  const [selectedFrom, setSelectedFrom] = useState([]);
  const [selectedTo, setSelectedTo] = useState([]);
  const [flightclassName, setflightClassName] = useState("Y");

  const navigation = (dir) => {
    const container = carouselContainer.current;

    const scrollAmount =
      dir === "left"
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20);

    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  function getNextDayDateIfAfter9PM() {
    const currentDate = new Date();
    if (currentDate.getHours() >= 21) {
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return currentDate;
  }

  const todaydate = getNextDayDateIfAfter9PM();

  function handleOnewaySubmit(event) {
    // event.preventDefault();

    sessionStorage.setItem("SessionExpireTime", new Date());

    const payload = {
      EndUserIp: reducerState?.ip?.ipData,
      TokenId: reducerState?.ip?.tokenData,
      AdultCount: 1,
      ChildCount: 0,
      InfantCount: 0,
      DirectFlight: "false",
      OneStopFlight: "false",
      JourneyType: 1,
      PreferredAirlines: null,
      Segments: [
        {
          Origin: event.fromDetails.AirportCode,
          Destination: event.to.AirportCode,
          FlightCabinClass: 2,
          PreferredDepartureTime: dayjs(todaydate).format("DD MMM, YY"),
          PreferredArrivalTime: dayjs(todaydate).format("DD MMM, YY"),
        },
      ],
      Sources: null,
      from: event.fromDetails.AirportCode,
      to: event.to.AirportCode,
      date: dayjs(todaydate).format("DD MMM, YY"),
      cabinClass: "Y",
      px: 1,
    };
    setSelectedFrom(event?.fromDetails);
    setSelectedTo(event?.to);

    sessionStorage.setItem(
      "onewayprop",
      JSON.stringify([
        {
          Origin: event.fromDetails.AirportCode,
          Destination: event.to.AirportCode,
          FlightCabinClass: 2,
          PreferredDepartureTime: dayjs(todaydate).format("DD MMM, YY"),
          PreferredArrivalTime: dayjs(todaydate).format("DD MMM, YY"),
          // PreferredArrivalTimeCld: newDepartDateCld,
          selectedFrom: event.fromDetails,
          selectedTo: event.to,
          totalCount: 1,
          todaydate: dayjs(todaydate).format("DD MMM, YY"),
          activeIdAdult: 1,
          activeIdChild: 0,
          activeIdInfant: 0,
          flightclassName,
        },
      ])
    );
    const parsedDate = new Date(todaydate);

    const formattedDate = parsedDate.toISOString();

    dispatch(oneWayAction(payload));

    dispatch(searchFlightListReq());
    dispatch(searchaAirportListReq());

    const searchpy = {
      from: event.fromDetails,
      to: event.to,
      departureDate: formattedDate,
    };

    console.log(searchpy, "search pyyyyyy");
    dispatch(searchFlight(searchpy));
    navigate(`/Searchresult?adult=${1}&child=${0}&infant=${0}`);
    // }
  }

  return (
    <div className="container paddHotCatTopRoute">
      <h2>Best Flight Deals</h2>
      <div className="categoryMainBox">
        <div className="HoliCateHeading"></div>
        <div>
          <div className="carouselTopFlight">
            <div className="carouselItems" ref={carouselContainer}>
              {flightRoutes?.map((item, index) => {
                return (
                  <div
                    className="carouselItem"
                    onClick={() => handleOnewaySubmit(item)}
                  >
                    <div className="posterBlock">
                      <Img src={item?.imgages} />
                    </div>
                    <div className="textBlock">
                      <span className="titleHoliCat">
                        <span>{item.from}</span>
                        <span className="flightTopImg">
                          <img width={20} src={flightimg} alt={item.id} />
                        </span>
                        <span>{item.destination}</span>
                      </span>
                      <div className="dateHoliCat">
                        <span>{item.code1}</span>
                        <span>{/* ₹ {item?.pakage_amount?.amount} */}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Topflightroute;
