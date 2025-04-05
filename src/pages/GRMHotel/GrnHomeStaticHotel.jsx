import React, { useEffect, useState } from "react";
// import axios from 'axios';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import './advertise.css';
import { useNavigate } from "react-router-dom";
// import "./partner.css"
import {
  hotelActionGRN,
  clearHotelReducerGRN,
  hotelActionGRNFew,
} from "../../Redux/HotelGRN/hotel";
import { useDispatch, useSelector } from "react-redux";
import Hotelmainloading from "../Hotel/hotelLoading/Hotelmainloading";
import dayjs from "dayjs";
import Heading from "../../components/TailwindSearchComp/shared/Heading";

const GrnHomeStaticHotel = ({
  heading = "Exclusive Hotels",
  subHeading = "Best Hotels recommended for you",
  className = "",
  itemPerRow = 4,
}) => {
  const reducerState = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const localData = sessionStorage.getItem("advertise");
  const [loader, setLoader] = useState(false);
  // const [selectedData, setSelectedData] = useState([]);
  const [recentSearches, setRecentSearches] = useState(
    JSON.parse(localStorage.getItem("recentSearchesHotel")) || []
  );
  const localDataArray = [
    {
      logo: `https://raw.githubusercontent.com/The-SkyTrails/Images/main/selectHotels/1.jpg`,
      // title: "Darjeeling",
      // cityCode: "123209",
      // cityName: "Darjeeling",
      // countryCode: "IN",
      // countryName: "India",
      type: "city",
      cityName: "Darjeeling",
      grnCityCode: "123209",
      grnCountryCode: "IN",
      grnCountryName: "India",
      tboCityCode: 116264,
      tboCountryCode: "IN",
      tboCountryName: "India",
      tbostateProvince: "West Bengal",
      tbostateProvinceCode: "WB",
    },

    {
      logo: `https://raw.githubusercontent.com/The-SkyTrails/Images/main/selectHotels/2.jpg`,
      type: "city",
      cityName: "Rishikesh",
      grnCityCode: "125097",
      grnCountryCode: "IN",
      grnCountryName: "India",
      tboCityCode: 134932,
      tboCountryCode: "IN",
      tboCountryName: "India",
      tbostateProvince: "Uttarakhand",
      tbostateProvinceCode: "UK",
    },
    {
      logo: `https://raw.githubusercontent.com/The-SkyTrails/Images/main/selectHotels/3.jpg`,
      type: "city",
      cityName: "Kolkata",
      grnCityCode: "122164",
      grnCountryCode: "IN",
      grnCountryName: "India",
      tboCityCode: 113128,
      tboCountryCode: "IN",
      tboCountryName: "India",
      tbostateProvince: "West Bengal",
      tbostateProvinceCode: "WB",
    },

    {
      logo: `https://raw.githubusercontent.com/The-SkyTrails/Images/main/selectHotels/4.jpg`,
      type: "city",
      cityName: "Ajmer",
      grnCityCode: "124819",
      grnCountryCode: "IN",
      grnCountryName: "India",
      tboCityCode: 100804,
      tboCountryCode: "IN",
      tboCountryName: "India",
      tbostateProvince: "Rajasthan",
      tbostateProvinceCode: "RJ",
    },
    {
      logo: `https://raw.githubusercontent.com/The-SkyTrails/Images/main/selectHotels/5.jpg`,
      type: "city",
      cityName: "Pune",
      grnCityCode: "124649",
      grnCountryCode: "IN",
      grnCountryName: "India",
      tboCityCode: 133133,
      tboCountryCode: "IN",
      tboCountryName: "India",
      tbostateProvince: "Maharashtra",
      tbostateProvinceCode: "MH",
    },

    {
      logo: `https://raw.githubusercontent.com/The-SkyTrails/Images/main/selectHotels/6.jpg`,
      type: "city",
      cityName: "Nainital",
      grnCityCode: "123559",
      grnCountryCode: "IN",
      grnCountryName: "India",
      tboCityCode: 129726,
      tboCountryCode: "IN",
      tboCountryName: "India",
      tbostateProvince: "Uttarakhand",
      tbostateProvinceCode: "UK",
    },
    {
      logo: `https://raw.githubusercontent.com/The-SkyTrails/Images/main/selectHotels/7.jpg`,
      type: "city",
      cityName: "Bangalore",
      grnCityCode: "121850",
      grnCountryCode: "IN",
      grnCountryName: "India",
      tboCityCode: 111124,
      tboCountryCode: "IN",
      tboCountryName: "India",
      tbostateProvince: "Karnataka",
      tbostateProvinceCode: "KA",
    },
  ];

  useEffect(() => {
    dispatch(clearHotelReducerGRN());
  }, []);

  useEffect(() => {
    if (reducerState?.hotelSearchResultGRN?.isLoading == true) {
      setLoader(true);
    }
  }, [reducerState?.hotelSearchResultGRN?.isLoading]);
  useEffect(() => {
    if (
      reducerState?.hotelSearchResultGRN?.ticketData?.data?.data?.hotels
        ?.length >= 0
    ) {
      setLoader(false);
      // navigate("/GrmHotelHome/hotelsearchGRM");
    }
  }, [reducerState?.hotelSearchResultGRN?.ticketData?.data?.data?.hotels]);

  const currentDate = new Date();

  const futureDate = new Date(currentDate);
  futureDate.setDate(currentDate.getDate() + 1);

  // const nationality = {
  //   countryCode: "IN",
  //   countryCode3: "IND",
  //   countryName: "India",
  // };

  const handlePopularSearch = (param) => {
    const updatedRecentSearches = [
      param,
      ...recentSearches.filter((item) => item.cityName !== param.cityName),
    ].slice(0, 5);

    setRecentSearches(updatedRecentSearches);
    localStorage.setItem(
      "recentSearchesHotel",
      JSON.stringify(updatedRecentSearches)
    );
    sessionStorage.setItem(
      "revisithotel",
      JSON.stringify([
        {
          grnCityCode: param.grnCityCode,
          tboCityCode: param.tboCityCode,
          cityName: param.cityName,
          grnCountryCode: param.grnCountryCode,
          tboCountryCode: param.tboCountryCode,
          grnCountryName: param.grnCountryName,
          tboCountryName: param.tboCountryName,
          checkin: currentDate,
          checkout: futureDate,
          rooms: [
            {
              adults: 1,
              children_ages: [],
            },
          ],
          nationality: "IN",
        },
      ])
    );
    const payload = {
      rooms: [
        {
          adults: 1,
          children_ages: [],
        },
      ],
      rates: "concise",
      cityCode: param?.grnCityCode,
      currency: "INR",
      client_nationality: "IN",
      checkin: dayjs(currentDate).format("YYYY-MM-DD"),
      checkout: dayjs(futureDate).format("YYYY-MM-DD"),
      cutoff_time: 30000,
      version: "2.0",
      tboCityCode: param?.tboCityCode,
      EndUserIp: reducerState?.ip?.ipData,
      TokenId: reducerState?.ip?.tokenData,
    };

    sessionStorage.setItem("grnPayload", JSON.stringify(payload));
    dispatch(hotelActionGRNFew(payload));
    dispatch(hotelActionGRN(payload));
    navigate(`/st-hotel/hotelresult/${param.cityName}`);
  };

  return (
    <section class="custom-container py-14 ">
      <div class="mx-auto px-4 sm:px-6 lg:px-8 ">
        <Heading desc={subHeading} isCenter={true}>
          {heading}
        </Heading>
        <div class="gallery">
          <div class="flex flex-col mb-10">
            <div class="grid md:grid-cols-12 gap-8 lg:mb-11 mb-7">
              <div
                onClick={() => handlePopularSearch(localDataArray?.[0])}
                className="relative cursor-pointer md:col-span-4 md:h-[304px] h-[277px] w-full rounded-3xl overflow-hidden"
              >
                <img
                  src={localDataArray?.[0].logo}
                  alt="Gallery image"
                  className="gallery-image object-cover rounded-3xl transition-transform duration-700 ease-in-out mx-auto lg:col-span-4 md:col-span-6 w-full h-full hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-3xl flex flex-col justify-end p-4">
                  <h2 className="text-white font-semibold text-lg md:text-xl">
                    {localDataArray?.[0].cityName}
                  </h2>
                  <p className="text-white text-sm md:text-base">
                    {localDataArray?.[0].grnCountryName}
                  </p>
                </div>
              </div>

              <div
                onClick={() => handlePopularSearch(localDataArray?.[1])}
                class="relative cursor-pointer md:col-span-8 md:h-[304px] h-[277px] w-full rounded-3xl"
              >
                <img
                  src={localDataArray?.[1].logo}
                  alt="Gallery image"
                  class="gallery-image object-cover rounded-3xl hover:grayscale transition-all duration-700 ease-in-out mx-auto lg:col-span-8 md:col-span-6 w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-3xl flex flex-col justify-end p-4">
                  <h2 className="text-white font-semibold text-lg md:text-xl">
                    {localDataArray?.[1].cityName}
                  </h2>
                  <p className="text-white text-sm md:text-base">
                    {localDataArray?.[1].grnCountryName}
                  </p>
                </div>
              </div>
            </div>
            <div class="grid md:grid-cols-3 grid-cols-1 gap-8">
              <div
                onClick={() => handlePopularSearch(localDataArray?.[2])}
                class="relative cursor-pointer h-[277px] w-full rounded-3xl"
              >
                <img
                  src={localDataArray?.[2].logo}
                  alt="Gallery image"
                  class="gallery-image object-cover rounded-3xl hover:grayscale transition-all duration-700 ease-in-out mx-auto w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-3xl flex flex-col justify-end p-4">
                  <h2 className="text-white font-semibold text-lg md:text-xl">
                    {localDataArray?.[2].cityName}
                  </h2>
                  <p className="text-white text-sm md:text-base">
                    {localDataArray?.[2].grnCountryName}
                  </p>
                </div>
              </div>
              <div
                onClick={() => handlePopularSearch(localDataArray?.[3])}
                class="relative cursor-pointer h-[277px] w-full rounded-3xl"
              >
                <img
                  src={localDataArray?.[3].logo}
                  alt="Gallery image"
                  class="gallery-image object-cover rounded-3xl hover:grayscale transition-all duration-700 ease-in-out mx-auto w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-3xl flex flex-col justify-end p-4">
                  <h2 className="text-white font-semibold text-lg md:text-xl">
                    {localDataArray?.[3].cityName}
                  </h2>
                  <p className="text-white text-sm md:text-base">
                    {localDataArray?.[3].grnCountryName}
                  </p>
                </div>
              </div>
              <div
                onClick={() => handlePopularSearch(localDataArray?.[4])}
                class=" relative cursor-pointer h-[277px] w-full rounded-3xl"
              >
                <img
                  src={localDataArray?.[4].logo}
                  alt="Gallery image"
                  class="gallery-image object-cover rounded-3xl hover:grayscale transition-all duration-700 ease-in-out mx-auto w-full h-full"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-3xl flex flex-col justify-end p-4">
                  <h2 className="text-white font-semibold text-lg md:text-xl">
                    {localDataArray?.[4].cityName}
                  </h2>
                  <p className="text-white text-sm md:text-base">
                    {localDataArray?.[4].grnCountryName}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GrnHomeStaticHotel;
