import dayjs from 'dayjs';
import durationPlugin from "dayjs/plugin/duration";
import { formatDateTVO, convertDateFormatAMD, convertDDateKafila } from "./flightTimeConvert"

import duration from "dayjs/plugin/duration"; // For duration calculation
import customParseFormat from "dayjs/plugin/customParseFormat"; // To parse custom time formats

dayjs.extend(duration);
dayjs.extend(customParseFormat);
// Centralized function with error handling

export const standardizeFlightResponse = (response) => {
    //   switch(apiName) {
    //     case 'Amadeus':
    //       return mapAmadeusResponse(response);
    //     case 'TBO':
    //       return mapTBOResponse(response);
    //     case 'Kafila':
    //       return mapKafilaResponse(response);
    //     default:
    //       console.error('Unknown API name:', apiName);
    //       return null;
    //   }

    const mapAmadeusResponse = (flight) => {
        // console.log(flight);
        function convertTimeToHoursAndMinutesFlight(time) {
            if (time) {
                const hours = parseInt(time.slice(0, 2));
                const minutes = parseInt(time.slice(2, 4));
                return `${hours}h ${minutes}m`;
            }
        }
        let layover = convertTimeToHoursAndMinutesFlight(
            flight?.propFlightGrDetail?.flightProposal?.[1]?.ref
        );
        let price = Number(
            Number(flight?.monetaryDetail?.[0]?.amount) -
            Number(flight?.monetaryDetail?.[1]?.amount)
        ).toFixed(0);
        //     function convertTo24HourFormat(timeStr) {
        function convertTo24HourFormat(timeStr) {
            // Parse the time string as HHmm
            const parsedTime = dayjs(timeStr, "HHmm");

            // Convert to 24-hour format
            return parsedTime.format("HH:mm");
        }
        let departureTime = convertTo24HourFormat(
            flight?.flightDetails?.flightInformation?.productDateTime
                .timeOfDeparture ||
            flight?.flightDetails[0]?.flightInformation?.productDateTime
                .timeOfDeparture
        );
        let arrivalTime = convertTo24HourFormat(
            flight?.flightDetails?.flightInformation?.productDateTime.timeOfArrival ||
            flight?.flightDetails[flight?.flightDetails.length - 1]
                ?.flightInformation?.productDateTime.timeOfArrival
        );
        try {
            return {
                flightName:
                    flight?.flightDetails?.flightInformation?.companyId
                        ?.marketingCarrier ||
                    flight?.flightDetails?.[0]?.flightInformation?.companyId
                        ?.marketingCarrier ||
                    "N/A",
                flightNumber:
                    flight?.flightDetails?.flightInformation?.flightOrtrainNumber ||
                    flight?.flightDetails?.[0]?.flightInformation?.flightOrtrainNumber,
                origin:
                    flight?.flightDetails?.flightInformation?.location?.[0]?.locationId ||
                    flight?.flightDetails?.[0]?.flightInformation?.location?.[0]
                        ?.locationId,
                destination: flight?.flightDetails?.flightInformation
                    ? flight?.flightDetails?.flightInformation?.location?.[1]?.locationId
                    : flight?.flightDetails?.[flight?.flightDetails?.length - 1]
                        ?.flightInformation?.location?.[1]?.locationId,
                departureTime: departureTime || "N/A",
                arrivalTime: arrivalTime || "N/A",
                price: price || 0,
                stopes: flight?.flightDetails?.flightInformation
                    ? 0
                    : flight?.flightDetails?.length - 1,
                terminal1:
                    flight?.flightDetails?.[0]?.flightInformation?.location?.[0]
                        ?.terminal ||
                    flight?.flightDetails?.flightInformation?.location?.[0]?.terminal,
                terminal2:
                    flight?.flightDetails?.flightInformation?.location?.[1]?.terminal ||
                    flight?.flightDetails?.[flight?.flightDetails?.length - 1]
                        ?.flightInformation?.location?.[1]?.terminal,
                layover: layover,
                type: "AMD",
                flight: flight,

                // Add error handling for each field as needed
            };
        } catch (error) {
            console.log("Error mapping Amadeus response:", error);
            return { filght: flight, }; // Return null or an error-specific object
        }
    };


    const mapTBOResponse = (flight) => {
        // console.log(flight);
        const convertTvoTime = (timestamp) => {
            const time24HourFormat = dayjs(timestamp).format("HH:mm");
            return time24HourFormat;
        };
        let originTime = convertTvoTime(
            flight?.Segments?.[0]?.[0]?.Origin?.DepTime
        );
        let destinationTime = convertTvoTime(
            flight?.Segments?.[0]?.[flight?.Segments?.[0]?.length - 1]?.Destination
                ?.ArrTime
        );
        const nextFlight = flight?.Segments?.[0];
        let layoverHours = 0;
        let layoverMinutes = 0;
        let layoverDuration = 0;
        let price = flight?.Fare?.BaseFare || 0;

        if (nextFlight) {
            const arrivalTime = dayjs(flight?.Segments?.[0]?.[0]?.Origin?.DepTime);
            const departureTime = dayjs(
                flight?.Segments?.[0]?.[flight?.Segments?.[0]?.length - 1]?.Destination
                    ?.ArrTime
            );
            layoverDuration = departureTime.diff(arrivalTime, "minutes"); // Calculate difference in minutes
            layoverHours = Math.floor(layoverDuration / 60); // Extract hours
            layoverMinutes = layoverDuration % 60;
        }
        try {
            return {
                flightName: flight?.Segments?.[0]?.[0]?.Airline?.AirlineCode || "N/A",
                flightNumber: flight?.Segments?.[0]?.[0]?.Airline?.FlightNumber,
                origin: flight?.Segments?.[0]?.[0]?.Origin?.Airport?.AirportCode,
                destination:
                    flight?.Segments?.[0]?.[flight?.Segments?.[0]?.length - 1]
                        ?.Destination?.Airport?.AirportCode,
                departureTime: originTime || "N/A",
                arrivalTime: destinationTime || "N/A",
                price: price || 0,
                stopes: flight?.Segments?.[0]?.length,
                terminal1: flight?.Segments?.[0]?.[0]?.Origin?.Airport?.Terminal,
                terminal2:
                    flight?.Segments?.[0]?.[flight?.Segments?.[0]?.length - 1]
                        ?.Destination?.Airport?.Terminal,
                layover: `${layoverHours}h ${layoverMinutes}m`,
                type: "TBO",
                flight: flight,

                // Add error handling for each field as needed
            };
        } catch (error) {
            console.error("Error mapping TBO response:", error);
            return null;
        }
    };

    const mapKafilaResponse = (flight) => {
        const FCode = flight?.FCode;
        const flightcode = FCode.split(",")[0];
        const flightnumber = (flight?.FNo).split(",")[0];

        const dateTime = new Date(flight?.DDate);
        const hours = dateTime.getHours().toString().padStart(2, "0");
        const minutes = dateTime.getMinutes().toString().padStart(2, "0");
        const departuretime = `${hours}:${minutes}`;

        const dateTimearrival = new Date(flight?.ADate);
        const hoursarrival = dateTimearrival.getHours().toString().padStart(2, "0");
        const minutesarrival = dateTimearrival
            .getMinutes()
            .toString()
            .padStart(2, "0");
        const departuretimearrival = `${hoursarrival}:${minutesarrival}`;
        // console.log(departuretime);

        const duration = flight?.Dur;
        const parts = duration.split(":");
        const durationhours = parts[1].replace("h", "");
        const durationminutes = parts[2].replace("m", "");
        const totalduration = `${durationhours}h ${durationminutes}m`;
        const price = flight?.Fare?.BasicTotal;
        try {
            return {
                flightName: flightcode || "N/A",
                flightNumber: flightnumber,
                origin: flight?.Itinerary?.[0]?.SrcName,
                destination:
                    flight?.Itinerary?.[flight?.Itinerary?.length - 1]?.DesName,
                departureTime: departuretime || "N/A",
                arrivalTime: departuretimearrival || "N/A",
                price: price || 0,
                stopes: flight?.Itinerary?.length - 1,
                terminal1: flight?.Itinerary?.[0]?.DTrmnll,
                terminal2: flight?.Itinerary?.[flight?.Itinerary?.length - 1]?.ATrmnl,
                layover: totalduration,
                type: "KAFILA",
                flight: flight,

                // Add error handling for each field as needed
            };
        } catch (error) {
            console.error("Error mapping Kafila response:", error);
            return null;
        }
    };
    if (response.propFlightGrDetail) {
        return mapAmadeusResponse(response);
    } else if (response.ResultIndex) {
        return mapTBOResponse(response);
    } else if (response?.FName) {
        return mapKafilaResponse(response);
    }
};
function calculateDuration(productDateTime) {
    // Parse departure and arrival
    const departure = dayjs(`${productDateTime.dateOfDeparture} ${productDateTime.timeOfDeparture}`, "YYMMDD HHmm");
    const arrival = dayjs(`${productDateTime.dateOfArrival} ${productDateTime.timeOfArrival}`, "YYMMDD HHmm");

    // Calculate the difference in milliseconds
    const diff = arrival.diff(departure);

    // Format the duration
    const duration = dayjs.duration(diff);
    return `${Math.floor(duration.asHours())}h ${duration.minutes()}m`; // Total hours including days
}
const calculateDurationTVO = (arrivalTime, departureTime) => {
    // Parse the timestamps with dayjs
    const arrival = dayjs(arrivalTime);
    const departure = dayjs(departureTime);

    // Calculate the difference in milliseconds
    const diffInMilliseconds = departure.diff(arrival);

    // Convert the difference into a human-readable duration (hours and minutes)
    const durationFormatted = dayjs.duration(diffInMilliseconds).format("H[h] m[m]");

    return durationFormatted;
};
export const FlightDetailsAmadeusResponse = (flight) => {
    // console.log(flight, "flight");

    function convertTimeToHoursAndMinutesFlight(time) {
        //     if (time) {
        //         const hours = parseInt(time.slice(0, 2));
        //         const minutes = parseInt(time.slice(2, 4));
        //         return `${hours}h ${minutes}m`;
        //     }
    }
    // let layover = convertTimeToHoursAndMinutesFlight(
    //     flight?.propFlightGrDetail?.flightProposal?.[1]?.ref
    // );

    function convertTo24HourFormat(timeStr) {
        // Parse the time string as HHmm
        const parsedTime = dayjs(timeStr, "HHmm");
        // console.log(timeStr, parsedTime.format("HH:mm"), "timeStr");

        // Convert to 24-hour format
        return parsedTime.format("HH:mm");
    }
    let departureTime = convertTo24HourFormat(
        flight?.productDateTime.timeOfDeparture ||
        flight?.productDateTime.timeOfDeparture
    );

    let arrivalTime = convertTo24HourFormat(
        flight?.productDateTime.timeOfArrival ||
        flight?.flightDetails[flight?.flightDetails.length - 1]
            ?.flightInformation?.productDateTime.timeOfArrival
    );
    let duration = calculateDuration(flight?.productDateTime)
    let dateOfDeparture
        = convertDateFormatAMD(
            flight?.productDateTime?.dateOfDeparture
        )
    let dateOfArrival = convertDateFormatAMD(
        flight?.productDateTime?.
            dateOfArrival

    )



    try {
        return {
            flightName: flight?.companyId?.marketingCarrier || "N/A",
            flightNumber: flight?.flightOrtrainNumber,
            origin: flight?.location?.[0]?.locationId,

            destination: flight?.location?.[1]?.locationId,
            departureTime: departureTime || "N/A",
            arrivalTime: arrivalTime || "N/A",
            duration: duration,
            dateOfDeparture: dateOfDeparture,

            dateOfArrival:
                dateOfArrival
            ,



            // price: price || 0,

            terminal:
                flight?.location?.[0]?.terminal || flight?.location?.[1]?.terminal,

            // layover: layover,
            type: "AMD",
            // filght: flight,

            // Add error handling for each field as needed
        };
    } catch (error) {
        console.log("Error mapping Amadeus response:", error);
        return "gfbgf"; // Return null or an error-specific object
    }
};
export const FlightDetailsTBOResponse = (flight) => {
    // console.log(flight);
    const convertTvoTime = (timestamp) => {
        const time24HourFormat = dayjs(timestamp).format("HH:mm");
        return time24HourFormat;
    };
    let originTime = convertTvoTime(flight?.Origin?.DepTime);
    let destinationTime = convertTvoTime(flight?.Destination?.ArrTime);
    // let duration = calculateDurationTVO(originTime, destinationTime)
    // const calculateDurationTVO = (arrivalTime, departureTime) => {
    //     // Parse the timestamps with dayjs
    //     const arrival = dayjs(arrivalTime, "HH:mm");
    //     const departure = dayjs(departureTime, "HH:mm");

    //     // Calculate the difference in milliseconds
    //     let diffInMilliseconds = departure.diff(arrival);

    //     // If the time difference is negative (overnight case), add 24 hours to departure
    //     if (diffInMilliseconds < 0) {
    //         const nextDayDeparture = departure.add(1, "day");
    //         diffInMilliseconds = nextDayDeparture.diff(arrival);
    //     }

    //     // Convert the difference into a duration object
    //     const durationObject = dayjs.duration(diffInMilliseconds);

    //     // Format the duration into hours and minutes
    //     const hours = durationObject.hours();
    //     const minutes = durationObject.minutes();
    //     const durationFormatted = `${hours}h ${minutes}m`;

    //     return durationFormatted;
    // };
    const calculateDurationTVO = (arrivalTime, departureTime) => {
        // Parse the timestamps with dayjs
        const arrival = dayjs(arrivalTime, "HH:mm");
        const departure = dayjs(departureTime, "HH:mm");

        // Calculate the difference in milliseconds
        let diffInMilliseconds = departure.diff(arrival);

        // If the time difference is negative (overnight case), add 24 hours to departure
        if (diffInMilliseconds < 0) {
            const nextDayDeparture = departure.add(1, "day");
            diffInMilliseconds = nextDayDeparture.diff(arrival);
        }

        // Convert the difference into a duration object
        const durationObject = dayjs.duration(diffInMilliseconds);

        // Format the duration into hours and minutes
        const hours = durationObject.hours();
        const minutes = durationObject.minutes();
        const durationFormatted = `${hours}h ${minutes}m`;

        return durationFormatted;
    };
    let duration = calculateDurationTVO(originTime, destinationTime)
    // console.log(duration, flight?.StopPointArrivalTime, flight?.StopPointDepartureTime, "flight?.StopPointDepartureTime", flight)
    const dateOfDeparture
        = formatDateTVO(flight?.Origin?.DepTime
        )
    const
        dateOfArrival

            = formatDateTVO(flight?.Destination?.DepTime
            )
    // console.log()


    try {
        return {
            flightName: flight?.Airline?.AirlineCode || "N/A",
            flightNumber: flight?.Airline?.FlightNumber,
            origin: flight?.Origin?.Airport?.AirportCode,
            destination: flight?.Destination?.Airport?.AirportCode,
            departureTime: originTime || "N/A",
            arrivalTime: destinationTime || "N/A",
            // price: price || 0,
            // stopes: flight?.Segments?.[0]?.length,
            duration: duration,
            terminal: flight?.Destination?.Airport?.Terminal,
            dateOfDeparture: dateOfDeparture,

            dateOfArrival:
                dateOfArrival,




            // layover: `${layoverHours}h ${layoverMinutes}m`,
            // type: "TBO",
            // filght: flight,
            // Add error handling for each field as needed
        };
    } catch (error) {
        console.error("Error mapping TBO response:", error);
        return null;
    }
};
export const FlightDetailsKafilaResponse = (flight) => {
    const FCode = flight?.FCode;
    // const flightcode = FCode.split(",")[0];
    const flightnumber = flight?.FNo;

    const dateTime = new Date(flight?.DDate);
    const hours = dateTime.getHours().toString().padStart(2, "0");
    const minutes = dateTime.getMinutes().toString().padStart(2, "0");
    const departuretime = `${hours}:${minutes}`;

    const dateTimearrival = new Date(flight?.ADate);
    const hoursarrival = dateTimearrival.getHours().toString().padStart(2, "0");
    const minutesarrival = dateTimearrival
        .getMinutes()
        .toString()
        .padStart(2, "0");
    const departuretimearrival = `${hoursarrival}:${minutesarrival}`;
    // console.log(departuretime);

    const duration = flight?.Dur;
    const dateOfDeparture
        = convertDDateKafila(flight?.
            DDate
        )
    const
        dateOfArrival
            = convertDDateKafila(flight?.ADate

            )
    // const parts = duration.split(":");
    // const durationhours = parts[1].replace("h", "");
    // const durationminutes = parts[2].replace("m", "");
    // const totalduration = `${durationhours}h ${durationminutes}m`;
    // const price = flight?.Fare?.BasicTotal;
    try {
        return {
            flightName: FCode || "N/A",
            flightNumber: flightnumber,
            origin: flight?.Src,
            destination: flight?.Des,
            departureTime: departuretime || "N/A",
            arrivalTime: departuretimearrival || "N/A",
            duration: duration,
            dateOfDeparture: dateOfDeparture,

            dateOfArrival:
                dateOfArrival,




            //         price: price || 0,
            //         stopes: flight?.Itinerary?.length - 1,
            terminal1: flight?.DTrmnl,
            //         terminal2: flight?.Itinerary?.[flight?.Itinerary?.length - 1]?.ATrmnl,
            //         layover: totalduration,
            type: "KAFILA",
            //         filght: flight,

            //         // Add error handling for each field as needed
        };
    } catch (error) {
        console.error("Error mapping Kafila response:", error);
        return null;
    }
};

export const standardizeFlightDetailResponse = (flight) => {
    const type = flight?.type;
    const Flight = flight?.flight;
    // console.log(flight, "stanfflightdetail")
    switch (type) {

        case "AMD":
            const newData = Flight?.flightDetails;
            const Data = newData?.flightInformation
                ? [FlightDetailsAmadeusResponse(newData?.flightInformation)]
                : newData?.map((item) => {
                    const newRes = item?.flightInformation;
                    return FlightDetailsAmadeusResponse(newRes);
                });
            // console.log(type, Data, "innerfunctiontype")
            return Data
            break;
        case "TBO":
            const newtbodata = Flight?.Segments[0];
            const TvoData = newtbodata.map((item) => {
                return FlightDetailsTBOResponse(item);
            });

            return TvoData
            break;
        case "KAFILA":
            const newKafilaData = Flight?.Itinerary;
            const kafilaData = newKafilaData?.map((item) => {
                return FlightDetailsKafilaResponse(item);
            });
            // console.log(type, kafilaData, "innerfunctiontype")
            return kafilaData
            break;
    }

}

const transformFareDataKafila = (Fare) => {
    // Initialize the result object
    const result = {
        Adt: { Basic: 0, Taxes: 0, Total: 0 },
        Chd: { Basic: 0, Taxes: 0, Total: 0 },
        Inf: { Basic: 0, Taxes: 0, Total: 0 },
    };

    // Iterate over each item in the data array
    const addFareDetailsKafila = (type, Fare) => {
        if (Fare) {
            result[type].Basic += Fare.Adt.Basic || 0;
            result[type].Taxes += Fare.Adt.Taxes || 0;
            result[type].Total += Fare.Adt.Total || 0;
        }
    }


    // Add values for Adt (Adult)
    if (Fare.Adt) {
        addFareDetailsKafila("Adt", Fare)

    }

    // Add values for Chd (Child)
    if (Fare.Chd) {
        addFareDetailsKafila("Chd", Fare)

    }

    // Add values for Inf (Infant)
    if (Fare.Inf) {
        addFareDetailsKafila("Inf", Fare)

    }



    return result;
};
const transformFareDataTVO = (fare) => {
    // Initialize the result object
    const result = {
        Adt: { Basic: 0, Taxes: 0, Total: 0 },
        Chd: { Basic: 0, Taxes: 0, Total: 0 },
        Inf: { Basic: 0, Taxes: 0, Total: 0 },
    };
    const addFareDetail = (type, Fare) => {
        if (Fare) {

            result[type].Basic += Fare.BaseFare || 0;
            result[type].Taxes += Fare.Tax || 0;
            result[type].Total += Fare.BaseFare + Fare.Tax || 0;
        }
    }
    const newFare = fare.map((Fare) => {
        // Add values for Adt (Adult)



        if (Fare?.PassengerType == 1) {
            addFareDetail("Adt", Fare)

        }
        // Add values for Chd (Child)



        if (Fare?.PassengerType == 2) {
            addFareDetail("Chd", Fare)
            // result.Chd.Basic += Fare.BaseFare || 0;
            // result.Chd.Taxes += Fare.Tax || 0;
            // result.Chd.Total += Fare.BaseFare + Fare.Tax || 0;
        }
        // Add values for Inf (Infant)
        if (Fare.PassengerType == 3) {
            addFareDetail("Inf", Fare)

        }

    })

    // Iterate over each item in the data array







    return result;
};


const transformFareDataAmadeusNew = (Fare, adult = 1, childCount = 0, infantCount = 0) => {
    const result = {
        Adt: { Basic: 0, Taxes: 0, Total: 0 },
        Chd: { Basic: 0, Taxes: 0, Total: 0 },
        Inf: { Basic: 0, Taxes: 0, Total: 0 },
    };

    const addFareDetails = (paxFareDetail, type) => {
        if (paxFareDetail) {
            result[type].Basic += Number(paxFareDetail.totalFareAmount || 0);
            result[type].Taxes += Number(paxFareDetail.totalTaxAmount || 0);
            result[type].Total += Number((paxFareDetail.totalFareAmount || 0)) + Number((paxFareDetail.totalTaxAmount || 0));
        }
    };

    // Handle adult fare
    if (Fare?.paxFareDetail) {
        addFareDetails(Fare.paxFareDetail, 'Adt');
    } else {
        addFareDetails(Fare[0]?.paxFareDetail, 'Adt');

        // Handle child fare if present
        if (childCount > 0 && Fare[1]?.paxFareDetail) {
            addFareDetails(Fare[1]?.paxFareDetail, 'Chd');
        }

        // Handle infant fare if present
        if (infantCount > 0) {
            const infantIndex = childCount > 0 ? 2 : 1;
            addFareDetails(Fare[infantIndex]?.paxFareDetail, 'Inf');
        }
    }

    return result;
};
export const standardizeFlightFareResponse = (flight, adult, child, infant) => {
    const type = flight?.type;
    const Flight = flight?.flight;
    // console.log(flight, type, "stanfflightdetail")
    switch (type) {

        case "AMD":
            const Data = transformFareDataAmadeusNew(Flight, adult, child, infant);

            // console.log(type, Data,
            //     //  Data,
            //     "innerfunctiontype")
            return Data
            break;
        case "TBO":
            const fare = Flight?.
                FareBreakdown
            const
                FareBreakdown = transformFareDataTVO(fare)

                ;
            // const TvoData = newtbodata.map((item) => {
            //     return FlightDetailsTBOResponse(item);
            // });
            // console.log(
            //     type,
            //     FareBreakdown
            //     ,
            //     "innerfunctiontype")
            return FareBreakdown
            break;
        case "KAFILA":
            const Fare = Flight?.Fare
            const kafilafare = transformFareDataKafila(Fare)
                ;
            // const kafilaData = newKafilaData?.map((item) => {
            //     return FlightDetailsKafilaResponse(item);
            // });
            // console.log(
            //     type,
            //     kafilafare,
            //     "innerfunctiontype"
            // )
            return kafilafare
            break;
    }

}
const transformBaggageDataAMD = (Baggage, Airline) => {
    const baggage = ((Baggage.freeAllowance < 4 ? `${Baggage?.freeAllowance * 23} KG` : `${Baggage?.freeAllowance} KG`))
    return [{ Baggage: baggage, CabinBaggage: "7 KG", Airline: Airline }]
}
const transformBaggageTVO = (Baggage) => {
    const baggage = Baggage[0].map((bag) => {
        return { Baggage: bag?.Baggage, CabinBaggage: bag?.CabinBaggage, Airline: bag?.Airline?.AirlineCode }

    })
    // console.log(baggage
    // )
    return (baggage)
}
const transformBaggageKafila = (Baggage, Airline) => {
    const baggage =
    {
        Baggage: Baggage?.
            CHKNBG
        , CabinBaggage: Baggage?.
            CBNBG, Airline: Airline
    }


    // console.log(baggage
    // )
    return (baggage)
}
export const standardizeFlightBaggageResponse = (flight) => {
    const type = flight?.type;
    const Flight = flight?.flight;
    const Airline = flight?.flightName

    // console.log(flight, type, "stanfflightdetail")
    switch (type) {

        case "AMD":
            const baggage = Flight?.baggage?.freeBagAllownceInfo?.
                baggageDetails

            const Data = transformBaggageDataAMD(baggage, Airline);

            // console.log(type,
            //     Data,
            //     //  Data,
            //     "innerfunctiontype")
            return Data
            break;
        case "TBO":
            const baggageTBO = Flight?.Segments

            const
                newBaggageTBO = transformBaggageTVO(baggageTBO)



            // console.log(
            //     type,
            //     newBaggageTBO,
            //     // ,
            //     "innerfunctiontype")
            return newBaggageTBO
            break;
        case "KAFILA":
            const baggageKafila = Flight?.FareRule
            const newBageKafila = transformBaggageKafila(baggageKafila, Airline)
                ;
            // const kafilaData = newKafilaData?.map((item) => {
            //     return FlightDetailsKafilaResponse(item);
            // });
            // console.log(
            //     type,
            //     newBageKafila,
            //     "innerfunctiontype"
            // )
            return [newBageKafila]
            break;
    }

}


