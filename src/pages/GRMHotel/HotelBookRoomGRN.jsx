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


    // console.log(hotelinfoGRN, "hotel hotelinfoGRN ")



    useEffect(() => {
        dispatch(clearHotelRoomSelect())
    }, [])


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





    return (
        <>
            {loader ? (
                // <Hotelmainloading />
                <>
                    <div className="my-4 ">
                        <div className="container">
                            <div className="row">

                                <div className="col-lg-12 mb-4">
                                    <div className="bookRoomHotDetails">
                                        <div>
                                            <div>
                                                <p className="hotelName">
                                                    <Skeleton.Input active={true} style={{ width: "350px", height: 20, marginBottom: "5px" }} />
                                                </p>
                                            </div>

                                            <div>
                                                <p className="text-start">
                                                    <Skeleton.Input active={true} style={{ width: "350px", height: 10 }} />
                                                </p>
                                            </div>
                                        </div>

                                        <div className="hotelBookDesignFirst">
                                            <div>
                                                <Box>

                                                    <Space>
                                                        <Skeleton.Avatar active={true} shape="circle" />
                                                        <Skeleton.Avatar active={true} shape="circle" />
                                                        <Skeleton.Avatar active={true} shape="circle" />
                                                    </Space>
                                                </Box>
                                            </div>
                                            <div className="mapp">
                                                <Space>

                                                    <Skeleton.Input active={true} style={{ width: "50px", height: 15 }} />

                                                </Space>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                {/* gallery  */}
                                <div className="col-lg-12 mb-4">
                                    <div className="row g-3">
                                        <div className="col-lg-6">
                                            <div className="antImgGall" style={{ position: 'relative' }}>
                                                {/* <Image width={'100%'} src={hotelGallery?.[0]?.url} /> */}
                                                <Skeleton.Image className="skeWidth" active={true} style={{ height: 330 }} />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="row g-3">
                                                {hotelGallery?.slice(1, 5).map((item, index) => (
                                                    <div className="col-lg-6">
                                                        <div className=" antImgGallSmall" >
                                                            <Skeleton.Image className="skeWidth" style={{ height: 157 }} active={true} />

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



                                            {/* check in check out  */}
                                            <motion.div variants={variants} className="col-lg-12 p-0">
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
                                                            <div className="hotelReviewAmetnities2">
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


                                            {/* <motion.div variants={variants} className="col-lg-12 p-0">
                                                <div className="roomDetails">
                                                    <div className="row">
                                                        <div className="col-lg-9 mb-md-3">
                                                            <p className="titles ">{hotelinfoGRN?.rate?.rooms?.[0]?.description}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div> */}

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
                                                                {/* <div className="othInc">
                                                                    {item?.other_inclusions?.map((inclusion, e) => (
                                                                        <div className="othIncInner">
                                                                            <div className="d-flex justify-content-start align-items-center gap-2" key={e}>
                                                                                <p className="panDesign3">{inclusion}</p>
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div> */}

                                                                <div className="othInc">
                                                                    {item?.other_inclusions?.map((inclusion, e) => (
                                                                        <div className="othIncInner" key={e}>
                                                                            <div className="d-flex justify-content-start align-items-center gap-2">
                                                                                {inclusion.toLowerCase() == "free wifi" &&
                                                                                    <>
                                                                                        <svg fill="none" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg" id="fi_11530392"><g fill="rgb(0,0,0)"><path d="m21.4841 10.027c-5.0345-4.77114-12.78606-5.02226-18.10593-.75253-.29509.23686-.58281.48769-.86227.75253-.30065.2849-.77535.2722-1.06028-.02847-.28492-.30065-.27217-.77536.02848-1.06028.30934-.29316.62805-.57103.95513-.83357 5.89983-4.73522 14.49327-4.45767 20.07667.83357.3006.28492.3134.75962.0285 1.06027-.2849.30068-.7597.31338-1.0603.02848z"></path><path d="m4.46967 12.3691c4.15889-4.15885 10.90173-4.15885 15.06063 0 .2929.2929.2929.7678 0 1.0607s-.7677.2929-1.0606 0c-3.5731-3.5731-9.36627-3.5731-12.93937 0-.2929.2929-.76777.2929-1.06066 0-.2929-.2929-.2929-.7678 0-1.0607z"></path><path d="m7.46967 15.6265c2.50204-2.502 6.55863-2.502 9.06063 0 .2929.2929.2929.7678 0 1.0607s-.7677.2929-1.0606 0c-1.9163-1.9163-5.0231-1.9163-6.93937 0-.2929.2929-.76777.2929-1.06066 0-.2929-.2929-.2929-.7678 0-1.0607z"></path><path d="m12 20c.6903 0 1.25-.5597 1.25-1.25 0-.6904-.5597-1.25-1.25-1.25-.6904 0-1.25.5596-1.25 1.25 0 .6903.5596 1.25 1.25 1.25z"></path></g></svg>
                                                                                        <p className="panDesign3">Free WiFi</p>
                                                                                    </>

                                                                                }
                                                                                {inclusion.toLowerCase() == "free internet" &&
                                                                                    <>
                                                                                        <svg fill="none" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg" id="fi_11530392"><g fill="rgb(0,0,0)"><path d="m21.4841 10.027c-5.0345-4.77114-12.78606-5.02226-18.10593-.75253-.29509.23686-.58281.48769-.86227.75253-.30065.2849-.77535.2722-1.06028-.02847-.28492-.30065-.27217-.77536.02848-1.06028.30934-.29316.62805-.57103.95513-.83357 5.89983-4.73522 14.49327-4.45767 20.07667.83357.3006.28492.3134.75962.0285 1.06027-.2849.30068-.7597.31338-1.0603.02848z"></path><path d="m4.46967 12.3691c4.15889-4.15885 10.90173-4.15885 15.06063 0 .2929.2929.2929.7678 0 1.0607s-.7677.2929-1.0606 0c-3.5731-3.5731-9.36627-3.5731-12.93937 0-.2929.2929-.76777.2929-1.06066 0-.2929-.2929-.2929-.7678 0-1.0607z"></path><path d="m7.46967 15.6265c2.50204-2.502 6.55863-2.502 9.06063 0 .2929.2929.2929.7678 0 1.0607s-.7677.2929-1.0606 0c-1.9163-1.9163-5.0231-1.9163-6.93937 0-.2929.2929-.76777.2929-1.06066 0-.2929-.2929-.2929-.7678 0-1.0607z"></path><path d="m12 20c.6903 0 1.25-.5597 1.25-1.25 0-.6904-.5597-1.25-1.25-1.25-.6904 0-1.25.5596-1.25 1.25 0 .6903.5596 1.25 1.25 1.25z"></path></g></svg>
                                                                                        <p className="panDesign3">Free internet</p>
                                                                                    </>

                                                                                }
                                                                                {inclusion.toLowerCase() == "free breakfast" &&
                                                                                    <>
                                                                                        <svg id="fi_3480666" enable-background="new 0 0 512 512" height="20" viewBox="0 0 512 512" width="20" xmlns="http://www.w3.org/2000/svg"><g><path d="m256 0c-.004 0 0 0-.004 0-65.016 0-127.003 24.406-174.531 68.719-3.03 2.824-3.196 7.57-.372 10.6 2.826 3.031 7.57 3.196 10.6.371 44.745-41.717 103.097-64.691 164.307-64.69 132.888 0 241 108.112 241 241s-108.112 241-241 241-241-108.112-241-241c0-55.019 19.023-108.824 53.565-151.503 2.605-3.221 2.108-7.942-1.112-10.549-3.219-2.605-7.941-2.108-10.548 1.111-36.696 45.342-56.905 102.499-56.905 160.941 0 141.491 114.497 256 256 256 141.491 0 256-114.497 256-256 0-141.491-114.497-256-256-256z"></path><path d="m263.348 303.167c-30.115 9.294-45.936 40.794-36.947 69.923 7.28 23.594 28.748 39.445 53.419 39.445 30.347 0 55.949-24.332 55.949-55.917 0-37.488-36.162-64.642-72.421-53.451zm16.472 94.368c-18.051 0-33.758-11.601-39.086-28.867v-.001c-6.58-21.321 4.995-44.364 27.037-51.167 26.462-8.168 52.998 11.603 52.998 39.118 0 23.167-18.807 40.917-40.949 40.917z"></path><path d="m264.175 158.61 27.15-27.149c2.929-2.929 2.929-7.678 0-10.606-2.928-2.93-7.677-2.929-10.606-.001l-27.15 27.149c-2.929 2.929-2.929 7.678 0 10.606 2.928 2.93 7.676 2.93 10.606.001z"></path><path d="m278.546 183.588c2.93 2.929 7.678 2.928 10.606 0l27.15-27.15c2.929-2.93 2.929-7.678 0-10.607-2.929-2.928-7.678-2.928-10.606 0l-27.15 27.15c-2.929 2.929-2.929 7.677 0 10.607z"></path><path d="m303.523 208.565c2.93 2.929 7.678 2.928 10.606 0l27.15-27.15c2.929-2.93 2.929-7.678 0-10.607-2.929-2.928-7.678-2.928-10.606 0l-27.15 27.15c-2.929 2.93-2.929 7.678 0 10.607z"></path><path d="m331.786 447.118c28.725-15.705 30.65-28.125 54.507-52.374 5.827-5.923 10.239-12.875 13.1-20.431 27.481-33.256 42.607-75.208 42.607-118.313 0-88.731-63.206-165.556-150.357-182.556l-41.895-40.828c-10.645-10.375-28.597-2.821-28.597 12.062v28.615c-10.472 1.996-20.776 4.904-30.751 8.675-22.708-10.121-47.042 6.469-64.031 24.776-41.106 44.294-70.065 128.027-65.095 188.271 2.13 25.816 11.64 54.634 37.03 59.467 7.551 12.049 16.452 23.207 26.547 33.256-2.29 8.567-2.295 17.869.505 26.937 7.669 24.855 30.285 41.556 56.276 41.556 16.173 0 20.126-5.862 38.843-5.862 26.409 0 37.551 14.873 75.932 8.871 4.093-.641 6.891-4.477 6.251-8.569s-4.482-6.895-8.568-6.251c-34.968 5.471-43.32-9.051-73.614-9.051-20.992 0-25.428 5.862-38.843 5.862-19.37 0-36.226-12.449-41.943-30.979-2.197-7.118-1.966-14.62.617-21.577.046-.105.101-.204.143-.311 3.723-9.639 11.541-16.917 21.344-19.941 12.951-3.998 20.156-17.123 17.381-29.793-.6-2.733-3.666-10.332-2.029-21.508 1.964-13.108 9.959-25.363 22.505-32.137.001 0 .001-.001.002-.001 5.794-3.126 7.95-3.335 53.619-17.426 8.707-2.687 17.718-4.056 26.771-4.056 27.233 0 53.871 12.676 71.095 34.138 12.223 15.231 21.054 21.548 24.463 25.01 16.717 16.98 16.861 44.44.002 61.577-25.026 25.439-25.307 35.684-51.008 49.731-3.635 1.987-4.971 6.544-2.984 10.179 1.984 3.632 6.54 4.968 10.175 2.981zm83.662-253.021-101.675-99.086c47.115 16.847 83.954 53.412 101.675 99.086zm-179.297-114.503v-34.917c0-1.601 1.91-2.507 3.128-1.319l181.776 177.149c1.208 1.178.368 3.161-1.286 3.161h-181.775c-1.016 0-1.842-.826-1.842-1.842v-142.232zm-159.928 214.185c-4.624-56.053 22.89-135.617 61.141-176.834 13.867-14.943 27.561-22.99 38.693-22.99 2.342 0 4.572.356 6.665 1.08 12.36 4.268 16.801 19.343 9.413 29.996-5.598 8.074-10.931 17.153-15.619 25.939-9.66-3.34-15.966-6.746-24.605-2.547-9.561 4.647-13.538 16.147-8.889 25.708 2.246 4.621 6.158 8.091 11.013 9.769l5.911 2.044c-2.112 4.994-4.177 10.105-6.184 15.307l-14.682-5.077c-10.023-3.465-20.998 1.872-24.463 11.894-1.679 4.856-1.366 10.075.88 14.695 2.246 4.621 6.158 8.091 11.013 9.769l14.69 5.08c-1.634 5.329-3.175 10.625-4.598 15.855l-5.913-2.045c-10.021-3.463-20.997 1.872-24.463 11.894-1.679 4.856-1.366 10.075.88 14.695 2.246 4.621 6.158 8.091 11.013 9.769l9.918 3.429c-1.921 10.832-3.205 20.971-3.745 30.043v.005c-1.386 23.159-42.853 35.754-48.069-27.478zm93.417-129.315c-1.223 2.524-2.437 5.095-3.637 7.702l-7.066-2.443c-5.178-1.788-2.636-9.864 2.768-8.003zm-21.087 50.856c-.925 2.605-1.892 5.406-2.768 8.004l-14.375-4.971c-2.216-.765-3.381-3.178-2.618-5.385.76-2.199 3.168-3.383 5.386-2.619zm-15.699 52.72c-.667 2.793-1.3 5.564-1.897 8.305l-7.936-2.744c-2.217-.766-3.381-3.178-2.617-5.385.761-2.202 3.171-3.382 5.385-2.619zm229.979 20.209c-19.51-24.311-49.032-39.087-80.763-39.719-10.9-.21-22.028 1.237-33.224 4.691-49.021 15.126-49.514 14.899-56.305 18.548-.02.01-.04.02-.059.031-15.543 8.375-26.435 23.225-29.749 40.569-.014.073-.026.146-.04.219-3.112 16.631 1.757 27.609 2.028 30.521.445 4.868-2.583 9.507-7.352 10.977-10.25 3.163-19.499 9.691-25.843 19.028-5.829-6.19-11.188-12.797-16.033-19.769 13.084-4.387 22.9-16.562 23.773-31.202 3.27-54.86 33.866-143.376 65.197-188.565 8.314-11.99 8.496-28.168-.367-40.521 5.603-1.788 11.3-3.286 17.056-4.484 0 144.375-.154 134.22.343 136.644 1.573 7.667 8.373 13.452 16.5 13.452 195.905 0 183.754.509 188.012-1.186.657 6.093.993 12.268.993 18.517 0 31.148-8.588 61.645-24.536 88.118-4.709-29.423-19.972-31.372-39.631-55.869z"></path></g></svg>
                                                                                        <p className="panDesign3">Free Breakfast</p>
                                                                                    </>
                                                                                }
                                                                                {inclusion.toLowerCase() == "breakfast" &&
                                                                                    <>
                                                                                        <svg id="fi_3480666" enable-background="new 0 0 512 512" height="20" viewBox="0 0 512 512" width="20" xmlns="http://www.w3.org/2000/svg"><g><path d="m256 0c-.004 0 0 0-.004 0-65.016 0-127.003 24.406-174.531 68.719-3.03 2.824-3.196 7.57-.372 10.6 2.826 3.031 7.57 3.196 10.6.371 44.745-41.717 103.097-64.691 164.307-64.69 132.888 0 241 108.112 241 241s-108.112 241-241 241-241-108.112-241-241c0-55.019 19.023-108.824 53.565-151.503 2.605-3.221 2.108-7.942-1.112-10.549-3.219-2.605-7.941-2.108-10.548 1.111-36.696 45.342-56.905 102.499-56.905 160.941 0 141.491 114.497 256 256 256 141.491 0 256-114.497 256-256 0-141.491-114.497-256-256-256z"></path><path d="m263.348 303.167c-30.115 9.294-45.936 40.794-36.947 69.923 7.28 23.594 28.748 39.445 53.419 39.445 30.347 0 55.949-24.332 55.949-55.917 0-37.488-36.162-64.642-72.421-53.451zm16.472 94.368c-18.051 0-33.758-11.601-39.086-28.867v-.001c-6.58-21.321 4.995-44.364 27.037-51.167 26.462-8.168 52.998 11.603 52.998 39.118 0 23.167-18.807 40.917-40.949 40.917z"></path><path d="m264.175 158.61 27.15-27.149c2.929-2.929 2.929-7.678 0-10.606-2.928-2.93-7.677-2.929-10.606-.001l-27.15 27.149c-2.929 2.929-2.929 7.678 0 10.606 2.928 2.93 7.676 2.93 10.606.001z"></path><path d="m278.546 183.588c2.93 2.929 7.678 2.928 10.606 0l27.15-27.15c2.929-2.93 2.929-7.678 0-10.607-2.929-2.928-7.678-2.928-10.606 0l-27.15 27.15c-2.929 2.929-2.929 7.677 0 10.607z"></path><path d="m303.523 208.565c2.93 2.929 7.678 2.928 10.606 0l27.15-27.15c2.929-2.93 2.929-7.678 0-10.607-2.929-2.928-7.678-2.928-10.606 0l-27.15 27.15c-2.929 2.93-2.929 7.678 0 10.607z"></path><path d="m331.786 447.118c28.725-15.705 30.65-28.125 54.507-52.374 5.827-5.923 10.239-12.875 13.1-20.431 27.481-33.256 42.607-75.208 42.607-118.313 0-88.731-63.206-165.556-150.357-182.556l-41.895-40.828c-10.645-10.375-28.597-2.821-28.597 12.062v28.615c-10.472 1.996-20.776 4.904-30.751 8.675-22.708-10.121-47.042 6.469-64.031 24.776-41.106 44.294-70.065 128.027-65.095 188.271 2.13 25.816 11.64 54.634 37.03 59.467 7.551 12.049 16.452 23.207 26.547 33.256-2.29 8.567-2.295 17.869.505 26.937 7.669 24.855 30.285 41.556 56.276 41.556 16.173 0 20.126-5.862 38.843-5.862 26.409 0 37.551 14.873 75.932 8.871 4.093-.641 6.891-4.477 6.251-8.569s-4.482-6.895-8.568-6.251c-34.968 5.471-43.32-9.051-73.614-9.051-20.992 0-25.428 5.862-38.843 5.862-19.37 0-36.226-12.449-41.943-30.979-2.197-7.118-1.966-14.62.617-21.577.046-.105.101-.204.143-.311 3.723-9.639 11.541-16.917 21.344-19.941 12.951-3.998 20.156-17.123 17.381-29.793-.6-2.733-3.666-10.332-2.029-21.508 1.964-13.108 9.959-25.363 22.505-32.137.001 0 .001-.001.002-.001 5.794-3.126 7.95-3.335 53.619-17.426 8.707-2.687 17.718-4.056 26.771-4.056 27.233 0 53.871 12.676 71.095 34.138 12.223 15.231 21.054 21.548 24.463 25.01 16.717 16.98 16.861 44.44.002 61.577-25.026 25.439-25.307 35.684-51.008 49.731-3.635 1.987-4.971 6.544-2.984 10.179 1.984 3.632 6.54 4.968 10.175 2.981zm83.662-253.021-101.675-99.086c47.115 16.847 83.954 53.412 101.675 99.086zm-179.297-114.503v-34.917c0-1.601 1.91-2.507 3.128-1.319l181.776 177.149c1.208 1.178.368 3.161-1.286 3.161h-181.775c-1.016 0-1.842-.826-1.842-1.842v-142.232zm-159.928 214.185c-4.624-56.053 22.89-135.617 61.141-176.834 13.867-14.943 27.561-22.99 38.693-22.99 2.342 0 4.572.356 6.665 1.08 12.36 4.268 16.801 19.343 9.413 29.996-5.598 8.074-10.931 17.153-15.619 25.939-9.66-3.34-15.966-6.746-24.605-2.547-9.561 4.647-13.538 16.147-8.889 25.708 2.246 4.621 6.158 8.091 11.013 9.769l5.911 2.044c-2.112 4.994-4.177 10.105-6.184 15.307l-14.682-5.077c-10.023-3.465-20.998 1.872-24.463 11.894-1.679 4.856-1.366 10.075.88 14.695 2.246 4.621 6.158 8.091 11.013 9.769l14.69 5.08c-1.634 5.329-3.175 10.625-4.598 15.855l-5.913-2.045c-10.021-3.463-20.997 1.872-24.463 11.894-1.679 4.856-1.366 10.075.88 14.695 2.246 4.621 6.158 8.091 11.013 9.769l9.918 3.429c-1.921 10.832-3.205 20.971-3.745 30.043v.005c-1.386 23.159-42.853 35.754-48.069-27.478zm93.417-129.315c-1.223 2.524-2.437 5.095-3.637 7.702l-7.066-2.443c-5.178-1.788-2.636-9.864 2.768-8.003zm-21.087 50.856c-.925 2.605-1.892 5.406-2.768 8.004l-14.375-4.971c-2.216-.765-3.381-3.178-2.618-5.385.76-2.199 3.168-3.383 5.386-2.619zm-15.699 52.72c-.667 2.793-1.3 5.564-1.897 8.305l-7.936-2.744c-2.217-.766-3.381-3.178-2.617-5.385.761-2.202 3.171-3.382 5.385-2.619zm229.979 20.209c-19.51-24.311-49.032-39.087-80.763-39.719-10.9-.21-22.028 1.237-33.224 4.691-49.021 15.126-49.514 14.899-56.305 18.548-.02.01-.04.02-.059.031-15.543 8.375-26.435 23.225-29.749 40.569-.014.073-.026.146-.04.219-3.112 16.631 1.757 27.609 2.028 30.521.445 4.868-2.583 9.507-7.352 10.977-10.25 3.163-19.499 9.691-25.843 19.028-5.829-6.19-11.188-12.797-16.033-19.769 13.084-4.387 22.9-16.562 23.773-31.202 3.27-54.86 33.866-143.376 65.197-188.565 8.314-11.99 8.496-28.168-.367-40.521 5.603-1.788 11.3-3.286 17.056-4.484 0 144.375-.154 134.22.343 136.644 1.573 7.667 8.373 13.452 16.5 13.452 195.905 0 183.754.509 188.012-1.186.657 6.093.993 12.268.993 18.517 0 31.148-8.588 61.645-24.536 88.118-4.709-29.423-19.972-31.372-39.631-55.869z"></path></g></svg>
                                                                                        <p className="panDesign3">Breakfast</p>
                                                                                    </>
                                                                                }
                                                                                {inclusion.toLowerCase() == "continental breakfast" &&
                                                                                    <>
                                                                                        <svg id="fi_3480666" enable-background="new 0 0 512 512" height="20" viewBox="0 0 512 512" width="20" xmlns="http://www.w3.org/2000/svg"><g><path d="m256 0c-.004 0 0 0-.004 0-65.016 0-127.003 24.406-174.531 68.719-3.03 2.824-3.196 7.57-.372 10.6 2.826 3.031 7.57 3.196 10.6.371 44.745-41.717 103.097-64.691 164.307-64.69 132.888 0 241 108.112 241 241s-108.112 241-241 241-241-108.112-241-241c0-55.019 19.023-108.824 53.565-151.503 2.605-3.221 2.108-7.942-1.112-10.549-3.219-2.605-7.941-2.108-10.548 1.111-36.696 45.342-56.905 102.499-56.905 160.941 0 141.491 114.497 256 256 256 141.491 0 256-114.497 256-256 0-141.491-114.497-256-256-256z"></path><path d="m263.348 303.167c-30.115 9.294-45.936 40.794-36.947 69.923 7.28 23.594 28.748 39.445 53.419 39.445 30.347 0 55.949-24.332 55.949-55.917 0-37.488-36.162-64.642-72.421-53.451zm16.472 94.368c-18.051 0-33.758-11.601-39.086-28.867v-.001c-6.58-21.321 4.995-44.364 27.037-51.167 26.462-8.168 52.998 11.603 52.998 39.118 0 23.167-18.807 40.917-40.949 40.917z"></path><path d="m264.175 158.61 27.15-27.149c2.929-2.929 2.929-7.678 0-10.606-2.928-2.93-7.677-2.929-10.606-.001l-27.15 27.149c-2.929 2.929-2.929 7.678 0 10.606 2.928 2.93 7.676 2.93 10.606.001z"></path><path d="m278.546 183.588c2.93 2.929 7.678 2.928 10.606 0l27.15-27.15c2.929-2.93 2.929-7.678 0-10.607-2.929-2.928-7.678-2.928-10.606 0l-27.15 27.15c-2.929 2.929-2.929 7.677 0 10.607z"></path><path d="m303.523 208.565c2.93 2.929 7.678 2.928 10.606 0l27.15-27.15c2.929-2.93 2.929-7.678 0-10.607-2.929-2.928-7.678-2.928-10.606 0l-27.15 27.15c-2.929 2.93-2.929 7.678 0 10.607z"></path><path d="m331.786 447.118c28.725-15.705 30.65-28.125 54.507-52.374 5.827-5.923 10.239-12.875 13.1-20.431 27.481-33.256 42.607-75.208 42.607-118.313 0-88.731-63.206-165.556-150.357-182.556l-41.895-40.828c-10.645-10.375-28.597-2.821-28.597 12.062v28.615c-10.472 1.996-20.776 4.904-30.751 8.675-22.708-10.121-47.042 6.469-64.031 24.776-41.106 44.294-70.065 128.027-65.095 188.271 2.13 25.816 11.64 54.634 37.03 59.467 7.551 12.049 16.452 23.207 26.547 33.256-2.29 8.567-2.295 17.869.505 26.937 7.669 24.855 30.285 41.556 56.276 41.556 16.173 0 20.126-5.862 38.843-5.862 26.409 0 37.551 14.873 75.932 8.871 4.093-.641 6.891-4.477 6.251-8.569s-4.482-6.895-8.568-6.251c-34.968 5.471-43.32-9.051-73.614-9.051-20.992 0-25.428 5.862-38.843 5.862-19.37 0-36.226-12.449-41.943-30.979-2.197-7.118-1.966-14.62.617-21.577.046-.105.101-.204.143-.311 3.723-9.639 11.541-16.917 21.344-19.941 12.951-3.998 20.156-17.123 17.381-29.793-.6-2.733-3.666-10.332-2.029-21.508 1.964-13.108 9.959-25.363 22.505-32.137.001 0 .001-.001.002-.001 5.794-3.126 7.95-3.335 53.619-17.426 8.707-2.687 17.718-4.056 26.771-4.056 27.233 0 53.871 12.676 71.095 34.138 12.223 15.231 21.054 21.548 24.463 25.01 16.717 16.98 16.861 44.44.002 61.577-25.026 25.439-25.307 35.684-51.008 49.731-3.635 1.987-4.971 6.544-2.984 10.179 1.984 3.632 6.54 4.968 10.175 2.981zm83.662-253.021-101.675-99.086c47.115 16.847 83.954 53.412 101.675 99.086zm-179.297-114.503v-34.917c0-1.601 1.91-2.507 3.128-1.319l181.776 177.149c1.208 1.178.368 3.161-1.286 3.161h-181.775c-1.016 0-1.842-.826-1.842-1.842v-142.232zm-159.928 214.185c-4.624-56.053 22.89-135.617 61.141-176.834 13.867-14.943 27.561-22.99 38.693-22.99 2.342 0 4.572.356 6.665 1.08 12.36 4.268 16.801 19.343 9.413 29.996-5.598 8.074-10.931 17.153-15.619 25.939-9.66-3.34-15.966-6.746-24.605-2.547-9.561 4.647-13.538 16.147-8.889 25.708 2.246 4.621 6.158 8.091 11.013 9.769l5.911 2.044c-2.112 4.994-4.177 10.105-6.184 15.307l-14.682-5.077c-10.023-3.465-20.998 1.872-24.463 11.894-1.679 4.856-1.366 10.075.88 14.695 2.246 4.621 6.158 8.091 11.013 9.769l14.69 5.08c-1.634 5.329-3.175 10.625-4.598 15.855l-5.913-2.045c-10.021-3.463-20.997 1.872-24.463 11.894-1.679 4.856-1.366 10.075.88 14.695 2.246 4.621 6.158 8.091 11.013 9.769l9.918 3.429c-1.921 10.832-3.205 20.971-3.745 30.043v.005c-1.386 23.159-42.853 35.754-48.069-27.478zm93.417-129.315c-1.223 2.524-2.437 5.095-3.637 7.702l-7.066-2.443c-5.178-1.788-2.636-9.864 2.768-8.003zm-21.087 50.856c-.925 2.605-1.892 5.406-2.768 8.004l-14.375-4.971c-2.216-.765-3.381-3.178-2.618-5.385.76-2.199 3.168-3.383 5.386-2.619zm-15.699 52.72c-.667 2.793-1.3 5.564-1.897 8.305l-7.936-2.744c-2.217-.766-3.381-3.178-2.617-5.385.761-2.202 3.171-3.382 5.385-2.619zm229.979 20.209c-19.51-24.311-49.032-39.087-80.763-39.719-10.9-.21-22.028 1.237-33.224 4.691-49.021 15.126-49.514 14.899-56.305 18.548-.02.01-.04.02-.059.031-15.543 8.375-26.435 23.225-29.749 40.569-.014.073-.026.146-.04.219-3.112 16.631 1.757 27.609 2.028 30.521.445 4.868-2.583 9.507-7.352 10.977-10.25 3.163-19.499 9.691-25.843 19.028-5.829-6.19-11.188-12.797-16.033-19.769 13.084-4.387 22.9-16.562 23.773-31.202 3.27-54.86 33.866-143.376 65.197-188.565 8.314-11.99 8.496-28.168-.367-40.521 5.603-1.788 11.3-3.286 17.056-4.484 0 144.375-.154 134.22.343 136.644 1.573 7.667 8.373 13.452 16.5 13.452 195.905 0 183.754.509 188.012-1.186.657 6.093.993 12.268.993 18.517 0 31.148-8.588 61.645-24.536 88.118-4.709-29.423-19.972-31.372-39.631-55.869z"></path></g></svg>
                                                                                        <p className="panDesign3">Continental breakfast</p>
                                                                                    </>
                                                                                }
                                                                                {inclusion.toLowerCase() == "free self parking" &&
                                                                                    <>
                                                                                        <svg id="fi_2439889" enable-background="new 0 0 512 512" height="20" viewBox="0 0 512 512" width="20" xmlns="http://www.w3.org/2000/svg"><g><path d="m326 211c0-30.327-24.673-55-55-55h-75c-5.522 0-10 4.478-10 10v90c0 5.522 4.478 10 10 10h75c30.327 0 55-24.673 55-55zm-120-35h65c19.299 0 35 15.701 35 35s-15.701 35-35 35h-65z"></path><path d="m386 211c0-63.411-51.589-115-115-115h-135c-5.522 0-10 4.478-10 10v300c0 5.522 4.478 10 10 10h60c5.522 0 10-4.478 10-10v-80h65c63.411 0 115-51.589 115-115zm-190 95c-5.522 0-10 4.478-10 10v80h-40v-280h125c52.383 0 95 42.617 95 95s-42.617 95-95 95z"></path><circle cx="256" cy="502" r="10"></circle><path d="m472 0h-432c-22.056 0-40 17.944-40 40v432c0 22.056 17.944 40 40 40h171c5.522 0 10-4.478 10-10s-4.478-10-10-10h-171c-11.028 0-20-8.972-20-20v-432c0-11.028 8.972-20 20-20h432c11.028 0 20 8.972 20 20v432c0 11.028-8.972 20-20 20h-171c-5.522 0-10 4.478-10 10s4.478 10 10 10h171c22.056 0 40-17.944 40-40v-432c0-22.056-17.944-40-40-40z"></path></g></svg>
                                                                                        <p className="panDesign3"> Free self parking</p>
                                                                                    </>
                                                                                }
                                                                                {inclusion.toLowerCase() == "parking" &&
                                                                                    <>
                                                                                        <svg id="fi_2439889" enable-background="new 0 0 512 512" height="20" viewBox="0 0 512 512" width="20" xmlns="http://www.w3.org/2000/svg"><g><path d="m326 211c0-30.327-24.673-55-55-55h-75c-5.522 0-10 4.478-10 10v90c0 5.522 4.478 10 10 10h75c30.327 0 55-24.673 55-55zm-120-35h65c19.299 0 35 15.701 35 35s-15.701 35-35 35h-65z"></path><path d="m386 211c0-63.411-51.589-115-115-115h-135c-5.522 0-10 4.478-10 10v300c0 5.522 4.478 10 10 10h60c5.522 0 10-4.478 10-10v-80h65c63.411 0 115-51.589 115-115zm-190 95c-5.522 0-10 4.478-10 10v80h-40v-280h125c52.383 0 95 42.617 95 95s-42.617 95-95 95z"></path><circle cx="256" cy="502" r="10"></circle><path d="m472 0h-432c-22.056 0-40 17.944-40 40v432c0 22.056 17.944 40 40 40h171c5.522 0 10-4.478 10-10s-4.478-10-10-10h-171c-11.028 0-20-8.972-20-20v-432c0-11.028 8.972-20 20-20h432c11.028 0 20 8.972 20 20v432c0 11.028-8.972 20-20 20h-171c-5.522 0-10 4.478-10 10s4.478 10 10 10h171c22.056 0 40-17.944 40-40v-432c0-22.056-17.944-40-40-40z"></path></g></svg>
                                                                                        <p className="panDesign3"> Free Parking</p>
                                                                                    </>
                                                                                }
                                                                                {inclusion.toLowerCase() == "free parking" &&
                                                                                    <>
                                                                                        <svg id="fi_2439889" enable-background="new 0 0 512 512" height="20" viewBox="0 0 512 512" width="20" xmlns="http://www.w3.org/2000/svg"><g><path d="m326 211c0-30.327-24.673-55-55-55h-75c-5.522 0-10 4.478-10 10v90c0 5.522 4.478 10 10 10h75c30.327 0 55-24.673 55-55zm-120-35h65c19.299 0 35 15.701 35 35s-15.701 35-35 35h-65z"></path><path d="m386 211c0-63.411-51.589-115-115-115h-135c-5.522 0-10 4.478-10 10v300c0 5.522 4.478 10 10 10h60c5.522 0 10-4.478 10-10v-80h65c63.411 0 115-51.589 115-115zm-190 95c-5.522 0-10 4.478-10 10v80h-40v-280h125c52.383 0 95 42.617 95 95s-42.617 95-95 95z"></path><circle cx="256" cy="502" r="10"></circle><path d="m472 0h-432c-22.056 0-40 17.944-40 40v432c0 22.056 17.944 40 40 40h171c5.522 0 10-4.478 10-10s-4.478-10-10-10h-171c-11.028 0-20-8.972-20-20v-432c0-11.028 8.972-20 20-20h432c11.028 0 20 8.972 20 20v432c0 11.028-8.972 20-20 20h-171c-5.522 0-10 4.478-10 10s4.478 10 10 10h171c22.056 0 40-17.944 40-40v-432c0-22.056-17.944-40-40-40z"></path></g></svg>
                                                                                        <p className="panDesign3"> Free Parking</p>
                                                                                    </>
                                                                                }
                                                                                {inclusion.toLowerCase() == "free valet parking" &&
                                                                                    <>
                                                                                        <svg id="fi_2439889" enable-background="new 0 0 512 512" height="20" viewBox="0 0 512 512" width="20" xmlns="http://www.w3.org/2000/svg"><g><path d="m326 211c0-30.327-24.673-55-55-55h-75c-5.522 0-10 4.478-10 10v90c0 5.522 4.478 10 10 10h75c30.327 0 55-24.673 55-55zm-120-35h65c19.299 0 35 15.701 35 35s-15.701 35-35 35h-65z"></path><path d="m386 211c0-63.411-51.589-115-115-115h-135c-5.522 0-10 4.478-10 10v300c0 5.522 4.478 10 10 10h60c5.522 0 10-4.478 10-10v-80h65c63.411 0 115-51.589 115-115zm-190 95c-5.522 0-10 4.478-10 10v80h-40v-280h125c52.383 0 95 42.617 95 95s-42.617 95-95 95z"></path><circle cx="256" cy="502" r="10"></circle><path d="m472 0h-432c-22.056 0-40 17.944-40 40v432c0 22.056 17.944 40 40 40h171c5.522 0 10-4.478 10-10s-4.478-10-10-10h-171c-11.028 0-20-8.972-20-20v-432c0-11.028 8.972-20 20-20h432c11.028 0 20 8.972 20 20v432c0 11.028-8.972 20-20 20h-171c-5.522 0-10 4.478-10 10s4.478 10 10 10h171c22.056 0 40-17.944 40-40v-432c0-22.056-17.944-40-40-40z"></path></g></svg>
                                                                                        <p className="panDesign3"> Free Valet Parking</p>
                                                                                    </>
                                                                                }
                                                                                {inclusion.toLowerCase() == "drinking water" &&
                                                                                    <>
                                                                                        <svg id="fi_3105761" enable-background="new 0 0 510.684 510.684" height="22" viewBox="0 0 510.684 510.684" width="20" xmlns="http://www.w3.org/2000/svg"><g><g><path d="m199.242 439.486c-49.257-15.316-82.352-60.297-82.352-111.931 0-25.238 7.901-49.283 22.85-69.536.341-.462.649-.967.906-1.481 2.47-4.939.464-10.938-4.476-13.408-4.471-2.239-9.819-.801-12.625 3.153-17.437 23.688-26.654 51.788-26.654 81.272 0 29.858 9.428 58.247 27.264 82.095 17.24 23.051 41.797 40.43 69.149 48.934.989.308 1.989.454 2.972.454 4.263 0 8.214-2.749 9.546-7.034 1.64-5.274-1.306-10.878-6.58-12.518z"></path><path d="m455.573 233.679c0-19.035-5.932-37.17-17.158-52.464l-63.301-93.971c-1.859-2.759-4.967-4.413-8.294-4.413s-6.435 1.654-8.294 4.413l-26.674 39.597-82.474-122.428c-1.858-2.759-4.967-4.413-8.293-4.413s-6.435 1.654-8.293 4.413l-141.576 210.163c-23.622 32.101-36.105 70.177-36.105 110.134 0 102.546 83.428 185.974 185.974 185.974s185.974-83.428 185.974-185.974c0-8.186-.547-16.387-1.61-24.46 18.458-16.276 30.124-40.085 30.124-66.571zm-88.753-122.949 55.005 81.654c.11.17.226.337.347.501 8.767 11.873 13.401 25.979 13.401 40.793 0 37.91-30.842 68.752-68.753 68.752-37.91 0-68.752-30.842-68.752-68.752 0-14.814 4.634-28.92 13.401-40.793.116-.157.227-.317.334-.482l28.323-42.045c.052-.077.106-.153.156-.232zm40.238 213.98c0 91.519-74.456 165.974-165.974 165.974-91.519 0-165.974-74.455-165.974-165.974 0-35.744 11.19-69.799 32.362-98.481.121-.163.238-.334.351-.509l133.262-197.822 78.711 116.842-24.571 36.476c-11.225 15.293-17.157 33.429-17.157 52.463 0 48.938 39.814 88.752 88.752 88.752 14.31 0 27.837-3.409 39.819-9.45.273 3.9.419 7.816.419 11.729z"></path><path d="m331.561 231.24c0-4.845.987-9.521 2.933-13.898 2.244-5.047-.029-10.957-5.075-13.2-5.047-2.241-10.956.028-13.2 5.075-3.091 6.952-4.658 14.361-4.658 22.023 0 18.149 9.016 35.019 24.117 45.123 1.708 1.143 3.64 1.689 5.552 1.689 3.226 0 6.392-1.558 8.32-4.439 3.071-4.591 1.84-10.802-2.75-13.873-9.542-6.385-15.239-17.039-15.239-28.5z"></path><path d="m236.343 453.34c-2.448-6.434-11.582-8.269-16.31-3.24-5.629 5.455-2.599 15.471 5.12 16.87 7.653 1.677 14.324-6.446 11.19-13.63z"></path><path d="m361.552 285.479c6.448 4.466 15.682-.472 15.55-8.31.145-7.839-9.107-12.787-15.55-8.32-5.84 3.66-5.863 12.982 0 16.63z"></path></g></g></svg>
                                                                                        <p className="panDesign3"> Drinking water</p>
                                                                                    </>
                                                                                }
                                                                                {inclusion.toLowerCase() == "express check-in" &&
                                                                                    <>
                                                                                        <svg height="18pt" viewBox="-18 -29 574.66669 574" width="18pt" xmlns="http://www.w3.org/2000/svg" id="fi_1247000"><path d="m477.570312 32.089844h-55.558593v-21.226563c0-6.203125-5.035157-11.238281-11.238281-11.238281-6.203126 0-11.238282 5.035156-11.238282 11.238281v21.226563h-189.777344v-21.226563c0-6.203125-5.035156-11.238281-11.238281-11.238281s-11.238281 5.035156-11.238281 11.238281v21.226563h-59.304688c-33.773437.039062-61.140624 27.402344-61.179687 61.175781v187.285156c0 6.203125 5.035156 11.234375 11.238281 11.234375s11.234375-5.03125 11.234375-11.234375v-73.664062h427.007813v248.460937c-.027344 21.367188-17.339844 38.679688-38.707032 38.703125h-349.59375c-21.367187-.023437-38.679687-17.335937-38.707031-38.703125v-64.925781c0-6.203125-5.03125-11.238281-11.234375-11.238281s-11.238281 5.035156-11.238281 11.238281v64.925781c.039063 33.773438 27.40625 61.140625 61.179687 61.179688h349.59375c33.773438-.039063 61.140626-27.40625 61.179688-61.179688v-362.082031c-.039062-33.773437-27.40625-61.136719-61.179688-61.175781zm-388.300781 152.320312v-91.144531c.027344-21.367187 17.339844-38.679687 38.707031-38.703125h59.304688v30.511719c-16.921875 5.523437-27.316406 22.527343-24.519531 40.109375 2.796875 17.578125 17.957031 30.515625 35.757812 30.515625s32.960938-12.9375 35.757813-30.515625c2.796875-17.582032-7.597656-34.585938-24.519532-40.109375v-30.511719h189.777344v30.511719c-16.921875 5.523437-27.316406 22.527343-24.519531 40.109375 2.796875 17.578125 17.957031 30.515625 35.757813 30.515625 17.800781 0 32.960937-12.9375 35.757812-30.515625 2.796875-17.582032-7.597656-34.585938-24.519531-40.109375v-30.511719h55.558593c21.367188.023438 38.679688 17.335938 38.707032 38.703125v91.144531zm109.25-78.65625c7.585938 0 13.734375 6.148438 13.734375 13.734375 0 7.582031-6.148437 13.734375-13.734375 13.734375-7.582031 0-13.734375-6.152344-13.734375-13.734375.011719-7.582031 6.15625-13.726562 13.734375-13.734375zm212.253907 0c7.585937 0 13.734374 6.148438 13.734374 13.734375 0 7.582031-6.148437 13.734375-13.734374 13.734375-7.582032 0-13.734376-6.152344-13.734376-13.734375.011719-7.582031 6.15625-13.726562 13.734376-13.734375zm0 0"></path><path d="m193.070312 386.222656c-4.386718 4.390625-4.386718 11.5 0 15.890625 4.390626 4.390625 11.5 4.390625 15.890626 0l58.683593-58.683593c4.386719-4.386719 4.386719-11.5 0-15.886719l-58.683593-58.683594c-4.390626-4.390625-11.5-4.390625-15.890626 0-4.386718 4.390625-4.386718 11.5 0 15.890625l39.5 39.5h-221.332031c-6.203125 0-11.238281 5.03125-11.238281 11.234375 0 6.207031 5.035156 11.238281 11.238281 11.238281h221.332031zm0 0"></path></svg>
                                                                                        <p className="panDesign3"> Express check-in</p>
                                                                                    </>
                                                                                }
                                                                                {inclusion.toLowerCase() == "welcome drink" &&
                                                                                    <>
                                                                                        <svg id="fi_2907439" enable-background="new 0 0 512 512" height="20" viewBox="0 0 512 512" width="20" xmlns="http://www.w3.org/2000/svg"><g><path d="m291.89 66.15c.739.167 1.477.247 2.204.247 4.566 0 8.688-3.156 9.733-7.805l9.658-42.928c1.212-5.388-2.167-10.74-7.548-11.954-5.381-1.217-10.725 2.17-11.938 7.558l-9.658 42.928c-1.211 5.388 2.169 10.74 7.549 11.954z"></path><path d="m244.82 52.527c1.9 3.011 5.14 4.659 8.452 4.659 1.824 0 3.671-.501 5.326-1.548 4.662-2.951 6.054-9.128 3.107-13.797l-23.466-37.182c-2.946-4.669-9.115-6.06-13.778-3.112-4.662 2.951-6.054 9.128-3.107 13.797z"></path><path d="m334.916 75.605c1.825 0 3.671-.501 5.328-1.549l37.161-23.528c4.662-2.952 6.052-9.129 3.104-13.797-2.947-4.667-9.116-6.06-13.778-3.108l-37.161 23.527c-4.662 2.952-6.052 9.129-3.104 13.797 1.9 3.01 5.139 4.658 8.45 4.658z"></path><path d="m458.873 433.94-63.246-27.27-20.276-75.797c26.169-9.789 48.393-30.025 60.591-55.642 11.928-25.051 12.73-52.413 2.329-77.315-.075-.184-.688-1.62-.926-2.152l-43.475-97.377c-2.003-4.486-6.965-6.85-11.702-5.578l-95.558 25.635 1.466-14.165c.503-4.861-2.576-9.374-7.281-10.672l-31.28-8.632c-5.317-1.468-10.816 1.659-12.281 6.984s1.658 10.831 6.975 12.298l23.127 6.382-4.269 41.247c-28.364-13.023-65.602-11.632-91.279 4.869-20.803 13.369-53.869 13.587-76.225 1.432l37.327-83.575 25.216 6.769c5.325 1.431 10.804-1.734 12.232-7.07 1.428-5.335-1.733-10.818-7.06-12.249l-33.442-8.978c-4.737-1.273-9.7 1.091-11.703 5.576l-43.506 97.409c-11.354 25.457-10.852 53.667 1.414 79.434 12.199 25.626 34.435 45.875 60.609 55.671l-20.275 75.796-63.252 27.246c-11.266 4.866-18.327 16.108-17.569 27.975.756 11.851 9.207 21.509 22.055 25.203.058.017.116.033.174.048l88.419 23.702c.052.014.105.028.158.041 2.939.737 5.834 1.096 8.632 1.096 9.566 0 17.993-4.196 23.082-11.842 6.587-9.896 6.087-23.165-1.247-33.023l-41.157-55.266 20.274-75.792c5.854.983 11.788 1.473 17.73 1.473 22.037-.001 44.164-6.67 62.56-19.341 1.615-1.112 3.183-2.266 4.712-3.452 7.391 18.623 20.775 34.52 38.793 45.756 17.56 10.951 38.306 16.686 58.808 16.686 5.884 0 11.747-.477 17.509-1.434l20.276 75.799-41.158 55.269c-7.338 9.855-7.849 23.125-1.271 33.021 5.092 7.661 13.527 11.865 23.105 11.865 2.786 0 5.671-.356 8.596-1.086.057-.014.113-.029.17-.044l88.419-23.73c.056-.015.112-.031.167-.046 12.873-3.696 21.335-13.363 22.085-25.227.75-11.863-6.316-23.087-17.572-27.927zm-174.467-294.198 94.705-25.406 37.308 83.564c-22.347 12.157-55.411 11.933-76.23-1.446-16.363-10.526-38.545-15.161-60.307-13.01zm-122.951 309.606c-2.462 3.7-7.399 3.138-10.174 2.454l-88.236-23.652c-2.737-.799-7.273-2.79-7.557-7.231-.178-2.783 1.482-6.578 5.538-8.331l60.45-26.039 39.336 52.822c2.642 3.549 2.185 7.66.643 9.977zm63.461-187.337c-21.065 14.509-49.249 19.455-73.573 12.905-.001 0-.001 0-.002-.001-.001 0-.002 0-.004-.001-.001 0-.002 0-.003-.001-24.318-6.506-46.26-24.904-57.262-48.016-7.674-16.121-9.525-33.403-5.563-49.826 13.33 6.728 28.858 10.143 44.337 10.142 17.806-.001 35.538-4.504 49.731-13.625 21.446-13.784 55.922-13.6 78.276-.299l-3.628 35.054c-2.251 21.809-13.725 40.868-32.309 53.668zm65.383 41.805c-16.902-10.54-28.63-26.144-33.446-44.288 11.336-13.957 18.344-30.762 20.24-49.126l.678-6.551c18.658-2.803 37.922.616 51.627 9.433 14.21 9.132 31.948 13.639 49.763 13.639 15.472 0 30.992-3.414 44.313-10.138 3.965 16.43 2.116 33.715-5.561 49.837-11 23.103-32.927 41.487-57.249 47.988 0 0-.001 0-.002 0 0 0-.002.001-.003.001-.003.001-.006.002-.009.003-23.187 6.25-49.487 2.214-70.351-10.798zm158.63 164.029-88.232 23.68c-2.774.68-7.705 1.233-10.166-2.471-1.54-2.317-1.991-6.429.656-9.984l39.337-52.823 60.457 26.068c4.049 1.741 5.704 5.517 5.529 8.289-.279 4.447-4.834 6.44-7.581 7.241z"></path><path d="m202.696 92.983c5.516 0 9.987-4.477 9.987-10.001 0-5.523-4.471-10.001-9.987-10.001h-.058c-5.516 0-9.958 4.477-9.958 10.001.001 5.524 4.501 10.001 10.016 10.001z"></path></g></svg>
                                                                                        <p className="panDesign3">Welcome drink</p>
                                                                                    </>
                                                                                }
                                                                                {inclusion.toLowerCase() == "free fitness center access" &&
                                                                                    <>
                                                                                        <svg id="fi_4329323" enable-background="new 0 0 512 512" height="15" viewBox="0 0 512 512" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m502 220.341h-37.223v-54.073c0-14.606-11.883-26.489-26.489-26.489h-21.086c-2.758 0-5.419.424-7.922 1.21-3.578-10.399-13.458-17.891-25.056-17.891h-33.405c-14.606 0-26.489 11.883-26.489 26.488v70.756h-145.256v-70.756c0-14.605-11.883-26.488-26.489-26.488h-33.405c-11.598 0-21.479 7.493-25.056 17.891-2.502-.786-5.163-1.21-7.922-1.21h-21.086c-14.606 0-26.489 11.883-26.489 26.489v54.073h-28.627c-5.523 0-10 4.478-10 10v51.318c0 5.522 4.477 10 10 10h28.627v54.073c0 14.606 11.883 26.489 26.489 26.489h21.086c2.758 0 5.419-.424 7.922-1.21 3.578 10.399 13.458 17.891 25.056 17.891h33.405c14.606 0 26.489-11.883 26.489-26.488v-70.756h145.256v70.756c0 14.605 11.883 26.488 26.489 26.488h33.405c11.598 0 21.478-7.493 25.056-17.891 2.502.786 5.163 1.21 7.922 1.21h21.086c14.606 0 26.489-11.883 26.489-26.489v-54.073h37.223c5.522 0 10-4.478 10-10v-51.318c0-5.523-4.478-10-10-10zm-482 51.318v-31.318h18.627v31.318zm66.202 80.563h-21.086c-3.578 0-6.489-2.911-6.489-6.489v-179.465c0-3.578 2.911-6.489 6.489-6.489h21.086c3.578 0 6.489 2.911 6.489 6.489v179.465c0 3.578-2.911 6.489-6.489 6.489zm72.872 10.193c0 3.577-2.911 6.488-6.489 6.488h-33.405c-3.578 0-6.489-2.911-6.489-6.488v-212.83c0-3.577 2.911-6.488 6.489-6.488h33.405c3.578 0 6.489 2.911 6.489 6.488zm20-90.756v-31.318h145.256v31.318zm211.639 90.756c0 3.577-2.91 6.488-6.488 6.488h-33.405c-3.578 0-6.489-2.911-6.489-6.488v-212.83c0-3.577 2.911-6.488 6.489-6.488h33.405c3.578 0 6.488 2.911 6.488 6.488zm54.064-16.683c0 3.578-2.911 6.489-6.489 6.489h-21.086c-3.578 0-6.489-2.911-6.489-6.489v-179.464c0-3.578 2.911-6.489 6.489-6.489h21.086c3.578 0 6.489 2.911 6.489 6.489zm47.223-74.073h-27.223v-31.318h27.223z"></path></svg>
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
