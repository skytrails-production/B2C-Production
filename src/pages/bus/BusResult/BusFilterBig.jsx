import React, { useEffect, useState, useMemo } from "react";
import { Checkbox, Slider, Radio, Input } from "antd";

import { before6Am, sixamto12pm, twelvePmto6pm, after6Pm, ac, nonac, sleeper, seater } from "./busFilterIcons"

const { Group: CheckboxGroup } = Checkbox;

const BusFilterBig = ({ onFilter, busData }) => {
    const [busType, setBusType] = useState([]);
    const [departureTime, setDepartureTime] = useState([]);
    const [arrivalTime, setArrivalTime] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 5000]);
    const [sortPrice, setSortPrice] = useState(null);
    const [travelName, setTravelName] = useState([]);
    const [searchTravel, setSearchTravel] = useState("");
    const [boardingLocation, setBoardingLocation] = useState([]);
    const [searchBoarding, setSearchBoarding] = useState("");
    const [droppingLocation, setDroppingLocation] = useState([]);
    const [searchDropping, setSearchDropping] = useState("");
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(5000);
    const [debouncedSearchTravel, setDebouncedSearchTravel] = useState(searchTravel);


    const calculatePriceRange = () => {
        const min = Math.min(
            ...busData.map((bus) => bus.BusPrice.PublishedPriceRoundedOff)
        );
        const max = Math.max(
            ...busData.map((bus) => bus.BusPrice.PublishedPriceRoundedOff)
        );
        setMinPrice(min);
        setMaxPrice(max);
        setPriceRange([min, max]);
    };

    useEffect(() => {
        calculatePriceRange();
    }, [])

    const handleBusTypeChange = (e) => {
        const value = e.target.value;
        setBusType((prev) =>
            prev.includes(value)
                ? prev.filter((item) => item !== value)
                : [...prev, value]
        );
        applyFilters({
            busType: e.target.checked
                ? [...busType, value]
                : busType.filter((item) => item !== value),
        });
    };

    const handleDepartureTimeChange = (e) => {
        const value = e.target.value;
        setDepartureTime((prev) =>
            prev.includes(value)
                ? prev.filter((item) => item !== value)
                : [...prev, value]
        );
        applyFilters({
            departureTime: e.target.checked
                ? [...departureTime, value]
                : departureTime.filter((item) => item !== value),
        });
    };

    const handleArrivalTimeChange = (e) => {

        const value = e.target.value;
        setArrivalTime((prev) =>
            prev.includes(value)
                ? prev.filter((item) => item !== value)
                : [...prev, value]
        );
        applyFilters({
            arrivalTime: e.target.checked
                ? [...arrivalTime, value]
                : arrivalTime.filter((item) => item !== value),
        });
    };

    const handlePriceChange = (value) => {
        setPriceRange(value);
        applyFilters({ priceRange: value });
    };

    const handleSortChange = (e) => {
        setSortPrice(e.target.value);
        applyFilters({ sortPrice: e.target.value });
    };

    const handleTravelNameChange = (e) => {
        const value = e.target.value;
        setTravelName((prev) =>
            prev.includes(value)
                ? prev.filter((item) => item !== value)
                : [...prev, value]
        );
        applyFilters({
            travelName: e.target.checked
                ? [...travelName, value]
                : travelName.filter((item) => item !== value),
        });
    };

    const handleSearchTravelChange = (e) => {
        const value = e.target.value;
        setSearchTravel(value);
        applyFilters({ searchTravel: value });


    };

    const handleBoardingLocationChange = (e) => {
        const value = e.target.value;
        setBoardingLocation((prev) =>
            prev.includes(value)
                ? prev.filter((item) => item !== value)
                : [...prev, value]
        );
        applyFilters({
            boardingLocation: e.target.checked
                ? [...boardingLocation, value]
                : boardingLocation.filter((item) => item !== value),
        });
    };

    const handleSearchBoardingChange = (e) => {
        const value = e.target.value;
        setSearchBoarding(value);
        applyFilters({ searchBoarding: value });
    };

    const handleDroppingLocationChange = (e) => {
        const value = e.target.value;
        setDroppingLocation((prev) =>
            prev.includes(value)
                ? prev.filter((item) => item !== value)
                : [...prev, value]
        );
        applyFilters({
            droppingLocation: e.target.checked
                ? [...droppingLocation, value]
                : droppingLocation.filter((item) => item !== value),
        });
    };

    const handleSearchDroppingChange = (e) => {
        const value = e.target.value;
        setSearchDropping(value);
        applyFilters({ searchDropping: value });
    };

    const applyFilters = (newFilters) => {
        const filters = {
            busType,
            departureTime,
            arrivalTime,
            priceRange,
            sortPrice,
            travelName,
            searchTravel,
            boardingLocation,
            searchBoarding,
            droppingLocation,
            searchDropping,
            ...newFilters,
        };
        onFilter(filters);
    };

    // const uniqueTravelNames = [
    //     ...new Set(busData?.map((bus) => bus.TravelName)),
    // ]?.filter((name) => name?.toLowerCase()?.includes(searchTravel?.toLowerCase()));

    // const uniqueBoardingLocations = [
    //     ...new Set(
    //         busData?.flatMap((bus) =>
    //             bus?.BoardingPointsDetails?.map((point) => point?.CityPointLocation)
    //         )
    //     ),
    // ]?.filter((location) =>
    //     location?.toLowerCase()?.includes(searchBoarding?.toLowerCase())
    // );

    // const uniqueDroppingLocations = [
    //     ...new Set(
    //         busData?.flatMap((bus) =>
    //             bus?.DroppingPointsDetails?.map((point) => point?.CityPointLocation)
    //         )
    //     ),
    // ]?.filter((location) =>
    //     location?.toLowerCase()?.includes(searchDropping?.toLowerCase())
    // );


    // const uniqueTravelNames = useMemo(
    //     () =>
    //         [...new Set(busData?.map((bus) => bus.TravelName))]?.filter((name) =>
    //             name?.toLowerCase()?.includes(searchTravel?.toLowerCase())
    //         ),
    //     [busData, searchTravel]
    // );


    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTravel(searchTravel);
        }, 200);

        // Clean up the timeout if searchTravel changes before the 200ms
        return () => {
            clearTimeout(handler);
        };
    }, [searchTravel]);

    const uniqueTravelNames = useMemo(
        () =>
            [...new Set(busData?.map((bus) => bus.TravelName))]?.filter((name) =>
                name?.toLowerCase()?.includes(debouncedSearchTravel?.toLowerCase())
            ),
        [busData, debouncedSearchTravel]
    );

    const uniqueBoardingLocations = useMemo(
        () =>
            [...new Set(
                busData?.flatMap((bus) =>
                    bus?.BoardingPointsDetails?.map((point) => point?.CityPointLocation)
                )
            )]?.filter((location) =>
                location?.toLowerCase()?.includes(searchBoarding?.toLowerCase())
            ),
        [busData, searchBoarding]
    );

    const uniqueDroppingLocations = useMemo(
        () =>
            [...new Set(
                busData?.flatMap((bus) =>
                    bus?.DroppingPointsDetails?.map((point) => point?.CityPointLocation)
                )
            )]?.filter((location) =>
                location?.toLowerCase()?.includes(searchDropping?.toLowerCase())
            ),
        [busData, searchDropping]
    );


    const clearFilters = () => {
        setBusType([]);
        setDepartureTime([]);
        setArrivalTime([]);
        setPriceRange([0, 5000]);
        setSortPrice(null);
        setTravelName([]);
        setSearchTravel("");
        setBoardingLocation([]);
        setSearchBoarding("");
        setDroppingLocation([]);
        setSearchDropping("");

        // Apply cleared filters
        applyFilters({
            busType: [],
            departureTime: [],
            arrivalTime: [],
            priceRange: [minPrice, maxPrice],
            sortPrice: null,
            travelName: [],
            searchTravel: "",
            boardingLocation: [],
            searchBoarding: "",
            droppingLocation: [],
            searchDropping: "",
        });
    };

    return (
        <div className="holidayFilterMainBox ">

            <div className="holidayFilterClear">
                <h5 style={{ cursor: "pointer", fontSize: "15px", fontWeight: "700" }} onClick={clearFilters}>
                    Clear Filters
                </h5>
            </div>


            <div className="busDepartureMain" style={{ background: "#fff" }}>
                <p className="">By Bus Type</p>
                <div>
                    <label className="sidebar-label-container ps-0">
                        <div className="svgBOx">
                            <input
                                type="checkbox"
                                checked={busType.includes("A/C")}
                                onChange={handleBusTypeChange}
                                value="A/C"
                            />
                            <div>
                                <span className="checkedSVG pe-2">
                                    {ac}
                                </span>
                                <span>A/C</span>
                            </div>
                        </div>
                    </label>

                    <label className="sidebar-label-container ps-0">
                        <div className="svgBOx">
                            <input
                                type="checkbox"
                                checked={busType.includes("Non A/C")}
                                onChange={handleBusTypeChange}
                                value="Non A/C"
                            />
                            <div>
                                <span className="checkedSVG pe-2">
                                    {nonac}
                                </span>
                                <span> Non A/C</span>
                            </div>
                        </div>
                    </label>
                    <label className="sidebar-label-container ps-0">
                        <div className="svgBOx">
                            <input
                                type="checkbox"
                                checked={busType.includes("Sleeper")}
                                onChange={handleBusTypeChange}
                                value="Sleeper"
                            />
                            <div>
                                <span className="checkedSVG pe-2">
                                    {sleeper}
                                </span>
                                <span>Sleeper</span>
                            </div>
                        </div>
                    </label>
                    <label className="sidebar-label-container ps-0">
                        <div className="svgBOx">
                            <input
                                type="checkbox"
                                checked={busType.includes("Seater")}
                                onChange={handleBusTypeChange}
                                value="Seater"
                            />
                            <div>
                                <span className="checkedSVG pe-2">
                                    {seater}
                                </span>
                                <span> Seater</span>
                            </div>
                        </div>
                    </label>
                </div>
            </div>

            {/* Departure Time Filter */}

            <div className="busDepartureMain" style={{ background: "#fff" }}>
                <p className="">Departure Time</p>
                <div>
                    <label className="sidebar-label-container ps-0">
                        <div className="svgBOx">
                            <input
                                type="checkbox"
                                checked={departureTime.includes("before6am")}
                                onChange={handleDepartureTimeChange}
                                value="before6am"
                            />
                            <div>
                                <span className="checkedSVG pe-2">
                                    {before6Am}
                                </span>
                                <span>Before 6 AM</span>
                            </div>
                        </div>
                    </label>

                    <label className="sidebar-label-container ps-0">
                        <div className="svgBOx">
                            <input
                                type="checkbox"
                                checked={departureTime.includes("6amTo12pm")}
                                onChange={handleDepartureTimeChange}
                                value="6amTo12pm"
                            />
                            <div>
                                <span className="checkedSVG pe-2">
                                    {sixamto12pm}
                                </span>
                                <span> 6 AM to 12 PM</span>
                            </div>
                        </div>
                    </label>
                    <label className="sidebar-label-container ps-0">
                        <div className="svgBOx">
                            <input
                                type="checkbox"
                                checked={departureTime.includes("12pmTo6pm")}
                                onChange={handleDepartureTimeChange}
                                value="12pmTo6pm"
                            />
                            <div>
                                <span className="checkedSVG pe-2">
                                    {twelvePmto6pm}
                                </span>
                                <span>12 PM to 6 PM</span>
                            </div>
                        </div>
                    </label>
                    <label className="sidebar-label-container ps-0">
                        <div className="svgBOx">
                            <input
                                type="checkbox"
                                checked={departureTime.includes("after6pm")}
                                onChange={handleDepartureTimeChange}
                                value="after6pm"
                            />
                            <div>
                                <span className="checkedSVG pe-2">
                                    {after6Pm}
                                </span>
                                <span> After 6 PM</span>
                            </div>
                        </div>
                    </label>
                </div>
            </div>

            {/* Arrival Time Filter */}

            <div className="busDepartureMain" style={{ background: "#fff" }}>
                <p className="">Arrival Time</p>
                <div>
                    <label className="sidebar-label-container ps-0">
                        <div className="svgBOx">
                            <input
                                type="checkbox"
                                checked={arrivalTime.includes("before6am")}
                                onChange={handleArrivalTimeChange}
                                value="before6am"
                            />
                            <div>
                                <span className="checkedSVG pe-2">
                                    {before6Am}
                                </span>
                                <span>Before 6 AM</span>
                            </div>
                        </div>
                    </label>

                    <label className="sidebar-label-container ps-0">
                        <div className="svgBOx">
                            <input
                                type="checkbox"
                                checked={arrivalTime.includes("6amTo12pm")}
                                onChange={handleArrivalTimeChange}
                                value="6amTo12pm"
                            />
                            <div>
                                <span className="checkedSVG pe-2">
                                    {sixamto12pm}
                                </span>
                                <span> 6 AM to 12 PM</span>
                            </div>
                        </div>
                    </label>
                    <label className="sidebar-label-container ps-0">
                        <div className="svgBOx">
                            <input
                                type="checkbox"
                                checked={arrivalTime.includes("12pmTo6pm")}
                                onChange={handleArrivalTimeChange}
                                value="12pmTo6pm"
                            />
                            <div>
                                <span className="checkedSVG pe-2">
                                    {twelvePmto6pm}
                                </span>
                                <span>12 PM to 6 PM</span>
                            </div>
                        </div>
                    </label>
                    <label className="sidebar-label-container ps-0">
                        <div className="svgBOx">
                            <input
                                type="checkbox"
                                checked={arrivalTime.includes("after6pm")}
                                onChange={handleArrivalTimeChange}
                                value="after6pm"
                            />
                            <div>
                                <span className="checkedSVG pe-2">
                                    {after6Pm}
                                </span>
                                <span> After 6 PM</span>
                            </div>
                        </div>
                    </label>
                </div>
            </div>


            {/* Price Range Filter */}

            <div className="holidayFilterSlider" >
                <p>Filter By Price</p>
                <Slider
                    range
                    defaultValue={[minPrice, maxPrice]}
                    min={minPrice}
                    max={maxPrice}
                    onChange={handlePriceChange}
                />

                <div className="d-flex flex-row justify-content-between align-items-center ">
                    <span style={{ fontWeight: "600", fontSize: "13px" }}>₹ {priceRange?.[0]}</span>
                    <span style={{ fontWeight: "600", fontSize: "13px" }}>₹ {priceRange?.[1]}</span>
                </div>
            </div>



            {/* Travel Name Filter */}

            <div className="PackagetagFilters" style={{ background: "#fff" }}>
                <p className="">Travel Name</p>
                <div className="bustravelNameBox">
                    <Input
                        placeholder="Search Travel Name"
                        value={searchTravel}
                        onChange={handleSearchTravelChange}
                    />
                    <div>
                        {uniqueTravelNames.map((name) => (
                            <Checkbox key={name} checked={travelName.includes(name)} onChange={handleTravelNameChange} value={name}>
                                {name}
                            </Checkbox>
                        ))}
                    </div>
                </div>

            </div>

            {/* Boarding Location Filter */}

            <div className="PackagetagFilters" style={{ background: "#fff" }}>
                <p className="">Boarding Location</p>
                <div className="bustravelNameBox">
                    <Input
                        placeholder="Search Travel Name"
                        value={searchBoarding}
                        onChange={handleSearchBoardingChange}
                    />
                    <div className="">
                        {uniqueBoardingLocations.map((location) => (
                            <Checkbox key={location} checked={boardingLocation.includes(location)} onChange={handleBoardingLocationChange} value={location}>
                                {location}
                            </Checkbox>
                        ))}
                    </div>
                </div>

            </div>


            {/* Dropping Location Filter */}


            <div className="PackagetagFilters" style={{ background: "#fff" }}>
                <p className="">Dropping Location</p>
                <div className="bustravelNameBox">
                    <Input
                        placeholder="Search Travel Name"
                        value={searchDropping}
                        onChange={handleSearchDroppingChange}
                    />
                    <div>
                        {uniqueDroppingLocations.map((location) => (
                            <Checkbox key={location} checked={droppingLocation.includes(location)} onChange={handleDroppingLocationChange} value={location}>
                                {location}
                            </Checkbox>
                        ))}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default BusFilterBig;
