import React, { useEffect, useState } from "react";
import hotelNotFound from "../../../images/hotelNotFound.jpg"
import Divider from "@mui/material/Divider";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import starsvg from "../../../images/star.svg"
import starBlank from "../../../images/starBlank.svg"
import hotelFilter from "../../../images/hotelFilter.png"
import "./hotelresult.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import InsideNavbar from "../../../UI/BigNavbar/InsideNavbar";
import { swalModal } from "../../../utility/swal"



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

  const navigate = useNavigate();
  const reducerState = useSelector((state) => state);

  const result = reducerState?.hotelSearchResult?.ticketData?.data?.data?.HotelSearchResult;



  const handleClick = (resultIndex, hotelCode) => {
    sessionStorage.setItem("ResultIndex", resultIndex);
    sessionStorage.setItem("HotelCode", hotelCode);
    navigate("HotelBooknow");
  };


  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };


  useEffect(() => {
    if (reducerState?.hotelSearchResult?.ticketData?.data?.data?.HotelSearchResult?.Error?.ErrorCode !== 0 && reducerState?.hotelSearchResult?.ticketData?.data?.data?.HotelSearchResult?.Error?.ErrorCode !== undefined) {
      swalModal('hotel', reducerState?.hotelSearchResult?.ticketData?.data?.data?.HotelSearchResult?.Error?.ErrorMessage, false)
      navigate("/hotel")

    }
    else if (reducerState?.hotelSearchResult?.isLoading === false && reducerState?.hotelSearchResult?.ticketData?.length === 0
    ) {
      navigate("/hotel")
    }
  })

  const [sortOption, setSortOption] = useState("lowToHigh");
  const [searchInput, setSearchInput] = useState('');

  const maxPrice = result?.HotelResults?.reduce((max, hotel) => {
    return Math.max(max, hotel?.Price?.PublishedPriceRoundedOff || 0);
  }, 0);
  const minPrice = result?.HotelResults?.reduce((min, hotel) => {
    return Math.min(min, hotel?.Price?.PublishedPriceRoundedOff || Infinity);
  }, Infinity);


  const [priceRangeValue, setPriceRangeValue] = useState(maxPrice + 5001)

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handlePriceRangeChange = (event) => {
    setPriceRangeValue(event.target.value);
  };

  useEffect(() => {
    setPriceRangeValue(maxPrice + 5001);
  }, [maxPrice])

  const [selectedCategory, setSelectedCategory] = useState([]);


  const handleRadioChange = (event) => {
    setSearchInput('')
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



  const sortedAndFilteredResults = result?.HotelResults
    ?.filter((item) => {
      const hotelName = item?.HotelName?.toLowerCase();
      const hotelAddress = item?.HotelLocation?.toLowerCase();
      const starRating = item?.StarRating;
      // const publishedPrice = item?.Price?.PublishedPrice;
      const location = item?.HotelLocation;
      const categoryFilters = selectedCategory?.map((category) => {
        const [groupName, value] = category.split(':');
        switch (groupName) {
          case "star":
            return starRating === parseInt(value);
          // case "price":
          //   switch (value) {
          //     case "2000":
          //       return publishedPrice <= 2000;
          //     case "3000":
          //       return publishedPrice > 2000 && publishedPrice <= 3000;
          //     case "6500":
          //       return publishedPrice > 3000 && publishedPrice <= 6500;
          //     case "9999":
          //       return publishedPrice > 6500 && publishedPrice <= 10000;
          //     case "10000":
          //       return publishedPrice > 10000;
          //   }
          case "location":
            return location === value;
          default:
            return false;
        }
      });
      const priceInRange = item?.Price?.PublishedPrice <= priceRangeValue;
      const searchFilter = hotelName?.includes(searchInput?.toLowerCase()) || hotelAddress?.includes(searchInput?.toLowerCase());
      // return categoryFilters?.every((filter) => filter);
      return categoryFilters?.every((filter) => filter) && searchFilter && priceInRange;
    })
    ?.sort((a, b) =>
      sortOption === "lowToHigh"
        ? a?.Price?.PublishedPriceRoundedOff - b?.Price?.PublishedPriceRoundedOff
        : b?.Price?.PublishedPriceRoundedOff - a?.Price?.PublishedPriceRoundedOff
    );


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [sortedAndFilteredResults])

  let totalAdults = 0;
  let totalChildren = 0;

  result?.RoomGuests?.forEach((room) => {
    totalAdults += room?.NoOfAdults || 0;
    totalChildren += room?.NoOfChild || 0;
  });



  const storedFormData = JSON.parse(sessionStorage.getItem('hotelFormData'));
  const initialDisplayCount = 6;
  const [displayCount, setDisplayCount] = useState(initialDisplayCount);

  const handleShowMore = () => {
    setDisplayCount(displayCount === initialDisplayCount ? result?.HotelResults?.length : initialDisplayCount);
  };
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [xMaxLocation, setxMaxLocation] = useState(0);
  const [valueShow, setValueShow] = useState(false);
  const handelClearOne = (item) => {
    let select = selectedCategory.filter((item1) => item1 !== item)
    setSelectedCategory(select)
  }

  const handleMouseMove = (e) => {
    // setCursorPosition({...pre, x: e.clientX, y: e.clientY });
    if (xMaxLocation === 0) {
      setxMaxLocation(e.clientX);
    }
    if ((minPrice + 10) <= Number(priceRangeValue) && Number(priceRangeValue) < (maxPrice - 500)) {
      if (xMaxLocation < e.clientX) {

        setCursorPosition((prevState) => ({ ...prevState, x: xMaxLocation }))
      }
      else {
        setCursorPosition((prevState) => ({ ...prevState, x: e.clientX }))

      }
    }
    if (xMaxLocation < e.clientX) {
      setCursorPosition((prevState) => ({ ...prevState, x: xMaxLocation }))
    }
    console.log(minPrice, Number(priceRangeValue), maxPrice)
    if (cursorPosition.y === 0) {
      setCursorPosition((prevState) => ({ ...prevState, y: e.clientY }))
    }
    // console.log(e.clientX,e.clientY,)
  };
  useEffect(() => {
    if (xMaxLocation < cursorPosition.x) {
      setCursorPosition((prevState) => ({ ...prevState, x: xMaxLocation }))
      // console.log(xMaxLocation)
    }
  }, [cursorPosition])



  useEffect(() => {
    if (!valueShow) {

      window.scrollTo(0, 0);
    }
  }, [sortedAndFilteredResults])

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
              <div className="ClearFilterOneyOneContainer">
                {
                  selectedCategory.map((item, index) => (
                    <div onClick={() => handelClearOne(item)} className="ClearFilterOneyOneItemDev" >
                      <div className="ClearFilterOneyOneItem">{item} </div>
                      <div className="ClearFilterOneyOneItemX">X</div>

                    </div>
                  ))
                }
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

                <div>
                  <h2 className="sidebar-title">Sort By Price</h2>
                  <select className="highSelect" value={sortOption} onChange={handleSortChange}>
                    <option value="lowToHigh">Low to High</option>
                    <option value="highToLow">High to Low</option>
                  </select>
                </div>


                <div>
                  <h2 className="sidebar-title">By Price</h2>
                  <div className="position-relative">
                    <input
                      type="range"
                      min={minPrice + 1}
                      max={maxPrice + 5001}
                      // step="5000"
                      value={priceRangeValue}
                      onChange={handlePriceRangeChange}
                      // onMouseDown={()=>{setValueShow(true);
                      // }
                      // }
                      onMouseOver={() => setValueShow(true)}
                      // onMouseUp={()=>setValueShow(true)}

                      onMouseLeave={() => {
                        setValueShow(false);
                        setCursorPosition({ x: 0, y: 0 });
                      }}
                      onMouseOut={() => {
                        setValueShow(false);
                        setCursorPosition({ x: 0, y: 0 });

                      }}
                      onMouseMove={(e) => handleMouseMove(e)}
                    />
                    {
                      valueShow && (
                        <span className="btn btn-secondary" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Tooltip on top" style={{ position: "fixed", left: cursorPosition.x - 20, top: cursorPosition.y - 60, }} > ₹{priceRangeValue}</span>
                        // <span style={{ position: "absolute" }} id="tooltip"> ₹{priceRangeValue}</span>
                      )
                    }
                    <span>Max price ₹{""}{priceRangeValue}</span>
                  </div>
                  <Divider sx={{ marginBottom: "15px", backgroundColor: "gray" }} />
                </div>

                <div>
                  <h2 className="sidebar-title">By Rating</h2>
                  <div>
                    {[
                      { value: "5", label: "⭐⭐⭐⭐⭐" },
                      { value: "4", label: "⭐⭐⭐⭐" },
                      { value: "3", label: "⭐⭐⭐" },

                    ].map((starRating, index) => {
                      const itemCount = result?.HotelResults?.filter(item =>
                        item.StarRating === parseInt(starRating.value)
                      ).length;

                      // Generate star icons based on the selected star rating
                      const stars = Array.from({ length: 5 }).map((_, i) => (
                        <img
                          key={i}
                          src={i < parseInt(starRating.value) ? starsvg : starBlank}
                          alt={i < parseInt(starRating.value) ? "star" : "blank star"}
                        />
                      ));

                      return (
                        <label className="sidebar-label-container exceptionalFlex" key={index}>
                          <input
                            type="checkbox"
                            onChange={handleRadioChange}
                            value={starRating.value}
                            name="star"
                            checked={selectedCategory.includes(`star:${starRating.value}`)}
                          />
                          <span>({itemCount})</span>
                          <span className="checkmark"></span>
                          <div>{stars}</div>

                        </label>
                      );
                    })}
                  </div>
                  <Divider sx={{ marginBottom: "15px", backgroundColor: "gray" }} />
                </div>


                <div>
                  <h2 className="sidebar-title">By Locality</h2>
                  <div>
                    {
                      [...new Set(result?.HotelResults?.filter(item => item?.HotelLocation !== null && item?.HotelLocation !== "")?.map(item => item?.HotelLocation))]
                        .slice(0, displayCount)
                        .map((location, index) => {
                          const locationCount = result?.HotelResults?.filter(item => item.HotelLocation === location).length;

                          return (
                            <label className="sidebar-label-container exceptionalFlex" key={index}>
                              <input
                                type="checkbox"
                                onChange={handleRadioChange}
                                value={location}
                                name="location"
                                checked={selectedCategory.includes(`location:${location}`)}
                              />
                              <span>({locationCount})</span>
                              <span className="checkmark"></span>{location}
                            </label>
                          );
                        })
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


                {/* <div>
                  <h2 className="sidebar-title">By Price</h2>
                  <div>
                    {[
                      { value: "2000", min: "0", max: "2000", label: "₹0-2,000" },
                      { value: "3000", min: "2000", max: "3000", label: "₹2,000-3,000" },
                      { value: "6500", min: "3000", max: "6500", label: "₹3,000-6,500" },
                      { value: "9999", min: "6500", max: "10000", label: "₹6,500-10,000" },
                      { value: "10000", min: "10000", max: "10000000", label: "₹10,000 and Above" }
                    ].map((priceRange, index) => {
                      // Count the number of items in each price category
                      const itemCount = result?.HotelResults?.filter(item =>
                        item?.Price?.PublishedPrice >= priceRange.min && item?.Price?.PublishedPrice <= priceRange.max
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

          </div>

          {/* for bigger device  */}


          <div className=" col-lg-9 col-md-12 pt-4">

            {sortedAndFilteredResults && sortedAndFilteredResults.length > 0 ? (
              sortedAndFilteredResults
                ?.map((result, index) => {
                  const resultIndex = result?.ResultIndex;
                  const hotelCode = result?.HotelCode;
                  return (
                    <motion.div variants={variants} initial="initial"
                      whileInView="animate" viewport={{ once: true, amount: 0.8 }} className="col-lg-12" >

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
                  <img src={hotelFilter} alt="filter" />
                  <h1>Result not found</h1>
                </div>
              )
            }
          </div>
          {/* for bigger device  */}



        </div>
      </div>
    </section>

  );
}




