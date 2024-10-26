import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiURL } from "../../../Constants/constant";
import { ipAction, tokenAction } from "../../../Redux/IP/actionIp";
import { useNavigate } from "react-router-dom";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import axios from "axios";
import TravelerCounter from "../../../components/TravelerCounter";
import { clearbookTicketGDS } from "../../../Redux/FlightBook/actionFlightBook";
import { resetAllFareData } from "../../../Redux/FlightFareQuoteRule/actionFlightQuote";
import SecureStorage from "react-secure-storage";
import "./newReturnform.css"
import { returnAction, returnActionClear } from "../../../Redux/FlightSearch/Return/return";
import { swalModal } from "../../../utility/swal";
import { Modal, Select } from "antd";
import { DatePicker, Space } from "antd";
import dayjs from "dayjs";
import { Dropdown, Menu, Button } from 'antd';
import { useMediaQuery } from 'react-responsive';
import CustomCalender from "../../GRMHotel/CustomCalender";
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
    const { data } = props;
    const [fromData, setFromData] = useState([]);
    const [fromValue, setFromValue] = useState(initialSelectedFromData.name);
    const [selectedItem, setSelectedItem] = useState(initialSelectedFromData);

    useEffect(() => {
        setFromDisplayValue(data.name);
    }, [data])
    const [FromPlaceholder, setFromPlaceholder] = useState('')
    const [FromDisplayValue, setFromDisplayValue] = useState(initialSelectedFromData.name);
    const [inputStyle, setInputStyle] = useState({});

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
        setFromDisplayValue(selected ? selected.name : newValue);
        setSelectedItem(selected ? selected.item : null);
        setInputStyle({ caretColor: 'transparent' });
        if (selected) {
            onItemSelect(selected.item);
        }
    };

    const handleFromFocus = () => {
        setFromPlaceholder('From');
        setFromDisplayValue(''); // Clear display value to show placeholder
        setInputStyle({});
    };

    const handleFromBlur = () => {
        setFromPlaceholder('');
        setFromDisplayValue(fromValue); // Reset display value to selected value
        setInputStyle({ caretColor: 'transparent' });
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
            style={inputStyle}
            // value={fromValue}
            value={FromDisplayValue}
            // placeholder={props.placeholder}
            placeholder={FromPlaceholder || props.placeholder}
            // style={props.style}
            defaultActiveFirstOption={false}
            suffixIcon={null}
            filterOption={false}
            onSearch={handleFromSearch}
            onChange={handleFromChange}
            onFocus={handleFromFocus} // Set placeholder on focus
            onBlur={handleFromBlur}
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

    const { data } = props;
    const [toData, setToData] = useState([]);
    const [toValue, setToValue] = useState(initialSelectedToData.name);
    const [selectedItem, setSelectedItem] = useState(initialSelectedToData);

    useEffect(() => {
        setToDisplayValue(data.name);
    }, [data])

    const [ToPlaceholder, setToPlaceholder] = useState('')
    const [ToDisplayValue, setToDisplayValue] = useState(initialSelectedToData.name);
    const [inputStyle, setInputStyle] = useState({});

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
        setToDisplayValue(selected ? selected.name : newValue);
        setSelectedItem(selected ? selected.item : null);
        setInputStyle({ caretColor: 'transparent' });
        if (selected) {
            onItemSelect(selected.item);
        }
    };

    const handleToFocus = () => {
        setToPlaceholder('To');
        setToDisplayValue(''); // Clear display value to show placeholder
        setInputStyle({});
    };

    const handleTOBlur = () => {
        setToPlaceholder('');
        setToDisplayValue(toValue); // Reset display value to selected value
        setInputStyle({ caretColor: 'transparent' });
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
            // value={toValue}
            value={ToDisplayValue}
            // placeholder={props.placeholder}
            placeholder={ToPlaceholder || props.placeholder}
            // placeholder={props.placeholder}
            // style={props.style}
            style={inputStyle}
            defaultActiveFirstOption={false}
            suffixIcon={null}
            filterOption={false}
            onSearch={handleToSearch}
            onChange={handleToChange}
            onFocus={handleToFocus} // Set placeholder on focus
            onBlur={handleTOBlur}
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
    // const [startDate, setStartDate] = useState(new Date());
    const [loader, setLoader] = useState(false);
    const [openTravelModal, setOpenTravelModal] = useState(false);
    const [activeIdClass, setActiveIdClass] = useState(2);
    const [activeIdChild, setActiveIdChild] = useState(0);
    const [activeIdInfant, setActiveIdInfant] = useState(0);
    const [activeIdAdult, setActiveIdAdult] = useState(1);
    const [totalCount, setCountPassanger] = useState(0);
    const [selectedFrom, setSelectedFrom] = useState(initialSelectedFromData);
    const [selectedTo, setSelectedTo] = useState(initialSelectedToData);

    const isMobile = useMediaQuery({ maxWidth: 767 });

    const handleFromSelect = (item) => {
        setSelectedFrom(item);
    };
    const handleToSelect = (item) => {
        setSelectedTo(item);
    };

    // console.log(selectedFrom)

    useEffect(() => {
        dispatch(returnActionClear());
        dispatch(ipAction());
    }, []);


    useEffect(() => {
        const payload = {
            EndUserIp: reducerState?.ip?.ipData,
        };
        dispatch(tokenAction(payload));
    }, [reducerState?.ip?.ipData]);

    // Ant Design Date Range Picker


    const dateFormat = "DD MMM, YY";
    const today = dayjs().format(dateFormat);
    const [modalVisible, setModalVisible] = useState(false);
    const [newDepartDate, setNewDepartDate] = useState(today);
    const [newReturnDate, setNewReturnDate] = useState(today);



    const handleOpenModal = () => {
        setModalVisible(true);
    };


    const handleCloseModal = () => {
        setModalVisible(false);
    };

    const handleSelectDateRange = (startDate, endDate) => {
        setNewDepartDate(dayjs(startDate).format("DD MMM, YY"));
        setNewReturnDate(dayjs(endDate).format("DD MMM, YY"));
    };

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
        // { id: 1, label: "All" },
        { id: 2, label: "Economy" },
        { id: 3, label: "Premium Economy" },
        { id: 4, label: "Business" },
        // { id: 5, label: "Premium Business" },
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


    // document.getElementsByClassName(".ant-picker-panel").add.classlist("responsiveRangePicker")

    document.querySelectorAll(".ant-picker-panel-layout").forEach(element => {
        element.classList.add("responsiveRangePicker");
    });



    const handleRoundLogoClick = () => {
        setSelectedFrom(selectedTo);
        setSelectedTo(selectedFrom);
    };


    const items = ClassItems.map((ele) => ({
        key: ele.id, // Unique key
        label: ele.label, // Label to display
        onClick: () => {
            setActiveIdClass(ele.id);
            // setflightClassName(ele.value);
        },
    }));



    return (
        <>
            <div className="container" style={{ paddingBottom: "57px" }}>
                <div className="row g-2 newOneWayMain">
                    <div className="col-lg-3">
                        <div className="newOnewaySingle">
                            <span>Departure</span>
                            <FromSearchInput
                                placeholder="Search"
                                style={{ width: "100%" }}
                                onItemSelect={handleFromSelect}
                                data={selectedFrom}
                            />
                            {/* <div>
                                <span className="nrsb">{selectedFrom?.code}</span>
                            </div> */}
                        </div>
                    </div>


                    <div
                        className="roundlogoFlight"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleRoundLogoClick();
                        }}
                        style={{ cursor: "pointer" }}
                    >
                        <svg width="38" height="38" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.5" y="1" width="30.9976" height="31" rx="15.4988" fill="white" />
                            <rect x="0.5" y="1" width="30.9976" height="31" rx="15.4988" stroke="#071C2C" />
                            <path d="M23.4384 18.9784C23.5487 18.9785 23.6565 19.0113 23.7483 19.0725C23.8401 19.1336 23.9117 19.2206 23.9543 19.3224C23.9968 19.4241 24.0084 19.5362 23.9875 19.6445C23.9666 19.7528 23.9141 19.8526 23.8368 19.9312L19.4952 24.3336C19.4435 24.3859 19.382 24.4275 19.3142 24.4561C19.2465 24.4846 19.1737 24.4995 19.1002 24.5C18.9517 24.5009 18.8089 24.4427 18.7032 24.3384C18.5975 24.234 18.5377 24.0919 18.5368 23.9434C18.5359 23.7948 18.594 23.652 18.6984 23.5464L22.1 20.0984H8.56166C8.41314 20.0984 8.27071 20.0394 8.16569 19.9344C8.06067 19.8293 8.00167 19.6869 8.00167 19.5384C8.00167 19.3899 8.06067 19.2474 8.16569 19.1424C8.27071 19.0374 8.41314 18.9784 8.56166 18.9784H23.4384ZM13.2944 8.66165C13.3468 8.71329 13.3885 8.77473 13.4171 8.84248C13.4458 8.91022 13.4608 8.98295 13.4613 9.05649C13.4618 9.13004 13.4478 9.20296 13.4202 9.27111C13.3925 9.33925 13.3517 9.40128 13.3 9.45365L9.89846 12.9016H23.4368C23.5853 12.9016 23.7277 12.9606 23.8328 13.0656C23.9378 13.1707 23.9968 13.3131 23.9968 13.4616C23.9968 13.6101 23.9378 13.7526 23.8328 13.8576C23.7277 13.9626 23.5853 14.0216 23.4368 14.0216H8.55926C8.44895 14.0215 8.34114 13.9888 8.24935 13.9276C8.15757 13.8664 8.0859 13.7794 8.04335 13.6777C8.00079 13.5759 7.98924 13.4638 8.01015 13.3555C8.03106 13.2472 8.08349 13.1475 8.16087 13.0688L12.5032 8.66645C12.5549 8.61413 12.6164 8.5725 12.6842 8.54394C12.752 8.51538 12.8247 8.50046 12.8982 8.50001C12.9718 8.49956 13.0447 8.51361 13.1128 8.54135C13.1809 8.56908 13.2421 8.60996 13.2944 8.66165Z" fill="#E73C34" />
                        </svg>

                    </div>


                    <div className="col-lg-3">
                        <div className="newOnewaySingle">
                            <span>Arrival</span>
                            <ToSearchInput
                                placeholder="Search"
                                style={{ width: "100%" }}
                                onItemSelect={handleToSelect} // Pass the callback function
                                data={selectedTo}
                            />
                            {/* <div>
                                <span className="nrsb">{selectedTo?.code}</span>
                            </div> */}
                        </div>

                    </div>

                    {

                        isMobile ?
                            (
                                <div className="col-lg-3">
                                    <div className="newOnewaySingle " onClick={handleOpenModal}>
                                        <span className="me-4">Depart</span>
                                        <span className="ms-5 smMargin">Return</span>
                                        <div className="travelContent smallCustomCalender">
                                            <p className="selectedDates">
                                                {newDepartDate}
                                            </p>
                                            <p className="selectedDates">
                                                {newReturnDate}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="customCalenderModalBOx">
                                        <CustomCalender
                                            visible={modalVisible}
                                            onClose={handleCloseModal}
                                            onSelectDateRange={handleSelectDateRange}
                                            startDate={newDepartDate}
                                            endDate={newReturnDate}
                                        />
                                    </div>
                                </div>
                            )
                            :
                            (
                                <div className="col-lg-3">
                                    <div className="newOnewaySingle">
                                        {/* <div className="d-flex justify-content-evenly"> */}
                                        <span className="me-4">Depart</span>
                                        <span className="ms-5 smMargin">Return</span>
                                        {/* </div> */}
                                        <RangePicker
                                            onChange={handleRangeChange}
                                            defaultValue={[dayjs(), dayjs()]}
                                            format={dateFormat}
                                            disabledDate={disablePastDates}
                                        />
                                        {/* <div className="d-flex justify-content-evenly">
                                <span className="nrsb">{dayjs(newDepartDate).format('dddd')}</span>
                                <span className="nrsb">{dayjs(newReturnDate).format('dddd')}</span>
                            </div> */}

                                    </div>
                                </div>
                            )
                    }



                    <div className="col-lg-3">
                        <div>
                            <div className="newOnewaySingle " onClick={handleTravelClickOpen}>
                                <span>Traveller & Class</span>
                                <div className="travelContent">
                                    <p>
                                        {(totalCount === 0 && 1) || totalCount} Traveller, {" "}
                                        {(activeIdClass === 1 && "All") ||
                                            (activeIdClass === 2 && "Economy") ||
                                            (activeIdClass === 3 && "Premium Economy") ||
                                            (activeIdClass === 4 && "Business") ||
                                            (activeIdClass === 5 && "Premium Business") ||
                                            (activeIdClass === 6 && "First Class")}
                                    </p>
                                </div>
                            </div>
                            <Modal className="customCalenderModalTraveller" open={openTravelModal} onCancel={handleTravelClose} footer={null}>
                                <>
                                    <div className="travellersModalNew">
                                        <div>
                                            <h3>Traveller & Class</h3>
                                        </div>
                                        <div className="travellerContentBox">
                                            <TravelerCounter
                                                label="Adults"
                                                sublabel="Age 13 or above"
                                                count={activeIdAdult}
                                                onIncrement={() =>
                                                    handleTravelerCountChange("adult", 1)
                                                }
                                                onDecrement={() =>
                                                    handleTravelerCountChange("adult", -1)
                                                }
                                            />
                                            <TravelerCounter
                                                label="Children"
                                                sublabel="Age 2-12 Years"
                                                count={activeIdChild}
                                                onIncrement={() =>
                                                    handleTravelerCountChange("child", 1)
                                                }
                                                onDecrement={() =>
                                                    handleTravelerCountChange("child", -1)
                                                }
                                            />
                                            <TravelerCounter
                                                label="Infants"
                                                sublabel="Age 0-2 Years"
                                                count={activeIdInfant}
                                                onIncrement={() =>
                                                    handleTravelerCountChange("infant", 1)
                                                }
                                                onDecrement={() =>
                                                    handleTravelerCountChange("infant", -1)
                                                }
                                            />
                                            <div>
                                                <label htmlFor=""> Choose Travel Class</label>
                                                <Dropdown
                                                    overlay={
                                                        <Menu
                                                            items={items}
                                                            selectedKeys={[activeIdClass]}
                                                        />
                                                    }
                                                    placement="top"
                                                    arrow={{
                                                        pointAtCenter: true,
                                                    }}
                                                >
                                                    <Button>
                                                        {ClassItems.find((ele) => ele.id === activeIdClass)?.label || 'Select Class'}
                                                    </Button>
                                                </Dropdown>
                                            </div>
                                        </div>
                                        {/* <div>
                      <h3 className="d-none d-md-block">
                        Choose Travel Class
                      </h3>
                    </div>
                    <div>
                      
                    </div> */}
                                    </div>
                                </>
                                <div className="calenderButton">

                                    <Button onClick={handleTravelClose} >Continue</Button>
                                </div>
                            </Modal>
                        </div>
                    </div>

                </div>

                <div
                    className="flightSearchButtonBox">
                    <Button onClick={handleOnewaySubmit} loading={loader}>
                        Search
                    </Button>
                </div>
            </div>
        </>
    );
};

export default ReturnFormNew;




