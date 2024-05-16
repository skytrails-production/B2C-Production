import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  busSearchAction,
  clearBusSearchReducer,
} from "../../Redux/busSearch/busSearchAction";
import { apiURL } from "../../Constants/constant";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import "./bus.css";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import Swal from "sweetalert2";
import Loadingbus from "./Busloading/Loadingbus";
import SecureStorage from "react-secure-storage";
import { CiSearch } from "react-icons/ci";
import { swalModal } from "../../utility/swal";

const Homeform = (props) => {
  // const [value, setValue] = React.useState("1");
  // const [placeholderFrom, setPlaceholderFrom] = useState("from");
  // const [labelFrom, setLabelFrom] = useState("From");
  // // const [startDate, setStartDate] = useState(null);
  // const [placeholderTo, setPlaceholderTo] = useState("To");
  // const [labelTo, setLabelTo] = useState("To");

  // const [display, setDisplay] = useState("");
  // const [isLoadingFrom, setIsLoadingFrom] = useState(false);
  // const [isLoadingTo, setIsLoadingTo] = useState(false);

  // Copied state end

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reducerState = useSelector((state) => state);
  // const [isLoading, setIsLoading] = useState(false);
  // const [isLoadingFlight, setIsLoadingFlight] = useState(false);
  const populerSearch = [
    {
      CityId: "230",
      CityName: "Delhi",
      __v: 0,
      _id: "657fe0fc49ee28a4a5880f98",
    },
    {
      CityId: "1562",
      CityName: "Mumbai",
      __v: 0,
      _id: "657fe0fd49ee28a4a58829e5",
    },
    {
      CityId: "6395",
      CityName: "Bangalore",
      __v: 0,
      _id: "657fe0fc49ee28a4a588060a",
    },
    {
      CityId: "7681",
      CityName: "Pune",
      __v: 0,
      _id: "657fe0fd49ee28a4a58832c8",
    },
    {
      CityId: "7485",
      CityName: "Hyderabad",
      __v: 0,
      _id: "657fe0fc49ee28a4a5881810",
    },
    {
      CityId: "14856",
      CityName: "Agarwada-Chopdem VP, Goa",
      __v: 0,
      _id: "657fe0fc49ee28a4a58800b2",
    },
  ];
  const [fromSearchResults, setFromSearchResults] = useState(populerSearch);
  const [toSearchResults, setToSearchResults] = useState(populerSearch);
  const [fromQuery, setFromQuery] = useState("");
  const [toQuery, setToQuery] = useState("");
  const [maxcity1, setmaxcity1] = useState(1);
  const [cityIndex1, setcityIndex1] = useState(-1);
  const [cityIndex, setcityIndex] = useState(-1);
  // const [from, setFrom] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFrom, setSelectedFrom] = useState("");
  const inputRef = useRef(null);
  const [maxcity, setmaxcity] = useState(1);
  const [isOpen1, setIsOpen1] = useState(false);
  const [selectedFromLast, setSelectedFromLast] = useState({
    CityId: "7485",
    CityName: "Hyderabad",
    __v: 0,
    _id: "657fe0fc49ee28a4a5881810",
  });

  // const [to, setTO] = useState("");
  const [selectedTo, setSelectedTo] = useState("");
  const [selectedToLast, setSelectedToLast] = useState({
    CityId: "6395",
    CityName: "Bangalore",
    __v: 0,
    _id: "657fe0fc49ee28a4a588060a",
  });
  const [displayFrom, setdisplayFrom] = useState(false);
  const [displayTo, setdisplayTo] = useState(false);
  const [loader, setLoader] = useState(true);

  const fromInputRef = useRef(null);
  const inputRef1 = useRef(null);
  // const toInputRef = useRef(null);

  const toSearchRef = React.useRef(null);
  const fromSearchRef = React.useRef(null);
  // const authenticUser = reducerState?.logIn?.loginData?.status;

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      setdisplayTo(false);
    };
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideTo);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideTo);
    };
  }, []);

  const scrollDown100px1 = (opreator) => {
    if (inputRef1.current) {
      inputRef1.current.scroll({
        top: opreator
          ? inputRef1.current.scrollTop + 50
          : inputRef1.current.scrollTop - 50,
        behavior: "auto",
      });
    }
  };

  useEffect(() => {
    const handleGlobalKeyDown1 = (event) => {
      if (event.key === "ArrowDown" && isOpen1) {
        setcityIndex((pre) => Math.min(pre + 1, maxcity - 1));
        scrollDown100px1(1);
      }
      if (event.key === "ArrowUp" && isOpen1) {
        setcityIndex((pre) => Math.max(pre - 1, 0));
        scrollDown100px1(0);
      }
      if (event.key === "Enter" && isOpen1) {
        event.preventDefault();
        if (cityIndex >= 0 && cityIndex < toSearchResults.length) {
          handleToClick(toSearchResults[cityIndex]);
        }
      }
    };

    document.addEventListener("keydown", handleGlobalKeyDown1);
    return () => {
      document.removeEventListener("keydown", handleGlobalKeyDown1);
    };
  }, [isOpen1, cityIndex, maxcity, toSearchResults]);

  const handleClickOutsideTo = (event) => {
    // console.log(inputRef1.current, inputRef1.current.contains(event.target));
    if (inputRef1.current && !inputRef1.current.contains(event.target)) {
      setIsOpen1(false);
    }
  };

  const handleClickOutside = (event) => {
    if (toSearchRef.current && !toSearchRef.current.contains(event.target)) {
      setdisplayTo(false);
    }
  };
  useEffect(() => {
    dispatch(clearBusSearchReducer());
    // sessionStorage.removeItem("seatData");
    // sessionStorage.removeItem("busPassName");
  }, []);
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideFrom);
    return () => {
      setdisplayFrom(false);
    };
  }, []);

  // const handleClickOutsideFrom = (event) => {
  //   if (
  //     fromSearchRef.current &&
  //     !fromSearchRef.current.contains(event.target)
  //   ) {
  //     setdisplayFrom(false);
  //   }
  // };

  const scrollDown100px = (opreator) => {
    if (inputRef.current) {
      inputRef.current.scroll({
        top: opreator
          ? inputRef.current.scrollTop + 50
          : inputRef.current.scrollTop - 50,
        behavior: "auto",
      });
    }
  };

  useEffect(() => {
    setmaxcity1(fromSearchResults.length);
  }, [fromSearchResults]);

  useEffect(() => {
    const handleGlobalKeyDown = (event) => {
      if (event.key === "ArrowDown" && isOpen) {
        setcityIndex1((pre) => Math.min(pre + 1, maxcity1 - 1));
        scrollDown100px(1);
      }
      if (event.key === "ArrowUp" && isOpen) {
        setcityIndex1((pre) => Math.max(pre - 1, 0));
        scrollDown100px(0);
      }
      if (event.key === "Enter" && isOpen) {
        // Handle Enter key press to select an option
        if (fromSearchResults.length > 0 && cityIndex1 >= 0) {
          const selectedOption = fromSearchResults[cityIndex1];
          handleFromClick(selectedOption);
        }
      }
    };

    document.addEventListener("keydown", handleGlobalKeyDown);
    return () => {
      document.removeEventListener("keydown", handleGlobalKeyDown);
    };
  }, [isOpen, cityIndex1, maxcity1, fromSearchResults]);

  const currentDate = new Date();
  const [startDate, setStartDate] = useState(new Date());

  const handleDateChange = (date) => {
    setStartDate(date);
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

  // console.log(reducerState, "reducerstate")
  useEffect(() => {
    if (
      reducerState?.getBusResult?.busResult?.data?.data?.BusSearchResult
        ?.BusResults?.length > 0
    ) {
    } else if (
      reducerState?.getBusResult?.busResult?.data?.data?.BusSearchResult?.Error
        ?.ErrorCode !== 0 &&
      reducerState?.getBusResult?.busResult?.data?.data?.BusSearchResult?.Error
        ?.ErrorCode !== undefined
    ) {
      swalModal(
        "bus",
        reducerState?.getBusResult?.busResult?.data?.data?.BusSearchResult
          ?.Error?.ErrorMessage,
        false
      );

      // setIsLoadingFlight(false);
      setStartDate(currentDate);
      setSelectedFromLast({
        CityId: "7485",
        CityName: "Hyderabad",
        __v: 0,
        _id: "657fe0fc49ee28a4a5881810",
      });
      setSelectedToLast({
        CityId: "6395",
        CityName: "Bangalore",
        __v: 0,
        _id: "657fe0fc49ee28a4a588060a",
      });
      setSelectedTo();
      setFromQuery("");
      setToQuery("");
      dispatch(clearBusSearchReducer());
      console.log(reducerState,"reducerstate")
      sessionStorage.removeItem("seatData");
      sessionStorage.removeItem("busPassName");
    }
  }, [reducerState?.getBusResult?.busResult]);

  useEffect(() => {
    let mounted = true;

    const fetchSearchResults = async () => {
      const results = await axios.get(
        `${apiURL.baseURL}/skyTrails/city/searchCityBusData?keyword=${fromQuery}`
      );
      if (mounted) {
        setFromSearchResults(results?.data?.data);
      }
    };

    if (fromQuery.length >= 2) {
      fetchSearchResults();
    }
    return () => {
      mounted = false;
    };
  }, [fromQuery]);

  // const handleClickOutsideFrom = (event) => {
  //   if (inputRef.current && !inputRef?.current?.contains(event.target)) {
  //     setIsOpen(false);
  //   }
  // };

  useEffect(() => {
    let mounted = true;

    const fetchSearchResults = async () => {
      const results = await axios.get(
        `${apiURL.baseURL}/skyTrails/city/searchCityBusData?keyword=${toQuery}`
      );
      if (mounted) {
        setToSearchResults(results?.data?.data);
      }
    };

    if (toQuery.length >= 2) {
      fetchSearchResults();
    }
    return () => {
      mounted = false;
    };
  }, [toQuery]);

  // const handleChange = (event, newValue) => {
  //   // setValue(newValue);
  // };

  useEffect(() => {
    let mounted = true;
    const fetchSearchResults = async () => {
      const results = await axios.get(
        `${apiURL.baseURL}/skyTrails/city/searchCityBusData?keyword=${fromQuery}`
      );
      if (mounted) {
        setFromSearchResults(results?.data?.data);
      }
    };
    if (fromQuery.length >= 2) {
      fetchSearchResults();
    }
    return () => {
      mounted = false;
    };
  }, [fromQuery]);

  useEffect(() => {
    setmaxcity(toSearchResults.length);
  }, [toSearchResults]);

  useEffect(() => {
    let mounted = true;

    const fetchSearchResults = async () => {
      const results = await axios.get(
        `${apiURL.baseURL}/skyTrails/city/searchCityBusData?keyword=${toQuery}`
      );
      if (mounted) {
        setToSearchResults(results?.data?.data);
      }
    };

    if (toQuery.length >= 2) {
      fetchSearchResults();
    }
    return () => {
      mounted = false;
    };
  }, [toQuery]);

  // useEffect(() => {
  //   setmaxcity(toSearchResults.length);
  // }, [toSearchResults]);

  const handleFromInputChange = (event) => {
    setSelectedFrom(event.target.value);
    setIsOpen(true);
  };

  const handleFromClick = async (result) => {
    // await setSelectedFrom("");
    setSelectedFrom(result.CityName);
    setFromQuery("");
    setIsOpen(false);
    setSelectedFromLast(result);
    // await setdisplayFrom(false);
  };

  const handleToClick = async (result) => {
    setSelectedTo(result.CityName);
    setToQuery("");
    setSelectedToLast(result);
    // setSelectedTo("");
    setIsOpen1(false);
    // await setdisplayTo(false);
  };

  const handleClickOutsideFrom = (event) => {
    if (inputRef.current && !inputRef?.current?.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const handleFromSearch = (e) => {
    setFromQuery(e);
  };

  const handleToInputChange = (event) => {
    setSelectedTo(null);
    setIsOpen1(true);
  };

  const handleToSearch = (e) => {
    setToQuery(e);
  };

  function toggle(e) {
    setIsOpen(true);
    setIsOpen1(false);
    setcityIndex1(0);
  }
  // const handleDateInputChange = () => {
  //   setErrors({ ...errors, date: "" });
  // };

  const token = SecureStorage.getItem("jwtToken");

  function handleSubmit(event) {
    event.preventDefault();

    // setIsLoadingFlight(true);
    sessionStorage.setItem("SessionExpireTime", new Date());
    const formData = new FormData(event.target);
    const selectedDate = startDate;
    let formattedDate = "";
    if (selectedDate) {
      const month = selectedDate.getMonth() + 1;
      const day = selectedDate.getDate();
      const year = selectedDate.getFullYear();
      formattedDate = `${year}/${month.toString().padStart(2, "0")}/${day
        .toString()
        .padStart(2, "0")}`;
    }
    if (selectedFromLast.CityId == selectedToLast.CityId) {
      return;
    }
    const payload = {
      EndUserIp: reducerState?.ip?.ipData,
      TokenId: reducerState?.ip?.tokenData,
      DateOfJourney: formattedDate,
      DestinationId: selectedToLast.CityId,
      OriginId: selectedFromLast.CityId,
    };

    sessionStorage.setItem(
      "busOnewayData",
      JSON.stringify([
        {
          CityId: selectedFromLast.CityId,
          CityName: selectedFromLast.CityName,
          __v: selectedFromLast.__v,
          _id: selectedFromLast._id,
        },
        {
          CityId: selectedToLast.CityId,
          CityName: selectedToLast.CityName,
          __v: selectedToLast.__v,
          _id: selectedToLast._id,
        },
        startDate,
      ])
    );
    // createSearchHistory()
    navigate("/busresult");
    dispatch(busSearchAction(payload));

    // }
  }

  const handleRoundLogoClick = () => {
    const tempFrom = selectedFromLast;
    setSelectedFromLast(selectedToLast);
    setSelectedFrom(selectedTo);
    setSelectedTo(selectedFrom);
    setSelectedToLast(tempFrom);
  };

  // function toggle(e) {
  //   setIsOpen(true);
  //   // setIsOpen1(false);
  //   setcityIndex1(0);
  // }
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };
  // useEffect(() => {
  //   if (
  //     reducerState?.getBusResult?.busResult?.data?.data?.BusSearchResult?.Error
  //       ?.ErrorCode === 0
  //   ) {
  //     navigate("/busresult");
  //   }
  // }, [
  //   reducerState?.getBusResult?.busResult?.data?.data?.BusSearchResult?.Error,
  // ]);

  // if (isLoadingFlight) {
  //   return (
  //     <>
  //       <Loadingbus />
  //     </>
  //   );
  // }

  return (
    <>
      <div className="container homeabsnew">
        <section className="HotelAbsDesign" style={{}}>
          <div className="container ">
            <div className="row BusSearchBg p-0">
              <div className="col-12 p-0">
                <form onSubmit={handleSubmit}>
                  <div className="busSearch-container">
                    <div className="PackageInner_bus" id="item-0B">
                      <span>From</span>

                      <div className="dropdown" style={{ width: "100%" }}>
                        <div className="control">
                          <div
                            className="selected-value"
                            style={{ display: "flex" }}
                          >
                            <input
                              name="from"
                              onKeyDown={handleKeyDown}
                              placeholder={selectedFromLast.CityName}
                              value={selectedFrom}
                              onClick={toggle}
                              onChange={(event) => {
                                handleFromInputChange(event);
                                handleFromSearch(event.target.value);
                              }}
                              // ref={fromInputRef}

                              autoComplete="off"
                              style={{
                                border: "none",
                                fontSize: "20px",
                                outline: "none",
                                color: "#3f454a",
                                fontWeight: "700",
                              }}
                              className="custominputplaceholder"
                            />
                          </div>
                          <div
                            style={{ display: "none" }}
                            className={`arrow ${isOpen ? "open" : ""}`}
                          ></div>
                        </div>
                        <div
                          ref={inputRef}
                          className={`options ${isOpen ? "open" : ""}`}
                          style={{
                            overflowX: "hidden",
                            overflowY: "auto",
                            maxHeight: "200px",
                            scrollbarWidth: "thin",
                          }}
                        >
                          {fromSearchResults?.map((result1, index) => {
                            return (
                              <div
                                key={result1._id}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleFromClick(result1);
                                  setdisplayFrom(false);
                                  setSelectedFromLast(result1);
                                }}
                                className={`${
                                  index === cityIndex1 ? "hoverCity" : ""
                                }`}
                              >
                                <div className="onewayResultFirst">
                                  <div className="resultOriginName">
                                    <p>
                                      {" "}
                                      <span>{result1.CityName} </span>
                                    </p>
                                  </div>
                                </div>
                                {/* </div> */}
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <span className="d-none d-md-block">
                        {selectedFromLast?.CityId}
                      </span>

                      <div
                        className="roundlogo"
                        onClick={handleRoundLogoClick}
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
                    {/* </div> */}

                    <div className="PackageInner_bus" id="item-1B">
                      <span>To</span>

                      <div className="dropdown">
                        <div className="control">
                          <div
                            className="selected-value"
                            style={{ display: "flex" }}
                          >
                            <input
                              name="to"
                              placeholder={selectedToLast.CityName}
                              autoComplete="off"
                              value={selectedTo}
                              onKeyDown={handleKeyDown}
                              onClick={() => {
                                setIsOpen1(true);
                                setIsOpen(false);
                                setcityIndex(0);
                              }}
                              onChange={(event) => {
                                handleToInputChange(event);
                                handleToSearch(event.target.value);
                              }}
                              style={{
                                border: "none",
                                fontSize: "20px",
                                fontWeight: "500",
                                outline: "none",
                                color: "#3f454a",
                                fontWeight: "700",
                              }}
                              className="custominputplaceholder"
                            />
                          </div>
                          <div
                            style={{ display: "none" }}
                            className={`arrow ${isOpen1 ? "open" : ""}`}
                          ></div>
                        </div>

                        <div
                          ref={inputRef1}
                          className={`options ${isOpen1 ? "open" : ""}`}
                          style={{
                            overflowX: "hidden",
                            overflowY: "auto",
                            maxHeight: "200px",
                            scrollbarWidth: "thin",
                          }}
                        >
                          {toSearchResults.map((result, index) => (
                            <div
                              onClick={(e) => {
                                e.stopPropagation();
                                handleToClick(result);
                                setdisplayTo(false);
                                setSelectedToLast(result);
                              }}
                              className={`${
                                index === cityIndex ? "hoverCity" : ""
                              }`}
                              key={result._id}
                            >
                              <div className="onewayResultFirst">
                                <div className="resultOriginName">
                                  <p>
                                    <span>{result.CityName} </span>
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      {/* )} */}
                      {/* <div
                        onClick={(e) => {
                          e.stopPropagation();
                          setdisplayTo(true);
                          setdisplayFrom(false);
                          setTimeout(() => {
                            toInputRef.current.focus();
                          }, 200);
                        }}
                      >
                        
                      </div> */}

                      <span className="d-none d-md-block">
                        {selectedToLast?.CityId}
                      </span>
                    </div>

                    <div
                      className="PackageInner"
                      style={{
                        borderRight: "0px",
                        borderRadius: "8px",
                        border: "1px solid #d1d5db",
                        background: "#fff",
                      }}
                      id="item-2B"
                    >
                      <span>Departure</span>
                      <div className="">
                        <div className="onewayDatePicker">
                          <DatePicker
                            name="departure"
                            id="departure"
                            selected={startDate}
                            onChange={handleDateChange}
                            minDate={currentDate}
                            dateFormat="dd MMM, yy"
                          />
                        </div>
                      </div>
                      <span className="d-none d-md-block">
                        {getDayOfWeek(startDate)}
                      </span>
                    </div>
                    <div className=" onewaySearch-btn" id="item-3B">
                      <button type="submit" className="searchButt">
                        <h3>Search</h3>
                        {/* <KeyboardDoubleArrowRightIcon /> */}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Homeform;
