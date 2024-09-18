import React from 'react';
// import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import userApi from "../Redux/API/api";
// import { useNavigate } from 'react-router-dom'; 

// Function to find Airport by Code
const findAirportByCode = (code, airports) => {
    return airports?.find(airport => airport?.AirportCode === code);
};

// Function to find Airline by Code
const findAirlineByCode = (code, airlines) => {
    const airline = airlines?.find(airline => airline?.airlineCode === code);
    return airline?.airlineName;
};

export const datasaveTodb = async ({jsonSavePnrData, sesstioResultIndex, reducerState ,finalAmount, arrTimeISO1,ResultIndex, depTimeISO1,jsonData}) => {
    //   const navigate = useNavigate(); 


    const formatDepTime = (dateString) => moment(dateString).format('YYYY-MM-DDTHH:mm:ss');

    const nonStop = [{
        Airline: {
            AirlineCode: jsonSavePnrData?.originDestinationDetails?.itineraryInfo?.travelProduct?.companyDetail?.identification,
            AirlineName: findAirlineByCode(jsonSavePnrData?.originDestinationDetails?.itineraryInfo?.travelProduct?.companyDetail?.identification, reducerState?.airlines),
            FlightNumber: jsonSavePnrData?.originDestinationDetails?.itineraryInfo?.travelProduct?.productDetails?.identification,
            FareClass: jsonSavePnrData?.originDestinationDetails?.itineraryInfo?.travelProduct?.productDetails?.classOfService,
        },
        Origin: {
            AirportCode: jsonSavePnrData?.originDestinationDetails?.itineraryInfo?.travelProduct?.boardpointDetail?.cityCode,
            AirportName: findAirportByCode(jsonSavePnrData?.originDestinationDetails?.itineraryInfo?.travelProduct?.boardpointDetail?.cityCode, reducerState?.airports)?.code,
            CityName: findAirportByCode(jsonSavePnrData?.originDestinationDetails?.itineraryInfo?.travelProduct?.boardpointDetail?.cityCode, reducerState?.airports)?.name,
            Terminal: jsonSavePnrData?.originDestinationDetails?.itineraryInfo?.flightDetail?.arrivalStationInfo?.terminal,
            DepTime: formatDepTime(depTimeISO1),
        },
        Destination: {
            AirportCode: jsonSavePnrData?.originDestinationDetails?.itineraryInfo?.travelProduct?.offpointDetail?.cityCode,
            AirportName: findAirportByCode(jsonSavePnrData?.originDestinationDetails?.itineraryInfo?.travelProduct?.offpointDetail?.cityCode, reducerState?.airports)?.code,
            CityName: findAirportByCode(jsonSavePnrData?.originDestinationDetails?.itineraryInfo?.travelProduct?.offpointDetail?.cityCode, reducerState?.airports)?.name,
            Terminal: jsonSavePnrData?.originDestinationDetails?.itineraryInfo?.flightDetail?.departureInformation?.departTerminal,
            ArrTime: formatDepTime(arrTimeISO1),
        },
        Baggage: (sesstioResultIndex?.flight?.baggage?.freeBagAllownceInfo?.baggageDetails?.quantityCode ||
            sesstioResultIndex?.baggage?.freeBagAllownceInfo?.baggageDetails?.quantityCode) === "W"
            ? `${sesstioResultIndex?.flight?.baggage?.freeBagAllownceInfo?.baggageDetails?.freeAllowance ||
            sesstioResultIndex?.baggage?.freeBagAllownceInfo?.baggageDetails?.freeAllowance} ${sesstioResultIndex?.flight?.baggage?.freeBagAllownceInfo?.baggageDetails?.unitQualifier ||
            (sesstioResultIndex?.flight?.baggage?.freeBagAllownceInfo?.baggageDetails?.unitQualifier === "K" ? "KG" : sesstioResultIndex?.flight?.baggage?.freeBagAllownceInfo?.baggageDetails?.unitQualifier)}`
            : `(${sesstioResultIndex?.baggage?.freeBagAllownceInfo?.baggageDetails?.freeAllowance ||
            sesstioResultIndex?.flight?.baggage?.freeBagAllownceInfo?.baggageDetails?.freeAllowance} × 23KG)`,
    }];



    const times = jsonSavePnrData?.originDestinationDetails?.itineraryInfo?.elementManagementItinerary
    ? nonStop
    :
    jsonSavePnrData?.originDestinationDetails?.itineraryInfo.map(
        (itinerary, index) => {
          let depTime = String(itinerary?.travelProduct?.product?.depTime);
          let depDate = String(itinerary?.travelProduct?.product?.depDate);
          let arrTime = String(itinerary?.travelProduct?.product?.arrTime);
          let arrDate = String(itinerary?.travelProduct?.product?.arrDate);
          // console.log(itinerary,"itineraryitineraryitinerary")

          // Ensure depTime and arrTime are properly formatted
          if (depTime && depTime.length === 2) {
            depTime = "00" + depTime;
          }
          if (arrTime && arrTime.length === 2) {
            arrTime = "00" + arrTime;
          }
          if (depTime && depTime.length === 3) {
            depTime = "0" + depTime;
          }
          if (arrTime && arrTime.length === 3) {
            arrTime = "0" + arrTime;
          }
          if (depDate && depDate.length === 5) {
            depDate = "0" + depDate;
          }
          if (depDate && depDate.length === 4) {
            depDate = "00" + depDate;
          }
          if (arrDate && arrDate.length === 4) {
            arrDate = "00" + arrDate;
          }
          if (arrDate && arrDate.length === 5) {
            arrDate = "0" + arrDate;
          }

          
// console.log(itinerary,"itineraryitineraryitinerary",depTime,arrTime)

          // Parse depDate and depTime into ISO format for departure
          const depDateTimeString = `${depDate}${depTime}`;
          const departureMoment = moment(depDateTimeString, "YYMMDDHHmm");
          const depTimeISO = departureMoment.isValid()
            ? formatDepTime( departureMoment)
            : null;

           
          // Parse arrDate and arrTime into ISO format for arrival
          const arrDateTimeString = `${arrDate}${arrTime}`;
          const arrivalMoment = moment(arrDateTimeString, "YYMMDDHHmm");
          const arrTimeISO = arrivalMoment.isValid()
            ? formatDepTime(arrivalMoment)
            : null;

          // console.log(depDateTimeString,departureMoment,depTimeISO,arrDateTimeString,arrivalMoment,arrTimeISO,arrDate,depDate,"deppppppppppp")

          return {
            depTime: depTimeISO,
            depDate,
            arrTime: arrTimeISO,
            arrDate,
          };
        }
      );

      let depTimeString = String(
        jsonData?.itineraryDetails?.segmentInformation?.flightDetails?.flightDate
          ?.departureTime
      );
      let depDateString = String(
        jsonData?.itineraryDetails?.segmentInformation?.flightDetails?.flightDate
          ?.departureDate
      );
      let arrTimeString = String(
        jsonData?.itineraryDetails?.segmentInformation?.flightDetails?.flightDate
          ?.arrivalTime
      );
      let arrDateString = String(
        jsonData?.itineraryDetails?.segmentInformation?.flightDetails?.flightDate
          ?.arrivalDate
      );
      if (depTimeString && depTimeString.length === 2) {
        depTimeString = "00" + depTimeString;
      }
      if (arrTimeString && arrTimeString.length === 2) {
        arrTimeString = "00" + arrTimeString;
      }
      if (depTimeString && depTimeString.length === 3) {
        depTimeString = "0" + depTimeString;
      }
      if (arrTimeString && arrTimeString.length === 3) {
        arrTimeString = "0" + arrTimeString;
      }
      if (depDateString && depDateString.length === 5) {
        depDateString = "0" + depDateString;
      }
      if (arrDateString && arrDateString.length === 4) {
        arrDateString = "00" + arrDateString;
      }
      // console.log(depTimeString,arrTimeString,depDateString,arrDateString,"")

      // Parse and format the departure time and date
      const departureMoment = moment(
        `${depDateString} ${depTimeString}`,
        "DDMMYYYY HHmm"
      );
      const depTimeISO = departureMoment.toISOString();

      // Output: "2024-09-26T10:15:00.000Z"

      // Parse and format the arrival time and date
      const arrivalMoment = moment(
        `${arrDateString} ${arrTimeString}`,
        "DDMMYYYY HHmm"
      );
      const arrTimeISO = arrivalMoment.toISOString();
   
    // console.log("Save database",reducerState?.searchFlight?.flightDetails?.parsedDate);

    // Prepare non-stop flight details
   

    // Map over itinerary info if not a non-stop flight
 

    const payload = {
        ticketType: "Original Ticket",
        oneWay: true,
        bookingId: "SKY" + Date.now(),
        pnr: jsonSavePnrData?.pnrHeader?.reservationInfo?.reservation?.controlNumber,
        paymentStatus: "success",
        bookingStatus: jsonSavePnrData?.pnrHeader?.reservationInfo?.reservation?.controlNumber ? "BOOKED" : "FAILED",
        totalAmount: Number(finalAmount),
        origin: reducerState?.searchFlight?.flightDetails?.from?.name,
        destination: reducerState?.searchFlight?.flightDetails?.to?.name,
        airlineDetails: jsonSavePnrData?.originDestinationDetails?.itineraryInfo?.elementManagementItinerary
            ? nonStop
            : 
            jsonSavePnrData?.originDestinationDetails?.itineraryInfo.map(
                (stopss, index) => {
                  const depTimeISO = formatDepTime(times[index]?.depTime);
                  const arrTimeISO = formatDepTime(times[index]?.arrTime);
  
                  return {
                    Airline: {
                      AirlineCode:
                        stopss?.travelProduct?.companyDetail?.identification,
                      AirlineName:
                        stopss?.travelProduct?.companyDetail?.identification,
                      FlightNumber:
                        stopss?.travelProduct?.productDetails?.identification,
                      FareClass:
                        stopss?.travelProduct?.productDetails?.classOfService,
                    },
                    Origin: {
                      AirportCode:
                        stopss?.travelProduct?.boardpointDetail?.cityCode,
                      // AirportName: reducerState?.searchReducer?.search?.[0]?.code,
                      // CityName: reducerState?.searchReducer?.search?.[0]?.name,
                      AirportName: findAirportByCode(
                        stopss?.travelProduct?.boardpointDetail?.cityCode
                      )?.code,
                      CityName: findAirportByCode(
                        stopss?.travelProduct?.boardpointDetail?.cityCode
                      )?.name,
                      Terminal: stopss?.flightDetail?.arrivalStationInfo?.terminal,
                      DepTime: depTimeISO,
                    },
                    Destination: {
                      AirportCode: stopss?.travelProduct?.offpointDetail?.cityCode,
                      // AirportName: reducerState?.searchReducer?.search?.[1]?.code,
                      // CityName: reducerState?.searchReducer?.search?.[1]?.name,
                      AirportName: findAirportByCode(
                        stopss?.travelProduct?.offpointDetail?.cityCode
                      )?.code,
                      CityName: findAirportByCode(
                        stopss?.travelProduct?.offpointDetail?.cityCode
                      )?.name,
                      Terminal:
                        stopss?.flightDetail?.departureInformation?.departTerminal,
                      ArrTime: arrTimeISO,
                    },
                    Baggage:
                      (sesstioResultIndex?.flight?.baggage?.freeBagAllownceInfo
                        ?.baggageDetails?.quantityCode ||
                        sesstioResultIndex?.baggage?.freeBagAllownceInfo
                          ?.baggageDetails?.quantityCode) === "W"
                        ? `${
                            sesstioResultIndex?.flight?.baggage?.freeBagAllownceInfo
                              ?.baggageDetails?.freeAllowance ||
                            sesstioResultIndex?.baggage?.freeBagAllownceInfo
                              ?.baggageDetails?.freeAllowance
                          } ${
                            sesstioResultIndex?.flight?.baggage?.freeBagAllownceInfo
                              ?.baggageDetails?.unitQualifier ||
                            sesstioResultIndex?.baggage?.freeBagAllownceInfo
                              ?.baggageDetails?.unitQualifier === "K"
                              ? "KG"
                              : `${
                                  sesstioResultIndex?.flight?.baggage
                                    ?.freeBagAllownceInfo?.baggageDetails
                                    ?.unitQualifier ||
                                  sesstioResultIndex?.flight?.baggage
                                    ?.freeBagAllownceInfo?.baggageDetails
                                    ?.unitQualifier
                                }`
                          }`
                        : `(${
                            sesstioResultIndex?.baggage?.freeBagAllownceInfo
                              ?.baggageDetails?.freeAllowance ||
                            sesstioResultIndex?.sesstioResultIndex?.baggage
                              ?.freeBagAllownceInfo?.baggageDetails?.freeAllowance
                          } × 23KG)`,
                  };
                }
              ),
            passengerDetails: reducerState?.passengers?.passengersData?.map(
                (item) => ({
                  ...item,
                  amount:
                    // (transactionAmount || parseInt(ResultIndex?.TotalPublishFare)) /
                    // reducerState?.passengers?.passengersData?.length,
                    (Number(finalAmount) || parseInt(ResultIndex?.TotalPublishFare)) /
                    reducerState?.passengers?.passengersData?.length,
                  gender: item?.title == "Miss" ? "Female" : "Male",
                })
              ),
        dateOfJourney:reducerState?.searchFlight?.flightDetails?.parsedDate,
    
    };

    try {
        const response = await userApi.flightBookingDB(payload);
        if (response?.data?.statusCode === 200 && jsonSavePnrData?.pnrHeader?.reservationInfo?.reservation?.controlNumber) {
            // couponconfirmation();
            //   navigate(`/bookedTicketSucess/${jsonSavePnrData?.pnrHeader?.reservationInfo?.reservation?.controlNumber}`, {
            //     state: {
            //       PNR: jsonSavePnrData?.pnrHeader?.reservationInfo?.reservation?.controlNumber,
            //       datavalue: jsonSavePnrData,
            //     },
            //   });
        }
    } catch (error) {
        console.error("Error saving booking to database:", error);

    }
};
