import { apiURL } from "../../Constants/constant";
import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { clearHotelReducer, hotelAction } from "../../Redux/Hotel/hotel";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Box from "@mui/material/Box";
import Swal from "sweetalert2";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Hotelmainloading from "./hotelLoading/Hotelmainloading";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { IoSearchOutline } from "react-icons/io5";
import loginGif from "../../images/loginGif.gif";
import Login from "../../components/Login";
import Modal from "@mui/material/Modal";

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

const HotelForm = () => {
    const [openTravelModal, setOpenTravelModal] = React.useState(false);
    const [displayFrom, setdisplayFrom] = useState(true);
    const currentDate = new Date();
    const hotelSearchRef = React.useRef(null);
    const hotelInputRef = React.useRef(null);

    // Add one day
    const futureDate = new Date(currentDate);
    futureDate.setDate(currentDate.getDate() + 1);
    const populterSearch = [{ Destination: "Delhi", cityid: "105477", country: "Canada", countrycode: "CA", __v: 0, _id: "63fc59c4ec25cae0ebd02b87" },
    {
        Destination: "Mumbai", StateProvinceCode: "MH", cityid: "144306", country: "India", countrycode: "IN", stateprovince: "Maharashtra",
        __v: 0, _id: "63fc59bfec25cae0ebcfb2ed"
    }, { Destination: "Bangalore", StateProvinceCode: "KA", cityid: "111124", country: "India", countrycode: "IN", stateprovince: "Karnataka", __v: 0, _id: "63fc59c5ec25cae0ebd03e9c" }, {
        Destination: "Goa", StateProvinceCode: "GA", cityid: "119805", country: "India", countrycode: "IN", stateprovince: "GOA", __v: 0, _id: "63fc59c3ec25cae0ebd01ba0"
    },
    {
        Destination: "Chennai", StateProvinceCode: "TN", cityid: "127343", country: "India", countrycode: "IN", stateprovince: "Tamil Nadu", __v: 0, _id: "63fc59c3ec25cae0ebd00c6e"
    }, {
        Destination: "Jaipur", StateProvinceCode: "RJ", cityid: "122175", country: "India", countrycode: "IN", stateprovince: "Rajasthan", __v: 0, _id: "63fc59c2ec25cae0ebd002c6"
    }];
    const [checkIn, setCheckIn] = useState(currentDate)
    const [checkOut, setCheckOut] = useState(futureDate)

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutsideFrom);
        return () => {
            document.removeEventListener("mousedown", handleClickOutsideFrom);
        };
    }, []);
    const handleClickOutside = (event) => {
        if (hotelSearchRef.current && !hotelSearchRef.current.contains(event.target)) {
            setSub(false)
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])


    async function ensureFutureDate() {
        // Convert dates to milliseconds for easy comparison
        const currentTimestamp = await checkIn.getDay();
        const futureTimestamp = await checkOut.getDay();

        // Check if futureDate is less than currentDate
        if (futureTimestamp <= currentTimestamp) {
            // Add one day to futureDate
            await futureDate.setDate(checkIn.getDate() + 1);
        }
        setCheckOut(futureDate)
        return;
    }
    useEffect(() => {
        ensureFutureDate();
    }, [checkIn])

    const handleClickOutsideFrom = (event) => {
        if (
            fromSearchRef.current &&
            !fromSearchRef.current.contains(event.target)
        ) {
            setdisplayFrom(false);
        }
    };
    const fromSearchRef = React.useRef(null);

    const handleTravelClickOpen = () => {
        setOpenTravelModal(true);
    };

    const handleTravelClose = (event, reason) => {
        if (reason !== "backdropClick") {
            setOpenTravelModal(false);
            // setCountPassanger(
            //     parseInt(activeIdChild) +
            //     parseInt(activeIdInfant) +
            //     parseInt(activeIdAdult)
            // );
        }
    };


    const [searchTerm, setSearchTerm] = useState("");
    // console.log(searchTerm, "search term")
    const [searchTermLast, setSearchTermLast] = useState({
        Destination: "New Delhi",
        StateProvinceCode: "DL",
        cityid: "130443",
        country: "India",
        countrycode: "IN",
        stateprovince: "DELHI",
        __v: 0,
        _id: "63fc59c1ec25cae0ebcfd9b1",
    });
    const [cityid, setCityid] = useState("130443");
    const [results, setResults] = useState(populterSearch);
    useEffect(() => {
        console.warn(populterSearch, "populer search")
    }, [results])
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // error manage
    const [cityError, setCityError] = useState("");
    const [checkInError, setCheckInError] = useState("");
    const [checkOutError, setCheckOutError] = useState("");
    const [condition, setCondition] = useState(1);
    const [formDataDynamic, setFormData] = useState([
        {
            NoOfAdults: 1,
            NoOfChild: 0,
            ChildAge: [],
        },
    ]);

    const reducerState = useSelector((state) => state);
    // console.log("State Data", reducerState);

    const errorCode =
        reducerState?.hotelSearchResult?.ticketData?.data?.data?.HotelSearchResult
            ?.Error?.ErrorCode;
    const errorMsg =
        reducerState?.hotelSearchResult?.ticketData?.data?.data?.HotelSearchResult
            ?.Error?.ErrorMessage;
    const authenticUser = reducerState?.logIn?.loginData?.status;

    const initialvalue = {
        City: "",
        nationality: "IN",


    };

    const [open, setOpen] = useState(false);
    const [loader, setLoader] = useState(false);
    const [values, setValues] = useState(initialvalue);
    const [error, setError] = useState({
        nationality: false,
    });
    const [sub, setSub] = useState(false);

    const [isVisible, setIsVisible] = useState(false);
    const changeHandler = (e) => {
        if (e.target.value === "number") {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    useEffect(() => {
        dispatch(clearHotelReducer());
    }, []);

    useEffect(() => {
        if (reducerState?.hotelSearchResult?.isLoading == true) {
            setLoader(true);
        }
    }, [reducerState?.hotelSearchResult?.isLoading]);

    // console.log(reducerState, "reducerstate")
    // console.log(reducerState?.hotelSearchResult?.ticketData?.data?.data?.HotelSearchResult
    //     ?.HotelResults, "hotel result")

    useEffect(() => {
        if (
            reducerState?.hotelSearchResult?.ticketData?.data?.data?.HotelSearchResult
                ?.HotelResults?.length >= 0
        ) {
            setLoader(false);
            navigate("/hotel/hotelsearch");
            // navigate("login")
        } else if (
            reducerState?.hotelSearchResult?.ticketData?.data?.data?.HotelSearchResult
                ?.Error?.ErrorCode !== 0 &&
            reducerState?.hotelSearchResult?.ticketData?.data?.data?.HotelSearchResult
                ?.Error?.ErrorCode !== undefined
        ) {
            // Swal.fire({
            //     icon: "error",
            //     title: "Oops",
            //     text: reducerState?.hotelSearchResult?.ticketData?.data?.data?.HotelSearchResult?.Error?.ErrorMessage,

            //     showClass: {
            //         popup: `
            //         animate__animated
            //         animate__fadeInUp
            //         animate__faster
            //       `
            //     },
            //     hideClass: {
            //         popup: `
            //         animate__animated
            //         animate__fadeOutDown
            //         animate__faster
            //       `
            //     }
            // })
            setLoader(false);
        }
    }, [
        reducerState?.hotelSearchResult?.ticketData?.data?.data?.HotelSearchResult
            ?.HotelResults,
        reducerState?.hotelSearchResult?.ticketData?.data?.data?.HotelSearchResult
            ?.Error?.ErrorCode,
    ]);
    //fetch city Logic implemented below
    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            if (searchTerm) {
                fetchCities();
            } else {
                setResults(populterSearch);
            }
        }, 300); // Adjust the debounce delay as needed (e.g., 300ms)

        return () => {
            clearTimeout(debounceTimer);
        };
    }, [searchTerm]);
    useEffect(() => {
        if (
            reducerState?.hotelSearchResult?.ticketData?.data?.data?.HotelSearchResult
                ?.Error?.ErrorCode !== 0 &&
            reducerState?.hotelSearchResult?.ticketData?.data?.data?.HotelSearchResult
                ?.Error?.ErrorCode !== undefined
        ) {
            Swal.fire({
                icon: "error",
                title: "Oops",
                text: reducerState?.hotelSearchResult?.ticketData?.data?.data?.HotelSearchResult?.Error?.ErrorMessage,

                showClass: {
                    popup: `
              animate__animated
              animate__fadeInUp
              animate__faster
            `
                },
                hideClass: {
                    popup: `
              animate__animated
              animate__fadeOutDown
              animate__faster
              `
                }
            });
            dispatch(clearHotelReducer());
        }
    }, [
        reducerState?.hotelSearchResult?.ticketData?.data?.data?.HotelSearchResult
            ?.Error?.ErrorCode,
    ]);

    const fetchCities = async () => {
        try {
            setLoading(true);
            const response = await axios.post(
                `${apiURL.baseURL}/skyTrails/city/hotelCitySearch?keyword=${searchTerm} `
            );
            setResults(response.data.data);
            // console.log("cities", response.data.data);
            setLoading(false);
        } catch (error) {
            // console.error("Error fetching cities:", error);
            setLoading(false);
        }
    };
    const handleConditionChange = (event) => {
        const newCondition = parseInt(event.target.value);
        setCondition(newCondition);
        const newFormData = Array.from({ length: newCondition }, () => ({
            NoOfAdults: 1,
            NoOfChild: 0,
            ChildAge: [],
        }));
        setFormData(newFormData);
    };

    const handleFormChange = (index, key, value) => {
        const updatedFormData = [...formDataDynamic];
        if (key === "NoOfAdults" && value > 8) {
            value = 8; // Limit the number of adults to a maximum of 8
        }
        updatedFormData[index][key] = value;

        // Set ChildAge to null when NoOfChild is 0
        if (key === "NoOfChild" && value === 0) {
            updatedFormData[index]["ChildAge"] = null;
        }

        setFormData(updatedFormData);
    };

    const handleChildAgeChange = (index, childIndex, value) => {
        const updatedFormData = [...formDataDynamic];
        updatedFormData[index].ChildAge[childIndex] = value;
        setFormData(updatedFormData);
        // console.log(updatedFormData, "updated form data ")
    };

    const handleDeleteRoom = () => {
        if (condition > 1) {
            setCondition(condition - 1);
            setFormData(formDataDynamic.slice(0, condition - 1));
        }
    };

    const handleResultClick = (city) => {
        setSearchTerm(city); // Set the input field's value to the selected city
        //Below is cityId to send in payload
        setCityid(city.cityid);
        setResults([]); // Clear the results
        setCityError("");
        setdisplayFrom(false);
        // console.warn(searchTerm,)
    };

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    const action = (
        <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
                UNDO
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setValues({
            ...values,
            [name]: value,
        });

        setError({
            nationality: false,
        });
    };

    const [selectedDay, setSelectedDay] = useState(new Date());
    const [selectedDayTwo, setSelectedDayTwo] = useState(futureDate);

    const handleStartDateChange = (date) => {
        setValues({ ...values, departure: date }); // Update the departure date
        // const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });
        setCheckIn(date)
        setSelectedDay(date);
    };

    const handleEndDateChange = (date) => {
        setValues({ ...values, checkOutDeparture: date }); // Update the checkOutDeparture date
        // const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });
        setSelectedDayTwo(date);
        setCheckOut(date);
    };

    const getDayOfWeek = (date) => {
        const daysOfWeek = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ];
        return daysOfWeek[date.getDay()];
    };
    useEffect(() => {
        if (hotelInputRef.current) {
            hotelInputRef.current.focus()
        }
    }, [hotelInputRef.current])





    // search history logic


    const token = sessionStorage.getItem("jwtToken");


    // const createSearchHistory = async () => {


    //     const historyData = {
    //         checkin: checkIn,
    //         checkout: checkOut,
    //         cityName: searchTerm.Destination,
    //         searchType: "HOTELS",
    //         rooms: condition,

    //     };

    //     try {
    //         const response = await axios({
    //             method: 'post',
    //             url: `${apiURL.baseURL}/skyTrails/api/user/createSearchHistory`,
    //             data: historyData,
    //             headers: {
    //                 token: token,
    //             },
    //         });
    //     } catch (error) {
    //         console.error("Error sending data to the server:", error);
    //     }
    // };



    // search history logic 








    function handleSubmit(event) {
        event.preventDefault();
        // setSub(true);
        // if (values.departure === ("" || undefined)) {
        //     return;
        // }
        // if (values.checkOutDeparture === ("" || undefined)) {
        //     return;
        // }

        // if (authenticUser !== 200) {
        //     setIsLoginModalOpen(true);
        // } else {



        // const formData = new FormData(event.target);
        // const date = new Date(formData.get("departure"));
        // const date = new Date(checkIn);
        // const day = date.getDate().toString().padStart(2, "0");
        // const month = (date.getMonth() + 1).toString().padStart(2, "0");
        // const year = date.getFullYear();
        // const formattedDate = `${day}/${month}/${year}`;

        // const sessionData = new FormData(event.target);

        // Extract specific fields
        // const city = sessionData.get("City");
        // const checkIn = sessionData.get("checkIn");
        // const checkOut = sessionData.get("checkOut");
        // const room = sessionData.get("room");
        // const star = sessionData.get("star");
        // const night = sessionData.get("night");
        // const nationality = sessionData.get("nationality");

        // Extract data from dynamic form fields
        const dynamicFormData = formDataDynamic.map((data) => ({
            NoOfAdults: data.NoOfAdults || 0,
            NoOfChild: data.NoOfChild || 0,
            ChildAge: data.ChildAge || [],
        }));


        // Combine all data into a single object
        // const formFields = {
        //     city,
        //     checkIn,
        //     checkOut,
        //     room,
        //     star,
        //     night,
        //     nationality,
        //     dynamicFormData,
        // };

        // sessionStorage.setItem("hotelFormData", JSON.stringify(formFields));

        // if (false) {
        //     // setCityError("city is Required");
        // } else {


        const departureDate = new Date(checkIn);
        const day = departureDate.getDate().toString().padStart(2, "0");
        const month = (departureDate.getMonth() + 1)
            .toString()
            .padStart(2, "0");
        const year = departureDate.getFullYear();
        const formattedDate = `${day}/${month}/${year}`;
        const timeDifference = checkOut.getTime() - checkIn.getTime();
        const nightdays = Math.ceil(timeDifference / (1000 * 3600 * 24));
        // console.log(nightdays, "night days")

        const payload = {
            CheckInDate: formattedDate,
            // NoOfNights: formData.get("night"),
            NoOfNights: nightdays,
            CountryCode: "IN",
            CityId: searchTermLast.cityid,
            ResultCount: null,
            PreferredCurrency: "INR",
            // GuestNationality: formData.get("nationality"),
            GuestNationality: "IN",
            NoOfRooms: condition,
            RoomGuests: [...formDataDynamic],
            MaxRating: 5,
            MinRating: 0,
            ReviewScore: null,
            IsNearBySearchAllowed: false,
            EndUserIp: reducerState?.ip?.ipData,
            TokenId: reducerState?.ip?.tokenData,
        };
        // console.log(payload, "payload hotel")

        // createSearchHistory();
        dispatch(hotelAction(payload));
        if (
            reducerState?.hotelSearchResult?.ticketData?.data?.data
                ?.HotelSearchResult?.ticketData?.data?.data
        ) {
            setOpen(false);
        }
        setOpen(true);
        // }
        // }
    }

    // for showing the count of adult infant and child in the front box

    const [numAdults, setNumAdults] = useState(0);
    const [numChildren, setNumChildren] = useState(0);
    // const [numInfants, setNumInfants] = useState(0);

    const calculateTravellerCount = () => {
        let adults = 0;
        let children = 0;
        // let infants = 0;

        formDataDynamic.forEach((data) => {
            adults += data.NoOfAdults;
            children += data.NoOfChild;
        });

        setNumAdults(adults);
        setNumChildren(children);
        // setNumInfants(infants);
    };

    useEffect(() => {
        calculateTravellerCount();
    }, [formDataDynamic]);



    // const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    // const handleModalClose = () => {
    //     setIsLoginModalOpen(false);
    // };

    // useEffect(() => {
    //     if (authenticUser == 200) {
    //         handleModalClose();
    //     }
    // }, [authenticUser]);

    return (
        <>
            {/* <Modal
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
                                                    <img src={loginGif} alt="loginGif" />
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
            </Modal> */}
            {loader ? (
                <Hotelmainloading />
            ) :
                (<section
                    className=""
                    style={{
                        width: "100%",
                        position: "absolute",
                        left: "50%",
                        top: "75%",
                        transform: "translate(-50%, -50%)",
                        zIndex: "2",
                    }}
                >
                    <div className="container">
                        <div className="row hotelFormBg">
                            <div className="col-12 px4 ddddd">
                                <>

                                    <form onSubmit={handleSubmit}>
                                        <div className="yourHotel-container">
                                            <div
                                                onClick={async (e) => {
                                                    e.stopPropagation();
                                                    // alert(sub);
                                                    // console.warn("sub", searchTerm);
                                                    setSub(true);
                                                    await setdisplayFrom(true);
                                                    // hotelInputRef.current.focus()


                                                }}
                                                className="hotel-container"
                                            >
                                                <span>City Name</span>
                                                <div>
                                                    <label>{searchTermLast.Destination}</label>

                                                    {/* {cityError !== "" && (
                                                        <span className="error">{cityError}</span>
                                                    )} */}

                                                    {sub && (
                                                        <>
                                                            <div
                                                                ref={hotelSearchRef}
                                                                className="city-search-results"
                                                                style={{
                                                                    display: "flex",
                                                                }}
                                                            >
                                                                <div className="city-inputtt-div">
                                                                    <div className="city-inputtt-div-div">
                                                                        <IoSearchOutline />
                                                                        <input
                                                                            name="City"
                                                                            id="CitySearchID"
                                                                            type="text"
                                                                            placeholder="Search city"
                                                                            value={searchTerm}
                                                                            className="city-inputtt"
                                                                            onChange={(e) => {
                                                                                e.stopPropagation();
                                                                                setSearchTerm(e.target.value);
                                                                                // console.log("populersearch", searchTerm)

                                                                                // setdisplayFrom(true);
                                                                            }}
                                                                            ref={hotelInputRef}


                                                                            style={{
                                                                                outline: "none",
                                                                                border: "none",
                                                                            }}
                                                                            autoComplete="off"
                                                                        />
                                                                    </div>
                                                                </div>

                                                                <ul className="city_Search_Container">
                                                                    <Box
                                                                        sx={{
                                                                            display: "flex",
                                                                            flexDirection: "column",
                                                                            maxHeight: 280,
                                                                            overflow: "hidden",
                                                                            overflowY: "scroll",
                                                                        }}
                                                                        className="scroll_style"
                                                                    >
                                                                        {results.map((city, index) => (
                                                                            <li
                                                                                key={index}
                                                                                onClick={(e) => {
                                                                                    e.stopPropagation();
                                                                                    handleResultClick(city);
                                                                                    setSearchTerm("");
                                                                                    setSearchTermLast(city);
                                                                                    setSub(false);
                                                                                    setResults(populterSearch)
                                                                                    // console.warn(city, "city click");
                                                                                    // alert("result click");
                                                                                }}
                                                                            >
                                                                                {city.Destination}
                                                                            </li>
                                                                        ))}
                                                                    </Box>
                                                                </ul>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>

                                                <span>India</span>
                                            </div>

                                            <div
                                                onClick={() => setSub(false)}
                                                className="hotel-container"
                                            >
                                                <span>Check In</span>
                                                <div className="">
                                                    <div className="onewayDatePicker">
                                                        <DatePicker
                                                            selected={checkIn}
                                                            onChange={handleStartDateChange}
                                                            name="checkIn"
                                                            dateFormat="dd MMMyy"
                                                            placeholderText="Check-In"
                                                            //   isClearable
                                                            minDate={currentDate}
                                                            autoComplete="off"
                                                        />
                                                    </div>
                                                </div>
                                                {/* <span>Monday</span> */}
                                                {/* <span>{selectedDay}</span> */}
                                                <span>{getDayOfWeek(selectedDay)}</span>
                                                {/* {sub && values.departure === ("" || undefined) && (
                                                    <span className="error">Enter Check-In Date </span>
                                                )} */}
                                            </div>

                                            <div
                                                onClick={() => setSub(false)}
                                                className="hotel-container"
                                            >
                                                <span>Check Out</span>
                                                <div className="">
                                                    <div className="onewayDatePicker">
                                                        <DatePicker
                                                            selected={checkOut}
                                                            onChange={handleEndDateChange}
                                                            name="checkOut"
                                                            dateFormat="dd MMMyy"
                                                            placeholderText="Check-Out "
                                                            minDate={checkIn.getDate() + 1} // Disable dates before Check-In date
                                                            //   isClearable
                                                            autoComplete="off"
                                                        />
                                                    </div>
                                                </div>
                                                {/* <span>Thursday</span> */}
                                                {/* <span>{selectedDayTwo}</span> */}
                                                <span>{getDayOfWeek(selectedDayTwo)}</span>
                                                {/* {sub &&
                                                    values.checkOutDeparture === ("" || undefined) && (
                                                        <span className="error">Enter Check-Out Date </span>
                                                    )} */}
                                            </div>

                                            <div
                                                onClick={() => setSub(false)}
                                                className="travellerContainer "
                                            >
                                                <div
                                                    onClick={handleTravelClickOpen}
                                                    className="travellerButton"
                                                >
                                                    <span>Traveller & Class</span>
                                                    <p>{condition} Room</p>
                                                    {/* <div> */}
                                                    <span>
                                                        {numAdults} Adults {numChildren} Child
                                                    </span>
                                                    {/* </div> */}
                                                </div>
                                                <Dialog
                                                    sx={{ zIndex: "99999" }}
                                                    disableEscapeKeyDown
                                                    open={openTravelModal}
                                                    onClose={handleTravelClose}
                                                >
                                                    <DialogContent>
                                                        <>
                                                            <div className="travellerModal">
                                                                <div className="roomModal">
                                                                    <div className="hotel_modal_form_input px-0">
                                                                        <label className="form_label">Room*</label>
                                                                        <select
                                                                            name="room"
                                                                            value={condition}
                                                                            onChange={handleConditionChange}
                                                                            className="hotel_input_select"
                                                                        >
                                                                            <option>1</option>
                                                                            <option>2</option>
                                                                            <option>3</option>
                                                                            <option>4</option>
                                                                            <option>5</option>
                                                                            <option>6</option>
                                                                        </select>
                                                                    </div>
                                                                </div>

                                                                <div className="px-1">
                                                                    {condition > 0 &&
                                                                        Array.from({ length: condition }).map(
                                                                            (_, index) => (
                                                                                <div
                                                                                    key={index}
                                                                                    className="room-modal-container"
                                                                                >
                                                                                    <div>
                                                                                        <h5>ROOM {index + 1}</h5>
                                                                                    </div>
                                                                                    <div className="row">
                                                                                        <div className="hotel_modal_form_input">
                                                                                            <label className="form_label">
                                                                                                No of Adults:
                                                                                            </label>
                                                                                            <select
                                                                                                value={
                                                                                                    formDataDynamic[index]
                                                                                                        ?.NoOfAdults || 1
                                                                                                }
                                                                                                className="hotel_input_select"
                                                                                                onChange={(e) =>
                                                                                                    handleFormChange(
                                                                                                        index,
                                                                                                        "NoOfAdults",
                                                                                                        parseInt(e.target.value)
                                                                                                    )
                                                                                                }
                                                                                            >
                                                                                                {[1, 2, 3, 4, 5, 6, 7, 8].map(
                                                                                                    (num) => (
                                                                                                        <option
                                                                                                            key={num}
                                                                                                            value={num}
                                                                                                        >
                                                                                                            {num}
                                                                                                        </option>
                                                                                                    )
                                                                                                )}
                                                                                            </select>
                                                                                        </div>

                                                                                        <div className="hotel_modal_form_input">
                                                                                            <label className="form_label">
                                                                                                No of Child:
                                                                                            </label>
                                                                                            <select
                                                                                                value={
                                                                                                    formDataDynamic[index]
                                                                                                        ?.NoOfChild || 0
                                                                                                }
                                                                                                className="hotel_input_select"
                                                                                                name="noOfChild"
                                                                                                onChange={(e) =>
                                                                                                    handleFormChange(
                                                                                                        index,
                                                                                                        "NoOfChild",
                                                                                                        parseInt(e.target.value)
                                                                                                    )
                                                                                                }
                                                                                            >
                                                                                                {[0, 1, 2, 3, 4].map(
                                                                                                    (childCount) => (
                                                                                                        <option
                                                                                                            key={childCount}
                                                                                                            value={childCount}
                                                                                                        >
                                                                                                            {childCount}
                                                                                                        </option>
                                                                                                    )
                                                                                                )}
                                                                                            </select>
                                                                                        </div>
                                                                                    </div>
                                                                                    {formDataDynamic[index]?.NoOfChild >
                                                                                        0 && (
                                                                                            <div className="hotel_modal_form_input_child_age">
                                                                                                <label className="mt-3">
                                                                                                    Child Age:
                                                                                                </label>
                                                                                                <div>
                                                                                                    {Array.from({
                                                                                                        length:
                                                                                                            formDataDynamic[index]
                                                                                                                ?.NoOfChild || 0,
                                                                                                    }).map((_, childIndex) => (
                                                                                                        <div
                                                                                                            key={childIndex}
                                                                                                            className=""
                                                                                                        >
                                                                                                            <select
                                                                                                                value={
                                                                                                                    formDataDynamic[index]
                                                                                                                        ?.ChildAge?.[
                                                                                                                    childIndex
                                                                                                                    ] || ""
                                                                                                                }
                                                                                                                className="hotel_input_select"
                                                                                                                onChange={(e) =>
                                                                                                                    handleChildAgeChange(
                                                                                                                        index,
                                                                                                                        childIndex,
                                                                                                                        e.target.value
                                                                                                                    )
                                                                                                                }
                                                                                                            >
                                                                                                                {Array.from(
                                                                                                                    { length: 12 },
                                                                                                                    (_, i) => (
                                                                                                                        <option
                                                                                                                            key={i}
                                                                                                                            value={i + 1}
                                                                                                                        >
                                                                                                                            {i + 1}
                                                                                                                        </option>
                                                                                                                    )
                                                                                                                )}
                                                                                                            </select>
                                                                                                        </div>
                                                                                                    ))}
                                                                                                </div>
                                                                                            </div>
                                                                                        )}
                                                                                </div>
                                                                            )
                                                                        )}
                                                                    {/* {condition > 1 && (
                                                            <button onClick={handleDeleteRoom} className="delete-button">
                                                                <FaTrash />
                                                            </button>
                                                        )} */}
                                                                </div>

                                                                {/* <div className="col-lg-4 col-md-4 col-xs-12 ps-0 mb-3">
                                                        <div className="hotel_form_input">
                                                            <label className="form_label">Star Rating*</label>
                                                            <select
                                                                name="star"
                                                                value={values.star || 5}
                                                                onChange={handleInputChange}
                                                                className="hotel_input_select"
                                                            >
                                                                <option value="1">1 Star</option>
                                                                <option value="2">2 Star</option>
                                                                <option value="3">3 Star</option>
                                                                <option value="4">4 Star</option>
                                                                <option value="5">5 Star</option>
                                                            </select>
                                                            {error && values.star === "" && (
                                                                <label className="error_label">
                                                                    Please Select a Star Rating{" "}
                                                                </label>
                                                            )}
                                                        </div>
                                                    </div>*/}

                                                                {/* <div className="col-lg-4 col-md-4 col-xs-12 ps-0 mb-3">
                                                        <div className="hotel_form_input">
                                                            <label className="form_label">Nights</label>
                                                            <input
                                                                type="number"
                                                                min="0"
                                                                name="night"
                                                                value={nightdays}
                                                                className="hotel_input_select"
                                                                disabled
                                                            />
                                                        </div>
                                                    </div> */}

                                                                {/* <div className="col-lg-4 col-md-4 col-xs-12 ps-0 mb-3">
                                                        <div className="hotel_form_input">
                                                            <label className="form_label">
                                                                Nationality*
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="nationality"
                                                                value={values.nationality}
                                                                onChange={handleInputChange}
                                                                placeholder="IN"
                                                                disabled
                                                            />
                                                            {error && values.nationality.length < 1 ? (
                                                                <label
                                                                    style={{
                                                                        color: "red",
                                                                        fontSize: "12px",
                                                                        textAlign: "left",
                                                                    }}
                                                                >
                                                                    Please Enter this Field{" "}
                                                                </label>
                                                            ) : (
                                                                ""
                                                            )}
                                                        </div>
                                                    </div> */}
                                                            </div>
                                                        </>
                                                    </DialogContent>
                                                    <DialogActions>
                                                        <Button
                                                            style={{
                                                                backgroundColor: "#21325d",
                                                                color: "white",
                                                            }}
                                                            onClick={handleTravelClose}
                                                        >
                                                            Cancel
                                                        </Button>
                                                        <Button
                                                            style={{
                                                                backgroundColor: "#21325d",
                                                                color: "white",
                                                            }}
                                                            onClick={handleTravelClose}
                                                        >
                                                            Ok
                                                        </Button>
                                                    </DialogActions>
                                                </Dialog>
                                            </div>
                                            <div className="PackageInner">
                                                <button type="submit" className="searchButt">
                                                    <h3>Search</h3>
                                                    {/* <KeyboardDoubleArrowRightIcon /> */}
                                                </button>
                                            </div>
                                        </div>

                                        {/* <Box>
                                                <div class="wrapper_hotel">
                                                    <div>
                                                        <div className="wraOne">
                                                            <p>Trending Searches:</p>
                                                        </div>
                                                        <input
                                                            type="radio"
                                                            name="select"
                                                            id="option-1"
                                                            checked
                                                        />
                                                        <input type="radio" name="select" id="option-2" />
                                                        <input type="radio" name="select" id="option-3" />
                                                        <input type="radio" name="select" id="option-4" />
                                                        <input type="radio" name="select" id="option-5" />
                                                        <input type="radio" name="select" id="option-6" />

                                                        <label for="option-1" class="option option-1">
                                                            <text>Singapore, Singapore</text>
                                                        </label>
                                                        <label for="option-2" class="option option-2">
                                                            <text>Dubai, United Arab Emirates</text>
                                                        </label>
                                                        <label for="option-3" class="option option-3">
                                                            <text>Mumbai, India</text>
                                                        </label>
                                                    </div>

                                                    <div className="col-auto fare_search_oneWay ">
                                                        <button
                                                            type="submit"
                                                            className="hotelFormbutton"
                                                        >Search Hotel
                                                        </button>
                                                    </div>
                                                </div>
                                            </Box> */}
                                    </form>

                                </>
                            </div>
                        </div>
                    </div>
                </section>)}
        </>
    );
};

export default HotelForm;
