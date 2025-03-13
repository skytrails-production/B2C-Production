import React, { useEffect, useState } from "react";
import Heading from "../shared/Heading";
import { apiURL } from "../../../Constants/constant";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../../../../node_modules/swiper/swiper-bundle.min.css";
import PackageResultCard from "../../../pages/NewPackagePages/HolidayPackageSearchResult/PackageResultCard";
const SkeletonLoader = () => {
  return (
    <div className="relative flex flex-shrink-0 w-full h-64 space-x-4 overflow-hidden bg-gray-200 animate-pulse aspect-w-5 aspect-h-5 sm:aspect-h-6 rounded-2xl group"></div>
  );
};

const TrendingPackageHome = ({
  heading = "Suggestions for discovery",
  subHeading = "Popular places to recommend for you",
  className = "",
  itemPerRow = 3,
  sliderStyle = "style1",
}) => {
  const [loading, setLoading] = useState(true);

  const [packageData, setPackageData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${apiURL.baseURL}/skytrails/holidaypackage/latestpackages`
      );
      const result = await response.json();
      setPackageData(result.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div
      className={`nc-SectionSliderNewCategories custom-container mt-24 ${className}`}
    >
      <Heading desc={subHeading} isCenter={sliderStyle === "style2"}>
        {heading}
      </Heading>

      <div class="swiper favSwiper-active mt-2">
        <div class="swiper-wrapper  relative">
          <div className="custom-navigation">
            <button className="custom-prev">
              <div className="h-6 w-6 flex justify-center items-center">
                <i className="fa fa-chevron-left"></i>
              </div>
            </button>
            <button className=" custom-next">
              <div className="h-6 w-6 flex justify-center items-center">
                <i className="fa fa-chevron-right"></i>
              </div>
            </button>
          </div>
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            loop={true}
            spaceBetween={25}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 2,
              },
              1280: {
                slidesPerView: 2,
              },
              1280: {
                slidesPerView: 3,
              },
              0: {
                slidesPerView: 1,
              },
            }}
            // autoplay={{
            //   delay: 3000,
            //   disableOnInteraction: false,
            // }}
            navigation={{
              prevEl: ".custom-prev",
              nextEl: ".custom-next",
            }}
          >
            {packageData?.map((item, indx) => (
              <SwiperSlide>
                <PackageResultCard data={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default TrendingPackageHome;
