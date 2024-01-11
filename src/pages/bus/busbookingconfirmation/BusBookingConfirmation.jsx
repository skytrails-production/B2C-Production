import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import userApi from "../../../Redux/API/api";
import { Mode } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
const BusBookingConfirmation = () => {
  const reducerState = useSelector((state) => state);
  const markUpamount =
    reducerState?.markup?.markUpData?.data?.result[0]?.busMarkup;
  const passengerNames = JSON.parse(sessionStorage.getItem("busPassName"));

  const navigate = useNavigate();

  useEffect(() => {

    const busBookSave = () => {
      const getDetails =
        reducerState?.getBusResult?.busDetails?.data?.data
          ?.GetBookingDetailResult?.Itinerary;
      const totalAmount =
        reducerState?.getBusResult?.busDetails?.data?.data
          ?.GetBookingDetailResult?.Itinerary?.Price?.PublishedPrice;

      const payloadSavedata = {
        userId: reducerState?.logIn?.loginData?.data?.data?.id,
        destination: getDetails?.Destination,
        origin: getDetails?.Origin,
        departureTime: getDetails?.DepartureTime,
        arrivalTime: getDetails?.ArrivalTime,
        travelName: getDetails?.TravelName,
        busType: getDetails?.BusType,
        pnr: getDetails?.TicketNo,
        busId: getDetails?.BusId,
        noOfSeats: getDetails?.NoOfSeats,
        amount: totalAmount + markUpamount,
        passenger: getDetails?.Passenger.map((item, index) => {
          return {
            title: item?.Title,
            firstName: item?.FirstName,
            lastName: item?.LastName,
            Email: passengerNames[index]?.Email,
            Phone: passengerNames[index]?.Phoneno,
            Address: item?.Address,
            seatNumber: item?.Seat?.SeatName,
            Price: item?.Seat?.Price?.PublishedPrice,
          };
        }),
        BoardingPoint: {
          Location: getDetails?.BoardingPointdetails?.CityPointLocation,
          Landmark: getDetails?.BoardingPointdetails?.CityPointLandmark,
          Address: getDetails?.BoardingPointdetails?.CityPointAddress,
          Contactnumber:
            getDetails?.BoardingPointdetails?.CityPointContactNumber,
        },
        CancelPolicy: getDetails?.CancelPolicy,
      };
      userApi.busBookingDataSave(payloadSavedata);
    };
    busBookSave();
  }, []);

  return (
    // <div>
    //   <div className="bus_banner">
    //     <h1>Design not available</h1>
    //   </div>
    // </div>
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
  );
};

export default BusBookingConfirmation;
