import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { apiURL } from "../Constants/constant";
import { ipAction, tokenAction } from "../Redux/IP/actionIp";
import { oneWayAction, resetOneWay } from "../Redux/FlightSearch/oneWay";
import { useNavigate } from "react-router-dom";
import FlightTakeoffTwoToneIcon from "@mui/icons-material/FlightTakeoffTwoTone";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import "react-date-range/dist/styles.css"; // Import the styles
import "react-date-range/dist/theme/default.css"; // Import the theme
import "./style/Oneway.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import TravelerCounter from "./TravelerCounter";
import { CiSearch } from "react-icons/ci";
import { clearbookTicketGDS } from "../Redux/FlightBook/actionFlightBook";
import { resetAllFareData } from "../Redux/FlightFareQuoteRule/actionFlightQuote";
// import { format } from "date-fns";
import { Helmet } from "react-helmet-async";


const Homeform = (props) => {

  const reducerState = useSelector((state) => state);

  const StartDate = new Date();
  StartDate.setDate(StartDate.getDate() + 3);

  const [startDate, setStartDate] = useState(StartDate);
  const currentdate = new Date(); // Assuming you have defined currentdate
  currentdate.setDate(currentdate.getDate() + 3);


  const handleDateChange = (date) => {
    setStartDate(date);
  };

  // const formatDate = (date) => {
  //   const formattedDate = format(date, "dd MMM'yy EEEE");
  //   return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  // };

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
  // const [isLoading, setIsLoading] = useState(false);
  const [selectedFrom, setSelectedFrom] = useState({
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
  });
  const [from, setFrom] = useState("");
  // const [isLoadingFrom, setIsLoadingFrom] = useState(false);
  const [fromToggle, setFromToggle] = useState(false);
  const [toToggle, setToggle] = useState(false);

  const [displayFrom, setdisplayFrom] = useState(true);
  const [toQuery, setToQuery] = useState("mumbai");
  const [to, setTO] = useState("");
  // const [isLoadingTo, setIsLoadingTo] = useState(false);
  const [toSearchResults, setToSearchResults] = useState([]);
  const [selectedTo, setSelectedTo] = useState({
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
  });
  const [displayTo, setdisplayTo] = useState(true);

  // Travel modal code ⬇
  const [openTravelModal, setOpenTravelModal] = React.useState(false);
  const [activeIdClass, setActiveIdClass] = useState(1);
  const [activeIdChild, setActiveIdChild] = useState(0);
  const [activeIdInfant, setActiveIdInfant] = useState(0);
  const [activeIdAdult, setActiveIdAdult] = useState(1);
  const [activeFareType, setActiveFareType] = useState(1);
  const [totalCount, setCountPassanger] = useState(0);
  // const [showDropdown, setShowDropdown] = useState(false);
  // const authenticUser = reducerState?.logIn?.loginData?.status;
  const [departureDate, setDepartureDate] = useState("");

  // handle travellers modal

  const handleTravelerCountChange = (category, value) => {
    if (category === "adult") {
      setActiveIdAdult((prevCount) => Math.max(0, prevCount + value));
    } else if (category === "child") {
      setActiveIdChild((prevCount) => Math.max(0, prevCount + value));
    } else if (category === "infant") {
      setActiveIdInfant((prevCount) => Math.max(0, prevCount + value));
    }
  };

  const getClassLabel = (classId) => {
    const selectedClass = ClassItems.find((item) => item.id === classId);
    return selectedClass ? selectedClass.label : "";
  };

  // const handleClassItemClick = (classId) => {
  //   setActiveIdClass(classId);
  // };

  // handle travellers modal
  useEffect(() => {
    dispatch(clearbookTicketGDS());
    dispatch(resetAllFareData());
  }, []);

  const ClassItems = [
    { id: "1", label: "All" },
    { id: "2", label: "Economy" },
    { id: "3", label: "Premium Economy" },
    { id: "4", label: "Business" },
    { id: "5", label: "Business Economy" },
  ];

  const handleTravelClickOpen = () => {
    setActiveIdClass(1);
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



  const toSearchRef = React.useRef(null);
  const fromSearchRef = React.useRef(null);

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
      // setIsLoading(true);

      // make an API call to get search results

      const results = await axios.get(
        `${apiURL.baseURL}/skyTrails/city/searchCityData?keyword=${fromQuery}`
      );
      if (mounted) {
        setFromSearchResults(results?.data?.data);
        // setIsLoading(false);
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
    // setFrom(result.AirportCode);
    setSelectedFrom(result);
    setdisplayFrom(false);
    // setIsLoadingFrom(false);

    // setFromToggle((prev) => !prev);
    // alert("liclick", fromToggle)
  };

  const handleToClick = (result) => {
    // setTO(result.AirportCode);
    setSelectedTo(result);
    setdisplayTo(false);
    // setIsLoadingTo(false);
  };

  const handleFromInputChange = (event) => {
    setdisplayFrom(true);
    setFrom(event.target.value);
    // setSelectedFrom(null);
  };

  const handleFromSearch = (e) => {
    setFromQuery(e);
  };

  // ToSearch result
  useEffect(() => {
    let mounted = true;

    const fetchSearchResults = async () => {
      // setIsLoading(true);

      // make an API call to get search results

      const results = await axios.get(
        `${apiURL.baseURL}/skyTrails/city/searchCityData?keyword=${toQuery}`
      );
      // console.log(results);
      if (mounted) {
        setToSearchResults(results?.data?.data);
        // setIsLoading(false);
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
    // setSelectedTo(null);
  };

  const handleToSearch = (e) => {
    setToQuery(e);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [loader, setLoader] = useState(false);
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
  const sendTravelClass = (data2) => {
    setData(data2);
  };

  useEffect(() => {
    dispatch(resetOneWay());
  }, [dispatch, departureDate]);



  function handleOnewaySubmit(event) {
    event.preventDefault();
    sessionStorage.setItem("hdhhfb7383__3u8748", true);

    const formData = new FormData(event.target);
    setDepartureDate(formData.get("departure"));

    const payload = {
      EndUserIp: reducerState?.ip?.ipData,
      TokenId: reducerState?.ip?.tokenData,
      AdultCount: activeIdAdult,
      ChildCount: activeIdChild,
      InfantCount: activeIdInfant,
      DirectFlight: "false",
      OneStopFlight: "false",
      JourneyType: data2.class || "1",
      PreferredAirlines: null,
      Segments: [
        {
          Origin: selectedFrom.AirportCode,
          Destination: selectedTo.AirportCode,
          FlightCabinClass: activeIdClass,
          PreferredDepartureTime: formData.get("departure"),
          PreferredArrivalTime: formData.get("departure"),
        },
      ],
      Sources: ["GDS"],
    };

    sessionStorage.setItem(
      "onewayprop",
      JSON.stringify([
        {
          Origin: selectedFrom.AirportCode,
          Destination: selectedTo.AirportCode,
          FlightCabinClass: activeIdClass,
          PreferredDepartureTime: formData.get("departure"),
          PreferredArrivalTime: formData.get("departure"),
          selectedFrom,
          selectedTo,
          totalCount,
          startDate,
          activeIdAdult,
          activeIdChild,
          activeIdInfant,
        },
      ])
    );

    navigate(
      `/Searchresult?adult=${activeIdAdult}&child=${activeIdChild}&infant=${activeIdInfant}`
    );
    dispatch(oneWayAction(payload));
    // }
  }



  const handleRoundLogoClick = () => {
    const tempFrom = { ...selectedFrom };
    const tempSelectedFrom = selectedFrom;
    setSelectedFrom(selectedTo);
    setSelectedTo(tempFrom);
  };



  return (
    <>
      <section
        className="oneWayAbsDesign"

      >
        <Helmet>
          <title>Flight</title>
          <link rel="canonical" href="/" />
          <meta name="description" content="one way flight" />
          <meta
            name="keywords"
            content="
online flight booking,compare flight prices,best airfare deals,last minute flights,multi-city flight booking,business class flights,non-stop flights budget airlines,family-friendly airlines,flight upgrades,round trip flights under 4000,direct flights with vistara,airports with cheapest flights to Vistara,flights with in-flight entertainment,flexible booking options"
          />
        </Helmet>
        <div className="container">
          <h2 className="dummyTitle">Book Ticket For Dummy PNR</h2>
          <div className="row oneWayBg">
            <div className="col-12 p-0">


              <form onSubmit={handleOnewaySubmit}>
                <div className="your-container">
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setFromToggle(true);
                      setdisplayFrom(true);
                      // setIsLoadingFrom(true);
                    }}
                    className="from-container"
                    id="item-0"
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
                                    placeholder="From"
                                    value={from}
                                    autoComplete="off"
                                    onChange={(event) => {
                                      handleFromInputChange(event);
                                      // setIsLoadingFrom(true);
                                      handleFromSearch(event.target.value);
                                    }}
                                    // required
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
                                        //  onClick={(e) => {
                                        //   e.stopPropagation(); // Stop event bubbling

                                        // }}
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
                      // ; alert(fromToggle, "/////")
                    }}
                    className="from-container"
                    id="item-1"
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
                                        <div>
                                          <FlightLandIcon />
                                        </div>

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
                  <div className="from-container">
                    <span>Departure</span>
                    <div className="">
                      <div className="onewayDatePicker" id="item-2">
                        <DatePicker
                          name="departure"
                          id="departure"
                          selected={startDate}
                          onChange={handleDateChange}
                          minDate={currentdate}
                        />
                      </div>
                    </div>
                    <span className="d-none d-md-block ">{getDayOfWeek(startDate)}</span>
                  </div>

                  <div className="travellerContainer " id="item-3">
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
                            (activeIdClass === 4 && "Business")(
                              activeIdClass === 5 && "Business Economy"
                            )(activeIdClass === 6 && "First Class")}
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
                              {/* Use the TravelerCounter component for each category */}
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
                              <h3>Choose Travel Class</h3>
                            </div>
                            <div>
                              <ul className="classButtonTravel">
                                {ClassItems?.map((ele) => (
                                  <>
                                    <li
                                      style={{
                                        backgroundColor:
                                          ele.id === activeIdClass
                                            ? "#d90429"
                                            : "#fff",
                                        color:
                                          ele.id === activeIdClass
                                            ? "#fff"
                                            : "#d90429",
                                      }}
                                      data-id={ele.id}
                                    // onClick={handleClassItemClick}
                                    >
                                      {ele?.label}
                                    </li>
                                  </>
                                ))}
                              </ul>
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
                            marginRight: "40px",
                          }}
                          onClick={handleTravelClose}
                        >
                          Ok
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </div>
                  <div className=" onewaySearch" id="item-4">
                    <button type="submit" className="searchButt">
                      <h3 className="mb-0">Search</h3>
                      {/* <KeyboardDoubleArrowRightIcon /> */}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Homeform;