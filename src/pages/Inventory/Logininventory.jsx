import React, { useState } from "react";
import { Form, Input, Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Login.css";
import { apiURL } from "../../Constants/constant";

const { Title } = Typography;

const Logininventory = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleSubmit = async (values) => {
    console.log("Success:", values);

    const requestData = {
      ...values,
    };

    try {
      const response = await fetch(
        `${apiURL.baseURL}/skytrails/login/inventory/api`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );
      if (response.ok) {
        const result = await response.json();
        setMessage("Login successful");
        // Assuming you receive a token or some data upon successful login
        localStorage.setItem("token", result.token); // Example: Save the token to localStorage
        setTimeout(() => {
          navigate("/inventoryhotelform"); // Redirect to a dashboard or homepage after a delay
        }, 2000);
      } else {
        setMessage("Failed to login");
      }
    } catch (error) {
      setMessage("An error occurred during login.");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="login-container">
      <div className="login-form-wrapper">
        <Title level={2} className="login-heading">
          Inventory Login
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
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-button">
              Submit
            </Button>
          </Form.Item>
        </Form>
        <div className="register-link">
          <p>
            Don't have an account? <Link to="/inventoryRegister">Register</Link>
          </p>
        </div>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default Logininventory;
