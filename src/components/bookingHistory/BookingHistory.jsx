import React, { useEffect } from 'react'
import InsideNavbar from "../../UI/BigNavbar/InsideNavbar"
import "./bookingHistory.css"
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import FlightHistory from './FlightHistory';
import HotelHistory from './HotelHistory';
import BusHistory from './BusHistory';

const BookingHistory = () => {



    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };







    return (

        <div>
            <InsideNavbar />
            <div className='container bookingMargin'>
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={value}>
                        <Box sx={{ marginBottom: "20px", fontSize: "18px", borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange}
                                textColor="secondary"
                                indicatorColor="secondary"
                                aria-label="lab API tabs example">
                                <Tab label="Flight" value="1" />
                                <Tab label="Hotel" value="2" />
                                <Tab label="Bus" value="3" />
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            <FlightHistory />
                        </TabPanel>
                        <TabPanel value="2">
                            <HotelHistory />
                        </TabPanel>
                        <TabPanel value="3">
                            <BusHistory />
                        </TabPanel>
                    </TabContext>
                </Box>


            </div>
        </div>
    )
}

export default BookingHistory
