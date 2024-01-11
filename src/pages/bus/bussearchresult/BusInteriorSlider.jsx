import React, { Component } from "react";
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

                                </div>
                            </div>
                        </Paper>
                    </Box>
                </div>
            </section>
        );
    }
}