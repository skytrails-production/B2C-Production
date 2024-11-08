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
  console.log(reducerState, "reducer state in the hotel static");

  const localDataArray = [
    {
      logo: `https://raw.githubusercontent.com/The-SkyTrails/Images/main/selectHotels/1.jpg`,
      title: "Darjeeling",
      cityCode: "123209",
      cityName: "Darjeeling",
      countryCode: "IN",
      countryName: "India",
    },

    {
      logo: `https://raw.githubusercontent.com/The-SkyTrails/Images/main/selectHotels/2.jpg`,
      title: "Rishikesh",
      cityCode: "125097",
      cityName: "Rishikesh",
      countryCode: "IN",
      countryName: "India",
    },
    {
      logo: `https://raw.githubusercontent.com/The-SkyTrails/Images/main/selectHotels/3.jpg`,
      title: "Kolkata",
      cityCode: "122164",
      cityName: "Kolkata",
      countryCode: "IN",
      countryName: "India",
    },

    {
      logo: `https://raw.githubusercontent.com/The-SkyTrails/Images/main/selectHotels/4.jpg`,
      title: "Ajmer",
      cityCode: "124819",
      cityName: "Ajmer",
      countryCode: "IN",
      countryName: "India",
    },
    {
      logo: `https://raw.githubusercontent.com/The-SkyTrails/Images/main/selectHotels/5.jpg`,
      title: "Pune",
      cityCode: "124649",
      cityName: "Pune",
      countryCode: "IN",
      countryName: "India",
    },

    {
      logo: `https://raw.githubusercontent.com/The-SkyTrails/Images/main/selectHotels/6.jpg`,
      title: "Nainital",
      cityCode: "123559",
      cityName: "Nainital",
      countryCode: "IN",
      countryName: "India",
    },
    {
      logo: `https://raw.githubusercontent.com/The-SkyTrails/Images/main/selectHotels/7.jpg`,
      title: "Bangalore",
      cityCode: "121850",
      cityName: "Bangalore",
      countryCode: "IN",
      countryName: "India",
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

  const nationality = {
    countryCode: "IN",
    countryCode3: "IND",
    countryName: "India",
  };

  const handlePopularSearch = (param) => {
    sessionStorage.setItem(
      "revisithotel",
      JSON.stringify([
        {
          cityCode: param?.cityCode,
          cityName: param?.cityName,
          countryCode: param?.countryCode,
          countryName: param?.countryName,
          checkin: currentDate,
          checkout: futureDate,
          rooms: [
            {
              adults: 1,
              children_ages: [],
            },
          ],
          nationality: nationality,
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
      cityCode: param?.cityCode,
      currency: "INR",
      client_nationality: "IN",
      checkin: dayjs(currentDate).format("YYYY-MM-DD"),
      checkout: dayjs(futureDate).format("YYYY-MM-DD"),
      cutoff_time: 30000,
      version: "2.0",
    };

    const pageNumber = 1;

    sessionStorage.setItem("grnPayload", JSON.stringify(payload));

    dispatch(hotelActionGRN(payload, pageNumber));
    navigate("/st-hotel/hotelresult");
  };

  return (
    <section class="custom-container py-24 ">
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
                    {localDataArray?.[0].title}
                  </h2>
                  <p className="text-white text-sm md:text-base">
                    {localDataArray?.[0].countryName}
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
                    {localDataArray?.[1].title}
                  </h2>
                  <p className="text-white text-sm md:text-base">
                    {localDataArray?.[1].countryName}
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
                    {localDataArray?.[2].title}
                  </h2>
                  <p className="text-white text-sm md:text-base">
                    {localDataArray?.[2].countryName}
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
                    {localDataArray?.[3].title}
                  </h2>
                  <p className="text-white text-sm md:text-base">
                    {localDataArray?.[3].countryName}
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
                    {localDataArray?.[4].title}
                  </h2>
                  <p className="text-white text-sm md:text-base">
                    {localDataArray?.[4].countryName}
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
