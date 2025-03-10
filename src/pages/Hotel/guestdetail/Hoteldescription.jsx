import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./hoteldescription.css";
import { hotelBookRoomAction } from "../../../Redux/Hotel/hotel";
import StarIcon from "@mui/icons-material/Star";
import { apiURL } from "../../../Constants/constant";
import chevrondown from "../../../images/chevrondown.svg";
import { motion } from "framer-motion";
import PaymentLoader from "../../flight/FlightLoader/paymentLoader";
import axios from "axios";
import dayjs from "dayjs";
import { SpinnerCircular } from "spinners-react";
import { swalModal } from "../../../utility/swal";
import {
  convertMillisecondsToMinutesAndSeconds,
  checkSearchTime,
} from "../../../utility/utils";
import flightPaymentLoding from "../../../images/loading/loading-ban.gif";
import Modal from "@mui/material/Modal";
import SecureStorage from "react-secure-storage";

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

const Hoteldescription = ({
  toggleState,
  setCouponAmountFun,
  couponAmount,
}) => {
  const couponconfirmation3 = async () => {
    try {
      const token = SecureStorage.getItem("jwtToken");
      const response = await axios.get(
        `${
          apiURL.baseURL
        }/skyTrails/api/coupons/couponApplied/${sessionStorage.getItem(
          "couponCode"
        )}`,

        {
          headers: {
            token: token,
          },
        }
      );
      // sessionStorage.removeItem("totalaftercoupon");
      // sessionStorage.removeItem("couponCode");
    } catch (error) {
      // console.log(error);
    }
  };

  const apiUrlPayment = `${apiURL.baseURL}/skyTrails/api/transaction/easebussPayment`;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [SessionTImeLeft, setSessionTimeLeft] = useState(0);
  const [timer_11, setTimer11] = useState(false);
  const [sub, setSub] = useState(false);
  const [loaderPayment1, setLoaderPayment1] = useState(false);
  const [loaderPayment, setLoaderPayment] = useState(false);
  const reducerState = useSelector((state) => state);
  const [isDisableScroll, setIsDisableScroll] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    setIsLogin(reducerState?.logIn?.isLogin);
  }, [reducerState?.logIn?.isLogin]);

  const bookingId =
    reducerState?.hotelSearchResult?.bookRoom?.BookResult?.BookingId;

  let bookingStatus =
    reducerState?.hotelSearchResult?.bookRoom?.BookResult?.Status || false;
  const passenger = reducerState?.passengers?.passengersData;

  console.log(passenger, "passenger");

  // console.log(reducerState, "passenger");
  // useEffect(() => {
  //   // console.log(couponAmount, "couponAmount..................");
  // }, [couponAmount]);
  useEffect(() => {
    if (isDisableScroll) {
      document.body.classList.add("disableTrue");
      document.body.classList.remove("disableFalse");
    } else {
      document.body.classList.remove("disableTrue");
      document.body.classList.add("disableFalse");
    }
    return () => {
      document.body.classList.add("disableFalse");

      document.body.classList.remove("disableTrue");
    };
  }, [isDisableScroll]);

  const hotelBlockDetails =
    reducerState?.hotelSearchResult?.blockRoom?.BlockRoomResult;
  const hotelDetails = hotelBlockDetails?.HotelRoomsDetails;
  const resultIndex = sessionStorage.getItem("ResultIndex");
  const hotelCode = sessionStorage.getItem("HotelCode");
  const [bookingSuccess, setBookingSuccess] = useState(bookingStatus);
  const markUpamount =
    reducerState?.markup?.markUpData?.data?.result[0]?.hotelMarkup;

  const hotelInfo = reducerState?.hotelSearchResult?.hotelInfo?.HotelInfoResult;

  const getBookingDetails =
    reducerState?.hotelSearchResult?.blockRoom?.BlockRoomResult
      ?.HotelRoomsDetails;

  const totalAmount = getBookingDetails?.reduce((accumulator, item) => {
    return accumulator + item?.Price?.PublishedPriceRoundedOff;
  }, 0);
  useEffect(() => {
    if (
      reducerState?.hotelSearchResult?.bookRoom?.BookResult?.Error?.ErrorCode ==
      0
    ) {
      setLoaderPayment(false);
      navigate(
        "/hotel/hotelsearch/HotelBooknow/Reviewbooking/GuestDetail/ticket"
      );
      return;
    } else if (
      reducerState?.hotelSearchResult?.bookRoom?.BookResult?.Error
        ?.ErrorCode !== 0 &&
      reducerState?.hotelSearchResult?.bookRoom?.BookResult?.Error
        ?.ErrorCode !== undefined
    ) {
      swalModal(
        "py",
        "Booking Issue - Your refund will be processed within 7 working days. We apologize for any inconvenience caused.",
        true
      );
    }
  }, [reducerState?.hotelSearchResult?.bookRoom?.BookResult]);
  useEffect(() => {
    if (loaderPayment == true) {
      handleClickBooking();
    }
  }, [loaderPayment]);

  // console.log(reducerState, "reducer state")

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

  const [paymentLoading, setPaymentLoading] = useState(false);

  // balance subtract and update
  const handlePayment = async () => {
    setPaymentLoading(true);
    setIsDisableScroll(true);
    setSub(true);
    setLoaderPayment1(true);
    if (!checkSearchTime()) {
      navigate("/");
      return;
    } else {
      const token = SecureStorage?.getItem("jwtToken");
      const payload = {
        firstname: passenger[0].FirstName,
        phone: passenger[0].Phoneno,
        // amount: sessionStorage?.getItem("hotelAmount") || (totalAmount + markUpamount),
        amount: couponAmount || totalAmount + markUpamount * totalAmount,

        // amount: 1,
        email: passenger[0].Email,
        productinfo: "ticket",
        bookingType: "HOTELS",
        surl: `${apiURL.baseURL}/skyTrails/successVerifyApi?merchantTransactionId=`,
        furl: `${apiURL.baseURL}/skyTrails/paymentFailure?merchantTransactionId=`,
      };
      // console.log("paylod///////", payload);

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

          // setPaymentLoading(false);

          proceedPayment(data.result.access, "prod", data.result.key);
          // console.log("API call successful:", data);
        } else {
          console.error("API call failed with status:", response.status);
          const errorData = await response.json();
          console.error("Error details:", errorData);
          setTimer11(false);
          setIsDisableScroll(false);
        }
      } catch (error) {
        // Handle network errors or exceptions
        console.error("API call failed with an exception:", error.message);
        setIsDisableScroll(false);
      } finally {
        setPaymentLoading(false); // Reset loading state regardless of success or failure
        setLoaderPayment1(false);
      }
    }
  };

  // useEffect(() => {
  //   if (sub) {
  //     const checkSearchTime = () => {
  //       const lastSearchTime = new Date(sessionStorage.getItem('SessionExpireTime'));
  //       if (lastSearchTime) {
  //         const currentTime = new Date();
  //         const ttt = currentTime.getTime() - lastSearchTime.getTime()
  //         const tttt = ttt / 60000;

  //         const differenceInMinutes = Math.floor((currentTime.getTime() - lastSearchTime.getTime()) / (1000 * 60));
  //         // const differenceInMinutes = currentTime - lastSearchTime;
  //         if (differenceInMinutes < 3 && !timer_11) {
  //           console.log('Search time is less than 15 minutes ago.');
  //           setSessionTimeLeft(convertMillisecondsToMinutesAndSeconds(currentTime.getTime() - lastSearchTime.getTime()));
  //           setTimer11(true);

  //         }
  //         // else if (differenceInMinutes <= 15) {
  //         //   // console.log('Search time is more than 15 minutes ago.');
  //         //   swalModal("flight", "Session is Expired", false);
  //         //   navigate("/");
  //         //   sessionStorage.removeItem("SessionExpireTime");
  //         // }
  //         // else {

  //         console.log(tttt, differenceInMinutes, lastSearchTime, currentTime, SessionTImeLeft, "timeleft......")
  //         // }
  //       }
  //     };

  //     const interval = setInterval(checkSearchTime, 5000); // Check every second

  //     return () => clearInterval(interval); // Clean up the interval
  //   }
  // }, [sub]);
  const proceedPayment = (accessKey, env, key) => {
    const easebuzzCheckout = new window.EasebuzzCheckout(key, env);
    const options = {
      access_key: `${accessKey}`,
      onResponse: async (response) => {
        //  console.log(response, "response");
        if (response.status === "success") {
          try {
            // Make API call if payment status is 'success'
            const easeBuzzPayId = response.easepayid;
            const verifyResponse = await axios.post(
              `${apiURL.baseURL}/skyTrails/api/transaction/paymentSuccess?merchantTransactionId=${response.txnid}`,
              { easeBuzzPayId: easeBuzzPayId }
            );
            setLoaderPayment(true);
            couponconfirmation3();
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
            // console.log(verifyResponse.data);
            // Handle verifyResponse as needed
            swalModal("hotel", verifyResponse.data.responseMessage, false);

            sessionStorage.removeItem("couponCode");
            toggleState(false);
            setCouponAmountFun(null);
          } catch (error) {
            console.error("Error verifying payment:", error);
            // Handle error
          } finally {
            setIsDisableScroll(false);
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

  const storedFormData = JSON.parse(sessionStorage.getItem("hotelFormData"));
  // console.log(storedFormData, "stored form data")
  // const data = storedFormData.dynamicFormData[0];

  const hotelCancellationPolicies =
    reducerState?.hotelSearchResult?.blockRoom?.BlockRoomResult
      ?.HotelRoomsDetails[0];
  const cancellationStartingDate =
    hotelCancellationPolicies?.CancellationPolicies[0]?.FromDate;
  const cancellationFormattedStartingDate = dayjs(
    cancellationStartingDate
  ).format("DD MMM, YY");
  const cancellationEndingDate =
    hotelCancellationPolicies?.CancellationPolicies[0]?.ToDate;
  const cancellationFormattedEndingDate = dayjs(cancellationEndingDate).format(
    "DD MMM, YY"
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
        <motion.div variants={variants} className="col-lg-12 reviewTMT">
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
                    dayjs(
                      reducerState?.hotelSearchResult?.ticketData?.data?.data
                        ?.HotelSearchResult?.CheckInDate
                    ).format("DD MMM, YY")
                  }
                </p>
                <p className="text-end">
                  <b>Check Out: {"  "}</b>
                  {dayjs(
                    reducerState?.hotelSearchResult?.ticketData?.data?.data
                      ?.HotelSearchResult?.CheckOutDate
                  ).format("DD MMM, YY")}
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

                      dayjs(
                        reducerState?.hotelSearchResult?.ticketData?.data?.data
                          ?.HotelSearchResult?.CheckInDate
                      ).format("DD MMM, YY")
                    }
                  </span>
                </div>
                <div>
                  <p>Check Out: {"  "} </p>
                  <span>
                    {dayjs(
                      reducerState?.hotelSearchResult?.ticketData?.data?.data
                        ?.HotelSearchResult?.CheckOutDate
                    ).format("DD MMM, YY")}
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
              <p>Guest Details</p>
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
          {paymentLoading ? (
            <button type="submit" onClick={handlePayment}>
              <SpinnerCircular
                secondaryColor="white"
                size={20}
                сolor="#ffffff"
              />
            </button>
          ) : (
            <button type="submit" onClick={handlePayment}>
              Continue
            </button>
          )}
        </div>
        <Modal open={loaderPayment1} onClose={loaderPayment1}>
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img src={flightPaymentLoding} alt="" />
            {/* <h1>ghiiiii</h1> */}
          </div>
        </Modal>
      </motion.div>
    );
  } else {
    return <PaymentLoader />;
  }
};

export default Hoteldescription;
