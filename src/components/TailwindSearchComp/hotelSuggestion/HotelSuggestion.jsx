import React, { useEffect, useState } from "react";

import Heading from "../shared/Heading";
import HotelSuggestionCard from "./HotelSuggestionCard";
import { useSelector } from "react-redux";
import axios from "axios";
import { apiURL } from "../../../Constants/constant";

const HotelSuggestion = ({
  headingCenter = true,
  className = "",
  gridClassName = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
}) => {
  const reducerState = useSelector((state) => state);
  const hotalData =
    reducerState?.flightSuggested?.flightHotalSuggeated?.hotelPayloadResult;
  const [flightSuggest, setFlightSuggest] = useState([]);

  const fetchflightSuggest = async () => {
    const data = await axios.get(
      `${apiURL.baseURL}/skyTrails/staticContent/flightPayload/listStaticFlightPayload`
    );

    setFlightSuggest(data?.data?.result?.flightPayloadResult);

    return data;
  };
  useEffect(() => {
    fetchflightSuggest();
  }, []);

  return (
    <div
      className={`nc-SectionGridCategoryBox custom-container mt-16 relative`}
    >
      <Heading
        desc="Discover great prices for popular destinations"
        isCenter={true}
      >
        Explore Best Hotels
      </Heading>
      <div className={`grid ${gridClassName} gap-3 sm:gap-3 md:gap-3`}>
        {hotalData?.map((item, i) => (
          <HotelSuggestionCard key={i} data={item} />
        ))}
      </div>
    </div>
  );
};

export default HotelSuggestion;
