import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import dayjs from 'dayjs';
import SecureStorage from 'react-secure-storage';
import './holidayenquiryform.scss';
import login01 from '../../../images/login-01.jpg';
import Login from '../../../components/Login';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { DatePicker, Input } from 'antd';
import { Button } from 'antd';
import { apiURL } from '../../../Constants/constant';
import ConfirmationModal from './ConfirmationModal';

const HolidayEnquiryForm = ({ onePackage }) => {
    const reducerState = useSelector((state) => state);
    const authenticUser = reducerState?.logIn?.loginData?.status;
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);
    const token = SecureStorage.getItem('jwtToken');

    const validateForm = (formData) => {
        const errors = {};
        if (formData.fname.length < 4 || formData.fname.length > 26) {
            errors.fname = 'Enter valid name';
        }

        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailRegex.test(formData.email)) {
            errors.email = 'Enter Valid Email';
        }
        if (formData.phone.length < 10 || formData.phone.length > 10) {
            errors.phone = 'Enter Phone Number';
        }
        if (formData.depCity.length < 2 || formData.depCity.length > 20) {
            errors.depCity = 'Enter Correct City';
        }

        return errors;
    };

    const [loader, setLoader] = useState(false);
    const [errors, setErrors] = useState({
        fname: '',
        phone: '',
        email: '',
        depCity: '',
        date: '',
    });
    const [formData, setFormData] = useState({
        fname: '',
        phone: '',
        email: '',
        date: '',
        depCity: '',
    });

    const onInputChangeHandler = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleAdultIncrement = () => {
        setAdults(adults + 1);
    };

    const handleAdultDecrement = () => {
        if (adults > 0) {
            setAdults(adults - 1);
        }
    };

    const handleChildIncrement = () => {
        setChildren(children + 1);
    };

    const handleChildDecrement = () => {
        if (children > 0) {
            setChildren(children - 1);
        }
    };

    // date picker
    const dateFormat = 'DD MMM, YY';
    const today = dayjs().format(dateFormat);
    const [newDepartDate, setNewDepartDate] = useState(today);

    const handleRangeChange = (date) => {
        if (date) {
            setNewDepartDate(dayjs(date).format(dateFormat));
        } else {
            console.log('');
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
        if (authenticUser === 200) {
            handleModalClose();
        }
    }, [authenticUser]);

    // confirmation modal open close
    const [showConfirmationModalVisible, setShowConfirmationModalVisible] = useState(false);

    const showConfirmationModal = () => {
        setShowConfirmationModalVisible(true);
    };

    const closeConfirmationModal = () => {
        setShowConfirmationModalVisible(false);
    };
    // confirmation modal open close

    const onFormSubmit = async (e) => {
        e.preventDefault();
        setLoader(true);

        if (authenticUser !== 200) {
            setIsLoginModalOpen(true);
            setLoader(false);
            return;
        }

        // console.log(formData, 'formData');

        const validationResult = validateForm(formData);
        // console.log(validationResult, 'validationResult');
        if (Object.keys(validationResult).length > 0) {
            setErrors(validationResult);
            setLoader(false);
            return;
        }
        const enquiryPayload = {
            packageId: onePackage?._id,
            email: formData.email,
            countryCode: '+91',
            fullName: formData.fname,
            phone: formData.phone,
            departureCity: formData.depCity,
            adults: adults,
            child: children,
            noOfPeople: Number(adults) + Number(children),
            departureDate: newDepartDate,
            packageType: 'tour',
        };
        await axios({
            method: 'post',
            url: `${apiURL.baseURL}/skyTrails/api/user/packageBookingEnquiry`,
            data: enquiryPayload,
            headers: {
                token: token,
            },
        })
            .then(function () {
                setFormData({
                    email: '',
                    fname: '',
                    phone: '',
                    depCity: '',
                });
                setChildren(0);
                setAdults(1);
                setNewDepartDate(today);
                showConfirmationModal();
                setLoader(false);
            })
            .catch(function (error) {
                console.log(error);
                setLoader(false);
            });
    };

    return (
        <div className='holidayEnqiryForm'>
            <div className=''>
                <h5>Enquiry Form</h5>
            </div>

            <div className='container'>
                <form class='row g-3' onSubmit={onFormSubmit}>
                    <div class='col-12'>
                        <label for='inputEmail4' class='form-label'>
                            Email ID
                        </label>
                        <input
                            style={{ borderColor: errors.email ? 'red' : '' }}
                            type='email'
                            id='email'
                            name='email'
                            class='form-control'
                            value={formData.email}
                            onChange={onInputChangeHandler}
                        />
                    </div>
                    <div class='col-12'>
                        <label for='inputEmail4' class='form-label'>
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
                    </div>
                    <div class='col-12'>
                        <label for='inputEmail4' class='form-label'>
                            Phone No
                        </label>
                        <input
                            style={{ borderColor: errors.phone ? 'red' : '' }}
                            type='tel'
                            name='phone'
                            id='phone'
                            class='form-control'
                            value={formData.phone}
                            onChange={onInputChangeHandler}
                        />
                    </div>
                    <div class='col-12'>
                        <label for='inputEmail4' class='form-label'>
                            Departure City
                        </label>
                        <input
                            style={{ borderColor: errors.depCity ? 'red' : '' }}
                            type='text'
                            name='depCity'
                            id='depCity'
                            class='form-control'
                            value={formData.depCity}
                            onChange={onInputChangeHandler}
                        />
                    </div>

                    <div class='col-12'>
                        <div className='datePickEnquiry'>
                            <label for='inputPassword4' class='form-label'>
                                Travel Date
                            </label>
                            <DatePicker
                                onChange={handleRangeChange}
                                defaultValue={dayjs(today, dateFormat)}
                                format={dateFormat}
                                disabledDate={disablePastDates}
                                value={dayjs(newDepartDate, dateFormat)}
                            />
                        </div>
                    </div>

                    <div className='col-12'>
                        <div className='humanCount'>
                            <label htmlFor='inputAdults' className='form-label'>
                                Adults
                            </label>
                            <div className='counter'>
                                <button
                                    type='button'
                                    className='btn btn-outline-primary'
                                    onClick={handleAdultDecrement}
                                >
                                    -
                                </button>
                                <span className='count'>{adults}</span>
                                <button
                                    type='button'
                                    className='btn btn-outline-primary'
                                    onClick={handleAdultIncrement}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='col-12'>
                        <div className='humanCount'>
                            <label htmlFor='inputChildren' className='form-label'>
                                Children
                            </label>
                            <div className='counter'>
                                <button
                                    type='button'
                                    className='btn btn-outline-primary'
                                    onClick={handleChildDecrement}
                                >
                                    -
                                </button>
                                <span className='count'>{children}</span>
                                <button
                                    type='button'
                                    className='btn btn-outline-primary'
                                    onClick={handleChildIncrement}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class='col-12 enquiryBotton'>
                        <Button className='' htmlType='submit' loading={loader}>
                            Submit
                        </Button>
                    </div>
                </form>
            </div>

            <Modal
                open={isLoginModalOpen}
                onClose={handleModalClose}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
                sx={{ zIndex: '999999' }}
            >
                <div class='login-page'>
                    <div class='container '>
                        <div class='row d-flex justify-content-center'>
                            <div class='col-lg-5 '>
                                <div class='bg-white shadow roundedCustom'>
                                    <div class=''>
                                        <div class='col-md-12 ps-0  d-md-block'>
                                            <div class='form-right leftLogin h-100 text-white text-center '>
                                                <CloseIcon
                                                    className='closeIncon'
                                                    onClick={handleModalClose}
                                                />
                                                <div className='loginImg logg'>
                                                    <img src={login01} alt='login01' />
                                                </div>
                                            </div>
                                        </div>
                                        <div class='col-md-12 pe-0'>
                                            <div class='form-left h-100 d-flex justify-content-center flex-column py-4 px-3'>
                                                <div class='row g-4'>
                                                    <div
                                                        class='col-12'
                                                        style={{
                                                            display: 'flex',
                                                            justifyContent: 'center',
                                                        }}
                                                    >
                                                        <label className='mb-3'>
                                                            Please Login to Continue
                                                            <span class='text-danger'>*</span>
                                                        </label>
                                                    </div>
                                                    <div
                                                        class='col-12'
                                                        style={{
                                                            display: 'flex',
                                                            justifyContent: 'center',
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

            <ConfirmationModal
                isOpen={showConfirmationModalVisible}
                onClose={closeConfirmationModal}
            />
        </div>
    );
};

export default HolidayEnquiryForm;
