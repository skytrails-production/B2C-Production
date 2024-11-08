import axios from "axios";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import "./newcategory.scss";
import { apiURL } from "../../../Constants/constant";
import CarouselCategory from "../carouselPage/CarouselCategory";
import Img from "../../../LazyLoading/Img";
import { useNavigate } from "react-router-dom";
import HolidayCategorySkeleton from "./HolidayCategorySkeleton";

import PackageResultCards from "../HolidayPackageSearchResult/PackageResultCards";
import PrevBtn from "../../../components/TailwindSearchComp/shared/PrevBtn";
import NextBtn from "../../../components/TailwindSearchComp/shared/NextBtn";

const SkeletonLoader = () => {
  return (
    <div className="relative flex flex-shrink-0 w-full h-64 space-x-4 overflow-hidden bg-gray-200 animate-pulse aspect-w-5 aspect-h-5 sm:aspect-h-6 rounded-2xl group"></div>
  );
};

const NewHolidayCategory = ({ itemPerRow = 3 }) => {
  const [packageData, setPackageData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [numberOfItems, setNumberOfItems] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
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
            `${apiURL.baseURL}/skyTrails/api/packages/packagesCategory`
          );
          if (response.data.statusCode === 200) {
            setPackageData(response.data.results);
            sessionStorage.setItem(
              "packageAvailable",
              JSON.stringify(response.data.results)
            );
            // console.log('packagelist', response);
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
      setNumberOfItems(itemPerRow - 2);
    } else if (windowWidth < 1024) {
      setNumberOfItems(itemPerRow - 1);
    } else if (windowWidth < 1280) {
      setNumberOfItems(itemPerRow);
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

  // if (loading) {
  //   return <HolidayCategorySkeleton />;
  // }

  if (!numberOfItems) return null;

  return (
    <>
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
                    className="relative p-0 -mx-2 whitespace-nowrap xl:-mx-4"
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
                        {category?.result?.docs?.map((item, indx) => (
                          <motion.li
                            className={`relative inline-block sm:px-2 md:px-2 lg:px-4 xl:px-4`}
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
                            {/* <CardOne data={item} /> */}
                            <PackageResultCards data={item} />
                          </motion.li>
                        ))}
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

                {packageData?.[0]?.result?.docs?.length >
                currentIndex + numberOfItems ? (
                  <NextBtn
                    style={{ transform: "translate3d(0, 0, 0)" }}
                    onClick={() => changeItemId(currentIndex + 1)}
                    className="w-9 h-9 xl:w-12 xl:h-12 text-lg absolute -right-3 xl:-right-6 top-1/3 -translate-y-1/2 z-[1]"
                  />
                ) : null}
              </div>
            </MotionConfig>

            <div>
              {/* <CarouselCategory data={category} /> */}

              {/* {category?.result?.docs?.map((item, index) => {
                return <PackageResultCards data={item} />;
              })} */}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default NewHolidayCategory;
