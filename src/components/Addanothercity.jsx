import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Form, Button, Col } from 'react-bootstrap';
import { Box, Typography } from '@mui/material';
import Classselect from "../components/Classselect";

const Dynamicform = () => {

  const [roomType, setRoomType] = useState('');
  const [roomNumber, setRoomNumber] = useState(1);
  const [guest, setGuest] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log('roomType', roomType)
    // console.log('room number', roomNumber)
    // console.log('guest', guest)
  }
  const [bookRoomData, setBookRoomData] = useState([
    { roomType: '', roomNumber: 0, guest: 0 }
  ]);

  const handleAddFields = () => {
    const values = [...bookRoomData];
    values.push({ roomType: '', roomNumber: 0, guest: 0 })
    setBookRoomData(values);
  };

  const handleRemoveFields = index => {
    const values = [...bookRoomData];
    if (values.length > 1) values.pop();
    setBookRoomData(values);
  };

  return (

    <Form>
      {
        bookRoomData.map((data, i) => {
          return (
            <section className='mt-3' key={i}>
              <div className="container">
                <div className="row">
                  <Box sx={{ backgroundColor: "white", borderRadius: "20px", }}>

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


                            <div name="" id="" style={{ width: "100%", borderRadius: "20PX", height: "5rem", border: "3px solid #70707069", alignItems: 'center', display: 'flex', paddingLeft: '25px' }}>

                              <Typography>1 Adult Business</Typography>
                              <Classselect />

                            </div>

                          </div>
                        </div>

                      </div>
                    </form>
                    <Col className='pt-3 d-flex justify-content-between'>
                      <Button variant="outlined" style={{ border: '1px solid gray', color: "skyblue", }} onClick={handleAddFields}>Add Addanothercity</Button>
                      <Button variant="danger" onClick={handleRemoveFields}>Remove</Button>
                    </Col>
                  </Box>
                </div>
              </div>



            </section>
          )
        })
      }

    </Form>


  )
}

export default Dynamicform;