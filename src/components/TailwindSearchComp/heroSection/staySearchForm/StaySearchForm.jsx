import React, { useState, useEffect } from "react";
import LocationInput from "./LocationInput";
import StayDatesRangeInput from "./StayDateRangeInput";
import GuestsInput from "./GuestsInput";
import dayjs from "dayjs";
import { swalModal } from "../../../../utility/swal";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  hotelActionGRN,
  clearHotelReducerGRN,
  hotelGalleryRequest,
  singleHotelGRN,
} from "../../../../Redux/HotelGRN/hotel";

const StaySearchForm = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedFrom, setSelectedFrom] = useState(null);
  const [checkinDate, setCheckinDate] = useState(null);
  const [checkoutDate, setCheckoutDate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSingleHotelSearched, setIsSIngleHotelSerched] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const reducerState = useSelector((state) => state);

  const handleRoomDataChange = (roomsData) => {
    setRooms(roomsData);
  };

  // console.log(selectedFrom, "selected from");

  useEffect(() => {
    dispatch(clearHotelReducerGRN());
  }, []);

  const handleLocationSelect = (location) => {
    setSelectedFrom(location);
    // console.log("Selected Location:", location);
  };

  const handleDateChange = (dates) => {
    setCheckinDate(dates.startDate);
    setCheckoutDate(dates.endDate);
  };

  const selectedSingleHotel =
    reducerState?.hotelSearchResultGRN?.ticketData?.data?.data?.hotels?.filter(
      (item) => item.hotel_code == selectedFrom?.hotelCode
    );

  // navigate by single hotel

  const handleClick = () => {
    const payload = {
      data: {
        rate_key: selectedSingleHotel?.[0]?.min_rate?.rate_key,
        group_code: selectedSingleHotel?.[0]?.min_rate?.group_code,
      },
      searchID: selectedSingleHotel?.[0]?.search_id,
      hotel_code: selectedSingleHotel?.[0]?.hotel_code,
    };

    const galleryPayload = {
      hotel_id: selectedSingleHotel?.[0]?.hotel_code,
    };
    dispatch(hotelGalleryRequest(galleryPayload));
    dispatch(singleHotelGRN(payload));
    navigate("/st-hotel/hotelresult/selectroom");
  };

  useEffect(() => {
    if (
      reducerState?.hotelSearchResultGRN?.ticketData?.data?.data?.hotels &&
      isSingleHotelSearched
    ) {
      handleClick();
    }
  }, [reducerState?.hotelSearchResultGRN?.ticketData?.data?.data?.hotels]);

  useEffect(() => {
    if (
      reducerState?.hotelSearchResultGRN?.ticketData?.data?.data?.errors?.[0]
        ?.code == "1501"
    ) {
      swalModal("hotel", "No Result Found !");
      setIsLoading(false);
    }
  }, [reducerState?.hotelSearchResultGRN?.ticketData?.data?.data?.errors]);

  const handleSubmit = async () => {
    setIsSIngleHotelSerched(true);
    setIsLoading(true);

    sessionStorage.setItem("clientNationality", JSON.stringify("IN"));
    sessionStorage.setItem(
      "revisithotel",
      JSON.stringify([
        {
          cityCode: selectedFrom.cityCode,
          cityName: selectedFrom.cityName,
          countryCode: selectedFrom.countryCode,
          countryName: selectedFrom.countryName,
          checkin: checkinDate,
          checkout: checkoutDate,
          rooms: rooms,
          nationality: "IN",
        },
      ])
    );

    if (selectedFrom.hotelName) {
      const payload = {
        rooms: rooms,
        rates: "concise",
        hotel_codes: [`${selectedFrom.hotelCode}`],
        currency: "INR",
        client_nationality: "IN",
        checkin: dayjs(checkinDate).format("YYYY-MM-DD"),
        checkout: dayjs(checkoutDate).format("YYYY-MM-DD"),
        cutoff_time: 30000,
        version: "2.0",
      };

      sessionStorage.setItem("grnPayload", JSON.stringify(payload));
      dispatch(hotelActionGRN(payload));
    } else {
      const payload = {
        rooms: rooms,
        rates: "concise",
        cityCode: selectedFrom?.cityCode,
        currency: "INR",
        client_nationality: "IN",
        checkin: dayjs(checkinDate).format("YYYY-MM-DD"),
        checkout: dayjs(checkoutDate).format("YYYY-MM-DD"),
        cutoff_time: 30000,
        version: "2.0",
        // tboCityCode: selectedFrom?.tboCityCode,
        // EndUserIp: reducerState?.ip?.ipData,
        // TokenId: reducerState?.ip?.tokenData,
      };

      sessionStorage.setItem("grnPayload", JSON.stringify(payload));
      dispatch(hotelActionGRN(payload));
      navigate("/st-hotel/hotelresult");
    }
  };

  const renderForm = () => {
    return (
      <form className="w-full container relative  flex rounded-[10px] shadow-xl  bg-white ">
        <LocationInput
          className="flex-[1.5]"
          onLocationSelect={handleLocationSelect}
        />
        <div className="self-center border-r border-slate-200 h-8"></div>
        <StayDatesRangeInput
          className="flex-1"
          onDateChange={handleDateChange}
        />
        <div className="self-center border-r border-slate-200  h-8"></div>
        <GuestsInput
          className="flex-1"
          onSubmit={handleSubmit}
          loader={isLoading}
          onRoomDataChange={handleRoomDataChange}
        />
      </form>
    );
  };

  return renderForm();
};

export default StaySearchForm;
