import React, { Component } from "react";
// import Slider from "react-slick";
import "./card.css";
import { NavLink } from 'react-router-dom';

import { Paper, Box } from "@mui/material";

export default class SwipeToSlide extends Component {
    render() {

        return (
            <section>
                <div className="container homeform_container">
                    <Box mt={3}>
                        <Paper elevation={3} py={2} sx={{ borderRadius: '15px', }}>
                            <div className="row card_row">
                                <div className="col-12">

                                    <div className="row all_offers">
                                        <div className="col-auto">
                                            <NavLink><span>All Offers</span></NavLink>
                                        </div>
                                        <div className="col-auto">
                                            <NavLink><span>Bank Offers </span></NavLink>
                                        </div>
                                        <div className="col-auto">
                                            <NavLink><span>Flights</span></NavLink>
                                        </div>
                                        <div className="col-auto">
                                            <NavLink><span>Hotels</span></NavLink>
                                        </div>
                                        <div className="col-auto">
                                            <NavLink><span>Holidays</span></NavLink>
                                        </div>
                                        <div className="col-auto">
                                            <NavLink><span>Trains</span></NavLink>
                                        </div>
                                        <div className="col-auto">
                                            <NavLink><span>Cabs</span></NavLink>
                                        </div>
                                        <div className="col-auto">
                                            <NavLink><span>Others</span></NavLink>
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </Paper>
                    </Box>
                </div>
            </section>
        );
    }
}