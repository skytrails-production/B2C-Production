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
// import HotelLoading from "../hotelLoading/HotelLoading";
import HotelLoading from "../Hotel/hotelLoading/HotelLoading";
import hotelNotFound from "../../images/hotelNotFound.jpg";
import chevrondown from "../../images/chevrondown.svg";
// import Login from "../../components/Login";
import login01 from "../../images/login-01.jpg";
import Login from "../../components/Login";
import Modal from "@mui/material/Modal";
import { motion } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import {
    validateEmail,
    validateName,
    validatePhoneNumber,
    validatePAN,
    validatePassportExpiry,
    isValidPassportNumber,
} from "../../utility/validationFunctions";
import dayjs from "dayjs";
import { MdMms } from "react-icons/md";

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
    const [loader, setLoader] = useState(false);
    const reducerState = useSelector((state) => state);
    const authenticUser = reducerState?.logIn?.loginData?.status;
    console.log(reducerState, "reducerStateInBlockResponse");
    const passportCheck =
        reducerState?.hotelSearchResult?.blockRoom?.BlockRoomResult
            ?.HotelRoomsDetails[0]?.IsPassportMandatory;
    // const passportCheck = true;

    // const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const noOfRooms =
        reducerState?.hotelSearchResult?.ticketData?.data?.data?.HotelSearchResult
            ?.RoomGuests;
    let bookingStatus =
        reducerState?.hotelSearchResult?.bookRoom?.BookResult?.Status || false;

    const [bookingSuccess, setBookingSuccess] = useState(bookingStatus);
    const [passengerData, setPassengerData] = useState([]);
    const [sub, setSub] = useState(false);
    const [sub1, setSub1] = useState(false);
    const [sub3, setSub3] = useState(false);
    const [validationRes, setValidationRes] = useState(false);



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
    useState(() => {

    }, [sub3]);

    useEffect(() => {
        if (bookingStatus == 1) {
            setBookingSuccess(false);
            navigate("/Guestdetail");
        }
    }, [bookingStatus]);

    useEffect(() => {
        const allPassengerData = handleSettingPassengerArr(noOfRooms);
        setPassengerData(allPassengerData);
    }, []);

    const convertDateFormat = (dateString) => {
        const inputDate = new Date(dateString);

        if (isNaN(inputDate.getTime())) {
            return "Invalid date format";
        }

        const outputDate = inputDate.toISOString().split("T")[0] + "T00:00:00";
        return outputDate;
    };

    const handleSettingPassengerArr = (roomCombination) => {
        const passengerData = [];
        const adultTempelate = {
            Title: "mr",
            FirstName: "",
            MiddleName: null,
            LastName: "",
            Phoneno: "",
            Email: "",
            PaxType: "",
            LeadPassenger: Boolean(),
            Age: "",
            PassportNo: null,
            PassportIssueDate: "0001-01-01T00: 00: 00",
            PassportExpDate: "0001-01-01T00: 00: 00",
            PAN: "",
            roomIndex: "",
        };

        const childTempelate = {
            Title: "mr",
            FirstName: "",
            MiddleName: null,
            LastName: "",
            Phoneno: null,
            Email: null,
            PaxType: "",
            LeadPassenger: Boolean(),
            Age: "",
            PassportNo: null,
            PassportIssueDate: "0001-01-01T00: 00: 00",
            PassportExpDate: "0001-01-01T00: 00: 00",
            PAN: "",
            roomIndex: "",
        };
        // console.log(roomCombination);
        roomCombination?.map((item, indexRoom) => {
            const adultCount = item?.NoOfAdults;
            const childCount = item?.NoOfChild;
            if (adultCount > 0) {
                Array.from({ length: adultCount }, (value, index) => {
                    if (index == 0) {
                        passengerData.push({
                            ...adultTempelate,
                            roomIndex: indexRoom,
                            PaxType: 1,
                            adultIndex: index,
                            LeadPassenger: true,
                        });
                    } else {
                        passengerData.push({
                            ...adultTempelate,
                            roomIndex: indexRoom,
                            PaxType: 1,
                            adultIndex: index,
                            LeadPassenger: false,
                        });
                    }
                });
            }
            if (childCount > 0) {
                Array.from({ length: childCount }, (value, index) => {
                    passengerData.push({
                        ...childTempelate,
                        roomIndex: indexRoom,
                        Age: item?.ChildAge[index],
                        PaxType: 2,
                        childIndex: index,
                        LeadPassenger: false,
                    });
                });
            }
        });

        return passengerData;
    };

    const emailRef = useRef();
    const phoneRef = useRef();
    const [emailVal, setEmail] = useState(false);
    const [contactVal, setContact] = useState(false);

    // new values 
    const hotelinfoGRN = reducerState?.hotelSearchResultGRN?.hotelDetails?.data?.data?.hotel;
    const hotelMainReducer = reducerState?.hotelSearchResultGRN?.ticketData?.data?.data;
    // new values 

    const hotelInfo = reducerState?.hotelSearchResult?.hotelInfo?.HotelInfoResult;
    const hotelRoomName =
        reducerState?.hotelSearchResult?.hotelRoom?.GetHotelRoomResult
            ?.HotelRoomsDetails[0]?.RoomTypeName;
    const hotelCancellationPolicies =
        reducerState?.hotelSearchResult?.blockRoom?.BlockRoomResult
            ?.HotelRoomsDetails[0];
    const cancellationStartingDate =
        hotelCancellationPolicies?.CancellationPolicies[0]?.FromDate;
    const cancellationFormattedStartingDate = moment(
        cancellationStartingDate
    ).format("MMMM DD, YYYY");
    const cancellationEndingDate =
        hotelCancellationPolicies?.CancellationPolicies[0]?.ToDate;
    const cancellationFormattedEndingDate = moment(cancellationEndingDate).format(
        "MMMM DD, YYYY"
    );

    const cancellationCharge =
        hotelCancellationPolicies?.CancellationPolicies[0]?.Charge;



    const star = (data) => {
        const stars = [];
        for (let i = 0; i < data; i++) {
            stars.push(<StarIcon key={i} style={{ color: "#FF8900" }} />);
        }
        return stars;
    };


    useEffect(() => {
        validation();
    }, [setSub1, passengerData]);


    const handleServiceChange = (e, roomIndex, knowIndex) => {
        setSub1(sub1 + 1);
        if (
            roomIndex !== undefined &&
            roomIndex !== null &&
            knowIndex?.adultIndex !== undefined &&
            knowIndex?.adultIndex !== null
        ) {
            const { name, value } = e.target;
            const filteredPassenger = passengerData.filter((item, index) => {
                return (
                    item.roomIndex == roomIndex &&
                    item?.adultIndex == knowIndex?.adultIndex
                );
            });
            const newFilteredPassenger = { ...filteredPassenger[0] };
            if (name == "PassportExpDate") {
                newFilteredPassenger[name] = convertDateFormat(value);
            } else {
                newFilteredPassenger[name] = value;
            }
            const indexFind = passengerData.indexOf(filteredPassenger[0]);
            if (indexFind !== -1) {
                passengerData[indexFind] = newFilteredPassenger;
            }
        } else if (
            roomIndex !== undefined &&
            roomIndex !== null &&
            knowIndex?.childIndex !== undefined &&
            knowIndex?.childIndex !== null
        ) {

            const { name, value } = e.target;
            const filteredPassenger = passengerData.filter((item, index) => {
                return (
                    item.roomIndex == roomIndex &&
                    item?.childIndex == knowIndex?.childIndex
                );
            });

            const newFilteredPassenger = { ...filteredPassenger[0] };
            newFilteredPassenger[name] = value;
            const indexFind = passengerData.indexOf(filteredPassenger[0]);
            if (indexFind !== -1) {
                passengerData[indexFind] = newFilteredPassenger;
            }
        }

        const eml = document.getElementById("Email1").value;
        const con = document.getElementById("phoneNumber1").value;
        const val = validateEmail(eml);
        const valCon = validatePhoneNumber(con);
        setEmail(() => val);
        setContact(() => valCon);

        // console.warn(val, "email validationjfnjkdfnjdfjfddddddddddddddddddn");
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

    const handleClickSavePassenger = () => {
        // if (authenticUser !== 200) {
        //     setIsLoginModalOpen(true);
        // } else {
        dispatch(PassengersAction(passengerData));
        // navigate("/hotel/hotelsearch/HotelBooknow/Reviewbooking/GuestDetail");
        // }
    };

    const result =
        reducerState?.hotelSearchResult?.ticketData?.data?.data?.HotelSearchResult;
    // console.log(result, "result")
    let totalAdults = 0;
    let totalChildren = 0;

    result?.RoomGuests?.forEach((room) => {
        totalAdults += room?.NoOfAdults || 0;
        totalChildren += room?.NoOfChild || 0;
    });



    const [expandedOther, setExpandedOther] = React.useState(false);

    const handleOtherChange = (panel) => (event, notexpanted) => {
        setExpandedOther(notexpanted ? panel : false);
    };


    async function validation() {
        const email = document.getElementById("Email1")?.value;
        const contact = document.getElementById("phoneNumber1")?.value;
        const em = await validateEmail(email);
        const con = await validatePhoneNumber(contact);

        if (!em || !con) {
            setValidationRes(false);
            return;
        }

        const trry = (item) => {
            if (
                validatePAN(item.PAN) &&
                item.FirstName !== "" &&
                item.LastName !== "" &&
                item.Age !== "" && // corrected condition
                (passportCheck ? isValidPassportNumber(item.PassportNo) : true)
            ) {
                return true;
            }
            return false;
        };

        const other = passengerData.filter(trry);
        const result = other.length === passengerData.length && passengerData.length > 0;
        setValidationRes(result);

        return result;
    }


    useEffect(() => {
        validation();
    }, [sub1]);


    return (
        <>
            {loader ? (
                <HotelLoading />
            ) : (
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
                                    <div></div>
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
                                        <p className="titles ">{hotelinfoGRN?.rate?.rooms?.[0]?.room_type}</p>
                                    </div>
                                    <div className="col-lg-3 adultss ">
                                        <p>
                                            {hotelMainReducer?.no_of_adults} Adult(s){" "}
                                            {hotelMainReducer?.no_of_child?.length > 0
                                                ? `${hotelMainReducer?.no_of_child} Child(s)`
                                                : ""}
                                        </p>
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
                    </motion.div>

                    {/* guest details section  */}

                    <motion.div
                        variants={variants}
                        initial="initial"
                        whileInView="animate"
                        className="row"
                    >

                        <motion.div variants={variants} className="col-lg-12 p-0 mt-3">
                            <div className="bookflightPassenger">
                                <form>
                                    <div className="bookFlightPassInner">
                                        <div className="bookAdultIndex">
                                            <p>Your Booking Details will be sent to</p>
                                        </div>
                                        <div className="row g-3 mb-3">
                                            <div className="col-lg-3 col-md-3">
                                                <label for="floatingInput">Title</label>
                                                <select
                                                    className="form-select "
                                                    name="Title"
                                                    onChange={(e) =>
                                                        handleServiceChange(e, 0, { adultIndex: 0 })
                                                    }
                                                >
                                                    <option value="Mr">Mr.</option>
                                                    <option value="Mrs">Mrs.</option>
                                                    <option value="Miss">Miss</option>
                                                </select>

                                            </div>

                                            <div className="col-lg-3 col-md-3">
                                                <label for="floatingInput">Pan Number</label>
                                                <input
                                                    name="PAN"
                                                    type="text"
                                                    placeholder="Write in Capital"
                                                    className="form-control"
                                                    onChange={(e) =>
                                                        handleServiceChange(e, 0, { adultIndex: 0 })
                                                    }
                                                />

                                            </div>


                                            <div className="col-lg-5 col-md-5">
                                                <label for="floatingInput">Enter Email</label>
                                                <input
                                                    name="Email"
                                                    id="Email1"
                                                    className="form-control"
                                                    ref={emailRef}
                                                    onChange={(e) =>
                                                        handleServiceChange(e, 0, { adultIndex: 0 })
                                                    }
                                                />
                                                {sub && !emailVal && (
                                                    <span
                                                        id="error1"
                                                        style={{ color: "#d90429", fontSize: "12px" }}
                                                    >
                                                        Enter a Valid Email
                                                    </span>
                                                )}
                                            </div>
                                            <div className="col-lg-5 col-md-5">
                                                <label for="floatingInput">Enter Phone</label>
                                                <input
                                                    name="Phoneno"
                                                    id="phoneNumber1"
                                                    className="form-control"
                                                    ref={phoneRef}
                                                    onChange={(e) =>
                                                        handleServiceChange(e, 0, { adultIndex: 0 })
                                                    }
                                                />

                                                {sub && !contactVal && (
                                                    <span
                                                        id="error10"
                                                        style={{ color: "#d90429", fontSize: "12px" }}
                                                    >
                                                        Enter a Valid Number
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </motion.div>



                        <motion.div variants={variants} className="col-lg-12 p-0 mt-3">
                            <div className="bookflightPassenger">
                                <div className="headingBookFlight">
                                    <h3>Guest Details</h3>
                                </div>

                                {
                                    hotelinfoGRN?.rate?.rooms?.map((item, roomIndex) => {

                                        return (
                                            <div>
                                                <label className="roomIndexGuest">
                                                    Room {roomIndex + 1}
                                                </label>
                                                {item?.no_of_adults > 0 &&
                                                    Array.from(
                                                        { length: item?.no_of_adults },
                                                        (_, adultIndex) => (
                                                            <div className="bookFlightPassInner">
                                                                <div className="bookAdultIndex">
                                                                    <p>
                                                                        Adult {adultIndex + 1}
                                                                        {
                                                                            roomIndex === 0 && (
                                                                                <span>{adultIndex == 0 ? "(Lead Guest)" : ""}</span>
                                                                            )
                                                                        }
                                                                    </p>
                                                                </div>
                                                                <div className="row g-3 mb-3">
                                                                    <div className="col-lg-3 col-md-3">

                                                                        <label for="floatingInput">First Name</label>
                                                                        <select
                                                                            className="form-select "
                                                                            name="Title"
                                                                            onChange={(e) =>
                                                                                setTimeout(() => {
                                                                                    handleServiceChange(e, roomIndex, {
                                                                                        adultIndex: adultIndex,
                                                                                    });
                                                                                }, 300)
                                                                            }
                                                                        >
                                                                            <option value="Mr">Mr.</option>
                                                                            <option value="Mrs">Mrs.</option>
                                                                            <option value="Miss">Miss</option>
                                                                        </select>

                                                                    </div>
                                                                    <div className="col-lg-3 col-md-3">

                                                                        <label for="floatingInput">First Name</label>
                                                                        <input
                                                                            name="FirstName"
                                                                            class="form-control"
                                                                            onChange={(e) => {
                                                                                console.log(roomIndex, "room index")
                                                                                console.log(adultIndex, "adult index")
                                                                                console.log(e, "e")

                                                                                handleServiceChange(e, roomIndex, {
                                                                                    adultIndex: adultIndex,
                                                                                });
                                                                            }}
                                                                        />

                                                                        {sub &&
                                                                            passengerData.filter(
                                                                                (item) =>
                                                                                    item.roomIndex === roomIndex &&
                                                                                    item.adultIndex === adultIndex
                                                                            )[0].FirstName === "" && (
                                                                                <span className="error10">
                                                                                    Enter First Name{" "}
                                                                                </span>
                                                                            )}

                                                                    </div>
                                                                    <div className="col-lg-3 col-md-3">
                                                                        <label for="floatingInput">Last Name</label>
                                                                        <input
                                                                            name="LastName"
                                                                            class="form-control"
                                                                            onChange={(e) =>

                                                                                setTimeout(() => {
                                                                                    console.log(roomIndex, "room index")
                                                                                    console.log(adultIndex, "adult index")
                                                                                    console.log(e, "e")
                                                                                    handleServiceChange(e, roomIndex, {
                                                                                        adultIndex: adultIndex,
                                                                                    });
                                                                                }, 300)
                                                                            }
                                                                        />
                                                                        {sub &&
                                                                            passengerData.filter(
                                                                                (item) =>
                                                                                    item.roomIndex === roomIndex &&
                                                                                    item.adultIndex === adultIndex
                                                                            )[0].LastName === "" && (
                                                                                <span className="error10">
                                                                                    Enter Last Name{" "}
                                                                                </span>
                                                                            )}

                                                                    </div>
                                                                    {/* <div className="col-lg-3 col-md-3">
                                                                        <label for="floatingInput">Enter Age</label>
                                                                        <input
                                                                            name="Age"
                                                                            type="number"
                                                                            class="form-control"
                                                                            onChange={(e) =>
                                                                                setTimeout(() => {
                                                                                    handleServiceChange(e, roomIndex, {
                                                                                        adultIndex: adultIndex,
                                                                                    });
                                                                                }, 300)
                                                                            }
                                                                        />
                                                                        {sub &&
                                                                            passengerData.filter(
                                                                                (item) =>
                                                                                    item.roomIndex === roomIndex &&
                                                                                    item.adultIndex === adultIndex
                                                                            )[0].Age === "" && (
                                                                                <span className="error10">
                                                                                    Enter Age{" "}
                                                                                </span>
                                                                            )}

                                                                    </div> 

                                                                     {passportCheck && (
                                                                        <>
                                                                            <div className="col-lg-3 col-md-3">
                                                                                <label for="floatingInput">
                                                                                    Passport
                                                                                </label>
                                                                                <input
                                                                                    name="PassportNo"
                                                                                    type="text"
                                                                                    placeholder="Enter passport"
                                                                                    className="form-control"
                                                                                    onChange={(e) =>
                                                                                        setTimeout(() => {
                                                                                            handleServiceChange(e, roomIndex, {
                                                                                                adultIndex: adultIndex,
                                                                                            });
                                                                                        }, 300)
                                                                                    }
                                                                                />
                                                                                {sub &&
                                                                                    !isValidPassportNumber(
                                                                                        sub &&
                                                                                        passengerData.filter(
                                                                                            (item) =>
                                                                                                item.roomIndex === roomIndex &&
                                                                                                item.adultIndex === adultIndex
                                                                                        )[0].PassportNo
                                                                                    ) && (
                                                                                        <span className="error10">
                                                                                            Enter Passport{" "}
                                                                                        </span>
                                                                                    )}

                                                                            </div>
                                                                            <div className="col-lg-3 col-md-3">
                                                                                <label for="floatingInput">
                                                                                    Passport expiry
                                                                                </label>
                                                                                <input
                                                                                    name="PassportExpDate"
                                                                                    type="date"
                                                                                    placeholder="select date"
                                                                                    className="form-control"
                                                                                    onChange={(e) =>
                                                                                        setTimeout(() => {
                                                                                            handleServiceChange(e, roomIndex, {
                                                                                                adultIndex: adultIndex,
                                                                                            });
                                                                                        }, 300)
                                                                                    }
                                                                                />

                                                                            </div>
                                                                        </>
                                                                    )} */}
                                                                </div>
                                                            </div>
                                                        )
                                                    )}

                                                {item?.no_of_children > 0 &&
                                                    Array.from(
                                                        {
                                                            length: item?.no_of_children,
                                                        },
                                                        (_, childIndex) => (
                                                            <div className="bookFlightPassInner">
                                                                <div className="bookAdultIndex">
                                                                    <p>Child {childIndex + 1}</p>
                                                                </div>
                                                                <div className="row g-3 mb-3">
                                                                    <div className="col-lg-3 col-md-3">

                                                                        <label for="floatingInput">First Name</label>
                                                                        <select
                                                                            className="form-select "
                                                                            name="Title"
                                                                            onChange={(e) =>
                                                                                handleServiceChange(e, roomIndex, {
                                                                                    childIndex: childIndex,
                                                                                })
                                                                            }
                                                                        >
                                                                            <option value="Mr">Mr.</option>
                                                                            <option value="Mrs">Mrs.</option>
                                                                            <option value="Miss">Miss</option>
                                                                        </select>

                                                                    </div>

                                                                    <div className="col-lg-3 col-md-3">

                                                                        <label for="floatingInput">First Name</label>
                                                                        <input
                                                                            name="FirstName"
                                                                            class="form-control"
                                                                            onChange={(e) =>
                                                                                handleServiceChange(e, roomIndex, {
                                                                                    childIndex: childIndex,
                                                                                })
                                                                            }
                                                                        />
                                                                        {sub &&
                                                                            passengerData.filter(
                                                                                (item) =>
                                                                                    item.roomIndex === roomIndex &&
                                                                                    item.childIndex === childIndex
                                                                            )[0].FirstName === "" && (
                                                                                <span className="error10">
                                                                                    Enter First Name{" "}
                                                                                </span>
                                                                            )}


                                                                    </div>
                                                                    <div className="col-lg-3 col-md-3">
                                                                        <label for="floatingInput">First Name</label>
                                                                        <input
                                                                            name="LastName"
                                                                            class="form-control"
                                                                            onChange={(e) =>
                                                                                handleServiceChange(e, roomIndex, {
                                                                                    childIndex: childIndex,
                                                                                })
                                                                            }
                                                                        />
                                                                        {sub &&
                                                                            passengerData.filter(
                                                                                (item) =>
                                                                                    item.roomIndex === roomIndex &&
                                                                                    item.childIndex === childIndex
                                                                            )[0].LastName === "" && (
                                                                                <span className="error10">
                                                                                    Enter Last Name{" "}
                                                                                </span>
                                                                            )}

                                                                    </div>
                                                                    {/* <div className="col-lg-3 col-md-3">
                                                                        <div class="form-floating">
                                                                            <input
                                                                                name="Age"
                                                                                className="form-control"
                                                                                type="text"
                                                                                placeholder="Enter Age"
                                                                                value={
                                                                                    item?.children_ages?.[childIndex]
                                                                                }
                                                                            />
                                                                            {sub &&
                                                                                passengerData.filter(
                                                                                    (item) =>
                                                                                        item.roomIndex === roomIndex &&
                                                                                        item.childIndex === childIndex
                                                                                )[0].Age === "" && (
                                                                                    <span className="error10">
                                                                                        Enter Age{" "}
                                                                                    </span>
                                                                                )}
                                                                            <label for="floatingInput">Enter Age</label>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-3 col-md-3">
                                                                        <div class="form-floating">
                                                                            <input
                                                                                name="PAN"
                                                                                type="text"
                                                                                placeholder="Enter PanNo"
                                                                                className="form-control"
                                                                                onChange={(e) =>
                                                                                    handleServiceChange(e, roomIndex, {
                                                                                        childIndex: childIndex,
                                                                                    })
                                                                                }
                                                                            />
                                                                            {sub &&
                                                                                !validatePAN(
                                                                                    passengerData.filter(
                                                                                        (item) =>
                                                                                            item.roomIndex === roomIndex &&
                                                                                            item.childIndex === childIndex
                                                                                    )[0].PAN
                                                                                ) && (
                                                                                    <span className="error10">
                                                                                        Enter PAN{" "}
                                                                                    </span>
                                                                                )}
                                                                            <label for="floatingInput">
                                                                                Pan Number
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                    {passportCheck && (
                                                                        <>
                                                                            <div className="col-lg-3 col-md-3">
                                                                                <label for="floatingInput">
                                                                                    Passport
                                                                                </label>
                                                                                <input
                                                                                    name="PassportNo"
                                                                                    type="text"
                                                                                    placeholder="Write in Capital"
                                                                                    className="form-control"
                                                                                    onChange={(e) =>
                                                                                        setTimeout(() => {
                                                                                            handleServiceChange(e, roomIndex, {
                                                                                                childIndex: childIndex,
                                                                                            });
                                                                                        }, 300)
                                                                                    }
                                                                                />
                                                                                {sub &&
                                                                                    !isValidPassportNumber(
                                                                                        sub &&
                                                                                        passengerData.filter(
                                                                                            (item) =>
                                                                                                item.roomIndex === roomIndex &&
                                                                                                item.childIndex === childIndex
                                                                                        )[0].PassportNo
                                                                                    ) && (
                                                                                        <span className="error10">
                                                                                            Enter Passport{" "}
                                                                                        </span>
                                                                                    )}

                                                                            </div>
                                                                            <div className="col-lg-3 col-md-3">
                                                                                <label for="floatingInput">
                                                                                    Passport expiry
                                                                                </label>
                                                                                <input
                                                                                    name="PassportExpDate"
                                                                                    type="date"
                                                                                    placeholder="select date"
                                                                                    className="form-control"
                                                                                    onChange={(e) =>
                                                                                        setTimeout(() => {
                                                                                            handleServiceChange(e, roomIndex, {
                                                                                                childIndex: childIndex,
                                                                                            });
                                                                                        }, 300)
                                                                                    }
                                                                                />

                                                                            </div>
                                                                        </>
                                                                    )} */}
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
                                                        {hotelInfo?.HotelDetails?.HotelFacilities?.slice(
                                                            0,
                                                            12
                                                        ).map((item, index) => {
                                                            return (
                                                                <p>
                                                                    <img src={chevrondown} />
                                                                    {item}
                                                                </p>
                                                            );
                                                        })}
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
                                        <div className="row g-3 ">
                                            <div className="hotelNameAccord">
                                                <p>{hotelRoomName}</p>
                                            </div>
                                            <div className="otherDetailsData">
                                                <div className="row">
                                                    <div className="col-lg-4">
                                                        <div className="cancelAccord">
                                                            <span>Cancelled on or After</span>
                                                            <p>{cancellationFormattedStartingDate}</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4">
                                                        <div className="cancelAccord">
                                                            <span>Cancelled on or Before</span>
                                                            <p>{cancellationFormattedEndingDate}</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4">
                                                        <div className="cancelAccord">
                                                            <span>Cancellation Charges</span>
                                                            <p>{cancellationCharge}%</p>
                                                        </div>
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
                                {!validationRes ? (
                                    <button
                                        type="submit"
                                        className="notValidBtn"
                                        onClick={() => setSub(true)}
                                    >
                                        Proceed to Book
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        onClick={handleClickSavePassenger}
                                    // onClick={() => setSub(true)}
                                    >
                                        Proceed to Book
                                    </button>
                                )}
                            </div>
                        </div>

                        <Modal open={bookingSuccess}>
                            <Box sx={styleLoader}>
                                <CircularProgress size={70} thickness={4} />
                            </Box>
                        </Modal>
                    </motion.div>
                </div>
            )}

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
