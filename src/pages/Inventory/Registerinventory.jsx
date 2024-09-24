import React, { useState } from "react";
import { Form, Input, Button, Typography, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { apiURL } from "../../Constants/constant";

const { Title } = Typography;

const Registerinventory = () => {
  const [formData, setFormData] = useState({
    hotelName: "",
    propertyType: "",
    channelMngrName: "",
    managerName: "",
    email: "",
    phoneNumber: "",
    hotelCity: ""
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
        `${apiURL.baseURL}/skyTrails/api/inventory/becomePartner`,
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
          navigate("/inventoryLogin");
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
    <div className="login-container-inventory">
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
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Hotel Name"
                name="hotelName"
                rules={[{ required: true, message: "Please input your hotel name!" }]}
              >
                <Input value={formData.hotelName} onChange={handleChange} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Property Type"
                name="propertyType"
                rules={[{ required: true, message: "Please input your property type!" }]}
              >
                <Input value={formData.propertyType} onChange={handleChange} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Channel Manager Name"
                name="channelMngrName"
                rules={[
                  { required: true, message: "Please input your channel manager name!" },
                ]}
              >
                <Input value={formData.channelMngrName} onChange={handleChange} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Manager Name"
                name="managerName"
                rules={[
                  { required: true, message: "Please input your manager name!" },
                ]}
              >
                <Input value={formData.managerName} onChange={handleChange} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: "Please input your email!" }]}
              >
                <Input value={formData.email} onChange={handleChange} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Phone Number"
                name="phoneNumber"
                rules={[{ required: true, message: "Please input your phone number!" }]}
              >
                <Input value={formData.phoneNumber} onChange={handleChange} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Hotel City"
            name="hotelCity"
            rules={[{ required: true, message: "Please input your hotel city!" }]}
          >
            <Input value={formData.hotelCity} onChange={handleChange} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-button-inventory">
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
