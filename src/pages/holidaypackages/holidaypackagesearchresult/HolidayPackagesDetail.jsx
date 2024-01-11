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
import { useNavigate } from "react-router-dom";
import "./holidaypackagesdetail.css";
import { clearHolidayReducer, searchOnePackageAction } from "../../../Redux/OnePackageSearchResult/actionOneSearchPackage";
import packageFilter from "../../../images/packageFilter.png"
const label = { inputProps: { "aria-label": "Checkbox demo" } };

function HolidayPackagesDetail() {

  const reducerState = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate()


  const filteredPackage =
    reducerState?.searchResult?.packageSearchResult?.data?.data?.pakage;
  useEffect(() => {
    if (!filteredPackage) {
      navigate("/holidaypackages")
    }
    console.warn(filteredPackage,"filtredfackage....")
  },[])

  const searchOneHoliday = (id) => {
    const payload = {
      id,
    };
    dispatch(searchOnePackageAction(payload));
    navigate("/holidayInfo");
  };


  const savedDataString = sessionStorage.getItem("searchPackageData");
  const savedData = JSON.parse(savedDataString);
  const savedDestination = savedData?.destination;
  const savedDays = savedData?.days;


  const [sortOption, setSortOption] = useState("lowToHigh");

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };




  const [selectedCategory, setSelectedCategory] = useState([]);

  const handleRadioChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue === "All") {
      setSelectedCategory([]);
      document.querySelectorAll('input[name="test"]').forEach((checkbox) => {
        checkbox.checked = false;
      });
    } else {
      // If other checkbox is selected, update selectedCategory as before
      setSelectedCategory((prevSelectedCategory) => {
        if (prevSelectedCategory.includes(selectedValue)) {
          return prevSelectedCategory.filter((value) => value !== selectedValue);
        } else {
          return [...prevSelectedCategory, selectedValue];
        }
      });
    }
  };

  useEffect(() => {
    if (filteredPackage === undefined) {
      dispatch(clearHolidayReducer());
    }
  }, [])

  // console.log(filteredPackage, "filtered package")
  // console.warn(reducerState, "reducerstate hotel package search result")

  const sortedAndFilteredResults = filteredPackage?.filter((item) => {
    const publishedPrice = item?.pakage_amount.amount;
    const noOfDays = item?.days;
    const starRating = item?.StarRating;
    const categoryFilters = selectedCategory?.map((category) => {
      switch (category) {

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
        case "5000":
          return publishedPrice <= 5000;
        case "5001":
          return publishedPrice > 5000 && publishedPrice <= 10000;
        case "10001":
          return publishedPrice > 10000 && publishedPrice <= 15000;
        case "15001":
          return publishedPrice > 15000 && publishedPrice <= 20000;
        case "20000":
          return publishedPrice > 20000;
        default:
          return false;
      }
    });

    return categoryFilters?.every((filter) => filter);
  })?.sort((a, b) =>
    sortOption === "lowToHigh"
      ? a?.pakage_amount.amount - b?.pakage_amount.amount
      : b?.pakage_amount.amount - a?.pakage_amount.amount
  );




  return (

    <section className="mx-5">
      <div className="contaier-xxl pt-3">
        <div className="row">
          <div className="col-lg-3">


            <div className="flightFilterBox">
              <div className="filterTitle">
                <p>Select Filters</p>
              </div>
              <div className="innerFilter">


                <div>
                  <h2 className="sidebar-title">Sort By</h2>
                  <select className="highSelect" value={sortOption} onChange={handleSortChange}>
                    <option value="lowToHigh">Low to High</option>
                    <option value="highToLow">High to Low</option>
                  </select>
                </div>

                <div>
                  <h2 className="sidebar-title">By Rating</h2>

                  <div>
                    <label className="sidebar-label-container">
                      <input type="checkbox" onChange={handleRadioChange} value="0-3 Days" name="test" />
                      <span className="checkmark"></span>0-3 Days
                    </label>

                    <label className="sidebar-label-container">
                      <input type="checkbox" onChange={handleRadioChange} value="4-7Days" name="test" />
                      <span className="checkmark"></span>4-7 Days
                    </label>

                    <label className="sidebar-label-container">
                      <input type="checkbox" onChange={handleRadioChange} value="7-12Days" name="test" />
                      <span className="checkmark"></span>7-12 Days
                    </label>

                    <label className="sidebar-label-container">
                      <input type="checkbox" onChange={handleRadioChange} value="12-20Days" name="test" />
                      <span className="checkmark"></span>12-20 Days
                    </label>
                    <label className="sidebar-label-container">
                      <input type="checkbox" onChange={handleRadioChange} value="20-30Days" name="test" />
                      <span className="checkmark"></span>20-30 Days
                    </label>

                  </div>

                  <Divider sx={{ marginBottom: "15px", backgroundColor: "gray" }} />
                </div>

                <div>
                  <h2 className="sidebar-title">By Price</h2>

                  <div>
                    <label className="sidebar-label-container">
                      <input type="checkbox" onChange={handleRadioChange} value="5000" name="test" />
                      <span className="checkmark"></span>₹0-5,000
                    </label>

                    <label className="sidebar-label-container">
                      <input type="checkbox" onChange={handleRadioChange} value="5001" name="test" />
                      <span className="checkmark"></span>₹5,000-10,000
                    </label>

                    <label className="sidebar-label-container">
                      <input type="checkbox" onChange={handleRadioChange} value="10001" name="test" />
                      <span className="checkmark"></span>₹10,000-15,000
                    </label>

                    <label className="sidebar-label-container">
                      <input type="checkbox" onChange={handleRadioChange} value="15001" name="test" />
                      <span className="checkmark"></span>₹15,000-20,000
                    </label>
                    <label className="sidebar-label-container">
                      <input type="checkbox" onChange={handleRadioChange} value="20000" name="test" />
                      <span className="checkmark"></span>₹20,000 and Above
                    </label>

                  </div>
                  <Divider sx={{ marginBottom: "15px", backgroundColor: "gray" }} />
                </div>



              </div>
            </div>

          </div>
          <div className="col-lg-9">
            <div className="row">
              <div className="col-lg-12">
                <div className="outerFilterBox">
                  <div className="filterBox">
                    <p>Showing {' '}{filteredPackage?.length} {' '} Results</p>
                    <p className="searchDestination">Seach Destination{' '}: <b>{savedDestination}</b></p>
                    {/* <p className="searchDestination">Days {' '} <b>{savedDays}</b></p> */}
                  </div>
                </div>
              </div>
              {sortedAndFilteredResults && sortedAndFilteredResults.length > 0 ? (
                sortedAndFilteredResults
                  ?.map((item, index) => {
                    return (
                      <div className="col-lg-12">

                        <div onClick={(e) => searchOneHoliday(item?._id)} className="packageResultBox" key={index}>
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
                              <ul>
                                {item?.destination?.slice(0, 3).map((destinationItem, index) => (
                                  <li key={index}>{destinationItem?.addMore}</li>
                                ))}
                              </ul>
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
                  <div className="filteredNotFound">
                    <img src={packageFilter} alt="filter image" />
                    <h1>Result not found</h1>
                  </div>
                )
              }


            </div>
          </div>
        </div>
      </div>

    </section>
  );
}

export default HolidayPackagesDetail;