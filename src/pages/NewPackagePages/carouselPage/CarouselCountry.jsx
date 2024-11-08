import React, { useState, useEffect, useRef } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Img from "../../../LazyLoading/Img";
import one from "../../../images/destination/1.jpg";
import two from "../../../images/destination/2.jpg";
import three from "../../../images/destination/3.jpg";
import four from "../../../images/destination/4.jpg";
import five from "../../../images/destination/5.jpg";
import six from "../../../images/destination/7.jpg";
import "./carouselcountry.scss";

const CarouselCountry = ({ data }) => {
  const carouselContainer = useRef();
  const navigate = useNavigate();

  const navigation = (dir) => {
    const container = carouselContainer.current;

    const scrollAmount =
      dir === "left"
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20);

    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  // console.log(data, "data")

  const handlecountryClick = async (category) => {
    const queryParameter = category;
    navigate(`/holidaypackages/country/${queryParameter}`);
  };

  // const

  return (
    <div className="position-relative">
      <div className="carouselTopCountries">
        <BsFillArrowLeftCircleFill
          className="carouselLeftNav arrow"
          onClick={() => navigation("left")}
        />
        <BsFillArrowRightCircleFill
          className="carouselRighttNav arrow"
          onClick={() => navigation("right")}
        />

        <div className="carouselItems" ref={carouselContainer}>
          <div
            className="carouselItem"
            onClick={() => handlecountryClick("India")}
          >
            <div className="posterBlock">
              <Img src={one} />
            </div>
            <div className="textBlock">
              <span className="titleHoliCat">India</span>
            </div>
          </div>
          <div
            className="carouselItem"
            onClick={() => handlecountryClick("Mauritius")}
          >
            <div className="posterBlock">
              <Img src={two} />
            </div>
            <div className="textBlock">
              <span className="titleHoliCat">Mauritius</span>
            </div>
          </div>
          <div
            className="carouselItem"
            onClick={() => handlecountryClick("Europe")}
          >
            <div className="posterBlock">
              <Img src={three} />
            </div>
            <div className="textBlock">
              <span className="titleHoliCat">Europe</span>
            </div>
          </div>
          <div
            className="carouselItem"
            onClick={() => handlecountryClick("Dubai")}
          >
            <div className="posterBlock">
              <Img src={four} />
            </div>
            <div className="textBlock">
              <span className="titleHoliCat">Dubai</span>
            </div>
          </div>
          <div
            className="carouselItem"
            onClick={() => handlecountryClick("France")}
          >
            <div className="posterBlock">
              <Img src={five} />
            </div>
            <div className="textBlock">
              <span className="titleHoliCat">France</span>
            </div>
          </div>
          <div
            className="carouselItem"
            onClick={() => handlecountryClick("Canada")}
          >
            <div className="posterBlock">
              <Img src={six} />
            </div>
            <div className="textBlock">
              <span className="titleHoliCat">Canada</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarouselCountry;
