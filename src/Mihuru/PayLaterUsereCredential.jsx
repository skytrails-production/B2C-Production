import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { apiURL } from '../Constants/constant';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { tnplPlanGeneratorRequest } from '../Redux/TNPL/tnpl';

const PayLaterUsereCredential = () => {

    const reducerState = useSelector((state) => state);
    const token = reducerState?.TNPL?.verifiedOTPData?.data?.sessionId
    const dispatch = useDispatch();

    const navigate = useNavigate()
    const generatedPlans = reducerState?.TNPL?.planDetails?.data?.plan_details;
    const [loader, setLoader] = useState(false);
    const [formData, setFormData] = useState({
        panID: "",
        pincode: "",
        date: "",
    })
    const [errors, setErrors] = useState({
        panID: "",
        pincode: "",

    })

    const [errorData, setErrorData] = useState(false);
    const onInputChangeHandler = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }


    const validateForm = (formData) => {
        const errors = {

        }
        if (formData.pincode.length < 6 || formData.pincode.length > 6) {
            errors.pincode = "Enter valid phone Otp"
        }
        const regexPanValidation = /[A-Z]{5}[0-9]{4}[A-Z]{1}/;

        if (!regexPanValidation.test(formData.panID)) {
            errors.panID = "Enter Valid PAN ID";
        }
        return errors;
    };


    const flyNowPayLater = generatedPlans?.filter((item) => item?.plan_name === "Fly Now Pay Later")

    useEffect(() => {

        if (reducerState?.TNPL?.planDetails?.error === null) {

            window.location.href = `${flyNowPayLater?.[0]?.navigate_url}`;
        }

    }, [reducerState?.TNPL?.planDetails?.data?.plan_details])


    const onFormSubmit = async (e) => {
        e.preventDefault();
        setLoader(true);

        const validationResult = validateForm(formData);
        if ((Object.keys(validationResult).length > 0)) {
            setErrors(validationResult);
            setLoader(false)
            return;
        }

        const payload = {
            panid: formData.panID,
            pincode: formData.pincode,
            dob: dayjs(formData.date).format("YYYY-MM-DD"),
            partnerCallbackUrl: "theskytrails.com"

        }

        try {
            const res = await axios({
                method: 'post',
                url: `${apiURL.baseURL}/skyTrails/mihuru/travelplangenerator`,
                data: payload,
                headers: {
                    'Content-Type': 'application/json',
                    mihiruToken: token,
                },
            });
            console.log(res, "fvkdsajfgkldsanfgkafgndlk")

            if (res?.data?.data?.error === null) {
                setErrorData(false);
                dispatch(tnplPlanGeneratorRequest(res?.data?.data))

                console.log("hiii")
            } else {
                setErrorData(true);
            }

        } catch (error) {
            console.log('API Error:', error);
            setErrorData(true);
        } finally {
            setLoader(false)
        }
    }


    return (
        <div>
            <div className='my-5'>
                <div className="BlogheadingContainer">
                    <h3>User Information</h3 >
                </div >

                <div className='container'>

                    {/* <h3>{parsedResponse?.response_msg}</h3> */}

                    <form class="row g-3 " onSubmit={onFormSubmit}>

                        <div class="col-md-4  ">
                            <label for="inputPassword4" class="form-label">Enter PAN Number</label>
                            <input style={{ borderColor: errors.panID ? 'red' : '' }} type="text" id="panID" name="panID" class="form-control" onChange={onInputChangeHandler} />
                        </div>
                        <div class="col-md-4">
                            <label for="inputPassword4" class="form-label">Enter Pincode</label>
                            <input style={{ borderColor: errors.pincode ? 'red' : '' }} type="text" id="pincode" name="pincode" class="form-control" onChange={onInputChangeHandler} />
                        </div>
                        <div class="col-md-4">
                            <label for="inputPassword4" class="form-label">Date of Birth</label>
                            <input type="date" id="date" name="date" class="form-control" onChange={onInputChangeHandler} />
                        </div>

                        {
                            errorData &&
                            <div className="col-12">
                                <p style={{ color: "#e73c34" }}>Service unavailable for this pincode </p>
                            </div>
                        }


                        {
                            loader ? <div class="col-4 offset-lg-4 loaderButtonPayLater" >
                                <span className='loaderPaylater'></span>
                            </div>
                                :
                                <div class="col-4 offset-lg-4 loaderButtonPayLater" >
                                    <button type="submit" class="btn">Submit</button>
                                </div>

                        }
                    </form>
                </div>
            </div>
        </div>
    )
}

export default PayLaterUsereCredential
