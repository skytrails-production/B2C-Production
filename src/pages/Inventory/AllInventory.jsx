import React, { useState, useEffect } from "react";
import { apiURL } from "../../Constants/constant";
import { Table, message, Button, Modal, Upload, Select, Spin } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
const { Option } = Select;

const AllInventory = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedInventory, setSelectedInventory] = useState(null);
  const [isDescriptionModalVisible, setIsDescriptionModalVisible] =
    useState(false);
  const [selectedDescription, setSelectedDescription] = useState("");
  const [imageCounts, setImageCounts] = useState({}); // State to manage image counts

 

  const showDescriptionModal = (description) => {
    setSelectedDescription(description);
    setIsDescriptionModalVisible(true);
  };

  const handleDescriptionModalClose = () => {
    setIsDescriptionModalVisible(false);
    setSelectedDescription("");
  };

  const handleViewDetails = (record) => {
    setSelectedInventory(record);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        message.error("No token found. Please login first.");
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(
          `${apiURL.baseURL}/skyTrails/api/inventory/getAllHotelInventoryofPartner`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              token: token,
            },
          }
        );

        const responseData = await response.json();
        if (
          responseData.statusCode === 200 &&
          Array.isArray(responseData.result.result)
        ) {
          setData(responseData.result.result);

          // Initialize imageCounts with existing data
          const counts = responseData.result.result.reduce((acc, item) => {
            acc[item._id] = (item.hotelImages || []).length;
            return acc;
          }, {});
          setImageCounts(counts);
        } else {
          message.error("Failed to fetch inventory data");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching inventory data:", error);
        message.error("Failed to fetch inventory data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleImageUpload = async (record, file, onSuccess, onError) => {
    const formData = new FormData();
    const token = localStorage.getItem("token");

    formData.append("hotelId", record._id);
    formData.append("hotelImages", file);

    try {
      const response = await axios.put(
        `${apiURL.baseURL}/skyTrails/api/inventory/uploadInventoryImage`,
        formData,
        {
          headers: {
            token: token,
          },
        }
      );
      onSuccess(response.data);

      // Update the image count
      setImageCounts((prevCounts) => ({
        ...prevCounts,
        [record._id]: (prevCounts[record._id] || 0) + 1,
      }));

      message.success(`${file.name} image uploaded successfully`);
    } catch (error) {
      onError(error);
      message.error(`${file.name} image upload failed.`);
    }
  };

  const columns = [
    {
      title: "Hotel Name",
      dataIndex: "hotelName",
      key: "hotelName",
      fixed: "left",
    },
    {
      title: "Upload Hotel Image",
      key: "uploadHotelImage",
      render: (text, record) => (
        <div>
          <Upload
            customRequest={async ({ file, onSuccess, onError }) =>
              handleImageUpload(record, file, onSuccess, onError)
            }
            showUploadList={false} // Hide the default upload list UI
          >
            <Button icon={<UploadOutlined />}>Upload Image</Button>
          </Upload>
          <p style={{ marginLeft: 8 }}>
            {imageCounts[record._id] || 0}{" "}
            {imageCounts[record._id] === 1 ? "image" : "images"}
          </p>
        </div>
      ),
    },

    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Button type="link" onClick={() => handleViewDetails(record)}>
          View Details
        </Button>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 400,
      render: (text) => (
        <div
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 3, // Limit to 3 lines
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            cursor: "pointer", // Make it look clickable
            color: "black", // Optional: Change text color to indicate it's clickable
          }}
          onClick={() => showDescriptionModal(text)} // Show modal on click
        >
          {text}
        </div>
      ),
    },
    {
      title: "Locality",
      dataIndex: "locality",
      key: "locality",
    },
    {
      title: "CompanyName",
      dataIndex: "CompanyName",
      key: "CompanyName",
    },
    {
      title: "GstNo",
      dataIndex: "gstNo",
      key: "gstNo",
    },
    {
      title: "HotelCity",
      dataIndex: "hotelCity",
      key: "hotelCity",
    },
    {
      title: "HotelCountry",
      dataIndex: "hotelCountry",
      key: "hotelCountry",
    },
    {
      title: "HotelState",
      dataIndex: "hotelState",
      key: "hotelState",
    },
    {
      title: "HotelRating",
      dataIndex: "rating",
      key: "rating",
    },
    {
      title: "CityCode",
      dataIndex: "cityCode",
      key: "cityCode",
    },
    {
      title: "Hotel Address",
      dataIndex: "hotelAddress",
      key: "hotelAddress",
      width: 500,
      className: "hotel-address-column", // Add a custom class
    },
    {
      title: "HotelCode",
      dataIndex: "hotelCode",
      key: "hotelCode",
    },
    {
      title: "Start Date",
      dataIndex: "startFrom",
      key: "startFrom",
    },
    {
      title: "End Date",
      dataIndex: "availableDate",
      key: "availableDate",
    },
    {
      title: "Rooms Count",
      dataIndex: "rooms",
      key: "rooms",
      render: (rooms) => (rooms ? rooms.length : 0),
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      render: (location) => {
        if (location && location.coordinates) {
          return `${location.coordinates[0]}, ${location.coordinates[1]}`;
        }
        return "";
      },
    },
    {
      title: "Total Rooms",
      dataIndex: "totalRooms",
      key: "totalRooms",
    },
    {
      title: "Available Rooms",
      dataIndex: "availableRooms",
      key: "availableRooms",
    },
  ];

  return (
    <div>
      <h2>All Inventory</h2>
      <div style={{ overflowX: "auto" }}>
        <Table
          columns={columns}
          dataSource={data}
          loading={loading}
          rowKey={(record) => record._id}
          scroll={{ x: true }} // Enable horizontal scrolling
        />
      </div>

      {/* Modal for viewing all details */}
      {isModalVisible && selectedInventory && (
        <Modal
          title="Inventory Details"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={[
            <Button key="close" onClick={handleCancel}>
              Close
            </Button>,
          ]}
        >
          {/* Details of selected inventory */}
          <div>
            <p>
              <strong>Hotel Name:</strong> {selectedInventory.hotelName}
            </p>
            <p>
              <strong>Description:</strong> {selectedInventory.description}
            </p>
            <p>
              <strong>Locality:</strong> {selectedInventory.locality}
            </p>
            <p>
              <strong>Hotel City:</strong> {selectedInventory.hotelCity}
            </p>
            <p>
              <strong>Hotel Country:</strong> {selectedInventory.hotelCountry}
            </p>
            <p>
              <strong>Hotel State:</strong> {selectedInventory.hotelState}
            </p>
            <p>
              <strong>Rating:</strong> {selectedInventory.rating}
            </p>
            <p>
              <strong>City Code:</strong> {selectedInventory.cityCode}
            </p>
            <p>
              <strong>Hotel Address:</strong> {selectedInventory.hotelAddress}
            </p>
            <p>
              <strong>Hotel Code:</strong> {selectedInventory.hotelCode}
            </p>
            <p>
              <strong>Start Date:</strong> {selectedInventory.startFrom}
            </p>
            <p>
              <strong>End Date:</strong> {selectedInventory.availableDate}
            </p>
            <p>
              <strong>Total Rooms:</strong> {selectedInventory.totalRooms}
            </p>
            <p>
              <strong>Available Rooms:</strong>{" "}
              {selectedInventory.availableRooms}
            </p>
            <p>
              <strong>Location:</strong>{" "}
              {selectedInventory.location.coordinates.join(", ")}
            </p>
            <div>
              <strong>Hotel Images:</strong>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px",
                  marginTop: "10px",
                }}
              >
                {selectedInventory.hotelImages.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Hotel Image ${index + 1}`}
                    style={{
                      width: "100px",
                      height: "auto",
                      borderRadius: "5px",
                    }}
                  />
                ))}
              </div>
            </div>
            <div>
              {/* Other room details */}
              {selectedInventory.rooms.map((room, roomIndex) => (
                <div key={roomIndex}>
                  {/* Display Room Images */}
                  {selectedInventory.rooms.map((room, roomIndex) => (
                    <div key={roomIndex}>
                      <p>
                        <strong>Room Type:</strong> {room.room_type}
                      </p>
                      <p>
                        <strong>Room Description:</strong> {room.description}
                      </p>
                      <p>
                        <strong>Total Rooms:</strong> {room.totalRooms}
                      </p>
                      <p>
                        <strong>Available Rooms:</strong> {room.availableRooms}
                      </p>

                      {/* Displaying Room Images */}
                      <div>
                        <strong>Room Images:</strong>
                        {room.roomsImages.map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt={`Room Image ${index + 1}`}
                            style={{
                              width: "100px",
                              height: "100px",
                              margin: "5px",
                            }}
                          />
                        ))}
                      </div>

                      {/* Additional details can be added here */}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </Modal>
      )}

      {/* Modal for displaying the full description */}
      <Modal
        title="Description"
        visible={isDescriptionModalVisible}
        onCancel={handleDescriptionModalClose}
        footer={[
          <Button key="close" onClick={handleDescriptionModalClose}>
            Close
          </Button>,
        ]}
      >
        <p>{selectedDescription}</p>
      </Modal>
    </div>
  );
};

export default AllInventory;
