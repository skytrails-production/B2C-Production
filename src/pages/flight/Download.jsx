import ticket from "../../images/ticket.png"
import scan from "../../images/scan.png"
import React from "react";
import { Paper, Box } from "@mui/material";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import '../../components/card.css';
const Download = () => {
    return (
        <React.Fragment>
            <section>
                
            {/* <div className="container homeform_container">
                        <Box pt={3}>
                            <Paper elevation={3} py={2} sx={{ borderRadius: '15px',width:'80%' }}>
                                <div className="download_header">
                                    <h3>Download App Now !</h3>
                                    <h5>Get India's #1 travel super app, join 10 Million+ happy travellers!</h5>
                                </div>
                                <div className="download_info">
                                    <div>
                                        <img src={ticket} alt="download App" />
                                    </div>
                                    <div className="down" >
                                        <h5>Use code WELCOMETRAVVOLT and get up to RS 1200 off on your first domestic flight booking</h5>
                                        <div class="form-group">
                                            <input type="tel" className="form-field" placeholder="Enter Mobile Number" />
                                            <span>Get App Link</span>
                                        </div>
                                    </div>
                                    <div className="scan_wrapper">
                                        <h6>More ways to get the app</h6>
                                        <div className="scan_logo">
                                            <img src={scan} alt="scan logo" />
                                        </div>
                                        <h6 className="scan_text">Scan</h6>
                                    </div>
                                </div>
                            </Paper>
                        </Box>
                        </div> */}
                
            </section>
        </React.Fragment>
    )
}

export default Download;