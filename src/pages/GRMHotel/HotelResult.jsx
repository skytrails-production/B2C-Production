import React, { useEffect, useState } from "react";
import hotelNotFound from "../../images/hotelNotFound.jpg"
import Divider from "@mui/material/Divider";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import starsvg from "../../images/star.svg"
import starBlank from "../../images/starBlank.svg"
import { Skeleton } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MdCancel } from "react-icons/md";
import { MdOutlineFreeBreakfast } from "react-icons/md";
import { clearHotelRoomAndGallery, hotelActionGRN, hotelGalleryRequest, singleHotelGRN } from "../../Redux/HotelGRN/hotel";
import "./hotelResult.css"
import GrmHotelform2 from "./GrmHotelform2";
import InfiniteScroll from "react-infinite-scroll-component";
import dayjs from "dayjs";



export default function HotelResult() {

    const navigate = useNavigate();
    const reducerState = useSelector((state) => state);
    const dispatch = useDispatch();
    const [result, setResult] = useState([])
    const [hasMore, setHasMore] = useState(true);
    const grnPayload = JSON.parse(sessionStorage.getItem('grnPayload'));
    const grmhotel = JSON.parse(sessionStorage.getItem("revisithotel"));

    const [firstLoader, setFirstLoader] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const searchId = reducerState?.hotelSearchResultGRN?.ticketData
        ?.data?.data?.search_id;

    const [mainLoader, setMainLoader] = useState(false)

    const fetchMoreData = () => {
        setCurrentPage((pre) => pre + 1)
    }

    useEffect(() => {
        dispatch(clearHotelRoomAndGallery())
    }, [])



    useEffect(() => {
        if (reducerState?.hotelSearchResultGRN?.onlyHotels?.length > 0) {
            setResult(reducerState?.hotelSearchResultGRN?.onlyHotels)
            setHasMore(reducerState?.hotelSearchResultGRN?.hasMore)
            setFirstLoader(false)
        }
    }, [reducerState?.hotelSearchResultGRN?.onlyHotels, reducerState?.hotelSearchResultGRN])


    const handlePageChangeScrroll = () => {
        dispatch(hotelActionGRN(grnPayload, currentPage));
    };
    useEffect(() => {
        handlePageChangeScrroll()
    }, [currentPage])


    const handleClick = (item) => {
        setFirstLoader(true);
        setMainLoader(true);
        const payload = {

            "data": {
                "rate_key": item?.min_rate?.rate_key,
                "group_code": item?.min_rate?.group_code,
            },
            "searchID": searchId,
            "hotel_code": item?.hotel_code,

        }

        const galleryPayload = {
            "hotel_id": item?.hotel_code,
        }
        dispatch(hotelGalleryRequest(galleryPayload))
        dispatch(singleHotelGRN(payload))
        navigate("/st-hotel/hotelresult/selectroom")
    };


    const handleSortChange = (event) => {
        const selectedValue = event.target.value;
        setSortOption((prevSortOption) =>
            prevSortOption === selectedValue ? "" : selectedValue
        );
    };

    const [sortOption, setSortOption] = useState("");
    const [searchInput, setSearchInput] = useState('');



    const maxPrice = result?.reduce((max, hotel) => {
        return Math.max(max, hotel?.min_rate?.price || 0);
    }, 0);
    const minPrice = result?.reduce((min, hotel) => {
        return Math.min(min, hotel?.min_rate?.price || Infinity);
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
            setSortOption("")
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


    const allFacilities = result?.reduce((allFacilities, hotel) => {
        return allFacilities?.concat(hotel?.facilities?.split(';').map(facility => facility?.trim()));
    }, []);

    const allUniqueFacilities = [...new Set(allFacilities)];
    const initialDisplayCount = 10;
    const [displayCount, setDisplayCount] = useState(initialDisplayCount);

    const handleShowMore = () => {
        setDisplayCount(displayCount === initialDisplayCount ? allUniqueFacilities?.length : initialDisplayCount);
    };


    const sortedAndFilteredResults = result
        ?.filter((item) => {
            const hotelName = item?.name?.toLowerCase();
            const hotelAddress = item?.address?.toLowerCase();
            const starRating = item?.category;
            const categoryFilters = selectedCategory?.map((category) => {
                const [groupName, value] = category.split(':');
                switch (groupName) {
                    case "star":
                        return starRating === parseInt(value);

                    case "facility":
                        return item?.facilities?.split(';')?.map(f => f.trim()).includes(value);
                    default:
                        return false;
                }
            });
            const priceInRange = item?.min_rate?.price <= priceRangeValue;
            const searchFilter = hotelName?.includes(searchInput?.toLowerCase()) || hotelAddress?.includes(searchInput?.toLowerCase());
            return categoryFilters?.every((filter) => filter) && searchFilter && priceInRange;
        })

        ?.filter((item) =>
            item?.images?.main_image !== '' && item?.category > 2
        );

    if (sortOption !== "") {
        sortedAndFilteredResults.sort((a, b) =>
            sortOption === "low" ? a?.min_rate?.price - b?.min_rate?.price : b?.min_rate?.price - a?.min_rate?.price
        );
    }




    let totalAdults = 0;
    let totalChildren = 0;

    result?.RoomGuests?.forEach((room) => {
        totalAdults += room?.NoOfAdults || 0;
        totalChildren += room?.NoOfChild || 0;
    });


    const storedFormData = JSON.parse(sessionStorage.getItem('hotelFormData'));
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const [xMaxLocation, setxMaxLocation] = useState(0);
    const [valueShow, setValueShow] = useState(false);
    const handelClearOne = (item) => {
        let select = selectedCategory.filter((item1) => item1 !== item)
        setSelectedCategory(select)
    }

    const handleMouseMove = (e) => {
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
        if (cursorPosition.y === 0) {
            setCursorPosition((prevState) => ({ ...prevState, y: e.clientY }))
        }
    };
    useEffect(() => {
        if (xMaxLocation < cursorPosition.x) {
            setCursorPosition((prevState) => ({ ...prevState, x: xMaxLocation }))
        }
    }, [cursorPosition])


    console.log(sortedAndFilteredResults, "sortedAndFilteredResults hotel")

    return (
        <>

            <section className="">
                <div className='mainimgHotelSearchResult'>
                    <GrmHotelform2 />
                    <div className="container searchMainBoxAbs">
                        <div className="HotelResultSearchBarBox">
                            <div className="hotelResSurBox">
                                <h3>Best Hotels for you in {grmhotel?.[0]?.cityName}</h3>
                                <p>Showing {result?.length} Results in {grmhotel?.[0]?.cityName}</p>
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
                            {firstLoader ? (
                                <div className="flightFilterBox">
                                    <div className="filterTitle">
                                        <p><Skeleton.Input active={true} style={{ width: 60, height: 25 }} /></p>
                                    </div>

                                    <div className="innerFilter">

                                        <div>
                                            <label className="sidebar-label-container ps-0">

                                                <p><Skeleton.Input active={true} style={{ width: 50, height: 15 }} /></p>
                                            </label>

                                        </div>


                                        <div className="busDepartureMain">
                                            <h2 className="sidebar-title"><Skeleton.Input active={true} style={{ width: 40, height: 20 }} /></h2>

                                            <div>

                                                <label className="sidebar-label-container ps-0">
                                                    <div className="svgBOx">
                                                        <div>
                                                            <Skeleton.Button active={true} style={{ width: 30, height: 30 }} />
                                                        </div>
                                                    </div>
                                                </label>
                                                <label className="sidebar-label-container ps-0">
                                                    <div className="svgBOx">
                                                        <div>
                                                            <Skeleton.Button active={true} style={{ width: 30, height: 30 }} />
                                                        </div>
                                                    </div>
                                                </label>

                                            </div>
                                        </div>

                                        <div>
                                            <h2 className="sidebar-title"><Skeleton.Button active={true} style={{ width: 60, height: 15 }} /></h2>
                                            <div className="position-relative">

                                                <Skeleton.Input active={true} style={{ width: "100px", height: 10 }} />
                                                <Skeleton.Input active={true} style={{ width: "100px", height: 10 }} />
                                            </div>
                                            <Divider sx={{ marginBottom: "15px", backgroundColor: "gray" }} />
                                        </div>

                                        <div>
                                            <h2 className="sidebar-title"><Skeleton.Button active={true} style={{ width: 60, height: 15 }} /></h2>
                                            <div>

                                                <label className="sidebar-label-container exceptionalFlex" >

                                                    <Skeleton.Avatar active={true} shape="circle" />
                                                    <Skeleton.Button active={true} style={{ width: 120, height: 15 }} />

                                                </label>

                                            </div>
                                            <Divider sx={{ marginBottom: "15px", backgroundColor: "gray" }} />
                                        </div>


                                        <div>
                                            <h2 className="sidebar-title"><Skeleton.Button active={true} style={{ width: 60, height: 15 }} /></h2>
                                            <label className="sidebar-label-container exceptionalFlex" >
                                                <Skeleton.Avatar active={true} shape="circle" />
                                                <Skeleton.Button active={true} style={{ width: 120, height: 15 }} />
                                            </label>
                                            <label className="sidebar-label-container exceptionalFlex" >
                                                <Skeleton.Avatar active={true} shape="circle" />
                                                <Skeleton.Button active={true} style={{ width: 120, height: 15 }} />
                                            </label>
                                            <label className="sidebar-label-container exceptionalFlex" >
                                                <Skeleton.Avatar active={true} shape="circle" />
                                                <Skeleton.Button active={true} style={{ width: 120, height: 15 }} />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            ) : (
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

                                        {/* <div>
                                                    <h2 className="sidebar-title">Sort By Price</h2>
                                                    <select className="highSelect" value={sortOption} onChange={handleSortChange}>
                                                        <option value="lowToHigh">Low to High</option>
                                                        <option value="highToLow">High to Low</option>
                                                    </select>

                                                </div> */}
                                        <div className="busDepartureMain">
                                            <h2 className="sidebar-title">Sort By Price</h2>

                                            <div>

                                                <label className="sidebar-label-container ps-0">
                                                    <div className="svgBOx">
                                                        <input
                                                            type="checkbox"
                                                            onChange={handleSortChange}
                                                            value="high"
                                                            name="sorting"
                                                            checked={sortOption === "high"}
                                                        />
                                                        {/* <span className="checkmark"></span>Non AC */}
                                                        <div>
                                                            <span className="checkedSVG pe-2">
                                                                <svg id="fi_13132493" enable-background="new 0 0 110 110" height="21" viewBox="0 0 110 110" width="21" xmlns="http://www.w3.org/2000/svg"><g><path d="m39.979 70.564v-40.564c0-2.209-1.791-4-4-4s-4 1.791-4 4v40.564c-1.528-.873-3.503-.675-4.807.63-1.562 1.563-1.562 4.095 0 5.657l5.979 5.978c.78.78 1.804 1.171 2.828 1.171s2.047-.391 2.829-1.172l5.978-5.978c1.562-1.562 1.562-4.095 0-5.656-1.306-1.304-3.28-1.504-4.807-.63z"></path><path d="m80 30.348h-32c-2.209 0-4 1.791-4 4s1.791 4 4 4h32c2.209 0 4-1.791 4-4s-1.791-4-4-4z"></path><path d="m74.565 40.674h-26.565c-2.209 0-4 1.791-4 4s1.791 4 4 4h26.565c2.209 0 4-1.791 4-4s-1.791-4-4-4z"></path><path d="m69.13 51h-21.13c-2.209 0-4 1.791-4 4s1.791 4 4 4h21.13c2.209 0 4-1.791 4-4s-1.791-4-4-4z"></path><path d="m63.695 61.326h-15.695c-2.209 0-4 1.791-4 4s1.791 4 4 4h15.695c2.209 0 4-1.791 4-4s-1.791-4-4-4z"></path><path d="m55 5c-27.614 0-50 22.386-50 50s22.386 50 50 50 50-22.386 50-50-22.386-50-50-50zm0 92c-23.159 0-42-18.841-42-42s18.841-42 42-42 42 18.841 42 42-18.841 42-42 42z"></path></g></svg>
                                                            </span>
                                                            <span>High to Low</span>
                                                        </div>
                                                    </div>
                                                </label>

                                                <label className="sidebar-label-container ps-0">
                                                    {/* <span className="checkmark"></span>AC */}

                                                    <div className="svgBOx">
                                                        <input
                                                            type="checkbox"
                                                            onChange={handleSortChange}
                                                            value="low"
                                                            name="sorting"
                                                            checked={sortOption === "low"}
                                                        />
                                                        {/* <span className="checkmark"></span>AC */}
                                                        <div>
                                                            <span className="checkedSVG pe-2">
                                                                <svg style={{ transform: "rotate(180deg)" }} id="fi_13132493" enable-background="new 0 0 110 110" height="21" viewBox="0 0 110 110" width="21" xmlns="http://www.w3.org/2000/svg"><g><path d="m39.979 70.564v-40.564c0-2.209-1.791-4-4-4s-4 1.791-4 4v40.564c-1.528-.873-3.503-.675-4.807.63-1.562 1.563-1.562 4.095 0 5.657l5.979 5.978c.78.78 1.804 1.171 2.828 1.171s2.047-.391 2.829-1.172l5.978-5.978c1.562-1.562 1.562-4.095 0-5.656-1.306-1.304-3.28-1.504-4.807-.63z"></path><path d="m80 30.348h-32c-2.209 0-4 1.791-4 4s1.791 4 4 4h32c2.209 0 4-1.791 4-4s-1.791-4-4-4z"></path><path d="m74.565 40.674h-26.565c-2.209 0-4 1.791-4 4s1.791 4 4 4h26.565c2.209 0 4-1.791 4-4s-1.791-4-4-4z"></path><path d="m69.13 51h-21.13c-2.209 0-4 1.791-4 4s1.791 4 4 4h21.13c2.209 0 4-1.791 4-4s-1.791-4-4-4z"></path><path d="m63.695 61.326h-15.695c-2.209 0-4 1.791-4 4s1.791 4 4 4h15.695c2.209 0 4-1.791 4-4s-1.791-4-4-4z"></path><path d="m55 5c-27.614 0-50 22.386-50 50s22.386 50 50 50 50-22.386 50-50-22.386-50-50-50zm0 92c-23.159 0-42-18.841-42-42s18.841-42 42-42 42 18.841 42 42-18.841 42-42 42z"></path></g></svg>
                                                            </span>
                                                            <span>Low to High</span>
                                                        </div>
                                                    </div>
                                                </label>


                                            </div>
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
                                                    const itemCount = result?.filter(item =>
                                                        item.category === parseInt(starRating.value)
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
                                            <h2 className="sidebar-title">By Amenities</h2>

                                            {result?.length > 0 && (
                                                <div>
                                                    {/* Collect all facilities from all hotels */}
                                                    {result?.reduce((allFacilities, hotel) => {
                                                        return allFacilities?.concat(hotel?.facilities?.split(';')?.map(facility => facility.trim()));
                                                    }, [])?.filter((facility, index, self) => self.indexOf(facility) === index) // Remove duplicates
                                                        ?.slice(0, displayCount)
                                                        ?.map((facility, index) => {

                                                            const noOfTimesCame = result.reduce((count, hotel) => {
                                                                return count + (hotel?.facilities?.split(';').map(f => f.trim()).includes(facility) ? 1 : 0);
                                                            }, 0);

                                                            return (
                                                                <label className="sidebar-label-container exceptionalFlex" key={index}>
                                                                    <input
                                                                        type="checkbox"
                                                                        onChange={handleRadioChange}
                                                                        value={facility}
                                                                        name="facility"
                                                                        checked={selectedCategory.includes(`facility:${facility}`)}
                                                                    />
                                                                    <span>({noOfTimesCame})</span>
                                                                    <span className="checkmark"></span>{facility}
                                                                </label>
                                                            );
                                                        })}
                                                </div>
                                            )}

                                            <p className="ShowMoreHotel" style={{ cursor: "pointer" }} onClick={handleShowMore}>
                                                {displayCount === initialDisplayCount ? (
                                                    <>
                                                        Show More
                                                        <svg height="20" viewBox="0 0 24 24" width="25" xmlns="http://www.w3.org/2000/svg" id="fi_2722987">
                                                            <g id="_16" data-name="16">
                                                                <path d="m12 16a1 1 0 0 1 -.71-.29l-6-6a1 1 0 0 1 1.42-1.42l5.29 5.3 5.29-5.29a1 1 0 0 1 1.41 1.41l-6 6a1 1 0 0 1 -.7.29z"></path>
                                                            </g>
                                                        </svg>
                                                    </>
                                                ) : (
                                                    <>
                                                        Show Less
                                                        <svg className="rotttt" height="20" viewBox="0 0 24 24" width="25" xmlns="http://www.w3.org/2000/svg" id="fi_2722987">
                                                            <g id="_16" data-name="16">
                                                                <path d="m12 16a1 1 0 0 1 -.71-.29l-6-6a1 1 0 0 1 1.42-1.42l5.29 5.3 5.29-5.29a1 1 0 0 1 1.41 1.41l-6 6a1 1 0 0 1 -.7.29z"></path>
                                                            </g>
                                                        </svg>
                                                    </>
                                                )}
                                            </p>
                                        </div>

                                    </div>
                                </div>
                            )}
                        </div>

                        {firstLoader ? (
                            <div className=" col-lg-9 col-md-12 pt-4">

                                <div className="col-lg-12" >
                                    {[1, 2, 3].map((item) => (
                                        <div className="hotelResultBoxSearch" >
                                            <div>
                                                <div className="hotelImage">
                                                    <Skeleton.Image active={true} style={{ width: 250, height: 180 }} />
                                                </div>
                                                <div className="hotelResultDetails">
                                                    <div className="hotleTitle">
                                                        <p><Skeleton.Input active={true} style={{ width: "200px", height: 25 }} /></p>
                                                    </div>


                                                    <div className="hotelRating">
                                                        <div>
                                                            {[1, 2, 3].map((item) => (
                                                                <Skeleton.Avatar className="ms-1" active={true} shape="circle" />
                                                            ))}
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <p className="hotAddress">
                                                            <Skeleton.Input active={true} style={{ width: "250px", height: 10 }} />
                                                            <Skeleton.Input active={true} style={{ width: "250px", height: 10 }} />
                                                        </p>
                                                    </div>
                                                    <div className="breakCancel">

                                                        <span className="brcl1">
                                                            <Skeleton.Input active={true} style={{ width: "150px", height: 10 }} />
                                                        </span>
                                                    </div>

                                                </div>
                                            </div>

                                            <div className="priceBookHotel">
                                                <div className="priceBookHotelOne ">
                                                    <span><Skeleton.Button active={true} style={{ width: "20px", height: 10 }} /></span>
                                                    <span><Skeleton.Button active={true} style={{ width: "30px", height: 10 }} /></span>
                                                    <p><Skeleton.Button active={true} style={{ width: "40px", height: 30 }} /></p>
                                                    <p><Skeleton.Button active={true} style={{ width: "40px", height: 30 }} /></p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                            </div>
                        ) : (
                            <div className=" col-lg-9 col-md-12 pt-4">
                                <InfiniteScroll
                                    dataLength={sortedAndFilteredResults?.length}
                                    next={fetchMoreData}
                                    hasMore={hasMore}
                                    loader={<div className="col-4 offset-lg-4 loaderHotelFetching" >
                                        <span className='loaderFetching'></span>
                                    </div>}
                                    endMessage={<p style={{ textAlign: 'center' }}><b>No More Result !</b></p>}
                                >

                                    {
                                        // sortedAndFilteredResults
                                        result
                                            ?.length > 0 ? (
                                            sortedAndFilteredResults
                                                ?.map((result, index) => {
                                                    // const resultIndex = result?.ResultIndex;

                                                    console.log(result, "result");
                                                    const hotelCode = result?.hotel_code;
                                                    return (
                                                        <motion.div className="col-lg-12" >

                                                            <motion.div onClick={() => handleClick(result)} className="hotelResultBoxSearch" key={index}>
                                                                <div>
                                                                    <div className="hotelImage">
                                                                        <img
                                                                            src={result?.images?.url === "" ? hotelNotFound : result?.images?.url}
                                                                            alt="hotelImage" />
                                                                    </div>
                                                                    <div className="hotelResultDetails">
                                                                        <div className="hotleTitle">
                                                                            <p>{result?.name}</p>
                                                                        </div>


                                                                        <div className="hotelRating">
                                                                            <div>
                                                                                {Array.from({ length: result?.category }, (_, index) => (
                                                                                    <img key={index} src={starsvg} alt={`Star ${index + 1}`} />
                                                                                ))}
                                                                            </div>
                                                                        </div>

                                                                        <div>
                                                                            <p className="hotAddress">
                                                                                {result?.address}
                                                                            </p>
                                                                        </div>
                                                                        <div className="breakCancel">
                                                                            {result?.min_rate?.boarding_details?.[0] !== "Room Only" &&
                                                                                <span className="brcl1">
                                                                                    <MdOutlineFreeBreakfast />   Breakfast Included
                                                                                </span>
                                                                            }
                                                                            {result?.min_rate?.cancellation_policy?.cancel_by_date &&
                                                                                <span className="brcl2">
                                                                                    <MdCancel />
                                                                                    {`cancellation till ${dayjs(result?.min_rate?.cancellation_policy?.cancel_by_date).format("DD MMM, YY")}`}
                                                                                </span>
                                                                            }

                                                                        </div>
                                                                        <div className="othInc">
                                                                            {result?.min_rate?.other_inclusions?.map((inclusion, e) => (
                                                                                <div className="othIncInner" key={e}>
                                                                                    <div className="d-flex justify-content-start align-items-center gap-2">
                                                                                        {inclusion.toLowerCase() == "free wifi" &&
                                                                                            <>
                                                                                                <svg fill="none" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg" id="fi_11530392"><g fill="rgb(0,0,0)"><path d="m21.4841 10.027c-5.0345-4.77114-12.78606-5.02226-18.10593-.75253-.29509.23686-.58281.48769-.86227.75253-.30065.2849-.77535.2722-1.06028-.02847-.28492-.30065-.27217-.77536.02848-1.06028.30934-.29316.62805-.57103.95513-.83357 5.89983-4.73522 14.49327-4.45767 20.07667.83357.3006.28492.3134.75962.0285 1.06027-.2849.30068-.7597.31338-1.0603.02848z"></path><path d="m4.46967 12.3691c4.15889-4.15885 10.90173-4.15885 15.06063 0 .2929.2929.2929.7678 0 1.0607s-.7677.2929-1.0606 0c-3.5731-3.5731-9.36627-3.5731-12.93937 0-.2929.2929-.76777.2929-1.06066 0-.2929-.2929-.2929-.7678 0-1.0607z"></path><path d="m7.46967 15.6265c2.50204-2.502 6.55863-2.502 9.06063 0 .2929.2929.2929.7678 0 1.0607s-.7677.2929-1.0606 0c-1.9163-1.9163-5.0231-1.9163-6.93937 0-.2929.2929-.76777.2929-1.06066 0-.2929-.2929-.2929-.7678 0-1.0607z"></path><path d="m12 20c.6903 0 1.25-.5597 1.25-1.25 0-.6904-.5597-1.25-1.25-1.25-.6904 0-1.25.5596-1.25 1.25 0 .6903.5596 1.25 1.25 1.25z"></path></g></svg>
                                                                                                <p className="panDesign3"> WiFi</p>
                                                                                            </>

                                                                                        }
                                                                                        {inclusion.toLowerCase() == "free internet" &&
                                                                                            <>
                                                                                                <svg fill="none" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg" id="fi_11530392"><g fill="rgb(0,0,0)"><path d="m21.4841 10.027c-5.0345-4.77114-12.78606-5.02226-18.10593-.75253-.29509.23686-.58281.48769-.86227.75253-.30065.2849-.77535.2722-1.06028-.02847-.28492-.30065-.27217-.77536.02848-1.06028.30934-.29316.62805-.57103.95513-.83357 5.89983-4.73522 14.49327-4.45767 20.07667.83357.3006.28492.3134.75962.0285 1.06027-.2849.30068-.7597.31338-1.0603.02848z"></path><path d="m4.46967 12.3691c4.15889-4.15885 10.90173-4.15885 15.06063 0 .2929.2929.2929.7678 0 1.0607s-.7677.2929-1.0606 0c-3.5731-3.5731-9.36627-3.5731-12.93937 0-.2929.2929-.76777.2929-1.06066 0-.2929-.2929-.2929-.7678 0-1.0607z"></path><path d="m7.46967 15.6265c2.50204-2.502 6.55863-2.502 9.06063 0 .2929.2929.2929.7678 0 1.0607s-.7677.2929-1.0606 0c-1.9163-1.9163-5.0231-1.9163-6.93937 0-.2929.2929-.76777.2929-1.06066 0-.2929-.2929-.2929-.7678 0-1.0607z"></path><path d="m12 20c.6903 0 1.25-.5597 1.25-1.25 0-.6904-.5597-1.25-1.25-1.25-.6904 0-1.25.5596-1.25 1.25 0 .6903.5596 1.25 1.25 1.25z"></path></g></svg>
                                                                                                <p className="panDesign3"> internet</p>
                                                                                            </>

                                                                                        }
                                                                                        {inclusion.toLowerCase() == "free breakfast" &&
                                                                                            <>
                                                                                                <svg id="fi_3480666" enable-background="new 0 0 512 512" height="20" viewBox="0 0 512 512" width="20" xmlns="http://www.w3.org/2000/svg"><g><path d="m256 0c-.004 0 0 0-.004 0-65.016 0-127.003 24.406-174.531 68.719-3.03 2.824-3.196 7.57-.372 10.6 2.826 3.031 7.57 3.196 10.6.371 44.745-41.717 103.097-64.691 164.307-64.69 132.888 0 241 108.112 241 241s-108.112 241-241 241-241-108.112-241-241c0-55.019 19.023-108.824 53.565-151.503 2.605-3.221 2.108-7.942-1.112-10.549-3.219-2.605-7.941-2.108-10.548 1.111-36.696 45.342-56.905 102.499-56.905 160.941 0 141.491 114.497 256 256 256 141.491 0 256-114.497 256-256 0-141.491-114.497-256-256-256z"></path><path d="m263.348 303.167c-30.115 9.294-45.936 40.794-36.947 69.923 7.28 23.594 28.748 39.445 53.419 39.445 30.347 0 55.949-24.332 55.949-55.917 0-37.488-36.162-64.642-72.421-53.451zm16.472 94.368c-18.051 0-33.758-11.601-39.086-28.867v-.001c-6.58-21.321 4.995-44.364 27.037-51.167 26.462-8.168 52.998 11.603 52.998 39.118 0 23.167-18.807 40.917-40.949 40.917z"></path><path d="m264.175 158.61 27.15-27.149c2.929-2.929 2.929-7.678 0-10.606-2.928-2.93-7.677-2.929-10.606-.001l-27.15 27.149c-2.929 2.929-2.929 7.678 0 10.606 2.928 2.93 7.676 2.93 10.606.001z"></path><path d="m278.546 183.588c2.93 2.929 7.678 2.928 10.606 0l27.15-27.15c2.929-2.93 2.929-7.678 0-10.607-2.929-2.928-7.678-2.928-10.606 0l-27.15 27.15c-2.929 2.929-2.929 7.677 0 10.607z"></path><path d="m303.523 208.565c2.93 2.929 7.678 2.928 10.606 0l27.15-27.15c2.929-2.93 2.929-7.678 0-10.607-2.929-2.928-7.678-2.928-10.606 0l-27.15 27.15c-2.929 2.93-2.929 7.678 0 10.607z"></path><path d="m331.786 447.118c28.725-15.705 30.65-28.125 54.507-52.374 5.827-5.923 10.239-12.875 13.1-20.431 27.481-33.256 42.607-75.208 42.607-118.313 0-88.731-63.206-165.556-150.357-182.556l-41.895-40.828c-10.645-10.375-28.597-2.821-28.597 12.062v28.615c-10.472 1.996-20.776 4.904-30.751 8.675-22.708-10.121-47.042 6.469-64.031 24.776-41.106 44.294-70.065 128.027-65.095 188.271 2.13 25.816 11.64 54.634 37.03 59.467 7.551 12.049 16.452 23.207 26.547 33.256-2.29 8.567-2.295 17.869.505 26.937 7.669 24.855 30.285 41.556 56.276 41.556 16.173 0 20.126-5.862 38.843-5.862 26.409 0 37.551 14.873 75.932 8.871 4.093-.641 6.891-4.477 6.251-8.569s-4.482-6.895-8.568-6.251c-34.968 5.471-43.32-9.051-73.614-9.051-20.992 0-25.428 5.862-38.843 5.862-19.37 0-36.226-12.449-41.943-30.979-2.197-7.118-1.966-14.62.617-21.577.046-.105.101-.204.143-.311 3.723-9.639 11.541-16.917 21.344-19.941 12.951-3.998 20.156-17.123 17.381-29.793-.6-2.733-3.666-10.332-2.029-21.508 1.964-13.108 9.959-25.363 22.505-32.137.001 0 .001-.001.002-.001 5.794-3.126 7.95-3.335 53.619-17.426 8.707-2.687 17.718-4.056 26.771-4.056 27.233 0 53.871 12.676 71.095 34.138 12.223 15.231 21.054 21.548 24.463 25.01 16.717 16.98 16.861 44.44.002 61.577-25.026 25.439-25.307 35.684-51.008 49.731-3.635 1.987-4.971 6.544-2.984 10.179 1.984 3.632 6.54 4.968 10.175 2.981zm83.662-253.021-101.675-99.086c47.115 16.847 83.954 53.412 101.675 99.086zm-179.297-114.503v-34.917c0-1.601 1.91-2.507 3.128-1.319l181.776 177.149c1.208 1.178.368 3.161-1.286 3.161h-181.775c-1.016 0-1.842-.826-1.842-1.842v-142.232zm-159.928 214.185c-4.624-56.053 22.89-135.617 61.141-176.834 13.867-14.943 27.561-22.99 38.693-22.99 2.342 0 4.572.356 6.665 1.08 12.36 4.268 16.801 19.343 9.413 29.996-5.598 8.074-10.931 17.153-15.619 25.939-9.66-3.34-15.966-6.746-24.605-2.547-9.561 4.647-13.538 16.147-8.889 25.708 2.246 4.621 6.158 8.091 11.013 9.769l5.911 2.044c-2.112 4.994-4.177 10.105-6.184 15.307l-14.682-5.077c-10.023-3.465-20.998 1.872-24.463 11.894-1.679 4.856-1.366 10.075.88 14.695 2.246 4.621 6.158 8.091 11.013 9.769l14.69 5.08c-1.634 5.329-3.175 10.625-4.598 15.855l-5.913-2.045c-10.021-3.463-20.997 1.872-24.463 11.894-1.679 4.856-1.366 10.075.88 14.695 2.246 4.621 6.158 8.091 11.013 9.769l9.918 3.429c-1.921 10.832-3.205 20.971-3.745 30.043v.005c-1.386 23.159-42.853 35.754-48.069-27.478zm93.417-129.315c-1.223 2.524-2.437 5.095-3.637 7.702l-7.066-2.443c-5.178-1.788-2.636-9.864 2.768-8.003zm-21.087 50.856c-.925 2.605-1.892 5.406-2.768 8.004l-14.375-4.971c-2.216-.765-3.381-3.178-2.618-5.385.76-2.199 3.168-3.383 5.386-2.619zm-15.699 52.72c-.667 2.793-1.3 5.564-1.897 8.305l-7.936-2.744c-2.217-.766-3.381-3.178-2.617-5.385.761-2.202 3.171-3.382 5.385-2.619zm229.979 20.209c-19.51-24.311-49.032-39.087-80.763-39.719-10.9-.21-22.028 1.237-33.224 4.691-49.021 15.126-49.514 14.899-56.305 18.548-.02.01-.04.02-.059.031-15.543 8.375-26.435 23.225-29.749 40.569-.014.073-.026.146-.04.219-3.112 16.631 1.757 27.609 2.028 30.521.445 4.868-2.583 9.507-7.352 10.977-10.25 3.163-19.499 9.691-25.843 19.028-5.829-6.19-11.188-12.797-16.033-19.769 13.084-4.387 22.9-16.562 23.773-31.202 3.27-54.86 33.866-143.376 65.197-188.565 8.314-11.99 8.496-28.168-.367-40.521 5.603-1.788 11.3-3.286 17.056-4.484 0 144.375-.154 134.22.343 136.644 1.573 7.667 8.373 13.452 16.5 13.452 195.905 0 183.754.509 188.012-1.186.657 6.093.993 12.268.993 18.517 0 31.148-8.588 61.645-24.536 88.118-4.709-29.423-19.972-31.372-39.631-55.869z"></path></g></svg>
                                                                                                <p className="panDesign3">Breakfast</p>
                                                                                            </>
                                                                                        }
                                                                                        {inclusion.toLowerCase() == "breakfast" &&
                                                                                            <>
                                                                                                <svg id="fi_3480666" enable-background="new 0 0 512 512" height="20" viewBox="0 0 512 512" width="20" xmlns="http://www.w3.org/2000/svg"><g><path d="m256 0c-.004 0 0 0-.004 0-65.016 0-127.003 24.406-174.531 68.719-3.03 2.824-3.196 7.57-.372 10.6 2.826 3.031 7.57 3.196 10.6.371 44.745-41.717 103.097-64.691 164.307-64.69 132.888 0 241 108.112 241 241s-108.112 241-241 241-241-108.112-241-241c0-55.019 19.023-108.824 53.565-151.503 2.605-3.221 2.108-7.942-1.112-10.549-3.219-2.605-7.941-2.108-10.548 1.111-36.696 45.342-56.905 102.499-56.905 160.941 0 141.491 114.497 256 256 256 141.491 0 256-114.497 256-256 0-141.491-114.497-256-256-256z"></path><path d="m263.348 303.167c-30.115 9.294-45.936 40.794-36.947 69.923 7.28 23.594 28.748 39.445 53.419 39.445 30.347 0 55.949-24.332 55.949-55.917 0-37.488-36.162-64.642-72.421-53.451zm16.472 94.368c-18.051 0-33.758-11.601-39.086-28.867v-.001c-6.58-21.321 4.995-44.364 27.037-51.167 26.462-8.168 52.998 11.603 52.998 39.118 0 23.167-18.807 40.917-40.949 40.917z"></path><path d="m264.175 158.61 27.15-27.149c2.929-2.929 2.929-7.678 0-10.606-2.928-2.93-7.677-2.929-10.606-.001l-27.15 27.149c-2.929 2.929-2.929 7.678 0 10.606 2.928 2.93 7.676 2.93 10.606.001z"></path><path d="m278.546 183.588c2.93 2.929 7.678 2.928 10.606 0l27.15-27.15c2.929-2.93 2.929-7.678 0-10.607-2.929-2.928-7.678-2.928-10.606 0l-27.15 27.15c-2.929 2.929-2.929 7.677 0 10.607z"></path><path d="m303.523 208.565c2.93 2.929 7.678 2.928 10.606 0l27.15-27.15c2.929-2.93 2.929-7.678 0-10.607-2.929-2.928-7.678-2.928-10.606 0l-27.15 27.15c-2.929 2.93-2.929 7.678 0 10.607z"></path><path d="m331.786 447.118c28.725-15.705 30.65-28.125 54.507-52.374 5.827-5.923 10.239-12.875 13.1-20.431 27.481-33.256 42.607-75.208 42.607-118.313 0-88.731-63.206-165.556-150.357-182.556l-41.895-40.828c-10.645-10.375-28.597-2.821-28.597 12.062v28.615c-10.472 1.996-20.776 4.904-30.751 8.675-22.708-10.121-47.042 6.469-64.031 24.776-41.106 44.294-70.065 128.027-65.095 188.271 2.13 25.816 11.64 54.634 37.03 59.467 7.551 12.049 16.452 23.207 26.547 33.256-2.29 8.567-2.295 17.869.505 26.937 7.669 24.855 30.285 41.556 56.276 41.556 16.173 0 20.126-5.862 38.843-5.862 26.409 0 37.551 14.873 75.932 8.871 4.093-.641 6.891-4.477 6.251-8.569s-4.482-6.895-8.568-6.251c-34.968 5.471-43.32-9.051-73.614-9.051-20.992 0-25.428 5.862-38.843 5.862-19.37 0-36.226-12.449-41.943-30.979-2.197-7.118-1.966-14.62.617-21.577.046-.105.101-.204.143-.311 3.723-9.639 11.541-16.917 21.344-19.941 12.951-3.998 20.156-17.123 17.381-29.793-.6-2.733-3.666-10.332-2.029-21.508 1.964-13.108 9.959-25.363 22.505-32.137.001 0 .001-.001.002-.001 5.794-3.126 7.95-3.335 53.619-17.426 8.707-2.687 17.718-4.056 26.771-4.056 27.233 0 53.871 12.676 71.095 34.138 12.223 15.231 21.054 21.548 24.463 25.01 16.717 16.98 16.861 44.44.002 61.577-25.026 25.439-25.307 35.684-51.008 49.731-3.635 1.987-4.971 6.544-2.984 10.179 1.984 3.632 6.54 4.968 10.175 2.981zm83.662-253.021-101.675-99.086c47.115 16.847 83.954 53.412 101.675 99.086zm-179.297-114.503v-34.917c0-1.601 1.91-2.507 3.128-1.319l181.776 177.149c1.208 1.178.368 3.161-1.286 3.161h-181.775c-1.016 0-1.842-.826-1.842-1.842v-142.232zm-159.928 214.185c-4.624-56.053 22.89-135.617 61.141-176.834 13.867-14.943 27.561-22.99 38.693-22.99 2.342 0 4.572.356 6.665 1.08 12.36 4.268 16.801 19.343 9.413 29.996-5.598 8.074-10.931 17.153-15.619 25.939-9.66-3.34-15.966-6.746-24.605-2.547-9.561 4.647-13.538 16.147-8.889 25.708 2.246 4.621 6.158 8.091 11.013 9.769l5.911 2.044c-2.112 4.994-4.177 10.105-6.184 15.307l-14.682-5.077c-10.023-3.465-20.998 1.872-24.463 11.894-1.679 4.856-1.366 10.075.88 14.695 2.246 4.621 6.158 8.091 11.013 9.769l14.69 5.08c-1.634 5.329-3.175 10.625-4.598 15.855l-5.913-2.045c-10.021-3.463-20.997 1.872-24.463 11.894-1.679 4.856-1.366 10.075.88 14.695 2.246 4.621 6.158 8.091 11.013 9.769l9.918 3.429c-1.921 10.832-3.205 20.971-3.745 30.043v.005c-1.386 23.159-42.853 35.754-48.069-27.478zm93.417-129.315c-1.223 2.524-2.437 5.095-3.637 7.702l-7.066-2.443c-5.178-1.788-2.636-9.864 2.768-8.003zm-21.087 50.856c-.925 2.605-1.892 5.406-2.768 8.004l-14.375-4.971c-2.216-.765-3.381-3.178-2.618-5.385.76-2.199 3.168-3.383 5.386-2.619zm-15.699 52.72c-.667 2.793-1.3 5.564-1.897 8.305l-7.936-2.744c-2.217-.766-3.381-3.178-2.617-5.385.761-2.202 3.171-3.382 5.385-2.619zm229.979 20.209c-19.51-24.311-49.032-39.087-80.763-39.719-10.9-.21-22.028 1.237-33.224 4.691-49.021 15.126-49.514 14.899-56.305 18.548-.02.01-.04.02-.059.031-15.543 8.375-26.435 23.225-29.749 40.569-.014.073-.026.146-.04.219-3.112 16.631 1.757 27.609 2.028 30.521.445 4.868-2.583 9.507-7.352 10.977-10.25 3.163-19.499 9.691-25.843 19.028-5.829-6.19-11.188-12.797-16.033-19.769 13.084-4.387 22.9-16.562 23.773-31.202 3.27-54.86 33.866-143.376 65.197-188.565 8.314-11.99 8.496-28.168-.367-40.521 5.603-1.788 11.3-3.286 17.056-4.484 0 144.375-.154 134.22.343 136.644 1.573 7.667 8.373 13.452 16.5 13.452 195.905 0 183.754.509 188.012-1.186.657 6.093.993 12.268.993 18.517 0 31.148-8.588 61.645-24.536 88.118-4.709-29.423-19.972-31.372-39.631-55.869z"></path></g></svg>
                                                                                                <p className="panDesign3">Breakfast</p>
                                                                                            </>
                                                                                        }
                                                                                        {inclusion.toLowerCase() == "continental breakfast" &&
                                                                                            <>
                                                                                                <svg id="fi_3480666" enable-background="new 0 0 512 512" height="20" viewBox="0 0 512 512" width="20" xmlns="http://www.w3.org/2000/svg"><g><path d="m256 0c-.004 0 0 0-.004 0-65.016 0-127.003 24.406-174.531 68.719-3.03 2.824-3.196 7.57-.372 10.6 2.826 3.031 7.57 3.196 10.6.371 44.745-41.717 103.097-64.691 164.307-64.69 132.888 0 241 108.112 241 241s-108.112 241-241 241-241-108.112-241-241c0-55.019 19.023-108.824 53.565-151.503 2.605-3.221 2.108-7.942-1.112-10.549-3.219-2.605-7.941-2.108-10.548 1.111-36.696 45.342-56.905 102.499-56.905 160.941 0 141.491 114.497 256 256 256 141.491 0 256-114.497 256-256 0-141.491-114.497-256-256-256z"></path><path d="m263.348 303.167c-30.115 9.294-45.936 40.794-36.947 69.923 7.28 23.594 28.748 39.445 53.419 39.445 30.347 0 55.949-24.332 55.949-55.917 0-37.488-36.162-64.642-72.421-53.451zm16.472 94.368c-18.051 0-33.758-11.601-39.086-28.867v-.001c-6.58-21.321 4.995-44.364 27.037-51.167 26.462-8.168 52.998 11.603 52.998 39.118 0 23.167-18.807 40.917-40.949 40.917z"></path><path d="m264.175 158.61 27.15-27.149c2.929-2.929 2.929-7.678 0-10.606-2.928-2.93-7.677-2.929-10.606-.001l-27.15 27.149c-2.929 2.929-2.929 7.678 0 10.606 2.928 2.93 7.676 2.93 10.606.001z"></path><path d="m278.546 183.588c2.93 2.929 7.678 2.928 10.606 0l27.15-27.15c2.929-2.93 2.929-7.678 0-10.607-2.929-2.928-7.678-2.928-10.606 0l-27.15 27.15c-2.929 2.929-2.929 7.677 0 10.607z"></path><path d="m303.523 208.565c2.93 2.929 7.678 2.928 10.606 0l27.15-27.15c2.929-2.93 2.929-7.678 0-10.607-2.929-2.928-7.678-2.928-10.606 0l-27.15 27.15c-2.929 2.93-2.929 7.678 0 10.607z"></path><path d="m331.786 447.118c28.725-15.705 30.65-28.125 54.507-52.374 5.827-5.923 10.239-12.875 13.1-20.431 27.481-33.256 42.607-75.208 42.607-118.313 0-88.731-63.206-165.556-150.357-182.556l-41.895-40.828c-10.645-10.375-28.597-2.821-28.597 12.062v28.615c-10.472 1.996-20.776 4.904-30.751 8.675-22.708-10.121-47.042 6.469-64.031 24.776-41.106 44.294-70.065 128.027-65.095 188.271 2.13 25.816 11.64 54.634 37.03 59.467 7.551 12.049 16.452 23.207 26.547 33.256-2.29 8.567-2.295 17.869.505 26.937 7.669 24.855 30.285 41.556 56.276 41.556 16.173 0 20.126-5.862 38.843-5.862 26.409 0 37.551 14.873 75.932 8.871 4.093-.641 6.891-4.477 6.251-8.569s-4.482-6.895-8.568-6.251c-34.968 5.471-43.32-9.051-73.614-9.051-20.992 0-25.428 5.862-38.843 5.862-19.37 0-36.226-12.449-41.943-30.979-2.197-7.118-1.966-14.62.617-21.577.046-.105.101-.204.143-.311 3.723-9.639 11.541-16.917 21.344-19.941 12.951-3.998 20.156-17.123 17.381-29.793-.6-2.733-3.666-10.332-2.029-21.508 1.964-13.108 9.959-25.363 22.505-32.137.001 0 .001-.001.002-.001 5.794-3.126 7.95-3.335 53.619-17.426 8.707-2.687 17.718-4.056 26.771-4.056 27.233 0 53.871 12.676 71.095 34.138 12.223 15.231 21.054 21.548 24.463 25.01 16.717 16.98 16.861 44.44.002 61.577-25.026 25.439-25.307 35.684-51.008 49.731-3.635 1.987-4.971 6.544-2.984 10.179 1.984 3.632 6.54 4.968 10.175 2.981zm83.662-253.021-101.675-99.086c47.115 16.847 83.954 53.412 101.675 99.086zm-179.297-114.503v-34.917c0-1.601 1.91-2.507 3.128-1.319l181.776 177.149c1.208 1.178.368 3.161-1.286 3.161h-181.775c-1.016 0-1.842-.826-1.842-1.842v-142.232zm-159.928 214.185c-4.624-56.053 22.89-135.617 61.141-176.834 13.867-14.943 27.561-22.99 38.693-22.99 2.342 0 4.572.356 6.665 1.08 12.36 4.268 16.801 19.343 9.413 29.996-5.598 8.074-10.931 17.153-15.619 25.939-9.66-3.34-15.966-6.746-24.605-2.547-9.561 4.647-13.538 16.147-8.889 25.708 2.246 4.621 6.158 8.091 11.013 9.769l5.911 2.044c-2.112 4.994-4.177 10.105-6.184 15.307l-14.682-5.077c-10.023-3.465-20.998 1.872-24.463 11.894-1.679 4.856-1.366 10.075.88 14.695 2.246 4.621 6.158 8.091 11.013 9.769l14.69 5.08c-1.634 5.329-3.175 10.625-4.598 15.855l-5.913-2.045c-10.021-3.463-20.997 1.872-24.463 11.894-1.679 4.856-1.366 10.075.88 14.695 2.246 4.621 6.158 8.091 11.013 9.769l9.918 3.429c-1.921 10.832-3.205 20.971-3.745 30.043v.005c-1.386 23.159-42.853 35.754-48.069-27.478zm93.417-129.315c-1.223 2.524-2.437 5.095-3.637 7.702l-7.066-2.443c-5.178-1.788-2.636-9.864 2.768-8.003zm-21.087 50.856c-.925 2.605-1.892 5.406-2.768 8.004l-14.375-4.971c-2.216-.765-3.381-3.178-2.618-5.385.76-2.199 3.168-3.383 5.386-2.619zm-15.699 52.72c-.667 2.793-1.3 5.564-1.897 8.305l-7.936-2.744c-2.217-.766-3.381-3.178-2.617-5.385.761-2.202 3.171-3.382 5.385-2.619zm229.979 20.209c-19.51-24.311-49.032-39.087-80.763-39.719-10.9-.21-22.028 1.237-33.224 4.691-49.021 15.126-49.514 14.899-56.305 18.548-.02.01-.04.02-.059.031-15.543 8.375-26.435 23.225-29.749 40.569-.014.073-.026.146-.04.219-3.112 16.631 1.757 27.609 2.028 30.521.445 4.868-2.583 9.507-7.352 10.977-10.25 3.163-19.499 9.691-25.843 19.028-5.829-6.19-11.188-12.797-16.033-19.769 13.084-4.387 22.9-16.562 23.773-31.202 3.27-54.86 33.866-143.376 65.197-188.565 8.314-11.99 8.496-28.168-.367-40.521 5.603-1.788 11.3-3.286 17.056-4.484 0 144.375-.154 134.22.343 136.644 1.573 7.667 8.373 13.452 16.5 13.452 195.905 0 183.754.509 188.012-1.186.657 6.093.993 12.268.993 18.517 0 31.148-8.588 61.645-24.536 88.118-4.709-29.423-19.972-31.372-39.631-55.869z"></path></g></svg>
                                                                                                <p className="panDesign3">breakfast</p>
                                                                                            </>
                                                                                        }
                                                                                        {inclusion.toLowerCase() == "free self parking" &&
                                                                                            <>
                                                                                                <svg id="fi_2439889" enable-background="new 0 0 512 512" height="20" viewBox="0 0 512 512" width="20" xmlns="http://www.w3.org/2000/svg"><g><path d="m326 211c0-30.327-24.673-55-55-55h-75c-5.522 0-10 4.478-10 10v90c0 5.522 4.478 10 10 10h75c30.327 0 55-24.673 55-55zm-120-35h65c19.299 0 35 15.701 35 35s-15.701 35-35 35h-65z"></path><path d="m386 211c0-63.411-51.589-115-115-115h-135c-5.522 0-10 4.478-10 10v300c0 5.522 4.478 10 10 10h60c5.522 0 10-4.478 10-10v-80h65c63.411 0 115-51.589 115-115zm-190 95c-5.522 0-10 4.478-10 10v80h-40v-280h125c52.383 0 95 42.617 95 95s-42.617 95-95 95z"></path><circle cx="256" cy="502" r="10"></circle><path d="m472 0h-432c-22.056 0-40 17.944-40 40v432c0 22.056 17.944 40 40 40h171c5.522 0 10-4.478 10-10s-4.478-10-10-10h-171c-11.028 0-20-8.972-20-20v-432c0-11.028 8.972-20 20-20h432c11.028 0 20 8.972 20 20v432c0 11.028-8.972 20-20 20h-171c-5.522 0-10 4.478-10 10s4.478 10 10 10h171c22.056 0 40-17.944 40-40v-432c0-22.056-17.944-40-40-40z"></path></g></svg>
                                                                                                <p className="panDesign3">Parking</p>
                                                                                            </>
                                                                                        }
                                                                                        {inclusion.toLowerCase() == "parking" &&
                                                                                            <>
                                                                                                <svg id="fi_2439889" enable-background="new 0 0 512 512" height="20" viewBox="0 0 512 512" width="20" xmlns="http://www.w3.org/2000/svg"><g><path d="m326 211c0-30.327-24.673-55-55-55h-75c-5.522 0-10 4.478-10 10v90c0 5.522 4.478 10 10 10h75c30.327 0 55-24.673 55-55zm-120-35h65c19.299 0 35 15.701 35 35s-15.701 35-35 35h-65z"></path><path d="m386 211c0-63.411-51.589-115-115-115h-135c-5.522 0-10 4.478-10 10v300c0 5.522 4.478 10 10 10h60c5.522 0 10-4.478 10-10v-80h65c63.411 0 115-51.589 115-115zm-190 95c-5.522 0-10 4.478-10 10v80h-40v-280h125c52.383 0 95 42.617 95 95s-42.617 95-95 95z"></path><circle cx="256" cy="502" r="10"></circle><path d="m472 0h-432c-22.056 0-40 17.944-40 40v432c0 22.056 17.944 40 40 40h171c5.522 0 10-4.478 10-10s-4.478-10-10-10h-171c-11.028 0-20-8.972-20-20v-432c0-11.028 8.972-20 20-20h432c11.028 0 20 8.972 20 20v432c0 11.028-8.972 20-20 20h-171c-5.522 0-10 4.478-10 10s4.478 10 10 10h171c22.056 0 40-17.944 40-40v-432c0-22.056-17.944-40-40-40z"></path></g></svg>
                                                                                                <p className="panDesign3">Parking</p>
                                                                                            </>
                                                                                        }
                                                                                        {inclusion.toLowerCase() == "free parking" &&
                                                                                            <>
                                                                                                <svg id="fi_2439889" enable-background="new 0 0 512 512" height="20" viewBox="0 0 512 512" width="20" xmlns="http://www.w3.org/2000/svg"><g><path d="m326 211c0-30.327-24.673-55-55-55h-75c-5.522 0-10 4.478-10 10v90c0 5.522 4.478 10 10 10h75c30.327 0 55-24.673 55-55zm-120-35h65c19.299 0 35 15.701 35 35s-15.701 35-35 35h-65z"></path><path d="m386 211c0-63.411-51.589-115-115-115h-135c-5.522 0-10 4.478-10 10v300c0 5.522 4.478 10 10 10h60c5.522 0 10-4.478 10-10v-80h65c63.411 0 115-51.589 115-115zm-190 95c-5.522 0-10 4.478-10 10v80h-40v-280h125c52.383 0 95 42.617 95 95s-42.617 95-95 95z"></path><circle cx="256" cy="502" r="10"></circle><path d="m472 0h-432c-22.056 0-40 17.944-40 40v432c0 22.056 17.944 40 40 40h171c5.522 0 10-4.478 10-10s-4.478-10-10-10h-171c-11.028 0-20-8.972-20-20v-432c0-11.028 8.972-20 20-20h432c11.028 0 20 8.972 20 20v432c0 11.028-8.972 20-20 20h-171c-5.522 0-10 4.478-10 10s4.478 10 10 10h171c22.056 0 40-17.944 40-40v-432c0-22.056-17.944-40-40-40z"></path></g></svg>
                                                                                                <p className="panDesign3">Parking</p>
                                                                                            </>
                                                                                        }
                                                                                        {inclusion.toLowerCase() == "free valet parking" &&
                                                                                            <>
                                                                                                <svg id="fi_2439889" enable-background="new 0 0 512 512" height="20" viewBox="0 0 512 512" width="20" xmlns="http://www.w3.org/2000/svg"><g><path d="m326 211c0-30.327-24.673-55-55-55h-75c-5.522 0-10 4.478-10 10v90c0 5.522 4.478 10 10 10h75c30.327 0 55-24.673 55-55zm-120-35h65c19.299 0 35 15.701 35 35s-15.701 35-35 35h-65z"></path><path d="m386 211c0-63.411-51.589-115-115-115h-135c-5.522 0-10 4.478-10 10v300c0 5.522 4.478 10 10 10h60c5.522 0 10-4.478 10-10v-80h65c63.411 0 115-51.589 115-115zm-190 95c-5.522 0-10 4.478-10 10v80h-40v-280h125c52.383 0 95 42.617 95 95s-42.617 95-95 95z"></path><circle cx="256" cy="502" r="10"></circle><path d="m472 0h-432c-22.056 0-40 17.944-40 40v432c0 22.056 17.944 40 40 40h171c5.522 0 10-4.478 10-10s-4.478-10-10-10h-171c-11.028 0-20-8.972-20-20v-432c0-11.028 8.972-20 20-20h432c11.028 0 20 8.972 20 20v432c0 11.028-8.972 20-20 20h-171c-5.522 0-10 4.478-10 10s4.478 10 10 10h171c22.056 0 40-17.944 40-40v-432c0-22.056-17.944-40-40-40z"></path></g></svg>
                                                                                                <p className="panDesign3">Valet Parking</p>
                                                                                            </>
                                                                                        }
                                                                                        {inclusion.toLowerCase() == "drinking water" &&
                                                                                            <>
                                                                                                <svg id="fi_3105761" enable-background="new 0 0 510.684 510.684" height="22" viewBox="0 0 510.684 510.684" width="20" xmlns="http://www.w3.org/2000/svg"><g><g><path d="m199.242 439.486c-49.257-15.316-82.352-60.297-82.352-111.931 0-25.238 7.901-49.283 22.85-69.536.341-.462.649-.967.906-1.481 2.47-4.939.464-10.938-4.476-13.408-4.471-2.239-9.819-.801-12.625 3.153-17.437 23.688-26.654 51.788-26.654 81.272 0 29.858 9.428 58.247 27.264 82.095 17.24 23.051 41.797 40.43 69.149 48.934.989.308 1.989.454 2.972.454 4.263 0 8.214-2.749 9.546-7.034 1.64-5.274-1.306-10.878-6.58-12.518z"></path><path d="m455.573 233.679c0-19.035-5.932-37.17-17.158-52.464l-63.301-93.971c-1.859-2.759-4.967-4.413-8.294-4.413s-6.435 1.654-8.294 4.413l-26.674 39.597-82.474-122.428c-1.858-2.759-4.967-4.413-8.293-4.413s-6.435 1.654-8.293 4.413l-141.576 210.163c-23.622 32.101-36.105 70.177-36.105 110.134 0 102.546 83.428 185.974 185.974 185.974s185.974-83.428 185.974-185.974c0-8.186-.547-16.387-1.61-24.46 18.458-16.276 30.124-40.085 30.124-66.571zm-88.753-122.949 55.005 81.654c.11.17.226.337.347.501 8.767 11.873 13.401 25.979 13.401 40.793 0 37.91-30.842 68.752-68.753 68.752-37.91 0-68.752-30.842-68.752-68.752 0-14.814 4.634-28.92 13.401-40.793.116-.157.227-.317.334-.482l28.323-42.045c.052-.077.106-.153.156-.232zm40.238 213.98c0 91.519-74.456 165.974-165.974 165.974-91.519 0-165.974-74.455-165.974-165.974 0-35.744 11.19-69.799 32.362-98.481.121-.163.238-.334.351-.509l133.262-197.822 78.711 116.842-24.571 36.476c-11.225 15.293-17.157 33.429-17.157 52.463 0 48.938 39.814 88.752 88.752 88.752 14.31 0 27.837-3.409 39.819-9.45.273 3.9.419 7.816.419 11.729z"></path><path d="m331.561 231.24c0-4.845.987-9.521 2.933-13.898 2.244-5.047-.029-10.957-5.075-13.2-5.047-2.241-10.956.028-13.2 5.075-3.091 6.952-4.658 14.361-4.658 22.023 0 18.149 9.016 35.019 24.117 45.123 1.708 1.143 3.64 1.689 5.552 1.689 3.226 0 6.392-1.558 8.32-4.439 3.071-4.591 1.84-10.802-2.75-13.873-9.542-6.385-15.239-17.039-15.239-28.5z"></path><path d="m236.343 453.34c-2.448-6.434-11.582-8.269-16.31-3.24-5.629 5.455-2.599 15.471 5.12 16.87 7.653 1.677 14.324-6.446 11.19-13.63z"></path><path d="m361.552 285.479c6.448 4.466 15.682-.472 15.55-8.31.145-7.839-9.107-12.787-15.55-8.32-5.84 3.66-5.863 12.982 0 16.63z"></path></g></g></svg>
                                                                                                <p className="panDesign3">Drinking water</p>
                                                                                            </>
                                                                                        }
                                                                                        {inclusion.toLowerCase() == "express check-in" &&
                                                                                            <>
                                                                                                <svg height="18pt" viewBox="-18 -29 574.66669 574" width="18pt" xmlns="http://www.w3.org/2000/svg" id="fi_1247000"><path d="m477.570312 32.089844h-55.558593v-21.226563c0-6.203125-5.035157-11.238281-11.238281-11.238281-6.203126 0-11.238282 5.035156-11.238282 11.238281v21.226563h-189.777344v-21.226563c0-6.203125-5.035156-11.238281-11.238281-11.238281s-11.238281 5.035156-11.238281 11.238281v21.226563h-59.304688c-33.773437.039062-61.140624 27.402344-61.179687 61.175781v187.285156c0 6.203125 5.035156 11.234375 11.238281 11.234375s11.234375-5.03125 11.234375-11.234375v-73.664062h427.007813v248.460937c-.027344 21.367188-17.339844 38.679688-38.707032 38.703125h-349.59375c-21.367187-.023437-38.679687-17.335937-38.707031-38.703125v-64.925781c0-6.203125-5.03125-11.238281-11.234375-11.238281s-11.238281 5.035156-11.238281 11.238281v64.925781c.039063 33.773438 27.40625 61.140625 61.179687 61.179688h349.59375c33.773438-.039063 61.140626-27.40625 61.179688-61.179688v-362.082031c-.039062-33.773437-27.40625-61.136719-61.179688-61.175781zm-388.300781 152.320312v-91.144531c.027344-21.367187 17.339844-38.679687 38.707031-38.703125h59.304688v30.511719c-16.921875 5.523437-27.316406 22.527343-24.519531 40.109375 2.796875 17.578125 17.957031 30.515625 35.757812 30.515625s32.960938-12.9375 35.757813-30.515625c2.796875-17.582032-7.597656-34.585938-24.519532-40.109375v-30.511719h189.777344v30.511719c-16.921875 5.523437-27.316406 22.527343-24.519531 40.109375 2.796875 17.578125 17.957031 30.515625 35.757813 30.515625 17.800781 0 32.960937-12.9375 35.757812-30.515625 2.796875-17.582032-7.597656-34.585938-24.519531-40.109375v-30.511719h55.558593c21.367188.023438 38.679688 17.335938 38.707032 38.703125v91.144531zm109.25-78.65625c7.585938 0 13.734375 6.148438 13.734375 13.734375 0 7.582031-6.148437 13.734375-13.734375 13.734375-7.582031 0-13.734375-6.152344-13.734375-13.734375.011719-7.582031 6.15625-13.726562 13.734375-13.734375zm212.253907 0c7.585937 0 13.734374 6.148438 13.734374 13.734375 0 7.582031-6.148437 13.734375-13.734374 13.734375-7.582032 0-13.734376-6.152344-13.734376-13.734375.011719-7.582031 6.15625-13.726562 13.734376-13.734375zm0 0"></path><path d="m193.070312 386.222656c-4.386718 4.390625-4.386718 11.5 0 15.890625 4.390626 4.390625 11.5 4.390625 15.890626 0l58.683593-58.683593c4.386719-4.386719 4.386719-11.5 0-15.886719l-58.683593-58.683594c-4.390626-4.390625-11.5-4.390625-15.890626 0-4.386718 4.390625-4.386718 11.5 0 15.890625l39.5 39.5h-221.332031c-6.203125 0-11.238281 5.03125-11.238281 11.234375 0 6.207031 5.035156 11.238281 11.238281 11.238281h221.332031zm0 0"></path></svg>
                                                                                                <p className="panDesign3"> Express check-in</p>
                                                                                            </>
                                                                                        }
                                                                                        {inclusion.toLowerCase() == "welcome drink" &&
                                                                                            <>
                                                                                                <svg id="fi_2907439" enable-background="new 0 0 512 512" height="20" viewBox="0 0 512 512" width="20" xmlns="http://www.w3.org/2000/svg"><g><path d="m291.89 66.15c.739.167 1.477.247 2.204.247 4.566 0 8.688-3.156 9.733-7.805l9.658-42.928c1.212-5.388-2.167-10.74-7.548-11.954-5.381-1.217-10.725 2.17-11.938 7.558l-9.658 42.928c-1.211 5.388 2.169 10.74 7.549 11.954z"></path><path d="m244.82 52.527c1.9 3.011 5.14 4.659 8.452 4.659 1.824 0 3.671-.501 5.326-1.548 4.662-2.951 6.054-9.128 3.107-13.797l-23.466-37.182c-2.946-4.669-9.115-6.06-13.778-3.112-4.662 2.951-6.054 9.128-3.107 13.797z"></path><path d="m334.916 75.605c1.825 0 3.671-.501 5.328-1.549l37.161-23.528c4.662-2.952 6.052-9.129 3.104-13.797-2.947-4.667-9.116-6.06-13.778-3.108l-37.161 23.527c-4.662 2.952-6.052 9.129-3.104 13.797 1.9 3.01 5.139 4.658 8.45 4.658z"></path><path d="m458.873 433.94-63.246-27.27-20.276-75.797c26.169-9.789 48.393-30.025 60.591-55.642 11.928-25.051 12.73-52.413 2.329-77.315-.075-.184-.688-1.62-.926-2.152l-43.475-97.377c-2.003-4.486-6.965-6.85-11.702-5.578l-95.558 25.635 1.466-14.165c.503-4.861-2.576-9.374-7.281-10.672l-31.28-8.632c-5.317-1.468-10.816 1.659-12.281 6.984s1.658 10.831 6.975 12.298l23.127 6.382-4.269 41.247c-28.364-13.023-65.602-11.632-91.279 4.869-20.803 13.369-53.869 13.587-76.225 1.432l37.327-83.575 25.216 6.769c5.325 1.431 10.804-1.734 12.232-7.07 1.428-5.335-1.733-10.818-7.06-12.249l-33.442-8.978c-4.737-1.273-9.7 1.091-11.703 5.576l-43.506 97.409c-11.354 25.457-10.852 53.667 1.414 79.434 12.199 25.626 34.435 45.875 60.609 55.671l-20.275 75.796-63.252 27.246c-11.266 4.866-18.327 16.108-17.569 27.975.756 11.851 9.207 21.509 22.055 25.203.058.017.116.033.174.048l88.419 23.702c.052.014.105.028.158.041 2.939.737 5.834 1.096 8.632 1.096 9.566 0 17.993-4.196 23.082-11.842 6.587-9.896 6.087-23.165-1.247-33.023l-41.157-55.266 20.274-75.792c5.854.983 11.788 1.473 17.73 1.473 22.037-.001 44.164-6.67 62.56-19.341 1.615-1.112 3.183-2.266 4.712-3.452 7.391 18.623 20.775 34.52 38.793 45.756 17.56 10.951 38.306 16.686 58.808 16.686 5.884 0 11.747-.477 17.509-1.434l20.276 75.799-41.158 55.269c-7.338 9.855-7.849 23.125-1.271 33.021 5.092 7.661 13.527 11.865 23.105 11.865 2.786 0 5.671-.356 8.596-1.086.057-.014.113-.029.17-.044l88.419-23.73c.056-.015.112-.031.167-.046 12.873-3.696 21.335-13.363 22.085-25.227.75-11.863-6.316-23.087-17.572-27.927zm-174.467-294.198 94.705-25.406 37.308 83.564c-22.347 12.157-55.411 11.933-76.23-1.446-16.363-10.526-38.545-15.161-60.307-13.01zm-122.951 309.606c-2.462 3.7-7.399 3.138-10.174 2.454l-88.236-23.652c-2.737-.799-7.273-2.79-7.557-7.231-.178-2.783 1.482-6.578 5.538-8.331l60.45-26.039 39.336 52.822c2.642 3.549 2.185 7.66.643 9.977zm63.461-187.337c-21.065 14.509-49.249 19.455-73.573 12.905-.001 0-.001 0-.002-.001-.001 0-.002 0-.004-.001-.001 0-.002 0-.003-.001-24.318-6.506-46.26-24.904-57.262-48.016-7.674-16.121-9.525-33.403-5.563-49.826 13.33 6.728 28.858 10.143 44.337 10.142 17.806-.001 35.538-4.504 49.731-13.625 21.446-13.784 55.922-13.6 78.276-.299l-3.628 35.054c-2.251 21.809-13.725 40.868-32.309 53.668zm65.383 41.805c-16.902-10.54-28.63-26.144-33.446-44.288 11.336-13.957 18.344-30.762 20.24-49.126l.678-6.551c18.658-2.803 37.922.616 51.627 9.433 14.21 9.132 31.948 13.639 49.763 13.639 15.472 0 30.992-3.414 44.313-10.138 3.965 16.43 2.116 33.715-5.561 49.837-11 23.103-32.927 41.487-57.249 47.988 0 0-.001 0-.002 0 0 0-.002.001-.003.001-.003.001-.006.002-.009.003-23.187 6.25-49.487 2.214-70.351-10.798zm158.63 164.029-88.232 23.68c-2.774.68-7.705 1.233-10.166-2.471-1.54-2.317-1.991-6.429.656-9.984l39.337-52.823 60.457 26.068c4.049 1.741 5.704 5.517 5.529 8.289-.279 4.447-4.834 6.44-7.581 7.241z"></path><path d="m202.696 92.983c5.516 0 9.987-4.477 9.987-10.001 0-5.523-4.471-10.001-9.987-10.001h-.058c-5.516 0-9.958 4.477-9.958 10.001.001 5.524 4.501 10.001 10.016 10.001z"></path></g></svg>
                                                                                                <p className="panDesign3">Welcome drink</p>
                                                                                            </>
                                                                                        }
                                                                                        {inclusion.toLowerCase() == "free fitness center access" &&
                                                                                            <>
                                                                                                <svg id="fi_4329323" enable-background="new 0 0 512 512" height="15" viewBox="0 0 512 512" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m502 220.341h-37.223v-54.073c0-14.606-11.883-26.489-26.489-26.489h-21.086c-2.758 0-5.419.424-7.922 1.21-3.578-10.399-13.458-17.891-25.056-17.891h-33.405c-14.606 0-26.489 11.883-26.489 26.488v70.756h-145.256v-70.756c0-14.605-11.883-26.488-26.489-26.488h-33.405c-11.598 0-21.479 7.493-25.056 17.891-2.502-.786-5.163-1.21-7.922-1.21h-21.086c-14.606 0-26.489 11.883-26.489 26.489v54.073h-28.627c-5.523 0-10 4.478-10 10v51.318c0 5.522 4.477 10 10 10h28.627v54.073c0 14.606 11.883 26.489 26.489 26.489h21.086c2.758 0 5.419-.424 7.922-1.21 3.578 10.399 13.458 17.891 25.056 17.891h33.405c14.606 0 26.489-11.883 26.489-26.488v-70.756h145.256v70.756c0 14.605 11.883 26.488 26.489 26.488h33.405c11.598 0 21.478-7.493 25.056-17.891 2.502.786 5.163 1.21 7.922 1.21h21.086c14.606 0 26.489-11.883 26.489-26.489v-54.073h37.223c5.522 0 10-4.478 10-10v-51.318c0-5.523-4.478-10-10-10zm-482 51.318v-31.318h18.627v31.318zm66.202 80.563h-21.086c-3.578 0-6.489-2.911-6.489-6.489v-179.465c0-3.578 2.911-6.489 6.489-6.489h21.086c3.578 0 6.489 2.911 6.489 6.489v179.465c0 3.578-2.911 6.489-6.489 6.489zm72.872 10.193c0 3.577-2.911 6.488-6.489 6.488h-33.405c-3.578 0-6.489-2.911-6.489-6.488v-212.83c0-3.577 2.911-6.488 6.489-6.488h33.405c3.578 0 6.489 2.911 6.489 6.488zm20-90.756v-31.318h145.256v31.318zm211.639 90.756c0 3.577-2.91 6.488-6.488 6.488h-33.405c-3.578 0-6.489-2.911-6.489-6.488v-212.83c0-3.577 2.911-6.488 6.489-6.488h33.405c3.578 0 6.488 2.911 6.488 6.488zm54.064-16.683c0 3.578-2.911 6.489-6.489 6.489h-21.086c-3.578 0-6.489-2.911-6.489-6.489v-179.464c0-3.578 2.911-6.489 6.489-6.489h21.086c3.578 0 6.489 2.911 6.489 6.489zm47.223-74.073h-27.223v-31.318h27.223z"></path></svg>
                                                                                                <p className="panDesign3">Free Gym</p>
                                                                                            </>
                                                                                        }


                                                                                    </div>
                                                                                </div>
                                                                            ))}
                                                                        </div>

                                                                    </div>
                                                                </div>

                                                                <div className="priceBookHotel">
                                                                    <div className="priceBookHotelOne ">
                                                                        <span><del> ₹{result?.min_rate?.price + Math.floor(Math.random() * (1200 - 700 + 1)) + 700}</del></span>
                                                                        <span>Offer Price</span>
                                                                        <p>₹{result?.min_rate?.price}</p>
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
                                                    {/* <img src={hotelFilter} alt="filter" />
                                                        <h1>Result not found</h1> */}
                                                </div>
                                            )
                                    }
                                </InfiniteScroll>
                            </div>

                        )}

                    </div>
                </div>
            </section>

        </>
    );
}




