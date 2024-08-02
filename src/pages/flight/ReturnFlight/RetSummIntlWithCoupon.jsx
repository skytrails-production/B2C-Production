import { Box, Grid, Typography } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import axios from "axios";
import { apiURL } from "../../../Constants/constant";
import SecureStorage from "react-secure-storage";
import dayjs from "dayjs";
import CouponContainer from "../../../components/Coupon/Couponcontainer";

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

const RetSummIntlWithCoupon = (props) => {
  const [showInput, setShowInput] = useState(false);
  const isDummyStorageTrue = sessionStorage.getItem("hdhhfb7383__3u8748");
  const propFunction = props.handleClick;
  const { onFinalAmountChange,oncouponselect } = props;
  // const [couponApplied, setCouponApplied] = useState(false);

  // const inputRef = useRef(null);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);

  // const [couponCode, setCouponCode] = useState("");
  // const [showApplyButton, setShowApplyButton] = useState(false);

  // const couponamount1 = sessionStorage.getItem("couponCode");
  // const [couponStatus, setCouponStatus] = useState(false);
  // const handleApplyCoupon1 = async () => {
  //     try {
  //         setLoading(true);

  //         const token = SecureStorage.getItem("jwtToken");
  //         const couponCode = inputRef.current.value;

  //         const response = await axios.put(
  //             `${apiURL.baseURL}/skyTrails/api/coupons/applyCoupon`,
  //             { couponCode: couponCode },
  //             {
  //                 headers: {
  //                     token: token,
  //                 },
  //             }
  //         );

  //         if (response?.data?.statusCode === 200) {
  //             setCouponStatus(true);
  //             sessionStorage.setItem("couponCode", couponCode);
  //             await props.transactionAmount(
  //                 Number(((fareValue?.Fare?.PublishedFare) + (markUpamount) * (fareValue?.Fare?.PublishedFare) - (discountValue))).toFixed(0)
  //             );
  //         }
  //     } catch (error) {
  //         setLoading(false);

  //         if (error.response && error.response.data.statusCode === 409) {
  //             setCouponStatus(false);
  //             setError("Coupon already applied");
  //             setTimeout(() => {
  //                 setError(null);
  //             }, 4000); // Adjust the timeout duration as needed (4 seconds in this case)
  //         } else {
  //             setError(
  //                 error.response?.data?.responseMessage ||
  //                 "Error applying coupon. Please try again."
  //             );
  //             setCouponStatus(false);
  //         }
  //     } finally {
  //         setLoading(false);
  //         props.toggleState(true);

  //     }
  // };

  useEffect(() => {
    if (!props.toggle) {
      setCouponCode("");
      setShowApplyButton(false);
      // console.log(props.Amount, "Amount///////////////");
    }
  }, [props.toggle]);

  // const handleInputChange = (event) => {
  //     const inputValue = event.target.value;
  //     setCouponCode(inputValue);
  //     setShowApplyButton(!!inputValue);
  //     setError(null);
  //     props.toggleState(true);
  //     setCouponStatus(false);
  //     if (couponamount1) {
  //         props.transactionAmount(null);
  //         sessionStorage.removeItem("couponCode");
  //     }

  //     if (!inputValue) {
  //         setCouponStatus(false);
  //         props.transactionAmount(null);
  //         sessionStorage.removeItem("couponCode");
  //     }
  // };
  const reducerState = useSelector((state) => state);
  const TicketDetails = reducerState?.flightFare?.flightQuoteData?.Results;
  const fareValue = reducerState?.flightFare?.flightQuoteData?.Results;
  const fareValueReturn =
    reducerState?.flightFare?.flightQuoteDataReturn?.Results;
  const fareQuote = reducerState?.flightFare?.flightQuoteData?.Error?.ErrorCode;
  const discountValue = Number(
    fareValue?.Fare?.PublishedFare - fareValue?.Fare?.OfferedFare
  ).toFixed(0);
  // console.log(discountValue, "discount value");
  const markUpamount =
    reducerState?.markup?.markUpData?.data?.result[0]?.flightMarkup;
  // console.log(markUpamount, "markUpamount value");
  const integerValue = parseInt(discountValue);
  // console.log(integerValue, "integerValue value");
  // const coupondiscount = integerValue + markUpamount;
  const coupondiscount = parseInt(
    fareValue?.Fare?.PublishedFare - fareValue?.Fare?.OfferedFare
  );
  // console.log(coupondiscount, "coupondiscount value");

  const grandtotal = (
    Number(fareValue?.Fare?.PublishedFare) +
    markUpamount * Number(fareValue?.Fare?.PublishedFare)
  ).toFixed(0);

  const afterdicount = (
    Number(fareValue?.Fare?.PublishedFare) +
    Number(markUpamount) * Number(fareValue?.Fare?.PublishedFare) -
    Number(discountValue)
  ).toFixed(0);

  // const discountValue =
  //    Number( Number(fareValue?.Fare?.PublishedFare - fareValue?.Fare?.OfferedFare) + Number(fareValueReturn?.Fare?.PublishedFare - fareValueReturn?.Fare?.OfferedFare).toFixed(0));
  // console.log("reducerState?.flightFare?.flightQuoteDataReturn",reducerState)

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

  // ///////////////////////coupon logic///////////////////////////////////////
  const [showApplyButton, setShowApplyButton] = useState(false);
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [couponStatus, setCouponStatus] = useState(false);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // const [selectedCoupon, setSelectedCoupon] = useState("");
  const [selectedCoupon, setSelectedCoupon] = useState(null);

  const discountValueObj = selectedCoupon?.discountPercentage?.filter(
    (item, index) => {
      return item?.name == "FLIGHTS" || item?.name == "FORALL";
    }
  );

  // console.log("discountValueObj", discountValueObj);

  const handleCouponChange = (code) => {
    setCouponCode(code);
    setCouponApplied(!!code);
  };

  const handleCouponStatusChange = (status) => {
    setCouponStatus(status);
  };

  const handleCouponDiscountChange = (discount) => {
    setCouponDiscount(discount);
  };

  const handleLoadingChange = (isLoading) => {
    setLoading(isLoading);
  };

  const handleErrorChange = (errorMessage) => {
    setError(errorMessage);
  };
  const flight = "FLIGHTS";

  const totalPriceCalculator = () => {
    let finalAmount = 0;
    let discountAmount = 0;
    //  if (selectedCoupon !== null) {
    //    if (discountValueObj?.[0].type == "PERCENTAGE") {
    //      finalAmount =
    //        finalAmount +
    //        ((fareValue?.Fare?.PublishedFare)) +
    //        markUpamount * Number(fareValue?.Fare?.PublishedFare) -
    //        ((fareValue?.Fare?.PublishedFare)) *
    //          (discountValueObj?.[0].value * 0.01);

    //      discountAmount =
    //        discountAmount +
    //        (((fareValue?.Fare?.PublishedFare))) *
    //          (discountValueObj?.[0].value * 0.01);
    //    } else if (discountValueObj?.[0].type == "AMOUNT") {
    //      finalAmount =
    //        (finalAmount +
    //         (fareValue?.Fare?.PublishedFare) +
    //         markUpamount * (fareValue?.Fare?.PublishedFare) -
    //        discountValueObj?.[0].value).toFixed(2);
    //      discountAmount = discountAmount + discountValueObj?.[0].value;
    //    }
    //  } else {
    //    finalAmount =
    //      finalAmount +
    //      ((fareValue?.Fare?.PublishedFare)) +
    //      markUpamount * Number(fareValue?.Fare?.PublishedFare).toFixed(2);
    //  }
    const publishedFare = Number(fareValue?.Fare?.PublishedFare);

    if (selectedCoupon !== null) {
      let discountamount = 0;

      if (publishedFare <= discountValueObj?.[0]?.value?.min?.[0]) {
        discountamount = discountValueObj?.[0]?.value?.min?.[1];
      } else if (publishedFare >= discountValueObj?.[0]?.value?.max?.[0]) {
        discountamount = discountValueObj?.[0]?.value?.max?.[1];
      }

      if (discountValueObj?.[0]?.type === "PERCENTAGE") {
        finalAmount =
          publishedFare +
          markUpamount * Number(fareValue?.Fare?.PublishedFare) -
        //   publishedFare * (discountAmount * 0.01);
        // discountAmount = publishedFare * (discountAmount * 0.01);
        publishedFare * (discountamount * 0.01);
        discountAmount = publishedFare * (discountamount * 0.01);
      } else if (discountValueObj?.[0]?.type === "AMOUNT") {
        finalAmount =
          publishedFare +
          markUpamount * Number(fareValue?.Fare?.PublishedFare) -
        //   discountAmount;
        // discountAmount = discountAmount;
        Number( discountamount);
        discountAmount = Number(discountamount);
      }
    } else {
      finalAmount =
        publishedFare + markUpamount * Number(fareValue?.Fare?.PublishedFare);
    }

    // return { amountGenerator: { finalAmount, discountAmount } };
    return { finalAmount, discountAmount };
  };
  const { finalAmount, discountAmount } = totalPriceCalculator();

  //    console.log("finalAmghvfggggggggggggggggggggggggggggggggggggount", fareValueReturn)

  // useEffect(() => {
  //   props.onFinalAmountChange(finalAmount);
  // }, [finalAmount]);
  useEffect(() => {
    if (typeof onFinalAmountChange === 'function') {
      onFinalAmountChange(finalAmount);
      oncouponselect(couponCode);
    } else {
      console.error(error);
    }
  }, [finalAmount,couponCode]);

  return (
    <>
      {fareQuote === 0 ? (
        <>
          <div className="priceSummary">
            <div className="headFlight">
              <span>Price Summary</span>
            </div>
            <p className="depRet">Departure</p>
            {fareValue?.Segments?.[0]?.map((dat, index) => {
              return (
                <>
                  <div className="totCOmmFlight">
                    <div>
                      <span>
                        {dayjs(dat?.Origin?.DepTime).format("DD MMM, YY")}{" "}
                      </span>
                      <p>{dat?.Airline?.FlightNumber}</p>
                      <p>{dat?.Airline?.FareClass} Class</p>
                    </div>
                  </div>
                  <div className="priceChart">
                    <div>
                      <span className="text-bold">From</span>
                      <p className="text-bold">
                        {dat?.Origin?.Airport?.AirportCode}
                      </p>
                    </div>
                    <div>
                      <span className="text-bold">To</span>
                      <p className="text-bold">
                        {dat?.Destination?.Airport?.AirportCode}
                      </p>
                    </div>
                  </div>
                </>
              );
            })}

            <div className="totCOmmFlight">
              {fareValue?.FareBreakdown?.map((data) => {
                return (
                  <div className="">
                    {data?.PassengerType === 1 && (
                      <>
                        <span>Adult x {data?.PassengerCount}</span>
                        <p>
                          {"₹"}
                          {data?.BaseFare + data?.Tax}
                        </p>
                      </>
                    )}
                    {data?.PassengerType === 2 && (
                      <>
                        <span>Child x {data?.PassengerCount}</span>
                        <p>
                          {"₹"}
                          {data?.BaseFare + data?.Tax}
                        </p>
                      </>
                    )}
                    {data?.PassengerType === 3 && (
                      <>
                        <span>Infant x {data?.PassengerCount}</span>
                        <p>
                          {"₹"}
                          {data?.BaseFare + data?.Tax}
                        </p>
                      </>
                    )}
                  </div>
                );
              })}
            </div>

            <p className="depRet">Return</p>
            {fareValue?.Segments?.[1]?.map((dat, index) => {
              return (
                <>
                  <div className="totCOmmFlight">
                    <div>
                      <span>
                        {dayjs(dat?.Origin?.DepTime).format("DD MMM, YY")}
                      </span>
                      <p>{dat?.Airline?.FlightNumber}</p>
                      <p>{dat?.Airline?.FareClass} Class</p>
                    </div>
                  </div>
                  <div className="priceChart">
                    <div>
                      <span className="text-bold">From</span>
                      <p className="text-bold">
                        {dat?.Origin?.Airport?.AirportCode}
                      </p>
                    </div>
                    <div>
                      <span className="text-bold">To</span>
                      <p className="text-bold">
                        {dat?.Destination?.Airport?.AirportCode}
                      </p>
                    </div>
                  </div>
                </>
              );
            })}

            <div className="totCOmmFlight">
              {fareValue?.FareBreakdown?.map((data) => {
                return (
                  <div className="">
                    {data?.PassengerType === 1 && (
                      <>
                        <span>Adult x {data?.PassengerCount}</span>
                        <p>
                          {"₹"}
                          {data?.BaseFare + data?.Tax}
                        </p>
                      </>
                    )}
                    {data?.PassengerType === 2 && (
                      <>
                        <span>Child x {data?.PassengerCount}</span>
                        <p>
                          {"₹"}
                          {data?.BaseFare + data?.Tax}
                        </p>
                      </>
                    )}
                    {data?.PassengerType === 3 && (
                      <>
                        <span>Infant x {data?.PassengerCount}</span>
                        <p>
                          {"₹"}
                          {data?.BaseFare + data?.Tax}
                        </p>
                      </>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="TotGstFlight">
              <div>
                <span>Base Fare: </span>
                <p>
                  {"₹"}
                  {/* {(fareValue?.Fare?.PublishedFare * markUpamount).toFixed(0)} */}
                  {Number(fareValue?.Fare?.PublishedFare).toFixed(2)}
                </p>
              </div>
              <div>
                <span>Total TAX: </span>
                <p>
                  {"₹"}
                  {/* {(fareValue?.Fare?.PublishedFare * markUpamount).toFixed(0)} */}
                  {Number(
                    fareValue?.Fare?.PublishedFare * markUpamount
                  ).toFixed(2)}
                </p>
                </div>
              {discountAmount > 0 && (
                <div>
                  <span>Discount Amount:</span>
                  <p>
                    {"₹"}
                    {Number(discountAmount.toFixed(2))}
                  </p>
                </div>
              )}
              <div>
                <span>Grand Total:</span>
                <p>
                  {"₹"}
                  {/* {(Number(fareValue?.Fare?.PublishedFare) + Number(fareValue?.Fare?.PublishedFare * markUpamount)).toFixed(0)} */}
                  {/* {grandtotal} */}
                  {Number(finalAmount).toFixed(2)}
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
                                            {loading && (
                                                <div className="loader-inside-input"></div>
                                            )}
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
                                                                    {coupondiscount}
                                                                </p>
                                                            </div>
                                                            <div>
                                                                <span>Total:</span>
                                                                <p>
                                                                    {"₹"}
                                                                    
                                                                    {grandtotal}
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <div className="TotGstFlight">
                                                            <div>
                                                                <span>After Discount:</span>

                                                                <p>
                                                                    {"₹"}
                                                                    
                                                                    {afterdicount}
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
            <CouponContainer
              value={flight}
              couponCode={couponCode}
              couponApplied={couponApplied}
              couponStatus={couponStatus}
              couponDiscount={couponDiscount}
              loading={loading}
              selectedCoupon={selectedCoupon}
              error={error}
              onCouponChange={handleCouponChange}
              onCouponStatusChange={handleCouponStatusChange}
              onCouponDiscountChange={handleCouponDiscountChange}
              onLoadingChange={handleLoadingChange}
              onErrorChange={handleErrorChange}
              setSelectedCoupon={setSelectedCoupon}
            />
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

export default RetSummIntlWithCoupon;
