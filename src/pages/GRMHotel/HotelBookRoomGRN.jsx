import * as React from "react";
import { useState } from "react";
import { Box } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import chevrondown from "../../images/chevrondown.svg";
import { motion } from "framer-motion";
import freeWifi from "./SVGs/freeWifi.svg";
import freeBreakfast from "./SVGs/freeBreakfast.svg";
import Bed from "./SVGs/Bed.svg";
import freeParking from "./SVGs/freeParking.svg";
import drinkingWater from "./SVGs/DrinkingWater.svg";
import expressCheckin from "./SVGs/expressCheckin.svg";
import welcomeDrink from "./SVGs/welcomeDrink.svg";
import freeGym from "./SVGs/freeGym.svg";
import Food from "./SVGs/Food.svg";
import dayjs from "dayjs";
import "react-image-gallery/styles/css/image-gallery.css";
import {
  HotelRoomSelectReqGRN,
  clearHotelRoomSelect,
} from "../../Redux/HotelGRN/hotel";
import { swalModal } from "../../utility/swal";
import { Image } from "antd";
import SkeletonBookRoom from "./Skeletons/SkeletonBookRoom";
import { Tabs } from "antd";
import { AndroidOutlined, AppleOutlined } from "@ant-design/icons";
const { TabPane } = Tabs;

const HotelBookRoomGRN = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const [showRooms, setShowRooms] = useState(10);
  const reducerState = useSelector((state) => state);
  const searchId =
    reducerState?.hotelSearchResultGRN?.ticketData?.data?.data?.search_id;

  useEffect(() => {
    dispatch(clearHotelRoomSelect());
  }, []);

  const variants = {
    initial: {
      y: 50,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const hotelinfoGRN =
    reducerState?.hotelSearchResultGRN?.hotelDetails?.data?.data?.hotel;
  const hotelMainReducer =
    reducerState?.hotelSearchResultGRN?.ticketData?.data?.data;
  const hotelGallery =
    reducerState?.hotelSearchResultGRN?.hotelGallery?.data?.data?.images
      ?.regular;

  useEffect(() => {
    if (
      reducerState?.hotelSearchResultGRN?.hotelDetails?.status === 200 &&
      reducerState?.hotelSearchResultGRN?.hotelGallery?.data?.data
    ) {
      setLoader(false);
    }
  }, [
    reducerState?.hotelSearchResultGRN?.hotelDetails?.status ||
      reducerState?.hotelSearchResultGRN?.hotelGallery?.data?.data?.images,
  ]);

  const star = (data) => {
    const stars = [];
    for (let i = 0; i < data; i++) {
      stars.push(<StarIcon key={i} style={{ color: "#FF8900" }} />);
    }
    return stars;
  };

  const [selectedRoomIndex, setSelectedRoomIndex] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState(
    hotelinfoGRN?.rates?.[selectedRoomIndex]
  );
  useEffect(() => {
    setSelectedRoom(hotelinfoGRN?.rates?.[selectedRoomIndex]);
  }, [hotelinfoGRN?.rates]);

  const handleRoomSelection = (index) => {
    setSelectedRoomIndex(index);
  };
  useEffect(() => {
    setSelectedRoom(hotelinfoGRN?.rates?.[selectedRoomIndex]);
  }, [selectedRoomIndex]);

  useEffect(() => {
    if (
      reducerState?.hotelSearchResultGRN?.hotelDetails?.data?.data?.errors
        ?.length > 0
    ) {
      swalModal("hotel", "room not found", false);
      navigate("/st-hotel/hotelresult");
    }
  }, [reducerState?.hotelSearchResultGRN?.hotelDetails?.data?.data?.errors]);

  const handleClickSaveRoom = async () => {
    const payload = {
      data: {
        rate_key: selectedRoom?.rate_key,
        group_code: selectedRoom?.group_code,
      },
      searchID: searchId,
    };
    dispatch(HotelRoomSelectReqGRN(payload));
    navigate("/st-hotel/hotelresult/selectroom/guestDetails");
  };

  // no of rooms shown

  const handleShowMore = () => {
    setShowRooms((prev) => prev + 10);
  };
  // no of rooms shown

  // console.log(reducerState, "reducer state in the book room page");
  // room component

  const renderRooms = (rooms) =>
    rooms.slice(0, showRooms).map((item, index) => (
      <div className="roomCompo" key={index}>
        <div
          className="offer_area "
          onClick={() => handleRoomSelection(index)}
          style={{
            cursor: "pointer",
            border: selectedRoomIndex === index ? "0.5px solid #e73c34" : "",
          }}
        >
            
          <div>
            <div className="insideOffer">
              <input
                className="form-check-input"
                type="checkbox"
                style={{ width: "25px", height: "25px" }}
                value=""
                checked={selectedRoomIndex === index}
                onChange={() => handleRoomSelection(index)}
              />
              <div className="inneraccorHotel">
                {item?.rooms.map((room, e) => (
                  <div className="ratePlan" key={e}>
                    <p className="insideOfferText">{room?.room_type}</p>
                  </div>
                ))}

                {item?.boarding_details?.[0] === "Room Only" ? (
                  <div className="othIncInner">
                    <div className="gap-2 d-flex justify-content-start align-items-center">
                      <img src={Bed} alt="wifi" />
                      <p style={{ fontSize: "13px", fontWeight: "600" }}>
                        Room Only
                      </p>
                    </div>
                  </div>
                ) : item?.boarding_details?.[0] === "Bed and Breakfast" ? (
                  <div className="othIncInner">
                    <div className="gap-2 d-flex justify-content-start align-items-center">
                      <img src={freeBreakfast} alt="wifi" />
                      <p style={{ fontSize: "13px", fontWeight: "600" }}>
                        Free Breakfast
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="othIncInner">
                    <div className="gap-2 d-flex justify-content-start align-items-center">
                      <img src={Food} alt="wifi" />
                      <p style={{ fontSize: "13px", fontWeight: "600" }}>
                        {item?.boarding_details?.[0]}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="othInc">
              {item?.pan_required && (
                <div className="othIncInner">
                  <div className="gap-2 d-flex justify-content-start align-items-center">
                    <p className="panDesign">Pan Required</p>
                  </div>
                </div>
              )}
              {item?.non_refundable && (
                <div className="othIncInner">
                  <div className="gap-2 d-flex justify-content-start align-items-center">
                    <p className="panDesign2">Non Refundable</p>
                  </div>
                </div>
              )}
              {item?.cancellation_policy && (
                <div className="othIncInner">
                  <div className="gap-2 d-flex justify-content-start align-items-center">
                    <p className="panDesign3">
                      Refundable (Cancel Before{" "}
                      {dayjs(item?.cancellation_policy?.cancel_by_date).format(
                        "DD MMM, YY"
                      )}
                      )
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div className="othInc">
              {item?.other_inclusions?.map((inclusion, e) => (
                <div className="othIncInner" key={e}>
                  <div className="gap-2 d-flex justify-content-start align-items-center">
                    {inclusion.toLowerCase() === "free wifi" && (
                      <>
                        <img src={freeWifi} alt="wifi" />
                        <p className="panDesign3">Free WiFi</p>
                      </>
                    )}
                    {inclusion.toLowerCase() === "free internet" && (
                      <>
                        <img src={freeWifi} alt="wifi" />
                        <p className="panDesign3">Free internet</p>
                      </>
                    )}
                    {inclusion.toLowerCase() === "free breakfast" && (
                      <>
                        <img src={freeBreakfast} alt="wifi" />
                        <p className="panDesign3">Free Breakfast</p>
                      </>
                    )}
                    {inclusion.toLowerCase() === "breakfast" && (
                      <>
                        <img src={freeBreakfast} alt="wifi" />
                        <p className="panDesign3">Breakfast</p>
                      </>
                    )}
                    {inclusion.toLowerCase() === "continental breakfast" && (
                      <>
                        <img src={freeBreakfast} alt="wifi" />
                        <p className="panDesign3">Continental breakfast</p>
                      </>
                    )}
                    {inclusion.toLowerCase() === "free self parking" && (
                      <>
                        <img src={freeParking} alt="wifi" />
                        <p className="panDesign3">Free self parking</p>
                      </>
                    )}
                    {inclusion.toLowerCase() === "parking" && (
                      <>
                        <img src={freeParking} alt="wifi" />
                        <p className="panDesign3">Free Parking</p>
                      </>
                    )}
                    {inclusion.toLowerCase() === "free parking" && (
                      <>
                        <img src={freeParking} alt="wifi" />
                        <p className="panDesign3">Free Parking</p>
                      </>
                    )}
                    {inclusion.toLowerCase() === "free valet parking" && (
                      <>
                        <img src={freeParking} alt="wifi" />
                        <p className="panDesign3">Free Valet Parking</p>
                      </>
                    )}
                    {inclusion.toLowerCase() === "drinking water" && (
                      <>
                        <img src={drinkingWater} alt="wifi" />
                        <p className="panDesign3">Drinking water</p>
                      </>
                    )}
                    {inclusion.toLowerCase() === "express check-in" && (
                      <>
                        <img src={expressCheckin} alt="wifi" />
                        <p className="panDesign3">Express check-in</p>
                      </>
                    )}
                    {inclusion.toLowerCase() === "welcome drink" && (
                      <>
                        <img src={welcomeDrink} alt="wifi" />
                        <p className="panDesign3">Welcome drink</p>
                      </>
                    )}
                    {inclusion.toLowerCase() ===
                      "free fitness center access" && (
                      <>
                        <img src={freeGym} alt="wifi" />
                        <p className="panDesign3">Free Gym</p>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="priceCheck">
            <p className="price">₹ {item?.price}</p>
            <div>
              <h3>Select Room</h3>
            </div>
          </div>
        </div>
      </div>
    ));

  // room component

  // check room category available

  const roomOnlyAvailable = hotelinfoGRN?.rates?.some((rate) =>
    rate?.boarding_details?.includes("Room Only")
  );
  const bedAndBreakfastAvailable = hotelinfoGRN?.rates?.some((rate) =>
    rate?.boarding_details?.includes("Bed and Breakfast")
  );
  const halfBoardAvailable = hotelinfoGRN?.rates?.some((rate) =>
    rate?.boarding_details?.includes("Half Board")
  );
  const fullBoardAvailable = hotelinfoGRN?.rates?.some((rate) =>
    rate?.boarding_details?.includes("Full Board")
  );

  // check room category available

  // console.log(hotelinfoGRN, "hotel info grn");

  return (
    <>
      {loader ? (
        <SkeletonBookRoom />
      ) : (
        <>
          <div className="my-4 ">
            <div className="container">
              <div className="row">
                <div className="mb-4 col-lg-12">
                  <div className="bookRoomHotDetails">
                    <div>
                      <div>
                        <p className="hotelName">{hotelinfoGRN?.name}</p>
                      </div>

                      <div>
                        <p className="text-start">
                          {" "}
                          <b>Address:</b> {hotelinfoGRN?.address}
                        </p>
                      </div>
                    </div>

                    <div className="hotelBookDesignFirst">
                      <div>
                        <Box>{star(hotelinfoGRN?.category)}</Box>
                      </div>
                      <div className="mapp">
                        <a
                          href={`https://www.google.com/maps?q=${hotelinfoGRN?.geolocation?.latitude},${hotelinfoGRN?.geolocation?.longitude}`}
                          target="_blank"
                        >
                          <svg
                            id="fi_2642502"
                            enable-background="new 0 0 512 512"
                            height="25"
                            viewBox="0 0 512 512"
                            width="30"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g>
                              <path
                                d="m307.79 223.476-53.135 78.467-78.573 78.18c-29.222-37.139-61.132-73.116-80.587-116.631l42.352-64.879 64.957-62.668c-21.71 26.831-20.089 66.293 4.864 91.246 26.696 26.696 69.968 26.696 96.663 0 1.203-1.203 2.365-2.446 3.459-3.715z"
                                fill="#ecb72b"
                              ></path>
                              <path
                                d="m309.02 222.003c21.9-26.844 20.346-66.442-4.688-91.462-26.696-26.696-69.968-26.696-96.663 0-1.121 1.121-2.189 2.27-3.215 3.445l44.811-72.847 60.795-52.809c45.407 14.374 82.964 46.379 104.648 87.977l-44.352 71.516z"
                                fill="#5085f7"
                              ></path>
                              <path
                                d="m202.802 135.949-107.312 127.549c-10.643-23.783-17.562-49.817-18.276-79.529-.054-1.689-.081-3.391-.081-5.093 0-43.718 15.685-83.789 41.746-114.861z"
                                fill="#da2f2a"
                              ></path>
                              <path
                                d="m202.802 135.949-83.926-71.939c32.816-39.125 82.06-64.01 137.126-64.01 18.845 0 37.009 2.916 54.065 8.32z"
                                fill="#4274eb"
                              ></path>
                              <path
                                d="m434.867 178.865c0-29.779-7.278-57.859-20.151-82.558l-238.64 283.826c27.113 34.488 51.887 69.985 62.183 113.454.33 1.392.685 3.019 1.063 4.848 3.733 18.086 29.63 18.086 33.363 0 .378-1.829.733-3.456 1.063-4.848 27.448-115.892 157.807-175.118 161.043-309.618.046-1.696.076-3.397.076-5.104z"
                                fill="#60a850"
                              ></path>
                            </g>
                          </svg>{" "}
                          see on map
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mb-4 col-lg-12 ">
                  <div className="row g-3">
                    <div className="col-lg-6">
                      <div
                        className="antImgGall"
                        style={{ position: "relative" }}
                      >
                        <Image width={"100%"} src={hotelGallery?.[0]?.url} />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="row g-3">
                        {hotelGallery?.slice(1, 5).map((item, index) => (
                          <div className="col-lg-6">
                            <div className=" antImgGallSmall">
                              <Image width={"100%"} src={item?.url} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row gy-4">
                <div className="col-lg-8">
                  <div className="container">
                    <div className="row">
                      <motion.div variants={variants} className="p-0 col-lg-12">
                        <div className="roomDetailsReviewDesc">
                          <div className="row">
                            <motion.div
                              variants={variants}
                              className="col-lg-4 col-4"
                            >
                              <div className="checkInReview">
                                <span>Check-In</span>
                                <p>
                                  {dayjs(hotelMainReducer?.checkin).format(
                                    "DD MMM, YY"
                                  )}
                                </p>
                                <h2>
                                  {dayjs(hotelMainReducer?.checkin).format(
                                    "dddd"
                                  )}
                                </h2>
                              </div>
                            </motion.div>
                            <motion.div
                              variants={variants}
                              className="col-lg-4 col-4"
                            >
                              <div className="checkInReview">
                                <span>Check-Out</span>
                                <p>
                                  {dayjs(hotelMainReducer?.checkout).format(
                                    "DD MMM, YY"
                                  )}
                                </p>
                                <h2>
                                  {dayjs(hotelMainReducer?.checkout).format(
                                    "dddd"
                                  )}
                                </h2>
                              </div>
                            </motion.div>
                            <motion.div
                              variants={variants}
                              className="col-lg-4 col-4"
                            >
                              <div className="checkInReview">
                                <span>
                                  {hotelMainReducer?.no_of_rooms} Room(s){" "}
                                </span>
                                <p>
                                  {hotelMainReducer?.no_of_adults} Adult(s){" "}
                                  {hotelMainReducer?.no_of_child?.length > 0
                                    ? `${hotelMainReducer?.no_of_child} Child(s)`
                                    : ""}
                                </p>
                              </div>
                            </motion.div>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                    <div className="row">
                      <div className="p-0 mt-3 col-lg-12">
                        <div className="roomDetailsReviewDesc">
                          <div
                            className="dangerousHTMLhotel"
                            dangerouslySetInnerHTML={{
                              __html: hotelinfoGRN.description,
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* guest details sectin  */}

                    <div className="row">
                      <div className="p-0 mt-3">
                        <div className="row">
                          <Tabs defaultActiveKey="1">
                            {roomOnlyAvailable && (
                              <TabPane tab="Room Only" key="1">
                                {renderRooms(
                                  hotelinfoGRN?.rates?.filter((rate) =>
                                    rate?.boarding_details?.includes(
                                      "Room Only"
                                    )
                                  )
                                )}
                              </TabPane>
                            )}
                            {bedAndBreakfastAvailable && (
                              <TabPane tab="Bed and Breakfast" key="2">
                                {renderRooms(
                                  hotelinfoGRN?.rates?.filter((rate) =>
                                    rate?.boarding_details?.includes(
                                      "Bed and Breakfast"
                                    )
                                  )
                                )}
                              </TabPane>
                            )}
                            {halfBoardAvailable && (
                              <TabPane tab="Half Board" key="4">
                                {renderRooms(
                                  hotelinfoGRN?.rates?.filter((rate) =>
                                    rate?.boarding_details?.includes(
                                      "Half Board"
                                    )
                                  )
                                )}
                              </TabPane>
                            )}
                            {fullBoardAvailable && (
                              <TabPane tab="Full Board" key="3">
                                {renderRooms(
                                  hotelinfoGRN?.rates?.filter((rate) =>
                                    rate?.boarding_details?.includes(
                                      "Full Board"
                                    )
                                  )
                                )}
                              </TabPane>
                            )}
                          </Tabs>
                        </div>
                        {hotelinfoGRN?.rates?.length > showRooms && (
                          <div className="mt-3 text-left">
                            <p
                              className="text-bold "
                              style={{ cursor: "pointer" }}
                              onClick={handleShowMore}
                            >
                              Show More Rooms
                              <svg
                                id="fi_3550091"
                                enable-background="new 0 0 1560 1560"
                                height="15"
                                viewBox="0 0 1560 1560"
                                width="20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g>
                                  <g>
                                    <g>
                                      <g>
                                        <path d="m1524 811.8h-1488c-17.7 0-32-14.3-32-32s14.3-32 32-32h1410.7l-194.2-194.2c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l248.9 248.9c9.2 9.2 11.9 22.9 6.9 34.9-5 11.9-16.7 19.7-29.6 19.7z"></path>
                                      </g>
                                      <g>
                                        <path d="m1274.8 1061c-8.2 0-16.4-3.1-22.6-9.4-12.5-12.5-12.5-32.8 0-45.3l249.2-249.2c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3l-249.2 249.2c-6.3 6.3-14.5 9.4-22.7 9.4z"></path>
                                      </g>
                                    </g>
                                  </g>
                                </g>
                              </svg>
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="col-lg-12">
                        <div className="reviewDescriptionButton">
                          <button type="submit" onClick={handleClickSaveRoom}>
                            Continue
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 ">
                  <div className="bookflightPassenger">
                    <form>
                      <div className="bookFlightPassInner">
                        <div className="bookAdultIndex">
                          <p>Amenities</p>
                        </div>
                        <div className="row g-3 ">
                          <div className="my-4 col-lg-12">
                            <div className="hotelReviewAmetnities2">
                              <div>
                                {hotelinfoGRN?.facilities
                                  ?.split(";")
                                  ?.map((item, index) => (
                                    <p key={index}>
                                      <img
                                        src={chevrondown}
                                        alt="Chevron Down"
                                      />
                                      {item.trim()}
                                    </p>
                                  ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default HotelBookRoomGRN;
