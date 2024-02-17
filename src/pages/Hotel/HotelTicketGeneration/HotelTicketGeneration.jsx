import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import userApi from "../../../Redux/API/api";


const HotelTicketGeneration = () => {


  const navigate = useNavigate();

  const reducerState = useSelector((state) => state);
  const hotelcoupon = sessionStorage.getItem("couponCode");
  const passenger = reducerState?.passengers?.passengersData;
  const getBookingDetails =
    reducerState?.hotelSearchResult?.blockRoom?.BlockRoomResult
      ?.HotelRoomsDetails;
  // console.log("reducerState", reducerState, hotelcoupon);

  const totalAmount = getBookingDetails?.reduce((accumulator, item) => {
    return accumulator + item?.Price?.PublishedPriceRoundedOff;
  }, 0);
  // console.log("totalAmount in last page", totalAmount);
  const totalAmountAfterCoupon = getBookingDetails?.reduce(
    (accumulator, item) => {
      return accumulator + item?.Price?.OfferedPriceRoundedOff;
    },
    0
  );

  const markUpamount =
    reducerState?.markup?.markUpData?.data?.result[0]?.hotelMarkup;
  const grandTotal = totalAmount + markUpamount;
  useEffect(() => {
  const payload = {
      userId: reducerState?.logIn?.loginData?.data?.data?.id,
      name: reducerState?.hotelSearchResult?.hotelDetails?.data?.data
        ?.GetBookingDetailResult?.HotelRoomsDetails[0]?.HotelPassenger[0]
        ?.FirstName,
      phone: passenger[0]?.Phoneno,
      email: passenger[0]?.Email,
      destination:
        reducerState?.hotelSearchResult?.hotelDetails?.data?.data
          ?.GetBookingDetailResult?.City,
      bookingId: reducerState?.hotelSearchResult?.hotelDetails?.data?.data?.GetBookingDetailResult?.BookingId,
      CheckInDate:
        reducerState?.hotelSearchResult?.hotelDetails?.data?.data
          ?.GetBookingDetailResult?.CheckInDate,
      CheckOutDate:
        reducerState?.hotelSearchResult?.hotelDetails?.data?.data
          ?.GetBookingDetailResult?.CheckOutDate,
      hotelName:
        reducerState?.hotelSearchResult?.hotelDetails?.data?.data
          ?.GetBookingDetailResult?.HotelName,
      hotelId:
        reducerState?.hotelSearchResult?.hotelDetails?.data?.data
          ?.GetBookingDetailResult?.HotelId,
      cityName:
        reducerState?.hotelSearchResult?.hotelDetails?.data?.data
          ?.GetBookingDetailResult?.City,
      country:
        reducerState?.hotelSearchResult?.hotelDetails?.data?.data
          ?.GetBookingDetailResult?.CountryCode,
      address:
        reducerState?.hotelSearchResult?.hotelDetails?.data?.data
          ?.GetBookingDetailResult?.AddressLine1,
      room: reducerState?.hotelSearchResult?.hotelDetails?.data?.data
        ?.GetBookingDetailResult?.NoOfRooms,
      amount:hotelcoupon? totalAmountAfterCoupon:grandTotal,
      noOfPeople: 2,
    };
    if (reducerState?.hotelSearchResult?.hotelDetails?.data?.data?.GetBookingDetailResult?.BookingId !== undefined) {

      userApi.hotelBookingDetailsSave(payload);
    }

  }, [reducerState?.hotelSearchResult?.hotelDetails?.data?.data?.GetBookingDetailResult?.BookingId]);
  return (

    // < div > HotelTicketGeneration</ >;
    <div className="tempBox" style={{ marginTop: "150px", marginBottom: "150px" }}>
      <div className="container">
        <h2>Thank You for Booking With Us</h2>
        <p>Please Check your Email for Booking Details</p>
        <button onClick={() => { navigate("/") }}>
          Ok
        </button>
      </div>
    </div>
  )

};

export default HotelTicketGeneration;