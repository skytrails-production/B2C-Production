import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import "./bussearchreview.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import coupon from "../../../images/coupon.png";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import { useNavigate } from "react-router-dom";

const BusSearchReview = () => {
  const initialvalue = {
    gender: "",
    fname: "",
    lname: "",
    age: "",
    number: "",
    email: "",
    city: "",
    gst: "",
    address: "",
    phone: "",
  };
  const [serviceList, setServiceList] = useState([{ service: "" }]);
  const [values, setValues] = useState(initialvalue);
  const [error, setError] = useState(false);
  const [phone, setPhone] = useState("");
  const [bookingOption, setBookingOption] = useState("");
  console.log(bookingOption);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleServiceChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...serviceList];
    list[index][name] = value;
    setServiceList(list);
  };

  const handleServiceRemove = (index) => {
    const list = [...serviceList];
    list.splice(index, 1);
    setServiceList(list);
  };

  const handleServiceAdd = () => {
    setServiceList([...serviceList, { service: "" }]);
  };
  // end

  function handleSubmit(e) {
    e.preventDefault();

    if (
      values.fname.length < 1 ||
      values.lname.length < 1 ||
      values.age.length < 1 ||
      values.number.length < 1 ||
      values.gender.length < 1 ||
      values.city.length < 1 ||
      values.gst.length < 1 ||
      values.address.length < 1 ||
      values.phone.length < 1 ||
      values.email.length < 1
    ) {
      setError(true);
    }
  }

  return (
    <div>
      <div className="container">
        <Box className="bus_search_review" mt={3} p={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} lg={9}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box display="flex" alignItems="center">
                  <Typography className="gola_title">
                    Gola Bus Service
                  </Typography>
                  <Box>
                    <Typography className="delhi_kanpur">
                      Delhi <ArrowForwardIcon /> Kanpur
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <Typography className="seat_selected">
                    1 Seat Selected
                  </Typography>
                </Box>
              </Box>
              <Box
                mt={1}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box display="flex" alignItems="center">
                  <Box className="rating_title">
                    <Typography className="rating_value">4.9/5</Typography>
                  </Box>
                  <Box>
                    <Typography className="rating_number">
                      654 Ratings
                    </Typography>
                  </Box>
                  <Box>
                    <Typography className="gps_enabled">GPS Enabled</Typography>
                  </Box>
                </Box>
                <Box>
                  <Typography className="seat_number">Seat No: 6</Typography>
                </Box>
              </Box>
              <Box
                mt={1}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box>
                  <Typography className="seater_sleeper">
                    A/C Seater/Sleeper (2+1)
                  </Typography>
                </Box>
                <Box>
                  <Typography className="view_politics">
                    View Policies
                  </Typography>
                </Box>
              </Box>
              <Box mt={3} p={3} className="Left_side_container">
                <Box>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Box>
                      <Typography className="time_date">
                        20:00 21 Feb' 23, Tue
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" width="100px">
                      <Typography className="time_date_dot"></Typography>
                      <Typography className="time_date_border"></Typography>
                      <Typography className="time_date_dot"></Typography>
                    </Box>
                    <Box>
                      <Typography className="time_date">
                        02:30 22 Feb' 23, Wed
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Box>
                    <Typography className="content_direction">
                      Delhi - Kashmiri gate
                    </Typography>
                  </Box>
                  <Box>
                    <Typography className="content_direction">
                      Kanpur - Rama devi chowraha
                    </Typography>
                  </Box>
                </Box>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Box>
                    <Typography className="content_para">
                      Parking No. 1 Near kashmiri Gate Metro Gate No; 1 , delhi
                    </Typography>
                  </Box>
                  <Box>
                    <Typography className="content_para">
                      Parking No. 1 Near kashmiri Gate Metro Gate No; 1 , delhi
                    </Typography>
                  </Box>
                </Box>
                <Box mt={2}>
                  <Typography className="content_traveller">
                    Enter Traveller Details
                  </Typography>
                </Box>

                <Box>
                  <Box>
                    {serviceList.map((singleService, index) => (
                      <div key={index} className="services" py={1}>
                        <Box mt={2}>
                          <Typography className="seat_content">
                            Seat 6
                          </Typography>
                          <Grid container spacing={3} mt={1}>
                            <Grid item xs={12} sm={12} md={3}>
                              <Box className="contact_input">
                                <label  className="form_lable">
                                  First Name{" "}
                                  <span className="star_color">*</span>
                                </label>
                                <input
                                  type="text"
                                  className="from_input"
                                  value={values.fname}
                                  onChange={handleChange}
                                  placeholder="Enter your name"
                                  name="fname"
                                />
                                {error && values.fname.length < 1 ? (
                                  <label
                                    style={{
                                      color: "red",
                                      fontSize: "12px",
                                      textAlign: "left",
                                    }}
                                  >
                                    Please Enter First Name{" "}
                                  </label>
                                ) : (
                                  ""
                                )}
                              </Box>
                            </Grid>
                            <Grid item xs={12} sm={12} md={3} py={1}>
                              <Box className="contact_input">
                                <label  className="form_lable">
                                  Last Name{" "}
                                  <span className="star_color">*</span>
                                </label>
                                <input
                                  type="text"
                                  
                                  className="from_input"
                                  value={values.lname}
                                  onChange={handleChange}
                                  placeholder="Enter your last name"
                                  name="lname"
                                />
                                {error && values.lname.length < 1 ? (
                                  <label
                                    style={{
                                      color: "red",
                                      fontSize: "12px",
                                      textAlign: "left",
                                    }}
                                  >
                                    Please Enter Last Name{" "}
                                  </label>
                                ) : (
                                  ""
                                )}
                              </Box>
                            </Grid>

                            <Grid item xs={12} sm={12} md={3}>
                              <Box className="contact_input">
                                <label  className="form_lable">
                                  Age (In Year){" "}
                                  <span className="star_color">*</span>
                                </label>
                                <input
                                  type="text"
                                  name="age"
                                  className="from_input"
                                  placeholder="Enter your age"
                                  value={values.age}
                                  onChange={handleChange}
                                />
                                {error && values.age.length < 1 ? (
                                  <label
                                    style={{
                                      color: "red",
                                      fontSize: "12px",
                                      textAlign: "left",
                                    }}
                                  >
                                    Please Enter Your age{" "}
                                  </label>
                                ) : (
                                  ""
                                )}
                              </Box>
                            </Grid>
                            <Grid item xs={12} sm={12} md={3} py={1}>
                              <Box className="contact_input">
                                <label  className="form_lable">
                                  Gender<span className="star_color">*</span>
                                </label>
                                <select
                                  className="select_class"
                                  name="gender"
                                  value={values.gender}
                                  onChange={handleChange}
                                >
                                  <option value="">Gender</option>
                                  <option value="1">Male</option>
                                  <option value="2">Female</option>
                                </select>
                                {error && values.gender.length < 1 ? (
                                  <label
                                    style={{
                                      color: "red",
                                      fontSize: "12px",
                                      textAlign: "left",
                                    }}
                                  >
                                    Please Select gender{" "}
                                  </label>
                                ) : (
                                  ""
                                )}
                              </Box>
                            </Grid>
                          </Grid>
                          <Box
                            className="second_division"
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            {serviceList.length - 1 === index &&
                              serviceList.length < 9 && (
                                <Button
                                  style={{ color: "#008FCC" }}
                                  variant=""
                                  type="button"
                                  onClick={() => {
                                    handleServiceAdd();
                                  }}
                                >
                                  <span>+ Add More Passenger Details</span>
                                </Button>
                              )}
                            {serviceList.length !== 1 && (
                              <Button
                                variant="contained"
                                color="warning"
                                type="button"
                                onClick={() => {
                                  handleServiceRemove(index);
                                }}
                              >
                                <span> -Remove </span>
                              </Button>
                            )}
                          </Box>
                        </Box>
                      </div>
                    ))}
                  </Box>
                </Box>

                <Box my={1}>
                  <Box>
                    <Typography className="contact_text">
                      Please enter contact details
                    </Typography>
                  </Box>
                  <Grid my={1} container spacing={3}>
                    <Grid item md={4}>
                      <Box className="contact_input">
                        <label  className="form_lable">
                          Email <span className="star_color">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          
                          className="from_input"
                          placeholder="Enter your Email"
                          value={values.email}
                          onChange={handleChange}
                        />
                        {error && values.email.length < 1 ? (
                          <label
                            style={{
                              color: "red",
                              fontSize: "12px",
                              textAlign: "left",
                            }}
                          >
                            Please Enter Your Email
                          </label>
                        ) : (
                          ""
                        )}
                      </Box>
                    </Grid>
                    <Grid item md={4}>
                      <Box className="contact_input">
                        <label  className="form_lable">
                          Mobile<span className="star_color">*</span>
                        </label>
                        <PhoneInput
                          style={{
                            position: "initial",
                            height: "50px",
                            width: "306px",
                            borderRadius: "10px",
                            border: "3px solid #DFDFDF",
                            boxShadow: "0px 3px 6px #DFDFDF",
                          }}
                          name="phone"
                          country={"in"}
                          enableSearch={true}
                          value={phone}
                          onChange={(phone) => setPhone(phone)}
                        />
                         {error && phone.length < 1 ? (
                          <label
                            style={{
                              color: "red",
                              fontSize: "12px",
                              textAlign: "left",
                            }}
                          >
                            Please Enter Your Number
                          </label>
                        ) : (
                          ""
                        )}
                      </Box>
                    </Grid>
                  </Grid>
                </Box>

                <Box mt={2}>
                  <Box>
                    <Typography className="contact_text">
                      Please enter GST Details
                    </Typography>
                  </Box>
                  <Grid my={1} container spacing={3}>
                    <Grid item md={3}>
                      <Box className="contact_input">
                        <label  className="form_lable">
                          City
                        </label>
                        <input
                          type="text"
                          name="city"
                          
                          className="from_input"
                          placeholder="Enter your City"
                          value={values.city}
                          onChange={handleChange}
                        />
                        {error && values.city.length < 1 ? (
                          <label
                            style={{
                              color: "red",
                              fontSize: "12px",
                              textAlign: "left",
                            }}
                          >
                            Please Enter Your city
                          </label>
                        ) : (
                          ""
                        )}
                      </Box>
                    </Grid>
                    <Grid item md={3}>
                      <Box className="contact_input">
                        <label  className="form_lable">
                          GST State<span className="star_color">*</span>
                        </label>
                        <select
                          className="dropdown_select"
                          name="gst"
                          value={values.gst}
                          onChange={handleChange}
                        >
                          <option value=""></option>
                          <option value="1"></option>
                          <option value="2"></option>
                          <option value="3"></option>
                          <option value="4"></option>
                        </select>
                        {error && values.gst.length < 1 ? (
                          <label
                            style={{
                              color: "red",
                              fontSize: "12px",
                              textAlign: "left",
                            }}
                          >
                            Please Enter GST State
                          </label>
                        ) : (
                          ""
                        )}
                      </Box>
                    </Grid>
                    <Grid item md={5}>
                      <Box className="contact_input">
                        <label  className="form_lable">
                          Address
                        </label>
                        <input
                          type="text"
                          name="address"
                          
                          className="from_input"
                          placeholder="Eg. House no. Street name ..."
                          value={values.address}
                          onChange={handleChange}
                        />
                        {error && values.address.length < 1 ? (
                          <label
                            style={{
                              color: "red",
                              fontSize: "12px",
                              textAlign: "left",
                            }}
                          >
                            Please Enter address
                          </label>
                        ) : (
                          ""
                        )}
                      </Box>
                    </Grid>
                  </Grid>
                </Box>

                <Box>
                  <Box mt={2}>
                    <Typography className="contact_text">
                      Offers For You
                    </Typography>
                  </Box>
                  <Box mt={1} display="flex" alignItems="center">
                    <img src={coupon} />
                    <Typography className="contact_text">
                      Coupon Code
                    </Typography>
                  </Box>
                  <Box pl={3}>
                    <Box
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: "8px",
                      }}
                    >
                      <Typography className="content_coupon">
                        <input
                          className="radio"
                          type="radio"
                          value="booking1"
                          checked={bookingOption === "booking1"}
                          onClick={(e) => setBookingOption("booking1")}
                        />
                      </Typography>
                      <Typography className="coupon_text">
                        TRAVVFEST
                        <Typography
                          style={{ flexGrow: 1 }}
                          className="coupon_para"
                        >
                          Exclusive Offer on Citibank Cards : Flat 10% off
                        </Typography>
                      </Typography>
                    </Box>
                    <Box
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: "8px",
                      }}
                    >
                      <Typography className="content_coupon">
                        <input
                          className="radio"
                          type="radio"
                          value="booking2"
                          checked={bookingOption === "booking2"}
                          onClick={(e) => setBookingOption("booking2")}
                        />
                      </Typography>
                      <Typography className="coupon_text">
                        TRAFERTXS
                        <Typography
                          style={{ flexGrow: 1 }}
                          className="coupon_para"
                        >
                          Upto 10% off. You are saving Rs 35 on this booking
                        </Typography>
                      </Typography>
                    </Box>
                    <Box
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: "8px",
                      }}
                    >
                      <Typography className="content_coupon">
                        <input
                          className="radio"
                          type="radio"
                          value="booking3"
                          checked={bookingOption === "booking3"}
                          onClick={(e) => setBookingOption("booking3")}
                        />
                      </Typography>
                      <Typography className="coupon_text">
                        TRABUS
                        <Typography
                          style={{ flexGrow: 1 }}
                          className="coupon_para"
                        >
                          Get upto Rs. 500 off. You are saving Rs. 23 on this
                          booking.
                        </Typography>
                      </Typography>
                    </Box>
                    <Box
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: "8px",
                      }}
                    >
                      <Typography className="content_coupon">
                        <input
                          className="radio"
                          type="radio"
                          value="booking4"
                          checked={bookingOption === "booking4"}
                          onClick={(e) => setBookingOption("booking4")}
                        />
                      </Typography>
                      <Typography className="coupon_text">
                        BUSTRAINPASS
                        <Typography
                          style={{ flexGrow: 1 }}
                          className="coupon_para"
                        >
                          Travel Pass - Buy for Rs. 99 and get instant Rs. 50
                          off and 4 vouchers each worth Rs. 50 off on bus/Rs. 25
                          off on train bookings
                        </Typography>
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box mt={1} display="flex" alignItems="center" spacing={2}>
                  <Box>
                    <input
                      className="coupon_code_text"
                      type="text"
                      placeholder="Enter Coupon Code"
                    />
                  </Box>
                  <Box ml={2}>
                    <Button variant="contained">Apply</Button>
                  </Box>
                </Box>
                <Box mt={1}>
                  <Typography className="content_traveller">
                    Acknowledgement
                  </Typography>
                </Box>
                <Box mt={1}>
                  <Typography className="proceeding_text">
                    By proceeding, I agree to Travvolt{" "}
                    <span style={{ color: " #006FFF" }}>
                      User Agreement, Terms of Service and Privacy Policy{" "}
                    </span>{" "}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} lg={3}>
              <Box mt={3} p={3} className="Left_side_container">
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Box>
                    <Typography className="base_fare_text">
                      Base Fare
                    </Typography>
                  </Box>
                  <Box>
                    <Typography className="base_fare_text">$1122</Typography>
                  </Box>
                </Box>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Box>
                    <Typography className="base_fare_text">Tax</Typography>
                  </Box>
                  <Box>
                    <Typography className="base_fare_text">$22</Typography>
                  </Box>
                </Box>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Box>
                    <Typography className="base_fare_text">
                      Coupon Code
                    </Typography>
                  </Box>
                  <Box>
                    <Typography className="base_fare_text">$52</Typography>
                  </Box>
                </Box>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Box>
                    <Typography className="base_fare_text">
                      Total Base Price
                    </Typography>
                  </Box>
                  <Box>
                    <Typography className="total_base_price">$4147</Typography>
                  </Box>
                </Box>
                <Box>
                  <Button
                    onDoubleClick={() => navigate("/BusBookingConfirmation")}
                    type="submit"
                    onClick={handleSubmit}
                    variant="contained"
                    style={{
                      fontSize: "12px",
                      borderRadius: "30px",
                      padding: "10px",
                    }}
                  >
                    Continue to Book Online
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
};

export default BusSearchReview;
