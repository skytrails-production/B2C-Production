import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearHolidayReducer } from "../../Redux/OnePackageSearchResult/actionOneSearchPackage";
import ResultPageSearchLocation from "./ResultPageSearchLocation";
import ResultPageGuestInput from "./ResultPageGuestInput";
import { clearPackageData } from "../../Redux/SearchPackage/actionSearchPackage";

const PackageResSearchForm = () => {
  const [selectedFrom, setSelectedFrom] = useState(null);
  const { keyword } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLocationSelect = (location) => {
    setSelectedFrom(location);
  };

  useEffect(() => {
    dispatch(clearHolidayReducer());
  }, []);

  const handleSubmit = async () => {
    if (keyword === selectedFrom) {
      return;
    }
    if (selectedFrom != null) {
      dispatch(clearPackageData());
      navigate(`/holidaypackages/cities/${selectedFrom}`);
    }
  };

  const renderForm = () => {
    return (
      <form className="relative flex items-center justify-center rounded-[40px] border  bg-white w-full md:w-1/2 lg:w-1/2 xl:w-1/2 mx-auto">
        <ResultPageSearchLocation
          className="flex-[1.5]"
          onLocationSelect={handleLocationSelect}
          customPadding="p-3"
        />
        <ResultPageGuestInput className="flex-1" onSubmit={handleSubmit} />
      </form>
    );
  };

  return renderForm();
};

export default PackageResSearchForm;
