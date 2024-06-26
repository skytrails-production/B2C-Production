import { Box, Grid, Typography } from "@mui/material";

import React, { useState, useRef, useEffect } from "react";
import SecureStorage from "react-secure-storage";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import axios from "axios";
import { apiURL } from "../../Constants/constant";
import { useLocation, useNavigate, } from "react-router-dom";
import "./booknowleft.css";

const KeyValue = ({ data, value }) => {
  return (
    <>
      <Grid item xs={12} md={6}>
        <Box>
          <Typography className="base">{data}:</Typography>
        </Box>
      </Grid>
      <Grid item xs={12} md={6} justifyContent="right">
        <Box textAlign="right">
          <Typography className="base">₹.{value}.00</Typography>
        </Box>
      </Grid>
    </>
  );
};

const BookNowLeftAmd = (props) => {
  const location = useLocation();
  const [showInput, setShowInput] = useState(false);

  const isDummyStorageTrue = sessionStorage.getItem("hdhhfb7383__3u8748");
  const propFunction = props.handleClick;

  const [couponApplied, setCouponApplied] = useState(false);

  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [couponCode, setCouponCode] = useState("");
  const [showApplyButton, setShowApplyButton] = useState(false);

  const couponamount1 = sessionStorage.getItem("couponCode");
  const [couponStatus, setCouponStatus] = useState(false);

  const { ResultIndex } = location.state;
  const sesstioResultIndex = ResultIndex;
  const queryParams = new URLSearchParams(location.search);
  const adultCount =Number( queryParams.get("adult"));
  // const adultCount = 2;
  const childCount =Number( queryParams.get("child"));
  // const childCount = 2;
  const infantCount =Number( queryParams.get("infant"));
  // console.log(ResultIndex,"typeof adult  countttttttttttttttttt")

  const handleApplyCoupon1 = async () => {
    try {
      setLoading(true);

      const token = SecureStorage.getItem("jwtToken");
      const couponCode = inputRef.current.value;

      const response = await axios.put(
        `${apiURL.baseURL}/skyTrails/api/coupons/applyCoupon`,
        { couponCode: couponCode },
        {
          headers: {
            token: token,
          },
        }
      );

      if (response?.data?.statusCode === 200) {
        setCouponStatus(true);
        sessionStorage.setItem("couponCode", couponCode);
        await props.transactionAmount(grandTotal);
      }
    } catch (error) {
      setLoading(false);

      if (error.response && error.response.data.statusCode === 409) {
        setCouponStatus(false);
        setError("Coupon already applied");
        setTimeout(() => {
          setError(null);
        }, 4000);
      } else if (error.response && error.response.data.statusCode === 404) {
        setError(
          error.response?.data?.responseMessage ||
          "Error Applying coupon . Please try again."
        );
      } else {
        setError(
          error.response?.data?.message ||
          "Error applying coupon. Please try again."
        );
        setCouponStatus(false);
      }
    } finally {
      setLoading(false);
      props.toggleState(true);
    }
  };

  useEffect(() => {
    if (!props.toggle) {
      setCouponCode("");
      setShowApplyButton(false);
      // console.log(props.Amount, "Amount///////////////");
    }
  }, [props.toggle]);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setCouponCode(inputValue);
    setShowApplyButton(!!inputValue);
    setError(null);
    props.toggleState(true);
    setCouponStatus(false);
    if (couponamount1) {
      props.transactionAmount(null);
      sessionStorage.removeItem("couponCode");
    }

    if (!inputValue) {
      setCouponStatus(false);
      props.transactionAmount(null);
      sessionStorage.removeItem("couponCode");
    }
  };
  const reducerState = useSelector((state) => state);
  const TicketDetails = reducerState?.flightFare?.flightQuoteData?.Results;
  const fareValue = reducerState?.flightFare?.flightQuoteData?.Results;
  const fareQuote = reducerState?.flightFare?.flightQuoteData?.Error?.ErrorCode;
  const discountValue =
    parseInt(fareValue?.Fare?.PublishedFare) -
    parseInt(fareValue?.Fare?.OfferedFare);

  const markUpamount =
    reducerState?.markup?.markUpData?.data?.result[0]?.flightMarkup;
  // console.log("markUpamount", markUpamount);

  const integerValue = discountValue;
  const coupondiscount = integerValue;
  const basefare =
    Number(sesstioResultIndex?.TotalPublishFare)
  const ourMarkup =Number((Number(markUpamount) * Number(basefare)));


  //   const taxvalue = markUpamount * parseInt(fareValue?.Fare?.PublishedFare);
  // console(markUpamount,grandTotal,ourMarkup,"markup grandtotalnnnnnnnnnnnnnnn")
  const taxvaluetotal = Number((Number(markUpamount) * Number(ResultIndex?.monetaryDetail?.[0]?.amount)));;
  // console.log(taxvaluetotal, "marlup amount")
  let total = 0;

  const dateString = fareValue?.Segments[0][0]?.Origin?.DepTime;
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("default", {
    month: "short",
  });
  const year = date.getFullYear();
  const formattedDate = `${day} ${month} ${year}`;
  const handleApplyCoupon = () => {
    setShowInput(true);
    setCouponApplied(true);
  };
  useEffect(() => {
    //  props.transactionAmount(null);
    sessionStorage.removeItem("couponCode");
  }, []);
  useEffect(() => {
    if (!props.toggle) {
      setCouponCode("");
    }
    // console.log(props.Amount, props.toggle, "amount //////////////////");
  }, [props.toggle]);

  function convertDateFormat(dateString) {
    // Assuming the input date string is in the format "DDMMYY"
    var day = parseInt(dateString.substring(0, 2));
    var monthIndex = parseInt(dateString.substring(2, 4)) - 1; // Adjusting month index (0-based)
    var year = 2000 + parseInt(dateString.substring(4, 6)); // Assuming the year is in the 21st century

    // Get month name
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    var monthName = months[monthIndex];

    // Construct formatted date string
    var formattedDate = day + " " + monthName + " " + year;

    return formattedDate;
  }
  // console.log(
  //   Number(ResultIndex?.[0]?.paxFareDetail?.totalFareAmount || ResultIndex?.paxFareDetail?.totalFareAmount), "hhiih",
  //   Number(ResultIndex?.[1]?.paxFareDetail?.totalFareAmount),
  //   ResultIndex?.[2]?.paxFareDetail?.totalFareAmount ? Number(ResultIndex?.[2]?.paxFareDetail?.totalFareAmount) : 0, "Number(ResultIndex?.[1]?.paxFareDetail?.totalFareAmount || ResultIndex?.paxFareDetail?.totalFareAmount) +")


  const adultTax = Number(ResultIndex?.[0]?.paxFareDetail?.totalTaxAmount
    || ResultIndex?.paxFareDetail?.totalTaxAmount
  ) * adultCount
  const childTax = childCount!==0 ?Number( ResultIndex?.[1]?.paxFareDetail?.totalTaxAmount)*childCount  : 0
  const infantTax = ResultIndex?.[2]?.paxFareDetail?.totalTaxAmount
    ? Number(ResultIndex?.[2]?.paxFareDetail?.totalTaxAmount
    ) * infantCount : 0
  // console.log(adultTax, childTax, infantTax, "adi")
  // const totalTax =Number(taxvaluetotal+  adultTax + childTax + infantTax).toFixed(2)
  const totalTax =Number( Number( ResultIndex?.monetaryDetail?.[0]?.amount)+Number(taxvaluetotal)).toFixed(2)
  // console.log(taxvaluetotal, markUpamount,basefare, "totalFareAmount")
  // console.log(ResultIndex?.[1]?.paxFareDetail?.totalTaxAmount,childCount
  //   )
    const grandTotal=Number( ResultIndex?.monetaryDetail?.[0]?.amount)+Number(taxvaluetotal)
    // console.log(basefare,totalTax,grandTotal,"grandtotallllllll")




  return (
    <>
      {true ? (
        <>
          <div className="priceSummary">
            <div className="headFlight">
              <span>Price Summary</span>
            </div>
            {sesstioResultIndex?.flightDetails?.flightInformation ? (
              <>
                <div className="totCOmmFlight">
                  <div>
                    <span>
                      {convertDateFormat(
                        sesstioResultIndex?.flightDetails?.flightInformation
                          ?.productDateTime?.dateOfDeparture
                      )}
                    </span>
                    <p>
                      {
                        sesstioResultIndex?.flightDetails?.flightInformation
                          ?.flightOrtrainNumber
                      }
                    </p>
                    <p>Class</p>
                  </div>
                </div>
                <div className="priceChart">
                  <div>
                    <span className="text-bold">From</span>
                    <p className="text-bold">
                      {
                        sesstioResultIndex?.flightDetails?.flightInformation
                          ?.location[0]?.locationId
                      }
                    </p>
                  </div>
                  <div>
                    <span className="text-bold">To</span>
                    <p className="text-bold">
                      {
                        sesstioResultIndex?.flightDetails?.flightInformation
                          ?.location[1]?.locationId
                      }
                    </p>
                  </div>
                </div>
              </>
            ) : (
              // [i]?.flightInformation?.productDateTime?.dateOfDeparture
              sesstioResultIndex?.flightDetails?.map((dat, index) => {
                return (
                  <>
                    <div className="totCOmmFlight">
                      <div>
                        <span>
                          {convertDateFormat(
                            sesstioResultIndex?.flightDetails[index]
                              ?.flightInformation?.productDateTime
                              ?.dateOfDeparture
                          )}
                        </span>
                        <p>
                          {
                            sesstioResultIndex?.flightDetails[index]
                              ?.flightInformation?.flightOrtrainNumber
                          }
                        </p>
                        <p> Class</p>
                      </div>
                    </div>
                    <div className="priceChart">
                      <div>
                        <span className="text-bold">From</span>
                        <p className="text-bold">
                          {
                            sesstioResultIndex?.flightDetails[index]
                              ?.flightInformation?.location[0]?.locationId
                          }
                        </p>
                      </div>
                      <div>
                        <span className="text-bold">To</span>
                        <p className="text-bold">
                          {
                            sesstioResultIndex?.flightDetails[index]
                              ?.flightInformation?.location[1]?.locationId
                          }
                        </p>
                      </div>
                    </div>
                  </>
                );
              })
            )}

            <div className="totCOmmFlight">

              <div className="" style={{ display: "flex", flexDirection: "column" }}>
                {Number(adultCount) !== 0 && (
                  <div className="totCOmmFlightDiv">
                    <span>Adult x {adultCount}</span>
                    <p>
                      {"₹"}
                      {ResultIndex?.[0]?.paxFareDetail?.totalFareAmount * adultCount || ResultIndex?.paxFareDetail?.totalFareAmount * adultCount}


                    </p>
                  </div>
                )}
                {Number(childCount) !== 0 && (
                  <div className="totCOmmFlightDiv">
                    <span>Child x {childCount}</span>
                    <p>
                      {"₹"}
                      {ResultIndex?.[1]?.paxFareDetail?.totalFareAmount * childCount}
                    </p>
                  </div>
                )}
                {Number(infantCount) !== 0 && (
                  <div className="totCOmmFlightDiv">
                    <span>Infant x {infantCount}</span>
                    <p>
                      {"₹"}
                      {ResultIndex?.[2]?.paxFareDetail?.totalFareAmount * infantCount}
                    </p>
                  </div>
                )}
              </div>

            </div>

            <div className="TotGstFlight">
              <div>
                <span>Base Fare: </span>
                <p>
                  {"₹"}
                  {sesstioResultIndex?.monetaryDetail?.[0]?.amount}
                  {/* {
                  Number ((Number(ResultIndex?.[0]?.paxFareDetail?.totalFareAmount || ResultIndex?.paxFareDetail?.totalFareAmount) * adultCount) +

                    (ResultIndex?.[1]?.paxFareDetail?.totalFareAmount ? (Number(ResultIndex?.[1]?.paxFareDetail?.totalFareAmount) * childCount) : 0) +
                    (ResultIndex?.[2]?.paxFareDetail?.totalFareAmount ? (Number(ResultIndex?.[2]?.paxFareDetail?.totalFareAmount) * infantCount) : 0)).toFixed()
                  } */}
                </p>
              </div>
              <div>
                <span>Other Fare: </span>
                <p>
                  {"₹"}
                  {taxvaluetotal.toFixed(2)}
                </p>
              </div>
              <div>
                <span>Grand Total:</span>
                <p>
                  {"₹"}
                  {Number(grandTotal).toFixed(2)}
                </p>
              </div>
            </div>

            {/* {isDummyStorageTrue === "false" ? (
              <div
                className="applycoupenbuttontext"
                style={{ overflow: "hidden" }}
              >
                {!couponApplied ? (
                  <button
                    onClick={handleApplyCoupon}
                    className="applycoupen-button"
                  >
                    Apply Coupon
                  </button>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div style={{ position: "relative" }}>
                      <input
                        ref={inputRef}
                        type="text"
                        className="inputfieldtext"
                        placeholder="Apply Coupon..."
                        autoFocus
                        value={couponCode}
                        onChange={handleInputChange}
                      />
                      {loading && <div className="loader-inside-input"></div>}
                      {showApplyButton && (
                        <p
                          onClick={handleApplyCoupon1}
                          style={{
                            position: "absolute",
                            top: 6,
                            right: 0,
                            cursor: "pointer",
                            height: "100%",
                            color: "#4949c0",
                            padding: "12px",
                            fontWeight: "bold",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          Apply Code
                        </p>
                      )}
                    </div>
                    {loading ? (
                      <div className="loader-container">
                        <div className="loader"></div>
                      </div>
                    ) : (
                      <div>
                        {couponStatus && props.toggle ? (
                          <div>
                            <div className="TotGstFlight mt-4">
                              <div>
                                <span>Coupon Amount: </span>
                                <p>
                                  {"₹"}
                                  {Number(coupondiscount).toFixed(1)}
                                </p>
                              </div>
                              <div>
                                <span>Total:</span>
                                <p>
                                  {"₹"}
                                  {Number(grandTotal).toFixed(2)}
                                </p>
                              </div>
                            </div>

                            <div className="TotGstFlight">
                              <div>
                                <span>After Discount:</span>

                                <p>
                                  {"₹"}
                                  {Number(grandTotal - coupondiscount).toFixed(
                                    2
                                  )}
                                </p>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="error-message1">
                            {props.toggle && <p>{error}</p>}
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>
                )}
              </div>
            ) : null} */}
          </div>
        </>
      ) : (
        <>
          <div>
            <p>session expired</p>
          </div>
        </>
      )}
    </>
  );
};

export default BookNowLeftAmd;
