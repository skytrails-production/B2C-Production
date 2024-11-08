import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import Heading from "../shared/Heading";
import PrevBtn from "../shared/PrevBtn";
import NextBtn from "../shared/NextBtn";
import OfferCard from "./OfferCard";
import axios from "axios";
import { apiURL } from "../../../Constants/constant";

const OfferMain = ({
  heading = "Exclusive Offers",
  subHeading = "Best Offers recommended for you",
  className = "",
  itemPerRow = 4,
  sliderStyle = "style1",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [numberOfItems, setNumberOfItems] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [filterType, setFilterType] = useState("FLIGHTS"); // New state for filtering

  const localData = sessionStorage.getItem("advertise");
  const localDataArray = JSON.parse(localData);

  useEffect(() => {
    const fetchData = async () => {
      // if (!localData) {
      try {
        const response = await axios.get(
          `${apiURL.baseURL}/skyTrails/api/user/getWebBanner`
        );
        const data = response.data.result;
        const jsonData = JSON.stringify(data);
        sessionStorage.setItem("advertise", jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      // }
    };

    fetchData();
  }, [localData]);

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
      if (currentIndex < localDataArray?.length - 1) {
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

  const filteredData = localDataArray?.filter(
    (item) => item.addType === filterType || item.addType === "FORALL"
  );

  const filterOptions = ["DEALS", "FLIGHTS", "BUS", "HOTELS", "HOLIDAYS"];

  if (!numberOfItems) return null;

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
              <AnimatePresence initial={false} custom={direction}>
                {filteredData?.map((item, indx) => (
                  <motion.li
                    className={`relative inline-block md:px-2 sm:px-2 lg:px-4 xl:px-4`}
                    custom={direction}
                    initial={{
                      x: `${(currentIndex - 1) * -100}%`,
                    }}
                    animate={{
                      x: `${currentIndex * -100}%`,
                    }}
                    key={indx}
                    style={{
                      width: `calc(1/${numberOfItems} * 100%)`,
                    }}
                  >
                    <OfferCard data={item} />
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
          </div>

          {currentIndex ? (
            <PrevBtn
              style={{ transform: "translate3d(0, 0, 0)" }}
              onClick={() => changeItemId(currentIndex - 1)}
              className="w-9 h-9 xl:w-12 xl:h-12 text-lg absolute left-3 xl:left-6 top-1/3 -translate-y-1/2 z-[1]"
            />
          ) : null}

          {filteredData?.length > currentIndex + numberOfItems ? (
            <NextBtn
              style={{ transform: "translate3d(0, 0, 0)" }}
              onClick={() => changeItemId(currentIndex + 1)}
              className="w-9 h-9 xl:w-12 xl:h-12 text-lg absolute right-3 xl:right-6 top-1/3 -translate-y-1/2 z-[1]"
            />
          ) : null}
        </div>
      </MotionConfig>
    </div>
  );
};

export default OfferMain;
