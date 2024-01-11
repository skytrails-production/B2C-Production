import { Grid, Box, Typography, Button } from '@mui/material';
import cab from '../../../images/img/cab.jpg';
import React from 'react';
import "./taxiinfo.css";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import fare from '../../../images/fare.png';
import fuel from '../../../images/fuel.png';
import multiply from '../../../images/multiply.png';
import {useNavigate} from "react-router-dom"

const TaxiInfoComponent = () => {
    const navigate = useNavigate();
    return (
        <Box className='info_component'>
            <Grid container spacing={3}>
                <Grid item lg={2} display='flex' alignItems='center'  justifyContent='left'>
                    <Box>
                        <img src={cab} className='taxi_img' />
                    </Box>
                </Grid>
                <Grid item lg={8}>
                    <Box>
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
                            <Box>
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
                <Grid item lg={2}>
                    <Box>
                        <Typography className='taxi_offer'>10% off</Typography>
                        <Box className='pricintg_taxi'>
                            <Typography className='low_price'><del>₹3500</del></Typography>
                            <Typography className='exact_price' ml={1}>₹3185</Typography>
                        </Box>
                        <Typography className='toll_tax'>inc. of tolls and taxes</Typography>
                        <Box textAlign='right' mt={1}>
                            <Button variant='contained' onClick={()=>navigate("/TaxiBookingResult")} className='book_now_taxibtn'>Book Now</Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default TaxiInfoComponent
