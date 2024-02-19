import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { busSearchAction, clearBusSearchReducer } from "../../Redux/busSearch/busSearchAction";
import { apiURL } from "../../Constants/constant";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import "./bus.css";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// import Swal from "sweetalert2";
import Loadingbus from "./Busloading/Loadingbus";

// import Login from "./Login"
// import Login from "../../components/Login"
// import Modal from "@mui/material/Modal";

// import loginGif from "../../images/loginGif.gif"
// import CloseIcon from '@mui/icons-material/Close';
import { CiSearch } from "react-icons/ci";
import { swalModal } from "../../utility/swal"
// const label = { inputProps: { "aria-label": "Checkbox demo" } };



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
  const [isLoadingFlight, setIsLoadingFlight] = useState(false);
  const populerSearch = [{ CityId: "230", CityName: "Delhi", __v: 0, _id: "657fe0fc49ee28a4a5880f98" }, { CityId: "1562", CityName: "Mumbai", __v: 0, _id: "657fe0fd49ee28a4a58829e5" }, {
    CityId: "6395", CityName: "Bangalore", __v: 0, _id: "657fe0fc49ee28a4a588060a"
  }, {
    CityId: "7681", CityName: "Pune", __v: 0, _id: "657fe0fd49ee28a4a58832c8"
  }, {
    CityId: "7485", CityName: "Hyderabad", __v: 0, _id: "657fe0fc49ee28a4a5881810"
  }, {
    CityId: "14856", CityName: "Agarwada-Chopdem VP, Goa", __v: 0, _id: "657fe0fc49ee28a4a58800b2"
  }];
  const [fromSearchResults, setFromSearchResults] = useState(populerSearch);
  const [toSearchResults, setToSearchResults] = useState(populerSearch);
  const [fromQuery, setFromQuery] = useState("");
  const [toQuery, setToQuery] = useState("");
  // const [from, setFrom] = useState("");
  const [selectedFrom, setSelectedFrom] = useState("");
  const [selectedFromLast, setSelectedFromLast] = useState({
    CityId: "7485", CityName: "Hyderabad", __v: 0, _id: "657fe0fc49ee28a4a5881810"
  });

  // const [to, setTO] = useState("");
  const [selectedTo, setSelectedTo] = useState("");
  const [selectedToLast, setSelectedToLast] = useState({
    CityId: "6395", CityName: "Bangalore", __v: 0, _id: "657fe0fc49ee28a4a588060a"
  });
  const [displayFrom, setdisplayFrom] = useState(false);
  const [displayTo, setdisplayTo] = useState(false);


  // console.log(selectedFrom, "selected from ")


  // const inputRef = useRef(null);
  const fromInputRef = useRef(null);
  const toInputRef = useRef(null);
  // const [fromData, setFromData] = useState([]);
  // const [fromClick, setFromClick] = useState("");
  // const [toClick, setToClick] = useState("");
  // const [origin, setOrigin] = useState([]);
  // const [validate, setValidate] = useState(false);
  // const [errors, setErrors] = useState({
  //   from: "",
  //   to: "",
  //   date: "",
  // });

  // console.log(reducerState, "reducer state")
  const toSearchRef = React.useRef(null);
  const fromSearchRef = React.useRef(null);
  // const authenticUser = reducerState?.logIn?.loginData?.status;

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      setdisplayTo(false)
    };
  }, []);

  const handleClickOutside = (event) => {
    if (toSearchRef.current && !toSearchRef.current.contains(event.target)) {
      setdisplayTo(false);
    }
  };
  useEffect(() => {
    dispatch(clearBusSearchReducer())
    sessionStorage.removeItem("seatData")
    sessionStorage.removeItem("busPassName")
  }, []);
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideFrom);
    return () => {
      setdisplayFrom(false)
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


  const currentDate = new Date();
  const [startDate, setStartDate] = useState(new Date());

  const handleDateChange = (date) => {
    setStartDate(date);
  };

  const getDayOfWeek = (date) => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return daysOfWeek[date.getDay()];
  };

  // console.log(reducerState, "reducerstate")
  useEffect(() => {
    // console.warn(reducerState?.getBusResult?.busResult?.data?.data?.BusSearchResult
    //   ?.BusResults && reducerState?.getBusResult?.busResult?.data?.data?.BusSearchResult
    //     ?.BusResults, "reducerState?.getBusResult?.busResult?.data?.data?.BusSearchResult")
    if (
      reducerState?.getBusResult?.busResult?.data?.data?.BusSearchResult
        ?.BusResults?.length > 0
    ) {
      // navigate("/busresult");
    }
    else if (reducerState?.getBusResult?.busResult?.data?.data?.BusSearchResult?.Error?.ErrorCode !== 0 && reducerState?.getBusResult?.busResult?.data?.data?.BusSearchResult?.Error?.ErrorCode !== undefined) {

      swalModal("bus", reducerState?.getBusResult?.busResult?.data?.data?.BusSearchResult?.Error?.ErrorMessage, false)


      setIsLoadingFlight(false)
      setStartDate(currentDate)
      // setFrom("")
      // setTO("")
      setSelectedFromLast({
        CityId: "7485", CityName: "Hyderabad", __v: 0, _id: "657fe0fc49ee28a4a5881810"
      })
      setSelectedToLast({
        CityId: "6395", CityName: "Bangalore", __v: 0, _id: "657fe0fc49ee28a4a588060a"
      });
      setSelectedTo()
      setFromQuery("")
      setToQuery("")
      dispatch(clearBusSearchReducer())
      sessionStorage.removeItem("seatData")
      sessionStorage.removeItem("busPassName")

    }
  }, [reducerState?.getBusResult?.busResult
  ]);

  useEffect(() => {
    let mounted = true;

    const fetchSearchResults = async () => {
      // make an API call to get search results

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
    let mounted = true;

    const fetchSearchResults = async () => {
      // setIsLoading(true);

      // make an API call to get search results

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
      // setIsLoading(true);
      const results = await axios.get(
        `${apiURL.baseURL}/skyTrails/city/searchCityBusData?keyword=${fromQuery}`
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



  useEffect(() => {
    let mounted = true;

    const fetchSearchResults = async () => {
      // setIsLoading(true);

      const results = await axios.get(
        `${apiURL.baseURL}/skyTrails/city/searchCityBusData?keyword=${toQuery}`
      );
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

  const handleFromInputChange = (event) => {

    setSelectedFrom(event.target.value)

  };

  const handleFromClick = async (result) => {
    await setSelectedFrom("");
    setFromQuery("");
    setSelectedFromLast(result)
    await setdisplayFrom(false);
    // validateFrom()
  };

  const handleToClick = async (result) => {
    await setSelectedTo("")
    setToQuery("")
    setSelectedToLast(result)
    setSelectedTo("");

    await setdisplayTo(false);
    // setTO(result.CityId);

  };

  const handleFromSearch = (e) => {
    setFromQuery(e);
  };

  const handleToInputChange = (event) => {
    // setErrors({ ...errors, to: "" });
    // setTO(event.target.value);
    setSelectedTo(null);
  };

  const handleToSearch = (e) => {
    setToQuery(e);
  };

  // const handleDateInputChange = () => {
  //   setErrors({ ...errors, date: "" });
  // };


  const token = sessionStorage.getItem("jwtToken");
  // console.log(selectedFromLast.CityName, "city name")

  // const createSearchHistory = async () => {


  //   const historyData = {
  //     origin: selectedFromLast.CityName,
  //     destination: selectedToLast.CityName,
  //     journeyDate: startDate,
  //     searchType: "BUS",


  //   };

  //   try {
  //     const response = await axios({
  //       method: 'post',
  //       url: `${apiURL.baseURL}/skyTrails/api/user/createSearchHistory`,
  //       data: historyData,
  //       headers: {
  //         token: token,
  //       },
  //     });
  //   } catch (error) {
  //     console.error("Error sending data to the server:", error);
  //   }
  // };




  function handleSubmit(event) {
    event.preventDefault();
    // if (authenticUser !== 200) {
    //   setIsLoginModalOpen(true);
    // }
    // else {
    setIsLoadingFlight(true)
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
    const payload = {
      EndUserIp: reducerState?.ip?.ipData,
      TokenId: reducerState?.ip?.tokenData,
      DateOfJourney: formattedDate,
      DestinationId: selectedToLast.CityId,
      OriginId: selectedFromLast.CityId,
    };
    // createSearchHistory()
    dispatch(busSearchAction(payload));

    // }
  }



  const handleRoundLogoClick = () => {
    const tempFrom = selectedFromLast;
    setSelectedFromLast(selectedToLast);
    setSelectedToLast(tempFrom);
    // const tempSelectedFrom = selectedFrom;
    // setSelectedFrom(selectedTo);
    // setSelectedTo(tempSelectedFrom);
  };




  // const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);


  // const handleModalClose = () => {
  //   setIsLoginModalOpen(false)
  // }
  // console.warn(fromSearchResults, "fromSearchResults")


  // useEffect(() => {
  //   if (authenticUser == 200) {
  //     handleModalClose();
  //   }
  // }, [authenticUser])


  useEffect(() => {
    if (
      reducerState?.getBusResult?.busResult?.data?.data?.BusSearchResult?.Error
        ?.ErrorCode === 0
    ) {
      navigate("/busresult");
    }
  }, [reducerState?.getBusResult?.busResult?.data?.data?.BusSearchResult?.Error]);



  if (isLoadingFlight) {
    return (
      <>
        <Loadingbus />
      </>
    )
  }
  // end
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
                        <CloseIcon className="closeIncon" onClick={handleModalClose} />
                        <div className="loginImg logg">
                          <img src={loginGif} alt="loginGif" />
                        </div>
                      </div>
                    </div>
                    <div class="col-md-12 pe-0">
                      <div class="form-left h-100 d-flex justify-content-center flex-column py-4 px-3">
                        <div class="row g-4">
                          <div class="col-12" style={{ display: "flex", justifyContent: "center" }}>
                            <label className="mb-3">Please Login to Continue<span class="text-danger">*</span></label>

                          </div>
                          <div class="col-12" style={{ display: "flex", justifyContent: "center" }}>
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

      <section className="HotelAbsDesign" style={{}}>
        <div className="container " >
          <div className="row BusSearchBg p-0">
            <div className="col-12 p-0">
              <form onSubmit={handleSubmit}>
                <div className="busSearch-container">
                  <div className="PackageInner_bus" id="item-0B">
                    <span>From</span>
                    {displayFrom &&
                      <div
                        ref={fromSearchRef}
                        className="Package_innerDiv_Position"
                      // ref={fromInputRef}
                      >
                        <div className="package_input_div" >
                          <div >

                            <CiSearch size={"20px"} />
                          </div>

                          <div className="busHideInput">
                            <input
                              name="from"
                              placeholder="Enter city Name"
                              value={selectedFrom}
                              className="input_position"
                              onChange={(event) => {
                                // validateFrom()
                                handleFromInputChange(event);
                                handleFromSearch(event.target.value);
                                // validateBoth()
                              }}
                              ref={fromInputRef}
                              // onClick={() => setdisplayFrom(true)}
                              autoComplete="off"
                              required
                              style={{
                                outline: "none",
                                border: "none",
                              }}
                            />
                          </div>
                        </div>
                        <div
                          // ref={fromSearchRef}
                          className="form_search_Bus"

                        >
                          <ul
                            className="to_ul_bus"
                          // style={{ paddingInlineStart: "0px",width:"100%", }}
                          // className="from_Search_Container from_Search_container_position "
                          >
                            <div

                              className="scroll_style scroll_style_bus"
                            >
                              {fromSearchResults?.map((result) => (
                                <li
                                  className="to_List_bus"

                                  key={result._id}

                                  onClick={(e) => {

                                    e.stopPropagation();
                                    handleFromClick(result);
                                    setdisplayFrom(false);
                                    setSelectedFromLast(result)
                                    // setFromClick(result.CityId);
                                    // setSub(false)
                                    // setFromSearchResults(populerSearch)
                                    // setFromSearchResults(populerSearch)
                                    // console.log(fromSearchResults, "fromSearchResults")
                                    // console.log(selectedFromLast, "selected from latest")


                                    // validateBoth()


                                  }}
                                >
                                  <div
                                    className="busResultBox"

                                  >
                                    <p> <span >{result.CityName} </span></p>
                                    {/* <div style={{width:"100%",overflowX:'hidden'}}> */}

                                    {/* <span >{result.CityName} </span> */}
                                    {/* </div> */}
                                    {/* <div
                                    //  className="onewayResultFirst"
                                    >

                                      <div
                                      // className="resultOriginName"

                                      >

                                      </div>
                                    </div> */}
                                  </div>
                                </li>
                              ))}
                            </div>
                          </ul>


                        </div>


                        {/* <div
                          // ref={fromSearchRef}
                          className="form_search_Bus bus_search_query_position"
                          style={{

                            display: "flex",
                          }}
                        >
                          <ul className="from_Search_Container from_Search_container_position ">
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                maxHeight: 300,
                                overflow: "hidden",
                                overflowY: "scroll",
                              }}
                              className="scroll_style"
                            >
                              {fromSearchResults?.map((result) => (
                                <li
                                  className="to_List"
                                  key={result._id}
                                  onClick={(e) => {

                                    e.stopPropagation();
                                    handleFromClick(result);
                                    setdisplayFrom(false);
                                    setSelectedFromLast(result)
                                    // setFromClick(result.CityId);
                                    // setSub(false)
                                    // setFromSearchResults(populerSearch)
                                    // setFromSearchResults(populerSearch)
                                    // console.log(fromSearchResults, "fromSearchResults")
                                    // console.log(selectedFromLast, "selected from latest")


                                    // validateBoth()


                                  }}
                                >
                                  <div className="onewayResultBox">

                                    <div className="onewayResultFirst">

                                      <div className="resultOriginName">
                                        <p>{result.CityId}</p>
                                        <span>{result.CityName} </span>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </Box>
                          </ul>
                        </div> */}

                      </div>}
                    <div
                      className="bus_lable"
                      onClick={(e) => {
                        e.stopPropagation();
                        setdisplayFrom(true);
                        setdisplayTo(false)
                        setTimeout(() => {
                          fromInputRef.current.focus();
                        }, 200)
                        //  alert("click")
                        // setSub(true)
                      }}

                    >
                      <label>{selectedFromLast?.CityName}</label>


                    </div>

                    <span className="d-none d-md-block">{selectedFromLast?.CityId}</span>
                    <div className="roundlogo" onClick={handleRoundLogoClick}
                      style={{ cursor: 'pointer' }}>
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

                  <div className="PackageInner_bus" id="item-1B">
                    <span>To</span>
                    {displayTo &&
                      <div ref={toSearchRef} className="Package_innerDiv_Position">
                        <div className="package_input_div" >
                          <div >

                            <CiSearch size={"20px"} />
                          </div>
                          <div className="busHideInput">
                            <input
                              name="to"
                              placeholder="Enter city Name"
                              autoComplete="off"
                              value={selectedTo}
                              className="input_position"
                              // onClick={() => setdisplayTo(true)}
                              onChange={(event) => {
                                handleToInputChange(event);
                                handleToSearch(event.target.value);
                                // validateBoth()
                              }}
                              ref={toInputRef}
                              required
                              style={{
                                border: "none",

                                outline: "none",
                              }}
                            />
                          </div>
                        </div>



                        <div
                          // ref={toSearchRef}
                          className="form_search_Bus"
                        >
                          <ul className="to_ul_bus">
                            <div

                              className="scroll_style bus scroll_style_bus"
                            >
                              {toSearchResults.map((result) => (
                                <li
                                  className="to_List_bus"
                                  key={result._id}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleToClick(result);
                                    setdisplayTo(false);
                                    setSelectedToLast(result)
                                    // setToClick(result.CityId);
                                    // setToSearchResults(populerSearch);
                                    // validateBoth()

                                  }
                                  }
                                >
                                  <div className="busResultBox">
                                    <p><span >{result.CityName} </span></p>
                                  </div>
                                </li>
                              ))}
                            </div>
                          </ul>
                        </div>

                      </div>}
                    <div onClick={(e) => {
                      e.stopPropagation();
                      setdisplayTo(true);
                      setdisplayFrom(false);
                      setTimeout(() => {
                        toInputRef.current.focus();
                      }, 200)
                    }} >
                      <label className="bus_lable">{selectedToLast?.CityName}</label>
                    </div>


                    <span className="d-none d-md-block">{selectedToLast?.CityId}</span>

                  </div>

                  <div className="PackageInner" id="item-2B">
                    <span>Departure</span>
                    <div className="">
                      <div className='onewayDatePicker'>
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
                    <span className="d-none d-md-block">{getDayOfWeek(startDate)}</span>
                  </div>
                  <div className="PackageInner" id="item-3B">
                    <button type="submit" className="searchButt">
                      <h3>Search</h3>
                      <KeyboardDoubleArrowRightIcon />
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
