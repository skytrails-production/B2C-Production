// import React, { useState } from "react";
// import { Form, Input, Button, Typography } from "antd";
// import { useNavigate, useParams } from "react-router-dom";
// import "./forgetPassword.css";
// import { apiURL } from "../../Constants/constant";
// import {useLocation } from "react-router-dom";

// const { Title } = Typography;

// const InventoryForgetPassword = () => {
//     const location = useLocation();
//   const navigate = useNavigate();
//   const [message, setMessage] = useState("");
//   const { email } = useParams();
//   const queryParams = new URLSearchParams(location.search);
//   const token = queryParams.get("token");

//   const handleSubmit = async (values) => {
//     console.log("Success:", values);

//     const requestData = {
//       email,
//       ...values,
//     };

//     try {
//       const response = await fetch(
//         `${apiURL.baseURL}/skyTrails/api/inventory/partnerresetPassword`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             token: token,
//           },
//           body: JSON.stringify(requestData),
//         }
//       );
//       if (response.ok) {
//         setMessage("Password reset successful");
//         setTimeout(() => {
//           navigate("/inventoryLogin");
//         }, 2000);
//       } else {
//         setMessage("Failed to reset password");
//       }
//     } catch (error) {
//       setMessage("An error occurred during password reset.");
//     }
//   };

//   const onFinishFailed = (errorInfo) => {
//     console.log("Failed:", errorInfo);
//   };

//   return (
//     <div className="forget-password-container">
//       <div className="forget-password-form-wrapper">
//         <Title level={2} className="forget-password-heading">
//           Reset Password
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
//             label="New Password"
//             name="password"
//             rules={[
//               { required: true, message: "Please input your new password!" },
//             ]}
//           >
//             <Input.Password />
//           </Form.Item>

//           <Form.Item
//             label="Confirm Password"
//             name="confirmPassword"
//             rules={[
//               { required: true, message: "Please confirm your new password!" },
//               ({ getFieldValue }) => ({
//                 validator(_, value) {
//                   if (!value || getFieldValue("password") === value) {
//                     return Promise.resolve();
//                   }
//                   return Promise.reject(
//                     new Error("The two passwords do not match!")
//                   );
//                 },
//               }),
//             ]}
//           >
//             <Input.Password />
//           </Form.Item>

//           <Form.Item>
//             <Button
//               type="primary"
//               htmlType="submit"
//               className="forget-password-button"
//             >
//               Reset Password
//             </Button>
//           </Form.Item>
//         </Form>
//         {message && <p>{message}</p>}
//       </div>
//     </div>
//   );
// };

// export default InventoryForgetPassword;
import React, { useState } from "react";
import { Form, Input, Button, Typography } from "antd";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "./forgetPassword.css";
import { apiURL } from "../../Constants/constant";

const { Title } = Typography;

const InventoryForgetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const { email } = useParams();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  const handleSubmit = async (values) => {
    console.log("Success:", values);

    const requestData = {
      password: values.password,
      confrmPassword: values.confrmPassword,
    };

    try {
      const response = await fetch(
        `${apiURL.baseURL}/skyTrails/api/inventory/partnerresetPassword`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
          body: JSON.stringify(requestData),
        }
      );
      if (response.ok) {
        setMessage("Password reset successful");
        setTimeout(() => {
          navigate("/inventoryLogin");
        }, 2000);
      } else {
        setMessage("Failed to reset password");
      }
    } catch (error) {
      setMessage("An error occurred during password reset.");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="forget-password-container">
      <div className="forget-password-form-wrapper">
        <Title level={2} className="forget-password-heading">
          Reset Password
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
            label="New Password"
            name="password"
            rules={[
              { required: true, message: "Please input your new password!" },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confrmPassword"
            rules={[
              { required: true, message: "Please confirm your new password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The two passwords do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="forget-password-button"
            >
              Reset Password
            </Button>
          </Form.Item>
        </Form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default InventoryForgetPassword;
