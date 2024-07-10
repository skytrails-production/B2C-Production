import React, { useEffect, useState } from "react";
import { Table, Spin, Alert } from "antd";
import axios from "axios";
import { apiURL } from "../../Constants/constant";

const InventoryUser = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${apiURL.baseURL}/skyTrails/api/inventory/getAllInventoryData`)
      .then((response) => {
        console.log("API response:", response.data);
        if (response.data && Array.isArray(response.data.result)) {
          setData(response.data.result);
        } else {
          setData([]);
          setError("Invalid data format received from API");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const columns = [
    {
      title: "Hotel Name",
      dataIndex: "hotelName",
      key: "hotelName",
    },
    {
      title: "Location",
      dataIndex: "hotelCity",
      key: "hotelCity",
    },
    // {
    //   title: 'Available Rooms',
    //   dataIndex: 'availableRooms',
    //   key: 'availableRooms',
    // },
    // {
    //   title: 'Price Per Night',
    //   dataIndex: ['rooms', 0, 'room_Price'], // Example to show price from the first room
    //   key: 'room_Price',
    // },
    // {
    //   title: 'Rating',
    //   dataIndex: 'rating',
    //   key: 'rating',
    // },
  ];

  if (loading) {
    return <Spin size="large" />;
  }

  if (error) {
    return <Alert message="Error" description={error} type="error" showIcon />;
  }

  return <Table columns={columns} dataSource={data} rowKey="_id" />;
};

export default InventoryUser;
