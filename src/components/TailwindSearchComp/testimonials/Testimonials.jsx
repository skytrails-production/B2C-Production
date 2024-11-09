import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import { apiURL } from "../../../Constants/constant";

import CardOne from "./CardOne";
import Heading from "../shared/Heading";
import PrevBtn from "../shared/PrevBtn";
import NextBtn from "../shared/NextBtn";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { PiAirplaneInFlight } from "react-icons/pi";
import { LiaHotelSolid } from "react-icons/lia";
import { IoBusOutline } from "react-icons/io5";
import { FaUmbrellaBeach } from "react-icons/fa";

const SkeletonLoader = () => {
  return (
    <div className="flex bg-gray-200 animate-pulse space-x-4 flex-shrink-0 relative w-full aspect-w-5 aspect-h-5 sm:aspect-h-6 h-64 rounded-2xl overflow-hidden group"></div>
  );
};

const Testimonials = ({
  heading = "Testimonials",
  subHeading = "What our happy user says!",
  className = "",
  itemPerRow = 3,
  sliderStyle = "style1",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [numberOfItems, setNumberOfItems] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState(""); // State to hold the value
  const [icon, setIcon] = useState(""); // State to hold the value
  const [rating, setRating] = useState([]); // State to hold the value
  const Rating = useSelector((state) => state?.faqRating?.faqRating?.rating);
  const location = useLocation(); // Access the location object

  // Extract the pathname, search, and state
  const { pathname } = location;
  const [packageData, setPackageData] = useState([1, 2, 3, 4, 5]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${apiURL.baseURL}/skyTrails/api/user/getFaqRating`
      );
      const result = await response.json();
      //   setPackageData(result.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    // fetchData();
    if (Rating) {
      setLoading(false);
    }
  }, [Rating]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (windowWidth < 320) {
      setNumberOfItems(1);
    } else if (windowWidth < 500) {
      setNumberOfItems(itemPerRow - 3);
    } else if (windowWidth < 1024) {
      setNumberOfItems(itemPerRow - 2);
    } else if (windowWidth < 1280) {
      setNumberOfItems(itemPerRow - 1);
    } else {
      setNumberOfItems(itemPerRow);
    }
  }, [itemPerRow, windowWidth]);

  function changeItemId(newVal) {
    if (newVal > currentIndex) {
      setDirection(1);
    } else {
      setDirection(-1);
    }
    setCurrentIndex(newVal);
  }

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (currentIndex < packageData.length - 1) {
        changeItemId(currentIndex + 1);
      }
    },
    onSwipedRight: () => {
      if (currentIndex > 0) {
        changeItemId(currentIndex - 1);
      }
    },
    trackMouse: true,
  });

  // Effect that updates the title based on the current pathname
  useEffect(() => {
    switch (pathname) {
      case "/":
        setTitle("FLIGHTS");
        setIcon(<PiAirplaneInFlight />);
        // setTitle("flight");
        break;
      case "/st-hotel":
        setTitle("HOTELS");
        setIcon(<LiaHotelSolid />);
        break;
      case "/bus":
        setTitle("BUSES");
        setIcon(<IoBusOutline />);
        break;
      case "/holidaypackages":
        setTitle("HOLIDAYPACKAGE");
        setIcon(<FaUmbrellaBeach />);
        break;
      default:
        setTitle("FLIGHTS");
        setIcon(<PiAirplaneInFlight />);
        break;
    }
  }, [pathname]);
  useEffect(() => {
    if (Rating?.length > 0 && title) {
      let newRating = Rating?.filter((item) => {
        console.log(title, item, "title, item.section");
        return title === item?.section;
      });
      setRating(newRating);
    }
  }, [Rating, title]);
  if (!numberOfItems) return null;
  // console.log(Rating, rating, title, "Ratings");
  return (
    <div
      className={`nc-SectionSliderNewCategories custom-container mt-16 ${className}`}
    >
      <Heading desc={subHeading} isCenter={true}>
        {heading}
      </Heading>

      <MotionConfig
        transition={{
          x: { type: "spring", stiffness: 300, damping: 30 },
          opacity: { duration: 0.2 },
        }}
      >
        <div className="relative flow-root" {...handlers}>
          <div className="flow-root overflow-hidden rounded-xl">
            <motion.ul
              initial={false}
              className="relative whitespace-nowrap p-0 -mx-2 xl:-mx-4"
            >
              {loading ? (
                Array.from({ length: 6 }).map((_, index) => (
                  <motion.li
                    className={`relative inline-block sm:px-2 md:px-2 lg:px-4 xl:px-4`}
                    custom={direction}
                    initial={{
                      x: `${(currentIndex - 1) * -100}%`,
                    }}
                    animate={{
                      x: `${currentIndex * -100}%`,
                    }}
                    key={index}
                    style={{
                      width: `calc(1/${numberOfItems} * 100%)`,
                    }}
                  >
                    <SkeletonLoader key={index} />
                  </motion.li>
                ))
              ) : (
                <AnimatePresence initial={false} custom={direction}>
                  {rating?.map((item, index) => {
                    return (
                      <motion.li
                        className={`relative inline-block sm:px-2 md:px-2 lg:px-4 xl:px-4`}
                        custom={direction}
                        initial={{
                          x: `${(currentIndex - 1) * -100}%`,
                        }}
                        animate={{
                          x: `${currentIndex * -100}%`,
                        }}
                        key={index}
                        style={{
                          width: `calc(1/${numberOfItems} * 100%)`,
                        }}
                      >
                        {/* <CardOne data={item} /> */}
                        <CardOne item={item} icon={icon} index={index} />
                      </motion.li>
                    );
                  })}
                </AnimatePresence>
              )}
            </motion.ul>
          </div>

          {currentIndex ? (
            <PrevBtn
              style={{ transform: "translate3d(0, 0, 0)" }}
              onClick={() => changeItemId(currentIndex - 1)}
              className="w-9 h-9 xl:w-12 xl:h-12 text-lg absolute -left-3 xl:-left-6 top-1/3 -translate-y-1/2 z-[1]"
            />
          ) : null}

          {packageData.length > currentIndex + numberOfItems ? (
            <NextBtn
              style={{ transform: "translate3d(0, 0, 0)" }}
              onClick={() => changeItemId(currentIndex + 1)}
              className="w-9 h-9 xl:w-12 xl:h-12 text-lg absolute -right-3 xl:-right-6 top-1/3 -translate-y-1/2 z-[1]"
            />
          ) : null}
        </div>
      </MotionConfig>
    </div>
  );
};

export default Testimonials;
