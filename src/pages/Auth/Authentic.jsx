import React, { useState, useEffect, useRef } from "react";
import "./authentic.scss";
import { Modal, Button, Input, DatePicker } from "antd";
import SecureStorage from "react-secure-storage";
import newlogo from "../../images/logoSky.svg";
import { apiURL } from "../../Constants/constant";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { loginAction, logoutAction } from "../../Redux/Auth/logIn/actionLogin";
import dayjs from "dayjs";
import { ipAction, tokenAction } from "../../Redux/IP/actionIp";
import { useNavigate } from "react-router-dom";

const Authentic = ({ isOpen, onClose, isLogoutOpen, onLogoutClose }) => {
    const [mobileEmail, setMobileEmail] = useState("");
    const reducerState = useSelector((state) => state);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // const userName = reducerState?.logIn?.loginData?.data?.result?.username;
    const status = reducerState?.logIn?.loginData?.data?.statusCode;
    const [validNumEmail, setValidNumEmail] = useState(true);
    const [token, setToken] = useState("");
    const [reqSignInData, setReqSignInData] = useState([]);
    const [otpLoader, setOtpLoader] = useState(false);
    const [otpSectionVisible, setOtpSectionVisible] = useState(false);
    const [loginPage, setLoginPage] = useState(false)
    const [otp, setOtp] = useState("");
    const [alreadyExist, setAlreadyExist] = useState(false);
    const [referralError, setReferralError] = useState(false);
    const [incorrectOtp, setIncorrectOtp] = useState(false);

    const handleChange = (e) => {
        const value = e.target.value.trim();
        setMobileEmail(value);
        const phoneRegex = /^\d{10}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValidInput = phoneRegex.test(value) || emailRegex.test(value);
        setValidNumEmail(!isValidInput);
    };

    const requestSignIn = async () => {
        setOtpLoader(true);

        let payload = {
            email: mobileEmail,
        };

        try {
            const res = await axios({
                method: "post",
                url: `${apiURL.baseURL}/skytrails/api/user/loginWithMailMobileLogin`,
                data: payload,
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const newToken = await res.data.result.token;
            SecureStorage.setItem("jwtToken", newToken);
            setReqSignInData(res?.data?.result);

            if (res.data.statusCode === 200 && res.data.result.firstTime === false) {
                setOtpLoader(false);
                setOtpSectionVisible(true);
            } else {
                setOtpLoader(false);
                setLoginPage(true);
            }
            setToken(newToken);

            // Call the WebOTP API after requesting sign-in
            getOtpFromWebOTP();

        } catch (error) {
            console.log('Error requesting sign-in:', error);
            setOtpLoader(false);
        }
    };

    // WebOTP API integration
    const getOtpFromWebOTP = async () => {
        if ('OTPCredential' in window) {
            try {
                console.log('Attempting to get OTP from WebOTP API...');
                const otpCredential = await navigator.credentials.get({ otp: { transport: ['sms'] } });
                if (otpCredential) {
                    console.log('OTP received from WebOTP API:', otpCredential.code);
                    setOtp(otpCredential.code);
                } else {
                    console.log('No OTP credential received.');
                }
            } catch (err) {
                console.error('WebOTP API error:', err);
            }
        } else {
            console.log('WebOTP API not supported in this browser.');
        }
    };

    const onChangeOtp = (e) => {
        if (e) {
            setOtp(e);

        } else {
            console.log('Invalid event object:', e);
        }
    };

    const sharedProps = {
        onChange: onChangeOtp,
        value: otp,
    };




    // verify otp 


    const verifyOTP = async (e) => {
        setOtpLoader(true);
        setIncorrectOtp(false);
        e.preventDefault();
        let payload = {
            otp: otp,
        };
        dispatch(loginAction(payload));
    };



    // first time user

    const validateForm = (formData) => {
        const errors = {};
        if (formData.fname.length < 4 || formData.fname.length > 26) {
            errors.fname = 'Enter valid name';
        }

        if (formData.phone.length < 10 || formData.phone.length > 20) {
            errors.phone = 'Enter Phone Number';
        }


        return errors;
    };


    const [errors, setErrors] = useState({
        fname: '',
        phone: '',
        referral: '',
    });
    const [formData, setFormData] = useState({
        fname: '',
        phone: '',
        referral: '',
    });

    const onInputChangeHandler = (e) => {
        setAlreadyExist(false)
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };


    // date picker
    const dateFormat = 'DD MMM, YY';
    const today = dayjs().format(dateFormat);
    const [newDepartDate, setNewDepartDate] = useState(today);

    const handleRangeChange = (date) => {
        if (date) {
            setNewDepartDate(dayjs(date).format(dateFormat));
        } else {
        }
    };

    const signUpUser = async () => {
        setAlreadyExist(false);
        setReferralError(false);
        setOtpLoader(true)

        const validationResult = validateForm(formData);
        if (Object.keys(validationResult).length > 0) {
            setErrors(validationResult);
            setOtpLoader(false);
            return;
        }
        let payloadotp = {
            otp: otp,
            fullName: formData.fname,
            dob: newDepartDate,
            email: formData.phone,
            referrerCode: formData.referral,
        };

        dispatch(loginAction(payloadotp));
    };



    useEffect(() => {
        setOtpLoader(false)
        if (
            reducerState?.logIn?.loginData?.data?.message ===
            "This mobile number already exists" ||
            reducerState?.logIn?.loginData?.data?.message ===
            "This email already exist"
        ) {
            setAlreadyExist(true);
        }
        if (
            reducerState?.logIn?.loginData?.data?.message ===
            "Incorect referal code,please provide valid code..!"
        ) {
            setReferralError(true);
        }
        if (reducerState?.logIn?.loginData?.message === "Incorrect OTP") {
            setIncorrectOtp(true);
        }
        if (reducerState?.logIn?.loginData?.message === "OTP expired") {
            setIncorrectOtp(true);
        }
    }, [
        reducerState?.logIn?.loginData,
        reducerState?.logIn?.loginData?.data?.message,
    ]);


    useEffect(() => {
        if (status === 200) {
            onClose()
        }
    }, [status]);





    // resend logic

    const [timeLeft, setTimeLeft] = useState(90); // 90 seconds

    useEffect(() => {
        let timer;

        if (loginPage || otpSectionVisible) {
            if (timeLeft > 0) {
                timer = setInterval(() => {
                    setTimeLeft((prevTime) => prevTime - 1);
                }, 1000);
            }
        }

        return () => clearInterval(timer);
    }, [timeLeft, loginPage, otpSectionVisible]);


    const handleResendOtp = async () => {
        setTimeLeft(90);
        let Payload = {
            email: mobileEmail,
        };

        try {
            const res = await axios({
                method: "PUT",
                url: `${apiURL.baseURL}/skytrails/api/user/resendOtp1`,
                data: Payload,
                headers: {
                    "Content-Type": "application/json",
                    token: token,
                },
            });
        } catch (error) {
            // console.warn("Error resending OTP:", error);
        }
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    // resend logic 



    const handleLogout = () => {

        dispatch(logoutAction());
        SecureStorage.removeItem("jwtToken");
        dispatch(ipAction());
        const payload = {
            EndUserIp: reducerState?.ip?.ipData,
        };
        setLoginPage(false)
        setReqSignInData([]);
        setAlreadyExist(false);
        setIncorrectOtp(false)
        setOtpSectionVisible(false)
        setMobileEmail("")
        setFormData({
            fname: '',
            phone: '',
            referral: '',
        });
        setOtp("")
        setTimeLeft(90)

        dispatch(tokenAction(payload));
        onLogoutClose()
        navigate("/");
    }


    const handleCancel = () => {

        setLoginPage(false)

        console.log("vhdsmlahjlsdahygjlkhvljkzft")
        setReqSignInData([]);
        setAlreadyExist(false);
        setIncorrectOtp(false)
        setMobileEmail("")
        setOtpSectionVisible(false)
        setFormData({
            fname: '',
            phone: '',
            referral: '',
        });
        setOtp("")
        setTimeLeft(90)

        onClose();


    };


    return (
        <div className="authenticMain">
            <Modal
                centered
                maskClosable={false}
                width={400}
                open={isOpen}
                onCancel={handleCancel}
                footer={null}
            >

                {
                    loginPage ?
                        (
                            <div className="authenticModalContent">
                                <img src={newlogo} alt="" />
                                <p>Signup to the Skytrails</p>
                                <div className="signInForm">



                                    <>
                                        <label for='inputEmail4'>
                                            Full Name
                                        </label>
                                        <input
                                            style={{ borderColor: errors.fname ? 'red' : '' }}
                                            type='text'
                                            name='fname'
                                            id='fname'
                                            className='form-control'
                                            value={formData.fname}
                                            onChange={onInputChangeHandler}
                                        />
                                    </>
                                    {

                                        !reqSignInData.email ?
                                            (<>
                                                {
                                                    alreadyExist ?
                                                        <label style={{ color: "red" }} for='inputEmail4' >
                                                            This email id is already Exist
                                                        </label> :
                                                        <label for='inputEmail4' >
                                                            Email ID
                                                        </label>
                                                }

                                                <input
                                                    style={{ borderColor: errors.phone ? 'red' : '' }}
                                                    type='email'
                                                    id='phone'
                                                    name='phone'
                                                    class='form-control'
                                                    value={formData.phone}
                                                    onChange={onInputChangeHandler}
                                                />
                                            </>)
                                            :
                                            (<>
                                                {
                                                    alreadyExist ?
                                                        <label style={{ color: "red" }} for='inputEmail4' >
                                                            This Phone is already Registered
                                                        </label> :
                                                        <label for='inputEmail4' >
                                                            Phone No
                                                        </label>
                                                }
                                                <input
                                                    style={{ borderColor: errors.phone ? 'red' : '' }}
                                                    type='tel'
                                                    name='phone'
                                                    id='phone'
                                                    class='form-control'
                                                    value={formData.phone}
                                                    onChange={onInputChangeHandler}
                                                />
                                            </>)
                                    }


                                    <>
                                        <label for='inputEmail4'>
                                            Referral Code (Optional)
                                        </label>
                                        <input
                                            style={{ borderColor: errors.referral ? 'red' : '' }}
                                            type='text'
                                            name='referral'
                                            id='referral'
                                            className='form-control'
                                            placeholder="DF1AF354"
                                            value={formData.referral}
                                            onChange={onInputChangeHandler}
                                        />
                                    </>


                                    <>
                                        <label for='inputPassword4' >
                                            Date of Birth
                                        </label>
                                        <DatePicker
                                            onChange={handleRangeChange}
                                            defaultValue={dayjs(today, dateFormat)}
                                            format={dateFormat}
                                            // disabledDate={disablePastDates}
                                            value={dayjs(newDepartDate, dateFormat)}
                                        />
                                    </>

                                    <>
                                        <label htmlFor="">OTP to verify {reqSignInData?.phone && reqSignInData?.phone}</label>
                                        <Input.OTP status={incorrectOtp ? "error" : ""} value={otp} variant="filled" {...sharedProps} />
                                    </>



                                    <div className="timer">
                                        {timeLeft > 0 ? (
                                            <span>Resend OTP in {formatTime(timeLeft)}</span>
                                        ) : (
                                            <span style={{ cursor: "pointer" }} onClick={handleResendOtp}>
                                                Resend OTP
                                            </span>
                                        )}
                                    </div>

                                </div>

                                <Button type="primary" loading={otpLoader} onClick={signUpUser} disabled={otp.length < 6 && formData?.fname == ""}>
                                    Sign Up
                                </Button>

                            </div>
                        )
                        :
                        (
                            <div className="authenticModalContent">
                                <img src={newlogo} alt="" />
                                <p>Login to the Skytrails</p>
                                <div className="signInForm">
                                    {otpSectionVisible ? (
                                        <>
                                            <label htmlFor="">OTP to verify {reqSignInData?.phone && reqSignInData?.phone}</label>
                                            <Input.OTP value={otp} variant="filled" {...sharedProps} />

                                            <div className="timer">
                                                {timeLeft > 0 ? (
                                                    <span>Resend OTP in {formatTime(timeLeft)}</span>
                                                ) : (
                                                    <span style={{ cursor: "pointer" }} onClick={handleResendOtp}>
                                                        Resend OTP
                                                    </span>
                                                )}
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <label htmlFor="">Email Id / Mobile Number</label>
                                            <input
                                                type="text"
                                                value={mobileEmail}
                                                onChange={(e) => {
                                                    setMobileEmail(e.target.value);
                                                    handleChange(e);
                                                }}
                                                name="phone"
                                                className="form-control"
                                            />
                                        </>
                                    )}
                                </div>
                                {
                                    otpSectionVisible ?
                                        (
                                            <Button type="primary" loading={otpLoader} onClick={verifyOTP} disabled={otp.length < 6}>
                                                Verify OTP
                                            </Button>
                                        ) :
                                        (

                                            <Button type="primary" loading={otpLoader} onClick={requestSignIn} disabled={validNumEmail}>
                                                Get OTP
                                            </Button>
                                        )
                                }
                            </div>
                        )
                }

            </Modal>


            <Modal
                centered
                maskClosable={false}
                width={400}
                open={isLogoutOpen}
                onCancel={onLogoutClose}
                footer={[
                    <Button className="logoutButton" key="Cancel" onClick={onLogoutClose}>Cancel</Button>,
                    <Button className="logoutButton" key="submit" type="primary" onClick={handleLogout}>Logout</Button>,
                ]}
            >
                <div className="logoutBox">
                    <h3>
                        Log out from The Skytrails
                    </h3>
                </div>

            </Modal>
        </div>
    );
};

export default Authentic;
