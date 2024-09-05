import React, { useEffect, useState } from "react";
import { Select, Modal, Button, Slider, Checkbox } from "antd";
import { SlidersOutlined } from "@ant-design/icons";
import "../../../pages/NewPackagePages/HolidayPackageSearchResult/packageResultfiltermobile.scss";
import { useSelector } from "react-redux";
import "./flightResult.scss";
import "./smallfilter.scss";
const { Option } = Select;

const FlightSmallFilter = ({
  airlineCodes,
  minPrice,
  maxPrice,
  priceRange,
  onFilter,
}) => {
  // console.log(airlineCodes, "airlines filtered")
  const [selectedCodes, setSelectedCodes] = useState([]);
  const [selectedStops, setSelectedStops] = useState([]);
  const [selectedDepTime, setSelectedDepTime] = useState([]);
  const [selectedArrTime, setSelectedArrTime] = useState([]);

  const [isPriceModalVisible, setIsPriceModalVisible] = useState(false);
  const [localPriceRange, setLocalPriceRange] = useState(priceRange);
  const [isStopsModalVisible, setIsStopsModalVisible] = useState(false);
  const [localSelectedStops, setLocalSelectedStops] = useState(
    // selectedTag
    []
  );
  const [isDepTimeModalVisible, setIsDepTimeModalVisible] = useState(false);
  const [localSelectedDepTime, setLocalSelectedDepTime] = useState(
    // selectedTag
    []
  );
  const [isArrTimeModalVisible, setIsArrTimeModalVisible] = useState(false);
  const [localSelectedArrTime, setLocalSelectedArrTime] = useState(
    // selectedTag
    []
  );
  const [isDaysModalVisible, setIsDaysModalVisible] = useState(false);
  const [isAirlinesModalVisible, setIsAirlinesModalVisible] = useState(false);

  const [localSelectedAirlines, setLocalSelectedAirlines] = useState(
    // selectedDays
    []
  );

  const [isPriceFilterApplied, setIsPriceFilterApplied] = useState(false);
  const [isDepTimeFilterApplied, setIsDepTimeFilterApplied] = useState(false);
  const [isArrTimeFilterApplied, setIsArrTimeFilterApplied] = useState(false);
  const [isStopsFilterApplied, setIsStopsFilterApplied] = useState(false);

  const [isAirlineFilterApplied, setIsAirlineFilterApplied] = useState(false);
  const [clearVisible, setClearVisible] = useState(false);
  const flightList = useSelector((state) => state?.flightList);
  const [airlines, setAirlines] = useState([]);
  const [airports, setAirports] = useState([]);
  useEffect(() => {
    setAirlines(flightList?.flightDetails);
    setAirports(flightList?.aireportList);
  }, [flightList?.flightDetails, flightList?.aireportList]);
  // Price modal and functions
  const showPriceModal = () => {
    setLocalPriceRange(priceRange);
    setIsPriceModalVisible(true);
  };
  const handlePriceOk = () => {
    // onPriceChange(localPriceRange);
    onFilter(selectedCodes, selectedStops, priceRange, [[0, 6]], []);
    // Apply filter
    setIsPriceModalVisible(false);
    setIsPriceFilterApplied(true);
    setClearVisible(true);
  };
  const handlePriceCancel = () => {
    setIsPriceModalVisible(false);
  };

  const handlePriceChange = (value) => {
    setLocalPriceRange(value);
  };
  const handleClearFilter = () => {
    // setSelectedDestinations([]);
    // setLocalSelectedDestinations([]);

    setLocalPriceRange([minPrice, maxPrice]);

    setLocalSelectedStops([]);
    setLocalSelectedAirlines([]);
    setLocalSelectedDepTime([]);
    setLocalSelectedArrTime([]);
    // onClearFilters()
    // onFilterChange([], [minPrice, maxPrice], '', []);
    onFilter([], [], [minPrice, maxPrice], [], []);

    setIsPriceFilterApplied(false);
    setIsStopsFilterApplied(false);

    setIsAirlineFilterApplied(false);
    setClearVisible(false);
    setIsArrTimeFilterApplied(false);
    setIsDepTimeFilterApplied(false);
  };

  // Airline modal and functions
  const showAirlineModal = () => {
    setLocalSelectedAirlines(airlineCodes);
    setIsAirlinesModalVisible(true);
  };

  const handleAirlineOk = () => {
    // console.log(selectedCodes, "localselecteddays")
    // onDaysChange(selectedDays);
    // onFilterChange([], [minPrice, maxPrice], '', []);
    // console.log(selectedCodes, priceRange, "selectedCodes small")
    onFilter(
      selectedCodes,
      selectedStops,
      priceRange,
      // localSelectedDepTime,
      [],
      []
    );
    // Apply filter
    setIsAirlinesModalVisible(false);
    setIsAirlineFilterApplied(true);
    setClearVisible(true);
  };

  const handleDaysCancel = () => {
    setIsDaysModalVisible(false);
  };
  const handleAirlinesCancel = () => {
    setIsAirlinesModalVisible(false);
  };

  const handleAirlinesChange = (e) => {
    const value = e.target.value;
    setLocalSelectedAirlines(value);
    // onDaysChange(value);
  };
  const handleCheckboxChange = (event) => {
    // console.log("ffffffffffffffffffffff");
    const { value, checked } = event.target;
    setSelectedCodes((prev) =>
      checked ? [...prev, value] : prev.filter((code) => code !== value)
    );
    // console.log(selectedCodes, "selected codes")
  };
  const handleStopChange = (event) => {
    const { value, checked } = event.target;
    const stopValue = parseInt(value, 10);
    setLocalSelectedStops((prev) =>
      checked ? [...prev, stopValue] : prev.filter((stop) => stop !== stopValue)
    );
    // console.log(localSelectedStops, "selectedStops")
  };
  // Themes modal and functions
  const showStopsModal = () => {
    setLocalSelectedStops(selectedStops);

    setIsStopsModalVisible(true);
  };

  const handleStopsOk = () => {
    // onStopChange(localSelectedStops);
    // console.log(localSelectedStops, "localSelectedStops ok")
    onFilter(
      selectedCodes,
      localSelectedStops,
      [minPrice, maxPrice],
      localSelectedDepTime,
      []
    );
    // Apply filter
    setIsStopsModalVisible(false);
    setIsStopsFilterApplied(true);
    setClearVisible(true);
  };

  const handleStopsCancel = () => {
    setIsStopsModalVisible(false);
  };
  const handleDepTimeChange = (event) => {
    const { value, checked } = event.target;
    const timeRange = value.split("-").map((v) => parseInt(v, 10));
    // setSelectedDepTime((prev) =>
    //     checked
    //         ? [...prev, timeRange]
    //         : prev.filter((range) => range.join("-") !== value)
    // );
    setLocalSelectedDepTime((prev) =>
      checked
        ? [...prev, timeRange]
        : prev.filter((range) => range.join("-") !== value)
    );
    // console.log(selectedDepTime, "selectedDepTime")
  };
  // Themes modal and functions
  const showDepTimeModal = () => {
    setLocalSelectedDepTime(selectedDepTime);

    setIsDepTimeModalVisible(true);
  };

  const handleDepTimeOk = () => {
    // onStopChange(localSelectedDepTime,"localSelectedDepTime");
    // console.log(localSelectedDepTime, "selectedDepTime");
    // onFilter(selectedCodes,
    //     selectedStops,
    //     localPriceRange,
    //     localSelectedDepTime
    //     ,
    //     []); // Apply filter
    onFilter(
      selectedCodes,
      selectedStops,
      [minPrice, maxPrice],
      localSelectedDepTime,
      []
    );
    setIsDepTimeModalVisible(false);
    setIsDepTimeFilterApplied(true);
    setClearVisible(true);
  };

  const handleDepTimeCancel = () => {
    setIsDepTimeModalVisible(false);
  };
  const handleArrTimeChange = async (event) => {
    const { value, checked } = event.target;
    const timeRange = value.split("-").map((v) => parseInt(v, 10));
    // setSelectedArrTime((prev) =>
    //     checked
    //         ? [...prev, timeRange]
    //         : prev.filter((range) => range.join("-") !== value)
    // );
    setLocalSelectedArrTime((prev) =>
      checked
        ? [...prev, timeRange]
        : prev.filter((range) => range.join("-") !== value)
    );
    // console.log(selectedDepTime, "selectedDepTime")
  };
  // Themes modal and functions
  const showArrTimeModal = () => {
    setLocalSelectedArrTime(selectedArrTime);

    setIsArrTimeModalVisible(true);
  };

  const handleArrTimeOk = () => {
    // onStopChange(localSelectedDepTime,"localSelectedDepTime");
    // console.log(localSelectedArrTime, "selectedDepTime");
    // onFilter(selectedCodes,
    //     selectedStops,
    //     localPriceRange,
    //     localSelectedDepTime
    //     ,
    //     []); // Apply filter
    onFilter(
      [],
      [],
      [minPrice, maxPrice],
      localSelectedDepTime,
      localSelectedArrTime
    );
    setIsArrTimeModalVisible(false);
    setIsArrTimeFilterApplied(true);
    setClearVisible(true);
  };

  const handleArrTimeCancel = () => {
    setIsArrTimeModalVisible(false);
  };

  const handleStopsChange = (e) => {
    setLocalSelectedStops(e.target.value);
  };
  function findAirlineByCode(code) {
    // console.log(airlines)
    if (airlines.length !== 0) {
      const data = airlines?.find((airline) => airline?.airlineCode === code);
      if (data?.airlineName) {
        return data?.airlineName;
      }
      return;
    }
    return;
  }
  return (
    <div className="filterPackageMobileBox">
      {!clearVisible ? (
        // false
        // true
        <div>
          <p
            className="d-flex fex-row gap-2 align-items-center"
            style={{ color: "gray" }}
          >
            <SlidersOutlined /> <span>Filter</span>
          </p>
        </div>
      ) : (
        <div>
          <p
            className="d-flex fex-row gap-2 align-items-center"
            onClick={handleClearFilter}
          >
            {" "}
            <span>Clear</span>
          </p>
        </div>
      )}

      <div className="selectFilterBoxMobile">
        {/* Cities Filter Box */}
        {/* <div
                    className="filterCitiesMobile"
                // onClick={showCitiesModal}
                >
                    <p
                        style={{
                            // border: isCitiesFilterApplied ? "1px solid #e73c34" : "1px solid gray",
                            // color: isCitiesFilterApplied ? "#e73c34" : "gray",
                            cursor: "pointer"
                        }}
                    >Select Cities</p>
                </div> */}

        {/* Cities Modal */}
        {/* <Modal
                    title="Select Cities"
                    // centered
                    // maskClosable={false}
                    // open={isCitiesModalVisible}
                    // onOk={handleCitiesOk}
                    // onCancel={handleCitiesCancel}
                    footer={[
                        <Button key="back"
                        //  onClick={handleCitiesCancel}
                        >Cancel</Button>,
                        <Button key="submit" type="primary"
                        // onClick={handleCitiesOk}
                        >Apply Filter</Button>,
                    ]}
                >
                    <div className="holidayFilterSelectMulti">
                        <p className="">Cities</p>
                        <Select
                            mode="multiple"
                            style={{ width: "100%" }}
                            placeholder="Please select destinations"
                        // value={localSelectedDestinations}
                        // onChange={handleDestinationChange}
                        >
                            {uniqueDestinations.map((destination) => (
                        <Option key={destination} value={destination}>
                            {destination}
                        </Option>
                    ))}
                        </Select>
                    </div>
                </Modal> */}

        {/* Price Filter Box */}
        <div className="filterCitiesMobile" onClick={showPriceModal}>
          <p
            style={{
              border: isPriceFilterApplied
                ? "1px solid #e73c34"
                : "1px solid gray",
              color: isPriceFilterApplied ? "#e73c34" : "gray",
              cursor: "pointer",
            }}
          >
            Filter By Price
          </p>
        </div>

        {/* Price Modal */}
        <Modal
          title="Filter By Price"
          centered
          open={isPriceModalVisible}
          onOk={handlePriceOk}
          onCancel={handlePriceCancel}
          footer={[
            <Button
              key="back"
              // onClick={handlePriceCancel}
            >
              Cancel
            </Button>,
            <Button key="submit" type="primary" onClick={handlePriceOk}>
              Apply Filter
            </Button>,
          ]}
        >
          <div className="holidayFilterSlider">
            {/* <p>Filter By Price</p> */}
            <Slider
              range
              step={400}
              min={minPrice}
              max={maxPrice}
              value={localPriceRange}
              onChange={handlePriceChange}
            />
            <div className="d-flex flex-row justify-content-between align-items-center ">
              <span style={{ fontWeight: "600", fontSize: "13px" }}>
                ₹ {localPriceRange?.[0]}
              </span>
              <span style={{ fontWeight: "600", fontSize: "13px" }}>
                ₹ {localPriceRange?.[1]}
              </span>
            </div>
          </div>
        </Modal>

        {/* Stops Filter Box */}
        <div className="filterCitiesMobile" onClick={showStopsModal}>
          <p
            style={{
              border: isStopsFilterApplied
                ? "1px solid #e73c34"
                : "1px solid gray",
              color: isStopsFilterApplied ? "#e73c34" : "gray",
              cursor: "pointer",
            }}
          >
            Filter By Stop's
          </p>
        </div>

        {/* Stops Modal */}
        <Modal
          title="Select Stops"
          centered
          open={isStopsModalVisible}
          onOk={handleStopsOk}
          onCancel={handleStopsCancel}
          footer={[
            <Button key="back" onClick={handleStopsCancel}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" onClick={handleStopsOk}>
              Apply Filter
            </Button>,
          ]}
        >
          <div className="PackagetagFilters">
            {/* <p>Stops</p> */}
            <Checkbox
              value="0"
              // checked={localSelectedStops === "0"}
              onChange={handleStopChange}
            >
              Non-Stop
            </Checkbox>
            <Checkbox
              value="1"
              // checked={localSelectedStops === "1"}
              onChange={handleStopChange}
            >
              1 Stop
            </Checkbox>
            <Checkbox
              value="2"
              // checked={localSelectedStops === "2"}
              onChange={handleStopChange}
            >
              2 Stop
            </Checkbox>
          </div>
        </Modal>
        {/* Stops Filter Box */}
        <div className="filterCitiesMobile" onClick={showDepTimeModal}>
          <p
            style={{
              border: isDepTimeFilterApplied
                ? "1px solid #e73c34"
                : "1px solid gray",
              color: isDepTimeFilterApplied ? "#e73c34" : "gray",
              cursor: "pointer",
            }}
          >
            Departure Time
          </p>
        </div>

        {/* Stops Modal */}
        <Modal
          title="Select Themes"
          centered
          open={isDepTimeModalVisible}
          onOk={handleDepTimeOk}
          onCancel={handleDepTimeCancel}
          footer={[
            <Button key="back" onClick={handleDepTimeCancel}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" onClick={handleDepTimeOk}>
              Apply Filter
            </Button>,
          ]}
        >
          <div className="busDepartureMain">
            {/* <h2 className="sidebar-title">Departure Time</h2> */}

            <div>
              <label className="sidebar-label-container  ps-0">
                {/* <span className="checkmark"></span> */}

                <div className="svgBOx">
                  <input
                    type="checkbox"
                    onChange={handleDepTimeChange}
                    value="0-6"
                    name="departTime"
                    // checked={selectedCategory.includes(
                    //   "departTime:before6AM"
                    // )}
                  />
                  <div>
                    <span className="checkedSVG pe-2">
                      <svg
                        id="Capa_1"
                        enable-background="new 0 0 512 512"
                        height="19"
                        viewBox="0 0 512 512"
                        width="19"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="m211.709 313.959c17.085 6.479 31.841 12.076 44.291 12.076s27.206-5.596 44.291-12.076c22.154-8.402 47.264-17.925 76.207-17.925 11.314 0 22.44.935 33.357 2.542-3.398-81.931-71.103-147.541-153.855-147.541-82.722 0-150.409 65.564-153.851 147.454 10.858-1.56 21.957-2.455 33.354-2.455 28.942 0 54.052 9.523 76.206 17.925z" />
                        <path d="m502.205 356.969-4.758-1.765c-36.837-13.672-78.589-29.169-120.949-29.169-23.445 0-44.859 8.121-65.568 15.975-19.019 7.213-36.982 14.025-54.929 14.025s-35.911-6.813-54.929-14.025c-20.709-7.854-42.124-15.975-65.568-15.975-43.64 0-84.687 15.472-124.382 30.435l-1.405.529c-7.752 2.921-11.668 11.574-8.746 19.326 2.921 7.752 11.574 11.668 19.326 8.746l1.406-.53c38.893-14.66 75.627-28.507 113.801-28.507 17.947 0 35.911 6.813 54.93 14.025 20.709 7.854 42.123 15.975 65.567 15.975s44.858-8.121 65.567-15.975c19.019-7.213 36.983-14.025 54.93-14.025 36.972 0 74.356 13.875 110.51 27.294l4.777 1.772c1.718.636 3.478.938 5.208.938 6.096 0 11.827-3.743 14.068-9.794 2.877-7.768-1.088-16.398-8.856-19.275z" />
                        <path d="m15 320.034h31c8.284 0 15-6.716 15-15s-6.716-15-15-15h-31c-8.284 0-15 6.716-15 15s6.716 15 15 15z" />
                        <path d="m39.788 197.524 26.847 15.5c2.362 1.364 4.941 2.012 7.486 2.012 5.184 0 10.226-2.69 13.004-7.502 4.142-7.174 1.684-16.348-5.49-20.49l-26.847-15.5c-7.176-4.144-16.348-1.684-20.49 5.49s-1.684 16.348 5.49 20.49z" />
                        <path d="m138.01 130.669c2.778 4.812 7.82 7.502 13.004 7.502 2.544 0 5.124-.648 7.486-2.012 7.174-4.142 9.632-13.315 5.49-20.49l-15.5-26.847c-4.142-7.173-13.314-9.633-20.49-5.49-7.174 4.142-9.632 13.315-5.49 20.49z" />
                        <path d="m256 110.035c8.284 0 15-6.716 15-15v-31c0-8.284-6.716-15-15-15s-15 6.716-15 15v31c0 8.284 6.716 15 15 15z" />
                        <path d="m353.5 136.16c2.362 1.364 4.941 2.012 7.486 2.012 5.184 0 10.226-2.69 13.004-7.502l15.5-26.847c4.142-7.174 1.684-16.348-5.49-20.49-7.176-4.143-16.349-1.684-20.49 5.49l-15.5 26.847c-4.142 7.174-1.684 16.347 5.49 20.49z" />
                        <path d="m437.879 215.037c2.544 0 5.124-.648 7.486-2.012l26.847-15.5c7.174-4.142 9.632-13.316 5.49-20.49s-13.315-9.633-20.49-5.49l-26.847 15.5c-7.174 4.142-9.632 13.316-5.49 20.49 2.778 4.812 7.82 7.502 13.004 7.502z" />
                        <path d="m451 305.035c0 8.284 6.716 15 15 15h31c8.284 0 15-6.716 15-15s-6.716-15-15-15h-31c-8.284 0-15 6.715-15 15z" />
                        <path d="m419.34 433.944-.357-.136c-21.791-8.301-54.72-20.847-83.983-20.847-16.094 0-30.715 5.586-44.854 10.988-12.13 4.635-23.588 9.012-34.146 9.012s-22.016-4.377-34.146-9.012c-14.139-5.402-28.759-10.988-44.854-10.988-25.122 0-41.314 5.75-68.142 15.276-4.805 1.706-10.02 3.558-15.771 5.552-7.827 2.713-11.973 11.258-9.259 19.085 2.149 6.201 7.958 10.091 14.172 10.091 1.629 0 3.288-.268 4.914-.832 5.829-2.021 11.114-3.897 15.983-5.626 26.195-9.301 38.15-13.546 58.104-13.546 10.559 0 22.016 4.377 34.146 9.012 14.139 5.402 28.759 10.988 44.854 10.988s30.715-5.586 44.854-10.988c12.13-4.635 23.588-9.012 34.146-9.012 23.742 0 53.567 11.362 73.303 18.881l.357.136c7.741 2.95 16.408-.936 19.357-8.677s-.936-16.408-8.678-19.357z" />
                      </svg>
                    </span>
                    <span>Before 6 AM</span>
                  </div>
                </div>
              </label>

              <label className="sidebar-label-container  ps-0">
                {/* <span className="checkmark"></span> */}
                <div className="svgBOx">
                  <input
                    type="checkbox"
                    onChange={handleDepTimeChange}
                    value="6-12"
                    name="departTime"
                    // checked={selectedCategory.includes(
                    //   "departTime:6AMto12PM"
                    // )}
                  />
                  <div>
                    <span className="checkedSVG pe-2">
                      <svg
                        height="19"
                        viewBox="0 0 64 64"
                        width="19"
                        xmlns="http://www.w3.org/2000/svg"
                        id="fi_2955890"
                      >
                        <g id="Sun">
                          <path d="m31.97461 15.00244a17.00317 17.00317 0 1 0 17 17.00342 17.021 17.021 0 0 0 -17-17.00342z"></path>
                          <path d="m59.002 29.00537h-3.99663a3.00049 3.00049 0 0 0 0 6.001h3.99663a3.00049 3.00049 0 0 0 0-6.001z"></path>
                          <path d="m31.97461 51.99854a3.00307 3.00307 0 0 0 -2.99854 3.00046v4.00049a2.99829 2.99829 0 1 0 5.99658 0v-4.00049a3.00266 3.00266 0 0 0 -2.99804-3.00046z"></path>
                          <path d="m11.99316 32.00586a3.00307 3.00307 0 0 0 -2.99854-3.00049h-3.99608a3.00049 3.00049 0 0 0 0 6.001h3.99609a3.00307 3.00307 0 0 0 2.99853-3.00051z"></path>
                          <path d="m31.97461 12.00146a3.00307 3.00307 0 0 0 2.99853-3.00046v-4.00051a2.99829 2.99829 0 1 0 -5.99658 0v4.00051a3.00266 3.00266 0 0 0 2.99805 3.00046z"></path>
                          <path d="m50.36182 17.85919 2.82874-2.82874a2.99828 2.99828 0 1 0 -4.24017-4.24023l-2.8288 2.8288a2.99828 2.99828 0 1 0 4.24023 4.24017z"></path>
                          <path d="m50.36145 46.15283a2.9983 2.9983 0 1 0 -4.24023 4.24023l2.82878 2.82874a2.9983 2.9983 0 1 0 4.24023-4.24023z"></path>
                          <path d="m13.5874 46.15247-2.82874 2.8288a2.99826 2.99826 0 1 0 4.24017 4.24017l2.8288-2.82874a2.9983 2.9983 0 1 0 -4.24023-4.24023z"></path>
                          <path d="m13.58777 17.85889a2.9983 2.9983 0 1 0 4.24023-4.24024l-2.8288-2.8288a2.9983 2.9983 0 1 0 -4.2402 4.24024z"></path>
                        </g>
                      </svg>
                    </span>
                    <span>6 AM - 12 PM</span>
                  </div>
                </div>
              </label>

              <label className="sidebar-label-container  ps-0">
                {/* <span className="checkmark"></span> */}
                <div className="svgBOx">
                  <input
                    type="checkbox"
                    onChange={handleDepTimeChange}
                    value="12-18"
                    name="departTime"
                    // checked={selectedCategory.includes(
                    //   "departTime:12PMto6PM"
                    // )}
                  />
                  <div>
                    <span className="checkedSVG pe-2">
                      <svg
                        id="fi_3223045"
                        height="19"
                        viewBox="0 0 512 512"
                        width="19"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="m205.746 77.478a10 10 0 0 0 10-10v-37.632a10 10 0 0 0 -20 0v37.632a10 10 0 0 0 10 10z"></path>
                        <path d="m118.029 93.661a10 10 0 0 0 17.321-10l-18.817-32.59a10 10 0 0 0 -17.32 10z"></path>
                        <path d="m31.226 136.379 32.589 18.821a10 10 0 1 0 10-17.32l-32.589-18.821a10 10 0 1 0 -10 17.32z"></path>
                        <path d="m57.632 225.592a10 10 0 0 0 -10-10h-37.632a10 10 0 0 0 0 20h37.632a10 10 0 0 0 10-10z"></path>
                        <path d="m77.476 299.649a10 10 0 0 0 -13.661-3.66l-32.589 18.816a10 10 0 1 0 10 17.32l32.589-18.815a10 10 0 0 0 3.661-13.661z"></path>
                        <path d="m342.688 156.536a9.953 9.953 0 0 0 4.99-1.341l32.59-18.816a10 10 0 1 0 -10-17.32l-32.59 18.816a10 10 0 0 0 5.01 18.661z"></path>
                        <path d="m279.8 97.321a10 10 0 0 0 13.66-3.66l18.815-32.59a10 10 0 0 0 -17.32-10l-18.815 32.59a10 10 0 0 0 3.66 13.66z"></path>
                        <path d="m162.525 290.2q5.259 0 10.478.515a85.595 85.595 0 0 1 99.564-41.8 105.477 105.477 0 0 1 42.621-34.329 109.99 109.99 0 1 0 -192.315 83.314 105.421 105.421 0 0 1 39.652-7.7z"></path>
                        <path d="m438.936 338.585a85.6 85.6 0 0 0 -158.164-64.635 65.622 65.622 0 0 0 -95.433 39.313 85.985 85.985 0 1 0 -22.814 168.891h267.4a72.067 72.067 0 0 0 9.011-143.569z"></path>
                      </svg>
                    </span>
                    <span>12 PM - 6 PM</span>
                  </div>
                </div>
              </label>

              <label className="sidebar-label-container  ps-0">
                {/* <span className="checkmark"></span> */}
                <div className="svgBOx">
                  <input
                    type="checkbox"
                    onChange={handleDepTimeChange}
                    value="18-24"
                    name="departTime"
                    // checked={selectedCategory.includes(
                    //   "departTime:after6PM"
                    // )}
                  />
                  <div>
                    <span className="checkedSVG pe-2">
                      <svg
                        height="19"
                        viewBox="0 -41 512.00002 512"
                        width="19"
                        xmlns="http://www.w3.org/2000/svg"
                        id="fi_1146677"
                      >
                        <path d="m251.710938 297.488281c-2.390626 0-4.832032.140625-7.261719.398438l-14.554688 1.582031-1.941406-14.511719c-4.828125-36.25-36.105469-63.574219-72.742187-63.574219-40.46875 0-73.386719 32.925782-73.386719 73.394532 0 4.140625.351562 8.3125 1.042969 12.394531l3.71875 21.871094-21.683594-4.699219c-3.761719-.8125-7.601563-1.21875-11.402344-1.21875-29.503906 0-53.5 23.992188-53.5 53.5 0 29.503906 23.996094 53.507812 53.5 53.507812h198.210938c36.574218 0 66.320312-29.753906 66.320312-66.320312 0-36.570312-29.746094-66.324219-66.320312-66.324219zm0 0"></path>
                        <path d="m481.632812 258.789062c-2.949218.171876-5.890624.25-8.808593.25-53.953125 0-103.222657-28.515624-130.066407-75.882812-28.296874-49.941406-25.816406-110.480469 6.480469-158l17.09375-25.15625-30.355469 1.742188c-27.644531 1.589843-53.941406 9.351562-78.15625 23.074218-41.75 23.664063-71.785156 62.152344-84.578124 108.398438-5.378907 19.453125-7.429688 39.277344-6.238282 58.84375 41.875 4.808594 76.921875 34.976562 87.976563 75.484375 50.609375 1.699219 91.457031 42.617187 93.007812 93.265625 30.1875-.21875 59.980469-8.121094 86.957031-23.421875 24.222657-13.722657 44.386719-32.289063 59.953126-55.191407l17.101562-25.144531zm0 0"></path>
                      </svg>
                    </span>
                    <span>After 6 PM</span>
                  </div>
                </div>
              </label>
            </div>

            {/* <Divider
                      sx={{ marginBottom: "15px", marginTop: "15px", backgroundColor: "lightgray" }}
                    /> */}
          </div>
        </Modal>
        {/* Arival time Filter Box */}
        <div className="filterCitiesMobile" onClick={showArrTimeModal}>
          <p
            style={{
              border: isArrTimeFilterApplied
                ? "1px solid #e73c34"
                : "1px solid gray",
              color: isArrTimeFilterApplied ? "#e73c34" : "gray",
              cursor: "pointer",
            }}
          >
            Arrival Time
          </p>
        </div>

        {/* Arival Time Modal */}
        <Modal
          title="Select Arrival Time"
          centered
          open={isArrTimeModalVisible}
          onOk={handleArrTimeOk}
          onCancel={handleArrTimeCancel}
          footer={[
            <Button key="back" onClick={handleArrTimeCancel}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" onClick={handleArrTimeOk}>
              Apply Filter
            </Button>,
          ]}
        >
          <div className="busDepartureMain">
            {/* <h2 className="sidebar-title">Arrival Time</h2> */}

            <div>
              <label className="sidebar-label-container  ps-0">
                {/* <span className="checkmark"></span> */}

                <div className="svgBOx">
                  <input
                    type="checkbox"
                    onChange={handleArrTimeChange}
                    value="0-6"
                    name="departTime"
                    // checked={selectedCategory.includes(
                    //   "departTime:before6AM"
                    // )}
                  />
                  <div>
                    <span className="checkedSVG pe-2">
                      <svg
                        id="Capa_1"
                        enable-background="new 0 0 512 512"
                        height="19"
                        viewBox="0 0 512 512"
                        width="19"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="m211.709 313.959c17.085 6.479 31.841 12.076 44.291 12.076s27.206-5.596 44.291-12.076c22.154-8.402 47.264-17.925 76.207-17.925 11.314 0 22.44.935 33.357 2.542-3.398-81.931-71.103-147.541-153.855-147.541-82.722 0-150.409 65.564-153.851 147.454 10.858-1.56 21.957-2.455 33.354-2.455 28.942 0 54.052 9.523 76.206 17.925z" />
                        <path d="m502.205 356.969-4.758-1.765c-36.837-13.672-78.589-29.169-120.949-29.169-23.445 0-44.859 8.121-65.568 15.975-19.019 7.213-36.982 14.025-54.929 14.025s-35.911-6.813-54.929-14.025c-20.709-7.854-42.124-15.975-65.568-15.975-43.64 0-84.687 15.472-124.382 30.435l-1.405.529c-7.752 2.921-11.668 11.574-8.746 19.326 2.921 7.752 11.574 11.668 19.326 8.746l1.406-.53c38.893-14.66 75.627-28.507 113.801-28.507 17.947 0 35.911 6.813 54.93 14.025 20.709 7.854 42.123 15.975 65.567 15.975s44.858-8.121 65.567-15.975c19.019-7.213 36.983-14.025 54.93-14.025 36.972 0 74.356 13.875 110.51 27.294l4.777 1.772c1.718.636 3.478.938 5.208.938 6.096 0 11.827-3.743 14.068-9.794 2.877-7.768-1.088-16.398-8.856-19.275z" />
                        <path d="m15 320.034h31c8.284 0 15-6.716 15-15s-6.716-15-15-15h-31c-8.284 0-15 6.716-15 15s6.716 15 15 15z" />
                        <path d="m39.788 197.524 26.847 15.5c2.362 1.364 4.941 2.012 7.486 2.012 5.184 0 10.226-2.69 13.004-7.502 4.142-7.174 1.684-16.348-5.49-20.49l-26.847-15.5c-7.176-4.144-16.348-1.684-20.49 5.49s-1.684 16.348 5.49 20.49z" />
                        <path d="m138.01 130.669c2.778 4.812 7.82 7.502 13.004 7.502 2.544 0 5.124-.648 7.486-2.012 7.174-4.142 9.632-13.315 5.49-20.49l-15.5-26.847c-4.142-7.173-13.314-9.633-20.49-5.49-7.174 4.142-9.632 13.315-5.49 20.49z" />
                        <path d="m256 110.035c8.284 0 15-6.716 15-15v-31c0-8.284-6.716-15-15-15s-15 6.716-15 15v31c0 8.284 6.716 15 15 15z" />
                        <path d="m353.5 136.16c2.362 1.364 4.941 2.012 7.486 2.012 5.184 0 10.226-2.69 13.004-7.502l15.5-26.847c4.142-7.174 1.684-16.348-5.49-20.49-7.176-4.143-16.349-1.684-20.49 5.49l-15.5 26.847c-4.142 7.174-1.684 16.347 5.49 20.49z" />
                        <path d="m437.879 215.037c2.544 0 5.124-.648 7.486-2.012l26.847-15.5c7.174-4.142 9.632-13.316 5.49-20.49s-13.315-9.633-20.49-5.49l-26.847 15.5c-7.174 4.142-9.632 13.316-5.49 20.49 2.778 4.812 7.82 7.502 13.004 7.502z" />
                        <path d="m451 305.035c0 8.284 6.716 15 15 15h31c8.284 0 15-6.716 15-15s-6.716-15-15-15h-31c-8.284 0-15 6.715-15 15z" />
                        <path d="m419.34 433.944-.357-.136c-21.791-8.301-54.72-20.847-83.983-20.847-16.094 0-30.715 5.586-44.854 10.988-12.13 4.635-23.588 9.012-34.146 9.012s-22.016-4.377-34.146-9.012c-14.139-5.402-28.759-10.988-44.854-10.988-25.122 0-41.314 5.75-68.142 15.276-4.805 1.706-10.02 3.558-15.771 5.552-7.827 2.713-11.973 11.258-9.259 19.085 2.149 6.201 7.958 10.091 14.172 10.091 1.629 0 3.288-.268 4.914-.832 5.829-2.021 11.114-3.897 15.983-5.626 26.195-9.301 38.15-13.546 58.104-13.546 10.559 0 22.016 4.377 34.146 9.012 14.139 5.402 28.759 10.988 44.854 10.988s30.715-5.586 44.854-10.988c12.13-4.635 23.588-9.012 34.146-9.012 23.742 0 53.567 11.362 73.303 18.881l.357.136c7.741 2.95 16.408-.936 19.357-8.677s-.936-16.408-8.678-19.357z" />
                      </svg>
                    </span>
                    <span>Before 6 AM</span>
                  </div>
                </div>
              </label>

              <label className="sidebar-label-container  ps-0">
                {/* <span className="checkmark"></span> */}
                <div className="svgBOx">
                  <input
                    type="checkbox"
                    onChange={handleArrTimeChange}
                    value="6-12"
                    name="departTime"
                    // checked={selectedCategory.includes(
                    //   "departTime:6AMto12PM"
                    // )}
                  />
                  <div>
                    <span className="checkedSVG pe-2">
                      <svg
                        height="19"
                        viewBox="0 0 64 64"
                        width="19"
                        xmlns="http://www.w3.org/2000/svg"
                        id="fi_2955890"
                      >
                        <g id="Sun">
                          <path d="m31.97461 15.00244a17.00317 17.00317 0 1 0 17 17.00342 17.021 17.021 0 0 0 -17-17.00342z"></path>
                          <path d="m59.002 29.00537h-3.99663a3.00049 3.00049 0 0 0 0 6.001h3.99663a3.00049 3.00049 0 0 0 0-6.001z"></path>
                          <path d="m31.97461 51.99854a3.00307 3.00307 0 0 0 -2.99854 3.00046v4.00049a2.99829 2.99829 0 1 0 5.99658 0v-4.00049a3.00266 3.00266 0 0 0 -2.99804-3.00046z"></path>
                          <path d="m11.99316 32.00586a3.00307 3.00307 0 0 0 -2.99854-3.00049h-3.99608a3.00049 3.00049 0 0 0 0 6.001h3.99609a3.00307 3.00307 0 0 0 2.99853-3.00051z"></path>
                          <path d="m31.97461 12.00146a3.00307 3.00307 0 0 0 2.99853-3.00046v-4.00051a2.99829 2.99829 0 1 0 -5.99658 0v4.00051a3.00266 3.00266 0 0 0 2.99805 3.00046z"></path>
                          <path d="m50.36182 17.85919 2.82874-2.82874a2.99828 2.99828 0 1 0 -4.24017-4.24023l-2.8288 2.8288a2.99828 2.99828 0 1 0 4.24023 4.24017z"></path>
                          <path d="m50.36145 46.15283a2.9983 2.9983 0 1 0 -4.24023 4.24023l2.82878 2.82874a2.9983 2.9983 0 1 0 4.24023-4.24023z"></path>
                          <path d="m13.5874 46.15247-2.82874 2.8288a2.99826 2.99826 0 1 0 4.24017 4.24017l2.8288-2.82874a2.9983 2.9983 0 1 0 -4.24023-4.24023z"></path>
                          <path d="m13.58777 17.85889a2.9983 2.9983 0 1 0 4.24023-4.24024l-2.8288-2.8288a2.9983 2.9983 0 1 0 -4.2402 4.24024z"></path>
                        </g>
                      </svg>
                    </span>
                    <span>6 AM - 12 PM</span>
                  </div>
                </div>
              </label>

              <label className="sidebar-label-container  ps-0">
                {/* <span className="checkmark"></span> */}
                <div className="svgBOx">
                  <input
                    type="checkbox"
                    onChange={handleArrTimeChange}
                    value="12-18"
                    name="departTime"
                    // checked={selectedCategory.includes(
                    //   "departTime:12PMto6PM"
                    // )}
                  />
                  <div>
                    <span className="checkedSVG pe-2">
                      <svg
                        id="fi_3223045"
                        height="19"
                        viewBox="0 0 512 512"
                        width="19"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="m205.746 77.478a10 10 0 0 0 10-10v-37.632a10 10 0 0 0 -20 0v37.632a10 10 0 0 0 10 10z"></path>
                        <path d="m118.029 93.661a10 10 0 0 0 17.321-10l-18.817-32.59a10 10 0 0 0 -17.32 10z"></path>
                        <path d="m31.226 136.379 32.589 18.821a10 10 0 1 0 10-17.32l-32.589-18.821a10 10 0 1 0 -10 17.32z"></path>
                        <path d="m57.632 225.592a10 10 0 0 0 -10-10h-37.632a10 10 0 0 0 0 20h37.632a10 10 0 0 0 10-10z"></path>
                        <path d="m77.476 299.649a10 10 0 0 0 -13.661-3.66l-32.589 18.816a10 10 0 1 0 10 17.32l32.589-18.815a10 10 0 0 0 3.661-13.661z"></path>
                        <path d="m342.688 156.536a9.953 9.953 0 0 0 4.99-1.341l32.59-18.816a10 10 0 1 0 -10-17.32l-32.59 18.816a10 10 0 0 0 5.01 18.661z"></path>
                        <path d="m279.8 97.321a10 10 0 0 0 13.66-3.66l18.815-32.59a10 10 0 0 0 -17.32-10l-18.815 32.59a10 10 0 0 0 3.66 13.66z"></path>
                        <path d="m162.525 290.2q5.259 0 10.478.515a85.595 85.595 0 0 1 99.564-41.8 105.477 105.477 0 0 1 42.621-34.329 109.99 109.99 0 1 0 -192.315 83.314 105.421 105.421 0 0 1 39.652-7.7z"></path>
                        <path d="m438.936 338.585a85.6 85.6 0 0 0 -158.164-64.635 65.622 65.622 0 0 0 -95.433 39.313 85.985 85.985 0 1 0 -22.814 168.891h267.4a72.067 72.067 0 0 0 9.011-143.569z"></path>
                      </svg>
                    </span>
                    <span>12 PM - 6 PM</span>
                  </div>
                </div>
              </label>

              <label className="sidebar-label-container  ps-0">
                {/* <span className="checkmark"></span> */}
                <div className="svgBOx">
                  <input
                    type="checkbox"
                    onChange={handleArrTimeChange}
                    value="18-24"
                    name="departTime"
                    // checked={selectedCategory.includes(
                    //   "departTime:after6PM"
                    // )}
                  />
                  <div>
                    <span className="checkedSVG pe-2">
                      <svg
                        height="19"
                        viewBox="0 -41 512.00002 512"
                        width="19"
                        xmlns="http://www.w3.org/2000/svg"
                        id="fi_1146677"
                      >
                        <path d="m251.710938 297.488281c-2.390626 0-4.832032.140625-7.261719.398438l-14.554688 1.582031-1.941406-14.511719c-4.828125-36.25-36.105469-63.574219-72.742187-63.574219-40.46875 0-73.386719 32.925782-73.386719 73.394532 0 4.140625.351562 8.3125 1.042969 12.394531l3.71875 21.871094-21.683594-4.699219c-3.761719-.8125-7.601563-1.21875-11.402344-1.21875-29.503906 0-53.5 23.992188-53.5 53.5 0 29.503906 23.996094 53.507812 53.5 53.507812h198.210938c36.574218 0 66.320312-29.753906 66.320312-66.320312 0-36.570312-29.746094-66.324219-66.320312-66.324219zm0 0"></path>
                        <path d="m481.632812 258.789062c-2.949218.171876-5.890624.25-8.808593.25-53.953125 0-103.222657-28.515624-130.066407-75.882812-28.296874-49.941406-25.816406-110.480469 6.480469-158l17.09375-25.15625-30.355469 1.742188c-27.644531 1.589843-53.941406 9.351562-78.15625 23.074218-41.75 23.664063-71.785156 62.152344-84.578124 108.398438-5.378907 19.453125-7.429688 39.277344-6.238282 58.84375 41.875 4.808594 76.921875 34.976562 87.976563 75.484375 50.609375 1.699219 91.457031 42.617187 93.007812 93.265625 30.1875-.21875 59.980469-8.121094 86.957031-23.421875 24.222657-13.722657 44.386719-32.289063 59.953126-55.191407l17.101562-25.144531zm0 0"></path>
                      </svg>
                    </span>
                    <span>After 6 PM</span>
                  </div>
                </div>
              </label>
            </div>

            {/* <Divider
                      sx={{ marginBottom: "15px", marginTop: "15px", backgroundColor: "lightgray" }}
                    /> */}
          </div>
        </Modal>
        {/* {/* Arival time Filter Box Filter Box */}
        <div className="filterCitiesMobile" onClick={showAirlineModal}>
          <p
            style={{
              border: isAirlineFilterApplied
                ? "1px solid #e73c34"
                : "1px solid gray",
              color: isAirlineFilterApplied ? "#e73c34" : "gray",
              cursor: "pointer",
            }}
          >
            Filter By Airlines
          </p>
        </div>

        {/* Airlines  Modal */}
        <Modal
          title="Filter By Airlines"
          centered
          open={isAirlinesModalVisible}
          // open={false}

          onOk={handleAirlineOk}
          onCancel={handleAirlinesCancel}
          footer={[
            <Button key="back" onClick={handleAirlinesCancel}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" onClick={handleAirlineOk}>
              Apply Filter
            </Button>,
          ]}
        >
          <div className="flightFilterAirlines">
            {/* <h2 className="sidebar-title">Filter By Airlines</h2> */}

            <div className="flightFilterAirlinesScroll">
              <div className="">
                {airlineCodes.map((code) => {
                  return (
                    <label className="airline-small-label-container  ps-0">
                      {/* <span className="checkmark"></span> */}

                      <div className=" airtimeBackgrounditemsmall">
                        <input
                          type="checkbox"
                          value={code}
                          // checked={selectedDays.includes("0-5")}
                          onChange={(e) => handleCheckboxChange(e)}
                          name="departTime"
                          // checked={selectedCategory.includes(
                          //   "departTime:before6AM"
                          // )}
                        />
                        <div className="">
                          <span className="checkedSVG pe-2">
                            <img
                              src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/${code}.png`}
                              alt="flight"
                              style={{ width: "auto", mixBlendMode: "darken" }}
                              height={22}
                            />
                          </span>
                          <span>{findAirlineByCode(code)}</span>
                        </div>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* <Divider
                      sx={{ marginBottom: "15px", marginTop: "15px", backgroundColor: "lightgray" }}
                    /> */}
          </div>
        </Modal>

        {/* Days Filter Box */}
        {/* <div
                    className="filterCitiesMobile"
                    onClick={showAirlineModal}
                >
                    <p
                        style={{
                            border: isAirlineFilterApplied ? "1px solid #e73c34" : "1px solid gray",
                            color: isAirlineFilterApplied ? "#e73c34" : "gray",
                            cursor: "pointer"
                        }}
                    >Filter By Airlines</p>
                </div> */}

        {/* Days Modal */}
        {/* <Modal
                    title="Filter By Airlines"
                    centered
                    // open={isAirlinesModalVisible}
                    open={false}
                    onOk={handleAirlineOk}
                    onCancel={handleAirlinesCancel}
                    footer={[
                        <Button key="back"
                            onClick={handleAirlinesCancel}
                        >Cancel</Button>,
                        <Button key="submit" type="primary"
                            onClick={handleAirlineOk}
                        >Apply Filter</Button>,
                    ]}
                >
                    <div className="flight-filter-aireline">
                      
                        <div className="flight-filter-aireline-item">
                            {airlineCodes.map((code) => (
                             
                                <Checkbox
                                    value={code}
                               
                                    onChange={(e) => handleCheckboxChange(e)}
                                >
                                    <div style={{
                                        display: "flex",
                                        alignItems: "center",
                                        margin: "0px",
                                        padding: "0px",
                                        gap: "5px"
                                    }}>

                                        <img
                                            src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/${code}.png`}
                                            alt="flight"
                                            style={{ borderRadius: "8px" }}
                                            width={22}
                                            height={22}

                                        />
                                        <p style={{
                                            margin: "0px !important",


                                        }}>
                                            {findAirlineByCode(code)}
                                        </p>

                                    </div>

                                </Checkbox>

                            ))}
                        </div>

                        

                    </div>
                </Modal> */}
      </div>
      {/* Clear Filter Button */}
      {/* <Button onClick={handleClearFilter}>Clear Filter</Button> */}
    </div>
  );
};

export default FlightSmallFilter;
