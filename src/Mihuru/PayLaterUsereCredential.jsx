import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { apiURL } from '../Constants/constant';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { tnplPlanGeneratorRequest } from '../Redux/TNPL/tnpl';
import { DatePicker, Button } from "antd";

const PayLaterUsereCredential = () => {

    const reducerState = useSelector((state) => state);
    const token = reducerState?.TNPL?.verifiedOTPData?.data?.sessionid
    const dispatch = useDispatch();



    // const navigate = useNavigate()
    const generatedPlans = reducerState?.TNPL?.planDetails?.data?.plan_details;
    const [loader, setLoader] = useState(false);
    const [formData, setFormData] = useState({
        panID: "",
        pincode: "",
        date: "",
        gender: "",
    })
    const [errors, setErrors] = useState({
        panID: "",
        pincode: "",
        gender: ""

    })

    const [errorData, setErrorData] = useState(false);
    const onInputChangeHandler = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }


    // Date picker 
    const dateFormat = "DD MMM, YYYY";
    const eighteenYearsAgo = dayjs().subtract(18, 'year').format(dateFormat);
    const [newDepartDate, setNewDepartDate] = useState(eighteenYearsAgo);

    const handleRangeChange = (date) => {
        if (date) {
            setNewDepartDate(dayjs(date).format(dateFormat));
        } else {
            console.log("Selection cleared");
        }
    };

    const disablePastDates = (current) => {
        return current && current > dayjs().subtract(18, 'year');
    };
    // Date picker 


    const validateForm = (formData) => {
        const errors = {

        }
        if (formData.pincode.length < 6 || formData.pincode.length > 6) {
            errors.pincode = "Enter valid phone Otp"
        }
        if (formData.gender == "") {
            errors.gender = "Select Gender"
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
            dob: dayjs(newDepartDate).format("YYYY-MM-DD"),
            gender: formData.gender,
            partnerCallbackUrl: "https://jzcckdnf-3000.inc1.devtunnels.ms/mihurupaymentsuccess"

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
            // console.log(res, "fvkdsajfgkldsanfgkafgndlk")

            if (res?.data?.data?.error === null) {
                setErrorData(false);
                dispatch(tnplPlanGeneratorRequest(res?.data?.data))

                // console.log("hiii")
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

                    <form class="row g-3 ">

                        <div class="col-md-4  ">
                            <label for="inputPassword4" class="form-label">Enter PAN Number</label>
                            <input style={{ borderColor: errors.panID ? 'red' : '' }} type="text" id="panID" name="panID" class="form-control" onChange={onInputChangeHandler} />
                        </div>
                        <div class="col-md-4">
                            <label for="inputPassword4" class="form-label">Enter Pincode</label>
                            <input style={{ borderColor: errors.pincode ? 'red' : '' }} type="text" id="pincode" name="pincode" class="form-control" onChange={onInputChangeHandler} />
                        </div>
                        <div className="col-md-4">
                            <div className='datePickMihuru'>
                                <label htmlFor="date" className="form-label">Date of Birth</label>
                                <DatePicker
                                    onChange={handleRangeChange}
                                    defaultValue={dayjs(eighteenYearsAgo, dateFormat)}
                                    format={dateFormat}
                                    disabledDate={disablePastDates}
                                />
                            </div>
                        </div>

                        <div class="col-md-12 genderPayLater">
                            <label class="form-label">Gender</label>
                            <div>
                                <input type="radio" id="male" name="gender" value="Male" onChange={onInputChangeHandler} />
                                <label for="male">Male</label>
                            </div>
                            <div>
                                <input type="radio" id="female" name="gender" value="Female" onChange={onInputChangeHandler} />
                                <label for="female">Female</label>
                            </div>

                        </div>
                        {
                            errors.gender &&
                            <div className="col-12">
                                <p style={{ color: "#e73c34" }}>Please Select Gender </p>
                            </div>
                        }

                        {
                            errorData &&
                            <div className="col-12">
                                <p style={{ color: "#e73c34" }}>Service unavailable for this pincode </p>
                            </div>
                        }



                        <div class="col-4 offset-lg-4 " >
                            {/* <button type="submit" class="btn">Submit</button> */}
                            {/* <Button type='submit' className="returnButton" style={{ padding: "8px 36px", height: "unset" }} loading={loader}>Search</Button> */}
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

export default PayLaterUsereCredential
