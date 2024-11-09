import axios from "axios";
import React, { useEffect, useState } from "react";
import { apiURL } from "../../../../Constants/constant";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import SecureStorage from "react-secure-storage";
import Swal from "sweetalert2";
import { Modal } from "antd";
import ReviewForm from "../../../../components/TailwindSearchComp/reviews/ReviewForm";
function Kafilabookingdetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);

  const {
    baggage,
    meal,
    finalvalue,
    baggagedata,
    seats,
    mealDynamic,
    totalSeatAmount,
    pnrresponse,
    Destination,
    Origin,
    discount,
    sesstioResultIndex,
  } = location.state || {};

  const reducerState = useSelector((state) => state);

  const FCode = sesstioResultIndex?.FCode;
  const flightcode = FCode.split(",")[0];
  const token = SecureStorage.getItem("jwtToken");

  const passengers = reducerState?.passengers?.passengersData;

  //  console.log(passengers,pnrresponse);

  const passengerDetails =
    passengers?.map((item, index) => ({
      title: item?.Title,
      firstName: item?.FirstName,
      lastName: item?.LastName,
      gender: item?.Gender,
      ContactNo: passengers[index]?.ContactNo || "",
      DateOfBirth: item?.DateOfBirth,
      email: passengers[index]?.Email || "",
      addressLine1: item?.addressLine1,
      city: item?.City,
      baggagevalue: item?.Baggage,
      Baggage: item?.Baggage?.[0]?.Weight,
      Seats: item?.SeatDynamic,
      meal: item?.MealDynamic,
      TicketNumber: item?.Ticket?.TicketNumber,
      amount: item?.Fare?.PublishedFare?.toFixed() || "0",
    })) || [];

  const pnr = pnrresponse?.result?.BookingInfo?.APnr;

  const addBookingDetails = async () => {
    const payloadkafila = {
      userId: reducerState?.logIn?.loginData?.data?.result?._id,
      bookingId: `${pnrresponse?.result?.BookingInfo?.BookingId}`,
      oneWay: true,
      ticketType: "Original Ticket",
      pnr: pnr,
      bookingStatus: pnrresponse?.result?.BookingInfo?.APnr
        ? "BOOKED"
        : "FAILED",
      origin: reducerState?.searchFlight?.flightDetails?.from?.name,
      destination: reducerState?.searchFlight?.flightDetails?.to?.name,
      paymentStatus: "success",
      totalAmount: Number(finalvalue).toFixed(2),
      airlineDetails: sesstioResultIndex?.Itinerary?.map((item, index) => {
        return {
          Airline: {
            AirlineCode: item?.FCode,
            AirlineName: item?.FName,
            FlightNumber: item?.FNo,
            FareClass: item.FClass,
          },
          Origin: {
            AirportCode: item?.Src,
            AirportName: item?.DArpt,
            CityName: item.SrcName,
            Terminal: item.DTrmnl,
            DepTime: item.DDate,
          },
          Destination: {
            AirportCode: item.Des,
            AirportName: item.AArpt,
            CityName: item.DesName,
            Terminal: item.ATrmnl,
            ArrTime: item.ADate,
          },
          Baggage: null,
        };
      }),
      passengerDetails: passengers?.map((item, index) => {
        return {
          title: item?.Title,
          firstName: item?.FirstName,
          lastName: item?.LastName,
          gender: item?.Gender,
          ContactNo:
            passengers[index]?.ContactNo == undefined
              ? ""
              : passengers[index]?.ContactNo,
          DateOfBirth: item?.DateOfBirth,
          email:
            passengers[index]?.Email == undefined
              ? ""
              : passengers[index]?.Email,
          addressLine1: item?.addressLine1,
          city: item?.City,
          TicketNumber: item?.Ticket?.TicketNumber,
          amount: item?.Fare?.PublishedFare?.toFixed(),
        };
      }),
      baggage: baggagedata,
      mealDynamic: mealDynamic,
      seatDynamic: null,
    };

    try {
      const response = await axios.post(
        `${apiURL.baseURL}/skyTrails/api/user/kafila/userFlightBookingData`,
        payloadkafila,
        {
          headers: {
            token: token,
          },
        }
      );
    } catch (error) {}
  };

  // console.log(reducerState)

  useEffect(() => {
    const apiCalled = sessionStorage.getItem("apiCalled");
    // console.log("apiCalled value:", apiCalled);
    if (apiCalled !== "true") {
      addBookingDetails();
      sessionStorage.setItem("apiCalled", "true");
    }
  }, []);

  useEffect(() => {
    if (pnr) {
    } else {
      Swal.fire({
        icon: "error",
        title: "Booking failed",
        text: "Booking failed, your amount will be refunded within 72 hours.",
      });
      navigate("/");
    }
  }, [pnr, navigate]);

  // console.log(pnrresponse?.result?.PaxInfo?.Passengers,sesstioResultIndex,"pnrresponse?.result?.PaxInfo?.Passengerspnrresponse?.result?.PaxInfo?.Passengers")

  // console.log(finalvalue,"finalvaluefinalvaluefinalvaluefinalvalue");

  const dateTime = new Date(sesstioResultIndex?.DDate);
  const hours = dateTime.getHours().toString().padStart(2, "0");
  const minutes = dateTime.getMinutes().toString().padStart(2, "0");
  const departuretime = `${hours}:${minutes}`;

  const dateTimearrival = new Date(sesstioResultIndex?.ADate);
  const hoursarrival = dateTimearrival.getHours().toString().padStart(2, "0");
  const minutesarrival = dateTimearrival
    .getMinutes()
    .toString()
    .padStart(2, "0");
  const departuretimearrival = `${hoursarrival}:${minutesarrival}`;
  const handleCancel = () => {
    setIsOpen(false);
  };

  return pnr ? (
    <div>
      <div
        className="tempBox"
        style={{
          marginTop: "80px",
          marginBottom: "80px",
          flexDirection: "column",
        }}
      >
        <div className="container">
          <h2 style={{ textAlign: "center" }}>Thank You for Booking With Us</h2>
          <p
            style={{ textAlign: "center", color: "#d90429", fontWeight: "700" }}
          >
            Check Your Booking details
          </p>

          <div className="ticketdetails col-lg-12">
            <div
              style={{ borderBottom: "1px solid rgba(128, 128, 128, 0.897)" }}
            >
              <div style={{ padding: "40px" }}>
                <div className="ticket-details-destination">
                  <div>
                    <p className="tickettex">
                      {sesstioResultIndex?.Itinerary[0]?.SrcName}
                    </p>
                  </div>
                  <span className="tickettex">-</span>
                  <div>
                    <p className="tickettex">
                      {" "}
                      {
                        sesstioResultIndex?.Itinerary[
                          sesstioResultIndex?.Itinerary.length - 1
                        ]?.DesName
                      }
                    </p>
                  </div>
                </div>

                {/* <div className="datetimeticket">
                  <p className="tickettex1">• {stopnonstop} </p>
                </div> */}
              </div>
            </div>

            <div style={{ padding: "40px" }} className="row">
              <div
                className="col-lg-3"
                style={{ borderRight: "1px solid rgba(128, 128, 128, 0.897)" }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
                  <img
                    src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/${flightcode}.png`}
                    style={{
                      height: "50px",
                      width: "50px",
                      borderRadius: "5px",
                    }}
                    alt="Airline Logo"
                  />
                  <p>{flightcode}</p>
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
                  <p style={{ padding: "5px" }}>
                    {pnrresponse?.result?.BookingInfo?.APnr}
                  </p>
                </div>
              </div>
              <div className=" col-lg-9" style={{ padding: "8px" }}>
                <div
                  style={{ display: "flex", justifyContent: "space-evenly" }}
                >
                  <div>
                    <div
                      style={{
                        borderBottom: "1px solid rgba(128, 128, 128, 0.897)  ",
                      }}
                    >
                      <p className="tickettexvalue">
                        {sesstioResultIndex?.Itinerary?.[0]?.SrcName}
                      </p>
                      <p className="tickettexvalue">{departuretime}</p>
                      {/* <p className="tickettex1">{dayjs(bookingDataLcc?.FlightItinerary?.Segments[0]?.Origin?.DepTime).format('DD-MM-YYYY')}</p> */}
                    </div>
                    <div>
                      <p className="tickettex1">
                        {sesstioResultIndex?.Itinerary?.[0]?.DArpt}
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
                    <i class="fa-solid fa-jet-fighter"></i>
                  </div>

                  <div>
                    <div
                      style={{
                        borderBottom: "1px solid rgba(128, 128, 128, 0.897)  ",
                      }}
                    >
                      <p className="tickettexvalue">
                        {" "}
                        {
                          sesstioResultIndex?.Itinerary[
                            sesstioResultIndex?.Itinerary.length - 1
                          ]?.DesName
                        }
                      </p>
                      <p className="tickettexvalue">{departuretimearrival}</p>
                      {/* <p className="tickettex1">{dayjs(bookingDataLcc?.FlightItinerary?.Segments[
                    bookingDataLcc?.FlightItinerary?.Segments?.length - 1
                  ]?.Destination?.ArrTime).format('DD-MM-YYYY')}</p> */}
                    </div>
                    <div>
                      <p className="tickettex1">
                        {
                          sesstioResultIndex?.Itinerary[
                            sesstioResultIndex?.Itinerary.length - 1
                          ]?.AArpt
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                borderTop: "1px solid rgba(128, 128, 128, 0.897)",
                background: "#F1F1F1",
              }}
            >
              <div>
                {passengerDetails?.length > 0 ? (
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr>
                        <th
                          style={{ border: "1px solid #ddd", padding: "8px" }}
                        >
                          TRAVELLER
                        </th>
                        {/* <th style={{ border: "1px solid #ddd", padding: "8px" }}>SEAT</th> */}
                        {/* <th style={{ border: "1px solid #ddd", padding: "8px" }}>MEAL</th> */}
                        <th
                          style={{ border: "1px solid #ddd", padding: "8px" }}
                        >
                          Baggage
                        </th>
                        <th
                          style={{ border: "1px solid #ddd", padding: "8px" }}
                        >
                          E-TICKET NO
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {pnrresponse?.result?.PaxInfo?.Passengers?.map(
                        (passenger, index) => (
                          <tr key={index}>
                            <td
                              style={{
                                border: "1px solid #ddd",
                                padding: "8px",
                              }}
                            >
                              {passenger.Title} {passenger.FName}{" "}
                              {passenger.LName}
                            </td>
                            {/*<td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {passenger.Seats && passenger.Seats.length > 0 ? passenger.Seats?.[0]?.Code : 'N/A'}
              </td>*/}
                            {/* <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {passenger?.Meal && passenger?.Meal?.length > 0 ? passenger?.Meal?.[0]?.SsrDesc : 'N/A'}
              </td> */}
                            <td
                              style={{
                                border: "1px solid #ddd",
                                padding: "8px",
                              }}
                            >
                              {passenger?.baggage &&
                              passenger?.baggage?.length > 0
                                ? passenger?.baggage?.[0]?.AirlineDescription
                                : sesstioResultIndex?.FareRule?.CHKNBG}
                            </td>
                            <td
                              style={{
                                border: "1px solid #ddd",
                                padding: "8px",
                              }}
                            >
                              {pnr || "N/A"}
                            </td>
                          </tr>
                        )
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
                  {parseInt(Number(finalvalue))}
                </span>
                {discount > 0 && (
                  <>
                    {" "}
                    You saved{" "}
                    <span style={{ fontWeight: "bold" }}>
                      {Number(discount).toFixed(2)}
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
            sessionStorage.removeItem("apiCalled");
            navigate("/");
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
          destination={reducerState?.searchFlight?.flightDetails?.to?.name}
          section={"FLIGHT"}
          onCancel={handleCancel}
        />
      </Modal>
    </div>
  ) : null;
}

export default Kafilabookingdetails;
