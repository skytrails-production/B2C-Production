import * as React from "react";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import SecureStorage from "react-secure-storage";
// import { styled } from "@mui/material/styles";
// import Paper from "@mui/material/Paper";
import { apiURL } from "../../../Constants/constant";
import "./sailsummary.css";
import axios from "axios";
import "./guestdetail.css";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// const label = { inputProps: { "aria-label": "Checkbox demo" } };

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: "center",
//   color: theme.palette.text.secondary,
// }));

export default function Popularfilter({
  toggle,
  toggleState,
  setCouponAmountFun,
}) {
  const [showInput, setShowInput] = useState(false);
  const [couponApplied, setCouponApplied] = useState(false);
  const inputRef = useRef(null);
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const reducerState = useSelector((state) => state);

  const location = useLocation();
  const pathname = location.pathname;

  const [couponCode, setCouponCode] = useState("");
  const [showApplyButton, setShowApplyButton] = useState(false);
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

  // const couponamount2 = sessionStorage.getItem("hotelAmount");

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setCouponCode(inputValue);
    setShowApplyButton(!!inputValue);
    setError(null);
    setCouponAmountFun(null);
    toggleState(true);
    setCouponStatus(false);
    sessionStorage.removeItem("couponCode");
    // console.warn(toggle, "toggle value........");
    // setSuccessMessage(null);
    // if (couponamount2) {
    //   sessionStorage.removeItem("hotelAmount");
    //   sessionStorage.removeItem("couponCode");
    // }

    if (!inputValue) {
      setCouponStatus(false);
      // sessionStorage.removeItem("hotelAmount");
      setCouponAmountFun(false);
      sessionStorage.removeItem("couponCode");
    }
  };

  useEffect(() => {
    if (!toggle) {
      setCouponCode("");
      setShowApplyButton(false);
    }
    // console.log(toggle, "toggle state");
  }, [toggle]);

  //  useEffect(() => {
  //   sessionStorage.removeItem("hotelAmount");
  //   sessionStorage.removeItem("couponCode");
  //  })

  const handleApplyCoupon = () => {
    setShowInput(true);
    setCouponApplied(true);
  };

  const [couponStatus, setCouponStatus] = useState(false);

  const handleApplyCoupon2 = async () => {
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
        setCouponAmountFun(discountamount);
        // setSuccessMessage("Coupon applied successfully");
      }
    } catch (error) {
      setLoading(false);

      if (error.response && error.response.data.statusCode === 409) {
        setCouponStatus(false);
        setError("Coupon already applied");
        setTimeout(() => {
          setError(null);
        }, 4000); // Adjust the timeout duration as needed (4 seconds in this case)
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
    }
  };

  // const TotalGuest = sessionStorage.getItem("totalGuest");
  const HotelIndex = sessionStorage.getItem("HotelIndex");
  // console.log(HotelIndex, "hotel index in summary")

  // const hotelInfo = reducerState?.hotelSearchResult?.hotelInfo?.HotelInfoResult;
  const hotelRoom =
    reducerState?.hotelSearchResult?.hotelRoom?.GetHotelRoomResult;
  const hotelData = hotelRoom?.HotelRoomsDetails?.[HotelIndex];

  const noOfRooms =
    reducerState?.hotelSearchResult?.ticketData?.data?.data?.HotelSearchResult;

  const getBookingDetails =
    reducerState?.hotelSearchResult?.blockRoom?.BlockRoomResult
      ?.HotelRoomsDetails;

  // console.log(getBookingDetails, "booking details")
  const totalAmount = getBookingDetails?.reduce((accumulator, item) => {
    return accumulator + item?.Price?.PublishedPriceRoundedOff;
  }, 0);

  const totalOfferAmount = getBookingDetails?.reduce((acc, item) => {
    return acc + item?.Price?.OfferedPriceRoundedOff;
  }, 0);

  // const roomBlock = reducerState?.hotelSearchResult?.blockRoom;
  // console.log(roomBlock, "room block ")
  // console.log(totalAmount, totalOfferAmount, "totalOfferAmount");
  const handleCoupon = () => {
    inputRef.current.focus();
  };

  const markUpamount =
    reducerState?.markup?.markUpData?.data?.result[0]?.hotelMarkup *
    totalAmount;
  // console.log("fareValue", markUpamount);

  const grandTotal = totalAmount + markUpamount;
  const discount = totalAmount - totalOfferAmount;
  const TotalDiscount = discount;
  // console.log(grandTotal,"grandTotal//////");

  const discountamount = grandTotal - TotalDiscount;
  // const storedFormData = JSON.parse(sessionStorage.getItem('hotelFormData'));
  // console.log(totalOfferAmount + markUpamount);

  return (
    <>
      <div className="priceSummaryHotel">
        <div className="head">
          <span>Price Summary</span>
        </div>
        <div className="hotName">
          <p>{hotelData?.RoomTypeName}</p>
        </div>
        <div className="priceChart">
          <div>
            <span className="text-bold">Rate</span>
          </div>
          <div>
            <span>Published</span>
            <p>
              {"₹"}
              {Number(totalAmount).toFixed(1)}
            </p>
          </div>
          <div>
            <span>Other Tax</span>
            <p>
              {"₹"}
              {Number(markUpamount).toFixed(1)}
            </p>
          </div>
          <div>
            <span className="text-bold">No of Rooms</span>
            <p className="text-bold"> {noOfRooms?.NoOfRooms}</p>
          </div>
        </div>
        <div className="TotGst">
          <div>
            <span>Grand Total:</span>
            <p>
              {"₹"}
              {Number(grandTotal).toFixed(2)}
            </p>
          </div>
        </div>

        {/* <div
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
                              <div
                                style={{
                                  position: "relative",
                                  
                                }}
                              >
                                <input
                                  ref={inputRef}
                                  type="text"
                                  className="inputfieldtext"
                                  placeholder="Apply Coupon..."
                                  autoFocus
                                  value={couponCode}
                                  onChange={handleInputChange}
                                />
                                {showApplyButton && (
                                  <p
                                    onClick={handleApplyCoupon2}
                                    style={{
                                      position: "absolute",
                                      top: 6,
                                      right: 0,
                                      cursor:"pointer",
                                      height: "100%",
                                      color: "#4949c0",
                                      padding:"12px",
                                      fontWeight:"bold",
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                    }}
                                  >
                                    Apply Code
                                  </p>
                                )}
                              </div>
                              {couponStatus && (
                                <div>
                                <div className="TotGstFlight mt-4">
                                  <div>
                                    <span>Coupon Amount: </span>
                                    <p>{"₹"}{TotalDiscount}</p>
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
                                      {discountamount}
                                    </p>
                                  </div>
                                </div>
                                <button className="applycoupen-button1">
                                  Submit
                                </button>
                              </div>
                              )}
                              
                            </motion.div>
                          )}
                        </div> */}

        {/* <div className="applycoupenbuttontext" style={{ overflow: "hidden" }}>
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
                    onClick={handleApplyCoupon2}
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
                  {couponStatus ? (
                    <div>
                      <div className="TotGstFlight mt-4">
                        <div>
                          <span>Coupon Amount: </span>
                          <p>{"₹"}{TotalDiscount}</p>
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
                            {discountamount}
                          </p>
                        </div>
                      </div>
                      <button className="applycoupen-button1">Submit</button>
                    </div>
                  ) : (
                    <div className="error-message1">
                      <p>{error}</p>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          )}
        </div> */}

        {pathname ===
          "/hotel/hotelsearch/HotelBooknow/Reviewbooking/GuestDetail" && (
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
                      onClick={handleApplyCoupon2}
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
                              {Number(TotalDiscount).toFixed(1)}
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
                              {Number(discountamount).toFixed(2)}
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
}
