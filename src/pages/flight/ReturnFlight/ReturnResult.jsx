import React, { useState, useEffect } from 'react'
import {
    quoteAction,
    ruleAction,
    quoteActionReturn,
    ruleActionReturn,
    resetAllFareData
} from "../../../Redux/FlightFareQuoteRule/actionFlightQuote";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import "./returnresult.css";
import dayjs from 'dayjs';
import { motion } from "framer-motion";
import Divider from "@mui/material/Divider";
import { swalModal } from "../../../utility/swal";


const variants = {
    initial: {
        y: 50,
        opacity: 0,
    },
    animate: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.5,
            staggerChildren: 0.1,
        },
    },
};


const ReturnResult = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const reducerState = useSelector((state) => state);
    // useEffect(() => {
    //     console.log(reducerState, "reducer state")
    // }, [])
    const [loading, setLoading] = useState(false);
    const result = reducerState?.return?.returnData?.data?.data?.Response?.Results;
    let initialGoFlight;
    let initialReturnFlight;
    let onGoTime
    let IncomeTime
    const [ongoFlight, setOngoFlight] = useState(initialGoFlight);
    const [incomeGlight, setIncomeFlight] = useState(initialReturnFlight);
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [selectedFlightIndex, setSelectedFlightIndex] = useState(null);
    const [goingResult, setGoingResult] = useState([])
    const [returnResult, setReturnResult] = useState([])
    useEffect(() => {
        // console.log(reducerState?.
        //     return?.
        //     returnData?.
        //     data?.
        //     data?.
        //     Response?.
        //     Error?.
        //     ErrorCode, "vvvvvvvvvvvvvvvvvvvvvvvvvvv")
        if (reducerState?.
            return?.
            returnData?.
            data?.
            data?.
            Response?.
            Error?.
            ErrorCode !== 0
            &&
            reducerState?.
                return?.
                returnData?.
                data?.
                data?.
                Response?.
                Error?.
                ErrorCode !== undefined



        ) {
            swalModal("flight", reducerState?.
                return?.
                returnData?.
                data?.
                data?.
                Response?.
                Error?.
                ErrorMessage)
            navigate("/return");
        }
        else if (reducerState?.
            return?.
            returnData?.
            data?.
            data?.
            Response?.
            Error?.
            ErrorCode !== 0) {
            navigate("/return");
        }
        dispatch(resetAllFareData())
    }, [])

    // fitler the array for going flight


    useEffect(() => {

        const uniqueData = !result ? [] : (result?.[0]?.filter((item, index, array) => {
            const isUnique = !array
                .slice(0, index)
                .some(
                    prevItem =>
                        prevItem.AirlineCode === item.AirlineCode &&
                        prevItem.Segments?.[0]?.[prevItem.Segments[0].length - 1]?.Origin
                            ?.DepTime ===
                        item.Segments?.[0]?.[prevItem.Segments[0].length - 1]?.Origin
                            ?.DepTime,
                );
            return isUnique;
        }));

        setGoingResult([[...uniqueData]])
    }, [result]);

    // fitler the array for going flight


    // fitler the array for return flight 

    useEffect(() => {

        const uniqueData = !result ? [] : (result?.[1]?.filter((item, index, array) => {
            const isUnique = !array
                .slice(0, index)
                .some(
                    prevItem =>
                        prevItem.AirlineCode === item.AirlineCode &&
                        prevItem.Segments?.[0]?.[prevItem.Segments[0].length - 1]?.Origin
                            ?.DepTime ===
                        item.Segments?.[0]?.[prevItem.Segments[0].length - 1]?.Origin
                            ?.DepTime,
                );
            return isUnique;
        }));

        setReturnResult([[...uniqueData]])
    }, [result]);

    // fitler the array for return flight 



    const maxPrice = result?.[0]?.reduce((max, item) => {
        return Math.max(max, item?.Fare?.PublishedFare || 0);
    }, 0);
    const minPrice = result?.[0]?.reduce((min, item) => {
        return Math.min(min, item?.Fare?.PublishedFare || Infinity);
    }, Infinity);


    const [priceRangeValue, setPriceRangeValue] = useState(maxPrice + 1)




    const handlePriceRangeChange = (event) => {
        setPriceRangeValue(event.target.value);
    };

    useEffect(() => {
        setPriceRangeValue(maxPrice + 1);
    }, [maxPrice])



    const handleFlightSelection = (index) => {
        setSelectedFlightIndex(index);
    };
    const [selectedFlightIndexReturn, setSelectedFlightIndexReturn] = useState(null);



    const handleFlightSelectionReturn = (index) => {
        setSelectedFlightIndexReturn(index);
    };


    if (result !== undefined) {
        initialGoFlight = result?.[0]?.[0];
        initialReturnFlight = result?.[1]?.[0];
        // destination =
        //     result[0][0]?.Segments[0][0]?.Destination?.Airport?.CityName;
        // origin = result[0][0]?.Segments[0][0]?.Origin?.Airport?.CityName;
        onGoTime = result?.[0][0]?.Segments[0][0]?.Destination?.ArrTime;
        IncomeTime = result?.[1][0]?.Segments[0][0]?.Destination?.ArrTime;
    }











    useEffect(() => {
        setOngoFlight(initialGoFlight);
        setIncomeFlight(initialReturnFlight);
    }, [initialGoFlight, initialReturnFlight]);
    useEffect(() => {
        sessionStorage.setItem("flightDetailsONGo", JSON.stringify(initialGoFlight));
        sessionStorage.setItem("flightDetailsIncome", JSON.stringify(initialReturnFlight));
    }, [])

    if (result === undefined) {
        return <div>Loading...</div>
    }





    const handleIndexId = (ResultIndex) => {
        setOngoFlight(ResultIndex)
    };

    const handleIndexIdreturn = (ResultIndex) => {
        setIncomeFlight(ResultIndex)
    };

    // if (result === undefined) {
    //     return (
    //         <FlightLoader />
    //     )
    // }



    const handleFareRuleAndQuote = async () => {

        sessionStorage.setItem("goingResultIndex", ongoFlight?.ResultIndex)
        sessionStorage.setItem("ReturnResultIndex", incomeGlight?.ResultIndex)
        // setLoading(true);
        const payload = {
            EndUserIp: reducerState?.ip?.ipData,
            TokenId: reducerState?.ip?.tokenData,
            TraceId: reducerState?.return?.returnData?.data?.data?.Response?.TraceId,
            ResultIndex: `${ongoFlight?.ResultIndex}`,
        };
        const payloadReturn = {
            EndUserIp: reducerState?.ip?.ipData,
            TokenId: reducerState?.ip?.tokenData,
            TraceId: reducerState?.return?.returnData?.data?.data?.Response?.TraceId,
            ResultIndex: `${incomeGlight?.ResultIndex}`,
        };
        await dispatch(ruleAction(payload));
        await dispatch(quoteAction(payload));
        await dispatch(ruleActionReturn(payloadReturn));
        await dispatch(quoteActionReturn(payloadReturn));
        // window.open("/FlightresultReturn/Passengerdetail", '_blank');
        setLoading(false);
        navigate("/FlightresultReturn/Passengerdetail");

    };

    // console.log(ongoFlight?.Fare, "fare")



    // filter logic here 


    const handleRadioChange = (event) => {
        const selectedValue = event.target.value;
        const radioGroupName = event.target.name;

        if (selectedValue === "All") {
            setSelectedCategory([]);
            document.querySelectorAll('input[type="checkbox"]').forEach((radio) => {
                radio.checked = false;
            });
            return
        }

        setSelectedCategory((prevSelectedCategory) => {
            let updatedCategory = [...prevSelectedCategory];
            const isValueSelected = updatedCategory.some(
                (category) => category === `${radioGroupName}:${selectedValue}`
            );
            updatedCategory = isValueSelected
                ? updatedCategory.filter(
                    (category) => category !== `${radioGroupName}:${selectedValue}`
                )
                : [
                    ...updatedCategory.filter(
                        (category) => !category.startsWith(`${radioGroupName}:`)
                    ),
                    `${radioGroupName}:${selectedValue}`,
                ];

            return updatedCategory;
        });
    };






    const filteredData =
        goingResult?.[0]?.filter((item) => {
            const segmentLength = item?.Segments?.[0].length;
            const depTime = new Date(item?.Segments?.[0][0]?.Origin?.DepTime);
            const hour = depTime.getHours();
            const ArrTime = new Date(item?.Segments?.[0][segmentLength - 1]?.Destination?.ArrTime);
            const hourArr = ArrTime.getHours();
            const airlineName = item?.Segments?.[0][0]?.Airline?.AirlineName;


            const categoryFilters = selectedCategory.map((category) => {

                const [groupName, value] = category.split(':');
                switch (groupName) {

                    case "stop":
                        switch (value) {
                            case "1":
                                return segmentLength === 1;
                            case "2":
                                return segmentLength === 2;
                        }

                    case "flightname":
                        return airlineName === value;

                    case "timeDepart":
                        switch (value) {
                            case "before6AM":
                                return hour < 6;
                            case "6AMto12PM":
                                return hour >= 6 && hour < 12;
                            case "12PMto6PM":
                                return hour >= 12 && hour < 18;
                            case "after6PM":
                                return hour >= 18;
                        }

                    case "timeArrival":
                        switch (value) {
                            case "ARRbefore6AM":
                                return hourArr < 6;
                            case "ARR6AMto12PM":
                                return hourArr >= 6 && hourArr < 12;
                            case "ARR12PMto6PM":
                                return hourArr >= 12 && hourArr < 18;
                            case "ARRafter6PM":
                                return hourArr >= 18;
                        }


                    default:
                        return false;
                }
            });
            const priceInRange = item?.Fare?.PublishedFare <= priceRangeValue;
            return categoryFilters.every((filter) => filter) && priceInRange;
        });


    const filteredDatareturn =
        returnResult?.[0]?.filter((item) => {
            const segmentLength = item?.Segments?.[0].length;
            const depTime = new Date(item?.Segments?.[0][0]?.Origin?.DepTime);
            const hour = depTime.getHours();
            const ArrTime = new Date(item?.Segments?.[0][segmentLength - 1]?.Destination?.ArrTime);
            const hourArr = ArrTime.getHours();
            const airlineName = item?.Segments?.[0][0]?.Airline?.AirlineName;


            const categoryFilters = selectedCategory.map((category) => {

                const [groupName, value] = category.split(':');
                switch (groupName) {

                    case "stop":
                        switch (value) {
                            case "1":
                                return segmentLength === 1;
                            case "2":
                                return segmentLength === 2;
                        }

                    case "flightname":
                        return airlineName === value;

                    case "timeDepart":
                        switch (value) {
                            case "before6AM":
                                return hour < 6;
                            case "6AMto12PM":
                                return hour >= 6 && hour < 12;
                            case "12PMto6PM":
                                return hour >= 12 && hour < 18;
                            case "after6PM":
                                return hour >= 18;
                        }

                    case "timeArrival":
                        switch (value) {
                            case "ARRbefore6AM":
                                return hourArr < 6;
                            case "ARR6AMto12PM":
                                return hourArr >= 6 && hourArr < 12;
                            case "ARR12PMto6PM":
                                return hourArr >= 12 && hourArr < 18;
                            case "ARRafter6PM":
                                return hourArr >= 18;
                        }


                    default:
                        return false;
                }
            });
            const priceInRange = item?.Fare?.PublishedFare <= priceRangeValue;
            return categoryFilters.every((filter) => filter) && priceInRange;
        });

    // console.log(filteredDatareturn, "result")
    // filter logic here 
    const arrSegmentLength = result?.[0]?.[0]?.Segments?.[0]?.length;
    return (

        <>
            <div className="UniComp_BG">
                <div className='mb-5'>
                </div>

                <div className='container'>

                    <div className="row">
                        <div className="d-none d-sm-block col-lg-3 col-md-3 ps-0 scrollDesign">
                            <div className="flightFilterBox">
                                <div className="filterTitle">
                                    <p>Select Filters</p>
                                </div>
                                <div className="innerFilter">
                                    <div>

                                        <div>
                                            <label className="sidebar-label-container ps-0">
                                                <input
                                                    type="checkbox"
                                                    onChange={handleRadioChange}
                                                    value="All"
                                                    name="test"
                                                    checked={selectedCategory.includes("test:All")}
                                                />
                                                {/* <span className="checkmark"></span> */}
                                                <span style={{ color: selectedCategory.length > 0 ? "red" : "gray" }}>Clear Filter</span>
                                            </label>

                                        </div>
                                        {/* <Divider
                    sx={{ marginBottom: "15px", backgroundColor: "gray" }}
                  /> */}
                                    </div>

                                    <div className="busDepartureMain">
                                        <h2 className="sidebar-title">Suggested for you</h2>

                                        <div>
                                            <label className="sidebar-label-container  ps-0">
                                                {/* <span className="checkmark"></span> */}

                                                <div className="svgBOx">
                                                    <input
                                                        type="checkbox"
                                                        onChange={handleRadioChange}
                                                        value="1"
                                                        name="stop"
                                                        checked={selectedCategory.includes("stop:1")}
                                                    />
                                                    <div>
                                                        <span className="checkedSVG pe-2">
                                                            <svg id="fi_2089699" enable-background="new 0 0 515.556 515.556" height="19" viewBox="0 0 515.556 515.556" width="19" xmlns="http://www.w3.org/2000/svg"><path d="m257.778 0c-142.137 0-257.778 115.641-257.778 257.778s115.641 257.778 257.778 257.778 257.778-115.641 257.778-257.778-115.642-257.778-257.778-257.778zm-193.334 257.778c0-41.69 13.397-80.235 35.924-111.846l269.255 269.255c-31.611 22.526-70.156 35.924-111.846 35.924-106.609 0-193.333-86.723-193.333-193.333zm350.743 111.846-269.256-269.256c31.611-22.526 70.156-35.924 111.846-35.924 106.61 0 193.333 86.723 193.333 193.333 0 41.691-13.397 80.236-35.923 111.847z"></path></svg>
                                                        </span>
                                                        <span>Non Stop</span>
                                                    </div>
                                                </div>
                                            </label>

                                            <label className="sidebar-label-container  ps-0">
                                                {/* <span className="checkmark"></span> */}
                                                <div className="svgBOx">
                                                    <input
                                                        type="checkbox"
                                                        onChange={handleRadioChange}
                                                        value="2"
                                                        name="stop"
                                                        checked={selectedCategory.includes("stop:2")}
                                                    />
                                                    <div>
                                                        <span className="checkedSVG pe-2">
                                                            <svg height="19" viewBox="0 0 32 32" width="19" xmlns="http://www.w3.org/2000/svg" id="fi_4212317"><g id="_62-Stopwatch" data-name="62-Stopwatch"><path d="m25.15 10.26 1.56-1.55a1 1 0 1 0 -1.42-1.42l-1.55 1.56a11.9 11.9 0 0 0 -6.74-2.8v-2.05h2a1 1 0 0 0 0-2h-6a1 1 0 0 0 0 2h2v2.05a12 12 0 1 0 10.15 4.21zm-9.15 17.74a10 10 0 1 1 10-10 10 10 0 0 1 -10 10z"></path><path d="m16 10a8 8 0 1 0 8 8 8 8 0 0 0 -8-8zm3.71 11.71a1 1 0 0 1 -1.42 0l-3-3a1 1 0 0 1 -.29-.71v-5a1 1 0 0 1 2 0v4.59l2.71 2.7a1 1 0 0 1 0 1.42z"></path></g></svg>
                                                        </span>
                                                        <span>One Stop</span>
                                                    </div>
                                                </div>
                                            </label>
                                        </div>
                                    </div>


                                    <div className="PackageDepartureMain">
                                        <h2 className="sidebar-title">By Price</h2>
                                        <div>
                                            <input
                                                type="range"
                                                min={minPrice + 1}
                                                max={maxPrice + 1}
                                                step="1000"
                                                value={priceRangeValue}
                                                onChange={handlePriceRangeChange}
                                            />
                                            <span>Max price ₹{""}{priceRangeValue}</span>
                                        </div>
                                        <Divider sx={{ marginBottom: "15px", backgroundColor: "gray" }} />
                                    </div>


                                    {/* for going flight */}

                                    <h4 className='returnHeading'>Going Flight</h4>

                                    <div className="busDepartureMain">
                                        <h2 className="sidebar-title">Departure From {
                                            result.length > 0 && result?.[0][0]?.Segments?.[0][0]?.Origin?.Airport?.CityName
                                        }</h2>

                                        <div>
                                            <label className="sidebar-label-container  ps-0">
                                                {/* <span className="checkmark"></span> */}

                                                <div className="svgBOx">
                                                    <input
                                                        type="checkbox"
                                                        onChange={handleRadioChange}
                                                        value="before6AM"
                                                        name="timeDepart"
                                                        checked={selectedCategory.includes("timeDepart:before6AM")}
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
                                                        onChange={handleRadioChange}
                                                        value="6AMto12PM"
                                                        name="timeDepart"
                                                        checked={selectedCategory.includes("timeDepart:6AMto12PM")}
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
                                                        onChange={handleRadioChange}
                                                        value="12PMto6PM"
                                                        name="timeDepart"
                                                        checked={selectedCategory.includes("timeDepart:12PMto6PM")}
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
                                                        onChange={handleRadioChange}
                                                        value="after6PM"
                                                        name="timeDepart"
                                                        checked={selectedCategory.includes("timeDepart:after6PM")}
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
                                    </div>

                                    <div className="busDepartureMain">
                                        <h2 className="sidebar-title">Arrival at  {
                                            result.length > 0 && result?.[0][0]?.Segments?.[0][arrSegmentLength - 1]?.Destination
                                                ?.Airport?.CityName
                                        }</h2>

                                        <div>
                                            <label className="sidebar-label-container  ps-0">
                                                {/* <span className="checkmark"></span> */}

                                                <div className="svgBOx">
                                                    <input
                                                        type="checkbox"
                                                        onChange={handleRadioChange}
                                                        value="ARRbefore6AM"
                                                        name="timeArrival"
                                                        checked={selectedCategory.includes("timeArrival:ARRbefore6AM")}
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
                                                        onChange={handleRadioChange}
                                                        value="ARR6AMto12PM"
                                                        name="timeArrival"
                                                        checked={selectedCategory.includes("timeArrival:ARR6AMto12PM")}
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
                                                        onChange={handleRadioChange}
                                                        value="ARR12PMto6PM"
                                                        name="timeArrival"
                                                        checked={selectedCategory.includes("timeArrival:ARR12PMto6PM")}
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
                                                        onChange={handleRadioChange}
                                                        value="ARRafter6PM"
                                                        name="timeArrival"
                                                        checked={selectedCategory.includes("timeArrival:ARRafter6PM")}
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
                                    </div>

                                    {/* for going flight  */}


                                    {/* for return flight  */}

                                    <h4 className='returnHeading'>Return Flight</h4>

                                    <div className="busDepartureMain">
                                        <h2 className="sidebar-title">Departure From {
                                            result.length > 0 && result?.[1][0]?.Segments?.[0][0]?.Origin?.Airport?.CityName
                                        }</h2>

                                        <div>
                                            <label className="sidebar-label-container  ps-0">
                                                {/* <span className="checkmark"></span> */}

                                                <div className="svgBOx">
                                                    <input
                                                        type="checkbox"
                                                        onChange={handleRadioChange}
                                                        value="before6AM"
                                                        name="timeDepart"
                                                        checked={selectedCategory.includes("timeDepart:before6AM")}
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
                                                        onChange={handleRadioChange}
                                                        value="6AMto12PM"
                                                        name="timeDepart"
                                                        checked={selectedCategory.includes("timeDepart:6AMto12PM")}
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
                                                        onChange={handleRadioChange}
                                                        value="12PMto6PM"
                                                        name="timeDepart"
                                                        checked={selectedCategory.includes("timeDepart:12PMto6PM")}
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
                                                        onChange={handleRadioChange}
                                                        value="after6PM"
                                                        name="timeDepart"
                                                        checked={selectedCategory.includes("timeDepart:after6PM")}
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
                                    </div>

                                    <div className="busDepartureMain">
                                        <h2 className="sidebar-title">Arrival at  {
                                            result.length > 0 && result?.[1][0]?.Segments?.[0][arrSegmentLength - 1]?.Destination
                                                ?.Airport?.CityName
                                        }</h2>

                                        <div>
                                            <label className="sidebar-label-container  ps-0">
                                                {/* <span className="checkmark"></span> */}

                                                <div className="svgBOx">
                                                    <input
                                                        type="checkbox"
                                                        onChange={handleRadioChange}
                                                        value="ARRbefore6AM"
                                                        name="timeArrival"
                                                        checked={selectedCategory.includes("timeArrival:ARRbefore6AM")}
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
                                                        onChange={handleRadioChange}
                                                        value="ARR6AMto12PM"
                                                        name="timeArrival"
                                                        checked={selectedCategory.includes("timeArrival:ARR6AMto12PM")}
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
                                                        onChange={handleRadioChange}
                                                        value="ARR12PMto6PM"
                                                        name="timeArrival"
                                                        checked={selectedCategory.includes("timeArrival:ARR12PMto6PM")}
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
                                                        onChange={handleRadioChange}
                                                        value="ARRafter6PM"
                                                        name="timeArrival"
                                                        checked={selectedCategory.includes("timeArrival:ARRafter6PM")}
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
                                    </div>


                                    {/* for return flight  */}




                                    <div className="busDepartureMain">
                                        <h2 className="sidebar-title">Airlines</h2>
                                        <div>
                                            {
                                                [...new Set(
                                                    result[0]?.map(item => `${item?.Segments[0][0]?.Airline?.AirlineName}, ${item?.Segments[0][0]?.Airline?.AirlineCode}`))]
                                                    .map((airline, index) => (
                                                        <label key={index} className="sidebar-label-container  ps-0">
                                                            <div className="svgBOx">
                                                                <input
                                                                    type="checkbox"
                                                                    onChange={handleRadioChange}
                                                                    value={airline.split(',')[0]}
                                                                    name="flightname"
                                                                    checked={selectedCategory.includes(`flightname:${airline.split(',')[0]}`)}
                                                                />
                                                                <div>
                                                                    <span className="checkedSVG imgBoxFilter pe-2">

                                                                        <img
                                                                            src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/${airline.split(',')[1].trim()}.png`}
                                                                            alt="flight"
                                                                        />{" "}
                                                                    </span>
                                                                    <span>{airline.split(',')[0]}</span>
                                                                </div>
                                                            </div>
                                                        </label>
                                                    ))
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-9">
                            <div className="row ">
                                {/* <div className="col-lg-12"> */}
                                <div className="col-6 ps-0">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="returnheadicons">
                                                {/* <div>
                                                    <p>Flight</p>
                                                    <span><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                                        <path d="M6 9.5L3 6.5M6 9.5L9 6.5M6 9.5L6 2.5" stroke="#21325D" stroke-linecap="round" stroke-linejoin="round" />
                                                    </svg></span>
                                                </div> */}
                                                <div>
                                                    <p>Departure</p>
                                                    <span><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                                        <path d="M6 9.5L3 6.5M6 9.5L9 6.5M6 9.5L6 2.5" stroke="#21325D" stroke-linecap="round" stroke-linejoin="round" />
                                                    </svg></span>
                                                </div>
                                                <div>
                                                    <p>Duration</p>
                                                    <span><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                                        <path d="M6 9.5L3 6.5M6 9.5L9 6.5M6 9.5L6 2.5" stroke="#21325D" stroke-linecap="round" stroke-linejoin="round" />
                                                    </svg></span>
                                                </div>
                                                <div>
                                                    <p>Arrival</p>
                                                    <span><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                                        <path d="M6 9.5L3 6.5M6 9.5L9 6.5M6 9.5L6 2.5" stroke="#21325D" stroke-linecap="round" stroke-linejoin="round" />
                                                    </svg></span>
                                                </div>
                                                <div>
                                                    <p>Offer Fare</p>
                                                    <span><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                                        <path d="M6 9.5L3 6.5M6 9.5L9 6.5M6 9.5L6 2.5" stroke="#21325D" stroke-linecap="round" stroke-linejoin="round" />
                                                    </svg></span>
                                                </div>

                                            </div>
                                        </div>

                                        {
                                            result?.[0] !== undefined && (
                                                <div className="col-lg-12">
                                                    {filteredData?.map((item, index) => {
                                                        const isSelected = selectedFlightIndex === index;
                                                        const duration = `${Math.floor(
                                                            item?.Segments?.[0][0]?.Duration / 60
                                                        )}hr ${item?.Segments?.[0][0]?.Duration % 60
                                                            }min`;

                                                        return (
                                                            <>
                                                                <motion.div
                                                                    variants={variants}
                                                                    initial="initial"
                                                                    whileInView="animate"
                                                                >
                                                                    <motion.div variants={variants}
                                                                        onClick={() => {
                                                                            handleIndexId(item);
                                                                            handleFlightSelection(index);
                                                                            // console.log(item, "result index")
                                                                        }}
                                                                        className="">
                                                                        <div class="returnFlightResultBox">

                                                                            <div class="returnFlightResultBoxOne" style={{ flex: 10 }}>

                                                                                <div class="returnResultFlightDetails">
                                                                                    <div>
                                                                                        <img
                                                                                            src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/${item?.ValidatingAirline}.png`}
                                                                                            alt="flight"
                                                                                        />{" "}
                                                                                    </div>
                                                                                    <span>{
                                                                                        item?.Segments[0][0]?.Airline
                                                                                            ?.AirlineName
                                                                                    }</span>
                                                                                    <p>{
                                                                                        item?.Segments[0][0]?.Airline
                                                                                            ?.AirlineCode
                                                                                    }
                                                                                        {
                                                                                            item?.Segments[0][0]?.Airline
                                                                                                ?.FlightNumber
                                                                                        }</p>
                                                                                </div>
                                                                                <div class="returnResultOtherDetails">
                                                                                    <div class="returnResultTimingBox">
                                                                                        <span>{
                                                                                            item?.Segments[0][0]?.Origin
                                                                                                ?.Airport?.CityName
                                                                                        }</span>
                                                                                        <p>{dayjs(
                                                                                            item?.Segments[0][0]?.Origin
                                                                                                ?.DepTime
                                                                                        ).format("DD MMM, YY")}
                                                                                        </p>
                                                                                        <h5 class="daySize">{dayjs(
                                                                                            item?.Segments[0][0]?.Origin
                                                                                                ?.DepTime
                                                                                        ).format("h:mm A")}</h5>
                                                                                    </div>
                                                                                    <div class="returnResultDurationBox">
                                                                                        {
                                                                                            item?.Segments[0].length > 1 ?
                                                                                                <h4>
                                                                                                    {`${Math.floor(
                                                                                                        item?.Segments[0][0]?.Duration /
                                                                                                        60
                                                                                                    )}hr ${item?.Segments[0][0]?.Duration %
                                                                                                    60
                                                                                                        }min`}{" "}
                                                                                                    -{" "}
                                                                                                    {`${Math.floor(
                                                                                                        item?.Segments[0][1]?.Duration /
                                                                                                        60
                                                                                                    )}hr ${item?.Segments[0][0]?.Duration %
                                                                                                    60
                                                                                                        }min`}
                                                                                                </h4> : <h4>
                                                                                                    {`${Math.floor(
                                                                                                        item?.Segments[0][0]?.Duration /
                                                                                                        60
                                                                                                    )}hr ${item?.Segments[0][0]?.Duration %
                                                                                                    60
                                                                                                        }min`}
                                                                                                </h4>}


                                                                                        {
                                                                                            item?.Segments[0].length > 1 ?
                                                                                                (
                                                                                                    <div className=" stopBefReturn">
                                                                                                        <Divider
                                                                                                            orientation="vertical"
                                                                                                            flexItem
                                                                                                            sx={{
                                                                                                                backgroundColor: "#21325d",
                                                                                                                marginX: "8px",
                                                                                                                height: "3px",
                                                                                                            }}
                                                                                                            className=""
                                                                                                        />
                                                                                                    </div>
                                                                                                ) :

                                                                                                (
                                                                                                    <div className=" stopBefOneStop">
                                                                                                        <Divider
                                                                                                            orientation="vertical"
                                                                                                            flexItem
                                                                                                            sx={{
                                                                                                                backgroundColor: "#21325d",
                                                                                                                marginX: "8px",
                                                                                                                height: "3px",
                                                                                                            }}
                                                                                                        />
                                                                                                    </div>
                                                                                                )
                                                                                        }
                                                                                        <p>{
                                                                                            item?.Segments[0].length > 1 ?
                                                                                                `${item?.Segments[0].length - 1} stop via ${item?.Segments[0][0]?.Destination?.Airport?.CityName}` : "Non Stop"}</p>

                                                                                        <span>
                                                                                            {
                                                                                                item?.Segments[0][0]
                                                                                                    ?.NoOfSeatAvailable
                                                                                            }{" "}
                                                                                            Seats Left
                                                                                        </span>
                                                                                    </div>
                                                                                    <div class="returnResultTimingBox">
                                                                                        <span>
                                                                                            {
                                                                                                item?.Segments[0][item?.Segments[0].length - 1]?.Destination
                                                                                                    ?.Airport?.CityName
                                                                                            }
                                                                                        </span>
                                                                                        <p>
                                                                                            {dayjs(
                                                                                                item?.Segments?.[0][item?.Segments[0].length - 1]?.Destination?.ArrTime
                                                                                            ).format("DD MMM, YY")}
                                                                                        </p>
                                                                                        <h5 className="daySize">
                                                                                            {dayjs(
                                                                                                item?.Segments?.[0][item?.Segments[0].length - 1]
                                                                                                    ?.Destination?.ArrTime
                                                                                            ).format("h:mm A")}
                                                                                        </h5>
                                                                                    </div>
                                                                                </div>
                                                                            </div>

                                                                            <div className="singleFlightBoxSeven singleFlightBoxSevenReturn" style={{ flex: 2 }}>

                                                                                <p>₹ {(item?.Fare?.PublishedFare).toFixed(0)}</p>
                                                                                <input type="radio" name='going' id={`going-${index}`} checked={isSelected} />
                                                                            </div>
                                                                        </div>

                                                                    </motion.div>
                                                                </motion.div>

                                                            </>
                                                        );
                                                    })}
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                                <div className="col-6 ps-0">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="returnheadicons">
                                                {/* <div>
                                                    <p>Flight</p>
                                                    <span><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                                        <path d="M6 9.5L3 6.5M6 9.5L9 6.5M6 9.5L6 2.5" stroke="#21325D" stroke-linecap="round" stroke-linejoin="round" />
                                                    </svg></span>
                                                </div> */}
                                                <div>
                                                    <p>Departure</p>
                                                    <span><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                                        <path d="M6 9.5L3 6.5M6 9.5L9 6.5M6 9.5L6 2.5" stroke="#21325D" stroke-linecap="round" stroke-linejoin="round" />
                                                    </svg></span>
                                                </div>
                                                <div>
                                                    <p>Duration</p>
                                                    <span><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                                        <path d="M6 9.5L3 6.5M6 9.5L9 6.5M6 9.5L6 2.5" stroke="#21325D" stroke-linecap="round" stroke-linejoin="round" />
                                                    </svg></span>
                                                </div>
                                                <div>
                                                    <p>Arrival</p>
                                                    <span><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                                        <path d="M6 9.5L3 6.5M6 9.5L9 6.5M6 9.5L6 2.5" stroke="#21325D" stroke-linecap="round" stroke-linejoin="round" />
                                                    </svg></span>
                                                </div>
                                                <div>
                                                    <p>Offer Fare</p>
                                                    <span><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                                        <path d="M6 9.5L3 6.5M6 9.5L9 6.5M6 9.5L6 2.5" stroke="#21325D" stroke-linecap="round" stroke-linejoin="round" />
                                                    </svg></span>
                                                </div>
                                                {/* <div>
                                    <p>Select</p>
                                    <span><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                        <path d="M6 9.5L3 6.5M6 9.5L9 6.5M6 9.5L6 2.5" stroke="#21325D" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg></span>
                                </div> */}
                                            </div>
                                        </div>

                                        <div className="col-lg-12 pe-0">
                                            {
                                                result?.[0] !== undefined && (
                                                    <div className="col-lg-12">
                                                        {filteredDatareturn?.map((item, index) => {
                                                            const isSelected = selectedFlightIndexReturn === index;

                                                            const duration = `${Math.floor(
                                                                item?.Segments?.[0][0]?.Duration / 60
                                                            )}hr ${item?.Segments?.[0][0]?.Duration % 60
                                                                }min`;

                                                            return (
                                                                <>
                                                                    <motion.div
                                                                        variants={variants}
                                                                        initial="initial"
                                                                        whileInView="animate"
                                                                    >
                                                                        <motion.div variants={variants}

                                                                            onClick={() => {
                                                                                handleIndexIdreturn(item);
                                                                                handleFlightSelectionReturn(index)

                                                                            }}
                                                                            className="">
                                                                            <div className="columnFLightName d-flex d-sm-none">
                                                                                <div>
                                                                                    <img
                                                                                        src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/${item?.ValidatingAirline}.png`}
                                                                                        alt="flight"
                                                                                    />{" "}
                                                                                </div>
                                                                                <span>
                                                                                    {
                                                                                        item?.Segments[0][0]?.Airline
                                                                                            ?.AirlineName
                                                                                    }
                                                                                </span>
                                                                                <p>
                                                                                    {
                                                                                        item?.Segments?.[0][0]?.Airline
                                                                                            ?.AirlineCode
                                                                                    }
                                                                                    {
                                                                                        item?.Segments?.[0][0]?.Airline
                                                                                            ?.FlightNumber
                                                                                    }

                                                                                </p>
                                                                            </div>



                                                                            <div class="returnFlightResultBox">

                                                                                <div class="returnFlightResultBoxOne" style={{ flex: 10 }}>

                                                                                    <div class="returnResultFlightDetails">
                                                                                        <div>
                                                                                            <img
                                                                                                src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/${item?.ValidatingAirline}.png`}
                                                                                                alt="flight"
                                                                                            />{" "}
                                                                                        </div>
                                                                                        <span>{
                                                                                            item?.Segments[0][0]?.Airline
                                                                                                ?.AirlineName
                                                                                        }</span>
                                                                                        <p>{
                                                                                            item?.Segments[0][0]?.Airline
                                                                                                ?.AirlineCode
                                                                                        }
                                                                                            {
                                                                                                item?.Segments[0][0]?.Airline
                                                                                                    ?.FlightNumber
                                                                                            }</p>
                                                                                    </div>
                                                                                    <div class="returnResultOtherDetails">
                                                                                        <div class="returnResultTimingBox">
                                                                                            <span>{
                                                                                                item?.Segments[0][0]?.Origin
                                                                                                    ?.Airport?.CityName
                                                                                            }</span>
                                                                                            <p>{dayjs(
                                                                                                item?.Segments[0][0]?.Origin
                                                                                                    ?.DepTime
                                                                                            ).format("DD MMM, YY")}
                                                                                            </p>
                                                                                            <h5 class="daySize">{dayjs(
                                                                                                item?.Segments[0][0]?.Origin
                                                                                                    ?.DepTime
                                                                                            ).format("h:mm A")}</h5>
                                                                                        </div>
                                                                                        <div class="returnResultDurationBox">
                                                                                            {
                                                                                                item?.Segments[0].length > 1 ?
                                                                                                    <h4>
                                                                                                        {`${Math.floor(
                                                                                                            item?.Segments[0][0]?.Duration /
                                                                                                            60
                                                                                                        )}hr ${item?.Segments[0][0]?.Duration %
                                                                                                        60
                                                                                                            }min`}{" "}
                                                                                                        -{" "}
                                                                                                        {`${Math.floor(
                                                                                                            item?.Segments[0][1]?.Duration /
                                                                                                            60
                                                                                                        )}hr ${item?.Segments[0][0]?.Duration %
                                                                                                        60
                                                                                                            }min`}
                                                                                                    </h4> : <h4>
                                                                                                        {`${Math.floor(
                                                                                                            item?.Segments[0][0]?.Duration /
                                                                                                            60
                                                                                                        )}hr ${item?.Segments[0][0]?.Duration %
                                                                                                        60
                                                                                                            }min`}
                                                                                                    </h4>}


                                                                                            {
                                                                                                item?.Segments[0].length > 1 ?
                                                                                                    (
                                                                                                        <div className=" stopBefReturn">
                                                                                                            <Divider
                                                                                                                orientation="vertical"
                                                                                                                flexItem
                                                                                                                sx={{
                                                                                                                    backgroundColor: "#21325d",
                                                                                                                    marginX: "8px",
                                                                                                                    height: "3px",
                                                                                                                }}
                                                                                                                className=""
                                                                                                            />
                                                                                                        </div>
                                                                                                    ) :

                                                                                                    (
                                                                                                        <div className=" stopBefOneStop">
                                                                                                            <Divider
                                                                                                                orientation="vertical"
                                                                                                                flexItem
                                                                                                                sx={{
                                                                                                                    backgroundColor: "#21325d",
                                                                                                                    marginX: "8px",
                                                                                                                    height: "3px",
                                                                                                                }}
                                                                                                            />
                                                                                                        </div>
                                                                                                    )
                                                                                            }
                                                                                            <p>{
                                                                                                item?.Segments[0].length > 1 ?
                                                                                                    `${item?.Segments[0].length - 1} stop via ${item?.Segments[0][0]?.Destination?.Airport?.CityName}` : "Non Stop"}</p>

                                                                                            <span>
                                                                                                {
                                                                                                    item?.Segments[0][0]
                                                                                                        ?.NoOfSeatAvailable
                                                                                                }{" "}
                                                                                                Seats Left
                                                                                            </span>
                                                                                        </div>
                                                                                        <div class="returnResultTimingBox">
                                                                                            <span>
                                                                                                {
                                                                                                    item?.Segments[0][item?.Segments[0].length - 1]?.Destination
                                                                                                        ?.Airport?.CityName
                                                                                                }
                                                                                            </span>
                                                                                            <p>
                                                                                                {dayjs(
                                                                                                    item?.Segments?.[0][item?.Segments[0].length - 1]?.Destination?.ArrTime
                                                                                                ).format("DD MMM, YY")}
                                                                                            </p>
                                                                                            <h5 className="daySize">
                                                                                                {dayjs(
                                                                                                    item?.Segments?.[0][item?.Segments[0].length - 1]
                                                                                                        ?.Destination?.ArrTime
                                                                                                ).format("h:mm A")}
                                                                                            </h5>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>

                                                                                <div className="singleFlightBoxSeven singleFlightBoxSevenReturn" style={{ flex: 2 }}>

                                                                                    <p>₹ {(item?.Fare?.PublishedFare).toFixed(0)}</p>
                                                                                    <input type="radio" name='coming' id={`coming-${index}`} checked={isSelected} />
                                                                                </div>
                                                                            </div>
                                                                        </motion.div>
                                                                    </motion.div>

                                                                </>
                                                            );
                                                        })}
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                                {/* </div> */}
                            </div>
                        </div>
                    </div>

                </div>

                {
                    !isNaN(Number(ongoFlight?.Fare?.PublishedFare) + Number(incomeGlight?.Fare?.PublishedFare)) && (
                        <div className='container fixedReturnBottom' style={{ position: "fixed", bottom: "13px", zIndex: "9999" }}>
                            <div className="row ">
                                <div className="col-5">
                                    <div className="row">
                                        <div className="col-lg-12">

                                            <motion.div
                                                variants={variants}
                                                initial="initial"
                                                whileInView="animate"
                                            >
                                                <motion.div variants={variants}

                                                    className="mobileflexDesign returnFixedBottomDesign">
                                                    <div className="columnFLightName d-flex d-sm-none">
                                                        <div>
                                                            <img
                                                                src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/${ongoFlight?.ValidatingAirline}.png`}
                                                                alt="flight"
                                                            />{" "}
                                                        </div>
                                                        <span>
                                                            {
                                                                ongoFlight?.Segments[0][0]?.Airline
                                                                    ?.AirlineName
                                                            }
                                                        </span>
                                                        {/* <p>
                                                    {
                                                        ongoFlight?.Segments?.[0][0]?.Airline
                                                            ?.AirlineCode
                                                    }
                                                    {
                                                        ongoFlight?.Segments?.[0][0]?.Airline
                                                            ?.FlightNumber
                                                    }

                                                </p> */}
                                                    </div>
                                                    <motion.div
                                                        variants={variants}
                                                        className="singleFlightBox"
                                                    >
                                                        <div className="singleFlightBoxOne">
                                                            <div>
                                                                <img
                                                                    src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/${ongoFlight?.ValidatingAirline}.png`}
                                                                    alt="flight"
                                                                />{" "}
                                                            </div>
                                                            <span>
                                                                {
                                                                    ongoFlight?.Segments[0][0]?.Airline
                                                                        ?.AirlineName
                                                                }
                                                            </span>
                                                            {/* <p>
                                                        {
                                                            ongoFlight?.Segments[0][0]?.Airline
                                                                ?.AirlineCode
                                                        }
                                                        {
                                                            ongoFlight?.Segments[0][0]?.Airline
                                                                ?.FlightNumber
                                                        }
                                                    </p> */}
                                                        </div>
                                                        <div className="singleFlightBoxTwo">
                                                            <span>
                                                                {
                                                                    ongoFlight?.Segments[0][0]?.Origin
                                                                        ?.Airport?.CityName
                                                                }
                                                            </span>
                                                            <p>
                                                                {dayjs(
                                                                    ongoFlight?.Segments[0][0]?.Origin
                                                                        ?.DepTime
                                                                ).format("DD MMM, YY")}
                                                            </p>
                                                            <h5 className="daySize">
                                                                {dayjs(
                                                                    ongoFlight?.Segments[0][0]?.Origin
                                                                        ?.DepTime
                                                                ).format("h:mm A")}
                                                            </h5>
                                                        </div>

                                                        <div className="singleFlightBoxThree">


                                                            <span className="">
                                                                <svg id="fi_9170928" height="25" viewBox="0 0 64 64" width="25" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1"><path d="m51.93 33-50.93-.041a1 1 0 0 1 0-2l50.931.041a1 1 0 0 1 0 2z"></path><path d="m64 32.012c-5.681 2.1-12.731 5.692-17.1 9.5l3.446-9.512-3.433-9.513c4.365 3.813 11.409 7.413 17.087 9.525z"></path></svg>
                                                            </span>


                                                        </div>

                                                        <div className="singleFlightBoxFour">
                                                            <span>
                                                                {
                                                                    ongoFlight?.Segments[0][ongoFlight?.Segments[0].length - 1]?.Destination
                                                                        ?.Airport?.CityName
                                                                }
                                                            </span>
                                                            <p>
                                                                {dayjs(
                                                                    ongoFlight?.Segments?.[0][ongoFlight?.Segments[0].length - 1]?.Destination?.ArrTime
                                                                ).format("DD MMM, YY")}
                                                            </p>
                                                            <h5 className="daySize">
                                                                {dayjs(
                                                                    ongoFlight?.Segments?.[0][ongoFlight?.Segments[0].length - 1]
                                                                        ?.Destination?.ArrTime
                                                                ).format("h:mm A")}
                                                            </h5>
                                                        </div>

                                                        <div className="singleFlightBoxSeven">
                                                            <p>₹ {(ongoFlight?.Fare?.PublishedFare)}</p>

                                                        </div>
                                                    </motion.div>
                                                </motion.div>
                                            </motion.div>


                                        </div>
                                    </div>
                                </div>

                                <div className="col-5">
                                    <div className="row">
                                        <div className="col-lg-12 pe-0">

                                            <motion.div
                                                variants={variants}
                                                initial="initial"
                                                whileInView="animate"
                                            >
                                                <motion.div variants={variants}

                                                    className="mobileflexDesign returnFixedBottomDesign">
                                                    <div className="columnFLightName d-flex d-sm-none">
                                                        <div>
                                                            <img
                                                                src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/${incomeGlight?.ValidatingAirline}.png`}
                                                                alt="flight"
                                                            />{" "}
                                                        </div>
                                                        <span>
                                                            {
                                                                incomeGlight?.Segments[0][0]?.Airline
                                                                    ?.AirlineName
                                                            }
                                                        </span>
                                                        {/* <p>
                                                    {
                                                        incomeGlight?.Segments?.[0][0]?.Airline
                                                            ?.AirlineCode
                                                    }
                                                    {
                                                        incomeGlight?.Segments?.[0][0]?.Airline
                                                            ?.FlightNumber
                                                    }

                                                </p> */}
                                                    </div>
                                                    <motion.div
                                                        variants={variants}
                                                        className="singleFlightBox"
                                                    >
                                                        <div className="singleFlightBoxOne">
                                                            <div>
                                                                <img
                                                                    src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/${incomeGlight?.ValidatingAirline}.png`}
                                                                    alt="flight"
                                                                />{" "}
                                                            </div>
                                                            <span>
                                                                {
                                                                    incomeGlight?.Segments[0][0]?.Airline
                                                                        ?.AirlineName
                                                                }
                                                            </span>
                                                            {/* <p>
                                                        {
                                                            incomeGlight?.Segments[0][0]?.Airline
                                                                ?.AirlineCode
                                                        }
                                                        {
                                                            incomeGlight?.Segments[0][0]?.Airline
                                                                ?.FlightNumber
                                                        }
                                                    </p> */}
                                                        </div>
                                                        <div className="singleFlightBoxTwo">
                                                            <span>
                                                                {
                                                                    incomeGlight?.Segments[0][0]?.Origin
                                                                        ?.Airport?.CityName
                                                                }
                                                            </span>
                                                            <p>
                                                                {dayjs(
                                                                    incomeGlight?.Segments[0][0]?.Origin
                                                                        ?.DepTime
                                                                ).format("DD MMM, YY")}
                                                            </p>
                                                            <h5 className="daySize">
                                                                {dayjs(
                                                                    incomeGlight?.Segments[0][0]?.Origin
                                                                        ?.DepTime
                                                                ).format("h:mm A")}
                                                            </h5>
                                                        </div>

                                                        <div className="singleFlightBoxThree">


                                                            <span>
                                                                <svg id="fi_9170928" height="25" viewBox="0 0 64 64" width="25" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1"><path d="m51.93 33-50.93-.041a1 1 0 0 1 0-2l50.931.041a1 1 0 0 1 0 2z"></path><path d="m64 32.012c-5.681 2.1-12.731 5.692-17.1 9.5l3.446-9.512-3.433-9.513c4.365 3.813 11.409 7.413 17.087 9.525z"></path></svg>
                                                            </span>

                                                        </div>

                                                        <div className="singleFlightBoxFour">
                                                            <span>
                                                                {
                                                                    incomeGlight?.Segments[0][incomeGlight?.Segments[0].length - 1]?.Destination
                                                                        ?.Airport?.CityName
                                                                }
                                                            </span>
                                                            <p>
                                                                {dayjs(
                                                                    incomeGlight?.Segments?.[0][incomeGlight?.Segments[0].length - 1]?.Destination?.ArrTime
                                                                ).format("DD MMM, YY")}
                                                            </p>
                                                            <h5 className="daySize">
                                                                {dayjs(
                                                                    incomeGlight?.Segments?.[0][incomeGlight?.Segments[0].length - 1]
                                                                        ?.Destination?.ArrTime
                                                                ).format("h:mm A")}
                                                            </h5>
                                                        </div>

                                                        <div className="singleFlightBoxSeven">
                                                            <p>₹ {(incomeGlight?.Fare?.PublishedFare)}</p>

                                                        </div>
                                                    </motion.div>
                                                </motion.div>
                                            </motion.div>


                                        </div>
                                    </div>
                                </div>

                                <div className="col-2">

                                    <div className="returnResultButtonBox">
                                        <p>
                                            {
                                                ` ₹ ${(Number(ongoFlight?.Fare?.PublishedFare) +
                                                    Number(incomeGlight?.Fare?.PublishedFare)
                                                ).toFixed(0)
                                                }`
                                            }
                                        </p>
                                        <div className="buttonReturnBox">
                                            <button onClick={handleFareRuleAndQuote}>Book Now</button>
                                        </div>
                                        <div className="emiBOx" onClick={() => {
                                            sessionStorage.setItem("amountPayLater", (Number(ongoFlight?.Fare?.PublishedFare) + Number(incomeGlight?.Fare?.PublishedFare)).toFixed(0));
                                            navigate("/payLaterDetails");
                                        }}>
                                            <span style={{ fontSize: "12px", color: "white" }}>Book Now At</span>
                                            <p style={{ fontSize: "12px" }}>
                                                {
                                                    ((Number(ongoFlight?.Fare?.PublishedFare) + Number(incomeGlight?.Fare?.PublishedFare))).toFixed(0) <= 5000
                                                        ? ((Number(ongoFlight?.Fare?.PublishedFare) + Number(incomeGlight?.Fare?.PublishedFare)) / 3).toFixed(0)
                                                        : ((Number(ongoFlight?.Fare?.PublishedFare) + Number(incomeGlight?.Fare?.PublishedFare)) <= 50000
                                                            ? ((Number(ongoFlight?.Fare?.PublishedFare) + Number(incomeGlight?.Fare?.PublishedFare)) / 6).toFixed(0)
                                                            : ((Number(ongoFlight?.Fare?.PublishedFare) + Number(incomeGlight?.Fare?.PublishedFare)) / 12).toFixed(0))
                                                }/Month →
                                            </p>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }


            </div>


        </>
    )
}

export default ReturnResult
