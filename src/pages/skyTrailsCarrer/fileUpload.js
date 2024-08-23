import React, { useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Flex, message, Upload } from "antd";
import { apiURL } from "../../Constants/constant";

const beforeUpload = (file) => {
  const isJpgOrPdf =
    file.type === "image/jpeg" || file.type === "application/pdf";
  if (!isJpgOrPdf) {
    message.error("You can only upload JPG/PDF file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("File must be smaller than 2MB!");
  }
  return isJpgOrPdf && isLt2M;
};

const FileUpload = ({
  setFileName,
  fileName,
  fileNameUploaded,
  setFileNameUploaded,
}) => {
  const [loading, setLoading] = useState(false);
  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      setLoading(false);
      setFileName(info.file.response.data.document);
      setFileNameUploaded(info.file.name);
    }
  };

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  return (
    <Flex gap="middle" wrap>
      <Upload
        name="document"
        listType="picture-card"
        maxCount={1}
        className="file-uploader"
        showUploadList={false}
        action={`${apiURL.baseURL}/skyTrails/api/career/uploaddocument`}
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {fileNameUploaded ? (
          <div
            style={{
              width: "100%",
            }}
          >
            {fileNameUploaded}
          </div>
        ) : (
          uploadButton
        )}
      </Upload>
    </Flex>
  );
};

export default FileUpload;
