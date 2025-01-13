import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import store from "../../Redux/store";
import userApi from "../../Redux/API/api";
import { convertXmlToJson } from "./newFlightBookingAmdUtility";
import {
  fetchFlightQuotesAireselSucessOneway,
  fetchFlightQuotesAireselSucessReturn,
} from "../../Redux/FareQuoteRuleAirsel/actionFlightQuoteRuleAirsel";
import { apiURL } from "../../Constants/constant";

import { startBookingProcessAMD_New } from "./flightbookingAmdUtility";
import moment from "moment";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

const convertToISO = (dateString, timeString) => {
  if (dateString && timeString) {
    // Extract date components
    const day = dateString.slice(0, 2); // "03"
    const month = dateString.slice(2, 4); // "04"
    const year = `20${dateString.slice(4, 6)}`; // "25"

    // Extract time components
    const hour = timeString.slice(0, 2); // "04" or "02"
    const minute = timeString.slice(2, 4); // "30" or "15"

    // Combine date and time and format to ISO
    return dayjs.utc(`${year}-${month}-${day}T${hour}:${minute}:00`).format(); // Default output is ISO format
  }
};

// export const useSeatUtility = () => {
//   const airlineSeatMap = useSelector((state) => state?.airlineSeatMap);

//   // const airlineSeatMap = [
//   //   [
//   //     {
//   //       seat: "F16",
//   //       amount: 1059,
//   //       currency: "INR",
//   //     },
//   //     {
//   //       seat: "F7",
//   //       amount: 1323,
//   //       currency: "INR",
//   //     },
//   //   ],
//   //   [
//   //     {
//   //       seat: "F7",
//   //       amount: 0,
//   //     },
//   //     {
//   //       seat: "F14",
//   //       amount: 0,
//   //     },
//   //   ],
//   // ];
//   // let seatGroup = `<seatGroup>
//   //       <seatRequest>
//   //         <special>
//   //           <data>${"10B"}</data>
//   //         </special>
//   //       </seatRequest>
//   //     </seatGroup>`;
//   // let dataElementsIndiv = `
//   //   <dataElementsIndiv>
//   //     <elementManagementData>
//   //       <segmentName>STR</segmentName>
//   //     </elementManagementData>
//   //     ${seatGroup}
//   //     <referenceForDataElement>
//   //       <reference>
//   //         <qualifier>PR</qualifier>
//   //         <number>1</number>
//   //       </reference>
//   //       <reference>
//   //         <qualifier>ST</qualifier>
//   //         <number>1</number>
//   //       </reference>
//   //     </referenceForDataElement>
//   //   </dataElementsIndiv>`;
//   console.log(airlineSeatMap, "airlineSeatMap");
//   let dataElementsIndiv = "";
//   if (Array.isArray(airlineSeatMap?.seatList)) {
//     airlineSeatMap?.seatList.forEach((flight, index) => {
//       let seatGroup = "";
//       flight.forEach((seat) => {
//         console.log(seat, "flight");
//         //         seatGroup += `
//         // <seatRequest>
//         // <special>
//         // <data>${seat.seat}</data>
//         // </special>
//         // </seatRequest>
//         // `;
//         seatGroup += `

// <data>${seat?.seat}</data>

// `;
//       });
//       dataElementsIndiv += `
//     <dataElementsIndiv>
//       <elementManagementData>
//         <segmentName>STR</segmentName>
//       </elementManagementData>
//       <seatGroup>
//       <seatRequest>
//  <special>
//       ${seatGroup}
//       </special>
// </seatRequest>

//       </seatGroup>
//       <referenceForDataElement>
//         <reference>
//           <qualifier>PR</qualifier>
//           <number>1</number>
//         </reference>
//         <reference>
//           <qualifier>ST</qualifier>
//           <number>${index + 1}</number>
//         </reference>
//       </referenceForDataElement>
//     </dataElementsIndiv>`;
//     });
//   }
//   // console.log(dataElementsIndiv, "reducer stateddddd");
//   return dataElementsIndiv;
// };

export const useSeatUtility = () => {
  const airlineSeatMap = useSelector((state) => state?.airlineSeatMap);

  let dataElementsIndiv = "";
  let seatIndex = 1; // To ensure unique seat references

  if (Array.isArray(airlineSeatMap?.seatList)) {
    airlineSeatMap?.seatList.forEach((flight, passengerIndex) => {
      let seatGroup = "";

      flight.forEach((seat) => {
        console.log(seat, "flight");

        seatGroup += `
          <seatRequest>
            <special>
              <data>${seat?.seat}</data>
            </special>
          </seatRequest>
        `;

        // Ensure seatIndex is unique for each seat
        seatIndex++;
      });

      dataElementsIndiv += `
        <dataElementsIndiv>
          <elementManagementData>
            <segmentName>STR</segmentName>
          </elementManagementData>
          <seatGroup>
            ${seatGroup}
          </seatGroup>
          <referenceForDataElement>
            <reference>
              <qualifier>PR</qualifier>
              <number>${passengerIndex + 1}</number> 
            </reference>
            <reference>
              <qualifier>ST</qualifier>
              <number>${seatIndex}</number> 
            </reference>
          </referenceForDataElement>
        </dataElementsIndiv>`;
    });
  }

  // console.log(
  //   dataElementsIndiv,
  //   "Generated seat request for multiple passengers"
  // );
  return dataElementsIndiv;
};
const fetchDataAirlse = async ({
  sesstioResultIndex,
  // setAirsellRes,
  // setXmlData,
  adultCount,
  childCount,
  infantCount,
}) => {
  // console.log(sesstioResultIndex, "sesstionResultIndex");
  function appendSegment() {
    let text = "";

    for (let i = 0; i < sesstioResultIndex?.flightDetails?.length; i++) {
      let isOther = false;
      let index = 0;
      if (0 < childCount || 0 < infantCount) {
        isOther = true;
        if (i < adultCount) {
          index = 0;
        } else if (adultCount < i && i < childCount) {
          index = 1;
        } else if (adultCount < i && childCount < i && i < infantCount) {
          index = 2;
        }
      }
      isOther = false;

      text += ` <segmentInformation>
                        <travelProductInformation>
                            <flightDate>
                                <departureDate>${
                                  isOther
                                    ? sesstioResultIndex[0]?.flightDetails[i]
                                        ?.flightInformation?.productDateTime
                                        ?.dateOfDeparture
                                    : sesstioResultIndex?.flightDetails[i]
                                        ?.flightInformation?.productDateTime
                                        ?.dateOfDeparture
                                }</departureDate>
                            </flightDate>
                            <boardPointDetails>
                                <trueLocationId>${
                                  isOther
                                    ? sesstioResultIndex[0]?.flightDetails[i]
                                        ?.flightInformation?.location[0]
                                        ?.locationId
                                    : sesstioResultIndex?.flightDetails[i]
                                        ?.flightInformation?.location[0]
                                        ?.locationId
                                }</trueLocationId>
                            </boardPointDetails>
                            <offpointDetails>
                                <trueLocationId>${
                                  isOther
                                    ? sesstioResultIndex[0]?.flightDetails[i]
                                        ?.flightInformation?.location[1]
                                        ?.locationId
                                    : sesstioResultIndex?.flightDetails[i]
                                        ?.flightInformation?.location[1]
                                        ?.locationId
                                }</trueLocationId>
                            </offpointDetails>
                            <companyDetails>
                                <marketingCompany>${
                                  isOther
                                    ? sesstioResultIndex[0]?.flightDetails[i]
                                        ?.flightInformation?.companyId
                                        ?.marketingCarrier
                                    : sesstioResultIndex?.flightDetails[i]
                                        ?.flightInformation?.companyId
                                        ?.marketingCarrier
                                }</marketingCompany>
                            </companyDetails>
                            <flightIdentification>
                                <flightNumber>${
                                  isOther
                                    ? sesstioResultIndex[0]?.flightDetails[i]
                                        ?.flightInformation?.flightOrtrainNumber
                                    : sesstioResultIndex?.flightDetails[i]
                                        ?.flightInformation?.flightOrtrainNumber
                                }</flightNumber>
                                <bookingClass>${
                                  sesstioResultIndex[0]?.fareDetails
                                    ?.groupOfFares?.productInformation
                                    ?.cabinProduct?.rbd ||
                                  sesstioResultIndex?.fareDetails?.groupOfFares
                                    ?.productInformation?.cabinProduct?.rbd ||
                                  sesstioResultIndex[0]?.fareDetails
                                    ?.groupOfFares?.productInformation
                                    ?.cabinProduct?.rbd ||
                                  sesstioResultIndex?.fareDetails?.groupOfFares[
                                    i
                                  ]?.productInformation?.cabinProduct?.rbd ||
                                  sesstioResultIndex?.fareDetails?.groupOfFares
                                    ?.productInformation?.cabinProduct?.rbd ||
                                  sesstioResultIndex?.fareDetails
                                    ?.groupOfFares[0]?.productInformation
                                    ?.cabinProduct?.rbd ||
                                  sesstioResultIndex?.fareDetails
                                    ?.groupOfFares[0]?.productInformation
                                    ?.cabinProduct?.rbd ||
                                  sesstioResultIndex[0]?.fareDetails
                                    ?.groupOfFares[0]?.productInformation
                                    ?.cabinProduct?.rbd ||
                                  sesstioResultIndex?.fareDetails
                                    ?.groupOfFares[0]?.productInformation
                                    ?.cabinProduct[0]?.rbd
                                }</bookingClass>
                            </flightIdentification>
                        </travelProductInformation>
                        <relatedproductInformation>
                            <quantity>${
                              Number(adultCount) + Number(childCount)
                            }</quantity>
                            <statusCode>NN</statusCode>
                        </relatedproductInformation>
                    </segmentInformation>
  `;
    }

    return text;
  }
  const segmentImformation = sesstioResultIndex?.flightDetails
    ?.flightInformation
    ? `
       <segmentInformation>
                        <travelProductInformation>
                            <flightDate>
                                <departureDate>${
                                  sesstioResultIndex[0]?.flightDetails
                                    ?.flightInformation?.productDateTime
                                    ?.dateOfDeparture ||
                                  sesstioResultIndex?.flightDetails[0]
                                    ?.flightInformation?.productDateTime
                                    ?.dateOfDeparture ||
                                  sesstioResultIndex[0]?.flightDetails
                                    ?.flightDetails?.flightInformation
                                    ?.productDateTime?.dateOfDeparture ||
                                  sesstioResultIndex?.flightDetails
                                    ?.flightDetails?.flightInformation
                                    ?.productDateTime?.dateOfDeparture ||
                                  sesstioResultIndex?.flightDetails
                                    ?.flightInformation?.productDateTime
                                    ?.dateOfDeparture
                                }</departureDate>
                            </flightDate>
                            <boardPointDetails>
                                <trueLocationId>${
                                  sesstioResultIndex?.flightDetails
                                    ?.flightInformation?.location[0]?.locationId
                                }</trueLocationId>
                            </boardPointDetails>
                            <offpointDetails>
                                <trueLocationId>${
                                  sesstioResultIndex?.flightDetails
                                    ?.flightInformation?.location[1]?.locationId
                                }</trueLocationId>
                            </offpointDetails>
                            <companyDetails>
                                <marketingCompany>${
                                  sesstioResultIndex?.flightDetails
                                    ?.flightInformation?.companyId
                                    ?.marketingCarrier
                                }</marketingCompany>
                            </companyDetails>
                            <flightIdentification>
                                <flightNumber>${
                                  sesstioResultIndex?.flightDetails
                                    ?.flightInformation?.flightOrtrainNumber
                                }</flightNumber>
                                <bookingClass>${
                                  // sesstioResultIndex?.fareDetails?.groupOfFares
                                  //   ?.productInformation
                                  //   ? sesstioResultIndex?.fareDetails
                                  //       ?.groupOfFares?.productInformation
                                  //       ?.cabinProduct?.rbd
                                  //   : sesstioResultIndex[0]?.fareDetails
                                  //       ?.groupOfFares[0]?.productInformation
                                  //       ?.cabinProduct?.rbd

                                  sesstioResultIndex[0]?.fareDetails
                                    ?.groupOfFares?.productInformation
                                    ?.cabinProduct?.rbd ||
                                  sesstioResultIndex?.fareDetails?.groupOfFares
                                    ?.productInformation?.cabinProduct?.rbd ||
                                  sesstioResultIndex[0]?.fareDetails
                                    ?.groupOfFares?.productInformation
                                    ?.cabinProduct?.rbd ||
                                  sesstioResultIndex?.fareDetails
                                    ?.groupOfFares[0]?.productInformation
                                    ?.cabinProduct?.rbd ||
                                  sesstioResultIndex?.fareDetails?.groupOfFares
                                    ?.productInformation?.cabinProduct?.rbd ||
                                  sesstioResultIndex?.fareDetails
                                    ?.groupOfFares[0]?.productInformation
                                    ?.cabinProduct?.rbd ||
                                  sesstioResultIndex[0]?.fareDetails
                                    ?.groupOfFares[0]?.productInformation
                                    ?.cabinProduct?.rbd ||
                                  sesstioResultIndex?.fareDetails
                                    ?.groupOfFares[0]?.productInformation
                                    ?.cabinProduct[0]?.rbd
                                }</bookingClass>
                            </flightIdentification>
                        </travelProductInformation>
                        <relatedproductInformation>
                            <quantity>${
                              Number(adultCount) + Number(childCount)
                            }</quantity>
                            <statusCode>NN</statusCode>
                        </relatedproductInformation>
                    </segmentInformation>
  `
    : appendSegment();

  const payload = `<Air_SellFromRecommendation>
                <messageActionDetails>
                    <messageFunctionDetails>
                        <messageFunction>183</messageFunction>
                        <additionalMessageFunction>M1</additionalMessageFunction>
                    </messageFunctionDetails>
                </messageActionDetails>
                <itineraryDetails>
                    <originDestinationDetails>
                        <origin>${
                          sesstioResultIndex?.flightDetails?.flightInformation
                            ? sesstioResultIndex?.flightDetails
                                ?.flightInformation?.location[0]?.locationId
                            : sesstioResultIndex?.flightDetails[0]
                                ?.flightInformation?.location[0]?.locationId
                        }</origin>
                        <destination>${
                          sesstioResultIndex?.flightDetails?.flightInformation
                            ? sesstioResultIndex?.flightDetails
                                ?.flightInformation?.location[1]?.locationId
                            : sesstioResultIndex?.flightDetails[
                                sesstioResultIndex?.flightDetails?.length - 1
                              ]?.flightInformation?.location[1]?.locationId
                        }</destination>
                    </originDestinationDetails>
                    <message>
                        <messageFunctionDetails>
                            <messageFunction>183</messageFunction>
                        </messageFunctionDetails>
                    </message>
                  
                    ${segmentImformation}

                </itineraryDetails>
            </Air_SellFromRecommendation>`;

  const res = await userApi?.fetchAirsel(payload);
  const airselXml = await convertXmlToJson(res?.data?.data?.data);
  // console.log(airselXml, "airselXml");
  const headers = res?.data?.data?.headers;
  return { airselXml: airselXml, headers: headers };
  // setAirsellRes(res?.data);
  // setXmlData(res?.data?.data?.data);
};
export const fareQuateRuleAirsel = async (type) => {
  const reducerState = store.getState();
  // console.log(reducerState, "reducerState");

  const fareCode = reducerState?.fareQuoteRuleAirselReducer?.return;

  // console.log(fareCode, "fareCodeeee");
  // if (
  //   0 < fareCode.length ||
  //   reducerState?.fareQuoteRuleAirselReducer?.isLoading == true
  // ) {
  //   console.log(fareCode, "fareCodeeee2");
  //   return fareCode;
  // }

  const Onward = reducerState?.returnSelected?.returnSelectedFlight?.onward;
  const Return = reducerState?.returnSelected?.returnSelectedFlight?.return;

  const {
    journeyFlightParam,
    journeyFlightTvoTraceId,
    returnFlightParam,
    returnFlightTvoTraceId,
  } = reducerState?.return;
  const handleDispatch = async (flight, type) => {
    // console.log(flight, "handleDispatch");

    if (flight.type == "TBO") {
      const ResultIndex =
        type == "onward"
          ? Onward?.flight?.ResultIndex
          : Return?.flight?.ResultIndex;
      const TraceId =
        type == "onward" ? journeyFlightTvoTraceId : returnFlightTvoTraceId;

      const payload = {
        EndUserIp: reducerState?.ip?.ipData,
        TokenId: reducerState?.ip?.tokenData,
        TraceId: TraceId,
        ResultIndex: ResultIndex,
      };
      const flightQuote = await userApi?.flightQuoteSearch(payload);
      const flightRule = await userApi?.flightRuleSearch(payload);

      // console.log(data, "hiioioiooo");
      return { flightQuote: flightQuote, flightRule: flightRule };
    } else if (flight.type == "KAFILA") {
      const Param = type == "onward" ? journeyFlightParam : returnFlightParam;
      const SelectedFlights =
        type == "onward" ? Onward?.flight : Return?.flight;
      const payload = {
        Param: Param,
        SelectedFlights: [SelectedFlights],
      };
      const data = await userApi?.kafilaFareCheck(payload);
      // console.log(data, "kafiladata");
      return data;
    } else if (flight.type == "AMD") {
      const adultCount = 1;
      const childCount = 0;
      const infantCount = 0;
      const sesstioResultIndex =
        type == "onward" ? Onward?.flight : Return?.flight;

      const data = await fetchDataAirlse({
        sesstioResultIndex,
        adultCount,
        childCount,
        infantCount,
      });
      // console.log(data, "Airseldata");
      return data;
    }
  };
  if (type == "onward") {
    const fareCodeFareRule = await handleDispatch(Onward, type);
    // console.log(fareCodeFareRule, "onwardFarecoed");
    // dispatch(fetchFlightQuotesAireselSucessOneway(fareCodeFareRule));
    return fareCodeFareRule;
  } else {
    const fareCodeFareRule = await handleDispatch(Return, type);
    // console.log(fareCodeFareRule, "ReturnFarecoed");
    // dispatch(fetchFlightQuotesAireselSucessReturn(fareCodeFareRule));
    return fareCodeFareRule;
  }
};

export const fareQuateRuleAirselErrorCheck = async (type) => {
  const reducerState = store.getState();

  const fareCode = reducerState?.fareQuoteRuleAirselReducer?.return;

  // console.log(fareCode, "fareCodeeee");

  const Onward = reducerState?.returnSelected?.returnSelectedFlight?.onward;
  const Return = reducerState?.returnSelected?.returnSelectedFlight?.return;
  const flightQuoteOnward = reducerState?.fareQuoteRuleAirselReducer?.oneway;
  // ?.flightQuote;
  const flightQuoteReturn = reducerState?.fareQuoteRuleAirselReducer?.return;
  // ?.flightQuote;

  const handleErrorCheck = async (flight, type) => {
    // console.log(flight, "handleDispatch");

    if (flight.type == "TBO") {
      const flightQuoteTBO =
        type == "onward"
          ? reducerState?.fareQuoteRuleAirselReducer?.oneway?.flightQuote
          : reducerState?.fareQuoteRuleAirselReducer?.return?.flightQuote;
      if (flightQuoteTBO?.error == true) {
        // console.log("tboiferror");
        return {
          error: true,
          loading: false,
          message: flightQuoteTBO,
        };
      } else if (
        flightQuoteTBO?.data?.data?.Response?.Error?.ErrorCode &&
        flightQuoteTBO?.data?.data?.Response?.Error?.ErrorCode != 0
      ) {
        // console.log("tboelseiferror");
        return {
          error: true,
          loading: false,
          message: flightQuoteTBO?.data?.data?.Response?.Error?.ErrorMessage,
        };
      } else {
        return {
          error: false,
          loading: false,
          message: "Fare Quote Found",
        };
      }
      // console.log(flightQuoteTBO, "flight Quote");
    } else if (flight.type == "KAFILA") {
      const flightQuoteKafila =
        type == "onward"
          ? reducerState?.fareQuoteRuleAirselReducer?.oneway
          : reducerState?.fareQuoteRuleAirselReducer?.return;
      if (flightQuoteKafila?.error == true) {
        return {
          error: true,
          loading: false,
          message: flightQuoteKafila?.errorMessage,
        };
      }
      //   else if (flightQuoteKafila?.data?.data?.Response?.Error?.ErrorCode != 0) {
      //    return {
      //      error: true,
      //      loading: false,
      //      message: flightQuoteTBO?.data?.data?.Response?.Error?.ErrorMessage,
      //    };
      //  }
      else {
        return {
          error: false,
          loading: false,
          message: "Fare Quote Found",
        };
      }

      // const Param = type == "onward" ? journeyFlightParam : returnFlightParam;
    } else if (flight.type == "AMD") {
      const flightQuoteAMD =
        type == "onward"
          ? reducerState?.fareQuoteRuleAirselReducer?.oneway
          : reducerState?.fareQuoteRuleAirselReducer?.return;
      // console.log(flightQuoteAMD, "flightQuoteAMD");
      let response = {};
      if (
        flightQuoteAMD?.airselXml?.itineraryDetails?.segmentInformation
          ?.actionDetails
      ) {
        if (
          flightQuoteAMD?.airselXml?.itineraryDetails?.segmentInformation
            ?.actionDetails?.statusCode != "OK"
        ) {
          response = {
            error: true,
            loading: false,
            message: "No Class Available",
          };
          // console.log(response, "amd errorcheckIF");
          return response;
        } else {
          response = {
            error: false,
            loading: false,
            message: "Fare Quote Found",
          };
          return response;
        }
      } else {
        response =
          flightQuoteAMD?.airselXml?.itineraryDetails?.segmentInformation?.filter(
            (i) => {
              if (i?.actionDetails?.statusCode !== "OK") {
                // console.log(i, "statusCodestatusCode");
                return {
                  error: true,
                  loading: false,
                  message: "No Class Available",
                };
              }
            }
          );
      }

      if (0 < response?.length) {
        return {
          error: true,
          loading: false,
          message: "No Class Available",
        };
      } else {
        return {
          error: false,
          loading: false,
          message: "Fare Quote Found",
        };
      }
    }
  };
  // console.log(flightQuoteOnward, "flightQuoteOnward");
  if (type == "onward") {
    if (!flightQuoteOnward) {
      return {
        error: false,
        loading: true,
        message: "loading...",
      };
    } else {
      const fareCodeFareRule = await handleErrorCheck(Onward, type);
      // console.log(fareCodeFareRule, "onwardFarecoed");
      // dispatch(fetchFlightQuotesAireselSucessOneway(fareCodeFareRule));
      return fareCodeFareRule;
    }
  } else {
    if (!flightQuoteReturn) {
      return {
        error: false,
        loading: true,
        message: "loading...",
      };
    } else {
      const fareCodeFareRule = await handleErrorCheck(Return, type);
      // console.log(fareCodeFareRule, "ReturnFarecoed");
      // dispatch(fetchFlightQuotesAireselSucessReturn(fareCodeFareRule));
      return fareCodeFareRule;
    }
  }
};
export const findPrice = async (type) => {
  const reducerState = store.getState();
  // console.log(reducerState, "reducerState");
  const Onward = reducerState?.returnSelected?.returnSelectedFlight?.onward;
  const Return = reducerState?.returnSelected?.returnSelectedFlight?.return;
  const flightPrice = async (flight, type) => {
    // console.log(flight, "handleDispatch");

    if (flight.type == "TBO") {
      const price = flight?.flight?.Fare?.PublishedFare;
      // console.log(price, flight, "tboprice");
      return price;
    } else if (flight.type == "KAFILA") {
      const price = flight?.flight?.Fare?.GrandTotal;
      // console.log(price, flight, "kafilaprice");
      return price;
    } else if (flight.type == "AMD") {
      const price =
        parseInt(flight?.flight?.Fare?.monetaryDetail?.[0]) +
        parseInt(flight?.flight?.Fare?.monetaryDetail?.[1]);
      return price;
    }
    if (type == "onward") {
      const price = await flightPrice(Onward, type);
      // console.log(price, "findPrice");
      // dispatch(fetchFlightQuotesAireselSucessOneway(fareCodeFareRule));
      return price;
    } else {
      const price = await flightPrice(Return, type);
      // console.log(price, "findPrice");
      // dispatch(fetchFlightQuotesAireselSucessReturn(fareCodeFareRule));
      return price;
    }
  };
  if (type == "onward") {
    const Price = await flightPrice(Onward, type);

    // dispatch(fetchFlightQuotesAireselSucessOneway(fareCodeFareRule));
    return Price;
  } else {
    const Price = await flightPrice(Return, type);

    // dispatch(fetchFlightQuotesAireselSucessReturn(fareCodeFareRule));
    return Price;
  }
};
function convertDateFormatTBO(inputDate) {
  // Split the input date string into year, month, and day
  const [year, month, day] = inputDate?.split("-");

  // Create a new Date object using the components
  const newDate = new Date(year, month - 1, day);

  // Format the output date string as "yyyy-mm-ddTHH:mm:ss"
  const outputDate = newDate
    .toISOString()
    .slice(0, 19)
    .replace("T", "T00:00:00");
  // console.log(outputDate, "outputdate")

  return outputDate;
}
export const startBookingProcess = async (type) => {
  const reducerState = store.getState();
  let passengerData = reducerState?.passengers?.passengersData;

  // console.log(reducerState, passengerData, "reducerState", type);
  // console.log("staartbookingProcess", type);

  const fareCode = reducerState?.fareQuoteRuleAirselReducer?.return;

  // console.log(fareCode, "fareCodeeee");
  // if (
  //   0 < fareCode.length ||
  //   reducerState?.fareQuoteRuleAirselReducer?.isLoading == true
  // ) {
  //   console.log(fareCode, "fareCodeeee2");
  //   return fareCode;
  // }

  const Onward = reducerState?.returnSelected?.returnSelectedFlight?.onward;
  const Return = reducerState?.returnSelected?.returnSelectedFlight?.return;
  const isPassportRequired = passportReqired();

  const {
    journeyFlightParam,
    journeyFlightTvoTraceId,
    returnFlightParam,
    returnFlightTvoTraceId,
  } = reducerState?.return;
  const handleDispatch = async (flight, type) => {
    // console.log(flight, "handleDispatch");

    if (flight.type == "TBO") {
      const fareBreak =
        type == "onward"
          ? reducerState?.fareQuoteRuleAirselReducer?.oneway?.flightQuote?.data
              ?.data?.Response?.Results?.FareBreakdown
          : reducerState?.fareQuoteRuleAirselReducer?.return?.flightQuote?.data
              ?.data?.Response?.Results?.FareBreakdown;
      const isLCC =
        type == "onward"
          ? reducerState?.fareQuoteRuleAirselReducer?.oneway?.flightQuote?.data
              ?.data?.Response?.Results?.IsLCC
          : reducerState?.fareQuoteRuleAirselReducer?.return?.flightQuote?.data
              ?.data?.Response?.Results?.IsLCC;
      let arr = [];
      const fareBreakDown = fareBreak.map((price, key) => {
        let obj1 = {
          Currency: price?.Currency,
          BaseFare: price?.BaseFare / price?.PassengerCount,
          Tax: price?.Tax / price?.PassengerCount,
          YQTax: price?.YQTax / price?.PassengerCount,
          AdditionalTxnFeePub:
            price?.AdditionalTxnFeePub / price?.PassengerCount,
          AdditionalTxnFeeOfrd:
            price?.AdditionalTxnFeeOfrd / price?.PassengerCount,
        };
        arr.push(obj1);
        // console.log(arr, "fareBreakdown");
        return obj1;
      });
      // console.log(fareBreakDown, "fareBreakDownnnn");
      const newPassengerData = passengerData?.map((item, index) => {
        const Fare = fareBreakDown[item?.PaxType - 1];
        console.log(Fare, "fareeeee");
        return {
          ...item,
          Title: item?.title,
          Email: apiURL.flightEmail,
          FirstName: item?.firstName,
          LastName: item?.lastName,
          Gender: item?.gender,

          ContactNo: passengerData?.[0]?.ContactNo,
          Fare: Fare,
          PassportNo: item?.passportNo,
          PassportExpiry: isPassportRequired
            ? convertDateFormatTBO(item?.passportExpiry)
            : "",
        };
      });
      // console.log(newPassengerData, "passengerData");

      const ResultIndex =
        type == "onward"
          ? Onward?.flight?.ResultIndex
          : Return?.flight?.ResultIndex;
      const TraceId =
        type == "onward" ? journeyFlightTvoTraceId : returnFlightTvoTraceId;

      const payload = {
        EndUserIp: reducerState?.ip?.ipData,
        TokenId: reducerState?.ip?.tokenData,
        TraceId: TraceId,
        ResultIndex: ResultIndex,
        Passengers: newPassengerData,
      };
      if (isLCC == false) {
        // dispatch(bookActionGDS(payloadGDS));
        // console.log("bookActionGDS");

        const block = await userApi.flightBookGDS(payload);
        // console.log(block, "blockkkkk");
        const PNR = block?.data?.data?.Response?.Response?.PNR;
        const BookingId = block?.data?.data?.Response?.Response?.BookingId;

        const payLoadDomestic = {
          EndUserIp: reducerState?.ip?.ipData,
          TokenId: reducerState?.ip?.tokenData,
          TraceId: TraceId,
          PNR: PNR,
          BookingId: BookingId,
          ResultIndex: ResultIndex,
        };
        const payLoadInternational = {
          EndUserIp: reducerState?.ip?.ipData,
          TokenId: reducerState?.ip?.tokenData,
          TraceId: TraceId,
          PNR: PNR,
          BookingId: BookingId,
          // Passengers: passengerData?.map((item, index) => {
          //   return {
          //     ...item,
          //     Email: apiURL.flightEmail,

          //     ContactNo: passengerData[0]?.ContactNo,
          //     // PassportExpiry: isPassportRequired
          //     //   ? convertDateFormat(item?.PassportExpiry)
          //     //   : "",
          //     // Baggage:
          //     //   baggageData?.[index] == undefined ? [] : [baggageData?.[index]],
          //     // MealDynamic:
          //     //   mellData?.flat()?.[index] == undefined
          //     //     ? []
          //     //     : [mellData?.flat()?.[index]],
          //     // SeatDynamic:
          //     //   seatList?.[0]?.flat()?.[index] == undefined
          //     //     ? []
          //     //     : [seatList?.[0]?.flat()?.[index]],
          //   };
          // }),
        };
        const BookTicket = await userApi?.flightGetTicketNonLcc(
          payLoadDomestic
        );
        // console.log(BookTicket, "BookTicketNONLcc");

        return BookTicket;
      } else if (isLCC == true) {
        // getTicketForLCC();
        // console.log("getTicketForLcc");
        const getTicket = await userApi.flightGetTicketLcc(payload);
        return getTicket;
      }
    } else if (flight.type == "KAFILA") {
      const Param = type == "onward" ? journeyFlightParam : returnFlightParam;
      const SelectedFlights =
        type == "onward" ? Onward?.flight : Return?.flight;

      const fareresponse =
        type == "onward"
          ? reducerState?.fareQuoteRuleAirselReducer?.oneway
          : reducerState?.fareQuoteRuleAirselReducer?.return;
      // console.log(fareresponse, "kafilaFareCheck");

      const payload = {
        FareChkRes: {
          IsFareUpdate: fareresponse?.data?.result?.IsFareUpdate,
          IsAncl: fareresponse?.data?.result?.IsAncl,
          Param: Param,
          SelectedFlight: fareresponse?.data?.result?.SelectedFlight,
          FareBreakup: fareresponse?.data?.result?.FareBreakup,
          GstData: null,
        },
        PaxInfo: {
          GstData: {
            IsGst: false,
            GstDetails: null,
          },
          PaxEmail: apiURL.flightEmail,
          PaxMobile: passengerData[0]?.ContactNo,
          Passengers: passengerData?.map((item, index) => {
            const paxvalue =
              item?.PaxType === 1
                ? "ADT"
                : item?.PaxType === 2
                ? "CHD"
                : item?.PaxType === 3
                ? "INF"
                : null;

            return {
              PaxType: paxvalue,
              Title: item?.title,
              FName: item?.firstName,
              LName: item?.lastName,
              Gender: item?.Gender === 1 ? "Male" : "Female",
              Dob: item?.DateOfBirth,
              // Dob:null,
              // selectedbaggage?.[index] == undefined ? [] : [selectedbaggage?.[index]]
              Baggage: [],
              Special: [],
              Meal: [],

              Seat: null,
              Optional: {
                TicketNumber: "",
                PassportNo: item?.PassportNo,
                PassportExpiryDate:
                  //  isPassportRequired
                  // ?
                  item?.PassportExpiry,
                // : "",
                FrequentFlyerNo: "",
                Nationality: item?.CountryCode,
                ResidentCountry: item?.CountryCode,
              },
            };
          }),
        },
      };
      // console.log(payload, "farepayload");

      const data = await userApi?.kafilapnr(payload);
      // console.log(data, "kafiladata");
      // return data;
      return data;
    } else if (flight.type == "AMD") {
      const adultCount = sessionStorage.getItem("adults");
      const childCount = sessionStorage.getItem("childs");
      const infantCount = sessionStorage.getItem("infants");
      const sesstioResultIndex =
        type == "onward" ? Onward?.flight : Return?.flight;
      const airesellRes =
        type == "onward"
          ? reducerState?.fareQuoteRuleAirselReducer?.oneway
          : reducerState?.fareQuoteRuleAirselReducer?.return;
      // console.log(airesellRes, "airselResult");
      let seatListPayload = [];
      const data = startBookingProcessAMD_New({
        sesstioResultIndex,
        adultCount,
        childCount,
        infantCount,
        seatListPayload,
        passengerData,
        airesellRes,
      });
      // console.log(data, "Airseldata");
      return data;
    }
  };

  if (type == "onward") {
    const fareCodeFareRule = await handleDispatch(Onward, type);
    // console.log(fareCodeFareRule, "onwardFarecoed");
    // dispatch(fetchFlightQuotesAireselSucessOneway(fareCodeFareRule));
    return fareCodeFareRule;
  } else {
    const fareCodeFareRule = await handleDispatch(Return, type);
    // console.log(fareCodeFareRule, "ReturnFarecoed");
    // dispatch(fetchFlightQuotesAireselSucessReturn(fareCodeFareRule));
    return fareCodeFareRule;
  }
};
// export const ticketDetails =  (type) => {
//   const reducerState = store.getState();
//   let passengerData = reducerState?.passengers?.passengersData;

//   console.log(reducerState, passengerData, "reducerState", type);

//   const Onward = reducerState?.returnSelected?.returnSelectedFlight?.onward;
//   const Return = reducerState?.returnSelected?.returnSelectedFlight?.return;
//   const SelectedFlights = type == "onward" ? Onward : Return;

//   const newPassengerData = passengerData?.map((item, index) => ({
//     name: `${item.firstName} ${item?.lastName}`,
//     seat: "12A",
//     class: "Economy",
//   }));
//   let PNR;

//   const handlePnr =  (flight, type) => {
//     if (flight.type == "TBO") {
//       const PNRData =
//         type == "onward"
//           ? reducerState?.newFlightBook?.oneway?.Response?.Results
//               ?.FareBreakdown
//           : reducerState?.newFlightBook?.return;

//       return { jiii: "jjjj" };
//     } else if (flight.type == "KAFILA") {
//       const SelectedFlights =
//         type == "onward" ? Onward?.flight : Return?.flight;
//       PNR =
//         type == "onward"
//           ? reducerState?.newFlightBook?.oneway?.result?.BookingInfo?.APnr
//           : reducerState?.newFlightBook?.return?.result?.BookingInfo?.APnr;
//       console.log("kafilaPnr", PNR);

//       return PNR;
//     } else if (flight.type == "AMD") {
//       const SelectedFlights =
//         type == "onward" ? Onward?.flight : Return?.flight;
//       const PNRData =
//         type == "onward"
//           ? reducerState?.newFlightBook?.oneway?.Response?.Results
//               ?.FareBreakdown
//           : reducerState?.newFlightBook?.return;
//       PNR = PNRData?.pnrHeader?.reservation?.controlNumber;
//       console.log("Amd PNR Data", PNR);

//       return PNR;
//     }
//   };
//   if (type == "onward") {
//     return handlePnr(Onward, type);
//   } else {
//     return handlePnr(Return, type);
//   }
// };
export const flightBookErrorCheck = (type) => {
  const reducerState = store.getState();

  const Onward = reducerState?.returnSelected?.returnSelectedFlight?.onward;
  const Return = reducerState?.returnSelected?.returnSelectedFlight?.return;
  const flightBookOnward = reducerState?.newFlightBook?.oneway;
  // ?.flightQuote;
  const flightBookReturn = reducerState?.newFlightBook?.return;
  // console.log(
  //   flightBookOnward?.data?.data?.Response?.Error?.ErrorCode,
  //   flightBookOnward,
  //   "flightBookOnward",
  //   flightBookReturn,
  //   flightBookOnward?.length,
  //   "bookFlight",
  //   flightBookReturn.length
  // );
  const handleErrorCheckBook = (flight, type) => {
    if (flight?.type == "TBO") {
      const flightBookTBO =
        type == "onward" ? flightBookOnward : flightBookReturn;
      if (flightBookTBO?.data?.data?.Response?.Error?.ErrorCode == 0) {
        // console.log(
        //   flightBookTBO?.data?.data?.Response?.Error?.ErrorCode,
        //   "tboiferror"
        // );
        return {
          error: false,
          loading: false,
          message: "CONFIRMED",
        };
      }
      //  else if (
      //   flightQuoteTBO?.data?.data?.Response?.Error?.ErrorCode &&
      //   flightQuoteTBO?.data?.data?.Response?.Error?.ErrorCode != 0
      // ) {
      //   console.log("tboelseiferror");
      //   return {
      //     error: true,
      //     loading: false,
      //     message:
      //       flightQuoteTBO?.data?.data?.Response?.Error?.ErrorMessage,
      //   };
      // }
      else {
        return {
          error: true,
          loading: false,
          message: "FAILED",
        };
      }
    } else if (flight?.type == "KAFILA") {
      const flightBookKafila =
        type == "onward" ? flightBookOnward : flightBookReturn;
      if (flightBookKafila?.result?.BookingInfo?.BookingStatus == "CONFIRMED") {
        return {
          error: false,
          loading: false,
          message: "CONFIRMED",
        };
      }
      //   else if (flightQuoteKafila?.data?.data?.Response?.Error?.ErrorCode != 0) {
      //    return {
      //      error: true,
      //      loading: false,
      //      message: flightQuoteTBO?.data?.data?.Response?.Error?.ErrorMessage,
      //    };
      //  }
      else {
        return {
          error: true,
          loading: false,
          message: "FAILED",
        };
      }

      // const Param = type == "onward" ? journeyFlightParam : returnFlightParam;
    } else if (flight?.type == "AMD") {
      const flightBookAMD =
        type == "onward" ? flightBookOnward : flightBookReturn;
      // console.log(flightBookAMD, "flightBookAMD");

      if (
        flightBookOnward?.pnrHeader?.reservationInfo?.reservation?.controlNumber
      ) {
        return {
          error: false,
          loading: false,
          message: "CONFIRMED",
        };
      } else {
        return {
          error: true,
          loading: false,
          message: "FAILED",
        };
      }
    }
  };
  if (type == "onward") {
    if (Object.keys(flightBookOnward)?.length == 0) {
      return {
        error: false,
        loading: true,
        message: "loading...",
      };
    } else {
      const flightBook = handleErrorCheckBook(Onward, type);
      // console.log(flightBook, "onwardFarecoed");
      // dispatch(fetchFlightQuotesAireselSucessOneway(fareCodeFareRule));
      return flightBook;
    }
  } else {
    if (Object.keys(flightBookReturn)?.length == 0) {
      return {
        error: false,
        loading: true,
        message: "loading...",
      };
    } else {
      const flightBook = handleErrorCheckBook(Return, type);
      // console.log(flightBook, "ReturnFarecoed");
      // dispatch(fetchFlightQuotesAireselSucessReturn(fareCodeFareRule));
      return flightBook;
    }
  }
};
export const ticketDetails = (type) => {
  const reducerState = store.getState();
  const passengerData = reducerState?.passengers?.passengersData;

  const Onward = reducerState?.returnSelected?.returnSelectedFlight?.onward;
  const Return = reducerState?.returnSelected?.returnSelectedFlight?.return;
  // console.log(type, "typeeee");

  const SelectedFlights = type === "onward" ? Onward : Return;

  const handlePnr = (flight, type) => {
    let PNR;
    let BookingId;
    let ticket = {
      flight: flight,
      PNR: "",

      BookingId: "",
      passengers: passengerData,
      boardingTime: "2h before departure",
    };
    let boardingTime;

    if (flight?.type === "TBO") {
      const PNRData =
        type === "onward"
          ? reducerState?.newFlightBook?.oneway?.data?.data?.Response?.Response
          : reducerState?.newFlightBook?.return?.data?.data?.Response?.Response;
      PNR = PNRData?.PNR;
      const isLCC =
        type == "onward"
          ? reducerState?.fareQuoteRuleAirselReducer?.oneway?.flightQuote?.data
              ?.data?.Response?.Results?.IsLCC
          : reducerState?.fareQuoteRuleAirselReducer?.return?.flightQuote?.data
              ?.data?.Response?.Results?.IsLCC;

      BookingId = PNRData?.BookingId;
      ticket.PNR = PNR;
      ticket.BookingId = BookingId;
      // console.log(PNRData, PNR, "TVO PNR Data", ticket, type);
      return ticket; // Placeholder - modify based on actual requirements
    } else if (flight?.type === "KAFILA") {
      PNR =
        type === "onward"
          ? reducerState?.newFlightBook?.oneway?.result?.BookingInfo?.APnr
          : reducerState?.newFlightBook?.return?.result?.BookingInfo?.APnr;
      ticket.PNR = PNR;
      // ticket.boardingTime = boardingTime;

      return ticket;
    } else if (flight?.type === "AMD") {
      const PNRData =
        type === "onward"
          ? reducerState?.newFlightBook?.oneway
          : reducerState?.newFlightBook?.return;
      PNR = PNRData?.pnrHeader?.reservationInfo?.reservation?.controlNumber;
      // console.log(
      //   "Amd PNR Data",
      //   PNR,
      //   PNRData?.originDestinationDetails?.itineraryInfo?.[0]?.flightDetail
      //     ?.timeDetail?.checkinTime
      // );
      boardingTime =
        PNRData?.originDestinationDetails?.itineraryInfo?.flightDetail
          ?.timeDetail?.checkinTime ||
        PNRData?.originDestinationDetails?.itineraryInfo?.[0]?.flightDetail
          ?.timeDetail?.checkinTime;

      ticket.PNR = PNR;
      ticket.boardingTime = boardingTime || "2h before departure";
      return ticket;
    }

    return ticket; // Default return if none of the conditions match
  };

  return handlePnr(SelectedFlights, type);
};
export const saveDB = (type) => {
  const reducerState = store.getState();
  const passengerData = reducerState?.passengers?.passengersData;
  const markUpamount =
    reducerState?.markup?.markUpData?.data?.result[0]?.flightMarkup;

  const Onward = reducerState?.returnSelected?.returnSelectedFlight?.onward;
  const Return = reducerState?.returnSelected?.returnSelectedFlight?.return;
  // console.log(type, Onward, Return, passengerData, "typeeee");

  const SelectedFlights = type === "onward" ? Onward : Return;
  const formatDepTime = (dateString) =>
    moment(dateString).format("YYYY-MM-DDTHH:mm:ss");
  const payload = {
    userId: reducerState?.logIn?.loginData?.data?.result?._id,
    bookingId: "SKY" + Date.now(),
    oneWay: false,
    ticketType: "Original Ticket",
    pnr: "",
    origin: SelectedFlights?.origin,
    destination: SelectedFlights?.destination,
    paymentStatus: "success",
    totalAmount: SelectedFlights?.price,
    airlineDetails: "",
    //  airlineDetails: bookingDataLcc?.FlightItinerary?.Segments.map(
    //    (item, index) => {
    //      return {
    //        Airline: {
    //          AirlineCode: "",
    //          AirlineName: "",
    //          FlightNumber: "",
    //          FareClass: "",
    //        },
    //        Origin: {
    //          AirportCode: "",
    //          AirportName: "",
    //          CityName: "",
    //          Terminal: "",
    //          DepTime: "",
    //        },
    //        Destination: {
    //          AirportCode: "",
    //          AirportName: "",
    //          CityName: "",
    //          Terminal: "",
    //          ArrTime: "",
    //        },
    //        Baggage: "",
    //      };
    //    }
    //  ),
    passengerDetails: passengerData,
    bookingStatus: "BOOKED",
    baggage: [],
    mealDynamic: [],
    seatDynamic: [],
  };
  // console.log(payload, "payload");
  const handleBookingDetails = (flight, type) => {
    let PNR;
    let BookingId;
    let ticket = {
      flight: flight,
      PNR: "",

      BookingId: "",
      passengers: passengerData,
      boardingTime: "2h before departure",
    };
    let boardingTime;

    if (flight.type === "TBO") {
      const PNRData =
        type === "onward"
          ? reducerState?.newFlightBook?.oneway?.data?.data?.Response?.Response
          : reducerState?.newFlightBook?.return?.data?.data?.Response?.Response;
      PNR = PNRData?.PNR;
      let airlineDetails = flight?.flight?.Segments?.[0]?.map((item, index) => {
        return {
          Airline: {
            AirlineCode: item.Airline.AirlineCode,
            AirlineName: item.Airline.AirlineName,
            FlightNumber: item.Airline.FlightNumber,
            FareClass: item.Airline.FareClass,
          },
          Origin: {
            AirportCode: item.Origin.Airport.AirportCode,
            AirportName: item.Origin.Airport.AirportName,
            CityName: item.Origin.Airport.CityName,
            Terminal: item.Origin.Airport.Terminal,
            DepTime: item.Origin.DepTime,
          },
          Destination: {
            AirportCode: item.Destination.Airport.AirportCode,
            AirportName: item.Destination.Airport.AirportName,
            CityName: item.Destination.Airport.CityName,
            Terminal: item.Destination.Airport.Terminal,
            ArrTime: item.Destination.ArrTime,
          },
          baggage: [],
          mealDynamic: [],
          seatDynamic: [],
        };
      });
      BookingId = PNRData?.BookingId;
      payload.pnr = PNR;
      payload.airlineDetails = airlineDetails;
      payload.bookingId = BookingId;
      let bookingStatus = PNR ? "BOOKED" : "FAILED";
      payload.bookingStatus = bookingStatus;
      // console.log(PNRData, PNR, payload, airlineDetails, "TVO PNR Data", type);
      // return ticket;
      // Placeholder - modify based on actual requirements
      userApi.flightBookingDataSave(payload);
    } else if (flight.type === "KAFILA") {
      const flightDetails = flight?.flight;
      let airlineDetails = flightDetails?.Itinerary?.map((item, index) => {
        return {
          Airline: {
            AirlineCode: item?.FCode,
            AirlineName: item?.FName,
            FlightNumber: item?.FNo,
            FareClass: item?.FClass,
          },
          Origin: {
            AirportCode: item?.Src,
            AirportName: item?.DArpt,
            CityName: item?.SrcName,
            Terminal: item?.DTrmnl,
            DepTime: item?.DDate,
          },
          Destination: {
            AirportCode: item?.Des,
            AirportName: item?.DArpt,
            CityName: item?.DesName,
            Terminal: item?.DTrmnl,
            DepTime: item?.DDate,
          },
          baggage: [],
          mealDynamic: [],
          seatDynamic: [],
        };
      });
      PNR =
        type === "onward"
          ? reducerState?.newFlightBook?.oneway?.result?.BookingInfo?.APnr
          : reducerState?.newFlightBook?.return?.result?.BookingInfo?.APnr;
      payload.pnr = PNR;
      payload.airlineDetails = airlineDetails;
      let bookingStatus = PNR ? "BOOKED" : "FAILED";
      payload.bookingStatus = bookingStatus;
      // ticket.boardingTime = boardingTime;
      // console.log(PNR, payload, "KAfila PNR Data", type);
      userApi.addBookingDetailsKafila(payload);
      // return ticket;
    } else if (flight.type === "AMD") {
      const flightDetails = flight?.flight;
      let Baggage =
        (flightDetails?.baggage?.freeBagAllownceInfo?.baggageDetails
          ?.quantityCode ||
          flightDetails?.baggage?.freeBagAllownceInfo?.baggageDetails
            ?.quantityCode) === "W"
          ? `${
              flightDetails?.baggage?.freeBagAllownceInfo?.baggageDetails
                ?.freeAllowance ||
              flightDetails?.baggage?.freeBagAllownceInfo?.baggageDetails
                ?.freeAllowance
            } ${
              flightDetails?.baggage?.freeBagAllownceInfo?.baggageDetails
                ?.unitQualifier ||
              (flightDetails?.baggage?.freeBagAllownceInfo?.baggageDetails
                ?.unitQualifier === "K"
                ? "KG"
                : flightDetails?.baggage?.freeBagAllownceInfo?.baggageDetails
                    ?.unitQualifier)
            }`
          : `(${
              flightDetails?.baggage?.freeBagAllownceInfo?.baggageDetails
                ?.freeAllowance ||
              flightDetails?.baggage?.freeBagAllownceInfo?.baggageDetails
                ?.freeAllowance
            } × 23KG)`;
      // console.log(flightDetails, "flightDetails");
      const nonStop = [
        {
          Airline: {
            AirlineCode:
              flightDetails?.flightDetails?.flightInformation?.companyId
                ?.marketingCarrier,
            AirlineName: findAirlineByCode(
              flightDetails?.flightDetails?.flightInformation?.companyId
                ?.marketingCarrier
            )?.airlineName,
            FlightNumber:
              flightDetails?.flightDetails?.flightInformation
                ?.flightOrtrainNumber,
            FareClass: "W",
            //   jsonSavePnrData?.originDestinationDetails?.itineraryInfo
            //     ?.travelProduct?.productDetails?.classOfService,
          },
          Origin: {
            AirportCode:
              flightDetails?.flightDetails?.flightInformation?.location?.[0]
                ?.locationId,
            AirportName: findAirportByCode(
              flightDetails?.flightDetails?.flightInformation?.location?.[0]
                ?.locationId
            )?.code,
            CityName: findAirportByCode(
              flightDetails?.flightDetails?.flightInformation?.location?.[0]
                ?.locationId
            )?.name,
            Terminal:
              flightDetails?.flightDetails?.flightInformation?.location?.[0]
                ?.terminal,
            DepTime: convertToISO(
              flightDetails?.flightDetails?.flightInformation?.productDateTime
                ?.dateOfDeparture,
              flightDetails?.flightDetails?.flightInformation?.productDateTime
                ?.timeOfDeparture
            ),
          },
          Destination: {
            AirportCode:
              flightDetails?.flightDetails?.flightInformation?.location?.[1]
                ?.locationId,
            AirportName: findAirportByCode(
              flightDetails?.flightDetails?.flightInformation?.location?.[1]
                ?.locationId
            )?.code,
            CityName: findAirportByCode(
              flightDetails?.flightDetails?.flightInformation?.location?.[1]
                ?.locationId
            )?.name,
            Terminal:
              flightDetails?.flightDetails?.flightInformation?.location?.[1]
                ?.terminal,
            ArrTime: convertToISO(
              flightDetails?.flightDetails?.flightInformation?.productDateTime
                ?.dateOfArrival,
              flightDetails?.flightDetails?.flightInformation?.productDateTime
                ?.timeOfArrival
            ),
          },
          Baggage: Baggage,
        },
      ];
      let airlineDetails = flightDetails?.flightDetails?.flightInformation
        ? nonStop
        : flightDetails?.flightDetails?.map((item) => {
            // console.log(item, "stops");

            return {
              Airline: {
                AirlineCode:
                  item?.flightInformation?.companyId?.marketingCarrier,
                AirlineName: findAirlineByCode(
                  item?.flightInformation?.companyId?.marketingCarrier
                )?.airlineName,
                FlightNumber: item?.flightInformation?.flightOrtrainNumber,
                FareClass: "W",
                //   jsonSavePnrData?.originDestinationDetails?.itineraryInfo
                //     ?.travelProduct?.productDetails?.classOfService,
              },
              Origin: {
                AirportCode: item?.flightInformation?.location?.[0]?.locationId,
                AirportName: findAirportByCode(
                  item?.flightInformation?.location?.[0]?.locationId
                )?.code,
                CityName: findAirportByCode(
                  item?.flightInformation?.location?.[0]?.locationId
                )?.name,
                Terminal: item?.flightInformation?.location?.[0]?.terminal,
                DepTime: convertToISO(
                  item?.flightInformation?.productDateTime?.dateOfDeparture,
                  item?.flightInformation?.productDateTime?.timeOfDeparture
                ),
              },
              Destination: {
                AirportCode: item?.flightInformation?.location?.[1]?.locationId,
                AirportName: findAirportByCode(
                  item?.flightInformation?.location?.[1]?.locationId
                )?.code,
                CityName: findAirportByCode(
                  item?.flightInformation?.location?.[1]?.locationId
                )?.name,
                Terminal: item?.flightInformation?.location?.[1]?.terminal,
                ArrTime: convertToISO(
                  item?.flightInformation?.productDateTime?.dateOfArrival,
                  item?.flightInformation?.productDateTime?.timeOfArrival
                ),
              },
              Baggage: Baggage,
            };
          });
      const PNRData =
        type === "onward"
          ? reducerState?.newFlightBook?.oneway
          : reducerState?.newFlightBook?.return;
      PNR = PNRData?.pnrHeader?.reservationInfo?.reservation?.controlNumber;
      payload.pnr = PNR;
      payload.airlineDetails = airlineDetails;
      let bookingStatus = PNR ? "BOOKED" : "FAILED";
      payload.bookingStatus = bookingStatus;
      // console.log(
      //   "Amd PNR Data",
      //   PNR,
      //   PNRData?.originDestinationDetails?.itineraryInfo?.[0]?.flightDetail
      //     ?.timeDetail?.checkinTime,
      //   "payload",
      //   payload
      // );
      boardingTime =
        PNRData?.originDestinationDetails?.itineraryInfo?.flightDetail
          ?.timeDetail?.checkinTime ||
        PNRData?.originDestinationDetails?.itineraryInfo?.[0]?.flightDetail
          ?.timeDetail?.checkinTime;

      payload.pnr = PNR;
      // console.log(
      //   PNRData,
      //   PNR,
      //   payload,
      //   "AMD PNR Data",
      //   type,
      //   flightDetails,
      //   "nonStop",
      //   nonStop
      // );
      userApi.flightBookingDB(payload);
      // ticket.boardingTime = boardingTime || "2h before departure";
      // return ticket;
    }

    return ticket; // Default return if none of the conditions match
  };

  return handleBookingDetails(SelectedFlights, type);
};
export function findAirlineByCode(code) {
  // const reducerState = useSelector((state) => state);
  // Get the current state from the Redux store

  const state = store.getState();

  // Access the airport list from the state
  const airlinetList = state?.flightList?.flightDetails;

  // Perform the lookup
  if (!Array.isArray(airlinetList) || !code) return null;
  let data = airlinetList.find((airport) => airport?.airlineCode === code);

  return data;
}
// console.log(airports,airlines);
export function findAirportByCode(code) {
  // const reducerState = useSelector((state) => state);
  // const [airports, setAireport] = useState(
  //   reducerState?.flightList?.aireportList
  // );
  // const
  const state = store.getState();
  const airportList = state?.flightList?.aireportList;
  const data = airportList?.find((airport) => airport?.AirportCode === code);
  // console.log(state?.flightList, "airportlist");
  return data;
}
export function passportReqired() {
  const reducerState = store.getState();
  const onwardCountry = reducerState?.searchFlight?.flightDetails?.from
    ?.CountryCode
    ? reducerState?.searchFlight?.flightDetails?.from?.CountryCode
    : findAirportByCode(reducerState?.searchFlight?.flightDetails?.from)
        ?.CountryCode;
  const returnCountry = reducerState?.searchFlight?.flightDetails?.to
    ?.CountryCode
    ? reducerState?.searchFlight?.flightDetails?.to?.CountryCode
    : findAirportByCode(reducerState?.searchFlight?.flightDetails?.to)
        ?.CountryCode;
  const isPassportRequired =
    onwardCountry?.trim() !== "IN" || returnCountry?.trim() !== "IN"
      ? true
      : false;

  // console.log(
  //   reducerState?.searchFlight?.flightDetails,
  //   onwardCountry,
  //   returnCountry,
  //   "passport required"
  // );
  return isPassportRequired;
}
