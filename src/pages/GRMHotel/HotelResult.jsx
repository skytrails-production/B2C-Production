import React, { useEffect, useState } from "react";
import hotelNotFound from "../../images/hotelNotFound.jpg"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import starsvg from "../../images/star.svg"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdCancel } from "react-icons/md";
import { MdOutlineFreeBreakfast } from "react-icons/md";
import { clearHotelRoomAndGallery, hotelActionGRN, hotelGalleryRequest, singleHotelGRN } from "../../Redux/HotelGRN/hotel";
import "./hotelResult.css"
import InfiniteScroll from "react-infinite-scroll-component";
import dayjs from "dayjs";
import freeWifi from "./SVGs/freeWifi.svg"
import freeBreakfast from "./SVGs/freeBreakfast.svg"
import freeParking from "./SVGs/freeParking.svg"
import drinkingWater from "./SVGs/DrinkingWater.svg"
import expressCheckin from "./SVGs/expressCheckin.svg"
import welcomeDrink from "./SVGs/welcomeDrink.svg"
import freeGym from "./SVGs/freeGym.svg"
import SkeletonHotelResult from "./Skeletons/SkeletonHotelResult";

export default function HotelResult({
    hotels,
    selectedCategories,
    selectedFacilities,
    priceRange,
    sortBy,
    searchTerm,
}) {

    const navigate = useNavigate();
    const reducerState = useSelector((state) => state);
    const dispatch = useDispatch();
    const [hasMore, setHasMore] = useState(true);
    const grnPayload = JSON.parse(sessionStorage.getItem('grnPayload'));
    const [loader, setLoader] = useState(true)


    // console.log(reducerState, "reducer state, dfdfd")

    let filteredHotels = hotels?.filter((hotel) => {

        // Hide hotels with empty category or category less than 3
        if (!hotel.category || hotel.category < 3) {
            return false;
        }
        // Filter by search term
        if (
            searchTerm &&
            !hotel.name.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
            return false;
        }
        // Hide hotels with no facilities
        if (hotel.facilities == undefined) {
            return false;
        }

        // Filter by selected categories
        if (
            selectedCategories.length > 0 &&
            !selectedCategories.includes(hotel.category)
        ) {
            return false;
        }

        // Filter by selected facilities
        if (selectedFacilities?.length > 0) {
            const hotelFacilities = hotel?.facilities?.split(";")
                ?.map((facility) => facility?.trim());
            if (
                !selectedFacilities?.every((facility) =>
                    hotelFacilities?.includes(facility)
                )
            ) {
                return false;
            }
        }

        // Filter by price range
        if (
            hotel.min_rate &&
            hotel.min_rate.price >= priceRange[0] &&
            hotel.min_rate.price <= priceRange[1]
        ) {
            return true;
        }

        return false;
    });



    // console.log(filteredHotels, "filtered hotels")

    // Sort filtered hotels based on price only if sortBy is selected
    if (sortBy === "lowToHigh") {
        filteredHotels.sort((a, b) => a.min_rate.price - b.min_rate.price);
    } else if (sortBy === "highToLow") {
        filteredHotels.sort((a, b) => b.min_rate.price - a.min_rate.price);
    }

    const [currentPage, setCurrentPage] = useState(1);
    const searchId = reducerState?.hotelSearchResultGRN?.ticketData
        ?.data?.data?.search_id;

    // const [mainLoader, setMainLoader] = useState(false)

    const fetchMoreData = () => {
        setCurrentPage((pre) => pre + 1)
    }

    useEffect(() => {
        dispatch(clearHotelRoomAndGallery())
    }, [])



    useEffect(() => {
        if (reducerState?.hotelSearchResultGRN?.onlyHotels?.length > 0) {
            setHasMore(reducerState?.hotelSearchResultGRN?.hasMore)
            setLoader(false);
        }
    }, [reducerState?.hotelSearchResultGRN?.onlyHotels, reducerState?.hotelSearchResultGRN])


    const handlePageChangeScrroll = () => {
        dispatch(hotelActionGRN(grnPayload, currentPage));
    };
    useEffect(() => {
        handlePageChangeScrroll()
    }, [currentPage])


    const handleClick = (item) => {
        // setMainLoader(true);
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




    let totalAdults = 0;
    let totalChildren = 0;

    hotels?.RoomGuests?.forEach((room) => {
        totalAdults += room?.NoOfAdults || 0;
        totalChildren += room?.NoOfChild || 0;
    });


    // const storedFormData = JSON.parse(sessionStorage.getItem('hotelFormData'));


    return (
        <section className="">

            {
                loader ?
                    <SkeletonHotelResult />
                    :
                    // <InfiniteScroll
                    //     dataLength={filteredHotels?.length}
                    //     next={fetchMoreData}
                    //     hasMore={hasMore}
                    //     loader={<div className="col-4 offset-lg-4 loaderHotelFetching" >
                    //         <span className='loaderFetching'></span>
                    //     </div>}
                    //     endMessage={<p style={{ textAlign: 'center' }}><b>No More Result !</b></p>}
                    // >

                    <>
                        {
                            // sortedAndFilteredResults
                            filteredHotels
                                ?.length > 0 ? (
                                filteredHotels
                                    ?.map((result, index) => {
                                        // const hotelCode = result?.hotel_code;
                                        return (
                                            <div className="col-lg-12" >

                                                <div onClick={() => handleClick(result)} className="hotelResultBoxSearch" key={index}>
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
                                                                                    <img src={freeWifi} alt="wifi" />
                                                                                    <p className="panDesign3">Free WiFi</p>
                                                                                </>

                                                                            }
                                                                            {inclusion.toLowerCase() == "free internet" &&
                                                                                <>
                                                                                    <img src={freeWifi} alt="wifi" />
                                                                                    <p className="panDesign3">Free internet</p>
                                                                                </>

                                                                            }
                                                                            {inclusion.toLowerCase() == "free breakfast" &&
                                                                                <>
                                                                                    <img src={freeBreakfast} alt="wifi" />
                                                                                    <p className="panDesign3">Free Breakfast</p>
                                                                                </>
                                                                            }
                                                                            {inclusion.toLowerCase() == "breakfast" &&
                                                                                <>
                                                                                    <img src={freeBreakfast} alt="wifi" />
                                                                                    <p className="panDesign3">Breakfast</p>
                                                                                </>
                                                                            }
                                                                            {inclusion.toLowerCase() == "continental breakfast" &&
                                                                                <>
                                                                                    <img src={freeBreakfast} alt="wifi" />

                                                                                    <p className="panDesign3">Continental breakfast</p>
                                                                                </>
                                                                            }
                                                                            {inclusion.toLowerCase() == "free self parking" &&
                                                                                <>
                                                                                    <img src={freeParking} alt="wifi" />
                                                                                    <p className="panDesign3"> Free self parking</p>
                                                                                </>
                                                                            }
                                                                            {inclusion.toLowerCase() == "parking" &&
                                                                                <>
                                                                                    <img src={freeParking} alt="wifi" />
                                                                                    <p className="panDesign3"> Free Parking</p>
                                                                                </>
                                                                            }
                                                                            {inclusion.toLowerCase() == "free parking" &&
                                                                                <>
                                                                                    <img src={freeParking} alt="wifi" />
                                                                                    <p className="panDesign3"> Free Parking</p>
                                                                                </>
                                                                            }
                                                                            {inclusion.toLowerCase() == "free valet parking" &&
                                                                                <>
                                                                                    <img src={freeParking} alt="wifi" />

                                                                                    <p className="panDesign3"> Free Valet Parking</p>
                                                                                </>
                                                                            }
                                                                            {inclusion.toLowerCase() == "drinking water" &&
                                                                                <>
                                                                                    <img src={drinkingWater} alt="wifi" />
                                                                                    <p className="panDesign3"> Drinking water</p>
                                                                                </>
                                                                            }
                                                                            {inclusion.toLowerCase() == "express check-in" &&
                                                                                <>
                                                                                    <img src={expressCheckin} alt="wifi" />
                                                                                    <p className="panDesign3"> Express check-in</p>
                                                                                </>
                                                                            }
                                                                            {inclusion.toLowerCase() == "welcome drink" &&
                                                                                <>

                                                                                    <img src={welcomeDrink} alt="wifi" />
                                                                                    <p className="panDesign3">Welcome drink</p>
                                                                                </>
                                                                            }
                                                                            {inclusion.toLowerCase() == "free fitness center access" &&
                                                                                <>
                                                                                    <img src={freeGym} alt="wifi" />
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
                                                            <div className="emiBOx" onClick={(e) => {
                                                                e.stopPropagation()
                                                                const payload = {
                                                                    "amount": result?.min_rate?.price,
                                                                    "travelType": "Hotel"
                                                                }
                                                                const payloadString = JSON.stringify(payload);
                                                                sessionStorage.setItem("payLaterProps", payloadString);
                                                                navigate("/payLaterDetails");
                                                            }}>
                                                                <span>Book Now At</span>
                                                                <p style={{ fontSize: "12px" }}>
                                                                    {
                                                                        (result?.min_rate?.price).toFixed(0) <= 5000
                                                                            ? (result?.min_rate?.price / 3).toFixed(0)
                                                                            : (result?.min_rate?.price <= 50000
                                                                                ? (result?.min_rate?.price / 6).toFixed(0)
                                                                                : (result?.min_rate?.price / 12).toFixed(0))
                                                                    }/Month →
                                                                </p>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
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
                    </>
                // </InfiniteScroll>
            }

        </section>
    );
}




