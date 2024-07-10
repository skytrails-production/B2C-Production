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
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "./Inventory.css";
import { apiURL } from "../../Constants/constant";
import { useEffect } from "react";
const { Title } = Typography;
const { Option } = Select;

const InventoryHotelForm = () => {
  const [hotelFacilities, setHotelFacilities] = useState([]);
  const [totalRoomCount, setTotalRoomCount] = useState(0);
  const [totalAvailableRoomsCount, setTotalAvailableRoomsCount] = useState(0);
  console.log(totalAvailableRoomsCount, "available");
  console.log(setTotalAvailableRoomsCount, "absjdhbsdf");
  const [currentAmenities, setCurrentAmenities] = useState("");
  const [hotelAmenities, setHotelAmenities] = useState([]);
  const [currentPolicy, setCurrentPolicy] = useState(""); // State for current policy input
  const [hotelPolicies, setHotelPolicies] = useState([]);
  const [currentFacility, setCurrentFacility] = useState("");
  const [rooms, setRooms] = useState([
    {
      room_type: "",
      description: "",
      totalRooms: 0,
      noOfAdult: 0,
      noOfChildren: 0,
      room_Price: 0,
      availableRooms: 0,
      priceDetails: {
        net: [],
      },
    },
  ]);

  const [hotelImages, setHotelImages] = useState([]);
  const [roomsImages, setroomsImages] = useState([]);
  // let roomArr=[];
  const [formData, setFormData] = useState({
    mealType: [],
    location: {
      type: "Point",
      coordinates: [0, 0], // Initial values
    },
    hotelName: "",
    hotelCity: "",
    hotelCountry: "",
    hotelState: "",
    panCard: "",
    description: "",
    hotelPolicy: "",

    locality: "",
    cityCode: "",
    hotelAddress: "",
    rating: "1",
    totalRooms: "",
    availableRooms: "",
    totalPrice: "",
    hotelCode: "",
  });

  const handleNetChange = (value, roomIndex, netIndex, field) => {
    const newRooms = [...rooms];
    newRooms[roomIndex].priceDetails.net[netIndex][field] = value;
    setRooms(newRooms);
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
      amountType: "value",
      currency: "In",
      included: false,
      name: "",
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
  const handleFileChange = ({ file, fileList }) => {
    console.log("File changed:", file);
    console.log("File list:", fileList);

    setHotelImages(fileList);
  };

  const handleRoomFileChange = ({ file, fileList }) => {
    console.log("File changed:", file);
    console.log("File list:", fileList);

    setroomsImages(fileList);
  };

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

  //rooms

  const handleSubmit = async () => {
    console.log("Form data:", rooms, totalRoomCount);
    const formdata = new FormData();

    formdata.append("hotelName", formData.hotelName);
    formdata.append("hotelCity", formData.hotelCity);
    formdata.append("hotelCountry", formData.hotelCountry);
    formdata.append("hotelState", formData.hotelState);
    formdata.append("panCard", formData.panCard);
    formdata.append("rating", formData.rating);
    formdata.append("total Price", formData.totalPrice);
    formdata.append("description", formData.description);
    formdata.append("cityCode", formData.cityCode);
    formdata.append("locality", formData.locality);
    formdata.append("hotelAddress", formData.hotelAddress);
    formdata.append("totalPrice", formData.totalPrice);
    formdata.append("totalRooms", totalRoomCount);
    formdata.append("availableRooms", totalAvailableRoomsCount);

    formdata.append("amenities", JSON.stringify(hotelAmenities));
    formdata.append("facilities", JSON.stringify(hotelFacilities));

    formdata.append("hotelPolicy", JSON.stringify(hotelPolicies));
    console.log(hotelPolicies, "----------");
    formdata.append("hotelCode", formData.hotelCode);
    formdata.append("roomArr", JSON.stringify(rooms));
    formdata.append("mealType", JSON.stringify(formData.mealType));
    formdata.append("location", JSON.stringify(formData.location));
    console.log(JSON.stringify(formData.location), "location-----");
    hotelImages.forEach((file) => {
      formdata.append("hotelImages", file.originFileObj);
    });

    roomsImages.forEach((file) => {
      formdata.append("roomsImages", file.originFileObj);
    });

    // Log the formdata object to check if hotelPolicy and hotelFacilities are included
    for (let [key, value] of formdata.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      const response = await fetch(
        `${apiURL.baseURL}/skyTrails/api/inventory/createInventory`,
        {
          method: "POST",
          body: formdata,
        }
      );

      const responseData = await response.json();

      // Log the response from the server
      console.log(responseData);

      if (response.ok) {
        notification.success({
          message: "Hotel Form Created",
          className: "custom-notification",
        });

        setFormData({
          hotelName: "",
          hotelCity: "",
          hotelCountry: "",
          hotelState: "",
          panCard: "",
          rating: "",
          description: "",
          hotelPolicy: "",
          locality: "",
          hotelAmenities: [],
          hotelAddress: "",
          totalRooms: "",
          totalPrice: "",
          hotelCode: "",
          mealType: [], // Reset mealType
        });
        setHotelFacilities([]);
        setHotelPolicies([]);
        setHotelImages([]);
        setRooms([]);
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
    }
  };

  console.log(rooms, typeof rooms, "++++++++++++++++++", typeof rooms);
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleFacilityAdd = () => {
    if (currentFacility.trim() !== "") {
      setHotelFacilities([...hotelFacilities, currentFacility.trim()]);
      setCurrentFacility("");
    }
  };

  // Handle adding policy
  const handlePolicyAdd = () => {
    if (currentPolicy.trim() !== "") {
      setHotelPolicies([...hotelPolicies, currentPolicy.trim()]);
      console.log(setHotelPolicies, "pppppppppppp");
      setCurrentPolicy("");
    }
  };

  const handleAmenitiesAdd = () => {
    if (currentAmenities.trim() !== "") {
      setHotelAmenities([...hotelAmenities, currentAmenities]);
      setCurrentAmenities("");
    }
  };

  const handleAmenityClose = (index) => {
    setHotelAmenities(hotelAmenities.filter((_, i) => i !== index));
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
        noOfAdult: 0,
        noOfChildren: 0,
        room_Price: 0,
        availableRooms: 0,
        priceDetails: {
          net: [],
        },
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
  return (
    <div className="inventoryForm">
      <div className="form-container">
        <Title level={2} className="form-heading">
          Inventory Hotel Form
        </Title>
        <Form
          name="hotel_form"
          layout="vertical"
          initialValues={{ rating: 1 }}
          onFinish={handleSubmit}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Hotel Name"
                name="hotelName"
                rules={[{ required: true, message: "Please enter hotel name" }]}
                className="form-item"
              >
                <Input
                  name="hotelName"
                  value={formData.hotelName}
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Hotel State"
                name="hotelState"
                rules={[
                  { required: true, message: "Please enter hotel address" },
                ]}
                className="form-item"
              >
                <Input
                  name="hotelState"
                  value={formData.hotelState}
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="City"
                name="hotelCity"
                rules={[{ required: true, message: "Please enter city" }]}
                className="form-item"
              >
                <Input
                  name="hotelCity"
                  value={formData.hotelCity}
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Country"
                name="hotelCountry"
                rules={[{ required: true, message: "Please enter country" }]}
                className="form-item"
              >
                <Input
                  name="hotelCountry"
                  value={formData.hotelCountry}
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Description"
                name="description"
                rules={[{ required: true, message: "Please enter city" }]}
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
                rules={[{ required: true, message: "Please enter  locality" }]}
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
              <Form.Item
                label="City Code"
                name="cityCode"
                rules={[
                  {
                    required: true,
                    message: "Please enter cityCode",
                  },
                ]}
                className="form-item"
              >
                <Input
                  name="cityCode"
                  value={formData.cityCode}
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="HotelAddress"
                name="hotelAddress"
                rules={[
                  { required: true, message: "Please select hotel rating" },
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
                label="Do you have a PAN card?"
                name="panCard"
                rules={[
                  {
                    required: true,
                    message: "Please select whether you have a PAN card",
                  },
                ]}
                className="form-item"
              >
                <Radio.Group
                  name="panCard"
                  onChange={handleChange}
                  value={formData.panCard}
                >
                  <Radio value="yes">Yes</Radio>
                  <Radio value="no">No</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Rating"
                name="rating"
                rules={[
                  { required: true, message: "Please select hotel rating" },
                ]}
                className="form-item"
              >
                <Select
                  name="rating"
                  value={formData.rating}
                  onChange={(value) =>
                    setFormData({ ...formData, rating: value })
                  }
                >
                  <Option value="1">1 star</Option>
                  <Option value="2">2 stars</Option>
                  <Option value="3">3 stars</Option>
                  <Option value="4">4 stars</Option>
                  <Option value="5">5 stars</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

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

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Total Price"
                name="totalPrice"
                rules={[
                  { required: true, message: "Please enter hotel price" },
                ]}
                className="form-item"
              >
                <Input
                  type="number"
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
                rules={[
                  { required: true, message: "Please enter hotel price" },
                ]}
                className="form-item"
              >
                <Input
                  type="number"
                  name="hotelCode"
                  value={formData.hotelCode}
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="Hotel Facilities" className="form-item">
            <Input
              value={currentFacility}
              onChange={(e) => setCurrentFacility(e.target.value)}
              placeholder="Enter facility"
              style={{ marginBottom: "10px" }}
            />
            <Button
              type="dashed"
              onClick={handleFacilityAdd}
              className="add-facility-button"
            >
              + Add Facility
            </Button>
            <div className="facility-chips">
              {hotelFacilities.map((facilities, index) => (
                <Tag
                  key={index}
                  closable
                  onClose={() => {
                    setHotelFacilities(
                      hotelFacilities.filter((_, i) => i !== index)
                    );
                  }}
                >
                  {facilities}
                </Tag>
              ))}
            </div>
          </Form.Item>
          <Form.Item
            label="Hotel Policy"
            name="hotelPolicy"
            className="form-item"
          >
            <Input
              value={currentPolicy}
              onChange={(e) => setCurrentPolicy(e.target.value)}
              placeholder="Enter hotel policy"
              style={{ marginBottom: "10px" }}
            />
            <Button
              type="dashed"
              onClick={handlePolicyAdd}
              className="add-facility-button"
            >
              + Add Policy
            </Button>
            <div className="facility-chips">
              {hotelPolicies.map((policy, index) => (
                <Tag
                  key={index}
                  closable
                  onClose={() => {
                    setHotelPolicies(
                      hotelPolicies.filter((_, i) => i !== index)
                    );
                  }}
                >
                  {policy}
                </Tag>
              ))}
            </div>
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Meal Type"
                name="mealType"
                rules={[
                  {
                    required: true,
                    message: "Please select at least one meal type",
                  },
                ]}
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
          </Row>
          {/* <Form.Item label="Hotel Facilities" className="form-item">
            <Input
              value={currentFacility}
              onChange={(e) => setCurrentFacility(e.target.value)}
              placeholder="Enter facility"
              style={{ marginBottom: "10px" }}
            />
            <Button
              type="dashed"
              onClick={handleFacilityAdd}
              className="add-facility-button"
            >
              + Add Facility
            </Button>
            <div className="facility-chips">
              {hotelFacilities.map((facilities, index) => (
                <Tag
                  key={index}
                  closable
                  onClose={() => {
                    setHotelFacilities(
                      hotelFacilities.filter((_, i) => i !== index)
                    );
                  }}
                >
                  {facilities}
                </Tag>
              ))}
            </div>
          </Form.Item> */}

          {/* <Form.Item label="Amenities" name="amenities" className="form-item">
            <Input
              value={currentAmenities}
              onChange={(e) => setCurrentAmenities(e.target.value)}
              placeholder="Enter amenities"
              style={{ marginBottom: "10px" }}
            />
            <Button
              type="dashed"
              onClick={handleAmenitiesAdd}
              className="add-facility-button"
            >
              + Add Amenities
            </Button>
            <div className="facility-chips">
              {hotelAmenities.map((amenity, index) => (
                <Tag
                  key={index}
                  closable
                  onClose={() => {
                    setHotelAmenities(
                      hotelAmenities.filter((_, i) => i !== index)
                    );
                  }}
                >
                  {amenity}
                </Tag>
              ))}
            </div>
          </Form.Item> */}

          <Form.Item label="Amenities" name="amenities" className="form-item">
            <Input
              value={currentAmenities}
              onChange={(e) => setCurrentAmenities(e.target.value)}
              placeholder="Enter amenities"
              style={{ marginBottom: "10px" }}
            />
            <Button
              type="dashed"
              onClick={handleAmenitiesAdd}
              className="add-facility-button"
            >
              + Add Amenities
            </Button>
            <div className="facility-chips">
              {hotelAmenities.map((amenity, index) => (
                <Tag
                  key={index}
                  closable
                  onClose={() => handleAmenityClose(index)}
                >
                  {amenity}
                </Tag>
              ))}
            </div>
          </Form.Item>

          <Form.Item label="Room Details" className="form-item">
            {rooms.map((room, roomIndex) => (
              <div key={roomIndex} className="room-item">
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="Room Type" className="form-item" required>
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
                <Form.Item>
                  <Col span={12}>
                    <Form.Item
                      label="Total Room"
                      name={`totalRooms-${roomIndex}`}
                      rules={[
                        { required: true, message: "Please enter total room" },
                      ]}
                      className="form-item"
                    >
                      <Input
                        type="number"
                        value={room.totalRooms}
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
                </Form.Item>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label="No of Adult"
                      className="form-item"
                      required
                    >
                      <Input
                        type="number"
                        value={room.noOfAdult}
                        onChange={(e) =>
                          handleRoomChange(
                            e.target.value,
                            roomIndex,
                            "noOfAdult"
                          )
                        }
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="No Of Children"
                      className="form-item"
                      required
                    >
                      <Input
                        type="number"
                        value={room.noOfChildren}
                        onChange={(e) =>
                          handleRoomChange(
                            parseInt(e.target.value),
                            roomIndex,
                            "noOfChildren"
                          )
                        }
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label="Room Price"
                      className="form-item"
                      required
                    >
                      <Input
                        type="number"
                        value={room.room_Price}
                        onChange={(e) =>
                          handleRoomChange(
                            e.target.value,
                            roomIndex,
                            "room_Price"
                          )
                        }
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Available Rooms"
                      className="form-item"
                      required
                    >
                      <Input
                        type="number"
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
                  {room?.priceDetails?.net?.map((netItem, netIndex) => (
                    <div key={netIndex} className="net-item">
                      <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item
                            label="Amount"
                            className="form-item"
                            required
                          >
                            <Input
                              type="number"
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
                              //value={netItem.amountType}
                              readOnly
                              value="value"
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
                              //value={netItem.currency}
                              readOnly
                              value="In"
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
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row gutter={16}>
                        <Col span={12}>
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
                        </Col>
                      </Row>
                    </div>
                  ))}
                  <Button type="dashed" onClick={() => addNetItem(roomIndex)}>
                    Add Net Item
                  </Button>
                </div>

                <Button
                  type="danger"
                  onClick={() => removeRoom(roomIndex)}
                  className="remove-room-button"
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
                >
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
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
                  type="number"
                  value={formData.location?.coordinates?.[0] ?? ""} // Use specific coordinate value
                  onChange={(e) => handleCoordinatesChange(0, e.target.value)}
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
                  type="number"
                  value={formData.location?.coordinates?.[1] ?? ""} // Use specific coordinate value
                  onChange={(e) => handleCoordinatesChange(1, e.target.value)}
                  placeholder="Enter longitude"
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="submit-button">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default InventoryHotelForm;
