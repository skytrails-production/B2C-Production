// import React, { useState } from "react";
// import "./bussearchresultDetail.css";
// import { Box, Grid, Typography, Divider, Link,Button } from "@mui/material"
// import PriceSlider from "../../Hotel/hoteldetails/PriceSlider";
// // import StarIcon from '@mui/icons-material/Star';
// import { styled, alpha } from "@mui/material/styles";
// import InputBase from "@mui/material/InputBase";
// import SearchIcon from "@mui/icons-material/Search";
// import BusServices from "./BusServices";


// const Search = styled("div")(({ theme }) => ({
//     position: "relative",
//     borderRadius: theme.shape.borderRadius,
//     backgroundColor: alpha(theme.palette.common.white, 0.15),
//     "&:hover": {
//         backgroundColor: alpha(theme.palette.common.white, 0.25)
//     },
//     marginRight: theme.spacing(2),
//     marginLeft: 0,
//     width: "100%",
//     [theme.breakpoints.up("sm")]: {
//         marginLeft: theme.spacing(3),
//         width: "auto"
//     }
// }));

// const SearchIconWrapper = styled("div")(({ theme }) => ({
//     padding: theme.spacing(0, 1),
//     height: "100%",
//     position: "absolute",
//     pointerEvents: "none",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center"
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//     color: "inherit",
//     "& .MuiInputBase-input": {
//         padding: theme.spacing(1, 1, 1, 1),
//         // vertical padding + font size from searchIcon
//         paddingLeft: `calc(1em + ${theme.spacing(3)})`,
//         transition: theme.transitions.create("width"),
//         width: "100%",
//         [theme.breakpoints.up("md")]: {
//             width: "20ch"
//         }
//     }
// }));
// const BusSearchReasultDetail = () => {

//     const [selectedOption, setSelectedOption] = useState("");
//     console.log(selectedOption);
//     const [ratingOption, setRatingOption] = useState("");
//     console.log(ratingOption);
//     const [bookingOption, setBookingOption] = useState("");
//     console.log(bookingOption);

//     return (
//         <div className='container'>
//             <Box className='bus_detail_container' mt={3} p={3}>
//                 <Grid container spacing={3}>
//                     <Grid item xs={12} sm={12} lg={3}>
//                         <Box className='side_container'>
//                             <Box>
//                                 <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//                                     <Typography className="selectfilter">Sort by</Typography>
//                                     <Link href='#' className="relevance_link">Relevance</Link>
//                                 </Box>
//                                 <Divider sx={{ backgroundColor: 'gray', marginY: '8px' }} />
//                                 <Typography className="suggested">Suggested For You</Typography>
//                                 <Box>
//                                     <Box style={{ display: "flex", alignItems: "center", marginTop: "8px" }}>
//                                         <Typography className="content">
//                                             <input className="radio" type="radio" value="option1"
//                                                 checked={selectedOption === "option1"}
//                                                 onClick={(e) => setSelectedOption("option1")} />
//                                         </Typography>
//                                         <Typography className="value">Travvolt Deal</Typography>
//                                         <Typography style={{ flexGrow: 1 }} className="value">(12)</Typography>
//                                     </Box>
//                                     <Box style={{ display: "flex", alignItems: "center", marginTop: "8px" }}>
//                                         <Typography className="content">
//                                             <input className="radio" type="radio" value="option2"
//                                                 checked={selectedOption === "option2"}
//                                                 onClick={(e) => setSelectedOption("option2")} />
//                                         </Typography>
//                                         <Typography className="value">Sleeper</Typography>
//                                         <Typography style={{ flexGrow: 1 }} className="value">(12)</Typography>
//                                     </Box>
//                                     <Box style={{ display: "flex", alignItems: "center", marginTop: "8px" }}>
//                                         <Typography className="content">
//                                             <input className="radio" type="radio" value="option3"
//                                                 checked={selectedOption === "option3"}
//                                                 onClick={(e) => setSelectedOption("option3")} />
//                                         </Typography>
//                                         <Typography className="value">Primo</Typography>
//                                         <Typography style={{ flexGrow: 1 }} className="value">(12)</Typography>
//                                     </Box>
//                                     <Box style={{ display: "flex", alignItems: "center", marginTop: "8px" }}>
//                                         <Typography className="content">
//                                             <input className="radio" type="radio" value="option4"
//                                                 checked={selectedOption === "option4"}
//                                                 onClick={(e) => setSelectedOption("option4")} />
//                                         </Typography>
//                                         <Typography className="value"> AC</Typography>
//                                         <Typography style={{ flexGrow: 1 }} className="value">(12)</Typography>
//                                     </Box>
//                                     <Box style={{ display: "flex", alignItems: "center", marginTop: "8px" }}>
//                                         <Typography className="content">
//                                             <input className="radio" type="radio" value="option5"
//                                                 checked={selectedOption === "option5"}
//                                                 onClick={(e) => setSelectedOption("option5")} />
//                                         </Typography>
//                                         <Typography className="value">Pickup After 6PM</Typography>
//                                         <Typography style={{ flexGrow: 1 }} className="value">(12)</Typography>
//                                     </Box>
//                                 </Box>
//                                 <Divider sx={{ backgroundColor: 'gray', marginY: '8px' }} />
//                                 <Box>
//                                     <Typography className="price">Deal & Offer</Typography>

//                                     <Box style={{ display: "flex", alignItems: "center", marginTop: "8px" }}>
//                                         <Typography className="content">
//                                             <input className="radio" type="radio" value="option5"
//                                                 checked={selectedOption === "option5"}
//                                                 onClick={(e) => setSelectedOption("option5")} />
//                                         </Typography>
//                                         <Typography className="value">Travvolt 7% off</Typography>
//                                         <Typography style={{ flexGrow: 1 }} className="value">(12)</Typography>
//                                     </Box>
//                                 </Box>
//                                 <Divider sx={{ backgroundColor: 'gray', marginY: '8px' }} />
//                                 <Box>
//                                     <Typography className="price">Free Cancellation</Typography>

//                                     <Box style={{ display: "flex", alignItems: "center", marginTop: "8px" }}>
//                                         <Typography className="content">
//                                             <input className="radio" type="radio" value="option5"
//                                                 checked={selectedOption === "option5"}
//                                                 onClick={(e) => setSelectedOption("option5")} />
//                                         </Typography>
//                                         <Typography className="value">24 Hours</Typography>
//                                         <Typography style={{ flexGrow: 1 }} className="value">(12)</Typography>
//                                     </Box>
//                                     <Box style={{ display: "flex", alignItems: "center", marginTop: "8px" }}>
//                                         <Typography className="content">
//                                             <input className="radio" type="radio" value="option5"
//                                                 checked={selectedOption === "option5"}
//                                                 onClick={(e) => setSelectedOption("option5")} />
//                                         </Typography>
//                                         <Typography className="value">72 Hours</Typography>
//                                         <Typography style={{ flexGrow: 1 }} className="value">(12)</Typography>
//                                     </Box>
//                                 </Box>
//                                 <Divider sx={{ backgroundColor: 'gray', marginY: '8px' }} />
//                                 <Box>
//                                     <Box>
//                                         <Typography className="price">Budget (Per person)</Typography>

//                                         <PriceSlider />
//                                     </Box>
//                                 </Box>
//                                 <Divider sx={{ backgroundColor: 'gray', marginY: '8px' }} />
//                                 {/* -------------------------------------------------------------------- */}

//                                 <Divider sx={{ backgroundColor: 'gray', marginY: '8px' }} />
//                                 <Box>
//                                     <Box>
//                                         <Typography className="starrating"> Boarding Points</Typography>
//                                     </Box>
//                                     <Box my={3}
//                                         sx={{
//                                             flexGrow: 1,
//                                             borderRadius: "10px",
//                                             border: "1px solid #666666"
//                                         }}
//                                     >
//                                         <Search>
//                                             <SearchIconWrapper>
//                                                 <SearchIcon />
//                                             </SearchIconWrapper>
//                                             <StyledInputBase
//                                                 placeholder="Search Drop Points"
//                                                 inputProps={{ "aria-label": "search" }}
//                                             />
//                                         </Search>
//                                     </Box>
//                                     <Box style={{ display: "flex", alignItems: "center", marginTop: "8px" }}>
//                                         <Typography className="content">
//                                             <input className="radio" type="radio" value="booking1"
//                                                 checked={bookingOption === "booking1"}
//                                                 onClick={(e) => setBookingOption("booking1")} />
//                                         </Typography>
//                                         <Typography className="value">Kashmiri Gate</Typography>
//                                         <Typography style={{ flexGrow: 1 }} className="value">(12)</Typography>
//                                     </Box>
//                                     <Box style={{ display: "flex", alignItems: "center", marginTop: "8px" }}>
//                                         <Typography className="content">
//                                             <input className="radio" type="radio" value="booking2"
//                                                 checked={bookingOption === "booking2"}
//                                                 onClick={(e) => setBookingOption("booking2")} />
//                                         </Typography>
//                                         <Typography className="value">Morigate</Typography>
//                                         <Typography style={{ flexGrow: 1 }} className="value">(12)</Typography>
//                                     </Box>
//                                     <Box style={{ display: "flex", alignItems: "center", marginTop: "8px" }}>
//                                         <Typography className="content">
//                                             <input className="radio" type="radio" value="booking3"
//                                                 checked={bookingOption === "booking3"}
//                                                 onClick={(e) => setBookingOption("booking3")} />
//                                         </Typography>
//                                         <Typography className="value">Anand Vihar</Typography>
//                                         <Typography style={{ flexGrow: 1 }} className="value">(12)</Typography>
//                                     </Box>
//                                     <Box style={{ display: "flex", alignItems: "center", marginTop: "8px" }}>
//                                         <Typography className="content">
//                                             <input className="radio" type="radio" value="booking4"
//                                                 checked={bookingOption === "booking4"}
//                                                 onClick={(e) => setBookingOption("booking4")} />
//                                         </Typography>
//                                         <Typography className="value">RK Ashram</Typography>
//                                         <Typography style={{ flexGrow: 1 }} className="value">(12)</Typography>
//                                     </Box>
//                                     <Box style={{ display: "flex", alignItems: "center", marginTop: "8px" }}>
//                                         <Typography className="content">
//                                             <input className="radio" type="radio" value="booking4"
//                                                 checked={bookingOption === "booking4"}
//                                                 onClick={(e) => setBookingOption("booking4")} />
//                                         </Typography>
//                                         <Typography className="value">Badarpur</Typography>
//                                         <Typography style={{ flexGrow: 1 }} className="value">(12)</Typography>
//                                     </Box>

//                                     <Box>
//                                         <a className="more_bording_point" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
//                                             21 More Boarding Points
//                                         </a>
//                                     </Box>
//                                     <div class="collapse" id="collapseExample">
//                                         <Box style={{ display: "flex", alignItems: "center", marginTop: "8px" }}>
//                                             <Typography className="content">
//                                                 <input className="radio" type="radio" value="booking4"
//                                                     checked={bookingOption === "booking4"}
//                                                     onClick={(e) => setBookingOption("booking4")} />
//                                             </Typography>
//                                             <Typography className="value">Badarpur</Typography>
//                                             <Typography style={{ flexGrow: 1 }} className="value">(12)</Typography>
//                                         </Box>
//                                         <Box style={{ display: "flex", alignItems: "center", marginTop: "8px" }}>
//                                             <Typography className="content">
//                                                 <input className="radio" type="radio" value="booking4"
//                                                     checked={bookingOption === "booking4"}
//                                                     onClick={(e) => setBookingOption("booking4")} />
//                                             </Typography>
//                                             <Typography className="value">Badarpur</Typography>
//                                             <Typography style={{ flexGrow: 1 }} className="value">(12)</Typography>
//                                         </Box>
//                                         <Box style={{ display: "flex", alignItems: "center", marginTop: "8px" }}>
//                                             <Typography className="content">
//                                                 <input className="radio" type="radio" value="booking4"
//                                                     checked={bookingOption === "booking4"}
//                                                     onClick={(e) => setBookingOption("booking4")} />
//                                             </Typography>
//                                             <Typography className="value">Badarpur</Typography>
//                                             <Typography style={{ flexGrow: 1 }} className="value">(12)</Typography>
//                                         </Box>
//                                         <Box style={{ display: "flex", alignItems: "center", marginTop: "8px" }}>
//                                             <Typography className="content">
//                                                 <input className="radio" type="radio" value="booking4"
//                                                     checked={bookingOption === "booking4"}
//                                                     onClick={(e) => setBookingOption("booking4")} />
//                                             </Typography>
//                                             <Typography className="value">Badarpur</Typography>
//                                             <Typography style={{ flexGrow: 1 }} className="value">(12)</Typography>
//                                         </Box>
//                                         <Box style={{ display: "flex", alignItems: "center", marginTop: "8px" }}>
//                                             <Typography className="content">
//                                                 <input className="radio" type="radio" value="booking4"
//                                                     checked={bookingOption === "booking4"}
//                                                     onClick={(e) => setBookingOption("booking4")} />
//                                             </Typography>
//                                             <Typography className="value">Badarpur</Typography>
//                                             <Typography style={{ flexGrow: 1 }} className="value">(12)</Typography>
//                                         </Box>
//                                         <Box style={{ display: "flex", alignItems: "center", marginTop: "8px" }}>
//                                             <Typography className="content">
//                                                 <input className="radio" type="radio" value="booking4"
//                                                     checked={bookingOption === "booking4"}
//                                                     onClick={(e) => setBookingOption("booking4")} />
//                                             </Typography>
//                                             <Typography className="value">Badarpur</Typography>
//                                             <Typography style={{ flexGrow: 1 }} className="value">(12)</Typography>
//                                         </Box>
//                                         <Box style={{ display: "flex", alignItems: "center", marginTop: "8px" }}>
//                                             <Typography className="content">
//                                                 <input className="radio" type="radio" value="booking4"
//                                                     checked={bookingOption === "booking4"}
//                                                     onClick={(e) => setBookingOption("booking4")} />
//                                             </Typography>
//                                             <Typography className="value">Badarpur</Typography>
//                                             <Typography style={{ flexGrow: 1 }} className="value">(12)</Typography>
//                                         </Box>
//                                         <Box style={{ display: "flex", alignItems: "center", marginTop: "8px" }}>
//                                             <Typography className="content">
//                                                 <input className="radio" type="radio" value="booking4"
//                                                     checked={bookingOption === "booking4"}
//                                                     onClick={(e) => setBookingOption("booking4")} />
//                                             </Typography>
//                                             <Typography className="value">Badarpur</Typography>
//                                             <Typography style={{ flexGrow: 1 }} className="value">(12)</Typography>
//                                         </Box>
//                                         <Box style={{ display: "flex", alignItems: "center", marginTop: "8px" }}>
//                                             <Typography className="content">
//                                                 <input className="radio" type="radio" value="booking4"
//                                                     checked={bookingOption === "booking4"}
//                                                     onClick={(e) => setBookingOption("booking4")} />
//                                             </Typography>
//                                             <Typography className="value">Badarpur</Typography>
//                                             <Typography style={{ flexGrow: 1 }} className="value">(12)</Typography>
//                                         </Box>
//                                         <Box style={{ display: "flex", alignItems: "center", marginTop: "8px" }}>
//                                             <Typography className="content">
//                                                 <input className="radio" type="radio" value="booking4"
//                                                     checked={bookingOption === "booking4"}
//                                                     onClick={(e) => setBookingOption("booking4")} />
//                                             </Typography>
//                                             <Typography className="value">Badarpur</Typography>
//                                             <Typography style={{ flexGrow: 1 }} className="value">(12)</Typography>
//                                         </Box>
//                                         <Box style={{ display: "flex", alignItems: "center", marginTop: "8px" }}>
//                                             <Typography className="content">
//                                                 <input className="radio" type="radio" value="booking4"
//                                                     checked={bookingOption === "booking4"}
//                                                     onClick={(e) => setBookingOption("booking4")} />
//                                             </Typography>
//                                             <Typography className="value">Badarpur</Typography>
//                                             <Typography style={{ flexGrow: 1 }} className="value">(12)</Typography>
//                                         </Box>
//                                         <Box style={{ display: "flex", alignItems: "center", marginTop: "8px" }}>
//                                             <Typography className="content">
//                                                 <input className="radio" type="radio" value="booking4"
//                                                     checked={bookingOption === "booking4"}
//                                                     onClick={(e) => setBookingOption("booking4")} />
//                                             </Typography>
//                                             <Typography className="value">Badarpur</Typography>
//                                             <Typography style={{ flexGrow: 1 }} className="value">(12)</Typography>
//                                         </Box>
//                                         <Box style={{ display: "flex", alignItems: "center", marginTop: "8px" }}>
//                                             <Typography className="content">
//                                                 <input className="radio" type="radio" value="booking4"
//                                                     checked={bookingOption === "booking4"}
//                                                     onClick={(e) => setBookingOption("booking4")} />
//                                             </Typography>
//                                             <Typography className="value">Badarpur</Typography>
//                                             <Typography style={{ flexGrow: 1 }} className="value">(12)</Typography>
//                                         </Box>
//                                         <Box style={{ display: "flex", alignItems: "center", marginTop: "8px" }}>
//                                             <Typography className="content">
//                                                 <input className="radio" type="radio" value="booking4"
//                                                     checked={bookingOption === "booking4"}
//                                                     onClick={(e) => setBookingOption("booking4")} />
//                                             </Typography>
//                                             <Typography className="value">Badarpur</Typography>
//                                             <Typography style={{ flexGrow: 1 }} className="value">(12)</Typography>
//                                         </Box>
//                                         <Box style={{ display: "flex", alignItems: "center", marginTop: "8px" }}>
//                                             <Typography className="content">
//                                                 <input className="radio" type="radio" value="booking4"
//                                                     checked={bookingOption === "booking4"}
//                                                     onClick={(e) => setBookingOption("booking4")} />
//                                             </Typography>
//                                             <Typography className="value">Badarpur</Typography>
//                                             <Typography style={{ flexGrow: 1 }} className="value">(12)</Typography>
//                                         </Box>
//                                         <Box style={{ display: "flex", alignItems: "center", marginTop: "8px" }}>
//                                             <Typography className="content">
//                                                 <input className="radio" type="radio" value="booking4"
//                                                     checked={bookingOption === "booking4"}
//                                                     onClick={(e) => setBookingOption("booking4")} />
//                                             </Typography>
//                                             <Typography className="value">Badarpur</Typography>
//                                             <Typography style={{ flexGrow: 1 }} className="value">(12)</Typography>
//                                         </Box>
//                                         <Box style={{ display: "flex", alignItems: "center", marginTop: "8px" }}>
//                                             <Typography className="content">
//                                                 <input className="radio" type="radio" value="booking4"
//                                                     checked={bookingOption === "booking4"}
//                                                     onClick={(e) => setBookingOption("booking4")} />
//                                             </Typography>
//                                             <Typography className="value">Badarpur</Typography>
//                                             <Typography style={{ flexGrow: 1 }} className="value">(12)</Typography>
//                                         </Box>
//                                         <Box style={{ display: "flex", alignItems: "center", marginTop: "8px" }}>
//                                             <Typography className="content">
//                                                 <input className="radio" type="radio" value="booking4"
//                                                     checked={bookingOption === "booking4"}
//                                                     onClick={(e) => setBookingOption("booking4")} />
//                                             </Typography>
//                                             <Typography className="value">Badarpur</Typography>
//                                             <Typography style={{ flexGrow: 1 }} className="value">(12)</Typography>
//                                         </Box>
//                                         <Box style={{ display: "flex", alignItems: "center", marginTop: "8px" }}>
//                                             <Typography className="content">
//                                                 <input className="radio" type="radio" value="booking4"
//                                                     checked={bookingOption === "booking4"}
//                                                     onClick={(e) => setBookingOption("booking4")} />
//                                             </Typography>
//                                             <Typography className="value">Badarpur</Typography>
//                                             <Typography style={{ flexGrow: 1 }} className="value">(12)</Typography>
//                                         </Box>
//                                     </div>

//                                 </Box>
//                                 <Divider sx={{ backgroundColor: 'gray', marginY: '8px' }} />
//                                 <Box>
//                                     <Box>
//                                         <Typography className="starrating"> Drop Point</Typography>
//                                     </Box>
//                                     <Box my={3}
//                                         sx={{
//                                             flexGrow: 1,
//                                             borderRadius: "10px",
//                                             border: "1px solid #666666"
//                                         }}
//                                     >
//                                         <Search>
//                                             <SearchIconWrapper>
//                                                 <SearchIcon />
//                                             </SearchIconWrapper>
//                                             <StyledInputBase
//                                                 placeholder="Search Drop Points"
//                                                 inputProps={{ "aria-label": "search" }}
//                                             />
//                                         </Search>
//                                     </Box>
//                                     <Box style={{ display: "flex", alignItems: "center", marginTop: "8px" }}>
//                                         <Typography className="content">
//                                             <input className="radio" type="radio" value="booking1"
//                                                 checked={bookingOption === "booking1"}
//                                                 onClick={(e) => setBookingOption("booking1")} />
//                                         </Typography>
//                                         <Typography className="value">Faizalganj</Typography>
//                                         <Typography style={{ flexGrow: 1 }} className="value">(12)</Typography>
//                                     </Box>
//                                     <Box style={{ display: "flex", alignItems: "center", marginTop: "8px" }}>
//                                         <Typography className="content">
//                                             <input className="radio" type="radio" value="booking2"
//                                                 checked={bookingOption === "booking2"}
//                                                 onClick={(e) => setBookingOption("booking2")} />
//                                         </Typography>
//                                         <Typography className="value">Rama Devi Chawraha</Typography>
//                                         <Typography style={{ flexGrow: 1 }} className="value">(12)</Typography>
//                                     </Box>
//                                     <Box style={{ display: "flex", alignItems: "center", marginTop: "8px" }}>
//                                         <Typography className="content">
//                                             <input className="radio" type="radio" value="booking3"
//                                                 checked={bookingOption === "booking3"}
//                                                 onClick={(e) => setBookingOption("booking3")} />
//                                         </Typography>
//                                         <Typography className="value">Kanpur</Typography>
//                                         <Typography style={{ flexGrow: 1 }} className="value">(12)</Typography>
//                                     </Box>
//                                     <Box style={{ display: "flex", alignItems: "center", marginTop: "8px" }}>
//                                         <Typography className="content">
//                                             <input className="radio" type="radio" value="booking4"
//                                                 checked={bookingOption === "booking4"}
//                                                 onClick={(e) => setBookingOption("booking4")} />
//                                         </Typography>
//                                         <Typography className="value">By Pass Allahabad Road</Typography>
//                                         <Typography style={{ flexGrow: 1 }} className="value">(12)</Typography>
//                                     </Box>
//                                     <p>
//                                         <a className="more_bording_point" style={{ textDecoration: 'underline', color: '#006FFF', cursor: 'pointer' }} data-toggle="collapse" data-target=".multi-collapse" aria-expanded="false" aria-controls="multiCollapseExample1 multiCollapseExample2">Toggle both elements</a>
//                                     </p>
//                                     <div className="row">
//                                         <div className="col">
//                                             <div className="collapse multi-collapse" id="multiCollapseExample1">
//                                                 <Box style={{ display: "flex", alignItems: "center", marginTop: "8px" }}>
//                                                     <Typography className="content">
//                                                         <input className="radio" type="radio" value="booking3"
//                                                             checked={bookingOption === "booking3"}
//                                                             onClick={(e) => setBookingOption("booking3")} />
//                                                     </Typography>
//                                                     <Typography className="value">Kanpur</Typography>
//                                                     <Typography style={{ flexGrow: 1 }} className="value">(12)</Typography>
//                                                 </Box>
//                                                 <Box style={{ display: "flex", alignItems: "center", marginTop: "8px" }}>
//                                                     <Typography className="content">
//                                                         <input className="radio" type="radio" value="booking3"
//                                                             checked={bookingOption === "booking3"}
//                                                             onClick={(e) => setBookingOption("booking3")} />
//                                                     </Typography>
//                                                     <Typography className="value">Kanpur</Typography>
//                                                     <Typography style={{ flexGrow: 1 }} className="value">(12)</Typography>
//                                                 </Box>
//                                                 <Box style={{ display: "flex", alignItems: "center", marginTop: "8px" }}>
//                                                     <Typography className="content">
//                                                         <input className="radio" type="radio" value="booking3"
//                                                             checked={bookingOption === "booking3"}
//                                                             onClick={(e) => setBookingOption("booking3")} />
//                                                     </Typography>
//                                                     <Typography className="value">Kanpur</Typography>
//                                                     <Typography style={{ flexGrow: 1 }} className="value">(12)</Typography>
//                                                 </Box>
//                                                 <Box style={{ display: "flex", alignItems: "center", marginTop: "8px" }}>
//                                                     <Typography className="content">
//                                                         <input className="radio" type="radio" value="booking3"
//                                                             checked={bookingOption === "booking3"}
//                                                             onClick={(e) => setBookingOption("booking3")} />
//                                                     </Typography>
//                                                     <Typography className="value">Kanpur</Typography>
//                                                     <Typography style={{ flexGrow: 1 }} className="value">(12)</Typography>
//                                                 </Box>
//                                                 <Box style={{ display: "flex", alignItems: "center", marginTop: "8px" }}>
//                                                     <Typography className="content">
//                                                         <input className="radio" type="radio" value="booking3"
//                                                             checked={bookingOption === "booking3"}
//                                                             onClick={(e) => setBookingOption("booking3")} />
//                                                     </Typography>
//                                                     <Typography className="value">Kanpur</Typography>
//                                                     <Typography style={{ flexGrow: 1 }} className="value">(12)</Typography>
//                                                 </Box>
//                                             </div>
//                                         </div>
//                                     </div>

//                                 </Box>
//                                 <Divider sx={{ backgroundColor: 'gray', marginY: '8px' }} />
//                                 <Box>
//                                     <Typography className="price">Pickup Time</Typography>

//                                     <Grid container spacing={3} marginTop="1px">
//                                         <Grid item sm={12} xs={12} lg={6}>
//                                             <Box>
//                                                 <Button variant="contained" sx={{boxShadow:'0px 3px 6px #00000029',background:'white',width:'100%'}}><Typography className="price">Before 6AM</Typography></Button>
//                                             </Box>
//                                         </Grid>
//                                         <Grid item sm={12} xs={12} lg={6}>
//                                             <Box>
//                                                 <Button variant="contained" sx={{boxShadow:'0px 3px 6px #00000029',background:'white',width:'100%'}}><Typography className="price">6AM-12PM</Typography></Button>
//                                             </Box>
//                                         </Grid>
//                                         <Grid item sm={12} xs={12} lg={6}>
//                                             <Box>
//                                                 <Button variant="contained" sx={{boxShadow:'0px 3px 6px #00000029',background:'white',width:'100%'}}><Typography className="price">12PM-6PM</Typography></Button>
//                                             </Box>
//                                         </Grid>
//                                         <Grid item sm={12} xs={12} lg={6}>
//                                             <Box>
//                                                 <Button variant="contained" sx={{boxShadow:'0px 3px 6px #00000029',background:'white',width:'100%'}}><Typography className="price">After 6PM</Typography></Button>
//                                             </Box>
//                                         </Grid>
//                                     </Grid>


//                                 </Box>
//                                 <Divider sx={{ backgroundColor: 'gray', marginY: '8px' }} />
//                                 <Box>
//                                     <Typography className="price">Drop Time</Typography>

//                                     <Grid container spacing={3} marginTop="1px">
//                                         <Grid item sm={12} xs={12} lg={6}>
//                                             <Box>
//                                                 <Button variant="contained" sx={{boxShadow:'0px 3px 6px #00000029',background:'white',width:'100%'}}><Typography className="price">Before 6AM</Typography></Button>
//                                             </Box>
//                                         </Grid>
//                                         <Grid item sm={12} xs={12} lg={6}>
//                                             <Box>
//                                                 <Button variant="contained" sx={{boxShadow:'0px 3px 6px #00000029',background:'white',width:'100%'}}><Typography className="price">6AM-12PM</Typography></Button>
//                                             </Box>
//                                         </Grid>
//                                         <Grid item sm={12} xs={12} lg={6}>
//                                             <Box>
//                                                 <Button variant="contained" sx={{boxShadow:'0px 3px 6px #00000029',background:'white',width:'100%'}}><Typography className="price">12PM-6PM</Typography></Button>
//                                             </Box>
//                                         </Grid>
//                                         <Grid item sm={12} xs={12} lg={6}>
//                                             <Box>
//                                                 <Button variant="contained" sx={{boxShadow:'0px 3px 6px #00000029',background:'white',width:'100%'}}><Typography className="price">After 6PM</Typography></Button>
//                                             </Box>
//                                         </Grid>
//                                     </Grid>


//                                 </Box>
//                                 <Divider sx={{ backgroundColor: 'gray', marginY: '8px' }} />
//                                 <Box>
//                                     <Typography className="price">Bus Type</Typography>

//                                     <Box style={{ display: "flex", alignItems: "center", marginTop: "8px" }}>
//                                         <Typography className="content">
//                                             <input className="radio" type="radio" value="option5"
//                                                 checked={selectedOption === "option5"}
//                                                 onClick={(e) => setSelectedOption("option5")} />
//                                         </Typography>
//                                         <Typography className="value">AC Seater</Typography>
//                                         <Typography style={{ flexGrow: 1 }} className="value">(12)</Typography>
//                                     </Box>

//                                     <Box style={{ display: "flex", alignItems: "center", marginTop: "8px" }}>
//                                         <Typography className="content">
//                                             <input className="radio" type="radio" value="option5"
//                                                 checked={selectedOption === "option5"}
//                                                 onClick={(e) => setSelectedOption("option5")} />
//                                         </Typography>
//                                         <Typography className="value">AC Sleeper</Typography>
//                                         <Typography style={{ flexGrow: 1 }} className="value">(12)</Typography>
//                                     </Box>

//                                     <Box style={{ display: "flex", alignItems: "center", marginTop: "8px" }}>
//                                         <Typography className="content">
//                                             <input className="radio" type="radio" value="option5"
//                                                 checked={selectedOption === "option5"}
//                                                 onClick={(e) => setSelectedOption("option5")} />
//                                         </Typography>
//                                         <Typography className="value">Non AC Seater</Typography>
//                                         <Typography style={{ flexGrow: 1 }} className="value">(12)</Typography>
//                                     </Box>

//                                     <Box style={{ display: "flex", alignItems: "center", marginTop: "8px" }}>
//                                         <Typography className="content">
//                                             <input className="radio" type="radio" value="option5"
//                                                 checked={selectedOption === "option5"}
//                                                 onClick={(e) => setSelectedOption("option5")} />
//                                         </Typography>
//                                         <Typography className="value">Non AC Sleeper</Typography>
//                                         <Typography style={{ flexGrow: 1 }} className="value">(12)</Typography>
//                                     </Box>
//                                 </Box>
//                             </Box>
//                         </Box>
//                     </Grid>
//                     <Grid item xs={12} sm={12} lg={9}>
//                         <Box my={2}>
//                            <BusServices />
//                         </Box>
                      
//                     </Grid>
//                 </Grid>
//             </Box>
//         </div>
//     )
// }

// export default BusSearchReasultDetail




import React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Grid, Paper, Radio, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";

import Checkbox from "@mui/material/Checkbox";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { styled } from "@mui/material/styles";

import { useNavigate } from "react-router-dom";
import SwipeToSlide from "../../flight/SwipeToSlide";
import "./seatlayout.css";
import BusSearchresult from "./BusSearchresult";
import PriceSlider from "../../Hotel/hoteldetails/PriceSlider";
function BusSearchresultDetail() {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const navigate=useNavigate("");
  function handleClick(){
    navigate("/BusReviewBooking")
  }

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
            <Typography pt={1} px={5} className="suggest">
              Suggested for you
            </Typography>
            <Box p={3} display="block">
              <form action="">
                <div>
                  <Checkbox
                    {...label}
                    icon={<RadioButtonUncheckedIcon />}
                    checkedIcon={<RadioButtonCheckedIcon />}
                  />
                 Dhaula Kuan
                </div>
                <div>
                  <Checkbox
                    {...label}
                    icon={<RadioButtonUncheckedIcon />}
                    checkedIcon={<RadioButtonCheckedIcon />}
                  />
                Morigate
                </div>

                <div>
                  <Checkbox
                    {...label}
                    icon={<RadioButtonUncheckedIcon />}
                    checkedIcon={<RadioButtonCheckedIcon />}
                  />
               Others
                </div>
               
              </form>
            </Box>

        
            <Typography pt={1} px={5}>
              Pick up point - Delhi
            </Typography>
            <Box p={3} display="block">
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
            <Typography pt={1} px={5}>
              Drop point - Mumbai
            </Typography>
            <Box p={3} display="block">
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
            <Typography pt={1} px={5}>
              Drop time - Mumbai
            </Typography>
            <Box p={3} display="block">
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

          <div className="swipetoslide"><SwipeToSlide /></div>

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
                style={{
                  color: "black",
                  fontSize: 12,
                  fontFamily: "Montserrat",
                  fontWeight: "700",
                  wordWrap: "break-word",
                }}
              >
                Select Seats
              </div>
              <div className="seatContainer">
                {/* Your component content goes here */}
              </div>
            </div>
            <div className="selectright">
              {/* <div style={{color: 'black', fontSize: 12, fontFamily: 'Montserrat', fontWeight: '700', wordWrap: 'break-word'}}>Select Pickup & Drop Points</div> */}
              <div className="selectrightdata">
                <div className="containerseats">
                  <div className="pickUpPoint">Pick Up Point</div>
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
                  <div className="pickUpPoint">Pick Up Point</div>
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
                  <div className="dropSection section">
                    <div className="timeLocation">
                      <div className="timeDetails">
                        <div className="timeInfo">11:00, 26 OCT</div>
                      </div>
                      <div className="locationName">Thane west</div>
                    </div>
                    <div className="locationDetails">
                      Thane, teen hath naka Chanakya Travels
                    </div>
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
                    <span>29 Oct</span>
                  </div>
                </div>
                <div className="info-item1">
                  <div className="duration">32hrs 50 mins</div>
                </div>
                <div className="info-item1">
                  <div className="timeseat">
                    <span className="time-bold">08:20</span>
                    <span>29 Oct</span>
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
                    <div className="link-text">Pickups & Drops</div>
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
                  <div className="button-label">SELECT SEATS</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BusSearchresultDetail;

