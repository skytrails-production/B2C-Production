import * as React from "react";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { apiURL } from "../../../Constants/constant";
import { ipAction, tokenAction } from "../../../Redux/IP/actionIp";
// import { oneWayAction, resetOneWay } from "../../../Redux/FlightSearch/oneWay";
import { useNavigate } from "react-router-dom";
import FlightTakeoffTwoToneIcon from "@mui/icons-material/FlightTakeoffTwoTone";
import FlightLandIcon from '@mui/icons-material/FlightLand';
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import FlightLoader from '../FlightLoader/FlightLoader';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import TravelerCounter from "../../../components/TravelerCounter";
import { CiSearch } from "react-icons/ci";
import { clearbookTicketGDS } from "../../../Redux/FlightBook/actionFlightBook";
import { resetAllFareData } from "../../../Redux/FlightFareQuoteRule/actionFlightQuote";
import { Helmet } from "react-helmet-async";
// import SecureStorage from 'react-secure-storage';
import { swalModal } from "../../../utility/swal"
import "./multicity.css"
import dayjs from "dayjs";
import { multicityAction, multicityActionClear } from "../../../Redux/FlightSearch/Multicity/multicity";


const MulticityForm = () => {


    const reducerState = useSelector((state) => state);

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

    // From code start from here
    const [fromSearchResults, setFromSearchResults] = useState([]);
    const [fromQuery, setFromQuery] = useState("delhi");
    const [isLoading, setIsLoading] = useState(false);
    const [trips, setTrips] = useState([]);


    const [startDate, setStartDate] = useState(new Date());
    const currentdate = new Date();

    const handleDateChange = (date) => {
        setStartDate(date);
    };



    const initialSelectedFromData = {
        AirportCode: "DEL",
        CityCode: "DEL",
        CountryCode: "IN ",
        code: "Indira Gandhi Airport",
        createdAt: "2023-01-30T14:58:34.428Z",
        id: "DEL",
        name: "Delhi",
        updatedAt: "2023-01-30T14:58:34.428Z",
        __v: 0,
        _id: "63d7db1a64266cbf450e07c1",
    };

    const [selectedFrom, setSelectedFrom] = useState(initialSelectedFromData);



    const initialSelectedToData = {
        AirportCode: "BOM",
        CityCode: "BOM",
        CountryCode: "IN ",
        code: "Mumbai",
        createdAt: "2023-01-30T14:57:03.696Z",
        id: "BOM",
        name: "Mumbai",
        updatedAt: "2023-01-30T14:57:03.696Z",
        __v: 0,
        _id: "63d7dabf64266cbf450e0451",
    }

    const [selectedTo, setSelectedTo] = useState(initialSelectedToData);




    const [from, setFrom] = useState("");
    const [isLoadingFrom, setIsLoadingFrom] = useState(false);
    const [fromToggle, setFromToggle] = useState(false);
    const [toToggle, setToggle] = useState(false);
    const fromCityRef = useRef(null);
    const [displayFrom, setdisplayFrom] = useState(true);
    const [toQuery, setToQuery] = useState("mumbai");
    const [to, setTO] = useState("");
    const [toSearchResults, setToSearchResults] = useState([]);
    const [loader, setLoader] = useState(false);
    const [displayTo, setdisplayTo] = useState(true);


    const [openTravelModal, setOpenTravelModal] = React.useState(false);
    const [activeIdClass, setActiveIdClass] = useState(2);
    const [activeIdChild, setActiveIdChild] = useState(0);
    const [activeIdInfant, setActiveIdInfant] = useState(0);
    const [activeIdAdult, setActiveIdAdult] = useState(1);
    const [totalCount, setCountPassanger] = useState(0);
    const [departureDate, setDepartureDate] = useState("");







    const handleTravelerCountChange = (category, value) => {
        if (category === "adult") {
            const newAdultCount = Math.min(Math.max(1, activeIdAdult + value), 9);
            const maxAllowedChild = Math.max(0, 9 - newAdultCount);
            const newChildCount = Math.min(activeIdChild, maxAllowedChild);

            setActiveIdAdult(newAdultCount);
            setActiveIdChild(newChildCount);

            const newInfantCount = Math.min(activeIdInfant, newAdultCount);
            setActiveIdInfant(newInfantCount);
        } else if (category === "child") {
            const newChildCount = Math.min(Math.max(0, activeIdChild + value), 9 - activeIdAdult);
            setActiveIdChild(newChildCount);
        } else if (category === "infant") {
            const newInfantCount = Math.min(Math.max(0, activeIdInfant + value), activeIdAdult);
            setActiveIdInfant(newInfantCount);
        }
    };


    // handle travellers modal
    useEffect(() => {
        dispatch(clearbookTicketGDS());
        dispatch(resetAllFareData());
    }, []);

    const ClassItems = [
        { id: 1, label: "All" },
        { id: 2, label: "Economy" },
        { id: 3, label: "Premium Economy" },
        { id: 4, label: "Business" },
        { id: 5, label: "Premium Business" },
        { id: 6, label: "First" },
    ];



    const handleTravelClickOpen = () => {
        setActiveIdClass(activeIdClass);
        setActiveIdChild(0);
        setActiveIdInfant(0);
        setActiveIdAdult(1);
        setOpenTravelModal(true);
    };

    const handleTravelClose = (event, reason) => {
        if (reason !== "backdropClick") {
            setOpenTravelModal(false);
            setCountPassanger(
                parseInt(activeIdChild) +
                parseInt(activeIdInfant) +
                parseInt(activeIdAdult)
            );
        }
    };


    // End



    useEffect(() => {
        if (reducerState?.multicity?.isLoading === true) {
            setLoader(true);
        }
    }, [reducerState?.multicity?.isLoading]);


    const returnResults =
        reducerState?.multicity?.multicityData?.data?.data?.Response?.Results;


    useEffect(() => {

        if (returnResults) {

            navigate("/multicityresult");
        }
        if (returnResults) {
            setLoader(false);
        }
    }, [
        reducerState?.multicity?.multicityData?.data?.data?.Response?.Results
    ]);

    useEffect(() => {
        if (reducerState?.multicity?.multicityData?.data?.data?.Response?.
            Error?.ErrorCode !== 0 && reducerState?.multicity?.multicityData?.data?.data?.Response?.
                Error?.ErrorCode !== undefined) {
            // navigate("/return")
            dispatch(multicityActionClear());
            swalModal("flight", reducerState?.multicity?.multicityData?.data?.data?.Response?.
                Error?.
                ErrorMessage, false

            )
            setLoader(false)
        }
    }, [reducerState?.multicity?.multicityData?.data?.data?.Response?.
        Error?.ErrorCode])

    useEffect(() => {
        dispatch(multicityActionClear())

    }, [])


    const toSearchRef = useRef(null);
    const toCityRef = useRef(null);
    const fromSearchRef = useRef(null);

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleClickOutside = (event) => {
        if (toSearchRef.current && !toSearchRef.current.contains(event.target)) {
            setdisplayTo(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutsideFrom);
        return () => {
            document.removeEventListener("mousedown", handleClickOutsideFrom);
        };
    }, []);

    const handleClickOutsideFrom = (event) => {
        if (
            fromSearchRef.current &&
            !fromSearchRef.current.contains(event.target)
        ) {
            setdisplayFrom(false);
        }
    };

    useEffect(() => {
        let mounted = true;

        const fetchSearchResults = async () => {
            setIsLoading(true);
            const results = await axios.get(
                `${apiURL.baseURL}/skyTrails/city/searchCityData?keyword=${fromQuery}`
            );
            if (mounted) {
                setFromSearchResults(results?.data?.data);
                setIsLoading(false);
            }
        };

        if (fromQuery.length >= 2) {
            fetchSearchResults();
        }
        return () => {
            mounted = false;
        };
    }, [fromQuery]);

    const handleFromClick = (result) => {
        setSelectedFrom(result);
        setdisplayFrom(false);
        setIsLoadingFrom(false);
    };

    const handleToClick = (result) => {
        setSelectedTo(result);
        setdisplayTo(false);
        // setIsLoadingTo(false);
    };

    const handleFromInputChange = (event) => {
        setdisplayFrom(true);
        setFrom(event.target.value);
    };

    const handleFromSearch = (e) => {
        setFromQuery(e);
    };

    // ToSearch result
    useEffect(() => {
        let mounted = true;

        const fetchSearchResults = async () => {
            setIsLoading(true);
            const results = await axios.get(
                `${apiURL.baseURL}/skyTrails/city/searchCityData?keyword=${toQuery}`
            );
            if (mounted) {
                setToSearchResults(results?.data?.data);
                setIsLoading(false);
            }
        };
        if (toQuery.length >= 2) {
            fetchSearchResults();
        }
        return () => {
            mounted = false;
        };
    }, [toQuery]);

    const handleToInputChange = (event) => {
        setdisplayTo(true);
        setTO(event.target.value);
    };
    const handleToSearch = (e) => {
        setToQuery(e);
    };
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(ipAction());
    }, []);

    useEffect(() => {
        const payload = {
            EndUserIp: reducerState?.ip?.ipData,
        };
        dispatch(tokenAction(payload));
    }, [reducerState?.ip?.ipData]);


    const [data2, setData] = useState({
        adult: 0,
        child: 0,
        infants: 0,
        class: "1",
    });

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    };

    const sendTravelClass = (data2) => {
        setData(data2);
    };





    function handleSubmit(event) {

        event.preventDefault();


        const payload = {
            EndUserIp: reducerState?.ip?.ipData,
            TokenId: reducerState?.ip?.tokenData,
            AdultCount: activeIdAdult,
            ChildCount: activeIdChild,
            InfantCount: activeIdInfant,
            DirectFlight: "false",
            OneStopFlight: "false",
            JourneyType: "3",
            PreferredAirlines: null,
            Segments: trips.map((trip) => ({
                Origin: trip.from.AirportCode,
                Destination: trip.to.AirportCode,
                FlightCabinClass: activeIdClass,
                PreferredDepartureTime: dayjs(trip.departureDate).format("DD MMM, YY"),
                PreferredArrivalTime: dayjs(trip.departureDate).format("DD MMM, YY"),
            })),
            Sources: null,
        };

        // console.log(payload, "multi city payload")

        sessionStorage.setItem("adults", activeIdAdult);
        sessionStorage.setItem("childs", activeIdChild);
        sessionStorage.setItem("infants", activeIdInfant);

        // navigate(
        //     `/Searchresult?adult=${activeIdAdult}&child=${activeIdChild}&infant=${activeIdInfant}`
        // );

        dispatch(multicityAction(payload));

    }


    const handleRoundLogoClick = () => {
        const tempFrom = { ...selectedFrom };
        const tempSelectedFrom = selectedFrom;
        setSelectedFrom(selectedTo);
        setSelectedTo(tempFrom);
    };

    if (loader) {
        return <FlightLoader />;
    }




    const handleAddTrip = (e) => {
        e.preventDefault();
        if (trips.length < 4) {
            const newTrip = {
                from: selectedFrom,
                to: selectedTo,
                departureDate: startDate,
            };
            setTrips([...trips, newTrip]);
        }
    };

    const handleDeleteTrip = (e) => {
        const updatedTrips = [...trips];
        updatedTrips.splice(e, 1);
        setTrips(updatedTrips);
    };


    // console.log(reducerState, "trips")


    return (
        <>
            <section
                className="oneWayAbsDesignMulticity"
            >
                <Helmet>
                    <title>The Skytrails - Flight Booking, Hotel Booking, Bus Booking</title>
                    <link rel="canonical" href="/" />
                    <meta name="description" content="one way flight" />
                    <meta
                        name="keywords"
                        content="India travel, travel in India, cheap air tickets, cheap flights, flight, hotels, hotel, holidays, bus tickets, air travel, air tickets, holiday packages, travel packages, affordable flights, international flights, lowest airfare, domestic flights, pnr status, online flight booking, deals on hotels, theskytrails"
                    />
                </Helmet>
                <div className="container">
                    <div className="row oneWayBg">
                        <div className="col-12 p-0">
                            <form >
                                <div className="your-containerMulticity">
                                    <div
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setFromToggle(true);
                                            setdisplayFrom(true);
                                            setIsLoadingFrom(true);
                                            setTimeout(() => {
                                                fromCityRef.current.focus();
                                            }, 200);
                                        }}
                                        className="from-containerMulticity"
                                        id="item-0Return"
                                    >
                                        <span>From</span>
                                        <div>

                                            <label>{selectedFrom.name}</label>
                                            {
                                                fromToggle && (
                                                    <div
                                                        ref={fromSearchRef}
                                                        className="from-search-results-one"
                                                        style={{
                                                            display: displayFrom ? "flex" : "none",
                                                        }}
                                                    >
                                                        <ul className="from_Search_Container">
                                                            <Box
                                                                sx={{
                                                                    display: "flex",
                                                                    flexDirection: "column",
                                                                    maxHeight: 271,
                                                                    overflow: "hidden",
                                                                    overflowY: "scroll",
                                                                }}
                                                                className="scroll_style"
                                                            >
                                                                <div className="from_search_div">
                                                                    <CiSearch size={20} />
                                                                    <input
                                                                        name="from"
                                                                        onKeyDown={handleKeyDown}
                                                                        placeholder="From"
                                                                        value={from}
                                                                        ref={fromCityRef}
                                                                        autoComplete="off"
                                                                        onChange={(event) => {
                                                                            handleFromInputChange(event);
                                                                            setIsLoadingFrom(true);
                                                                            handleFromSearch(event.target.value);
                                                                        }}
                                                                        style={{
                                                                            outline: "none",
                                                                            border: "none",
                                                                        }}
                                                                    />
                                                                </div>
                                                                {fromSearchResults.map((result) => (
                                                                    <li
                                                                        className="to_List"
                                                                        key={result._id}
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            handleFromClick(result);

                                                                            setFromToggle(false);
                                                                        }}
                                                                    >
                                                                        <div className="onewayResultBox">
                                                                            <div className="onewayResultFirst">
                                                                                <div>
                                                                                    <FlightTakeoffTwoToneIcon />
                                                                                </div>
                                                                                <div
                                                                                    className="resultOriginName"
                                                                                >
                                                                                    <p>{result.name}</p>
                                                                                    <span>{result.code}</span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="resultAirportCode">
                                                                                <p>{result.AirportCode}</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                ))}
                                                            </Box>
                                                        </ul>
                                                    </div>
                                                )
                                            }
                                        </div>
                                        {fromSearchResults &&
                                            fromSearchResults.length > 0 &&
                                            fromQuery.length >= 2 ? (
                                            <span className="d-none d-md-block ">
                                                {selectedFrom ? (
                                                    <>
                                                        {selectedFrom.code}, {selectedFrom.name}
                                                    </>
                                                ) : (
                                                    <>
                                                        {fromSearchResults[0].code},{" "}
                                                        {fromSearchResults[0].name}
                                                    </>
                                                )}
                                            </span>
                                        ) : (
                                            <span className="d-none d-md-block ">Airport Name</span>
                                        )}

                                        <div
                                            className="roundlogo"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleRoundLogoClick();
                                            }}
                                            style={{ cursor: "pointer" }}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="40"
                                                height="40"
                                                viewBox="0 0 40 40"
                                                fill="none"
                                            >
                                                <circle
                                                    cx="20"
                                                    cy="20"
                                                    r="19"
                                                    fill="white"
                                                    stroke="lightgray"
                                                    stroke-width="2"
                                                />
                                            </svg>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="18"
                                                height="20"
                                                viewBox="0 0 18 20"
                                                fill="none"
                                                justifyContent="center"
                                            >
                                                <path
                                                    d="M13 15L1 15M1 15L5 19M1 15L5 11M5 5L17 5M17 5L13 0.999999M17 5L13 9"
                                                    stroke="#071C2C"
                                                    stroke-width="2"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                />
                                            </svg>
                                        </div>
                                    </div>

                                    <div
                                        onClick={(e) => {
                                            e.stopPropagation(); // Stop event bubbling
                                            setToggle(true);
                                            setdisplayTo(true);
                                            // setIsLoadingTo(true);
                                            setTimeout(() => {
                                                toCityRef?.current?.focus();
                                            }, 300)
                                        }}
                                        className="from-containerMulticity"
                                        id="item-1Return"
                                    >
                                        <span>To</span>
                                        <div>

                                            <label>{selectedTo.name}</label>
                                            {
                                                toToggle && (
                                                    <div
                                                        ref={toSearchRef}
                                                        className="from-search-results-one"
                                                        style={{
                                                            display: displayTo ? "flex" : "none",
                                                        }}
                                                    >
                                                        <ul className="from_Search_Container">
                                                            <Box
                                                                sx={{
                                                                    display: "flex",
                                                                    flexDirection: "column",
                                                                    maxHeight: 271,
                                                                    overflow: "hidden",
                                                                    overflowY: "scroll",
                                                                }}
                                                                className="scroll_style"
                                                            >
                                                                <from className="from_search_div">
                                                                    <CiSearch size={20} />
                                                                    <input
                                                                        name="to"
                                                                        placeholder="Enter city or airport"
                                                                        value={to}
                                                                        // required
                                                                        // autoFocus
                                                                        onKeyDown={handleKeyDown}
                                                                        ref={toCityRef}
                                                                        onChange={(event) => {
                                                                            handleToInputChange(event);
                                                                            // setIsLoadingTo(true);
                                                                            handleToSearch(event.target.value);

                                                                        }}
                                                                        autoComplete="off"
                                                                        style={{
                                                                            border: "none",

                                                                            outline: "none",
                                                                        }}
                                                                    />
                                                                </from>
                                                                {toSearchResults.map((result) => (
                                                                    <li
                                                                        className="to_List"
                                                                        key={result._id}
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            handleToClick(result);

                                                                            setToggle(false);
                                                                        }}
                                                                    >
                                                                        <div className="onewayResultBox">
                                                                            <div className="onewayResultFirst">

                                                                                <div><FlightLandIcon /></div>

                                                                                <div className="resultOriginName">
                                                                                    <p>{result.name}</p>
                                                                                    <span>{result.code}</span>
                                                                                </div>
                                                                            </div>

                                                                            <div className="resultAirportCode">
                                                                                <p>{result.AirportCode}</p>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                ))}
                                                            </Box>
                                                        </ul>
                                                    </div>
                                                )
                                            }
                                        </div>
                                        {toSearchResults &&
                                            toSearchResults.length > 0 &&
                                            toQuery.length >= 2 ? (
                                            <span className="d-none d-md-block ">
                                                {selectedTo ? (
                                                    <>
                                                        {selectedTo.code}, {selectedTo.name}
                                                    </>
                                                ) : (
                                                    <>
                                                        {toSearchResults[0].code}, {toSearchResults[0].name}
                                                    </>
                                                )}
                                            </span>
                                        ) : (
                                            <span className="d-none d-md-block ">Airport Name</span>
                                        )}
                                    </div>

                                    <div className="from-containerMulticity" id="item-2Return">
                                        <span>Departure</span>
                                        <div className="">
                                            <div className="onewayDatePicker">
                                                <DatePicker
                                                    name="departure"
                                                    id="departure"
                                                    dateFormat="dd MMM, yy"
                                                    selected={startDate}
                                                    onChange={handleDateChange}
                                                    minDate={currentdate}
                                                />
                                            </div>
                                        </div>
                                        <span className="d-none d-md-block ">{getDayOfWeek(startDate)}</span>
                                    </div>


                                    <div className="travellerContainerMulticity " id="item-4Return">
                                        <div
                                            onClick={handleTravelClickOpen}
                                            className="travellerButton"
                                        >
                                            <span>Traveller & Class</span>
                                            <p>
                                                <span>{(totalCount === 0 && 1) || totalCount} </span>{" "}
                                                Traveller
                                            </p>
                                            <div className="d-none d-md-block ">
                                                <span>
                                                    {(activeIdClass === 1 && "All") ||
                                                        (activeIdClass === 2 && "Economy") ||
                                                        (activeIdClass === 3 && "Premium Economy") ||
                                                        (activeIdClass === 4 && "Business") ||
                                                        (activeIdClass === 5 && "Premium Business"
                                                        ) || (activeIdClass === 6 && "First Class")}
                                                </span>
                                            </div>
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
                                                        <div>
                                                            <h3>TRAVELLERS & CLASS</h3>
                                                        </div>
                                                        <div className="travellerPeople">
                                                            <TravelerCounter
                                                                label="Adults (Age 12+ Years)"
                                                                count={activeIdAdult}
                                                                onIncrement={() =>
                                                                    handleTravelerCountChange("adult", 1)
                                                                }
                                                                onDecrement={() =>
                                                                    handleTravelerCountChange("adult", -1)
                                                                }
                                                            />
                                                            <TravelerCounter
                                                                label="Children (Age 2-12 Years)"
                                                                count={activeIdChild}
                                                                onIncrement={() =>
                                                                    handleTravelerCountChange("child", 1)
                                                                }
                                                                onDecrement={() =>
                                                                    handleTravelerCountChange("child", -1)
                                                                }
                                                            />
                                                            <TravelerCounter
                                                                label="Infants (Age 0-2 Years)"
                                                                count={activeIdInfant}
                                                                onIncrement={() =>
                                                                    handleTravelerCountChange("infant", 1)
                                                                }
                                                                onDecrement={() =>
                                                                    handleTravelerCountChange("infant", -1)
                                                                }
                                                            />
                                                        </div>
                                                        <div>
                                                            <h3 className="d-none d-md-block">Choose Travel Class</h3>
                                                        </div>
                                                        <div>
                                                            <ul className="classButtonTravel">
                                                                {ClassItems.map((ele) => (
                                                                    <li
                                                                        key={ele.id}
                                                                        style={{
                                                                            backgroundColor: ele.id === activeIdClass ? "#d90429" : "#fff",
                                                                            color: ele.id === activeIdClass ? "#fff" : "#d90429",
                                                                        }}
                                                                        onClick={() => setActiveIdClass(ele.id)}
                                                                    >
                                                                        {ele.label}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </>
                                            </DialogContent>
                                            <DialogActions
                                                style={{
                                                    justifyContent: "center"
                                                }}
                                            >
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




                                    <div className=" onewaySearch" id="item-5Return">
                                        <button className="searchButt" onClick={handleAddTrip}>
                                            <h3 className="mb-0">ADD</h3>
                                        </button>
                                    </div>

                                </div>
                                {trips.map((trip, index) => (
                                    <div key={index} className="addedCityBox">
                                        <div>
                                            <p>{trip.from.name}</p>
                                        </div>
                                        <div>
                                            <p>{trip.to.name}</p>
                                        </div>
                                        <div>
                                            <p>{dayjs(trip.departureDate).format("DD MMM, YY")}</p>
                                        </div>
                                        <div>
                                            <button type="button" onClick={() => handleDeleteTrip(index)}>Delete</button>
                                        </div>
                                    </div>
                                ))}

                                {
                                    trips.length === 1 && (
                                        <div className="pleaseADDD">
                                            <p>Please Add 1 More Destination to Search</p>
                                        </div>
                                    )
                                }
                                {
                                    trips.length > 1 && (
                                        <div className="pleaseADDD">
                                            <button type="submit" onClick={handleSubmit}>Search</button>
                                        </div>
                                    )
                                }
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default MulticityForm;
