// import "../../Return/conformation.css";
// import "./busreasultform.css";

// import CancellationRefundPolicy from "../../flight/CancellationRefundPolicy";
// import TripSecureComponent from "../../flight/TripSecureComponent";
// import { styled } from "@mui/material/styles";
// import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
// import MuiAccordion from "@mui/material/Accordion";
// import MuiAccordionSummary from "@mui/material/AccordionSummary";
// import MuiAccordionDetails from "@mui/material/AccordionDetails";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
// import Chip from "@mui/material/Chip";

// import React, { useState } from "react";
// // hotel tabs
// import "bootstrap/dist/css/bootstrap.css";
// import Box from "@mui/material/Box";

// import Button from "@mui/material/Button";
// import { Grid, Typography } from "@mui/material";

// import Checkbox from "@mui/material/Checkbox";

// import { useDispatch, useSelector } from "react-redux";
// import { useLocation, useNavigate } from "react-router-dom";

// function CompleteBooking() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const queryParams = new URLSearchParams(location.search);
//   const adultCount = queryParams.get("adult");
//   const childCount = queryParams.get("child");
//   const infantCount = queryParams.get("infant");
//   const reducerState = useSelector((state) => state);
//   const TicketDetails = reducerState?.flightFare?.flightQuoteData?.Results;
//   const fareValue = reducerState?.flightFare?.flightQuoteData?.Results;
//   const ResultIndex = sessionStorage.getItem("ResultIndex");
//   // console.log("resultIndex", ResultIndex);
//   const label = { inputProps: { "aria-label": "Checkbox demo" } };
//   const results =
//     reducerState?.oneWay?.oneWayData?.data?.data?.Response?.Results;

//   const payload = {
//     EndUserIp: reducerState?.ip?.ipData,
//     TokenId: reducerState?.ip?.tokenData,
//     TraceId: reducerState?.oneWay?.oneWayData?.data?.data?.Response?.TraceId,
//     ResultIndex: ResultIndex,
//   };

//   const [expanded, setExpanded] = React.useState("panel1");

//   const handleChange = (panel) => (event, newExpanded) => {
//     setExpanded(newExpanded ? panel : false);
//   };

//   const [accordionExpanded, setAccordionExpanded] = React.useState(false);

//   const handleAccordionChange = (index) => (event, isExpanded) => {
//     setAccordionExpanded(isExpanded ? index : false);
//   };

//   const [value, setValue] = React.useState("1");

//   // Add form of passenger
//   const passengerTemplate = {
//     Title: "Mr",
//     FirstName: "Unit",
//     LastName: "test",
//     PaxType: 1,
//     DateOfBirth: "1987-12-06T00:00:00",
//     Gender: 1,
//     PassportNo: "",
//     PassportExpiry: "",
//     AddressLine1: "123, Test",
//     AddressLine2: "",
//     Fare: {
//       Currency: "INR",
//       BaseFare: 3171,
//       Tax: 1284,
//       YQTax: 0,
//       AdditionalTxnFeePub: 0,
//       AdditionalTxnFeeOfrd: 0,
//       OtherCharges: 116.96,
//       Discount: 0,
//       PublishedFare: 4581.96,
//       OfferedFare: 4355.03,
//       TdsOnCommission: 6.34,
//       TdsOnPLB: 9.14,
//       TdsOnIncentive: 6.22,
//       ServiceFee: 10,
//     },
//     City: "Gurgaon",
//     CountryCode: "IN",
//     CellCountryCode: "+92581-",
//     ContactNo: "1234567890",
//     Nationality: "IN",
//     Email: "harsh@tbtq.in",
//     IsLeadPax: true,
//     FFAirlineCode: null,
//     FFNumber: "",
//     GSTCompanyAddress: "",
//     GSTCompanyContactNumber: "",
//     GSTCompanyName: "",
//     GSTNumber: "",
//     GSTCompanyEmail: "",
//   };
//   const childPassenger = {
//     Title: "Mr",
//     FirstName: "Raj",
//     LastName: "test",
//     PaxType: 2,
//     DateOfBirth: "",
//     Gender: 1,
//     PassportNo: "",
//     PassportExpiry: "",
//     AddressLine1: "123, Test",
//     AddressLine2: "",
//     Fare: {
//       Currency: "INR",
//       BaseFare: 3171,
//       Tax: 1284,
//       YQTax: 0,
//       AdditionalTxnFeePub: 0,
//       AdditionalTxnFeeOfrd: 0,
//       OtherCharges: 116.96,
//       Discount: 0,
//       PublishedFare: 4581.96,
//       OfferedFare: 4355.03,
//       TdsOnCommission: 6.34,
//       TdsOnPLB: 9.14,
//       TdsOnIncentive: 6.22,
//       ServiceFee: 10,
//     },
//     City: "Gurgaon",
//     CountryCode: "IN",
//     CellCountryCode: "+92581-",
//     ContactNo: "9875432345",
//     Nationality: "IN",
//     Email: "harsh@tbtq.in",
//     IsLeadPax: false,
//     FFAirlineCode: null,
//     FFNumber: "",
//     GSTCompanyAddress: "",
//     GSTCompanyContactNumber: "",
//     GSTCompanyName: "",
//     GSTNumber: "",
//     GSTCompanyEmail: "",
//   };

//   // Initialize the passenger list with the required number of passengers
//   const passengerLists = [];
//   for (let i = 0; i < adultCount; i++) {
//     passengerLists.push({
//       ...passengerTemplate,
//       IsLeadPax: i === 0, // Set the first passenger as the lead passenger
//     });
//   }

//   const passengerChildLists = [];
//   for (let i = 0; i < childCount; i++) {
//     passengerChildLists.push({
//       ...childPassenger,
//       IsLeadPax: false, // Set the first passenger as the lead passenger
//     });
//   }

//   // Set the initial state of the passenger list
//   const [passengerList, setPassengerList] = useState(passengerLists);
//   const allPassenger = [passengerLists, passengerChildLists];
//   const [passengerData, setPassengerData] = useState(allPassenger.flat());

//   const handleServiceChange = (e, index) => {
//     const { name, value } = e.target;
//     const list = [...passengerData];
//     list[index][name] = value;
//     setPassengerData(list);
//   };
//   const handleChildChange = (e, index) => {
//     // const { name, value } = e.target;
//     // setPassengerData((prevList) => {
//     //   const newList = [...prevList];
//     //   newList[index + parseInt(adultCount)] = {
//     //     ...newList[index + parseInt(adultCount)],
//     //     [name]: value,
//     //   };
//     //   return newList;
//     // });
//     const { name, value } = e.target;
//     const list = [...passengerData];
//     list[index + parseInt(adultCount)][name] = value;
//     setPassengerData(list);
//   };

//   console.error(passengerData);

//   const dateString = TicketDetails?.Segments[0][0]?.Origin?.DepTime;
//   const date1 = new Date(dateString);
//   const time1 = date1.toLocaleTimeString()?.slice(0, 4);

//   const day1 = date1.getDate();
//   const month1 = date1.toLocaleString("default", {
//     month: "short",
//   });
//   const year1 = date1.getFullYear();
//   const formattedDate1 = `${day1 + " "} ${month1 + " "} ${year1 + " "}`;

//   const dateString1 = TicketDetails?.Segments[0][0]?.Destination?.ArrTime;
//   const date2 = new Date(dateString1);
//   const time2 = `${date2.toLocaleTimeString()?.slice(0, 4)}  `;

//   const day2 = `${date2.getDate()}  `;
//   const month2 = date2.toLocaleString("default", {
//     month: "short",
//   });
//   const year2 = date2.getFullYear();
//   const formattedDate2 = `${day2}  ${month2} ${year2}`;

//   // duration
//   const totalMinutes = TicketDetails?.Segments[0][0]?.Duration;
//   const durationHours = Math.floor(totalMinutes / 60);
//   const durationMinutes = totalMinutes % 60;
//   const duration_Time = `${durationHours} Hours and ${durationMinutes} minutes`;

//   const authenticUser = reducerState?.logIn?.loginData?.status;
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isRegModalOpen, setRegIsModalOpen] = useState(false);

//   // form submission
//   function handleSubmit(event) {
//     event.preventDefault();

//     if (authenticUser === 200) {
//       const formData = new FormData(event.target);

//       //
//       // }
//     } else {
//       setIsModalOpen(true);
//     }
//   }
//   const Accordion = styled((props) => (
//     <MuiAccordion disableGutters elevation={0} square {...props} />
//   ))(({ theme }) => ({
//     border: `1px solid ${theme.palette.divider}`,
//     "&:not(:last-child)": {
//       borderBottom: 0,
//     },
//     "&:before": {
//       display: "none",
//     },
//   }));

//   const AccordionSummary = styled((props) => (
//     <MuiAccordionSummary
//       expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
//       {...props}
//     />
//   ))(({ theme }) => ({
//     backgroundColor:
//       theme.palette.mode === "dark"
//         ? "rgba(255, 255, 255, .05)"
//         : "rgba(0, 0, 0, .03)",
//     flexDirection: "row-reverse",
//     "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
//       transform: "rotate(90deg)",
//     },
//     "& .MuiAccordionSummary-content": {
//       marginLeft: theme.spacing(1),
//     },
//   }));

//   const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
//     padding: theme.spacing(2),
//     borderTop: "1px solid rgba(0, 0, 0, .125)",
//   }));
//   // const navigate = useNavigate();
//   function handleButtonClick() {
//     // Perform any necessary actions before navigation
//     // For example, make API calls, form validation, etc.

//     // Navigate to the payment page

//     navigate("/paymentReturn");
//   }

//   return (
//     <div>
//       <div className="booking-header-container">
//         <div className="booking-title">
//           <div>Complete your Booking</div>
//         </div>
//       </div>

//       <div className="flightsummarybus" style={{ padding: "20px" }}>
//         <div
//           class="leftbus"
//           style={{ padding: "20px" }}
//         >
//           <div className="booking-details-container">
//             <div className="left-section">
//               <div className="company-name">Ashok Travels Mandsaur Group</div>
//               <div className="bus-details">NON AC Seater / Sleeper 2+1</div>
//             </div>
//             <div className="right-section">
//               <div className="seat-number">Seat No: H</div>
//               <div className="view-policies">View Policies</div>
//             </div>
//           </div>
//           <div className="travel-details-containerbus">
//             <div className="left-sectionbus">
//               <div className="time-and-locationbus">
//                 <div className="departure-timebus">
//                   <span className="timebus">19:00</span>
//                   <span className="day-of-weekbus">24 OCT’23, Tue</span>
//                 </div>
//                 <div className="locationbus">
//                   <span className="markerbus">G</span>
//                   <span className="location-namebus">okhle market</span>
//                 </div>
//               </div>
//               <div className="addressbus">
//                 SHOP NO. 36, TESS HAJARI COURT IN FRONT OF GATE NO. 5, GOKHLE
//                 MARKET ,(5 HOURS HOLD IN MANDSAUR) DELHI
//               </div>
//             </div>
//             <div className="middle-sectionbus">
//               <div className="durationbus">39h</div>
//               <div className="dividerbus"></div>
//             </div>
//             <div className="right-sectionbus">
//               <div className="time-and-locationbus">
//                 <div className="departure-timebus">
//                   <span className="timebus">9:00</span>
//                   <span className="day-of-weekbus">26 OCT’23, Thu</span>
//                 </div>
//                 <div className="locationbus">
//                   <span className="markerbus">K</span>
//                   <span className="location-namebus">alyan</span>
//                 </div>
//               </div>
//               <div className="addressbus">
//                 Kalyan Bhiwandi Bypass opp Vatika Hotel
//               </div>
//             </div>
//           </div>
//           <div className="govt-guidelines-container">
//             <div className="icon-and-title">
//               <div className="icon-containerbus">
//                 <div className="icon-backgroundbus">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="24"
//                     height="24"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                   >
//                     <mask
//                       id="mask0_688_4231"
//                       maskUnits="userSpaceOnUse"
//                       x="0"
//                       y="0"
//                       width="24"
//                       height="24"
//                     >
//                       <rect width="24" height="24" fill="#D9D9D9" />
//                     </mask>
//                     <g mask="url(#mask0_688_4231)">
//                       <path
//                         d="M4 21V19H16V21H4ZM9.65 16.15L4 10.5L6.1 8.35L11.8 14L9.65 16.15ZM16 9.8L10.35 4.1L12.5 2L18.15 7.65L16 9.8ZM20.6 20L7.55 6.95L8.95 5.55L22 18.6L20.6 20Z"
//                         fill="#1C1B1F"
//                       />
//                     </g>
//                   </svg>
//                 </div>
//               </div>
//               <div className="title-containerbus">
//                 <div className="titlebus">
//                   Maharashtra Govt. Travel Guidelines
//                 </div>
//               </div>
//             </div>
//             <div className="guidelines-content">
//               <div className="guidelines-section">
//                 <div className="guidelines-text">
//                   1. As per Govt. guidelines, passengers shall be tested for
//                   COVID symptoms including body temperature, on entering
//                   Maharashtra.
//                 </div>
//                 <div className="guidelines-text">
//                   2. Passengers without symptoms can continue with the travel
//                 </div>
//                 <div className="guidelines-text">
//                   3. Passengers with symptoms can either go back or continue the
//                   travel post a negative Antigen test result.
//                 </div>
//                 <div className="guidelines-text">
//                   4. Passengers testing positive shall be sent to Covid Care
//                   Centre (CCC) for further care, the cost of which will be borne
//                   by the passengers themselves.
//                 </div>
//               </div>
//             </div>
//           </div>
//           <Box
//             style={{
//               backgroundColor: "white",
//               boxShadow: "0px 3px 6px #00000029",
//               borderRadius: "10px",
//               marginTop: "10px",
//             }}
//             p={2}
//           >
//             {/* For adult passenger List */}
//             <Box
//               display="flex"
//               justifyContent="space-between"
//               alignItems="center"
//             >
//               <Typography>
//                 <AccountCircleIcon /> Adult (18 yrs+)
//               </Typography>
//               <Typography className="Top_txt" py={3}>
//                 <Chip
//                   color="warning"
//                   label="Please Fill adult details"
//                   deleteIcon={<ErrorOutlineIcon />}
//                   variant="outlined"
//                 />
//               </Typography>
//             </Box>

//             <Box>
//               <div mb={2} className="services" py={1}>
//                 <Accordion>
//                   <AccordionSummary
//                     expandIcon={<ExpandMoreIcon />}
//                     aria-controls="panel1a-content"
//                     id="panel1a-header"
//                   >
//                     <Typography>Adult </Typography>
//                   </AccordionSummary>
//                   <AccordionDetails>
//                     <Box>
//                       <Grid container spacing={1}>
//                         <Grid item xs={12} sm={12} md={4} mb={3}>
//                           <Box>
//                             <div className="hotel_form_input">
//                               <label hotel_form_input className="form_lable">
//                                 Title*
//                               </label>
//                               <input
//                                 name="title"
//                                 type="text"
//                                 placeholder="Enter your title"
//                               // value={passengerList?.ContactNo}
//                               // onChange={(e) =>
//                               //   handleServiceChange(e, index)
//                               // }
//                               />
//                             </div>
//                           </Box>
//                         </Grid>
//                         <Grid item xs={12} sm={12} md={4} mb={3}>
//                           <Box>
//                             <div className="hotel_form_input">
//                               <label className="form_lable ">First Name*</label>
//                               <input
//                                 name="firstname"
//                                 type="text"
//                                 placeholder="Enter your first name"
//                               // value={passengerList?.ContactNo}
//                               // onChange={(e) =>
//                               //   handleServiceChange(e, index)
//                               // }
//                               />
//                             </div>
//                           </Box>
//                         </Grid>
//                         <Grid item xs={12} sm={12} md={4} mb={3}>
//                           <Box>
//                             <div className="hotel_form_input">
//                               <label hotel_form_input className="form_lable">
//                                 Last Name*
//                               </label>
//                               <input
//                                 type="text"
//                                 name="lastname"
//                                 className="hotel_input_select"
//                                 placeholder="Enter your last name"
//                               // onChange={(e) =>
//                               //   handleServiceChange(e, index)
//                               // }
//                               />
//                             </div>
//                           </Box>
//                         </Grid>
//                       </Grid>

//                       <Grid container spacing={1}>
//                         <Grid item xs={12} sm={12} md={4} mb={3}>
//                           <Box>
//                             <div className="hotel_form_input">
//                               <label className="form_lable">Gender*</label>
//                               <select
//                                 name="Gender"
//                                 className="hotel_input_select"
//                               // value={passengerData.Gender}
//                               // onChange={(e) =>
//                               //   handleServiceChange(e, index)
//                               // }
//                               >
//                                 <option value="1">Female</option>
//                                 <option value="2">Male</option>
//                                 <option value="3">Transgender</option>
//                               </select>
//                             </div>
//                           </Box>
//                         </Grid>
//                         <Grid item xs={12} sm={12} md={4} mb={3}>
//                           <Box>
//                             <div className="hotel_form_input">
//                               <label hotel_form_input className="form_lable">
//                                 Mobile*
//                               </label>
//                               <input
//                                 name="ContactNo"
//                                 type="text"
//                                 placeholder="Enter your number"
//                               // value={passengerList?.ContactNo}
//                               // onChange={(e) =>
//                               //   handleServiceChange(e, index)
//                               // }
//                               />
//                             </div>
//                           </Box>
//                         </Grid>
//                         <Grid item xs={12} sm={12} md={4} mb={3}>
//                           <Box>
//                             <div className="hotel_form_input">
//                               <label hotel_form_input className="form_lable">
//                                 Date Of Birth*
//                               </label>
//                               <input
//                                 type="date"
//                                 name="DateOfBirth"
//                                 className="hotel_input_select"
//                               // onChange={(e) =>
//                               //   handleServiceChange(e, index)
//                               // }
//                               />
//                             </div>
//                           </Box>
//                         </Grid>
//                       </Grid>
//                       <Grid container spacing={1}>
//                         <Grid item xs={12} sm={12} md={4} mb={3}>
//                           <Box>
//                             <div className="hotel_form_input">
//                               <label hotel_form_input className="form_lable">
//                                 PassportNo*
//                               </label>
//                               <input
//                                 type="date"
//                                 name="passportNo"
//                                 className="hotel_input_select"
//                               // onChange={(e) =>
//                               //   handleServiceChange(e, index)
//                               // }
//                               />
//                             </div>
//                           </Box>
//                         </Grid>
//                         <Grid item xs={12} sm={12} md={4} mb={3}>
//                           <Box>
//                             <div className="hotel_form_input">
//                               <label hotel_form_input className="form_lable">
//                                 PassportExpiry*
//                               </label>
//                               <input
//                                 name="passportexpiry"
//                                 type="text"
//                                 placeholder="Enter your passport"
//                               // value={passengerList?.ContactNo}
//                               // // onChange={(e) =>
//                               //   handleServiceChange(e, index)
//                               // }
//                               />
//                             </div>
//                           </Box>
//                         </Grid>
//                       </Grid>
//                     </Box>
//                   </AccordionDetails>
//                 </Accordion>
//                 {/* {hand leServiceAdd()} */}
//                 {/* Form end */}
//               </div>
//             </Box>

//             {/* For Child passenger List */}
//           </Box>

//           <div>
//             <form onSubmit={handleSubmit} className="form">
//               <Box margin="10px 15px">
//                 <Box style={{ marginTop: "10px" }} px={2}>
//                   <Typography
//                     className="list_item"
//                     style={{
//                       color: "black",
//                       marginTop: "12px",
//                     }}
//                   >
//                     Your Booking Details will be sent to
//                   </Typography>
//                   <Box
//                     style={{
//                       display: "flex",
//                       marginTop: "15px",
//                       justifyContent: "left",
//                     }}
//                   >
//                     <div style={{ display: "flex" }}>
//                       <Box mx={2}>
//                         <label htmlFor="email">EMAIL ADDRESS</label>
//                         <input
//                           type="email"
//                           placeholder="Type your Email Address "
//                           name="email"
//                           mx={3}
//                           style={{
//                             height: "35px",
//                             width: "100%",

//                             boxShadow: "0px 3px 6px #00000029",
//                             borderRadius: "5px",

//                             border: "0.5px solid #BBB",

//                             padding: "12px 15px",
//                           }}
//                         />
//                       </Box>
//                     </div>
//                     <div
//                       style={{
//                         display: "flex",
//                         marginLeft: "200px",
//                       }}
//                     >
//                       <Box mx={2}>
//                         <label htmlFor="email">MOBILE NUMBER</label>
//                         <input
//                           type="phone"
//                           placeholder="Add Mobile Number"
//                           name="mobile_number"
//                           mx={2}
//                           style={{
//                             height: "35px",
//                             width: "100%",

//                             boxShadow: "0px 3px 6px #00000029",
//                             borderRadius: "5px",

//                             border: "0.5px solid #BBB",

//                             padding: "12px 15px",
//                           }}
//                         />
//                       </Box>
//                     </div>
//                   </Box>
//                   <Box
//                     style={{
//                       marginTop: "10px",
//                       display: "flex",
//                     }}
//                   >
//                     <Checkbox {...label} />
//                     <Typography
//                       className="list_item1"
//                       display="flex"
//                       alignItems="center"
//                     >
//                       I have a GST number{" "}
//                       <span sx={{ color: "#BBBBBB" }}>(optional)</span>
//                     </Typography>
//                   </Box>
//                   <Box
//                     style={{
//                       marginTop: "10px",
//                       display: "flex",
//                       justifyContent: "center",
//                     }}
//                   ></Box>
//                 </Box>
//               </Box>
//             </form>
//           </div>

//           <TripSecureComponent />
//           {/* <Link to="/conformation"> */}

//           {/* </Link> */}
//           <Button
//             type="submit"
//             variant="contained"
//             className="btntext"
//             sx={{
//               color: "white",
//               backgroundColor: "#d90429",
//               fontSize: "18px",
//               borderRadius: "16px",
//               marginTop: "16px",
//               boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.30)",
//               padding: "5px 30px",
//             }}
//             onClick={handleButtonClick}
//           >
//             Continue
//           </Button>
//         </div>
//         <div class="right1">
//           <div className="fare-summary-container">
//             <div className="fare-summary-title">Fare Summary</div>
//             <div className="fare-details">
//               <div className="fare-details-row">
//                 <div className="fare-details-label">Base Fare</div>
//                 <div className="fare-details-value">₹69,500</div>
//               </div>
//               <div className="fare-details-row">
//                 <div className="fare-details-label">Taxes & Surcharges</div>
//                 <div className="fare-details-value">₹12,510</div>
//               </div>
//               <div className="fare-details-total">
//                 <div className="fare-details-label">
//                   Total Amount to be paid
//                 </div>
//                 <div className="fare-details-value">₹82,015</div>
//               </div>
//             </div>
//           </div>
//           <div className="coupon-codes-container">
//             <div className="coupon-title">
//               <div>
//                 <div className="coupon-title-text">COUPON CODES</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Add other components as needed */}
//     </div>
//   );
// }

// export default CompleteBooking;
