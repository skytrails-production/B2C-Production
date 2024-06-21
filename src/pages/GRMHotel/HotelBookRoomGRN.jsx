import * as React from "react";
import { useState } from "react";
import { Box } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import hotelNotFound from "../../images/hotelNotFound.jpg";
import chevrondown from "../../images/chevrondown.svg";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";
import dayjs from "dayjs";
import "react-image-gallery/styles/css/image-gallery.css";
import { Skeleton, Space } from 'antd';
import { HotelRoomSelectReqGRN, clearHotelRoomSelect } from "../../Redux/HotelGRN/hotel";
import { swalModal } from "../../utility/swal";
import { Image } from 'antd';

const variants2 = {
    enter: (direction) => {
        return {
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        };
    },
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1
    },
    exit: (direction) => {
        return {
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        };
    }
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
};


const HotelBookRoomGRN = () => {


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);
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



    // new values 
    const hotelinfoGRN = reducerState?.hotelSearchResultGRN?.hotelDetails?.data?.data?.hotel;
    const hotelMainReducer = reducerState?.hotelSearchResultGRN?.ticketData?.data?.data;
    const hotelGallery = reducerState?.hotelSearchResultGRN?.hotelGallery?.data?.data?.images?.regular;

    useEffect(() => {
        if (reducerState?.hotelSearchResultGRN?.hotelDetails?.status === 200 && reducerState?.hotelSearchResultGRN?.hotelGallery?.data?.data) {
            setLoader(false)
        }
    }, [reducerState?.hotelSearchResultGRN?.hotelDetails?.status || reducerState?.hotelSearchResultGRN?.hotelGallery?.data?.data?.images])




    useEffect(() => {
        dispatch(clearHotelRoomSelect())
    }, [])


    // image slider logic 


    const [[page, direction], setPage] = useState([0, 0]);
    const imageIndex = wrap(0, hotelGallery?.length, page);

    const paginate = (newDirection) => {
        setPage([page + newDirection, newDirection]);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            paginate(1);
        }, 2000);

        return () => {
            clearTimeout(timer);
        };
    }, [page]);

    // image slider logic


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


    const searchId = reducerState?.hotelSearchResultGRN?.ticketData
        ?.data?.data?.search_id;



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


    console.log(hotelGallery, "hotel gallery ")


    return (
        <>
            {loader ? (
                // <Hotelmainloading />
                <>
                    <div className="my-4 ">
                        <div className="container">
                            <div className="row">

                                {/* gallery  */}
                                <div className="col-lg-12 mb-4">
                                    <div className="row g-3">
                                        <div className="col-lg-6">
                                            <div className="antImgGall" style={{ position: 'relative' }}>
                                                {/* <Image width={'100%'} src={hotelGallery?.[0]?.url} /> */}
                                                <Skeleton.Image className="skeWidth" active={true} style={{ height: 390 }} />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="row g-3">
                                                {hotelGallery?.slice(1, 5).map((item, index) => (
                                                    <div className="col-lg-6">
                                                        <div className=" antImgGallSmall" >
                                                            <Skeleton.Image className="skeWidth" style={{ height: 187 }} active={true} />

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

                                            {/* hotel details  */}
                                            <div className="col-lg-12 p-0">
                                                <div className="hotelDetails">
                                                    <div>
                                                        <div>
                                                            <p className="hotelName">
                                                                <Skeleton.Input active={true} style={{ width: "350px", height: 30 }} />
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <Box>

                                                                <Space>
                                                                    <Skeleton.Avatar active={true} shape="circle" />
                                                                    <Skeleton.Avatar active={true} shape="circle" />
                                                                    <Skeleton.Avatar active={true} shape="circle" />
                                                                </Space>
                                                            </Box>
                                                        </div>
                                                        <div>
                                                            <p className="text-start addReview">
                                                                <Skeleton.Input active={true} style={{ width: "300px", height: 10 }} />
                                                                <Skeleton.Input active={true} style={{ width: "300px", height: 10 }} />
                                                                <Skeleton.Input active={true} style={{ width: "300px", height: 10 }} />
                                                            </p>
                                                        </div>
                                                        <div className="mapp">
                                                            <Space>
                                                                <Skeleton.Button active={true} style={{ width: "20px", height: 30 }} />
                                                                <Skeleton.Input active={true} style={{ width: "70px", height: 15 }} />

                                                            </Space>
                                                        </div>
                                                    </div>
                                                    <div className="hotelImageReview">
                                                        <Skeleton.Image active={true} style={{ width: 250, height: 170 }} />
                                                    </div>
                                                </div>
                                            </div>


                                            {/* check in check out  */}
                                            <motion.div variants={variants} className="col-lg-12 p-0 mt-3">
                                                <div className="roomDetailsReviewDesc">
                                                    <div className="row">
                                                        <motion.div variants={variants} className="col-lg-4 col-4">
                                                            <div className="checkInReview">
                                                                <Skeleton.Button active={true} style={{ height: 10 }} />
                                                                <Skeleton.Button active={true} style={{ height: 10 }} />
                                                                <Skeleton.Button active={true} style={{ height: 10 }} />

                                                            </div>
                                                        </motion.div>
                                                        <motion.div variants={variants} className="col-lg-4 col-4">
                                                            <div className="checkInReview">
                                                                <Skeleton.Button active={true} style={{ height: 10 }} />
                                                                <Skeleton.Button active={true} style={{ height: 10 }} />
                                                                <Skeleton.Button active={true} style={{ height: 10 }} />
                                                            </div>
                                                        </motion.div>
                                                        <motion.div variants={variants} className="col-lg-4 col-4">
                                                            <div className="checkInReview">
                                                                <Skeleton.Button active={true} style={{ height: 10 }} />
                                                                <Skeleton.Button active={true} style={{ height: 10 }} />
                                                            </div>
                                                        </motion.div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        </div>

                                        {/* room select details sectin  */}

                                        <motion.div
                                            variants={variants}
                                            initial="initial"
                                            whileInView="animate"
                                            className="row"
                                        >
                                            <div className="mt-3 p-0">

                                                <div className="roomCompo">
                                                    <div className="offer_area">
                                                        <div>
                                                            <div className="insideOffer">
                                                                <Skeleton.Avatar active={true} shape="circle" />

                                                                <div className="inneraccorHotel">

                                                                    <div className="ratePlan" >
                                                                        <Skeleton.Button active={true} style={{ height: 20 }} />
                                                                    </div>

                                                                </div>
                                                            </div>

                                                            <div className="insideOffer">

                                                                <div className="inneraccorHotel">

                                                                    <div className="ratePlan" >
                                                                        <Skeleton.Button active={true} style={{ height: 10 }} />
                                                                    </div>

                                                                </div>

                                                                <div className="inneraccorHotel">

                                                                    <div className="ratePlan" >
                                                                        <Skeleton.Button active={true} style={{ height: 10 }} />
                                                                    </div>

                                                                </div>



                                                            </div>


                                                        </div>
                                                        <div className="priceCheck">
                                                            <Skeleton.Button active={true} style={{ height: 20 }} />
                                                            <div>
                                                                <Skeleton.Button active={true} style={{ height: 20 }} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>


                                            </div>


                                        </motion.div>
                                        <motion.div
                                            variants={variants}
                                            initial="initial"
                                            whileInView="animate"
                                            className="row"
                                        >
                                            <div className="mt-3 p-0">

                                                <div className="roomCompo">
                                                    <div className="offer_area">
                                                        <div>
                                                            <div className="insideOffer">
                                                                <Skeleton.Avatar active={true} shape="circle" />

                                                                <div className="inneraccorHotel">

                                                                    <div className="ratePlan" >
                                                                        <Skeleton.Button active={true} style={{ height: 20 }} />
                                                                    </div>

                                                                </div>
                                                            </div>

                                                            <div className="insideOffer">

                                                                <div className="inneraccorHotel">

                                                                    <div className="ratePlan" >
                                                                        <Skeleton.Button active={true} style={{ height: 10 }} />
                                                                    </div>

                                                                </div>

                                                                <div className="inneraccorHotel">

                                                                    <div className="ratePlan" >
                                                                        <Skeleton.Button active={true} style={{ height: 10 }} />
                                                                    </div>

                                                                </div>



                                                            </div>


                                                        </div>
                                                        <div className="priceCheck">
                                                            <Skeleton.Button active={true} style={{ height: 20 }} />
                                                            <div>
                                                                <Skeleton.Button active={true} style={{ height: 20 }} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>


                                            </div>




                                            <div className="col-lg-12">
                                                <div className="reviewDescriptionButton">

                                                    <Skeleton.Button active={true} style={{ height: 30, width: 120 }} />

                                                </div>
                                            </div>


                                        </motion.div>

                                    </div>
                                </div>

                                {/* Amenities  */}

                                <div className="col-lg-4 ">
                                    <motion.div className="col-lg-12 p-0 ">
                                        <div className="bookflightPassenger">
                                            <form>
                                                <div className="bookFlightPassInner">
                                                    <div className="bookAdultIndex">
                                                        <Skeleton.Button active={true} style={{ height: 15 }} />
                                                    </div>
                                                    <div className="row g-3 ">
                                                        <div className="col-lg-12 my-4">
                                                            <div className="hotelReviewAmetnities">
                                                                <div>
                                                                    <Skeleton.Button active={true} style={{ height: 10 }} />
                                                                    <Skeleton.Button active={true} style={{ height: 10 }} />
                                                                    <Skeleton.Button active={true} style={{ height: 10 }} />
                                                                    <Skeleton.Button active={true} style={{ height: 10 }} />
                                                                    <Skeleton.Button active={true} style={{ height: 10 }} />
                                                                    <Skeleton.Button active={true} style={{ height: 10 }} />
                                                                    <Skeleton.Button active={true} style={{ height: 10 }} />
                                                                    <Skeleton.Button active={true} style={{ height: 10 }} />
                                                                    <Skeleton.Button active={true} style={{ height: 10 }} />
                                                                    <Skeleton.Button active={true} style={{ height: 10 }} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </motion.div>
                                </div>


                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <>


                    <div className="my-4 ">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12 mb-4">
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
                                            <div className="col-lg-12 p-0">
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

                                            {/* {
                                                reducerState?.hotelSearchResultGRN?.hotelGallery?.data?.data?.errors?.length !== 0 &&
                                                <div className="col-lg-12 mb-0 mt-3  packageImgBox">
                                                    <div className="PackageImg hotelGall">
                                                        {
                                                            hotelGallery?.length > 0 &&
                                                            <>
                                                                <AnimatePresence initial={false} custom={direction}>


                                                                    <motion.img
                                                                        key={page}
                                                                        // src={images[imageIndex]}
                                                                        src={hotelGallery[imageIndex]?.url}
                                                                        custom={direction}
                                                                        variants={variants2}
                                                                        initial="enter"
                                                                        animate="center"
                                                                        exit="exit"
                                                                        transition={{
                                                                            x: { type: "spring", stiffness: 300, damping: 30 },
                                                                            opacity: { duration: 0.2 }
                                                                        }}
                                                                        drag="x"
                                                                        dragConstraints={{ left: 0, right: 0 }}
                                                                        dragElastic={1}
                                                                        onDragEnd={(e, { offset, velocity }) => {
                                                                            const swipe = swipePower(offset.x, velocity.x);

                                                                            if (swipe < -swipeConfidenceThreshold) {
                                                                                paginate(1);
                                                                            } else if (swipe > swipeConfidenceThreshold) {
                                                                                paginate(-1);
                                                                            }
                                                                        }}
                                                                    />


                                                                </AnimatePresence>
                                                                <div className="next" onClick={() => paginate(1)}>
                                                                    <svg enable-background="new 0 0 256 256" height="12" viewBox="0 0 256 256" width="12" xmlns="http://www.w3.org/2000/svg" id="fi_9903638"><g id="_x30_7_Arrow_Right"><g><path d="m228.992 146.827-180.398 103.224c-17.497 9.998-38.04-7.264-31.166-26.206l34.642-95.842-34.642-95.843c-6.874-18.982 13.669-36.205 31.166-26.207l180.398 103.224c14.606 8.319 14.568 29.331 0 37.65z"></path></g></g></svg>
                                                                </div>
                                                                <div className="prev" onClick={() => paginate(-1)}>
                                                                    <svg enable-background="new 0 0 256 256" height="12" viewBox="0 0 256 256" width="12" xmlns="http://www.w3.org/2000/svg" id="fi_9903638"><g id="_x30_7_Arrow_Right"><g><path d="m228.992 146.827-180.398 103.224c-17.497 9.998-38.04-7.264-31.166-26.206l34.642-95.842-34.642-95.843c-6.874-18.982 13.669-36.205 31.166-26.207l180.398 103.224c14.606 8.319 14.568 29.331 0 37.65z"></path></g></g></svg>
                                                                </div>
                                                            </>



                                                        }


                                                    </div>
                                                </div>
                                            } */}


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



                                            <div className="mt-3 p-0">
                                                {hotelinfoGRN?.rates?.map((item, index) => (
                                                    <div className="roomCompo" key={index}>
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

                                                                <div className="insideOffer">
                                                                    {
                                                                        item?.pan_required &&
                                                                        <div className="inneraccorHotel">

                                                                            <div className="ratePlan" >
                                                                                <p className="panDesign">Pan Required</p>
                                                                            </div>

                                                                        </div>
                                                                    }
                                                                    {
                                                                        item?.non_refundable &&
                                                                        <div className="inneraccorHotel">

                                                                            <div className="ratePlan" >
                                                                                <p className="panDesign2">Non Refundable</p>
                                                                            </div>

                                                                        </div>
                                                                    }
                                                                    {
                                                                        item?.cancellation_policy &&
                                                                        <div className="inneraccorHotel">

                                                                            <div className="ratePlan" >
                                                                                <p className="panDesign3">Refundable (Cancel Before {dayjs(item?.cancellation_policy?.cancel_by_date).format("DD MMM, YY")})</p>
                                                                            </div>

                                                                        </div>
                                                                    }
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
                                                    </div>
                                                ))}

                                            </div>



                                            {/* <motion.div variants={variants} className="col-lg-12 p-0 mt-3">
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
                                                                                            <p>{dayjs(hotelinfoGRN?.rates?.cancellation_policy?.cancel_by_date).format("DD MMM, YY")}</p>
                                                                                        </div>
                                                                                    </div>

                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                            }

                                                        </div>
                                                    </form>
                                                </div>
                                            </motion.div> */}

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

                                {/* <div className="col-lg-4">
                                    <div className="row g-3">
                                        {hotelGallery?.slice(0, 10).map((item, index) => (
                                            <div key={index} className={`col-lg-${index < 2 ? '12' : '6'}`}>
                                                <div className="antImgGall" style={{ position: 'relative' }}>
                                                    <Image width={index < 2 ? '100%' : '100%'} src={item?.url} />
                                                    <div className="caption-container">
                                                        <p className="caption-text">{item.caption}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div> */}

                                <div className="col-lg-4 ">
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
