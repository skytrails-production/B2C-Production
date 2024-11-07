// import axios from 'axios';
import React from "react";
import "./holidaytopcountries.scss";
import CarouselCountry from "../carouselPage/CarouselCountry";
import Heading from "../../../components/TailwindSearchComp/shared/Heading";

const HolidayTopCountries = ({
  heading = "Suggestions for countries",
  subHeading = "Popular country to recommend for you",
}) => {
  return (
    <>
      <div className={`nc-SectionSliderNewCategories custom-container mt-16 `}>
        <Heading desc={subHeading} isCenter={true}>
          {heading}
        </Heading>
        <div className="categoryMainBox">
          <div className="HoliCateHeading"></div>
          <div>
            <CarouselCountry />
          </div>
        </div>
      </div>
    </>
  );
};

export default HolidayTopCountries;
