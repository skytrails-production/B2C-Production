import React, { useState, useEffect } from "react";
import { Spin, Alert, Button } from "antd";
import { apiURL } from "../../Constants/constant";
// import { Link } from "react-router-dom";
import { FormModal } from "./FormModal";
import "./career.css";
// import Container from "@mui/material/Container";
import dayjs from "dayjs";

const contentStyle = {
  padding: 50,
  background: "rgba(0, 0, 0, 0.05)",
  borderRadius: 4,
};

const content = <div style={contentStyle} />;

const Career = () => {
  const [loader, setLoader] = useState(true);
  const [jobResult, setJobResult] = useState(null);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [description, setDescription] = useState(null);
  const [expandedIndex, setExpandedIndex] = useState(null); // State to manage which job description is expanded

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(
          `${apiURL.baseURL}/skyTrails/api/career/getallopening`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        setJobResult(data.result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoader(false);
      }
    };

    fetchJobs();
  }, []);

  const toggleDescription = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div>
      {loader && (
        <Spin tip="Loading Job Opportunities..." size="large">
          {content}
        </Spin>
      )}
      {!loader && error && (
        <Alert
          message="Error"
          description={error}
          type="error"
          showIcon
          style={{ margin: 20 }}
        />
      )}
      {!loader && jobResult && (
        <div>
          <div className="container mt-4">
            <div className="row g-4">
              {jobResult.map((item, index) => {
                const isExpanded = expandedIndex === index;
                const jobDescription = item?.jobDescription || "";
                const shortenedDescription = jobDescription.slice(0, 100); // Adjust number of characters as needed

                return (
                  <div className="col-lg-4" key={index}>
                    <div className="careerMainCard">
                      <div className="careerHeader">
                        <div className="careerHeaderInn">
                          <div>
                            <img
                              src="http://localhost:3000/favicon.ico"
                              alt="logo"
                            />
                          </div>

                          <div className="careerComName">
                            <p>The Skytrails</p>
                            <h6>
                              {dayjs(item?.openingAt).format("DD MMM, YYYY")}
                            </h6>
                          </div>
                        </div>
                        <div className="careerExp">
                          <p>Exp: {item?.expirience} Years</p>
                        </div>
                      </div>
                      <div className="JobTitleCareer">
                        <h2>{item?.designation}</h2>
                      </div>
                      <div className="industryCareer">
                        <b>Industry :</b>
                        <p>{item?.preferredIndustry}</p>
                      </div>
                      <div className="jobTypeCareer">
                        <p>{item?.jobType}</p>
                        <p>{item?.locationType}</p>
                      </div>
                      <div className="skillCareer">
                        <p>
                          <b>Skills :</b>
                          {item?.skills?.map((skill, skillIndex) => (
                            <span key={skillIndex}>{skill}</span>
                          ))}
                        </p>
                      </div>

                      <div className="jobLocCareer">
                        <b>Job Location :</b>
                        <p>
                          {item?.city}, {item?.state}
                        </p>
                      </div>

                      <div className="DescCareer">
                        <b>Job Description :</b>
                        <p>
                          {isExpanded ? jobDescription : shortenedDescription}
                        </p>
                        {jobDescription.length > 100 && (
                          <p className="sm"

                            onClick={() => toggleDescription(index)}
                          >
                            {isExpanded ? "Show Less" : "Show More"}
                          </p>
                        )}
                      </div>

                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                        className="careerApplyButton"
                      >
                        <Button
                          type="primary"
                          onClick={() => {
                            setIsModalOpen((prev) => !prev);
                            setDescription(item);
                          }}
                        >
                          Apply here
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <FormModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            description={description}
          />
        </div>
      )}
    </div>
  );
};

export default Career;
