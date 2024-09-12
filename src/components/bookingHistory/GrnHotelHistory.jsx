import React, { useState, useEffect } from 'react'
import { FaLongArrowAltRight } from "react-icons/fa"
import "./bookingHistory.css"
import { FaUserFriends } from "react-icons/fa";
import { apiURL } from "../../Constants/constant"
import axios from 'axios';
import dayjs from 'dayjs';
// import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { MdOutlineBedroomParent } from "react-icons/md";
import hotelFilter from "../../images/hotelFilter.png"
import { SpinnerCircular } from 'spinners-react';
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import SecureStorage from "react-secure-storage";


const GrnHotelHistory = () => {


    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 500,
        // bgcolor: "background.paper",
        boxShadow: 10,
    };

    const [hotelBookingData, setHotelBookingData] = useState([])
    const [loading, setLoading] = useState(true)


    const [reason, setReason] = useState("");
    const [selectedFlight, setSelectedFlight] = useState(null);


    const handleReasonChange = (event) => {
        setReason(event.target.value);
    };



    const token = SecureStorage.getItem("jwtToken");


    // console.log(hotelBookingData, "hotel booking data")

    // fetch api data

    console.log(token)

    // cancel flight request 


    const [openModalCancelRequest, setOpenModalCancelRequest] = useState(false);
    const handleModalOpenCancelRequest = () => setOpenModalCancelRequest(true);
    const handleModalCloseCancelRequest = () => setOpenModalCancelRequest(false);


    const [openSuccess, setOpenSuccess] = useState(false);
    const handleSuccessOpen = () => setOpenSuccess(true);
    const handleSuccessClose = () => setOpenSuccess(false);


    // cancel flight request 



    // console.log(hotelBookingData, "hotel booking details")
    // console.log(token, "api url")


    const getHotelBooking = async () => {
        try {
            const response = await axios({
                method: 'GET',
                url: `${apiURL.baseURL}/skyTrails/api/grn/user/grnUserBooking`,
                headers: {
                    token: token,
                },
            });

            console.log('Flight History Response', response);
            if (response.status === 200) {
                setHotelBookingData(response.data.result);
            } else {
                console.error('Request failed with status code:', response.status);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error('An error occurred while fetching Hotel booking:', error);
        }
    };


    useEffect(() => {
        getHotelBooking();
    }, [token]);






    // cancel hotel request 


    const handleSubmitFlightCancelRequest = async (event) => {
        event.preventDefault();

        if (!selectedFlight) {
            return;
        }


        const formData = {
            reason: reason,
            hotelBookingId: selectedFlight?._id,
            // hotelBookingId: selectedFlight?._id,

        };


        try {
            const response = await axios({
                method: 'post',
                url: `${apiURL.baseURL}/skyTrails/api/grn/user/cancel/createCancelRequest`,
                data: formData,
                headers: {
                    token: token,
                },
            });
            setOpenModalCancelRequest(false);
            handleSuccessOpen()
        } catch (error) {
            console.error("Error sending data to the server:", error);
        }
    };


    // cancel hotel request



    const currentDate = new Date();

    if (loading) {
        return (
            <div className='loaderBoxChangeReq' style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <SpinnerCircular size={30} style={{ color: "#d90429" }} />
                {/* mukesh */}
            </div >
        )
    }



    if (hotelBookingData?.length == 0)

        return (
            <>

                <div className="filteredNotFound">
                    <img src={hotelFilter} alt="filter image" />
                    <h1>No Booking yet</h1>
                </div>
            </>
        )

    return (
        <>
            {
                hotelBookingData.length == 0 && !loading ?
                    (
                        <>
                            <div className="filteredNotFound">
                                <img src={hotelFilter} alt="filter image" />
                                <h1>No Booking yet</h1>
                            </div>
                        </>
                    )
                    :
                    (
                        <>

                            {
                                hotelBookingData.map((item, index) => {

                                    const departureTime = new Date(item?.checkin);
                                    const timeDifference = departureTime.getTime() - currentDate.getTime();
                                    const hoursDifference = timeDifference / (1000 * 60 * 60);


                                    const isCompleted = currentDate > departureTime;
                                    const isToday = currentDate.toDateString() === departureTime.toDateString();
                                    const isUpcoming = departureTime > currentDate;
                                    const isWithin24Hours = hoursDifference <= 24;

                                    // console.log(isWithin24Hours, " with in 24 hours")
                                    // console.log(isUpcoming, " isUpcoming")
                                    // console.log(isCompleted, " isCompleted")



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
                                                            {/* <span>{item?.airlineDetails[0]?.Origin?.CityName}</span>
                                            <FaLongArrowAltRight />
                                            <span>{item?.airlineDetails[item?.airlineDetails.length - 1]?.Destination?.CityName}</span> */}
                                                            <span>{item?.hotel?.name}</span>
                                                            <div className="mapp">
                                                                <a href={`https://www.google.com/maps?q=${item?.hotel?.geolocation?.latitude},${item?.hotel?.geolocation?.longitude}`} target="_blank">
                                                                    <svg id="fi_2642502" enable-background="new 0 0 512 512" height="25" viewBox="0 0 512 512" width="30" xmlns="http://www.w3.org/2000/svg"><g><path d="m307.79 223.476-53.135 78.467-78.573 78.18c-29.222-37.139-61.132-73.116-80.587-116.631l42.352-64.879 64.957-62.668c-21.71 26.831-20.089 66.293 4.864 91.246 26.696 26.696 69.968 26.696 96.663 0 1.203-1.203 2.365-2.446 3.459-3.715z" fill="#ecb72b"></path><path d="m309.02 222.003c21.9-26.844 20.346-66.442-4.688-91.462-26.696-26.696-69.968-26.696-96.663 0-1.121 1.121-2.189 2.27-3.215 3.445l44.811-72.847 60.795-52.809c45.407 14.374 82.964 46.379 104.648 87.977l-44.352 71.516z" fill="#5085f7"></path><path d="m202.802 135.949-107.312 127.549c-10.643-23.783-17.562-49.817-18.276-79.529-.054-1.689-.081-3.391-.081-5.093 0-43.718 15.685-83.789 41.746-114.861z" fill="#da2f2a"></path><path d="m202.802 135.949-83.926-71.939c32.816-39.125 82.06-64.01 137.126-64.01 18.845 0 37.009 2.916 54.065 8.32z" fill="#4274eb"></path><path d="m434.867 178.865c0-29.779-7.278-57.859-20.151-82.558l-238.64 283.826c27.113 34.488 51.887 69.985 62.183 113.454.33 1.392.685 3.019 1.063 4.848 3.733 18.086 29.63 18.086 33.363 0 .378-1.829.733-3.456 1.063-4.848 27.448-115.892 157.807-175.118 161.043-309.618.046-1.696.076-3.397.076-5.104z" fill="#60a850"></path></g></svg>  see on map
                                                                </a>
                                                            </div>
                                                        </div>

                                                        <div className='historyStatus'>
                                                            <span>{status}</span>
                                                            <p>|</p>

                                                            <span> No of People : {"  "} {item?.hotel?.paxes?.length}</span>
                                                        </div>
                                                        <div className='historyStatus'>
                                                            <span style={{ color: "green" }}> Status : {"  "} {item?.bookingStatus}</span>
                                                        </div>
                                                    </div>
                                                    <div className='historyTopRight'>
                                                        <p>City Code : {"  "} {item?.hotel?.city_code}</p>
                                                        <span>Booking ID : {"  "}  {item?.booking_id}</span>
                                                        <span>Booking Date : {"  "}  {dayjs(item?.booking_date).format("DD MMM, YY")}</span>
                                                    </div>
                                                </div>

                                                <div className="historyBottom">
                                                    <div className="historyBottomOne">
                                                        <span>Check In</span>
                                                        {/* <span>15 Jan, 23{"  "} 08:30 AM</span> */}
                                                        <span>
                                                            {dayjs(item?.checkin).format("DD MMM, YY")}
                                                            {"  "}
                                                            {dayjs(item?.checkin).format("hh:mm A")}
                                                        </span>
                                                        {/* <h3>{item?.airlineDetails[0]?.Origin?.AirportCode}-{item?.airlineDetails[0]?.Origin?.CityName}</h3> */}
                                                    </div>
                                                    <div className="historyBottomOne">
                                                        <span>Check Out</span>
                                                        <span>
                                                            {dayjs(item?.checkout).format("DD MMM, YY")}
                                                            {"  "}
                                                            {dayjs(item?.checkout).format("hh:mm A")}
                                                        </span>
                                                        {/* <h3>{item?.airlineDetails[item?.airlineDetails.length - 1]?.Destination?.AirportCode}-{item?.airlineDetails[item?.airlineDetails.length - 1]?.Destination?.CityName}</h3> */}
                                                    </div>
                                                    <div className="historyBottomTwo">
                                                        <span><MdOutlineBedroomParent /> {"  "}
                                                            {item?.hotel?.rooms?.length} {" "} Room(s)
                                                        </span>
                                                        <span><FaUserFriends /> {"  "} {item?.holder?.name}</span>

                                                    </div>

                                                    {isWithin24Hours ? (
                                                        <div className="historyBottomThreeDisabled">
                                                            <button >Cancel Request</button>
                                                        </div>
                                                    ) : (
                                                        <div className="historyBottomThree">
                                                            <span>₹{item?.hotel?.price}</span>
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
                                                                    <span>Booking ID : </span> {selectedFlight.booking_id}
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
                                                                    Send Request
                                                                </button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </Box>
                                            </Modal>
                                            <Modal
                                                open={openSuccess}
                                                onClose={handleSuccessClose}
                                                aria-labelledby="modal-modal-title"
                                                aria-describedby="modal-modal-description"
                                            >
                                                <Box sx={style}>
                                                    <div className="modal-boxChange">
                                                        <div className="modal-header">
                                                            <h2>Cancel Request</h2>

                                                        </div>
                                                        <form className='cancelForm'>

                                                            <div className="input-text">
                                                                <p className="bold" htmlFor="reason">
                                                                    Your Cancellation request has been successfully submitted !
                                                                </p>
                                                            </div>

                                                            <div className="historyCancelModal">
                                                                <button type="button" onClick={handleSuccessClose}>
                                                                    Okay
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

export default GrnHotelHistory;
