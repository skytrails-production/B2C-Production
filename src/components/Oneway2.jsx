import React, { useEffect, useRef, useState } from "react";
import "./Onewaynew.css";
import { useDispatch, useSelector } from "react-redux";
import { apiURL } from "../Constants/constant";
// import FlightTakeoffTwoToneIcon from "@mui/icons-material/FlightTakeoffTwoTone";
import axios from "axios";
import { clearbookTicketGDS } from "../Redux/FlightBook/actionFlightBook";
import "react-datepicker/dist/react-datepicker.css";
import { oneWayAction, resetOneWay, oneWayActionCombined } from "../Redux/FlightSearch/oneWay";
import { searchFlight, clearSearch } from "../Redux/SearchFlight/actionSearchFlight";
import { useNavigate } from "react-router-dom";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./style/Oneway.css";
import "./oneway2.scss"
import "react-datepicker/dist/react-datepicker.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./card.css";
// import { Helmet } from "react-helmet-async";
import "./flight.css";
import TravelerCounter from "./TravelerCounter";
import { resetAllFareData } from "../Redux/FlightFareQuoteRule/actionFlightQuote";
// import SecureStorage from "react-secure-storage";
import { returnActionClear } from "../Redux/FlightSearch/Return/return";
import { Modal, Select } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import { Dropdown, Menu } from 'antd';
import { DatePicker, Button } from "antd";
import dayjs from "dayjs";
// import reduxSaga from "redux-saga";
// const { RangePicker } = DatePicker;



// from data logic 


let FromTimeout;
let FromCurrentValue;



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
  let value2 = JSON.parse(sessionStorage.getItem("onewayprop"));
  // console.log(value2, "value222222")
  let initialSelectedFromData = {
    AirportCode: value2?.[0]?.selectedFrom
      ?.AirportCode,
    CityCode: value2?.[0]?.selectedFrom?.CityCode,
    CountryCode: value2?.[0]?.selectedFrom?.CountryCode,
    code: value2?.[0]?.selectedFrom?.code,
    createdAt: "2023-01-30T14:58:34.428Z",
    id: value2?.[0]?.selectedFrom?.id,
    name: value2?.[0]?.selectedFrom?.name,
    updatedAt: "2023-01-30T14:58:34.428Z",
    __v: 0,
    _id: "63d7db1a64266cbf450e07c1",
  };
  const { onItemSelect } = props;
  const [fromData, setFromData] = useState([]);
  const [fromValue, setFromValue] = useState(initialSelectedFromData.name);
  const [selectedItem, setSelectedItem] = useState(initialSelectedFromData);


  const [FromPlaceholder, setFromPlaceholder] = useState('')
  const [FromDisplayValue, setFromDisplayValue] = useState(initialSelectedFromData.name);
  // console.log(FromDisplayValue, "FromDisplayValue")
  const [inputStyle, setInputStyle] = useState({});





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
  const renderFromOption = (option) => {
    // console.log(option,"optionnnnnnnnnn")
    return (
      <div>
        <div >{option.code}</div>
        <div style={{ color: "gray" }}>
          {option.name} ({option?.item?.AirportCode})
        </div>
      </div>)
  };

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

  let value2 = JSON.parse(sessionStorage.getItem("onewayprop"));
  let initialSelectedToData = {
    AirportCode: value2?.[0]?.selectedTo?.AirportCode,
    CityCode: value2?.[0]?.selectedTo?.CityCode,
    CountryCode: value2?.[0]?.selectedTo?.CountryCode,
    code: value2?.[0]?.selectedTo?.code,
    createdAt: "2023-01-30T14:58:34.428Z",
    id: value2?.[0]?.selectedTo?.id,
    name: value2?.[0]?.selectedTo?.name,
    updatedAt: "2023-01-30T14:58:34.428Z",
    __v: 0,
    _id: "63d7db1a64266cbf450e07c1",
  };

  const { onItemSelect } = props;
  const [toData, setToData] = useState([]);
  const [toValue, setToValue] = useState(initialSelectedToData.name);
  const [selectedItem, setSelectedItem] = useState(initialSelectedToData);

  const [ToPlaceholder, setToPlaceholder] = useState('')
  const [ToDisplayValue, setToDisplayValue] = useState(initialSelectedToData.name);
  const [inputStyle, setInputStyle] = useState({});



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
      <div >{option.code}</div>
      <div style={{ color: "gray" }}>
        {option.name} ({option?.item?.AirportCode})
      </div>
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



function OnewayNew() {
  let value2 = JSON.parse(sessionStorage.getItem("onewayprop"));
  // console.log(value2, "value222222")
  let initialSelectedFromData = {
    AirportCode: value2?.[0]?.selectedFrom
      ?.AirportCode,
    CityCode: value2?.[0]?.selectedFrom?.CityCode,
    CountryCode: value2?.[0]?.selectedFrom?.CountryCode,
    code: value2?.[0]?.selectedFrom?.code,
    createdAt: "2023-01-30T14:58:34.428Z",
    id: value2?.[0]?.selectedFrom?.id,
    name: value2?.[0]?.selectedFrom?.name,
    updatedAt: "2023-01-30T14:58:34.428Z",
    __v: 0,
    _id: "63d7db1a64266cbf450e07c1",
  };
  let initialSelectedToData = {
    AirportCode: value2?.[0]?.selectedTo?.AirportCode,
    CityCode: value2?.[0]?.selectedTo?.CityCode,
    CountryCode: value2?.[0]?.selectedTo?.CountryCode,
    code: value2?.[0]?.selectedTo?.code,
    createdAt: "2023-01-30T14:58:34.428Z",
    id: value2?.[0]?.selectedTo?.id,
    name: value2?.[0]?.selectedTo?.name,
    updatedAt: "2023-01-30T14:58:34.428Z",
    __v: 0,
    _id: "63d7db1a64266cbf450e07c1",
  };

  const totalcount = value2?.[0]?.totalCount;
  const adultcount = value2?.[0]?.activeIdAdult;
  const childcout = value2?.[0]?.activeIdChild;
  const infantcount = value2?.[0]?.activeIdInfant;
  const flightclassvalue = value2?.[0]?.FlightCabinClass;
  const flightclassnamevalue = value2?.[0]?.flightclassName;

  // console.log("total coutn",totalcount,adultcount,childcout,infantcount,flightclassvalue);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const revertDate = dayjs(value2?.[0]?.newDepartDate).format("DD MMM, YY")
  const passedDate = new Date(revertDate);
  const [startDate, setStartDate] = useState(passedDate);
  const reducerState = useSelector((state) => state);
  const [loader, setLoader] = useState(false);
  const [openTravelModal, setOpenTravelModal] = useState(false);
  const [activeIdClass, setActiveIdClass] = useState(flightclassvalue);
  const [flightclassName, setflightClassName] = useState(flightclassnamevalue);
  const [activeIdChild, setActiveIdChild] = useState(childcout);
  const [activeIdInfant, setActiveIdInfant] = useState(infantcount);
  const [activeIdAdult, setActiveIdAdult] = useState(adultcount);
  const [totalCount, setCountPassanger] = useState(totalcount);
  const [selectedFrom, setSelectedFrom] = useState(initialSelectedFromData);
  const [selectedTo, setSelectedTo] = useState(initialSelectedToData);
  // console.log(reducerState, "reducerstate")

  useEffect(() => {
    dispatch(clearbookTicketGDS());
    dispatch(resetAllFareData());
    dispatch(returnActionClear());
    // dispatch(clearSearch());
  }, []);

  const handleFromSelect = (item) => {
    setSelectedFrom(item);
  };
  const handleToSelect = (item) => {
    setSelectedTo(item);
  };


  const dateFormat = "DD MMM, YY";
  // const today = dayjs().format(dateFormat);
  const initialDepartDate = value2?.[0]?.newDepartDate;

  // const [newDepartDate, setNewDepartDate] = useState(value2?.newDepartDate);
  const [newDepartDate, setNewDepartDate] = useState(initialDepartDate);

  // console.log(newDepartDate, "new departure date")

  const handleRangeChange = (date) => {
    if (date) {
      setNewDepartDate(dayjs(date).format(dateFormat));
    } else {
      console.log("Selection cleared");
    }
  };


  const disablePastDates = (current) => {
    return current && current < dayjs().startOf('day');
  };


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
    // { id: 1,value:"Y", label: "All" },
    { id: 2, value: "Y", label: "Economy" },
    { id: 3, value: "W", label: "Premium Economy" },
    { id: 4, value: "C", label: "Business" },
    // { id: 5, label: "Premium Business" },
    { id: 6, value: "F", label: "First" },
  ];

  const handleTravelClickOpen = () => {
    setActiveIdClass(flightclassvalue);
    setflightClassName(flightclassnamevalue);
    setActiveIdChild(activeIdChild);
    setActiveIdInfant(activeIdInfant);
    setActiveIdAdult(activeIdAdult);
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




  // ////////////////////submit logic///////////////

  function handleOnewaySubmit(event) {

    event.preventDefault();

    // sessionStorage.setItem("SessionExpireTime", new Date());

    const payload = {
      EndUserIp: reducerState?.ip?.ipData,
      TokenId: reducerState?.ip?.tokenData,
      AdultCount: activeIdAdult,
      ChildCount: activeIdChild,
      InfantCount: activeIdInfant,
      DirectFlight: "false",
      OneStopFlight: "false",
      JourneyType: 1,
      PreferredAirlines: null,
      Segments: [
        {
          Origin: selectedFrom.AirportCode,
          Destination: selectedTo.AirportCode,
          FlightCabinClass: activeIdClass,
          PreferredDepartureTime: newDepartDate,
          PreferredArrivalTime: newDepartDate,
        },
      ],
      Sources: null,
      to: selectedTo.AirportCode,
      from: selectedFrom.AirportCode,
      date: newDepartDate,
      cabinClass: flightclassName,
      // px: activeIdAdult + activeIdChild + activeIdInfant,
      px: activeIdAdult,
    };

    const parsedDate = new Date(newDepartDate);

    // Convert to ISO 8601 format with UTC
    const formattedDate = parsedDate.toISOString();
    // console.log(formattedDate,"formattedDate")
    dispatch(oneWayAction(payload));
    dispatch(oneWayActionCombined(payload));
    const searchpy = {
      from: { ...selectedFrom },
      to: { ...selectedTo },
      departureDate: formattedDate,
    };
    dispatch(searchFlight(searchpy));
    navigate(
      `/Searchresult?adult=${activeIdAdult}&child=${activeIdChild}&infant=${activeIdInfant}`
    );
    // }
  }






  const handleFocusDatePicker = (e) => {
    e.target.blur();
  };
  const handleRoundLogoClick = () => {

    setSelectedFrom(selectedTo);
    setSelectedTo(selectedFrom);
    console.log(selectedTo, selectedFrom);
  };



  const items = ClassItems.map((ele) => ({
    key: ele.id, // Unique key
    label: ele.label, // Label to display
    onClick: () => {
      setActiveIdClass(ele.id);
      setflightClassName(ele.value);
    },
  }));


  return (
    <>
      {/* <div className=" homeabsnew1" style={{ width: "100%" }}>
        <section className="HotelAbsDesignInner w-100"> */}
      <div className=" container" >
        <div className="row g-2 newOneWayMainOneway2">
          <div className="col-lg-3">
            <div className="newOnewaySingle relative">
              {/* <div> */}
              <span>Departure</span>
              {/* </div> */}
              <FromSearchInput
                placeholder="Search"
                style={{ width: "100%" }}
                onItemSelect={handleFromSelect}
                data={selectedFrom}
              />

            </div>
            {/* <div
              className="roundlogo "
              onClick={(e) => {
                e.stopPropagation();
                handleRoundLogoClick();
              }}
              style={{ cursor: "pointer" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
              >
                <circle
                  cx="20"
                  cy="20"
                  r="19"
                  fill="white"
                  stroke="lightgray"
                  stroke-width="2"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="20"
                viewBox="0 0 18 20"
                fill="none"
                justifyContent="center"
              >
                <path
                  d="M13 15L1 15M1 15L5 19M1 15L5 11M5 5L17 5M17 5L13 0.999999M17 5L13 9"
                  stroke="#071C2C"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div> */}
          </div>







          <div className="col-lg-3">
            <div className="newOnewaySingle">
              {/* <div> */}
              <span>Arrival</span>
              {/* </div> */}
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
          <div className="col-lg-2">
            <div className="newOnewaySingle">

              <span>Depart</span>

              <DatePicker
                onChange={handleRangeChange}
                defaultValue={[dayjs(initialDepartDate)]}
                format={dateFormat}
                disabledDate={disablePastDates}
                onFocus={handleFocusDatePicker}
              />
              {/* <div className="d-flex justify-content-evenly">
                <span className="nrsb">
                  {dayjs(newDepartDate).format("dddd")}
                </span>
              </div> */}
            </div>
          </div>

          <div className="col-lg-3">
            <div>
              <div className="newOnewaySingle" onClick={handleTravelClickOpen}>
                <span>Traveller & Class</span>
                <div className="travelContent">
                  <p>
                    {(totalCount === 0 && 1) || totalCount} Traveller,
                    {(activeIdClass === 2 && flightclassName === "Y" && "Economy") ||
                      (activeIdClass === 3 && flightclassName === "W" && "Premium Economy") ||
                      (activeIdClass === 4 && flightclassName === "C" && "Business") ||
                      (activeIdClass === 6 && flightclassName === "F" && "First Class")}
                  </p>
                </div>
              </div>
              {/* <Dialog
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
                                  ele.id === activeIdClass ? "#d90429" : "#fff",
                                color:
                                  ele.id === activeIdClass ? "#fff" : "#d90429",
                              }}
                              onClick={() => {
                                setActiveIdClass(ele.id);
                                setflightClassName(ele.value);
                              }}
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
              </Dialog> */}

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
          <div className=" col-lg-1">
            {/* <Button
              className="Oneway2Search"
              onClick={handleOnewaySubmit}
              loading={loader}
            >
              Search
            </Button> */}
            <Button className="Oneway2Search" onClick={handleOnewaySubmit} loading={loader} type="primary" icon={<SearchOutlined />} />
          </div>
        </div>


      </div>

    </>
  );
}

export default OnewayNew;
