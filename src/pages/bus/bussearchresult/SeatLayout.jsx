// import React, { useState } from "react";
// import "./busservices.css";
// import GpsFixedIcon from "@mui/icons-material/GpsFixed";
// import { RiSteering2Fill } from "react-icons/ri";
// import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
// import CheckBoxIcon from "@mui/icons-material/CheckBox";
// import { Typography, Box, Button, Grid, Stack, Checkbox } from "@mui/material";
// import { experimentalStyled as styled } from "@mui/material/styles";

// import Paper from "@mui/material/Paper";

// import AirlineSeatReclineNormalIcon from "@mui/icons-material/AirlineSeatReclineNormal";
// import RectangleIcon from "@mui/icons-material/Rectangle";
// import { useSelector } from "react-redux";
// const SeatLayout = () => {
//   const reducerState = useSelector((state) => state);
//   const rowSeat =
//     reducerState?.getBusSeat?.busSeatLayout?.data?.data?.GetBusSeatLayOutResult
//       ?.SeatLayoutDetails?.SeatLayout?.SeatDetails;
//   const colSeat =
//     reducerState?.getBusSeat?.busSeatLayout?.data?.data?.GetBusSeatLayOutResult
//       ?.SeatLayoutDetails?.SeatLayout?.SeatDetails;

//   const AllSeatArray = rowSeat?.flat();

//   const allRowSeat = AllSeatArray?.map((e) => e?.RowNo);
//   const allColSeat = AllSeatArray?.map((e) => e?.ColumnNo);

//   const allSeat = reducerState?.getBusSeat?.busSeatLayout?.data?.data?.GetBusSeatLayOutResult
//   ?.SeatLayoutDetails?.SeatLayout

//   console.error("all seat",allSeat)
//   // Row 1 seat data
//   const row1 =
//     reducerState?.getBusSeat?.busSeatLayout?.data?.data?.GetBusSeatLayOutResult
//       ?.SeatLayoutDetails?.SeatLayout?.SeatDetails[0];

//   console.log("row0", row1);

//   // Row 2 seat data
//   const row2 =
//     reducerState?.getBusSeat?.busSeatLayout?.data?.data?.GetBusSeatLayOutResult
//       ?.SeatLayoutDetails?.SeatLayout?.SeatDetails[1];

//   console.log("row2", row2);

//    // Row 3 seat data
//    const row3 =
//    reducerState?.getBusSeat?.busSeatLayout?.data?.data?.GetBusSeatLayOutResult
//      ?.SeatLayoutDetails?.SeatLayout?.SeatDetails[2];

//  console.log("row3", row3);

//   // Row 4 seat data
//   const row4 =
//   reducerState?.getBusSeat?.busSeatLayout?.data?.data?.GetBusSeatLayOutResult
//     ?.SeatLayoutDetails?.SeatLayout?.SeatDetails[3];

// console.log("row4", row4);

//  // Row 5 seat data
//  const row5 =
//  reducerState?.getBusSeat?.busSeatLayout?.data?.data?.GetBusSeatLayOutResult
//    ?.SeatLayoutDetails?.SeatLayout?.SeatDetails[4];

// console.log("row5", row5);

//  // Row 6 seat data
//  const row6 =
//  reducerState?.getBusSeat?.busSeatLayout?.data?.data?.GetBusSeatLayOutResult
//    ?.SeatLayoutDetails?.SeatLayout?.SeatDetails[5];

// console.log("row6", row6);

// // const sleeper =

//   // console.log("AllSeatArray",AllSeatArray)
//   // console.log("allRowSeat",allRowSeat)
//   // console.log("allColSeat",allColSeat)
//   const label = { inputProps: { "aria-label": "Checkbox demo" } };
//   const Item = styled(Paper)(({ theme }) => ({
//     backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
//     ...theme.typography.body2,
//     padding: theme.spacing(2),
//     textAlign: "center",
//     color: theme.palette.text.secondary,
//   }));

//   return (
//     <div className="side_container">
//       <div className="container">
//         <div className="row">
//           <div className="col-md-8">
//             <Box>
//               <Box className="bus_name">
//                 <Typography className="bus_name">Gola Bus Service</Typography>
//                 <Typography className="rating_bus">4.9/5</Typography>
//                 <Typography className="number_of_rate">126 Ratings</Typography>
//               </Box>
//               <Box className="bus_name">
//                 <Typography className="number_of_rate">
//                   A/C Seater / Sleeper (2+1)
//                 </Typography>
//                 <Box className="bus_name" px={2}>
//                   <AirlineSeatReclineNormalIcon />
//                   <Typography className="number_of_rate">
//                     31 Seats Left
//                   </Typography>
//                 </Box>
//                 <Typography className="number_of_rate" px={2}>
//                   11 Window Seats
//                 </Typography>
//               </Box>
//               <Box className="bus_name">
//                 <Typography className="timing_date">23:30, 19 FEB</Typography>
//                 <Box className="vertical_line"></Box>
//                 <Typography className="Bus_duration">07hrs 15mins</Typography>
//                 <Box className="vertical_line"></Box>
//                 <Typography className="timing_date">06:45, 20 FEB</Typography>
//               </Box>
//             </Box>
//             <Box></Box>
//           </div>
//           <div className="col-md-4">
//             <Box className="pricing_container">
//               <GpsFixedIcon className="gps_icon" />
//               <Typography className="live_tracking">Live Tracking</Typography>
//             </Box>
//             <Box mt={1}>
//               <Typography className="starting_from">Starting From</Typography>
//               <Box className="rate_container">
//                 <Typography className="starting_from">$415 </Typography>
//                 <Typography className="starting_price">$345</Typography>
//               </Box>
//               <Typography className="save_price">Save $70</Typography>
//             </Box>
//             <Box textAlign="right">
//               <Box>
//                 <Box
//                   sx={{
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "end",
//                   }}
//                   mb={1}
//                 >
//                   <Button
//                     variant="contained"
//                     type="submit"
//                     data-toggle="collapse"
//                     data-target="#multiCollapseExample2"
//                     aria-expanded="false"
//                     aria-controls="multiCollapseExample2"
//                   >
//                     <Typography sx={{ cursor: "pointer" }}>
//                       Book Seat
//                     </Typography>
//                   </Button>
//                 </Box>
//               </Box>
//             </Box>
//           </div>
//         </div>
//         <div className="row">
//           <div className="col-md-12">
//             <Box>
//               <Box>
//                 <div>
//                   <div class="card card-body" style={{ border: "none" }}>
//                     <Grid container spacing={1}>
//                       <Grid item p={0} sm={12} lg={1}>
//                         <Stack direction="column" spacing={1}>
//                           <Button
//                             variant="contained"
//                             type="submit"
//                             className="btn_seat_all"
//                           >
//                             <Typography className="btn_style">
//                               Seat Price
//                             </Typography>
//                           </Button>
//                           <Button
//                             variant="contained"
//                             type="submit"
//                             className="btn_seat_all"
//                           >
//                             <Typography className="btn_style">All</Typography>
//                           </Button>
//                           <Button
//                             variant="contained"
//                             type="submit"
//                             className="btn_seat_all"
//                           >
//                             <Typography className="btn_style">
//                               ₹2,343
//                             </Typography>
//                           </Button>
//                           <Button
//                             variant="contained"
//                             type="submit"
//                             className="btn_seat_all"
//                           >
//                             <Typography className="btn_style">
//                               ₹3,454
//                             </Typography>
//                           </Button>
//                           <Button
//                             variant="contained"
//                             type="submit"
//                             className="btn_seat_all"
//                           >
//                             <Typography className="btn_style">
//                               ₹4,456
//                             </Typography>
//                           </Button>
//                         </Stack>
//                       </Grid>
//                       <Grid item sm={12} lg={5}>
//                         <Typography textAlign="center">Upper Deck </Typography>
//                         <Box
//                           style={{
//                             backgroundColor: "#CFF5FF",
//                             borderRadius: "10px",
//                           }}
//                         >
//                           <Box sx={{ height: "20px" }}></Box>
//                           <Grid container sx={{ height: "160px" }}>
//                             <Grid>
//                               <Box direction="column">
//                                 <Stack direction="row">
//                                   <Box className="seat">
//                                     <RiSteering2Fill
//                                       style={{ fontSize: "40px" }}
//                                     />
//                                     <Checkbox
//                                       {...label}
//                                       icon={
//                                         <RectangleIcon className="chair_seat" />
//                                       }
//                                       checkedIcon={
//                                         <RectangleIcon className="select_chair_seat" />
//                                       }
//                                     />
//                                   </Box>
//                                   <Box className="seat">
//                                     <Checkbox
//                                       {...label}
//                                       icon={
//                                         <RectangleIcon className="chair_seat" />
//                                       }
//                                       checkedIcon={
//                                         <RectangleIcon className="select_chair_seat" />
//                                       }
//                                     />
//                                   </Box>
//                                   <Box className="seat">
//                                     <Checkbox
//                                       {...label}
//                                       icon={
//                                         <RectangleIcon className="chair_seat" />
//                                       }
//                                       checkedIcon={
//                                         <RectangleIcon className="select_chair_seat" />
//                                       }
//                                     />
//                                   </Box>
//                                   <Box className="seat">
//                                     <Checkbox
//                                       {...label}
//                                       icon={
//                                         <RectangleIcon className="chair_seat" />
//                                       }
//                                       checkedIcon={
//                                         <RectangleIcon className="select_chair_seat" />
//                                       }
//                                     />
//                                   </Box>
//                                   <Box className="seat">
//                                     <Checkbox
//                                       {...label}
//                                       icon={
//                                         <RectangleIcon className="chair_seat" />
//                                       }
//                                       checkedIcon={
//                                         <RectangleIcon className="select_chair_seat" />
//                                       }
//                                     />
//                                   </Box>
//                                   <Box className="seat">
//                                     <Checkbox
//                                       {...label}
//                                       icon={
//                                         <RectangleIcon className="chair_seat" />
//                                       }
//                                       checkedIcon={
//                                         <RectangleIcon className="select_chair_seat" />
//                                       }
//                                     />
//                                   </Box>
//                                   <Box className="seat">
//                                     <Checkbox
//                                       {...label}
//                                       icon={
//                                         <RectangleIcon className="chair_seat" />
//                                       }
//                                       checkedIcon={
//                                         <RectangleIcon className="select_chair_seat" />
//                                       }
//                                     />
//                                   </Box>
//                                 </Stack>
//                                 <Stack
//                                   direction="row"
//                                   style={{ marginLeft: "40px" }}
//                                 >
//                                   <Box className="seat">
//                                     <Checkbox
//                                       {...label}
//                                       icon={
//                                         <RectangleIcon className="chair_seat" />
//                                       }
//                                       checkedIcon={
//                                         <RectangleIcon className="select_chair_seat" />
//                                       }
//                                     />
//                                   </Box>
//                                   <Box className="seat">
//                                     <Checkbox
//                                       {...label}
//                                       icon={
//                                         <RectangleIcon className="chair_seat" />
//                                       }
//                                       checkedIcon={
//                                         <RectangleIcon className="select_chair_seat" />
//                                       }
//                                     />
//                                   </Box>
//                                   <Box className="seat">
//                                     <Checkbox
//                                       {...label}
//                                       icon={
//                                         <RectangleIcon className="chair_seat" />
//                                       }
//                                       checkedIcon={
//                                         <RectangleIcon className="select_chair_seat" />
//                                       }
//                                     />
//                                   </Box>
//                                   <Box className="seat">
//                                     <Checkbox
//                                       {...label}
//                                       icon={
//                                         <RectangleIcon className="chair_seat" />
//                                       }
//                                       checkedIcon={
//                                         <RectangleIcon className="select_chair_seat" />
//                                       }
//                                     />
//                                   </Box>
//                                   <Box className="seat">
//                                     <Checkbox
//                                       {...label}
//                                       icon={
//                                         <RectangleIcon className="chair_seat" />
//                                       }
//                                       checkedIcon={
//                                         <RectangleIcon className="select_chair_seat" />
//                                       }
//                                     />
//                                   </Box>
//                                   <Box className="seat">
//                                     <Checkbox
//                                       {...label}
//                                       icon={
//                                         <RectangleIcon className="chair_seat" />
//                                       }
//                                       checkedIcon={
//                                         <RectangleIcon className="select_chair_seat" />
//                                       }
//                                     />
//                                   </Box>
//                                   <Box className="seat">
//                                     <Checkbox
//                                       {...label}
//                                       icon={
//                                         <RectangleIcon className="chair_seat" />
//                                       }
//                                       checkedIcon={
//                                         <RectangleIcon className="select_chair_seat" />
//                                       }
//                                     />
//                                   </Box>
//                                 </Stack>
//                               </Box>
//                             </Grid>
//                           </Grid>
//                         </Box>
//                       </Grid>
//                       {/* seat  */}
//                       <Grid item sm={12} lg={5}>
//                         <Typography textAlign="center">Lower Deck </Typography>
//                         <Box
//                           style={{
//                             backgroundColor: "#CFF5FF",
//                             borderRadius: "10px",
//                           }}
//                         >
//                           <Box sx={{ height: "10px" }}></Box>

//                           {/* dynamic seat code */}
//                           <Grid
//                             container
//                             p={0}
//                             columns={{ xs: 4, sm: 8, md: 11.5 }}
//                             justifyContent="center"
//                             justifyItems="center"
//                           >

// {/* Row 1 */}

// {Array.from(Array(14))
//   .map((_, index) => {
//     const seat = row1?.find(ele => ele?.ColumnNo == index+1 );
//     const isChecked = seat?.SeatStatus;

//     return (
//       <Grid p={0} item md={0.8} key={index}>
//         <Checkbox
//           sx={{ padding: "0" }}
//           {...label}
//           icon={<CheckBoxOutlineBlankIcon className="seat_Single" />}
//           checkedIcon={
//             <CheckBoxIcon className="seat_Single select_seat_Single" />
//           }
//           // checked={isChecked}
//           disabled={!seat}
//         />

//       </Grid>
//     );
//   })
//   .filter(Boolean)}

// {/* row 2 */}
// {Array.from(Array(14))
//   .map((_, index) => {
//     const seat = row2?.find(ele => ele?.ColumnNo == index+1);
//     const isChecked = seat?.SeatStatus;

//     return (
//       <Grid p={0} item md={0.8} key={index}>
//         <Checkbox
//           sx={{ padding: "0" }}
//           {...label}
//           icon={<CheckBoxOutlineBlankIcon className="seat_Single" />}
//           checkedIcon={
//             <CheckBoxIcon className="seat_Single select_seat_Single" />
//           }
//           // checked={isChecked}
//           disabled={!seat}
//         />
//         {index === 28 && (
//           <div
//             style={{
//               marginTop: "20px",
//               marginBottom: "20px",
//               width: "100px",
//             }}
//           ></div>
//         )}
//       </Grid>
//     );
//   })
//   .filter(Boolean)}

// {/* row 3 */}
// {Array.from(Array(14))
//   .map((_, index) => {
//     const seat = row3?.find(ele => ele?.ColumnNo == index+1);
//     const isChecked = seat?.SeatStatus;

//     return (
//       <Grid p={0} item md={0.8} key={index} mb={2}>
//         <Checkbox
//           sx={{ padding: "0" }}
//           {...label}
//           icon={<CheckBoxOutlineBlankIcon className="seat_Single" />}
//           checkedIcon={
//             <CheckBoxIcon className="seat_Single select_seat_Single" />
//           }

//           disabled={!seat}
//         />

//       </Grid>
//     );
//   })
//   .filter(Boolean)}

//           {/* <div
//             style={{
//               marginTop: "20px",
//               marginBottom: "20px",
//               width: "100px",
//             }}
//           ></div> */}

// {/* row 4 */}
// {Array.from(Array(14))
//   .map((_, index) => {
//     const seat = row4?.find(ele => ele?.ColumnNo == index+1);
//     const isChecked = seat?.SeatStatus;

//     return (
//       <Grid p={0} item md={0.8} key={index}>
//         <Checkbox
//           sx={{ padding: "0" }}
//           {...label}
//           icon={<CheckBoxOutlineBlankIcon className="seat_Single" />}
//           checkedIcon={
//             <CheckBoxIcon className="seat_Single select_seat_Single" />
//           }

//           disabled={!seat}
//         />
//         {index === 28 && (
//           <div
//             style={{
//               marginTop: "20px",
//               marginBottom: "20px",
//               width: "100px",
//             }}
//           ></div>
//         )}
//       </Grid>
//     );
//   })
//   .filter(Boolean)}

//   {/* row 5 */}
// {Array.from(Array(14))
//   .map((_, index) => {
//     const seat = row5?.find(ele => ele?.ColumnNo == index+1);
//     const seatType = row5?.find(ele => ele?.seatType == 2);
//     const isChecked = seat?.SeatStatus;

//     return (
//       <Grid p={0} item md={0.8} key={index}>
//         <Checkbox
//           sx={{ padding: "0" }}
//           {...label}
//           icon={<CheckBoxOutlineBlankIcon className="seat_Single" />}
//           checkedIcon={
//             <CheckBoxIcon className="seat_Single select_seat_Single" />
//           }
//          disabled={!seat }
//         />
//         {index === 28 && (
//           <div
//             style={{
//               marginTop: "20px",
//               marginBottom: "20px",
//               width: "100px",
//             }}
//           ></div>
//         )}
//       </Grid>
//     );
//   })
//   .filter(Boolean)}

//    {/* row 6 */}
// {Array.from(Array(14))
//   .map((_, index) => {
//     const seat = row6?.find(ele => ele?.ColumnNo == index+1);
//     const seatType = row6?.find(ele => ele?.seatType == 2);
//     const isChecked = seat?.SeatStatus;

//     return (
//       <Grid p={0} item md={0.8} key={index}>
//         <Checkbox
//           sx={{ padding: "0" }}
//           {...label}
//           icon={<CheckBoxOutlineBlankIcon className="seat_Single" />}
//           checkedIcon={
//             <CheckBoxIcon className="seat_Single select_seat_Single" />
//           }
//          disabled={!seat }
//         />
//         {index === 28 && (
//           <div
//             style={{
//               marginTop: "20px",
//               marginBottom: "20px",
//               width: "100px",
//             }}
//           ></div>
//         )}
//       </Grid>
//     );
//   })
//   .filter(Boolean)}

//                           </Grid>
//                           <Box sx={{ height: "10px" }}></Box>
//                         </Box>
//                       </Grid>
//                     </Grid>
//                     <form action="/BusReviewBooking">
//                       <Box mt={1}>
//                         <Button variant="contained" type="submit">
//                           Book Now
//                         </Button>
//                       </Box>
//                     </form>
//                   </div>
//                 </div>
//               </Box>
//             </Box>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SeatLayout;
import React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Grid, Paper, Radio, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";

import Checkbox from "@mui/material/Checkbox";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { styled } from "@mui/material/styles";
import SwipeToSlide from "../../flight/SwipeToSlide";
import { useNavigate } from "react-router-dom";

import "./seatlayout.css";
function SeatLayout() {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const navigate=useNavigate();
  function handleClick(){
     navigate("/BusReviewBooking")
  }
  const dropSectionData = [
    {
      id: 1,
      time: "11:00, 26 OCT",
      locationName: "Thane west",
      locationDetails: "Thane, teen hath naka Chanakya Travels",
    },
    {
      id: 2,
      time: "14:30, 27 OCT",
      locationName: "Mumbai Central",
      locationDetails: "Mumbai, near Central Station",
    },
    {
      id: 3,
      time: "09:15, 28 OCT",
      locationName: "Vashi",
      locationDetails: "Navi Mumbai, Vashi Plaza",
    },
    {
      id: 4,
      time: "16:45, 29 OCT",
      locationName: "Dadar",
      locationDetails: "Mumbai, Dadar Circle",
    },
  ];
  return (
    <div>
      <div className="sort-filter-bar">
        <div className="result-count">4 Buses Found</div>
        <div className="sort-options">
          <div className="sort-by-label">SORT BY:</div>
          <div className="sort-options-list">
            <div className="sort-option active">Relevance</div>
            <div className="sort-option">Fastest</div>
            <div className="sort-option">Cheapest</div>
            <div className="sort-option">Arrival</div>
            <div className="sort-option">Departure</div>
            <div className="sort-option">Rating</div>
          </div>
        </div>
      </div>
      <div className="seatlayout">
        <div className="seatlayoutleft">
        <div className="leftsection">
            <Typography pt={1} px={5} className="selectfilter">
              Select Filters
            </Typography>
            <Typography pt={1} px={5} className="selectfilter">
              AC
            </Typography>
            <div className="ac-container">
              <div className="option-container">
                <div className="icon" style={{border:"2px solid red"}}>
                  <div className="icon-backgroundac" />
                  <div className="inner-iconac" >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <mask
                        id="mask0_688_5012"
                        maskUnits="userSpaceOnUse"
                        x="0"
                        y="0"
                        width="16"
                        height="16"
                      >
                        <rect width="16" height="16" />
                      </mask>
                      <g mask="url(#mask0_688_5012)">
                        <path
                          d="M7.33594 14.6666V11.8999L5.16927 14.0333L4.23594 13.0999L7.33594 9.99992V8.66658H6.0026L2.9026 11.7666L1.96927 10.8333L4.1026 8.66658H1.33594V7.33325H4.1026L1.96927 5.16658L2.9026 4.23325L6.0026 7.33325H7.33594V5.99992L4.23594 2.89992L5.16927 1.96659L7.33594 4.09992V1.33325H8.66927V4.09992L10.8359 1.96659L11.7693 2.89992L8.66927 5.99992V7.33325H10.0026L13.1026 4.23325L14.0359 5.16658L11.9026 7.33325H14.6693V8.66658H11.9026L14.0359 10.8333L13.1026 11.7666L10.0026 8.66658H8.66927V9.99992L11.7693 13.0999L10.8359 14.0333L8.66927 11.8999V14.6666H7.33594Z"
                          fill="#BBBBBB"
                        />
                      </g>
                    </svg>
                  </div>
                </div>
                <div className="textac">AC</div>
              </div>
              <div className="option-container">
                <div className="icon">
                  <div className="icon-background">
                    <div className="inner-icon" />
                  </div>
                  <div className="second-icon" />
                </div>
                <div className="textac">Non AC</div>
              </div>
            </div>
            <Typography pt={1} px={5} className="selectfilter">
              Seat Type
            </Typography>
            <div className="ac-container">
              <div className="option-container">
                <div className="icon">
                  <div className="icon-backgroundac" />
                  <div className="inner-iconac">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <mask
                        id="mask0_688_5012"
                        maskUnits="userSpaceOnUse"
                        x="0"
                        y="0"
                        width="16"
                        height="16"
                      >
                        <rect width="16" height="16" />
                      </mask>
                      <g mask="url(#mask0_688_5012)">
                        <path
                          d="M7.33594 14.6666V11.8999L5.16927 14.0333L4.23594 13.0999L7.33594 9.99992V8.66658H6.0026L2.9026 11.7666L1.96927 10.8333L4.1026 8.66658H1.33594V7.33325H4.1026L1.96927 5.16658L2.9026 4.23325L6.0026 7.33325H7.33594V5.99992L4.23594 2.89992L5.16927 1.96659L7.33594 4.09992V1.33325H8.66927V4.09992L10.8359 1.96659L11.7693 2.89992L8.66927 5.99992V7.33325H10.0026L13.1026 4.23325L14.0359 5.16658L11.9026 7.33325H14.6693V8.66658H11.9026L14.0359 10.8333L13.1026 11.7666L10.0026 8.66658H8.66927V9.99992L11.7693 13.0999L10.8359 14.0333L8.66927 11.8999V14.6666H7.33594Z"
                          fill="#BBBBBB"
                        />
                      </g>
                    </svg>
                  </div>
                </div>
                <div className="textac">Sleeper</div>
              </div>
              <div className="option-container">
                {/* <div className="icon">
                  <div className="icon-background">
                    <div className="inner-icon" />
                  </div>
                  <div className="second-icon" />
                </div> */}
                <div className="textac">Seater</div>
              </div>
            </div>

            <Typography pt={1} px={5} className="selectfilter">
              Single Seater/Sleeper
            </Typography>
            <Box  pl={5} display="block">
              <form action="">
                <div>
                  <Checkbox
                    {...label}
                    icon={<RadioButtonUncheckedIcon />}
                    checkedIcon={<RadioButtonCheckedIcon />}
                  />
                  Single
                </div>
              </form>
            </Box>
            <Typography pt={1} pl={5} className="selectfilter">
              Pick up point - Delhi
            </Typography>
            <Box pl={5} display="block">
              <form action="">
                <div>
                  <Checkbox
                    {...label}
                    icon={<RadioButtonUncheckedIcon />}
                    checkedIcon={<RadioButtonCheckedIcon />}
                  />
                  Non Stop
                </div>
                <div>
                  <Checkbox
                    {...label}
                    icon={<RadioButtonUncheckedIcon />}
                    checkedIcon={<RadioButtonCheckedIcon />}
                  />
                  Prenoon Departure
                </div>

                <div>
                  <Checkbox
                    {...label}
                    icon={<RadioButtonUncheckedIcon />}
                    checkedIcon={<RadioButtonCheckedIcon />}
                  />
                  indiGo
                </div>
                <div>
                  <Checkbox
                    {...label}
                    icon={<RadioButtonUncheckedIcon />}
                    checkedIcon={<RadioButtonCheckedIcon />}
                  />
                  Vistara
                </div>
              </form>
            </Box>
            <Typography pt={1} px={5} className="selectfilter">
              Pick up point - Delhi
            </Typography>
            <Box  pl={5} display="block">
              <form action="">
                <div>
                  <Checkbox
                    {...label}
                    icon={<RadioButtonUncheckedIcon />}
                    checkedIcon={<RadioButtonCheckedIcon />}
                  />
                  Before 6AM
                </div>
                <div>
                  <Checkbox
                    {...label}
                    icon={<RadioButtonUncheckedIcon />}
                    checkedIcon={<RadioButtonCheckedIcon />}
                  />
                  6 AM-12 PM
                </div>

                <div>
                  <Checkbox
                    {...label}
                    icon={<RadioButtonUncheckedIcon />}
                    checkedIcon={<RadioButtonCheckedIcon />}
                  />
                  12 PM-6 PM
                </div>
                <div>
                  <Checkbox
                    {...label}
                    icon={<RadioButtonUncheckedIcon />}
                    checkedIcon={<RadioButtonCheckedIcon />}
                  />
                  After 6 PM
                </div>
              </form>
            </Box>
            <Typography pt={1} px={5} className="selectfilter">
              Drop point - Mumbai
            </Typography>
            <Box  pl={5} display="block">
              <form action="">
                <div>
                  <Checkbox
                    {...label}
                    icon={<RadioButtonUncheckedIcon />}
                    checkedIcon={<RadioButtonCheckedIcon />}
                  />
                  Kandawali East (9)
                </div>
                <div>
                  <Checkbox
                    {...label}
                    icon={<RadioButtonUncheckedIcon />}
                    checkedIcon={<RadioButtonCheckedIcon />}
                  />
                  Goregaon East (1)
                </div>

                <div>
                  <Checkbox
                    {...label}
                    icon={<RadioButtonUncheckedIcon />}
                    checkedIcon={<RadioButtonCheckedIcon />}
                  />
                  Sion (7)
                </div>
                <div>
                  <Checkbox
                    {...label}
                    icon={<RadioButtonUncheckedIcon />}
                    checkedIcon={<RadioButtonCheckedIcon />}
                  />
                  Kalyan (3)
                </div>
              </form>
            </Box>
            <Typography pt={1} px={5} className="selectfilter">
              Drop time - Mumbai
            </Typography>
            <Box  pl={5} display="block">
              <form action="">
                <div>
                  <Checkbox
                    {...label}
                    icon={<RadioButtonUncheckedIcon />}
                    checkedIcon={<RadioButtonCheckedIcon />}
                  />
                  Before 6AM
                </div>
                <div>
                  <Checkbox
                    {...label}
                    icon={<RadioButtonUncheckedIcon />}
                    checkedIcon={<RadioButtonCheckedIcon />}
                  />
                  6 AM-12 PM
                </div>

                <div>
                  <Checkbox
                    {...label}
                    icon={<RadioButtonUncheckedIcon />}
                    checkedIcon={<RadioButtonCheckedIcon />}
                  />
                  12 PM-6 PM
                </div>
                <div>
                  <Checkbox
                    {...label}
                    icon={<RadioButtonUncheckedIcon />}
                    checkedIcon={<RadioButtonCheckedIcon />}
                  />
                  After 6 PM
                </div>
              </form>
            </Box>
          </div>
        </div>
        <div className="seatlayoutright">
          <div className="bus-info-containers">
            <div className="titleseat">Buses from New Delhi to Mumbai</div>
            {/* Add other components/content as needed */}
          </div>
         <div className="swipetoslide"><SwipeToSlide/></div> 
          <div className="bus-detailsseat">
            <div className="bus-details-container">
              <div className="info-wrapper">
                <div className="info-item">
                  <div className="bus-title">Ashok Travel Mandasour Group</div>
                  <div className="bus-type">NON AC Seater (2+1)</div>
                </div>
                <div className="info-item1">
                  <div className="timeseat">
                    <span className="time-bold">23:30</span>
                    <span className="date-value">29 Oct</span>
                  </div>
                </div>
                <div className="info-item1">
                  <div className="duration">32hrs 50 mins</div>
                </div>
                <div className="info-item1">
                  <div className="timeseat">
                    <span className="time-bold">08:20</span>
                    <span className="date-value">29 Oct</span>
                  </div>
                </div>
              </div>
              <div className="priceseat">
                <div className="total-price">₹3,699</div>
              </div>
            </div>
            <div className="rating-info-container">
              <div className="rating-section">
                <div className="rating-item">
                  <div className="rating-icon">
                    <div className="icon-circle">
                      <div className="icon-backgroundLay">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="21"
                          height="20"
                          viewBox="0 0 21 20"
                          fill="none"
                        >
                          <mask
                            id="mask0_688_5832"
                            maskUnits="userSpaceOnUse"
                            x="0"
                            y="0"
                            width="21"
                            height="20"
                          >
                            <rect
                              x="0.5"
                              width="20"
                              height="20"
                              fill="#D9D9D9"
                            />
                          </mask>
                          <g mask="url(#mask0_688_5832)">
                            <path
                              d="M10.2057 6.75L12.8307 14.8542L6.2474 9.85417L10.2057 6.75ZM5.35156 18.3333L6.70573 12.4792L2.16406 8.54167L8.16406 8.02083L10.4974 2.5L12.8307 8.02083L18.8307 8.54167L14.2891 12.4792L15.6432 18.3333L10.4974 15.2292L5.35156 18.3333Z"
                              fill="white"
                            />
                          </g>
                        </svg>
                      </div>
                    </div>
                    <div className="icon-value">3.2</div>
                  </div>
                </div>
                <div className="tracking-item">
                  <div className="tracking-icon">
                    <div className="icon-circle">
                      <div className="icon-background-gray">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="25"
                          height="24"
                          viewBox="0 0 25 24"
                          fill="none"
                        >
                          <mask
                            id="mask0_688_5837"
                            maskUnits="userSpaceOnUse"
                            x="0"
                            y="0"
                            width="25"
                            height="24"
                          >
                            <rect
                              x="0.5"
                              width="24"
                              height="24"
                              fill="#D9D9D9"
                            />
                          </mask>
                          <g mask="url(#mask0_688_5837)">
                            <path
                              d="M12.5 22C10.7333 22 9.29167 21.7208 8.175 21.1625C7.05833 20.6042 6.5 19.8833 6.5 19C6.5 18.4167 6.74167 17.9083 7.225 17.475C7.70833 17.0417 8.375 16.7 9.225 16.45L9.8 18.35C9.51667 18.4333 9.25833 18.5375 9.025 18.6625C8.79167 18.7875 8.63333 18.9 8.55 19C8.76667 19.2667 9.26667 19.5 10.05 19.7C10.8333 19.9 11.65 20 12.5 20C13.35 20 14.1708 19.9 14.9625 19.7C15.7542 19.5 16.2583 19.2667 16.475 19C16.3917 18.9 16.2333 18.7875 16 18.6625C15.7667 18.5375 15.5083 18.4333 15.225 18.35L15.8 16.45C16.65 16.7 17.3125 17.0417 17.7875 17.475C18.2625 17.9083 18.5 18.4167 18.5 19C18.5 19.8833 17.9417 20.6042 16.825 21.1625C15.7083 21.7208 14.2667 22 12.5 22ZM12.5 15.325C12.8 14.775 13.1167 14.2708 13.45 13.8125C13.7833 13.3542 14.1083 12.9167 14.425 12.5C15.0417 11.7 15.5333 10.9792 15.9 10.3375C16.2667 9.69583 16.45 8.9 16.45 7.95C16.45 6.85 16.0667 5.91667 15.3 5.15C14.5333 4.38333 13.6 4 12.5 4C11.4 4 10.4667 4.38333 9.7 5.15C8.93333 5.91667 8.55 6.85 8.55 7.95C8.55 8.9 8.73333 9.69583 9.1 10.3375C9.46667 10.9792 9.95833 11.7 10.575 12.5C10.8917 12.9167 11.2167 13.3542 11.55 13.8125C11.8833 14.2708 12.2 14.775 12.5 15.325ZM12.5 19C12.3167 19 12.15 18.9458 12 18.8375C11.85 18.7292 11.7417 18.5833 11.675 18.4C11.2917 17.2167 10.8083 16.225 10.225 15.425C9.64167 14.625 9.075 13.8583 8.525 13.125C7.99167 12.3917 7.52917 11.6333 7.1375 10.85C6.74583 10.0667 6.55 9.1 6.55 7.95C6.55 6.28333 7.125 4.875 8.275 3.725C9.425 2.575 10.8333 2 12.5 2C14.1667 2 15.575 2.575 16.725 3.725C17.875 4.875 18.45 6.28333 18.45 7.95C18.45 9.1 18.2583 10.0667 17.875 10.85C17.4917 11.6333 17.025 12.3917 16.475 13.125C15.9417 13.8583 15.3792 14.625 14.7875 15.425C14.1958 16.225 13.7083 17.2167 13.325 18.4C13.2583 18.5833 13.15 18.7292 13 18.8375C12.85 18.9458 12.6833 19 12.5 19ZM12.5 10.075C13.0833 10.075 13.5833 9.86667 14 9.45C14.4167 9.03333 14.625 8.53333 14.625 7.95C14.625 7.36667 14.4167 6.86667 14 6.45C13.5833 6.03333 13.0833 5.825 12.5 5.825C11.9167 5.825 11.4167 6.03333 11 6.45C10.5833 6.86667 10.375 7.36667 10.375 7.95C10.375 8.53333 10.5833 9.03333 11 9.45C11.4167 9.86667 11.9167 10.075 12.5 10.075Z"
                              fill="white"
                            />
                          </g>
                        </svg>
                      </div>
                    </div>
                    <div className="icon-value">
                      <div className="tracking-label">Live Tracking</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="seats-info">31 Seats Left | 21 Window Seats</div>
            </div>
            <div className="policies-section-container">
              <div className="section-links-container">
                <div className="link-wrapper">
                  <div className="link-item">
                    <div className="link-text">Policies</div>
                    <div className="arrow-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="21"
                        height="20"
                        viewBox="0 0 21 20"
                        fill="none"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M7.78966 14.707C7.60219 14.5194 7.49688 14.2651 7.49688 14C7.49688 13.7348 7.60219 13.4805 7.78966 13.293L11.0827 9.99997L7.78966 6.70697C7.69415 6.61472 7.61797 6.50438 7.56556 6.38237C7.51315 6.26037 7.48557 6.12915 7.48441 5.99637C7.48326 5.86359 7.50856 5.73191 7.55884 5.60902C7.60912 5.48612 7.68337 5.37447 7.77727 5.28057C7.87116 5.18668 7.98281 5.11243 8.10571 5.06215C8.22861 5.01187 8.36028 4.98656 8.49306 4.98772C8.62584 4.98887 8.75706 5.01646 8.87907 5.06887C9.00107 5.12128 9.11142 5.19746 9.20366 5.29297L13.2037 9.29297C13.3911 9.4805 13.4964 9.7348 13.4964 9.99997C13.4964 10.2651 13.3911 10.5194 13.2037 10.707L9.20366 14.707C9.01614 14.8944 8.76183 14.9998 8.49666 14.9998C8.2315 14.9998 7.97719 14.8944 7.78966 14.707Z"
                          fill="#BBBBBB"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="link-item">
                    <div className="link-text">Photos</div>
                    <div className="arrow-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="21"
                        height="20"
                        viewBox="0 0 21 20"
                        fill="none"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M7.78966 14.707C7.60219 14.5194 7.49688 14.2651 7.49688 14C7.49688 13.7348 7.60219 13.4805 7.78966 13.293L11.0827 9.99997L7.78966 6.70697C7.69415 6.61472 7.61797 6.50438 7.56556 6.38237C7.51315 6.26037 7.48557 6.12915 7.48441 5.99637C7.48326 5.86359 7.50856 5.73191 7.55884 5.60902C7.60912 5.48612 7.68337 5.37447 7.77727 5.28057C7.87116 5.18668 7.98281 5.11243 8.10571 5.06215C8.22861 5.01187 8.36028 4.98656 8.49306 4.98772C8.62584 4.98887 8.75706 5.01646 8.87907 5.06887C9.00107 5.12128 9.11142 5.19746 9.20366 5.29297L13.2037 9.29297C13.3911 9.4805 13.4964 9.7348 13.4964 9.99997C13.4964 10.2651 13.3911 10.5194 13.2037 10.707L9.20366 14.707C9.01614 14.8944 8.76183 14.9998 8.49666 14.9998C8.2315 14.9998 7.97719 14.8944 7.78966 14.707Z"
                          fill="#BBBBBB"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="link-item">
                    <div className="link-text">Amenities</div>
                    <div className="arrow-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="21"
                        height="20"
                        viewBox="0 0 21 20"
                        fill="none"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M7.78966 14.707C7.60219 14.5194 7.49688 14.2651 7.49688 14C7.49688 13.7348 7.60219 13.4805 7.78966 13.293L11.0827 9.99997L7.78966 6.70697C7.69415 6.61472 7.61797 6.50438 7.56556 6.38237C7.51315 6.26037 7.48557 6.12915 7.48441 5.99637C7.48326 5.86359 7.50856 5.73191 7.55884 5.60902C7.60912 5.48612 7.68337 5.37447 7.77727 5.28057C7.87116 5.18668 7.98281 5.11243 8.10571 5.06215C8.22861 5.01187 8.36028 4.98656 8.49306 4.98772C8.62584 4.98887 8.75706 5.01646 8.87907 5.06887C9.00107 5.12128 9.11142 5.19746 9.20366 5.29297L13.2037 9.29297C13.3911 9.4805 13.4964 9.7348 13.4964 9.99997C13.4964 10.2651 13.3911 10.5194 13.2037 10.707L9.20366 14.707C9.01614 14.8944 8.76183 14.9998 8.49666 14.9998C8.2315 14.9998 7.97719 14.8944 7.78966 14.707Z"
                          fill="#BBBBBB"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="link-item">
                    <div className="link-text">Pickups</div>
                    <div className="arrow-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="21"
                        height="20"
                        viewBox="0 0 21 20"
                        fill="none"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M7.78966 14.707C7.60219 14.5194 7.49688 14.2651 7.49688 14C7.49688 13.7348 7.60219 13.4805 7.78966 13.293L11.0827 9.99997L7.78966 6.70697C7.69415 6.61472 7.61797 6.50438 7.56556 6.38237C7.51315 6.26037 7.48557 6.12915 7.48441 5.99637C7.48326 5.86359 7.50856 5.73191 7.55884 5.60902C7.60912 5.48612 7.68337 5.37447 7.77727 5.28057C7.87116 5.18668 7.98281 5.11243 8.10571 5.06215C8.22861 5.01187 8.36028 4.98656 8.49306 4.98772C8.62584 4.98887 8.75706 5.01646 8.87907 5.06887C9.00107 5.12128 9.11142 5.19746 9.20366 5.29297L13.2037 9.29297C13.3911 9.4805 13.4964 9.7348 13.4964 9.99997C13.4964 10.2651 13.3911 10.5194 13.2037 10.707L9.20366 14.707C9.01614 14.8944 8.76183 14.9998 8.49666 14.9998C8.2315 14.9998 7.97719 14.8944 7.78966 14.707Z"
                          fill="#BBBBBB"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="link-item">
                    <div className="link-text">Reviews</div>
                    <div className="arrow-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="21"
                        height="20"
                        viewBox="0 0 21 20"
                        fill="none"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M7.78966 14.707C7.60219 14.5194 7.49688 14.2651 7.49688 14C7.49688 13.7348 7.60219 13.4805 7.78966 13.293L11.0827 9.99997L7.78966 6.70697C7.69415 6.61472 7.61797 6.50438 7.56556 6.38237C7.51315 6.26037 7.48557 6.12915 7.48441 5.99637C7.48326 5.86359 7.50856 5.73191 7.55884 5.60902C7.60912 5.48612 7.68337 5.37447 7.77727 5.28057C7.87116 5.18668 7.98281 5.11243 8.10571 5.06215C8.22861 5.01187 8.36028 4.98656 8.49306 4.98772C8.62584 4.98887 8.75706 5.01646 8.87907 5.06887C9.00107 5.12128 9.11142 5.19746 9.20366 5.29297L13.2037 9.29297C13.3911 9.4805 13.4964 9.7348 13.4964 9.99997C13.4964 10.2651 13.3911 10.5194 13.2037 10.707L9.20366 14.707C9.01614 14.8944 8.76183 14.9998 8.49666 14.9998C8.2315 14.9998 7.97719 14.8944 7.78966 14.707Z"
                          fill="#BBBBBB"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hide-seats">
                <div className="hide-seats-button">
                  <div className="button-label">HIDE SEATS</div>
                </div>
              </div>
            </div>
          </div>
          <div className="selectseat">
            <div className="selectleft">
              <div
                className="selecttext"
              >
                Select Seats
              </div>
              <div className="seatContainer">
                {/* Your component content goes here */}
              </div>
            </div>
            <div className="selectright">
               <div className="selecttext">Select Pickup & Drop Points</div>
              <div className="selectrightdata">
                
                <div className="containerseats">
                  <div className="pickUpPoint">PICK UP POINT</div>
                  <div className="pickUpDetails">
                    <div className="pickUpTime">
                      <div className="detailsTop">
                        <div className="timeInfo">19:00, 24 OCT</div>
                        <div className="marker">
                          <div className="backgroundMarker">
                            {" "}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                            >
                              <mask
                                id="mask0_688_5881"
                                maskUnits="userSpaceOnUse"
                                x="0"
                                y="0"
                                width="20"
                                height="20"
                              >
                                <rect width="20" height="20" fill="#D9D9D9" />
                              </mask>
                              <g mask="url(#mask0_688_5881)">
                                <path
                                  d="M8.83073 13.8337L14.7057 7.95866L13.5391 6.79199L8.83073 11.5003L6.45573 9.12533L5.28906 10.292L8.83073 13.8337ZM9.9974 18.3337C8.84462 18.3337 7.76128 18.1149 6.7474 17.6774C5.73351 17.2399 4.85156 16.6462 4.10156 15.8962C3.35156 15.1462 2.75781 14.2642 2.32031 13.2503C1.88281 12.2364 1.66406 11.1531 1.66406 10.0003C1.66406 8.84755 1.88281 7.76421 2.32031 6.75033C2.75781 5.73644 3.35156 4.85449 4.10156 4.10449C4.85156 3.35449 5.73351 2.76074 6.7474 2.32324C7.76128 1.88574 8.84462 1.66699 9.9974 1.66699C11.1502 1.66699 12.2335 1.88574 13.2474 2.32324C14.2613 2.76074 15.1432 3.35449 15.8932 4.10449C16.6432 4.85449 17.237 5.73644 17.6745 6.75033C18.112 7.76421 18.3307 8.84755 18.3307 10.0003C18.3307 11.1531 18.112 12.2364 17.6745 13.2503C17.237 14.2642 16.6432 15.1462 15.8932 15.8962C15.1432 16.6462 14.2613 17.2399 13.2474 17.6774C12.2335 18.1149 11.1502 18.3337 9.9974 18.3337Z"
                                  fill="#071C2C"
                                />
                              </g>
                            </svg>
                          </div>
                          {/* <div className="foregroundMarker" ><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <mask id="mask0_688_5881" maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
    <rect width="20" height="20" fill="#D9D9D9"/>
  </mask>
  <g mask="url(#mask0_688_5881)">
    <path d="M8.83073 13.8337L14.7057 7.95866L13.5391 6.79199L8.83073 11.5003L6.45573 9.12533L5.28906 10.292L8.83073 13.8337ZM9.9974 18.3337C8.84462 18.3337 7.76128 18.1149 6.7474 17.6774C5.73351 17.2399 4.85156 16.6462 4.10156 15.8962C3.35156 15.1462 2.75781 14.2642 2.32031 13.2503C1.88281 12.2364 1.66406 11.1531 1.66406 10.0003C1.66406 8.84755 1.88281 7.76421 2.32031 6.75033C2.75781 5.73644 3.35156 4.85449 4.10156 4.10449C4.85156 3.35449 5.73351 2.76074 6.7474 2.32324C7.76128 1.88574 8.84462 1.66699 9.9974 1.66699C11.1502 1.66699 12.2335 1.88574 13.2474 2.32324C14.2613 2.76074 15.1432 3.35449 15.8932 4.10449C16.6432 4.85449 17.237 5.73644 17.6745 6.75033C18.112 7.76421 18.3307 8.84755 18.3307 10.0003C18.3307 11.1531 18.112 12.2364 17.6745 13.2503C17.237 14.2642 16.6432 15.1462 15.8932 15.8962C15.1432 16.6462 14.2613 17.2399 13.2474 17.6774C12.2335 18.1149 11.1502 18.3337 9.9974 18.3337Z" fill="#071C2C"/>
  </g>
</svg> </div> */}
                        </div>
                      </div>
                      <div className="locationInfo">
                        <span>G</span>
                        <span>okhle market</span>
                      </div>
                    </div>
                    <div className="locationDetails">
                      SHOP NO. 36, TESS HAJARI COURT INFRONT OF GATE NO. 5,
                      GOKHLE MARKET ,(5 HOURS HOLD IN MANDSAUR) DELHI
                    </div>
                  </div>
                  <div className="sectionDivider">
                    <div className="pickUpSection">
                      <div className="pickUpTime">
                        <div className="detailsTop">
                          <div className="timeInfo">19:00, 24 OCT</div>
                        </div>
                        <div className="locationInfo">
                          <span>Shivmurti </span>
                          <span> Radison Hotel</span>
                        </div>
                      </div>
                      <div className="locationDetails">
                        SHOP NO. 36, TESS HAJARI COURT INFRONT OF GATE NO. 5,
                        GOKHLE MARKET ,(5 HOURS HOLD IN MANDSAUR) DELHI
                      </div>
                    </div>
                  </div>
                </div>
                <div className="containerdrop">
                  <div className="pickUpPoint">DROP POINT</div>
                  <div className="pickUpDetails">
                    <div className="pickUpTime">
                      <div className="detailsTop">
                        <div className="timeInfo">19:00, 24 OCT</div>
                        <div className="marker">
                          <div className="backgroundMarker">
                            {" "}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                            >
                              <mask
                                id="mask0_688_5881"
                                maskUnits="userSpaceOnUse"
                                x="0"
                                y="0"
                                width="20"
                                height="20"
                              >
                                <rect width="20" height="20" fill="#D9D9D9" />
                              </mask>
                              <g mask="url(#mask0_688_5881)">
                                <path
                                  d="M8.83073 13.8337L14.7057 7.95866L13.5391 6.79199L8.83073 11.5003L6.45573 9.12533L5.28906 10.292L8.83073 13.8337ZM9.9974 18.3337C8.84462 18.3337 7.76128 18.1149 6.7474 17.6774C5.73351 17.2399 4.85156 16.6462 4.10156 15.8962C3.35156 15.1462 2.75781 14.2642 2.32031 13.2503C1.88281 12.2364 1.66406 11.1531 1.66406 10.0003C1.66406 8.84755 1.88281 7.76421 2.32031 6.75033C2.75781 5.73644 3.35156 4.85449 4.10156 4.10449C4.85156 3.35449 5.73351 2.76074 6.7474 2.32324C7.76128 1.88574 8.84462 1.66699 9.9974 1.66699C11.1502 1.66699 12.2335 1.88574 13.2474 2.32324C14.2613 2.76074 15.1432 3.35449 15.8932 4.10449C16.6432 4.85449 17.237 5.73644 17.6745 6.75033C18.112 7.76421 18.3307 8.84755 18.3307 10.0003C18.3307 11.1531 18.112 12.2364 17.6745 13.2503C17.237 14.2642 16.6432 15.1462 15.8932 15.8962C15.1432 16.6462 14.2613 17.2399 13.2474 17.6774C12.2335 18.1149 11.1502 18.3337 9.9974 18.3337Z"
                                  fill="#071C2C"
                                />
                              </g>
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="locationInfo">
                        <span> Kalyan</span>
                      </div>
                    </div>
                    <div className="locationDetails">
                      Kalyan Bhiwandi Bypass opp Vatika Hotel
                    </div>
                  </div>

                  {/* Repeat the section for additional drop points */}
                  {/* ... */}

                  {/* Example of a responsive drop section */}
                 
                   
                  <div>
      {dropSectionData.map((drop, index) => (
        <div key={drop.id} className="dropSection section">
          <div className="timeLocation">
            <div className="timeDetails">
              <div className="timeInfo">{drop.time}</div>
            </div>
            <div className="locationName">{drop.locationName}</div>
          </div>
          <div className="locationDetails">{drop.locationDetails}</div>
        </div>
      ))}
    </div>
                </div>
              </div>

              <div className="containerselect">
                <div className="column">
                  <div className="titlefare">Selected Seats</div>
                  <div className="subtitle1">G, H, I</div>
                </div>
                <div className="column right">
                  <div className="amount">₹11,097</div>
                  <div className="titlefare">Fare Details</div>
                </div>
              </div>
              <div className="buttonContainer">
                <div className="buttonText" onClick={handleClick}>Continue</div>
              </div>
              
            </div>
            
          </div>
          <div className="bus-detailsseat">
            <div className="bus-details-container">
              <div className="info-wrapper">
                <div className="info-item">
                  <div className="bus-title">Ashok Travel Mandasour Group</div>
                  <div className="bus-type">NON AC Seater (2+1)</div>
                </div>
                <div className="info-item1">
                  <div className="timeseat">
                    <span className="time-bold">23:30</span>
                    <span className="date-value">29 Oct</span>
                  </div>
                </div>
                <div className="info-item1">
                  <div className="duration">32hrs 50 mins</div>
                </div>
                <div className="info-item1">
                  <div className="timeseat">
                    <span className="time-bold">08:20</span>
                    <span className="date-value">30 Oct</span>
                  </div>
                </div>
              </div>
              <div className="priceseat">
                <div className="total-price">₹3,699</div>
              </div>
            </div>
            <div className="rating-info-container">
              <div className="rating-section">
                <div className="rating-item">
                  <div className="rating-icon">
                    <div className="icon-circle">
                      <div className="icon-backgroundLay">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="21"
                          height="20"
                          viewBox="0 0 21 20"
                          fill="none"
                        >
                          <mask
                            id="mask0_688_5832"
                            maskUnits="userSpaceOnUse"
                            x="0"
                            y="0"
                            width="21"
                            height="20"
                          >
                            <rect
                              x="0.5"
                              width="20"
                              height="20"
                              fill="#D9D9D9"
                            />
                          </mask>
                          <g mask="url(#mask0_688_5832)">
                            <path
                              d="M10.2057 6.75L12.8307 14.8542L6.2474 9.85417L10.2057 6.75ZM5.35156 18.3333L6.70573 12.4792L2.16406 8.54167L8.16406 8.02083L10.4974 2.5L12.8307 8.02083L18.8307 8.54167L14.2891 12.4792L15.6432 18.3333L10.4974 15.2292L5.35156 18.3333Z"
                              fill="white"
                            />
                          </g>
                        </svg>
                      </div>
                    </div>
                    <div className="icon-value">3.2</div>
                  </div>
                </div>
                <div className="tracking-item">
                  <div className="tracking-icon">
                    <div className="icon-circle">
                      <div className="icon-background-gray">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="25"
                          height="24"
                          viewBox="0 0 25 24"
                          fill="none"
                        >
                          <mask
                            id="mask0_688_5837"
                            maskUnits="userSpaceOnUse"
                            x="0"
                            y="0"
                            width="25"
                            height="24"
                          >
                            <rect
                              x="0.5"
                              width="24"
                              height="24"
                              fill="#D9D9D9"
                            />
                          </mask>
                          <g mask="url(#mask0_688_5837)">
                            <path
                              d="M12.5 22C10.7333 22 9.29167 21.7208 8.175 21.1625C7.05833 20.6042 6.5 19.8833 6.5 19C6.5 18.4167 6.74167 17.9083 7.225 17.475C7.70833 17.0417 8.375 16.7 9.225 16.45L9.8 18.35C9.51667 18.4333 9.25833 18.5375 9.025 18.6625C8.79167 18.7875 8.63333 18.9 8.55 19C8.76667 19.2667 9.26667 19.5 10.05 19.7C10.8333 19.9 11.65 20 12.5 20C13.35 20 14.1708 19.9 14.9625 19.7C15.7542 19.5 16.2583 19.2667 16.475 19C16.3917 18.9 16.2333 18.7875 16 18.6625C15.7667 18.5375 15.5083 18.4333 15.225 18.35L15.8 16.45C16.65 16.7 17.3125 17.0417 17.7875 17.475C18.2625 17.9083 18.5 18.4167 18.5 19C18.5 19.8833 17.9417 20.6042 16.825 21.1625C15.7083 21.7208 14.2667 22 12.5 22ZM12.5 15.325C12.8 14.775 13.1167 14.2708 13.45 13.8125C13.7833 13.3542 14.1083 12.9167 14.425 12.5C15.0417 11.7 15.5333 10.9792 15.9 10.3375C16.2667 9.69583 16.45 8.9 16.45 7.95C16.45 6.85 16.0667 5.91667 15.3 5.15C14.5333 4.38333 13.6 4 12.5 4C11.4 4 10.4667 4.38333 9.7 5.15C8.93333 5.91667 8.55 6.85 8.55 7.95C8.55 8.9 8.73333 9.69583 9.1 10.3375C9.46667 10.9792 9.95833 11.7 10.575 12.5C10.8917 12.9167 11.2167 13.3542 11.55 13.8125C11.8833 14.2708 12.2 14.775 12.5 15.325ZM12.5 19C12.3167 19 12.15 18.9458 12 18.8375C11.85 18.7292 11.7417 18.5833 11.675 18.4C11.2917 17.2167 10.8083 16.225 10.225 15.425C9.64167 14.625 9.075 13.8583 8.525 13.125C7.99167 12.3917 7.52917 11.6333 7.1375 10.85C6.74583 10.0667 6.55 9.1 6.55 7.95C6.55 6.28333 7.125 4.875 8.275 3.725C9.425 2.575 10.8333 2 12.5 2C14.1667 2 15.575 2.575 16.725 3.725C17.875 4.875 18.45 6.28333 18.45 7.95C18.45 9.1 18.2583 10.0667 17.875 10.85C17.4917 11.6333 17.025 12.3917 16.475 13.125C15.9417 13.8583 15.3792 14.625 14.7875 15.425C14.1958 16.225 13.7083 17.2167 13.325 18.4C13.2583 18.5833 13.15 18.7292 13 18.8375C12.85 18.9458 12.6833 19 12.5 19ZM12.5 10.075C13.0833 10.075 13.5833 9.86667 14 9.45C14.4167 9.03333 14.625 8.53333 14.625 7.95C14.625 7.36667 14.4167 6.86667 14 6.45C13.5833 6.03333 13.0833 5.825 12.5 5.825C11.9167 5.825 11.4167 6.03333 11 6.45C10.5833 6.86667 10.375 7.36667 10.375 7.95C10.375 8.53333 10.5833 9.03333 11 9.45C11.4167 9.86667 11.9167 10.075 12.5 10.075Z"
                              fill="white"
                            />
                          </g>
                        </svg>
                      </div>
                    </div>
                    <div className="icon-value">
                      <div className="tracking-label">Live Tracking</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="seats-info">31 Seats Left | 21 Window Seats</div>
            </div>
            <div className="policies-section-container">
              <div className="section-links-container">
                <div className="link-wrapper">
                  <div className="link-item">
                    <div className="link-text">Policies</div>
                    <div className="arrow-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="21"
                        height="20"
                        viewBox="0 0 21 20"
                        fill="none"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M7.78966 14.707C7.60219 14.5194 7.49688 14.2651 7.49688 14C7.49688 13.7348 7.60219 13.4805 7.78966 13.293L11.0827 9.99997L7.78966 6.70697C7.69415 6.61472 7.61797 6.50438 7.56556 6.38237C7.51315 6.26037 7.48557 6.12915 7.48441 5.99637C7.48326 5.86359 7.50856 5.73191 7.55884 5.60902C7.60912 5.48612 7.68337 5.37447 7.77727 5.28057C7.87116 5.18668 7.98281 5.11243 8.10571 5.06215C8.22861 5.01187 8.36028 4.98656 8.49306 4.98772C8.62584 4.98887 8.75706 5.01646 8.87907 5.06887C9.00107 5.12128 9.11142 5.19746 9.20366 5.29297L13.2037 9.29297C13.3911 9.4805 13.4964 9.7348 13.4964 9.99997C13.4964 10.2651 13.3911 10.5194 13.2037 10.707L9.20366 14.707C9.01614 14.8944 8.76183 14.9998 8.49666 14.9998C8.2315 14.9998 7.97719 14.8944 7.78966 14.707Z"
                          fill="#BBBBBB"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="link-item">
                    <div className="link-text">Photos</div>
                    <div className="arrow-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="21"
                        height="20"
                        viewBox="0 0 21 20"
                        fill="none"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M7.78966 14.707C7.60219 14.5194 7.49688 14.2651 7.49688 14C7.49688 13.7348 7.60219 13.4805 7.78966 13.293L11.0827 9.99997L7.78966 6.70697C7.69415 6.61472 7.61797 6.50438 7.56556 6.38237C7.51315 6.26037 7.48557 6.12915 7.48441 5.99637C7.48326 5.86359 7.50856 5.73191 7.55884 5.60902C7.60912 5.48612 7.68337 5.37447 7.77727 5.28057C7.87116 5.18668 7.98281 5.11243 8.10571 5.06215C8.22861 5.01187 8.36028 4.98656 8.49306 4.98772C8.62584 4.98887 8.75706 5.01646 8.87907 5.06887C9.00107 5.12128 9.11142 5.19746 9.20366 5.29297L13.2037 9.29297C13.3911 9.4805 13.4964 9.7348 13.4964 9.99997C13.4964 10.2651 13.3911 10.5194 13.2037 10.707L9.20366 14.707C9.01614 14.8944 8.76183 14.9998 8.49666 14.9998C8.2315 14.9998 7.97719 14.8944 7.78966 14.707Z"
                          fill="#BBBBBB"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="link-item">
                    <div className="link-text">Amenities</div>
                    <div className="arrow-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="21"
                        height="20"
                        viewBox="0 0 21 20"
                        fill="none"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M7.78966 14.707C7.60219 14.5194 7.49688 14.2651 7.49688 14C7.49688 13.7348 7.60219 13.4805 7.78966 13.293L11.0827 9.99997L7.78966 6.70697C7.69415 6.61472 7.61797 6.50438 7.56556 6.38237C7.51315 6.26037 7.48557 6.12915 7.48441 5.99637C7.48326 5.86359 7.50856 5.73191 7.55884 5.60902C7.60912 5.48612 7.68337 5.37447 7.77727 5.28057C7.87116 5.18668 7.98281 5.11243 8.10571 5.06215C8.22861 5.01187 8.36028 4.98656 8.49306 4.98772C8.62584 4.98887 8.75706 5.01646 8.87907 5.06887C9.00107 5.12128 9.11142 5.19746 9.20366 5.29297L13.2037 9.29297C13.3911 9.4805 13.4964 9.7348 13.4964 9.99997C13.4964 10.2651 13.3911 10.5194 13.2037 10.707L9.20366 14.707C9.01614 14.8944 8.76183 14.9998 8.49666 14.9998C8.2315 14.9998 7.97719 14.8944 7.78966 14.707Z"
                          fill="#BBBBBB"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="link-item">
                    <div className="link-text">Pickups</div>
                    <div className="arrow-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="21"
                        height="20"
                        viewBox="0 0 21 20"
                        fill="none"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M7.78966 14.707C7.60219 14.5194 7.49688 14.2651 7.49688 14C7.49688 13.7348 7.60219 13.4805 7.78966 13.293L11.0827 9.99997L7.78966 6.70697C7.69415 6.61472 7.61797 6.50438 7.56556 6.38237C7.51315 6.26037 7.48557 6.12915 7.48441 5.99637C7.48326 5.86359 7.50856 5.73191 7.55884 5.60902C7.60912 5.48612 7.68337 5.37447 7.77727 5.28057C7.87116 5.18668 7.98281 5.11243 8.10571 5.06215C8.22861 5.01187 8.36028 4.98656 8.49306 4.98772C8.62584 4.98887 8.75706 5.01646 8.87907 5.06887C9.00107 5.12128 9.11142 5.19746 9.20366 5.29297L13.2037 9.29297C13.3911 9.4805 13.4964 9.7348 13.4964 9.99997C13.4964 10.2651 13.3911 10.5194 13.2037 10.707L9.20366 14.707C9.01614 14.8944 8.76183 14.9998 8.49666 14.9998C8.2315 14.9998 7.97719 14.8944 7.78966 14.707Z"
                          fill="#BBBBBB"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="link-item">
                    <div className="link-text">Reviews</div>
                    <div className="arrow-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="21"
                        height="20"
                        viewBox="0 0 21 20"
                        fill="none"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M7.78966 14.707C7.60219 14.5194 7.49688 14.2651 7.49688 14C7.49688 13.7348 7.60219 13.4805 7.78966 13.293L11.0827 9.99997L7.78966 6.70697C7.69415 6.61472 7.61797 6.50438 7.56556 6.38237C7.51315 6.26037 7.48557 6.12915 7.48441 5.99637C7.48326 5.86359 7.50856 5.73191 7.55884 5.60902C7.60912 5.48612 7.68337 5.37447 7.77727 5.28057C7.87116 5.18668 7.98281 5.11243 8.10571 5.06215C8.22861 5.01187 8.36028 4.98656 8.49306 4.98772C8.62584 4.98887 8.75706 5.01646 8.87907 5.06887C9.00107 5.12128 9.11142 5.19746 9.20366 5.29297L13.2037 9.29297C13.3911 9.4805 13.4964 9.7348 13.4964 9.99997C13.4964 10.2651 13.3911 10.5194 13.2037 10.707L9.20366 14.707C9.01614 14.8944 8.76183 14.9998 8.49666 14.9998C8.2315 14.9998 7.97719 14.8944 7.78966 14.707Z"
                          fill="#BBBBBB"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="select-seats">
                <div className="select-seats-button">
                  <div className="button-label1">SELECT SEATS</div>
                </div>
              </div> */}
              <div className="button-container">
      <div className="button-text">SELECT SEATS</div>
    </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SeatLayout;
