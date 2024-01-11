import { Box, Typography } from '@mui/material';
import React from 'react';
import './taxiinfo.css';
import TaxiInfoComponent from './TaxiInfoComponent';

const TaxiInfo = () => {
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-lg-12'>
                    <Box className='taxi_container' my={3}>
                        <TaxiInfoComponent />
                        <TaxiInfoComponent />
                        <Typography className='book_cab'>Book Other Cab</Typography>
                        <TaxiInfoComponent />
                        <TaxiInfoComponent />
                        <TaxiInfoComponent />
                    </Box>
                </div>
            </div>
        </div>
    )
}

export default TaxiInfo
