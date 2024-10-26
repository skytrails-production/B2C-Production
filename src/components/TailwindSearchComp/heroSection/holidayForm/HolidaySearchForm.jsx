import React, { useEffect, useState } from "react";
// import LocationInput from "./LocationInput";
// import StayDatesRangeInput from "./StayDateRangeInput";
// import GuestsInput from "./GuestsInput";
import dayjs from "dayjs";
import axios from "axios";
import { clearHolidayReducer } from "../../../../Redux/OnePackageSearchResult/actionOneSearchPackage";
import HolidayLocationInput from "./HolidayLocationInput";
import HolidayDateRange from "./HolidayDateRange";
import HolidayGuestInput from "./HolidayGuestInput";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const HolidaySearchForm = () => {
  const [travellers, setTravellers] = useState([]);
  const [selectedFrom, setSelectedFrom] = useState(null);
  const [checkinDate, setCheckinDate] = useState(null);
  const [checkoutDate, setCheckoutDate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleRoomDataChange = (roomsData) => {
    setTravellers(roomsData);
  };

  const handleLocationSelect = (location) => {
    setSelectedFrom(location);
  };

  useEffect(() => {
    dispatch(clearHolidayReducer());
  }, []);

  const handleDateChange = (dates) => {
    setCheckinDate(dates.startDate);
    setCheckoutDate(dates.endDate);
  };

  const handleSubmit = async () => {
    if (selectedFrom) {
      navigate(`/holidaypackages/cities/${selectedFrom}`);
    }
  };

  const renderForm = () => {
    return (
      <form className="w-full container  relative  flex rounded-[10px] shadow-xl  bg-white ">
        <HolidayLocationInput
          className="flex-[1.5]"
          onLocationSelect={handleLocationSelect}
        />
        <div className="self-center border-r border-slate-200 h-8"></div>
        <HolidayDateRange className="flex-1" onDateChange={handleDateChange} />
        <div className="self-center border-r border-slate-200  h-8"></div>
        <HolidayGuestInput
          className="flex-1"
          onSubmit={handleSubmit}
          onRoomDataChange={handleRoomDataChange}
        />
      </form>
    );
  };

  return renderForm();
};

export default HolidaySearchForm;
