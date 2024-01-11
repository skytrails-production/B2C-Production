import React, { Component } from "react";
import { Paper, Box } from "@mui/material";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "./card.css";

export default class SwipeToSlide extends Component {
    render() {

        return (
            // Error getting so display none
            <section style={{ display: 'none' }}>

                <div className="container homeform_container">
                    <Box mt={3}>
                        <Paper elevation={3} py={2} sx={{ borderRadius: '15px', }}>
                            <h2 className="card_header">Popular Destinations</h2>

                        </Paper>
                    </Box>
                </div>

            </section>
        );
    }
}