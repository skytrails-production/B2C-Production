import React, { useState, useEffect } from 'react'
import HotelResult from './HotelResult'
import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { FaPen } from "react-icons/fa";
import HotelFilterBox from './HotelFilterBox';
import SkeletonHotelResult from "./Skeletons/SkeletonHotelResult"
import SkeletonHotelResultFilter from "./Skeletons/SkeletonHotelResultFilter"
import GrmHotelform2 from './GrmHotelform2';


const HotelResultMain = () => {

    // const navigate = useNavigate();
    const reducerState = useSelector((state) => state);
    const [loader, setLoader] = useState(true);
    const [hotelData, setHotelData] = useState([])


    useEffect(() => {
        if (reducerState?.hotelSearchResultGRN?.onlyHotels?.length > 0) {
            setHotelData(reducerState?.hotelSearchResultGRN?.onlyHotels)
            setLoader(false)
        }
    }, [reducerState?.hotelSearchResultGRN?.onlyHotels, reducerState?.hotelSearchResultGRN])

    // const getUniqueFacilities = (hotels) => {
    //     console.log(hotels, "hotels")
    //     const allFacilities = hotels?.flatMap((hotel) =>
    //         hotel?.facilities?.split(";")?.map((facility) => facility?.trim())
    //     );
    //     return Array.from(new Set(allFacilities));
    // };
    const getUniqueFacilities = (hotels) => {
        const allFacilities = hotels?.flatMap((hotel) =>
            hotel?.facilities
                ?.split(";")
                ?.map((facility) => facility.trim())
                ?.filter((facility) => facility) // Remove empty facilities
        );
        return Array.from(new Set(allFacilities));
    };

    const getMinMaxPrices = (hotels) => {
        const validHotels = hotels.filter(
            (hotel) => hotel && hotel.min_rate && hotel.min_rate.price
        );

        if (validHotels.length === 0) {
            return { min: 0, max: 0 };
        }

        const prices = validHotels.map((hotel) => hotel.min_rate.price);
        return {
            min: Math.min(...prices),
            max: Math.max(...prices),
        };
    };

    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedFacilities, setSelectedFacilities] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 0]);
    const [sortBy, setSortBy] = useState(null); // No initial sorting
    const [searchTerm, setSearchTerm] = useState("");
    const [errors, setErrors] = useState(false)

    const uniqueFacilities = getUniqueFacilities(hotelData);
    const { min, max } = getMinMaxPrices(hotelData);

    useEffect(() => {
        setPriceRange([min, max]);
    }, [min, max]);

    const handleCategoryChange = (categories) => {
        setSelectedCategories(categories);
    };

    const handleFacilityChange = (facilities) => {
        setSelectedFacilities(facilities);
    };

    const handlePriceChange = (value) => {
        setPriceRange(value);
    };

    const handleSortChange = (sort) => {
        setSortBy(sort);
    };

    const handleSearchTermChange = (term) => {
        setSearchTerm(term);
    };

    const handleClearFilters = () => {
        setSelectedCategories([]);
        setSelectedFacilities([]);
        setPriceRange([min, max]);
        setSortBy(null);
        setSearchTerm("");
    };





    // console.log(reducerState, "reducer state, dfdfd")




    useEffect(() => {
        if (reducerState?.hotelSearchResultGRN?.ticketData?.data?.data?.errors?.[0]?.code == "1501") {
            setErrors(true);
        }

    }, [reducerState?.hotelSearchResultGRN?.ticketData?.data?.data])


    return (
        <div>
            <div className='mainimgHotelSearchResult'>
                <GrmHotelform2 />
                <div className="container searchMainBoxAbs">
                    <div className="HotelResultSearchBarBox">


                    </div>
                </div>
            </div>

            <div className="container">
                {
                    errors ?
                        <div className="row">
                            <div className='noHotels'>
                                <h3>No result found for the requested search criteria !</h3>
                                <p>Please Modify Your search <FaPen /></p>
                            </div>
                        </div>
                        :
                        <div className="row">
                            <div className=" col-lg-3 col-md-3 pt-4">
                                {
                                    loader ?
                                        <SkeletonHotelResultFilter />
                                        :

                                        <HotelFilterBox
                                            uniqueFacilities={uniqueFacilities}
                                            onCategoryChange={handleCategoryChange}
                                            onFacilityChange={handleFacilityChange}
                                            onPriceChange={handlePriceChange}
                                            onSortChange={handleSortChange}
                                            onSearchTermChange={handleSearchTermChange}
                                            onClearFilters={handleClearFilters}
                                            minPrice={min}
                                            maxPrice={max}
                                            searchTerm={searchTerm}
                                            selectedCategories={selectedCategories}
                                            selectedFacilities={selectedFacilities}
                                            priceRange={priceRange}
                                            sortBy={sortBy}
                                        />
                                }
                            </div>


                            <div className=" col-lg-9 col-md-12 pt-4">
                                {
                                    loader ?
                                        <SkeletonHotelResult />
                                        :
                                        <HotelResult
                                            hotels={hotelData}
                                            selectedCategories={selectedCategories}
                                            selectedFacilities={selectedFacilities}
                                            priceRange={priceRange}
                                            sortBy={sortBy}
                                            searchTerm={searchTerm}
                                        />
                                }
                            </div>

                        </div>
                }
            </div>



        </div>
    )
}

export default HotelResultMain
