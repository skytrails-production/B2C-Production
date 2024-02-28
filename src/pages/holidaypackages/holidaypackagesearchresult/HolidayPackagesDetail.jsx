import React, { useEffect, useState, } from "react";
import CommitIcon from "@mui/icons-material/Commit";
import TramIcon from "@mui/icons-material/Tram";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import ApartmentIcon from "@mui/icons-material/Apartment";
import HolidayVillageIcon from "@mui/icons-material/HolidayVillage";
import CabinIcon from "@mui/icons-material/Cabin";
import BlurOnIcon from "@mui/icons-material/BlurOn";
import DeckIcon from "@mui/icons-material/Deck";
import EngineeringIcon from "@mui/icons-material/Engineering";
import DinnerDiningIcon from "@mui/icons-material/DinnerDining";
import LiquorIcon from "@mui/icons-material/Liquor";
import ArticleIcon from "@mui/icons-material/Article";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ParaglidingIcon from "@mui/icons-material/Paragliding";
import NaturePeopleIcon from "@mui/icons-material/NaturePeople";
import LandslideIcon from "@mui/icons-material/Landslide";
import KitesurfingIcon from "@mui/icons-material/Kitesurfing";
import PoolIcon from "@mui/icons-material/Pool";
import DownhillSkiingIcon from "@mui/icons-material/DownhillSkiing";
import ForestIcon from "@mui/icons-material/Forest";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import FolderDeleteIcon from "@mui/icons-material/FolderDelete";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import KayakingIcon from "@mui/icons-material/Kayaking";
import SportsKabaddiIcon from "@mui/icons-material/SportsKabaddi";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import WifiPasswordIcon from "@mui/icons-material/WifiPassword";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Divider from "@mui/material/Divider";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "./holidaypackagesdetail.css";
import { clearHolidayReducer } from "../../../Redux/OnePackageSearchResult/actionOneSearchPackage";
import packageFilter from "../../../images/packageFilter.png"
import { motion } from "framer-motion";
import { searchPackageAction } from "../../../Redux/SearchPackage/actionSearchPackage";
import HolidayLoader from "../holidayLoader/HolidayLoader";
import { apiURL } from "../../../Constants/constant";
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Skeleton } from "@mui/material";


function HolidayPackagesDetail() {

  const reducerState = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { keyword } = useParams();
  const [showToast, setShowToast] = useState(false);


  useEffect(() => {
    if (keyword === "Europe") {
      const timer = setTimeout(() => {
        notify(); // Trigger the notification after 4 seconds
      }, 4000);

      // Cleanup function to clear the timer on component unmount or keyword change
      return () => clearTimeout(timer);
    }
  }, [keyword]);
  // console.log(keyword, "keywrod")

  useEffect(() => {
    dispatch(searchPackageAction(keyword));
    sessionStorage.setItem("searchPackageData", JSON.stringify(keyword));
  }, []);


  const notify = () => {
    toast(' Explore More Europe Packages', {
      position: "bottom-right",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Slide,
      onClick: () => {
        // Redirect to the specified URL
        window.location.href = 'https://www.europamundo.com/eng/embed/multisearch.aspx?opeIP=499&ageKEY=44890%27';
      }
    });
    setShowToast(true); // Set state to show the toast
  };


  // toggle the filter for small device




  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false);


  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${apiURL.baseURL}/skyTrails/package/getPackageCityData?keyword=${keyword}`,
      );
      const result = await response.json();

      setData(result.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchData();
  }, []);


  // console.log(data, "data ")







  const variants = {
    open: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        // staggerChildren: 0.1,
      },
    },
    closed: {
      x: -500,
      opacity: 0,

      transition: {
        duration: 0.5,
        // staggerChildren: 0.1,
      },
    },
  };

  const [open, setOpen] = useState(false);

  const handleFilterOpen = () => {
    setOpen(!open);
  }

  // toggle the filter for small device  ends



  const filteredPackage =
    reducerState?.searchResult?.packageSearchResult?.data?.data?.pakage;
  // useEffect(() => {
  //   if (!filteredPackage) {
  //     navigate("/holidaypackages")
  //   }

  // }, [])

  console.log(filteredPackage, "filtered package")

  const searchOneHoliday = (id) => {
    navigate(`/holidayInfo/${id}`);
  };


  // const savedDataString = sessionStorage.getItem("searchPackageData");
  // const savedData = JSON.parse(savedDataString);
  // const savedDestination = savedData?.destination;
  // const savedDays = savedData?.days;


  const [sortOption, setSortOption] = useState("lowToHigh");

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };







  const [selectedCategory, setSelectedCategory] = useState([]);
  const [searchInput, setSearchInput] = useState('');


  const maxPrice = filteredPackage?.reduce((max, hotel) => {
    return Math.max(max, hotel?.pakage_amount?.amount || 0);
  }, 0);
  const minPrice = filteredPackage?.reduce((min, hotel) => {
    return Math.min(min, hotel?.pakage_amount?.amount || Infinity);
  }, Infinity);

  // console.log(maxPrice, "max pric")
  const [priceRangeValue, setPriceRangeValue] = useState(maxPrice + 5001)

  const handlePriceRangeChange = (event) => {
    setPriceRangeValue(event.target.value);
  };


  useEffect(() => {
    setPriceRangeValue(maxPrice + 5001);
  }, [maxPrice])



  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleRadioChange = (event) => {
    setSearchInput('');
    const selectedValue = event.target.value;
    const radioGroupName = event.target.name;

    if (selectedValue === "All") {
      setSelectedCategory([]);
      document.querySelectorAll('input[type="checkbox"]').forEach((radio) => {
        radio.checked = false;
      });
      return
    }

    setSelectedCategory((prevSelectedCategory) => {
      let updatedCategory = [...prevSelectedCategory];
      const isValueSelected = updatedCategory.some(
        (category) => category === `${radioGroupName}:${selectedValue}`
      );
      updatedCategory = isValueSelected
        ? updatedCategory.filter(
          (category) => category !== `${radioGroupName}:${selectedValue}`
        )
        : [
          ...updatedCategory.filter(
            (category) => !category.startsWith(`${radioGroupName}:`)
          ),
          `${radioGroupName}:${selectedValue}`,
        ];

      return updatedCategory;
    });
  };


  useEffect(() => {
    if (filteredPackage === undefined) {
      dispatch(clearHolidayReducer());
    }
  }, [])



  const sortedAndFilteredResults = filteredPackage?.filter((item) => {
    const packageName = item?.pakage_title?.toLowerCase();
    const filteredDestinations = item?.destination?.map(destinationItem =>
      destinationItem?.addMore.toLowerCase()
    );

    // const publishedPrice = item?.pakage_amount?.amount;
    const noOfDays = item?.days;
    // const starRating = item?.StarRating;
    const categoryFilters = selectedCategory?.map((category) => {
      const [groupName, value] = category.split(':');
      switch (groupName) {
        case "days":
          switch (value) {
            case "0-3Days":
              return noOfDays >= 0 && noOfDays <= 3;
            case "4-7Days":
              return noOfDays >= 4 && noOfDays <= 7;
            case "7-12Days":
              return noOfDays >= 7 && noOfDays <= 12;
            case "12-20Days":
              return noOfDays >= 12 && noOfDays <= 20;
            case "20-30Days":
              return noOfDays >= 20 && noOfDays <= 30;
          }


        default:
          return false;
      }
    });

    const searchInputLower = searchInput?.toLowerCase();
    const packageNameMatch = packageName?.includes(searchInputLower);
    const destinationMatch = filteredDestinations?.some(dest => dest.includes(searchInputLower));
    const priceInRange = item?.pakage_amount?.amount <= priceRangeValue;
    return categoryFilters?.every((filter) => filter) && (packageNameMatch || destinationMatch) && priceInRange;
  })?.sort((a, b) =>
    sortOption === "lowToHigh"
      ? a?.pakage_amount.amount - b?.pakage_amount.amount
      : b?.pakage_amount.amount - a?.pakage_amount.amount
  );


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [sortedAndFilteredResults])


  if (filteredPackage == null) {
    return (
      <HolidayLoader />
    )
  }



  return (

    <section className="">
      <div className="container-fluid position-relative px-0" style={{
        zIndex: "1", top: "-50px", backgroundColor: "white"
      }}>
        <div className="container ">
          <div className="row">

            {
              loading ? (

                <div className="col-lg-12 px-0">
                  {

                    <div className="countryDescCardUpper">
                      <div className="packbannerCountrywise">
                        <Skeleton>
                          <img src="" alt="dummy" />
                        </Skeleton>
                      </div>
                      <Skeleton>
                        <h2 style={{ height: "10px", width: "70px" }}></h2>
                      </Skeleton>
                      <Skeleton>
                        <p style={{ height: "10px", width: "100%" }}></p>
                      </Skeleton>
                    </div>

                  }
                </div>
              ) : (
                <div className="col-lg-12 px-0">
                  {
                    Object.keys(data).length > 0 && (
                      <div className="countryDescCardUpper">
                        <div className="packbannerCountrywise">
                          <img src={data?.imageUrl} alt="city" />
                        </div>
                        <h2 style={{ marginTop: "20px" }}>{data?.cityName} Tourism and Travel Guide</h2>
                        <p>{data?.description}</p>
                      </div>
                    )
                  }
                </div>
              )
            }



          </div>
        </div>
      </div >
      <div className="container pt-3 px-0">
        <div className="row position-relative">

          <div className="d-flex d-sm-none  topFilterBoxMobile" onClick={handleFilterOpen}>
            <p>Apply Filters</p>
            <span>
              <svg height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg" id="fi_7094575"><g id="Glyph"><path d="m17 5a3 3 0 1 1 3 3 3 3 0 0 1 -3-3zm-15 1h12a1 1 0 0 0 0-2h-12a1 1 0 0 0 0 2zm6 3a3 3 0 0 0 -2.82 2h-3.18a1 1 0 0 0 0 2h3.18a3 3 0 1 0 2.82-4zm14 2h-8a1 1 0 0 0 0 2h8a1 1 0 0 0 0-2zm-12 7h-8a1 1 0 0 0 0 2h8a1 1 0 0 0 0-2zm12 0h-3.18a3 3 0 1 0 0 2h3.18a1 1 0 0 0 0-2z"></path></g></svg>
            </span>
          </div>
          {/* filter for mobile for mobile device  */}

          <motion.div className="d-flex d-sm-none col-lg-3 col-md-3 scrollDesignMobile" animate={open ? "open" : "closed"} variants={variants}>


            <div className="flightFilterBoxMobile">
              {/* <div className="filterTitle">
                <p>Select Filters</p>
              </div> */}
              <div className="innerFilter">

                <div>
                  <label className="sidebar-label-container ps-0">
                    <input
                      type="checkbox"
                      onChange={handleRadioChange}
                      value="All"
                      name="test"
                      checked={selectedCategory.includes("test:All")}
                    />
                    {/* <span className="checkmark"></span> */}
                    <span style={{ color: selectedCategory.length > 0 ? "red" : "gray" }}>Clear Filter</span>
                  </label>

                </div>

                <div className="searchBarPackageFOrm">
                  <input
                    type="text"
                    placeholder="Search by Name or Destination"
                    className="inputSearch"
                    value={searchInput}
                    onChange={handleSearchChange}
                  />
                </div>

                {/* <div>
                  <h2 className="sidebar-title">Sort By</h2>
                  <select className="highSelect"
                    value={sortOption}
                    onChange={handleSortChange}>
                    <option value="lowToHigh">Low to High</option>
                    <option value="highToLow">High to Low</option>
                  </select>
                </div> */}

                <div className="busDepartureMain">
                  <h2 className="sidebar-title">Sort By</h2>
                  <select
                    className="highSelect"
                    value={sortOption}
                    onChange={handleSortChange}
                  >
                    <option value="lowToHigh">Low to High</option>
                    <option value="highToLow">High to Low</option>
                  </select>
                </div>


                <div>
                  <h2 className="sidebar-title">By Price</h2>
                  <div>
                    <input
                      type="range"
                      min={minPrice + 1}
                      max={maxPrice + 5001}
                      step="5000"
                      value={priceRangeValue}
                      onChange={handlePriceRangeChange}
                    />
                    <span>Max price ₹{""}{priceRangeValue}</span>
                  </div>
                  <Divider sx={{ marginBottom: "15px", backgroundColor: "gray" }} />
                </div>

                <div>
                  <h2 className="sidebar-title">By Days</h2>
                  <div>
                    {[
                      { value: "0-3Days", label: "0-3 Days" },
                      { value: "4-7Days", label: "4-7 Days" },
                      { value: "7-12Days", label: "7-12 Days" },
                      { value: "12-20Days", label: "12-20 Days" },
                      { value: "20-30Days", label: "20-30 Days" }
                    ].map((duration, index) => {
                      const itemCount = filteredPackage?.filter(item => {
                        const noOfDays = item?.days;
                        switch (duration.value) {
                          case "0-3Days":
                            return noOfDays >= 0 && noOfDays <= 3;
                          case "4-7Days":
                            return noOfDays >= 4 && noOfDays <= 7;
                          case "7-12Days":
                            return noOfDays >= 7 && noOfDays <= 12;
                          case "12-20Days":
                            return noOfDays >= 12 && noOfDays <= 20;
                          case "20-30Days":
                            return noOfDays >= 20 && noOfDays <= 30;
                          default:
                            return false;
                        }
                      }).length;

                      return (
                        <label className="sidebar-label-container exceptionalFlex" key={index}>
                          <input
                            type="checkbox"
                            onChange={handleRadioChange}
                            value={duration.value}
                            name="days"
                            checked={selectedCategory.includes(`days:${duration.value}`)}
                          />
                          <span>({itemCount})</span>
                          <span className="checkmark"></span>{duration.label}
                        </label>
                      );
                    })}
                  </div>
                  <Divider sx={{ marginBottom: "15px", backgroundColor: "gray" }} />
                </div>

                {/* <div>
                  <h2 className="sidebar-title">By Price</h2>
                  <div>
                    {[
                      { value: "25000", min: 0, max: 25000, label: "₹ 0-25,000" },
                      { value: "25001", min: 25000, max: 50000, label: "₹25,000-50,000" },
                      { value: "50001", min: 50000, max: 75000, label: "₹50,000-75,000" },
                      { value: "75001", min: 75000, max: 100000, label: "₹75,000-1,00,000" },
                      { value: "100000", min: 100000, max: Infinity, label: "₹1,00,000 and Above" }
                    ].map((priceRange, index) => {
                      const itemCount = filteredPackage?.filter(item =>
                        item?.pakage_amount.amount >= priceRange.min && item?.pakage_amount.amount <= priceRange.max
                      ).length;

                      return (
                        <label className="sidebar-label-container exceptionalFlex" key={index}>
                          <input
                            type="checkbox"
                            onChange={handleRadioChange}
                            value={priceRange.value}
                            name="price"
                            checked={selectedCategory.includes(`price:${priceRange.value}`)}
                          />
                          <span>({itemCount})</span>
                          <span className="checkmark"></span>{priceRange.label}
                        </label>
                      );
                    })}
                  </div>
                  <Divider sx={{ marginBottom: "15px", backgroundColor: "gray" }} />
                </div> */}
              </div>
            </div>

          </motion.div>



          {/* filter for Desktop  device  */}

          <div className="d-none d-sm-block col-lg-3 col-md-3 scrollDesign" >


            <div className="flightFilterBox">
              <div className="filterTitle">
                <p>Select Filters</p>
              </div>
              <div className="innerFilter">

                <div>
                  <label className="sidebar-label-container ps-0">
                    <input
                      type="checkbox"
                      onChange={handleRadioChange}
                      value="All"
                      name="test"
                      checked={selectedCategory.includes("test:All")}
                    />
                    {/* <span className="checkmark"></span> */}
                    <span style={{ color: selectedCategory.length > 0 ? "red" : "gray" }}>Clear Filter</span>
                  </label>

                </div>

                <div className="searchBarPackageFOrm">
                  <input
                    type="text"
                    placeholder="Search by Name or Destination"
                    className="inputSearch"
                    value={searchInput}
                    onChange={handleSearchChange}

                  />
                </div>

                <div className="busDepartureMain">
                  <h2 className="sidebar-title">Sort By</h2>
                  <select
                    className="highSelect"
                    value={sortOption}
                    onChange={handleSortChange}
                  >
                    <option value="lowToHigh">Low to High</option>
                    <option value="highToLow">High to Low</option>
                  </select>
                </div>

                <div className="PackageDepartureMain">
                  <h2 className="sidebar-title">By Price</h2>
                  <div>
                    <input
                      type="range"
                      min={minPrice + 1}
                      max={maxPrice + 5001}
                      step="5000"
                      value={priceRangeValue}
                      onChange={handlePriceRangeChange}
                    />
                    <span>Max price ₹{""}{priceRangeValue}</span>
                  </div>
                  <Divider sx={{ marginBottom: "15px", backgroundColor: "gray" }} />
                </div>


                <div className="PackageDepartureMain">
                  <h2 className="sidebar-title">By Days</h2>
                  <div>
                    {[
                      { value: "0-3Days", label: "0-3 Days" },
                      { value: "4-7Days", label: "4-7 Days" },
                      { value: "7-12Days", label: "7-12 Days" },
                      { value: "12-20Days", label: "12-20 Days" },
                      { value: "20-30Days", label: "20-30 Days" }
                    ].map((duration, index) => {
                      const itemCount = filteredPackage?.filter(item => {
                        const noOfDays = item?.days;
                        switch (duration.value) {
                          case "0-3Days":
                            return noOfDays >= 0 && noOfDays <= 3;
                          case "4-7Days":
                            return noOfDays >= 4 && noOfDays <= 7;
                          case "7-12Days":
                            return noOfDays >= 7 && noOfDays <= 12;
                          case "12-20Days":
                            return noOfDays >= 12 && noOfDays <= 20;
                          case "20-30Days":
                            return noOfDays >= 20 && noOfDays <= 30;
                          default:
                            return false;
                        }
                      }).length;

                      return (
                        <label className="sidebar-label-container exceptionalFlex" key={index}>
                          <input
                            type="checkbox"
                            onChange={handleRadioChange}
                            value={duration.value}
                            name="days"
                            checked={selectedCategory.includes(`days:${duration.value}`)}
                          />
                          <span>({itemCount})</span>
                          <span className="checkmark"></span>{duration.label}
                        </label>
                      );
                    })}
                  </div>
                  <Divider sx={{ marginBottom: "15px", backgroundColor: "gray" }} />
                </div>

              </div>
            </div>

          </div>


          {/* main code for bigger device  */}
          <div className="col-lg-9 col-md-9">
            <div className="row">
              {sortedAndFilteredResults && sortedAndFilteredResults.length > 0 ? (
                sortedAndFilteredResults
                  ?.map((item, index) => {
                    return (
                      <div key={index} className="col-lg-12">

                        {/* for bigger device  */}
                        <div onClick={(e) => searchOneHoliday(item?._id)} className="d-none d-sm-flex packageResultBox" key={index}>
                          <div className="packOuterBox">
                            <div className="packageImage">
                              <img src={item?.pakage_img} alt="package-img" />
                            </div>
                            <div className="packageResultDetails">
                              <div className="packageTitle">
                                <p>{item?.pakage_title}</p>
                              </div>
                              <div>
                                <p className="customize">{`${item?.days - 1}N`} / {`${item?.days}D`}</p>
                                <p className="departure">
                                  {item?.schedule?.flexible ? 'Flexible' : item?.schedule?.fixed_departure ? 'Fixed Departure' : ''}
                                </p>
                              </div>

                              <div className="icon-box">
                                {item?.insclusions?.slice(0, 4).map((ele, index) => {
                                  return (
                                    <div key={index} className="icon-box-inner">
                                      {ele?.flexibility && (
                                        <div>
                                          <span><CommitIcon />
                                          </span>
                                          <p>Flexibility</p>
                                        </div>
                                      )}
                                      {ele?.train && (
                                        <div>
                                          <span><TramIcon /></span>
                                          <p>Train</p>
                                        </div>
                                      )}
                                      {ele?.bus && (
                                        <div>
                                          <span><DirectionsBusIcon /></span>
                                          <p>Bus</p>
                                        </div>
                                      )}
                                      {ele?.cab && (
                                        <div>
                                          <span><DirectionsCarIcon /></span>
                                          <p>Cab</p>
                                        </div>
                                      )}
                                      {ele?.moterBike && (
                                        <div>
                                          <span><TwoWheelerIcon /></span>
                                          <p>Moterbike</p>
                                        </div>
                                      )}
                                      {ele?.hotel && (
                                        <div>
                                          <span><ApartmentIcon /></span>
                                          <p>Hotel</p>
                                        </div>
                                      )}
                                      {ele?.homeStays && (
                                        <div>
                                          <span><HolidayVillageIcon /></span>
                                          <p>Homestays</p>
                                        </div>
                                      )}
                                      {ele?.guestHouse && (
                                        <div>
                                          <span><LocationCityIcon /></span>
                                          <p>Guesthouse</p>
                                        </div>
                                      )}
                                      {ele?.camp && (
                                        <div>
                                          <span><CabinIcon /></span>
                                          <p>Camp</p>
                                        </div>
                                      )}
                                      {ele?.cruise && (
                                        <div>
                                          <span><BlurOnIcon /></span>
                                          <p>Cruise</p>
                                        </div>
                                      )}
                                      {ele?.sightSeeing && (
                                        <div>
                                          <span><DeckIcon /></span>
                                          <p>Sightseeing</p>
                                        </div>
                                      )}
                                      {ele?.guide && (
                                        <div>
                                          <span><EngineeringIcon /></span>
                                          <p>Guide</p>
                                        </div>
                                      )}
                                      {ele?.meals && (
                                        <div>
                                          <span><FastfoodIcon /></span>
                                          <p>Meals</p>
                                        </div>
                                      )}
                                      {ele?.breakfast && (
                                        <div>
                                          <span><DinnerDiningIcon /></span>
                                          <p>Breakfast</p>
                                        </div>
                                      )}
                                      {ele?.drink && (
                                        <div>
                                          <span><LiquorIcon /></span>
                                          <p>Drink</p>
                                        </div>
                                      )}
                                      {ele?.visa && (
                                        <div>
                                          <span><ArticleIcon /></span>
                                          <p>Visa</p>
                                        </div>
                                      )}
                                      {ele?.travelInsurance && (
                                        <div>
                                          <span><AccountBalanceIcon /></span>
                                          <p>Travel Insurance</p>
                                        </div>
                                      )}
                                      {ele?.safeTravel && (
                                        <div>
                                          <span><ParaglidingIcon /></span>
                                          <p>Safe to Travel</p>
                                        </div>
                                      )}
                                      {ele?.wildlife && (
                                        <div>
                                          <span><NaturePeopleIcon /></span>
                                          <p>Wildlife</p>
                                        </div>
                                      )}
                                      {ele?.heritage && (
                                        <div>
                                          <span><LandslideIcon /></span>
                                          <p>Heritage</p>
                                        </div>
                                      )}
                                      {ele?.adventure && (
                                        <div>
                                          <span><KitesurfingIcon /></span>
                                          <p>Adventure</p>
                                        </div>
                                      )}
                                      {ele?.beach && (
                                        <div>
                                          <span><PoolIcon /></span>
                                          <p>Beach</p>
                                        </div>
                                      )}
                                      {ele?.hillStation && (
                                        <div>
                                          <span><DownhillSkiingIcon /></span>
                                          <p>Hill Station</p>
                                        </div>
                                      )}
                                      {ele?.nature && (
                                        <div>
                                          <span><ForestIcon /></span>
                                          <p>Nature</p>
                                        </div>
                                      )}
                                      {ele?.wellness && (
                                        <div>
                                          <span><SelfImprovementIcon /></span>
                                          <p>Wellness</p>
                                        </div>
                                      )}
                                      {ele?.hiddenGem && (
                                        <div>
                                          <span><FitnessCenterIcon /></span>
                                          <p>Hidden Gem</p>
                                        </div>
                                      )}
                                      {ele?.tax && (
                                        <div>
                                          <span><FolderDeleteIcon /></span>
                                          <p>Price Inclusive Tax</p>
                                        </div>
                                      )}
                                      {ele?.discount && (
                                        <div>
                                          <span><LocalOfferIcon /></span>
                                          <p>50% Off</p>
                                        </div>
                                      )}
                                      {ele?.waterActivities && (
                                        <div>
                                          <span><KayakingIcon /></span>
                                          <p>Water Activities</p>
                                        </div>
                                      )}
                                      {ele?.optionalActivities && (
                                        <div>
                                          <span><SportsKabaddiIcon /></span>
                                          <p>Optional Activities</p>
                                        </div>
                                      )}
                                      {ele?.flexibleBooking && (
                                        <div>
                                          <span><BookmarkAddIcon /></span>
                                          <p>Flexible Booking</p>
                                        </div>
                                      )}
                                      {ele?.wifi && (
                                        <div>
                                          <span><WifiPasswordIcon /></span>
                                          <p>WIFI</p>
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>

                              <div className="destination">
                                {/* <ul> */}
                                {item?.destination?.map((destinationItem, index) => (
                                  <p key={index}>{destinationItem?.addMore}</p>
                                ))}
                                {/* </ul> */}
                              </div>
                            </div>
                          </div>
                          <div className="priceBook">
                            <div className="priceBookOne">
                              <h3>{`${item?.days - 1}N`} / {`${item?.days}D`}</h3>
                              <span>Offer Price</span>
                              <p>₹{' '} {item?.pakage_amount?.amount}</p>
                              <h4>Show More<ArrowForwardIosIcon /></h4>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
              ) :
                (
                  <div className="d-none d-sm-flex  filteredNotFound">
                    <img src={packageFilter} alt="filter image" />
                    <h1>Result not found</h1>
                  </div>
                )
              }


            </div>
          </div>


          {/* main code for smaller device  */}

          <div className="col-lg-9 col-md-9">
            <div className="row">
              {sortedAndFilteredResults && sortedAndFilteredResults.length > 0 ? (
                sortedAndFilteredResults
                  ?.map((item, index) => {
                    return (
                      <div className="col-lg-12">
                        {/* for smaller device  */}

                        <div onClick={(e) => searchOneHoliday(item?._id)} className="d-flex d-sm-none packageResultBoxMobile mx-3" key={index}>
                          <div className="packOuterBoxMobile">
                            <div className="packageImageMobile">
                              <img src={item?.pakage_img} alt="package-img" />
                            </div>
                            <div className="packageResultDetailsMobile">
                              <div className="packageTitleMobile">
                                <p>{item?.pakage_title}</p>
                              </div>
                              <div className="daysPackMobile">
                                <p className="customize daysText">{`${item?.days - 1}N`} / {`${item?.days}D`}</p>
                                <p className="departure">
                                  {item?.schedule?.flexible ? 'Flexible' : item?.schedule?.fixed_departure ? 'Fixed Departure' : ''}
                                </p>
                              </div>

                              <div className="icon-box">
                                {item?.insclusions?.slice(0, 4).map((ele, index) => {
                                  return (
                                    <div key={index} className="icon-box-inner">
                                      {ele?.flexibility && (
                                        <div>
                                          <span><CommitIcon />
                                          </span>
                                          <p>Flexibility</p>
                                        </div>
                                      )}
                                      {ele?.train && (
                                        <div>
                                          <span><TramIcon /></span>
                                          <p>Train</p>
                                        </div>
                                      )}
                                      {ele?.bus && (
                                        <div>
                                          <span><DirectionsBusIcon /></span>
                                          <p>Bus</p>
                                        </div>
                                      )}
                                      {ele?.cab && (
                                        <div>
                                          <span><DirectionsCarIcon /></span>
                                          <p>Cab</p>
                                        </div>
                                      )}
                                      {ele?.moterBike && (
                                        <div>
                                          <span><TwoWheelerIcon /></span>
                                          <p>Moterbike</p>
                                        </div>
                                      )}
                                      {ele?.hotel && (
                                        <div>
                                          <span><ApartmentIcon /></span>
                                          <p>Hotel</p>
                                        </div>
                                      )}
                                      {ele?.homeStays && (
                                        <div>
                                          <span><HolidayVillageIcon /></span>
                                          <p>Homestays</p>
                                        </div>
                                      )}
                                      {ele?.guestHouse && (
                                        <div>
                                          <span><LocationCityIcon /></span>
                                          <p>Guesthouse</p>
                                        </div>
                                      )}
                                      {ele?.camp && (
                                        <div>
                                          <span><CabinIcon /></span>
                                          <p>Camp</p>
                                        </div>
                                      )}
                                      {ele?.cruise && (
                                        <div>
                                          <span><BlurOnIcon /></span>
                                          <p>Cruise</p>
                                        </div>
                                      )}
                                      {ele?.sightSeeing && (
                                        <div>
                                          <span><DeckIcon /></span>
                                          <p>Sightseeing</p>
                                        </div>
                                      )}
                                      {ele?.guide && (
                                        <div>
                                          <span><EngineeringIcon /></span>
                                          <p>Guide</p>
                                        </div>
                                      )}
                                      {ele?.meals && (
                                        <div>
                                          <span><FastfoodIcon /></span>
                                          <p>Meals</p>
                                        </div>
                                      )}
                                      {ele?.breakfast && (
                                        <div>
                                          <span><DinnerDiningIcon /></span>
                                          <p>Breakfast</p>
                                        </div>
                                      )}
                                      {ele?.drink && (
                                        <div>
                                          <span><LiquorIcon /></span>
                                          <p>Drink</p>
                                        </div>
                                      )}
                                      {ele?.visa && (
                                        <div>
                                          <span><ArticleIcon /></span>
                                          <p>Visa</p>
                                        </div>
                                      )}
                                      {ele?.travelInsurance && (
                                        <div>
                                          <span><AccountBalanceIcon /></span>
                                          <p>Travel Insurance</p>
                                        </div>
                                      )}
                                      {ele?.safeTravel && (
                                        <div>
                                          <span><ParaglidingIcon /></span>
                                          <p>Safe to Travel</p>
                                        </div>
                                      )}
                                      {ele?.wildlife && (
                                        <div>
                                          <span><NaturePeopleIcon /></span>
                                          <p>Wildlife</p>
                                        </div>
                                      )}
                                      {ele?.heritage && (
                                        <div>
                                          <span><LandslideIcon /></span>
                                          <p>Heritage</p>
                                        </div>
                                      )}
                                      {ele?.adventure && (
                                        <div>
                                          <span><KitesurfingIcon /></span>
                                          <p>Adventure</p>
                                        </div>
                                      )}
                                      {ele?.beach && (
                                        <div>
                                          <span><PoolIcon /></span>
                                          <p>Beach</p>
                                        </div>
                                      )}
                                      {ele?.hillStation && (
                                        <div>
                                          <span><DownhillSkiingIcon /></span>
                                          <p>Hill Station</p>
                                        </div>
                                      )}
                                      {ele?.nature && (
                                        <div>
                                          <span><ForestIcon /></span>
                                          <p>Nature</p>
                                        </div>
                                      )}
                                      {ele?.wellness && (
                                        <div>
                                          <span><SelfImprovementIcon /></span>
                                          <p>Wellness</p>
                                        </div>
                                      )}
                                      {ele?.hiddenGem && (
                                        <div>
                                          <span><FitnessCenterIcon /></span>
                                          <p>Hidden Gem</p>
                                        </div>
                                      )}
                                      {ele?.tax && (
                                        <div>
                                          <span><FolderDeleteIcon /></span>
                                          <p>Price Inclusive Tax</p>
                                        </div>
                                      )}
                                      {ele?.discount && (
                                        <div>
                                          <span><LocalOfferIcon /></span>
                                          <p>50% Off</p>
                                        </div>
                                      )}
                                      {ele?.waterActivities && (
                                        <div>
                                          <span><KayakingIcon /></span>
                                          <p>Water Activities</p>
                                        </div>
                                      )}
                                      {ele?.optionalActivities && (
                                        <div>
                                          <span><SportsKabaddiIcon /></span>
                                          <p>Optional Activities</p>
                                        </div>
                                      )}
                                      {ele?.flexibleBooking && (
                                        <div>
                                          <span><BookmarkAddIcon /></span>
                                          <p>Flexible Booking</p>
                                        </div>
                                      )}
                                      {ele?.wifi && (
                                        <div>
                                          <span><WifiPasswordIcon /></span>
                                          <p>WIFI</p>
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>

                              <div className="destination">
                                <ul>
                                  {item?.destination?.slice(0, 3).map((destinationItem, index) => (
                                    <li key={index}>{destinationItem?.addMore}</li>
                                  ))}
                                </ul>
                              </div>
                              <div className="priceBookMobile">
                                <div className="priceBookOneMobile">
                                  {/* <h3>{`${item?.days - 1}N`} / {`${item?.days}D`}</h3>
                                  <span>Offer Price</span> */}
                                  <p>₹{' '} {item?.pakage_amount?.amount}/<span>Person</span></p>
                                  <h4>Show More<ArrowForwardIosIcon /></h4>
                                </div>
                              </div>
                            </div>
                          </div>

                        </div>


                        {/* for smaller device  */}
                      </div>
                    );
                  })
              ) :
                (
                  <div className="d-flex d-sm-none  filteredNotFound">
                    <img src={packageFilter} alt="filter image" />
                    <h1>Result not found</h1>
                  </div>
                )
              }


            </div>
          </div>

        </div>
      </div>


      {keyword === "Europe" && showToast && (
        <ToastContainer
          position="bottom-right"
          autoClose={false}
          newestOnTop={false}
          closeOnClick
          rtl
          pauseOnFocusLoss
          draggable
          theme="light"
        />
      )}

    </section >
  );
}

export default HolidayPackagesDetail;