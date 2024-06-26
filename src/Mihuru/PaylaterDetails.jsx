import React, { useEffect, useState } from 'react'
import { validateForm } from "./../utility/paylaterValidation"
import { useDispatch, useSelector } from 'react-redux'
import { clearTNPLReducerGRN, fetchTNPLRequest, setUserDataRequest } from './../Redux/TNPL/tnpl';
import axios from 'axios';
import dayjs from 'dayjs';
import Select from 'react-select';
import { apiURL } from '../Constants/constant';
import { useNavigate } from 'react-router-dom';
import login01 from "../images/login-01.jpg";
import Login from "../components/Login";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import { DatePicker } from "antd";
import { Button } from "antd";

const PaylaterDetails = () => {

    const dispatch = useDispatch();
    const reducerState = useSelector((state) => state);
    const navigate = useNavigate();
    const [isSearchable, setIsSearchable] = useState(true);
    const [fromsearchTerm, setfromSearchTerm] = useState('');
    const [tosearchTerm, settoSearchTerm] = useState('');
    const [searchResultsFrom, setSearchResultsFrom] = useState([]);
    const [searchResultsTo, setSearchResultsTo] = useState([]);
    // const publishedFare = sessionStorage.getItem("amountPayLater");
    const storedPayload = JSON.parse(sessionStorage.getItem("payLaterProps"));
    const authenticUser = reducerState?.logIn?.loginData?.status;
    // console.log(reducerState, "reducer state")
    const initialSelectedFromData = {
        AirportCode: "DEL",
        CityCode: "DEL",
        CountryCode: "IN ",
        code: "Indira Gandhi Airport",
        createdAt: "2023-01-30T14:58:34.428Z",
        id: "DEL",
        name: "Delhi",
        updatedAt: "2023-01-30T14:58:34.428Z",
        __v: 0,
        _id: "63d7db1a64266cbf450e07c1",
    };
    // ]

    const initialSelectedToData = {
        AirportCode: "BOM",
        CityCode: "BOM",
        CountryCode: "IN ",
        code: "Mumbai",
        createdAt: "2023-01-30T14:57:03.696Z",
        id: "BOM",
        name: "Mumbai",
        updatedAt: "2023-01-30T14:57:03.696Z",
        __v: 0,
        _id: "63d7dabf64266cbf450e0451",
    };

    const [fromSelectedOption, setFromSelectedOption] = useState(initialSelectedFromData);
    const [toSelectedOption, setToSelectedOption] = useState(initialSelectedToData);

    const handleFromChange = (selectedOption) => {
        // console.log(selectedOption)
        setFromSelectedOption(selectedOption);
    };
    const handleToChange = (selectedOption) => {
        setToSelectedOption(selectedOption);
    };

    useEffect(() => {
        dispatch(clearTNPLReducerGRN());
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




    // date picker 
    const dateFormat = "DD MMM, YY";
    const today = dayjs().format(dateFormat);
    const [newDepartDate, setNewDepartDate] = useState(today);

    // console.log(newDepartDate, "new departure date")

    const handleRangeChange = (date) => {
        if (date) {
            setNewDepartDate(dayjs(date).format(dateFormat));
        } else {
            console.log("Selection cleared");
        }
    };


    const disablePastDates = (current) => {
        return current && current < dayjs().startOf('day');
    };
    // date picker 


    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    const handleModalClose = () => {
        setIsLoginModalOpen(false);
    };

    useEffect(() => {
        if (authenticUser == 200) {
            handleModalClose();
        }
    }, [authenticUser]);



    const onFormSubmit = async (e) => {
        e.preventDefault();
        setLoader(true)

        if (authenticUser !== 200) {
            setIsLoginModalOpen(true);
            setLoader(false)
            return
        }

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
            travelDate: dayjs(newDepartDate).format("DD-MMM-YYYY"),
            origin: fromSelectedOption?.CityCode || fromSelectedOption?.value,
            destination: toSelectedOption?.CityCode || toSelectedOption?.value,
            travelCost: Number(formData?.cost),
            partnerTransactionId: reducerState?.logIn?.loginData?.data?.result?._id,
            travelType: storedPayload?.travelType,
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
            // console.log('API Error:', error);
        } finally {
            setLoader(false)
        }
    }


    useEffect(() => {
        const fetchSearchResults = async () => {
            if (fromsearchTerm?.trim() === '') {
                setSearchResultsFrom([]);
                return;
            }
            try {
                const response = await axios.get(
                    `${apiURL.baseURL}/skyTrails/city/searchCityData?keyword=${fromsearchTerm}`
                );
                setSearchResultsFrom(response?.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchSearchResults();
    }, [fromsearchTerm]);


    useEffect(() => {
        const fetchSearchResults = async () => {
            if (tosearchTerm?.trim() === '') {
                setSearchResultsTo([]);
                return;
            }
            try {
                const response = await axios.get(
                    `${apiURL.baseURL}/skyTrails/city/searchCityData?keyword=${tosearchTerm}`
                );
                setSearchResultsTo(response?.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchSearchResults();
    }, [tosearchTerm]);

    const handleFromInputChange = (newValue) => {
        setfromSearchTerm(newValue);
    };

    const handleToInputChange = (newValue) => {
        settoSearchTerm(newValue);
    };


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
                        <div className='datePickMihuru'>
                            <label for="inputPassword4" class="form-label">Travel Date</label>
                            {/* <input type="date" dateFormat="dd MMM, yy" id="date" name="date" class="form-control" onChange={onInputChangeHandler} /> */}
                            <DatePicker

                                onChange={handleRangeChange}
                                defaultValue={[dayjs()]}
                                format={dateFormat}
                                disabledDate={disablePastDates}
                            />
                        </div>
                    </div>
                    <div class="col-md-4">
                        <label for="inputPassword4" class="form-label">Origin</label>
                        {/* <input type="text" id="origin" name="origin" class="form-control" onChange={onInputChangeHandler} /> */}
                        <Select
                            className="basic-single"
                            classNamePrefix="select"
                            // defaultValue={fromSelectedOption}
                            defaultValue={fromSelectedOption.CityCode || fromSelectedOption.value}
                            name='from'
                            onChange={handleFromChange}
                            onInputChange={handleFromInputChange}
                            isSearchable={isSearchable}
                            options={
                                fromsearchTerm.trim() === ''
                                    ? [
                                        {
                                            value: initialSelectedFromData.CityCode,
                                            label: `${initialSelectedFromData.name} (${initialSelectedFromData.CityCode})`
                                        }]
                                    : (searchResultsFrom ? searchResultsFrom?.data?.map(result => ({
                                        value: result?.CityCode,
                                        label: `${result?.name} (${result?.CityCode})`
                                    })) : [])
                            }
                        />
                    </div>
                    <div class="col-md-4">
                        <label for="inputPassword4" class="form-label">Destination</label>
                        {/* <input type="text" id="destination" name="destination" class="form-control" onChange={onInputChangeHandler} /> */}
                        <Select
                            className="basic-single"
                            classNamePrefix="select"
                            defaultValue={toSelectedOption.CityCode || toSelectedOption.value}
                            name='from'
                            onChange={handleToChange}
                            onInputChange={handleToInputChange}
                            isSearchable={isSearchable}
                            options={
                                tosearchTerm.trim() === ""
                                    ? [
                                        {
                                            value: initialSelectedToData.CityCode,
                                            label: `${initialSelectedToData.name} (${initialSelectedToData.CityCode})`
                                        }]
                                    : (searchResultsTo ? searchResultsTo?.data?.map(result => ({
                                        value: result?.CityCode,
                                        label: `${result?.name} (${result?.CityCode})`
                                    })) : [])
                            }
                        />
                    </div>
                    <div class="col-md-4">
                        <label for="inputPassword4" class="form-label">Travel Cost</label>
                        <input type="text" id="cost" name="cost" class="form-control" onChange={onInputChangeHandler} />
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
                                                <CloseIcon
                                                    className="closeIncon"
                                                    onClick={handleModalClose}
                                                />
                                                <div className="loginImg logg">
                                                    <img src={login01} alt="login01" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-12 pe-0">
                                            <div class="form-left h-100 d-flex justify-content-center flex-column py-4 px-3">
                                                <div class="row g-4">
                                                    <div
                                                        class="col-12"
                                                        style={{
                                                            display: "flex",
                                                            justifyContent: "center",
                                                        }}
                                                    >
                                                        <label className="mb-3">
                                                            Please Login to Continue
                                                            <span class="text-danger">*</span>
                                                        </label>
                                                    </div>
                                                    <div
                                                        class="col-12"
                                                        style={{
                                                            display: "flex",
                                                            justifyContent: "center",
                                                        }}
                                                    >
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
            </Modal>

        </div>
    )
}

export default PaylaterDetails
