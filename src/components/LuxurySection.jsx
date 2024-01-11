import { Paper, Box, Grid, Typography, Button } from '@mui/material'
import React from 'react'
import Card2 from "../components/Card2";

const LuxurySection = () => {
    return (
        <React.Fragment>
            <section>
                <div className="container homeform_container">
                    <Box mt="20px">
                        <Paper elevation={3} py={2} px={4} sx={{ borderRadius: '15px', }}>
                            <Grid container elevation={3} px={8} alignItems="center" py={2}>
                                <Grid item xs={12} md={3} alignItems="center" display="flex" justifyContent='center'>

                                    <Box>
                                        <Typography fontSize="50px" fontWeight="bold" color="#006FFF" lineHeight="52px">skytrails </Typography>
                                        <Typography fontSize="50px" fontWeight="bold" color="#006FFF" lineHeight="52px">Lap Of Luxury</Typography>
                                        <Typography mt={1} fontWeight="bold">Escape to the epitome of luxury, packed with signature amenities and services</Typography>
                                        <Box mt={2}><Button variant='contained' color="warning">Learn More</Button></Box>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={3} my={2}>

                                    <Card2 />

                                </Grid>
                                <Grid item xs={12} md={3} my={2}>

                                    <Card2 />

                                </Grid>
                                <Grid item xs={12} md={3} my={2}>
                                    <Card2 />
                                </Grid>
                            </Grid>
                        </Paper>

                    </Box>
                </div>
            </section>
        </React.Fragment>
    )
}

export default LuxurySection;





