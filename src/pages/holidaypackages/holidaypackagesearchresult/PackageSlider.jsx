import React, { Component } from "react";
import Slider from "react-slick";
import inter from "../../../images/img/inter.jpg";
import { Paper, Box, Typography } from "@mui/material";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import './packageSlider.css';
import PackageCard from "./PackageCard";

export default class SwipeToSlide extends Component {
    render() {
        const settings = {
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
            initialSlide: 0,
            responsive: [
                {
                    breakpoint: 1400,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 1,
                    }
                },
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                    }
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 500,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        };
        return (
            <section>

                <div className="container homeform_container">
                    <Box mt={3}>
                        <Paper elevation={3} py={10} sx={{ borderRadius: '15px', }}>

                            <Slider {...settings} style={{ margin: '20px' }}>
                                <Box p={2}>
                                    <PackageCard />
                                </Box>

                                <Box p={2}>
                                    <PackageCard />
                                </Box>

                                <Box p={2}>
                                    <PackageCard />
                                </Box>

                                <Box p={2}>
                                    <PackageCard />
                                </Box>

                                <Box p={2}>
                                    <PackageCard />
                                </Box>

                                <Box p={2}>
                                    <PackageCard />
                                </Box>

                                <Box p={2}>
                                    <PackageCard />
                                </Box>

                                <Box p={2}>
                                    <PackageCard />
                                </Box>

                                

                            </Slider>
                        </Paper>
                    </Box>
                </div>

            </section>
        );
    }
}