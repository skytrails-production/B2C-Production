import React, { useEffect } from "react";
import logo from "../../../images/red-logo.png";
import { useDispatch, useSelector } from "react-redux";
import userApi from "../../../Redux/API/api";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";

const BookedTicketMulticityDB = () => {


    const reducerState = useSelector((state) => state);
    const navigate = useNavigate();
    const bookingDataLcc = reducerState?.flightBook?.flightBookData?.Response;
    const bookingDataNonLcc =
        reducerState?.flightBook?.flightTicketDataGDS?.data?.data?.Response
            ?.Response || reducerState?.flightBook?.flightBookDataGDS?.Response;

    // console.log(reducerState, "reducerState")
    // console.log(bookingDataNonLcc, "booking data nonLcc")
    const PassengersSaved = reducerState?.passengers?.passengersData;
    const markUpamount =
        reducerState?.markup?.markUpData?.data?.result[0]?.flightMarkup;

    const couponvalue = sessionStorage.getItem("couponCode");



    const addBookingDetailsGoing = () => {
        if (bookingDataLcc) {
            const payloadLCC = {
                userId: reducerState?.logIn?.loginData?.data?.data?.id,
                bookingId: `${bookingDataLcc?.BookingId}`,
                oneWay: false,
                ticketType: "Original Ticket",
                pnr: bookingDataLcc?.PNR,
                origin: bookingDataLcc?.FlightItinerary?.Origin,
                destination: bookingDataLcc?.FlightItinerary?.Destination,
                paymentStatus: "success",
                totalAmount: couponvalue
                    ? (Number(bookingDataLcc?.FlightItinerary?.Fare?.OfferedFare) + (Number(bookingDataLcc?.FlightItinerary?.Fare?.PublishedFare) * Number(markUpamount))).toFixed(0)
                    : (Number(bookingDataLcc?.FlightItinerary?.Fare?.PublishedFare) +
                        (Number(markUpamount) * Number(bookingDataLcc?.FlightItinerary?.Fare?.PublishedFare))).toFixed(0)
                ,
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
                oneWay: false,
                ticketType: "Original Ticket",
                pnr: bookingDataNonLcc?.PNR,
                origin: bookingDataNonLcc?.FlightItinerary?.Origin,
                destination: bookingDataNonLcc?.FlightItinerary?.Destination,
                paymentStatus: "success",
                totalAmount: couponvalue
                    // ? bookingDataNonLcc?.FlightItinerary?.Fare?.OfferedFare
                    // : parseInt(bookingDataNonLcc?.FlightItinerary?.Fare?.PublishedFare) +
                    // markUpamount,

                    ? (Number(bookingDataNonLcc?.FlightItinerary?.Fare?.OfferedFare) + (Number(bookingDataNonLcc?.FlightItinerary?.Fare?.PublishedFare) * Number(markUpamount))).toFixed(0)
                    : (Number(bookingDataNonLcc?.FlightItinerary?.Fare?.PublishedFare) +
                        (Number(markUpamount) * Number(bookingDataNonLcc?.FlightItinerary?.Fare?.PublishedFare))).toFixed(0)
                ,

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


    const debouncedAddBookingDetails = debounce(addBookingDetailsGoing, 500);




    useEffect(() => {
        debouncedAddBookingDetails();
    }, []);


    return (
        <div>
            {/* <div className="mainimgFlightSearch"> */}
            {/* </div> */}

            <div className="tempBox" style={{ marginTop: "150px", marginBottom: "150px" }}
            >
                <div className="container">
                    <h2>Thank You for Booking With Us</h2>
                    <p>Please Check your Email for Booking Details</p>
                    <button
                        onClick={() => {
                            navigate("/");
                        }}
                    >
                        Ok
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookedTicketMulticityDB;