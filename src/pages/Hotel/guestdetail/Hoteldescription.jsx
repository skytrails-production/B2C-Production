import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import "./hoteldescription.css";
import {
  hotelBookRoomAction,
} from "../../../Redux/Hotel/hotel";
import StarIcon from "@mui/icons-material/Star";
import { apiURL } from "../../../Constants/constant";
import chevrondown from "../../../images/chevrondown.svg";
import { motion } from "framer-motion";
import useRazorpay from "react-razorpay";
import PaymentLoader from "../../flight/FlightLoader/paymentLoader";
import axios from "axios";
import dayjs from "dayjs";

const variants = {
  initial: {
    y: 50,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
    },
  },
};

const Hoteldescription = () => {





  const apiUrlPayment = `${apiURL.baseURL}/skyTrails/api/transaction/easebussPayment`;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loaderPayment, setLoaderPayment] = useState(false);
  const reducerState = useSelector((state) => state);
  const bookingId =
    reducerState?.hotelSearchResult?.bookRoom?.BookResult?.BookingId;
  let bookingStatus =
    reducerState?.hotelSearchResult?.bookRoom?.BookResult?.Status || false;
  const passenger = reducerState?.passengers?.passengersData;

  // console.log(reducerState, "passenger");

  const hotelBlockDetails =
    reducerState?.hotelSearchResult?.blockRoom?.BlockRoomResult;
  const hotelDetails = hotelBlockDetails?.HotelRoomsDetails;
  const resultIndex = sessionStorage.getItem("ResultIndex");
  const hotelCode = sessionStorage.getItem("HotelCode");
  const [bookingSuccess, setBookingSuccess] = useState(bookingStatus);
  const markUpamount =
    reducerState?.markup?.markUpData?.data?.result[0]?.hotelMarkup;
  const hotelData =
    reducerState?.hotelSearchResult?.ticketData?.data?.data?.HotelSearchResult;
  // console.log(resultIndex, hotelCode);
  const hotelInfo = reducerState?.hotelSearchResult?.hotelInfo?.HotelInfoResult;

  // const checkInDate = moment(hotelDetails?.CheckInDate).format("MMMM DD, YYYY");
  // const checkOutDate = moment(hotelDetails?.CheckOutDate).format(
  //   "MMMM DD, YYYY"
  // );
  // const cancelDuedate = moment(hotelDetails?.LastCancellationDate).format(
  //   "MMMM DD, YYYY"
  // );

  const getBookingDetails =
    reducerState?.hotelSearchResult?.blockRoom?.BlockRoomResult
      ?.HotelRoomsDetails;
  // console.log("reducerState", reducerState);

  const totalAmount = getBookingDetails?.reduce((accumulator, item) => {
    return accumulator + item?.Price?.PublishedPriceRoundedOff;
  }, 0);
  // console.log("totalAmount in last page", totalAmount);
  useEffect(() => {
    if (
      reducerState?.hotelSearchResult?.bookRoom?.BookResult?.Error?.ErrorCode ==
      0
    ) {
      setLoaderPayment(false);
      navigate(
        "/hotel/hotelsearch/HotelBooknow/Reviewbooking/GuestDetail/ticket"
      );
    }
  }, [reducerState?.hotelSearchResult?.bookRoom?.BookResult]);
  useEffect(() => {
    if (loaderPayment == true) {
      handleClickBooking();
    }
  }, [loaderPayment]);

  const handleClickBooking = async () => {

    const payload = {
      ResultIndex: resultIndex,
      HotelCode: hotelCode,
      HotelName: hotelBlockDetails?.HotelName,
      GuestNationality: "IN",
      NoOfRooms: hotelDetails?.length,
      ClientReferenceNo: 0,
      IsVoucherBooking: true,
      IspackageFare: true,
      HotelRoomsDetails: hotelDetails?.map((item, hotelIndex) => {
        return {
          RoomIndex: item?.RoomIndex,
          RoomTypeCode: item?.RoomTypeCode,
          RoomTypeName: item?.RoomTypeName,
          RatePlanCode: item?.RatePlanCode,
          BedTypeCode: null,
          SmokingPreference: 0,
          Supplements: null,
          Price: item?.Price,
          HotelPassenger: passenger
            .map((itemPassenger, index) => {
              if (itemPassenger?.roomIndex === hotelIndex) {
                return {
                  ...itemPassenger,
                  Email: apiURL.flightEmail,
                  Phoneno: apiURL.phoneNo,
                };
              } // If the condition is not met, return the original item
            })
            .filter(Boolean),
        };
      }),

      EndUserIp: reducerState?.ip?.ipData,
      TokenId: reducerState?.ip?.tokenData,
      TraceId:
        reducerState?.hotelSearchResult?.ticketData?.data?.data
          ?.HotelSearchResult?.TraceId,
    };
    // console.log(payload)

    const hotelDetailsPayload = {
      BookingId: await bookingId,
      EndUserIp: reducerState?.ip?.ipData,
      TokenId: reducerState?.ip?.tokenData,
    };
    // console.log(payload, "payload");

    dispatch(hotelBookRoomAction([payload, hotelDetailsPayload]));
    // dispatch(hotelBookRoomAction(payload));//ye nhi hai
  };

  // razorpay integration

  // razorpay integration part

  const [Razorpay, isLoaded] = useRazorpay();

  // const handlePayment = useCallback(async () => {
  //   try {
  //     const options = {
  //       key: "rzp_test_rSxJ8wZCLzTJck",
  //       amount: "300" * 100,
  //       currency: "INR",
  //       name: "The Skytrails",
  //       description: "Test Transaction",
  //       image: "https://travvolt.s3.amazonaws.com/Brand.png",
  //       // order_id: order.id,
  //       handler: (response) => {
  //         console.log(response);

  //         if (response.razorpay_payment_id) {
  //           setLoaderPayment(true);
  //         } else {
  //           // Handle payment failure
  //           console.log("Payment failed");
  //         }
  //       },
  //       // prefill: {
  //       //   name: "Piyush Garg",
  //       //   email: "youremail@example.com",
  //       //   contact: "9999999999"
  //       // },
  //       notes: {
  //         address: "Razorpay Corporate Office",
  //       },
  //       theme: {
  //         color: "#e73c34",
  //       },
  //     };

  //     const rzpay = new Razorpay(options);
  //     rzpay.open();
  //   } catch (error) {
  //     console.error("Error creating order:", error);
  //   }
  // }, [Razorpay]);

  // razorpay integration

  // balance subtract and update
  const handlePayment = async () => {
    const token = sessionStorage?.getItem("jwtToken");
    const payload = {
      firstname: passenger[0].FirstName,
      phone: passenger[0].Phoneno,
      amount: totalAmount + markUpamount,
      email: passenger[0].Email,
      productinfo: "ticket",
      bookingType: "HOTELS",
      surl: `${apiURL.baseURL}/skyTrails/successVerifyApi?merchantTransactionId=`,
      furl: `${apiURL.baseURL}/skyTrails/paymentFailure?merchantTransactionId=`,
    };

    try {
      const response = await fetch(apiUrlPayment, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();

        proceedPayment(data.result.access, "prod", data.result.key);
        // console.log("API call successful:", data);
      } else {
        console.error("API call failed with status:", response.status);
        const errorData = await response.json();
        console.error("Error details:", errorData);
      }
    } catch (error) {
      // Handle network errors or exceptions
      console.error("API call failed with an exception:", error.message);
    }
  };
  const proceedPayment = (accessKey, env, key) => {
    const easebuzzCheckout = new window.EasebuzzCheckout(key, env);
    const options = {
      access_key: `${accessKey}`,
      onResponse: async (response) => {
        //  console.log(response, "response");
        if (response.status === "success") {
          try {
            // Make API call if payment status is 'success'
            const verifyResponse = await axios.post(
              `${apiURL.baseURL}/skyTrails/api/transaction/paymentSuccess?merchantTransactionId=${response.txnid}`
            );
            setLoaderPayment(true);
          } catch (error) {
            console.error("Error verifying payment:", error);
            // Handle error
          }
        } else {
          try {
            // Make API call if payment status is 'success'
            const verifyResponse = await axios.post(
              `${apiURL.baseURL}/skyTrails/api/transaction/paymentFailure?merchantTransactionId=${response.txnid}`
            );
            //  console.log(verifyResponse.data);
            // Handle verifyResponse as needed
          } catch (error) {
            console.error("Error verifying payment:", error);
            // Handle error
          }
        }
      },
      theme: "#123456", // Replace with your desired color hex
    };

    // Initiate payment on button click
    easebuzzCheckout.initiatePayment(options);
  };

  const userId = reducerState?.logIn?.loginData?.data?.data?.id;
  // const bookingResonse=reducerState?.hotelSearchResult?.bookRoom?.BookResult?.Error?.ErrorCode;

  // const storedFormData = JSON.parse(sessionStorage.getItem("hotelFormData"));
  // console.log(storedFormData, "stored form data")
  // const data = storedFormData.dynamicFormData[0];

  const hotelCancellationPolicies =
    reducerState?.hotelSearchResult?.blockRoom?.BlockRoomResult
      ?.HotelRoomsDetails[0];
  const cancellationStartingDate =
    hotelCancellationPolicies?.CancellationPolicies[0]?.FromDate;
  const cancellationFormattedStartingDate = moment(
    cancellationStartingDate
  ).format("MMMM DD, YYYY");
  const cancellationEndingDate =
    hotelCancellationPolicies?.CancellationPolicies[0]?.ToDate;
  const cancellationFormattedEndingDate = moment(cancellationEndingDate).format(
    "MMMM DD, YYYY"
  );

  const cancellationCharge =
    hotelCancellationPolicies?.CancellationPolicies[0]?.Charge;

  const star = (data) => {
    const stars = [];
    for (let i = 0; i < data; i++) {
      stars.push(<StarIcon key={i} style={{ color: "#FF8900" }} />);
    }
    return stars;
  };
  if (loaderPayment == false) {
    return (
      <motion.div
        variants={variants}
        initial="initial"
        whileInView="animate"
        className="row"
      >
        <motion.div
          variants={variants}
          className="col-lg-12"
          style={{ marginTop: "-116px" }}
        >
          <div className="hotelDetailsDesc">
            <div>
              <p className="hotelName">{hotelInfo?.HotelDetails?.HotelName}</p>
              <Box alignItems="right">
                <Box>{star(hotelInfo?.HotelDetails?.StarRating)}</Box>
              </Box>
            </div>
            <div>
              <p className="text-start w-50">
                {" "}
                <b>Address:</b> {hotelInfo?.HotelDetails?.Address}
              </p>

              <div>
                <p className="text-end">
                  {" "}
                  <b>Check In: {"  "}</b>
                  {
                    // reducerState?.hotelSearchResult?.ticketData?.data?.data
                    //   ?.HotelSearchResult?.CheckInDate
                    dayjs(reducerState?.hotelSearchResult?.ticketData?.data?.data
                      ?.HotelSearchResult?.CheckInDate).format("DD MMM, YY")
                  }
                </p>
                <p className="text-end">
                  <b>Check Out: {"  "}</b>
                  {

                    dayjs(reducerState?.hotelSearchResult?.ticketData?.data?.data
                      ?.HotelSearchResult?.CheckOutDate).format("DD MMM, YY")
                  }
                </p>
              </div>
            </div>
            <div>
              <div className="contact">
                {/* <p>{storedFormData?.city}, India</p> */}
                <p>
                  <b>Contact: </b>
                  {hotelInfo?.HoteDetails?.HotelContactNo
                    ? hotelInfo.HotelDetails.HotelContactNo
                    : "Not Available"}
                </p>
              </div>
              <p>
                <b>Night(s) </b>
                {/* {storedFormData?.night} */}
              </p>
            </div>
          </div>
          {/* </div>
            </div> */}
        </motion.div>

        {/* booking details  */}

        <motion.div variants={variants} className="col-lg-12">
          <div className="bookingDetailsGuestDesc">
            <div className="bookingDetailsGuestHeaderDesc">
              <p>Booking Details</p>
            </div>
            <div className="bookingDetailsGuestBody">
              <div>
                <p>Hotel Name:</p>
                <p>{hotelInfo?.HotelDetails?.HotelName}</p>
              </div>
              <div>
                <p>Address: </p>
                <span>{hotelInfo?.HotelDetails?.Address}</span>
              </div>
              <div>
                <div>
                  <p>Check In: {"  "}</p>
                  <span>
                    {
                      // reducerState?.hotelSearchResult?.ticketData?.data?.data
                      //   ?.HotelSearchResult?.CheckInDate

                      dayjs(reducerState?.hotelSearchResult?.ticketData?.data?.data
                        ?.HotelSearchResult?.CheckInDate).format("DD MMM, YY")
                    }
                  </span>
                </div>
                <div>
                  <p>Check Out: {"  "} </p>
                  <span>
                    {

                      dayjs(reducerState?.hotelSearchResult?.ticketData?.data?.data
                        ?.HotelSearchResult?.CheckOutDate).format("DD MMM, YY")
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* passenger details  */}

        <motion.div variants={variants} className="col-lg-12">
          <div className="bookingDetailsGuestDesc">
            <div className="bookingDetailsGuestHeaderDesc">
              <p>Passenger Details</p>
            </div>
            {passenger?.map((name, index) => {
              return (
                <div className="passengerDetailsGuestBody">
                  <div>
                    <p>Name :</p>
                    <p>PAN : </p>
                  </div>
                  <div>
                    <span>
                      {name?.FirstName?.toUpperCase()}{" "}
                      {name?.LastName?.toUpperCase()}
                    </span>
                    <span>{name?.PAN}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* cancellation policy  */}

        <motion.div variants={variants} className="col-lg-12 mt-3">
          <div className="bookflightPassenger">
            <form>
              <div className="bookFlightPassInner">
                <div className="bookAdultIndex">
                  <p>Cancellation and Charges</p>
                </div>
                <div className="row g-3 ">
                  <div className="otherDetailsData">
                    <div className="row">
                      <div className="col-lg-4">
                        <div className="cancelAccord">
                          <span>Cancelled on or After</span>
                          <p>{cancellationFormattedStartingDate}</p>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="cancelAccord">
                          <span>Cancelled on or Before</span>
                          <p>{cancellationFormattedEndingDate}</p>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="cancelAccord">
                          <span>Cancellation Charges</span>
                          <p>{cancellationCharge}%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </motion.div>

        {/* hotel Norms  */}

        <motion.div variants={variants} className="col-lg-12 mt-3">
          <div className="bookflightPassenger">
            <form>
              <div className="bookFlightPassInner">
                <div className="bookAdultIndex">
                  <p>Hotel Facilities</p>
                </div>
                <div className="row g-3 ">
                  <div className="col-lg-12 my-4">
                    <div className="hotelReviewAmetnities">
                      <div>
                        {hotelInfo?.HotelDetails?.HotelFacilities.map(
                          (item, index) => {
                            return (
                              <p key={index}>
                                <img src={chevrondown} />
                                {item}
                              </p>
                            );
                          }
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </motion.div>

        <div className="guestDetailsHistoryDesc mt-3">
          <button type="submit" onClick={handlePayment}>
            Continue
          </button>
        </div>
      </motion.div>
    );
  } else {
    return <PaymentLoader />;
  }
};

export default Hoteldescription;
