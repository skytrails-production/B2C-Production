import React, { useEffect } from "react";
import logo from "../../images/red-logo.png";
import { useDispatch, useSelector } from "react-redux";
import userApi from "../../Redux/API/api";
import { useNavigate } from "react-router-dom";

import "./bookedTicket.css";
const BookedTicket = () => {
  const reducerState = useSelector((state) => state);
  const bookingDataLcc = reducerState?.flightBook?.flightBookData?.Response;
  const bookingDataNonLcc =
    reducerState?.flightBook?.flightTicketDataGDS?.data?.data?.Response
      ?.Response || reducerState?.flightBook?.flightBookDataGDS?.Response;
  const PassengersSaved = reducerState?.passengers?.passengersData;
  const markUpamount =
    reducerState?.markup?.markUpData?.data?.result[0]?.flightMarkup;
  const couponvalue = sessionStorage.getItem("couponCode");
  // console.log(reducerState, "reducerState", bookingDataNonLcc, couponvalue);

  const navigate = useNavigate();

  useEffect(() => {
    addBookingDetails();

    // sessionStorage.removeItem("couponCode");
  }, []);
  const addBookingDetails = () => {
    if (bookingDataLcc) {
      // console.log("lccCheck");
      const payloadLCC = {
        userId: reducerState?.logIn?.loginData?.data?.data?.id,
        bookingId: `${bookingDataLcc?.BookingId}`,
        oneWay: true,
        ticketType: "Original Ticket",
        pnr: bookingDataLcc?.PNR,
        origin: bookingDataLcc?.FlightItinerary?.Origin,
        destination: bookingDataLcc?.FlightItinerary?.Destination,
        paymentStatus: "success",
        totalAmount: couponvalue
          ? parseInt(bookingDataLcc?.FlightItinerary?.Fare?.OfferedFare) +
            parseInt(bookingDataNonLcc?.FlightItinerary?.Fare?.PublishedFare) *
              markUpamount
          : parseInt(bookingDataLcc?.FlightItinerary?.Fare?.PublishedFare) +
            markUpamount *
              parseInt(bookingDataLcc?.FlightItinerary?.Fare?.PublishedFare),
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
      };
      userApi.flightBookingDataSave(payloadLCC);
    } else {
      // console.log("nonlccCheck");
      const payloadNonLcc = {
        userId: reducerState?.logIn?.loginData?.data?.data?.id,
        bookingId: `${bookingDataNonLcc?.BookingId}`,
        oneWay: true,
        ticketType: "Original Ticket",
        pnr: bookingDataNonLcc?.PNR,
        origin: bookingDataNonLcc?.FlightItinerary?.Origin,
        destination: bookingDataNonLcc?.FlightItinerary?.Destination,
        paymentStatus: "success",
        totalAmount: couponvalue
          ? parseInt(bookingDataNonLcc?.FlightItinerary?.Fare?.OfferedFare) +
            parseInt(bookingDataNonLcc?.FlightItinerary?.Fare?.PublishedFare) *
              markUpamount
          : parseInt(bookingDataNonLcc?.FlightItinerary?.Fare?.PublishedFare) +
            markUpamount *
              parseInt(bookingDataNonLcc?.FlightItinerary?.Fare?.PublishedFare),
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
              Baggage: item.Baggage,
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
      };
      userApi.flightBookingDataSave(payloadNonLcc);
    }
  };

  return (
    <div>
      {/* <div className="mainimgFlightSearch"> */}
      {/* </div> */}

      {/* <div className="margin-pecentage">
        <div className="container-fluid bg-light p-5">
          <div className="ticketHeading">
            <h3>E-Ticket</h3>
          </div>
          <div className="ticketIdPnr">
            <div className="skyTrailLogo">
              <img src={logo} alt="logo" />
            </div>
            <div className="bookedBookingId">
              <div>
                <p>Booking ID</p>
                <span>1863111</span>
              </div>
              <div>
                <p>PNR</p>
                <span>RH4HNZ</span>
              </div>
              <div>
                <p>(Booked on Tue, Dec 19, 2023)</p>
              </div>
            </div>
          </div>
          <div className="bookedPassengerDetails">

            <div className="row">
              <div className="col-lg-4 col-md-4 col-sm-4">
                <p>Passenger Name</p>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-4">
                <p>Ticket Number</p>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-4">
                <p>Frequent Flyer No.</p>
              </div>
            </div>


            <div className="row">
              <div className="col-lg-4 col-md-4 col-sm-4">
                <span>Qamar Mishra</span>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-4">
                <span>RH4HNZ</span>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-4">
                <span>--</span>
              </div>
            </div>
          </div>

          <div className="bookedFlightDetails">
            <div className="row">
              <div className="col-lg-4 col-md-4 col-sm-4">
                <p>Flight</p>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-4">
                <p>Departure</p>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-4">
                <p>Arrival</p>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-4 col-md-4 col-sm-4">
                <div className="bookedFlightLogo">
                  <img
                    src="https://theskytrails.com/FlightImages/6E.png"
                    alt="flight logo"
                    height={200}
                    width={200}
                  />
                </div>
                <div className="bookedFLightname">
                  <div>
                    <span>IndiGo</span>
                    <span>6E</span>
                    <span>6814</span>
                  </div>
                  <p>VR Class</p>
                  <p>Cabin : Economy</p>
                </div>
              </div>

              <div className="col-lg-4 col-md-4 col-sm-4">
                <span>PAT (Patna, Patna)</span>
                <div>
                  <span>Terminal : </span>
                  <p>2</p>
                </div>
                <span>Wed, Feb 21, 2024, 8:20 PM</span>
              </div>

              <div className="col-lg-4 col-md-4 col-sm-4">
                <span>DEL (Indira Gandhi Airport, Delhi)</span>
                <div>
                  <span>Terminal : </span>
                  <p>2</p>
                </div>
                <span>Wed, Feb 21, 2024, 8:20 PM</span>
              </div>
            </div>
          </div>

          <div className="bookedFlightStatus">
            <div className="row">
              <div className="col-lg-12">
                <p>Booking Status</p>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-4 col-md-4 col-sm-4">
                <p>Confirmed</p>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-4">
                <p>Baggage : 15 Kilograms</p>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-4">
                <p>Non Stop</p>
              </div>
            </div>
          </div>

          <div className="bookedPaymentDetails">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6">
                <p>
                  this is an electronic ticket. Passengers must carry a valid
                  photo ID card for check-in at the airport.
                </p>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6">
                <span>Total Amount : </span>
                <p>₹ 7330.00</p>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <div
        className="tempBox"
        style={{ marginTop: "150px", marginBottom: "150px" }}
      >
        <div className="container">
          <h2>Thank You for Booking With Us</h2>
          <p>Please Check your Email for Booking Details</p>
          <button
            onClick={() => {
              navigate("/");
            }}
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookedTicket;
