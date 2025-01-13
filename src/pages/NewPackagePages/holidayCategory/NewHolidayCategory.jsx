import axios from "axios";
import React, { useEffect, useState } from "react";
import "./newcategory.scss";
import { apiURL } from "../../../Constants/constant";
import Img from "../../../LazyLoading/Img";
import { useNavigate } from "react-router-dom";
import Heading from "../../../components/TailwindSearchComp/shared/Heading";
import PackageResultCard from "../HolidayPackageSearchResult/PackageResultCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../../../../node_modules/swiper/swiper-bundle.min.css";

const SkeletonLoader = () => {
  return (
    <div className="relative flex flex-shrink-0 w-full h-64 space-x-4 overflow-hidden bg-gray-200 animate-pulse aspect-w-5 aspect-h-5 sm:aspect-h-6 rounded-2xl group"></div>
  );
};

const NewHolidayCategory = ({
  heading = "Pick Your Category",
  subHeading = "Category wise recommendation for you",
  className = "",
}) => {
  const [packageData, setPackageData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const packageAvailable = sessionStorage.getItem("packageAvailable");

    if (packageAvailable) {
      const storedData = JSON.parse(packageAvailable);
      setPackageData(storedData);
      setLoading(false);
    } else {
      const getPackage = async () => {
        try {
          const response = await axios.get(
            `${apiURL.baseURL}/skytrails/holidaypackage/categoryfilter`
          );
          if (response.data.statusCode === 200) {
            setPackageData(response.data.data);
            sessionStorage.setItem(
              "packageAvailable",
              JSON.stringify(response.data.data)
            );
          } else {
            console.log("packageError", response);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setTimeout(() => {
            setLoading(false);
          }, 3000); // Timeout for 3 seconds
        }
      };
      getPackage();
    }
  }, []);

  const handleFormClicks = (e) => {
    navigate(`/holidaypackages/category/${e}`);
  };

  return (
    <div className={`nc-SectionSliderNewCategories mt-16 mb-12 ${className}`}>
      <Heading desc={subHeading} isCenter={true}>
        {heading}
      </Heading>
      {packageData.map((category, index) => (
        <div
          key={index}
          className="custom-container paddHotCategory my-5"
          style={{ backgroundColor: `${category.colorCode}` }}
        >
          <div className="categoryMainBox">
            <div className="HoliCateHeading">
              <div>
                <Img src={category.Icon} />
                <h5 style={{ color: `${category.headingCode}` }}>
                  {category.inclusion}
                </h5>
              </div>
              <p
                style={{ cursor: "pointer" }}
                onClick={() => handleFormClicks(category.inclusion)}
              >
                See All
              </p>
            </div>

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
                  {category?.result?.map((item, indx) => (
                    <SwiperSlide key={indx}>
                      <PackageResultCard data={item} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>

            <div></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewHolidayCategory;
