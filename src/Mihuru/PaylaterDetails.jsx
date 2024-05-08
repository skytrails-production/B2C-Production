import React, { useEffect, useState } from 'react'
import { validateForm } from "./../utility/paylaterValidation"
import { useDispatch, useSelector } from 'react-redux'
import { fetchTNPLRequest, setUserDataRequest } from './../Redux/TNPL/tnpl';
import axios from 'axios';
// import { apiURL } from '../Constants/constantant';
import dayjs from 'dayjs';
import { apiURL } from '../Constants/constant';
import { useNavigate } from 'react-router-dom';

const PaylaterDetails = () => {

    const dispatch = useDispatch();
    const reducerState = useSelector((state) => state);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchTNPLRequest());
    }, [])

    const mihuruToken = reducerState?.TNPL?.tnplData?.data?.data?.data;
    const [loader, setLoader] = useState(false);
    const [errors, setErrors] = useState({
        fname: "",
        lname: "",
        phone: "",
        email: "",
        income: "",
    })
    const [formData, setFormData] = useState({
        fname: "",
        lname: "",
        phone: "",
        email: "",
        income: "",
        date: "",
        origin: "",
        destination: "",
        cost: ""

    })

    const onInputChangeHandler = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }


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
            mobileNo: formData?.phone,
            lastName: formData?.lname,
            firstName: formData?.fname,
            email: formData?.email,
            monthlyIncome: Number(formData?.income),
            travelDate: dayjs(formData?.date).format("DD-MMM-YYYY"),
            origin: formData?.origin,
            destination: formData?.destination,
            travelCost: Number(formData?.cost)
        }

        try {
            const res = await axios({
                method: 'post',
                url: `${apiURL.baseURL}/skyTrails/mihuru/signup`,
                data: payload,
                headers: {
                    'Content-Type': 'application/json',
                    mihiruToken: mihuruToken,
                },
            });

            if (res?.data?.error !== null) {
                dispatch(setUserDataRequest(formData))
                sessionStorage.setItem("response_msg", JSON.stringify(res?.data?.data))
                navigate("/payLaterDetails/verifyOtp")
            }

        } catch (error) {
            console.log('API Error:', error);
        } finally {
            setLoader(false)
        }
    }




    return (
        <div>
            <div className="BlogheadingContainer">
                <h3>pay later Form</h3 >
            </div >

            <div className='container'>
                <form class="row g-3" onSubmit={onFormSubmit}>
                    <div class="col-md-4">
                        <label for="inputEmail4" class="form-label">First Name</label>
                        <input style={{ borderColor: errors.fname ? 'red' : '' }} type="text" name="fname" id="fname" className="form-control" onChange={onInputChangeHandler} />


                    </div>
                    <div class="col-md-4">
                        <label for="inputEmail4" class="form-label">Last Name</label>
                        <input style={{ borderColor: errors.lname ? 'red' : '' }} type="text" name='lname' id="lname" class="form-control" onChange={onInputChangeHandler} />
                    </div>
                    <div class="col-md-4">
                        <label for="inputEmail4" class="form-label">Phone No</label>
                        <input style={{ borderColor: errors.phone ? 'red' : '' }} type="tel" name='phone' id="phone" class="form-control" onChange={onInputChangeHandler} />
                    </div>
                    <div class="col-md-4">
                        <label for="inputEmail4" class="form-label">Email</label>
                        <input style={{ borderColor: errors.email ? 'red' : '' }} type="email" id='email' name="email" class="form-control" onChange={onInputChangeHandler} />
                    </div>
                    <div class="col-md-4">
                        <label for="inputPassword4" class="form-label">Monthly Income</label>
                        <input style={{ borderColor: errors.income ? 'red' : '' }} type="text" id="income" name="income" class="form-control" onChange={onInputChangeHandler} />
                    </div>
                    <div class="col-md-4">
                        <label for="inputPassword4" class="form-label">Travel Date</label>
                        <input type="date" id="date" name="date" class="form-control" onChange={onInputChangeHandler} />
                    </div>
                    <div class="col-md-4">
                        <label for="inputPassword4" class="form-label">Origin</label>
                        <input type="text" id="origin" name="origin" class="form-control" onChange={onInputChangeHandler} />
                    </div>
                    <div class="col-md-4">
                        <label for="inputPassword4" class="form-label">Destination</label>
                        <input type="text" id="destination" name="destination" class="form-control" onChange={onInputChangeHandler} />
                    </div>
                    <div class="col-md-4">
                        <label for="inputPassword4" class="form-label">Travel Cost</label>
                        <input type="text" id="cost" name="cost" class="form-control" onChange={onInputChangeHandler} />
                    </div>


                    {
                        loader ? <div class="col-4 offset-lg-4 loaderButtonPayLater" >
                            <span className='loaderPaylater'></span>
                        </div>
                            :
                            <div class="col-4 offset-lg-4 loaderButtonPayLater" >
                                <button className='w-100' type="submit" class="btn">Submit</button>
                            </div>

                    }
                </form>
            </div>
        </div>
    )
}

export default PaylaterDetails
