import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab, Typography } from '@mui/material';
import React from 'react';
import Classselect from "../../../components/Classselect";
import Addanothercity from "../../../components/Addanothercity";
import './taxisearchform.css';


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const Taxisearchform = () => {

    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className='container'>
            <Box  className='taxi_search_form'>
                <TabContext value={value} centered>
                    <Box>
                        <TabList onChange={handleChange} aria-label="lab API tabs example"
                            TabIndicatorProps={{ style: { display: "none", }, }}
                            sx={{ marginX: "60px", }}>
                            <Tab label="Out Station One-Way" value="1" sx={{ fontSize: '15px', color: 'black', fontWeight: 'bold', background: 'white', marginX: '5px', borderRadius: '10px' }}  ></Tab>
                            <Tab label="Out Station Round Trip" value="2" sx={{ fontSize: '15px', color: 'black', fontWeight: 'bold', background: 'white', marginX: '5px', borderRadius: '10px' }} />
                            <Tab label="Airport Tranfers " value="3" sx={{ fontSize: '15px', color: 'black', fontWeight: 'bold', background: 'white', marginX: '5px', borderRadius: '10px' }} />
                            <Tab label="Hourly Rentals " value="4" sx={{ fontSize: '15px', color: 'black', fontWeight: 'bold', background: 'white', marginX: '5px', borderRadius: '10px' }} />


                        </TabList>
                    </Box>
                    {/* Oneway start */}

                    <TabPanel value="1" >
                        <Box>

                            <form action="">
                                <div className="row">
                                    <div className="col-12 col-md-6 col-lg-2">
                                        <div className="form_input">
                                            <label for="from" className="form_lable">FROM</label>
                                            <select name="" id="" style={{ width: "100%", borderRadius: "20px", height: "5rem", border: "3px solid #70707069", paddingLeft: '25px' }}>
                                                <option mx={5}>Enter City or airport </option>
                                                <option px={5} sx={{ fontSize: "9px", fontWeight: "bold" }}>hello1</option>
                                                <option px={5}>hello2</option>
                                                <option px={5}>hello3</option>
                                                <option mx={5}>hello4</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-12 col-md-6 col-lg-2">
                                        <div className="form_input">
                                            <label for="to" className="form_lable">TO</label>
                                            <select name="" id="" style={{ width: "100%", borderRadius: "20PX", height: "5rem", border: "3px solid #70707069", paddingLeft: '25px' }}>
                                                <div class="dot"></div><option mx={5}>Enter City or airport </option>
                                                <option px={5} sx={{ fontSize: "9px", fontWeight: "bold" }}>hello1</option>
                                                <option px={5}>hello2</option>
                                                <option px={5}>hello3</option>
                                                <option mx={5}>hello4</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6 col-lg-2">
                                        <div className="form_input">
                                            <label className="form_lable">DEPARTURE</label>

                                            <input type="date" name="departure" id="departure" className="deaprture_input" placeholder="Enter city or airport" >

                                            </input>
                                        </div>
                                    </div>

                                    <div className="col-12 col-md-6 col-lg-2">
                                        <div className="form_input">
                                            <label className="form_lable">RETURN</label>
                                            <input type="date" name="departure" id="departure" className="deaprture_input" placeholder="Enter city or airport" disabled>

                                            </input>
                                        </div>
                                    </div>

                                    <div className="col-12 col-md-6 col-lg-2">
                                        <div className="form_input">
                                            <label className="form_lable">TRAVELLERS & CLASS </label>
                                            <div name="" id="" style={{ width: "100%", borderRadius: "20PX", height: "5rem", border: "3px solid #70707069", textAlign: 'center', alignItems: 'center', display: 'flex', paddingLeft: '25px' }}>

                                                <Typography>1 Adult Business</Typography>
                                                <Classselect />

                                            </div>

                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6 col-lg-2">
                                        <form action='/TaxiSearchResult'>
                                            <Box display='flex' justifyContent='center'>
                                                <div class="wrapper">
                                                    <text className='col-auto fare_search '  >
                                                        <button type='submit' path="" className='search' >  Search</button>
                                                    </text>
                                                </div>
                                            </Box>
                                        </form>
                                    </div>

                                </div>
                            </form>

                        </Box>

                    </TabPanel>

                    {/* Oneway end */}
                    {/* Round trip start */}

                    <TabPanel value="2" >
                        <Box py={2} sx={{ backgroundColor: "white", borderRadius: "20px", }}>

                            <form action="">
                                <div className="row">
                                    <div className="col-12 col-md-6 col-lg-3">
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
                                    <div className="col-12 col-md-6 col-lg-3">
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
                                    <div className="col-12 col-md-6 col-lg-2">
                                        <div className="form_input">
                                            <label for="departure" className="form_lable">DEPARTURE</label>

                                            <input type="date" name="departure" id="departure" className="deaprture_input" placeholder="Enter city or airport" >

                                            </input>
                                        </div>
                                    </div>

                                    <div className="col-12 col-md-6 col-lg-2">
                                        <div className="form_input">
                                            <label className="form_lable">RETURN</label>
                                            <input type="date" name="departure" id="departure" className="deaprture_input" placeholder="Enter city or airport">

                                            </input>
                                        </div>
                                    </div>

                                    <div className="col-12 col-md-6 col-lg-2">
                                        <div className="form_input">
                                            <label className="form_lable">TRAVELLERS & CLASS </label>



                                            <div name="" id="" style={{ width: "100%", borderRadius: "20PX", height: "5rem", border: "3px solid #70707069", alignItems: 'center', display: 'flex', paddingLeft: '25px' }}>

                                                <Typography>1 Adult Business</Typography>
                                                <Classselect />

                                            </div>

                                        </div>
                                    </div>

                                </div>
                            </form>

                        </Box>
                        <form action='/Searchresult'>
                            <Box display='flex' justifyContent='center'>
                                <div class="wrapper">
                                    <text className='col-auto fare_search '  >
                                        <button type='submit' path="" className='search' >  Search</button>
                                    </text>
                                </div>
                            </Box>
                        </form>
                    </TabPanel>

                    {/* Round trip end */}

                    {/* Multicity start */}

                    <TabPanel value="3">
                        <Box py={2} sx={{ backgroundColor: "white", borderRadius: "20px", }}>

                            <form action="/Searchresult">
                                <div className="row">
                                    <div className="col-12 col-md-6 col-lg-3">
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
                                    <div className="col-12 col-md-6 col-lg-3">
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
                                    <div className="col-12 col-md-6 col-lg-2">
                                        <div className="form_input">
                                            <label for="departure" className="form_lable">DEPARTURE</label>

                                            <input type="date" name="departure" id="departure" className="deaprture_input" placeholder="Enter city or airport" >

                                            </input>
                                        </div>
                                    </div>



                                    <div className="col-12 col-md-6 col-lg-4">
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

                        <Box sx={{ backgroundColor: "white", borderRadius: "20px", }}>
                            <Addanothercity />
                        </Box>
                        <form action='/Searchresult'>
                            <Box display='flex' justifyContent='center'>
                                <div class="wrapper">
                                    <text className='col-auto fare_search '  >
                                        <button type='submit' path="" className='search' >  Search</button>
                                    </text>
                                </div>
                            </Box>
                        </form>
                    </TabPanel>

                    {/* Multicity end */}

                    {/* hourly start */}

                    <TabPanel value="4">
                        <Box py={2} sx={{ backgroundColor: "white", borderRadius: "20px", }}>

                            <form action="/Searchresult">
                                <div className="row">
                                    <div className="col-12 col-md-6 col-lg-3">
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
                                    <div className="col-12 col-md-6 col-lg-3">
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
                                    <div className="col-12 col-md-6 col-lg-2">
                                        <div className="form_input">
                                            <label for="departure" className="form_lable">DEPARTURE</label>

                                            <input type="date" name="departure" id="departure" className="deaprture_input" placeholder="Enter city or airport" >

                                            </input>
                                        </div>
                                    </div>



                                    <div className="col-12 col-md-6 col-lg-4">
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

                        <Box sx={{ backgroundColor: "white", borderRadius: "20px", }}>
                            <Addanothercity />
                        </Box>
                        <form action='/Searchresult'>
                            <Box display='flex' justifyContent='center'>
                                <div class="wrapper">
                                    <text className='col-auto fare_search '  >
                                        <button type='submit' path="" className='search' >  Search</button>
                                    </text>
                                </div>
                            </Box>
                        </form>
                    </TabPanel>

                    {/* hourly end */}

                </TabContext>
            </Box>
        </div>
    )
}

export default Taxisearchform
