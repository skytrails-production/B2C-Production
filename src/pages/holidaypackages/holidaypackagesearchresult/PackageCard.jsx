import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import travellers2 from "../../../images/img/travellers2.jpg";
import airplane from "../../../images/icons/airplane.png";
import hotel from "../../../images/icons/hotel.png";
import skiing from "../../../images/icons/skiing.png";
import taxidriver from "../../../images/icons/taxidriver.png";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { useNavigate } from 'react-router-dom';

import './packageSlider.css';
import { Box } from '@mui/material';


const PackageCard = () => {

    const navigate = useNavigate();

    return (
        <div>
            <Card sx={{ width: '100%' }} padding='25px' onClick={() =>  navigate('/HolidaypackageInfo')}>
                <Box className='package_slider_card'>
                    <img src={travellers2} className='package_slider_card_img' />
                </Box>
                <CardContent textAlign='center'>
                    <Box display='flex' justifyContent='space-evenly'>
                        <Box textAlign='center'>
                            <Box display='flex' alignItems='center' textAlign='center'>
                                <img src={airplane} />
                            </Box>
                            <Box display='flex' alignItems='center' textAlign='center'>
                                <Typography className='package_small_tst'>2 Flights</Typography>
                            </Box>
                        </Box>
                        <Box textAlign='center'>
                            <img src={hotel} textAlign='center' />
                            <Typography className='package_small_tst'>1 Hotel</Typography>
                        </Box>
                        <Box textAlign='center'>
                            <img src={skiing} textAlign='center' />
                            <Typography className='package_small_tst'>0 Activity</Typography>
                        </Box>
                        <Box textAlign='center'>
                            <img src={taxidriver} sx={{ display: 'flex', textAlign: 'center' }} />
                            <Typography className='package_small_tst' >1 Transfer</Typography>
                        </Box>
                    </Box>
                    <Box display='flex' justifyContent='space-between' mt={2}>
                        <Box>
                            <Typography className='package_head_tst'>Amazing Goa Flight</Typography>
                            <Typography className='package_head_tst'> Inclusive Deal 3N</Typography>
                            <Box display='flex' alignItems='center' mt={1}>
                                <FiberManualRecordIcon sx={{ width: '10px', height: '20px', color: '#707070' }} />
                                <Typography className='List_pack' > Sightseeing Included</Typography>
                            </Box>
                            <Box display='flex' alignItems='center'>
                                <FiberManualRecordIcon sx={{ width: '10px', height: '20px', color: '#707070' }} />
                                <Typography className='List_pack' > North Goa Sightseeing</Typography>
                            </Box>
                        </Box>
                        <Box textAlign='center'>
                            <Typography className='List_pack'><del>₹32,645</del> </Typography>
                            <Typography className='List_price'>₹24521</Typography>
                            <Typography className='List_pack'> Per Person</Typography>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </div>
    )
}

export default PackageCard;
