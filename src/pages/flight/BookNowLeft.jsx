import { Box, Grid, Typography } from "@mui/material";

import React, { useState, useRef, useEffect } from "react";
import SecureStorage from "react-secure-storage";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import axios from "axios";
import { apiURL } from "../../Constants/constant";
import { FiPlusCircle } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import { FiMinusCircle } from "react-icons/fi";

import "./booknowleft.css";
import Couponcontainer from "../../components/Coupon/Couponcontainer";

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
  const location = useLocation();
  const AmountList = useSelector((state) => state?.airlineSeatMap?.amountTVO);
  let totalSeatAmount
  // useEffect(()=>{

  totalSeatAmount = AmountList ? AmountList.reduce((acc, curr) => {

    // console.log(acc,curr)
    return acc + curr[0]
  }, 0) : 0
  // },[AmountList])
  // console.log(totalSeatAmount,"bookwrqappernowtotalamunt")

  const { onFinalAmountChange, oncouponselect, disountamount } = props;
  // console.log(props.baggAmount, "props.BaseFareeeeeeeeeeeee")

  const isDummyStorageTrue = sessionStorage.getItem("hdhhfb7383__3u8748");
  const propFunction = props.handleClick;

  const [finalAmountNew, setFinalAmountNew] = useState(0);

  const [showDetails, setShowDetails] = useState(false);
  const [showDetailsOther, setShowDetailsOther] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };
  const toggleDetailsOther = () => {
    setShowDetailsOther(!showDetailsOther);
  };
  const queryParams = new URLSearchParams(location.search);


  const inputRef = useRef(null);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);

  // const [couponApplied, setCouponApplied] = useState(false);
  // const [couponCode, setCouponCode] = useState("");
  // const [showApplyButton, setShowApplyButton] = useState(false);
  // const [couponStatus, setCouponStatus] = useState(false);
  // const [couponDiscount, setCouponDiscount] = useState(0);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  // const [coupons, setCoupons] = useState([]);

  // const [couponCode, setCouponCode] = useState("");
  // const [showApplyButton, setShowApplyButton] = useState(false);

  // const couponamount1 = sessionStorage.getItem("couponCode");
  // const [couponStatus, setCouponStatus] = useState(false);
  // const handleApplyCoupon1 = async () => {
  //   try {
  //     setLoading(true);

  //     const token = SecureStorage.getItem("jwtToken");
  //     const couponCode = inputRef.current.value;

  //     const response = await axios.put(
  //       `${apiURL.baseURL}/skyTrails/api/coupons/applyCoupon`,
  //       { couponCode: couponCode },
  //       {
  //         headers: {
  //           token: token,
  //         },
  //       }
  //     );

  //     if (response?.data?.statusCode === 200) {
  //       setCouponStatus(true);
  //       sessionStorage.setItem("couponCode", couponCode);
  //       await props.transactionAmount(
  //         parseInt(fareValue?.Fare?.PublishedFare) +
  //         markUpamount * parseInt(fareValue?.Fare?.PublishedFare) -
  //         coupondiscount
  //       );
  //     }
  //   } catch (error) {
  //     setLoading(false);

  //     if (error.response && error.response.data.statusCode === 409) {
  //       setCouponStatus(false);
  //       setError("Coupon already applied");
  //       setTimeout(() => {
  //         setError(null);
  //       }, 4000);
  //     } else if (error.response && error.response.data.statusCode === 404) {
  //       setError(
  //         error.response?.data?.responseMessage ||
  //         "Error Applying coupon . Please try again."
  //       );
  //     } else {
  //       setError(
  //         error.response?.data?.message ||
  //         "Error applying coupon. Please try again."
  //       );
  //       setCouponStatus(false);
  //     }
  //   } finally {
  //     setLoading(false);
  //     props.toggleState(true);
  //   }
  // };

  // useEffect(() => {
  //   if (!props.toggle) {
  //     setCouponCode("");
  //     setShowApplyButton(false);
  //     // console.log(props.Amount, "Amount///////////////");
  //   }
  // }, [props.toggle]);

  // ///////////////////////////coupon functions /////////////////////////////////////////////////////////////

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

  // const totalPriceCalculator = () => {
  //   let finalAmount = 0;
  //   let discountAmount = 0;
  //   if (selectedCoupon !== null) {
  //     if (discountValueObj?.[0].type == "PERCENTAGE") {
  //       finalAmount =
  //         finalAmount +
  //         Number(FlightPrice) +
  //         Number(FlightPrice * reduxMarkup.flightMarkup) -
  //         Number(FlightPrice) * (discountValueObj?.[0].value * 0.01);

  //       discountAmount =
  //         discountAmount +
  //         Number(FlightPrice) * (discountValueObj?.[0].value * 0.01);
  //     } else if (discountValueObj?.[0].type == "AMOUNT") {
  //       finalAmount =
  //         finalAmount +
  //         Number(FlightPrice) +
  //         Number(FlightPrice * reduxMarkup.flightMarkup) -
  //         discountValueObj?.[0].value;
  //       discountAmount = discountAmount + discountValueObj?.[0].value;
  //     }
  //   } else {
  //     finalAmount =
  //       finalAmount +
  //       Number(FlightPrice) +
  //       Number(FlightPrice * reduxMarkup.flightMarkup);
  //   }
  //   return { amountGenerator: { finalAmount, discountAmount } };
  // };

  // console.log("discountValueObj", discountValueObj,selectedCoupon);

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

  // /////////////////////////////////////////////////////////////////////////////////////////////////////////

  const reducerState = useSelector((state) => state);
  const TicketDetails = reducerState?.flightFare?.flightQuoteData?.Results;
  const fareValue = reducerState?.flightFare?.flightQuoteData?.Results;
  const fareQuote = reducerState?.flightFare?.flightQuoteData?.Error?.ErrorCode;
  const discountValue =
    parseInt(fareValue?.Fare?.PublishedFare) -
    parseInt(fareValue?.Fare?.OfferedFare);

  const markUpamount =
    reducerState?.markup?.markUpData?.data?.result[0]?.flightMarkup;
  // console.log("fareValue", fareValue,fareQuote);
  // console.log("fareValue", discountValue);

  const integerValue = discountValue;
  const coupondiscount = integerValue;

  const taxvalue = markUpamount * parseInt(fareValue?.Fare?.PublishedFare);
  // const taxvaluetotal =
  //   parseInt(fareValue?.Fare?.PublishedFare) +
  //   markUpamount * parseInt(fareValue?.Fare?.PublishedFare);
  let total = 0;

  const adultCount = Number(queryParams.get("adult"));
  const childCount = Number(queryParams.get("child"));
  const infantCount = Number(queryParams.get("infant"));

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

  const flight = "FLIGHTS";
  // console.log("selectedCousdkcbskdjcbskdcbjsdcbjsdcpon", selectedCoupon,discountValueObj);

  const taxvaluetotal = parseInt(fareValue?.Fare?.PublishedFare);
  // markUpamount * parseInt(fareValue?.Fare?.PublishedFare);

  // console.log("taxvaluetotal",taxvaluetotal);

  const grandtotalamount = (
    Number(taxvaluetotal) +
    Number(props.baggAmount) +
    Number(props.mellAmount)
  ).toFixed(2);

  const totalPriceCalculator = () => {
    let finalAmount = 0;
    let discountAmount = 0;
    const publishedFare = (fareValue?.Fare?.PublishedFare);


    if (selectedCoupon !== null) {
      let discountamount = 0;
      if (publishedFare <= discountValueObj?.[0].value?.min[0]) {
        discountamount = discountValueObj?.[0].value?.min[1];
      } else if (publishedFare >= discountValueObj?.[0].value?.max[0]) {
        discountamount = discountValueObj?.[0].value?.max[1];
      }

      // console.log(discountamount,"discountamount////////////////////");
      // if (discountValueObj?.[0].type == "PERCENTAGE") {
      //   finalAmount =
      //     finalAmount +
      //     parseInt(fareValue?.Fare?.PublishedFare) +
      //     markUpamount * parseInt(fareValue?.Fare?.PublishedFare) -
      //     parseInt(fareValue?.Fare?.PublishedFare) *
      //       (discountValueObj?.[0].value * 0.01);

      //   discountAmount =
      //     discountAmount +
      //     parseInt(fareValue?.Fare?.PublishedFare) *
      //       (discountValueObj?.[0].value * 0.01);
      if (discountValueObj?.[0].type == "PERCENTAGE") {
        finalAmount = Number(publishedFare) + Number(markUpamount) * Number(publishedFare) - Number(publishedFare) * Number(discountamount * 0.01);
        discountAmount = Number(publishedFare) * Number(discountamount * 0.01);


      } else if (discountValueObj?.[0].type == "AMOUNT") {
        finalAmount = Number(publishedFare) + Number(markUpamount) * Number(publishedFare) - Number(discountamount);
        discountAmount = Number(discountamount);
      }
      // } else if (discountValueObj?.[0].type == "AMOUNT") {
      //   finalAmount =
      //     finalAmount +
      //     parseInt(fareValue?.Fare?.PublishedFare) +
      //     markUpamount * parseInt(fareValue?.Fare?.PublishedFare) -
      //     discountValueObj?.[0].value;
      //   discountAmount = discountAmount + discountValueObj?.[0].value;
      // }
    } else {
      finalAmount =
        Number(finalAmount) +
        Number(fareValue?.Fare?.PublishedFare) +
        Number(markUpamount) * Number(fareValue?.Fare?.PublishedFare);
    }
    // return { amountGenerator: { finalAmount, discountAmount } };
    return { finalAmount, discountAmount };
  };
  const { finalAmount, discountAmount } = totalPriceCalculator();

  const finalvalue = Number(finalAmount) - Number(taxvalue);

  useEffect(() => {
    if (typeof onFinalAmountChange === 'function' &&
      typeof oncouponselect === 'function' &&
      typeof disountamount === 'function') {
      onFinalAmountChange(finalAmount);
      oncouponselect(couponCode);
      disountamount(discountAmount);
    } else {
      console.error(error);
    }
  }, [finalAmount, couponCode, discountAmount]);
  // console.log("totalPriceCalculator", totalPriceCalculator());


  const adultamount = Number(fareValue?.FareBreakdown?.[0]?.BaseFare);
  const chilsamount = Number(fareValue?.FareBreakdown?.[1]?.BaseFare);
  const infantamount = Number(fareValue?.FareBreakdown?.[2]?.BaseFare);

  const childmultiply = chilsamount;

  const infantmultiplicity = infantamount;
  // const totalTax = amdata?.monetaryDetail?.[1]?.amount    ;


  const multiplydata = adultamount;

  // console.log(
  //   finalAmount,
  //   discountAmount,
  //   "hgfghfghfghfhgfghfghfghfghfhgfhgfgh"
  // );

  return (
    <>
      {fareQuote === 0 ? (
        <>
          <div className=" priceSummary-new">
            <div className="headFlight-new">
              <span>Price Summary</span>
            </div>
            {/* {fareValue?.Segments?.map((dat, index) => {
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
                    <div className="totCOmmFlight-new">
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
                  </>
                );
              });
            })} */}

            {/* <div className="totCOmmFlight-new">
              {fareValue?.FareBreakdown?.map((data) => {
                return (
                  <div className="">
                    {data?.PassengerType === 1 && (
                      <>
                        <span>Adult x {data?.PassengerCount}</span>
                        <p>
                          {"₹"}
                          {Number(data?.BaseFare + data?.Tax).toFixed(0)}
                        </p>
                      </>
                    )}
                    {data?.PassengerType === 2 && (
                      <>
                        <span>Child x {data?.PassengerCount}</span>
                        <p>
                          {"₹"}
                          {Number(data?.BaseFare + data?.Tax).toFixed(0)}
                        </p>
                      </>
                    )}
                    {data?.PassengerType === 3 && (
                      <>
                        <span>Infant x {data?.PassengerCount}</span>
                        <p>
                          {"₹"}
                          {Number(data?.BaseFare + data?.Tax).toFixed(0)}
                        </p>
                      </>
                    )}
                  </div>
                );
              })}
            </div> */}

            <div className="TotGstFlight-new">
            <div style={{color:"#333333",fontSize:"18px",fontWeight:"bold"}}>
                <span>Total Price :</span>
                <p>
                  {"₹"}
                  {/* {(
                    Number(taxvaluetotal) +
                    Number(props.baggAmount) +
                    Number(props.mellAmount)
                  ).toFixed(2)} */}

                  {/* {Number(
                    Number(finalvalue) +
                    Number(props.baggAmount) +
                    Number(props.mellAmount) +
                    Number(totalSeatAmount)
                  ).toFixed(2)} */}
                  {/* {grandtotalamount} */}
                  {Number(
                    Number(finalvalue) +
                    Number(props.baggAmount) +
                    Number(props.mellAmount)+
                    Number(totalSeatAmount)
                  ).toFixed(2)}
                </p>
              </div>
              <div>

              <div style={{display:"flex",gap:"1px"}}>
                <span>Base Fare : </span>
                <div style={{background:"none",border:"none",padding:"2px",cursor:"pointer",marginRight:"2px",marginTop:"-4px"}}>                <span style={{margin:"2px"}} onClick={toggleDetails} >
        {showDetails ? <FiMinusCircle/> : <FiPlusCircle/>}
      </span>
      </div>
      </div>
      <p> {"₹"}{parseInt(fareValue?.Fare?.BaseFare)}</p>
      </div>
      {showDetails && (
        <div  style={{width:"100%",display:"flex",flexDirection:"column"}} >
          <div style={{ borderBottom: "none",width:"100%",display:"flex",justifyContent:"space-between" }}>
            <p>
              Adult(s) ({adultCount} × {adultamount})
            </p>
            <p>{"₹"} {multiplydata} </p>
          </div>
          <div style={{ borderBottom: "none" ,width:"100%",display:"flex",justifyContent:"space-between"}}>
            {childCount > 0 && (
              <>
                <p>Child(s) ({childCount} × {chilsamount})</p>
                <p>{"₹"} {childmultiply}</p>
              </>
            )}
          </div>
          <div style={{ borderBottom: "none" ,width:"100%",display:"flex",justifyContent:"space-between"}}>
            {infantCount > 0 && (
              <>
                <p>Infant(s) ({infantCount} × {infantamount})</p>
                <p>{"₹"} {infantmultiplicity}</p>
              </>
            )}
          </div>
        </div>
      )}
   
               

              <div>
                <span>Surcharge : </span>
                <p> {"₹"}{parseInt(fareValue?.Fare?.Tax)}</p>
              </div>
              {/* <div>
                <span>Other TAX : </span>
                <p>
                  {"₹"}
                  {(
                    Number(taxvalue) +
                    Number(props.baggAmount) +
                    Number(props.mellAmount)
                  ).toFixed(2)}
                </p>
              </div> */}

              {((Number(props.mellAmount) > 0) || (Number(props.baggAmount) > 0) || (totalSeatAmount) > 0) && (
                <div>
                  <span onClick={() => toggleDetailsOther()}>Other TAX {showDetailsOther ? <FiMinusCircle /> : <FiPlusCircle />} : </span>
                  <p>
                    {"₹"}
                    {(Number(props.baggAmount) + Number(props.mellAmount) + Number(totalSeatAmount))}
                  </p>
                </div>



              )

              }
              {showDetailsOther && Number(props.mellAmount) !== 0 && <div style={{ width: "100%", display: "flex", flexDirection: "column" }} >
                <div style={{ borderBottom: "none", width: "100%", display: "flex", justifyContent: "space-between" }}>
                  <p>
                    Meal
                  </p>
                  <p>{"₹"} {Number(props.mellAmount)} </p>
                </div>
              </div>
              }
              {showDetailsOther && Number(props.baggAmount) !== 0 && <div style={{ width: "100%", display: "flex", flexDirection: "column" }} >
                <div style={{ borderBottom: "none", width: "100%", display: "flex", justifyContent: "space-between" }}>
                  <p>
                    Baggage
                  </p>
                  <p>{"₹"} {Number(props.baggAmount)} </p>
                </div>
              </div>
              }
              {showDetailsOther && Number(totalSeatAmount) !== 0 && <div style={{ width: "100%", display: "flex", flexDirection: "column" }} >
                <div style={{ borderBottom: "none", width: "100%", display: "flex", justifyContent: "space-between" }}>
                  <p>
                    Seat
                  </p>
                  <p>{"₹"} {Number(totalSeatAmount)} </p>
                </div>
              </div>
              }

              {discountAmount > 0 && (
                <div>
                  <span>Discount Amount :</span>
                  <p style={{color:"#44B50C"}}>
                    - {"₹"}
                    {Number(discountAmount).toFixed(2)}
                  </p>
                </div>
              )}


              {/* <div>
                <span>Grand Total :</span>
                <p>
                  {"₹"} */}
                  {/* {(
                    Number(taxvaluetotal) +
                    Number(props.baggAmount) +
                    Number(props.mellAmount)
                  ).toFixed(2)} */}

                  {/* {grandtotalamount} */}
                  {/* {Number(
                    Number(finalvalue) +
                    Number(props.baggAmount) +
                    Number(props.mellAmount) +
                    Number(totalSeatAmount)
                  ).toFixed(2)}
                </p>
              </div> */}

            </div>
            {/* <Couponcontainer value={flight}   /> */}
            <Couponcontainer
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

export default BookNowLeft;

{
  /* {isDummyStorageTrue === "false" ? (
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
                                  {Number((fareValue?.Fare?.PublishedFare) +
                                    markUpamount *
                                    (fareValue?.Fare?.PublishedFare)).toFixed(2) + props.baggAmount}
                                </p>
                              </div>
                            </div>

                            <div className="TotGstFlight">
                              <div>
                                <span>After Discount:</span>

                                <p>
                                  {"₹"}
                                  {Number((fareValue?.Fare?.PublishedFare) +
                                    markUpamount *
                                    (fareValue?.Fare?.PublishedFare) -
                                    coupondiscount).toFixed(2) + props.baggAmount}
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
            ) : null} */
}
