import React, { useState } from "react";
import { Form, Input, Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Login.css";
import { apiURL } from "../../Constants/constant";

const { Title } = Typography;

const Registerinventory = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    hotelName: "",
    hotelCity: "",
    hotelState: "",
  });

  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (values) => {
    console.log("Success:", values);

    const requestData = {
      ...values,
    };

    try {
      const response = await fetch(
        `${apiURL.baseURL}/skytrails/register/inventory/api`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );
      if (response.ok) {
        setMessage("Registered successfully");
        setTimeout(() => {
          navigate("/inventoryLogin"); // Redirect to login after a delay
        }, 2000);
      } else {
        setMessage("User already exists");
      }
    } catch (error) {
      setMessage("An error occurred during registration.");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="login-container">
      <div className="login-form-wrapper">
        <Title level={2} className="login-heading">
          Inventory Register
        </Title>
        <Form
          name="basic"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={handleSubmit}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input value={formData.email} onChange={handleChange} />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password value={formData.password} onChange={handleChange} />
          </Form.Item>

          <Form.Item
            label="Hotel Name"
            name="hotelName"
            rules={[
              { required: true, message: "Please input your hotel name!" },
            ]}
          >
            <Input value={formData.hotelName} onChange={handleChange} />
          </Form.Item>

          <Form.Item
            label="Hotel City"
            name="hotelCity"
            rules={[
              { required: true, message: "Please input your hotel city!" },
            ]}
          >
            <Input value={formData.hotelCity} onChange={handleChange} />
          </Form.Item>

          <Form.Item
            label="Hotel State"
            name="hotelState"
            rules={[
              { required: true, message: "Please input your hotel state!" },
            ]}
          >
            <Input value={formData.hotelState} onChange={handleChange} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-button">
              Register
            </Button>
          </Form.Item>
        </Form>

        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default Registerinventory;
