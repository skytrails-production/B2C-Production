import React, { useEffect, useState } from 'react'
import FlightLayout from "../flightLayout/FlightLayout"
import { apiURL } from "../../Constants/constant";
import axios from "axios";
import { Button } from "antd";
import { XMLParser } from "fast-xml-parser";
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { number_of_seat_map, setAirlineAmount } from '../../Redux/AirlineSeatMap/actionAirlineSeatMap';

const AirSeatMap = ({ state, isDropdown, passengerData }) => {
  console.log(passengerData, "passengerData");
  const location = useLocation();
  const [seatMap, setSeatMap] = useState(null);
  const [loader, setLoader] = useState(false)
  const dispatch = useDispatch();
  // const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const adultCount = queryParams.get("adult");
  // const adultCount = 2;
  const childCount = queryParams.get("child");
  // const childCount = 2;
  const infantCount = queryParams.get("infant");
  // const infantCount = 2;
  const reducerState = useSelector((state) => state);

  console.log(state
    // ?.
    // fareDetails
    // ?.
    // groupOfFares?.
    // productInformation?.fareProductDetail?.
    // fareBasis

    , "seatmapState")
  let travler = ''
  for (let i = 0; i < Number(adultCount) + Number(childCount); i++) {
    let fareBasisCode="";
    if(adultCount==0|| childCount==0) {
      fareBasisCode = state?.fareDetails
      ?.
      groupOfFares?.
      productInformation?.fareProductDetail?.
      fareBasis
    }
    else if(i<Number(adultCount)){
      fareBasisCode = state?.[0]?.fareDetails
      ?.
      groupOfFares?.
      productInformation?.fareProductDetail?.
      fareBasis||state?.[0]?.fareDetails
      ?.
      groupOfFares?.[0]?.
      productInformation?.fareProductDetail?.
      fareBasis
    }
    else {
      fareBasisCode = state?.[1]?.fareDetails
      ?.
      groupOfFares?.
      productInformation?.fareProductDetail?.
      fareBasis
    }
    

    travler += `<traveler>
    <travelerInformation>

      <paxDetails>

        <surname>${passengerData?.[i]?.lastName}</surname>

      </paxDetails>

      <otherPaxDetails>

        <givenName>${passengerData?.[i]?.
        firstName}</givenName>

        <type>${passengerData?.[i]?.PaxType == 1 ? "ADT" : "CHD"}</type>
    

      </otherPaxDetails>

    </travelerInformation>
 


        <fareQualifierDetails>

          <additionalFareDetails>

            <rateClass>${fareBasisCode}/${fareBasisCode?.slice(-2)}</rateClass>

          </additionalFareDetails>

        </fareQualifierDetails>

      </traveler>`
  }
  console.log(reducerState, travler, "reducer state")
  // const location = useLocation();
  // const { state } = location;
  let seatMapData = [];
  let seatDataAmount = [];
  let seatMapdataNew = []
  let count = 0;
  let seatAmountList


  const convertXmlToJson = async (xmlData) => {
    setLoader(true);
    count++;
    const parser = new XMLParser();
    const result = await parser.parse(xmlData);
    seatMapdataNew.push(result)
    // console.log(seatMapdataNew, "seatMapdataNew");
    setSeatMap(seatMapdataNew)


    if (seatMapData?.length == count) {
      setLoader(false)
    }


  };

  if (state?.flightDetails?.flightInformation) {

    let depDate = state?.flightDetails?.flightInformation?.productDateTime?.dateOfDeparture;
    let dep = state?.flightDetails
      ?.flightInformation?.location?.[0]
      ?.locationId
    let arr = state?.flightDetails
      ?.flightInformation?.location?.[1]
      ?.locationId
    let airline = state?.flightDetails
      ?.flightInformation?.companyId
      ?.marketingCarrier
    let flight_number = state?.flightDetails
      ?.flightInformation?.flightOrtrainNumber
    seatMapData.push({ depDate, dep, arr, airline, flight_number })


  }
  else {

    for (let i = 0; i < state?.flightDetails?.length; i++) {
      let depDate = state?.flightDetails?.[i]?.flightInformation?.productDateTime?.dateOfDeparture;
      let dep = state?.flightDetails?.[i]
        ?.flightInformation?.location?.[0]
        ?.locationId
      let arr = state?.flightDetails?.[i]
        ?.flightInformation?.location?.[1]
        ?.locationId
      let airline = state?.flightDetails?.[i]
        ?.flightInformation?.companyId
        ?.marketingCarrier
      let flight_number = state?.flightDetails?.[i]
        ?.flightInformation?.flightOrtrainNumber
      // seatlist.push({})
      seatMapData.push({ depDate, dep, arr, airline, flight_number })
    }
    // dispatch(number_of_seat_map({ no: state?.flightDetails?.length, seatlist, seatlist: seatlist }))
  }


  useEffect(() => {
    let seatlist = []

    let numOfPaln = state?.flightDetails?.flightInformation ? 1 : state?.flightDetails?.length
    if (state?.flightDetails?.flightInformation) {
      seatlist.push([])
    } else {
      for (let i = 0; i < numOfPaln; i++) {
        seatlist.push([])
      }
    }
    // console.log(seatlist, "seatlist")
    dispatch(number_of_seat_map({ no: numOfPaln, seatList: seatlist }))
  }, [])
  function convertSeatPrice(seatPrice) {
    return seatPrice.map(priceObj => {
      let result = {
        type: '',
        amount: '',
        currency: '',
        seat: []
      };

      // Extracting seat details
      if (priceObj?.rowDetails) {
        const rowDetails = Array.isArray(priceObj.rowDetails) ? priceObj.rowDetails : [priceObj.rowDetails];
        rowDetails.forEach(row => {
          if (Array.isArray(row?.seatOccupationDetails)) {
            row.seatOccupationDetails.forEach(seat => {
              let seatDetail = `${row.seatRowNumber}${seat.seatColumn}`;
              if (seat.seatOccupation) {
                seatDetail += seat.seatOccupation;
              }
              result.seat.push(seatDetail);
            });
          }
        });
      }

      // Extracting monetary details
      if (priceObj?.seatPrice?.monetaryDetails) {
        priceObj.seatPrice.monetaryDetails.forEach(detail => {
          if (detail?.typeQualifier === 'TNB') {
            result.type = 'offer';
            result.amount = detail.amount;
            result.currency = detail.currency;
          } else if (detail?.typeQualifier === 'T') {
            result.type = 'full';
            result.amount = detail.amount;
            result.currency = detail.currency;
          }
        });
      }

      return result;
    });
  }

  const string = ` <seatRequestParameters>
    //     <genericDetails>
    //         <cabinClassDesignator>F</cabinClassDesignator>
    //     </genericDetails>
    //     <processingIndicator>FT</processingIndicator>
    // </seatRequestParameters>`;

  const handleData = async () => {
    seatMapdataNew = [];
    for (let i = 0; i < seatMapData?.length; i++) {
      console.log(seatMapData, "seatMapData")
      await fetchData(seatMapData[i]?.depDate, seatMapData[i]?.dep, seatMapData[i]?.arr, seatMapData[i]?.airline, seatMapData[i]?.flight_number)

    }

  }
  const fetchData = async (depDate, dep, arr, airline, flight_number) => {

    const res = await axios({
      method: "POST",
      url: `${apiURL.baseURL}/skyTrails/amadeus/airretrieveseatmap`,
      //       data: `<Air_RetrieveSeatMap>
      //     <travelProductIdent>
      //         <flightDate>
      //             <departureDate>${depDate}</departureDate>
      //         </flightDate>
      //         <boardPointDetails>
      //             <trueLocationId>${dep}</trueLocationId>
      //         </boardPointDetails>
      //         <offpointDetails>
      //             <trueLocationId>${arr}</trueLocationId>
      //         </offpointDetails>
      //         <companyDetails>
      //             <marketingCompany>${airline}</marketingCompany>
      //         </companyDetails>
      //         <flightIdentification>
      //             <flightNumber>${flight_number}</flightNumber>
      //         </flightIdentification>
      //     </travelProductIdent>
      //     <seatRequestParameters>
      //         <genericDetails>
      //              <cabinClassDesignator>W</cabinClassDesignator>
      //          </genericDetails>
      //          <processingIndicator>FT</processingIndicator>
      //      </seatRequestParameters>
      // </Air_RetrieveSeatMap>`,
      data: `<Air_RetrieveSeatMap>

    <travelProductIdent>

        <flightDate>

            <departureDate>${depDate}</departureDate>

        </flightDate>

        <boardPointDetails>

            <trueLocationId>${dep}</trueLocationId>

        </boardPointDetails>

        <offpointDetails>

            <trueLocationId>${arr}</trueLocationId>

        </offpointDetails>

        <companyDetails>

            <marketingCompany>${airline}</marketingCompany>

        </companyDetails>

        <flightIdentification>

            <flightNumber>${flight_number}</flightNumber>

        </flightIdentification>

    </travelProductIdent>

    <seatRequestParameters>

        <genericDetails>

             <cabinClassDesignator>W</cabinClassDesignator>

         </genericDetails>

         <processingIndicator>FT</processingIndicator>

     </seatRequestParameters>

     ${travler}


</Air_RetrieveSeatMap>`,
      //       data: `<Air_RetrieveSeatMap>

      //     <travelProductIdent>

      //         <flightDate>

      //             <departureDate>${depDate}</departureDate>

      //         </flightDate>

      //         <boardPointDetails>

      //             <trueLocationId>${dep}</trueLocationId>

      //         </boardPointDetails>

      //         <offpointDetails>

      //             <trueLocationId>${arr}</trueLocationId>

      //         </offpointDetails>

      //         <companyDetails>

      //             <marketingCompany>${airline}</marketingCompany>

      //         </companyDetails>

      //         <flightIdentification>

      //             <flightNumber>${flight_number}</flightNumber>

      //         </flightIdentification>

      //     </travelProductIdent>

      //     <seatRequestParameters>

      //         <genericDetails>

      //              <cabinClassDesignator>W</cabinClassDesignator>

      //          </genericDetails>

      //          <processingIndicator>FT</processingIndicator>

      //      </seatRequestParameters>

      // <traveler>

      //         ${travler}

      //         <fareQualifierDetails>

      //           <additionalFareDetails>

      //             <rateClass>${fareBasisCode}/${fareBasisCode?.slice(-2)}</rateClass>

      //           </additionalFareDetails>

      //         </fareQualifierDetails>

      //       </traveler>

      // </Air_RetrieveSeatMap>`,
      headers: {
        "Content-Type": "text/xml",
        //  token: token,
      },
    });

    convertXmlToJson(res?.data?.data)

  };

  useEffect(() => {

    if (isDropdown) {

      handleData()
    }
  }, [isDropdown])
  console.log(isDropdown, "isdropdownnnnnnn")



  return (
    <>

      {
        isDropdown ?
          // <div className='d-flex justify-content-center align-items-center'>

          // <div class="loader-Seat-Map"></div>
          // </div>
          <FlightLayout data={seatMap} />
          :
          <></>




      }
    </>
  )
}

export default AirSeatMap
