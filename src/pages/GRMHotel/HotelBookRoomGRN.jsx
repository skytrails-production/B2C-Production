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
// import { Image } from "antd";
import SkeletonBookRoom from "./Skeletons/SkeletonBookRoom";
import { Button, Tabs } from "antd";
import { AndroidOutlined, AppleOutlined } from "@ant-design/icons";
import Img from "../../LazyLoading/Img";
import "./hotelBookRoomGrn.scss"
import HotelGalleryCarousel from "./HotelGalleryCarousel";
const { TabPane } = Tabs;

const HotelBookRoomGRN = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const [showRooms, setShowRooms] = useState(10);
  const reducerState = useSelector((state) => state);
  const searchId =
    reducerState?.hotelSearchResultGRN?.hotelDetails?.data?.data?.search_id;

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
  const [selectedTabKey, setSelectedTabKey] = useState("1");
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showSelectRoomButton, setShowSelectRoomButton] = useState(true);

  useEffect(() => {
    const initialRoom = hotelinfoGRN?.rates?.filter((rate) =>
      rate?.boarding_details?.includes(getBoardingType(selectedTabKey))
    )[0];
    setSelectedRoom(initialRoom);
  }, [hotelinfoGRN?.rates, selectedTabKey]);

  const getBoardingType = (tabKey) => {
    switch (tabKey) {
      case "1":
        return "Room Only";
      case "2":
        return "Bed and Breakfast";
      case "3":
        return "Full Board";
      case "4":
        return "Half Board";
      default:
        return "";
    }
  };

  const handleTabChange = (key) => {
    setSelectedTabKey(key);
    setSelectedRoomIndex(0);
  };

  const handleRoomSelection = (index, room) => {
    setSelectedRoomIndex(index);
    setSelectedRoom(room);
    setShowSelectRoomButton(false)
  };

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

  const handleShowMore = () => {
    setShowRooms((prev) => prev + 10);
  };

  const renderRooms = (rooms) =>
    rooms.slice(0, showRooms).map((item, index) => (
      <div className="roomComponent" key={index}>
        <div
          className="roomCompCardInner"
          onClick={() => handleRoomSelection(index, item)}
          style={{
            cursor: "pointer",
            border: selectedRoomIndex === index ? "0.5px solid #e73c34" : "",
          }}
        >
          <div>
            <div className="insideRoomComp">
              <input
                className="form-check-input"
                type="checkbox"
                style={{ width: "25px", height: "25px" }}
                value=""
                checked={selectedRoomIndex === index}
                onChange={() => handleRoomSelection(index, item)}
              />
              <div className="hotelTitleComp">
                {item?.rooms.map((room, e) => (
                  <div className="" key={e}>
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

  return (
    <>
      {loader ? (
        <SkeletonBookRoom />
      ) : (
        <>
          <div className="my-4">
            <div className="container hotelBookRoomMain">
              <div className="row">
                <HotelGalleryCarousel data={hotelGallery} />


              </div>
              <div className="row gy-4">
                <div className="col-lg-8">
                  <div className="container">
                    <div className="row">

                      <div className="mb-4 col-lg-12 p-0">
                        <div className="roomNameAndCategory">
                          <div >
                            <h5 className="HotelRoomHeadings">{hotelinfoGRN?.name}</h5>
                          </div>

                          <div className="hotelBookDesignFirst">

                            <div>
                              <StarIcon style={{ color: "#FF8900" }} />  {hotelinfoGRN?.category}
                            </div>

                            <div className="">
                              <a
                                href={`https://www.google.com/maps?q=${hotelinfoGRN?.geolocation?.latitude},${hotelinfoGRN?.geolocation?.longitude}`}
                                target="_blank"
                              >
                                <svg id="fi_2838912" enable-background="new 0 0 512 512" height="15" viewBox="0 0 512 512" width="20" xmlns="http://www.w3.org/2000/svg"><g><path d="m243.519 505.32c2.782 4.173 7.466 6.68 12.481 6.68s9.699-2.506 12.481-6.68c35.499-53.247 87.786-119.008 124.222-185.889 29.134-53.476 43.297-99.085 43.297-139.431 0-99.252-80.748-180-180-180s-180 80.748-180 180c0 40.346 14.163 85.955 43.297 139.431 36.409 66.83 88.796 132.752 124.222 185.889zm12.481-475.32c82.71 0 150 67.29 150 150 0 35.204-12.967 76.118-39.641 125.079-31.407 57.649-76.225 116.128-110.359 165.29-34.129-49.155-78.95-107.638-110.359-165.29-26.674-48.961-39.641-89.875-39.641-125.079 0-82.71 67.29-150 150-150z"></path><path d="m256 270c49.626 0 90-40.374 90-90s-40.374-90-90-90-90 40.374-90 90 40.374 90 90 90zm0-150c33.084 0 60 26.916 60 60s-26.916 60-60 60-60-26.916-60-60 26.916-60 60-60z"></path></g></svg>
                                {" "}see on map
                              </a>
                            </div>
                          </div>
                          <div>
                            <p className="text-start">
                              {hotelinfoGRN?.address}
                            </p>
                          </div>


                          {/* <p>
                              {hotelMainReducer?.no_of_rooms} Room
                            </p>
                            <h5>
                              {", "}{hotelMainReducer?.no_of_adults} Adult{" "}
                              {hotelMainReducer?.no_of_children > 0
                                ? `${hotelMainReducer?.no_of_children} Child`
                                : ""}
                            </h5> */}

                          <div className="roomDetailsIconBox">
                            <div>
                              <span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="22" viewBox="0 0 512 512" id="fi_3030336"><path d="M496,344h-8V280a32.042,32.042,0,0,0-32-32V112a32.042,32.042,0,0,0-32-32H88a32.042,32.042,0,0,0-32,32V248a32.042,32.042,0,0,0-32,32v64H16a8,8,0,0,0-8,8v32a8,8,0,0,0,8,8h8v32a8,8,0,0,0,8,8H56a7.99,7.99,0,0,0,7.84-6.43L70.56,392H441.44l6.72,33.57A7.99,7.99,0,0,0,456,432h24a8,8,0,0,0,8-8V392h8a8,8,0,0,0,8-8V352A8,8,0,0,0,496,344ZM72,112A16.021,16.021,0,0,1,88,96H424a16.021,16.021,0,0,1,16,16V248H424V216a32.042,32.042,0,0,0-32-32H296a32.042,32.042,0,0,0-32,32v32H248V216a32.042,32.042,0,0,0-32-32H120a32.042,32.042,0,0,0-32,32v32H72ZM408,216v32H280V216a16.021,16.021,0,0,1,16-16h96A16.021,16.021,0,0,1,408,216Zm-176,0v32H104V216a16.021,16.021,0,0,1,16-16h96A16.021,16.021,0,0,1,232,216ZM40,280a16.021,16.021,0,0,1,16-16H456a16.021,16.021,0,0,1,16,16v64H40Zm9.44,136H40V392H54.24ZM472,416h-9.44l-4.8-24H472Zm16-40H24V360H488Z"></path></svg></span>
                              <p>{hotelMainReducer?.no_of_rooms} Room</p>
                            </div>
                            <div>
                              <span><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" data-name="Layer 1" id="fi_15905666" viewBox="0 0 128 128"><title></title><path d="M71.1311,69.39221a28.51557,28.51557,0,0,1-3.96509.53815l5.7627,36.36652.04639.21484a1.81609,1.81609,0,0,1-.62988,1.59961l-8.08105,7.73633a1.76551,1.76551,0,0,1-.229.13477,1.82424,1.82424,0,0,1-.22754-.13379L55.936,108.28809l-.21094-.17676a2.03318,2.03318,0,0,1-.70654-1.70508l6.25256-36.41162a28.63177,28.63177,0,0,1-4.00427-.31079L51.105,105.5791a5.99952,5.99952,0,0,0,2.147,5.67676l7.894,7.582.2085.1748a4.14377,4.14377,0,0,0,5.36133.001l8.10254-7.75781a5.78748,5.78748,0,0,0,2.04639-5.67773Z"></path><path d="M37.17383,62A31.201,31.201,0,0,0,6,93.15723V126a2,2,0,0,0,4,0V93.15723A27.19614,27.19614,0,0,1,37.17383,66h9.72034a29.94772,29.94772,0,0,1-5.3288-4Z"></path><path d="M90.82617,62H85.18024a29.94772,29.94772,0,0,1-5.3288,4H90.82617A27.19614,27.19614,0,0,1,118,93.15723V126a2,2,0,0,0,4,0V93.15723A31.201,31.201,0,0,0,90.82617,62Z"></path><path d="M36.20361,21.9209A28.33521,28.33521,0,0,0,35.74561,27V39c0,14.8877,11.542,27,25.729,27H65.271C79.458,66,91,53.8877,91,39V27C91,12.1123,79.458,0,65.271,0H33a1.99986,1.99986,0,0,0-1.999,2.06055,26.11172,26.11172,0,0,0,3.78809,11.97559A11.13086,11.13086,0,0,1,36.20361,21.9209ZM65.271,4C77.25244,4,87,14.31738,87,27V39c0,12.68262-9.74756,23-21.729,23H61.47461c-11.98145,0-21.729-10.31738-21.729-23V27a24.36727,24.36727,0,0,1,.39307-4.36133A14.96578,14.96578,0,0,0,38.167,11.89355,21.86126,21.86126,0,0,1,35.24316,4Z"></path><path d="M33,96H25a2,2,0,0,0,0,4h8a2,2,0,0,0,0-4Z"></path><path d="M99,96H91a2,2,0,0,0,0,4h8a2,2,0,0,0,0-4Z"></path></svg></span>
                              <p>{hotelMainReducer?.no_of_adults} Adult</p>
                            </div>

                            {
                              hotelMainReducer?.no_of_children > 0 &&

                              <div>
                                <span><svg id="fi_9710082" enable-background="new 0 0 512.001 512.001" height="18" viewBox="0 0 512.001 512.001" width="18" xmlns="http://www.w3.org/2000/svg"><g><g><path d="m279.096 255.003c-4.709-2.883-10.865-1.402-13.75 3.309-1.113 1.819-4.822 3.753-9.501 3.753-4.578 0-8.208-1.83-9.427-3.638-3.09-4.579-9.305-5.786-13.883-2.699-4.579 3.089-5.787 9.304-2.699 13.883 5.182 7.682 15.147 12.454 26.009 12.454 11.356 0 21.533-5.101 26.56-13.312 2.883-4.71 1.402-10.866-3.309-13.75z"></path><path d="m319.806 227.526-.006.004c-6.894 4.595-8.753 13.906-4.157 20.799 2.89 4.336 7.646 6.68 12.494 6.68 2.86 0 5.752-.816 8.31-2.521 6.894-4.595 8.756-13.908 4.16-20.801s-13.909-8.755-20.801-4.161z"></path><path d="m175.56 227.526-.006.004c-6.894 4.595-8.753 13.906-4.157 20.799 2.89 4.336 7.646 6.68 12.494 6.68 2.86 0 5.752-.816 8.31-2.521 6.894-4.595 8.756-13.908 4.16-20.801s-13.909-8.755-20.801-4.161z"></path><path d="m457.178 181.786v-12.237c0-45.111-17.686-87.641-49.799-119.753-32.112-32.111-74.64-49.796-119.751-49.796h-63.256c-40.466 0-79.717 14.641-110.521 41.227-4.182 3.608-4.646 9.923-1.037 14.104 3.607 4.181 9.923 4.647 14.104 1.037 27.174-23.452 61.785-36.368 97.455-36.368h63.256c82.462 0 149.55 67.087 149.55 149.549v7.95h-25.859c-47.086 0-79.899-21.081-79.899-40 0-5.522-4.478-10-10-10s-10 4.478-10 10c0 18.919-32.813 40-79.899 40h-156.699v-7.95c0-14.343 2.065-28.566 6.138-42.277 1.572-5.294-1.444-10.861-6.738-12.434-5.297-1.575-10.862 1.445-12.434 6.738-4.622 15.561-6.966 31.701-6.966 47.973v12.237c-16.977 7.653-28.823 24.737-28.823 44.535 0 26.921 21.901 48.822 48.822 48.822h18.845c10.86 27.151 29.873 50.82 54.359 68.591-25.243 27.211-39.526 63.137-39.526 100.227v58.04c0 5.522 4.478 10 10 10h275c5.522 0 10-4.478 10-10v-58.04c0-37.09-14.283-73.018-39.526-100.227 24.487-17.771 43.499-41.439 54.359-68.591h18.845c26.921 0 48.822-21.901 48.822-48.822 0-19.798-11.845-36.882-28.822-44.535zm-382.355 73.358c-15.893 0-28.823-12.93-28.823-28.823s12.93-28.822 28.822-28.822h8.678v25c0 11.194 1.319 22.115 3.822 32.645zm53.677 211.857h37.5v25h-37.5zm217.5 25v-25h37.5v25zm37.5-48.04v3.04h-37.5v-13.235c0-5.522-4.478-10-10-10s-10 4.478-10 10v58.235h-140v-58.235c0-5.522-4.478-10-10-10s-10 4.478-10 10v13.235h-37.5v-3.04c0-33.248 13.301-65.427 36.692-89.247 12.766 7.156 26.638 12.852 41.328 16.825.736 26.656 22.649 48.115 49.48 48.115s48.745-21.458 49.48-48.115c14.69-3.973 28.562-9.669 41.328-16.825 23.391 23.818 36.692 55.998 36.692 89.247zm-156.443-68.092c9.413 1.44 19.083 2.191 28.944 2.191s19.531-.751 28.944-2.191c-2.668 13.54-14.632 23.785-28.944 23.785s-26.276-10.245-28.944-23.785zm28.943-17.809c-84.089 0-152.5-60.812-152.5-135.561v-25h128.021c40.017 0 73.842-13.45 89.899-33.398 15.679 19.478 48.298 32.76 87.079 33.376l.001 25.022c0 74.748-68.411 135.561-152.5 135.561zm181.178-102.916h-12.5c2.503-10.53 3.822-21.451 3.822-32.645l-.001-25h8.678c15.893 0 28.822 12.93 28.822 28.822s-12.928 28.823-28.821 28.823z"></path><path d="m281 444.837h-50c-5.522 0-10 4.478-10 10s4.478 10 10 10h50c5.522 0 10-4.478 10-10s-4.477-10-10-10z"></path><path d="m90.264 93.374c.414 0 .832-.025 1.253-.078 5.48-.686 9.367-5.683 8.683-11.163-.686-5.48-5.682-9.377-11.163-8.683l-.008.001c-5.48.686-9.363 5.683-8.679 11.163.633 5.059 4.943 8.76 9.914 8.76z"></path></g></g></svg></span>
                                <p>{hotelMainReducer?.no_of_children} Child</p>
                              </div>
                            }

                          </div>
                        </div>
                      </div>

                      <div className="p-0 col-lg-12">
                        <div className="roomDetailsDangerousHtml">

                          <h5 className="HotelRoomHeadings">Stay Information</h5>
                          <div
                            className="dangerousHTMLhotelDetails"
                            dangerouslySetInnerHTML={{
                              __html: hotelinfoGRN.description,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="p-0 mt-3">
                        <div className="row" id="roomSelectionBox">
                          <Tabs
                            defaultActiveKey="1"
                            onChange={handleTabChange}
                          >
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
                              className="text-bold"
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
                                <path d="M780 0C349.74 0 0 349.74 0 780s349.74 780 780 780 780-349.74 780-780S1210.26 0 780 0zm0 1458.9C402.24 1458.9 101.1 1057.76 101.1 780S402.24 101.1 780 101.1 1458.9 502.24 1458.9 780 1157.76 1458.9 780 1458.9z" />
                                <path d="M780 187.3c-21.4 0-38.9 17.5-38.9 38.9v787.06L471.12 743.7c-15.15-15.15-39.74-15.15-54.89 0-15.15 15.15-15.15 39.74 0 54.89l309.1 309.1c7.2 7.2 17.07 11.33 27.44 11.33 10.37 0 20.24-4.13 27.44-11.33l309.1-309.1c15.15-15.15 15.15-39.74 0-54.89-15.15-15.15-39.74-15.15-54.89 0L818.9 1013.26V226.2c0-21.4-17.5-38.9-38.9-38.9z" />
                              </svg>
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 p-0">

                  <div className="initialBookingData">
                    <div className="checkInCheckOutBox">
                      <div className="checkInInnerBoxOne">
                        <div>
                          <p>Check-In</p>
                          <h5>
                            {dayjs(hotelMainReducer?.checkin).format(
                              "DD MMM, YY"
                            )}
                          </h5>
                          <h2>
                            {dayjs(hotelMainReducer?.checkin).format(
                              "dddd"
                            )}
                          </h2>
                        </div>

                        <div>
                          <p>Check-Out</p>
                          <h5>
                            {dayjs(hotelMainReducer?.checkout).format(
                              "DD MMM, YY"
                            )}
                          </h5>
                          <h2>
                            {dayjs(hotelMainReducer?.checkout).format(
                              "dddd"
                            )}
                          </h2>
                        </div>
                      </div>
                      <div className="checkInInnerBoxTwo">
                        <p>
                          {hotelMainReducer?.no_of_rooms} Room
                        </p>
                        <h5>
                          {", "}{hotelMainReducer?.no_of_adults} Adult{" "}
                          {hotelMainReducer?.no_of_children > 0
                            ? `${hotelMainReducer?.no_of_children} Child`
                            : ""}
                        </h5>
                      </div>
                    </div>


                    <div className="sideBarPriceBox">

                      <div>
                        <h6>₹{" "}{(selectedRoom?.price / hotelMainReducer?.no_of_nights).toFixed(0)} x {hotelMainReducer?.no_of_nights}{" "}nights</h6>
                        <p>₹{" "}{selectedRoom?.price}</p>
                      </div>
                      <div>
                        <h6>₹{" "}{(selectedRoom?.price / hotelMainReducer?.no_of_rooms).toFixed(0)} x {hotelMainReducer?.no_of_rooms}{" "}rooms</h6>
                        <p>₹{" "}{selectedRoom?.price}</p>
                      </div>

                    </div>
                    <hr />

                    <div className="sideBarPriceBox">

                      <div>
                        <h6>Total Before Taxes</h6>
                        <p>₹{" "}{selectedRoom?.price}</p>
                      </div>


                    </div>

                    <div className="sideBarButtonsHotel">
                      {
                        showSelectRoomButton &&
                        <Button className="showonBig" type="primary"
                          onClick={() => {
                            const element = document.getElementById("roomSelectionBox");
                            if (element) {
                              element.scrollIntoView({ behavior: "smooth" });
                            }
                          }}
                        >Change Room</Button>
                      }


                      <Button type="primary" onClick={handleClickSaveRoom}>Continue</Button>
                    </div>

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




















{/*

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
</div>*/}