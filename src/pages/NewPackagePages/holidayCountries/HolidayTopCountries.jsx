// import axios from 'axios';
import React from "react";
import "./holidaytopcountries.scss";
import CarouselCountry from "../carouselPage/CarouselCountry";
import Heading from "../../../components/TailwindSearchComp/shared/Heading";
import { useNavigate } from "react-router-dom";

import one from "../../../images/destination/1.jpg";
import two from "../../../images/destination/2.jpg";
import three from "../../../images/destination/3.jpg";
import four from "../../../images/destination/4.jpg";
import five from "../../../images/destination/5.jpg";
import six from "../../../images/destination/7.jpg";

const HolidayTopCountries = ({
  heading = "Suggestions for countries",
  subHeading = "Popular country to recommend for you",
}) => {
  const navigate = useNavigate();

  const handlecountryClick = async (category) => {
    const queryParameter = category;
    navigate(`/holidaypackages/country/${queryParameter}`);
  };

  return (
    <>
      <div className={`nc-SectionSliderNewCategories custom-container mt-16 `}>
        <Heading desc={subHeading} isCenter={true}>
          {heading}
        </Heading>
        {/* <div className="categoryMainBox">
          <div className="HoliCateHeading"></div>
          <div>
            <CarouselCountry />
          </div>
        </div> */}
        <div class="gallery">
          <div class="flex flex-col mb-10">
            <div class="grid md:grid-cols-12 gap-8 lg:mb-11 mb-7">
              <div
                onClick={() => handlecountryClick("India")}
                className="relative cursor-pointer md:col-span-4 md:h-[304px] h-[277px] w-full rounded-3xl overflow-hidden"
              >
                <img
                  src={one}
                  alt="Gallery image"
                  className="gallery-image object-cover rounded-3xl transition-transform duration-700 ease-in-out mx-auto lg:col-span-4 md:col-span-6 w-full h-full hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-3xl flex flex-col justify-end p-4">
                  <h2 className="text-white font-semibold text-lg md:text-xl">
                    India
                  </h2>
                  {/* <p className="text-white text-sm md:text-base">
                    {localDataArray?.[0].countryName}
                  </p> */}
                </div>
              </div>

              <div
                onClick={() => handlecountryClick("Mauritius")}
                class="relative cursor-pointer md:col-span-8 md:h-[304px] h-[277px] w-full rounded-3xl"
              >
                <img
                  src={two}
                  alt="Gallery image"
                  class="gallery-image object-cover rounded-3xl hover:grayscale transition-all duration-700 ease-in-out mx-auto lg:col-span-8 md:col-span-6 w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-3xl flex flex-col justify-end p-4">
                  <h2 className="text-white font-semibold text-lg md:text-xl">
                    Mauritius
                  </h2>
                  {/* <p className="text-white text-sm md:text-base">
                    {localDataArray?.[1].countryName}
                  </p> */}
                </div>
              </div>
            </div>
            <div class="grid md:grid-cols-3 grid-cols-1 gap-8">
              <div
                onClick={() => handlecountryClick("Europe")}
                class="relative cursor-pointer h-[277px] w-full rounded-3xl"
              >
                <img
                  src={three}
                  alt="Gallery image"
                  class="gallery-image object-cover rounded-3xl hover:grayscale transition-all duration-700 ease-in-out mx-auto w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-3xl flex flex-col justify-end p-4">
                  <h2 className="text-white font-semibold text-lg md:text-xl">
                    Europe
                  </h2>
                  {/* <p className="text-white text-sm md:text-base">
                    {localDataArray?.[2].countryName}
                  </p> */}
                </div>
              </div>
              <div
                onClick={() => handlecountryClick("Dubai")}
                class="relative cursor-pointer h-[277px] w-full rounded-3xl"
              >
                <img
                  src={four}
                  alt="Gallery image"
                  class="gallery-image object-cover rounded-3xl hover:grayscale transition-all duration-700 ease-in-out mx-auto w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-3xl flex flex-col justify-end p-4">
                  <h2 className="text-white font-semibold text-lg md:text-xl">
                    Dubai
                  </h2>
                  {/* <p className="text-white text-sm md:text-base">
                    {localDataArray?.[3].countryName}
                  </p> */}
                </div>
              </div>
              <div
                onClick={() => handlecountryClick("France")}
                class=" relative cursor-pointer h-[277px] w-full rounded-3xl"
              >
                <img
                  src={five}
                  alt="Gallery image"
                  class="gallery-image object-cover rounded-3xl hover:grayscale transition-all duration-700 ease-in-out mx-auto w-full h-full"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-3xl flex flex-col justify-end p-4">
                  <h2 className="text-white font-semibold text-lg md:text-xl">
                    France
                  </h2>
                  {/* <p className="text-white text-sm md:text-base">
                    {localDataArray?.[4].countryName}
                  </p> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HolidayTopCountries;
