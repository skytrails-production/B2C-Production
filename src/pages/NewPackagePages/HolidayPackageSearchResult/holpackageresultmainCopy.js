import React, { useState, useEffect } from "react";
import PackageResultFilter from './PackageResultFilter';
import HolidayResult from './HolidayResult';
import "./holidayResult.scss"
import { useNavigate, useParams } from "react-router-dom";
import { apiURL } from "../../../Constants/constant";
import { useDispatch, useSelector } from "react-redux";
import { searchPackageAction } from "../../../Redux/SearchPackage/actionSearchPackage";
import PackageResultFilterMobile from "./PackageResultFilterMobile";

const HolidayPackageResultMain = () => {
    // const [Package, setPackage] = useState([]);
    const reducerState = useSelector((state) => state);
    const [priceRange, setPriceRange] = useState([0, 0]);
    const [selectedTag, setSelectedTag] = useState(null);
    const [selectedDays, setSelectedDays] = useState([]);
    const PackageData =
        reducerState?.searchResult?.packageSearchResult?.data?.data?.pakage;
    const [searchTerm, setSearchTerm] = useState("");
    const [Package, setPackage] = useState(PackageData)
    const [selectedDestinations, setSelectedDestinations] = useState([]);
    // const [loading, setLoading] = useState(false);
    const { keyword } = useParams();
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(searchPackageAction(keyword));
        sessionStorage.setItem("searchPackageData", JSON.stringify(keyword));
    }, []);

    useEffect(() => {
        setPackage(PackageData)
    }, [reducerState?.searchResult?.packageSearchResult?.data?.data?.pakage])



    const uniqueDestinations = Package?.length > 0 ? [
        ...new Set(
            Package?.flatMap((pkg) => pkg.destination?.map((dest) => dest.addMore))
        )
    ] : [];


    // console.log(Package, "package")

    const handleFilterChange = (selectedDestinations, tag, days) => {


        let filtered = Package;

        if (selectedDestinations.length > 0) {
            filtered = filtered.filter((pkg) =>
                selectedDestinations.every((dest) =>
                    pkg.destination.some((d) => d.addMore === dest)
                )
            );
        }

        if (tag) {
            filtered = filtered?.filter((pkg) =>
                pkg.select_tags?.some((t) => t[tag] === true)
            );
        }

        if (days?.length > 0) {
            console.log(days, "days")
            filtered = filtered.filter((pkg) => {
                const daysInRange = days?.some((range) => {
                    switch (range) {
                        case "0-5":
                            return pkg.days >= 0 && pkg.days <= 5;
                        case "5-7":
                            return pkg.days >= 5 && pkg.days <= 7;
                        case "7-10":
                            return pkg.days >= 7 && pkg.days <= 10;
                        case "10+":
                            return pkg.days >= 10;
                        default:
                            return false;
                    }
                });
                return daysInRange;
            });
        }

        setPackage(filtered);
    };

    const getMinMaxPrices = (Pack) => {

        if (Package == undefined) {
            return;
        }
        // console.log("fjfdjk")



        const validPackage = Pack?.filter((pkg) => pkg && pkg?.pakage_amount?.amount);

        if (validPackage?.length === 0) {
            return { min: 0, max: 0 };
        }

        const prices = validPackage?.map((pkg) => pkg.pakage_amount.amount);
        // console.log(prices, "prices")
        return {
            min: Math.min(...prices),
            max: Math.max(...prices),
        };
    };

    const { min, max } = Package != undefined && getMinMaxPrices(Package);

    useEffect(() => {
        setPriceRange([min, max]);
    }, [min, max]);

    const handlePriceChange = (value) => {
        setPriceRange(value);
    };

    const handleTagChange = (value) => {
        setSelectedTag(value);
    };

    const handleDaysChange = (value) => {
        setSelectedDays((prev) =>
            prev.includes(value) ? prev?.filter((v) => v !== value) : [...prev, value]
        );
    };

    const handleSearchTermChange = (term) => {
        setSearchTerm(term);
    };


    // console.log(selectedDestinations, "selectedDestinations")

    console.log(Package, "package")

    const handleClearFilters = () => {
        console.log("hit")
        setPackage(PackageData);
        setPriceRange([min, max]);
        setSelectedTag(null);
        setSelectedDays([]);
        setSearchTerm("");
        setSelectedDestinations([]); // Add this line
    };


    return (
        <div>

            <div className="container marginLg">
                <div className="row">
                    <div className="col-lg-3 visibleBig p-0">
                        <PackageResultFilter
                            uniqueDestinations={uniqueDestinations}
                            onFilterChange={handleFilterChange}
                            onPriceChange={handlePriceChange}
                            minPrice={min}
                            maxPrice={max}
                            priceRange={priceRange}
                            selectedTag={selectedTag}
                            onTagChange={handleTagChange}
                            selectedDays={selectedDays}
                            onDaysChange={handleDaysChange}
                            onSearchTermChange={handleSearchTermChange}
                            selectedDestinations={selectedDestinations}
                            setSelectedDestinations={setSelectedDestinations}
                            onClearFilters={handleClearFilters}
                        />
                    </div>

                    <div className="col-lg-12 visibleSmall stickyForMobile ">

                        <PackageResultFilterMobile
                            uniqueDestinations={uniqueDestinations}
                            onFilterChange={handleFilterChange}
                            onPriceChange={handlePriceChange}
                            minPrice={min}
                            maxPrice={max}
                            priceRange={priceRange}
                            selectedTag={selectedTag}
                            onTagChange={handleTagChange}
                            selectedDays={selectedDays}
                            onDaysChange={handleDaysChange}
                            onSearchTermChange={handleSearchTermChange}
                            selectedDestinations={selectedDestinations}
                            setSelectedDestinations={setSelectedDestinations}
                            onClearFilters={handleClearFilters}
                        />
                    </div>


                    <div className="col-lg-9 ">
                        <HolidayResult
                            packages={Package}
                            searchTerm={searchTerm}
                            priceRange={priceRange}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HolidayPackageResultMain;
