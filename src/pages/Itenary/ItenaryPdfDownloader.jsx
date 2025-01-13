import React, { useRef, useEffect, useState } from "react";

import { useReactToPrint } from "react-to-print";
import freeBreakfast from "../GRMHotel/SVGs/freeBreakfast.svg";
import hotelNotFound from "../../images/hotelNotFound.jpg";
import starsvg from "../../images/star.svg";
import { Divider } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import { apiURL } from "../../Constants/constant";
import { DownloadOutlined, PrinterOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { Button } from "antd";
import { useSelector } from "react-redux";

const ItenaryPdfDownloader = () => {
  const reducerState = useSelector((state) => state);
  const componentRef = useRef();
  const { id } = useParams();
  const [itineraryData, setItineraryData] = useState(null);
  const initialDate = itineraryData?.ItenaryPayloadData?.leavingDate;
  const [loading, setLoading] = useState(false);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: () => setLoading(false), // Hide loader after printing
  });

  const handleDownload = () => {
    setLoading(true);
    handlePrint();
  };

  useEffect(() => {
    const fetchItineraryData = async () => {
      try {
        const token = "your-token-here"; // Replace with your actual token
        const res = await axios.get(
          `${apiURL.baseURL}/skyTrails/api/itinerary/getProposalById`,
          {
            params: { proposalId: id },
            headers: {
              "Content-Type": "application/json",
              token: token,
            },
          }
        );
        setItineraryData(res?.data?.result);
        console.log(res?.data?.result, "response");
      } catch (error) {
        console.error("Error fetching itinerary data:", error);
      }
    };

    fetchItineraryData();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "p") {
        event.preventDefault();
        handlePrint();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handlePrint]);

  if (!itineraryData) {
    return <div>Loading...</div>;
  }

  let adults = 0;
  let children = 0;
  // let infants = 0;

  itineraryData?.ItenaryPayloadData?.RoomGuests?.forEach((data) => {
    adults += data.NoOfAdults;
    children += data.NoOfChild;
  });

  const getLatestDate = (dates) => {
    return dates.reduce((latest, current) => {
      return dayjs(latest).isAfter(dayjs(current)) ? latest : current;
    });
  };

  // Extracting relevant dates
  const leavingDate = dayjs(initialDate);
  const arrivalDateInternational = dayjs(
    itineraryData?.flightData?.[0]?.flightDetails?.[0]?.Segments?.[0]?.[
      itineraryData?.flightData?.[0]?.flightDetails?.[0]?.Segments?.length - 1
    ]?.Destination?.ArrTime
  );
  const arrivalDateDomesticReturn = dayjs(
    itineraryData?.flightData?.[0]?.flightDetails?.[0]?.Segments?.[0]?.[
      itineraryData?.flightData?.[0]?.flightDetails?.[0]?.Segments?.length - 1
    ]?.Destination?.ArrTime
  );
  const arrivalDateOneway = dayjs(
    itineraryData?.flightData?.[0]?.flightDetails?.[0]?.Segments?.[0]?.[
      itineraryData?.flightData?.[0]?.flightDetails?.[0]?.Segments?.length - 1
    ]?.Destination?.ArrTime
  );
  // Determine the initial date
  // const initialStartDate = getLatestDate([leavingDate, arrivalDate1, arrivalDate2]);
  const initialStartDate = getLatestDate([
    leavingDate,
    arrivalDateInternational,
    arrivalDateDomesticReturn,
    arrivalDateOneway,
  ]);

  const getDateForDay = (startDate, dayIndex) => {
    return dayjs(startDate).add(dayIndex, "days").format("ddd, D MMM, YYYY");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-9 ">
          <div ref={componentRef}>
            <div className="mx-4 my-4">
              <div className="itenaryPdfBoxHeading d-flex flex-row justify-content-between align-items-center ">
                <div>
                  <p className="flightPdfIteneraryPara">
                    Customer Name:{" "}
                    {itineraryData?.ItenaryPayloadData?.clientName}
                  </p>
                  <p className="flightPdfIteneraryPara">
                    Journey Date:{" "}
                    {itineraryData?.ItenaryPayloadData?.leavingDate}
                  </p>
                </div>
                <div>
                  <p className="flightPdfIteneraryPara">
                    leavingFrom:{" "}
                    {itineraryData?.ItenaryPayloadData?.leavingFrom}
                  </p>
                  <p className="flightPdfIteneraryPara">
                    Nationality:{" "}
                    {itineraryData?.ItenaryPayloadData?.nationality === "India"
                      ? "Indian"
                      : itineraryData?.ItenaryPayloadData?.nationality}
                  </p>
                </div>
              </div>
            </div>

            <div className="mx-4">
              {itineraryData?.flightData.length > 0 && (
                <div className="my-4 text-center">
                  <h5>Your Flight Trip Details</h5>
                </div>
              )}
              {itineraryData?.flightData
                ?.sort((a, b) => a.id - b.id)
                .map((flight) => (
                  <div key={flight._id}>
                    {flight.flightDetails.length > 1 && (
                      <div>
                        {flight.id == 0 ? (
                          <p className="flightPdfIteneraryPara">
                            {itineraryData?.ItenaryPayloadData?.leavingFrom} to{" "}
                            {
                              itineraryData?.ItenaryPayloadData
                                ?.cityAndNight?.[0]?.destination
                            }{" "}
                            (Round Trip)
                          </p>
                        ) : (
                          <p className="flightPdfIteneraryPara">
                            {" "}
                            {
                              itineraryData?.ItenaryPayloadData?.cityAndNight[
                                flight.id - 1
                              ].destination
                            }{" "}
                            to{" "}
                            {
                              itineraryData?.ItenaryPayloadData?.cityAndNight?.[
                                flight.id
                              ]?.destination
                            }{" "}
                            (Round Trip)
                          </p>
                        )}

                        {flight.flightDetails.map((detail) => (
                          <div key={detail._id}>
                            <div class="returnFlightResultBox">
                              <div
                                class="returnFlightResultBoxOne"
                                style={{ flex: 10 }}
                              >
                                <div class="returnResultFlightDetailsPDF">
                                  <div>
                                    <img
                                      src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/${detail?.ValidatingAirline}.png`}
                                      alt="flight"
                                    />{" "}
                                  </div>
                                  <span>
                                    {
                                      detail?.Segments[0][0]?.Airline
                                        ?.AirlineName
                                    }
                                  </span>
                                  <p>
                                    {
                                      detail?.Segments[0][0]?.Airline
                                        ?.AirlineCode
                                    }
                                    {
                                      detail?.Segments[0][0]?.Airline
                                        ?.FlightNumber
                                    }
                                  </p>
                                </div>
                                <div class="returnResultOtherDetails">
                                  <div class="returnResultTimingBox">
                                    <span>
                                      {
                                        detail?.Segments[0][0]?.Origin?.Airport
                                          ?.CityName
                                      }
                                    </span>
                                    <p>
                                      {dayjs(
                                        detail?.Segments[0][0]?.Origin?.DepTime
                                      ).format("DD MMM, YY")}
                                    </p>
                                    <h5 class="daySize">
                                      {dayjs(
                                        detail?.Segments[0][0]?.Origin?.DepTime
                                      ).format("h:mm A")}
                                    </h5>
                                  </div>
                                  <div class="returnResultDurationBox">
                                    {detail?.Segments[0].length > 1 ? (
                                      <h4>
                                        {`${Math.floor(
                                          detail?.Segments[0][0]?.Duration / 60
                                        )}hr ${
                                          detail?.Segments[0][0]?.Duration % 60
                                        }min`}{" "}
                                        -{" "}
                                        {`${Math.floor(
                                          detail?.Segments[0][1]?.Duration / 60
                                        )}hr ${
                                          detail?.Segments[0][0]?.Duration % 60
                                        }min`}
                                      </h4>
                                    ) : (
                                      <h4>
                                        {`${Math.floor(
                                          detail?.Segments[0][0]?.Duration / 60
                                        )}hr ${
                                          detail?.Segments[0][0]?.Duration % 60
                                        }min`}
                                      </h4>
                                    )}

                                    {detail?.Segments[0].length > 1 ? (
                                      <div className=" stopBefReturn">
                                        <Divider
                                          orientation="vertical"
                                          flexItem
                                          sx={{
                                            backgroundColor: "#21325d",
                                            marginX: "8px",
                                            height: "3px",
                                          }}
                                          className=""
                                        />
                                      </div>
                                    ) : (
                                      <div className=" stopBefOneStop">
                                        <Divider
                                          orientation="vertical"
                                          flexItem
                                          sx={{
                                            backgroundColor: "#21325d",
                                            marginX: "8px",
                                            height: "3px",
                                          }}
                                        />
                                      </div>
                                    )}
                                    <p>
                                      {detail?.Segments[0].length > 1
                                        ? `${
                                            detail?.Segments[0].length - 1
                                          } stop via ${
                                            detail?.Segments[0][0]?.Destination
                                              ?.Airport?.CityName
                                          }`
                                        : "Non Stop"}
                                    </p>
                                  </div>
                                  <div class="returnResultTimingBox">
                                    <span>
                                      {
                                        detail?.Segments[0][
                                          detail?.Segments[0].length - 1
                                        ]?.Destination?.Airport?.CityName
                                      }
                                    </span>
                                    <p>
                                      {dayjs(
                                        detail?.Segments?.[0][
                                          detail?.Segments[0].length - 1
                                        ]?.Destination?.ArrTime
                                      ).format("DD MMM, YY")}
                                    </p>
                                    <h5 className="daySize">
                                      {dayjs(
                                        detail?.Segments?.[0][
                                          detail?.Segments[0].length - 1
                                        ]?.Destination?.ArrTime
                                      ).format("h:mm A")}
                                    </h5>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {flight.flightDetails.length === 1 && (
                      <>
                        {flight.id == 0 ? (
                          <p className="flightPdfIteneraryPara">
                            {itineraryData?.ItenaryPayloadData?.leavingFrom} to{" "}
                            {
                              itineraryData?.ItenaryPayloadData
                                ?.cityAndNight?.[0]?.destination
                            }
                          </p>
                        ) : (
                          <p className="flightPdfIteneraryPara">
                            {" "}
                            {
                              itineraryData?.ItenaryPayloadData?.cityAndNight[
                                flight.id - 1
                              ].destination
                            }{" "}
                            to{" "}
                            {
                              itineraryData?.ItenaryPayloadData?.cityAndNight?.[
                                flight.id
                              ]?.destination
                            }
                          </p>
                        )}
                        {flight.flightDetails.map((detail) => (
                          <div key={detail._id}>
                            {detail?.Segments.length === 2 && (
                              <div className="pdfFlightReturnBox">
                                <div class="returnFlightResultBoxOne">
                                  <div class="returnResultFlightDetailsPDF">
                                    <div>
                                      <img
                                        src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/${detail?.ValidatingAirline}.png`}
                                        alt="flight"
                                      />{" "}
                                    </div>
                                    <span>
                                      {
                                        detail?.Segments[0][0]?.Airline
                                          ?.AirlineName
                                      }
                                    </span>
                                    <p>
                                      {
                                        detail?.Segments[0][0]?.Airline
                                          ?.AirlineCode
                                      }
                                      {
                                        detail?.Segments[0][0]?.Airline
                                          ?.FlightNumber
                                      }
                                    </p>
                                  </div>
                                  <div class="returnResultOtherDetails">
                                    <div class="returnResultTimingBox">
                                      <span>
                                        {
                                          detail?.Segments[0][0]?.Origin
                                            ?.Airport?.CityName
                                        }
                                      </span>
                                      <p>
                                        {dayjs(
                                          detail?.Segments[0][0]?.Origin
                                            ?.DepTime
                                        ).format("DD MMM, YY")}
                                      </p>
                                      <h5 class="daySize">
                                        {dayjs(
                                          detail?.Segments[0][0]?.Origin
                                            ?.DepTime
                                        ).format("h:mm A")}
                                      </h5>
                                    </div>
                                    <div class="returnResultDurationBox">
                                      {detail?.Segments[0].length > 1 ? (
                                        <h4>
                                          {`${Math.floor(
                                            detail?.Segments[0][0]?.Duration /
                                              60
                                          )}hr ${
                                            detail?.Segments[0][0]?.Duration %
                                            60
                                          }min`}{" "}
                                          -{" "}
                                          {`${Math.floor(
                                            detail?.Segments[0][1]?.Duration /
                                              60
                                          )}hr ${
                                            detail?.Segments[0][0]?.Duration %
                                            60
                                          }min`}
                                        </h4>
                                      ) : (
                                        <h4>
                                          {`${Math.floor(
                                            detail?.Segments[0][0]?.Duration /
                                              60
                                          )}hr ${
                                            detail?.Segments[0][0]?.Duration %
                                            60
                                          }min`}
                                        </h4>
                                      )}

                                      {detail?.Segments[0].length > 1 ? (
                                        <div className=" stopBefReturn">
                                          <Divider
                                            orientation="vertical"
                                            flexItem
                                            sx={{
                                              backgroundColor: "#21325d",
                                              marginX: "8px",
                                              height: "3px",
                                            }}
                                            className=""
                                          />
                                        </div>
                                      ) : (
                                        <div className=" stopBefOneStop">
                                          <Divider
                                            orientation="vertical"
                                            flexItem
                                            sx={{
                                              backgroundColor: "#21325d",
                                              marginX: "8px",
                                              height: "3px",
                                            }}
                                          />
                                        </div>
                                      )}
                                      <p>
                                        {detail?.Segments[0].length > 1
                                          ? `${
                                              detail?.Segments[0].length - 1
                                            } stop via ${
                                              detail?.Segments[0][0]
                                                ?.Destination?.Airport?.CityName
                                            }`
                                          : "Non Stop"}
                                      </p>
                                    </div>
                                    <div class="returnResultTimingBox">
                                      <span>
                                        {
                                          detail?.Segments[0][
                                            detail?.Segments[0].length - 1
                                          ]?.Destination?.Airport?.CityName
                                        }
                                      </span>
                                      <p>
                                        {dayjs(
                                          detail?.Segments?.[0][
                                            detail?.Segments[0].length - 1
                                          ]?.Destination?.ArrTime
                                        ).format("DD MMM, YY")}
                                      </p>
                                      <h5 className="daySize">
                                        {dayjs(
                                          detail?.Segments?.[0][
                                            detail?.Segments[0].length - 1
                                          ]?.Destination?.ArrTime
                                        ).format("h:mm A")}
                                      </h5>
                                    </div>
                                  </div>
                                </div>
                                <div class="returnFlightResultBoxOne">
                                  <div class="returnResultFlightDetailsPDF">
                                    <div>
                                      <img
                                        src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/${detail?.ValidatingAirline}.png`}
                                        alt="flight"
                                      />{" "}
                                    </div>
                                    <span>
                                      {
                                        detail?.Segments[
                                          detail?.Segments?.length - 1
                                        ][0]?.Airline?.AirlineName
                                      }
                                    </span>
                                    <p>
                                      {
                                        detail?.Segments[
                                          detail?.Segments?.length - 1
                                        ][0]?.Airline?.AirlineCode
                                      }
                                      {
                                        detail?.Segments[
                                          detail?.Segments?.length - 1
                                        ][0]?.Airline?.FlightNumber
                                      }
                                    </p>
                                  </div>
                                  <div class="returnResultOtherDetails">
                                    <div class="returnResultTimingBox">
                                      <span>
                                        {
                                          detail?.Segments[
                                            detail?.Segments?.length - 1
                                          ][0]?.Origin?.Airport?.CityName
                                        }
                                      </span>
                                      <p>
                                        {dayjs(
                                          detail?.Segments[
                                            detail?.Segments?.length - 1
                                          ][0]?.Origin?.DepTime
                                        ).format("DD MMM, YY")}
                                      </p>
                                      <h5 className="daySize">
                                        {dayjs(
                                          detail?.Segments[
                                            detail?.Segments?.length - 1
                                          ][0]?.Origin?.DepTime
                                        ).format("h:mm A")}
                                      </h5>
                                    </div>
                                    <div class="returnResultDurationBox">
                                      {detail?.Segments[
                                        detail?.Segments?.length - 1
                                      ].length > 1 ? (
                                        <h4>
                                          {`${Math.floor(
                                            detail?.Segments[
                                              detail?.Segments?.length - 1
                                            ][0]?.Duration / 60
                                          )}hr ${
                                            detail?.Segments[0][0]?.Duration %
                                            60
                                          }min`}{" "}
                                          -{" "}
                                          {`${Math.floor(
                                            detail?.Segments[
                                              detail?.Segments?.length - 1
                                            ][1]?.Duration / 60
                                          )}hr ${
                                            detail?.Segments[0][0]?.Duration %
                                            60
                                          }min`}
                                        </h4>
                                      ) : (
                                        <h4>
                                          {`${Math.floor(
                                            detail?.Segments[
                                              detail?.Segments?.length - 1
                                            ][0]?.Duration / 60
                                          )}hr ${
                                            detail?.Segments[
                                              detail?.Segments?.length - 1
                                            ][0]?.Duration % 60
                                          }min`}
                                        </h4>
                                      )}

                                      {detail?.Segments[
                                        detail?.Segments?.length - 1
                                      ].length > 1 ? (
                                        <div className=" stopBefReturn">
                                          <Divider
                                            orientation="vertical"
                                            flexItem
                                            sx={{
                                              backgroundColor: "#21325d",
                                              marginX: "8px",
                                              height: "3px",
                                            }}
                                            className=""
                                          />
                                        </div>
                                      ) : (
                                        <div className=" stopBefOneStop">
                                          <Divider
                                            orientation="vertical"
                                            flexItem
                                            sx={{
                                              backgroundColor: "#21325d",
                                              marginX: "8px",
                                              height: "3px",
                                            }}
                                          />
                                        </div>
                                      )}
                                      <p>
                                        {detail?.Segments[
                                          detail?.Segments?.length - 1
                                        ].length > 1
                                          ? `${
                                              detail?.Segments[
                                                detail?.Segments?.length - 1
                                              ].length - 1
                                            } stop via ${
                                              detail?.Segments[
                                                detail?.Segments?.length - 1
                                              ][0]?.Destination?.Airport
                                                ?.CityName
                                            }`
                                          : "Non Stop"}
                                      </p>
                                    </div>
                                    <div class="returnResultTimingBox">
                                      <span>
                                        {
                                          detail?.Segments[
                                            detail?.Segments?.length - 1
                                          ][
                                            detail?.Segments[
                                              detail?.Segments?.length - 1
                                            ].length - 1
                                          ]?.Destination?.Airport?.CityName
                                        }
                                      </span>
                                      <p>
                                        {dayjs(
                                          detail?.Segments?.[
                                            detail?.Segments?.length - 1
                                          ][
                                            detail?.Segments[
                                              detail?.Segments?.length - 1
                                            ].length - 1
                                          ]?.Destination?.ArrTime
                                        ).format("DD MMM, YY")}
                                      </p>
                                      <h5 className="daySize">
                                        {dayjs(
                                          detail?.Segments?.[
                                            detail?.Segments?.length - 1
                                          ][
                                            detail?.Segments[
                                              detail?.Segments?.length - 1
                                            ].length - 1
                                          ]?.Destination?.ArrTime
                                        ).format("h:mm A")}
                                      </h5>
                                    </div>
                                  </div>
                                </div>
                                <div className="returnInternationalViewDetails"></div>
                              </div>
                            )}

                            {detail?.Segments.length === 1 && (
                              <div className="mobileflexDesign">
                                <div className="columnFLightName d-flex d-sm-none">
                                  <div>
                                    <img
                                      src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/${detail?.ValidatingAirline}.png`}
                                      alt="flight"
                                    />{" "}
                                  </div>
                                  <span>
                                    {
                                      detail?.Segments[0][0]?.Airline
                                        ?.AirlineName
                                    }
                                  </span>
                                  <p>
                                    {
                                      detail?.Segments?.[0][0]?.Airline
                                        ?.AirlineCode
                                    }
                                    {
                                      detail?.Segments?.[0][0]?.Airline
                                        ?.FlightNumber
                                    }
                                  </p>
                                </div>
                                <div className="singleFlightBox">
                                  <div className="singleFlightBoxOne">
                                    <div>
                                      <img
                                        src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/${detail?.ValidatingAirline}.png`}
                                        alt="flight"
                                      />{" "}
                                    </div>
                                    <span>
                                      {
                                        detail?.Segments[0][0]?.Airline
                                          ?.AirlineName
                                      }
                                    </span>
                                    <p>
                                      {
                                        detail?.Segments[0][0]?.Airline
                                          ?.AirlineCode
                                      }
                                      {
                                        detail?.Segments[0][0]?.Airline
                                          ?.FlightNumber
                                      }
                                    </p>
                                  </div>
                                  <div className="singleFlightBoxTwo">
                                    <span>
                                      {
                                        detail?.Segments[0][0]?.Origin?.Airport
                                          ?.CityName
                                      }
                                    </span>
                                    <p>
                                      {dayjs(
                                        detail?.Segments[0][0]?.Origin?.DepTime
                                      ).format("DD MMM, YY")}
                                    </p>
                                    <h5 className="daySize">
                                      {dayjs(
                                        detail?.Segments[0][0]?.Origin?.DepTime
                                      ).format("h:mm A")}
                                    </h5>
                                  </div>

                                  <div className="singleFlightBoxThree">
                                    {detail?.Segments[0].length > 1 ? (
                                      <h4>
                                        {`${Math.floor(
                                          detail?.Segments[0][0]?.Duration / 60
                                        )}hr ${
                                          detail?.Segments[0][0]?.Duration % 60
                                        }min`}{" "}
                                        -{" "}
                                        {`${Math.floor(
                                          detail?.Segments[0][1]?.Duration / 60
                                        )}hr ${
                                          detail?.Segments[0][1]?.Duration % 60
                                        }min`}
                                      </h4>
                                    ) : (
                                      <h4>
                                        {`${Math.floor(
                                          detail?.Segments[0][0]?.Duration / 60
                                        )}hr ${
                                          detail?.Segments[0][0]?.Duration % 60
                                        }min`}
                                      </h4>
                                    )}

                                    {detail?.Segments[0].length > 1 ? (
                                      <div className="stopBef">
                                        <Divider
                                          orientation="vertical"
                                          flexItem
                                          sx={{
                                            backgroundColor: "#21325d",
                                            marginX: "8px",
                                            height: "3px",
                                          }}
                                          className=""
                                        />
                                      </div>
                                    ) : (
                                      <div>
                                        <Divider
                                          orientation="vertical"
                                          flexItem
                                          sx={{
                                            backgroundColor: "#21325d",
                                            marginX: "8px",
                                            height: "3px",
                                          }}
                                        />
                                      </div>
                                    )}
                                    <p>
                                      {detail?.Segments[0].length > 1
                                        ? `${
                                            detail?.Segments[0].length - 1
                                          } stop via ${
                                            detail?.Segments[0][0]?.Destination
                                              ?.Airport?.CityName
                                          }`
                                        : "Non Stop"}
                                    </p>
                                  </div>

                                  <div className="singleFlightBoxFour">
                                    <span>
                                      {
                                        detail?.Segments[0][
                                          detail?.Segments[0].length - 1
                                        ]?.Destination?.Airport?.CityName
                                      }
                                    </span>
                                    <p>
                                      {dayjs(
                                        detail?.Segments?.[0][
                                          detail?.Segments[0].length - 1
                                        ]?.Destination?.ArrTime
                                      ).format("DD MMM, YY")}
                                    </p>
                                    <h5 className="daySize">
                                      {dayjs(
                                        detail?.Segments?.[0][
                                          detail?.Segments[0].length - 1
                                        ]?.Destination?.ArrTime
                                      ).format("h:mm A")}
                                    </h5>
                                  </div>

                                  <div className="singleFlightBoxSeven">
                                    <p>
                                      ₹{" "}
                                      {(detail?.Fare?.PublishedFare).toFixed(0)}
                                    </p>
                                  </div>
                                </div>
                                {detail?.AirlineRemark !== null &&
                                detail?.AirlineRemark !== "--." ? (
                                  <p className="text-center w-100 mandaField">
                                    {detail?.AirlineRemark}
                                  </p>
                                ) : (
                                  ""
                                )}
                              </div>
                            )}
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                ))}
            </div>

            <div className="mx-4">
              {itineraryData?.hotelDetails.length > 0 && (
                <div className="my-4 text-center">
                  <h5>Your Hotel Details</h5>
                </div>
              )}

              {itineraryData?.hotelDetails?.map((item, index) => (
                <div key={index}>
                  <div className="headingItenary my-2">
                    <h6>
                      Stays in{" "}
                      {
                        itineraryData?.ItenaryPayloadData?.cityAndNight?.[index]
                          ?.destination
                      }{" "}
                      {
                        itineraryData?.ItenaryPayloadData?.cityAndNight?.[index]
                          ?.night
                      }{" "}
                      Nights{" "}
                    </h6>
                  </div>
                  <div
                    className="dayWiseItenaryMainBox mb-3"
                    style={{ backgroundColor: "#f1f1f1" }}
                  >
                    <div className="dayWiseItenaryInnerBoxPDF">
                      <div className="hotelResultBoxSearch">
                        <div>
                          <div className="hotelImage">
                            <img
                              src={
                                item?.HotelPicture ===
                                "https://b2b.tektravels.com/Images/HotelNA.jpg"
                                  ? hotelNotFound
                                  : item?.HotelPicture
                              }
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = hotelNotFound;
                              }}
                              alt="package-img"
                            />
                          </div>
                          <div className="hotelResultDetails">
                            <div className="hotleTitle">
                              <h6 className="mb-0">{item?.HotelName}</h6>
                            </div>
                            <div className="hotelRating">
                              <div>
                                {Array.from(
                                  { length: item?.StarRating },
                                  (_, index) => (
                                    <img
                                      key={index}
                                      src={starsvg}
                                      alt={`Star ${index + 1}`}
                                    />
                                  )
                                )}
                              </div>
                            </div>
                            <div>
                              <p className="">{item?.HotelAddress}</p>
                            </div>
                            {item?.HotelLocation && (
                              <div>
                                <p className="hotAddressLocation">
                                  <span>
                                    <svg
                                      height="17"
                                      viewBox="0 0 32 32"
                                      width="17"
                                      xmlns="http://www.w3.org/2000/svg"
                                      id="fi_3138736"
                                    >
                                      <g id="Pin-2" data-name="Pin">
                                        <path
                                          fill="#d90429"
                                          d="m25.0464 8.4834a10 10 0 0 0 -7.9116-5.4258 11.3644 11.3644 0 0 0 -2.2691 0 10.0027 10.0027 0 0 0 -7.9121 5.4253 10.8062 10.8062 0 0 0 1.481 11.8936l6.7929 8.2588a1 1 0 0 0 1.545 0l6.7929-8.2588a10.8055 10.8055 0 0 0 1.481-11.8931zm-9.0464 8.5166a4 4 0 1 1 4-4 4.0047 4.0047 0 0 1 -4 4z"
                                        ></path>
                                      </g>
                                    </svg>
                                  </span>
                                  {item?.HotelLocation}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div>
                        {item.selectedRoom && (
                          // <div className="selectedRoomDetails">
                          //     <h6>Selected Room:</h6>
                          //     <p>{item.selectedRoom.RoomType}</p>
                          //     <p>{item.selectedRoom.RoomDescription}</p>
                          // </div>

                          <>
                            {/* <div className="itenaryPDFHotel">
                                                    <p>No of Rooms {itineraryData?.ItenaryPayloadData?.RoomGuests.length}, No of Adults {itineraryData?.ItenaryPayloadData?.RoomGuests?. }</p>
                                                </div> */}

                            <p
                              style={{
                                fontSize: "13px",
                                fontWeight: "500",
                                textAlign: "left",
                              }}
                              className="mb-2"
                            >{`${
                              itineraryData?.ItenaryPayloadData?.RoomGuests
                                ?.length
                            } Rooms, ${adults} adults  ${
                              children.length > 0
                                ? `, ${children.length} child${
                                    children.length > 1 ? "ren" : ""
                                  }`
                                : ""
                            }`}</p>

                            <div className="roomCompo">
                              <div className="offer_area">
                                <div>
                                  <div className="insideOffer">
                                    <div className="inneraccorHotel">
                                      <div className="ratePlan">
                                        <p className="insideOfferText">
                                          {item.selectedRoom?.RoomTypeName}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="othInc">
                                    {item.selectedRoom?.Amenities && (
                                      <div className="othIncInner">
                                        <div className="d-flex justify-content-start align-items-center gap-2">
                                          <p className="panDesign">
                                            {item.selectedRoom?.Amenities}
                                          </p>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mx-4">
              {itineraryData?.hotelDetails.length > 0 && (
                <div className="my-4 text-center">
                  <h5>Day wise Itenerary Details for You</h5>
                </div>
              )}

              {itineraryData?.itenerieData?.[0]?.itenararyResult?.map(
                (itenary, itenaryIndex) => (
                  <div key={itenaryIndex} className="col-lg-12">
                    {itenary?.[0]?.dayAt?.map((item, index) => {
                      const dayIndex =
                        itineraryData?.itenerieData?.[0]?.itenararyResult
                          ?.slice(0, itenaryIndex)
                          ?.reduce(
                            (acc, curr) => acc + curr?.[0]?.dayAt?.length,
                            0
                          ) + index;
                      const activity =
                        itineraryData?.itenerieData?.[0]?.activities?.[0]?.[
                          dayIndex
                        ];
                      const currentDate = getDateForDay(
                        initialStartDate,
                        dayIndex
                      );
                      console.log(activity, "activity");

                      return (
                        <div className="dayWiseItenaryMainBox mb-3" key={index}>
                          <div className="headingItenary">
                            <h6 className="mb-3">
                              Day {dayIndex + 1} in {itenary?.[0]?.destination}{" "}
                              {currentDate}
                            </h6>
                          </div>
                          <div className="dayWiseItenaryInnerBoxPDF">
                            <div className="dayWiseItenaryContent">
                              <h5>{item?.title}</h5>
                              <div className="paragraph-Itenary">
                                <p className="paragraphinsideItenary">
                                  {item?.description}
                                </p>
                              </div>
                            </div>
                            <div className="mt-3">
                              <h6>Inclusions :</h6>
                            </div>

                            {activity.map((singleActivity, activityIndex) => (
                              <div key={activityIndex} className="my-3">
                                <Divider
                                  orientation="vertical"
                                  flexItem
                                  sx={{
                                    backgroundColor: "#21325d",
                                    marginY: "8px",
                                    height: "1px",
                                  }}
                                />
                                <h6>{singleActivity.title}</h6>
                                <div className="d-flex w-100 justify-content-between gap-5 align-items-center">
                                  <p>{singleActivity.description}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
        <div className="col-lg-3 mt-3">
          <div className="d-flex flex-row justify-content-center align-items-center gap-2">
            <Button
              type="primary"
              icon={<PrinterOutlined />}
              danger
              onClick={handlePrint}
            >
              Print
            </Button>
            <Button
              type="primary"
              icon={<DownloadOutlined />}
              warning
              onClick={handleDownload}
              loading={loading}
            >
              Download
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItenaryPdfDownloader;

<div className="mx-4"></div>;
