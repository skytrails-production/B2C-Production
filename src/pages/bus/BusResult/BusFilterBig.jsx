import React, { useEffect, useState } from "react";
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

    const uniqueTravelNames = [
        ...new Set(busData?.map((bus) => bus.TravelName)),
    ]?.filter((name) => name?.toLowerCase()?.includes(searchTravel?.toLowerCase()));

    const uniqueBoardingLocations = [
        ...new Set(
            busData?.flatMap((bus) =>
                bus?.BoardingPointsDetails?.map((point) => point?.CityPointLocation)
            )
        ),
    ]?.filter((location) =>
        location?.toLowerCase()?.includes(searchBoarding?.toLowerCase())
    );

    const uniqueDroppingLocations = [
        ...new Set(
            busData?.flatMap((bus) =>
                bus?.DroppingPointsDetails?.map((point) => point?.CityPointLocation)
            )
        ),
    ]?.filter((location) =>
        location?.toLowerCase()?.includes(searchDropping?.toLowerCase())
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


            {/* <h3>Price Range</h3>
            <Slider
                range
                defaultValue={[minPrice, maxPrice]}
                min={minPrice}
                max={maxPrice}
                onChange={handlePriceChange}
            /> */}

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



            {/* Sort by Price */}
            {/* <h3>Sort by Price</h3> */}
            {/* <Radio.Group onChange={handleSortChange}>
                <Radio value="lowToHigh">Low to High</Radio>
                <Radio value="highToLow">High to Low</Radio>
            </Radio.Group> */}

            {/* <div className="busDepartureMain" style={{ background: "#fff" }}>
                <p className="">Sort By Price</p>
                <div>
                    <label className="sidebar-label-container ps-0">
                        <div className="svgBOx">
                            <input
                                type="radio"
                                value="highToLow"
                                name="sortprice"
                                onChange={handleSortChange}
                            />
                            <div>
                                <span className="checkedSVG pe-2">
                                    <svg id="fi_13132493" enable-background="new 0 0 110 110" height="21" viewBox="0 0 110 110" width="21" xmlns="http://www.w3.org/2000/svg"><g><path d="m39.979 70.564v-40.564c0-2.209-1.791-4-4-4s-4 1.791-4 4v40.564c-1.528-.873-3.503-.675-4.807.63-1.562 1.563-1.562 4.095 0 5.657l5.979 5.978c.78.78 1.804 1.171 2.828 1.171s2.047-.391 2.829-1.172l5.978-5.978c1.562-1.562 1.562-4.095 0-5.656-1.306-1.304-3.28-1.504-4.807-.63z"></path><path d="m80 30.348h-32c-2.209 0-4 1.791-4 4s1.791 4 4 4h32c2.209 0 4-1.791 4-4s-1.791-4-4-4z"></path><path d="m74.565 40.674h-26.565c-2.209 0-4 1.791-4 4s1.791 4 4 4h26.565c2.209 0 4-1.791 4-4s-1.791-4-4-4z"></path><path d="m69.13 51h-21.13c-2.209 0-4 1.791-4 4s1.791 4 4 4h21.13c2.209 0 4-1.791 4-4s-1.791-4-4-4z"></path><path d="m63.695 61.326h-15.695c-2.209 0-4 1.791-4 4s1.791 4 4 4h15.695c2.209 0 4-1.791 4-4s-1.791-4-4-4z"></path><path d="m55 5c-27.614 0-50 22.386-50 50s22.386 50 50 50 50-22.386 50-50-22.386-50-50-50zm0 92c-23.159 0-42-18.841-42-42s18.841-42 42-42 42 18.841 42 42-18.841 42-42 42z"></path></g></svg>
                                </span>
                                <span>High to Low</span>
                            </div>
                        </div>
                    </label>

                    <label className="sidebar-label-container ps-0">
                        <div className="svgBOx">
                            <input
                                type="radio"
                                value="lowToHigh"
                                name="sortprice"
                                onChange={handleSortChange}
                            />
                            <div>
                                <span className="checkedSVG pe-2">
                                    <svg style={{ transform: "rotate(180deg)" }} id="fi_13132493" enable-background="new 0 0 110 110" height="21" viewBox="0 0 110 110" width="21" xmlns="http://www.w3.org/2000/svg"><g><path d="m39.979 70.564v-40.564c0-2.209-1.791-4-4-4s-4 1.791-4 4v40.564c-1.528-.873-3.503-.675-4.807.63-1.562 1.563-1.562 4.095 0 5.657l5.979 5.978c.78.78 1.804 1.171 2.828 1.171s2.047-.391 2.829-1.172l5.978-5.978c1.562-1.562 1.562-4.095 0-5.656-1.306-1.304-3.28-1.504-4.807-.63z"></path><path d="m80 30.348h-32c-2.209 0-4 1.791-4 4s1.791 4 4 4h32c2.209 0 4-1.791 4-4s-1.791-4-4-4z"></path><path d="m74.565 40.674h-26.565c-2.209 0-4 1.791-4 4s1.791 4 4 4h26.565c2.209 0 4-1.791 4-4s-1.791-4-4-4z"></path><path d="m69.13 51h-21.13c-2.209 0-4 1.791-4 4s1.791 4 4 4h21.13c2.209 0 4-1.791 4-4s-1.791-4-4-4z"></path><path d="m63.695 61.326h-15.695c-2.209 0-4 1.791-4 4s1.791 4 4 4h15.695c2.209 0 4-1.791 4-4s-1.791-4-4-4z"></path><path d="m55 5c-27.614 0-50 22.386-50 50s22.386 50 50 50 50-22.386 50-50-22.386-50-50-50zm0 92c-23.159 0-42-18.841-42-42s18.841-42 42-42 42 18.841 42 42-18.841 42-42 42z"></path></g></svg>
                                </span>
                                <span>Low to High</span>
                            </div>
                        </div>
                    </label>
                </div>
            </div> */}

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
