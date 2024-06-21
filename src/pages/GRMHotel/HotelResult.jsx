import React, { useEffect, useState } from "react";
import hotelNotFound from "../../images/hotelNotFound.jpg"
import Divider from "@mui/material/Divider";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import starsvg from "../../images/star.svg"
import starBlank from "../../images/starBlank.svg"
import hotelFilter from "../../images/hotelFilter.png";
import { Skeleton, Space } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { MdCancel } from "react-icons/md";
import { MdOutlineFreeBreakfast } from "react-icons/md";
import { clearHotelRoomAndGallery, hotelActionGRN, hotelGalleryRequest, singleHotelGRN } from "../../Redux/HotelGRN/hotel";
import "./hotelResult.css"
import Hotelmainloading from "../Hotel/hotelLoading/Hotelmainloading";
import GrmHotelform2 from "./GrmHotelform2";
import InfiniteScroll from "react-infinite-scroll-component";
import dayjs from "dayjs";

const variants = {
    initial: {
        y: 0,
        opacity: 1,
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

    // useEffect(() => {
    //     if (reducerState?.hotelSearchResultGRN?.hotelDetails?.status === 200 && reducerState?.hotelSearchResultGRN?.hotelGallery?.data?.data) {
    //         navigate("/st-hotel/hotelresult/selectroom")
    //         setFirstLoader(false)
    //         setMainLoader(false);

    //     }
    // }, [reducerState?.hotelSearchResultGRN?.hotelDetails?.status || reducerState?.hotelSearchResultGRN?.hotelGallery?.data?.data?.images])



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


    // const handleSortChange = (event) => {
    //     setSortOption(event.target.value);
    // };

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
        // ?.sort((a, b) =>
        //     sortOption === "lowToHigh"
        //         ? a?.min_rate?.price - b?.min_rate?.price
        //         : b?.min_rate?.price - a?.min_rate?.price
        // );
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




    return (
        <>

            <section className="">
                <div className='mainimgHotelSearchResult'>
                    {/* <Navbar /> */}
                    {/* <BigNavbar /> */}
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

                        {/* for bigger device  */}

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
                                                                            {/* <span className="">
                                                                                    {result?.min_rate?.cancellation_policy?.cancel_by_date ? `cancellation till ${dayjs(result?.min_rate?.cancellation_policy?.cancel_by_date).format("DD MMM, YY")}` : ""}
                                                                                </span> */}


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




