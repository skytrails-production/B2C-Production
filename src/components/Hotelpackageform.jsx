import { useNavigate } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import "./card.css";
import "./style/hotelpackageForm.css"
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { clearPackageData, searchPackageAction } from "../Redux/SearchPackage/actionSearchPackage";
import { useDispatch, useSelector } from "react-redux";
import { clearHolidayReducer } from "../Redux/OnePackageSearchResult/actionOneSearchPackage";
import axios from "axios";
import { apiURL } from "../Constants/constant";
import { CiSearch } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";



const Homeform = (props) => {

  const [cityNamelast, setCityNameLast] = useState("Search Package for Destination");
  const [searchTerm, setSearchTerm] = useState("");
  const [result, setResult] = useState([]);
  const formInputRef = useRef(null);
  const formRef = useRef(null);
  const fromInputreusltRef = useRef(null);
  const fromSearchButtonRef = useRef(null);
  const [sub, setSub] = useState(false);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (formRef.current && !formRef.current.contains(event.target) && !fromSearchButtonRef.current.contains(event.target)) {
      setSub(false);
    }
  };

  const fetchPackage = async () => {
    try {
      const response = await axios.get(`${apiURL.baseURL}/skyTrails/packagecitylist?keyword=${searchTerm}`)
      await setResult(response.data.data)
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



  // Holiday form search
  // const reducerState = useSelector((state) => state);
  const dispatch = useDispatch();

  // const [destination, setDestination] = useState("");
  // const [daysSearch, setDaySearch] = useState();
  const [citylastlast, setlastlast] = useState("")

  const navigate = useNavigate();
  // const filteredPackage =
  //   reducerState?.searchResult?.packageSearchResult?.data?.data?.pakage;


  useEffect(() => {
    dispatch(clearHolidayReducer());
    dispatch(clearPackageData());
  }, []);


  // useEffect(() => {
  //   if (filteredPackage) {
  //     navigate(`/HolidayPackageSearchResult/:keyword`);

  //   }
  // }, []);


  const handleFromClicks = (e) => {
    e.preventDefault();
    // const payload = {

    // };
    // dispatch(searchPackageAction(cityNamelast));
    sessionStorage.setItem("searchPackageData", JSON.stringify(cityNamelast));
    navigate(`/HolidayPackageSearchResult/${cityNamelast}`);
  };


  const handleDestinationChange = (e) => {
    // setDestination(e.target.value);
    setSearchTerm(e.target.value);
  };

  // const handleDaysSearchChange = (e) => {
  //   if (e.target.value)
  //     setDaySearch(e.target.value);
  // };

  const focusInput = () => {
    setTimeout(() => {
      formInputRef.current.focus();
    }, 200);
    // console.log("form input click")
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  return (


    <>

      <section className="" style={{ width: "100%", position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}>
        <div className="container d-flex justify-content-center w-100" >
          <div className="row packageBg">
            <div className="col-12 p-0">
              <form onSubmit={handleFromClicks}>
                <div className="Package-container">
                  <div onClick={(e) => {
                    e.stopPropagation();
                    setSub(true);
                  }} className="PackageInner-pack PackageInner-packMobile">
                    <div style={{ width: "100%" }}>
                      <lable className="package_lable_l package_lable_lMobile" onClick={focusInput}>{cityNamelast}</lable>
                    </div>

                    <div ref={formRef} className="package_input_divv" style={{ position: "absolute", width: "100%", marginLeft: '-21px', top: "22px", backgroundColor: '#ffffff', display: sub ? "block" : "none", zIndex: "99999" }}>
                      <div className="package_input_div_div  package_input_div_divMobile" style={{

                        display: 'flex',
                        alignItems: 'center',
                        paddingLeft: "7px"

                      }}>
                        <CiSearch size={24} />
                        <input
                          name="from"
                          onKeyDown={handleKeyDown}
                          placeholder="Search Package For Destination"
                          autoComplete="off"
                          value={searchTerm}
                          required
                          style={{
                            outline: "none",
                            border: "none",
                            height: '30px',
                            width: "100%"
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
                      }}
                        className="scroll_style scroll_styleMobile"
                        ref={fromInputreusltRef}
                      >
                        {result.map((item) => {

                          return (<div className="listItemPackage" onClick={(e) => {
                            e.stopPropagation();
                            setCityNameLast(item);
                            setSub(false);
                            setlastlast(item)

                          }}   >

                            <CiLocationOn />
                            <p>{item}</p>
                          </div>)
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="PackageInner">
                    {citylastlast === "" ?
                      <div className="searchButt" ref={fromSearchButtonRef} >
                        <FaSearch />
                      </div> : <div className="searchButt" onClick={handleFromClicks} ref={fromSearchButtonRef}>
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




