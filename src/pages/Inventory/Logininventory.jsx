import React, { useState } from "react";
import { Form, Input, Button, Typography, Modal, Alert, Spin } from "antd";
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
  const [loading, setLoading] = useState(false);
  const reducerState = useSelector((state) => state);
  const dispatch = useDispatch();

  console.log(reducerState, "inventorystatessssssss");

  const handleSubmit = async (values) => {
    setLoading(true);
    console.log("Success:", values);
    const requestData = { ...values };

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
        localStorage.setItem("token", token);
        setTimeout(() => {
          navigate("/inventoryDashboard");
        }, 2000);
      }
    } catch (error) {
      setMessage("Incorrect login credential provided");
      setMessageType("error");
    } finally {
      setLoading(false);
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
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container-inventory">
      <div className="login-form-wrapper">
        <h3 level={2} className="login-heading-inventory">
          Inventory Login
        </h3>
        {loading && (
          <Spin
            size="large"
            style={{ margin: "20px auto", display: "block" }}
          />
        )}
        <Form
          name="basic"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={handleSubmit}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          className="custom-form"
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
            <Button
              
              htmlType="submit"
              className="login-button-inventory"
              loading={loading} // Button loading spinner
              disabled={loading} // Disable button during loading
            >
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
            <Button
              type="primary"
              htmlType="submit"
              loading={loading} // Button loading spinner
              disabled={loading} // Disable button during loading
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Logininventory;
