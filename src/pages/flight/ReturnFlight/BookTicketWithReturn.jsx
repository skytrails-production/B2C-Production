import React, { useEffect } from "react";
import logo from "../../../images/red-logo.png";
import { useDispatch, useSelector } from "react-redux";
import userApi from "../../../Redux/API/api";
import { useLocation, useNavigate } from "react-router-dom";
import { debounce } from "lodash";

const BookedTicketWithReturn = () => {
    const reducerState = useSelector((state) => state);
    const navigate = useNavigate();
    const bookingDataLcc = reducerState?.flightBook?.flightBookData?.Response;
    const bookingDataNonLcc =
        reducerState?.flightBook?.flightTicketDataGDS?.data?.data?.Response
            ?.Response || reducerState?.flightBook?.flightBookDataGDS?.Response;

    const bookingDataLccReturn = reducerState?.flightBook?.flightBookDataReturn?.Response;
    const bookingDataNonLccReturn =
        reducerState?.flightBook?.flightTicketDataGDSReturn?.data?.data?.Response
            ?.Response || reducerState?.flightBook?.flightBookDataGDSReturn?.Response;

    const PassengersSaved = reducerState?.passengers?.passengersData;
    const markUpamount =
        reducerState?.markup?.markUpData?.data?.result[0]?.flightMarkup;

    const couponvalue = sessionStorage.getItem("couponCode");

    const location = useLocation();
    const { finalamount } = location.state || {};




    // going flight ticket booking start


    const addBookingDetailsGoing = () => {
        if (bookingDataLcc) {
            const payloadLCC = {
                userId: reducerState?.logIn?.loginData?.data?.data?.id,
                bookingId: `${bookingDataLcc?.BookingId}`,
                oneWay: true,
                ticketType: "Original Ticket",
                pnr: bookingDataLcc?.PNR,
                origin: bookingDataLcc?.FlightItinerary?.Origin,
                destination: bookingDataLcc?.FlightItinerary?.Destination,
                paymentStatus: "success",
                totalAmount: 
                // couponvalue
                    // ? bookingDataLcc?.FlightItinerary?.Fare?.OfferedFare
                    // : Number(bookingDataLcc?.FlightItinerary?.Fare?.PublishedFare) +
                    // markUpamount +
                    // 1,
                    // ? (Number(bookingDataLcc?.FlightItinerary?.Fare?.OfferedFare) + Number(bookingDataLcc?.FlightItinerary?.Fare?.PublishedFare) * Number(markUpamount)).toFixed(0)
                    // : (Number(bookingDataLcc?.FlightItinerary?.Fare?.PublishedFare) +
                    //     Number(markUpamount) * Number(bookingDataLcc?.FlightItinerary?.Fare?.PublishedFare)).toFixed(0),
                    Number(finalamount).toFixed(2),

                airlineDetails: bookingDataLcc?.FlightItinerary?.Segments.map(
                    (item, index) => {
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
                            Baggage: item.Baggage,
                        };
                    }
                ),
                passengerDetails: bookingDataLcc?.FlightItinerary?.Passenger?.map(
                    (item, index) => {
                        return {
                            title: item?.Title,
                            firstName: item?.FirstName,
                            lastName: item?.LastName,
                            gender: item?.Gender,
                            ContactNo:
                                PassengersSaved[index]?.ContactNo == undefined
                                    ? ""
                                    : PassengersSaved[index]?.ContactNo,
                            DateOfBirth: item?.DateOfBirth,
                            email:
                                PassengersSaved[index]?.Email == undefined
                                    ? ""
                                    : PassengersSaved[index]?.Email,
                            addressLine1: item?.addressLine1,
                            city: item?.City,
                            TicketNumber: item?.Ticket?.TicketNumber,
                            amount: item?.Fare?.PublishedFare?.toFixed(),
                        };
                    }
                ),
            };
            userApi.flightBookingDataSave(payloadLCC);

        } else {

            const payloadNonLcc = {
                userId: reducerState?.logIn?.loginData?.data?.data?.id,
                bookingId: `${bookingDataNonLcc?.BookingId}`,
                oneWay: true,
                ticketType: "Original Ticket",
                pnr: bookingDataNonLcc?.PNR,
                origin: bookingDataNonLcc?.FlightItinerary?.Origin,
                destination: bookingDataNonLcc?.FlightItinerary?.Destination,
                paymentStatus: "success",
                totalAmount: Number(finalamount).toFixed(2),
                // couponvalue
                    // ? bookingDataNonLcc?.FlightItinerary?.Fare?.OfferedFare
                    // : parseInt(bookingDataNonLcc?.FlightItinerary?.Fare?.PublishedFare) +
                    // markUpamount,

                    // ? (Number(bookingDataNonLcc?.FlightItinerary?.Fare?.OfferedFare) + Number(bookingDataNonLcc?.FlightItinerary?.Fare?.PublishedFare) * Number(markUpamount)).toFixed(0)
                    // : (Number(bookingDataNonLcc?.FlightItinerary?.Fare?.PublishedFare) +
                    //     Number(markUpamount) * Number(bookingDataNonLcc?.FlightItinerary?.Fare?.PublishedFare)).toFixed(0),

                airlineDetails: bookingDataNonLcc?.FlightItinerary?.Segments.map(
                    (item, index) => {
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
                            Baggage: item.Baggage,
                        };
                    }
                ),
                passengerDetails: bookingDataNonLcc?.FlightItinerary?.Passenger?.map(
                    (item, index) => {
                        return {
                            title: item?.Title,
                            firstName: item?.FirstName,
                            lastName: item?.LastName,
                            gender: item?.Gender,
                            ContactNo:
                                PassengersSaved[index]?.ContactNo == undefined
                                    ? ""
                                    : PassengersSaved[index]?.ContactNo,
                            DateOfBirth: item?.DateOfBirth,
                            email:
                                PassengersSaved[index]?.Email == undefined
                                    ? ""
                                    : PassengersSaved[index]?.Email,
                            addressLine1: item?.addressLine1,
                            city: item?.City,
                            TicketNumber: item?.Ticket?.TicketNumber,
                            amount: item?.Fare?.PublishedFare?.toFixed(),
                        };
                    }
                ),
            };
            userApi.flightBookingDataSave(payloadNonLcc);
        }
    };

    // going flight ticket booking end



    // returning flight ticket booking start 

    const addBookingDetailsReturn = () => {
        if (bookingDataLccReturn) {
            const payloadLCC = {
                userId: reducerState?.logIn?.loginData?.data?.data?.id,
                bookingId: `${bookingDataLccReturn?.BookingId}`,
                oneWay: false,
                ticketType: "Original Ticket",
                pnr: bookingDataLccReturn?.PNR,
                origin: bookingDataLccReturn?.FlightItinerary?.Origin,
                destination: bookingDataLccReturn?.FlightItinerary?.Destination,
                paymentStatus: "success",
                totalAmount: 
                // couponvalue
                    // ? bookingDataLccReturn?.FlightItinerary?.Fare?.OfferedFare
                    // : parseInt(bookingDataLccReturn?.FlightItinerary?.Fare?.PublishedFare) +
                    // markUpamount +
                    // 1,

                    // ? (Number(bookingDataLccReturn?.FlightItinerary?.Fare?.OfferedFare) + (Number(bookingDataLccReturn?.FlightItinerary?.Fare?.PublishedFare) * Number(markUpamount))).toFixed(0)
                    // : (Number(bookingDataLccReturn?.FlightItinerary?.Fare?.PublishedFare) +
                    //     (Number(markUpamount) * Number(bookingDataLccReturn?.FlightItinerary?.Fare?.PublishedFare))).toFixed(0),
                    Number(finalamount).toFixed(2),
                airlineDetails: bookingDataLccReturn?.FlightItinerary?.Segments.map(
                    (item, index) => {
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
                            Baggage: item.Baggage,
                        };
                    }
                ),
                passengerDetails: bookingDataLccReturn?.FlightItinerary?.Passenger?.map(
                    (item, index) => {
                        return {
                            title: item?.Title,
                            firstName: item?.FirstName,
                            lastName: item?.LastName,
                            gender: item?.Gender,
                            ContactNo:
                                PassengersSaved[index]?.ContactNo == undefined
                                    ? ""
                                    : PassengersSaved[index]?.ContactNo,
                            DateOfBirth: item?.DateOfBirth,
                            email:
                                PassengersSaved[index]?.Email == undefined
                                    ? ""
                                    : PassengersSaved[index]?.Email,
                            addressLine1: item?.addressLine1,
                            city: item?.City,
                            TicketNumber: item?.Ticket?.TicketNumber,
                            amount: item?.Fare?.PublishedFare?.toFixed(),
                        };
                    }
                ),
            };
            userApi.flightBookingDataSave(payloadLCC);

        } else {

            const payloadNonLcc = {
                userId: reducerState?.logIn?.loginData?.data?.data?.id,
                bookingId: `${bookingDataNonLccReturn?.BookingId}`,
                oneWay: false,
                ticketType: "Original Ticket",
                pnr: bookingDataNonLccReturn?.PNR,
                origin: bookingDataNonLccReturn?.FlightItinerary?.Origin,
                destination: bookingDataNonLccReturn?.FlightItinerary?.Destination,
                paymentStatus: "success",
                totalAmount:
                //  couponvalue
                    // ? bookingDataNonLccReturn?.FlightItinerary?.Fare?.OfferedFare
                    // : parseInt(bookingDataNonLccReturn?.FlightItinerary?.Fare?.PublishedFare) +
                    // markUpamount,

                    // ? (Number(bookingDataNonLccReturn?.FlightItinerary?.Fare?.OfferedFare) + (Number(bookingDataNonLccReturn?.FlightItinerary?.Fare?.PublishedFare) * Number(markUpamount))).toFixed(0)
                    // : (Number(bookingDataNonLccReturn?.FlightItinerary?.Fare?.PublishedFare) +
                    //     (Number(markUpamount) * Number(bookingDataNonLccReturn?.FlightItinerary?.Fare?.PublishedFare))).toFixed(0),
                    Number(finalamount).toFixed(2),

                airlineDetails: bookingDataNonLccReturn?.FlightItinerary?.Segments.map(
                    (item, index) => {
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
                            Baggage: item.Baggage,
                        };
                    }
                ),
                passengerDetails: bookingDataNonLccReturn?.FlightItinerary?.Passenger?.map(
                    (item, index) => {
                        return {
                            title: item?.Title,
                            firstName: item?.FirstName,
                            lastName: item?.LastName,
                            gender: item?.Gender,
                            ContactNo:
                                PassengersSaved[index]?.ContactNo == undefined
                                    ? ""
                                    : PassengersSaved[index]?.ContactNo,
                            DateOfBirth: item?.DateOfBirth,
                            email:
                                PassengersSaved[index]?.Email == undefined
                                    ? ""
                                    : PassengersSaved[index]?.Email,
                            addressLine1: item?.addressLine1,
                            city: item?.City,
                            TicketNumber: item?.Ticket?.TicketNumber,
                            amount: item?.Fare?.PublishedFare?.toFixed(),
                        };
                    }
                ),
            };
            userApi.flightBookingDataSave(payloadNonLcc);
        }
    };


    // returning flight ticket booking start



    const debouncedAddBookingDetails = debounce(addBookingDetailsGoing, 500);
    const debouncedAddBookingDetailsReturn = debounce(addBookingDetailsReturn, 60000);



    useEffect(() => {
        debouncedAddBookingDetails();
        debouncedAddBookingDetailsReturn()
    }, []);


    return (
        <div>
            {/* <div className="mainimgFlightSearch"> */}
            {/* </div> */}

            <div className="tempBox " 
            >
                <div className="container">
                <div class="success-animation">
<svg class="checkmarks" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle class="checkmarks__circle" cx="26" cy="26" r="25" fill="none" /><path class="checkmarks__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" /></svg>
</div>
                    <h2>Your payment was successful</h2>
                    <p>Thank You for Booking With Us</p>
                    <div className="flex items-center justify-center gap-3 ">
                    <button
                        onClick={() => {
                            navigate("/");
                        }}
                    >
                        Go to Home
                    </button>
                    <button
                        onClick={() => {
                            navigate("/bookinghistory");
                        }}
                    >
                        Check Booking
                    </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookedTicketWithReturn;