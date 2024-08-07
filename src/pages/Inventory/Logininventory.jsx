import React, { useState } from "react";
import { Form, Input, Button, Typography, Modal, Alert } from "antd";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Login.css";
import { apiURL } from "../../Constants/constant";
import { useDispatch, useSelector } from "react-redux";

const { Title } = Typography;

const Logininventory = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [email, setEmail] = useState("");
  const reducerState = useSelector((state) => state);
  const dispatch = useDispatch();

  console.log(reducerState, "inventorystatessssssss");

  const handleSubmit = async (values) => {
    console.log("Success:", values);
    const requestData = {
      ...values,
    };

    try {
      const response = await fetch(
        `${apiURL.baseURL}/skyTrails/api/inventory/partnerLogin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );

      const result = await response.json();
      setMessage(
        result.responseMessage || "Incorrect login credential provided"
      );
      setMessageType(response.ok ? "success" : "error");

      if (response.ok) {
        const token = result.result.token;

        // Store the token in local storage
        localStorage.setItem("token", token);
        const managerName = result.result.managerName;
        console.log(managerName, "managernamessssss");

        setTimeout(() => {
          navigate("/inventoryDashboard"); // Redirect to a dashboard or homepage after a delay
        }, 2000);
      }
    } catch (error) {
      setMessage("Incorrect login credential provided");
      setMessageType("error");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleResetPassword = async () => {
    try {
      const response = await fetch(
        `${apiURL.baseURL}/skyTrails/api/inventory/partnerForgetPassword`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );
      const result = await response.json();
      setMessage(
        result.responseMessage || "An error occurred during password reset."
      );
      setMessageType(response.ok ? "success" : "error");

      if (response.ok) {
        setIsModalVisible(false);
      }
    } catch (error) {
      setMessage("An error occurred during password reset.");
      setMessageType("error");
    }
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
          <p>
            Forgot your password?{" "}
            <Button type="link" onClick={showModal}>
              Reset Password
            </Button>
          </p>
        </div>
        {message && (
          <Alert
            message={message}
            type={messageType}
            showIcon
            style={{ marginTop: 20 }}
          />
        )}
      </div>

      <Modal
        title="Reset Password"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleResetPassword}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Logininventory;
