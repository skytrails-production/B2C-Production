import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { apiURL } from './Constants/constant';

const RandomPayment = () => {

    const reducerState = useSelector((state) => state);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const apiUrlPayment = `${apiURL.baseURL}/skyTrails/website/payment`;
    const [loader, setLoader] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        amount: "",
    })
    const [errors, setErrors] = useState({
        name: "",
        phone: "",
        email: "",
        amount: "",
    })
    const onInputChangeHandler = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }


    const validateForm = (formData) => {
        const errors = {};

        if (formData.name.length < 4 || formData.name.length > 35) {
            errors.name = "Enter valid name"
        }
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailRegex.test(formData.email)) {
            errors.email = "Enter Valid Email"
        }
        if (formData.phone.length < 10 || formData.phone.length > 10) {
            errors.phone = "Enter valid number"
        }
        if (formData.amount == 0 || formData.amount < 0) {
            errors.amount = "Enter valid number"
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
        handlePayment();

    }

    const tax = formData.amount * 0.02;

    const handlePayment = async () => {


        const payload = {
            firstname: formData.name,
            phone: formData.phone,
            amount: Number(formData.amount) + Number(tax),
            email: formData.email,
            productinfo: "ticket",
            bookingType: "RandomPayment",
            surl: `${apiURL.baseURL}/skyTrails/website/successVerifyApi?merchantTransactionId=`,
            furl: `${apiURL.baseURL}/skyTrails/website/paymentFailure?merchantTransactionId=`,
        };


        try {
            const response = await fetch(apiUrlPayment, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                const data = await response.json();
                setLoader(false)
                proceedPayment(data.result.access, "prod", data.result.key);
            } else {
                console.error("API call failed with status:", response.status);
                const errorData = await response.json();
                console.error("Error details:", errorData);
            }
        } catch (error) {
            console.error("API call failed with an exception:", error.message);
        }
    };

    const proceedPayment = (accessKey, env, key) => {
        const easebuzzCheckout = new window.EasebuzzCheckout(key, env);
        const options = {
            access_key: `${accessKey}`,
            onResponse: async (response) => {
                if (response.status === "success") {
                    try {
                        const easepayid = response.easepayid;
                        sessionStorage.setItem("RandomPaymenteasepayid", easepayid);
                        sessionStorage.setItem("randomPaymentAmount", formData.amount);
                        const verifyResponse = await axios.post(
                            `${apiURL.baseURL}/skyTrails/website/successVerifyApi?merchantTransactionId=${response.txnid}`,
                            { easepayid: easepayid }
                        );

                        navigate("/packagepayment/packagepaymentsuccess")

                    } catch (error) {
                        console.error("Error verifying payment:", error);
                    }
                } else {
                    try {
                        const verifyResponse = await axios.post(
                            `${apiURL.baseURL}/skyTrails/website/paymentFailure?merchantTransactionId=${response.txnid}`
                        );
                    } catch (error) {
                        console.error("Error verifying payment:", error);

                    }
                }
            },
            theme: "#123456",
        };

        easebuzzCheckout.initiatePayment(options);
    };


    const handleKeyDown = (event) => {
        if (event.key === "ArrowUp" || event.key === "ArrowDown") {
            event.preventDefault();
        }
    };


    return (
        <div>
            <div className='my-5'>
                <div className="BlogheadingContainer">
                    <h3>Package Payment</h3 >
                </div >

                <div className='container'>

                    <form class="row g-3 " onSubmit={onFormSubmit}>

                        <div class="col-md-3  ">
                            <label for="inputPassword4" class="form-label">Full Name</label>
                            <input style={{ borderColor: errors.name ? 'red' : '' }} type="text" id="name" name="name" class="form-control" onChange={onInputChangeHandler} />
                        </div>
                        <div class="col-md-2  ">
                            <label for="inputPassword4" class="form-label">Phone No</label>
                            <input style={{ borderColor: errors.phone ? 'red' : '' }} type="tel" id="phone" name="phone" class="form-control" onChange={onInputChangeHandler} />
                        </div>
                        <div class="col-md-4  ">
                            <label for="inputPassword4" class="form-label">Email ID</label>
                            <input style={{ borderColor: errors.email ? 'red' : '' }} type="email" id="email" name="email" class="form-control" onChange={onInputChangeHandler} />
                        </div>
                        <div class="col-md-3 editedNum ">
                            <label for="inputPassword4" class="form-label">Enter Amount</label>
                            <input onKeyDown={handleKeyDown} style={{ borderColor: errors.amount ? 'red' : '' }} type="number" id="amount" name="amount" class="form-control" onChange={onInputChangeHandler} />
                        </div>

                        <div className="col-12">
                            <p style={{ fontSize: "12px", fontWeight: "600", }}>Note: A transaction fee of 2% will be included. </p>
                        </div>


                        {
                            loader ? <div class="col-4 offset-lg-4 loaderButtonPayLater" >
                                <span className='loaderPaylater'></span>
                            </div>
                                :
                                <div class="col-4 offset-lg-4 loaderButtonPayLater" >
                                    <button className='w-100' type="submit" class="btn">Pay Now</button>
                                </div>

                        }
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RandomPayment
