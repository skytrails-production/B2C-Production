import * as React from "react";

import HotelGuestDetailsGRN from "./HotelGuestDetailsGRN";
import PriceSummaryGRN from "./PriceSummaryGRN";
import moment from "moment";
import { useState, useRef, useCallback } from "react";
import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import StarIcon from "@mui/icons-material/Star";
import { useDispatch, useSelector, useReducer } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PassengersAction } from "../../Redux/Passengers/passenger";
import { useEffect } from "react";
import HotelLoading from "../Hotel/hotelLoading/HotelLoading";
import hotelNotFound from "../../images/hotelNotFound.jpg";
import chevrondown from "../../images/chevrondown.svg";
import login01 from "../../images/login-01.jpg";
import Login from "../../components/Login";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import dayjs, { Dayjs } from "dayjs";
import { hotelBookRoomActionGRN } from "../../Redux/HotelGRN/hotel";
import { apiURL } from "../../Constants/constant";
import { motion } from "framer-motion";
import useRazorpay from "react-razorpay";
import PaymentLoader from "../flight/FlightLoader/paymentLoader";
import axios from "axios";
import { SpinnerCircular } from "spinners-react";
import { swalModal } from "../../utility/swal";
import {
    convertMillisecondsToMinutesAndSeconds,
    checkSearchTime,
} from "../../utility/utils";
import flightPaymentLoding from "../../images/loading/loading-ban.gif";
import SecureStorage from "react-secure-storage";


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



const BookingReviewGRN = ({
    toggleState,
    setCouponAmountFun,
    couponAmount,
}) => {


    const couponconfirmation3 = async () => {
        try {
            const token = SecureStorage.getItem("jwtToken");
            const response = await axios.get(
                `${apiURL.baseURL
                }/skyTrails/api/coupons/couponApplied/${sessionStorage.getItem(
                    "couponCode"
                )}`,

                {
                    headers: {
                        token: token,
                    },
                }
            );
        } catch (error) {
            // console.log(error);
        }
    };


    const apiUrlPayment = `${apiURL.baseURL}/skyTrails/api/transaction/easebussPayment`;


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    const reducerState = useSelector((state) => state);
    const authenticUser = reducerState?.logIn?.loginData?.status;
    let bookingStatus = reducerState?.hotelSearchResult?.bookRoom?.BookResult?.Status || false;
    const [bookingSuccess, setBookingSuccess] = useState(bookingStatus);
    const [loaderPayment1, setLoaderPayment1] = useState(false);
    const [loaderPayment, setLoaderPayment] = useState(false);

    const hotelinfoGRN = reducerState?.hotelSearchResultGRN?.hotelRoom?.hotel;
    const hotelMainReducer = reducerState?.hotelSearchResultGRN?.ticketData?.data?.data;

    const passenger = reducerState?.passengers?.passengersData;
    const [isDisableScroll, setIsDisableScroll] = useState(false);
    // const [sub, setSub] = useState(false);
    const emailRef = useRef();

    const star = (data) => {
        const stars = [];
        for (let i = 0; i < data; i++) {
            stars.push(<StarIcon key={i} style={{ color: "#FF8900" }} />);
        }
        return stars;
    };


    useEffect(() => {
        if (
            reducerState?.hotelSearchResultGRN?.bookRoom?.status ===
            "confirmed"
        ) {
            setLoaderPayment(false);
            navigate("/hotel/hotelsearchGRM/guestDetails/review/ticket");
            return;
        }
    }, [reducerState?.hotelSearchResultGRN?.bookRoom?.status]);

    useEffect(() => {
        if (
            reducerState?.hotelSearchResult?.bookRoom?.BookResult?.Error
                ?.ErrorCode !== 0 &&
            reducerState?.hotelSearchResult?.bookRoom?.BookResult?.Error
                ?.ErrorCode !== undefined
        ) {
            swalModal(
                "py",
                "Booking Issue - Your refund will be processed within 7 working days. We apologize for any inconvenience caused.",
                true
            );
        }
    }, [reducerState?.hotelSearchResult?.bookRoom]);




    useEffect(() => {
        if (loaderPayment == true) {
            handleClickBooking();
        }
    }, [loaderPayment]);

    function generateMixedString() {
        const fixedText = "skyTrails_";
        const currentTime = Date.now().toString(); //add current time
        return fixedText + currentTime;
    }

    const mixedString = generateMixedString();

    const selectedFromData = JSON.parse(sessionStorage.getItem("clientNationality"));

    console.log(selectedFromData, "selected from data")
    const handleClickBooking = async () => {

        const payload = {
            "search_id": reducerState?.hotelSearchResultGRN?.hotelDetails?.data?.data?.search_id,
            "hotel_code": hotelinfoGRN?.hotel_code,
            "city_code": hotelinfoGRN?.city_code,
            "group_code": hotelinfoGRN?.rate?.group_code,
            "checkout": hotelMainReducer?.checkout,
            "checkin": hotelMainReducer?.checkin,
            "booking_comments": "Test booking",
            "payment_type": "AT_WEB",
            "agent_reference": mixedString,
            "booking_items": [
                {
                    "room_code": hotelinfoGRN?.rate?.room_code,
                    "rate_key": hotelinfoGRN?.rate?.rate_key,
                    "rooms": passenger.map((item, index) => ({
                        "room_reference": hotelinfoGRN?.rate?.rooms?.[index]?.room_reference,
                        "paxes": [
                            ...item.adults.map(adult => ({
                                "title": adult.Title,
                                "name": adult.FirstName,
                                "surname": adult.LastName,
                                "type": "AD"
                            })),
                            ...item.children.map(child => ({
                                "title": child.Title,
                                "name": child.FirstName,
                                "surname": child.LastName,
                                "type": "CH",
                                "age": child.age
                            }))
                        ],

                    }))
                }
            ],
            "holder": {
                "title": passenger?.[0]?.adults?.[0]?.Title,
                "name": passenger?.[0]?.adults?.[0]?.FirstName,
                "surname": passenger?.[0]?.adults?.[0]?.LastName,
                "email": passenger?.[0]?.adults?.[0]?.Email,
                "phone_number": passenger?.[0]?.adults?.[0]?.Phoneno,
                "client_nationality": selectedFromData?.countryCode,
                "pan_number": passenger?.[0]?.adults?.[0]?.PAN,
            }
        };



        console.log(payload, "payload")

        dispatch(hotelBookRoomActionGRN(payload));
    };


    useEffect(() => {
        if (isDisableScroll) {
            document.body.classList.add("disableTrue");
            document.body.classList.remove("disableFalse");
        } else {
            document.body.classList.remove("disableTrue");
            document.body.classList.add("disableFalse");
        }
        return () => {
            document.body.classList.add("disableFalse");

            document.body.classList.remove("disableTrue");
        };
    }, [isDisableScroll]);



    const [paymentLoading, setPaymentLoading] = useState(false);


    const handlePayment = async () => {
        setPaymentLoading(true);
        setIsDisableScroll(true);
        // setSub(true);
        setLoaderPayment1(true);
        if (!checkSearchTime()) {
            navigate("/");
            return;
        } else {
            const token = SecureStorage?.getItem("jwtToken");
            const payload = {
                firstname: passenger?.[0]?.adults?.[0]?.FirstName,
                phone: passenger?.[0]?.adults?.[0]?.Phoneno,
                amount: 1,
                email: passenger?.[0]?.adults?.[0]?.Email,
                productinfo: "ticket",
                bookingType: "HOTELS",
                surl: `${apiURL.baseURL}/skyTrails/successVerifyApi?merchantTransactionId=`,
                furl: `${apiURL.baseURL}/skyTrails/paymentFailure?merchantTransactionId=`,
            };

            try {
                const response = await fetch(apiUrlPayment, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        token: token,
                    },
                    body: JSON.stringify(payload),
                });

                if (response.ok) {
                    const data = await response.json();

                    proceedPayment(data.result.access, "prod", data.result.key);
                } else {
                    console.error("API call failed with status:", response.status);
                    const errorData = await response.json();
                    console.error("Error details:", errorData);
                    setIsDisableScroll(false);
                }
            } catch (error) {
                console.error("API call failed with an exception:", error.message);
                setIsDisableScroll(false);
            } finally {
                setPaymentLoading(false);
                setLoaderPayment1(false);
            }
        }
    };




    const proceedPayment = (accessKey, env, key) => {
        const easebuzzCheckout = new window.EasebuzzCheckout(key, env);
        const options = {
            access_key: `${accessKey}`,
            onResponse: async (response) => {
                if (response.status === "success") {
                    try {
                        const easeBuzzPayId = response.easepayid;
                        const verifyResponse = await axios.post(
                            `${apiURL.baseURL}/skyTrails/api/transaction/paymentSuccess?merchantTransactionId=${response.txnid}`,
                            { easeBuzzPayId: easeBuzzPayId }
                        );
                        setLoaderPayment(true);
                        // couponconfirmation3();
                    } catch (error) {
                        console.error("Error verifying payment:", error);
                        // Handle error
                    }
                } else {
                    try {
                        const verifyResponse = await axios.post(
                            `${apiURL.baseURL}/skyTrails/api/transaction/paymentFailure?merchantTransactionId=${response.txnid}`
                        );
                        swalModal("hotel", verifyResponse.data.responseMessage, false);

                        sessionStorage.removeItem("couponCode");
                        toggleState(false);
                        // setCouponAmountFun(null);
                    } catch (error) {
                        console.error("Error verifying payment:", error);
                        // Handle error
                    } finally {
                        setIsDisableScroll(false);
                    }
                }
            },
            theme: "#123456",
        };

        easebuzzCheckout.initiatePayment(options);
    };


    return (

        <>
            <div className='mainimgHotelSearch'>
            </div>

            <div className="my-4 ">
                <div className="container">
                    <div className="row gy-4">
                        <div className="col-lg-9 order-lg-1 order-md-2 order-sm-2 order-2">
                            <div className="container">
                                <motion.div
                                    variants={variants}
                                    initial="initial"
                                    whileInView="animate"
                                    viewport={{ once: true, amount: 0.8 }}
                                    className="row"
                                >



                                    <motion.div variants={variants} className="col-lg-12 p-0 reviewTMT">
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
                                    </motion.div>


                                    {/* room details area  */}

                                    <motion.div variants={variants} className="col-lg-12 p-0">
                                        <div className="roomDetails">
                                            <div className="row">
                                                <div className="col-lg-9 mb-md-3">
                                                    <p className="titles ">{hotelinfoGRN?.rate?.rooms?.[0]?.description}</p>
                                                </div>
                                                {/* <div className="col-lg-3 adultss ">
                                        <p>
                                            {hotelMainReducer?.no_of_adults} Adult(s){" "}
                                            {hotelMainReducer?.no_of_children.length > 0
                                                ? `${hotelMainReducer?.no_of_children} Child(s)`
                                                : ""}
                                        </p>
                                    </div> */}
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
                                </motion.div>

                                {/* guest details section  */}

                                <motion.div variants={variants} className="col-lg-12 p-0 mt-3">
                                    <div className="bookflightPassenger">
                                        <form>
                                            <div className="bookFlightPassInner">
                                                <div className="bookAdultIndex">
                                                    <p>Your Booking Details will be sent to</p>
                                                </div>
                                                <div className="row g-3 mb-3">
                                                    <div className="col-lg-5 col-md-5">
                                                        <div className="bookDetail">
                                                            <div>
                                                                <p>Phone No :</p>

                                                            </div>
                                                            <div>
                                                                <span>
                                                                    {passenger?.[0]?.adults?.[0]?.Phoneno}
                                                                </span>

                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div className="col-lg-5 col-md-5">
                                                        <div className="bookDetail">
                                                            <div>
                                                                <p>Email :</p>

                                                            </div>
                                                            <div>
                                                                <span>
                                                                    {passenger?.[0]?.adults?.[0]?.Email}
                                                                </span>

                                                            </div>
                                                        </div>

                                                    </div>

                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </motion.div>

                                <motion.div
                                    variants={variants}
                                    initial="initial"
                                    whileInView="animate"
                                    className="row"
                                >




                                    <motion.div variants={variants} className="col-lg-12 p-0 mt-3">
                                        <div className="bookflightPassenger">
                                            <div className="headingBookFlight">
                                                <h3>Guest Details</h3>
                                            </div>

                                            {
                                                passenger?.map((item, index) => {
                                                    return (
                                                        <div>
                                                            <label className="roomIndexGuest">
                                                                Room {index + 1}
                                                            </label>

                                                            {item?.adults.length > 0 &&
                                                                item?.adults?.map((i, adultIndex) => (

                                                                    <div className="bookFlightPassInner">
                                                                        <div className="bookAdultIndex">
                                                                            <p>
                                                                                Adult {adultIndex + 1}
                                                                                {
                                                                                    index === 0 && (
                                                                                        <span>{adultIndex == 0 ? "(Lead Guest)" : ""}</span>
                                                                                    )
                                                                                }
                                                                            </p>
                                                                        </div>
                                                                        <div className="row g-3 mb-3">
                                                                            <div className="passengerDetailsGuestBody">
                                                                                <div>
                                                                                    <p>Name :</p>
                                                                                    {index === 0 && adultIndex == 0 && (
                                                                                        <p>PAN : </p>)}
                                                                                </div>
                                                                                <div>
                                                                                    <span>
                                                                                        {i?.Title?.toUpperCase()}{" "}
                                                                                        {i?.FirstName?.toUpperCase()}{" "}
                                                                                        {i?.LastName?.toUpperCase()}
                                                                                    </span>
                                                                                    {index === 0 && (<span>{i?.PAN}</span>)}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )
                                                                )}

                                                            {item?.children.length > 0 &&
                                                                item?.children?.map((i, childIndex) => (
                                                                    <div className="bookFlightPassInner">
                                                                        <div className="bookAdultIndex">
                                                                            <p>Child {childIndex + 1}</p>
                                                                        </div>
                                                                        <div className="passengerDetailsGuestBody">
                                                                            <div>
                                                                                <p>Name :</p>
                                                                                {/* <p>PAN : </p> */}
                                                                            </div>
                                                                            <div>
                                                                                <span>
                                                                                    {i?.Title?.toUpperCase()}{" "}
                                                                                    {i?.FirstName?.toUpperCase()}{" "}
                                                                                    {i?.LastName?.toUpperCase()}
                                                                                </span>
                                                                                {/* <span>{i?.PAN}</span> */}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )
                                                                )}
                                                        </div>
                                                    )
                                                })
                                            }

                                        </div>
                                    </motion.div>

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

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                    }

                                                </div>
                                            </form>
                                        </div>
                                    </motion.div>


                                    {/* <div className="guestDetailsHistoryDesc mt-3">
                                        {paymentLoading ? (
                                            <button type="submit" onClick={handlePayment}>
                                                <SpinnerCircular
                                                    secondaryColor="white"
                                                    size={20}
                                                    сolor="#ffffff"
                                                />
                                            </button>
                                        ) : (
                                            <button type="submit" onClick={handlePayment}>
                                                Continue
                                            </button>
                                        )}
                                    </div>
                                    <Modal open={loaderPayment1} onClose={loaderPayment1}>
                                        <div
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                            }}
                                        >
                                            <img src={flightPaymentLoding} alt="" />
                                           
                                        </div>
                                    </Modal> */}

                                    <div className="col-lg-12">
                                        <div className="reviewDescriptionButton">

                                            <button
                                                type="submit"
                                                onClick={handleClickBooking}

                                            >
                                                Pay Now
                                            </button>

                                        </div>
                                    </div>

                                    {/* <Modal open={bookingSuccess}>
                                        <Box sx={styleLoader}>
                                            <CircularProgress size={70} thickness={4} />
                                        </Box>
                                    </Modal> */}
                                </motion.div>
                            </div>
                        </div>
                        <div className="col-lg-3 order-lg-2 order-md-1 order-sm-1 order-1">
                            <PriceSummaryGRN />
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default BookingReviewGRN;
