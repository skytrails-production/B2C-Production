import React, { useState, useEffect } from 'react'
import { FaLongArrowAltRight } from "react-icons/fa"
import "./bookingHistory.css"
import { FaUserFriends } from "react-icons/fa";
import { apiURL } from "../../Constants/constant"
import axios from 'axios';
import dayjs from 'dayjs';
// import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import busFilter from "../../images/busFilter.png"
import { MdAirlineSeatReclineExtra } from "react-icons/md";
import { SpinnerCircular } from 'spinners-react';
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import SecureStorage from "react-secure-storage";


const BusHistory = () => {



    // confirmation modal open

    const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
    const handleModalOpenConfirmation = () => setOpenConfirmationModal(true);
    const handleModalCloseConfirmation = () => setOpenConfirmationModal(false);


    // confirmation modal open 

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 500,
        // bgcolor: "background.paper",
        boxShadow: 10,
    };

    const [busBookingData, setBusBookingData] = useState([])
    const [loading, setLoading] = useState(true)



    const [reason, setReason] = useState("");
    const [selectedFlight, setSelectedFlight] = useState(null);


    // console.log(selectedFlight, " selected flight")

    const handleReasonChange = (event) => {
        setReason(event.target.value);
    };

    const [loadingCancelRequest, setLoadingCancelRequest] = useState(false);

    const [openModalCancelRequest, setOpenModalCancelRequest] = useState(false);
    const handleModalOpenCancelRequest = () => {
        setLoadingCancelRequest(false);
        setOpenModalCancelRequest(true);
    }
    const handleModalCloseCancelRequest = () => setOpenModalCancelRequest(false);

    const token = SecureStorage.getItem("jwtToken");

    // fetch api data

    // console.log(busBookingData, "Bus booking Data")


    const getBusBooking = async () => {
        try {
            const response = await axios({
                method: 'GET',
                url: `${apiURL.baseURL}/skytrails/api/user/getUserBusBooking`,
                headers: {
                    token: token,
                },
            });

            if (response.status === 200) {
                const sortedData = response.data.result.docs.sort((a, b) => {
                    const departureA = new Date(a.departureTime).getTime();
                    const departureB = new Date(b.departureTime).getTime();
                    const currentDate = new Date().getTime();

                    const diffA = departureA - currentDate;
                    const diffB = departureB - currentDate;

                    if (diffA >= 0 && diffB < 0) {
                        return -1;
                    } else if (diffA < 0 && diffB >= 0) {
                        return 1;
                    } else {
                        return Math.abs(diffA) - Math.abs(diffB);
                    }
                });
                setBusBookingData(sortedData);
                // console.log('Flight History Response', response);
            } else {
                console.error('Request failed with status code:', response.status);
            }

            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error('An error occurred while fetching flight booking:', error);
        }
    };




    // cancel hotel request 


    const handleSubmitFlightCancelRequest = async (event) => {
        event.preventDefault();

        if (!selectedFlight || loadingCancelRequest) {
            return;
        }


        const formData = {
            reason: reason,
            busId: selectedFlight?.busId,
            busBookingId: selectedFlight?._id,
            pnr: selectedFlight?.pnr,

        };


        try {

            setLoadingCancelRequest(true);

            const response = await axios({
                method: 'post',
                url: `${apiURL.baseURL}/skyTrails/api/user/cancelUserBusBooking`,
                data: formData,
                headers: {
                    token: token,
                },
            });
            setOpenModalCancelRequest(false);
            setTimeout(() => {
                handleModalOpenConfirmation();
            }, 1000)
        } catch (error) {
            console.error("Error sending data to the server:", error);
        } finally {
            setLoadingCancelRequest(false); // Reset loading state regardless of success or failure
        }
    };


    // cancel hotel request



    useEffect(() => {
        getBusBooking();
    }, [token, loading]);

    const currentDate = new Date();

    // console.log(loading, "loading")

    // {
    //     loading && (

    //         <div className='loaderBoxTc' style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }
    //         }>
    //             {/* <SpinnerCircular size={30} сolor="#111" /> */}
    //             mukesh
    //         </div >
    //     )
    // }


    if (loading) {
        return (
            <div className='loaderBoxChangeReq' style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <SpinnerCircular size={30} style={{ color: "#d90429" }} />
                {/* mukesh */}
            </div >
        )
    }



    return (
        <>

            {
                busBookingData.length == 0 && !loading ?
                    (
                        <>
                            <div className="filteredNotFound">
                                <img src={busFilter} alt="filter image" />
                                <h1>No Booking yet</h1>
                            </div>
                        </>
                    )
                    :
                    (
                        <>
                            {
                                busBookingData.map((item, index) => {

                                    const departureTime = new Date(item?.departureTime);
                                    const timeDifference = departureTime.getTime() - currentDate.getTime();
                                    const hoursDifference = timeDifference / (1000 * 60 * 60);


                                    const isCompleted = currentDate > departureTime;
                                    const isToday = currentDate.toDateString() === departureTime.toDateString();
                                    const isUpcoming = departureTime > currentDate;
                                    const isWithin24Hours = hoursDifference <= 24;



                                    let status = '';
                                    if (isCompleted) {
                                        status = 'Completed';
                                    } else if (isToday) {
                                        status = 'Today';
                                    } else if (isUpcoming) {
                                        status = 'Upcoming';
                                    }

                                    return (

                                        <>
                                            <div className='row p-0 flightHisOuter' >
                                                <div className="historyTop">
                                                    <div>
                                                        <div className='historyTopLeft'>
                                                            {/* <span>{item?.origin}</span>
                                            <FaLongArrowAltRight />
                                            <span>{item?.destination}</span> */}
                                                            <span>{item?.travelName}</span>
                                                        </div>

                                                        <div className='historyStatus'>
                                                            <span>{status}</span>
                                                            <p>|</p>
                                                            <span>{item?.busType}</span>

                                                        </div>
                                                    </div>
                                                    <div className='historyTopRight'>
                                                        <p>Bus ID : {"  "} {item?.busId}</p>
                                                        <span>PNR : {"  "}  {item?.pnr}</span>
                                                    </div>
                                                </div>

                                                <div className="historyBottom">
                                                    <div className="historyBottomOne">
                                                        <span>Departure</span>
                                                        {/* <span>15 Jan, 23{"  "} 08:30 AM</span> */}
                                                        <span>
                                                            {dayjs(item?.departureTime).format("DD MMM, YY")}
                                                            {"  "}
                                                            {dayjs(item?.departureTime).format("hh:mm A")}
                                                        </span>
                                                        {/* <h3>{item?.airlineDetails[0]?.Origin?.AirportCode}-{item?.airlineDetails[0]?.Origin?.CityName}</h3> */}
                                                    </div>
                                                    <div className="historyBottomOne">
                                                        <span>To</span>
                                                        <span>
                                                            {dayjs(item?.arrivalTime).format("DD MMM, YY")}
                                                            {"  "}
                                                            {dayjs(item?.arrivalTime).format("hh:mm A")}
                                                        </span>
                                                        {/* <h3>{item?.airlineDetails[item?.airlineDetails.length - 1]?.Destination?.AirportCode}-{item?.airlineDetails[item?.airlineDetails.length - 1]?.Destination?.CityName}</h3> */}
                                                    </div>
                                                    <div className="historyBottomTwo">
                                                        {/* <span><FaPlaneDeparture /> {"  "}
                                            {item?.airlineDetails[0]?.Airline?.AirlineName} {" "}
                                            {item?.airlineDetails[0]?.Airline?.AirlineCode} {" "}
                                            {item?.airlineDetails[0]?.Airline?.FlightNumber} {" "}

                                        </span> */}
                                                        <span><MdAirlineSeatReclineExtra /> {"  "}
                                                            {item?.noOfSeats} {" "} seat(s)
                                                        </span>
                                                        {
                                                            item?.passenger?.map((passenger, index) => {
                                                                return (
                                                                    <span key={index}><FaUserFriends /> {"  "} {passenger?.firstName}</span>
                                                                )
                                                            })
                                                        }
                                                    </div>

                                                    {isWithin24Hours ? (
                                                        <div className="historyBottomThreeDisabled">
                                                            <button >Cancel Request</button>
                                                        </div>
                                                    ) : (
                                                        <div className="historyBottomThree">
                                                            <button
                                                                onClick={() => {
                                                                    handleModalOpenCancelRequest();
                                                                    setSelectedFlight(item);
                                                                }}
                                                            >Cancel Request</button>
                                                        </div>
                                                    )}

                                                </div>
                                            </div >


                                            {/* cancel request  */}

                                            <Modal
                                                open={openModalCancelRequest}
                                                onClose={handleModalCloseCancelRequest}
                                                aria-labelledby="modal-modal-title"
                                                aria-describedby="modal-modal-description"
                                            >
                                                <Box sx={style}>
                                                    <div className="modal-boxChange">
                                                        <div className="modal-header">
                                                            <h2>Cancel Request</h2>
                                                            {selectedFlight && (
                                                                <p>
                                                                    <span>PNR : </span> {selectedFlight?.pnr}
                                                                </p>
                                                            )}
                                                        </div>
                                                        <form className='cancelForm'>

                                                            <div className="input-text">
                                                                <p className="bold" htmlFor="reason">
                                                                    Write Your Valid Reason
                                                                </p>
                                                                <input type="text" id="reason" onChange={handleReasonChange} />
                                                            </div>

                                                            <div className="historyCancelModal">
                                                                <button type="button" onClick={handleModalCloseCancelRequest}>
                                                                    Cancel
                                                                </button>

                                                                <button
                                                                    className="second"
                                                                    type="submit"
                                                                    onClick={handleSubmitFlightCancelRequest}
                                                                >
                                                                    {loadingCancelRequest ? (
                                                                        <SpinnerCircular size={30} сolor="#ffffff" />
                                                                    ) : (
                                                                        "Send Request"
                                                                    )}
                                                                </button>

                                                            </div>
                                                        </form>
                                                    </div>
                                                </Box>
                                            </Modal>




                                            {/* confirmation modal  */}

                                            <Modal
                                                open={openConfirmationModal}
                                                onClose={handleModalCloseConfirmation}
                                                aria-labelledby="modal-modal-title"
                                                aria-describedby="modal-modal-description"
                                            >
                                                <Box sx={style}>
                                                    <div className="modal-boxChange">

                                                        <form className='cancelForm'>

                                                            <div className='confirmModal'>
                                                                <h3>Thank You</h3>
                                                                <p>
                                                                    Your Query has been sent Successfully.
                                                                </p>
                                                                <span>We will get back to you soon. </span>
                                                            </div>
                                                            <div className="historyCancelModal">

                                                                <button
                                                                    className="second"
                                                                    type="submit"
                                                                    onClick={handleModalCloseConfirmation}
                                                                >
                                                                    OK
                                                                </button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </Box>
                                            </Modal>
                                        </>
                                    )


                                })}
                        </>
                    )
            }


        </>

    )

}

export default BusHistory
