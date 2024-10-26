import React, { useState, useEffect } from 'react'
import SecureStorage from "react-secure-storage";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import axios from "axios";
import { apiURL } from "../../../../Constants/constant";
import { FiPlusCircle } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import { FiMinusCircle } from "react-icons/fi";
import CouponContainer from '../../../../components/Coupon/Couponcontainer';

function Bookrightkafila(props) {
  const { onFinalAmountChange, sesstioResultIndex, fareresponse, oncouponselect, disountamount, totalBaggageFare, mellAmount } = props;
  const location = useLocation();
  const [showDetails, setShowDetails] = useState(false);
  const [showDetailsOther, setShowDetailsOther] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };
  const toggleDetailsOther = () => {
    setShowDetailsOther(!showDetailsOther);
  };
  const queryParams = new URLSearchParams(location.search);

  const reducerState = useSelector((state) => state);
  const TicketDetails = reducerState?.flightFare?.flightQuoteData?.Results;
  //   const fareValue = reducerState?.flightFare?.flightQuoteData?.Results;
  const fareQuote = reducerState?.flightFare?.flightQuoteData?.Error?.ErrorCode;
  //   const discountValue =
  //     parseInt(fareValue?.Fare?.PublishedFare) -
  //     parseInt(fareValue?.Fare?.OfferedFare);

  const markUpamount =
    reducerState?.markup?.markUpData?.data?.result[0]?.flightMarkup;

  //   const integerValue = discountValue;
  //   const coupondiscount = integerValue;

  //   const taxvalue = markUpamount * parseInt(fareValue?.Fare?.PublishedFare);
  // const taxvaluetotal =
  //   parseInt(fareValue?.Fare?.PublishedFare) +
  //   markUpamount * parseInt(fareValue?.Fare?.PublishedFare);
  let total = 0;

  const adultCount = Number(queryParams.get("adult"));
  const childCount = Number(queryParams.get("child"));
  const infantCount = Number(queryParams.get("infant"));

  const totaamount = fareresponse?.data?.result?.FareBreakup?.Journeys?.[0]?.TotalFare;
  const tax = fareresponse?.data?.result?.FareBreakup?.Journeys?.[0]?.TaxTotal;
  const basictotal = fareresponse?.data?.result?.FareBreakup?.Journeys?.[0]?.BasicTotal;
  // console.log(fareresponse?.data?.result?.FareBreakup, "totaafareresponse?.data?.result?.FareBreakupmount")

  // ////////////////coupon//////////////////////////////////

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
// console.log(markUpamount,"markUpamountmarkUpamountmarkUpamount")

  const totalPriceCalculator = () => {
    let finalAmount = 0;
    let discountAmount = 0;
    const publishedFare = (totaamount);


    if (selectedCoupon !== null) {
      let discountamount = 0;
      if (publishedFare <= discountValueObj?.[0].value?.min[0]) {
        discountamount = discountValueObj?.[0].value?.min[1];
      } else if (publishedFare >= discountValueObj?.[0].value?.max[0]) {
        discountamount = discountValueObj?.[0].value?.max[1];
      }

      if (discountValueObj?.[0].type == "PERCENTAGE") {
        finalAmount = parseInt((publishedFare) + (markUpamount) * (publishedFare) - (publishedFare) * (discountamount * 0.01));
        discountAmount = parseInt((publishedFare) * (discountamount * 0.01));


      } else if (discountValueObj?.[0].type == "AMOUNT") {
        finalAmount = parseInt((publishedFare) + (markUpamount) * (publishedFare) - (discountamount));
        discountAmount = Number(discountamount);
      }
    } else {
      finalAmount = parseInt(
        (finalAmount) +
        (publishedFare) +
        (markUpamount) * (publishedFare));
    }

    return { finalAmount, discountAmount };
  };
  const { finalAmount, discountAmount } = totalPriceCalculator();

  const taxvaluetotal = Number((Number(markUpamount) * Number(fareresponse?.data?.result?.FareBreakup?.Journeys?.[0]?.TotalFare)));
  
  const finalamountvalue = Number(finalAmount) - Number(taxvaluetotal);

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
 
  return (
    <>
      <>
        <div className=" priceSummary-new">
          <div className="headFlight-new">
            <span>Price Summary</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "12px", padding: "10px" }} >



            <div className="checkInCheckOutBox">
              <div className="checkInInnerBoxOne">
                <div className="bookleftdetail">
                  <p>Departure</p>
                  <h5>
                    {sesstioResultIndex?.Itinerary[0]?.SrcName}
                  </h5>

                </div>

                <div className="bookleftdetail">
                  <p>Arrival</p>
                  <h5>
                    {
                      sesstioResultIndex?.Itinerary[
                        sesstioResultIndex?.Itinerary.length - 1
                      ]?.DesName
                    }
                  </h5>

                </div>
              </div>
              {/* <div className="checkInInnerBoxTwo">
                  <p>
                    {adultCount} Adult  {childCount > 0 && (
                      <>
                        {childCount} Child
                      </>
                    )}
                    {infantCount > 0 && (
                      <> {infantCount} Infant</>)}
                  </p>
                 
                </div> */}
            </div>

          </div>

          <div className="TotGstFlight-new" style={{ marginTop: "12px" }}>
            <div>
              <span className="textcolor">Total Price :</span>
              <p className="textcolor" >
              
                {"₹"}{parseInt(finalamountvalue) + (totalBaggageFare) + (mellAmount)}
              </p>
              {/* <p className="textcolor" >
                {"₹"}{parseInt((finalAmount) + (totalBaggageFare) + (mellAmount))}
              </p> */}
            </div>

            <div>

              <div style={{ display: "flex", gap: "1px" }}>
                <span className="textcolor1">Base Fare : </span>
                <div style={{ background: "none", border: "none", padding: "2px", cursor: "pointer", marginRight: "2px", marginTop: "-4px" }}>                <span style={{ margin: "2px" }} onClick={toggleDetails} >
                  {/* {showDetails ? <FiMinusCircle /> : <FiPlusCircle />} */}
                </span>
                </div>
              </div>
              <p className="textcolor1"> {"₹"}{parseInt(basictotal)}</p>
            </div>
            {/* {showDetails && (
                <div style={{ width: "100%", display: "flex", flexDirection: "column" }} >
                  <div style={{ borderBottom: "none", width: "100%", display: "flex", justifyContent: "space-between" }}>
                    <p className="textcolor1">
                      Adult(s) ({adultCount} × {adultamount})
                    </p>
                    <p className="textcolor1">{"₹"}{multiplydata} </p>
                  </div>
                  <div style={{ borderBottom: "none", width: "100%", display: "flex", justifyContent: "space-between" }}>
                    {childCount > 0 && (
                      <>
                        <p className="textcolor1">Child(s) ({childCount} × {chilsamount})</p>
                        <p className="textcolor1">{"₹"}{childmultiply}</p>
                      </>
                    )}
                  </div>
                  <div style={{ borderBottom: "none", width: "100%", display: "flex", justifyContent: "space-between" }}>
                    {infantCount > 0 && (
                      <>
                        <p className="textcolor1">Infant(s) ({infantCount} × {infantamount})</p>
                        <p className="textcolor1">{"₹"}{infantmultiplicity}</p>
                      </>
                    )}
                  </div>
                </div>
              )} */}



            <div>
              <span className="textcolor1">Surcharge : </span>
              <p className="textcolor1"> {"₹"}{parseInt(tax)}</p>
            </div>


            {((Number(totalBaggageFare) > 0) || (Number(mellAmount) > 0)) && (
              <div>
                <span onClick={() => toggleDetailsOther()} className="textcolor1">Other TAX {showDetailsOther ? <FiMinusCircle /> : <FiPlusCircle />} : </span>
                <p className="textcolor1">
                  {"₹"}
                  {(Number(totalBaggageFare) + Number(mellAmount))}
                </p>
              </div>



            )

            }
            {showDetailsOther && Number(mellAmount) !== 0 && <div style={{ width: "100%", display: "flex", flexDirection: "column" }} >
              <div style={{ borderBottom: "none", width: "100%", display: "flex", justifyContent: "space-between" }}>
                <p className="textcolor1">
                  Meal
                </p>
                <p className="textcolor1">{"₹"}{Number(mellAmount)} </p>
              </div>
            </div>
            }
            {showDetailsOther && Number(totalBaggageFare) !== 0 && <div style={{ width: "100%", display: "flex", flexDirection: "column" }} >
              <div style={{ borderBottom: "none", width: "100%", display: "flex", justifyContent: "space-between" }}>
                <p className="textcolor1">
                  Baggage
                </p>
                <p className="textcolor1">{"₹"}{parseInt(totalBaggageFare)} </p>
              </div>
            </div>
            }
            {/* {showDetailsOther && Number(totalSeatAmount) !== 0 && <div style={{ width: "100%", display: "flex", flexDirection: "column" }} >
                <div style={{ borderBottom: "none", width: "100%", display: "flex", justifyContent: "space-between" }}>
                  <p className="textcolor1">
                    Seat
                  </p>
                  <p className="textcolor1">{"₹"}{Number(totalSeatAmount)} </p>
                </div>
              </div>
              } */}

            {discountAmount > 0 && (
              <div>
                <span className="textcolor1">Discount Amount :</span>
                <p style={{ color: "#44B50C" }} className="textcolor1">
                  - {"₹"}{Number(discountAmount).toFixed(2)}
                </p>
              </div>
            )}




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
    </>
  )
}

export default Bookrightkafila