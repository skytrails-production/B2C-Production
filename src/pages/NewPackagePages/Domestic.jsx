import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../../../node_modules/swiper/swiper-bundle.min.css";
import { useNavigate } from "react-router-dom";
import Heading from "../../components/TailwindSearchComp/shared/Heading";
import { apiURL } from "../../Constants/constant";
import DomesticCard from "./DomesticCard";

const Domestic = ({
  heading = "Handpicked Packages for you",
  subHeading = "Best Offers recommended for you",
  className = "",
  itemPerRow = 5,
  active,
  sliderStyle = "style1",
}) => {
  const [filterType, setFilterType] = useState("DOMESTIC");

  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${apiURL.baseURL}/skyTrails/api/packages/specialcity`
        );
        setData(response?.data?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const filteredData = data?.filter((item) => {
    if (filterType === "DOMESTIC") {
      return item.country.toLowerCase() === "india";
    } else if (filterType === "INTERNATIONAL") {
      return item.country.toLowerCase() !== "india";
    }
  });

  const filterOptions = ["DOMESTIC", "INTERNATIONAL"];

  // console.log(filteredData, "filtered data");

  return (
    <div className={`nc-SectionSliderNewCategories mt-16 mb-12 ${className}`}>
      <Heading desc={subHeading} isCenter={true}>
        {heading}
      </Heading>

      {/* Filter Buttons */}
      <div className="flex justify-center space-x-4 mb-4">
        {filterOptions.map((type) => (
          <button
            key={type}
            className={`px-4 py-2 font-semibold ${
              filterType === type
                ? "bg-primary-6000 hover:bg-primary-700 text-white border rounded-3xl "
                : " text-black"
            }`}
            onClick={() => setFilterType(type)}
          >
            {type.charAt(0) + type.slice(1).toLowerCase()}
          </button>
        ))}
      </div>
      <div className="custom-container">
        <div class="swiper favSwiper-active mt-5">
          <div class="swiper-wrapper  relative">
            <Swiper
              modules={[Autoplay, Pagination, Navigation]}
              loop={true}
              spaceBetween={25}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 4,
                },
                1024: {
                  slidesPerView: 4,
                },
                0: {
                  slidesPerView: 1,
                },
              }}
              // autoplay={{
              //   delay: 3000,
              //   disableOnInteraction: false,
              // }}
              navigation={true}
            >
              {filteredData?.map((item, indx) => (
                <SwiperSlide>
                  <DomesticCard data={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Domestic;
