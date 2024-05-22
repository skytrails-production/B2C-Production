import React, { useEffect, useState } from 'react';
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import bali from "../../images/trendingPackage/bali.jpg";
import europe from "../../images/trendingPackage/europe.jpg";
import kashmir from "../../images/trendingPackage/kashmir.jpg";
import ladakh from "../../images/trendingPackage/ladakh.jpg";
import turkey from "../../images/trendingPackage/turkey.jpg";
import banner from "../../images/banner holiday package.jpg"

import "./skytrailstrending.css";
import { apiURL } from '../../Constants/constant';
import axios from 'axios';
import dayjs from 'dayjs';



const SkytailsTrendingPackages = () => {



    const [open, setOpen] = useState(false);
    const [loader, setLoader] = useState(false);
    const [selected, setSelected] = useState({})
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 600);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        date: '',
        departureCity: '',
        adults: '',
        child: ''
    });

    const [errors, setErrors] = useState({
        name: '',
        phone: '',
        email: '',
        departureCity: '',
        adults: '',

    })

    const array = [
        {
            url: bali,
            id: "bali",
            name: "Bali",
            amount: 64999,
            content: `
Discover the Beauty of Bali with The Skytrails;
Bali packages starting from ₹ 64999 inclusive of flight.;
Bali is a tropical paradise known for its stunning beaches and vibrant culture.;`
        },
        {
            url: europe,
            id: "europe",
            name: "Europe",
            amount: 179990,
            content: `Explore the grandeur!;  
Europe packages starting from ₹ 179990/- 6 Nights that includes Flight;
Europe is a continent with a rich history, many cultures, and breathtaking scenery.;`
        },
        {
            url: kashmir,
            id: "kashmir",
            name: "Kashmir",
            amount: 36000,
            content: `Heaven on Earth awaits;  
Book your Kashmir packages starting from ₹ 36000 inclusive of Flight;
Ladakh offers an unforgettable adventure for travelers seeking a unique experience.;`
        },
        {
            url: ladakh,
            id: "ladakh",
            name: "Ladakh",
            amount: 55000,
            content: `Unveil the Secrets of Ladakh;
Book your Ladakh packages starting from ₹ 55000 inclusive of Flight;
Find Your Spirit in Ladakh’s Majestic Landscapes;`
        },
        {
            url: turkey,
            id: "turkey",
            name: "Turkey",
            amount: 139990,
            content: `Turkey Adventure Begins;
Explore its beautiful history and stunning landscapes!;
Package price starting from ₹ 139990 per person inclusive of Flight;`
        }
    ];

    const handleOpen = (data) => {
        setSelected(data);
        setOpen(true);
    }
    const handleClose = () => setOpen(false);


    const validateForm = (formData) => {
        const errors = {

        }
        if (formData.name.length < 4 || formData.name.length > 30) {
            errors.name = "Enter valid name"
        }

        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailRegex.test(formData.email)) {
            errors.email = "Enter Valid Email"
        }
        if (formData.phone.length < 10 || formData.phone.length > 10) {
            errors.phone = "Enter Phone Number"
        }
        if (formData.departureCity.length < 3 || formData.departureCity.length > 20) {
            errors.departureCity = "Enter Phone Number"
        }
        if (formData.adults == 0 || formData.adults.length > 3 || formData.adults == "") {
            errors.adults = "Enter Phone Number"
        }
        // if (formData.child.length < 3 || formData.child.length > 20) {
        //     errors.phone = "Enter Phone Number"
        // }

        return errors;
    };


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
            packageName: selected?.name,
            packageAmount: selected?.amount,
            name: formData?.name,
            phoneNumber: formData?.phone,
            email: formData?.email,
            dateOfTravel: dayjs(formData?.date).format("DD MMM, YY"),
            departureCity: formData?.departureCity,
            noOfAdult: formData?.adults,
            noOfChild: formData?.child
        }

        try {
            const res = await axios({
                method: 'post',
                url: `${apiURL.baseURL}/skyTrails/api/packagesenquiry`,
                data: payload,
                headers: {
                    'Content-Type': 'application/json',
                },
            });



        } catch (error) {
            console.log('API Error:', error);
        } finally {
            setLoader(false)
            handleClose();
        }
    };





    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 600);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    console.log(isSmallScreen, "small screen")



    return (
        <>
            <div className="trbann">
                <img src={banner} alt="banner" />
            </div>
            <div className='container mt-5 blogHeaad'>

                <div className="BlogheadingContainer">
                    <h3>Exclusive Summer special holiday packages.</h3>
                </div>
                <div className="row g-4">
                    {array.map((item, index) => (
                        <div key={index} className="col-lg-4">
                            <div className="sttrcard">
                                <div className="stTrPackBox" onClick={(e) => handleOpen(item)} >
                                    <img src={item?.url} alt="" />

                                </div>
                                <div className='sttrPara'>
                                    {item?.content.split(';').map((para, i) => (
                                        <p className='mb-2' key={i}>{para.trim()}</p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <Modal open={open} onClose={handleClose}>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: isSmallScreen ? "90%" : 'auto',
                            maxHeight: isSmallScreen ? '100vh' : 'none', // Conditional maxHeight
                            overflowY: "scroll",
                            bgcolor: 'background.paper',
                            boxShadow: 24,
                            p: 4,
                            borderRadius: 1
                        }}
                    >
                        <form class="row g-3" onSubmit={onFormSubmit}>
                            <h2 className='formTitleTRPack'>Reach us to Book</h2>
                            <div class="col-md-6">
                                <label for="inputEmail4" class="form-label">Your Name</label>
                                <input style={{ borderColor: errors.name ? 'red' : '' }} type="text" name="name" id="name" className="form-control" onChange={onInputChangeHandler} />
                            </div>
                            <div class="col-md-6">
                                <label for="inputEmail4" class="form-label">Email</label>
                                <input style={{ borderColor: errors.email ? 'red' : '' }} type="email" id='email' name="email" class="form-control" onChange={onInputChangeHandler} />
                            </div>
                            <div class="col-md-4">
                                <label for="inputEmail4" class="form-label">Phone No</label>
                                <input style={{ borderColor: errors.phone ? 'red' : '' }} type="tel" name='phone' id="phone" class="form-control" onChange={onInputChangeHandler} />
                            </div>


                            <div class="col-md-4">
                                <label for="inputPassword4" class="form-label">Travel Date</label>
                                <input type="date" dateFormat="dd MMM, yy" id="date" name="date" class="form-control" onChange={onInputChangeHandler} />
                            </div>
                            <div class="col-md-4">
                                <label for="inputPassword4" class="form-label">Departure City</label>
                                <input style={{ borderColor: errors.departureCity ? 'red' : '' }} type="text" id="departureCity" name="departureCity" class="form-control" onChange={onInputChangeHandler} />
                            </div>
                            <div class="col-md-4">
                                <label for="inputPassword4" class="form-label">No of Adults</label>
                                <input style={{ borderColor: errors.adults ? 'red' : '' }} type="number" id="adults" min="0" name="adults" class="form-control" onChange={onInputChangeHandler} />
                            </div>
                            <div class="col-md-4">
                                <label for="inputPassword4" class="form-label">No of Child</label>
                                <input type="number" id="child" min="0" name="child" class="form-control" onChange={onInputChangeHandler} />
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
                    </Box>
                </Modal>
            </div>
        </>
    );
};

export default SkytailsTrendingPackages;