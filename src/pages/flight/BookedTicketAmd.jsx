import React, { useEffect, useState } from "react";
import InsideNavbar from "../../UI/BigNavbar/InsideNavbar";
import logo from "../../images/red-logo.png";
import { useDispatch, useSelector } from "react-redux";
import { apiURL } from "../../Constants/constant";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import moment from "moment";
// import xml2js from "xml2js";

import "./bookedTicket.css";
import { datasaveTodb } from "../../utility/dataSave";
import { Modal } from "antd";
import ReviewForm from "../../components/TailwindSearchComp/reviews/ReviewForm";
const BookedTicket = () => {
  // console.log("AMDDDDDDDD");
  const reducerState = useSelector((state) => state);
  // console.log(reducerState,"reducer state")
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);
  const {
    PNR,
    datavalue,
    sesstioResultIndex,
    finalAmount,
    discountvalue,
    arrTimeISO1,
    depTimeISO1,
    ResultIndex,
    jsonData,
  } = location.state || {};

  const jsonSavePnrData = datavalue;

  // console.log(jsonSavePnrData,"jsonSavePnrDatajbjkhhhhhhhh")

  const navigate = useNavigate();
  // console.log(datavalue, "datavalue");

  // console.log(reducerState?.searchFlight?.flightDetails?.parsedDate)

  useEffect(() => {
    const apiCalled = sessionStorage.getItem("apiCalled");

    if (!apiCalled) {
      datasaveTodb({
        sesstioResultIndex,
        finalAmount,
        arrTimeISO1,
        depTimeISO1,
        reducerState,
        jsonSavePnrData,
        ResultIndex,
        jsonData,
      });
      sessionStorage.setItem("apiCalled", "true");
    }
  }, []);

  const [airports, setAireport] = useState(
    reducerState?.flightList?.aireportList
  );
  const [airlines, setAirlines] = useState(
    reducerState?.flightList?.flightDetails
  );
  function findAirportByCode(code) {
    const data = airports?.find((airport) => airport?.AirportCode === code);

    return data;
  }

  function findAirlineByCode(code) {
    const data = airlines?.find((airline) => airline?.airlineCode === code);

    return data?.airlineName;
  }

  let depTimeString = String(
    datavalue?.originDestinationDetails?.itineraryInfo?.travelProduct?.product
      ?.depTime
  );
  let depDateString = String(
    datavalue?.originDestinationDetails?.itineraryInfo?.travelProduct?.product
      ?.depDate
  );
  let arrTimeString1 = String(
    datavalue?.originDestinationDetails?.itineraryInfo?.travelProduct?.product
      ?.arrTime
  );
  let arrDateString = String(
    datavalue?.originDestinationDetails?.itineraryInfo?.travelProduct?.product
      ?.arrDate
  );
  if (arrTimeString1 && arrTimeString1.length === 2) {
    arrTimeString1 = "00" + arrTimeString1;
  }
  if (arrTimeString1 && arrTimeString1.length === 3) {
    arrTimeString1 = "0" + arrTimeString1;
  }
  if (depTimeString && depTimeString.length === 2) {
    depTimeString = "00" + depTimeString;
  }
  if (depTimeString && depTimeString.length === 3) {
    depTimeString = "0" + depTimeString;
  }
  if (depDateString && depDateString.length === 5) {
    depDateString = "0" + depDateString;
  }
  if (depDateString && depDateString.length === 4) {
    depDateString = "00" + depDateString;
  }
  if (arrDateString && arrDateString.length === 5) {
    arrDateString = "0" + arrDateString;
  }
  if (arrDateString && arrDateString.length === 4) {
    arrDateString = "00" + arrDateString;
  }

  const arrivalMoment = moment(
    `${arrDateString} ${arrTimeString1}`,
    "DDMMYYYY HHmm"
  );
  const departureMoment = moment(
    `${depDateString} ${depTimeString}`,
    "DDMMYYYY HHmm"
  );
  const depDate = departureMoment.format("DD-MM-YYYY");
  const depTime = departureMoment.format("HH:mm");
  const arrDate = arrivalMoment.format("DD-MM-YYYY");
  const arrTime = arrivalMoment.format("HH:mm");

  // console.log(jsonSavePnrData?.pnrHeader?.reservationInfo?.reservation?.controlNumber)

  const times = datavalue?.originDestinationDetails?.itineraryInfo
    ?.elementManagementItinerary
    ? ""
    : datavalue?.originDestinationDetails?.itineraryInfo.map(
        (itinerary, index) => {
          let depTime = String(itinerary?.travelProduct?.product?.depTime);
          let depDate = String(itinerary?.travelProduct?.product?.depDate);
          let arrTime = String(itinerary?.travelProduct?.product?.arrTime);
          let arrDate = String(itinerary?.travelProduct?.product?.arrDate);
          // console.log(itinerary,"itineraryitineraryitinerary")

          // Ensure depTime and arrTime are properly formatted
          if (depTime && depTime.length === 2) {
            depTime = "00" + depTime;
          }
          if (arrTime && arrTime.length === 2) {
            arrTime = "00" + arrTime;
          }
          if (depTime && depTime.length === 3) {
            depTime = "0" + depTime;
          }
          if (arrTime && arrTime.length === 3) {
            arrTime = "0" + arrTime;
          }
          if (depDate && depDate.length === 5) {
            depDate = "0" + depDate;
          }
          if (depDate && depDate.length === 4) {
            depDate = "00" + depDate;
          }
          if (arrDate && arrDate.length === 4) {
            arrDate = "00" + arrDate;
          }
          if (arrDate && arrDate.length === 5) {
            arrDate = "0" + arrDate;
          }

          // console.log(itinerary,"itineraryitineraryitinerary",depTime,arrTime)

          // Parse depDate and depTime into ISO format for departure
          const depDateTimeString = `${depDate}${depTime}`;
          const departureMoment = moment(depDateTimeString, "YYMMDDHHmm");
          const depTimeISO = departureMoment.isValid()
            ? departureMoment.toISOString()
            : null;

          const arrDateTimeString = `${arrDate}${arrTime}`;
          const arrivalMoment = moment(arrDateTimeString, "YYMMDDHHmm");
          const arrTimeISO = arrivalMoment.isValid()
            ? arrivalMoment.toISOString()
            : null;

          return {
            depTime: depTimeISO,
            depDate,
            arrTime: arrTimeISO,
            arrDate,
          };
        }
      );

  const PNRvalue =
    jsonSavePnrData?.pnrHeader?.reservationInfo?.reservation?.controlNumber;
  // const PNRvalue = undefined;

  useEffect(() => {
    if (PNRvalue) {
    } else {
      Swal.fire({
        icon: "error",
        title: "Booking failed",
        text: "Booking failed, your amount will be refunded within 72 hours.",
      });
      // .then(() => {
      // navigate("/");
      //abhi k liye
      // });
    }
  }, [PNRvalue, navigate]);
  const destination = findAirportByCode(
    jsonSavePnrData?.originDestinationDetails?.itineraryInfo?.travelProduct
      ?.offpointDetail?.cityCode
  )?.name;
  console.log(
    destination,
    jsonSavePnrData?.originDestinationDetails?.itineraryInfo?.travelProduct
      ?.offpointDetail?.cityCode,
    "distination"
  );
  const handleCancel = () => {
    setIsOpen(false);
  };

  return PNRvalue ? (
    <div>
      <div
        className="tempBox"
        style={{ marginTop: "80px", marginBottom: "80px" }}
      >
        <div className="container">
          <h2 style={{ textAlign: "center" }}>Thank You for Booking With Us</h2>
          <p
            style={{ textAlign: "center", color: "#d90429", fontWeight: "700" }}
          >
            Check Your Booking details
          </p>
          <h2 style={{ textAlign: "center" }}>Your PNR is {PNR}</h2>

          <div className="ticketdetails col-lg-12">
            <div
              style={{ borderBottom: "1px solid rgba(128, 128, 128, 0.897)" }}
            >
              <div style={{ padding: "40px" }}>
                <div className="ticket-details-destination">
                  <div>
                    <p className="tickettex">
                      {reducerState?.searchFlight?.flightDetails?.from?.name}
                    </p>
                  </div>
                  <span className="tickettex">-</span>
                  <div>
                    <p className="tickettex">
                      {reducerState?.searchFlight?.flightDetails?.to?.name}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {datavalue?.originDestinationDetails?.itineraryInfo
              ?.elementManagementItinerary ? (
              <>
                <div style={{ padding: "40px" }} className="row">
                  <div
                    className="col-lg-3"
                    style={{
                      borderRight: "1px solid rgba(128, 128, 128, 0.897)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                      }}
                    >
                      <img
                        src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/${datavalue?.originDestinationDetails?.itineraryInfo?.travelProduct?.companyDetail?.identification}.png`}
                        style={{
                          height: "50px",
                          width: "50px",
                          borderRadius: "5px",
                        }}
                        alt="Airline Logo"
                      />
                      <p>
                        {
                          datavalue?.originDestinationDetails?.itineraryInfo
                            ?.travelProduct?.companyDetail?.identification
                        }
                      </p>
                    </div>
                    <div
                      style={{
                        border: "1px solid #F7E3FF",
                        display: "flex",
                        flexDirection: "row",
                        gap: "12px",
                      }}
                    >
                      <p
                        style={{
                          borderRight: "1px solid #F7E3FF",
                          padding: "5px",
                          background: "#F7E3FF",
                        }}
                      >
                        PNR
                      </p>
                      <p style={{ padding: "5px" }}>{PNR}</p>
                    </div>
                  </div>

                  {/* Departure and Arrival Information */}
                  <div className="col-lg-9" style={{ padding: "8px" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <div>
                        <div
                          style={{
                            borderBottom:
                              "1px solid rgba(128, 128, 128, 0.897)",
                          }}
                        >
                          <p className="tickettexvalue">
                            {
                              reducerState?.searchFlight?.flightDetails?.from
                                ?.name
                            }
                          </p>
                          <p className="tickettexvalue">{depTime}</p>
                          <p className="tickettex1">{depDate}</p>
                        </div>
                        <div>
                          <p className="tickettex1">
                            {
                              findAirportByCode(
                                datavalue?.originDestinationDetails
                                  ?.itineraryInfo?.travelProduct
                                  ?.boardpointDetail?.cityCode
                              )?.code
                            }
                          </p>
                        </div>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <i className="fa-solid fa-jet-fighter"></i>
                      </div>

                      <div>
                        <div
                          style={{
                            borderBottom:
                              "1px solid rgba(128, 128, 128, 0.897)",
                          }}
                        >
                          <p className="tickettexvalue">
                            {
                              reducerState?.searchFlight?.flightDetails?.to
                                ?.name
                            }
                          </p>
                          <p className="tickettexvalue">{arrTime}</p>
                          <p className="tickettex1">{arrDate}</p>
                        </div>
                        <div>
                          <p className="tickettex1">
                            {
                              findAirportByCode(
                                datavalue?.originDestinationDetails
                                  ?.itineraryInfo?.travelProduct?.offpointDetail
                                  ?.cityCode
                              )?.code
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Passenger Information */}
              </>
            ) : (
              datavalue?.originDestinationDetails?.itineraryInfo?.map(
                (stopss, index) => {
                  const depTimeISO = times[index]?.depTime;
                  const arrTimeISO = times[index]?.arrTime;
                  const departureMoment = moment(depTimeISO);
                  const arrivalMoment = moment(arrTimeISO);

                  const depDate = departureMoment.format("DD-MM-YYYY");
                  const depTime = departureMoment.format("HH:mm");
                  const arrDate = arrivalMoment.format("DD-MM-YYYY");
                  const arrTime = arrivalMoment.format("HH:mm");
                  return (
                    <div
                      key={index}
                      style={{
                        padding: "40px",
                        borderBottom: "1px solid rgba(128, 128, 128, 0.897)",
                      }}
                    >
                      <div className="row">
                        <div
                          className="col-lg-3"
                          style={{
                            borderRight: "1px solid rgba(128, 128, 128, 0.897)",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "12px",
                            }}
                          >
                            <img
                              src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/${stopss?.travelProduct?.companyDetail?.identification}.png`}
                              style={{
                                height: "50px",
                                width: "50px",
                                borderRadius: "5px",
                              }}
                              alt="Airline Logo"
                            />
                            <p>
                              {
                                stopss?.travelProduct?.companyDetail
                                  ?.identification
                              }
                            </p>
                          </div>
                          <div
                            style={{
                              border: "1px solid #F7E3FF",
                              display: "flex",
                              flexDirection: "row",
                              gap: "12px",
                            }}
                          >
                            <p
                              style={{
                                borderRight: "1px solid #F7E3FF",
                                padding: "5px",
                                background: "#F7E3FF",
                              }}
                            >
                              PNR
                            </p>
                            <p style={{ padding: "5px" }}>{PNR}</p>
                          </div>
                        </div>
                        <div className="col-lg-9">
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-evenly",
                            }}
                          >
                            <div>
                              <p className="tickettexvalue">
                                {
                                  stopss?.travelProduct?.boardpointDetail
                                    ?.cityCode
                                }
                              </p>
                              <p className="tickettexvalue">{depTime}</p>
                              <p className="tickettex1">{depDate}</p>
                              <p className="tickettex1">
                                {
                                  findAirportByCode(
                                    stopss?.travelProduct?.boardpointDetail
                                      ?.cityCode
                                  )?.code
                                }
                              </p>
                            </div>
                            {/* <div> <p>{findAirportByCode(stopss?.travelProduct?.boardpointDetail?.cityCode)?.code}</p></div> */}
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <i className="fa-solid fa-jet-fighter"></i>
                            </div>
                            <div>
                              <p className="tickettexvalue">
                                {
                                  stopss?.travelProduct?.offpointDetail
                                    ?.cityCode
                                }
                              </p>
                              <p className="tickettexvalue">{arrTime}</p>
                              <p className="tickettex1">{arrDate}</p>
                              <p className="tickettex1">
                                {
                                  findAirportByCode(
                                    stopss?.travelProduct?.offpointDetail
                                      ?.cityCode
                                  )?.code
                                }
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
              )
            )}

            <div
              style={{
                borderTop: "1px solid rgba(128, 128, 128, 0.897)",
                background: "#F1F1F1",
              }}
            >
              <div>
                {reducerState?.passengers?.passengersData?.length > 0 ? (
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr>
                        <th
                          style={{ border: "1px solid #ddd", padding: "8px" }}
                        >
                          TRAVELLER
                        </th>
                        <th
                          style={{ border: "1px solid #ddd", padding: "8px" }}
                        >
                          Baggage
                        </th>
                        <th
                          style={{ border: "1px solid #ddd", padding: "8px" }}
                        >
                          PNR NO.
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {reducerState?.passengers?.passengersData?.map(
                        (item, index) => {
                          const passenger = {
                            ...item,
                            gender: item?.title === "Miss" ? "Female" : "Male",
                          };
                          return (
                            <tr key={index}>
                              <td
                                style={{
                                  border: "1px solid #ddd",
                                  padding: "8px",
                                }}
                              >
                                {passenger.title} {passenger.firstName}{" "}
                                {passenger.lastName}
                              </td>
                              <td
                                style={{
                                  border: "1px solid #ddd",
                                  padding: "8px",
                                }}
                              >
                                {" "}
                                {sesstioResultIndex?.baggage
                                  ?.freeBagAllownceInfo?.baggageDetails
                                  ?.quantityCode === "N"
                                  ? sesstioResultIndex?.baggage
                                      ?.freeBagAllownceInfo?.baggageDetails
                                      ?.freeAllowance * 23
                                  : Number(
                                      sesstioResultIndex?.baggage
                                        ?.freeBagAllownceInfo?.baggageDetails
                                        ?.freeAllowance
                                    ) === 0
                                  ? "No baggage"
                                  : sesstioResultIndex?.baggage
                                      ?.freeBagAllownceInfo?.baggageDetails
                                      ?.freeAllowance}
                                {sesstioResultIndex?.baggage
                                  ?.freeBagAllownceInfo?.baggageDetails
                                  ?.quantityCode === "N"
                                  ? sesstioResultIndex?.baggage
                                      ?.freeBagAllownceInfo?.baggageDetails
                                      ?.unitQualifier === "K"
                                    ? "KG"
                                    : "LB"
                                  : Number(
                                      sesstioResultIndex?.baggage
                                        ?.freeBagAllownceInfo?.baggageDetails
                                        ?.freeAllowance
                                    ) !== 0 ||
                                    sesstioResultIndex?.baggage
                                      ?.freeBagAllownceInfo?.baggageDetails
                                      ?.freeAllowance !== "0"
                                  ? "KG"
                                  : ""}
                              </td>
                              <td
                                style={{
                                  border: "1px solid #ddd",
                                  padding: "8px",
                                }}
                              >
                                {PNR}
                              </td>
                            </tr>
                          );
                        }
                      )}
                    </tbody>
                  </table>
                ) : (
                  <p>No passenger details available.</p>
                )}
              </div>
            </div>
          </div>

          <div className="ticketdetails">
            <div style={{ padding: "12px" }}>
              <p>
                You have paid{" "}
                <span style={{ fontWeight: "bold" }}>
                  {Number(finalAmount).toFixed(2)}
                </span>
                {discountvalue > 0 && (
                  <>
                    {" "}
                    You saved{" "}
                    <span style={{ fontWeight: "bold" }}>
                      {Number(discountvalue).toFixed(2)}
                    </span>
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
        <button
          style={{ marginTop: "12px" }}
          onClick={() => {
            // navigate("/"); abhi k liye
            sessionStorage.removeItem("apiCalled");
          }}
        >
          Ok
        </button>
      </div>
      <Modal
        centered
        maskClosable={false}
        width={500}
        open={isOpen}
        onCancel={handleCancel}
        footer={null}
        className="authenticModal"
      >
        <ReviewForm
          destination={destination}
          section={"FLIGHT"}
          onCancel={handleCancel}
        />
      </Modal>
    </div>
  ) : (
    <div>
      {/* <Modal
        centered
        maskClosable={false}
        width={500}
        open={isOpen}
        onCancel={handleCancel}
      
        footer={null}
        className="authenticModal"
      >
        <ReviewForm destination={destination || "Delhi"} section={"FLIGHT"} />
      </Modal>
      <p>gsdfgasfdg</p> */}
    </div>
  );
};

export default BookedTicket;
