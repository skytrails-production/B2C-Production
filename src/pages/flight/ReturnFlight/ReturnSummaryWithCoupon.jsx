import { Box, Grid, Typography } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import axios from "axios";
import { apiURL } from "../../../Constants/constant";
import SecureStorage from 'react-secure-storage';

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

const ReturnSummaryWithCoupon = (props) => {
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
                await props.transactionAmount(
                    Number((Number(fareValue?.Fare?.PublishedFare) + Number(fareValueReturn?.Fare?.PublishedFare))+ markUpamount* (Number(fareValue?.Fare?.PublishedFare) + Number(fareValueReturn?.Fare?.PublishedFare)) - discountValue).toFixed(0)
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
    const fareValueReturn = reducerState?.flightFare?.flightQuoteDataReturn?.Results;
    const fareQuote = reducerState?.flightFare?.flightQuoteData?.Error?.ErrorCode;
    const discountValue =
       Number( Number(fareValue?.Fare?.PublishedFare - fareValue?.Fare?.OfferedFare) + Number(fareValueReturn?.Fare?.PublishedFare - fareValueReturn?.Fare?.OfferedFare)).toFixed(0);

    const markUpamount =
        reducerState?.markup?.markUpData?.data?.result[0]?.flightMarkup;

        const taxvalue = Number(markUpamount*(fareValue?.Fare?.PublishedFare + fareValueReturn?.Fare?.PublishedFare)).toFixed(0);
        const grandtotal = Number((fareValue?.Fare?.PublishedFare + fareValueReturn?.Fare?.PublishedFare )+markUpamount*(fareValue?.Fare?.PublishedFare + fareValueReturn?.Fare?.PublishedFare)).toFixed(0);
        

        const Afterdiscount =   Number((Number(fareValue?.Fare?.PublishedFare) + Number(fareValueReturn?.Fare?.PublishedFare))+ markUpamount* (Number(fareValue?.Fare?.PublishedFare) + Number(fareValueReturn?.Fare?.PublishedFare)) - discountValue).toFixed(0)
        
        // {parseFloat(
        //     (
        //         Number(fareValue?.Fare
        //             ?.PublishedFare) + Number(fareValueReturn?.Fare
        //                 ?.PublishedFare) +
        //         Number(markUpamount) -
        //         Number(coupondiscount)
        //     ).toFixed(2)
        // )}

    // const integerValue = parseInt(discountValue);
    // const coupondiscount = integerValue + markUpamount;


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

    return (
        <>
            {fareQuote === 0 ? (
                <>
                    <div className="priceSummary">
                        <div className="headFlight">
                            <span>Price Summary</span>
                        </div>
                        <p className="depRet">Departure</p>
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


                                    </>
                                );
                            });
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
                        {fareValueReturn?.Segments?.map((dat, index) => {
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


                                    </>
                                );
                            });
                        })}

                        <div className="totCOmmFlight">
                            {fareValueReturn?.FareBreakdown?.map((data) => {
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
                                    {taxvalue}
                                </p>
                            </div>
                            <div>
                                <span>Grand Total:</span>
                                <p>
                                    {"₹"}
                                    {/* {fareValue?.Fare?.PublishedFare + fareValueReturn?.Fare?.PublishedFare + markUpamount} */}
                                    {grandtotal}
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
                                                                    {/* {coupondiscount} */}
                                                                    {discountValue}
                                                                </p>
                                                            </div>
                                                            <div>
                                                                <span>Total:</span>
                                                                <p>
                                                                    {"₹"}
                                                                    {/* {fareValue?.Fare?.PublishedFare + fareValueReturn?.Fare?.PublishedFare +
                                                                        markUpamount} */}
                                                                        {grandtotal}
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <div className="TotGstFlight">
                                                            <div>
                                                                <span>After Discount:</span>

                                                                <p>
                                                                    {"₹"}
                                                                    {/* {parseFloat(
                                                                        (
                                                                            Number(fareValue?.Fare
                                                                                ?.PublishedFare) + Number(fareValueReturn?.Fare
                                                                                    ?.PublishedFare) +
                                                                            Number(markUpamount) -
                                                                            Number(discountValue)
                                                                        ).toFixed(2)
                                                                    )} */}
                                                                    {Afterdiscount}
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
                        ) : null}
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

export default ReturnSummaryWithCoupon;