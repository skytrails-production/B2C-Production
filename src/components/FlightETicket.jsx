import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiURL } from "../Constants/constant";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import "./FlightETicket.css";
import { useNavigate } from "react-router-dom";
// import html2pdf from "html2pdf.js";
// import Swal from "sweetalert2";
// import {swalModal} from "../utility/swal"
import InsideNavbar from "../UI/BigNavbar/InsideNavbar";
import { BiSupport } from "react-icons/bi";
const pdfLogo = "https://travvolt.s3.amazonaws.com/ST-Main-LogoPdf.png";
const Spinner = () => {
    return <div className="spinner">
        <InsideNavbar />
    </div>;
};



const FlightETicket = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);


    //   const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${apiURL.baseURL}/skyTrails/flight/bookings/${id}`

                );
                if (response?.data) {
                    setData(response?.data);
                    console.log("Data fetched:", response.data);
                } else {
                    console.error("No data received.");
                }
            } catch (error) {
                console.error("Error fetching flight booking:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    // Display loading spinner or message while fetching data
    if (loading) {
        return <Spinner />;
    }

    // Check if data exists and has elements before accessing its properties
    if (!data || data?.result?.length === 0) {
        console.log(data, !Array.isArray(data?.result), data.result)
        return <div>
            <InsideNavbar />
            No data available.</div>;
    }
    // console.log(  data?.result?.passengerDetails.map((item, index), "data");
    data?.result?.passengerDetails.map((item, index) => (
        console.log(item.firstName))
    )

    const currentDate = new Date(data?.result?.createdAt);
    const options = {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
    };
    const formattedDate = currentDate.toLocaleDateString("en-US", options);

    const formatDate = (dateString) => {
        const options = {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
            weekday: "short",
            day: "2-digit",
            month: "short",
            year: "numeric",
        };

        const date = new Date(dateString);
        return date.toLocaleString("en-US", options);
    };




    return (
        <>
            <InsideNavbar />
            {loading ? (
                <Spinner />
            ) : (
                <div style={{ marginTop: '100px', padding: '0px 15px', width: '100%' }}>
                    <div
                        style={{
                            background: "#fff",
                            overflow: "hidden",
                            padding: "10px",
                            maxWidth: "800px",
                            border: "1px solid #D6D8E7",
                            fontSize: "12px",
                            fontFamily: "Montserrat, sans-serif",
                            margin: "10px auto"
                            , overflowX: 'scroll'
                        }}
                    >

                        <div id="pdf-content">


                            <div
                                style={{
                                    justifyContent: "space-between",
                                    alignItems: "flex-start",
                                    display: "flex",
                                    marginTop: "24px",
                                    width:'780px'
                                }}
                            >
                                <img
                                    src={pdfLogo}
                                    alt="logo"
                                    style={{ width: "25%", marginTop: "-10px" }}
                                />
                                <div
                                    style={{
                                        color: "black",
                                        fontSize: "24px",
                                        fontFamily: "Montserrat",
                                        fontWeight: "600",
                                        wordWrap: "break-word",
                                    }}
                                >
                                    E - Ticket
                                </div>

                                <div
                                    style={{
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        gap: "8px",
                                        display: "flex",
                                    }}
                                >
                                    <div
                                        style={{
                                            justifyContent: "center",
                                            alignItems: "center",
                                            gap: "4px",
                                            display: "flex",
                                        }}
                                    >
                                        <div
                                            style={{
                                                color: "#868686",
                                                fontSize: "12px",
                                                fontFamily: "Montserrat",
                                                fontWeight: "500",
                                                wordWrap: "break-word",
                                            }}
                                        >
                                            Booking Id:
                                        </div>
                                        <div
                                            style={{
                                                color: "#071c2c",
                                                fontSize: "12px",
                                                fontFamily: "Montserrat",
                                                fontWeight: "500",
                                                wordWrap: "break-word",
                                            }}
                                        >
                                            {data?.result?.bookingId}
                                        </div>
                                    </div>

                                    <div
                                        style={{
                                            justifyContent: "center",
                                            alignItems: "center",
                                            gap: "4px",
                                            display: "flex",
                                        }}
                                    >
                                        <div
                                            style={{
                                                color: "#868686",
                                                fontSize: "12px",
                                                fontFamily: "Montserrat",
                                                fontWeight: "500",
                                                wordWrap: "break-word",
                                            }}
                                        >
                                            PNR:
                                        </div>
                                        <div
                                            style={{
                                                color: "#071c2c",
                                                fontSize: "12px",
                                                fontFamily: "Montserrat",
                                                fontWeight: "500",
                                                wordWrap: "break-word",
                                            }}
                                        >
                                            {data?.result?.pnr}
                                        </div>
                                    </div>

                                    <div
                                        style={{
                                            justifyContent: "center",
                                            alignItems: "center",
                                            gap: "4px",
                                            display: "flex",
                                        }}
                                    >
                                        <div
                                            style={{
                                                color: "#868686",
                                                fontSize: "12px",
                                                fontFamily: "Montserrat",
                                                fontWeight: "500",
                                                wordWrap: "break-word",
                                            }}
                                        >
                                            (Booked on {formattedDate})
                                        </div>
                                    </div>
                                </div>
                            </div>


                            {/* Passenger Details */}

                            <div
                                style={{
                                    width: "780px",
                                    float: "left",
                                    marginTop: "15px",
                                    border: "1px solid #D6D8E7",
                                }}
                            >
                                <div
                                    style={{
                                        width: "100%",
                                        backgroundColor: "#d90429",
                                        float: "left",
                                        fontWeight: "bold",
                                        padding: "5px",
                                        paddingRight: "0px",
                                        borderBottom: "1px solid #D6D8E7",
                                        color: "#fff",
                                    }}
                                >
                                    <div
                                        style={{ width: "40%", float: "left", marginRight: "0" }}
                                    >
                                        Passenger Name
                                    </div>
                                    <div
                                        style={{ width: "30%", float: "left", marginRight: "0" }}
                                    >
                                        Ticket Number
                                    </div>
                                    <div
                                        style={{
                                            width: "21%",
                                            float: "right",
                                            textAlign: "left",
                                            marginRight: "0",
                                        }}
                                    >
                                        Frequent flyer no.
                                    </div>
                                </div>

                                {
                                    data?.result?.passengerDetails.map((item, index) => (

                                        <div

                                            style={{ width: "780px", float: "left", padding: "5px" }}
                                        >
                                            <div key={index}
                                                style={{
                                                    width: "100%",
                                                    float: "left",
                                                    paddingBottom: "5px",
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        width: "40%",
                                                        float: "left",
                                                        marginRight: "0",
                                                    }}
                                                >
                                                    <span
                                                        style={{
                                                            marginTop: "5px",
                                                            width: "100%",
                                                            float: "left",
                                                        }}
                                                    >
                                                        <b>Name:</b> {item?.title} {item?.firstName}{" "}
                                                        {item?.lastName}
                                                    </span>
                                                    <br />
                                                </div>
                                                <div
                                                    style={{
                                                        width: "30%",
                                                        float: "left",
                                                        marginRight: "8px",
                                                    }}
                                                >
                                                    <span
                                                        style={{
                                                            marginTop: "5px",
                                                            width: "100%",
                                                            float: "left",
                                                        }}
                                                    >
                                                        {item?.TicketNumber}
                                                    </span>
                                                </div>
                                                <div
                                                    style={{
                                                        width: "15%",
                                                        float: "right",
                                                        marginRight: "45px",
                                                        textAlign: "left",
                                                    }}
                                                >
                                                    <span
                                                        style={{
                                                            marginTop: "5px",
                                                            width: "100%",
                                                            float: "left",
                                                            textAlign: "left",
                                                        }}
                                                    >
                                                        -
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>

                            {/* Airline Details */}
                            <div
                                style={{
                                    width: "780px",
                                    float: "left",
                                    marginTop: "15px",
                                    border: "1px solid #D6D8E7",
                                }}
                            >
                                <div
                                    style={{
                                        width: "100%",
                                        backgroundColor: "#d90429",
                                        float: "left",
                                        fontWeight: "bold",
                                        padding: "5px",
                                        paddingRight: "0px",
                                        borderBottom: "1px solid #D6D8E7",
                                        color: "#fff",
                                    }}
                                >
                                    <div
                                        style={{ width: "23%", float: "left", marginRight: "0" }}
                                    >
                                        Flight
                                    </div>
                                    <div
                                        style={{
                                            width: "25%",
                                            float: "left",
                                            marginRight: "10px",
                                        }}
                                    >
                                        Departure
                                    </div>
                                    <div
                                        style={{
                                            width: "25%",
                                            float: "left",
                                            marginRight: "10px",
                                        }}
                                    >
                                        Arrival
                                    </div>
                                    <div
                                        style={{
                                            width: "20%",
                                            float: "right",
                                            marginRight: "10px",
                                        }}
                                    >
                                        Status
                                    </div>
                                </div>

                                {
                                    data?.result?.airlineDetails.map((item) => (
                                        <div

                                            style={{ width: "100%", float: "left", padding: "5px" }}
                                        >
                                            {/* Airline Details Content */}
                                            <div key={item?._id}
                                                style={{
                                                    width: "23%",
                                                    float: "left",
                                                    marginRight: "0",
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        marginTop: "5px",
                                                        width: "18%",
                                                        height: "75px",
                                                        float: "left",
                                                    }}
                                                >
                                                    <img
                                                        id="airlineLogo"
                                                        src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/${item?.Airline?.AirlineCode}.png`}
                                                        height="27px"
                                                        width="30px"
                                                        alt="UK"
                                                    />
                                                </span>
                                                <div
                                                    style={{
                                                        marginTop: "5px",
                                                        width: "70%",
                                                        float: "left",
                                                    }}
                                                >
                                                    {item?.Airline?.AirlineName}
                                                    {item?.Airline?.AirlineCode}
                                                    {item?.Airline?.FlightNumber}
                                                    <br />
                                                    {item?.Airline?.FareClass}
                                                    Class
                                                    <br />
                                                    Operating Carrier:{item?.Airline?.AirlineCode}
                                                    <label>Cabin:Economy</label>
                                                </div>
                                                {/* ... */}
                                            </div>
                                            <div
                                                style={{
                                                    width: "25%",
                                                    float: "left",
                                                    marginRight: "10px",
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        marginTop: "5px",
                                                        width: "100%",
                                                        float: "left",
                                                    }}
                                                >
                                                    {item?.Origin?.AirportCode}({item?.Origin?.AirportName}{" "}
                                                    ,{item?.Origin?.CityName}){" "}
                                                </span>

                                                <span
                                                    style={{
                                                        marginTop: "5px",
                                                        width: "100%",
                                                        float: "left",
                                                    }}
                                                >
                                                    Terminal:
                                                    {item?.Origin?.Terminal}
                                                </span>
                                                <span
                                                    style={{
                                                        marginTop: "5px",
                                                        width: "100%",
                                                        float: "left",
                                                    }}
                                                >
                                                    {formatDate(item?.Origin?.DepTime)}
                                                </span>

                                                {/* ... */}
                                            </div>
                                            <div
                                                style={{
                                                    width: "25%",
                                                    float: "left",
                                                    marginRight: "10px",
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        marginTop: "5px",
                                                        width: "100%",
                                                        float: "left",
                                                    }}
                                                >
                                                    {item?.Destination?.AirportCode}(
                                                    {item?.Destination?.AirportName},
                                                    {item?.Destination?.CityName}){" "}
                                                </span>

                                                <span
                                                    style={{
                                                        marginTop: "5px",
                                                        width: "100%",
                                                        float: "left",
                                                    }}
                                                >
                                                    Terminal:
                                                    {item?.Destination?.Terminal}
                                                </span>

                                                <span
                                                    style={{
                                                        marginTop: "5px",
                                                        width: "100%",
                                                        float: "left",
                                                    }}
                                                >
                                                    {formatDate(item?.Destination?.ArrTime)}
                                                </span>

                                                {/* ... */}
                                            </div>
                                            <div
                                                style={{
                                                    width: "20%",
                                                    float: "right",
                                                    marginRight: "10px",
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        marginTop: "5px",
                                                        width: "100%",
                                                        float: "left",
                                                    }}
                                                >
                                                    Confirmed
                                                </span>

                                                <span>
                                                    {" "}
                                                    <span style={{ float: "left" }}>
                                                        Baggage: {item?.Baggage}
                                                    </span>
                                                </span>

                                                <span
                                                    style={{
                                                        marginTop: "5px",
                                                        width: "100%",
                                                        float: "left",
                                                    }}
                                                ></span>
                                                <span
                                                    style={{
                                                        marginTop: "5px",
                                                        width: "100%",
                                                        float: "left",
                                                    }}
                                                >
                                                    Non stop
                                                </span>

                                                {/* ... */}
                                            </div>
                                        </div>
                                    ))}
                            </div>

                            {/* payment Details */}

                            <div id="paymentHide">
                                <div
                                    style={{
                                        width: "780px",
                                        backgroundColor: "#d90429",
                                        float: "left",
                                        fontWeight: "bold",
                                        padding: "5px",
                                        borderBottom: "1px solid #D6D8E7",
                                        color: "#fff",
                                        marginTop: "8px",
                                    }}
                                >
                                    <div
                                        style={{ width: "43%", float: "left", marginRight: "0" }}
                                    >
                                        Payment Details{" "}
                                    </div>
                                </div>

                                <div
                                    style={{
                                        width: "780px",
                                        float: "left",
                                        marginTop: "8px",
                                        padding: "5px",
                                        borderBottom: "1px solid #D6D8E7",
                                        // display: "flex"
                                    }}
                                >
                                    <div
                                        style={{
                                            width: "100%",
                                            textAlign: "center",
                                            fontWeight: "bold",
                                            color: "red",
                                            display: "none",
                                        }}
                                    >
                                        Txn fee/Discount amount will be equally divided on all the
                                        pax except infant and cancelled ticket.
                                    </div>
                                    <div
                                        style={{
                                            marginTop: "5px",
                                            float: "left",
                                            width: "100%",
                                        }}
                                    >
                                        <div
                                            style={{
                                                float: "left",
                                                width: "100%",
                                                textAlign: "left",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            This is an electronic ticket. Passengers must carry a
                                            valid photo ID card for check-in at the airport.
                                        </div>
                                    </div>

                                    <div
                                        style={{
                                            float: "left",
                                            width: "300px",
                                            marginTop: "10px",
                                        }}
                                    >
                                        <div
                                            style={{
                                                marginTop: "5px",
                                                float: "left",
                                                width: "100%",
                                                fontWeight: "bold",
                                                display: 'flex'
                                            }}
                                        >
                                            <div
                                                style={{
                                                    float: "left",
                                                    // width: "140px",
                                                    textAlign: "left",
                                                }}
                                            >
                                                Total Amount:
                                            </div>
                                            <div
                                                style={{
                                                    // width: "85px",
                                                    float: "right",
                                                    textAlign: "left",
                                                }}
                                            >
                                                ₹{" "}
                                                {data?.result?.totalAmount}
                                                .00
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div
                                style={{
                                    float: "left",
                                    width: "780px",
                                    marginTop: "10px",
                                    paddingBottom: "10px",
                                    borderBottom: "1px solid #D6D8E7",
                                }}
                            >
                                <div style={{ margin: "0", padding: "5px" }}>
                                    Carriage and other services provided by the carrier are
                                    subject to conditions of carriage which hereby incorporated
                                    by reference. These conditions may be obtained from the
                                    issuing carrier. If the passenger's journey involves an
                                    ultimate destination or stop in a country other than country
                                    of departure the Warsaw convention may be applicable and the
                                    convention governs and in most cases limits the liability of
                                    carriers for death or personal injury and in respect of loss
                                    of or damage to baggage.
                                </div>
                            </div>

                            <div
                                style={{
                                    marginTop: "5px",

                                    paddingTop: "24px",
                                    paddingBottom: "24px",
                                    background: "white",
                                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                                    borderRadius: "12px",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    gap: "24px",
                                    display: "flex",
                                    width: "780px",
                                }}
                            >
                                <div
                                    style={{
                                        color: "#d90429",
                                        fontSize: "20px",
                                        fontFamily: "Montserrat",
                                        fontWeight: "700",
                                        wordWrap: "break-word",
                                    }}
                                >
                                    The Skytrails Support
                                </div>
                                <div
                                    style={{
                                        width: "100%",
                                        height: "48px",
                                        justifyContent: "center",
                                        alignItems: " center",
                                        gap: "40px",
                                        display: "inline-flex",
                                    }}
                                >
                                    <div
                                        style={{
                                            padding: "12px",
                                            // backgroundColor: "#b3b8bd",
                                            borderRadius: "12px",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            gap: "10px",
                                            display: "flex",
                                        }}
                                    >
                                        <p
                                            style={{
                                                color: "#d90429",
                                                fontSize: " 20px",
                                                fontFamily: "Montserrat",
                                                fontWeight: "700",
                                                wordWrap: "break-word",
                                                margin: "0",
                                            }}
                                        >
                                            +91 8917972301
                                        </p>
                                    </div>
                                    <div
                                        style={{
                                            justifyContent: "flex-start",
                                            alignItems: "flex-start",
                                            gap: "8px",
                                            display: "flex",
                                            alignItems: 'center'
                                        }}
                                    >
                                        <div
                                            style={{
                                                width: "20px",
                                                height: "20px",
                                                display: "flex",
                                                alignItems: 'center',
                                                justifyContent: 'center'


                                            }}
                                        >
                                            <div
                                                style={{
                                                    width: "20px",
                                                    height: "20px",

                                                    // background: "#21325d",
                                                }}
                                            >
                                                <BiSupport color="d90429" />
                                            </div>

                                        </div>
                                        <div
                                            style={{
                                                color: "#d90429",
                                                fontSize: "16px",
                                                fontFamily: "Montserrat",
                                                fontWeight: "600",
                                                wordwrap: "break-word",
                                            }}
                                        >
                                            support@theskytrails.com
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div style={{ width: '780px', margin: '0px', padding: 0 }}>
                                <img src="https://travvolt.s3.amazonaws.com/app_banner.png" alt="SkyTrails_banner" style={{
                                    width: '100%',
                                    marginTop: '15px',
                                    borderRadius: '15px'
                                }} />
                            </div>
                        </div>
                    </div>

                </div >
            )}
        </>
    );
};
export default FlightETicket
