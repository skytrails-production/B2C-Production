import { apiURL } from "../../Constants/constant";
import React, { useEffect, useState, useRef } from "react";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { IoSearchOutline } from "react-icons/io5";
import SecureStorage from 'react-secure-storage';
import Hotelmainloading from "../Hotel/hotelLoading/Hotelmainloading";
import dayjs from "dayjs";
import { hotelActionGRN, clearHotelReducer } from "../../Redux/HotelGRN/hotel";



const GrmHotelForm = () => {

    const [openTravelModal, setOpenTravelModal] = React.useState(false);
    const [displayFrom, setdisplayFrom] = useState(true);
    const currentDate = new Date();

    const hotelSearchRef = useRef(null);
    const hotelInputRef = useRef(null);

    // Add one day
    const futureDate = new Date(currentDate);
    futureDate.setDate(currentDate.getDate() + 1);

    const populterSearch = [
        {
            cityCode: "124054",
            cityName: "New Delhi",
            countryCode: "IN",
            countryName: "India",
        },
        {
            cityCode: "103863",
            cityName: "Mumbai",
            countryCode: "IN",
            countryName: "India",
        },
        {
            cityCode: "121850",
            cityName: "Bengaluru",
            countryCode: "IN",
            countryName: "India",
        },
        {
            cityCode: "123318",
            cityName: "Goa",
            countryCode: "IN",
            countryName: "India",
        },

        {
            cityCode: "122730",
            cityName: "Jaipur",
            countryCode: "IN",
            countryName: "India",
        },
    ];
    const [checkIn, setCheckIn] = useState(currentDate);
    const [checkOut, setCheckOut] = useState(futureDate);

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutsideFrom);
        return () => {
            document.removeEventListener("mousedown", handleClickOutsideFrom);
        };
    }, []);

    const handleClickOutside = (event) => {
        if (
            hotelSearchRef.current &&
            !hotelSearchRef.current.contains(event.target)
        ) {
            setSub(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    async function ensureFutureDate(date) {
        validateDates(date, date);
        return;
    }


    function validateDates(checkin, checkout) {
        const checkinDate = new Date(checkin);
        let checkoutDate = new Date(checkout);

        if (checkinDate >= checkoutDate) {
            checkoutDate.setDate(checkinDate.getDate() + 1);
        }
        setCheckOut(checkoutDate);
        setSelectedDayTwo(checkoutDate);

        return;
    }


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
        }
    };

    const [searchTerm, setSearchTerm] = useState("");

    const initialSelectedCityData = {

        cityCode: "124054",
        cityName: "New Delhi",
        countryCode: "IN",
        countryName: "India",
    };

    const [searchTermLast, setSearchTermLast] = useState(initialSelectedCityData);


    useEffect(() => {
        const storedData = SecureStorage.getItem('revisitHotelDataGRN');
        const parsedStoredData = JSON.parse(storedData);

        if (storedData) {
            setSearchTermLast(parsedStoredData[0])
        }

    }, []);

    const [cityid, setCityid] = useState("India");
    const [results, setResults] = useState(populterSearch);

    useEffect(() => {

    }, [results]);

    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [cityError, setCityError] = useState("");
    const [condition, setCondition] = useState(1);
    const [formDataDynamic, setFormData] = useState([
        {
            NoOfAdults: 1,
            NoOfChild: 0,
            ChildAge: [],
        },
    ]);

    const reducerState = useSelector((state) => state);


    const initialvalue = {
        City: "",
        nationality: "IN",
    };

    const [open, setOpen] = useState(false);
    const [loader, setLoader] = useState(false);
    const [values, setValues] = useState(initialvalue);
    const [sub, setSub] = useState(false);



    useEffect(() => {
        dispatch(clearHotelReducer());
    }, []);

    useEffect(() => {
        if (reducerState?.hotelSearchResultGRN?.isLoading == true) {
            setLoader(true);
        }
    }, [reducerState?.hotelSearchResultGRN?.isLoading]);


    useEffect(() => {
        if (
            reducerState?.hotelSearchResultGRN?.ticketData?.data?.data?.hotels?.length >= 0
        ) {
            setLoader(false);
            navigate("/hotel/hotelsearchGRM");

        }
    }, [reducerState?.hotelSearchResultGRN?.ticketData?.data?.data?.hotels]);


    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            if (searchTerm) {
                fetchCities();
            } else {
                setResults(populterSearch);
            }
        }, 300);

        return () => {
            clearTimeout(debounceTimer);
        };
    }, [searchTerm]);


    const fetchCities = async () => {
        try {
            setLoading(true);
            const response = await axios.get(
                `${apiURL.baseURL}/skyTrails/grnconnect/getcityList?keyword=${searchTerm}
 `
            );
            setResults(response.data.data);
            setLoading(false);
        } catch (error) {
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
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    };

    const handleFormChange = (index, key, value) => {
        const updatedFormData = [...formDataDynamic];
        if (key === "NoOfAdults" && value > 8) {
            value = 8;
        }
        updatedFormData[index][key] = value;

        if (key === "NoOfChild") {
            updatedFormData[index]["ChildAge"] = Array.from({ length: value }, () => '1');
        }
        setFormData(updatedFormData);
    };

    const handleChildAgeChange = (index, childIndex, value) => {
        const updatedFormData = [...formDataDynamic];
        updatedFormData[index].ChildAge[childIndex] = value;
        setFormData(updatedFormData);

    };



    const handleResultClick = (city) => {

        setSearchTerm(city.cityName);
        setCityid(city.countryName);
        setResults([]);
        setCityError("");
        setdisplayFrom(false);

    };


    const [selectedDay, setSelectedDay] = useState(new Date());
    const [selectedDayTwo, setSelectedDayTwo] = useState(futureDate);

    const handleStartDateChange = async (date) => {
        await setValues({ ...values, departure: date }); // Update the departure date
        await setCheckIn(date);
        await setSelectedDay(date);
        ensureFutureDate(date);
    };

    const handleEndDateChange = (date) => {
        setValues({ ...values, checkOutDeparture: date });
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


    function handleSubmit(event) {
        event.preventDefault();

        sessionStorage.setItem("SessionExpireTime", new Date());

        const dynamicFormData = formDataDynamic.map((data) => ({
            adults: data.NoOfAdults || 0,
            children_ages: data.ChildAge || [],
        }));


        sessionStorage.setItem("hotelFormData", JSON.stringify(searchTermLast));

        const payload = {
            "rooms": [...dynamicFormData],
            "rates": "concise",
            "cityCode": searchTermLast.cityCode,
            "currency": "INR",
            "client_nationality": "IN",
            "checkin": dayjs(checkIn).format("YYYY-MM-DD"),
            "checkout": dayjs(checkOut).format("YYYY-MM-DD"),
            "cutoff_time": 30000,
            "version": "2.0"

        };

        SecureStorage.setItem(
            "revisitHotelDataGRN", JSON.stringify([
                {
                    cityCode: searchTermLast.cityCode,
                    cityName: searchTermLast.cityName,
                    countryCode: searchTermLast.countryCode,
                    countryName: searchTermLast.countryName,
                },
            ])
        )

        dispatch(hotelActionGRN(payload));

        if (
            reducerState?.hotelSearchResultGRN?.ticketData?.data?.data?.hotels
        ) {
            setOpen(false);
        }
        setOpen(true);

    }



    const [numAdults, setNumAdults] = useState(0);
    const [numChildren, setNumChildren] = useState(0);

    const calculateTravellerCount = () => {
        let adults = 0;
        let children = 0;


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



    return (
        <>

            {loader ? (
                <Hotelmainloading />
            ) : (
                <div className="container homeabsnew">
                <section className="HotelAbsDesign w-100">
                    <div className="container">
                        <div className="row hotelFormBg">
                            <div className="col-12 px4 ddddd">
                                <>
                                    <form onSubmit={handleSubmit}>
                                        <div className="yourHotel-container">
                                            <div
                                                onClick={async (e) => {
                                                    e.stopPropagation();
                                                    setSub(true);
                                                    await setdisplayFrom(true);
                                                    setTimeout(() => {
                                                        hotelInputRef.current.focus();
                                                    }, 200)
                                                }}
                                                className="hotel-container"
                                                id="item-0H"
                                            >
                                                <span>City Name</span>
                                                <div>
                                                    <label>{searchTermLast.cityName}</label>

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
                                                                            onKeyDown={handleKeyDown}
                                                                            onChange={(e) => {
                                                                                e.stopPropagation();
                                                                                setSearchTerm(e.target.value);
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
                                                                                    setResults(populterSearch);
                                                                                }}
                                                                            >
                                                                                {city.cityName}{", "} {city.countryName}
                                                                            </li>
                                                                        ))}
                                                                    </Box>
                                                                </ul>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>

                                                <span className="d-none d-md-block">{cityid}</span>
                                            </div>

                                            <div
                                                onClick={() => setSub(false)}
                                                className="hotel-container"
                                                id="item-1H"
                                            >
                                                <span>Check In</span>
                                                <div className="">
                                                    <div className="onewayDatePicker">
                                                        <DatePicker
                                                            selected={checkIn}
                                                            onChange={handleStartDateChange}
                                                            name="checkIn"
                                                            dateFormat="dd MMM, yy"
                                                            placeholderText="Check-In"
                                                            minDate={currentDate}
                                                            autoComplete="off"
                                                        />
                                                    </div>
                                                </div>
                                                <span className="d-none d-md-block">
                                                    {getDayOfWeek(selectedDay)}
                                                </span>
                                            </div>

                                            <div
                                                onClick={() => setSub(false)}
                                                className="hotel-container"
                                                id="item-2H"
                                            >
                                                <span>Check Out</span>
                                                <div className="">
                                                    <div className="onewayDatePicker">
                                                        <DatePicker
                                                            selected={checkOut}
                                                            onChange={handleEndDateChange}
                                                            name="checkOut"
                                                            dateFormat="dd MMM, yy"
                                                            placeholderText="Check-Out "
                                                            minDate={checkIn}

                                                            autoComplete="off"
                                                        />
                                                    </div>
                                                </div>
                                                <span className="d-none d-md-block">
                                                    {getDayOfWeek(selectedDayTwo)}
                                                </span>
                                            </div>

                                            <div
                                                onClick={() => setSub(false)}
                                                className="travellerContainer ms-0"
                                                id="item-3H"
                                            >
                                                <div
                                                    onClick={handleTravelClickOpen}
                                                    className="travellerButton"
                                                >
                                                    <span>Traveller & Class</span>
                                                    <p>{condition} Room</p>
                                                    <span className="d-none d-md-block">
                                                        {numAdults} Adults {numChildren} Child
                                                    </span>
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
                                                                                                                    formDataDynamic[index]?.ChildAge?.[childIndex] || ""
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

                                                                </div>
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
                                            <div className="onewaySearch-btn" id="item-4H">
                                                <button type="submit" className="searchButt">
                                                    <h3>Search</h3>
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </>
                            </div>
                        </div>
                    </div>
                </section>
                </div>
                
            )}
        </>
    );
};

export default GrmHotelForm;
