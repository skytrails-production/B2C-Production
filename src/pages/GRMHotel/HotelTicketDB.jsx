import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
// import userApi from "../../Redux/API/api";
import userApi from "../../Redux/API/api";
import { Modal } from "antd";
import ReviewForm from "../../components/TailwindSearchComp/reviews/ReviewForm";

const HotelTicketDB = () => {
  const location = useLocation();
  const { finalamount } = location.state || {};
  const navigate = useNavigate();

  const reducerState = useSelector((state) => state);
  const [isOpen, setIsOpen] = useState(true);
  // console.log(reducerState, "reducer state")
  const passenger = reducerState?.passengers?.passengersData;
  const getBookingDetails = reducerState?.hotelSearchResultGRN?.bookRoom;
  const hotelDetails =
    reducerState?.hotelSearchResultGRN?.hotelDetails?.data?.data?.hotel;

  const nonRefundable =
    getBookingDetails?.hotel?.booking_items?.[0]?.non_refundable;
  const cancelDetails =
    getBookingDetails?.hotel?.booking_items?.[0]?.cancellation_policy;

  // console.log(getBookingDetails, "getBookingDetails state")
  const handleCancel = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const payload = {
      userId: reducerState?.logIn?.loginData?.data?.result?._id,
      agnet_reference: getBookingDetails?.agent_reference,
      booking_date: getBookingDetails?.booking_date,
      booking_id: getBookingDetails?.booking_id,
      booking_reference: getBookingDetails?.booking_reference,
      checkin: getBookingDetails?.checkin,
      checkout: getBookingDetails?.checkout,
      // "total": getBookingDetails?.price?.total,
      total: Number(finalamount).toFixed(2),
      holder: {
        title: passenger?.[0]?.adults?.[0]?.Title,
        name: passenger?.[0]?.adults?.[0]?.FirstName,
        surname: passenger?.[0]?.adults?.[0]?.LastName,
        email: passenger?.[0]?.adults?.[0]?.Email,
        phone_number: passenger?.[0]?.adults?.[0]?.Phoneno,
        client_nationality: "in",
        pan_number: passenger?.[0]?.adults?.[0]?.PAN,
      },
      hotel: {
        address: getBookingDetails?.hotel?.address,
        name: getBookingDetails?.hotel?.name,
        price: getBookingDetails?.price?.total,
        imageUrl: hotelDetails?.images?.url,
        phoneNumber: "",
        geolocation: {
          latitude: getBookingDetails?.hotel?.geolocation?.latitude,
          longitude: getBookingDetails?.hotel?.geolocation?.longitude,
        },
        category: getBookingDetails?.hotel?.category,
        city_code: getBookingDetails?.hotel?.city_code,
        country_code: getBookingDetails?.hotel?.country_code,
        paxes: getBookingDetails?.hotel?.paxes?.map((item) => ({
          age: item.age || "",
          name: item.name,
          pax_id: item.pax_id,
          surname: item.surname,
          title: item.title,
          type: item.type,
        })),
        rooms: getBookingDetails?.hotel?.booking_items?.[0].rooms?.map(
          (item) => ({
            description: item?.description,
            no_of_adults: item?.no_of_adults,
            no_of_children: item?.no_of_children,
            no_of_rooms: item?.no_of_rooms,
          })
        ),
        non_refundable: nonRefundable,
        cancellation_policy:
          nonRefundable === false
            ? {
                amount_type: cancelDetails?.amount_type,
                cancel_by_date: cancelDetails?.cancel_by_date,
                details: [
                  {
                    from: cancelDetails?.details?.[0]?.from,
                  },
                ],
              }
            : null,
      },
      bookingType: "HOTELS",
    };
    // console.log(payload, "payload")

    if (getBookingDetails?.booking_id !== undefined) {
      // console.log(payload, "payload")
      userApi.hotelBookingDetailsSaveGRN(payload);
    }
  }, [getBookingDetails?.booking_id]);
  return (
    <div
      className="tempBox"
      style={{ marginTop: "150px", marginBottom: "150px" }}
    >
      <div className="container">
        <h2>Thank You for Booking With Us</h2>
        <p>Please Check your Booking History for Booking Details</p>
        <button
          onClick={() => {
            navigate("/st-hotel");
          }}
        >
          Ok
        </button>
      </div>
      {/* <Modal
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
            section={"HOTELS"}
            onCancel={handleCancel}
          />
        </Modal> */}
    </div>
  );
};

export default HotelTicketDB;
