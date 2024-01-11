
import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

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

const BookNowLeft = () => {
  const reducerState = useSelector((state) => state);
  const TicketDetails = reducerState?.flightFare?.flightQuoteData?.Results;
  const fareValue = reducerState?.flightFare?.flightQuoteData?.Results;
  const fareQuote = reducerState?.flightFare?.flightQuoteData?.Error?.ErrorCode;

  const markUpamount =
    reducerState?.markup?.markUpData?.data?.result[0]?.flightMarkup;
  // console.log("fareValue", markUpamount);

  let total = 0;
  // console.log(fareValue, "segments")
  // const summary = fareValue?.Segments?.

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
          {
            TicketDetails?.Segments[0].length == 2 ?
              (
                <>

                  <div className="priceSummary">
                    <div className="headFlight">
                      <span>Price Summary</span>
                    </div>
                    {/* <div className="hotName">
                      <p>hotel name</p> 
                    </div> */}
                    <div className="totCOmmFlight">
                      <div >
                        <span>{formattedDate}</span>
                        <p>{fareValue?.Segments[0][0]?.Airline?.FlightNumber}</p>
                        <p>{fareValue?.Segments[0][0]?.Airline?.FareClass} Class</p>
                      </div>

                    </div>
                    <div className="priceChart">
                      <div >
                        <span className="text-bold">From</span>
                        <p className="text-bold">{fareValue?.Segments[0][0]?.Origin?.Airport?.AirportCode}</p>
                      </div>
                      <div >
                        <span className="text-bold">To</span>
                        <p className="text-bold">{fareValue?.Segments[0][1]?.Destination?.Airport?.AirportCode}</p>
                      </div>
                    </div>
                    <div className="totCOmmFlight">
                      {fareValue?.FareBreakdown?.map((data) => {
                        return (
                          <div className="">
                            {data?.PassengerType === 1 && (
                              <>
                                <span>Adult x {data?.PassengerCount}</span>
                                <p>{'₹'}{data?.BaseFare + data?.Tax}</p>

                              </>
                            )}
                            {data?.PassengerType === 2 && (
                              <>
                                <span>Child x {data?.PassengerCount}</span>
                                <p>{'₹'}{data?.BaseFare + data?.Tax}</p>
                              </>
                            )}
                            {data?.PassengerType === 3 && (
                              <>
                                <span>Infant x {data?.PassengerCount}</span>
                                <p>{'₹'}{data?.BaseFare + data?.Tax}</p>
                              </>
                            )}


                          </div>
                        );
                      })}

                    </div>

                    <div className="TotGstFlight">
                      <div>
                        <span>Total TAX: </span>
                        <p>{'₹'}{markUpamount}</p>
                      </div>
                      <div >
                        <span>Grand Total:</span>
                        <p>{'₹'}{fareValue?.Fare?.PublishedFare + markUpamount}</p>
                      </div>
                    </div>
                  </div>

                </>
              ) :
              (
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
                            {/* <div className="hotName">
                      <p>hotel name</p> 
                    </div> */}
                            <div className="totCOmmFlight">
                              <div >
                                <span>{formattedDate}</span>
                                <p>{data1?.Airline?.FlightNumber}</p>
                                <p>{data1?.Airline?.FareClass} Class</p>
                              </div>

                            </div>
                            <div className="priceChart">
                              <div >
                                <span className="text-bold">From</span>
                                <p className="text-bold">{data1?.Origin?.Airport?.AirportCode}</p>
                              </div>
                              <div >
                                <span className="text-bold">To</span>
                                <p className="text-bold">{data1?.Destination?.Airport?.AirportCode}</p>
                              </div>
                            </div>
                            <div className="totCOmmFlight">
                              {fareValue?.FareBreakdown?.map((data) => {
                                return (
                                  <div className="">
                                    {data?.PassengerType === 1 && (
                                      <>
                                        <span>Adult x {data?.PassengerCount}</span>
                                        <p>{'₹'}{data?.BaseFare + data?.Tax}</p>

                                      </>
                                    )}
                                    {data?.PassengerType === 2 && (
                                      <>
                                        <span>Child x {data?.PassengerCount}</span>
                                        <p>{'₹'}{data?.BaseFare + data?.Tax}</p>
                                      </>
                                    )}
                                    {data?.PassengerType === 3 && (
                                      <>
                                        <span>Infant x {data?.PassengerCount}</span>
                                        <p>{'₹'}{data?.BaseFare + data?.Tax}</p>
                                      </>
                                    )}


                                  </div>
                                );
                              })}

                            </div>

                            <div className="TotGstFlight">
                              <div>
                                <span>Total TAX: </span>
                                <p>{'₹'}{markUpamount}</p>
                              </div>
                              <div >
                                <span>Grand Total:</span>
                                <p>{'₹'}{fareValue?.Fare?.PublishedFare + markUpamount}</p>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    });
                  })}
                </>
              )
          }

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
