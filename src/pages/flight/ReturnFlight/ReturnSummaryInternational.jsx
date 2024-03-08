import { Box, Grid, Typography } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import axios from "axios";
import { apiURL } from "../../../Constants/constant";
import SecureStorage from 'react-secure-storage';
import dayjs from "dayjs";

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

const ReturnSummaryInternational = (props) => {



    const reducerState = useSelector((state) => state);
    const TicketDetails = reducerState?.flightFare?.flightQuoteData?.Results;
    const fareValue = reducerState?.flightFare?.flightQuoteData?.Results;

    const fareQuote = reducerState?.flightFare?.flightQuoteData?.Error?.ErrorCode;
    const discountValue =
        fareValue?.Fare?.PublishedFare - fareValue?.Fare?.OfferedFare;

    const markUpamount =
        reducerState?.markup?.markUpData?.data?.result[0]?.flightMarkup;

    const grandtotal = (Number(fareValue?.Fare?.PublishedFare) + markUpamount * Number(fareValue?.Fare?.PublishedFare)).toFixed(0)

    const integerValue = parseInt(discountValue);

    console.log(reducerState, "reduce state")

    let total = 0;

    const dateString = fareValue?.Segments[0][0]?.Origin?.DepTime;
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", {
        month: "short",
    });
    const year = date.getFullYear();
    const formattedDate = `${day} ${month} ${year}`;




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
                                            <span>{dayjs(dat?.Origin?.DepTime).format("DD MMM, YY")} </span>
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
                                            <span>{dayjs(dat?.Origin?.DepTime).format("DD MMM, YY")}</span>
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
                                <span>Total TAX: </span>
                                <p>
                                    {"₹"}
                                    {(fareValue?.Fare?.PublishedFare * markUpamount).toFixed(0)}
                                </p>
                            </div>
                            <div>
                                <span>Grand Total:</span>
                                <p>
                                    {"₹"}
                                    {/* {(Number(fareValue?.Fare?.PublishedFare) + Number(fareValue?.Fare?.PublishedFare * markUpamount)).toFixed(0)} */}
                                    {grandtotal}
                                </p>
                            </div>
                        </div>
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

export default ReturnSummaryInternational;