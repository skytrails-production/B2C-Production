import * as React from 'react';
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import './card.css';
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const Homeform = (props) => {

    return (
        <section>
            {/* <div className="container homeform_container">
                <p className="header_row">
                    <h5>{props.header}</h5>
                </p>
                <div className="row content_row" >

                    <div className="col-md-12" mx={5}>
                        <Box sx={{ width: '100%', typography: 'body1' }} >
                            <Box py={2} sx={{ backgroundColor: "white", borderRadius: "20px", }}>

                                <form action="">
                                    <div className="row">
                                        <div className="col-12 col-md-6 col-lg-3 mb-3">
                                            <div className="form_input">
                                                <label for="from" className="form_lable">FROM</label>
                                                <select name="" id="" style={{ width: "100%", borderRadius: "20PX", height: "5rem", border: "3px solid #70707069", paddingLeft: '25px' }}>
                                                    <option mx={5}>Enter City or airport </option>
                                                    <option px={5} sx={{ fontSize: "9px", fontWeight: "bold" }}>hello1</option>
                                                    <option px={5}>hello2</option>
                                                    <option px={5}>hello3</option>
                                                    <option mx={5}>hello4</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-3 mb-3">
                                            <div className="form_input">
                                                <label for="to" className="form_lable">TO</label>
                                                <select name="" id="" style={{ width: "100%", borderRadius: "20PX", height: "5rem", border: "3px solid #70707069", paddingLeft: '25px' }}>
                                                    <option mx={5}>Enter City or airport </option>
                                                    <option px={5} sx={{ fontSize: "9px", fontWeight: "bold" }}>hello1</option>
                                                    <option px={5}>hello2</option>
                                                    <option px={5}>hello3</option>
                                                    <option mx={5}>hello4</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-2 mb-3">
                                            <div className="form_input">
                                                <label for="departure" className="form_lable">DEPARTURE</label>

                                                <input type="date" name="departure" id="departure" className="deaprture_input" placeholder="Enter city or airport" >

                                                </input>
                                            </div>
                                        </div>

                                        <div className="col-12 col-md-6 col-lg-4 mb-3">
                                            <div className="form_input">
                                                <label className="form_lable">TRAVELLERS & CLASS </label>



                                                <div name="" id="" style={{ width: "100%", borderRadius: "20PX", height: "5rem", border: "3px solid #70707069", textAlign: 'center', alignItems: 'center', display: 'flex', paddingLeft: '25px' }}>

                                                    <Typography>1 Adult Business</Typography>
                                                    <Classselect />

                                                </div>

                                            </div>
                                        </div>

                                    </div>
                                </form>

                            </Box>
                            <Box py={2} sx={{ backgroundColor: "white", borderRadius: "20px", }}>

                                <form action="">
                                    <div className="row">
                                        <div className="col-12 col-md-6 col-lg-3 mb-3">
                                            <div className="form_input">
                                                <label for="from" className="form_lable">FROM</label>
                                                <select name="" id="" style={{ width: "100%", borderRadius: "20PX", height: "5rem", border: "3px solid #70707069", paddingLeft: '25px' }}>
                                                    <option mx={5}>Enter City or airport </option>
                                                    <option px={5} sx={{ fontSize: "9px", fontWeight: "bold" }}>hello1</option>
                                                    <option px={5}>hello2</option>
                                                    <option px={5}>hello3</option>
                                                    <option mx={5}>hello4</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-3 mb-3">
                                            <div className="form_input">
                                                <label for="to" className="form_lable">TO</label>
                                                <select name="" id="" style={{ width: "100%", borderRadius: "20PX", height: "5rem", border: "3px solid #70707069", paddingLeft: '25px' }}>
                                                    <option mx={5}>Enter City or airport </option>
                                                    <option px={5} sx={{ fontSize: "9px", fontWeight: "bold" }}>hello1</option>
                                                    <option px={5}>hello2</option>
                                                    <option px={5}>hello3</option>
                                                    <option mx={5}>hello4</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-2 mb-3">
                                            <div className="form_input">
                                                <label for="departure" className="form_lable">DEPARTURE</label>

                                                <input type="date" name="departure" id="departure" className="deaprture_input" placeholder="Enter city or airport" >

                                                </input>
                                            </div>
                                        </div>



                                        <div className="col-12 col-md-6 col-lg-2 mb-3">
                                            <div className="form_input">
                                                <label className="form_lable">TRAVELLERS & CLASS </label>


                                                <div name="" id="" style={{ width: "100%", borderRadius: "20PX", height: "5rem", border: "3px solid #70707069", alignItems: 'center', display: 'flex', paddingLeft: '25px' }}>

                                                    <Typography>1 Adult Business</Typography>
                                                    <Classselect />

                                                </div>

                                            </div>
                                        </div>

                                        <div className="col-12 col-md-6 col-lg-2 " >

                                            <Addanothercity />


                                        </div>

                                    </div>
                                </form>

                            </Box>
                            <form action='/Searchresult'>
                                <Box display='flex' justifyContent='center'>
                                    <div class="wrapper">

                                        <text>Select A Fare Type:</text>
                                        <input type="radio" name="select" id="option-1" checked />
                                        <input type="radio" name="select" id="option-2" />
                                        <input type="radio" name="select" id="option-3" />
                                        <input type="radio" name="select" id="option-4" />
                                        <input type="radio" name="select" id="option-5" />
                                        <input type="radio" name="select" id="option-6" />
                                        <label for="option-1" class="option option-1">
                                            <div class="dot"></div>
                                            <text >Regular Fares</text>
                                        </label>
                                        <label for="option-2" class="option option-2">
                                            <div class="dot"></div>
                                            <text>Armed Forces Fares</text>
                                        </label>
                                        <label for="option-3" class="option option-3">
                                            <div class="dot"></div>
                                            <text>Student Fares</text>
                                        </label>
                                        <label for="option-4" class="option option-4">
                                            <div class="dot"></div>
                                            <text>Senior Citizen Fares</text>
                                        </label>
                                        <label for="option-5" class="option option-5">
                                            <div class="dot"></div>
                                            <text>Doctors & Nurses Fares</text>
                                        </label>
                                        <label for="option-6" class="option option-6">
                                            <div class="dot"></div>
                                            <text>Double Seat Fares</text>
                                        </label>
                                        <text className='col-auto fare_search '  >
                                            <button type='submit' path="" className='search' >  Search</button>

                                        </text>


                                    </div>
                                </Box>
                            </form>

                        </Box>
                    </div>

                </div>
            </div> */}
        </section>
    )
}

export default Homeform;