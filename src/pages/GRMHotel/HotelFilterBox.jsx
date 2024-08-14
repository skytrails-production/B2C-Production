import React, { useState, useCallback, useEffect } from "react";
import { Checkbox, Input, Slider } from "antd";
import debounce from "lodash/debounce";

import starsvg from "./../../images/star.svg";
import starBlank from "./../../images/starBlank.svg";

const HotelFilterBox = ({
    uniqueFacilities,
    onCategoryChange,
    onFacilityChange,
    onPriceChange,
    onSortChange,
    onSearchTermChange,
    onClearFilters,
    minPrice,
    maxPrice,
    searchTerm,
    selectedCategories,
    selectedFacilities,
    priceRange,
    sortBy,
}) => {
    const [showAllFacilities, setShowAllFacilities] = useState(false);
    const [activeFilter, setActiveFilter] = useState(false)
    // console.log(activeFilter, "active filter")
    const handleCategoryChange = (event) => {
        const value = parseInt(event.target.value, 10);
        const updatedCategories = selectedCategories?.includes(value)
            ? selectedCategories?.filter((category) => category !== value)
            : [...selectedCategories, value];
        onCategoryChange(updatedCategories);
    };

    const handleFacilityChange = (event) => {
        const value = event.target.value;
        const updatedFacilities = selectedFacilities?.includes(value)
            ? selectedFacilities?.filter((facility) => facility !== value)
            : [...selectedFacilities, value];
        onFacilityChange(updatedFacilities);
    };

    const handlePriceChange = (value) => {
        onPriceChange(value);
    };

    const handleSortChange = (event) => {
        onSortChange(event.target.value);
    };

    const handleSearchChange = (event) => {
        const value = event.target.value;
        onSearchTermChange(value);
        debouncedSearch(value);
    };

    const debouncedSearch = useCallback(
        debounce((value) => {
            onSearchTermChange(value);
        }, 300),
        []
    );

    const handleClearFilters = () => {
        onClearFilters();
    };

    const handleShowMore = () => {
        setShowAllFacilities(!showAllFacilities);
    };



    const facilitiesToShow = showAllFacilities ? uniqueFacilities : uniqueFacilities.slice(0, 10);

    return (
        <div className="holidayFilterMainBox ">


            <div className="holidayFilterClear">
                <h5 style={{ cursor: "pointer", fontSize: "15px", fontWeight: "700" }} onClick={handleClearFilters}>
                    Clear Filters
                </h5>
            </div>

            {/* <div className="hotelFilterOuter">
                <div className="hotelSearchFilter">
                    <p className="">Sort By Price</p>
                    <input type="text" placeholder="Search by Hotel Name" value={searchTerm} onChange={handleSearchChange} />
                </div>
            </div> */}




            <div className="holidayFilterSearch">
                <p className="">Search By Name</p>
                <Input
                    type="text"
                    placeholder="Search by Hotel Name"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>




            <div className="busDepartureMain" style={{ background: "#fff" }}>
                <p className="">Sort By Price</p>
                <div>
                    <label className="sidebar-label-container ps-0">
                        <div className="svgBOx">
                            <input
                                type="checkbox"
                                value="highToLow"
                                checked={sortBy === "highToLow"}
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
                                type="checkbox"
                                value="lowToHigh"
                                checked={sortBy === "lowToHigh"}
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
            </div>



            <div className="PackagetagFilters" >
                <p>Themes</p>
                <Checkbox
                    value="3"
                    checked={selectedCategories.includes(3)}
                    onChange={handleCategoryChange}
                >
                    {[1, 2, 3, 4, 5].map((item, index) => (
                        <React.Fragment key={index}>
                            {index <= 2 ? (
                                <img className="pe-2" src={starsvg} alt="" />
                            ) : (
                                <img className="pe-2" src={starBlank} alt="" />
                            )}
                        </React.Fragment>
                    ))}
                </Checkbox>
                <Checkbox
                    value="4"
                    checked={selectedCategories.includes(4)}
                    onChange={handleCategoryChange}
                >
                    {[1, 2, 3, 4, 5].map((item, index) => (
                        <React.Fragment key={index}>
                            {index <= 3 ? (
                                <img className="pe-2" src={starsvg} alt="" />
                            ) : (
                                <img className="pe-2" src={starBlank} alt="" />
                            )}
                        </React.Fragment>
                    ))}
                </Checkbox>
                <Checkbox
                    value="5"
                    checked={selectedCategories.includes(5)}
                    onChange={handleCategoryChange}
                >
                    {[1, 2, 3, 4, 5].map((item, index) => (
                        <React.Fragment key={index}>
                            {index <= 4 ? (
                                <img className="pe-2" src={starsvg} alt="" />
                            ) : (
                                <img className="pe-2" src={starBlank} alt="" />
                            )}
                        </React.Fragment>
                    ))}
                </Checkbox>
            </div>




            <div className="holidayFilterSlider" >
                <p>Filter By Price</p>
                <Slider
                    range
                    step={400}
                    min={minPrice}
                    max={maxPrice}
                    value={priceRange}
                    onChange={handlePriceChange}
                />

                <div className="d-flex flex-row justify-content-between align-items-center ">
                    <span style={{ fontWeight: "600", fontSize: "13px" }}>₹ {priceRange?.[0]}</span>
                    <span style={{ fontWeight: "600", fontSize: "13px" }}>₹ {priceRange?.[1]}</span>
                </div>
            </div>


            <div className="PackagetagFilters">
                <p className="">Filter by Facilities</p>
                {facilitiesToShow.map((facility) => (
                    facility !== undefined &&

                    <Checkbox
                        key={facility}
                        value={facility}
                        checked={selectedFacilities.includes(facility)}
                        onChange={handleFacilityChange}
                    >
                        {facility}
                    </Checkbox>

                ))}
                {uniqueFacilities.length > 15 && (
                    <div style={{ textAlign: "center" }}>
                        <span style={{ color: "#e73c34", fontWeight: "600", fontSize: "14px", cursor: "pointer", }} onClick={handleShowMore}>
                            {showAllFacilities ? "Show Less" : "Show More"}
                        </span>
                    </div>
                )}
            </div>


            {/* <button onClick={handleClearFilters}>Clear Filters</button> */}

        </div>
    );
};

export default HotelFilterBox;
