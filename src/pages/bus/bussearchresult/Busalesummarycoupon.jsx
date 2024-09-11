import React, { useEffect, useState, useRef } from "react";

import axios from "axios";
import { apiURL } from "../../../Constants/constant";


import SecureStorage from "react-secure-storage";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import CouponContainer from "../../../components/Coupon/Couponcontainer";

function Busalesummarycoupon(props) {
  const { onFinalAmountChange, oncouponselect } = props;
  const location = useLocation();
  const reducerState = useSelector((state) => state);
  const markUpamount =
    reducerState?.markup?.markUpData?.data?.result[0]?.busMarkup;

  const [publishedPrice, setPublishedPrice] = useState(0);
  const [offerPrice, setOfferedPrice] = useState(0);
  const seatData = sessionStorage.getItem("seatData");
  const parsedSeatData = JSON.parse(seatData);
  const seatObject = parsedSeatData?.blockedSeatArray;
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [couponStatus, setCouponStatus] = useState(false);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCoupon, setSelectedCoupon] = useState(null);

  const published = seatObject.reduce(function (
    accumulator,
    currentValue,
    currentIndex,
    array
  ) {
    return accumulator + currentValue?.Price?.PublishedPriceRoundedOff;
  },
    0);

  const offeredPrice = seatObject.reduce(
    (accumulator, currentValue, currentIndex, array) => {
      return accumulator + currentValue?.Price?.OfferedPrice;
    },
    0
  );



  const discount = Number(published - offeredPrice).toFixed(1);
  const othertax = Number(markUpamount * published).toFixed(1);


  useEffect(() => {
    setOfferedPrice(offeredPrice);
    setPublishedPrice(published);
    // setTds(tdsTotal);
  }, []);

  useEffect(() => {
    sessionStorage.removeItem("couponCode");

  }, []);

  // ///////////////////////////coupon functions /////////////////////////////////////////////////////////////



  const discountValueObj = selectedCoupon?.discountPercentage?.filter(
    (item, index) => {
      return item?.name == "BUS" || item?.name == "FORALL";
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

  const flight = "BUS";

  const totalPriceCalculator = () => {
    let finalAmount = 0;
    let discountAmount = 0;
    const publishedFare = Number(published);
    if (selectedCoupon !== null) {
      let discountamount = 0;
      if (publishedFare <= discountValueObj?.[0].value?.min[0]) {
        discountamount = Number(discountValueObj?.[0].value?.min[1]);
      } else if (publishedFare >= discountValueObj?.[0].value?.max[0]) {
        discountamount = Number(discountValueObj?.[0].value?.max[1]);
      }

      if (discountValueObj?.[0].type == "PERCENTAGE") {
        finalAmount = Number(publishedFare) + Number(markUpamount) * Number(publishedFare) - Number(publishedFare) * Number(discountamount * 0.01);
        discountAmount = Number(publishedFare) * Number(discountamount * 0.01);


      }
      else if (discountValueObj?.[0].type == "AMOUNT") {
        finalAmount = Number(publishedFare) + Number(markUpamount) * Number(publishedFare) - Number(discountamount);
        discountAmount = Number(discountamount);
      }


    } else {
      finalAmount =
        Number(finalAmount) +
        Number(published) +
        Number(markUpamount) * Number(published);
    }

    return { finalAmount, discountAmount };
  };
  const { finalAmount, discountAmount } = totalPriceCalculator();

  useEffect(() => {
    if (typeof onFinalAmountChange === 'function') {
      onFinalAmountChange(finalAmount);
      oncouponselect(couponCode);
    } else {
      console.error(error);
    }
  }, [finalAmount, couponCode]);

  return (
    <>

      <div className="priceSummaryHotel">
        <div className="head">
          <span>Price Summary</span>
        </div>
        <div className="priceChart">
          <div>
            <span className="text-bold">Rate</span>
          </div>
          <div>
            <span>Published</span>
            <p>
              {"₹"}
              {publishedPrice}
            </p>
          </div>
          <div>
            <span>Other Tax</span>
            <p>
              {"₹"}
              {othertax}
            </p>
          </div>
          {discountAmount > 0 && (
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <span>Discount Amount:</span>
              <p>
                {"₹"}
                {Number(discountAmount).toFixed(2)}
              </p>
            </div>
          )}

        </div>

        <div className="TotGst">
          <div>
            <span>Grand Total:</span>
            <p>
              {"₹"}
              {Number(finalAmount).toFixed(2)}
            </p>
          </div>

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
  )
}

export default Busalesummarycoupon