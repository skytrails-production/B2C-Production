import React from 'react';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { Flex, Spacer, Text } from '@chakra-ui/react'
// import Popularfilter from '../flightresult/Popularfilter';
import Sailsummary from '../guestdetail/Sailsummary';
import Reviewdescription from './Reviewdescription';


import './review.css';
import HotelConfirmationDetail from './HotelConfirmationDetail';
const Guestdetail = () => {
    return (
        <React.Fragment>
            <div className='flightContainer' >
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-9 col-md-12'>
                            <HotelConfirmationDetail />
                        </div>
                        <div className='col-lg-3 col-md-12'>
                            <Sailsummary />
                        </div>
                    </div>
                </div>
            </div>










        </React.Fragment>
    )
}

export default Guestdetail;
