import * as React from "react";

import PriceSummaryGRN from "./PriceSummaryGRN";
import PriceSummaryGRNcoupon from "./PriceSummaryGRNcoupon";
import { useState, useRef } from "react";
import { Box } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useDispatch, useSelector, useReducer } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import hotelNotFound from "../../images/hotelNotFound.jpg";
import chevrondown from "../../images/chevrondown.svg";
import Modal from "@mui/material/Modal";
import dayjs from "dayjs";
import { hotelBookRoomActionGRN } from "../../Redux/HotelGRN/hotel";
import { apiURL } from "../../Constants/constant";
import axios from "axios";
import { SpinnerCircular } from "spinners-react";
import { swalModal } from "../../utility/swal";
import { checkSearchTime } from "../../utility/utils";
import flightPaymentLoding from "../../images/loading/loading-ban.gif";
import SecureStorage from "react-secure-storage";
import Amenities from "./Amenities";
import freeWifi from "./SVGs/freeWifi.svg";
import freeBreakfast from "./SVGs/freeBreakfast.svg";
import freeParking from "./SVGs/freeParking.svg";
import drinkingWater from "./SVGs/DrinkingWater.svg";
import expressCheckin from "./SVGs/expressCheckin.svg";
import welcomeDrink from "./SVGs/welcomeDrink.svg";
import freeGym from "./SVGs/freeGym.svg";
import HotelGalleryCarousel from "./HotelGalleryCarousel";
import "./bookingreviewGRN.scss";
import { Button } from "antd";

const BookingReviewGRN = ({
  toggleState,
  setCouponAmountFun,
  couponAmount,
}) => {
  // const couponconfirmation3 = async () => {
  //     try {
  //         const token = SecureStorage.getItem("jwtToken");
  //         const response = await axios.get(
  //             `${apiURL.baseURL
  //             }/skyTrails/api/coupons/couponApplied/${sessionStorage.getItem(
  //                 "couponCode"
  //             )}`,

  //             {
  //                 headers: {
  //                     token: token,
  //                 },
  //             }
  //         );
  //     } catch (error) {
  //         // console.log(error);
  //     }
  // };

  const apiUrlPayment = `${apiURL.baseURL}/skyTrails/api/transaction/easebussPayment`;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [loader, setLoader] = useState(false);
  const reducerState = useSelector((state) => state);
  // const authenticUser = reducerState?.logIn?.loginData?.status;
  let bookingStatus =
    reducerState?.hotelSearchResult?.bookRoom?.BookResult?.Status || false;
  // const [bookingSuccess, setBookingSuccess] = useState(bookingStatus);
  const [loaderPayment1, setLoaderPayment1] = useState(false);
  const [loaderPayment, setLoaderPayment] = useState(false);
  const hotelinfoGRN = reducerState?.hotelSearchResultGRN?.hotelRoom?.hotel;
  const hotelMainReducer =
    reducerState?.hotelSearchResultGRN?.ticketData?.data?.data;
  const passenger = reducerState?.passengers?.passengersData;
  const [isDisableScroll, setIsDisableScroll] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const markUpamount =
    reducerState?.markup?.markUpData?.data?.result[0]?.hotelMarkup *
    Number(hotelinfoGRN?.rate?.price);

  const star = (data) => {
    const stars = [];
    for (let i = 0; i < data; i++) {
      stars.push(<StarIcon key={i} style={{ color: "#FF8900" }} />);
    }
    return stars;
  };

  const couponconfirmation3 = async () => {
    try {
      const token = SecureStorage.getItem("jwtToken");
      const response = await axios.get(
        `${apiURL.baseURL}/skyTrails/api/coupons/couponApplied/${couponvalue}`,

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
  useEffect(() => {
    if (reducerState?.hotelSearchResultGRN?.bookRoom?.status === "confirmed") {
      setLoaderPayment(false);
      couponconfirmation3();
      navigate("/st-hotel/hotelresult/selectroom/guestDetails/review/ticket", {
        state: { finalamount: finalAmount },
      });
      return;
    }
  }, [reducerState?.hotelSearchResultGRN?.bookRoom?.status]);

  useEffect(() => {
    if (
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
  }, [reducerState?.hotelSearchResult?.bookRoom]);

  useEffect(() => {
    if (loaderPayment == true) {
      handleClickBooking();
    }
  }, [loaderPayment]);

  function generateMixedString() {
    const fixedText = "skyTrails_";
    const currentTime = Date.now().toString(); //add current time
    return fixedText + currentTime;
  }

  const mixedString = generateMixedString();

  const clientNationality = JSON.parse(
    sessionStorage.getItem("clientNationality")
  );

  const handleClickBooking = async () => {
    const payload = {
      search_id:
        reducerState?.hotelSearchResultGRN?.hotelDetails?.data?.data?.search_id,
      hotel_code: hotelinfoGRN?.hotel_code,
      city_code: hotelinfoGRN?.city_code,
      group_code: hotelinfoGRN?.rate?.group_code,
      checkout: hotelMainReducer?.checkout,
      checkin: hotelMainReducer?.checkin,
      booking_comments: "Test booking",
      payment_type: "AT_WEB",
      agent_reference: mixedString,
      booking_items: [
        {
          room_code: hotelinfoGRN?.rate?.room_code,
          rate_key: hotelinfoGRN?.rate?.rate_key,
          rooms: passenger.map((item, index) => ({
            room_reference: hotelinfoGRN?.rate?.rooms?.[index]?.room_reference,
            paxes: [
              ...item.adults.map((adult) => ({
                title: adult.Title,
                name: adult.FirstName,
                surname: adult.LastName,
                type: "AD",
              })),
              ...item.children.map((child) => ({
                title: child.Title,
                name: child.FirstName,
                surname: child.LastName,
                type: "CH",
                age: child.age,
              })),
            ],
          })),
        },
      ],
      holder: {
        title: passenger?.[0]?.adults?.[0]?.Title,
        name: passenger?.[0]?.adults?.[0]?.FirstName,
        surname: passenger?.[0]?.adults?.[0]?.LastName,
        email: passenger?.[0]?.adults?.[0]?.Email,
        phone_number: passenger?.[0]?.adults?.[0]?.Phoneno,
        client_nationality: clientNationality,
        pan_number: passenger?.[0]?.adults?.[0]?.PAN,
      },
    };

    dispatch(hotelBookRoomActionGRN(payload));
  };

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

  const [paymentLoading, setPaymentLoading] = useState(false);

  const [finalAmount, setFinalAmount] = useState(0);
  const [couponvalue, setCouponValue] = useState("");

  const handleFinalAmountChange = (amount) => {
    setFinalAmount(amount);
  };

  const handlecouponChange = (code) => {
    setCouponValue(code);
  };

  //   const couponconfirmation3 = async () => {
  //     try {
  //       const token = SecureStorage.getItem("jwtToken");
  //       const response = await axios.get(
  //         `${apiURL.baseURL
  //         }/skyTrails/api/coupons/couponApplied/${couponvalue}`,

  //         {
  //           headers: {
  //             token: token,
  //           },
  //         }
  //       );
  //       // sessionStorage.removeItem("totalaftercoupon");
  //       // sessionStorage.removeItem("couponCode");
  //     } catch (error) {
  //       // console.log(error);
  //     }
  //   };

  //   console.log(couponvalue,couponvalue,"couponvalue");

  const handlePayment = async () => {
    setPaymentLoading(true);
    setIsDisableScroll(true);
    // setSub(true);
    setLoaderPayment1(true);
    if (!checkSearchTime()) {
      navigate("/st-hotel");
      return;
    } else {
      const token = SecureStorage?.getItem("jwtToken");
      const payload = {
        firstname: passenger?.[0]?.adults?.[0]?.FirstName,
        phone: passenger?.[0]?.adults?.[0]?.Phoneno,
        // amount: 1,
        amount: Number(finalAmount).toFixed(2),
        email: passenger?.[0]?.adults?.[0]?.Email,
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
        } else {
          console.error("API call failed with status:", response.status);
          const errorData = await response.json();
          console.error("Error details:", errorData);
          setIsDisableScroll(false);
        }
      } catch (error) {
        console.error("API call failed with an exception:", error.message);
        setIsDisableScroll(false);
      } finally {
        setPaymentLoading(false);
        setLoaderPayment1(false);
      }
    }
  };

  const proceedPayment = (accessKey, env, key) => {
    const easebuzzCheckout = new window.EasebuzzCheckout(key, env);
    const options = {
      access_key: `${accessKey}`,
      onResponse: async (response) => {
        if (response.status === "success") {
          try {
            const easeBuzzPayId = response.easepayid;
            const verifyResponse = await axios.post(
              `${apiURL.baseURL}/skyTrails/api/transaction/paymentSuccess?merchantTransactionId=${response.txnid}`,
              { easeBuzzPayId: easeBuzzPayId }
            );
            setLoaderPayment(true);
            setLoadingButton(true);
            // couponconfirmation3();
            // couponconfirmation3();
          } catch (error) {
            console.error("Error verifying payment:", error);
            // Handle error
          }
        } else {
          try {
            const verifyResponse = await axios.post(
              `${apiURL.baseURL}/skyTrails/api/transaction/paymentFailure?merchantTransactionId=${response.txnid}`
            );
            swalModal("hotel", verifyResponse.data.responseMessage, false);

            sessionStorage.removeItem("couponCode");
            toggleState(false);
            // setCouponAmountFun(null);
          } catch (error) {
            console.error("Error verifying payment:", error);
            // Handle error
          } finally {
            setIsDisableScroll(false);
          }
        }
      },
      theme: "#123456",
    };

    easebuzzCheckout.initiatePayment(options);
  };
  const hotelGallery =
    reducerState?.hotelSearchResultGRN?.hotelGallery?.data?.data?.images
      ?.regular;

  return (
    <>
      <div className="my-4 ">
        <div className="container bookingReviewMain">
          <div className="row">
            <HotelGalleryCarousel data={hotelGallery} />
          </div>
          <div className="row gy-4">
            <div className="col-lg-8">
              <div className="row">
                <div className="mb-2 col-lg-12">
                  <div className="roomNameAndCategoryOuter">
                    <h3 className="hotelNameHeading">{hotelinfoGRN?.name}</h3>
                    <div className="roomNameAndCategory">
                      {/* <div >
                                            <h5 className="HotelRoomHeadings">{hotelinfoGRN?.name}</h5>
                                        </div> */}

                      <div className="hotelBookDesignFirst">
                        <div>
                          <StarIcon style={{ color: "#FF8900" }} />{" "}
                          {hotelinfoGRN?.category}
                        </div>

                        <div className="">
                          <a
                            href={`https://www.google.com/maps?q=${hotelinfoGRN?.geolocation?.latitude},${hotelinfoGRN?.geolocation?.longitude}`}
                            target="_blank"
                          >
                            <svg
                              id="fi_2838912"
                              enable-background="new 0 0 512 512"
                              height="15"
                              viewBox="0 0 512 512"
                              width="20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g>
                                <path d="m243.519 505.32c2.782 4.173 7.466 6.68 12.481 6.68s9.699-2.506 12.481-6.68c35.499-53.247 87.786-119.008 124.222-185.889 29.134-53.476 43.297-99.085 43.297-139.431 0-99.252-80.748-180-180-180s-180 80.748-180 180c0 40.346 14.163 85.955 43.297 139.431 36.409 66.83 88.796 132.752 124.222 185.889zm12.481-475.32c82.71 0 150 67.29 150 150 0 35.204-12.967 76.118-39.641 125.079-31.407 57.649-76.225 116.128-110.359 165.29-34.129-49.155-78.95-107.638-110.359-165.29-26.674-48.961-39.641-89.875-39.641-125.079 0-82.71 67.29-150 150-150z"></path>
                                <path d="m256 270c49.626 0 90-40.374 90-90s-40.374-90-90-90-90 40.374-90 90 40.374 90 90 90zm0-150c33.084 0 60 26.916 60 60s-26.916 60-60 60-60-26.916-60-60 26.916-60 60-60z"></path>
                              </g>
                            </svg>{" "}
                            see on map
                          </a>
                        </div>
                      </div>
                      <div>
                        <p className="text-start">{hotelinfoGRN?.address}</p>
                      </div>

                      <div className="roomDetailsIconBox">
                        <div>
                          <span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="22"
                              viewBox="0 0 512 512"
                              id="fi_3030336"
                            >
                              <path d="M496,344h-8V280a32.042,32.042,0,0,0-32-32V112a32.042,32.042,0,0,0-32-32H88a32.042,32.042,0,0,0-32,32V248a32.042,32.042,0,0,0-32,32v64H16a8,8,0,0,0-8,8v32a8,8,0,0,0,8,8h8v32a8,8,0,0,0,8,8H56a7.99,7.99,0,0,0,7.84-6.43L70.56,392H441.44l6.72,33.57A7.99,7.99,0,0,0,456,432h24a8,8,0,0,0,8-8V392h8a8,8,0,0,0,8-8V352A8,8,0,0,0,496,344ZM72,112A16.021,16.021,0,0,1,88,96H424a16.021,16.021,0,0,1,16,16V248H424V216a32.042,32.042,0,0,0-32-32H296a32.042,32.042,0,0,0-32,32v32H248V216a32.042,32.042,0,0,0-32-32H120a32.042,32.042,0,0,0-32,32v32H72ZM408,216v32H280V216a16.021,16.021,0,0,1,16-16h96A16.021,16.021,0,0,1,408,216Zm-176,0v32H104V216a16.021,16.021,0,0,1,16-16h96A16.021,16.021,0,0,1,232,216ZM40,280a16.021,16.021,0,0,1,16-16H456a16.021,16.021,0,0,1,16,16v64H40Zm9.44,136H40V392H54.24ZM472,416h-9.44l-4.8-24H472Zm16-40H24V360H488Z"></path>
                            </svg>
                          </span>
                          <p>{hotelMainReducer?.no_of_rooms} Room</p>
                        </div>
                        <div>
                          <span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="18"
                              height="18"
                              data-name="Layer 1"
                              id="fi_15905666"
                              viewBox="0 0 128 128"
                            >
                              <title></title>
                              <path d="M71.1311,69.39221a28.51557,28.51557,0,0,1-3.96509.53815l5.7627,36.36652.04639.21484a1.81609,1.81609,0,0,1-.62988,1.59961l-8.08105,7.73633a1.76551,1.76551,0,0,1-.229.13477,1.82424,1.82424,0,0,1-.22754-.13379L55.936,108.28809l-.21094-.17676a2.03318,2.03318,0,0,1-.70654-1.70508l6.25256-36.41162a28.63177,28.63177,0,0,1-4.00427-.31079L51.105,105.5791a5.99952,5.99952,0,0,0,2.147,5.67676l7.894,7.582.2085.1748a4.14377,4.14377,0,0,0,5.36133.001l8.10254-7.75781a5.78748,5.78748,0,0,0,2.04639-5.67773Z"></path>
                              <path d="M37.17383,62A31.201,31.201,0,0,0,6,93.15723V126a2,2,0,0,0,4,0V93.15723A27.19614,27.19614,0,0,1,37.17383,66h9.72034a29.94772,29.94772,0,0,1-5.3288-4Z"></path>
                              <path d="M90.82617,62H85.18024a29.94772,29.94772,0,0,1-5.3288,4H90.82617A27.19614,27.19614,0,0,1,118,93.15723V126a2,2,0,0,0,4,0V93.15723A31.201,31.201,0,0,0,90.82617,62Z"></path>
                              <path d="M36.20361,21.9209A28.33521,28.33521,0,0,0,35.74561,27V39c0,14.8877,11.542,27,25.729,27H65.271C79.458,66,91,53.8877,91,39V27C91,12.1123,79.458,0,65.271,0H33a1.99986,1.99986,0,0,0-1.999,2.06055,26.11172,26.11172,0,0,0,3.78809,11.97559A11.13086,11.13086,0,0,1,36.20361,21.9209ZM65.271,4C77.25244,4,87,14.31738,87,27V39c0,12.68262-9.74756,23-21.729,23H61.47461c-11.98145,0-21.729-10.31738-21.729-23V27a24.36727,24.36727,0,0,1,.39307-4.36133A14.96578,14.96578,0,0,0,38.167,11.89355,21.86126,21.86126,0,0,1,35.24316,4Z"></path>
                              <path d="M33,96H25a2,2,0,0,0,0,4h8a2,2,0,0,0,0-4Z"></path>
                              <path d="M99,96H91a2,2,0,0,0,0,4h8a2,2,0,0,0,0-4Z"></path>
                            </svg>
                          </span>
                          <p>{hotelMainReducer?.no_of_adults} Adult</p>
                        </div>

                        {hotelMainReducer?.no_of_children > 0 && (
                          <div>
                            <span>
                              <svg
                                id="fi_9710082"
                                enable-background="new 0 0 512.001 512.001"
                                height="18"
                                viewBox="0 0 512.001 512.001"
                                width="18"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g>
                                  <g>
                                    <path d="m279.096 255.003c-4.709-2.883-10.865-1.402-13.75 3.309-1.113 1.819-4.822 3.753-9.501 3.753-4.578 0-8.208-1.83-9.427-3.638-3.09-4.579-9.305-5.786-13.883-2.699-4.579 3.089-5.787 9.304-2.699 13.883 5.182 7.682 15.147 12.454 26.009 12.454 11.356 0 21.533-5.101 26.56-13.312 2.883-4.71 1.402-10.866-3.309-13.75z"></path>
                                    <path d="m319.806 227.526-.006.004c-6.894 4.595-8.753 13.906-4.157 20.799 2.89 4.336 7.646 6.68 12.494 6.68 2.86 0 5.752-.816 8.31-2.521 6.894-4.595 8.756-13.908 4.16-20.801s-13.909-8.755-20.801-4.161z"></path>
                                    <path d="m175.56 227.526-.006.004c-6.894 4.595-8.753 13.906-4.157 20.799 2.89 4.336 7.646 6.68 12.494 6.68 2.86 0 5.752-.816 8.31-2.521 6.894-4.595 8.756-13.908 4.16-20.801s-13.909-8.755-20.801-4.161z"></path>
                                    <path d="m457.178 181.786v-12.237c0-45.111-17.686-87.641-49.799-119.753-32.112-32.111-74.64-49.796-119.751-49.796h-63.256c-40.466 0-79.717 14.641-110.521 41.227-4.182 3.608-4.646 9.923-1.037 14.104 3.607 4.181 9.923 4.647 14.104 1.037 27.174-23.452 61.785-36.368 97.455-36.368h63.256c82.462 0 149.55 67.087 149.55 149.549v7.95h-25.859c-47.086 0-79.899-21.081-79.899-40 0-5.522-4.478-10-10-10s-10 4.478-10 10c0 18.919-32.813 40-79.899 40h-156.699v-7.95c0-14.343 2.065-28.566 6.138-42.277 1.572-5.294-1.444-10.861-6.738-12.434-5.297-1.575-10.862 1.445-12.434 6.738-4.622 15.561-6.966 31.701-6.966 47.973v12.237c-16.977 7.653-28.823 24.737-28.823 44.535 0 26.921 21.901 48.822 48.822 48.822h18.845c10.86 27.151 29.873 50.82 54.359 68.591-25.243 27.211-39.526 63.137-39.526 100.227v58.04c0 5.522 4.478 10 10 10h275c5.522 0 10-4.478 10-10v-58.04c0-37.09-14.283-73.018-39.526-100.227 24.487-17.771 43.499-41.439 54.359-68.591h18.845c26.921 0 48.822-21.901 48.822-48.822 0-19.798-11.845-36.882-28.822-44.535zm-382.355 73.358c-15.893 0-28.823-12.93-28.823-28.823s12.93-28.822 28.822-28.822h8.678v25c0 11.194 1.319 22.115 3.822 32.645zm53.677 211.857h37.5v25h-37.5zm217.5 25v-25h37.5v25zm37.5-48.04v3.04h-37.5v-13.235c0-5.522-4.478-10-10-10s-10 4.478-10 10v58.235h-140v-58.235c0-5.522-4.478-10-10-10s-10 4.478-10 10v13.235h-37.5v-3.04c0-33.248 13.301-65.427 36.692-89.247 12.766 7.156 26.638 12.852 41.328 16.825.736 26.656 22.649 48.115 49.48 48.115s48.745-21.458 49.48-48.115c14.69-3.973 28.562-9.669 41.328-16.825 23.391 23.818 36.692 55.998 36.692 89.247zm-156.443-68.092c9.413 1.44 19.083 2.191 28.944 2.191s19.531-.751 28.944-2.191c-2.668 13.54-14.632 23.785-28.944 23.785s-26.276-10.245-28.944-23.785zm28.943-17.809c-84.089 0-152.5-60.812-152.5-135.561v-25h128.021c40.017 0 73.842-13.45 89.899-33.398 15.679 19.478 48.298 32.76 87.079 33.376l.001 25.022c0 74.748-68.411 135.561-152.5 135.561zm181.178-102.916h-12.5c2.503-10.53 3.822-21.451 3.822-32.645l-.001-25h8.678c15.893 0 28.822 12.93 28.822 28.822s-12.928 28.823-28.821 28.823z"></path>
                                    <path d="m281 444.837h-50c-5.522 0-10 4.478-10 10s4.478 10 10 10h50c5.522 0 10-4.478 10-10s-4.477-10-10-10z"></path>
                                    <path d="m90.264 93.374c.414 0 .832-.025 1.253-.078 5.48-.686 9.367-5.683 8.683-11.163-.686-5.48-5.682-9.377-11.163-8.683l-.008.001c-5.48.686-9.363 5.683-8.679 11.163.633 5.059 4.943 8.76 9.914 8.76z"></path>
                                  </g>
                                </g>
                              </svg>
                            </span>
                            <p>{hotelMainReducer?.no_of_children} Child</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* room details area  */}

                <div className="col-lg-12 mt-3 mb-2">
                  <div className="roomNameAndCategoryOuter">
                    <h3 className="hotelNameHeading">
                      Room Type : {hotelinfoGRN?.rate?.rooms?.[0]?.description}
                    </h3>
                    <div className="roomNameAndCategory">
                      <div className="roomTitle">
                        {/* <h5 className="HotelRoomHeadings1">Room Type : {" "}{hotelinfoGRN?.rate?.rooms?.[0]?.description}</h5> */}

                        <h5 className="HotelRoomHeadings2">
                          {hotelinfoGRN?.rate?.boarding_details?.[0]}
                        </h5>
                      </div>

                      <div className="othInc">
                        {hotelinfoGRN?.rate?.pan_required && (
                          <div className="othIncInner">
                            <div className="d-flex justify-content-start align-items-center gap-2">
                              <svg
                                id="fi_3596091"
                                enable-background="new 0 0 24 24"
                                height="20"
                                viewBox="0 0 24 24"
                                width="20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g>
                                  <path d="m21.5 21h-19c-1.378 0-2.5-1.122-2.5-2.5v-13c0-1.378 1.122-2.5 2.5-2.5h19c1.378 0 2.5 1.122 2.5 2.5v13c0 1.378-1.122 2.5-2.5 2.5zm-19-17c-.827 0-1.5.673-1.5 1.5v13c0 .827.673 1.5 1.5 1.5h19c.827 0 1.5-.673 1.5-1.5v-13c0-.827-.673-1.5-1.5-1.5z"></path>
                                </g>
                                <g>
                                  <path d="m7.5 12c-1.378 0-2.5-1.122-2.5-2.5s1.122-2.5 2.5-2.5 2.5 1.122 2.5 2.5-1.122 2.5-2.5 2.5zm0-4c-.827 0-1.5.673-1.5 1.5s.673 1.5 1.5 1.5 1.5-.673 1.5-1.5-.673-1.5-1.5-1.5z"></path>
                                </g>
                                <g>
                                  <path d="m11.5 17c-.276 0-.5-.224-.5-.5v-1c0-.827-.673-1.5-1.5-1.5h-4c-.827 0-1.5.673-1.5 1.5v1c0 .276-.224.5-.5.5s-.5-.224-.5-.5v-1c0-1.378 1.122-2.5 2.5-2.5h4c1.378 0 2.5 1.122 2.5 2.5v1c0 .276-.224.5-.5.5z"></path>
                                </g>
                                <g>
                                  <path d="m20.5 9h-6c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h6c.276 0 .5.224.5.5s-.224.5-.5.5z"></path>
                                </g>
                                <g>
                                  <path d="m20.5 13h-6c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h6c.276 0 .5.224.5.5s-.224.5-.5.5z"></path>
                                </g>
                                <g>
                                  <path d="m20.5 17h-6c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h6c.276 0 .5.224.5.5s-.224.5-.5.5z"></path>
                                </g>
                              </svg>
                              <p className="panDesign">Pan Required</p>
                            </div>
                          </div>
                        )}
                        {hotelinfoGRN?.rate?.non_refundable && (
                          <div className="othIncInner">
                            <div className="d-flex justify-content-start align-items-center gap-2">
                              <svg
                                id="fi_2610380"
                                enable-background="new 0 0 30 30"
                                height="20"
                                viewBox="0 0 30 30"
                                width="20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="m15 0c-4.00684 0-7.77344 1.56055-10.60645 4.39355s-4.39355 6.6001-4.39355 10.60645 1.56055 7.77344 4.39355 10.60645 6.59961 4.39355 10.60645 4.39355 7.77344-1.56055 10.60645-4.39355 4.39355-6.6001 4.39355-10.60645-1.56055-7.77344-4.39355-10.60645-6.59961-4.39355-10.60645-4.39355zm-9.19238 24.19238c-2.45508-2.45556-3.80762-5.72021-3.80762-9.19238 0-3.13605 1.11255-6.09662 3.13507-8.45087l18.31592 18.31592c-2.35388 2.02283-5.31445 3.13495-8.45099 3.13495-3.47266 0-6.7373-1.35205-9.19238-3.80762zm19.05731-.74151-18.31592-18.31592c2.35388-2.02283 5.31445-3.13495 8.45099-3.13495 3.47266 0 6.7373 1.35205 9.19238 3.80762s3.80762 5.72021 3.80762 9.19238c0 3.13605-1.11255 6.09662-3.13507 8.45087z"
                                  fill="rgb(0,0,0)"
                                ></path>
                              </svg>
                              <p className="panDesign2">Non Refundable</p>
                            </div>
                          </div>
                        )}
                        {hotelinfoGRN?.rate?.cancellation_policy && (
                          <div className="othIncInner">
                            <div className="d-flex justify-content-start align-items-center gap-2">
                              <svg
                                id="fi_7444875"
                                height="20"
                                viewBox="0 0 128 128"
                                width="20"
                                xmlns="http://www.w3.org/2000/svg"
                                data-name="Layer 1"
                              >
                                <path d="m11.59 65.89 11.19 8a2 2 0 0 0 2.79-.47l8-11.19a2 2 0 1 0 -3.27-2.33l-5.18 7.25a41.82 41.82 0 1 1 79.64 6.11 2 2 0 0 0 1.12 2.6 2 2 0 0 0 .74.14 2 2 0 0 0 1.86-1.26 45.82 45.82 0 1 0 -87.31-6.92l-7.26-5.18a2 2 0 1 0 -2.32 3.25z"></path>
                                <path d="m113.08 83.24c-4-4.73-10.56-2.56-14.1-1.4-2.24.74-7.61 3-12.9 5.24a8.26 8.26 0 0 0 -.62-5c-2.86-6.53-9.92-5.28-15.08-4.36a27.61 27.61 0 0 1 -4.84.61 20.2 20.2 0 0 1 -8-1.75 24.66 24.66 0 0 0 -10.37-2 50.57 50.57 0 0 0 -19.76 4.42l-1.12.46c-9.29 3.7-13.29 4.54-13.29 4.54a2 2 0 0 0 -1.55 1.48c-.07.29-1.64 7 2.81 16.43 3.82 8 8.29 11.07 11.36 12.18a2 2 0 0 0 1.91-.31s2.51-2 4.43-3.12c1.27-.77 4.36-1.26 11.92.84a92.12 92.12 0 0 0 21.42 3.07 25 25 0 0 0 8.32-1.14c7.89-3 27.09-13 34.64-17.1 4-2.18 6.18-4.53 6.68-7.19a7 7 0 0 0 -1.86-5.9zm-2.08 5.17c-.25 1.35-1.91 2.92-4.66 4.42-6.34 3.47-26.28 13.92-34.13 16.87-5.51 2.06-19.38.14-27.26-2a37.74 37.74 0 0 0 -9.71-1.7 10.14 10.14 0 0 0 -5.37 1.24c-1.35.82-2.89 1.94-3.86 2.66-3-1.5-5.85-4.9-8.14-9.72a25.11 25.11 0 0 1 -2.68-12.62 121.45 121.45 0 0 0 12.59-4.44l1.15-.47a46.3 46.3 0 0 1 18.32-4.1 20.5 20.5 0 0 1 8.88 1.77 23.77 23.77 0 0 0 9.34 2 32.17 32.17 0 0 0 5.61-.67c5.51-1 9.23-1.37 10.71 2a4.22 4.22 0 0 1 .15 3.35c-.56 1.38-2 2.64-4.26 3.66-2 .84-3.5 1.49-4.16 1.75-4.24 1.66-7.89 1.08-11.42.52l-1.94-.3a2 2 0 0 0 -.54 4c.61.08 1.23.18 1.85.28 3.87.61 8.25 1.3 13.51-.75.61-.24 1.83-.75 3.45-1.45.3-.12.59-.24.87-.37l2.58-1.1c6.51-2.8 15.43-6.64 18.36-7.6 4.65-1.53 7.91-2 9.78.18 1.21 1.42 1.04 2.3.98 2.59z"></path>
                                <path d="m64 33.76v2.65a8.76 8.76 0 0 0 -2 .72 6.31 6.31 0 0 0 -3.47 5.47c-.14 4.39 3.81 5.86 6.69 6.93 3.36 1.25 4.38 1.89 4.23 3.49a2.76 2.76 0 0 1 -1.84 2.45 6.86 6.86 0 0 1 -5.93-.5 2 2 0 0 0 -2.48 3.15 9.34 9.34 0 0 0 4.8 1.73v2.39a2 2 0 1 0 4 0v-2.69a9.82 9.82 0 0 0 1.23-.4 6.75 6.75 0 0 0 4.25-5.74c.48-4.92-3.91-6.55-6.81-7.63-3.11-1.15-4.14-1.75-4.1-3.05a2.34 2.34 0 0 1 1.36-2.07 6.07 6.07 0 0 1 5.74.49 2 2 0 1 0 2.12-3.39 10.6 10.6 0 0 0 -3.79-1.45v-2.55a2 2 0 1 0 -4 0z"></path>
                                <path d="m42 48a24 24 0 1 0 24-24 24 24 0 0 0 -24 24zm44 0a20 20 0 1 1 -20-20 20 20 0 0 1 20 20z"></path>
                              </svg>
                              <p className="panDesign3">
                                Refundable (Cancel Before{" "}
                                {dayjs(
                                  hotelinfoGRN?.rate?.cancellation_policy
                                    ?.cancel_by_date
                                ).format("DD MMM, YY")}
                                )
                              </p>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="othInc">
                        {hotelinfoGRN?.rate?.other_inclusions?.map(
                          (inclusion, e) => (
                            <div className="othIncInner" key={e}>
                              <div className="d-flex justify-content-start align-items-center gap-2">
                                {inclusion.toLowerCase() == "free wifi" && (
                                  <>
                                    <img src={freeWifi} alt="wifi" />
                                    <p className="panDesign3">Free WiFi</p>
                                  </>
                                )}
                                {inclusion.toLowerCase() == "free internet" && (
                                  <>
                                    <img src={freeWifi} alt="wifi" />
                                    <p className="panDesign3">Free internet</p>
                                  </>
                                )}
                                {inclusion.toLowerCase() ==
                                  "free breakfast" && (
                                  <>
                                    <img src={freeBreakfast} alt="wifi" />
                                    <p className="panDesign3">Free Breakfast</p>
                                  </>
                                )}
                                {inclusion.toLowerCase() == "breakfast" && (
                                  <>
                                    <img src={freeBreakfast} alt="wifi" />
                                    <p className="panDesign3">Breakfast</p>
                                  </>
                                )}
                                {inclusion.toLowerCase() ==
                                  "continental breakfast" && (
                                  <>
                                    <img src={freeBreakfast} alt="wifi" />

                                    <p className="panDesign3">
                                      Continental breakfast
                                    </p>
                                  </>
                                )}
                                {inclusion.toLowerCase() ==
                                  "free self parking" && (
                                  <>
                                    <img src={freeParking} alt="wifi" />
                                    <p className="panDesign3">
                                      {" "}
                                      Free self parking
                                    </p>
                                  </>
                                )}
                                {inclusion.toLowerCase() == "parking" && (
                                  <>
                                    <img src={freeParking} alt="wifi" />
                                    <p className="panDesign3"> Free Parking</p>
                                  </>
                                )}
                                {inclusion.toLowerCase() == "free parking" && (
                                  <>
                                    <img src={freeParking} alt="wifi" />
                                    <p className="panDesign3"> Free Parking</p>
                                  </>
                                )}
                                {inclusion.toLowerCase() ==
                                  "free valet parking" && (
                                  <>
                                    <img src={freeParking} alt="wifi" />

                                    <p className="panDesign3">
                                      {" "}
                                      Free Valet Parking
                                    </p>
                                  </>
                                )}
                                {inclusion.toLowerCase() ==
                                  "drinking water" && (
                                  <>
                                    <img src={drinkingWater} alt="wifi" />
                                    <p className="panDesign3">
                                      {" "}
                                      Drinking water
                                    </p>
                                  </>
                                )}
                                {inclusion.toLowerCase() ==
                                  "express check-in" && (
                                  <>
                                    <img src={expressCheckin} alt="wifi" />
                                    <p className="panDesign3">
                                      {" "}
                                      Express check-in
                                    </p>
                                  </>
                                )}
                                {inclusion.toLowerCase() == "welcome drink" && (
                                  <>
                                    <img src={welcomeDrink} alt="wifi" />
                                    <p className="panDesign3">Welcome drink</p>
                                  </>
                                )}
                                {inclusion.toLowerCase() ==
                                  "free fitness center access" && (
                                  <>
                                    <img src={freeGym} alt="wifi" />
                                    <p className="panDesign3">Free Gym</p>
                                  </>
                                )}
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* guest details sectin  */}

                <div className="col-lg-12  mt-3">
                  <div className="roomNameAndCategoryOuter">
                    <h3 className="hotelNameHeading">
                      Your Booking Details will be sent to
                    </h3>
                    <div className="roomNameAndCategory">
                      {/* <div className="roomTitle">
                                            <h5 className="HotelRoomHeadings2">Your Booking Details will be sent to</h5>
                                        </div> */}

                      <div className="row g-3 mb-3">
                        <div className="col-lg-5 col-md-5">
                          <div className="bookDetail">
                            <div>
                              <p>Phone No :</p>
                            </div>
                            <div>
                              <span>
                                {passenger?.[0]?.adults?.[0]?.Phoneno}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-5 col-md-5">
                          <div className="bookDetail">
                            <div>
                              <p>Email :</p>
                            </div>
                            <div>
                              <span>{passenger?.[0]?.adults?.[0]?.Email}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* passenger details  */}

                <div className="col-lg-12  mt-3">
                  <div className="roomNameAndCategoryOuter">
                    <h3 className="hotelNameHeading">Guest Details</h3>
                    <div className="roomNameAndCategory">
                      {/* <div className="roomTitle">
                                            <h5 className="HotelRoomHeadings2">Guest Details</h5>
                                        </div> */}

                      {passenger?.map((item, index) => {
                        return (
                          <div>
                            {/* <label className="roomIndexGuest">
                                                            Room {index + 1}
                                                        </label> */}

                            <p className="text-bold">Room {index + 1}</p>

                            {item?.adults.length > 0 &&
                              item?.adults?.map((i, adultIndex) => (
                                <div className="bookFlightPassInner">
                                  <div className="bookAdultIndex">
                                    <p>
                                      Adult {adultIndex + 1}
                                      {index === 0 && (
                                        <span>
                                          {adultIndex == 0
                                            ? "(Lead Guest)"
                                            : ""}
                                        </span>
                                      )}
                                    </p>
                                  </div>
                                  <div className="row g-3 mb-3">
                                    <div className="passengerDetailsGuestBOx">
                                      <div>
                                        <p>Name :</p>

                                        <span>
                                          {i?.Title?.toUpperCase()}{" "}
                                          {i?.FirstName?.toUpperCase()}{" "}
                                          {i?.LastName?.toUpperCase()}
                                        </span>
                                      </div>
                                      {index === 0 && adultIndex == 0 && (
                                        <div>
                                          <p>PAN : </p>

                                          {index === 0 && <span>{i?.PAN}</span>}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ))}

                            {item?.children.length > 0 &&
                              item?.children?.map((i, childIndex) => (
                                <div className="bookFlightPassInner">
                                  <div className="bookAdultIndex">
                                    <p>Child {childIndex + 1}</p>
                                  </div>
                                  <div className="passengerDetailsGuestBOx">
                                    <div>
                                      <p>Name :</p>
                                    </div>
                                    <div>
                                      <span>
                                        {i?.Title?.toUpperCase()}{" "}
                                        {i?.FirstName?.toUpperCase()}{" "}
                                        {i?.LastName?.toUpperCase()}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <Amenities />

                <div className="col-lg-12 mt-3">
                  <div className="roomNameAndCategoryOuter">
                    <h3 className="hotelNameHeading">Property Rules</h3>
                    <div className="roomNameAndCategory">
                      <div className="roomTitle">
                        <h5 className="HotelRoomHeadings2">Property Rules</h5>
                      </div>
                      <div className="bookFlightPassInner">
                        <div className="propertyRulesBox">
                          <div className="prOne">
                            <p>
                              Check-in Time Began:{" "}
                              {
                                hotelinfoGRN?.rate?.rate_comments
                                  ?.checkin_begin_time
                              }
                            </p>
                            {hotelinfoGRN?.rate?.rate_comments
                              ?.checkin_end_time && (
                              <p>
                                Check-in Time Ends:{" "}
                                {
                                  hotelinfoGRN?.rate?.rate_comments
                                    ?.checkin_end_time
                                }
                              </p>
                            )}
                          </div>
                          <div className="prOne">
                            <p>
                              Check-in Minimum Age :{" "}
                              {
                                hotelinfoGRN?.rate?.rate_comments
                                  ?.checkin_min_age
                              }{" "}
                            </p>
                            <p>
                              Check-Out Time:{" "}
                              {hotelinfoGRN?.rate?.rate_comments?.checkout_time}
                            </p>
                          </div>
                          <div className="prTwo">
                            <p>Check-in Instruction</p>

                            <span
                              dangerouslySetInnerHTML={{
                                __html:
                                  hotelinfoGRN?.rate?.rate_comments
                                    ?.checkin_instructions,
                              }}
                            ></span>
                          </div>
                          <div className="prTwo">
                            <p>Passenger Comment</p>
                            <span>
                              {hotelinfoGRN?.rate?.rate_comments?.pax_comments}
                            </span>
                          </div>
                          {hotelinfoGRN?.rate?.rate_comments?.policies !==
                            "" && (
                            <div className="prTwo">
                              <p>Policies</p>
                              <span>
                                {hotelinfoGRN?.rate?.rate_comments?.policies}
                              </span>
                            </div>
                          )}
                          {hotelinfoGRN?.rate?.rate_comments?.remarks !==
                            "" && (
                            <div className="prTwo">
                              <p>Remarks</p>
                              <span>
                                {hotelinfoGRN?.rate?.rate_comments?.remarks}
                              </span>
                            </div>
                          )}
                          {hotelinfoGRN?.rate?.rate_comments?.mealplan !==
                            "" && (
                            <div className="prTwo">
                              <p>Meal Plan</p>
                              <span>
                                {hotelinfoGRN?.rate?.rate_comments?.mealplan}
                              </span>
                            </div>
                          )}
                          {hotelinfoGRN?.rate?.rate_comments?.mandatory_fees !==
                            "" && (
                            <div className="prOne">
                              {hotelinfoGRN?.rate?.rate_comments
                                ?.mandatory_fees && (
                                <p>
                                  Mandatory Fees:{" "}
                                  {
                                    hotelinfoGRN?.rate?.rate_comments
                                      ?.mandatory_fees
                                  }
                                </p>
                              )}

                              {hotelinfoGRN?.rate?.rate_comments
                                ?.mandatoryTax && (
                                <p>
                                  Mandatory Tax:{" "}
                                  {
                                    hotelinfoGRN?.rate?.rate_comments
                                      ?.mandatoryTax
                                  }
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <div className=" mt-3">

                                    <Button type="primary" loading={paymentLoading} onClick={handlePayment}>
                                        Continue
                                    </Button>

                                </div> */}
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
                  </div>
                </Modal>
              </div>
            </div>
            <div className="col-lg-4 ">
              <PriceSummaryGRNcoupon
                onFinalAmountChange={handleFinalAmountChange}
                oncouponselect={handlecouponChange}
                payButton={handlePayment}
                loadingPayButton={paymentLoading}
                isPaymentSucessButton={loadingButton}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingReviewGRN;
