import * as React from "react";
import { useState } from "react";
import { Box } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import chevrondown from "../../images/chevrondown.svg";
import { motion } from "framer-motion";
import freeWifi from "./SVGs/freeWifi.svg"
import freeBreakfast from "./SVGs/freeBreakfast.svg"
import freeParking from "./SVGs/freeParking.svg"
import drinkingWater from "./SVGs/DrinkingWater.svg"
import expressCheckin from "./SVGs/expressCheckin.svg"
import welcomeDrink from "./SVGs/welcomeDrink.svg"
import freeGym from "./SVGs/freeGym.svg"
import dayjs from "dayjs";
import "react-image-gallery/styles/css/image-gallery.css";
import { HotelRoomSelectReqGRN, clearHotelRoomSelect } from "../../Redux/HotelGRN/hotel";
import { swalModal } from "../../utility/swal";
import { Image } from 'antd';
import SkeletonBookRoom from "./Skeletons/SkeletonBookRoom";



const HotelBookRoomGRN = () => {


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);
    const [showRooms, setShowRooms] = useState(10);
    const reducerState = useSelector((state) => state);
    const searchId = reducerState?.hotelSearchResultGRN?.ticketData?.data?.data?.search_id;


    useEffect(() => {
        dispatch(clearHotelRoomSelect())
    }, [])


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


    const hotelinfoGRN = reducerState?.hotelSearchResultGRN?.hotelDetails?.data?.data?.hotel;
    const hotelMainReducer = reducerState?.hotelSearchResultGRN?.ticketData?.data?.data;
    const hotelGallery = reducerState?.hotelSearchResultGRN?.hotelGallery?.data?.data?.images?.regular;

    useEffect(() => {
        if (reducerState?.hotelSearchResultGRN?.hotelDetails?.status === 200 && reducerState?.hotelSearchResultGRN?.hotelGallery?.data?.data) {
            setLoader(false)
        }
    }, [reducerState?.hotelSearchResultGRN?.hotelDetails?.status || reducerState?.hotelSearchResultGRN?.hotelGallery?.data?.data?.images])




    const star = (data) => {
        const stars = [];
        for (let i = 0; i < data; i++) {
            stars.push(<StarIcon key={i} style={{ color: "#FF8900" }} />);
        }
        return stars;
    };


    const [selectedRoomIndex, setSelectedRoomIndex] = useState(0);
    const [selectedRoom, setSelectedRoom] = useState(hotelinfoGRN?.rates?.[selectedRoomIndex])
    useEffect(() => {
        setSelectedRoom(hotelinfoGRN?.rates?.[selectedRoomIndex])
    }, [hotelinfoGRN?.rates])

    const handleRoomSelection = (index) => {
        setSelectedRoomIndex(index);
    };
    useEffect(() => {
        setSelectedRoom(hotelinfoGRN?.rates?.[selectedRoomIndex])
    }, [selectedRoomIndex])


    useEffect(() => {
        if (reducerState?.hotelSearchResultGRN?.hotelDetails?.data?.data?.errors?.length > 0) {

            swalModal('hotel', "room not found", false);
            navigate("/st-hotel/hotelresult")
        }
    }, [reducerState?.hotelSearchResultGRN?.hotelDetails?.data?.data?.errors])



    const handleClickSaveRoom = async () => {
        const payload = {
            "data": {
                "rate_key": selectedRoom?.rate_key,
                "group_code": selectedRoom?.group_code
            },
            "searchID": searchId,
        }
        dispatch(HotelRoomSelectReqGRN(payload))
        navigate("/st-hotel/hotelresult/selectroom/guestDetails")
    };



    // no of rooms shown 

    const handleShowMore = () => {
        setShowRooms(prev => prev + 10);
    };
    // no of rooms shown 





    return (
        <>
            {loader ? (
                <SkeletonBookRoom />
            ) : (
                <>
                    <div className="my-4 ">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12 mb-4">
                                    <div className="bookRoomHotDetails">
                                        <div>
                                            <div>
                                                <p className="hotelName">
                                                    {hotelinfoGRN?.name}
                                                </p>
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
                                                <a href={`https://www.google.com/maps?q=${hotelinfoGRN?.geolocation?.latitude},${hotelinfoGRN?.geolocation?.longitude}`} target="_blank">
                                                    <svg id="fi_2642502" enable-background="new 0 0 512 512" height="25" viewBox="0 0 512 512" width="30" xmlns="http://www.w3.org/2000/svg"><g><path d="m307.79 223.476-53.135 78.467-78.573 78.18c-29.222-37.139-61.132-73.116-80.587-116.631l42.352-64.879 64.957-62.668c-21.71 26.831-20.089 66.293 4.864 91.246 26.696 26.696 69.968 26.696 96.663 0 1.203-1.203 2.365-2.446 3.459-3.715z" fill="#ecb72b"></path><path d="m309.02 222.003c21.9-26.844 20.346-66.442-4.688-91.462-26.696-26.696-69.968-26.696-96.663 0-1.121 1.121-2.189 2.27-3.215 3.445l44.811-72.847 60.795-52.809c45.407 14.374 82.964 46.379 104.648 87.977l-44.352 71.516z" fill="#5085f7"></path><path d="m202.802 135.949-107.312 127.549c-10.643-23.783-17.562-49.817-18.276-79.529-.054-1.689-.081-3.391-.081-5.093 0-43.718 15.685-83.789 41.746-114.861z" fill="#da2f2a"></path><path d="m202.802 135.949-83.926-71.939c32.816-39.125 82.06-64.01 137.126-64.01 18.845 0 37.009 2.916 54.065 8.32z" fill="#4274eb"></path><path d="m434.867 178.865c0-29.779-7.278-57.859-20.151-82.558l-238.64 283.826c27.113 34.488 51.887 69.985 62.183 113.454.33 1.392.685 3.019 1.063 4.848 3.733 18.086 29.63 18.086 33.363 0 .378-1.829.733-3.456 1.063-4.848 27.448-115.892 157.807-175.118 161.043-309.618.046-1.696.076-3.397.076-5.104z" fill="#60a850"></path></g></svg>  see on map
                                                </a>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className="col-lg-12 mb-4 ">
                                    <div className="row g-3">
                                        <div className="col-lg-6">
                                            <div className="antImgGall" style={{ position: 'relative' }}>
                                                <Image width={'100%'} src={hotelGallery?.[0]?.url} />

                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="row g-3">
                                                {hotelGallery?.slice(1, 5).map((item, index) => (
                                                    <div className="col-lg-6">
                                                        <div className=" antImgGallSmall" >
                                                            <Image width={'100%'} src={item?.url} />

                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="row gy-4">
                                <div className="col-lg-8 ">
                                    <div className="container">
                                        <div className="row">



                                            <motion.div variants={variants} className="col-lg-12 p-0">
                                                <div className="roomDetailsReviewDesc">
                                                    <div className="row">
                                                        <motion.div variants={variants} className="col-lg-4 col-4">
                                                            <div className="checkInReview">
                                                                <span>Check-In</span>
                                                                <p>{dayjs(hotelMainReducer?.checkin).format("DD MMM, YY")}</p>
                                                                <h2>{dayjs(hotelMainReducer?.checkin).format("dddd")}</h2>
                                                            </div>
                                                        </motion.div>
                                                        <motion.div variants={variants} className="col-lg-4 col-4">
                                                            <div className="checkInReview">
                                                                <span>Check-Out</span>
                                                                <p>{dayjs(hotelMainReducer?.checkout).format("DD MMM, YY")}</p>
                                                                <h2>{dayjs(hotelMainReducer?.checkout).format("dddd")}</h2>
                                                            </div>
                                                        </motion.div>
                                                        <motion.div variants={variants} className="col-lg-4 col-4">
                                                            <div className="checkInReview">
                                                                <span>{hotelMainReducer?.no_of_rooms} Room(s) </span>
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

                                        {/* guest details sectin  */}

                                        <motion.div
                                            variants={variants}
                                            initial="initial"
                                            whileInView="animate"
                                            className="row"
                                        >

                                            <div className="mt-3 p-0">
                                                {hotelinfoGRN?.rates?.map((item, index) => (
                                                    <div className="roomCompo" key={index}>
                                                        {index < showRooms && (
                                                            <div className="offer_area">
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
                                                                        </div>
                                                                    </div>

                                                                    <div className="othInc">
                                                                        {
                                                                            item?.pan_required &&
                                                                            <div className="othIncInner">

                                                                                <div className="d-flex justify-content-start align-items-center gap-2" >
                                                                                    <svg id="fi_3596091" enable-background="new 0 0 24 24" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg"><g><path d="m21.5 21h-19c-1.378 0-2.5-1.122-2.5-2.5v-13c0-1.378 1.122-2.5 2.5-2.5h19c1.378 0 2.5 1.122 2.5 2.5v13c0 1.378-1.122 2.5-2.5 2.5zm-19-17c-.827 0-1.5.673-1.5 1.5v13c0 .827.673 1.5 1.5 1.5h19c.827 0 1.5-.673 1.5-1.5v-13c0-.827-.673-1.5-1.5-1.5z"></path></g><g><path d="m7.5 12c-1.378 0-2.5-1.122-2.5-2.5s1.122-2.5 2.5-2.5 2.5 1.122 2.5 2.5-1.122 2.5-2.5 2.5zm0-4c-.827 0-1.5.673-1.5 1.5s.673 1.5 1.5 1.5 1.5-.673 1.5-1.5-.673-1.5-1.5-1.5z"></path></g><g><path d="m11.5 17c-.276 0-.5-.224-.5-.5v-1c0-.827-.673-1.5-1.5-1.5h-4c-.827 0-1.5.673-1.5 1.5v1c0 .276-.224.5-.5.5s-.5-.224-.5-.5v-1c0-1.378 1.122-2.5 2.5-2.5h4c1.378 0 2.5 1.122 2.5 2.5v1c0 .276-.224.5-.5.5z"></path></g><g><path d="m20.5 9h-6c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h6c.276 0 .5.224.5.5s-.224.5-.5.5z"></path></g><g><path d="m20.5 13h-6c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h6c.276 0 .5.224.5.5s-.224.5-.5.5z"></path></g><g><path d="m20.5 17h-6c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h6c.276 0 .5.224.5.5s-.224.5-.5.5z"></path></g></svg>
                                                                                    <p className="panDesign">Pan Required</p>
                                                                                </div>

                                                                            </div>
                                                                        }
                                                                        {
                                                                            item?.non_refundable &&
                                                                            <div className="othIncInner">

                                                                                <div className="d-flex justify-content-start align-items-center gap-2" >
                                                                                    <svg id="fi_2610380" enable-background="new 0 0 30 30" height="20" viewBox="0 0 30 30" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m15 0c-4.00684 0-7.77344 1.56055-10.60645 4.39355s-4.39355 6.6001-4.39355 10.60645 1.56055 7.77344 4.39355 10.60645 6.59961 4.39355 10.60645 4.39355 7.77344-1.56055 10.60645-4.39355 4.39355-6.6001 4.39355-10.60645-1.56055-7.77344-4.39355-10.60645-6.59961-4.39355-10.60645-4.39355zm-9.19238 24.19238c-2.45508-2.45556-3.80762-5.72021-3.80762-9.19238 0-3.13605 1.11255-6.09662 3.13507-8.45087l18.31592 18.31592c-2.35388 2.02283-5.31445 3.13495-8.45099 3.13495-3.47266 0-6.7373-1.35205-9.19238-3.80762zm19.05731-.74151-18.31592-18.31592c2.35388-2.02283 5.31445-3.13495 8.45099-3.13495 3.47266 0 6.7373 1.35205 9.19238 3.80762s3.80762 5.72021 3.80762 9.19238c0 3.13605-1.11255 6.09662-3.13507 8.45087z" fill="rgb(0,0,0)"></path></svg>
                                                                                    <p className="panDesign2">Non Refundable</p>
                                                                                </div>

                                                                            </div>
                                                                        }
                                                                        {
                                                                            item?.cancellation_policy &&
                                                                            <div className="othIncInner">

                                                                                <div className="d-flex justify-content-start align-items-center gap-2" >
                                                                                    <svg id="fi_7444875" height="20" viewBox="0 0 128 128" width="20" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1"><path d="m11.59 65.89 11.19 8a2 2 0 0 0 2.79-.47l8-11.19a2 2 0 1 0 -3.27-2.33l-5.18 7.25a41.82 41.82 0 1 1 79.64 6.11 2 2 0 0 0 1.12 2.6 2 2 0 0 0 .74.14 2 2 0 0 0 1.86-1.26 45.82 45.82 0 1 0 -87.31-6.92l-7.26-5.18a2 2 0 1 0 -2.32 3.25z"></path><path d="m113.08 83.24c-4-4.73-10.56-2.56-14.1-1.4-2.24.74-7.61 3-12.9 5.24a8.26 8.26 0 0 0 -.62-5c-2.86-6.53-9.92-5.28-15.08-4.36a27.61 27.61 0 0 1 -4.84.61 20.2 20.2 0 0 1 -8-1.75 24.66 24.66 0 0 0 -10.37-2 50.57 50.57 0 0 0 -19.76 4.42l-1.12.46c-9.29 3.7-13.29 4.54-13.29 4.54a2 2 0 0 0 -1.55 1.48c-.07.29-1.64 7 2.81 16.43 3.82 8 8.29 11.07 11.36 12.18a2 2 0 0 0 1.91-.31s2.51-2 4.43-3.12c1.27-.77 4.36-1.26 11.92.84a92.12 92.12 0 0 0 21.42 3.07 25 25 0 0 0 8.32-1.14c7.89-3 27.09-13 34.64-17.1 4-2.18 6.18-4.53 6.68-7.19a7 7 0 0 0 -1.86-5.9zm-2.08 5.17c-.25 1.35-1.91 2.92-4.66 4.42-6.34 3.47-26.28 13.92-34.13 16.87-5.51 2.06-19.38.14-27.26-2a37.74 37.74 0 0 0 -9.71-1.7 10.14 10.14 0 0 0 -5.37 1.24c-1.35.82-2.89 1.94-3.86 2.66-3-1.5-5.85-4.9-8.14-9.72a25.11 25.11 0 0 1 -2.68-12.62 121.45 121.45 0 0 0 12.59-4.44l1.15-.47a46.3 46.3 0 0 1 18.32-4.1 20.5 20.5 0 0 1 8.88 1.77 23.77 23.77 0 0 0 9.34 2 32.17 32.17 0 0 0 5.61-.67c5.51-1 9.23-1.37 10.71 2a4.22 4.22 0 0 1 .15 3.35c-.56 1.38-2 2.64-4.26 3.66-2 .84-3.5 1.49-4.16 1.75-4.24 1.66-7.89 1.08-11.42.52l-1.94-.3a2 2 0 0 0 -.54 4c.61.08 1.23.18 1.85.28 3.87.61 8.25 1.3 13.51-.75.61-.24 1.83-.75 3.45-1.45.3-.12.59-.24.87-.37l2.58-1.1c6.51-2.8 15.43-6.64 18.36-7.6 4.65-1.53 7.91-2 9.78.18 1.21 1.42 1.04 2.3.98 2.59z"></path><path d="m64 33.76v2.65a8.76 8.76 0 0 0 -2 .72 6.31 6.31 0 0 0 -3.47 5.47c-.14 4.39 3.81 5.86 6.69 6.93 3.36 1.25 4.38 1.89 4.23 3.49a2.76 2.76 0 0 1 -1.84 2.45 6.86 6.86 0 0 1 -5.93-.5 2 2 0 0 0 -2.48 3.15 9.34 9.34 0 0 0 4.8 1.73v2.39a2 2 0 1 0 4 0v-2.69a9.82 9.82 0 0 0 1.23-.4 6.75 6.75 0 0 0 4.25-5.74c.48-4.92-3.91-6.55-6.81-7.63-3.11-1.15-4.14-1.75-4.1-3.05a2.34 2.34 0 0 1 1.36-2.07 6.07 6.07 0 0 1 5.74.49 2 2 0 1 0 2.12-3.39 10.6 10.6 0 0 0 -3.79-1.45v-2.55a2 2 0 1 0 -4 0z"></path><path d="m42 48a24 24 0 1 0 24-24 24 24 0 0 0 -24 24zm44 0a20 20 0 1 1 -20-20 20 20 0 0 1 20 20z"></path></svg>
                                                                                    <p className="panDesign3">Refundable (Cancel Before {dayjs(item?.cancellation_policy?.cancel_by_date).format("DD MMM, YY")})</p>
                                                                                </div>

                                                                            </div>
                                                                        }
                                                                    </div>

                                                                    <div className="othInc">
                                                                        {item?.other_inclusions?.map((inclusion, e) => (
                                                                            <div className="othIncInner" key={e}>
                                                                                <div className="d-flex justify-content-start align-items-center gap-2">
                                                                                    {inclusion.toLowerCase() == "free wifi" &&
                                                                                        <>
                                                                                            <img src={freeWifi} alt="wifi" />
                                                                                            <p className="panDesign3">Free WiFi</p>
                                                                                        </>

                                                                                    }
                                                                                    {inclusion.toLowerCase() == "free internet" &&
                                                                                        <>
                                                                                            <img src={freeWifi} alt="wifi" />
                                                                                            <p className="panDesign3">Free internet</p>
                                                                                        </>

                                                                                    }
                                                                                    {inclusion.toLowerCase() == "free breakfast" &&
                                                                                        <>
                                                                                            <img src={freeBreakfast} alt="wifi" />
                                                                                            <p className="panDesign3">Free Breakfast</p>
                                                                                        </>
                                                                                    }
                                                                                    {inclusion.toLowerCase() == "breakfast" &&
                                                                                        <>
                                                                                            <img src={freeBreakfast} alt="wifi" />
                                                                                            <p className="panDesign3">Breakfast</p>
                                                                                        </>
                                                                                    }
                                                                                    {inclusion.toLowerCase() == "continental breakfast" &&
                                                                                        <>
                                                                                            <img src={freeBreakfast} alt="wifi" />

                                                                                            <p className="panDesign3">Continental breakfast</p>
                                                                                        </>
                                                                                    }
                                                                                    {inclusion.toLowerCase() == "free self parking" &&
                                                                                        <>
                                                                                            <img src={freeParking} alt="wifi" />
                                                                                            <p className="panDesign3"> Free self parking</p>
                                                                                        </>
                                                                                    }
                                                                                    {inclusion.toLowerCase() == "parking" &&
                                                                                        <>
                                                                                            <img src={freeParking} alt="wifi" />
                                                                                            <p className="panDesign3"> Free Parking</p>
                                                                                        </>
                                                                                    }
                                                                                    {inclusion.toLowerCase() == "free parking" &&
                                                                                        <>
                                                                                            <img src={freeParking} alt="wifi" />
                                                                                            <p className="panDesign3"> Free Parking</p>
                                                                                        </>
                                                                                    }
                                                                                    {inclusion.toLowerCase() == "free valet parking" &&
                                                                                        <>
                                                                                            <img src={freeParking} alt="wifi" />

                                                                                            <p className="panDesign3"> Free Valet Parking</p>
                                                                                        </>
                                                                                    }
                                                                                    {inclusion.toLowerCase() == "drinking water" &&
                                                                                        <>
                                                                                            <img src={drinkingWater} alt="wifi" />
                                                                                            <p className="panDesign3"> Drinking water</p>
                                                                                        </>
                                                                                    }
                                                                                    {inclusion.toLowerCase() == "express check-in" &&
                                                                                        <>
                                                                                            <img src={expressCheckin} alt="wifi" />
                                                                                            <p className="panDesign3"> Express check-in</p>
                                                                                        </>
                                                                                    }
                                                                                    {inclusion.toLowerCase() == "welcome drink" &&
                                                                                        <>

                                                                                            <img src={welcomeDrink} alt="wifi" />
                                                                                            <p className="panDesign3">Welcome drink</p>
                                                                                        </>
                                                                                    }
                                                                                    {inclusion.toLowerCase() == "free fitness center access" &&
                                                                                        <>
                                                                                            <img src={freeGym} alt="wifi" />
                                                                                            <p className="panDesign3">Free Gym</p>
                                                                                        </>
                                                                                    }


                                                                                </div>
                                                                            </div>
                                                                        ))}
                                                                    </div>

                                                                </div>
                                                                <div className="priceCheck">
                                                                    <p className="price">₹ {item?.price}</p>
                                                                    <div>
                                                                        <h3
                                                                            onClick={() => handleRoomSelection(index)}
                                                                        >Select Room</h3>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                                {hotelinfoGRN?.rates?.length > showRooms && (
                                                    <div className="text-left mt-3">
                                                        <p className="text-bold " style={{ cursor: "pointer" }} onClick={handleShowMore}>

                                                            Show More Rooms
                                                            <svg id="fi_3550091" enable-background="new 0 0 1560 1560" height="15" viewBox="0 0 1560 1560" width="20" xmlns="http://www.w3.org/2000/svg"><g><g><g><g><path d="m1524 811.8h-1488c-17.7 0-32-14.3-32-32s14.3-32 32-32h1410.7l-194.2-194.2c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l248.9 248.9c9.2 9.2 11.9 22.9 6.9 34.9-5 11.9-16.7 19.7-29.6 19.7z"></path></g><g><path d="m1274.8 1061c-8.2 0-16.4-3.1-22.6-9.4-12.5-12.5-12.5-32.8 0-45.3l249.2-249.2c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3l-249.2 249.2c-6.3 6.3-14.5 9.4-22.7 9.4z"></path></g></g></g></g></svg>
                                                        </p>
                                                    </div>
                                                )}
                                            </div>


                                            <div className="col-lg-12">
                                                <div className="reviewDescriptionButton">

                                                    <button
                                                        type="submit"
                                                        onClick={handleClickSaveRoom}

                                                    >
                                                        Continue
                                                    </button>

                                                </div>
                                            </div>


                                        </motion.div>
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
                                                    <div className="col-lg-12 my-4">
                                                        <div className="hotelReviewAmetnities2">
                                                            <div>
                                                                {hotelinfoGRN?.facilities?.split(';')?.map((item, index) => (
                                                                    <p key={index}>
                                                                        <img src={chevrondown} alt="Chevron Down" />
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
