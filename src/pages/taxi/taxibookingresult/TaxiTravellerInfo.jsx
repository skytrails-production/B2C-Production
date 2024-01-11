import { Box, Button, Divider, Grid, Link, Typography } from '@mui/material';
import React, { useState } from "react";
import "./taxitravellerinfo.css";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import fare from '../../../images/fare.png';
import fuel from '../../../images/fuel.png';
import multiply from '../../../images/multiply.png';
import { useNavigate } from "react-router-dom";
import cab from '../../../images/img/cab.jpg';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import PinDropIcon from "@mui/icons-material/PinDrop";
import PhoneInput from "react-phone-input-2";

const TaxiTravellerInfo = () => {

    const [phone, setPhone] = useState("");

    // validation

    const initialvalue = {

        fname: '',
        gender: '',
        email: '',
        adult: '',

    }

    const [values, setValues] = React.useState(initialvalue);
    const [error, setError] = React.useState(false);

    function handleInputSubmit(e) {
        e.preventDefault();
        if (values.fname.length < 1 || values.gender.length < 1
            || values.email.length < 1 || values.adult.length < 1) {
            setError(true);
        }
        else {
            navigate('hotelsearch');
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setValues({
            ...values,
            [name]: value,
        });
    }
    //   end


    const navigate = useNavigate();
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-12'>
                    <Box className="traveller_info_container">
                        <Grid container spacing={3}>
                            <Grid item sm={2} lg={9}>
                                <Box className='taxi_traveller'>
                                    <Grid container >
                                        <Grid item lg={3} display='flex' alignItems='center' justifyContent='left'>
                                            <Box>
                                                <img src={cab} className='taxi_img' />
                                            </Box>
                                        </Grid>
                                        <Grid item lg={8}>
                                            <Box pl={3}>
                                                <Box className='taxi_name'>
                                                    <Typography className='Dzire'>Dzire, Etios</Typography>
                                                    <Typography className='or_similar' ml={1}>or similar</Typography>
                                                </Box>
                                                <Box className='ac_container'>
                                                    <Typography className='sedan_gp'>Sedan</Typography>
                                                    <FiberManualRecordIcon className='taxi_dot' />
                                                    <Typography className='sedan_gp'>AC</Typography>
                                                    <FiberManualRecordIcon className='taxi_dot' />
                                                    <Typography className='sedan_gp'>4 Seats</Typography>
                                                </Box>
                                                <Typography className='sedan_gp' m1={2}>Spacious Car</Typography>
                                                <Box display='flex' alignItems='center'>
                                                    <Box>
                                                        <Box display='flex' alignItems='center'>
                                                            <img src={fare} />
                                                            <Typography className='extra_fare' ml={2}>Extra km fare</Typography>
                                                        </Box>
                                                        <Box display='flex' alignItems='center'>
                                                            <img src={fuel} />
                                                            <Typography className='extra_fare' ml={2}>Fuel Type</Typography>
                                                        </Box>
                                                        <Box display='flex' alignItems='center'>
                                                            <img src={multiply} />
                                                            <Typography className='extra_fare' ml={2}>Cancellation</Typography>
                                                        </Box>
                                                    </Box>
                                                    <Box ml={5}>
                                                        <Box display='flex' alignItems='center'>
                                                            <Typography className='extra_fare' ml={2}>₹11.0/km after 233 kms</Typography>
                                                        </Box>
                                                        <Box display='flex' alignItems='center'>
                                                            <Typography className='extra_fare' ml={2}>CNG/Diesel</Typography>
                                                        </Box>
                                                        <Box display='flex' alignItems='center'>
                                                            <Typography className='extra_fare' ml={2}>Free till 1 hour of departure</Typography>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Box>
                                <Box className='taxi_traveller'>
                                    <Grid container spacing={3}>
                                        <Grid item sm={2} lg={6}>
                                            <Box className='index_one'>
                                                <Box className='inclusion_heading'>
                                                    <CheckCircleIcon style={{ color: 'lightgreen' }} />
                                                    <Typography className='inclusion' ml={1}>Inclusions</Typography>
                                                    <Typography className='inclusion_price' ml={1}> (Included in the Price)</Typography>
                                                </Box>
                                                <ul className='list_ul'>
                                                    <li>Night charges ( 10 PM to 6 AM )</li>
                                                    <li>State Tax</li>
                                                    <li>Toll Charge</li>
                                                    <li>233 Kms</li>
                                                    <li>Driver Allowance</li>
                                                    <li>Only One Pickup and Drop<text className='inclusion_price'> ( Only one included )</text></li>
                                                </ul>

                                            </Box>

                                        </Grid>
                                        {/* <div className='border_line'></div> */}
                                        <Grid item sm={2} lg={6}>


                                            <Box>
                                                <Box>
                                                    <Box>
                                                        <Box className='inclusion_heading'>
                                                            <CancelIcon style={{ color: 'red' }} />
                                                            <Typography className='inclusion' ml={1}>Exclusions</Typography>
                                                            <Typography className='inclusion_price' ml={1}>(Extra Charges)</Typography>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                                <Box display='flex' justifyContent='space-between'>
                                                    <Box>
                                                        <ul className='list_ul'>
                                                            <li>Waiting Charges</li>
                                                            <li>Fare beyond 233 Kms</li>
                                                        </ul>
                                                    </Box>
                                                    <Box>
                                                        <Typography className='after_tym'>After 45 mins, ₹ 100.0/hr</Typography>
                                                        <Typography className='after_tym'>₹ 16/Km</Typography>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Box>
                                <Box className='taxi_traveller'>
                                    <Typography className='trip_detail'>Trip Details</Typography>
                                    <Typography className='pickup_add'>Pick-up Address</Typography>
                                    <Box sx={{ width: '100%' }}>
                                        <input type='text' name='address_pickup' style={{ width: '100%', borderRadius: '10px', border: '2px solid #7070707A', padding: '10px' }} placeholder='Delhi Cantt Railway Station, Jail Road, Nangal Village, Delhi Cantonment, New Delhi, Delhi, India' />
                                    </Box>
                                    <Typography className='pickup_add'>Drop-off Address (Optional - This will help you avoid any extra charges after the trip)</Typography>
                                    <Box sx={{ width: '100%' }} >
                                        <input type='text' name='address_drop' style={{ width: '100%', borderRadius: '10px', border: '2px solid #7070707A', padding: '10px' }} placeholder='Delhi Cantt Railway Station, Jail Road, Nangal Village, Delhi Cantonment, New Delhi, Delhi, India' />
                                    </Box>
                                    <Divider style={{ padding: '1px', backgroundColor: 'black', borderRadius: '20px', marginTop: '15px', marginBottom: '15px' }} />
                                    <Typography className='trip_detail' mb={2}>Confirm Traveller information</Typography>
                                    <Grid container spacing={3}>
                                        <Grid item md={3} sm={12} xs={12}>
                                            <Box>
                                                <div className="hotel_form_input">
                                                    <label className="form_lable">
                                                        First name<span className="star_color">*</span>
                                                    </label>
                                                    <input type="text" name="fname"
                                                        value={values.fname} onChange={handleInputChange}
                                                        placeholder="Enter Your First Name" />
                                                </div>
                                                {error && values.fname.length < 1 ?
                                                    <label style={{ color: "red", fontSize: "12px", textAlign: "left" }}>Please Enter this Field </label>
                                                    : ''
                                                }
                                            </Box>
                                        </Grid>
                                        <Grid item md={2} sm={12} xs={12}>
                                            <Box>
                                                <div className="hotel_form_input">
                                                    <label className="form_lable">
                                                        Gender<span className="star_color">*</span>
                                                    </label>
                                                    <select name="gender" value={values.gender} onChange={handleInputChange} className="hotel_input_select">
                                                        <option value="0">Select</option>
                                                        <option value="1">Female</option>
                                                        <option value="2">Male</option>
                                                        <option value="3">Others</option>
                                                    </select>
                                                    <div>
                                                        {error && values.gender.length < 1 ?
                                                            <label style={{ color: "red", fontSize: "12px", textAlign: "left" }}>Please Enter this Field </label>
                                                            : ''
                                                        }
                                                    </div>
                                                </div>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={3} my={2}>
                                        <Grid item md={3} sm={12} xs={12}>
                                            <Box>
                                                <div className="hotel_form_input">
                                                    <label className="form_lable">
                                                        Email<span className="star_color">*</span>
                                                    </label>
                                                    <input type="email" name="email"
                                                        value={values.email} onChange={handleInputChange}
                                                        placeholder="Enter Your Email" />
                                                </div>
                                                {error && values.email.length < 1 ?
                                                    <label style={{ color: "red", fontSize: "12px", textAlign: "left" }}>Please Enter this Field </label>
                                                    : ''
                                                }
                                            </Box>
                                        </Grid>
                                        <Grid item md={3} sm={12} xs={12}>
                                            <Box className="contact_input">
                                                <label className="form_lable">
                                                    Mobile<span className="star_color">*</span>
                                                </label>
                                                <PhoneInput
                                                    style={{
                                                        position: "initial",
                                                        height: "50px",
                                                        width: "306px",
                                                        borderRadius: "10px",
                                                        border: "3px solid #DFDFDF",
                                                        // boxShadow: "0px 3px 6px #DFDFDF",
                                                    }}
                                                    name="phone"
                                                    country={"in"}
                                                    enableSearch={true}
                                                    value={phone}
                                                    onChange={(phone) => setPhone(phone)}
                                                />
                                                {error && phone.length < 1 ? (
                                                    <label
                                                        style={{
                                                            color: "red",
                                                            fontSize: "12px",
                                                            textAlign: "left",
                                                        }}
                                                    >
                                                        Please Enter Your Number
                                                    </label>
                                                ) : (
                                                    ""
                                                )}
                                            </Box>
                                        </Grid>
                                    </Grid>
                                    <Typography className='trip_detail' mb={2}>By proceeding to book, I Agree to Travvolt's <Link className='privacy_link'> Privacy Policy,
                                     User Agreement  </Link>and<Link className='privacy_link'>Terms of Service</Link> </Typography>
                                </Box>
                                <Box className='taxi_traveller'>
                                    <Typography className='read_book'>Read before you book!</Typography>
                                    <Typography className='cab_category'>Cab Category</Typography>
                                    <Typography className='cab_para'> The booking will be for cab type HATCHBACK and we do not commit on providing the preferred cab model (Indica, Swift or similar)</Typography>
                                    <Typography className='cab_category'>Hilly Regions</Typography>
                                    <Typography className='cab_para'>  AC will be switched off in hilly areas</Typography>
                                    <Typography className='cab_category'>Luggage Policy </Typography>
                                    <Typography className='cab_para'>HATCHBACK has space for 1 Luggage Bag. In case the car happens to be CNG, the luggage space will be lesser. However depending on the number of passengers, luggage can be adjusted in seating area with driver consent.</Typography>
                                    <Typography className='cab_category'>Driver Details</Typography>
                                    <Typography className='cab_para'>Driver details will be shared up to 30 mins prior to departure. Incase the driver/cab that reaches you for pick up is different from what we have communicated, please don't board the cab and call us for assistance.</Typography>
                                    <Typography className='cab_category'>Stops</Typography>
                                    <Typography className='cab_para'>This is a point to point booking and only one stop for meals is included.</Typography>
                                    <Typography className='cab_category'>Delays</Typography>
                                    <Typography className='cab_para'>Due to traffic or any other unavoidable reason, pickup may be delayed by 30 mins.</Typography>
                                    <Typography className='cab_category'>Receipts</Typography>
                                    <Typography className='cab_para'>You need to collect receipts from the driver for any extra charges paid directly to the driver during the trip. MMT is not liable to provide invoices for such amounts.</Typography>
                                </Box>
                            </Grid>
                            <Grid item sm={2} lg={3}>
                                <Box className='taxi_traveller'>
                                    <Box style={{ display: "flex", alignItems: "center", justifyContent: 'space-between' }}>
                                        <Typography className="base_fare">Base Fare</Typography>
                                        <Typography className="base_fare" >₹1122</Typography>
                                    </Box>
                                    <Box style={{ display: "flex", alignItems: "center", justifyContent: 'space-between' }}>
                                        <Typography className="base_fare">Driver Charges</Typography>
                                        <Typography className="base_fare" >₹22</Typography>
                                    </Box>
                                    <Box style={{ display: "flex", alignItems: "center", justifyContent: 'space-between' }}>
                                        <Typography className="base_fare">Tax</Typography>
                                        <Typography className="base_fare" >₹52</Typography>
                                    </Box>
                                    <Box style={{ display: "flex", alignItems: "center", justifyContent: 'space-between' }}>
                                        <Typography className="base_fare">Total Base Price</Typography>
                                        <Typography className="total_fare" >₹4147</Typography>
                                    </Box>
                                    <Box textAlign='center' mt={1}>
                                        <Button onClick={handleInputSubmit} variant='contained' type="submit" className='taxi_continue_btn'>Continue to Book Online</Button>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </div>
            </div>
        </div>
    )
}

export default TaxiTravellerInfo;
