import React, { useState, useEffect } from "react";
import { apiURL } from "../../Constants/constant";
import { Table, message, Button, Popconfirm } from "antd";
const AllInventory = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token"); // Retrieve the token from local storage
      console.log(token, "tokenssssssssssssssss");
      if (!token) {
        message.error("No token found. Please login first.");
        setLoading(false);
        return;
      }
      try {
        console.log("Fetching data...");

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
        console.log("Response data:", responseData); // Log the response data

        if (
          responseData.statusCode === 200 &&
          Array.isArray(responseData.result.result)
        ) {
          setData(responseData.result.result);
        } else {
          message.error("Failed to fetch inventory data");
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching inventory data:", error); // Log the error response for debugging
        message.error("Failed to fetch inventory data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  
  const columns = [
    {
      title: "Hotel Name",
      dataIndex: "hotelName",
      key: "hotelName",
      fixed: "left",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Locality",
      dataIndex: "locality",
      key: "locality",
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
      title: "HotelAddress",
      dataIndex: "hotelAddress",
      key: "hotelAddress",
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
    
    // Add more columns as needed
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
    </div>
  );
};

export default AllInventory;
