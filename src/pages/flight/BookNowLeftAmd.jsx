import { Box, Grid, Typography } from "@mui/material";

import React, { useState, useRef, useEffect } from "react";
import SecureStorage from "react-secure-storage";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import axios from "axios";
import { FiPlusCircle } from "react-icons/fi";
import { FiMinusCircle } from "react-icons/fi";
import { apiURL } from "../../Constants/constant";
import { useLocation, useNavigate, } from "react-router-dom";
import "./booknowleft.css";
import CouponContainer from "../../components/Coupon/Couponcontainer";

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

  // const [couponApplied, setCouponApplied] = useState(false);

  // const inputRef = useRef(null);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);

  // const [couponCode, setCouponCode] = useState("");
  // const [showApplyButton, setShowApplyButton] = useState(false);

  // const couponamount1 = sessionStorage.getItem("couponCode");
  // const [couponStatus, setCouponStatus] = useState(false);

  const { ResultIndex } = location.state;
  const sesstioResultIndex = ResultIndex;
  const queryParams = new URLSearchParams(location.search);
  const adultCount =Number( queryParams.get("adult"));
  // const adultCount = 2;
  const childCount =Number( queryParams.get("child"));
  // const childCount = 2;
  const infantCount =Number( queryParams.get("infant"));
  // console.log(ResultIndex,"typeof adult  countttttttttttttttttt")


  useEffect(() => {
    if (!props.toggle) {
      setCouponCode("");
      setShowApplyButton(false);
      // console.log(props.Amount, "Amount///////////////");
    }
  }, [props.toggle]);

  // const handleInputChange = (event) => {
  //   const inputValue = event.target.value;
  //   setCouponCode(inputValue);
  //   setShowApplyButton(!!inputValue);
  //   setError(null);
  //   props.toggleState(true);
  //   setCouponStatus(false);
  //   if (couponamount1) {
  //     props.transactionAmount(null);
  //     sessionStorage.removeItem("couponCode");
  //   }

  //   if (!inputValue) {
  //     setCouponStatus(false);
  //     props.transactionAmount(null);
  //     sessionStorage.removeItem("couponCode");
  //   }
  // };
  const { onFinalAmountChange,oncouponselect,disountdata } = props;
  const reducerState = useSelector((state) => state);
  // console.log(reducerState,"hjgjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj");
  const TicketDetails = reducerState?.flightFare?.flightQuoteData?.Results;
  const fareValue = reducerState?.flightFare?.flightQuoteData?.Results;
  const fareQuote = reducerState?.flightFare?.flightQuoteData?.Error?.ErrorCode;
  const discountValue =
    parseInt(fareValue?.Fare?.PublishedFare) -
    parseInt(fareValue?.Fare?.OfferedFare);

    // console.log("reducerState",reducerState);

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
  const taxvaluetotal = Number((Number(markUpamount) * Number(ResultIndex?.monetaryDetail?.[0]?.amount)));
  // const taxvaluetotal = Number((Number(markUpamount) * Number(ResultIndex?.monetaryDetail?.[0]?.amount)));;
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



    // ////////////////////////////////////////////////////////////////////coupon value///////////////////////////////

    const inputRef = useRef(null);
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

  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };
 

  // console.log("discountValueObj///////////////////////////////////", discountValueObj,selectedCoupon);

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

  // console.log(" Number(ResultIndex?.monetaryDetail?.[0]?.amount) ", Number(ResultIndex?.monetaryDetail?.[0]?.amount) +
  //           Number(markUpamount) * Number(ResultIndex?.monetaryDetail?.[0]?.amount) -
  //           Number(ResultIndex?.monetaryDetail?.[0]?.amount), (discountValueObj?.[0].value * 0.01));

    const totalPriceCalculator = () => {
      let finalAmount = 0;
      let discountAmount = 0;
      // if (selectedCoupon !== null) {
      //   if (discountValueObj?.[0].type == "PERCENTAGE") {
      //     finalAmount =
      //       finalAmount +
      //       Number(ResultIndex?.monetaryDetail?.[0]?.amount) +
      //       Number(markUpamount) * Number(ResultIndex?.monetaryDetail?.[0]?.amount) -
      //       Number(ResultIndex?.monetaryDetail?.[0]?.amount) * (discountValueObj?.[0].value * 0.01);
  
      //     discountAmount =
      //       discountAmount +
      //       Number( ResultIndex?.monetaryDetail?.[0]?.amount) * (discountValueObj?.[0].value * 0.01);
      //   } else if (discountValueObj?.[0].type == "AMOUNT") {
      //     finalAmount =
      //       finalAmount +
      //       Number(ResultIndex?.monetaryDetail?.[0]?.amount) +
      //       Number(markUpamount) * Number(ResultIndex?.monetaryDetail?.[0]?.amount) -
      //       discountValueObj?.[0].value;
      //     discountAmount = discountAmount + discountValueObj?.[0].value;
      //   }
      // } else {
      //   finalAmount =
      //     finalAmount +
      //     Number(ResultIndex?.monetaryDetail?.[0]?.amount)+
      //     Number(markUpamount) * Number(ResultIndex?.monetaryDetail?.[0]?.amount);
      // }
      const publishedFare = Number(ResultIndex?.monetaryDetail?.[0]?.amount);


    if (selectedCoupon !== null) {
      let discountamount = 0;
      if (publishedFare <= discountValueObj?.[0].value?.min[0]) {
        discountamount = (discountValueObj?.[0].value?.min[1]);
      } else if (publishedFare >= discountValueObj?.[0].value?.max[0]) {
        discountamount = (discountValueObj?.[0].value?.max[1]);
      }
      if (discountValueObj?.[0].type == "PERCENTAGE") {
        finalAmount = publishedFare + markUpamount * (ResultIndex?.monetaryDetail?.[0]?.amount) - publishedFare * (discountamount * 0.01);
        discountAmount =  publishedFare * discountamount * 0.01;

       
      } else if (discountValueObj?.[0].type == "AMOUNT") {
        finalAmount = Number(publishedFare+ markUpamount * ResultIndex?.monetaryDetail?.[0]?.amount  - discountamount);
        discountAmount = Number(discountamount);
      }
    } else {
      finalAmount =
        finalAmount +
       Number (ResultIndex?.monetaryDetail?.[0]?.amount) +
        Number(markUpamount) * Number(ResultIndex?.monetaryDetail?.[0]?.amount);
    }
      // return { amountGenerator: { finalAmount, discountAmount } };
      return { finalAmount, discountAmount };
    };

    // console.log("totalPriceCalculator",totalPriceCalculator());
    const { finalAmount, discountAmount } = totalPriceCalculator();

    useEffect(() => {
      if (typeof onFinalAmountChange === 'function' &&
        typeof oncouponselect === 'function' &&
        typeof disountdata === 'function') {
        onFinalAmountChange(finalAmount);
        oncouponselect(couponCode);
        disountdata(discountAmount);
      } else {
        console.error(error);
      }
    }, [finalAmount,couponCode,discountAmount]);


    const finalamountvalue = Number(finalAmount) - Number(taxvaluetotal);
    // const finalamountvalue = finalAmount;
    const finalamountvalue1 = Number(finalamountvalue).toFixed(2);



    const adultamount = Number(ResultIndex?.[0]?.paxFareDetail?.totalFareAmount) - Number(ResultIndex?.[0]?.paxFareDetail?.totalTaxAmount) || Number(ResultIndex?.paxFareDetail?.totalFareAmount) - Number(ResultIndex?.paxFareDetail?.totalTaxAmount) ;
    const chilsamount = Number(ResultIndex?.[1]?.paxFareDetail?.totalFareAmount) - Number(ResultIndex?.[1]?.paxFareDetail?.totalTaxAmount) ;
    const infantamount = Number( ResultIndex?.[2]?.paxFareDetail?.totalFareAmount)-Number( ResultIndex?.[2]?.paxFareDetail?.totalTaxAmount) ;

    const  childmultiply =  chilsamount*childCount;

    const infantmultiplicity = infantamount*infantCount;
    // const totalTax = amdata?.monetaryDetail?.[1]?.amount    ;
// console.log(ResultIndex,"ResultIndex");

    const multiplydata =  adultamount*adultCount;


    const departurelocation = ResultIndex?.flightDetails
    ?.flightInformation
    ? ResultIndex?.flightDetails
      ?.flightInformation?.location[0]
      ?.locationId
    : ResultIndex?.flightDetails[0]
      .flightInformation?.location[0]
      ?.locationId;

      const arrivallocation =  ResultIndex?.flightDetails
        ?.flightInformation
        ? ResultIndex?.flightDetails
          ?.flightInformation?.location[1]
          ?.locationId
        : ResultIndex?.flightDetails[
          ResultIndex?.flightDetails.length -
          1
        ].flightInformation?.location[1]
          ?.locationId

  return (
    <>
      {true ? (
        <>
          <div className="priceSummary-new">
            <div className="headFlight-new">
              <span>Price Summary</span>
            </div>

            <div style={{display:"flex",justifyContent:"space-between",marginTop:"12px",padding:"10px"}} >
              {/* <div><p className="departurelocation-value">{departurelocation}</p></div>
              <div><i class="fa-solid fa-jet-fighter"></i></div>
              <div><p className="departurelocation-value">{arrivallocation}</p></div> */}


              <div className="checkInCheckOutBox">
                      <div className="checkInInnerBoxOne">
                        <div className="bookleftdetail">
                          <p>Departure</p>
                          <h5>
                          {departurelocation}
                          </h5>
                          {/* <h2>
                            sdd
                          </h2> */}
                        </div>

                        <div className="bookleftdetail">
                          <p>Arrival</p>
                          <h5>
                          {arrivallocation}
                          </h5>
                          {/* <h2>
                          dfd
                          </h2> */}
                        </div>
                      </div>
                      <div className="checkInInnerBoxTwo">
                        <p>
                         {adultCount} Adult  {childCount > 0 && (
              <>
                {childCount} Child
              </>
            )} 
            {infantCount > 0 && (
              <> {infantCount} Infant</>)}
                        </p>
                        {/* <h5>
                         Adult{" "}
                         
                        </h5> */}
                      </div>
                    </div>
              
            </div>
            {/* {sesstioResultIndex?.flightDetails?.flightInformation ? (
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
                </div> */}
                {/* <div className="priceChart">
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
                </div> */}
              {/* </> */}
            {/* ) : ( */}
              {/* // [i]?.flightInformation?.productDateTime?.dateOfDeparture */}
              {/* sesstioResultIndex?.flightDetails?.map((dat, index) => {
                return (
                  <>
                    <div className="TotGstFlight-new">
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
            )} */}

            {/* <div className="totCOmmFlight">

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

            </div> */}

            <div className="TotGstFlight-new">
            <div style={{color:"#333333",fontSize:"18px",fontWeight:"bold"}}>
                <span className="textcolor">Total Price :</span>
                <p className="textcolor">
                  {"₹"}
                  {/* {(
                    Number(taxvaluetotal) +
                    Number(props.baggAmount) +
                    Number(props.mellAmount)
                  ).toFixed(2)} */}

                  {/* {grandtotalamount} */}
                  {Number(finalamountvalue1).toFixed(0)}
                </p>
              </div>
              <div>
              <div style={{display:"flex",gap:"1px"}}>
                <span className="textcolor1">Base Fare: </span>
                <div style={{background:"none",border:"none",padding:"2px",cursor:"pointer",marginRight:"2px",marginTop:"-4px"}}>                <span style={{margin:"2px"}} onClick={toggleDetails} >
        {showDetails ? <FiMinusCircle/> : <FiPlusCircle/>}
      </span>
      </div>

      </div>
                <p className="textcolor1">
                  {"₹"}
                  {
                  Number(ResultIndex?.monetaryDetail?.[0]?.amount).toFixed(0) -
                  Number(ResultIndex?.monetaryDetail?.[1]?.amount).toFixed(0)}
                  {/* {
                  Number ((Number(ResultIndex?.[0]?.paxFareDetail?.totalFareAmount || ResultIndex?.paxFareDetail?.totalFareAmount) * adultCount) +

                    (ResultIndex?.[1]?.paxFareDetail?.totalFareAmount ? (Number(ResultIndex?.[1]?.paxFareDetail?.totalFareAmount) * childCount) : 0) +
                    (ResultIndex?.[2]?.paxFareDetail?.totalFareAmount ? (Number(ResultIndex?.[2]?.paxFareDetail?.totalFareAmount) * infantCount) : 0)).toFixed()
                  } */}
                </p>
              </div>
              {showDetails && (
        <div  style={{width:"100%",display:"flex",flexDirection:"column"}} >
          <div style={{ borderBottom: "none",width:"100%",display:"flex",justifyContent:"space-between" }}>
            <p className="textcolor1">
              Adult(s) ({adultCount} × {adultamount})
            </p>
            <p className="textcolor1">{"₹"}{multiplydata} </p>
          </div>
          <div style={{ borderBottom: "none" ,width:"100%",display:"flex",justifyContent:"space-between"}}>
            {childCount > 0 && (
              <>
                <p className="textcolor1">Child(s) ({childCount} × {chilsamount})</p>
                <p className="textcolor1">{"₹"}{childmultiply}</p>
              </>
            )}
          </div>
          <div style={{ borderBottom: "none" ,width:"100%",display:"flex",justifyContent:"space-between"}}>
            {infantCount > 0 && (
              <>
                <p className="textcolor1">Infant(s) ({infantCount} × {infantamount})</p>
                <p className="textcolor1">{"₹"}{infantmultiplicity}</p>
              </>
            )}
          </div>
        </div>
      )}
              <div>
                <span className="textcolor1">Surcharges: </span>
                <p className="textcolor1">
                  {"₹"}
                  {Number(ResultIndex?.monetaryDetail?.[1]?.amount).toFixed(0)}
                </p>
              </div>
             
              {/* <div>
                <span>Other Fare: </span>
                <p>
                  {"₹"}
                  {Number(taxvaluetotal).toFixed(2)}
                </p>
              </div> */}
              {discountAmount > 0 && (
      <div>
        <span>Discount Amount:</span>
        <p style={{color:"#44B50C"}}>
          -{"₹"}{Number(discountAmount).toFixed(2)}
        </p>
      </div>
    )}
              {/* <div>
                <span>Grand Total:</span>
                <p>
                  {"₹"}
                {Number(finalamountvalue1)}
                </p>
              </div> */}
            </div>

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

export default BookNowLeftAmd;
