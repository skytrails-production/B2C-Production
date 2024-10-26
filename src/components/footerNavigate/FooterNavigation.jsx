import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { oneWayAction } from "../../Redux/FlightSearch/oneWay";

import {
  searchaAirportListReq,
  searchFlightListReq,
} from "../../Redux/FlightList/actionFlightList";
import { searchFlight } from "../../Redux/SearchFlight/actionSearchFlight";
import dayjs from "dayjs";
import { hotelActionGRN } from "../../Redux/HotelGRN/hotel";
import constants from "./constants";

const FooterNavigation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const reducerState = useSelector((state) => state);

  const [selectedFrom, setSelectedFrom] = useState([]);
  const [selectedTo, setSelectedTo] = useState([]);
  const [flightclassName, setflightClassName] = useState("Y");

  function getNextDayDateIfAfter9PM(val) {
    const currentDate = new Date();
    // if (currentDate.getHours() >= 21) {
    currentDate.setDate(currentDate.getDate() + val);
    // }
    return currentDate;
  }

  const todaydate = getNextDayDateIfAfter9PM(1);
  const nextDate = getNextDayDateIfAfter9PM(2);

  function handleOnewaySubmit(event) {
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
    dispatch(searchFlight(searchpy));
    navigate(`/Searchresult?adult=${1}&child=${0}&infant=${0}`);
    // }
  }
  // const navigate = useNavigate();
  //package section
  const [destination, setDestination] = useState("");

  useEffect(() => {
    if (destination) {
      const id = destination?._id;
      navigate(`/holidaypackages/packagedetails/${id}`);
    }
  }, [destination]);

  const searchOneHoliday = (item) => {
    // console.log(item, "item")
    const id = item?._id;
    setDestination(item);
    const payloadDestination = {
      destination: destination?.country,
      days: 0,
    };
    sessionStorage.setItem(
      "searchPackageData",
      JSON.stringify(payloadDestination)
    );
  };

  async function searchHotel(event) {
    // event.preventDefault();
    // setIsSIngleHotelSerched(true);
    // setLoader(true);
    // console.log(event?.grnCityCode, "hotel payload");
    sessionStorage.setItem("SessionExpireTime", new Date());

    // const dynamicFormData = formDataDynamic.map((data) => ({
    //   adults: data.NoOfAdults || 0,
    //   children_ages: data.ChildAge || [],
    // }));

    // sessionStorage.setItem(
    //   "clientNationality",
    //   JSON.stringify(selectNationality?.countryCode)
    // );
    // sessionStorage.setItem(
    //   "revisithotel",
    //   JSON.stringify([
    //     {
    //       cityCode: selectedFrom.cityCode,
    //       cityName: selectedFrom.cityName,
    //       countryCode: selectedFrom.countryCode,
    //       countryName: selectedFrom.countryName,
    //       checkin: newDepartDate,
    //       checkout: newReturnDate,
    //       rooms: [...dynamicFormData],
    //       nationality: selectNationality,
    //     },
    //   ])
    // );

    // if (selectedFrom.hotelName) {
    //   const payload = {
    //     rooms: [...dynamicFormData],
    //     rates: "concise",
    //     hotel_codes: [`${selectedFrom.hotelCode}`],
    //     currency: "INR",
    //     client_nationality: selectNationality?.countryCode || "In",
    //     checkin: dayjs(newDepartDate).format("YYYY-MM-DD"),
    //     checkout: dayjs(newReturnDate).format("YYYY-MM-DD"),
    //     cutoff_time: 30000,
    //     version: "2.0",
    //   };

    //   sessionStorage.setItem("grnPayload", JSON.stringify(payload));
    //   dispatch(hotelActionGRN(payload));

    // } else {
    // console.log(event, "event");
    if (event?.hotelCode) {
      let payload = {
        // ...event,
        rooms: [
          {
            adults: 1,
            children_ages: [],
          },
        ],
        // cityCode: event.grnCityCode || event?.cityCode,
        checkin: dayjs(todaydate).format("YYYY-MM-DD"),
        checkout: dayjs(nextDate).format("YYYY-MM-DD"),
        hotel_codes: [`${event.hotelCode}`],
        client_nationality: "IN",
        currency: "INR",
        cutoff_time: 30000,
        rates: "concise",
        version: "2.0",
      };
      sessionStorage.setItem("grnPayload", JSON.stringify(payload));

      dispatch(hotelActionGRN(payload));
    } else {
      let payload = {
        ...event,
        rooms: [
          {
            adults: 1,
            children_ages: [],
          },
        ],
        cityCode: event.grnCityCode || event?.cityCode,
        checkin: dayjs(todaydate).format("YYYY-MM-DD"),
        checkout: dayjs(nextDate).format("YYYY-MM-DD"),
        client_nationality: "IN",
        currency: "INR",
        cutoff_time: 30000,
        rates: "concise",
        version: "2.0",
      };
      sessionStorage.setItem("grnPayload", JSON.stringify(payload));
      sessionStorage.setItem(
        "revisithotel",
        JSON.stringify([
          {
            cityCode: event?.grnCityCode || event?.tboCityCode,
            cityName: event?.cityName,
            countryCode: event?.grnCountryCode || event?.tboCountryCode,
            countryName: event?.grnCountryName || event?.tboCountryName,
            checkin: todaydate,
            checkout: nextDate,
            rooms: [
              {
                adults: 1,
                children_ages: [],
              },
            ],
            nationality: "IN",
            client_nationality: "IN",
          },
        ])
      );
      dispatch(hotelActionGRN(payload));
    }

    navigate("/st-hotel/hotelresult");
    // }
  }

  const handleSearch = (data, type) => {
    const searchMap = {
      flight: handleOnewaySubmit,
      hotel: searchHotel,
      package: searchOneHoliday,
    };
    //checking if the type exists
    if (searchMap?.[type]) {
      searchMap?.[type](data);
    } else {
      console.log("No function found for this type", type);
    }
  };
  return (
    <div className="px-24 flex flex-col gap-7">
      {constants?.footerNavigationdata?.map((item) => {
        return (
          <div className="flex  text-sm font-semibold flex-wrap flex-col ">
            <p>{`${item.headText} : `} </p>
            <div className="flex flex-wrap gap-1">
              {item.list.map((data) => {
                const type = item.type;
                const start = item?.start;
                return (
                  <p
                    onClick={() => handleSearch(data, type)}
                    className="cursor-pointer whitespace-nowrap  hover:text-indigo-500 text-sm font-normal text-gray-700 opacity-75"
                  >
                    {` ${
                      data.title
                        ? data.title
                        : data?.hotelName || `${start} ${data?.cityName}`
                    } |`}
                  </p>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FooterNavigation;