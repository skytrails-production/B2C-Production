import { useNavigate } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import "./card.css";
import "./style/hotelpackageForm.css"
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { clearPackageData, searchPackageAction } from "../Redux/SearchPackage/actionSearchPackage";
import { useDispatch, useSelector } from "react-redux";
import { clearHolidayReducer } from "../Redux/OnePackageSearchResult/actionOneSearchPackage";
// import CloseIcon from "@mui/icons-material/Close";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
// import loginGif from "../images/loginGif.gif"
// import Login from "../components/Login"
// import Modal from "@mui/material/Modal";
import axios from "axios";
import { apiURL } from "../Constants/constant";
import { CiSearch } from "react-icons/ci";
// import { FaHotel } from "react-icons/fa6";
import { CiLocationOn } from "react-icons/ci";
// const label = { inputProps: { "aria-label": "Checkbox demo" } };
import { FaSearch } from "react-icons/fa";

const Homeform = (props) => {

  // static city names

  const popularCities = [
    "Mumbai",
    "Kerala",
    "Shimla",
    "Paris",
    "Tokyo",
    "London",
    "Goa",
  ];


  const [currentCityIndex, setCurrentCityIndex] = useState(0);
  const [cityName, setCityName] = useState("");
  const [cityNamelast, setCityNameLast] = useState("Search Package for Destination");
  const [searchTerm, setSearchTerm] = useState("");
  const populerSeacrh = ['goa', "Chandigarh", "Uttarakhand", "shridi", "Lachung", "Shimla", "Mahabaleshwar", "rahuketu", "Lachen", "taj hotel", "Ladakh", "Pahalgam"];
  const [result, setResult] = useState([]);
  const formInputRef = useRef(null);
  const formRef = useRef(null);
  const fromInputreusltRef = useRef(null);
  const fromSearchButtonRef = useRef(null);
  const [sub, setSub] = useState(false);
  // useEffect(() => {
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  // const handleClickOutside = (event) => {
  //   if (formRef.current &&
  //     !formRef.current.contains(event.target)) {
  //     setSub(false);
  //   }
  // };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (formRef.current && !formRef.current.contains(event.target) && !fromSearchButtonRef.current.contains(event.target)) {
      // setdisplayTo(false);
      setSub(false);
    }
  };

  const fetchPackage = async () => {
    try {
      const response = await axios.get(`${apiURL.baseURL}/skyTrails/packagecitylist?keyword=${searchTerm}`)
      await setResult(response.data.data)
      // console.warn(result, "result", response.data.data, "response")

    } catch (error) {
      console.error("Error fetching package", error, `${apiURL.baseURL}/skyTrails/packagecitylist?keyword=${searchTerm}`);
    }
  }
  useEffect(() => {
    const debouncerTimer = setTimeout(() => {

      fetchPackage()
    }, 300);
    return () => {
      clearTimeout(debouncerTimer)
    }

  }, [searchTerm])
  useEffect(() => {
    if (formInputRef) {

      formInputRef.current.focus()
    }
  }, [formInputRef])








  // search history logic 


  // const token = sessionStorage.getItem("jwtToken");


  // const createSearchHistory = async () => {


  //   const historyData = {
  //     days: fromInputNumberRef.current.value,
  //     destination: cityNamelast,
  //     searchType: "PACKAGES",


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



  // search history logic 




  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Holiday form search
  const reducerState = useSelector((state) => state);
  const dispatch = useDispatch();
  // console.log("holiday", reducerState?.searchResult);
  const [destination, setDestination] = useState("");
  const [daysSearch, setDaySearch] = useState();
  const [citylastlast, setlastlast] = useState("")

  const navigate = useNavigate();
  const filteredPackage =
    reducerState?.searchResult?.packageSearchResult?.data?.data?.pakage;


  useEffect(() => {
    dispatch(clearHolidayReducer());
    dispatch(clearPackageData());
  }, []);


  useEffect(() => {
    if (filteredPackage) {
      navigate("/HolidayPackageSearchResult");
    }
  }, [filteredPackage, navigate]);


  const handleFromClicks = () => {


    // if (authenticUser !== 200) {
    //   setIsLoginModalOpen(true);
    // }

    // else {
    const payload = {
      destination: cityNamelast,
      days: 0,
    };
    // console.log(payload, "payload");
    // createSearchHistory();
    dispatch(searchPackageAction(payload));
    sessionStorage.setItem("searchPackageData", JSON.stringify(payload));
    // }

  };


  const handleDestinationChange = (e) => {
    setDestination(e.target.value);
    setSearchTerm(e.target.value);
  };

  const handleDaysSearchChange = (e) => {
    if (e.target.value)

      setDaySearch(e.target.value);
  };
  // console.warn(reducerState, "reducerState")






  // const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);


  // const handleModalClose = () => {
  //   setIsLoginModalOpen(false)
  // }


  // useEffect(() => {
  //   if (authenticUser == 200) {
  //     handleModalClose();
  //   }
  // }, [authenticUser])

  // click to on typing 

  // const inputRef = useRef(null);
  const focusInput = () => {
    setTimeout(() => {
      formInputRef.current.focus();
    }, 200);
    // console.log("form input click")
  };


  // console.log(destination, "destination")

  return (


    <>
      {/* check if user is logged in or not */}

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


      <section className="" style={{ width: "100%", position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}>
        <div className="container d-flex justify-content-center w-100" >
          <div className="row packageBg">
            <div className="col-12 p-0">
              <form onSubmit={handleFromClicks}>
                <div className="Package-container">
                  <div onClick={(e) => {
                    e.stopPropagation();
                    setSub(true);
                  }} className="PackageInner">
                    <div style={{ width: "100%" }}>
                      <lable className="package_lable_l" onClick={focusInput}>{cityNamelast}</lable>
                    </div>
                    {/* {sub && */}
                    <div ref={formRef} className="package_input_divv" style={{ position: "absolute", width: "100%", marginLeft: '-21px', top: "25px", backgroundColor: '#ffffff', display: sub ? "block" : "none", zIndex: "99999" }}>
                      <div className="package_input_div_div" style={{

                        display: 'flex',
                        alignItems: 'center',
                        paddingLeft: "7px"

                      }}>
                        <CiSearch size={24} />
                        <input
                          name="from"
                          placeholder="Search Package For Destination"
                          autoComplete="off"
                          value={searchTerm}
                          // ref={inputRef}
                          required
                          style={{
                            outline: "none",
                            border: "none",
                            height: '30px',
                            // backgroundColor: '#ffffff',
                            // boxShadow: '0 2px 3px 0 rgba(0, 0, 0, 0.1)',
                            // backgroundColor:"transparent"
                          }}
                          onChange={(e) => { handleDestinationChange(e) }}
                          ref={formInputRef}
                        />
                      </div>
                      <div style={{
                        overflow: "hidden",
                        overflowY: 'scroll',
                        maxHeight: 200,
                        backgroundColor: "#ffff",
                        marginTop: "17px"
                        // backgroundColor: "transparent",
                      }}
                        className="scroll_style"
                        ref={fromInputreusltRef}

                      // onMouseLeave={(e) => { e.stopPropagation(); setSub(false) }}
                      >
                        {result.map((item) => {
                          // console.log(item);
                          return (<div className="listItemPackage" onClick={(e) => {
                            e.stopPropagation();
                            setCityNameLast(item);
                            // setResult(populerSeacrh);
                            setDestination("");
                            setSub(false);
                            setlastlast(item)

                          }}   >

                            <CiLocationOn />
                            <p>{item}</p>
                          </div>)
                        })}
                      </div>

                    </div>
                    {/* } */}
                    {/* <span id="package_span_s">{cityName}</span> */}
                  </div>
                  {/* <div className="PackageInner">
                    <span id="package_span_s">Days</span>
                    <div className="remove_numberArror">
                      <input
                        name="to"
                        placeholder="Number of Days"
                        type="number"
                        inputmode="numeric"
                        style={{
                          border: "none",
                          outline: "none",
                        }}
                        ref={fromInputNumberRef}
                      // value={daysSearch}
                      // onChange={handleDaysSearchChange}
                      />
                    </div>
                    <span id="package_span_s">City Name</span>
                  </div> */}


                  <div className="PackageInner">
                    {citylastlast === "" ?
                      <div className="searchButt" ref={fromSearchButtonRef} >
                        {/* <h3>Search</h3> */}
                        {/* <KeyboardDoubleArrowRightIcon /> */}
                        <FaSearch />
                      </div> : <div className="searchButt" onClick={handleFromClicks} ref={fromSearchButtonRef}>
                        {/* <h3>Search</h3> */}
                        {/* <KeyboardDoubleArrowRightIcon /> */}
                        <FaSearch />
                      </div>}
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




