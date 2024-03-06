import React, { useEffect, useState, useRef } from 'react';
import InsideNavbar from "../../UI/BigNavbar/InsideNavbar"
import scroll from "../../images/scroll.png"
import axios from 'axios';
import { apiURL } from '../../Constants/constant';
import dayjs from 'dayjs';
import "./event.css"
import click from "../../images/click.gif"
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Login from "../../components/Login";
import loginnew from "../../images/login-01.jpg"
import CloseIcon from '@mui/icons-material/Close';
import apple from "../../images/download/apple.png"
import google from "../../images/download/google.png"
import mobil from "../../images/download/mobil.png"
import check from "../../images/download/check.png"
import scan from "../../images/scan.png";
import { useSelector } from 'react-redux';
import SecureStorage from "react-secure-storage";


const Events = () => {


    const reducerState = useSelector((state) => state);
    const authenticUser = reducerState?.logIn?.loginData?.status;

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
    };
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const firstInputRef = useRef(null);
    const handlePassAbsClick = () => {
        firstInputRef.current.focus();
    };
    const token = SecureStorage.getItem("jwtToken");
    const [loadingEvent, setLoadingEvent] = useState(false)
    const [eventDetails, setEventDetails] = useState([]);
    const [formData, setFormData] = useState({
        firstName: '',
        mobileNumber: '',
        currentCity: '',
        profession: '',
        otherProfession: '',
    });
    const [selectedProfession, setSelectedProfession] = useState('film industry');
    const [totalPeople, setTotalPeople] = useState('1');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSelectChange = (e) => {
        setSelectedProfession(e.target.value);
    };

    const handleRadioChange = (e) => {
        setTotalPeople(e.target.value);
    };





    // if user is already registered 
    const [eventHistoryData, setEventHistoryData] = useState([]);


    const fetchData = async () => {
        try {
            const apiUrl = `${apiURL.baseURL}/skyTrails/api/user/getEventBookingStatus`;
            const headers = {
                token: token,

            };

            const response = await axios.get(apiUrl, { headers });

            if (response.data.statusCode === 200) {
                setEventHistoryData(response.data.result);
                // console.log('res', response);
            }
        } catch (error) {
            console.error('Error fetching event history:', error);
        }
    };


    useEffect(() => {
        fetchData();
    }, []);


    // console.log(eventHistoryData, "history")



    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoadingEvent(true)
        const { firstName, mobileNumber, currentCity, otherProfession } = formData;

        const payload = {
            name: firstName,
            mobileNumber: mobileNumber,
            city: currentCity,
            eventId: '65bdf1f5d8cecc4038704007',
            startTime: '17:00',
            eventDate: '2024-03-02T17:00:00.000+00:00',
            profession: selectedProfession === 'other' ? otherProfession : selectedProfession,
            noOfMember: totalPeople,
        };

        try {
            const res = await axios({
                method: 'post',
                url: `${apiURL.baseURL}/skyTrails/api/user/event/pefaBookFreeEvents`,
                data: payload,
                headers: {
                    'Content-Type': 'application/json',
                    token: token,
                },
            });
            // console.log(res, "data")
            if (res.data.statusCode === 200) {
                handleOpen();
                setLoadingEvent(false)
            }
        } catch (error) {
            setLoadingEvent(false)
            console.error('Error submitting form:', error);
        }
        fetchData();
    };

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const res = await axios({
                    method: "get",
                    url: `${apiURL.baseURL}/skyTrails/api/user/getEventById?eventId=65bdf1f5d8cecc4038704007`,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                // console.log(res.data, "data")
                setEventDetails(res.data.result);


            } catch (error) {
                console.error('Event Error fetching data:', error);
                // console.log('Event Error fetching data:', error);
            }
        };
        fetchEvent();
        window.scrollTo(0, 0);
    }, []);




    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    const handleModalClose = () => {
        setIsLoginModalOpen(false)
    }

    const handleTravelClickOpen = () => {
        if (authenticUser !== 200) {
            setIsLoginModalOpen(true);
        }
    };



    useEffect(() => {
        if (authenticUser === 200) {
            handleModalClose();
        }
    }, [authenticUser])






    // download logic here

    const [mobileNumber, setMobileNumber] = useState("");
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const handleDownloadLink = async () => {
        setLoading(true);
        try {
            const res = await axios({
                method: "GET",
                url: `${apiURL.baseURL}/skyTrails/api/user/getUrl/${mobileNumber}`,
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (res.data.statusCode === 200) {
                setLoading(false); // Stop loading
                setSent(true); // Mark as sent
                setTimeout(() => setSent(false), 4000); // Reset "sent" state after 2 seconds
            }
            // console.log(res, "responsie")
        } catch (error) {
            console.warn("Error sending link:", error);
        }
    };

    // download logic here 


    return (
        <>
            <InsideNavbar />
            <div className="mainimgEvent">
                <img className="bannerBackEvent" src="https://raw.githubusercontent.com/The-SkyTrails/Images/main/pefabannerskyTrails.jpg" alt="background" />
                {
                    eventHistoryData.length !== 0 ?
                        ("") :
                        (
                            // <div className='passAbs d-none d-sm-flex' onClick={handlePassAbsClick}>
                            //     <p>Get Your Event Pass</p>
                            //     <img src={scroll} alt="scroll" />
                            // </div>
                            ""
                        )

                }
            </div>
            <section class="download-section-mobil mb-5 mt-5" >
                <div class="opacityPackdownload"></div>
                <div class="container">
                    <div class="row align-items-center">
                        <div class="col-lg-6">
                            <div class="download-app">
                                <h2>To get the PEFA Event pass Download Our App</h2>
                                <ul class="download-list">
                                    <li><img src={check} alt="check" />Flight Ticket, Bus Ticket, Hotel Booking</li>
                                    <li><img src={check} alt="check" />Events, Recharge, Visa</li>
                                </ul>
                                <div className="qr-Box">
                                    <div>
                                        <img src={scan} className="scan-logo" alt="scan logo" />
                                    </div>
                                    <div class="d-sm-flex">
                                        <a href="https://play.google.com/store/apps/details?id=com.skytrails" target="_blank"><img src={google} alt="google" /></a>
                                        <a href="https://apps.apple.com/in/app/the-skytrails/id6475768819" target="_blank"><img src={apple} alt="apple" /></a>
                                    </div>
                                </div>
                                <div className="appLink ">
                                    <div class="input-group customInputGroup">
                                        <div class="input-group-text designCustom">
                                            +91
                                        </div>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={mobileNumber}
                                            onChange={(e) => {
                                                setMobileNumber(e.target.value)
                                            }
                                            }
                                            class="form-control"
                                            placeholder="Mobile Number"
                                        />
                                        <div class="input-group-text designCustomTwo">
                                            <button className="appLinkButton" onClick={handleDownloadLink} disabled={loading || sent}>
                                                {loading ? (
                                                    <>
                                                        Sending...
                                                    </>
                                                ) : sent ? (
                                                    <>
                                                        Sent <span><svg height="20" viewBox="0 0 520 520" width="20" xmlns="http://www.w3.org/2000/svg" id="fi_5290058"><g id="_15-Checked" data-name="15-Checked"><circle cx="208.52" cy="288.5" fill="#b0ef8f" r="176.52"></circle><path d="m210.516 424.937-2.239-3.815c-34.2-58.27-125.082-181.928-126-183.17l-1.311-1.781 30.963-30.6 98.012 68.439c61.711-80.079 119.283-135.081 156.837-167.2 41.081-35.135 67.822-51.31 68.092-51.465l.608-.364h52.522l-5.017 4.468c-129.029 114.926-268.883 359.19-270.276 361.644z" fill="#009045"></path></g></svg></span>
                                                    </>
                                                ) : (
                                                    "GET APP LINK"
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="download-img-mobil">
                                <img src={mobil} alt="mobil" />
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <div className="container mt-5 eventContnet"  >
                <h1 className='mt-5'>{eventDetails?.title}</h1 >
                <div className='eventFirstPara'>
                    <p>{eventDetails?.content}</p>
                </div>


                <div className="eventForm">
                    {/* <div className="formUpperEvent">
                        <div>
                            <p>Venue : </p>
                            <span>{eventDetails?.venue}</span>
                        </div>
                        <div>
                            <p>Ages above : </p>
                            <span>{eventDetails?.age}</span>
                        </div>
                        <div>
                            <p>Event Date : </p>
                            <span>{dayjs(eventDetails?.startDate).format('DD MMM, YY')}</span>
                        </div>
                        <div>
                            <p className='text-green'>Free of Cost</p>
                        </div>
                    </div> */}
                    {/* <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="eventInput mb-3">
                                                <label htmlFor="firstName" className="form-label">First Name</label>
                                                <input
                                                    type="text"
                                                    name="firstName"
                                                    ref={firstInputRef}
                                                    id="firstName"
                                                    className="form-control"
                                                    value={formData.firstName}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="eventInput mb-3">
                                                <label htmlFor="mobileNumber" className="form-label">Mobile Number</label>
                                                <input
                                                    type="tel"
                                                    name="mobileNumber"
                                                    id="mobileNumber"
                                                    className="form-control"
                                                    value={formData.mobileNumber}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="eventInput mb-3">
                                                <label htmlFor="currentCity" className="form-label">Current City</label>
                                                <input
                                                    type="text"
                                                    name="currentCity"
                                                    id="currentCity"
                                                    className="form-control"
                                                    value={formData.currentCity}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="eventInput mb-3">
                                                <label htmlFor="professionSelect" className="form-label">Select Profession</label>
                                                <select
                                                    className="form-select"
                                                    id="professionSelect"
                                                    value={selectedProfession}
                                                    onChange={handleSelectChange}
                                                >
                                                    <option value="film industry">Film Industry</option>
                                                    <option value="other">Other</option>
                                                </select>
                                            </div>
                                        </div>
                                        {selectedProfession === 'other' &&
                                            <div className="col-lg-6 offset-lg-6">
                                                <div className="eventInput mb-3">
                                                    <label htmlFor="otherProfession" className="form-label">Other Profession</label>
                                                    <input
                                                        type="text"
                                                        name="otherProfession"
                                                        id="otherProfession"
                                                        className="form-control"
                                                        value={formData.otherProfession}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>
                                        }
                                        <div className="col-lg-12">
                                            <div className="eventSubmitBox">
                                                <div class="eventTickets">
                                                    <input type="radio"
                                                        id="option-1"
                                                        name="totalPeople"
                                                        value="1"
                                                        checked={totalPeople === "1"}
                                                        onChange={handleRadioChange}
                                                    />
                                                    <input type="radio"
                                                        name="totalPeople"
                                                        id="option-2"
                                                        value="2"
                                                        checked={totalPeople === "2"}
                                                        onChange={handleRadioChange}
                                                    />
                                                    <label for="option-1" class="optionsss optionTicket1">
                                                        <div class="dot"></div>
                                                        <span>Pick 1 Pass</span>
                                                    </label>
                                                    <label for="option-2" class="optionsss optionTicket2 m-0">
                                                        <div class="dot"></div>
                                                        <span>Pick 2 passes</span>
                                                    </label>
                                                </div>
                                                <div className='eventSubmit'>

                                                    {
                                                        authenticUser ? (

                                                            <button type="submit" >
                                                                {
                                                                    loadingEvent ? ("loading") : ("Get your Pass")
                                                                }
                                                            </button>
                                                        ) :
                                                            (
                                                                <button type="submit" onClick={() => handleTravelClickOpen()}>Get your Pass</button>
                                                            )
                                                    }

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form> */}


                </div>
                <div className='eventFirstPara mt-5'>
                    <h3 className='mb-4'>Important Notification Regarding Your PEFA Award Event</h3>
                    <p>- We want to keep you informed about the status of your
                        PEFA Award Event submission. Please take note of the
                        following disclaimer for a smooth and successful event
                        processing:</p>
                    <p>- Your PEFA Award Event details have been diligently
                        submitted to the relevant authorities, and processing is
                        currently underway.</p>
                    <p>- Ensuring the accuracy of the details you provided,
                        including essential documents such as passport copies,
                        photo scans, and bank statements, is crucial for a
                        seamless processing experience.</p>
                    <p>- Be proactive in notifying the authorities promptly of
                        any changes or updates to your event details, as this
                        ensures that your submission remains up-to-date and in
                        compliance.</p>
                    <p>- Please be aware that the processing time may vary, and
                        there is a possibility of additional documentation or
                        information being requested during the thorough review
                        process.</p>
                    <p>- While we are committed to facilitating a smooth
                        experience, it's important to note that this information
                        does not guarantee the automatic approval of your PEFA
                        Award Event. The final decision is subject to the laws and
                        regulations set by the respective authorities.</p>
                    <p>- For the most accurate and up-to-date information on the
                        status of your PEFA Award Event, we encourage you to
                        consult directly with the relevant authorities.</p>
                    <p></p>
                </div>
            </div >




            {/* <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className='eventSuccessModalImage'>
                        <img src={click} alt="click" />
                    </div>
                    <p>Event Registered Sucessfully.</p>
                    <div className='eventSuccessModalButton'>
                        <button onClick={handleClose}>Done</button>
                    </div>
                </Box>
            </Modal>


            <Modal
                open={isLoginModalOpen}
                onClose={handleModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{ zIndex: "999999" }}
            >

                <div class="login-page">
                    <div class="container ">
                        <div class="row d-flex justify-content-center">
                            <div class="col-lg-5 ">
                                <div class="bg-white shadow roundedCustom">
                                    <div class="">
                                        <div class="col-md-12 ps-0  d-md-block">
                                            <div class="form-right leftLogin h-100 text-white text-center ">
                                                <CloseIcon className="closeIncon" onClick={handleModalClose} />
                                                <div className="loginImg logg">
                                                    <img src={loginnew} alt="loginnew" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-12 pe-0">
                                            <div class="form-left h-100 d-flex justify-content-center flex-column py-4 px-3">

                                                <div class="row g-4">
                                                    <div class="col-12" style={{ display: "flex", justifyContent: "center" }}>
                                                        <label className="mb-3">Please Login to Continue<span class="text-danger">*</span></label>

                                                    </div>
                                                    <div class="col-12" style={{ display: "flex", justifyContent: "center" }}>
                                                        <Login />
                                                    </div>
                                                </div>


                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal> */}

        </>
    )
}

export default Events;





