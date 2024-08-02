// import React, { useState } from "react";
// import { Form, Input, Button, Typography } from "antd";
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
// import "./Login.css";
// import { apiURL } from "../../Constants/constant";

// const { Title } = Typography;

// const Logininventory = () => {
//   const navigate = useNavigate();
//   const [message, setMessage] = useState("");

//   const handleSubmit = async (values) => {
//     console.log("Success:", values);

//     const requestData = {
//       ...values,
//     };

//     try {
//       const response = await fetch(
//         `${apiURL.baseURL}/skyTrails/api/inventory/partnerLogin`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(requestData),
//         }
//       );
//       if (response.ok) {
//         const result = await response.json();
//         setMessage("Login successful");
//         // Assuming you receive a token or some data upon successful login
//         localStorage.setItem("token", result.token); // Example: Save the token to localStorage
//         setTimeout(() => {
//           navigate("/inventoryhotelform"); // Redirect to a dashboard or homepage after a delay
//         }, 2000);
//       } else {
//         setMessage("Failed to login");
//       }
//     } catch (error) {
//       setMessage("An error occurred during login.");
//     }
//   };

//   const onFinishFailed = (errorInfo) => {
//     console.log("Failed:", errorInfo);
//   };

//   return (
//     <div className="login-container">
//       <div className="login-form-wrapper">
//         <Title level={2} className="login-heading">
//           Inventory Login
//         </Title>
//         <Form
//           name="basic"
//           layout="vertical"
//           initialValues={{ remember: true }}
//           onFinish={handleSubmit}
//           onFinishFailed={onFinishFailed}
//           autoComplete="off"
//         >
//           <Form.Item
//             label="Email"
//             name="email"
//             rules={[{ required: true, message: "Please input your email!" }]}
//           >
//             <Input />
//           </Form.Item>

//           <Form.Item
//             label="Password"
//             name="password"
//             rules={[{ required: true, message: "Please input your password!" }]}
//           >
//             <Input.Password />
//           </Form.Item>

//           <Form.Item>
//             <Button type="primary" htmlType="submit" className="login-button">
//               Submit
//             </Button>
//           </Form.Item>
//         </Form>
//         <div className="register-link">
//           <p>
//             Don't have an account? <Link to="/inventoryRegister">Register</Link>
//           </p>
//         </div>
//         {message && <p>{message}</p>}
//       </div>
//     </div>
//   );
// };

// export default Logininventory;

import React, { useState } from "react";
import { Form, Input, Button, Typography, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Login.css";
import { apiURL } from "../../Constants/constant";
import { useDispatch, useSelector } from "react-redux";

const { Title } = Typography;

const Logininventory = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [email, setEmail] = useState("");
  const reducerState = useSelector((state) => state);
  const dispatch = useDispatch();
   console.log(reducerState,"inventorystatessssssss")
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
      if (response.ok) {
        const result = await response.json();
        setMessage("Login successful");
        const token = result.result.token;

        // Store the token in local storage
        localStorage.setItem("token", token);
        const managerName = result.result.managerName;
        console.log(managerName, "managernamessssss");
        setTimeout(() => {
          navigate("/inventoryDashboard"); // Redirect to a dashboard or homepage after a delay
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
      if (response.ok) {
        setMessage("Password reset link sent to your email");
        setIsModalVisible(false);
      } else {
        setMessage("Failed to send reset link");
      }
    } catch (error) {
      setMessage("An error occurred during password reset.");
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
        {message && <p>{message}</p>}
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
