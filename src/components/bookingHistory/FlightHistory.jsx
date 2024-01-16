import React, { useState, useEffect } from 'react'
import { FaLongArrowAltRight } from "react-icons/fa"
import "./bookingHistory.css"
import { FaUserFriends } from "react-icons/fa";
import { apiURL } from "../../Constants/constant"
import axios from 'axios';
import dayjs from 'dayjs';
import flightFilter from "../../images/flightFilter.png"
import { FaPlaneDeparture } from "react-icons/fa";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { SpinnerCircular } from 'spinners-react';


const FlightHistory = () => {

    const [flightBookingData, setFlightBookingData] = useState([])

    const [loading, setLoading] = useState(true)
    // change flight request 


    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 500,
        // bgcolor: "background.paper",
        boxShadow: 10,
    };



    const [loadingCancelRequest, setLoadingCancelRequest] = useState(false);






    const [openModalChange, setOpenModalChange] = useState(false);
    const handleModalOpenChange = () => {
        setLoadingCancelRequest(false);
        setOpenModalChange(true);
    }
    const handleModalCloseChange = () => setOpenModalChange(false);
    const [reason, setReason] = useState("");
    const [selectedFlight, setSelectedFlight] = useState(null);





    const handleReasonChange = (event) => {
        setReason(event.target.value);
    };

    // change flight request



    // cancel flight request 


    const [openModalCancelRequest, setOpenModalCancelRequest] = useState(false);


    const handleModalOpenCancelRequest = () => setOpenModalCancelRequest(true);
    const handleModalCloseCancelRequest = () => setOpenModalCancelRequest(false);

    const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
    const handleModalOpenConfirmation = () => setOpenConfirmationModal(true);
    const handleModalCloseConfirmation = () => setOpenConfirmationModal(false);


    // cancel flight request 


    const token = sessionStorage.getItem("jwtToken");

    // fetch api data


    // console.log(flightBookingData, "flight booking")
    // console.log(token, "flight booking")

    const getFlightBooking = async () => {
        try {
            const response = await axios({
                method: 'GET',
                url: `${apiURL.baseURL}/skytrails/api/user/getUserflightBooking`,
                headers: {
                    token: token,
                },
            });

            if (response.status === 200) {
                const sortedData = response.data.result.docs.sort((a, b) => {
                    const departureA = new Date(
                        a.airlineDetails[0].Origin.DepTime,
                    ).getTime();
                    const departureB = new Date(
                        b.airlineDetails[0].Origin.DepTime,
                    ).getTime();
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
                setFlightBookingData(sortedData);
                // console.log('Flight History Response', response);
            } else {
                console.error('Request failed with status code:', response.status);
            }
            setLoading(false);
        } catch (error) {
            console.error('An error occurred while fetching flight booking:', error);
            setLoading(false);
        }
    };


    useEffect(() => {
        getFlightBooking();
    }, [token, loading]);




    // change request flight


    // console.log(selectedFlight, "selected flight");

    const handleSubmitFlightChange = async (event) => {
        event.preventDefault();

        if (!selectedFlight || loadingCancelRequest) {
            return;
        }

        const selectedReason = document.querySelector("input[type=radio]:checked");
        const selectedCheckboxValue = selectedReason ? selectedReason.value : null;


        const formData = {
            reason: reason,
            bookingId: selectedFlight?.bookingId,
            flightBookingId: selectedFlight?._id,
            contactNumber: selectedFlight?.passengerDetails[0]?.ContactNo,
            changerequest: selectedCheckboxValue,
            // amount: Number(selectedFlight?.totalAmount),
            pnr: selectedFlight?.pnr,
        };

        try {


            setLoadingCancelRequest(true);

            const response = await axios({
                method: 'post',
                url: `${apiURL.baseURL}/skyTrails/api/user/changeUserFlightBooking`,
                data: formData,
                headers: {
                    token: token,
                },
            });
            setOpenModalChange(false);
            setTimeout(() => {
                handleModalOpenConfirmation();
            }, 1000)
        } catch (error) {
            console.error("Error sending data to the server:", error);
        } finally {
            setLoadingCancelRequest(false); // Reset loading state regardless of success or failure
        }
    };


    // change request flight





    // cancel flight request 


    const handleSubmitFlightCancelRequest = async (event) => {
        event.preventDefault();

        if (!selectedFlight || loadingCancelRequest) {
            return;
        }


        const formData = {
            reason: reason,
            bookingId: selectedFlight?.bookingId,
            flightBookingId: selectedFlight?._id,
            pnr: selectedFlight?.pnr,

        };


        try {

            setLoadingCancelRequest(true);

            const response = await axios({
                method: 'post',
                url: `${apiURL.baseURL}/skyTrails/api/user/cancelUserFlightBooking`,
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


    // cancel flight request 




    const currentDate = new Date();



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
                flightBookingData.length == 0 && !loading ?
                    (
                        <>
                            <div className="filteredNotFound">
                                <img src={flightFilter} alt="filter image" />
                                <h1>No Booking yet</h1>
                            </div>
                        </>
                    )
                    :
                    (
                        <>

                            {
                                flightBookingData.map((item, index) => {

                                    const departureTime = new Date(item?.airlineDetails[0]?.Origin?.DepTime);
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
                                                            <span>{item?.airlineDetails[0]?.Origin?.CityName}</span>
                                                            <FaLongArrowAltRight />
                                                            <span>{item?.airlineDetails[item?.airlineDetails.length - 1]?.Destination?.CityName}</span>
                                                        </div>

                                                        <div className='historyStatus'>
                                                            <span>{status}</span>
                                                            <p>|</p>

                                                            {
                                                                item?.oneWay == true ? (
                                                                    <span>
                                                                        One Way Flight
                                                                    </span>
                                                                ) : (
                                                                    <span>
                                                                        Return Flight
                                                                    </span>
                                                                )
                                                            }

                                                        </div>
                                                    </div>
                                                    <div className='historyTopRight'>
                                                        <p>Booking ID : {"  "} {item?.bookingId}</p>
                                                        <span>PNR : {"  "}  {item?.pnr}</span>
                                                    </div>
                                                </div>

                                                <div className="historyBottom">
                                                    <div className="historyBottomOne">
                                                        <span>From</span>
                                                        {/* <span>15 Jan, 23{"  "} 08:30 AM</span> */}
                                                        <span>
                                                            {dayjs(item?.airlineDetails[0]?.Origin?.DepTime).format("DD MMM, YY")}
                                                            {"  "}
                                                            {dayjs(item?.airlineDetails[0]?.Origin?.DepTime).format("hh:mm A")}
                                                        </span>
                                                        <h3>{item?.airlineDetails[0]?.Origin?.AirportCode}-{item?.airlineDetails[0]?.Origin?.CityName}</h3>
                                                    </div>
                                                    <div className="historyBottomOne">
                                                        <span>To</span>
                                                        <span>
                                                            {dayjs(item?.airlineDetails[item?.airlineDetails.length - 1]?.Destination?.ArrTime).format("DD MMM, YY")}
                                                            {"  "}
                                                            {dayjs(item?.airlineDetails[item?.airlineDetails.length - 1]?.Destination?.ArrTime).format("hh:mm A")}
                                                        </span>
                                                        <h3>{item?.airlineDetails[item?.airlineDetails.length - 1]?.Destination?.AirportCode}-{item?.airlineDetails[item?.airlineDetails.length - 1]?.Destination?.CityName}</h3>
                                                    </div>
                                                    <div className="historyBottomTwo">
                                                        <span><FaPlaneDeparture /> {"  "}
                                                            {item?.airlineDetails[0]?.Airline?.AirlineName} {" "}
                                                            {item?.airlineDetails[0]?.Airline?.AirlineCode} {" "}
                                                            {item?.airlineDetails[0]?.Airline?.FlightNumber} {" "}

                                                        </span>
                                                        {/* <span><FaUserFriends /> {"  "} Shaan</span> */}
                                                        {
                                                            item?.passengerDetails?.map((passenger, index) => {
                                                                return (
                                                                    <span key={index}><FaUserFriends /> {"  "} {passenger?.firstName}</span>
                                                                )
                                                            })
                                                        }
                                                    </div>

                                                    {isWithin24Hours ? (
                                                        <div className="historyBottomThreeDisabled">
                                                            <button >Change Request</button>
                                                            <button >Cancel Request</button>
                                                        </div>
                                                    ) : (
                                                        <div className="historyBottomThree">
                                                            <button
                                                                onClick={() => {
                                                                    handleModalOpenChange();
                                                                    setSelectedFlight(item);
                                                                }}
                                                            >Change Request</button>
                                                            <button
                                                                onClick={() => {
                                                                    handleModalOpenCancelRequest();
                                                                    setSelectedFlight(item);
                                                                }}
                                                            >

                                                                Cancel Request

                                                            </button>
                                                        </div>
                                                    )}

                                                </div>
                                            </div >



                                            {/* change request  */}

                                            <Modal
                                                open={openModalChange}
                                                onClose={handleModalCloseChange}
                                                aria-labelledby="modal-modal-title"
                                                aria-describedby="modal-modal-description"
                                            >
                                                <Box sx={style}>
                                                    <div className="modal-boxChange">
                                                        <div className="modal-header">
                                                            <h2>Change Request</h2>
                                                            {selectedFlight && (
                                                                <p>
                                                                    <span>PNR:-</span> {selectedFlight.pnr}
                                                                </p>
                                                            )}
                                                        </div>
                                                        <form className='cancelForm'>
                                                            <div className="input-text">
                                                                <p className="bold" htmlFor="reason">
                                                                    Write Your Valid Reason
                                                                </p>
                                                                <input type='text' id="reason" onChange={handleReasonChange} />
                                                            </div>
                                                            <p className="bold" htmlFor="">
                                                                Please Select a Valid Reason{" "}
                                                            </p>
                                                            <div className="input-check">
                                                                <div className="formGroup">
                                                                    <input
                                                                        type="radio"
                                                                        name="travel"
                                                                        id='one'
                                                                        value="Change in Travel Plans"
                                                                    />
                                                                    <label>Change in Travel Plans</label>
                                                                </div>

                                                                <div className="formGroup">
                                                                    <input
                                                                        type="radio"
                                                                        name="travel"
                                                                        id='two'
                                                                        value="Travel Advisory or Warnings"
                                                                    />
                                                                    <label> Travel Advisory or Warnings</label>
                                                                </div>

                                                                <div className="formGroup">
                                                                    <input
                                                                        type="radio"
                                                                        name="travel"
                                                                        id='three'
                                                                        value="Visa or Documentation Problems"
                                                                    />
                                                                    <label>Visa or Documentation Problems</label>
                                                                </div>

                                                                <div className="formGroup">
                                                                    <input
                                                                        type="radio"
                                                                        id='four'
                                                                        name="travel"
                                                                        value="Medical Issues"
                                                                    />
                                                                    <label>Medical Issues</label>
                                                                </div>

                                                                <div className="formGroup">
                                                                    <input type="radio" id='five' name="travel" value="Other" />
                                                                    <label> Other</label>
                                                                </div>
                                                            </div>
                                                            <div className="historyCancelModal">
                                                                <button type="button" onClick={handleModalCloseChange}>
                                                                    Cancel
                                                                </button>
                                                                <button
                                                                    className="second"
                                                                    type="submit"
                                                                    onClick={handleSubmitFlightChange}
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
                                                </Box >
                                            </Modal>




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
                                                                    <span>PNR:-</span> {selectedFlight.pnr}
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
export default FlightHistory
