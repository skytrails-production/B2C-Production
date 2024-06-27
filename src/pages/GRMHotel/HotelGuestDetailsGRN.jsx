import * as React from "react";
import { useState, useRef } from "react";
import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import StarIcon from "@mui/icons-material/Star";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PassengersAction } from "../../Redux/Passengers/passenger";
import { useEffect } from "react";
import hotelNotFound from "../../images/hotelNotFound.jpg";
import chevrondown from "../../images/chevrondown.svg";
import login01 from "../../images/login-01.jpg";
import Login from "../../components/Login";
import Modal from "@mui/material/Modal";
import { motion } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import dayjs from "dayjs";
import "react-image-gallery/styles/css/image-gallery.css";
import axios from "axios";
import { apiURL } from "../../Constants/constant";
import { swalModal } from "../../utility/swal";

import freeWifi from "./SVGs/freeWifi.svg"
import freeBreakfast from "./SVGs/freeBreakfast.svg"
import freeParking from "./SVGs/freeParking.svg"
import drinkingWater from "./SVGs/DrinkingWater.svg"
import expressCheckin from "./SVGs/expressCheckin.svg"
import welcomeDrink from "./SVGs/welcomeDrink.svg"
import freeGym from "./SVGs/freeGym.svg"


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



const HotelGuestDetailsGRN = () => {


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);
    const reducerState = useSelector((state) => state);
    const authenticUser = reducerState?.logIn?.loginData?.status;
    let bookingStatus = reducerState?.hotelSearchResult?.bookRoom?.BookResult?.Status || false;
    const [bookingSuccess, setBookingSuccess] = useState(bookingStatus);




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
    const hotelinfoGRN = reducerState?.hotelSearchResultGRN?.hotelRoom?.hotel;
    const hotelMainReducer = reducerState?.hotelSearchResultGRN?.ticketData?.data?.data;
    // const hotelGallery = reducerState?.hotelSearchResultGRN?.hotelGallery?.data?.data?.images?.regular;



    useEffect(() => {
        if (reducerState?.hotelSearchResultGRN?.hotelRoom?.errors?.length > 0) {

            swalModal('hotel', "room not found", false);
            navigate("/st-hotel/hotelresult/selectroom")
        }
    }, [reducerState?.hotelSearchResultGRN?.hotelDetails?.data?.data?.errors])


    // passenger details adding


    const [passengerData, setPassengerData] = useState([]);

    const initializePassengerData = async () => {
        const initialData = await hotelinfoGRN?.rate?.rooms?.map(room => {
            const adults = Array.from({ length: room.no_of_adults }, () => ({
                Title: 'Mr.',
                FirstName: '',
                LastName: '',
                "type": "AD",
                PAN: '',
                Email: '',
                Phoneno: ''
            }));
            const children = Array.from({ length: room.no_of_children }, (i, index) => ({
                Title: 'Mr.',
                FirstName: '',
                LastName: '',
                "type": "CH",
                age: room?.children_ages?.[index],
            }));
            return { adults, children };
        });
        setPassengerData(initialData);
    };

    useEffect(() => {
        initializePassengerData();
    }, [hotelinfoGRN]);


    const [errors, setErrors] = useState([]);


    const validateForm = (passengerData) => {
        const errors = passengerData.map((room, roomIndex) => {
            const roomErrors = {
                adults: [],
                children: []
            };

            room.adults.forEach((adult, adultIndex) => {
                const adultErrors = {};
                if (!adult.FirstName.trim()) {
                    adultErrors.FirstName = "First Name is required";
                } else if (adult.FirstName.trim().length < 3) {
                    adultErrors.FirstName = "Enter valid name";
                }

                if (!adult.LastName.trim()) {
                    adultErrors.LastName = "Last Name is required";
                } else if (adult.LastName.trim().length < 3) {
                    adultErrors.LastName = "Enter valid name";
                }

                if (roomIndex === 0 && adultIndex === 0) {
                    if (hotelinfoGRN?.rate?.pan_required) {
                        const regexPanValidation = /[A-Z]{5}[0-9]{4}[A-Z]{1}/;
                        if (!regexPanValidation.test(adult.PAN)) {
                            adultErrors.PAN = "Enter Valid PAN ID";
                        }
                    }


                    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                    if (!emailRegex.test(adult.Email)) {
                        adultErrors.Email = "Enter Valid Email";
                    }


                    if (adult.Phoneno.length > 10 || adult.Phoneno.length == 0) {

                        adultErrors.Phoneno = "Enter valid 10 digit phone number";
                    }
                }

                if (Object.keys(adultErrors).length > 0) {
                    roomErrors.adults[adultIndex] = adultErrors;
                }
            });

            room.children.forEach((child, childIndex) => {
                const childErrors = {};
                if (!child.FirstName.trim()) {
                    childErrors.FirstName = "First Name is required";
                } else if (child.FirstName.trim().length < 3) {
                    childErrors.FirstName = "Enter valid name";
                }

                if (!child.LastName.trim()) {
                    childErrors.LastName = "Last Name is required";
                } else if (child.LastName.trim().length < 3) {
                    childErrors.LastName = "Enter valid name";
                }

                if (Object.keys(childErrors).length > 0) {
                    roomErrors.children[childIndex] = childErrors;
                }
            });

            return roomErrors;
        });

        return errors.filter(room => Object.keys(room).length > 0);
    };



    const handlePassengerDataChange = (event, roomIndex, passengerIndex, field, isChild = false) => {
        const newData = [...passengerData];
        if (!newData[roomIndex][isChild ? 'children' : 'adults']) {
            newData[roomIndex][isChild ? 'children' : 'adults'] = [];
        }
        if (!newData[roomIndex][isChild ? 'children' : 'adults'][passengerIndex]) {
            newData[roomIndex][isChild ? 'children' : 'adults'][passengerIndex] = {
                Title: 'Mr.',
                FirstName: '',
                LastName: '',
                PAN: '',
                Email: '',
                Phoneno: ''
            };
        }

        newData[roomIndex][isChild ? 'children' : 'adults'][passengerIndex][field] = event.target.value;
        setPassengerData(newData);
    };


    // passenger details adding




    const star = (data) => {
        const stars = [];
        for (let i = 0; i < data; i++) {
            stars.push(<StarIcon key={i} style={{ color: "#FF8900" }} />);
        }
        return stars;
    };


    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    const handleModalClose = () => {
        setIsLoginModalOpen(false);
    };

    useEffect(() => {
        if (authenticUser == 200) {
            handleModalClose();
        }
    }, [authenticUser]);



    const handleClickSavePassenger = async (e) => {

        e.preventDefault();

        if (authenticUser !== 200) {
            setIsLoginModalOpen(true);
        } else {

            const validationResult = validateForm(passengerData);
            const hasErrors = validationResult.some(room => Object.keys(room).some(key => room[key].length > 0));

            if (hasErrors) {
                setErrors(validationResult);
                return;
            }

            dispatch(PassengersAction(passengerData));

            const payload = {
                "rate_key": hotelinfoGRN?.rate?.rate_key,
                "group_code": hotelinfoGRN?.rate?.group_code
            }

            try {
                setLoader(true)
                const res = await axios({
                    method: "POST",
                    url: `${apiURL.baseURL}/skyTrails/grnconnect/bundledrates?searchId=${reducerState?.hotelSearchResultGRN?.hotelDetails?.data?.data?.search_id}`,
                    data: payload,
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                if (res?.status == 200) {
                    setLoader(false)
                    navigate("/st-hotel/hotelresult/selectroom/guestDetails/review");

                }

            } catch (error) {
                console.log(error)
            }
        }
    };

    const mapUrl = `https://maps.google.com/maps?q=${hotelinfoGRN?.geolocation?.latitude ?? 0},${hotelinfoGRN?.geolocation?.longitude ?? 0}&hl=es&z=14&output=embed`;



    return (
        <>


            <div className="container">
                <div className="row">
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


                    {/* room details area  */}

                    <motion.div variants={variants} className="col-lg-12 p-0 mt-3">
                        <div className="bookflightPassenger">
                            <div className="row">
                                <div className="col-lg-9 mb-md-3">
                                    <p className="titles text-bold text-xxl">Room Type : {" "}{hotelinfoGRN?.rate?.rooms?.[0]?.description}</p>
                                    <span className="text-bold">{hotelinfoGRN?.rate?.boarding_details?.[0]}</span>
                                </div>

                                <div className="othInc">
                                    {
                                        hotelinfoGRN?.rate?.pan_required &&
                                        <div className="othIncInner">

                                            <div className="d-flex justify-content-start align-items-center gap-2" >
                                                <svg id="fi_3596091" enable-background="new 0 0 24 24" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg"><g><path d="m21.5 21h-19c-1.378 0-2.5-1.122-2.5-2.5v-13c0-1.378 1.122-2.5 2.5-2.5h19c1.378 0 2.5 1.122 2.5 2.5v13c0 1.378-1.122 2.5-2.5 2.5zm-19-17c-.827 0-1.5.673-1.5 1.5v13c0 .827.673 1.5 1.5 1.5h19c.827 0 1.5-.673 1.5-1.5v-13c0-.827-.673-1.5-1.5-1.5z"></path></g><g><path d="m7.5 12c-1.378 0-2.5-1.122-2.5-2.5s1.122-2.5 2.5-2.5 2.5 1.122 2.5 2.5-1.122 2.5-2.5 2.5zm0-4c-.827 0-1.5.673-1.5 1.5s.673 1.5 1.5 1.5 1.5-.673 1.5-1.5-.673-1.5-1.5-1.5z"></path></g><g><path d="m11.5 17c-.276 0-.5-.224-.5-.5v-1c0-.827-.673-1.5-1.5-1.5h-4c-.827 0-1.5.673-1.5 1.5v1c0 .276-.224.5-.5.5s-.5-.224-.5-.5v-1c0-1.378 1.122-2.5 2.5-2.5h4c1.378 0 2.5 1.122 2.5 2.5v1c0 .276-.224.5-.5.5z"></path></g><g><path d="m20.5 9h-6c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h6c.276 0 .5.224.5.5s-.224.5-.5.5z"></path></g><g><path d="m20.5 13h-6c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h6c.276 0 .5.224.5.5s-.224.5-.5.5z"></path></g><g><path d="m20.5 17h-6c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h6c.276 0 .5.224.5.5s-.224.5-.5.5z"></path></g></svg>
                                                <p className="panDesign">Pan Required</p>
                                            </div>

                                        </div>
                                    }
                                    {
                                        hotelinfoGRN?.rate?.non_refundable &&
                                        <div className="othIncInner">

                                            <div className="d-flex justify-content-start align-items-center gap-2" >
                                                <svg id="fi_2610380" enable-background="new 0 0 30 30" height="20" viewBox="0 0 30 30" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m15 0c-4.00684 0-7.77344 1.56055-10.60645 4.39355s-4.39355 6.6001-4.39355 10.60645 1.56055 7.77344 4.39355 10.60645 6.59961 4.39355 10.60645 4.39355 7.77344-1.56055 10.60645-4.39355 4.39355-6.6001 4.39355-10.60645-1.56055-7.77344-4.39355-10.60645-6.59961-4.39355-10.60645-4.39355zm-9.19238 24.19238c-2.45508-2.45556-3.80762-5.72021-3.80762-9.19238 0-3.13605 1.11255-6.09662 3.13507-8.45087l18.31592 18.31592c-2.35388 2.02283-5.31445 3.13495-8.45099 3.13495-3.47266 0-6.7373-1.35205-9.19238-3.80762zm19.05731-.74151-18.31592-18.31592c2.35388-2.02283 5.31445-3.13495 8.45099-3.13495 3.47266 0 6.7373 1.35205 9.19238 3.80762s3.80762 5.72021 3.80762 9.19238c0 3.13605-1.11255 6.09662-3.13507 8.45087z" fill="rgb(0,0,0)"></path></svg>
                                                <p className="panDesign2">Non Refundable</p>
                                            </div>

                                        </div>
                                    }
                                    {
                                        hotelinfoGRN?.rate?.cancellation_policy &&
                                        <div className="othIncInner">

                                            <div className="d-flex justify-content-start align-items-center gap-2" >
                                                <svg id="fi_7444875" height="20" viewBox="0 0 128 128" width="20" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1"><path d="m11.59 65.89 11.19 8a2 2 0 0 0 2.79-.47l8-11.19a2 2 0 1 0 -3.27-2.33l-5.18 7.25a41.82 41.82 0 1 1 79.64 6.11 2 2 0 0 0 1.12 2.6 2 2 0 0 0 .74.14 2 2 0 0 0 1.86-1.26 45.82 45.82 0 1 0 -87.31-6.92l-7.26-5.18a2 2 0 1 0 -2.32 3.25z"></path><path d="m113.08 83.24c-4-4.73-10.56-2.56-14.1-1.4-2.24.74-7.61 3-12.9 5.24a8.26 8.26 0 0 0 -.62-5c-2.86-6.53-9.92-5.28-15.08-4.36a27.61 27.61 0 0 1 -4.84.61 20.2 20.2 0 0 1 -8-1.75 24.66 24.66 0 0 0 -10.37-2 50.57 50.57 0 0 0 -19.76 4.42l-1.12.46c-9.29 3.7-13.29 4.54-13.29 4.54a2 2 0 0 0 -1.55 1.48c-.07.29-1.64 7 2.81 16.43 3.82 8 8.29 11.07 11.36 12.18a2 2 0 0 0 1.91-.31s2.51-2 4.43-3.12c1.27-.77 4.36-1.26 11.92.84a92.12 92.12 0 0 0 21.42 3.07 25 25 0 0 0 8.32-1.14c7.89-3 27.09-13 34.64-17.1 4-2.18 6.18-4.53 6.68-7.19a7 7 0 0 0 -1.86-5.9zm-2.08 5.17c-.25 1.35-1.91 2.92-4.66 4.42-6.34 3.47-26.28 13.92-34.13 16.87-5.51 2.06-19.38.14-27.26-2a37.74 37.74 0 0 0 -9.71-1.7 10.14 10.14 0 0 0 -5.37 1.24c-1.35.82-2.89 1.94-3.86 2.66-3-1.5-5.85-4.9-8.14-9.72a25.11 25.11 0 0 1 -2.68-12.62 121.45 121.45 0 0 0 12.59-4.44l1.15-.47a46.3 46.3 0 0 1 18.32-4.1 20.5 20.5 0 0 1 8.88 1.77 23.77 23.77 0 0 0 9.34 2 32.17 32.17 0 0 0 5.61-.67c5.51-1 9.23-1.37 10.71 2a4.22 4.22 0 0 1 .15 3.35c-.56 1.38-2 2.64-4.26 3.66-2 .84-3.5 1.49-4.16 1.75-4.24 1.66-7.89 1.08-11.42.52l-1.94-.3a2 2 0 0 0 -.54 4c.61.08 1.23.18 1.85.28 3.87.61 8.25 1.3 13.51-.75.61-.24 1.83-.75 3.45-1.45.3-.12.59-.24.87-.37l2.58-1.1c6.51-2.8 15.43-6.64 18.36-7.6 4.65-1.53 7.91-2 9.78.18 1.21 1.42 1.04 2.3.98 2.59z"></path><path d="m64 33.76v2.65a8.76 8.76 0 0 0 -2 .72 6.31 6.31 0 0 0 -3.47 5.47c-.14 4.39 3.81 5.86 6.69 6.93 3.36 1.25 4.38 1.89 4.23 3.49a2.76 2.76 0 0 1 -1.84 2.45 6.86 6.86 0 0 1 -5.93-.5 2 2 0 0 0 -2.48 3.15 9.34 9.34 0 0 0 4.8 1.73v2.39a2 2 0 1 0 4 0v-2.69a9.82 9.82 0 0 0 1.23-.4 6.75 6.75 0 0 0 4.25-5.74c.48-4.92-3.91-6.55-6.81-7.63-3.11-1.15-4.14-1.75-4.1-3.05a2.34 2.34 0 0 1 1.36-2.07 6.07 6.07 0 0 1 5.74.49 2 2 0 1 0 2.12-3.39 10.6 10.6 0 0 0 -3.79-1.45v-2.55a2 2 0 1 0 -4 0z"></path><path d="m42 48a24 24 0 1 0 24-24 24 24 0 0 0 -24 24zm44 0a20 20 0 1 1 -20-20 20 20 0 0 1 20 20z"></path></svg>
                                                <p className="panDesign3">Refundable (Cancel Before {dayjs(hotelinfoGRN?.rate?.cancellation_policy?.cancel_by_date).format("DD MMM, YY")})</p>
                                            </div>

                                        </div>
                                    }
                                </div>

                                <div className="othInc">
                                    {hotelinfoGRN?.rate?.other_inclusions?.map((inclusion, e) => (
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

                        </div>
                    </motion.div>

                    <motion.div variants={variants} className="col-lg-12 p-0 mt-3">
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


                    {/* guest details sectin  */}



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
                                        <p>Hotel Location</p>
                                    </div>
                                    <div>
                                        <iframe
                                            width="100%"
                                            height="400px"
                                            src={mapUrl}
                                            className="contact-page-google-map__one"
                                            allowFullScreen
                                        />
                                    </div>

                                </div>
                            </form>
                        </div>
                    </motion.div>


                    <form onSubmit={handleClickSavePassenger} className="col-lg-12 p-0 mt-3">
                        <div >
                            <div className="bookflightPassenger">
                                <div className="headingBookFlight">
                                    <h3>Guest Details</h3>
                                </div>
                                {
                                    hotelinfoGRN?.rate?.rooms?.map((item, roomIndex) => {
                                        return (
                                            <div key={roomIndex}>
                                                <label className="roomIndexGuest">Room {roomIndex + 1}</label>
                                                {item?.no_of_adults > 0 &&
                                                    Array.from({ length: item?.no_of_adults }, (_, adultIndex) => (
                                                        <div className="bookFlightPassInner" key={adultIndex}>
                                                            <div className="bookAdultIndex">
                                                                <p>
                                                                    Adult {adultIndex + 1}
                                                                    {roomIndex === 0 && (
                                                                        <span>{adultIndex === 0 ? "(Lead Guest)" : ""}</span>
                                                                    )}
                                                                </p>
                                                            </div>
                                                            <div className="row g-3 mb-3">
                                                                <div className="col-lg-3 col-md-3">
                                                                    <label htmlFor="floatingInput">Title</label>
                                                                    <select
                                                                        className="form-select"
                                                                        name="Title"
                                                                        onChange={(e) =>
                                                                            handlePassengerDataChange(e, roomIndex, adultIndex, 'Title')
                                                                        }
                                                                    >
                                                                        <option value="Mr.">Mr</option>
                                                                        <option value="Ms.">Miss</option>
                                                                        <option value="Mrs.">Mrs</option>
                                                                        <option value="Mstr.">Mstr</option>
                                                                    </select>
                                                                </div>
                                                                <div className="col-lg-3 col-md-3">
                                                                    <label htmlFor="floatingInput">First Name</label>
                                                                    <input
                                                                        name="FirstName"
                                                                        type="text"
                                                                        className="form-control"
                                                                        style={{
                                                                            borderColor:
                                                                                errors[roomIndex]?.adults?.[adultIndex]?.FirstName ? 'red' : ''
                                                                        }}
                                                                        id="FirstName"
                                                                        onChange={(e) =>
                                                                            handlePassengerDataChange(e, roomIndex, adultIndex, 'FirstName')
                                                                        }
                                                                    />
                                                                    {errors[roomIndex]?.adults?.[adultIndex]?.FirstName && (
                                                                        <div className="error-text">
                                                                            {errors[roomIndex].adults[adultIndex].FirstName}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                <div className="col-lg-3 col-md-3">
                                                                    <label htmlFor="floatingInput">Last Name</label>
                                                                    <input
                                                                        name="LastName"
                                                                        className="form-control"
                                                                        style={{
                                                                            borderColor:
                                                                                errors[roomIndex]?.adults?.[adultIndex]?.LastName ? 'red' : ''
                                                                        }}
                                                                        onChange={(e) =>
                                                                            handlePassengerDataChange(e, roomIndex, adultIndex, 'LastName')
                                                                        }

                                                                    />
                                                                    {errors[roomIndex]?.adults?.[adultIndex]?.LastName && (
                                                                        <div className="error-text">
                                                                            {errors[roomIndex].adults[adultIndex].LastName}
                                                                        </div>
                                                                    )}
                                                                </div>

                                                                {roomIndex === 0 && adultIndex === 0 && (
                                                                    <>
                                                                        <div className="col-lg-3 col-md-3">
                                                                            <label htmlFor="floatingInput">Pan Number</label>
                                                                            <input
                                                                                name="PAN"
                                                                                type="text"
                                                                                placeholder="Write in Capital"
                                                                                className="form-control"
                                                                                style={{
                                                                                    borderColor:
                                                                                        errors[roomIndex]?.adults?.[adultIndex]?.PAN ? 'red' : ''
                                                                                }}
                                                                                onChange={(e) =>
                                                                                    handlePassengerDataChange(e, roomIndex, adultIndex, 'PAN')
                                                                                }

                                                                            />
                                                                            {errors[roomIndex]?.adults?.[adultIndex]?.PAN && (
                                                                                <div className="error-text">
                                                                                    {errors[roomIndex].adults[adultIndex].PAN}
                                                                                </div>
                                                                            )}
                                                                        </div>

                                                                        <div className="col-lg-5 col-md-5">
                                                                            <label htmlFor="floatingInput">Enter Email</label>
                                                                            <input
                                                                                name="Email"
                                                                                id="Email1"
                                                                                className="form-control"
                                                                                style={{
                                                                                    borderColor:
                                                                                        errors[roomIndex]?.adults?.[adultIndex]?.Email ? 'red' : ''
                                                                                }}
                                                                                ref={emailRef}
                                                                                onChange={(e) =>
                                                                                    handlePassengerDataChange(e, roomIndex, adultIndex, 'Email')
                                                                                }

                                                                            />
                                                                            {errors[roomIndex]?.adults?.[adultIndex]?.Email && (
                                                                                <div className="error-text">
                                                                                    {errors[roomIndex].adults[adultIndex].Email}
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                        <div className="col-lg-5 col-md-5">
                                                                            <label htmlFor="floatingInput">Enter Phone</label>
                                                                            <input
                                                                                name="Phoneno"
                                                                                id="phoneNumber1"
                                                                                className="form-control"
                                                                                style={{
                                                                                    borderColor:
                                                                                        errors[roomIndex]?.adults?.[adultIndex]?.Phoneno ? 'red' : ''
                                                                                }}
                                                                                onChange={(e) =>
                                                                                    handlePassengerDataChange(e, roomIndex, adultIndex, 'Phoneno')
                                                                                }

                                                                            />
                                                                            {errors[roomIndex]?.adults?.[adultIndex]?.Phoneno && (
                                                                                <div className="error-text">
                                                                                    {errors[roomIndex].adults[adultIndex].Phoneno}
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    </>
                                                                )}
                                                            </div>
                                                        </div>
                                                    ))}
                                                {item?.no_of_children > 0 &&
                                                    Array.from({ length: item?.no_of_children }, (_, childIndex) => (
                                                        <div className="bookFlightPassInner" key={childIndex}>
                                                            <div className="bookAdultIndex">
                                                                <p>Child {childIndex + 1}</p>
                                                            </div>
                                                            <div className="row g-3 mb-3">
                                                                <div className="col-lg-3 col-md-3">
                                                                    <label htmlFor="floatingInput">Title</label>
                                                                    <select
                                                                        className="form-select"
                                                                        name="Title"
                                                                        onChange={(e) =>
                                                                            handlePassengerDataChange(e, roomIndex, childIndex, 'Title', true)
                                                                        }
                                                                    >
                                                                        <option value="Mr.">Mr</option>
                                                                        <option value="Ms.">Miss</option>
                                                                        <option value="Mrs.">Mrs</option>
                                                                        <option value="Mstr.">Mstr</option>
                                                                    </select>
                                                                </div>
                                                                <div className="col-lg-3 col-md-3">
                                                                    <label htmlFor="floatingInput">First Name</label>
                                                                    <input
                                                                        name="FirstName"
                                                                        className="form-control"
                                                                        style={{
                                                                            borderColor:
                                                                                errors[roomIndex]?.children?.[childIndex]?.FirstName ? 'red' : ''
                                                                        }}
                                                                        onChange={(e) =>
                                                                            handlePassengerDataChange(e, roomIndex, childIndex, 'FirstName', true)
                                                                        }

                                                                    />
                                                                    {errors[roomIndex]?.children?.[childIndex]?.FirstName && (
                                                                        <div className="error-text">
                                                                            {errors[roomIndex].children[childIndex].FirstName}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                <div className="col-lg-3 col-md-3">
                                                                    <label htmlFor="floatingInput">Last Name</label>
                                                                    <input
                                                                        name="LastName"
                                                                        className="form-control"
                                                                        style={{
                                                                            borderColor:
                                                                                errors[roomIndex]?.children?.[childIndex]?.LastName ? 'red' : ''
                                                                        }}
                                                                        onChange={(e) =>
                                                                            handlePassengerDataChange(e, roomIndex, childIndex, 'LastName', true)
                                                                        }

                                                                    />
                                                                    {errors[roomIndex]?.children?.[childIndex]?.LastName && (
                                                                        <div className="error-text">
                                                                            {errors[roomIndex].children[childIndex].LastName}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                            </div>
                                        );
                                    })
                                }

                            </div>
                        </div>


                        <div className="col-lg-12">
                            <div className="reviewDescriptionButton">
                                <button type="submit" > Proceed to Book </button>
                            </div>
                        </div>
                    </form>
                </div>
                <Modal open={bookingSuccess}>
                    <Box sx={styleLoader}>
                        <CircularProgress size={70} thickness={4} />
                    </Box>
                </Modal>

            </div>



            <Modal
                open={isLoginModalOpen}
                onClose={handleModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{ zIndex: "999999" }}
            >
                <div class="login-page">
                    <div class="container ">
                        <div class="row d-flex justify-content-center">
                            <div class="col-lg-5 ">
                                <div class="bg-white shadow roundedCustom">
                                    <div class="">
                                        <div class="col-md-12 ps-0  d-md-block">
                                            <div class="form-right leftLogin h-100 text-white text-center ">
                                                <CloseIcon
                                                    className="closeIncon"
                                                    onClick={handleModalClose}
                                                />
                                                <div className="loginImg logg">
                                                    <img src={login01} alt="login01" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-12 pe-0">
                                            <div class="form-left h-100 d-flex justify-content-center flex-column py-4 px-3">
                                                <div class="row g-4">
                                                    <div
                                                        class="col-12"
                                                        style={{
                                                            display: "flex",
                                                            justifyContent: "center",
                                                        }}
                                                    >
                                                        <label className="mb-3">
                                                            Please Login to Continue
                                                            <span class="text-danger">*</span>
                                                        </label>
                                                    </div>
                                                    <div
                                                        class="col-12"
                                                        style={{
                                                            display: "flex",
                                                            justifyContent: "center",
                                                        }}
                                                    >
                                                        <Login />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default HotelGuestDetailsGRN;
