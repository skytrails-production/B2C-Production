import React, { useState, useEffect, useRef, useCallback } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "./Login.css";
import loginImg from "../images/login.png";
import loginOtp from "../images/login-01.jpg";
import { LoginButton } from "../utility/CSS/Button/Button";
import CloseIcon from "@mui/icons-material/Close";
import { loginAction, logoutAction, LoginFail } from "../Redux/Auth/logIn/actionLogin";
// import { loginAction, logoutAction, userData } from "../Redux/Auth/logIn/actionLogin";
import EventIcon from "@mui/icons-material/Event";
// import PhoneIcon from "@mui/icons-material/Phone";
import PasswordIcon from "@mui/icons-material/Password";
import "./card.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { apiURL } from "../Constants/constant";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import LogoutIcon from "@mui/icons-material/Logout";
import question from "../images/question.png";

//import toast, { Toaster } from 'react-hot-toast';
import { MdLogout } from "react-icons/md";
import { motion } from "framer-motion";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
import { validateName, validateEmail, validatePhoneNumber } from "../utility/validationFunctions"
import { ModeOutlined } from "@mui/icons-material";
import Alert from '@mui/material/Alert';
// import { setTimeout } from "timers/promises";
const MySwal = withReactContent(Swal);

export default function LoginForm() {
  const dispatch = useDispatch();
  const [subSignUp, setSignUp] = useState(false);
  const [subSignUpp, setSignUpp] = useState(false);
  function getTwelveYearsAgoDate() {
    // Get the current date
    let currentDate = new Date();

    // Subtract 12 years from the current date
    currentDate.setFullYear(currentDate.getFullYear() - 12);

    // Format the date as 'yyyy-mm-dd'
    let year = currentDate.getFullYear();
    let month = String(currentDate.getMonth() + 1).padStart(2, '0');
    let day = String(currentDate.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  // Example usage
  let twelveYearsAgoDate = getTwelveYearsAgoDate();
  // console.log(twelveYearsAgoDate, "twelveYearsAgoDate")





  const [numvalidation, setNumvalidation] = useState(false);
  const [open, setOpen] = useState(false);
  const [openSignUpModal, setOpenSignUpModal] = useState(false);
  const [openOtpModal, setOpenOtpModal] = useState(false);
  const [mobileNumber, setMobileNumber] = useState();

  const [name, setName] = useState("");
  const [finalDate, setFinalDate] = useState("");
  const [otp, setOtp] = useState("");
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [loader, setLoader] = useState(false)
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setDisableButton(false);
    setMobileNumber("")
    setOtp("");
    otpvalidReset();
    setSignUpp(false);
    setSignUp(false);
    setNumvalidation(false)
  }

  const handleOtpModalOpen = () => setOpenOtpModal(true);
  const handleOtpModalClose = () => setOpenOtpModal(false);
  const handleSignUpModalOpen = () => setOpenSignUpModal(true);
  const handleSignUpModalClose = () => {
    setOpenSignUpModal(false);
    setEmail("");
    setName("");
    setLoader(false)
    setFinalDate("");



  }
  const reducerState = useSelector((state) => state);
  const userName = reducerState?.logIn?.loginData?.data?.result?.username;
  // const userDataS = reducerState?.logIn?.loginData?.data?.result;
  // const data = reducerState?.logIn?.loginData?.data;
  const status = reducerState?.logIn?.loginData?.data?.statusCode;
  // const AuthenticUser = reducerState?.logIn?.isLogin;


  // console.log(reducerState, "reducer state")

  // resend otp part
  const [countdown, setCountdown] = useState(0);
  const [disableButton, setDisableButton] = useState(false);
  // const [disableButtonVerifyOPT, setDisableButtonVerifyOPT] = useState(false);
  const [disableResendButton, setDisableResendButton] = useState(false);
  const [error, setError] = useState(true);
  const [sub, setSub] = useState(false);
  // const [apiCallCount,setOptCallCount]=useState(0);
  const [numError, setNumError] = useState(true)
  const [otpError, setOTPError] = useState(true);
  const navigate = useNavigate();
  const [isMenu, setIsMenu] = useState(false);
  const [longinError, setLoginError] = useState(false)


  const Typewriter = () => {
    const [text, setText] = useState('...');
    const [index, setIndex] = useState(0);

    useEffect(() => {
      const intervalId = setInterval(() => {
        if (index === text.length) {
          setIndex(0);
        } else {
          setIndex((prevIndex) => prevIndex + 1);
        }
      }, 400);

      return () => clearInterval(intervalId);
    }, [index, text]);

    return (
      <div>
        Please wait<span>{text.substring(0, index)}</span>
      </div>
    );
  };

  // mobile number validation 

  const isValidMobileNumber = (mobileNumber) => {
    return /^[6-9]\d{9}$/.test(mobileNumber);
  };

  const requestSignInSignInCheck = () => {
    if (!isValidMobileNumber(mobileNumber)) {
      setNumError(true);

    } else {
      setNumError(false);
    }
  };

  useEffect(() => {
    requestSignInSignInCheck();
  }, [mobileNumber])

  // const otpToken = reducerState?.logIn?.loginData?.data?.result?.token;



  // opt validation 

  const isValidOTP = (otp) => {
    return /^[0-9]\d{5}$/.test(otp);
  };

  const requestOTPCheck = () => {
    if (!isValidOTP(otp)) {
      setOTPError(true);
      return false

    } else {
      setOTPError(false);
      return true
    }
  };

  useEffect(() => {
    requestOTPCheck();
  }, [otp])


  const requestSignIn = async () => {
    // event.preventDefault();

    setDisableButton(true);
    let payload = {
      mobileNumber: mobileNumber,
    };

    try {
      const res = await axios({
        method: "post",
        url: `${apiURL.baseURL}/skytrails/api/user/mobileLogin`,

        data: payload,
        headers: {
          "Content-Type": "application/json",
        },
      });

      const newToken = await res.data.result.token;
      sessionStorage.setItem("jwtToken", newToken);
      // console.log(newToken, res.data, res.data.result.otpVerified, "new token")

      if (res.data.statusCode === 200 && res.data.result.firstTime === false) {
        handleClose();
        handleOtpModalOpen();

        // resend otp

        setDisableResendButton(true);
        setCountdown(59);
      } else {
        handleClose();
        handleSignUpModalOpen();

        // resend otp

        setDisableResendButton(true);
        setCountdown(59);
      }
      setToken(newToken);

    } catch (error) {
      // console.log('error', error);
      setDisableButton(false)
      setLoginError(true)
      // useEffect(() => {
      setTimeout(() => {
        setLoginError(false)
      }, 1000);
      // }, [longinError])
    }




  };



  //  if user is already registered

  const verifyOTP = async (e) => {
    e.preventDefault();
    let payload = {
      otp: otp,
    };
    dispatch(loginAction(payload));


  };

  // first time user data

  const signUpUser = async () => {
    // e.preventDefault();

    let payloadotp = {
      otp: otp,
      fullName: name,
      dob: finalDate,
      email: email,
    };

    dispatch(loginAction(payloadotp));


  };

  useEffect(() => {
    if (status === 200) {
      handleOtpModalClose();
      handleSignUpModalClose();
      setDisableButton(false);
    } else {
      setDisableButton(false);
    }
  }, [status]);

  // handle the resend otp part

  const handleResendOtp = async () => {
    let Payload = {
      mobileNumber: mobileNumber,
    };

    setDisableResendButton(true);
    setCountdown(59);

    try {
      const res = await axios({
        method: "PUT",
        url: `${apiURL.baseURL}/skytrails/api/user/resendOtp`,
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



  // Define the countdown update function using useCallback
  const handleCountdownUpdate = useCallback(() => {
    setCountdown((prev) => {
      if (prev > 0) {
        return prev - 1;
      } else {
        setDisableResendButton(false);
        clearInterval(timerRef.current);
        return 0;
      }
    });
  }, [setCountdown, setDisableResendButton]);

  const timerRef = useRef();

  useEffect(() => {
    clearInterval(timerRef.current);

    timerRef.current = setInterval(handleCountdownUpdate, 1000);

    return () => clearInterval(timerRef.current);
  }, [handleCountdownUpdate, openOtpModal, handleResendOtp, openSignUpModal]);

  const handleDropdown = () => {
    setIsMenu(!isMenu);
  };

  // handle the resend otp part


  const signupFromValidation = () => {
    if (validateName(name) && validateEmail(email) && requestOTPCheck() && finalDate !== "") {
      setSignUp(true);

    }
    else {
      setSignUp(false);
    }
    // console.log(name, finalDate, email, otp, subSignUp)
    return
  }
  useEffect(() => {
    signupFromValidation()

  }, [email, mobileNumber, otp])
  const handleLogout = () => {
    MySwal.fire({
      html: `
        <div class="additional-content">
          <div class="swal-html-inner">
            <span class="swal-close-button"><img src="${question}" alt="Close Image"></span>
            <span class="swal-title-text">Are you sure you want to logout?</span>
          </div> 
        </div>`,
      showCancelButton: true,
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
      customClass: {
        confirmButton: "swal-confirm-button",
        cancelButton: "swal-cancel-button",
        title: "swal-title",
        popup: "swal-popup with-shadow",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logoutAction());
        setIsMenu(false);
      }
    });
  };

  // if (status === 200) {
  //   loginSuccess();
  // }
  useEffect(() => {
    // console.warn(reducerState?.logIn?.loginData, "error,sub ndbfjhdfbvufbyvubfyuv")
    if (reducerState?.logIn?.loginData?.statusCode !== 200 && reducerState?.logIn?.loginData?.statusCode !== undefined) {
      setError(false)
      setLoader(false)
    }
  }, [reducerState?.logIn?.loginData])
  function otpvalidReset() {
    if (!error) {
      setError(true);
      dispatch(LoginFail());
    }
  }

  return (
    <div>
      {/* <div><Toaster /></div> */}

      {status === 200 ? (

        <div className="position-relative account-btn" onClick={handleDropdown}>
          <p className="d-none d-sm-flex" variant="subtitle3" color="#fff">
            Hi {userName}
            <ExpandMoreIcon sx={{ color: "#fff", marginLeft: "8px" }} />
          </p>
          {/* for mobile design  */}

          <p className="d-flex d-sm-none"><AccountCircleIcon sx={{ color: "black", marginRight: "8px" }} /></p>

          {/* for mobile design  */}
          {isMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="position-absolute dropdownLogin bg-gray-50 shadow rounded-lg d-flex flex-column align-items-end"
            // style={{ left: 0 }}
            >
              <p
                className="px-4 py-2 d-flex align-items-center cursor-pointer gap-3 cursor-pointer hover-bg-slate-100 transition-all duration-100 ease-in-out"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/bookinghistory")}
              >
                Booking History
              </p>

              <p
                className="px-4 py-2 d-flex align-items-center gap-3 cursor-pointer hover-bg-slate-100 transition-all duration-100 ease-in-out"
                style={{ cursor: "pointer" }}
                onClick={handleLogout}
              >
                Logout <MdLogout />
              </p>
            </motion.div>
          )}
        </div>
      ) : (
        <div className="loginButt" onClick={handleOpen}>
          {/* for mobile device  */}

          <p className="d-flex d-sm-none" variant="subtitle3" color="#fff">
            <AccountCircleIcon sx={{ color: "black", marginRight: "8px" }} />
          </p>
          {/* for mobile device  */}


          <p className="d-none d-sm-block" variant="subtitle3" color="#fff">
            <AccountCircleIcon sx={{ color: "white", marginRight: "8px" }} />
            Login / Signup
          </p>
        </div>
      )}

      {/* initial modal for phone number */}

      <Modal
        open={open}
        onClose={() => { handleClose(); }}
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
                        {/* <h2 class="fs-1" >Send OTP</h2> */}
                        <CloseIcon
                          className="closeIncon"
                          onClick={() => { handleClose() }}
                        />
                        <div className="loginImg logg">
                          <img src={loginOtp} alt="loginGif" />
                        </div>
                      </div>
                    </div>
                    <div class="col-md-12 pe-0">
                      <div class="form-left h-100 d-flex justify-content-center flex-column py-4 px-3">
                        <div>
                          <div class="row g-4">
                            <div class="col-12">
                              <label className="mb-3">
                                Enter Mobile Number
                                <span class="text-danger">*</span>
                              </label>

                              {/* {
                                numError && <p>Please Enter Valid Mobile Number</p>
                              } */}
                              <div class="input-group">
                                <div class="input-group-text">
                                  {/* <i>
                                    <PhoneIcon />
                                  </i> */}
                                  +91
                                </div>
                                <input
                                  type="tel"
                                  value={mobileNumber}
                                  onChange={(e) => {
                                    setMobileNumber(e.target.value)
                                    requestSignInSignInCheck()
                                  }
                                  }
                                  name="phone"
                                  class="form-control"
                                  placeholder="Mobile Number"
                                />
                                {
                                  numvalidation && !validatePhoneNumber(mobileNumber) &&
                                  <div className="input-group-absolute">
                                    Enter a valid 10-digit number
                                  </div>
                                }
                                {
                                  longinError && <div className="network-error-modal">

                                    <Alert severity="error">Network Error</Alert>
                                  </div>
                                }

                              </div>
                            </div>
                            <div onClick={() => setNumvalidation(true)} class="col-12">


                              {/* {disableButton ? <button
                                class="btn btn-primaryLogin px-4 float-end mt-2"><Typewriter /></button>
                                : numError ? <button type="submit"
                                  onClick={requestSignIn} class="btn btn-primaryLogin px-4 float-end mt-2" disabled={!mobileNumber}>Send OTP</button>
                                  : <button
                                    class="btn btn-primaryLogin px-4 float-end mt-2" disabled>Send OTP</button>
                              } */}

                              {disableButton ? (
                                <button
                                  className="btn btn-primaryLogin px-4 float-end mt-2"

                                >
                                  <Typewriter />
                                </button>
                              ) : (
                                <button
                                  type="submit"
                                  onClick={requestSignIn}
                                  className="btn btn-primaryLogin px-4 float-end mt-2"
                                  disabled={numError}
                                >
                                  Send OTP
                                </button>
                              )}

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
        </div>
      </Modal>

      {/* verify otp modal */}

      <Modal
        open={openOtpModal}
        onClose={handleOtpModalClose}
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
                    <div class="col-md-12 ps-0 d-md-block">
                      <div class="form-right leftLogin h-100 text-white text-center">
                        <CloseIcon
                          className="closeIncon"
                          onClick={handleOtpModalClose}
                        />
                        <div className="loginImg logg">
                          <img src={loginOtp} alt="loginGif" />
                        </div>
                      </div>
                    </div>
                    <div class="col-md-12 pe-0">
                      <div class="form-left h-100 py-4 px-3">
                        <div>
                          <div class="row g-4">
                            <div class="col-12">
                              {error ?
                                <label className="mb-3">
                                  Enter OTP
                                </label> :
                                <label className="mb-3">
                                  <span class="text-danger">Invalid OTP</span>
                                </label>}
                              {/* <label className="mb-3">
                                Enter OTP<span class="text-danger"></span>
                              </label>  */}
                              :
                              <div class="input-group ">
                                <div class={`input-group-text ${!error && "invalidOptLogin"} `}>
                                  <i>
                                    <PasswordIcon />
                                  </i>
                                </div>
                                <input
                                  type="text"
                                  value={otp}
                                  onChange={(e) => {
                                    setOtp(e.target.value);
                                    requestOTPCheck();
                                    otpvalidReset();
                                  }}

                                  // onChange={(e) => {
                                  //   setMobileNumber(e.target.value)
                                  //   requestSignInSignInCheck()
                                  // }
                                  // }
                                  name="phone"
                                  class={`form-control  ${!error && "invalidOptLogin"}`}
                                  placeholder="Enter OTP"
                                  autoComplete="off"
                                />
                              </div>
                            </div>
                            <div className="col-12 mt-3">
                              {disableResendButton ? (
                                <p className="">
                                  Resend OTP in {Math.floor(countdown / 60)}:
                                  {countdown % 60} seconds
                                </p>
                              ) : (
                                <p
                                  className=""
                                  onClick={handleResendOtp}
                                  style={{ cursor: "pointer", color: "Blue" }}
                                >
                                  Resend OTP
                                </p>
                              )}
                            </div>
                            {
                              loader ?
                                <div class="col-12 mt-3">

                                  <button
                                    // type="submit"
                                    // onClick={(e) => { setSub(true); verifyOTP(e) }}
                                    class="btn btn-primaryLogin px-4 float-end mt-2"
                                  // disabled={otpError}
                                  >
                                    <Typewriter />
                                  </button>

                                </div> :
                                <div class="col-12 mt-3">

                                  <button
                                    // type="submit"
                                    onClick={(e) => { setSub(true); verifyOTP(e); setLoader(true) }}
                                    class="btn btn-primaryLogin px-4 float-end mt-2"
                                    disabled={otpError}
                                  >
                                    Verify OTP
                                  </button>
                                  {/* {disableButtonVerifyOPT ? <button
                             <button
                                 // type="submit"
                                 onClick={()=>{verifyOTP();setDisableButtonVerifyOPT(true)}}
                                 class="btn btn-primaryLogin px-4 float-end mt-2"
                               >
                                 Verify OTP
                               </button>//  type="submit"
                               class="btn btn-primaryLogin px-4 float-end mt-2"><Typewriter /></button>
                               : 
                             } */}
                                </div>
                            }


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
      </Modal>

      {/* first time user modal  */}

      <Modal
        open={openSignUpModal}
        onClose={handleSignUpModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ zIndex: "999999" }}
      >
        <div class="login-page">
          <div class="container ">
            <div class="row">
              <div class="col-lg-10 offset-lg-1">
                <div class="bg-white shadow roundedCustom">
                  <div class="row">
                    <div class="col-md-7 pe-0">
                      <div class="form-left h-100 py-5 px-5">
                        <div>
                          <div class="row g-4">
                            <div class="col-12">
                              <label>
                                Enter Your Name
                                <span class="text-danger">*</span>
                              </label>
                              <div class="input-group">
                                <div class="input-group-text">
                                  <i>
                                    <AccountCircleIcon />
                                  </i>
                                </div>
                                <input
                                  type="text"
                                  value={name}
                                  onChange={(e) => setName(e.target.value)}
                                  name="phone"
                                  class="form-control"
                                  placeholder="Enter Name"
                                />
                                {subSignUpp && !validateName(name) && <div className="input-group-absolute">
                                  Enter a Valid Name
                                </div>}
                              </div>
                            </div>
                            <div class="col-12">
                              <label>
                                Enter Your Email
                                <span class="text-danger">*</span>
                              </label>
                              <div class="input-group">
                                <div class="input-group-text">
                                  <i>
                                    <AccountCircleIcon />
                                  </i>
                                </div>
                                <input
                                  type="email"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                  name="email"
                                  class="form-control"
                                  placeholder="Enter Email"
                                />
                                {
                                  subSignUpp && !validateEmail(email) &&
                                  <div className="input-group-absolute">
                                    Enter a valid email
                                  </div>
                                }
                              </div>
                            </div>
                            <div class="col-12">
                              <label>
                                Enter Age<span class="text-danger">*</span>
                              </label>
                              <div class="input-group">
                                <div class="input-group-text">
                                  <i>
                                    <EventIcon />
                                  </i>
                                </div>
                                <input
                                  type="date"
                                  value={finalDate}
                                  onChange={(e) => setFinalDate(e.target.value)}
                                  name="phone"
                                  class="form-control"
                                  placeholder="Enter OTP"
                                  max={twelveYearsAgoDate}
                                //  readOnly
                                //  max="1979-12-31"
                                />
                                {subSignUpp && finalDate === "" &&

                                  <div className="input-group-absolute">
                                    Please select a date
                                  </div>
                                }
                              </div>
                            </div>
                            <div class="col-12">
                              {error ?
                                <label className="mb-3">
                                  Enter OTP
                                </label> :
                                <label className="mb-3">
                                  <span class="text-danger">Invalid OTP</span>
                                </label>}
                              <div class="input-group">
                                <div class="input-group-text">
                                  <i>
                                    <PasswordIcon />
                                  </i>
                                </div>
                                <input
                                  type="text"
                                  // value={mobileNumber}
                                  onChange={(e) => {
                                    setOtp(e.target.value);
                                    otpvalidReset();
                                  }}
                                  name="phone"
                                  class="form-control"
                                  placeholder="Enter OTP"


                                />
                                {subSignUpp && !isValidOTP(otp) &&

                                  <div className="input-group-absolute">
                                    Enter a valid 6-digit number
                                  </div>
                                }
                              </div>
                            </div>
                            <div className="col-12 mt-3">
                              {disableResendButton ? (
                                <p
                                  className=""
                                  title="wait"
                                  style={{ cursor: "pointer", color: "Blue" }}
                                >
                                  Resend OTP in {Math.floor(countdown / 60)}:
                                  {countdown % 60} seconds
                                </p>
                              ) : (
                                <p
                                  className=""
                                  onClick={handleResendOtp}
                                  style={{ cursor: "pointer", color: "Blue" }}
                                >
                                  Resend OTP
                                </p>
                              )}
                            </div>
                            {
                              subSignUp ?

                                <div class="col-12 mt-3">
                                  {
                                    loader ? <button
                                      // type="submit"
                                      // onClick={signUpUser}
                                      className={`btn btn-primaryLogin px-4 float-end mt-2 ${!subSignUp && "invalidOptLogin"}`}
                                    >
                                      {<Typewriter />}
                                    </button> :
                                      <button
                                        // type="submit"
                                        onClick={() => {
                                          signUpUser();
                                          setLoader(true);
                                        }

                                        }
                                        className={`btn btn-primaryLogin px-4 float-end mt-2 `}
                                      >
                                        Sign up
                                      </button>
                                  }

                                </div> :

                                <div class="col-12 mt-3 ">
                                  <button
                                    // type="submit"
                                    onClick={() => setSignUpp(true)}
                                    className={`btn btn-primaryLogin px-4 float-end mt-2 `}
                                    id="logInDisabled"
                                  >
                                    Sign up
                                  </button>
                                </div>


                            }

                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="col-md-5 ps-0 d-none d-md-block">
                      <div class="form-right leftLogin h-100 text-white text-center pt-5">
                        <h2 class="fs-1">Sign Up</h2>
                        <CloseIcon
                          className="closeIncon"
                          onClick={handleSignUpModalClose}
                        />
                        <div className="loginImg">
                          <img src={loginImg} alt="login" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
