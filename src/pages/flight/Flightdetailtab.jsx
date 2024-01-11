import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';


export default function LabTabs() {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <React.Fragment>
            {/* <section>
        <Box sx={{ width: '930px', typography: 'body1', }}>
                <TabContext value={value} >
                    <Box >
                        <TabList onChange={handleChange} aria-label="lab API tabs example"  sx={{ backgroundColor: "white", borderRadius: "20px", margin: "20px", boxShadow: "2px 2px 8px gray", }}>
                            <Tab label="Flight Details" value="1" />
                            <Tab label="Fare Summary" value="2" />
                            <Tab label="Cancelation Rules " value="3" />
                            <Tab label="Date Change" value="4" />

                        </TabList>
                    </Box>


                    <TabPanel value="1" px={5}>
                        <Grid container p={2} display='flex' justifyContent='center'>
                            <Grid  md={3} display='flex' justifyContent='center' alignItems='center' >
                                <Box sx={{ width: '36px', height: '36px', border: '1px solid gray' }} >

                                </Box>
                                <Box px={1}>
                                    <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>IndiGO</Typography>
                                    <Typography sx={{ fontSize: '12px', fontWeight: 'bold' }}>6E 2431, 6E 909</Typography>
                                </Box>
                            </Grid>
                            <Grid md={3} display='flex' justifyContent='center' alignItems='center'>
                                <Box px={1} display="flex" alignItems="center" >
                                    <Box>
                                        <Typography sx={{ fontSize: '16px', fontWeight: 'bold', textAlign: 'right' }}>04:55</Typography>
                                        <Typography sx={{ fontSize: '12px', fontWeight: 'bold', color: '#707070', textAlign: 'right' }}>New Delhi Indira Gandhi International Airport India</Typography>
                                    </Box>
                                    <Box px={3}>
                                       <FlightTakeoffIcon sx={{color:'skyblue'}} />
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid md={3} display='flex' justifyContent='center' alignItems='center'>
                                <Box px={1}>
                                    <Typography sx={{ fontSize: '12px', fontWeight: 'bold', color: '#707070' }}>09h 15m</Typography>
                                        <Typography sx={{ fontSize: '16px', fontWeight: 'bold', textAlign: 'left' }}>---------</Typography>
                                    <Typography sx={{ fontSize: '10px', fontWeight: 'bold', color: '#707070' }}>1 Stop via Jaipur</Typography>
                                </Box>
                            </Grid>
                            <Grid md={3} display='flex' justifyContent='center' alignItems='center'>
                                <Box px={1} display="flex" alignItems="center" >
                                <Box px={3}>
                                       <FlightLandIcon sx={{color:'skyblue'}} />
                                    </Box>
                                    <Box>
                                        <Typography sx={{ fontSize: '16px', fontWeight: 'bold', textAlign: 'left' }}>04:55</Typography>
                                        <Typography sx={{ fontSize: '12px', fontWeight: 'bold', color: '#707070', textAlign: 'left' }}>New Delhi Indira Gandhi International Airport India</Typography>

                                    </Box>
                                    
                                </Box>
                            </Grid>


                        </Grid>
                    </TabPanel>
                    <TabPanel value="2" px={5}>
                    <Grid container p={2} display='flex' justifyContent='center'>
                            <Grid md={3} display='flex' justifyContent='center' alignItems='center' >
                                <Box sx={{ width: '36px', height: '36px', border: '1px solid gray' }} >

                                </Box>
                                <Box px={1}>
                                    <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>IndiGO</Typography>
                                    <Typography sx={{ fontSize: '12px', fontWeight: 'bold' }}>6E 2431, 6E 909</Typography>
                                </Box>
                            </Grid>
                            <Grid md={3} display='flex' justifyContent='center' alignItems='center'>
                                <Box px={1} display="flex" alignItems="center" >
                                    <Box>
                                        <Typography sx={{ fontSize: '16px', fontWeight: 'bold', textAlign: 'right' }}>04:55</Typography>
                                        <Typography sx={{ fontSize: '12px', fontWeight: 'bold', color: '#707070', textAlign: 'right' }}>New Delhi Indira Gandhi International Airport India</Typography>
                                    </Box>
                                    <Box px={3}>
                                       <FlightTakeoffIcon sx={{color:'skyblue'}} />
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid md={3} display='flex' justifyContent='center' alignItems='center'>
                                <Box px={1}>
                                    <Typography sx={{ fontSize: '12px', fontWeight: 'bold', color: '#707070' }}>09h 15m</Typography>
                                        <Typography sx={{ fontSize: '16px', fontWeight: 'bold', textAlign: 'left' }}>---------</Typography>
                                    <Typography sx={{ fontSize: '10px', fontWeight: 'bold', color: '#707070' }}>1 Stop via Jaipur</Typography>
                                </Box>
                            </Grid>
                            <Grid md={3} display='flex' justifyContent='center' alignItems='center'>
                                <Box px={1} display="flex" alignItems="center" >
                                <Box px={3}>
                                       <FlightLandIcon sx={{color:'skyblue'}} />
                                    </Box>
                                    <Box>
                                        <Typography sx={{ fontSize: '16px', fontWeight: 'bold', textAlign: 'left' }}>04:55</Typography>
                                        <Typography sx={{ fontSize: '12px', fontWeight: 'bold', color: '#707070', textAlign: 'left' }}>New Delhi Indira Gandhi International Airport India</Typography>

                                    </Box>
                                    
                                </Box>
                            </Grid>


                        </Grid>
                    </TabPanel>
                    <TabPanel value="3" px={5}>
                    <Grid container p={2} display='flex' justifyContent='center'>
                            <Grid md={3} display='flex' justifyContent='center' alignItems='center' >
                                <Box sx={{ width: '36px', height: '36px', border: '1px solid gray' }} >

                                </Box>
                                <Box px={1}>
                                    <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>IndiGO</Typography>
                                    <Typography sx={{ fontSize: '12px', fontWeight: 'bold' }}>6E 2431, 6E 909</Typography>
                                </Box>
                            </Grid>
                            <Grid md={3} display='flex' justifyContent='center' alignItems='center'>
                                <Box px={1} display="flex" alignItems="center" >
                                    <Box>
                                        <Typography sx={{ fontSize: '16px', fontWeight: 'bold', textAlign: 'right' }}>04:55</Typography>
                                        <Typography sx={{ fontSize: '12px', fontWeight: 'bold', color: '#707070', textAlign: 'right' }}>New Delhi Indira Gandhi International Airport India</Typography>
                                    </Box>
                                    <Box px={3}>
                                       <FlightTakeoffIcon sx={{color:'skyblue'}} />
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid md={3} display='flex' justifyContent='center' alignItems='center'>
                                <Box px={1}>
                                    <Typography sx={{ fontSize: '12px', fontWeight: 'bold', color: '#707070' }}>09h 15m</Typography>
                                        <Typography sx={{ fontSize: '16px', fontWeight: 'bold', textAlign: 'left' }}>---------</Typography>
                                    <Typography sx={{ fontSize: '10px', fontWeight: 'bold', color: '#707070' }}>1 Stop via Jaipur</Typography>
                                </Box>
                            </Grid>
                            <Grid md={3} display='flex' justifyContent='center' alignItems='center'>
                                <Box px={1} display="flex" alignItems="center" >
                                <Box px={3}>
                                       <FlightLandIcon sx={{color:'skyblue'}} />
                                    </Box>
                                    <Box>
                                        <Typography sx={{ fontSize: '16px', fontWeight: 'bold', textAlign: 'left' }}>04:55</Typography>
                                        <Typography sx={{ fontSize: '12px', fontWeight: 'bold', color: '#707070', textAlign: 'left' }}>New Delhi Indira Gandhi International Airport India</Typography>

                                    </Box>
                                    
                                </Box>
                            </Grid>


                        </Grid>
                    </TabPanel>
                    <TabPanel value="4" px={5}>
                    <Grid container p={2} display='flex' justifyContent='center'>
                            <Grid md={3} display='flex' justifyContent='center' alignItems='center' >
                                <Box sx={{ width: '36px', height: '36px', border: '1px solid gray' }} >

                                </Box>
                                <Box px={1}>
                                    <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>IndiGO</Typography>
                                    <Typography sx={{ fontSize: '12px', fontWeight: 'bold' }}>6E 2431, 6E 909</Typography>
                                </Box>
                            </Grid>
                            <Grid md={3} display='flex' justifyContent='center' alignItems='center'>
                                <Box px={1} display="flex" alignItems="center" >
                                    <Box>
                                        <Typography sx={{ fontSize: '16px', fontWeight: 'bold', textAlign: 'right' }}>04:55</Typography>
                                        <Typography sx={{ fontSize: '12px', fontWeight: 'bold', color: '#707070', textAlign: 'right' }}>New Delhi Indira Gandhi International Airport India</Typography>
                                    </Box>
                                    <Box px={3}>
                                       <FlightTakeoffIcon sx={{color:'skyblue'}} />
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid md={3} display='flex' justifyContent='center' alignItems='center'>
                                <Box px={1}>
                                    <Typography sx={{ fontSize: '12px', fontWeight: 'bold', color: '#707070' }}>09h 15m</Typography>
                                        <Typography sx={{ fontSize: '16px', fontWeight: 'bold', textAlign: 'left' }}>---------</Typography>
                                    <Typography sx={{ fontSize: '10px', fontWeight: 'bold', color: '#707070' }}>1 Stop via Jaipur</Typography>
                                </Box>
                            </Grid>
                            <Grid md={3} display='flex' justifyContent='center' alignItems='center'>
                                <Box px={1} display="flex" alignItems="center" >
                                <Box px={3}>
                                       <FlightLandIcon sx={{color:'skyblue'}} />
                                    </Box>
                                    <Box>
                                        <Typography sx={{ fontSize: '16px', fontWeight: 'bold', textAlign: 'left' }}>04:55</Typography>
                                        <Typography sx={{ fontSize: '12px', fontWeight: 'bold', color: '#707070', textAlign: 'left' }}>New Delhi Indira Gandhi International Airport India</Typography>

                                    </Box>
                                    
                                </Box>
                            </Grid>


                        </Grid>
                    </TabPanel>

                </TabContext>
            </Box>
        </section> */}

        </React.Fragment>
    );
}