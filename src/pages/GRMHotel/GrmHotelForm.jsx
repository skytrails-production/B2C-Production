import { apiURL } from "../../Constants/constant";
import React, { useEffect, useState, useRef } from "react";
// import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import {
  hotelActionGRN,
  clearHotelReducerGRN,
} from "../../Redux/HotelGRN/hotel";
import { Select } from "antd";
import { DatePicker, Space, Button } from "antd";
import dayjs from "dayjs";
const { RangePicker } = DatePicker;




// Select city data logic 


let FromTimeout;
let FromCurrentValue;


const initialSelectedFromData =
{
  cityCode: "124054",
  cityName: "New Delhi",
  countryCode: "IN",
  countryName: "India",
}


const fetchFromCity = (value, callback) => {
  if (FromTimeout) {
    clearTimeout(FromTimeout);
    FromTimeout = null;
  }
  FromCurrentValue = value;
  const cityData = () => {
    axios
      .get(`${apiURL.baseURL}/skyTrails/grnconnect/getcityList?keyword=${value}`)
      .then((response) => {
        if (FromCurrentValue === value) {
          const { data } = response.data;
          const result = data.map((item) => ({
            value: item.cityCode,
            name: item.cityName,
            code: item.countryCode,
            cityCode: item.countryName,
            item,
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
  const [fromValue, setFromValue] = useState(initialSelectedFromData.cityName);
  const [selectedItem, setSelectedItem] = useState(initialSelectedFromData);


  const [FromPlaceholder, setFromPlaceholder] = useState('')
  const [FromDisplayValue, setFromDisplayValue] = useState(initialSelectedFromData.cityName);
  const [inputStyle, setInputStyle] = useState({});

  useEffect(() => {
    setFromData([
      {
        value: initialSelectedFromData.cityCode,
        name: initialSelectedFromData.cityName,
        code: initialSelectedFromData.countryCode,
        cityCode: initialSelectedFromData.countryName,
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
        {option.name} ({option.code})
      </div>
      <div style={{ color: "gray" }}>{option.cityCode}</div>
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


// select city data logic







// select country data logic

let ToTimeout;
let ToCurrentValue;

const initialSelectedToData = {
  countryCode: "IN",
  countryCode3: "IND",
  countryName: "India",
};

const fetchToCity = (value, callback) => {
  if (ToTimeout) {
    clearTimeout(ToTimeout);
    ToTimeout = null;
  }
  ToCurrentValue = value;
  const cityData = () => {
    axios
      .get(`${apiURL.baseURL}/skyTrails/grnconnect/getcountrylist`)
      .then((response) => {
        if (ToCurrentValue === value) {
          const { data } = response.data;
          const filteredData = data.filter(item =>
            item.countryName.toLowerCase().includes(value.toLowerCase())
          );
          const result = filteredData.map((item) => ({
            value: item.countryCode,
            countryName: item.countryName,
            countryCode3: item.countryCode3,
            item,
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
  const [toValue, setToValue] = useState(initialSelectedToData.countryName);
  const [selectedItem, setSelectedItem] = useState(initialSelectedToData);

  const [ToPlaceholder, setToPlaceholder] = useState('')
  const [ToDisplayValue, setToDisplayValue] = useState(initialSelectedToData.countryName);
  const [inputStyle, setInputStyle] = useState({});

  useEffect(() => {
    setToData([
      {
        value: initialSelectedToData.countryCode,
        countryCode3: initialSelectedToData.countryCode3,
        countryName: initialSelectedToData.countryName,
        item: initialSelectedToData
      }
    ]);
  }, []);

  const handleToSearch = (newValue) => {
    fetchToCity(newValue, setToData);
  };

  const handleToChange = (newValue) => {
    const selected = toData.find((d) => d.value === newValue);
    setToValue(selected ? selected.countryName : newValue);
    setToDisplayValue(selected ? selected.countryName : newValue);
    setSelectedItem(selected ? selected.item : null);
    setInputStyle({ caretColor: 'transparent' });
    if (selected) {
      onItemSelect(selected.item);
    }
  };

  const handleToFocus = () => {
    setToPlaceholder('To');
    setToDisplayValue('');
    setInputStyle({});
  };

  const handleTOBlur = () => {
    setToPlaceholder('');
    setToDisplayValue(toValue);
    setInputStyle({ caretColor: 'transparent' });
  };

  const renderToOption = (option) => (
    <div>
      <div>
        {option.countryName} ({option.value})
      </div>
      <div style={{ color: "gray" }}>{option.countryCode3}</div>
    </div>
  );



  return (
    <Select
      showSearch
      value={ToDisplayValue}
      placeholder={ToPlaceholder || props.placeholder}
      style={inputStyle}
      defaultActiveFirstOption={false}
      suffixIcon={null}
      filterOption={false}
      onSearch={handleToSearch}
      onChange={handleToChange}
      onFocus={handleToFocus}
      onBlur={handleTOBlur}
      notFoundContent={null}
      options={toData.map((d) => ({
        value: d.value,
        label: renderToOption(d),
      }))}
    />
  );
};

// select country data logic



const GrmHotelForm = () => {



  const [openTravelModal, setOpenTravelModal] = React.useState(false);
  const currentDate = new Date();

  // Add one day
  const futureDate = new Date(currentDate);
  futureDate.setDate(currentDate.getDate() + 1);
  const [selectedFrom, setSelectedFrom] = useState(initialSelectedFromData);
  const [selectNationality, setSelectNationality] = useState(initialSelectedToData);


  const handleFromSelect = (item) => {
    setSelectedFrom(item);
  };
  const handleNationalitySelect = (item) => {
    setSelectNationality(item);
  };

  const handleTravelClickOpen = () => {
    setOpenTravelModal(true);
  };

  const handleTravelClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpenTravelModal(false);
    }
  };


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [condition, setCondition] = useState(1);
  const [formDataDynamic, setFormData] = useState([
    {
      NoOfAdults: 1,
      NoOfChild: 0,
      ChildAge: [],
    },
  ]);

  const reducerState = useSelector((state) => state);



  const [open, setOpen] = useState(false);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    dispatch(clearHotelReducerGRN());
  }, []);


  const handleConditionChange = (event) => {
    const newCondition = parseInt(event.target.value);
    setCondition(newCondition);
    const newFormData = Array.from({ length: newCondition }, () => ({
      NoOfAdults: 1,
      NoOfChild: 0,
      ChildAge: [],
    }));
    setFormData(newFormData);
  };


  const handleFormChange = (index, key, value) => {
    const updatedFormData = [...formDataDynamic];
    if (key === "NoOfAdults" && value > 8) {
      value = 8;
    }
    updatedFormData[index][key] = value;

    if (key === "NoOfChild") {
      updatedFormData[index]["ChildAge"] = Array.from(
        { length: value }, () => "1");
    }
    setFormData(updatedFormData);
  };

  const handleChildAgeChange = (index, childIndex, value) => {
    const updatedFormData = [...formDataDynamic];
    updatedFormData[index].ChildAge[childIndex] = value;
    setFormData(updatedFormData);
  };



  // date selection logic here 



  const dateFormat = "DD MMM";

  const initialDepartDate = new Date();
  const initialReturnDate = dayjs(initialDepartDate).add(1, 'day').toDate();

  const [newDepartDate, setNewDepartDate] = useState(initialDepartDate);
  const [newReturnDate, setNewReturnDate] = useState(initialReturnDate);

  const handleRangeChange = (dates, dateStrings) => {
    if (dates) {
      const departDate = dates[0];
      let returnDate = dates[1];

      if (!returnDate) {
        returnDate = dayjs(departDate).add(1, 'day');
      }

      setNewDepartDate(dayjs(departDate).format("DD MMM, YY"));
      setNewReturnDate(dayjs(returnDate).format("DD MMM, YY"));
    } else {
      console.log("Selection cleared");
    }
  };

  const disablePastDates = (current) => {
    return current && current < dayjs().startOf('day');
  };


  // date selection logic here 



  function handleSubmit(event) {
    event.preventDefault();
    setLoader(true)

    sessionStorage.setItem("SessionExpireTime", new Date());

    const dynamicFormData = formDataDynamic.map((data) => ({
      adults: data.NoOfAdults || 0,
      children_ages: data.ChildAge || [],
    }));

    sessionStorage.setItem("clientNationality", JSON.stringify(selectNationality?.countryCode));
    sessionStorage.setItem(
      "revisithotel",
      JSON.stringify([
        {
          cityCode: selectedFrom.cityCode,
          cityName: selectedFrom.cityName,
          countryCode: selectedFrom.countryCode,
          countryName: selectedFrom.countryName,
          checkin: newDepartDate,
          checkout: newReturnDate,
          rooms: [...dynamicFormData],
          nationality: selectNationality,
        },

      ])
    );

    const payload = {
      "rooms": [...dynamicFormData],
      "rates": "concise",
      "cityCode": selectedFrom.cityCode,
      "currency": "INR",
      "client_nationality": selectNationality?.countryCode || "In",
      "checkin": dayjs(newDepartDate).format("YYYY-MM-DD"),
      "checkout": dayjs(newReturnDate).format("YYYY-MM-DD"),
      "cutoff_time": 30000,
      "version": "2.0",
    };

    const pageNumber = 1;
    sessionStorage.setItem("grnPayload", JSON.stringify(payload));
    // dispatch(hotelActionGRN(payload, pageNumber));

    // Loop to dispatch the action with incrementing page numbers
    for (let pageNumber = 1; pageNumber <= 10; pageNumber++) {
      dispatch(hotelActionGRN(payload, pageNumber));
    }

    navigate("/st-hotel/hotelresult");


    if (reducerState?.hotelSearchResultGRN?.ticketData?.data?.data?.hotels) {
      setOpen(false);
    }
    setOpen(true);
  }

  const [numAdults, setNumAdults] = useState(0);
  const [numChildren, setNumChildren] = useState(0);

  const calculateTravellerCount = () => {
    let adults = 0;
    let children = 0;

    formDataDynamic.forEach((data) => {
      adults += data.NoOfAdults;
      children += data.NoOfChild;
    });

    setNumAdults(adults);
    setNumChildren(children);
    // setNumInfants(infants);
  };

  useEffect(() => {
    calculateTravellerCount();
  }, [formDataDynamic]);







  return (
    <>
      {/* {loader ? (
        <Hotelmainloading />
      ) : ( */}
      <div className="container" style={{ paddingBottom: "35px" }}>
        <div className="row g-2 newReturnForm">

          <div className="col-lg-3">
            <div className="newReturnSingleBox">
              <div>
                <span className="nrsb">From</span>
              </div>
              <FromSearchInput
                placeholder="Search"
                style={{ width: "100%" }}
                onItemSelect={handleFromSelect} // Pass the callback function
              />
              <div>
                <span className="nrsb">{selectedFrom?.countryName}</span>
              </div>
            </div>
          </div>

          <div className="col-lg-3">
            <div className="newReturnSingleBox">
              <div className="d-flex justify-content-evenly">
                <span className="nrsb">Check In</span>
                <span className="nrsb">Check Out</span>
              </div>
              <RangePicker
                onChange={handleRangeChange}
                defaultValue={[dayjs(newDepartDate), dayjs(newReturnDate)]}
                format={dateFormat}
                disabledDate={disablePastDates}
              />
              <div className="d-flex justify-content-evenly">
                <span className="nrsb">{dayjs(newDepartDate).format('dddd')}</span>
                <span className="nrsb">{dayjs(newReturnDate).format('dddd')}</span>
              </div>
            </div>
          </div>

          <div className="col-lg-3">
            <div>
              <div className="newReturnSingleBox " onClick={handleTravelClickOpen}>
                <div>
                  <span className="nrsb">Guests & Rooms</span>
                </div>

                <p className="nrsbpara">
                  {condition} Room
                </p>
                <div className="d-none d-md-block ">
                  <span className="nrsb">
                    {numAdults} Adults {numChildren} Child
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
                      <div className="roomModal">
                        <div className="hotel_modal_form_input px-0">
                          <label className="form_label">Room*</label>
                          <select
                            name="room"
                            value={condition}
                            onChange={handleConditionChange}
                            className="hotel_input_select"
                          >
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                          </select>
                        </div>
                      </div>

                      <div className="px-1">
                        {condition > 0 &&
                          Array.from({ length: condition }).map(
                            (_, index) => (
                              <div
                                key={index}
                                className="room-modal-container"
                              >
                                <div>
                                  <h5>ROOM {index + 1}</h5>
                                </div>
                                <div className="row">
                                  <div className="hotel_modal_form_input">
                                    <label className="form_label">
                                      No of Adults:
                                    </label>
                                    <select
                                      value={
                                        formDataDynamic[index]
                                          ?.NoOfAdults || 1
                                      }
                                      className="hotel_input_select"
                                      onChange={(e) =>
                                        handleFormChange(
                                          index,
                                          "NoOfAdults",
                                          parseInt(e.target.value)
                                        )
                                      }
                                    >
                                      {[1, 2, 3, 4, 5, 6, 7, 8].map(
                                        (num) => (
                                          <option
                                            key={num}
                                            value={num}
                                          >
                                            {num}
                                          </option>
                                        )
                                      )}
                                    </select>
                                  </div>

                                  <div className="hotel_modal_form_input">
                                    <label className="form_label">
                                      No of Child:
                                    </label>
                                    <select
                                      value={
                                        formDataDynamic[index]
                                          ?.NoOfChild || 0
                                      }
                                      className="hotel_input_select"
                                      name="noOfChild"
                                      onChange={(e) =>
                                        handleFormChange(
                                          index,
                                          "NoOfChild",
                                          parseInt(e.target.value)
                                        )
                                      }
                                    >
                                      {[0, 1, 2, 3, 4].map(
                                        (childCount) => (
                                          <option
                                            key={childCount}
                                            value={childCount}
                                          >
                                            {childCount}
                                          </option>
                                        )
                                      )}
                                    </select>
                                  </div>
                                </div>
                                {formDataDynamic[index]?.NoOfChild >
                                  0 && (
                                    <div className="hotel_modal_form_input_child_age">
                                      <label className="mt-3">
                                        Child Age:
                                      </label>
                                      <div>
                                        {Array.from({
                                          length:
                                            formDataDynamic[index]
                                              ?.NoOfChild || 0,
                                        }).map((_, childIndex) => (
                                          <div
                                            key={childIndex}
                                            className=""
                                          >
                                            <select
                                              value={
                                                formDataDynamic[index]
                                                  ?.ChildAge?.[
                                                childIndex
                                                ] || ""
                                              }
                                              className="hotel_input_select"
                                              onChange={(e) =>
                                                handleChildAgeChange(
                                                  index,
                                                  childIndex,
                                                  e.target.value
                                                )
                                              }
                                            >
                                              {Array.from(
                                                { length: 11 },
                                                (_, i) => (
                                                  <option
                                                    key={i}
                                                    value={i + 1}
                                                  >
                                                    {i + 1}
                                                  </option>
                                                )
                                              )}
                                            </select>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                              </div>
                            )
                          )}
                      </div>
                    </div>
                  </>
                </DialogContent>
                <DialogActions>
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

          <div className="col-lg-3">
            <div className="newReturnSingleBox">
              <div>
                <span className="nrsb">Nationality</span>
              </div>
              <ToSearchInput
                placeholder="Search"
                style={{ width: "100%" }}
                onItemSelect={handleNationalitySelect} // Pass the callback function
              />
              <div>
                <span className="nrsb">{selectNationality?.countryCode3}</span>
              </div>
            </div>

          </div>


          <div
            style={{ position: "relative", top: "80px", marginTop: "-45px" }}
            className="onewaySearch-btn" id="item-5Return">
            <Button className="returnButton" style={{ padding: "8px 36px", height: "unset" }} onClick={handleSubmit} loading={loader}>Search</Button>
          </div>
        </div>
      </div>
      {/* )} */}
    </>
  );
};

export default GrmHotelForm;
