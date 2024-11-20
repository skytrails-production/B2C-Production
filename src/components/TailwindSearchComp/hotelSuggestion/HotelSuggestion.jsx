import React from "react";

import Heading from "../shared/Heading";
import HotelSuggestionCard from "./HotelSuggestionCard";
import { useSelector } from "react-redux";

const hotels = [
  {
    id: 1,
    tag: "Hotels, Budget Hotels, 3 Star Hotels, 4 Star Hotels, 5 Star Hotels",
    imgages:
      "https://images.pexels.com/photos/29183751/pexels-photo-29183751/free-photo-of-vidhana-soudha-in-bangalore-black-and-white.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    Location: {
      cityName: "Bangalore",
      tboCityCode: 111124,
      tboCountryName: "India",
      tboCountryCode: "IN",
      tbostateProvince: "DELHI",
      tbostateProvinceCode: "DL",
      grnCityCode: 121850,
      grnCountryName: "India",
      grnCountryCode: "IN",
    },
  },

  {
    id: 2,
    tag: "Hotels, Budget Hotels, 3 Star Hotels, 4 Star Hotels, 5 Star Hotels",
    imgages:
      "https://images.pexels.com/photos/2007660/pexels-photo-2007660.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    Location: {
      cityName: "Chandigarh",
      tboCityCode: 114107,
      tboCountryName: "India",
      tboCountryCode: "IN",
      tbostateProvince: "Chandigarh",
      tbostateProvinceCode: "CH",
      grnCityCode: 122959,
      grnCountryName: "India",
      grnCountryCode: "IN",
    },
  },
  {
    id: 3,
    tag: "Hotels, Budget Hotels, 3 Star Hotels, 4 Star Hotels, 5 Star Hotels",
    imgages:
      "https://images.pexels.com/photos/2588193/pexels-photo-2588193.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    Location: {
      cityName: "Jaipur",
      tboCityCode: 122175,
      tboCountryName: "India",
      tboCountryCode: "IN",
      tbostateProvince: "Rajasthan",
      tbostateProvinceCode: "RJ",
      grnCityCode: 122730,
      grnCountryName: "India",
      grnCountryCode: "IN",
    },
  },
  {
    id: 4,
    tag: "Hotels, Budget Hotels, 3 Star Hotels, 4 Star Hotels, 5 Star Hotels",
    imgages:
      "https://images.pexels.com/photos/4429333/pexels-photo-4429333.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    Location: {
      cityName: "Goa",
      tboCityCode: 119805,
      tboCountryName: "India",
      tboCountryCode: "IN",
      tbostateProvince: "Goa",
      tbostateProvinceCode: "GA",
      grnCityCode: 123318,
      grnCountryName: "India",
      grnCountryCode: "IN",
    },
  },

  {
    id: 5,
    tag: "Hotels, Budget Hotels, 3 Star Hotels, 4 Star Hotels, 5 Star Hotels",
    imgages:
      "https://images.pexels.com/photos/3568310/pexels-photo-3568310.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    Location: {
      cityName: "Lucknow",
      tboCityCode: 126666,
      tboCountryName: "India",
      tboCountryCode: "IN",
      tbostateProvince: "Uttar Pradesh",
      tbostateProvinceCode: "UP",
      grnCityCode: 122400,
      grnCountryName: "India",
      grnCountryCode: "IN",
    },
  },
  {
    id: 6,
    tag: "Hotels, Budget Hotels, 3 Star Hotels, 4 Star Hotels, 5 Star Hotels",
    imgages:
      "https://images.pexels.com/photos/29226221/pexels-photo-29226221/free-photo-of-taj-mahal-palace-hotel-at-night-in-mumbai.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    Location: {
      cityName: "Mumbai",
      tboCityCode: 144306,
      tboCountryName: "India",
      tboCountryCode: "IN",
      tbostateProvince: "Maharashtra",
      tbostateProvinceCode: "MH",
      grnCityCode: 103863,
      grnCountryName: "India",
      grnCountryCode: "IN",
    },
  },
  {
    id: 7,
    tag: "Hotels, Budget Hotels, 3 Star Hotels, 4 Star Hotels, 5 Star Hotels",
    imgages:
      "https://images.pexels.com/photos/3574440/pexels-photo-3574440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    Location: {
      cityName: "Shimla",
      tboCityCode: 138673,
      tboCountryName: "India",
      tboCountryCode: "IN",
      tbostateProvince: "Himachal Pradesh",
      tbostateProvinceCode: "HP",
      grnCityCode: 121267,
      grnCountryName: "India",
      grnCountryCode: "IN",
    },
  },
  {
    id: 8,
    tag: "Hotels, Budget Hotels, 3 Star Hotels, 4 Star Hotels, 5 Star Hotels",
    imgages:
      "https://images.pexels.com/photos/8112558/pexels-photo-8112558.jpeg",
    Location: {
      cityName: "Varanasi",
      tboCityCode: 141618,
      tboCountryName: "India",
      tboCountryCode: "IN",
      tbostateProvince: "Uttar Pradesh",
      tbostateProvinceCode: "UP",
      grnCityCode: 121451,
      grnCountryName: "India",
      grnCountryCode: "IN",
    },
  },
  {
    id: 9,
    tag: "Hotels, Budget Hotels, 3 Star Hotels, 4 Star Hotels, 5 Star Hotels",
    imgages:
      "https://images.pexels.com/photos/20035531/pexels-photo-20035531/free-photo-of-elderly-woman-exercising-on-a-yoga-mat-spread-out-on-the-riverbank-near-the-hindu-temple.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    Location: {
      cityName: "Rishikesh",
      tboCityCode: 134932,
      tboCountryName: "India",
      tboCountryCode: "IN",
      tbostateProvince: "Uttarakhand",
      tbostateProvinceCode: "UK",
      grnCityCode: 125097,
      grnCountryName: "India",
      grnCountryCode: "IN",
    },
  },
  {
    id: 10,
    tag: "Hotels, Budget Hotels, 3 Star Hotels, 4 Star Hotels, 5 Star Hotels",
    imgages:
      "https://images.pexels.com/photos/2443872/pexels-photo-2443872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    Location: {
      cityName: "Nainital",
      tboCityCode: 129726,
      tboCountryName: "India",
      tboCountryCode: "IN",
      tbostateProvince: "Uttarakhand",
      tbostateProvinceCode: "UK",
      grnCityCode: 123559,
      grnCountryName: "India",
      grnCountryCode: "IN",
    },
  },
  {
    id: 11,
    tag: "Hotels, Budget Hotels, 3 Star Hotels, 4 Star Hotels, 5 Star Hotels",
    imgages:
      "https://images.pexels.com/photos/797824/pexels-photo-797824.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    Location: {
      cityName: "Jodhpur",
      tboCityCode: 145836,
      tboCountryName: "India",
      tboCountryCode: "IN",
      tbostateProvince: "Rajasthan",
      tbostateProvinceCode: "RJ",
      grnCityCode: 123257,
      grnCountryName: "India",
      grnCountryCode: "IN",
    },
  },
  {
    id: 12,
    tag: "Hotels, Budget Hotels, 3 Star Hotels, 4 Star Hotels, 5 Star Hotels",
    imgages:
      "https://images.pexels.com/photos/6780256/pexels-photo-6780256.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    Location: {
      cityName: "Gulmarg",
      tboCityCode: 119924,
      tboCountryName: "India",
      tboCountryCode: "IN",
      tbostateProvince: "Jammu and Kashmir",
      tbostateProvinceCode: "JK",
      grnCityCode: 128550,
      grnCountryName: "India",
      grnCountryCode: "IN",
    },
  },
];

const HotelSuggestion = ({
  categories = hotels,
  headingCenter = true,
  className = "",
  gridClassName = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
}) => {
  const reducerState= useSelector((state) => state);
  const hotalData=reducerState?.flightSuggested?.flightHotalSuggeated?.hotelPayloadResult
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
        {hotalData.map((item, i) => (
          <HotelSuggestionCard key={i} data={item} />
        ))}
      </div>
    </div>
  );
};

export default HotelSuggestion;
