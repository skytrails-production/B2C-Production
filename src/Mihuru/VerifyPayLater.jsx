import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { apiURL } from '../Constants/constant';
import { useNavigate } from 'react-router-dom';
import { submitOtpRequests } from '../Redux/TNPL/tnpl';
import { Button } from "antd";


const VerifyPayLater = () => {

    const reducerState = useSelector((state) => state);
    const dispatch = useDispatch();
    const mihuruToken = reducerState?.TNPL?.tnplData?.data?.data?.data;
    const navigate = useNavigate()
    const [loader, setLoader] = useState(false);
    const [formData, setFormData] = useState({
        phoneOTP: "",
        emailOTP: "",
    })
    const [errors, setErrors] = useState({
        phoneOTP: "",
        emailOTP: "",
    })
    const onInputChangeHandler = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }


    const validateForm = (formData) => {
        const errors = {

        }
        if (formData.phoneOTP.length < 4 || formData.phoneOTP.length > 4) {
            errors.phoneOTP = "Enter valid phone Otp"
        }
        if (formData.emailOTP.length < 4 || formData.emailOTP.length > 4) {
            errors.emailOTP = "Enter valid email Otp"
        }


        return errors;
    };


    const onFormSubmit = async (e) => {
        e.preventDefault();
        setLoader(true)
        const validationResult = validateForm(formData);
        if ((Object.keys(validationResult).length > 0)) {
            setErrors(validationResult);
            setLoader(false)
            return;
        }

        const payload = {
            "mobileNo": reducerState?.TNPL?.tnplUserData?.phone,
            "email": reducerState?.TNPL?.tnplUserData?.email,
            "mobileOTP": formData.phoneOTP,
            "emailOTP": formData.emailOTP
        }

        try {
            const res = await axios({
                method: 'post',
                url: `${apiURL.baseURL}/skyTrails/mihuru/submitotp`,
                data: payload,
                headers: {
                    'Content-Type': 'application/json',
                    mihiruToken: mihuruToken,
                },
            });

            if (res?.data?.error !== null) {
                dispatch(submitOtpRequests(res?.data?.data))
                navigate("/payLaterDetails/verifyOtp/userCredential")
            }

        } catch (error) {
            setLoader(false);
            console.log('API Error:', error);
        } finally {
            setLoader(false)
        }
    }

    // Retrieve the stored object from sessionStorage
    const storedResponse = sessionStorage.getItem("response_msg");
    const parsedResponse = JSON.parse(storedResponse);


    return (
        <div>
            <div className='my-5'>
                <div className="BlogheadingContainer">
                    <h3>Verify OTP</h3 >
                </div >

                <div className='container'>

                    <h3 className='payLaterH3'>{parsedResponse?.data?.response_msg}</h3>

                    <form class="row g-3 " onSubmit={onFormSubmit}>

                        <div class="col-md-4 offset-lg-2 ">
                            <label for="inputPassword4" class="form-label">Verify Mobile OTP</label>
                            <input style={{ borderColor: errors.phoneOTP ? 'red' : '' }} type="text" id="phoneOTP" name="phoneOTP" class="form-control" onChange={onInputChangeHandler} />
                        </div>
                        <div class="col-md-4">
                            <label for="inputPassword4" class="form-label">Verify Email OTP</label>
                            <input style={{ borderColor: errors.emailOTP ? 'red' : '' }} type="text" id="emailOTP" name="emailOTP" class="form-control" onChange={onInputChangeHandler} />
                        </div>



                        <div class="col-4 offset-lg-4 loaderButtonPayLater" >
                            <Button
                                className="multiFormButton"
                                onClick={onFormSubmit}
                                loading={loader}
                            >
                                Submit
                            </Button>
                        </div>


                    </form>
                </div>
            </div>
        </div>
    )
}

export default VerifyPayLater
