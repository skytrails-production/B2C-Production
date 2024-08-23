import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Spin,
  Alert,
  List,
  Card,
  Button,
  Modal,
  Input,
  InputNumber,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  ContactsOutlined,
} from "@ant-design/icons";
import { apiURL } from "../../Constants/constant";
import TextArea from "antd/es/input/TextArea";
import FileUpload from "./fileUpload";

export const FormModal = ({ isModalOpen, setIsModalOpen, description }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [summary, setSummary] = useState("");
  const [contactNum, setContactNum] = useState("");
  const [exp, setExp] = useState(0);
  const [fileName, setFileName] = useState(null);
  const [fileNameUploaded, setFileNameUploaded] = useState("");
  const handleOk = async () => {
    console.log(description, "param", fileName);
    if (!firstName.trim()) {
      alert("First name is required");
      return;
    }

    if (!lastName.trim()) {
      alert("Last name is required");
      return;
    }

    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      alert("A valid email is required");
      return;
    }

    if (!contactNum.trim() || !/^\d{10}$/.test(contactNum)) {
      alert("A valid 10-digit contact number is required");
      return;
    }

    if (exp <= 0) {
      alert("Experience must be greater than 0");
      return;
    }

    if (!summary.trim()) {
      alert("Summary is required");
      return;
    }

    if (!fileName.trim()) {
      alert("Resume upload is required");
      return;
    }

    const payload = {
      firstName: firstName,
      lastName: lastName,
      userEmail: email,
      userContactNumber: {
        countryCode: "+91",
        number: contactNum,
      },
      jobId: description._id,
      experience: `${exp}years`,
      summary: summary,
      document: fileName,
    };

    try {
      const response = await fetch(
        `${apiURL.baseURL}/skyTrails/api/career/applypost`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Success:", data);
      // Handle success, e.g., show a success message or redirect
    } catch (error) {
      console.error("Error:", error);
      // Handle error, e.g., show an error message
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Modal
        title="Fill form to apply"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        mask={false}
        maskClosable={false}
      >
        <lable>First name:</lable>
        <Input
          size="large"
          value={firstName}
          placeholder="Enter first name.."
          prefix={<UserOutlined />}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <lable>Last name:</lable>
        <Input
          size="large"
          placeholder="Enter last name.."
          value={lastName}
          prefix={<UserOutlined />}
          onChange={(e) => setLastName(e.target.value)}
        />
        <lable>Email:</lable>
        <Input
          size="large"
          placeholder="Enter Email"
          type="email"
          value={email}
          prefix={<MailOutlined />}
          onChange={(e) => setEmail(e.target.value)}
        />
        <lable>Contact Num:</lable>
        <Input
          size="large"
          placeholder="Enter number"
          value={contactNum}
          prefix={<ContactsOutlined />}
          onChange={(e) => setContactNum(e.target.value)}
        />
        <div style={{ marginTop: "10px" }}>
          <label>Experience:</label>{" "}
          <InputNumber
            min={1}
            max={10}
            placeholder="1"
            value={exp}
            onChange={(value) => setExp(value)}
          />
        </div>
        <label>Summary:</label>
        <TextArea
          showCount
          maxLength={100}
          onChange={(e) => setSummary(e.target.value)}
          value={summary}
          placeholder="write here"
          style={{ height: 120, resize: "none" }}
        />
        <label>Upload Resume:</label>
        <FileUpload
          setFileName={setFileName}
          fileName={fileName}
          fileNameUploaded={fileNameUploaded}
          setFileNameUploaded={setFileNameUploaded}
        />
      </Modal>
    </div>
  );
};
