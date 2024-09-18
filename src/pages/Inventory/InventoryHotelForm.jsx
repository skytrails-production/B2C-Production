import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Upload,
  Typography,
  Row,
  Col,
  Select,
  Tag,
  Radio,
  notification,
  Checkbox,
  DatePicker,
  InputNumber,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "./Inventory.css";
import { apiURL } from "../../Constants/constant";
import { useEffect } from "react";
import moment from "moment";
import { Spin } from "antd";
import imageCompression from "browser-image-compression";
import { CloseOutlined } from "@ant-design/icons";
import axios from "axios";
const { Option } = Select;
const { Title } = Typography;

const InventoryHotelForm = () => {
  const [loading, setLoading] = useState(false);
  const [hotelFacilities, setHotelFacilities] = useState([]);
  const [totalRoomCount, setTotalRoomCount] = useState(0);
  const [totalAvailableRoomsCount, setTotalAvailableRoomsCount] = useState(0);

  const [hotelAmenities, setHotelAmenities] = useState([]);
  const [hotelPolicies, setHotelPolicies] = useState([]);
  const [bookingPolicies, setBookingPolicies] = useState([]);

  const [safe2Stay, setSafe2Stay] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [rooms, setRooms] = useState([
    {
      room_type: "",
      description: "",
      totalRooms: 0,
      availableRooms: 0,
      priceDetails: {
        gst: [
          {
            amount: 0,
            amountType: "",
            currency: "",
            included: false,
            name: "",
          },
        ],
        net: [
          {
            amount: 0,
            amountType: "",
            currency: "",
            included: false,
            name: "",
          },
        ],
        Weekday: [
          {
            noOfAdult: 0,
            noOfChildren: 0,
            room_Price: 0,
            isSingle: false,
            isDouble: false,
            isCP: false,
            isMAP: false,
          },
        ],
        Weekend: [
          {
            noOfAdult: 0,
            noOfChildren: 0,
            room_Price: 0,
            isSingle: false,
            isDouble: false,
            isCP: false,
            isMAP: false,
          },
        ],
      },
      roomAmineties: [],
    },
  ]);

  const next = () => {
    setCurrentStep(currentStep + 1);
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  const [hotelImages, setHotelImages] = useState([]);
  const [roomsImages, setroomsImages] = useState([]);
  // let roomArr=[];

  const [form] = Form.useForm();

  const [formData, setFormData] = useState({
    mealType: [],
    typeOfRoom: [],
    location: {
      type: "Point",
      coordinates: [0, 0], // Initial values
    },
    hotelName: " ",
    gstNo: "",
    CompanyName: "",
    hotelCity: " ",
    hotelCountry: " ",
    hotelState: " ",
    panCard: " ",
    description: " ",
    hotelPolicy: " ",
    bookingPolicy: [],
    // safe2Stay: "",
    locality: " ",
    cityCode: " ",
    hotelAddress: " ",
    rating: null,
    totalRooms: " ",
    availableRooms: " ",
    totalPrice: " ",
    hotelCode: " ",
    availableDate: null,
    startFrom: null,
  });

  const handleGstChange = (value, roomIndex, gstIndex, field) => {
    setRooms((prevRooms) => {
      const newRooms = [...prevRooms];
      newRooms[roomIndex].priceDetails.gst[gstIndex][field] = value;
      return newRooms;
    });
  };

  const handleNetChange = (value, roomIndex, netIndex, field) => {
    setRooms((prevRooms) => {
      const newRooms = [...prevRooms];
      newRooms[roomIndex].priceDetails.net[netIndex][field] = value;
      return newRooms;
    });
  };

  // Handler for Weekday data
  const handleWeekdayChange = (value, roomIndex, WeekdayIndex, field) => {
    const updatedRooms = [...rooms];
    updatedRooms[roomIndex].priceDetails.Weekday[WeekdayIndex][field] = value;
    setRooms(updatedRooms);
  };

  // Handler for Weekend data
  const handleWeekendChange = (value, roomIndex, WeekendIndex, field) => {
    const updatedRooms = [...rooms];
    updatedRooms[roomIndex].priceDetails.Weekend[WeekendIndex][field] = value;
    setRooms(updatedRooms);
  };

  const handleRoomFileChange = async ({ file, fileList }) => {
    const updatedFileList = await compressAndReplaceFiles(fileList);
    setroomsImages(updatedFileList);
  };

  const handleFileChange = async ({ file, fileList }) => {
    const updatedFileList = await compressAndReplaceFiles(fileList);
    setHotelImages(updatedFileList);
  };

  const compressAndReplaceFiles = async (fileList) => {
    const promises = fileList.map(async (file) => {
      if (!file.originFileObj) return file;

      const compressedFile = await compressImage(file.originFileObj);
      const base64String = await fileToBase64(compressedFile);

      return { ...file, originFileObj: compressedFile, base64String };
    });

    return await Promise.all(promises);
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const compressImage = async (imageFile) => {
    const options = {
      maxSizeMB: 0.5, // Compress to 0.5 MB or less
      maxWidthOrHeight: 500, // Resize to 500px max width/height
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(imageFile, options);
      return compressedFile;
    } catch (error) {
      console.error("Image compression error:", error);
      return imageFile;
    }
  };

  const addNetItem = (roomIndex) => {
    const newRooms = [...rooms];
    if (!newRooms[roomIndex].priceDetails) {
      newRooms[roomIndex].priceDetails = { net: [] };
    }
    if (!newRooms[roomIndex].priceDetails.net) {
      newRooms[roomIndex].priceDetails.net = [];
    }
    newRooms[roomIndex].priceDetails.net.push({
      amount: 0,
      amountType: "",
      currency: "",
      included: false,
      name: "",
    });
    setRooms(newRooms);
  };

  const addGstItem = (roomIndex) => {
    const newRooms = [...rooms];
    if (!newRooms[roomIndex].priceDetails) {
      newRooms[roomIndex].priceDetails = { gst: [] };
    }
    if (!newRooms[roomIndex].priceDetails.gst) {
      newRooms[roomIndex].priceDetails.gst = [];
    }
    newRooms[roomIndex].priceDetails.gst.push({
      amount: 0,
      amountType: "",
      currency: "",
      included: false,
      name: "",
    });
    setRooms(newRooms);
  };

  // addWeekdayItem

  const addWeekdayItem = (roomIndex) => {
    const newRooms = [...rooms];
    if (!newRooms[roomIndex].priceDetails) {
      newRooms[roomIndex].priceDetails = { Weekday: [] };
    }
    if (!newRooms[roomIndex].priceDetails.Weekday) {
      newRooms[roomIndex].priceDetails.Weekday = [];
    }
    newRooms[roomIndex].priceDetails.Weekday.push({
      noOfAdult: "",
      noOfChildren: "",
      room_Price: "",
      isSingle: "",
      isDouble: "",
    });
    setRooms(newRooms);
  };

  const addWeekendItem = (roomIndex) => {
    const newRooms = [...rooms];
    if (!newRooms[roomIndex].priceDetails) {
      newRooms[roomIndex].priceDetails = { Weekend: [] };
    }
    if (!newRooms[roomIndex].priceDetails.Weekend) {
      newRooms[roomIndex].priceDetails.Weekend = [];
    }
    newRooms[roomIndex].priceDetails.Weekend.push({
      noOfAdults: "",
      noOfChildrens: "",
      room_Prices: "",
      isSingle: "",
      isDouble: "",
    });
    setRooms(newRooms);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleMealTypeChange = (checkedValues) => {
    setFormData({ ...formData, mealType: checkedValues });
  };

  const handleRoomTypeChange = (e) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      typeOfRoom: value ? value.split(",").map((item) => item.trim()) : [],
    });
  };

  // const handleRoomFileChange = ({ file, fileList }) => {
  //   console.log("File changed:", file);
  //   console.log("File list:", fileList);
  //   setroomsImages(fileList);
  // };

  const handleCoordinatesChange = (index, value) => {
    // Ensure location and coordinates are defined
    const newCoordinates = [...(formData.location?.coordinates ?? [0, 0])];
    newCoordinates[index] = parseFloat(value); // Ensure the value is parsed as a float

    setFormData((prevData) => ({
      ...prevData,
      location: {
        ...prevData.location,
        coordinates: newCoordinates,
      },
    }));
  };

  const handleSubmit = async () => {
    //console.log("Form data:", rooms, totalRoomCount);

    setLoading(true); // Start loader

    const formdata = new FormData();

    // Append other form data
    formdata.append("hotelName", formData.hotelName);
    formdata.append("CompanyName", formData.CompanyName);
    formdata.append("hotelCity", formData.hotelCity);
    formdata.append("hotelCountry", formData.hotelCountry);
    formdata.append("hotelState", formData.hotelState);
    formdata.append("panCard", formData.panCard);
    formdata.append("rating", formData.rating || "");
    formdata.append("description", formData.description || "");
    formdata.append("cityCode", formData.cityCode || "");
    formdata.append("locality", formData.locality || "");
    formdata.append("hotelAddress", formData.hotelAddress || "");
    formdata.append("totalPrice", formData.totalPrice || "0");
    formdata.append("totalRooms", totalRoomCount || "0");
    formdata.append("availableRooms", totalAvailableRoomsCount || "0");

    // Handle arrays and JSON fields
    formdata.append("amenities", JSON.stringify(hotelAmenities || []));

    formdata.append("facilities", JSON.stringify(hotelFacilities || []));
    formdata.append("bookingPolicy", JSON.stringify(bookingPolicies || []));
    formdata.append("safe2Stay", JSON.stringify(safe2Stay || []));
    formdata.append("hotelPolicy", JSON.stringify(hotelPolicies || []));
    formdata.append("hotelCode", formData.hotelCode || "");
    formdata.append("mealType", JSON.stringify(formData.mealType || []));
    formdata.append("typeOfRoom", JSON.stringify(formData.typeOfRoom || []));
    formdata.append("location", JSON.stringify(formData.location || {}));
    formdata.append("gstNo", formData.gstNo || "");
    // Handle date fields
    // if (formData.startFrom) {
    //   formdata.append(
    //     "startFrom",
    //     moment(formData.startFrom).format("YYYY-MM-DD")
    //   );
    // }

    // if (formData.availableDate) {
    //   formdata.append(
    //     "availableDate",
    //     moment(formData.availableDate).format("YYYY-MM-DD")
    //   );
    // }

    formdata.append(
      "startFrom",
      formData.startFrom ? formData.startFrom.format("YYYY-MM-DD") : ""
    );
    formdata.append(
      "availableDate",
      formData.availableDate ? formData.availableDate.format("YYYY-MM-DD") : ""
    );

    // Handle images
    hotelImages.forEach((file) => {
      formdata.append("hotelImages", file.originFileObj);
    });
    roomsImages.forEach((file) => {
      formdata.append("roomsImages", file.originFileObj);
    });

    formdata.append("roomArr", JSON.stringify(rooms));

    // Debugging: Log form data
    for (let [key, value] of formdata.entries()) {
      console.log(`${key}: ${value}`);
    }

    // API call
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${apiURL.baseURL}/skyTrails/api/inventory/createInventory`,
        {
          method: "POST",
          headers: {
            token: token,
          },
          body: formdata,
        }
      );

      const responseData = await response.json();
      console.log(responseData);

      if (response.ok) {
        notification.success({
          message: "Hotel Form Created",
          className: "custom-notification",
        });

        //form.resetFields();
        // Reset form
        // setFormData({
        //   hotelName: " ",
        //   hotelCity: " ",
        //   hotelCountry: "",
        //   hotelState: "",
        //   panCard: "",
        //   rating: "",
        //   description: "",
        //   cityCode: "",
        //   locality: "",
        //   hotelAddress: "",
        //   totalPrice: "",
        //   totalRooms: "",
        //   hotelCode: "",
        //   totalRoomCount: "",
        //   mealType: [],
        //   typeOfRoom: [],
        //   location: {
        //     type: "Point",
        //     coordinates: [0, 0],
        //   },
        //   startFrom: null,
        //   availableDate: null,
        // });

        // setHotelFacilities([]);
        // setHotelPolicies([]);
        // setBookingPolicies([]);
        // setHotelAmenities([]);
        // setHotelImages([]);
        // setroomsImages([]);
        // setRooms([]);
        // setSafe2Stay([]);
      } else {
        notification.error({
          message: "Error",
          description: "Failed to create hotel form. Please try again later.",
          className: "custom-notification",
        });
      }
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Failed to create hotel form. Please try again later.",
        className: "custom-notification",
      });
    } finally {
      setLoading(false); // Stop loader
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // Function to calculate total rooms across all entries

  const handleRoomChange = (value, roomIndex, key) => {
    const updatedRooms = [...rooms];
    updatedRooms[roomIndex][key] = value;

    // If key is "totalRooms", update the totalRoomCount state
    if (key === "totalRooms" || key === "availableRooms") {
      const totalRooms = calculateTotalRooms(updatedRooms);
      setTotalRoomCount(totalRooms);
      const totalAvailableRooms = calculateTotalAvailableRooms(updatedRooms);
      setTotalAvailableRoomsCount(totalAvailableRooms);
    }
    setRooms(updatedRooms);
  };

  const calculateTotalAvailableRooms = (rooms) => {
    let totalAvailableRooms = 0;

    rooms.forEach((room) => {
      totalAvailableRooms += Number(room.availableRooms) || 0;
    });

    return totalAvailableRooms;
  };

  const calculateTotalRooms = (rooms) => {
    let totalRooms = 0;
    rooms.forEach((room) => {
      totalRooms += Number(room.totalRooms) || 0;
    });
    setTotalRoomCount(totalRooms);
    return totalRooms;
  };

  const addRoom = () => {
    setRooms([
      ...rooms,
      {
        room_type: "",
        description: "",
        totalRooms: 0,
        // noOfAdult: 0,
        // noOfChildren: 0,
        // room_Price: 0,
        availableRooms: 0,
        priceDetails: {
          net: [],
          gst: [],
          Weekday: [],
          Weekend: [],
        },
        roomAmineties: [],
      },
    ]);
  };

  const removeRoom = (roomIndex) => {
    const updatedRooms = [...rooms];
    updatedRooms.splice(roomIndex, 1);
    setRooms(updatedRooms);
    const totalRooms = calculateTotalRooms(updatedRooms);
    setTotalRoomCount(totalRooms);
  };

  const handleStartDateChange = (date) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      startFrom: date ? date.startOf("day") : null, // Ensure it's set to the start of the day
    }));
  };

  // Handle End Date Change
  const handleEndDateChange = (date) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      availableDate: date ? date.startOf("day") : null, // Ensure it's set to the start of the day
    }));
  };

  // const disabledStartFromDate = (current) => {
  //   return current && current < moment().startOf("day"); // Disable all dates before today
  // };

  // Disable dates before startFrom date for availableDate
  const disabledAvailableDate = (current) => {
    return current && current < moment().startOf("day");
  };

  const buttonStyle = {
    backgroundColor: "#ff4d4f",
    borderColor: "#ff4d4f",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "10px",
  };

  const hoverStyle = {
    borderColor: "#ff7875",
    color: "white",
  };

  const focusStyle = {
    backgroundColor: "#ff4d4f",
    borderColor: "#ff4d4f",
    color: "white",
  };

  const iconStyle = {
    marginRight: "8px",
  };

  //country list
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [loadingCountries, setLoadingCountries] = useState(true);
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);
  const [statesAvailable, setStatesAvailable] = useState(true);
  const [citiesAvailable, setCitiesAvailable] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [cityCode, setCityCode] = useState("");
  const [selectedCityCode, setSelectedCityCode] = useState("");

  useEffect(() => {
    const fetchCountryList = async () => {
      try {
        const response = await axios.get(
          `${apiURL.baseURL}/skyTrails/api/inventory/getCountryList`
        );
        setCountries(response.data.result);
        setLoadingCountries(false);
      } catch (err) {
        message.error("Failed to load countries");
        setLoadingCountries(false);
      }
    };

    fetchCountryList();
  }, []);

  const handleCountryChange = async (value) => {
    setSelectedCountry(value);
    setFormData({ ...formData, hotelCountry: value });
    setLoadingStates(true);

    try {
      // Fetch states for the selected country
      const stateResponse = await axios.get(
        `${apiURL.baseURL}/skyTrails/api/inventory/getStateList/${value}`
      );
      const stateList = stateResponse.data.result;

      // Extract and normalize unique stateProvince values
      const stateProvinces = stateList
        .map((item) => item.stateProvince?.trim()) // Trim whitespace and handle undefined
        .filter((state) => state && state !== ""); // Remove empty or undefined values

      const uniqueStateProvinces = [...new Set(stateProvinces)];
      console.log(uniqueStateProvinces, "stateProvinces");

      // Extract and normalize unique cityName values
      const cityData = stateList
        .map((item) => ({
          cityName: item.cityName,
          cityCode: item.cityCode,
        }))
        .filter((city) => city.cityName && city.cityCode);

      const uniqueCities = [
        ...new Set(cityData.map((city) => city.cityName)),
      ].map((name) => cityData.find((city) => city.cityName === name));

      setSelectedState("");
      setFormData((prevFormData) => ({
        ...prevFormData,
        hotelState: "", // Clear state in form data
      }));

      if (uniqueStateProvinces.length > 0) {
        // If states are available, set them
        setStates(
          uniqueStateProvinces.map((state) => ({ stateProvince: state }))
        );
        setStatesAvailable(true);
        setCities([]); // Clear cities when states are available
        setCitiesAvailable(false);
      } else if (uniqueCities.length > 0) {
        // If no states are available but cities are, set cities
        setCities(uniqueCities);
        setCitiesAvailable(true);
        setStatesAvailable(false);
      } else {
        // If neither states nor cities are available, clear both
        setStates([]);
        setCities([]);
        setStatesAvailable(false);
        setCitiesAvailable(false);
      }

      setLoadingStates(false);
    } catch (err) {
      message.error("Failed to load states or cities");
      setStates([]);
      setCities([]);
      setStatesAvailable(false);
      setCitiesAvailable(false);
      setLoadingStates(false);
    }
  };

  const handleStateChange = async (value) => {
    setSelectedState(value);
    setFormData({ ...formData, hotelState: value });
    setLoadingCities(true);
    try {
      const response = await axios.get(
        `${apiURL.baseURL}/skyTrails/api/inventory/getCityList/${value}`
      );
      const cityList = response.data.result;
      setCities(cityList);
      setCitiesAvailable(cityList.length > 0);
      setLoadingCities(false);
    } catch (err) {
      message.error("Failed to load cities");
      setCities([]);
      setCitiesAvailable(false);
      setLoadingCities(false);
    }
  };

  const handleCityChange = (cityName) => {
    console.log("Selected city:", cityName);

    const selectedCity = cities.find((city) => city.cityName === cityName);

    if (selectedCity) {
      console.log("City found:", selectedCity);
      console.log("City code:", selectedCity.cityCode);

      setSelectedCityCode(selectedCity.cityCode); // Update city code state
      setFormData((prevFormData) => ({
        ...prevFormData,
        hotelCity: cityName, // Ensure city name is updated in formData
        cityCode: selectedCity.cityCode, // Add city code to formData
      }));
    } else {
      console.log("City not found");
      setSelectedCityCode(""); // Clear city code if city not found
      setFormData((prevFormData) => ({
        ...prevFormData,
        hotelCity: cityName, // Ensure city name is updated in formData
        cityCode: "", // Clear city code in formData if city not found
      }));
    }
  };

  return (
    <Spin spinning={loading}>
      <div className="inventoryForm">
        <div className="form-container">
          <Title level={2} className="form-heading">
            Inventory Hotel Form
          </Title>
          <Form
            form={form}
            initialValues={formData}
            name="hotel_form"
            layout="vertical"
            // initialValues={{ rating: 1 }}
            onFinish={handleSubmit}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            {currentStep === 0 && (
              <div>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label="Hotel Name"
                      name="hotelName"
                      rules={[
                        { required: true, message: "Please enter hotel name" },
                      ]}
                      className="form-item"
                    >
                      <Input
                        name="hotelName"
                        value={formData.hotelName ?? ""}
                        onChange={handleChange}
                      />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      label="Country"
                      name="hotelCountry"
                      rules={[
                        { required: true, message: "Please select a country" },
                      ]}
                      className="form-item"
                    >
                      <Select
                        showSearch
                        placeholder="Select a country"
                        value={formData.hotelCountry}
                        onChange={handleCountryChange}
                        style={{ width: "100%" }}
                      >
                        {countries.map((country, index) => (
                          <Option key={index} value={country.countryName}>
                            {country.countryName}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label="Hotel State"
                      name="hotelState"
                      rules={[
                        { required: true, message: "Please select a state" },
                      ]}
                    >
                      <Select
                        showSearch
                        placeholder="Select a state"
                        value={formData.hotelState}
                        onChange={handleStateChange}
                        style={{ width: "100%" }}
                        loading={loadingStates}
                        disabled={!statesAvailable} // Disable if no states are available
                      >
                        {statesAvailable ? (
                          states.map((state) => (
                            <Option
                              key={state.stateCode}
                              value={state.stateProvince}
                            >
                              {state.stateProvince}
                            </Option>
                          ))
                        ) : (
                          <Option disabled>No states available</Option>
                        )}
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      label="Hotel City"
                      name="hotelCity"
                      rules={[
                        { required: true, message: "Please select a city" },
                      ]}
                    >
                      <Select
                        showSearch
                        placeholder="Select a city"
                        value={formData.hotelCity}
                        onChange={handleCityChange}
                        style={{ width: "100%" }}
                        loading={loadingCities}
                        disabled={!citiesAvailable && !statesAvailable} // Disable if no cities are available or if states are not available and cities are empty
                      >
                        {citiesAvailable ? (
                          cities.length > 0 ? (
                            cities.map((city) => (
                              <Option key={city.cityCode} value={city.cityName}>
                                {city.cityName}
                              </Option>
                            ))
                          ) : (
                            <Option disabled>No cities available</Option>
                          )
                        ) : (
                          <Option disabled>Loading...</Option>
                        )}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label="CompanyName"
                      name="CompanyName"
                      rules={[
                        {
                          required: true,
                          message: "Please enter Company Name",
                        },
                      ]}
                      className="form-item"
                    >
                      <Input
                        name="CompanyName"
                        value={formData.CompanyName ?? ""}
                        onChange={handleChange}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="GstNo"
                      name="gstNo"
                      rules={[
                        { required: true, message: "Please enter  gstNo" },
                      ]}
                      className="form-item"
                    >
                      <Input
                        name="gstNo"
                        value={formData.gstNo ?? ""}
                        onChange={handleChange}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label="Start Date"
                      name="startFrom"
                      rules={[
                        { required: true, message: "Please enter start date" },
                      ]}
                      className="form-item"
                    >
                      <DatePicker
                        value={formData.startFrom}
                        onChange={handleStartDateChange}
                        //disabledDate={disabledStartFromDate}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Available Date"
                      name="availableDate"
                      rules={[
                        {
                          required: true,
                          message: "Please enter available date",
                        },
                      ]}
                      className="form-item"
                    >
                      <DatePicker
                        value={formData.availableDate}
                        onChange={handleEndDateChange}
                        disabledDate={disabledAvailableDate}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label="Description"
                      name="description"
                      rules={[
                        { required: true, message: "Please enter description" },
                      ]}
                      className="form-item"
                    >
                      <Input
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Locality"
                      name="locality"
                      rules={[
                        { required: true, message: "Please enter  locality" },
                      ]}
                      className="form-item"
                    >
                      <Input
                        name="locality"
                        value={formData.locality}
                        onChange={handleChange}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="City Code" name="cityCode">
                      {/* <Input
                    value={selectedCityCode} // Bind the cityCode state to the input value
                    readOnly
                    placeholder="City Code"
                  /> */}
                      <p>{selectedCityCode}</p>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="HotelAddress"
                      name="hotelAddress"
                      rules={[
                        {
                          required: true,
                          message: "Please select hotel address",
                        },
                      ]}
                      className="form-item"
                    >
                      <Input
                        name="hotelAddress"
                        value={formData.hotelAddress}
                        onChange={handleChange}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label="PAN card"
                      name="panCard"
                      className="form-item"
                    >
                      <Input
                        name="panCard"
                        onChange={handleChange}
                        value={formData.panCard}
                      />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      label="Rating"
                      name="rating"
                      rules={[
                        {
                          required: true,
                          message: "Please select hotel rating",
                        },
                      ]}
                      className="form-item"
                    >
                      <Input
                        type="text"
                        min={0}
                        max={5}
                        value={formData.rating}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            rating: parseFloat(e.target.value),
                          })
                        }
                      />
                    </Form.Item>
                  </Col>
                </Row>

                {/* <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label="Total Room Count"
                      name="totalRooms"
                      className="form-item"
                    >
                      
                      <p>totalRoomCount:{totalRoomCount}</p>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="AvailableRooms"
                      name="availableRooms"
                      className="form-item"
                    >
                      <p>TotalAvailableRoom:{totalAvailableRoomsCount}</p>
                    </Form.Item>
                  </Col>
                </Row> */}

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label="Total Price"
                      name="totalPrice"
                      className="form-item"
                    >
                      <Input
                        type="text"
                        name="totalPrice"
                        value={formData.totalPrice}
                        onChange={handleChange}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Hotel Code"
                      name="hotelCode"
                      className="form-item"
                    >
                      <Input
                        type="text"
                        name="hotelCode"
                        value={formData.hotelCode}
                        onChange={handleChange}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                {/* <Form.Item label="Hotel Facilities" className="form-item">
                  <Input.TextArea
                    value={hotelFacilities.join(", ")}
                    onChange={(e) => {
                      const updatedFaclities = e.target.value
                        .split(",") // Split the input by commas
                        .map((item) => item.trim()); // Trim whitespace around each item
                      setHotelFacilities(updatedFaclities);
                    }}
                    placeholder="Enter facilities separated by commas or new lines"
                    rows={4} // Adjust the number of rows as needed
                  />
                </Form.Item>
                <Form.Item
                  label="Hotel Policy"
                  name="hotelPolicy"
                  className="form-item"
                >
                  <Input.TextArea
                    value={hotelPolicies.join(", ")}
                    rows={4}
                    onChange={(e) => {
                      const updatedPolicies = e.target.value
                        .split(",") // Split the input by commas
                        .map((item) => item.trim()); // Trim whitespace around each item
                      setHotelPolicies(updatedPolicies);
                    }}
                    placeholder="Enter hotel policies, each on a new line"
                  />
                </Form.Item>

                <Form.Item
                  label="Booking Policy"
                  name="bookingPolicy"
                  className="form-item"
                >
                  <Input.TextArea
                    value={bookingPolicies.join(", ")}
                    rows={4}
                    onChange={(e) => {
                      const updatedBookingPolicies = e.target.value
                        .split(",") // Split the input by commas
                        .map((item) => item.trim()); // Trim whitespace around each item
                      setBookingPolicies(updatedBookingPolicies);
                    }}
                    placeholder="Enter booking policies, each on a new line"
                  />
                </Form.Item> */}

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label="Meal Type"
                      name="mealType"
                      className="form-item"
                    >
                      <Checkbox.Group
                        name="mealType"
                        value={formData.mealType}
                        onChange={handleMealTypeChange}
                      >
                        <Checkbox value="Breakfast">Breakfast</Checkbox>
                        <Checkbox value="Lunch">Lunch</Checkbox>
                        <Checkbox value="Dinner">Dinner</Checkbox>
                      </Checkbox.Group>
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      label="Type of Room"
                      name="typeOfRoom"
                      className="form-item"
                    >
                      <Input
                        value={formData.typeOfRoom.join(", ")} // Display array as comma-separated string
                        onChange={handleRoomTypeChange}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                {/* <Form.Item
                  label="Amenities"
                  name="amenities"
                  className="form-item"
                >
                  <Input.TextArea
                    value={hotelAmenities.join(", ")}
                    rows={4}
                    onChange={(e) => {
                      const updatedAmenities = e.target.value
                        .split(",")
                        .map((item) => item.trim());

                      setHotelAmenities(updatedAmenities);
                    }}
                    placeholder="Enter amenities, each on a new line"
                  />
                </Form.Item> */}
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button type="primary" onClick={next}>
                    Next
                  </Button>
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div>
                
                <Form.Item
                  label="Amenities"
                  name="amenities"
                  className="form-item"
                >
                  <Input.TextArea
                    value={hotelAmenities.join(", ")}
                    rows={4}
                    onChange={(e) => {
                      const updatedAmenities = e.target.value
                        .split(",")
                        .map((item) => item.trim());

                      setHotelAmenities(updatedAmenities);
                    }}
                    placeholder="Enter amenities, each on a new line"
                  />
                </Form.Item>

                <Form.Item label="Hotel Facilities" className="form-item">
                  <Input.TextArea
                    value={hotelFacilities.join(", ")}
                    onChange={(e) => {
                      const updatedFaclities = e.target.value
                        .split(",") // Split the input by commas
                        .map((item) => item.trim()); // Trim whitespace around each item
                      setHotelFacilities(updatedFaclities);
                    }}
                    placeholder="Enter facilities separated by commas or new lines"
                    rows={4} // Adjust the number of rows as needed
                  />
                </Form.Item>
                <Form.Item
                  label="Hotel Policy"
                  name="hotelPolicy"
                  className="form-item"
                >
                  <Input.TextArea
                    value={hotelPolicies.join(", ")}
                    rows={4}
                    onChange={(e) => {
                      const updatedPolicies = e.target.value
                        .split(",") // Split the input by commas
                        .map((item) => item.trim()); // Trim whitespace around each item
                      setHotelPolicies(updatedPolicies);
                    }}
                    placeholder="Enter hotel policies, each on a new line"
                  />
                </Form.Item>

                <Form.Item
                  label="Booking Policy"
                  name="bookingPolicy"
                  className="form-item"
                >
                  <Input.TextArea
                    value={bookingPolicies.join(", ")}
                    rows={4}
                    onChange={(e) => {
                      const updatedBookingPolicies = e.target.value
                        .split(",") // Split the input by commas
                        .map((item) => item.trim()); // Trim whitespace around each item
                      setBookingPolicies(updatedBookingPolicies);
                    }}
                    placeholder="Enter booking policies, each on a new line"
                  />
                </Form.Item>
                <Form.Item
                  label="Safe to Stay"
                  name="safe2Stay"
                  className="form-item"
                >
                  <Input.TextArea
                    value={safe2Stay.join(", ")} // Display array items separated by commas
                    rows={4}
                    onChange={(e) => {
                      const updatedSafe2Stay = e.target.value
                        .split(",") // Split the input by commas
                        .map((item) => item.trim()); // Trim whitespace around each item
                      setSafe2Stay(updatedSafe2Stay);
                    }}
                    placeholder="Enter safe to stay features, each separated by a comma"
                  />
                </Form.Item>

                <Form.Item
                  label="Hotel Images"
                  extra="You can upload multiple images"
                  className="form-item"
                >
                  <Upload
                    multiple
                    listType="picture-card"
                    fileList={hotelImages}
                    onChange={handleFileChange}
                    beforeUpload={() => false}
                    className="upload-container"
                  >
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  </Upload>
                </Form.Item>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label="Latitude"
                      name="latitude"
                      rules={[
                        {
                          required: true,
                          message: "Please enter the latitude",
                        },
                      ]}
                      className="form-item"
                    >
                      <Input
                        type="text"
                        value={formData.location?.coordinates?.[0] ?? ""} // Use specific coordinate value
                        onChange={(e) =>
                          handleCoordinatesChange(0, e.target.value)
                        }
                        placeholder="Enter latitude"
                      />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      label="Longitude"
                      name="longitude"
                      rules={[
                        {
                          required: true,
                          message: "Please enter the longitude",
                        },
                      ]}
                      className="form-item"
                    >
                      <Input
                        type="text"
                        value={formData.location?.coordinates?.[1] ?? ""} // Use specific coordinate value
                        onChange={(e) =>
                          handleCoordinatesChange(1, e.target.value)
                        }
                        placeholder="Enter longitude"
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Button onClick={prev}>Previous</Button>
                  <Button type="primary" onClick={next}>
                    Next
                  </Button>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div>
                <h2 className="room-details-heading">Room Details</h2>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label="Total Room Count"
                      name="totalRooms"
                      className="form-item"
                    >
                      {/* //<Input value={totalRoomCount} readOnly /> */}
                      <p>totalRoomCount:{totalRoomCount}</p>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="AvailableRooms"
                      name="availableRooms"
                      className="form-item"
                    >
                      <p>TotalAvailableRoom:{totalAvailableRoomsCount}</p>
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item className="form-item">
                  {rooms.map((room, roomIndex) => (
                    <div key={roomIndex} className="room-item">
                      <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item
                            label="Room Type"
                            className="form-item"
                            required
                          >
                            <Input
                              type="text"
                              value={room.room_type}
                              onChange={(e) =>
                                handleRoomChange(
                                  e.target.value,
                                  roomIndex,
                                  "room_type"
                                )
                              }
                            />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item
                            label="Description"
                            className="form-item"
                            required
                          >
                            <Input
                              type="text"
                              value={room.description}
                              onChange={(e) =>
                                handleRoomChange(
                                  e.target.value,
                                  roomIndex,
                                  "description"
                                )
                              }
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row gutter={16}>
                        <Col span={24}>
                          <Form.Item
                            label="Room Amenities"
                            className="form-item"
                            required
                          >
                            <Input.TextArea
                              rows={4}
                              placeholder="Enter amenities separated by commas"
                              value={room.roomAmineties.join(", ")} // Convert array to string for display
                              onChange={(e) =>
                                handleRoomChange(
                                  e.target.value
                                    .split(",")
                                    .map((item) => item.trim()),
                                  roomIndex,
                                  "roomAmineties"
                                )
                              } // Split string into array
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item
                            label="Total Room"
                            name={`totalRooms-${roomIndex}`}
                            rules={[
                              {
                                required: true,
                                message: "Please enter total room",
                              },
                            ]}
                            className="form-item"
                          >
                            <Input
                              type="text"
                              value={room.totalRooms ?? ""}
                              onChange={(e) =>
                                handleRoomChange(
                                  e.target.value,
                                  roomIndex,
                                  "totalRooms"
                                )
                              }
                            />
                          </Form.Item>
                        </Col>

                        <Col span={12}>
                          <Form.Item
                            label="Available Rooms"
                            className="form-item"
                            name={`availableRooms-${roomIndex}`}
                            required
                          >
                            <Input
                              type="text"
                              value={room.availableRooms}
                              onChange={(e) =>
                                handleRoomChange(
                                  parseInt(e.target.value),
                                  roomIndex,
                                  "availableRooms"
                                )
                              }
                            />
                          </Form.Item>
                        </Col>
                      </Row>

                      <div>
                        {rooms[roomIndex]?.priceDetails?.net?.map(
                          (netItem, netIndex) => (
                            <div key={`net-${netIndex}`}>
                              <Row gutter={16}>
                                <Col span={12}>
                                  <Form.Item
                                    label="Amount"
                                    className="form-item"
                                    required
                                  >
                                    <Input
                                      type="text"
                                      value={netItem.amount}
                                      onChange={(e) =>
                                        handleNetChange(
                                          e.target.value,
                                          roomIndex,
                                          netIndex,
                                          "amount"
                                        )
                                      }
                                    />
                                  </Form.Item>
                                </Col>
                                <Col span={12}>
                                  <Form.Item
                                    label="Amount Type"
                                    className="form-item"
                                    required
                                  >
                                    <Input
                                      type="text"
                                      value={netItem.amountType}
                                      onChange={(e) =>
                                        handleNetChange(
                                          e.target.value,
                                          roomIndex,
                                          netIndex,
                                          "amountType"
                                        )
                                      }
                                    />
                                  </Form.Item>
                                </Col>
                              </Row>
                              <Row gutter={16}>
                                <Col span={12}>
                                  <Form.Item
                                    label="Currency"
                                    className="form-item"
                                    required
                                  >
                                    <Input
                                      type="text"
                                      value={netItem.currency}
                                      onChange={(e) =>
                                        handleNetChange(
                                          e.target.value,
                                          roomIndex,
                                          netIndex,
                                          "currency"
                                        )
                                      }
                                    />
                                  </Form.Item>
                                </Col>
                                <Col span={12}>
                                  <Form.Item
                                    label="Included"
                                    className="form-item"
                                    required
                                  >
                                    <Checkbox
                                      checked={netItem.included}
                                      onChange={(e) =>
                                        handleNetChange(
                                          e.target.checked,
                                          roomIndex,
                                          netIndex,
                                          "included"
                                        )
                                      }
                                    >
                                      Included
                                    </Checkbox>
                                  </Form.Item>
                                </Col>
                              </Row>
                              <Form.Item
                                label="Name"
                                className="form-item"
                                required
                              >
                                <Input
                                  type="text"
                                  value={netItem.name}
                                  onChange={(e) =>
                                    handleNetChange(
                                      e.target.value,
                                      roomIndex,
                                      netIndex,
                                      "name"
                                    )
                                  }
                                />
                              </Form.Item>
                            </div>
                          )
                        )}
                        <Button
                          type="dashed"
                          onClick={() => addNetItem(roomIndex)}
                          className="addItems"
                        >
                          Add Net Item
                        </Button>
                      </div>

                      <div>
                        {rooms[roomIndex]?.priceDetails?.gst?.map(
                          (gstItem, gstIndex) => (
                            <div key={`gst-${gstIndex}`}>
                              <Row gutter={16}>
                                <Col span={12}>
                                  <Form.Item
                                    label="Amount"
                                    className="form-item"
                                    required
                                  >
                                    <Input
                                      type="text"
                                      value={gstItem.amount}
                                      onChange={(e) =>
                                        handleGstChange(
                                          e.target.value,
                                          roomIndex,
                                          gstIndex,
                                          "amount"
                                        )
                                      }
                                    />
                                  </Form.Item>
                                </Col>
                                <Col span={12}>
                                  <Form.Item
                                    label="Amount Type"
                                    className="form-item"
                                    required
                                  >
                                    <Input
                                      type="text"
                                      value={gstItem.amountType}
                                      onChange={(e) =>
                                        handleGstChange(
                                          e.target.value,
                                          roomIndex,
                                          gstIndex,
                                          "amountType"
                                        )
                                      }
                                    />
                                  </Form.Item>
                                </Col>
                              </Row>
                              <Row gutter={16}>
                                <Col span={12}>
                                  <Form.Item
                                    label="Currency"
                                    className="form-item"
                                    required
                                  >
                                    <Input
                                      type="text"
                                      value={gstItem.currency}
                                      onChange={(e) =>
                                        handleGstChange(
                                          e.target.value,
                                          roomIndex,
                                          gstIndex,
                                          "currency"
                                        )
                                      }
                                    />
                                  </Form.Item>
                                </Col>
                                <Col span={12}>
                                  <Form.Item
                                    label="Included"
                                    className="form-item"
                                    required
                                  >
                                    <Checkbox
                                      checked={gstItem.included}
                                      onChange={(e) =>
                                        handleGstChange(
                                          e.target.checked,
                                          roomIndex,
                                          gstIndex,
                                          "included"
                                        )
                                      }
                                    >
                                      Included
                                    </Checkbox>
                                  </Form.Item>
                                </Col>
                              </Row>
                              <Form.Item
                                label="Name"
                                className="form-item"
                                required
                              >
                                <Input
                                  type="text"
                                  value={gstItem.name}
                                  onChange={(e) =>
                                    handleGstChange(
                                      e.target.value,
                                      roomIndex,
                                      gstIndex,
                                      "name"
                                    )
                                  }
                                />
                              </Form.Item>
                            </div>
                          )
                        )}
                        <Button
                          type="dashed"
                          onClick={() => addGstItem(roomIndex)}
                          className="addItems"
                        >
                          Add GST Item
                        </Button>
                      </div>

                      <div>
                        {rooms[roomIndex]?.priceDetails?.Weekday?.map(
                          (weekdayItem, weekdayIndex) => (
                            <div key={`weekday-${weekdayIndex}`}>
                              <Row gutter={16}>
                                <Col span={12}>
                                  <Form.Item
                                    label="Adults"
                                    className="form-item"
                                    required
                                  >
                                    <Input
                                      type="text"
                                      value={weekdayItem.noOfAdult}
                                      onChange={(e) =>
                                        handleWeekdayChange(
                                          e.target.value,
                                          roomIndex,
                                          weekdayIndex,
                                          "noOfAdult"
                                        )
                                      }
                                    />
                                  </Form.Item>
                                </Col>
                                <Col span={12}>
                                  <Form.Item
                                    label="Children"
                                    className="form-item"
                                    required
                                  >
                                    <Input
                                      type="text"
                                      value={weekdayItem.noOfChildren}
                                      onChange={(e) =>
                                        handleWeekdayChange(
                                          e.target.value,
                                          roomIndex,
                                          weekdayIndex,
                                          "noOfChildren"
                                        )
                                      }
                                    />
                                  </Form.Item>
                                </Col>
                              </Row>
                              <Form.Item
                                label="Room Price"
                                className="form-item"
                                required
                              >
                                <Input
                                  type="text"
                                  value={weekdayItem.room_Price}
                                  onChange={(e) =>
                                    handleWeekdayChange(
                                      e.target.value,
                                      roomIndex,
                                      weekdayIndex,
                                      "room_Price"
                                    )
                                  }
                                />
                              </Form.Item>
                              <Row gutter={16}>
                                <Col span={12}>
                                  <Radio.Group
                                    // value={weekdayItem.isSingle ? "single" : "double"}
                                    value={
                                      weekdayItem.isSingle
                                        ? "single"
                                        : weekdayItem.isDouble
                                        ? "double"
                                        : null
                                    }
                                    onChange={(e) => {
                                      handleWeekdayChange(
                                        e.target.value === "single",
                                        roomIndex,
                                        weekdayIndex,
                                        "isSingle"
                                      );
                                      handleWeekdayChange(
                                        e.target.value === "double",
                                        roomIndex,
                                        weekdayIndex,
                                        "isDouble"
                                      );
                                    }}
                                  >
                                    <Radio value="single">Is Single</Radio>
                                    <Radio value="double">Is Double</Radio>
                                  </Radio.Group>
                                </Col>
                                <Col span={12}>
                                  <Checkbox.Group
                                    value={[
                                      ...(weekdayItem.isCP ? ["isCP"] : []),
                                      ...(weekdayItem.isMAP ? ["isMAP"] : []),
                                      ...(weekdayItem.isEP ? ["isEP"] : []),
                                      ...(weekdayItem.isJAP ? ["isJAP"] : []),
                                      ...(weekdayItem.isAP ? ["isAP"] : []),
                                    ]}
                                    onChange={(checkedValues) => {
                                      handleWeekdayChange(
                                        checkedValues.includes("isAP"),
                                        roomIndex,
                                        weekdayIndex,
                                        "isAP"
                                      );
                                      handleWeekdayChange(
                                        checkedValues.includes("isCP"),
                                        roomIndex,
                                        weekdayIndex,
                                        "isCP"
                                      );
                                      handleWeekdayChange(
                                        checkedValues.includes("isMAP"),
                                        roomIndex,
                                        weekdayIndex,
                                        "isMAP"
                                      );
                                      handleWeekdayChange(
                                        checkedValues.includes("isEP"),
                                        roomIndex,
                                        weekdayIndex,
                                        "isEP"
                                      );
                                      handleWeekdayChange(
                                        checkedValues.includes("isJAP"),
                                        roomIndex,
                                        weekdayIndex,
                                        "isJAP"
                                      );
                                    }}
                                  >
                                    <Checkbox value="isCP">Is CP</Checkbox>
                                    <Checkbox value="isMAP">Is MAP</Checkbox>
                                    <Checkbox value="isEP">Is EP</Checkbox>
                                    <Checkbox value="isJAP">Is JAP</Checkbox>
                                    <Checkbox value="isAP">Is AP</Checkbox>
                                  </Checkbox.Group>
                                </Col>
                              </Row>
                            </div>
                          )
                        )}
                        <Button
                          type="dashed"
                          onClick={() => addWeekdayItem(roomIndex)}
                          className="addItems"
                        >
                          Add Weekday Item
                        </Button>
                      </div>
                      <div>
                        {rooms[roomIndex]?.priceDetails?.Weekend?.map(
                          (weekendItem, weekendIndex) => (
                            <div key={`weekend-${weekendIndex}`}>
                              <Row gutter={16}>
                                <Col span={12}>
                                  <Form.Item
                                    label="Adults"
                                    className="form-item"
                                    required
                                  >
                                    <Input
                                      type="text"
                                      value={weekendItem.noOfAdult}
                                      onChange={(e) =>
                                        handleWeekendChange(
                                          e.target.value,
                                          roomIndex,
                                          weekendIndex,
                                          "noOfAdult"
                                        )
                                      }
                                    />
                                  </Form.Item>
                                </Col>
                                <Col span={12}>
                                  <Form.Item
                                    label="Children"
                                    className="form-item"
                                    required
                                  >
                                    <Input
                                      type="text"
                                      value={weekendItem.noOfChildren}
                                      onChange={(e) =>
                                        handleWeekendChange(
                                          e.target.value,
                                          roomIndex,
                                          weekendIndex,
                                          "noOfChildren"
                                        )
                                      }
                                    />
                                  </Form.Item>
                                </Col>
                              </Row>
                              <Form.Item
                                label="Room Price"
                                className="form-item"
                                required
                              >
                                <Input
                                  type="text"
                                  value={weekendItem.room_Price}
                                  onChange={(e) =>
                                    handleWeekendChange(
                                      e.target.value,
                                      roomIndex,
                                      weekendIndex,
                                      "room_Price"
                                    )
                                  }
                                />
                              </Form.Item>
                              <Row gutter={16}>
                                <Col span={12}>
                                  <Radio.Group
                                    // value={weekendItem.isSingle ? "single" : "double"}
                                    value={
                                      weekendItem.isSingle
                                        ? "single"
                                        : weekendItem.isDouble
                                        ? "double"
                                        : null
                                    }
                                    onChange={(e) => {
                                      handleWeekendChange(
                                        e.target.value === "single",
                                        roomIndex,
                                        weekendIndex,
                                        "isSingle"
                                      );
                                      handleWeekendChange(
                                        e.target.value === "double",
                                        roomIndex,
                                        weekendIndex,
                                        "isDouble"
                                      );
                                    }}
                                  >
                                    <Radio value="single">Is Single</Radio>
                                    <Radio value="double">Is Double</Radio>
                                  </Radio.Group>
                                </Col>
                                <Col span={12}>
                                  <Checkbox.Group
                                    value={[
                                      ...(weekendItem.isCP ? ["isCP"] : []),
                                      ...(weekendItem.isMAP ? ["isMAP"] : []),
                                      ...(weekendItem.isEP ? ["isEP"] : []),
                                      ...(weekendItem.isJAP ? ["isJAP"] : []),
                                      ...(weekendItem.isAP ? ["isAP"] : []),
                                    ]}
                                    onChange={(checkedValues) => {
                                      handleWeekendChange(
                                        checkedValues.includes("isCP"),
                                        roomIndex,
                                        weekendIndex,
                                        "isCP"
                                      );
                                      handleWeekendChange(
                                        checkedValues.includes("isMAP"),
                                        roomIndex,
                                        weekendIndex,
                                        "isMAP"
                                      );
                                      handleWeekendChange(
                                        checkedValues.includes("isEP"),
                                        roomIndex,
                                        weekendIndex,
                                        "isEP"
                                      );
                                      handleWeekendChange(
                                        checkedValues.includes("isJAP"),
                                        roomIndex,
                                        weekendIndex,
                                        "isJAP"
                                      );

                                      handleWeekendChange(
                                        checkedValues.includes("isAP"),
                                        roomIndex,
                                        weekendIndex,
                                        "isAP"
                                      );
                                    }}
                                  >
                                    <Checkbox value="isCP">Is CP</Checkbox>
                                    <Checkbox value="isMAP">Is MAP</Checkbox>
                                    <Checkbox value="isEP">Is EP</Checkbox>
                                    <Checkbox value="isJAP">Is JAP</Checkbox>
                                    <Checkbox value="isAP">Is AP</Checkbox>
                                  </Checkbox.Group>
                                </Col>
                              </Row>
                            </div>
                          )
                        )}
                        <Button
                          type="dashed"
                          onClick={() => addWeekendItem(roomIndex)}
                          className="addItems"
                        >
                          Add Weekend Item
                        </Button>
                      </div>

                      <Button
                        type="primary"
                        danger
                        onClick={() => removeRoom(roomIndex)}
                        icon={<CloseOutlined style={iconStyle} />}
                        style={buttonStyle}
                        onMouseEnter={(e) =>
                          Object.assign(e.target.style, hoverStyle)
                        }
                        onMouseLeave={(e) =>
                          Object.assign(e.target.style, buttonStyle)
                        }
                        onFocus={(e) =>
                          Object.assign(e.target.style, focusStyle)
                        }
                        onBlur={(e) =>
                          Object.assign(e.target.style, buttonStyle)
                        }
                      >
                        Remove Room
                      </Button>
                    </div>
                  ))}
                  <Form.Item>
                    <Button type="dashed" onClick={addRoom} block>
                      <PlusOutlined /> Add Room
                    </Button>
                  </Form.Item>
                </Form.Item>
                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item label="Room Images" className="form-item">
                      <Upload
                        multiple
                        listType="picture-card"
                        fileList={roomsImages}
                        onChange={handleRoomFileChange}
                        beforeUpload={() => false}
                        maxCount={5} // Set maximum number of images to 5
                      >
                        <div>
                          <PlusOutlined />
                          <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                      </Upload>
                    </Form.Item>
                  </Col>
                </Row>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "10px",
                  }}
                >
                  <Button onClick={prev}>Previous</Button>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </div>
              </div>
            )}
          </Form>
        </div>
      </div>
    </Spin>
  );
};

export default InventoryHotelForm;
