import * as React from "react";
import moment from "moment";
import { useState, useRef, useCallback } from "react";
import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import StarIcon from "@mui/icons-material/Star";
import { useDispatch, useSelector, useReducer } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PassengersAction } from "../../Redux/Passengers/passenger";
// import { apiURL } from "../../Constants/constant";
import { useEffect } from "react";
import HotelLoading from "../Hotel/hotelLoading/HotelLoading";
import hotelNotFound from "../../images/hotelNotFound.jpg";
import chevrondown from "../../images/chevrondown.svg";
// import Login from "../../components/Login";
import login01 from "../../images/login-01.jpg";
import Login from "../../components/Login";
import Modal from "@mui/material/Modal";
import { motion } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import dayjs, { Dayjs } from "dayjs";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import axios from "axios";
import { apiURL } from "../../Constants/constant";
import Hotelmainloading from "../Hotel/hotelLoading/Hotelmainloading";
import { HotelRoomSelectReqGRN } from "../../Redux/HotelGRN/hotel";

const styleLoader = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "transparent",
    display: "flex",
    justifyContent: "center",
};


const HotelBookRoomGRN = () => {


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    const reducerState = useSelector((state) => state);






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


    const emailRef = useRef();

    // new values 
    const hotelinfoGRN = reducerState?.hotelSearchResultGRN?.hotelDetails?.data?.data?.hotel;
    const hotelMainReducer = reducerState?.hotelSearchResultGRN?.ticketData?.data?.data;
    const hotelGallery = reducerState?.hotelSearchResultGRN?.hotelGallery?.data?.data?.images?.regular;

    // console.log(hotelinfoGRN, "hotel info grn")
    // new values

    const galleryItems = hotelGallery?.map(image => ({
        original: image?.url, // Assuming 'path' contains the image src url
    }));





    const star = (data) => {
        const stars = [];
        for (let i = 0; i < data; i++) {
            stars.push(<StarIcon key={i} style={{ color: "#FF8900" }} />);
        }
        return stars;
    };



    const [selectedRoomIndex, setSelectedRoomIndex] = useState(0);
    const [selectedRoom, setSelectedRoom] = useState(hotelinfoGRN?.rates?.[selectedRoomIndex])


    const handleRoomSelection = (index) => {
        setSelectedRoomIndex(index);
    };
    useEffect(() => {

        setSelectedRoom(hotelinfoGRN?.rates?.[selectedRoomIndex])
    }, [selectedRoomIndex])




    useEffect(() => {
        if (reducerState?.hotelSearchResultGRN?.hotelRoom?.length > 0 || reducerState?.hotelSearchResultGRN?.hotelRoom?.hotel) {
            setLoader(false)
            navigate("/GrmHotelHome/hotelsearchGRM/hotelbookroom/guestDetails")
        }

    }, [reducerState?.hotelSearchResultGRN?.hotelRoom?.hotel])

    const searchId = reducerState?.hotelSearchResultGRN?.ticketData
        ?.data?.data?.search_id;


    const handleClickSaveRoom = async () => {
        setLoader(true);
        const payload = {

            "data": {
                "rate_key": selectedRoom?.rate_key,
                "group_code": selectedRoom?.group_code
            },
            "searchID": searchId,
        }
        dispatch(HotelRoomSelectReqGRN(payload))
    };

    // console.log(reducerState, "reducer state")

    return (
        <>
            {loader ? (
                <Hotelmainloading />
            ) : (
                <>
                    <div className='mainimgHotelSearch'>
                    </div>

                    <div className="my-4 ">
                        <div className="container">
                            <div className="row gy-4">
                                <div className="col-lg-9 order-lg-1 order-md-2 order-sm-2 order-2">
                                    <div className="container">
                                        <div
                                            className="row"
                                        >
                                            <div className="col-lg-12 p-0 reviewTMT">
                                                <div className="hotelDetails">
                                                    <div>
                                                        <div>
                                                            <p className="hotelName">
                                                                {hotelinfoGRN?.name}
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <Box>{star(hotelinfoGRN?.category)}</Box>
                                                        </div>
                                                        <div>
                                                            <p className="text-start addReview">
                                                                {" "}
                                                                <b>Address:</b> {hotelinfoGRN?.address}
                                                            </p>
                                                        </div>
                                                        <div className="mapp">
                                                            <a href={`https://www.google.com/maps?q=${hotelinfoGRN?.geolocation?.latitude},${hotelinfoGRN?.geolocation?.longitude}`} target="_blank">
                                                                <svg id="fi_2642502" enable-background="new 0 0 512 512" height="25" viewBox="0 0 512 512" width="30" xmlns="http://www.w3.org/2000/svg"><g><path d="m307.79 223.476-53.135 78.467-78.573 78.18c-29.222-37.139-61.132-73.116-80.587-116.631l42.352-64.879 64.957-62.668c-21.71 26.831-20.089 66.293 4.864 91.246 26.696 26.696 69.968 26.696 96.663 0 1.203-1.203 2.365-2.446 3.459-3.715z" fill="#ecb72b"></path><path d="m309.02 222.003c21.9-26.844 20.346-66.442-4.688-91.462-26.696-26.696-69.968-26.696-96.663 0-1.121 1.121-2.189 2.27-3.215 3.445l44.811-72.847 60.795-52.809c45.407 14.374 82.964 46.379 104.648 87.977l-44.352 71.516z" fill="#5085f7"></path><path d="m202.802 135.949-107.312 127.549c-10.643-23.783-17.562-49.817-18.276-79.529-.054-1.689-.081-3.391-.081-5.093 0-43.718 15.685-83.789 41.746-114.861z" fill="#da2f2a"></path><path d="m202.802 135.949-83.926-71.939c32.816-39.125 82.06-64.01 137.126-64.01 18.845 0 37.009 2.916 54.065 8.32z" fill="#4274eb"></path><path d="m434.867 178.865c0-29.779-7.278-57.859-20.151-82.558l-238.64 283.826c27.113 34.488 51.887 69.985 62.183 113.454.33 1.392.685 3.019 1.063 4.848 3.733 18.086 29.63 18.086 33.363 0 .378-1.829.733-3.456 1.063-4.848 27.448-115.892 157.807-175.118 161.043-309.618.046-1.696.076-3.397.076-5.104z" fill="#60a850"></path></g></svg>  see on map
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="hotelImageReview">
                                                            <img
                                                                src={hotelinfoGRN?.images?.url}
                                                                onError={(e) => {
                                                                    e.target.onerror = null;
                                                                    e.target.src = hotelNotFound;
                                                                }}
                                                                alt="package-img"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-lg-12 p-0 mt-3">
                                                <div className="hotelGalleryBox p-0">
                                                    <ImageGallery style={{ height: "400px" }} showFullscreenButton={false} autoPlay={true} showThumbnails={false} lazyLoad={true} showPlayButton={false} items={galleryItems} />
                                                </div>
                                            </div>
                                            {/* room details area  */}

                                            <motion.div variants={variants} className="col-lg-12 p-0">
                                                <div className="roomDetails">
                                                    <div className="row">
                                                        <div className="col-lg-9 mb-md-3">
                                                            <p className="titles ">{hotelinfoGRN?.rate?.rooms?.[0]?.description}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>

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



                                            <div>
                                                {hotelinfoGRN?.rates?.map((item, index) => (
                                                    <div className="roomCompo" key={index}>
                                                        <div className="offer_area">
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
                                                                        <p className="first">{room?.room_type}</p>
                                                                    </div>
                                                                ))}
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
                                                    </div>
                                                ))}

                                            </div>

                                            <motion.div variants={variants} className="col-lg-12 p-0 mt-3">
                                                <div className="bookflightPassenger">
                                                    <form>
                                                        <div className="bookFlightPassInner">
                                                            <div className="bookAdultIndex">
                                                                <p>Amenities</p>
                                                            </div>
                                                            <div className="row g-3 ">
                                                                <div className="col-lg-12 my-4">
                                                                    <div className="hotelReviewAmetnities">
                                                                        <div>
                                                                            {hotelinfoGRN?.facilities.split(';').map((item, index) => (
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
                                            </motion.div>

                                            <motion.div variants={variants} className="col-lg-12 p-0 mt-3">
                                                <div className="bookflightPassenger">
                                                    <form>
                                                        <div className="bookFlightPassInner">
                                                            <div className="bookAdultIndex">
                                                                <p>Cancellation and Charges</p>
                                                            </div>
                                                            {
                                                                hotelinfoGRN?.rate?.non_refundable === true ?
                                                                    (
                                                                        <div className="row g-3 ">
                                                                            <div className="hotelNameAccord">
                                                                                <p>Non Refundable</p>
                                                                            </div>

                                                                        </div>
                                                                    )
                                                                    :

                                                                    (
                                                                        <div className="row g-3 ">
                                                                            <div className="hotelNameAccord">
                                                                                <p>{hotelinfoGRN?.rate?.rooms?.[0]?.description}</p>
                                                                            </div>
                                                                            <div className="otherDetailsData">
                                                                                <div className="row">
                                                                                    <div className="col-lg-4">
                                                                                        <div className="cancelAccord">
                                                                                            <span>Cancelled by date</span>
                                                                                            <p>{dayjs(hotelinfoGRN?.rate?.cancellation_policy?.cancel_by_date).format("DD MMM, YY")}</p>
                                                                                        </div>
                                                                                    </div>
                                                                                    {/* <div className="col-lg-4">
                                                                    <div className="cancelAccord">
                                                                        <span>Cancelled on or Before</span>
                                                                        <p>20 march</p>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-4">
                                                                    <div className="cancelAccord">
                                                                        <span>Cancellation Charges</span>
                                                                        <p>100%</p>
                                                                    </div>
                                                                </div> */}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                            }

                                                        </div>
                                                    </form>
                                                </div>
                                            </motion.div>

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
                            </div>
                        </div>
                    </div>
                </>
            )}

        </>
    );
};

export default HotelBookRoomGRN;
