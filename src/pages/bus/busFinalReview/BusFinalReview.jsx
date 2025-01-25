import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  busBookAction,
  busBookDetailsAction,
} from "../../../Redux/busSearch/busSearchAction";
import { useEffect } from "react";
import dayjs from "dayjs";
import axios from "axios";

import { swalModal } from "../../../utility/swal";
import PaymentLoader from "../../flight/FlightLoader/paymentLoader";
import { apiURL } from "../../../Constants/constant";

import Modal from "@mui/material/Modal";
import flightPaymentLoding from "../../../images/loading/loading-ban.gif";

import { checkSearchTime } from "../../../utility/utils";
import secureLocalStorage from "react-secure-storage";
import { Button } from "antd";
import BusSummaryWithCoupon from "../busSummary/BusSummaryWithCoupon";
import Authentic from "../../Auth/Authentic";
import { colors } from "../../../colors";

const BusFinalReview = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reducerState = useSelector((state) => state);
  const [transactionAmount, setTransactionAmount] = useState(null);
  const [sub, setSub] = useState(false);
  const [loaderPayment, setLoaderPayment] = useState(false);
  const [loaderPayment1, setLoaderPayment1] = useState(false);
  const apiUrlPayment = `${apiURL.baseURL}/skyTrails/api/transaction/easebussPayment`;
  const [finalAmount, setFinalAmount] = useState(0);

  const handleFinalAmountChange = (amount) => {
    setFinalAmount(amount);
  };
  const [couponvalue, setCouponValue] = useState("");
  const handlecouponChange = (code) => {
    setCouponValue(code);
  };

  const busBlockData =
    reducerState?.getBusResult?.busBlock?.data?.data?.BlockResult;
  const busFullData =
    reducerState?.getBusResult?.busResult?.data?.data?.BusSearchResult;
  const busBook =
    reducerState?.getBusResult?.busBook?.data?.data?.BookResult?.Error;
  const authenticUser = reducerState?.logIn?.loginData?.status;
  const seatData = sessionStorage.getItem("seatData");
  const passengerSessionStorage = sessionStorage.getItem("busPassName");
  const passengerSessionStorageParsed = JSON.parse(passengerSessionStorage);
  const parsedSeatData = JSON.parse(seatData);
  const passengerCount = parsedSeatData?.blockedSeatArray.length;
  const resultIndex = parsedSeatData?.resultIndex;
  const boardingPoint = parsedSeatData?.selectedOrigin;
  const droppingPoint = parsedSeatData?.selectedDropPoint;
  const seatObject = parsedSeatData?.blockedSeatArray;
  const markUpamount =
    reducerState?.markup?.markUpData?.data?.result[0]?.busMarkup;
  const published = seatObject.reduce(function (
    accumulator,
    currentValue,
    currentIndex,
    array
  ) {
    return accumulator + currentValue?.Price?.PublishedPriceRoundedOff;
  },
  0);

  const selectedBus = busFullData.BusResults.find(
    (bus) => bus.ResultIndex === resultIndex
  );

  const departureTime = new Date(selectedBus.DepartureTime).getTime();
  const arrivalTime = new Date(selectedBus.ArrivalTime).getTime();
  const timeDifference = arrivalTime - departureTime;
  const hours = Math.floor(timeDifference / (1000 * 60 * 60));
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const duration = `${hours}hr ${minutes}min`;

  const grandTotal = published + markUpamount;

  useEffect(() => {
    if (seatData === undefined) {
      navigate("/BusPassengerDetail");
    }
  }, []);

  useEffect(() => {
    if (
      busBlockData?.Error?.ErrorCode !== 0 &&
      busBlockData?.Error?.ErrorCode !== undefined
    ) {
      swalModal("bus", "Please Search Again", false);
      navigate("/");
    } else if (sessionStorage.getItem("storedPassengerData") === undefined) {
      navigate("/");
    }
  }, [busBlockData]);

  const offeredPrice = seatObject.reduce(
    (accumulator, currentValue, currentIndex, array) => {
      return accumulator + currentValue?.Price?.OfferedPrice;
    },
    0
  );
  const tdsTotal =
    markUpamount +
    seatObject.reduce((accumulator, currentValue) => {
      return accumulator + currentValue?.Price?.TDS;
    }, 0);

  useEffect(() => {
    if (loaderPayment == true) {
      handleBookBus();
    }
  }, [loaderPayment]);

  useEffect(() => {
    if (
      reducerState?.getBusResult?.busBook?.data?.data?.BookResult?.Error
        ?.ErrorMessage == ""
    ) {
      handleGetBookingDetails(
        reducerState?.getBusResult?.busBook?.data?.data?.BookResult?.BusId
      );
    }
  }, [reducerState?.getBusResult?.busBook?.data?.data?.BookResult]);

  useEffect(() => {
    if (
      reducerState?.getBusResult?.busDetails?.data?.data?.GetBookingDetailResult
        ?.Error?.ErrorMessage == ""
    ) {
      setLoaderPayment(false);
      navigate("/Busbookingconfirmation", {
        state: { finalamount: finalAmount, couponvalue: couponvalue },
      });
    }
  }, [reducerState?.getBusResult?.busDetails?.data?.data]);

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isDisableScroll, setIsDisableScroll] = useState(false);
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

  const handleModalClose = () => {
    setIsLoginModalOpen(false);
  };

  useEffect(() => {
    if (authenticUser == 200) {
      handleModalClose();
    }
  }, [authenticUser]);

  const handlePayment = async () => {
    if (authenticUser !== 200) {
      setSub(false);
      // setTimer11(false);
      setIsLoginModalOpen(true);
    } else {
      if (!checkSearchTime()) {
        navigate("/");
        return;
      } else {
        setLoaderPayment1(true);
        setIsDisableScroll(true);

        const token = secureLocalStorage?.getItem("jwtToken");
        const payload = {
          firstname: passengerSessionStorageParsed[0].FirstName,
          phone: passengerSessionStorageParsed[0].Phoneno,
          amount: Number(finalAmount).toFixed(0),
          // amount: 1,
          email: passengerSessionStorageParsed[0].Email,
          productinfo: "ticket",
          bookingType: "BUS",
          surl: `${apiURL.baseURL}/skyTrails/api/transaction/successVerifyApi?merchantTransactionId=`,
          furl: `${apiURL.baseURL}/skyTrails/api/transaction/paymentFailure?merchantTransactionId=`,
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
            // console.error("API call failed with status:", response.status);
            const errorData = await response.json();
            setSub(false);
            setIsDisableScroll(false);
            // setTimer11(false);
            // console.error("Error details:", errorData);
          }
        } catch (error) {
          // Handle network errors or exceptions
          setIsDisableScroll(false);
          console.error("API call failed with an exception:", error.message);
        } finally {
          setLoaderPayment1(false);
        }
      }
    }
  };

  const proceedPayment = (accessKey, env, key) => {
    const easebuzzCheckout = new window.EasebuzzCheckout(key, env);
    const options = {
      access_key: `${accessKey}`,
      onResponse: async (response) => {
        // console.log(response, "response");
        if (response.status === "success") {
          try {
            // Make API call if payment status is 'success'
            const easeBuzzPayId = response.easepayid;
            const verifyResponse = await axios.post(
              `${apiURL.baseURL}/skyTrails/api/transaction/paymentSuccess?merchantTransactionId=${response.txnid}`,
              { easeBuzzPayId: easeBuzzPayId }
            );
            setLoaderPayment(true);
            setIsDisableScroll(false);
            // sessionStorage.removeItem("totalaftercoupon");
            // sessionStorage.removeItem("couponCode");
          } catch (error) {
            // console.error("Error verifying payment:", error);
            setIsDisableScroll(false);
            // Handle error
          }
        } else {
          try {
            // Make API call if payment status is 'success'
            const verifyResponse = await axios.post(
              `${apiURL.baseURL}/skyTrails/api/transaction/paymentFailure?merchantTransactionId=${response.txnid}`
            );
            setTransactionAmount(null);
            // sessionStorage.removeItem("totalaftercoupon");
            // sessionStorage.removeItem("couponCode");
            setToggle(false);

            setIsDisableScroll(false);
            // console.log(verifyResponse.data);
            // Handle verifyResponse as needed
          } catch (error) {
            console.error("Error verifying payment:", error);
            setIsDisableScroll(false);
            // Handle error
          }
        }
      },
      theme: "#123456", // Replace with your desired color hex
    };

    // Initiate payment on button click
    easebuzzCheckout.initiatePayment(options);
  };
  const handleBookBus = () => {
    const payload = {
      EndUserIp: reducerState?.ip?.ipData,
      ResultIndex: JSON.stringify(resultIndex),
      TraceId: busBlockData?.TraceId,
      TokenId: reducerState?.ip?.tokenData,
      BoardingPointId: boardingPoint,
      DroppingPointId: droppingPoint,
      Passenger: busBlockData?.Passenger,
    };

    dispatch(busBookAction(payload));
    // navigate("/Busbookingconfirmation");
  };

  const handleGetBookingDetails = (busIdParam) => {
    const payload = {
      EndUserIp: reducerState?.ip?.ipData,
      TokenId: reducerState?.ip?.tokenData,
      TraceId: busFullData?.TraceId,
      BusId: busIdParam,
      SeatId: 0,
      IsBaseCurrencyRequired: false,
    };
    // busBookSave()
    dispatch(busBookDetailsAction(payload));
  };

  useEffect(() => {
    if (busBook?.ErrorCode === 0) {
      // navigate("/Busbookingconfirmation");
    } else if (
      busFullData?.Error?.ErrorCode !== 0 &&
      busFullData?.Error?.ErrorCode !== undefined
    ) {
      swalModal("bus", busBook?.ErrorMessage, false);
    }
  }, [busBook]);

  // console.log(selectedBus, "selectedBus")
  const cancellationPolicy = selectedBus?.CancellationPolicies;

  const dateString = selectedBus?.DepartureTime;
  const date = new Date(dateString);
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  const formattedDate = date.toLocaleString("en-US", options);

  const [month, day, year, time, ampm] = formattedDate.split(" ");
  const desiredFormat = `${day}${month}-${year} ${time} ${ampm}`;

  const dateString1 = selectedBus?.ArrivalTime;
  const date1 = new Date(dateString1);
  const options1 = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  const formattedDate1 = date1.toLocaleString("en-US", options1);
  const [month1, day1, year1, time1, ampm1] = formattedDate1.split(" ");
  const desiredFormat1 = `${day1}${month1}-${year1} ${time1} ${ampm1}`;
  const [toggle, setToggle] = useState(false);

  const cancelFromDate = dayjs(cancellationPolicy[0]?.FromDate.slice(0, 9));
  const cancelToDateTime = dayjs(cancellationPolicy[0]?.FromDate.slice(11, 18));
  const toggleState = (e) => {
    setToggle(e);
    // console.warn("toggling state", e);
  };
  const setTransactionAmountState = (e) => {
    setTransactionAmount(e);
    // console.log("setTransactionAmountState");
  };

  const storedPassengerData = JSON.parse(sessionStorage.getItem("busPassName"));
  // console.log("passengerdetails", storedPassengerData);
  if (loaderPayment == false) {
    return (
      <>
        <div className="container">
          <div className="mt-4 row">
            <div className="col-lg-8 ">
              <div className="col-lg-12 ">
                <div className="singlebusMain">
                  <h3 className="busNameHeading">
                    {selectedBus?.TravelName?.toUpperCase()}
                  </h3>
                  <div className="singleBusResultBox">
                    <div className="sbsb1">
                      <p>{selectedBus?.BusType}</p>
                    </div>
                    <div className="sbsb2">
                      <div>
                        <h3>{busFullData?.Origin}</h3>
                        <h4>
                          {dayjs(selectedBus?.DepartureTime).format(
                            "DD MMM, YY"
                          )}
                        </h4>
                        <p>
                          {dayjs(selectedBus?.DepartureTime).format("h:mm A")}
                        </p>
                      </div>
                      <div>
                        <p>{duration}</p>

                        <div className="busDistance">
                          <span className="busCircle1"></span>
                          <span className="busLine2"></span>
                          <span className="busCircle2"></span>
                        </div>

                        <p>{selectedBus?.AvailableSeats} Seats Left</p>
                      </div>
                      <div>
                        <h3>{busFullData?.Destination}</h3>
                        <h4>
                          {dayjs(selectedBus?.ArrivalTime).format("DD MMM, YY")}
                        </h4>
                        <p>
                          {dayjs(selectedBus?.ArrivalTime).format("h:mm A")}
                        </p>
                      </div>
                      <div>
                        <h3>₹ {grandTotal.toFixed(0)}</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="my-3 col-lg-12">
                <div className="passHeading">
                  <h3>Passenger Details</h3>
                </div>
                <div className="selectedPassDetails">
                  {storedPassengerData.map((passenger, index) => (
                    <div key={index} className="selectedPassInside">
                      <div>
                        <p>Name:</p>
                        <p>Email:</p>
                        <p>Gender:</p>
                        <p>Age</p>
                      </div>
                      <div>
                        <span>
                          {passenger.FirstName} {passenger.LastName}
                        </span>
                        {/* <span>{passenger.Age} Years Old</span> */}
                        <span>{passenger.Email}</span>
                        <span>
                          {passenger.Gender == "1"
                            ? "Male"
                            : passenger.Gender == "2"
                            ? "Female"
                            : ""}
                        </span>
                        <span>{passenger.Age}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="my-3 col-lg-12">
                <div className="busCancellation">
                  <table>
                    <thead>
                      <tr>
                        <th>Cancellation Time</th>
                        <th>Cancellation Charges</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cancellationPolicy?.map((item, index) => {
                        const cancelFromDate = dayjs(
                          item?.FromDate.slice(0, 10)
                        );
                        const cancelToDateTime = dayjs(
                          item?.ToDate.slice(0, 10)
                        ); // Make sure ToDate is the correct property name
                        const cancelFromDateFormatted =
                          cancelFromDate.format("DD MMM, YY");
                        const cancelToDateTimeFormatted =
                          cancelToDateTime.format("DD MMM, YY");

                        return (
                          <tr key={index}>
                            <td>
                              from {item?.FromDate.slice(11, 16)}{" "}
                              {cancelFromDateFormatted} to{" "}
                              {item.ToDate.slice(11, 16)}{" "}
                              {cancelToDateTimeFormatted}
                            </td>
                            <td>{item?.CancellationCharge}%</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mt-4 col-lg-12 busBook">
                <button
                  className={`${colors.primary6000} border${colors.primary6000} rounded-lg  hover:${colors.primary700} p-1 text-white`}
                  onClick={handlePayment}
                >
                  Book Ticket
                </button>
              </div>
            </div>
            <div className="col-lg-4">
              <BusSummaryWithCoupon
                toggle={toggle}
                onFinalAmountChange={handleFinalAmountChange}
                toggleState={toggleState}
                oncouponselect={handlecouponChange}
                Amount={transactionAmount}
              />
            </div>
          </div>
        </div>

        <Authentic isOpen={isLoginModalOpen} onClose={handleModalClose} />
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
      </>
    );
  } else {
    return <PaymentLoader />;
  }
};

export default BusFinalReview;
