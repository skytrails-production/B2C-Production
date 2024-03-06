import React, { useEffect, useState, useRef } from "react";

import axios from "axios";
import { apiURL } from "../../../Constants/constant";


import SecureStorage from "react-secure-storage";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

const BusSaleSummary = ({ toggle, toggleState, transactionAmount, Amount }) => {
  const [showInput, setShowInput] = useState(false);
  const [couponApplied, setCouponApplied] = useState(false);
  const inputRef = useRef(null);
  const [couponCode, setCouponCode] = useState("");
  const [showApplyButton, setShowApplyButton] = useState(false);
  const [loading, setLoading] = useState(false);
  const [couponStatus, setCouponStatus] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const location = useLocation();
  const pathname = location.pathname;
  // console.warn(pathname, "pathbame");
  const reducerState = useSelector((state) => state);
  const markUpamount =
    reducerState?.markup?.markUpData?.data?.result[0]?.busMarkup;

  const [publishedPrice, setPublishedPrice] = useState(0);
  const [offerPrice, setOfferedPrice] = useState(0);
  const seatData = sessionStorage.getItem("seatData");
  const parsedSeatData = JSON.parse(seatData);
  const seatObject = parsedSeatData?.blockedSeatArray;

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


  const grandTotal = published + markUpamount * published;
  

  const discount = published - offeredPrice;
  const couponDiscount = discount;

  const discount1 = parseInt(discount);
  const coupondiscount1 = parseInt(couponDiscount);

  const totalaftercoupon = grandTotal - coupondiscount1;
  // const couponamount = sessionStorage.getItem("totalaftercoupon");

  const handleApplyCoupon3 = async () => {
    try {
      setLoading(true);

      const token = SecureStorage.getItem("jwtToken");
      const couponCode = inputRef.current.value;

      const response = await axios.put(
        ` ${apiURL.baseURL}/skyTrails/api/coupons/applyCoupon`,
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
        await transactionAmount(totalaftercoupon);
        // sessionStorage.setItem("totalaftercoupon", totalaftercoupon);
        sessionStorage.setItem("couponCode", couponCode);

        // console.warn("status true");
      }
    } catch (error) {
      setLoading(false);

      if (error.response && error.response.data.statusCode === 409) {
        setCouponStatus(false);
        setError("Coupon already applied");
        setTimeout(() => {
          setError(null);
        }, 4000);

      }
      if (error.response && error.response.data.statusCode === 404) {
        setError(error.response.data.responseMessage);

      } else {
        setError(
          error.response?.data?.message ||
          "Error applying coupon. Please try again."
        );
        setCouponStatus(false);
      }
    } finally {
      setLoading(false);
      toggleState(true);

      // console.log("finally");
    }
  };
  useEffect(() => {
    if (!toggle) {
      setCouponCode("");
      setShowApplyButton(false);
    }
  }, [toggle]);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setCouponCode(inputValue);
    setShowApplyButton(!!inputValue);
    setError(null);
    toggleState(true);
    transactionAmount(null);
    setCouponStatus(false);
    sessionStorage.removeItem("couponCode");
    // setSuccessMessage(null);
    // if (couponamount) {
    //   transactionAmount(null);
    //   sessionStorage.removeItem("couponCode");
    // }

    if (!inputValue) {
      setCouponStatus(false);
      transactionAmount(null);

      sessionStorage.removeItem("couponCode");
    }
  };

  const handleCoupon = () => {
    inputRef.current.focus();
  };

  const handleApplyCoupon = () => {
    setShowInput(true);
    setCouponApplied(true);
  };

  useEffect(() => {
    setOfferedPrice(offeredPrice);
    setPublishedPrice(published);
    // setTds(tdsTotal);
  }, []);

  useEffect(() => {
    sessionStorage.removeItem("couponCode");

  }, []);


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
              {markUpamount * published}
            </p>
          </div>
        </div>
        <div className="TotGst">
          <div>
            <span>Grand Total:</span>
            <p>
              {"₹"}
              {grandTotal}
            </p>
          </div>
        </div>

        {pathname === "/BusReviewBooking" && (
          <div className="applycoupenbuttontext" style={{ overflow: "hidden" }}>
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
                      onClick={handleApplyCoupon3}
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
                    {couponStatus && toggle ? (
                      <div>
                        <div className="TotGstFlight mt-4">
                          <div>
                            <span>Coupon Amount: </span>
                            <p>
                              {"₹"}
                              {coupondiscount1}
                            </p>
                          </div>
                          <div>
                            <span>Total:</span>
                            <p>
                              {"₹"}
                              {grandTotal}
                            </p>
                          </div>
                        </div>

                        <div className="TotGstFlight">
                          <div>
                            <span>After Discount:</span>
                            <p>
                              {"₹"}
                              {totalaftercoupon}
                            </p>
                          </div>
                        </div>
                        {/* <button className="applycoupen-button1">Submit</button> */}
                      </div>
                    ) : (
                      <div className="error-message1">
                        {toggle && <p>{error}</p>}
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default BusSaleSummary;
