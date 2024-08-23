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
import { FormModal } from "./FormModal";
const contentStyle = {
  padding: 50,
  background: "rgba(0, 0, 0, 0.05)",
  borderRadius: 4,
};
const content = <div style={contentStyle} />;

export const JobDescription = () => {
  const { keyword } = useParams();
  const [description, setDescription] = useState(null);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [summary, setSummary] = useState("");
  const [contactNum, setContactNum] = useState("");
  const [exp, setExp] = useState(0);
  const [fileName, setFileName] = useState("");
  console.log(firstName, "firstName,", fileName);
  useEffect(() => {
    const fetchSingleJobDescription = async () => {
      try {
        const response = await fetch(
          `${apiURL.baseURL}/skyTrails/api/career/getopening?id=${keyword}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setDescription(data?.result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoader(false);
      }
    };

    fetchSingleJobDescription();
  }, [keyword]);
  console.log(description, "description");

  const showModal = () => {
    setIsModalOpen(true);
  };


  return (
    <div>
      {description && !loader ? (
        <div>
          <h1>{description.designation}</h1>
          <p>{description.jobDescription}</p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button type="primary" onClick={showModal}>
              Apply here
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <Spin tip="Loading Description" size="large">
            {content}
          </Spin>
        </div>
      )}
      <FormModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        description={description}
      />
    </div>
  );
};
