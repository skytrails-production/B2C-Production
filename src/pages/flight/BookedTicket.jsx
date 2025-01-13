import React, { useEffect, useState } from "react";
import logo from "../../images/red-logo.png";
import { useDispatch, useSelector } from "react-redux";
import userApi from "../../Redux/API/api";
import { useLocation, useNavigate } from "react-router-dom";
import SecureStorage from "react-secure-storage";
import dayjs from "dayjs";

import "./bookedTicket.css";
import { Modal } from "antd";

import ReviewForm from "../../components/TailwindSearchComp/reviews/ReviewForm";

const BookedTicket = () => {
  const reducerState = useSelector((state) => state);
  const [isOpen, setIsOpen] = useState(true);
  const bookingDataLcc = reducerState?.flightBook?.flightBookData?.Response;
  // console.log(bookingDataLcc)
  const bookingDataNonLcc =
    reducerState?.flightBook?.flightTicketDataGDS?.data?.data?.Response
      ?.Response || reducerState?.flightBook?.flightBookDataGDS?.Response;
  const PassengersSaved = reducerState?.passengers?.passengersData;
  const markUpamount =
    reducerState?.markup?.markUpData?.data?.result[0]?.flightMarkup;
  const couponvalue = sessionStorage.getItem("couponCode");
  // console.log(reducerState, "reducerState", bookingDataNonLcc, couponvalue);

  const navigate = useNavigate();

  const location = useLocation();
  const {
    baggage,
    meal,
    finalvalue,
    baggagedata,
    seats,
    mealDynamic,
    totalSeatAmount,
    Destination,
    Origin,
    discount,
  } = location.state || {};
  // const seatPrice=seats?.reduce((item,value) => )

  // useEffect(() => {
  //   console.log(totalSeatAmount,"totalSeatAmount");
  //   console.log("Baggage Fare:", baggage);
  //   console.log("Meal Fare:", meal);
  //   console.log("Final Value:", finalvalue);
  //   console.log("Baggage Data:", baggagedata);
  //   console.log("Seats:", seats, mealDynamic, Destination, Origin,totalSeatAmount);
  // }, [baggage, meal, finalvalue, baggagedata, seats,totalSeatAmount]);

  // sessionStorage.setItem("storingdata",false);
  // const storedvalue = sessionStorage.getItem("storingdata");

  const addBookingDetails = () => {
    let subBag = baggage === 0 ? 0 : baggage * markUpamount;
    let subMel = baggage === 0 ? 0 : baggage * markUpamount;
    if (bookingDataLcc) {
      // console.log("lccCheck");
      const payloadLCC = {
        userId: reducerState?.logIn?.loginData?.data?.result?._id,
        bookingId: `${bookingDataLcc?.BookingId}`,
        oneWay: true,
        ticketType: "Original Ticket",
        pnr: bookingDataLcc?.PNR,
        origin: bookingDataLcc?.FlightItinerary?.Origin,
        destination: bookingDataLcc?.FlightItinerary?.Destination,
        paymentStatus: "success",
        totalAmount: Number(finalvalue).toFixed(2),
        airlineDetails: bookingDataLcc?.FlightItinerary?.Segments.map(
          (item, index) => {
            return {
              Airline: {
                AirlineCode: item.Airline.AirlineCode,
                AirlineName: item.Airline.AirlineName,
                FlightNumber: item.Airline.FlightNumber,
                FareClass: item.Airline.FareClass,
              },
              Origin: {
                AirportCode: item.Origin.Airport.AirportCode,
                AirportName: item.Origin.Airport.AirportName,
                CityName: item.Origin.Airport.CityName,
                Terminal: item.Origin.Airport.Terminal,
                DepTime: item.Origin.DepTime,
              },
              Destination: {
                AirportCode: item.Destination.Airport.AirportCode,
                AirportName: item.Destination.Airport.AirportName,
                CityName: item.Destination.Airport.CityName,
                Terminal: item.Destination.Airport.Terminal,
                ArrTime: item.Destination.ArrTime,
              },
              Baggage: item.Baggage,
            };
          }
        ),
        passengerDetails: bookingDataLcc?.FlightItinerary?.Passenger?.map(
          (item, index) => {
            return {
              title: item?.Title,
              firstName: item?.FirstName,
              lastName: item?.LastName,
              gender: item?.Gender,
              ContactNo:
                PassengersSaved[index]?.ContactNo == undefined
                  ? ""
                  : PassengersSaved[index]?.ContactNo,
              DateOfBirth: item?.DateOfBirth,
              email:
                PassengersSaved[index]?.Email == undefined
                  ? ""
                  : PassengersSaved[index]?.Email,
              addressLine1: item?.addressLine1,
              city: item?.City,
              TicketNumber: item?.Ticket?.TicketNumber,
              amount: item?.Fare?.PublishedFare?.toFixed(),
            };
          }
        ),
        baggage: baggagedata,
        mealDynamic: mealDynamic,
        seatDynamic: seats,
      };
      userApi.flightBookingDataSave(payloadLCC);
    } else {
      // console.log("nonlccCheck");
      const payloadNonLcc = {
        userId: reducerState?.logIn?.loginData?.data?.result?._id,
        bookingId: `${bookingDataNonLcc?.BookingId}`,
        oneWay: true,
        ticketType: "Original Ticket",
        pnr: bookingDataNonLcc?.PNR,
        origin: bookingDataNonLcc?.FlightItinerary?.Origin,
        destination: bookingDataNonLcc?.FlightItinerary?.Destination,
        paymentStatus: "success",
        totalAmount: Number(finalvalue).toFixed(2),
        airlineDetails: bookingDataNonLcc?.FlightItinerary?.Segments.map(
          (item, index) => {
            return {
              Airline: {
                AirlineCode: item.Airline.AirlineCode,
                AirlineName: item.Airline.AirlineName,
                FlightNumber: item.Airline.FlightNumber,
                FareClass: item.Airline.FareClass,
              },
              Origin: {
                AirportCode: item.Origin.Airport.AirportCode,
                AirportName: item.Origin.Airport.AirportName,
                CityName: item.Origin.Airport.CityName,
                Terminal: item.Origin.Airport.Terminal,
                DepTime: item.Origin.DepTime,
              },
              Destination: {
                AirportCode: item.Destination.Airport.AirportCode,
                AirportName: item.Destination.Airport.AirportName,
                CityName: item.Destination.Airport.CityName,
                Terminal: item.Destination.Airport.Terminal,
                ArrTime: item.Destination.ArrTime,
              },
              baggage: baggage,
              mealDynamic: mealDynamic,
              seatDynamic: seats,
            };
          }
        ),
        passengerDetails: bookingDataNonLcc?.FlightItinerary?.Passenger?.map(
          (item, index) => {
            return {
              title: item?.Title,
              firstName: item?.FirstName,
              lastName: item?.LastName,
              gender: item?.Gender,
              ContactNo:
                PassengersSaved[index]?.ContactNo == undefined
                  ? ""
                  : PassengersSaved[index]?.ContactNo,
              DateOfBirth: item?.DateOfBirth,
              email:
                PassengersSaved[index]?.Email == undefined
                  ? ""
                  : PassengersSaved[index]?.Email,
              addressLine1: item?.addressLine1,
              city: item?.City,
              TicketNumber: item?.Ticket?.TicketNumber,
              amount: item?.Fare?.PublishedFare?.toFixed(),
            };
          }
        ),
        baggage: baggagedata,
        mealDynamic: mealDynamic,
        seatDynamic: seats,
      };
      userApi.flightBookingDataSave(payloadNonLcc);
    }
  };

  useEffect(() => {
    const apiCalled = sessionStorage.getItem("apiCalled");

    if (!apiCalled) {
      // addBookingDetails();
      sessionStorage.setItem("apiCalled", "true");
    }
  }, []);

  // const [isReady, setIsReady] = useState(false);

  // useEffect(() => {
  //   if (location.state) {
  //     setIsReady(true);
  //   }
  // }, [location.state]);

  // const generatePDF = () => {
  //   const input = document.getElementById('ticket-details');

  //   if (!input) {
  //     console.error('Element not found');
  //     return;
  //   }

  //   input.style.display = 'block';

  //   html2canvas(input).then((canvas) => {
  //     const imgData = canvas.toDataURL('image/png');
  //     const pdf = new jsPDF('p', 'mm', 'a4');
  //     const imgProps = pdf.getImageProperties(imgData);
  //     const pdfWidth = pdf.internal.pageSize.getWidth();
  //     const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

  //     pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  //     pdf.save('booked_ticket.pdf');
  //   }).finally(() => {
  //     // Hide the content again after the PDF is generated
  //     input.style.display = 'none'; // Hide it again
  //   }).catch((error) => {
  //     console.error('Error generating PDF:', error);
  //   });
  // };

  // if (!isReady) {
  //   return <p>Loading ticket details...</p>;
  // }

  const passengerDetails =
    bookingDataLcc?.FlightItinerary?.Passenger?.map((item, index) => ({
      title: item?.Title,
      firstName: item?.FirstName,
      lastName: item?.LastName,
      gender: item?.Gender,
      ContactNo: PassengersSaved[index]?.ContactNo || "",
      DateOfBirth: item?.DateOfBirth,
      email: PassengersSaved[index]?.Email || "",
      addressLine1: item?.addressLine1,
      city: item?.City,
      baggagevalue: item?.Baggage,
      Baggage: item?.Baggage?.[0]?.Weight,
      Seats: item?.SeatDynamic,
      meal: item?.MealDynamic,
      TicketNumber: item?.Ticket?.TicketNumber,
      amount: item?.Fare?.PublishedFare?.toFixed() || "0",
    })) || [];

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  const segments = bookingDataLcc?.FlightItinerary?.Segments;

  const stopnonstop =
    segments?.length > 1
      ? `${segments.length - 1} stop${segments.length > 2 ? "s" : ""} via ${
          segments[segments.length - 2]?.Destination?.Airport?.CityName ||
          "Unknown"
        }`
      : "Non Stop";

  function convertMinutes(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return {
      hours: hours,
      minutes: mins,
    };
  }

  const convertedTime = convertMinutes(
    bookingDataLcc?.FlightItinerary?.Segments[0]?.Duration
  );
  const timeString = `${convertedTime.hours}h : ${convertedTime.minutes}m`;
  // console.log(bookingDataLcc, "bookingDataLcc?.FlightItinerary?.Segments[0][0]?.Origin?.Airport?.CityName");
  // console.log(convertedTime, "stopnonstop");
  // console.log("Passenger Details:", passengerDetails);
  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
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
                      {
                        bookingDataLcc?.FlightItinerary?.Segments?.[0]?.Origin
                          ?.Airport?.CityName
                      }
                    </p>
                  </div>
                  <span className="tickettex">-</span>
                  <div>
                    <p className="tickettex">
                      {
                        bookingDataLcc?.FlightItinerary?.Segments[
                          bookingDataLcc?.FlightItinerary?.Segments?.length - 1
                        ]?.Destination?.Airport?.CityName
                      }
                    </p>
                  </div>
                </div>

                <div className="datetimeticket">
                  <p className="tickettex1">• {stopnonstop} </p>
                </div>
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
                    src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/${bookingDataLcc?.FlightItinerary?.AirlineCode}.png`}
                    style={{
                      height: "50px",
                      width: "50px",
                      borderRadius: "5px",
                    }}
                    alt="Airline Logo"
                  />
                  <p>{bookingDataLcc?.FlightItinerary?.AirlineCode}</p>
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
                  <p style={{ padding: "5px" }}>{bookingDataLcc?.PNR}</p>
                </div>
              </div>

              {/* Responsive div */}
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
                        {
                          bookingDataLcc?.FlightItinerary?.Segments?.[0]?.Origin
                            ?.Airport?.CityName
                        }
                      </p>
                      <p className="tickettexvalue">
                        {dayjs(
                          bookingDataLcc?.FlightItinerary?.Segments[0]?.Origin
                            ?.DepTime
                        ).format("h:mm A")}
                      </p>
                      <p className="tickettex1">
                        {dayjs(
                          bookingDataLcc?.FlightItinerary?.Segments[0]?.Origin
                            ?.DepTime
                        ).format("DD-MM-YYYY")}
                      </p>
                    </div>
                    <div>
                      <p className="tickettex1">
                        {
                          bookingDataLcc?.FlightItinerary?.Segments?.[0]?.Origin
                            ?.Airport?.AirportName
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
                    <i class="fa-solid fa-jet-fighter"></i>
                  </div>

                  <div>
                    <div
                      style={{
                        borderBottom: "1px solid rgba(128, 128, 128, 0.897)  ",
                      }}
                    >
                      <p className="tickettexvalue">
                        {
                          bookingDataLcc?.FlightItinerary?.Segments[
                            bookingDataLcc?.FlightItinerary?.Segments?.length -
                              1
                          ]?.Destination?.Airport?.CityName
                        }
                      </p>
                      <p className="tickettexvalue">
                        {dayjs(
                          bookingDataLcc?.FlightItinerary?.Segments[
                            bookingDataLcc?.FlightItinerary?.Segments?.length -
                              1
                          ]?.Destination?.ArrTime
                        ).format("h:mm A")}
                      </p>
                      <p className="tickettex1">
                        {dayjs(
                          bookingDataLcc?.FlightItinerary?.Segments[
                            bookingDataLcc?.FlightItinerary?.Segments?.length -
                              1
                          ]?.Destination?.ArrTime
                        ).format("DD-MM-YYYY")}
                      </p>
                    </div>
                    <div>
                      <p className="tickettex1">
                        {
                          bookingDataLcc?.FlightItinerary?.Segments[
                            bookingDataLcc?.FlightItinerary?.Segments?.length -
                              1
                          ]?.Destination?.Airport?.AirportName
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
                        <th
                          style={{ border: "1px solid #ddd", padding: "8px" }}
                        >
                          SEAT
                        </th>
                        <th
                          style={{ border: "1px solid #ddd", padding: "8px" }}
                        >
                          MEAL
                        </th>
                        <th
                          style={{ border: "1px solid #ddd", padding: "8px" }}
                        >
                          E-TICKET NO
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {passengerDetails.map((passenger, index) => (
                        <tr key={index}>
                          <td
                            style={{ border: "1px solid #ddd", padding: "8px" }}
                          >
                            {passenger.title} {passenger.firstName}{" "}
                            {passenger.lastName}
                          </td>
                          <td
                            style={{ border: "1px solid #ddd", padding: "8px" }}
                          >
                            {passenger.Seats && passenger.Seats.length > 0
                              ? passenger.Seats?.[0]?.Code
                              : "N/A"}
                          </td>
                          <td
                            style={{ border: "1px solid #ddd", padding: "8px" }}
                          >
                            {passenger.meal && passenger.meal.length > 0
                              ? passenger.meal?.[0]?.AirlineDescription
                              : "N/A"}
                          </td>
                          <td
                            style={{ border: "1px solid #ddd", padding: "8px" }}
                          >
                            {passenger.TicketNumber || "N/A"}
                          </td>
                        </tr>
                      ))}
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
                  {(
                    Number(finalvalue) +
                    Number(baggage) +
                    Number(meal) +
                    Number(totalSeatAmount)
                  ).toFixed(2)}
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
          destination={
            reducerState?.getBusResult?.busDetails?.data?.data
              ?.GetBookingDetailResult?.Itinerary?.Destination
          }
          section={"FLIGHT"}
          onCancel={handleCancel}
        />
      </Modal>
    </div>
  );
};

export default BookedTicket;
