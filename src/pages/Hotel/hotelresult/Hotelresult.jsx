import React, { useEffect, useState } from "react";
import hotelNotFound from "../../../images/hotelNotFound.jpg"
import Divider from "@mui/material/Divider";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import StarIcon from "@mui/icons-material/Star";
import starsvg from "../../../images/star.svg"
import starBlank from "../../../images/starBlank.svg"
import hotelFilter from "../../../images/hotelFilter.png"
import "./hotelresult.css";
import { useDispatch, useSelector, useReducer } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Swal from "sweetalert2"
import InsideNavbar from "../../../UI/BigNavbar/InsideNavbar";



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




  // filter logic new start


  // const [newFilter, setNewFilter] = useState(result?.HotelResults);

  // console.log(newFilter, "new filter")
  // filter logic new end





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
    ) {
      navigate("/hotel")
    }
    // else if ()
  })


  const [searchInput, setSearchInput] = useState('');

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };


  // var sortedAndFilteredResults = result?.HotelResults?.filter(
  //   (item) =>
  //     item?.HotelName?.toLowerCase().includes(searchTerm?.toLowerCase())
  // );


  const [selectedCategory, setSelectedCategory] = useState([]);

  // const handleRadioChange = (event) => {
  //   const selectedValue = event.target.value;
  //   if (selectedValue === "All") {
  //     setSelectedCategory([]);
  //     document.querySelectorAll('input[name="test"]').forEach((checkbox) => {
  //       checkbox.checked = false;
  //     });
  //   } else {
  //     // If other checkbox is selected, update selectedCategory as before
  //     setSelectedCategory((prevSelectedCategory) => {
  //       if (prevSelectedCategory.includes(selectedValue)) {
  //         return prevSelectedCategory.filter((value) => value !== selectedValue);
  //       } else {
  //         return [...prevSelectedCategory, selectedValue];
  //       }
  //     });
  //   }
  // };


  // var sortedAndFilteredResults = result?.HotelResults
  //   ?.filter((item) => {
  //     // console.log("Item:", item);
  //     const starRating = item?.StarRating;
  //     const publishedPrice = item?.Price?.PublishedPrice;
  //     const categoryFilters = selectedCategory?.map((category) => {
  //       switch (category) {
  //         case "5":
  //           return starRating === 5;
  //         case "4":
  //           return starRating === 4;
  //         case "3":
  //           return starRating === 3;
  //         case "2000":
  //           return publishedPrice <= 2000;
  //         case "3000":
  //           return publishedPrice > 2000 && publishedPrice <= 3000;
  //         case "6500":
  //           return publishedPrice > 3000 && publishedPrice <= 6500;
  //         case "9999":
  //           return publishedPrice > 6500 && publishedPrice <= 10000;
  //         case "10000":
  //           return publishedPrice > 10000;
  //         default:
  //           return false;
  //       }
  //     });
  //     return categoryFilters?.every((filter) => filter);
  //   })
  //   ?.sort((a, b) =>
  //     sortOption === "lowToHigh"
  //       ? a?.Price?.PublishedPriceRoundedOff - b?.Price?.PublishedPriceRoundedOff
  //       : b?.Price?.PublishedPriceRoundedOff - a?.Price?.PublishedPriceRoundedOff
  //   );





  // new filter logic

  const handleRadioChange = (event) => {
    const selectedValue = event.target.value;
    const radioGroupName = event.target.name;

    setSelectedCategory((prevSelectedCategory) => {
      let updatedCategory = [...prevSelectedCategory];

      // Check if the selected value is already in the array
      const isValueSelected = updatedCategory.some(
        (category) => category === `${radioGroupName}:${selectedValue}`
      );

      // If the value is selected, filter it out; otherwise, add it
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


  // new filter logic 






  // useEffect(() => {

  // }, [selectedCategory])


  // const handleRadioChange = (event) => {
  //   const selectedValue = event.target.value;
  //   const checkboxName = event.target.name;

  //   setSelectedCategory((prevSelectedCategory) => {
  //     const isValueSelected = prevSelectedCategory.includes(
  //       `${checkboxName}:${selectedValue}`
  //     );

  //     let updatedCategory;
  //     if (event.target.checked) {
  //       updatedCategory = [`${checkboxName}:${selectedValue}`];
  //     } else {
  //       updatedCategory = prevSelectedCategory.filter(
  //         (category) => !category.startsWith(`${checkboxName}:`)
  //       );
  //     }

  //     return updatedCategory;
  //   });
  // };

  // const handleRadioChange = (event) => {
  //   const selectedValue = event.target.value;
  //   const checkboxName = event.target.name;

  //   setSelectedCategory((prevSelectedCategory) => {
  //     const isValueSelected = prevSelectedCategory.includes(`${checkboxName}:${selectedValue}`);

  //     let updatedCategory;

  //     if (event.target.checked) {
  //       // If the checkbox is selected, replace the array with the new value
  //       updatedCategory = [`${checkboxName}:${selectedValue}`];
  //     } else {
  //       // If the checkbox is being unchecked, filter out the selected value
  //       updatedCategory = prevSelectedCategory.filter(
  //         (category) => !category.startsWith(`${checkboxName}:`)
  //       );
  //     }

  //     return updatedCategory;
  //   });
  // };







  console.log(selectedCategory, "selected category")



  var sortedAndFilteredResults = result?.HotelResults
    ?.filter((item) => {
      const hotelName = item?.HotelName?.toLowerCase();
      const hotelAddress = item?.HotelLocation?.toLowerCase();
      const starRating = item?.StarRating;
      const publishedPrice = item?.Price?.PublishedPrice;
      const location = item?.HotelLocation;
      const categoryFilters = selectedCategory?.map((category) => {
        const [groupName, value] = category.split(':');
        switch (groupName) {
          case "star":
            return starRating === parseInt(value);
          case "price":
            switch (value) {
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
            }
          case "location":
            return location === value;
          // ... other cases for different radio groups
          default:
            return false;
        }
      });

      const searchFilter = hotelName?.includes(searchInput?.toLowerCase()) || hotelAddress?.includes(searchInput?.toLowerCase());
      // return categoryFilters?.every((filter) => filter);
      return categoryFilters?.every((filter) => filter) && searchFilter;
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
  // const data = storedFormData?.dynamicFormData[0]; // Assuming dynamicFormData is an array with at least one element


  // console.log(storedFormData, "session")
  const initialDisplayCount = 6;
  const [displayCount, setDisplayCount] = useState(initialDisplayCount);

  const handleShowMore = () => {
    setDisplayCount(displayCount === initialDisplayCount ? result?.HotelResults?.length : initialDisplayCount);
  };


  return (
    <section className="">
      <div className='mainimgHotelSearchResult'>
        {/* <Navbar /> */}
        {/* <BigNavbar /> */}
        <InsideNavbar />
        <div className="container searchMainBoxAbs">
          <div className="HotelResultSearchBarBox">
            <div className="hotelResSurBox">
              <h3>Best Hotels for you in {storedFormData?.Destination}</h3>
              <p>Showing {sortedAndFilteredResults?.length} Results in {storedFormData?.Destination}</p>
            </div>
            <div className="searchBarHotelFOrm">
              <input
                type="text"
                placeholder="Search by Name or location"
                className="inputSearch"
                value={searchInput}
                onChange={handleSearchChange}

              />
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="d-none d-sm-block col-lg-3 pt-4">


            <div className="flightFilterBox">
              <div className="filterTitle">
                <p>Select Filters</p>
              </div>
              <div className="innerFilter">


                <div>
                  <h2 className="sidebar-title">Sort By Price</h2>
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
                        name="star"
                        checked={selectedCategory.includes("star:5")}
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
                        name="star"
                        checked={selectedCategory.includes("star:4")}
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
                        name="star"
                        checked={selectedCategory.includes("star:3")}
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



                  </div>

                  <Divider sx={{ marginBottom: "15px", backgroundColor: "gray" }} />
                </div>

                <div>
                  <h2 className="sidebar-title">By Locality</h2>

                  {/* <div>
                    {
                      [...new Set(result?.HotelResults?.map(item => item?.HotelLocation))].map((location, index) => (
                        <label className="sidebar-label-container" key={index}>
                          <input type="checkbox" onChange={handleRadioChange} value={location} name="location" checked={selectedCategory.includes(`location:${location}`)} />
                          <span className="checkmark"></span>{location}
                        </label>
                      ))
                    }
                  </div> */}


                  <div>
                    {
                      [...new Set(result?.HotelResults?.map(item => item?.HotelLocation))]
                        .slice(0, displayCount)
                        .map((location, index) => (
                          <label className="sidebar-label-container" key={index}>
                            <input
                              type="checkbox"
                              onChange={handleRadioChange}
                              value={location}
                              name="location"
                              checked={selectedCategory.includes(`location:${location}`)}
                            />
                            <span className="checkmark"></span>{location}
                          </label>
                        ))
                    }
                    {result?.HotelResults?.length > initialDisplayCount && (
                      <p className="ShowMoreHotel" onClick={handleShowMore}>
                        {displayCount === initialDisplayCount ? (
                          <>
                            Show More
                            <svg height="20" viewBox="0 0 24 24" width="25" xmlns="http://www.w3.org/2000/svg" id="fi_2722987"><g id="_16" data-name="16"><path d="m12 16a1 1 0 0 1 -.71-.29l-6-6a1 1 0 0 1 1.42-1.42l5.29 5.3 5.29-5.29a1 1 0 0 1 1.41 1.41l-6 6a1 1 0 0 1 -.7.29z"></path></g></svg>
                          </>
                        ) : (
                          <>
                            Show Less
                            <svg className="rotttt" height="20" viewBox="0 0 24 24" width="25" xmlns="http://www.w3.org/2000/svg" id="fi_2722987"><g id="_16" data-name="16"><path d="m12 16a1 1 0 0 1 -.71-.29l-6-6a1 1 0 0 1 1.42-1.42l5.29 5.3 5.29-5.29a1 1 0 0 1 1.41 1.41l-6 6a1 1 0 0 1 -.7.29z"></path></g></svg>
                          </>
                        )}
                      </p>
                    )}
                  </div>


                  <Divider sx={{ marginBottom: "15px", backgroundColor: "gray" }} />
                </div>

                <div>
                  <h2 className="sidebar-title">By Price</h2>

                  <div>
                    <label className="sidebar-label-container">
                      <input type="checkbox" onChange={handleRadioChange} value="2000" name="price" checked={selectedCategory.includes("price:2000")} />
                      <span className="checkmark"></span>₹0-2,000
                    </label>

                    <label className="sidebar-label-container">
                      <input type="checkbox" onChange={handleRadioChange} value="3000" name="price" checked={selectedCategory.includes("price:3000")} />
                      <span className="checkmark"></span>₹2,000-3,000
                    </label>

                    <label className="sidebar-label-container">
                      <input type="checkbox" onChange={handleRadioChange} value="6500" name="price" checked={selectedCategory.includes("price:6500")} />
                      <span className="checkmark"></span>₹3,000-6,500
                    </label>

                    <label className="sidebar-label-container">
                      <input type="checkbox" onChange={handleRadioChange} value="9999" name="price" checked={selectedCategory.includes("price:9999")} />
                      <span className="checkmark"></span>₹6,500-10,000
                    </label>
                    <label className="sidebar-label-container">
                      <input type="checkbox" onChange={handleRadioChange} value="10000" name="price" checked={selectedCategory.includes("price:10000")} />
                      <span className="checkmark"></span>₹10,000 and Above
                    </label>

                  </div>
                  <Divider sx={{ marginBottom: "15px", backgroundColor: "gray" }} />
                </div>



              </div>
            </div>

          </div>

          {/* for bigger device  */}
          <div className="d-none d-sm-block col-lg-9 col-md-12 pt-4">

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

                            {
                              result?.HotelLocation && (
                                <div>
                                  <p className="hotAddressLocation">
                                    <span>
                                      <svg height="17" viewBox="0 0 32 32" width="17" xmlns="http://www.w3.org/2000/svg" id="fi_3138736"><g id="Pin-2" data-name="Pin"><path fill="#d90429" d="m25.0464 8.4834a10 10 0 0 0 -7.9116-5.4258 11.3644 11.3644 0 0 0 -2.2691 0 10.0027 10.0027 0 0 0 -7.9121 5.4253 10.8062 10.8062 0 0 0 1.481 11.8936l6.7929 8.2588a1 1 0 0 0 1.545 0l6.7929-8.2588a10.8055 10.8055 0 0 0 1.481-11.8931zm-9.0464 8.5166a4 4 0 1 1 4-4 4.0047 4.0047 0 0 1 -4 4z"></path></g></svg>
                                    </span>{result?.HotelLocation}
                                  </p>
                                </div>
                              )
                            }



                          </div>
                        </div>

                        <div className="priceBookHotel">
                          <div className="priceBookHotelOne ">
                            {/* <span><del>₹{result?.Price?.OfferedPrice}</del></span> */}
                            <span>Offer Price</span>
                            <p>₹{result?.Price?.PublishedPriceRoundedOff}</p>
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
          {/* for bigger device  */}

          {/* for smaller device  */}
          <div className="d-block d-sm-none col-lg-9 col-md-12 pt-4">

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

                            {
                              result?.HotelLocation && (
                                <div>
                                  <p className="hotAddressLocation">
                                    <span>
                                      <svg height="17" viewBox="0 0 32 32" width="17" xmlns="http://www.w3.org/2000/svg" id="fi_3138736"><g id="Pin-2" data-name="Pin"><path fill="#d90429" d="m25.0464 8.4834a10 10 0 0 0 -7.9116-5.4258 11.3644 11.3644 0 0 0 -2.2691 0 10.0027 10.0027 0 0 0 -7.9121 5.4253 10.8062 10.8062 0 0 0 1.481 11.8936l6.7929 8.2588a1 1 0 0 0 1.545 0l6.7929-8.2588a10.8055 10.8055 0 0 0 1.481-11.8931zm-9.0464 8.5166a4 4 0 1 1 4-4 4.0047 4.0047 0 0 1 -4 4z"></path></g></svg>
                                    </span>{result?.HotelLocation}
                                  </p>
                                </div>
                              )
                            }



                          </div>
                        </div>

                        <div className="priceBookHotel">
                          <div className="priceBookHotelOne ">
                            {/* <span><del>₹{result?.Price?.OfferedPrice}</del></span> */}
                            <span>Offer Price</span>
                            <p>₹{result?.Price?.PublishedPriceRoundedOff}</p>
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
          {/* for smaller device  */}

        </div>
      </div>
    </section>

  );
}




