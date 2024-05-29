import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiURL } from "../../../Constants/constant";
import { ipAction, tokenAction } from "../../../Redux/IP/actionIp";
import { useNavigate } from "react-router-dom";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import TravelerCounter from "../../../components/TravelerCounter";
import { clearbookTicketGDS } from "../../../Redux/FlightBook/actionFlightBook";
import { resetAllFareData } from "../../../Redux/FlightFareQuoteRule/actionFlightQuote";
import SecureStorage from "react-secure-storage";
import "./newReturnform.css"
import { returnAction, returnActionClear } from "../../../Redux/FlightSearch/Return/return";
import { swalModal } from "../../../utility/swal";
import { Select } from "antd";
import { DatePicker, Space, Button } from "antd";
import dayjs from "dayjs";
const { RangePicker } = DatePicker;



// from data logic 


let FromTimeout;
let FromCurrentValue;

const initialSelectedFromData = {
    AirportCode: "DEL",
    CityCode: "DEL",
    CountryCode: "IN ",
    code: "Indira Gandhi Airport",
    createdAt: "2023-01-30T14:58:34.428Z",
    id: "DEL",
    name: "Delhi",
    updatedAt: "2023-01-30T14:58:34.428Z",
    __v: 0,
    _id: "63d7db1a64266cbf450e07c1",
};

const fetchFromCity = (value, callback) => {
    if (FromTimeout) {
        clearTimeout(FromTimeout);
        FromTimeout = null;
    }
    FromCurrentValue = value;
    const cityData = () => {
        axios
            .get(`${apiURL.baseURL}/skyTrails/city/searchCityData?keyword=${value}`)
            .then((response) => {
                if (FromCurrentValue === value) {
                    const { data } = response.data;
                    const result = data.map((item) => ({
                        value: item._id,
                        name: item.name,
                        code: item.code,
                        cityCode: item.CityCode,
                        item, // Store the entire item for later use
                    }));
                    callback(result);
                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    };
    if (value) {
        FromTimeout = setTimeout(cityData, 200);
    } else {
        callback([]);
    }
};

const FromSearchInput = (props) => {
    const { onItemSelect } = props;
    const [fromData, setFromData] = useState([]);
    const [fromValue, setFromValue] = useState(initialSelectedFromData.name);
    const [selectedItem, setSelectedItem] = useState(initialSelectedFromData);

    useEffect(() => {
        setFromData([
            {
                value: initialSelectedFromData._id,
                name: initialSelectedFromData.name,
                code: initialSelectedFromData.code,
                cityCode: initialSelectedFromData.CityCode,
                item: initialSelectedFromData,
            },
        ]);
    }, []);

    const handleFromSearch = (newValue) => {
        fetchFromCity(newValue, setFromData);
    };

    const handleFromChange = (newValue) => {
        const selected = fromData.find((d) => d.value === newValue);
        setFromValue(selected ? selected.name : newValue);
        setSelectedItem(selected ? selected.item : null);
        if (selected) {
            onItemSelect(selected.item);
        }
    };

    const renderFromOption = (option) => (
        <div>
            <div>
                {option.name} ({option.cityCode})
            </div>
            <div style={{ color: "gray" }}>{option.code}</div>
        </div>
    );

    return (
        <Select
            showSearch
            value={fromValue}
            placeholder={props.placeholder}
            style={props.style}
            defaultActiveFirstOption={false}
            suffixIcon={null}
            filterOption={false}
            onSearch={handleFromSearch}
            onChange={handleFromChange}
            notFoundContent={null}
            options={fromData.map((d) => ({
                value: d.value,
                label: renderFromOption(d),
            }))}
        />
    );
};


// from data logic



// to data logic 


let ToTimeout;
let ToCurrentValue;

const initialSelectedToData = {
    AirportCode: "BOM",
    CityCode: "BOM",
    CountryCode: "IN ",
    code: "Chhatrapati Shivaji Maharaj International Airport",
    createdAt: "2023-01-30T14:58:34.428Z",
    id: "BOM",
    name: "Mumbai",
    updatedAt: "2023-01-30T14:58:34.428Z",
    __v: 0,
    _id: "63d7db1a64266cbf450e07c2",
};

const fetchToCity = (value, callback) => {
    if (ToTimeout) {
        clearTimeout(ToTimeout);
        ToTimeout = null;
    }
    ToCurrentValue = value;
    const cityData = () => {
        axios
            .get(`${apiURL.baseURL}/skyTrails/city/searchCityData?keyword=${value}`)
            .then((response) => {
                if (ToCurrentValue === value) {
                    const { data } = response.data;
                    const result = data.map((item) => ({
                        value: item._id,
                        name: item.name,
                        code: item.code,
                        cityCode: item.CityCode,
                        item, // Store the entire item for later use
                    }));
                    callback(result);
                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    };
    if (value) {
        ToTimeout = setTimeout(cityData, 200);
    } else {
        callback([]);
    }
};

const ToSearchInput = (props) => {
    const { onItemSelect } = props;
    const [toData, setToData] = useState([]);
    const [toValue, setToValue] = useState(initialSelectedToData.name);
    const [selectedItem, setSelectedItem] = useState(initialSelectedToData);

    useEffect(() => {
        setToData([
            {
                value: initialSelectedToData._id,
                name: initialSelectedToData.name,
                code: initialSelectedToData.code,
                cityCode: initialSelectedToData.CityCode,
                item: initialSelectedToData,
            },
        ]);
    }, []);

    const handleToSearch = (newValue) => {
        fetchToCity(newValue, setToData);
    };

    const handleToChange = (newValue) => {
        const selected = toData.find((d) => d.value === newValue);
        setToValue(selected ? selected.name : newValue);
        setSelectedItem(selected ? selected.item : null);
        if (selected) {
            onItemSelect(selected.item);
        }
    };

    const renderToOption = (option) => (
        <div>
            <div>
                {option.name} ({option.cityCode})
            </div>
            <div style={{ color: "gray" }}>{option.code}</div>
        </div>
    );

    return (
        <Select
            showSearch
            value={toValue}
            placeholder={props.placeholder}
            style={props.style}
            defaultActiveFirstOption={false}
            suffixIcon={null}
            filterOption={false}
            onSearch={handleToSearch}
            onChange={handleToChange}
            notFoundContent={null}
            options={toData.map((d) => ({
                value: d.value,
                label: renderToOption(d),
            }))}
        />
    );
};


// to data logic 

const ReturnFormNew = () => {


    const reducerState = useSelector((state) => state);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState(new Date());
    const [loader, setLoader] = useState(false);
    const [openTravelModal, setOpenTravelModal] = useState(false);
    const [activeIdClass, setActiveIdClass] = useState(2);
    const [activeIdChild, setActiveIdChild] = useState(0);
    const [activeIdInfant, setActiveIdInfant] = useState(0);
    const [activeIdAdult, setActiveIdAdult] = useState(1);
    const [totalCount, setCountPassanger] = useState(0);
    const [selectedFrom, setSelectedFrom] = useState(initialSelectedFromData);
    const [selectedTo, setSelectedTo] = useState(initialSelectedToData);

    const handleFromSelect = (item) => {
        setSelectedFrom(item);
    };
    const handleToSelect = (item) => {
        setSelectedTo(item);
    };

    // console.log(selectedFrom)

    useEffect(() => {
        dispatch(returnActionClear());
    }, []);

    useEffect(() => {
        dispatch(ipAction());
    }, []);

    useEffect(() => {
        const payload = {
            EndUserIp: reducerState?.ip?.ipData,
        };
        dispatch(tokenAction(payload));
    }, [reducerState?.ip?.ipData]);

    // Ant Design Date Range Picker
    const getDayOfWeek = (date) => {
        const daysOfWeek = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ];
        return daysOfWeek[date.getDay()];
    };

    const dateFormat = "DD MMM";
    const today = dayjs().format(dateFormat);
    const [newDepartDate, setNewDepartDate] = useState(today);
    const [newReturnDate, setNewReturnDate] = useState(today);

    const handleRangeChange = (dates, dateStrings) => {
        if (dates) {
            setNewDepartDate(dayjs(dates[0]).format("DD MMM, YY"));
            setNewReturnDate(dayjs(dates[1]).format("DD MMM, YY"));
        } else {
            console.log("Selection cleared");
        }
    };


    const disablePastDates = (current) => {
        return current && current < dayjs().startOf('day');
    };






    useEffect(() => {
        if (reducerState?.return?.isLoading === true) {
            setLoader(true);
        }
    }, [reducerState?.return?.isLoading]);

    const returnResults =
        reducerState?.return?.returnData?.data?.data?.Response?.Results;

    useEffect(() => {
        if (returnResults) {
            if (returnResults[1] !== undefined) {
                navigate(`/ReturnResult`);
            } else {
                navigate("/ReturnResultInternational");
            }
        }

        if (returnResults) {
            setLoader(false);
        }
    }, [reducerState?.return?.returnData?.data?.data?.Response?.Results]);

    useEffect(() => {
        if (
            reducerState?.return?.returnData?.data?.data?.Response?.Error
                ?.ErrorCode !== 0 &&
            reducerState?.return?.returnData?.data?.data?.Response?.Error
                ?.ErrorCode !== undefined
        ) {
            // navigate("/return")
            dispatch(returnActionClear());
            swalModal(
                "flight",
                reducerState?.return?.returnData?.data?.data?.Response?.Error
                    ?.ErrorMessage,
                false
            );
            setLoader(false);
        }
    }, [
        reducerState?.return?.returnData?.data?.data?.Response?.Error?.ErrorCode,
    ]);

    const handleTravelerCountChange = (category, value) => {
        if (category === "adult") {
            const newAdultCount = Math.min(Math.max(1, activeIdAdult + value), 9);
            const maxAllowedChild = Math.max(0, 9 - newAdultCount);
            const newChildCount = Math.min(activeIdChild, maxAllowedChild);

            setActiveIdAdult(newAdultCount);
            setActiveIdChild(newChildCount);

            const newInfantCount = Math.min(activeIdInfant, newAdultCount);
            setActiveIdInfant(newInfantCount);
        } else if (category === "child") {
            const newChildCount = Math.min(
                Math.max(0, activeIdChild + value),
                9 - activeIdAdult
            );
            setActiveIdChild(newChildCount);
        } else if (category === "infant") {
            const newInfantCount = Math.min(
                Math.max(0, activeIdInfant + value),
                activeIdAdult
            );
            setActiveIdInfant(newInfantCount);
        }
    };

    // Handle travelers modal
    useEffect(() => {
        dispatch(clearbookTicketGDS());
        dispatch(resetAllFareData());
    }, []);

    const ClassItems = [
        { id: 1, label: "All" },
        { id: 2, label: "Economy" },
        { id: 3, label: "Premium Economy" },
        { id: 4, label: "Business" },
        { id: 5, label: "Premium Business" },
        { id: 6, label: "First" },
    ];

    const handleTravelClickOpen = () => {
        setActiveIdClass(activeIdClass);
        setActiveIdChild(0);
        setActiveIdInfant(0);
        setActiveIdAdult(1);
        setOpenTravelModal(true);
    };

    const handleTravelClose = (event, reason) => {
        if (reason !== "backdropClick") {
            setOpenTravelModal(false);
            setCountPassanger(
                parseInt(activeIdChild) +
                parseInt(activeIdInfant) +
                parseInt(activeIdAdult)
            );
        }
    };

    function handleOnewaySubmit(event) {
        event.preventDefault();


        const payload = {
            EndUserIp: reducerState?.ip?.ipData,
            TokenId: reducerState?.ip?.tokenData,
            AdultCount: activeIdAdult,
            ChildCount: activeIdChild,
            InfantCount: activeIdInfant,
            DirectFlight: "false",
            OneStopFlight: "false",
            JourneyType: "2",
            PreferredAirlines: null,
            Segments: [
                {
                    Origin: selectedFrom.AirportCode,
                    Destination: selectedTo.AirportCode,
                    FlightCabinClass: activeIdClass,
                    PreferredDepartureTime: newDepartDate,
                    PreferredArrivalTime: newDepartDate,
                },
                {
                    Origin: selectedTo.AirportCode,
                    Destination: selectedFrom.AirportCode,
                    FlightCabinClass: activeIdClass,
                    PreferredDepartureTime: newReturnDate,
                    PreferredArrivalTime: newReturnDate,
                },
            ],
            Sources: null,
        };



        sessionStorage.setItem("adults", activeIdAdult);
        sessionStorage.setItem("childs", activeIdChild);
        sessionStorage.setItem("infants", activeIdInfant);

        dispatch(returnAction(payload));
    }


    return (
        <>
            <div className="container" style={{ paddingBottom: "70px" }}>
                <div className="row g-2 newReturnForm">
                    <div className="col-lg-3">
                        <div className="newReturnSingleBox">
                            <div>
                                <span className="nrsb">From</span>
                            </div>
                            <FromSearchInput
                                placeholder="input search text"
                                style={{ width: "100%" }}
                                onItemSelect={handleFromSelect} // Pass the callback function
                            />
                            <div>
                                <span className="nrsb">{selectedFrom?.code}</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="newReturnSingleBox">
                            <div>
                                <span className="nrsb">From</span>
                            </div>
                            <ToSearchInput
                                placeholder="input search text"
                                style={{ width: "100%" }}
                                onItemSelect={handleToSelect} // Pass the callback function
                            />
                            <div>
                                <span className="nrsb">{selectedTo?.code}</span>
                            </div>
                        </div>

                    </div>
                    <div className="col-lg-3">
                        {/* <Space direction="vertical" size={10}> */}
                        <div className="newReturnSingleBox">
                            <div className="d-flex justify-content-evenly">
                                <span className="nrsb">Depart</span>
                                <span className="nrsb">Return</span>
                            </div>
                            <RangePicker
                                onChange={handleRangeChange}
                                defaultValue={[dayjs(), dayjs()]}
                                format={dateFormat}
                                disabledDate={disablePastDates}
                            />
                            <div className="d-flex justify-content-evenly">
                                <span className="nrsb">{dayjs(newDepartDate).format('dddd')}</span>
                                <span className="nrsb">{dayjs(newReturnDate).format('dddd')}</span>
                            </div>

                        </div>
                        {/* </Space> */}
                    </div>

                    <div className="col-lg-3">
                        <div>
                            <div className="newReturnSingleBox " onClick={handleTravelClickOpen}>
                                <div>
                                    <span className="nrsb">Traveller & Class</span>
                                </div>

                                <p className="nrsbpara">
                                    {(totalCount === 0 && 1) || totalCount} {" "}
                                    Traveller
                                </p>
                                <div className="d-none d-md-block ">
                                    <span className="nrsb">
                                        {(activeIdClass === 1 && "All") ||
                                            (activeIdClass === 2 && "Economy") ||
                                            (activeIdClass === 3 && "Premium Economy") ||
                                            (activeIdClass === 4 && "Business") ||
                                            (activeIdClass === 5 && "Premium Business") ||
                                            (activeIdClass === 6 && "First Class")}
                                    </span>
                                </div>
                            </div>
                            <Dialog
                                sx={{ zIndex: "99999" }}
                                disableEscapeKeyDown
                                open={openTravelModal}
                                onClose={handleTravelClose}
                            >
                                <DialogContent>
                                    <>
                                        <div className="travellerModal">
                                            <div>
                                                <h3>TRAVELLERS & CLASS</h3>
                                            </div>
                                            <div className="travellerPeople">
                                                <TravelerCounter
                                                    label="Adults (Age 12+ Years)"
                                                    count={activeIdAdult}
                                                    onIncrement={() =>
                                                        handleTravelerCountChange("adult", 1)
                                                    }
                                                    onDecrement={() =>
                                                        handleTravelerCountChange("adult", -1)
                                                    }
                                                />
                                                <TravelerCounter
                                                    label="Children (Age 2-12 Years)"
                                                    count={activeIdChild}
                                                    onIncrement={() =>
                                                        handleTravelerCountChange("child", 1)
                                                    }
                                                    onDecrement={() =>
                                                        handleTravelerCountChange("child", -1)
                                                    }
                                                />
                                                <TravelerCounter
                                                    label="Infants (Age 0-2 Years)"
                                                    count={activeIdInfant}
                                                    onIncrement={() =>
                                                        handleTravelerCountChange("infant", 1)
                                                    }
                                                    onDecrement={() =>
                                                        handleTravelerCountChange("infant", -1)
                                                    }
                                                />
                                            </div>
                                            <div>
                                                <h3 className="d-none d-md-block">
                                                    Choose Travel Class
                                                </h3>
                                            </div>
                                            <div>
                                                <ul className="classButtonTravel">
                                                    {ClassItems.map((ele) => (
                                                        <li
                                                            key={ele.id}
                                                            style={{
                                                                backgroundColor:
                                                                    ele.id === activeIdClass
                                                                        ? "#d90429"
                                                                        : "#fff",
                                                                color:
                                                                    ele.id === activeIdClass
                                                                        ? "#fff"
                                                                        : "#d90429",
                                                            }}
                                                            onClick={() => setActiveIdClass(ele.id)}
                                                        >
                                                            {ele.label}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </>
                                </DialogContent>
                                <DialogActions
                                    style={{
                                        justifyContent: "center",
                                    }}
                                >
                                    <Button
                                        style={{
                                            backgroundColor: "#21325d",
                                            color: "white",
                                        }}
                                        onClick={handleTravelClose}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        style={{
                                            backgroundColor: "#21325d",
                                            color: "white",
                                        }}
                                        onClick={handleTravelClose}
                                    >
                                        Ok
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                    </div>

                </div>

                <div
                    style={{ position: "relative", top: "80px", marginTop: "-45px" }}
                    className="onewaySearch-btn" id="item-5Return">
                    <Button className="returnButton" style={{ padding: "8px 36px", height: "unset" }} onClick={handleOnewaySubmit} loading={loader}>
                        Search
                    </Button>
                </div>
            </div>
        </>
    );
};

export default ReturnFormNew;




