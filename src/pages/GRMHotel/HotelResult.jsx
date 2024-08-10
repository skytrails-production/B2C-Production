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
// import InfiniteScroll from "react-infinite-scroll-component";
import "./hotelresult.scss"
import dayjs from "dayjs";
import freeWifi from "./SVGs/freeWifi.svg"
import freeBreakfast from "./SVGs/freeBreakfast.svg"
import freeParking from "./SVGs/freeParking.svg"
import drinkingWater from "./SVGs/DrinkingWater.svg"
import expressCheckin from "./SVGs/expressCheckin.svg"
import welcomeDrink from "./SVGs/welcomeDrink.svg"
import freeGym from "./SVGs/freeGym.svg"
import SkeletonHotelResult from "./Skeletons/SkeletonHotelResult";
import HotelResultCard from "./HotelResultCard";

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

    console.log(hotels, "hotels")

    let filteredHotels = hotels?.filter((hotel) => {

        // Hide hotels with empty category or category less than 3
        if (!hotel.category || hotel.category < 3) {
            return false;
        }
        if (!hotel.images.url) {
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


    // Sort filtered hotels based on price only if sortBy is selected
    if (sortBy === "lowToHigh") {
        filteredHotels.sort((a, b) => a.min_rate.price - b.min_rate.price);
    } else if (sortBy === "highToLow") {
        filteredHotels.sort((a, b) => b.min_rate.price - a.min_rate.price);
    }

    // const [currentPage, setCurrentPage] = useState(1);
    // const searchId = reducerState?.hotelSearchResultGRN?.ticketData
    //     ?.data?.data?.search_id;


    // const fetchMoreData = () => {
    //     setCurrentPage((pre) => pre + 1)
    // }

    useEffect(() => {
        dispatch(clearHotelRoomAndGallery())
    }, [])



    useEffect(() => {
        if (reducerState?.hotelSearchResultGRN?.onlyHotels?.length > 0) {
            setHasMore(reducerState?.hotelSearchResultGRN?.hasMore)
            setLoader(false);
        }
    }, [reducerState?.hotelSearchResultGRN?.onlyHotels, reducerState?.hotelSearchResultGRN])


    // const handlePageChangeScrroll = () => {
    //     dispatch(hotelActionGRN(grnPayload, currentPage));
    // };
    // useEffect(() => {
    //     handlePageChangeScrroll()
    // }, [currentPage])


    const handleClick = (item) => {
        // setMainLoader(true);

        const payload = {

            "data": {
                "rate_key": item?.min_rate?.rate_key,
                "group_code": item?.min_rate?.group_code,
            },
            "searchID": item?.search_id,
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



    return (


        <div className='row g-4'>
            {filteredHotels?.length > 0 &&
                filteredHotels
                    ?.map((result, index) => (

                        <div key={index} className="col-lg-6">
                            <HotelResultCard
                                result={result}
                            />
                        </div>

                    ))}
        </div>
    );
}




