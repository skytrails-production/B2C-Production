import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import HotelGuestDetailsGRN from "./HotelGuestDetailsGRN";
import PriceSummaryGRN from "./PriceSummaryGRN";
import { Skeleton, Space } from 'antd';
import { motion } from "framer-motion";
import { swalModal } from "../../utility/swal";
import { Navigate, useNavigate } from "react-router-dom";
import HotelGalleryCarousel from "./HotelGalleryCarousel";
import "./bookingDetailsGRN.scss"

const BookingDetailsGRN = () => {
    const reducerState = useSelector((state) => state);
    const [loader, setLoader] = useState(true);
    const navigate = useNavigate()


    useEffect(() => {
        if (reducerState?.hotelSearchResultGRN?.hotelRoom?.length > 0 || reducerState?.hotelSearchResultGRN?.hotelRoom?.hotel) {
            setLoader(false)
        }

    }, [reducerState?.hotelSearchResultGRN?.hotelRoom?.hotel])



    useEffect(() => {
        if (reducerState?.hotelSearchResultGRN?.hotelRoom?.errors?.length > 0) {

            swalModal('hotel', "Session Expired", false);
            navigate("/st-hotel")
        }
    }, [reducerState?.hotelSearchResultGRN?.hotelRoom?.errors])

    const hotelGallery =
        reducerState?.hotelSearchResultGRN?.hotelGallery?.data?.data?.images
            ?.regular;



    return (

        <>
            {loader ? (
                <>
                    <div style={{ width: '100vw' }}>
                        <div style={{ width: '100%' }}>
                            <Skeleton.Input active={true} style={{ width: "100vw", height: 240 }} />
                        </div>
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
                                                                <Skeleton.Input active={true} style={{ width: "350px", height: 30 }} />
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <div>

                                                                <Space>
                                                                    <Skeleton.Avatar active={true} shape="circle" />
                                                                    <Skeleton.Avatar active={true} shape="circle" />
                                                                    <Skeleton.Avatar active={true} shape="circle" />
                                                                </Space>
                                                            </div>
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


                                            {/* <div className="col-lg-12 mb-3 mt-3  packageImgBox">
                                                

                                                <Skeleton.Image className="PackageImg skeWidth " active={true} style={{ height: 400 }} />

                                               
                                            </div> */}





                                            <div className="col-lg-12 mt-3 p-0">
                                                <div className="roomDetailsReviewDesc">
                                                    <div className="row">
                                                        <div className="col-lg-4 col-4">
                                                            <div className="checkInReview">
                                                                <Skeleton.Button active={true} style={{ height: 10 }} />
                                                                <Skeleton.Button active={true} style={{ height: 10 }} />
                                                                <Skeleton.Button active={true} style={{ height: 10 }} />

                                                            </div>
                                                        </div>
                                                        <div className="col-lg-4 col-4">
                                                            <div className="checkInReview">
                                                                <Skeleton.Button active={true} style={{ height: 10 }} />
                                                                <Skeleton.Button active={true} style={{ height: 10 }} />
                                                                <Skeleton.Button active={true} style={{ height: 10 }} />
                                                            </div>
                                                        </div>
                                                        <motion.div className="col-lg-4 col-4">
                                                            <div className="checkInReview">
                                                                <Skeleton.Button active={true} style={{ height: 10 }} />
                                                                <Skeleton.Button active={true} style={{ height: 10 }} />
                                                            </div>
                                                        </motion.div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* guest details sectin  */}

                                        <motion.div

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

                                            <motion.div className="col-lg-12 p-0 mt-3">
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
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </motion.div>


                                            <div className="col-lg-12">
                                                <div className="reviewDescriptionButton">

                                                    <Skeleton.Button active={true} style={{ height: 30, width: 120 }} />

                                                </div>
                                            </div>


                                        </motion.div>
                                    </div>
                                </div>
                                <div className="col-lg-3 order-lg-2 order-md-1 order-sm-1 order-1">
                                    <div className="priceSummaryHotel">
                                        {/* <div className="head"> */}
                                        <Skeleton.Button active={true} style={{ width: "50px", height: 30 }} />
                                        {/* </div> */}


                                        <div className="priceChart">
                                            <div>
                                                <Skeleton.Button active={true} style={{ width: "20px", height: 10 }} />
                                            </div>
                                            <div>
                                                <Skeleton.Button active={true} style={{ width: "40px", height: 10 }} />
                                                <p>
                                                    <Skeleton.Button active={true} style={{ width: "30px", height: 10 }} />
                                                </p>
                                            </div>
                                            <div>
                                                <Skeleton.Button active={true} style={{ width: "60px", height: 10 }} />
                                                <p>
                                                    <Skeleton.Button active={true} style={{ width: "40px", height: 10 }} />
                                                </p>
                                            </div>

                                            <div>
                                                <Skeleton.Button active={true} style={{ width: "60px", height: 10 }} />
                                                <p>
                                                    <Skeleton.Button active={true} style={{ width: "40px", height: 10 }} />
                                                </p>
                                            </div>
                                        </div>
                                        <div className="TotGst">
                                            <div>
                                                <Skeleton.Button active={true} style={{ width: "60px", height: 13 }} />
                                                <p>
                                                    <Skeleton.Button active={true} style={{ width: "40px", height: 13 }} />
                                                </p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div className="my-4">


                    <div className="container bookingDetailsMain">

                        <div className="row">
                            <HotelGalleryCarousel data={hotelGallery} />
                        </div>

                        <div className="row gy-4">
                            <div className="col-lg-8">
                                <HotelGuestDetailsGRN />
                            </div>
                            <div className="col-lg-4">
                                <PriceSummaryGRN />
                            </div>
                        </div>
                    </div>

                </div>
            )}
        </>

    );
};

export default BookingDetailsGRN;
