import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { clearHotelRoomAndGallery } from "../../Redux/HotelGRN/hotel";
import "./hotelResult.css";
import "./hotelresult.scss";
import { FaPen } from "react-icons/fa";
import HotelResultCard from "./HotelResultCard";
import HotelResultSkeleton from "./HotelResultSkeleton";

export default function HotelResult({
    hotels,
    selectedCategories,
    selectedFacilities,
    priceRange,
    sortBy,
    searchTerm,
    selectedLocations,
}) {

    const dispatch = useDispatch();
    const [loader, setLoader] = useState(true);
    const [tooManyFilter, setToomanyFilter] = useState(false);
    const [isFilterApplied, setIsFilterApplied] = useState(false);


    useEffect(() => {

        if (
            selectedCategories.length > 0 ||
            selectedFacilities.length > 0 ||
            priceRange[0] !== 0 ||
            priceRange[1] !== Infinity ||
            searchTerm
        ) {
            setIsFilterApplied(true);
        } else {
            setIsFilterApplied(false);
        }
    }, [selectedCategories, selectedFacilities, priceRange, searchTerm]);


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
        if (hotel.facilities === undefined) {
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
            // console.log(hotelFacilities, "hotel facility")
            if (
                !selectedFacilities?.every((facility) =>
                    hotelFacilities?.includes(facility)
                )
            ) {
                return false;
            }
        }

        if (selectedLocations.length > 0) {
            const locationMatch = selectedLocations.some(
                (location) =>
                    hotel.name.includes(location) || hotel.address.includes(location)
            );
            if (!locationMatch) {
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



    if (sortBy === "lowToHigh") {
        filteredHotels.sort((a, b) => a.min_rate.price - b.min_rate.price);
    } else if (sortBy === "highToLow") {
        filteredHotels.sort((a, b) => b.min_rate.price - a.min_rate.price);
    }

    useEffect(() => {
        dispatch(clearHotelRoomAndGallery());
    }, []);

    useEffect(() => {
        if (filteredHotels.length > 0) {
            setLoader(false)
        }
    }, [filteredHotels])


    useEffect(() => {
        if (hotels?.length !== 0 && filteredHotels?.length === 0 && isFilterApplied) {
            setToomanyFilter(true);
        } else {
            setToomanyFilter(false);
        }
    }, [hotels, filteredHotels]);

    let totalAdults = 0;
    let totalChildren = 0;

    hotels?.RoomGuests?.forEach((room) => {
        totalAdults += room?.NoOfAdults || 0;
        totalChildren += room?.NoOfChild || 0;
    });


    return (
        <>

            {
                loader ?
                    (
                        <HotelResultSkeleton />
                    ) :

                    (

                        <>
                            {
                                tooManyFilter ?
                                    <div className="col-lg-9">
                                        <div className='noHotels'>
                                            <h3>Too many filter Applied !</h3>
                                            <p>Please remove some <FaPen /></p>
                                        </div>
                                    </div>
                                    :
                                    <div className="row g-4">
                                        {filteredHotels?.length > 0 &&
                                            filteredHotels.map((result, index) => (
                                                <div key={index} className="col-lg-6">
                                                    <HotelResultCard
                                                        result={result}
                                                    />
                                                </div>
                                            ))}
                                    </div>
                            }
                        </>
                    )
            }

        </>


    );
}
