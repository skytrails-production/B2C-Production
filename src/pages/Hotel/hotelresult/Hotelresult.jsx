import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import hotelNotFound from "../../../images/hotelNotFound.jpg"
import Divider from "@mui/material/Divider";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Checkbox from "@mui/material/Checkbox";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import StarIcon from "@mui/icons-material/Star";
import starsvg from "../../../images/star.svg"
import starBlank from "../../../images/starBlank.svg"
import hotelFilter from "../../../images/hotelFilter.png"
import Link from "@mui/material/Link";
import "./hotelresult.css";
import { useDispatch, useSelector, useReducer } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Swal from "sweetalert2"
const label = { inputProps: { "aria-label": "Checkbox demo" } };

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));




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




export default function Popularfilter() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reducerState = useSelector((state) => state);

  const result =
    reducerState?.hotelSearchResult?.ticketData?.data?.data?.HotelSearchResult;

  const handleClick = (resultIndex, hotelCode) => {
    sessionStorage.setItem("ResultIndex", resultIndex);
    sessionStorage.setItem("HotelCode", hotelCode);
    navigate("HotelBooknow");
  };


  const star = (data) => {
    const stars = [];
    for (let i = 0; i < data; i++) {
      stars.push(<StarIcon key={i} style={{ color: "#FF8900" }} />);
    }
    return stars;
  };

  const [sortOption, setSortOption] = useState("lowToHigh");
  const [filterRating, setFilterRating] = useState(null);


  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterRating(event.target.value);
  };

  useEffect(() => {
    if (reducerState?.hotelSearchResult?.ticketData?.data?.data?.HotelSearchResult?.Error?.ErrorCode !== 0 && reducerState?.hotelSearchResult?.ticketData?.data?.data?.HotelSearchResult?.Error?.ErrorCode !== undefined) {
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
      })
      navigate("/hotel")

    }
    else if (reducerState?.hotelSearchResult?.isLoading === false && reducerState?.hotelSearchResult?.ticketData?.length === 0
    ){
      navigate("/hotel")
    }
    // else if ()
})

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


  // console.log(selectedCategory, "selected category");






  const sortedAndFilteredResults = result?.HotelResults
    ?.filter((item) => {
      // console.log("Item:", item);
      const starRating = item?.StarRating;
      const publishedPrice = item?.Price?.PublishedPrice;
      const categoryFilters = selectedCategory?.map((category) => {
        switch (category) {
          case "5":
            return item?.StarRating === 5;
          case "4":
            return item?.StarRating === 4;
          case "3":
            return item?.StarRating === 3;
          case "2":
            return item?.StarRating === 2;
          case "1":
            return item?.StarRating === 1;
          case "2000":
            return publishedPrice <= 2000;
          case "3000":
            return publishedPrice > 2000 && publishedPrice <= 3000;
          case "6500":
            return publishedPrice > 3000 && publishedPrice <= 6500;
          case "9999":
            return publishedPrice > 6500 && publishedPrice <= 10000;
          case "10000":
            return publishedPrice > 10000;
          default:
            return false;
        }
      });
      return categoryFilters?.every((filter) => filter);
      // console.log("Category Filters:", categoryFilters);
    })
    ?.sort((a, b) =>
      sortOption === "lowToHigh"
        ? a?.Price?.PublishedPriceRoundedOff - b?.Price?.PublishedPriceRoundedOff
        : b?.Price?.PublishedPriceRoundedOff - a?.Price?.PublishedPriceRoundedOff
    );





  let totalAdults = 0;
  let totalChildren = 0;

  result?.RoomGuests?.forEach((room) => {
    totalAdults += room?.NoOfAdults || 0;
    totalChildren += room?.NoOfChild || 0;
  });


  // Retrieve data from sessionStorage
  const storedFormData = JSON.parse(sessionStorage.getItem('hotelFormData'));
  const data = storedFormData?.dynamicFormData[0]; // Assuming dynamicFormData is an array with at least one element

  // console.warn(reducerState, "reducer state")


  // console.log(sortedAndFilteredResults, "sorted and filtered")

  // console.log("shaan", sortedAndFilteredResults)
  
  return (
    <section className="my-4 mx-5">
      <div className="contaier-xxl">
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
                      <input
                        type="checkbox"
                        onChange={handleRadioChange}
                        value="5"
                        name="test"
                      />
                      <span className="checkmark">
                      </span>
                      <div>
                        <img src={starsvg} />
                        <img src={starsvg} />
                        <img src={starsvg} />
                        <img src={starsvg} />
                        <img src={starsvg} />
                      </div>
                    </label>

                    <label className="sidebar-label-container">
                      <input
                        type="checkbox"
                        onChange={handleRadioChange}
                        value="4"
                        name="test"
                      />
                      <span className="checkmark">
                      </span>
                      <div>
                        <img src={starsvg} />
                        <img src={starsvg} />
                        <img src={starsvg} />
                        <img src={starsvg} />
                        <img src={starBlank} />
                      </div>
                    </label>
                    <label className="sidebar-label-container">
                      <input
                        type="checkbox"
                        onChange={handleRadioChange}
                        value="3"
                        name="test"
                      />
                      <span className="checkmark">
                      </span>
                      <div>
                        <img src={starsvg} />
                        <img src={starsvg} />
                        <img src={starsvg} />
                        <img src={starBlank} />
                        <img src={starBlank} />
                      </div>
                    </label>
                    <label className="sidebar-label-container">
                      <input
                        type="checkbox"
                        onChange={handleRadioChange}
                        value="2"
                        name="test"
                      />
                      <span className="checkmark">
                      </span>
                      <div>
                        <img src={starsvg} />
                        <img src={starsvg} />
                        <img src={starBlank} />
                        <img src={starBlank} />
                        <img src={starBlank} />
                      </div>
                    </label>
                    <label className="sidebar-label-container">
                      <input
                        type="checkbox"
                        onChange={handleRadioChange}
                        value="1"
                        name="test"
                      />
                      <div>
                        <span className="checkmark">
                        </span>
                        <div>
                          <img src={starsvg} />
                          <img src={starBlank} />
                          <img src={starBlank} />
                          <img src={starBlank} />
                          <img src={starBlank} />
                        </div>
                      </div>
                    </label>


                  </div>

                  <Divider sx={{ marginBottom: "15px", backgroundColor: "gray" }} />
                </div>

                <div>
                  <h2 className="sidebar-title">By Price</h2>

                  <div>
                    <label className="sidebar-label-container">
                      <input type="checkbox" onChange={handleRadioChange} value="2000" name="test" />
                      <span className="checkmark"></span>₹0-2,000
                    </label>

                    <label className="sidebar-label-container">
                      <input type="checkbox" onChange={handleRadioChange} value="3000" name="test" />
                      <span className="checkmark"></span>₹2,000-3,000
                    </label>

                    <label className="sidebar-label-container">
                      <input type="checkbox" onChange={handleRadioChange} value="6500" name="test" />
                      <span className="checkmark"></span>₹3,000-6,500
                    </label>

                    <label className="sidebar-label-container">
                      <input type="checkbox" onChange={handleRadioChange} value="9999" name="test" />
                      <span className="checkmark"></span>₹6,500-10,000
                    </label>
                    <label className="sidebar-label-container">
                      <input type="checkbox" onChange={handleRadioChange} value="10000" name="test" />
                      <span className="checkmark"></span>₹10,000 and Above
                    </label>

                  </div>
                  <Divider sx={{ marginBottom: "15px", backgroundColor: "gray" }} />
                </div>



              </div>
            </div>

          </div>
          <div className="col-lg-9 col-md-12">

            {sortedAndFilteredResults && sortedAndFilteredResults.length > 0 ? (
              sortedAndFilteredResults
                ?.map((result, index) => {
                  const resultIndex = result?.ResultIndex;
                  const hotelCode = result?.HotelCode;
                  return (
                    <motion.div variants={variants} initial="initial"
                      whileInView="animate" className="col-lg-12" >

                      <motion.div variants={variants} onClick={(e) => handleClick(resultIndex, hotelCode)} className="hotelResultBoxSearch" key={index}>
                        <div>
                          <div className="hotelImage">
                            <img
                              src={result?.HotelPicture === "https://b2b.tektravels.com/Images/HotelNA.jpg" ? hotelNotFound : result?.HotelPicture}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = hotelNotFound;
                              }}
                              alt="package-img"
                            />

                          </div>
                          <div className="hotelResultDetails">
                            <div className="hotleTitle">
                              <p>{result?.HotelName}</p>
                            </div>


                            <div className="hotelRating">
                              <div>
                                {Array.from({ length: result?.StarRating }, (_, index) => (
                                  <img key={index} src={starsvg} alt={`Star ${index + 1}`} />
                                ))}
                              </div>
                            </div>

                            <div>
                              <p className="hotAddress">
                                {result?.HotelAddress}
                              </p>
                            </div>


                          </div>
                        </div>

                        <div className="priceBookHotel">
                          <div className="priceBookHotelOne ">
                            {/* <span><del>₹{result?.Price?.OfferedPrice}</del></span> */}
                            <span>Offer Price</span>
                            <p>₹{result?.Price?.PublishedPrice}</p>
                            <h4>Show More<ArrowForwardIosIcon /></h4>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })
            ) :

              (
                <div className="filteredNotFound">
                  <img src={hotelFilter} alt="filter image" />
                  <h1>Result not found</h1>
                </div>
              )
            }
          </div>
        </div>
      </div>
    </section>

  );
}




