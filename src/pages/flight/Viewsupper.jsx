import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import NextWeekIcon from '@mui/icons-material/NextWeek';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AirlineSeatReclineExtraIcon from '@mui/icons-material/AirlineSeatReclineExtra';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import { Typography } from '@mui/material';
import './searchresult.css';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function BasicGrid() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Item>
                        <Typography px={2} className='main_heading'>Super 6E (All in one Fare )</Typography>
                        <Typography px={2} className='normal_head'>Priority Check-In and Boarding, Free XL Seat</Typography>
                        <Box display='flex' justifyContent="space-around" my={2}>
                            <Button mx={2} className="propsi" variant="contained" startIcon={<LocalMallIcon style={{ color: "#FF951A" }} ></LocalMallIcon>}  >
                                Cabin Bags  <Typography style={{ color: "#005CFF", marginLeft: '10px', fontSize: '10px' }}>7kg</Typography>
                            </Button>
                            <Button mx={2} className="propsi" variant="contained" startIcon={<NextWeekIcon style={{ color: "#FF951A" }} ></NextWeekIcon>}  >
                                Check-In Bags  <Typography style={{ color: "#005CFF", marginLeft: '10px', fontSize: '10px' }}>15Kg</Typography>
                            </Button>
                            <Button mx={2} className="propsi" variant="contained" sx={{ backgroundColor: '#DAF2FC', color: 'black', borderRadius: '10px', fontSize: '10px' }} startIcon={<AttachMoneyIcon style={{ color: "#FF951A" }} ></AttachMoneyIcon>}  >
                                Cancellation  <Typography style={{ color: "#005CFF", marginLeft: '10px', fontSize: '10px' }}>Cancellation Fee Starting $300</Typography>
                            </Button>
                            <Typography px={5} className='price_'>$3453</Typography>
                        </Box>
                        <Box display='flex' justifyContent="left" mt={2}>
                            <Button mx={2} className="propsi" variant="contained" startIcon={<CalendarTodayIcon style={{ color: "#FF951A" }} ></CalendarTodayIcon>}  >
                                Date Change<Typography style={{ color: "#005CFF", marginLeft: '10px', fontSize: '10px' }}>Cancellation Fee Starting $250</Typography>
                            </Button>
                            <Button mx={2} className="propsi" variant="contained" startIcon={<AirlineSeatReclineExtraIcon style={{ color: "#FF951A" }} ></AirlineSeatReclineExtraIcon>}  >
                                Seat <Typography style={{ color: "#005CFF", marginLeft: '10px', fontSize: '10px' }}>Free Seat Available</Typography>
                            </Button>


                        </Box>
                        <Box display='flex' justifyContent="space-between" mt={2}>
                            <Button mx={2} className="propsi" variant="contained" startIcon={<FastfoodIcon style={{ color: "#FF951A" }} ></FastfoodIcon>}  >
                                Meal  <Typography style={{ color: "#005CFF", marginLeft: '10px', fontSize: '10px' }}>Get Complimentary Meals</Typography>
                            </Button>

                            <Button variant='contained' className='booknow_btn'>Book Now</Button>
                        </Box>

                    </Item>
                </Grid>
            </Grid>
        </Box>
    );
}