import React, { useState, useEffect } from "react";
import { Spin, Alert, List, Card, Button } from "antd";
import { apiURL } from "../../Constants/constant";
import { Link } from "react-router-dom";
import { FormModal } from "./FormModal";
import "./career.css";
import Container from "@mui/material/Container";

const contentStyle = {
  padding: 50,
  background: "rgba(0, 0, 0, 0.05)",
  borderRadius: 4,
};

const content = <div style={contentStyle} />;

export const Career = () => {
  const [loader, setLoader] = useState(true);
  const [jobResult, setJobResult] = useState(null);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [description, setDescription] = useState(null);

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
          {jobResult.map((item, index) => {
            return (
              // <Card
              //   style={{
              //     marginTop: 16,
              //   }}
              //   type="inner"
              //   title={`${item.designation}(${item.expirience})`}
              //   extra={
              //     <Link to={`/skytrailsCarrer/jobDesription/${item._id}`}>
              //       More
              //     </Link>
              //   }
              //   key={index}
              // >
              //   <div>
              //     <h6>Desired Description:</h6>
              //     <p>{item.desiredProfile}</p>
              //   </div>
              //   <div style={{ marginTop: "20px" }}>
              //     <h6>Job Description:</h6>
              //     <p>{item.description}</p>
              //   </div>
              //   <div style={{ marginTop: "20px" }}>
              //     <h6>Skills Required:</h6>
              //     {item.skills.map((innerItem, innerIndex, array) => {
              //       return (
              //         <>
              //           <span>{innerItem.value}</span>
              //           {innerIndex == array.length - 1 ? "." : ","}
              //         </>
              //       );
              //     })}
              //   </div>
              //   <div style={{ marginTop: "20px" }}>
              //     <h6 style={{ display: "inline-block" }}>Job type:</h6>
              //     <span>{item.locationType}</span>
              //   </div>

              //   <div style={{ display: "flex", justifyContent: "center" }}>
              //     <Button
              //       type="primary"
              //       onClick={() => {
              //         setIsModalOpen((prev) => !prev);
              //         setDescription(item);
              //       }}
              //     >
              //       Apply here
              //     </Button>
              //   </div>
              // </Card>

              <div className="container mt-4">
                <div className="row g-4">
                  <div className="col-lg-4">
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
                            <h6>5 july 2024 </h6>
                          </div>
                        </div>
                        <div className="careerExp">
                          <p>Exp: 1-2 Years</p>
                        </div>
                      </div>
                      <div className="JobTitleCareer">
                        <h2>Frontend Developer</h2>
                      </div>
                      <div className="industryCareer">
                        <b>Industry :</b>
                        <p>IT</p>
                      </div>
                      <div className="jobTypeCareer">
                        <p>Full Time</p>
                        <p>Hybrid</p>
                      </div>
                      <div className="skillCareer">
                        <p>
                          {" "}
                          <b>Skills :</b>
                          <span>HTML</span>
                          <span>CSS</span>
                        </p>
                      </div>

                      <div className="jobLocCareer">
                        {" "}
                        <b>Job Location :</b>
                        <p>Punjab, Mohali</p>
                      </div>

                      <div className="DescCareer">
                        {" "}
                        <b>Job Description :</b>
                        <p>
                          A Front-End Developer is someone who creates websites
                          and web applications. The difference between Front-End
                          and Back-End is that Front-End refers to how a web
                          page looks
                        </p>
                      </div>

                      <div
                        style={{ display: "flex", justifyContent: "center" }}
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
                  <div className="col-lg-4">
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
                            <h6>5 july 2024 </h6>
                          </div>
                        </div>
                        <div className="careerExp">
                          <p>Exp: 1-2 Years</p>
                        </div>
                      </div>
                      <div className="JobTitleCareer">
                        <h2>Frontend Developer</h2>
                      </div>
                      <div className="industryCareer">
                        <b>Industry :</b>
                        <p>IT</p>
                      </div>
                      <div className="jobTypeCareer">
                        <p>Full Time</p>
                        <p>Hybrid</p>
                      </div>
                      <div className="skillCareer">
                        <p>
                          {" "}
                          <b>Skills :</b>
                          <span>HTML</span>
                          <span>CSS</span>
                        </p>
                      </div>

                      <div className="jobLocCareer">
                        {" "}
                        <b>Job Location :</b>
                        <p>Punjab, Mohali</p>
                      </div>

                      <div className="DescCareer">
                        {" "}
                        <b>Job Description :</b>
                        <p>
                          A Front-End Developer is someone who creates websites
                          and web applications. The difference between Front-End
                          and Back-End is that Front-End refers to how a web
                          page looks
                        </p>
                      </div>

                      <div
                        style={{ display: "flex", justifyContent: "center" }}
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
                  <div className="col-lg-4">
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
                            <h6>5 july 2024 </h6>
                          </div>
                        </div>
                        <div className="careerExp">
                          <p>Exp: 1-2 Years</p>
                        </div>
                      </div>
                      <div className="JobTitleCareer">
                        <h2>Frontend Developer</h2>
                      </div>
                      <div className="industryCareer">
                        <b>Industry :</b>
                        <p>IT</p>
                      </div>
                      <div className="jobTypeCareer">
                        <p>Full Time</p>
                        <p>Hybrid</p>
                      </div>
                      <div className="skillCareer">
                        <p>
                          {" "}
                          <b>Skills :</b>
                          <span>HTML</span>
                          <span>CSS</span>
                        </p>
                      </div>

                      <div className="jobLocCareer">
                        {" "}
                        <b>Job Location :</b>
                        <p>Punjab, Mohali</p>
                      </div>

                      <div className="DescCareer">
                        {" "}
                        <b>Job Description :</b>
                        <p>
                          A Front-End Developer is someone who creates websites
                          and web applications. The difference between Front-End
                          and Back-End is that Front-End refers to how a web
                          page looks
                        </p>
                      </div>

                      <div
                        style={{ display: "flex", justifyContent: "center" }}
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
                </div>
              </div>
            );
          })}
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
