import React, { useRef, useState, useEffect } from "react";
// import QRCode from "qrcode.react";

import { useSelector } from "react-redux";
import {
  findAirlineByCode,
  ticketDetails,
  flightBookErrorCheck,
  saveDB,
} from "../../../utility/flightUtility/BookwarperUtility";
import { useReactToPrint } from "react-to-print";
import { ChevronLeft, Printer } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FaPlaneDeparture } from "react-icons/fa";
const NewBookTicket = () => {
  const reducerState = useSelector((state) => state);
  console.log(reducerState, "reducerState");
  const [loader, setLoader] = useState(true);
  const book1 = flightBookErrorCheck("onward");
  const book2 = flightBookErrorCheck("return");
  console.log(book1, book2, "bookResult");
  const ticketData = {
    pnr: "ABC123",
    flightNo: "6E-123",
    airline: "Indigo",
    departure: "Delhi (DEL) - 10:30 AM",
    arrival: "Mumbai (BOM) - 1:00 PM",
    duration: "2h 30m",
    boardingTime: "10:00 AM",
    gate: "A12",
    passengers: [
      {
        name: "Mohit Joshi",
        seat: "12A",
        class: "Economy",
      },
      {
        name: "John Doe",
        seat: "12B",
        class: "Economy",
      },
      {
        name: "Jane Smith",
        seat: "12C",
        class: "Economy",
      },
    ],
  };

  const navigate = useNavigate();
  const TicketCard = ({ type }) => {
    const ticket =
      // async () => {
      // return
      ticketDetails(type);
    // };
    console.log(ticket, "ticketOnway");
    let flightInfo = ticket?.flight;
    let {
      arrivalTime,
      departureTime,
      destination,
      flightName,
      flightNumber,
      layover,
      origin,
      terminal1,
    } = flightInfo;
    let flightNameCode = flightName + "-" + flightNumber;

    return (
      <>
        {/* Main Content */}
        <div className="flex flex-wrap">
          {/* Flight Details */}
          <div className="w-full sm:w-3/4 p-6">
            <h2 className="text-2xl capitalize font-semibold text-indigo-800 mb-2 md:mb-4">
              Flight Ticket {type}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4">
              <div>
                <p className="text-gray-700">
                  <strong>PNR:</strong> {ticket?.PNR || undefined}
                </p>
                <p className="text-gray-700">
                  <strong>Flight No:</strong>{" "}
                  {flightNameCode || ticketData.flightNo}
                </p>
                <p className="text-gray-700">
                  <strong>Airline:</strong>{" "}
                  {findAirlineByCode(flightName)?.airlineName}
                </p>
                <p className={ticket?.PNR ? "text-green-500" : "text-red-500"}>
                  <strong className="text-gray-700">Status:</strong>{" "}
                  {ticket?.PNR ? "Confirmed" : "Failed"}
                </p>
              </div>
              <div>
                <p className="text-gray-700">
                  <strong>Departure:</strong>{" "}
                  {`${origin} (${origin}) - ${departureTime} ` || ""}
                </p>
                <p className="text-gray-700">
                  <strong>Arrival:</strong>{" "}
                  {`${destination} (${destination}) - ${arrivalTime} ` || ""}
                </p>
                <p className="text-gray-700">
                  <strong>Duration:</strong> {layover || ""}
                </p>
                <p className="text-gray-700">
                  <strong>Date:</strong> {"2,jul,2025"}
                </p>
              </div>
            </div>

            {/* Passenger List */}
            <div className="mt-2 md:mt-6">
              {ticket?.passengers.map((passenger, index) => (
                <div
                  key={index}
                  className="border-b border-gray-200 py-2 md:py-4"
                >
                  <p className="text-gray-700">
                    <strong>Passenger Name:</strong>{" "}
                    {passenger?.firstName + " " + passenger?.lastName}
                  </p>
                  {/* <p className="text-gray-700">
                    <strong>Seat:</strong> {passenger.seat}
                  </p> */}
                  <p className="text-gray-700">
                    <strong>Class:</strong> {passenger?.class}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Boarding Pass and QR Code */}
          <div className="w-full sm:w-1/4 bg-indigo-50 p-2 md:p-6 border-t md:border-t-0 md:border-l border-gray-200">
            <div className="text-center">
              <p className="text-indigo-800 text-lg font-semibold">
                Boarding Pass
              </p>
              <div className="mt-2 md:mt-6">
                <p className="text-sm text-indigo-600">PNR:</p>
                <p className="text-lg font-bold text-indigo-800">
                  {ticket?.PNR || undefined}
                </p>
              </div>
              <div className="mt-2 md:mt-6">
                <p className="text-sm text-indigo-600">Boarding Time:</p>
                <p className="text-lg font-bold text-indigo-800">
                  {ticket?.boardingTime || ""}
                </p>
              </div>
              <div className="mt-2 md:mt-6">
                <p className="text-sm text-indigo-600">Gate:</p>
                <p className="text-lg font-bold text-indigo-800">
                  {`Terminal ${terminal1}` || ticketData?.gate}
                </p>
              </div>
            </div>
            {/* <div className="mt-6 flex justify-center">
              <QRCodeSVG
                fgColor="#3730A3"
                bgColor="#EEF2FF"
                value={qrValue}
                size={100}
              />
            </div> */}
          </div>
        </div>

        {/* Footer Section */}
        <div className="bg-indigo-100 p-2 md:p-4 border-t border-indigo-200 flex flex-col sm:flex-row items-center sm:justify-between">
          <div className="text-gray-700 text-sm">
            <p>
              <strong>Boarding Time:</strong> {ticket?.boardingTime || ""}
            </p>
            <p>
              <strong>Gate:</strong>{" "}
              {`Terminal ${terminal1}` || ticketData.gate}
            </p>
          </div>
        </div>
      </>
    );
  };
  const [loading, setLoading] = useState(false);
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: () => setLoading(false), // Hide loader after printing
  });

  const handleDownload = () => {
    setLoading(true);
    handlePrint();
  };
  const FlightPaymentLoader = ({
    message = "We’re booking your flight...",
  }) => {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-blue-500">
        {/* Dots Animation */}
        <div className="flex space-x-4 mb-6">
          <div className="w-6 h-6 bg-white rounded-full animate-bounce delay-100"></div>
          <div className="w-6 h-6 bg-white rounded-full animate-bounce delay-200"></div>
          <div className="w-6 h-6 bg-white rounded-full animate-bounce delay-300"></div>
        </div>

        {/* Text */}
        <h1 className="text-3xl font-extrabold text-white mt-6">
          Booking Your Flight...
        </h1>
        <p className="text-gray-100 mt-2">
          Please wait while we process your booking.
        </p>
      </div>
    );
  };
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "p") {
        event.preventDefault();
        handlePrint();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handlePrint]);

  useEffect(() => {
    if (!book1.loading && !book2.loading) {
      saveDB("onward");
      saveDB("return");
    }
  }, [book1, book2]);

  return (
    <>
      {book1?.loading || book2?.loading ? (
        <FlightPaymentLoader />
      ) : (
        <div className="bg-gray-100 p-2  md:p-6 min-h-screen ">
          <div className="max-w-4xl  pt-3 mx-auto w-full flex justify-between items-center text-center rounded-b-lg">
            <p
              onClick={() => navigate("/")}
              className="flex flec-row items-center  cursor-pointer text-base font-semibold text-gray-700"
            >
              <ChevronLeft size={18} className="text-gray-700 text-base" /> Back
              to Home
            </p>
            <p
              onClick={handlePrint}
              className="flex flec-row items-center gap-2  cursor-pointer text-base font-semibold text-gray-700"
            >
              <Printer size={18} className="text-gray-700 text-base" /> Download
              PDF
            </p>
          </div>
          <div className="bg-gray-100 p-2  md:p-6 min-h-screen flex items-center justify-center">
            <div
              ref={componentRef}
              className="max-w-4xl w-full bg-white shadow-lg rounded-lg border border-gray-200"
            >
              {/* Header Section */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 rounded-t-md bg-indigo-600 text-white">
                <div className="flex items-center space-x-4">
                  <img
                    src="https://theskytrails.com/static/media/logoSky.63ff4d7e95a8ed4a90ba8f28c3b8958a.svg"
                    alt="Company Logo"
                    className="h-12 w-12 rounded-full"
                  />
                  <h1 className=" hidden md:flex text-2xl font-bold">
                    TheSkyTrails
                  </h1>
                </div>
                {/* <button
              onClick={handlePrint}
              className="px-4 py-2 bg-white text-indigo-600 font-semibold rounded-lg shadow-md hover:bg-indigo-100"
            >
              Print Ticket
            </button> */}
              </div>
              <div className="flex flex-col gap-2 bg-white">
                <TicketCard type="onward" />
                <TicketCard type="return" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewBookTicket;
