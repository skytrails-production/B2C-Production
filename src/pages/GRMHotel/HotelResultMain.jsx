import React, { useState, useEffect } from 'react'
import HotelResult from './HotelResult'
import { useSelector } from "react-redux";
import { FaPen } from "react-icons/fa";
import HotelFilterBox from './HotelFilterBox';
import { EditOutlined } from '@ant-design/icons';
import GrmHotelform2 from './GrmHotelform2';
import HolidayResultSkeleton from '../NewPackagePages/HolidayPackageSearchResult/holidayresultSkeletonPage/HolidayResultSkeleton';
import HotelMobileFilter from './HotelMobileFilter';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { apiURL } from '../../Constants/constant';


const HotelResultMain = () => {

    // const navigate = useNavigate();
    const reducerState = useSelector((state) => state);
    // console.log(reducerState, "reducerState")
    const [loader, setLoader] = useState(true);
    const [hotelData, setHotelData] = useState([])
    const navigate = useNavigate();
    const grnPayload = JSON.parse(sessionStorage.getItem('revisithotel'));
    const cityCode = JSON.parse(sessionStorage.getItem('grnPayload'));



    useEffect(() => {
        if (reducerState?.hotelSearchResultGRN?.ticketData?.data?.data?.hotels?.length > 0) {
            setHotelData(reducerState?.hotelSearchResultGRN?.ticketData?.data?.data?.hotels)
            setLoader(false)
        }
    }, [reducerState?.hotelSearchResultGRN?.ticketData])

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
    const [sortBy, setSortBy] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [errors, setErrors] = useState(false)

    const [locations, setLocations] = useState([]);
    const [selectedLocations, setSelectedLocations] = useState([]);

    const uniqueFacilities = getUniqueFacilities(hotelData);
    const { min, max } = getMinMaxPrices(hotelData);

    useEffect(() => {
        setPriceRange([min, max]);
    }, [min, max]);

    useEffect(() => {
        // Fetch location data from API
        fetch(
            `${apiURL.baseURL}/skyTrails/grnconnect/locationamelist?cityCode=${cityCode?.cityCode}`
        )
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setLocations(data.data);
                }
            })
            .catch((error) => console.error("Error fetching locations:", error));
    }, []);

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

    const handleLocationChange = (locations) => setSelectedLocations(locations);



    const handleClearFilters = () => {
        setSelectedCategories([]);
        setSelectedFacilities([]);
        setPriceRange([min, max]);
        setSortBy(null);
        setSearchTerm("");
        setSelectedLocations([]);
    };




    useEffect(() => {
        if (reducerState?.hotelSearchResultGRN?.ticketData?.data?.data?.errors?.[0]?.code == "1501") {
            setErrors(true);
        }
        if (reducerState?.hotelSearchResultGRN?.ticketData?.data?.data?.errors?.[0]?.code == "5111") {
            setErrors(true);
        }
        else {
            setErrors(false)
        }

    }, [reducerState?.hotelSearchResultGRN?.ticketData?.data?.data])



    if (loader) {
        return <HolidayResultSkeleton />
    }



    let totalAdults = 0;
    let totalChildren = 0;


    grnPayload?.[0]?.rooms?.forEach((room) => {
        totalAdults += room?.adults || 0;
        totalChildren += room?.children_ages.length || 0;
    });



    return (
        <div>
            <div className='mainimgHotelSearchResult visibleBigHotel'>
                <GrmHotelform2 />
                <div className="container searchMainBoxAbs">
                    <div className="HotelResultSearchBarBox">
                    </div>
                </div>
            </div>
            <div className=' visibleSmall stickyHotelDetails' >
                <section style={{ borderTop: "1px solid lightgray", background: "white" }}>
                    <div className="container ">
                        <div className='smallHotelEditBox'>
                            <div className='smallHotelEditDetails'>
                                <p>{grnPayload?.[0]?.cityName}</p>
                                <span>{dayjs(grnPayload?.[0]?.checkin).format("DD MMM")}-{dayjs(grnPayload?.[0]?.checkout).format("DD MMM")} | {grnPayload?.[0]?.rooms?.length} {grnPayload?.[0]?.rooms.length == 0 ? "Room" : "Rooms"} | {Number(totalAdults) + Number(totalChildren)} Guests</span>
                            </div>
                            <div onClick={() => { navigate("/st-hotel") }}>
                                <EditOutlined />
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {
                loader ? <HolidayResultSkeleton />
                    :
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
                                <div className="row pt-4">
                                    <div className=" col-lg-3 visibleBig p-0">
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
                                            onLocationChange={handleLocationChange}
                                            locations={locations}
                                            selectedLocations={selectedLocations}
                                        />

                                    </div>


                                    <div className="col-lg-12 visibleSmall stikcyHotelFilter">
                                        <HotelMobileFilter
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
                                    </div>


                                    <div className=" col-lg-9 col-md-12 ">

                                        <HotelResult
                                            hotels={hotelData}
                                            selectedCategories={selectedCategories}
                                            selectedFacilities={selectedFacilities}
                                            priceRange={priceRange}
                                            sortBy={sortBy}
                                            searchTerm={searchTerm}
                                            selectedLocations={selectedLocations} // Pass selected locations
                                        />

                                    </div>

                                </div>
                        }
                    </div>

            }

        </div>
    )
}

export default HotelResultMain
