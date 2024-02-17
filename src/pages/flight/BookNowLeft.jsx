import { Box, Grid, Typography } from "@mui/material";

import React, { useState, useRef, useEffect } from "react";


import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import axios from "axios";
import { apiURL } from "../../Constants/constant";

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

const BookNowLeft = (props) => {
  const [showInput, setShowInput] = useState(false);

  const isDummyStorageTrue = sessionStorage.getItem("hdhhfb7383__3u8748");

  // console.log(props, "props");
  const propFunction = props.handleClick;
  // console.log(propFunction, "propFunction");
  const [couponApplied, setCouponApplied] = useState(false);

  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [couponCode, setCouponCode] = useState("");
  const [showApplyButton, setShowApplyButton] = useState(false);
  // props = {
  //   transactionAmount: { transactionAmount },
  //   handleClick: { handleClickButton },
  //   toggle: { toggle },
  //   toggleState: { toggleState },
  //   amountChange: 500,
  // };
  // const inputRef = useRef(null);

  // const handleInputChange = (event) => {
  //   const inputValue = event.target.value;
  //   setCouponCode(inputValue);
  //   setShowApplyButton(!!inputValue);
  //   setError(null);

  //   if (!inputValue) {
  //     setCouponStatus(false);
  //   }
  // };

  // useEffect(() => {
  //   if (inputRef.current) {
  //     inputRef.current.focus();
  //   }
  // }, [couponApplied]);


  const couponamount1 = sessionStorage.getItem("couponCode");
  const [couponStatus, setCouponStatus] = useState(false);
  const handleApplyCoupon1 = async () => {
    try {
      setLoading(true);

      const token = sessionStorage.getItem("jwtToken");
      const couponCode = inputRef.current.value;

      const response = await axios.put(
      `  ${apiURL.baseURL}/skyTrails/api/coupons/applyCoupon`,
        { couponCode: couponCode },
        {
          headers: {
            token: token,
          },
        }
      );

      if (response?.data?.statusCode === 200) {
        setCouponStatus(true);
        // setSuccessMessage("Coupon applied successfully");
        // sessionStorage.setItem(
        //   "flightcoupon",
        //   fareValue?.Fare?.PublishedFare + markUpamount - coupondiscount
        // );
        sessionStorage.setItem("couponCode", couponCode);
        await props.transactionAmount(
          fareValue?.Fare?.PublishedFare + markUpamount - coupondiscount
        );
      }
    } catch (error) {
      setLoading(false);

      if (error.response && error.response.data.statusCode === 409) {
        setCouponStatus(false);
        setError("Coupon already applied");
        setTimeout(() => {
          setError(null);
        }, 4000); // Adjust the timeout duration as needed (4 seconds in this case)
      } else {
        setError(
          error.response?.data?.responseMessage ||
            "Error applying coupon. Please try again."
        );
        setCouponStatus(false);
      }
    } finally {
      setLoading(false);
      props.toggleState(true);
      // props.handleClick;

      // console.log(props.handleClick, "props.handleClick");
      // amountChange();
    }
  };


  useEffect(() => {
    if (!props.toggle) {
      setCouponCode("");
      setShowApplyButton(false);
      // console.log(props.Amount, "Amount///////////////");
    }
  }, [props.toggle]);

  // }

  // console.log(couponStatus, "statuis of coupon")

  // const handleInputChange = (event) => {
  //   const inputValue = event.target.value;
  //   setShowInput(true);
  //   setError(null);
  //   // toggleState(true);
  //   setCouponStatus(false);
  //   // setSuccessMessage(null);
  //   setCouponCode(inputValue);
  //   setCouponApplied(true);
  //   if (couponamount1) {
  //     sessionStorage.removeItem("flightcoupon");
  //     sessionStorage.removeItem("couponCode");
  //   }

  //   if (!inputValue) {
  //     setCouponStatus(false);
  //     sessionStorage.removeItem("flightcoupon");
  //     sessionStorage.removeItem("couponCode");
  //   }
  // };

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setCouponCode(inputValue);
    setShowApplyButton(!!inputValue);
    setError(null);
    props.toggleState(true);
    setCouponStatus(false);
    // amountChange();
    // console.warn(toggle, "toggle value........");
    // setSuccessMessage(null);
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
    fareValue?.Fare?.PublishedFare - fareValue?.Fare?.OfferedFare;

  const markUpamount =
    reducerState?.markup?.markUpData?.data?.result[0]?.flightMarkup;
  // console.log("fareValue", discountValue);

  const integerValue = parseInt(discountValue);
  const coupondiscount = integerValue + markUpamount;

  let total = 0;
  // console.log(fareValue, "segments");
  // const summary = fareValue?.Segments?.

  // const flightcoupon = (fareValue?.Fare?.PublishedFare +
  //   markUpamount)-coupondiscount;
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

  return (
    <>
      {fareQuote === 0 ? (
        <>
          {TicketDetails?.Segments[0].length == 2 ? (
            <>
              <div className="priceSummary">
                <div className="headFlight">
                  <span>Price Summary</span>
                </div>
                {/* <div className="hotName">
                      <p>hotel name</p> 
                    </div> */}
                <div className="totCOmmFlight">
                  <div>
                    <span>{formattedDate}</span>
                    <p>{fareValue?.Segments[0][0]?.Airline?.FlightNumber}</p>
                    <p>{fareValue?.Segments[0][0]?.Airline?.FareClass} Class</p>
                  </div>
                </div>
                <div className="priceChart">
                  <div>
                    <span className="text-bold">From</span>
                    <p className="text-bold">
                      {fareValue?.Segments[0][0]?.Origin?.Airport?.AirportCode}
                    </p>
                  </div>
                  <div>
                    <span className="text-bold">To</span>
                    <p className="text-bold">
                      {
                        fareValue?.Segments[0][1]?.Destination?.Airport
                          ?.AirportCode
                      }
                    </p>
                  </div>
                </div>
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
                    <span>Total TAX: </span>
                    <p>
                      {"₹"}
                      {markUpamount}
                    </p>
                  </div>
                  <div>
                    <span>Grand Total:</span>
                    <p>
                      {"₹"}
                      {fareValue?.Fare?.PublishedFare + markUpamount}
                    </p>
                  </div>
                </div>
                {isDummyStorageTrue === "false" ? (
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
                                      {fareValue?.Fare?.PublishedFare +
                                        markUpamount}
                                    </p>
                                  </div>
                                </div>

                                <div className="TotGstFlight">
                                  <div>
                                    <span>After Discount:</span>
                                    <p>
                                      {"₹"}
                                      {parseFloat(
                                        (
                                          fareValue?.Fare?.PublishedFare +
                                          markUpamount -
                                          coupondiscount
                                        ).toFixed(2)
                                      )}
                                    </p>
                                  </div>
                                </div>
                                {/* <button className="applycoupen-button1">
                                  Submit
                                </button> */}

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
                ) : null}
              </div>
            </>
          ) : (
            <>
              {fareValue?.Segments?.map((dat, index) => {
                return dat?.map((data1) => {
                  const dateString = data1?.Origin?.DepTime;
                  const date = new Date(dateString);
                  const day = date.getDate();
                  const month = date.toLocaleString("default", {
                    month: "short",
                  });
                  const year = date.getFullYear();
                  const formattedDate = `${day} ${month} ${year}`;
                  return (
                    <>
                      <div className="priceSummary">
                        <div className="headFlight">
                          <span>Price Summary</span>
                        </div>

                        <div className="totCOmmFlight">
                          <div>
                            <span>{formattedDate}</span>
                            <p>{data1?.Airline?.FlightNumber}</p>
                            <p>{data1?.Airline?.FareClass} Class</p>
                          </div>
                        </div>
                        <div className="priceChart">
                          <div>
                            <span className="text-bold">From</span>
                            <p className="text-bold">
                              {data1?.Origin?.Airport?.AirportCode}
                            </p>
                          </div>
                          <div>
                            <span className="text-bold">To</span>
                            <p className="text-bold">
                              {data1?.Destination?.Airport?.AirportCode}
                            </p>
                          </div>
                        </div>
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
                            <span>Total TAX: </span>
                            <p>
                              {"₹"}
                              {markUpamount}
                            </p>
                          </div>
                          <div>
                            <span>Grand Total:</span>
                            <p>
                              {"₹"}
                              {fareValue?.Fare?.PublishedFare + markUpamount}
                            </p>
                          </div>
                        </div>

                        {isDummyStorageTrue === "false" ? (
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
                                              {fareValue?.Fare?.PublishedFare +
                                                markUpamount}
                                            </p>
                                          </div>
                                        </div>

                                        <div className="TotGstFlight">
                                          <div>
                                            <span>After Discount:</span>

                                            <p>
                                              {"₹"}
                                              {parseFloat(
                                                (
                                                  fareValue?.Fare
                                                    ?.PublishedFare +
                                                  markUpamount -
                                                  coupondiscount
                                                ).toFixed(2)
                                              )}
                                            </p>
                                          </div>
                                        </div>
                                        {/* <button className="applycoupen-button1">
                                          Submit
                                        </button> */}
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
                        ) : null}
                      </div>
                    </>
                  );
                });
              })}
            </>
          )}

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

export default BookNowLeft;