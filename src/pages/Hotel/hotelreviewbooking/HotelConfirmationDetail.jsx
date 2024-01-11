import * as React from "react";
import { Grid, Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Rating from "../hotelresult/Rating";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import Input from "@mui/material/Input";
import Radio from "@mui/material/Radio";
import Link from "@mui/material/Link";
import "./review.css";
const HotelConfirmationDetail = () => {
  return (
    <Box p={3} backgroundColor="#F5F5F5" borderRadius="10px">
      <Box>
        <Box alignItems="center">
          <Typography className="main-txt">
            Red Fox Hotel Delhi Airport
          </Typography>
        </Box>
        <Box alignItems="center" display="flex" justifyContent="center">
          <Rating />
        </Box>
        <Box>
          <Typography className="check-txt">
            <Typography className="check-txt" color="#006FFF !important" pr={1}>
              {" "}
              Check In:{" "}
            </Typography>{" "}
            20 Feb, 2023
            <Typography className="check-txt" px={1} color="#006FFF !important">
              Check Out:
            </Typography>{" "}
            23 Feb, 2023
          </Typography>
        </Box>
        <Box>
          <Typography className="third-txt">
            Asset no. 6, Aerocity Hospitality District, Near T3, IGL Airport,
            New Delhi, India, Pincode: 110037
          </Typography>
        </Box>
        <Box>
          <Typography className="third-txt">
            Contact No.:
            <Typography
              className="third-txt"
              color="#006FFF !important"
              fontWeight="bold"
              px={1}
            >
              {" "}
              +91 9875 64213
            </Typography>
          </Typography>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" mt={3}>
        <Box display="flex">
          <Typography
            sx={{ fontSize: "16px", color: "#252525", fontWeight: "bold" }}
          >
            Rooms
          </Typography>
          <Typography
            ml={5}
            sx={{ fontSize: "16px", color: "#252525", fontWeight: "bold" }}
          >
            Rooms Type
          </Typography>
        </Box>
        <Box>
          <Typography
            sx={{ fontSize: "16px", color: "#252525", fontWeight: "bold" }}
          >
            No. of Guest
          </Typography>
        </Box>
      </Box>
      <Divider sx={{ backgroundColor: "gray", marginY: "5px" }} />

      <Box display="flex" justifyContent="space-between" mt={3}>
        <Box display="flex">
          <Typography
            sx={{ fontSize: "16px", color: "#666666", fontWeight: "bold" }}
          >
            Room 1
          </Typography>
          <Typography
            ml={5}
            sx={{ fontSize: "16px", color: "#666666", fontWeight: "bold" }}
          >
            Standard Room
          </Typography>
        </Box>
        <Box>
          <Typography
            sx={{ fontSize: "16px", color: "#666666", fontWeight: "bold" }}
          >
            1 Adult (s)
          </Typography>
        </Box>
      </Box>
      <Typography
        ml={12}
        sx={{
          fontSize: "16px",
          color: "#006FFF",
          fontWeight: "bold",
          textDecoration: "underline",
          cursor: "pointer",
        }}
      >
        Incl: Room with Breakfast
      </Typography>
      <Typography
        mt={2}
        sx={{ fontSize: "16px", color: "#FF8900", fontWeight: "bold" }}
      >
        Last Cancellation Date: 06 Jan, 2023
      </Typography>
      <Box display="flex" justifyContent="space-between" mt={5}>
        <Box display="flex">
          <Typography
            sx={{ fontSize: "16px", color: "#252525", fontWeight: "bold" }}
          >
            Enter Passenger Details
          </Typography>
        </Box>
        <Box>
          <Typography
            sx={{
              fontSize: "12px",
              color: "#006FFF",
              fontWeight: "bold",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            Modify Guest Detais
          </Typography>
        </Box>
      </Box>
      <Divider sx={{ backgroundColor: "gray", marginY: "5px" }} />

      <Box display="flex" justifyContent="space-between">
        <Box display="flex">
          <Typography
            sx={{ fontSize: "16px", color: "#006FFF", fontWeight: "bold" }}
          >
            Lead Passanger
          </Typography>
        </Box>
        <Box>
          <Typography
            sx={{
              fontSize: "12px",
              color: "#FF8900",
              fontWeight: "bold",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            Show PAX Details
          </Typography>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" mt={2}>
        <Box display="flex">
          <Typography
            sx={{ fontSize: "16px", color: "#252525", fontWeight: "bold" }}
          >
            Mr. Dollar Rai
          </Typography>
        </Box>
      </Box>
      <Divider sx={{ backgroundColor: "gray", marginY: "5px" }} />
      <Box
        sx={{
          padding: "15px",
          borderRadius: "10px",
          boxShadow: "2px 2px 8px gray",
          marginTop: "15px",
        }}
      >
        <Typography
          sx={{ fontSize: "16px", color: "#252525", fontWeight: "bold" }}
        >
          Cancellation & Charges:
        </Typography>
        <Typography
          sx={{ fontSize: "13px", color: "#252525", fontWeight: "bold" }}
        >
          Room 1: Standard Room
        </Typography>
        <Grid container spacing={3} p={1}>
          <Grid item xs={12} md={5}>
            <Typography
              sx={{ fontSize: "13px", color: "#252525", fontWeight: "bold" }}
            >
              Cancelled on or After
            </Typography>
            <Typography
              sx={{ fontSize: "13px", color: "#006FFF", fontWeight: "bold" }}
            >
              07 Jan, 2023
            </Typography>
            <Typography
              sx={{ fontSize: "13px", color: "#006FFF", fontWeight: "bold" }}
            >
              19 Jan, 2023
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography
              sx={{ fontSize: "13px", color: "#252525", fontWeight: "bold" }}
            >
              Cancelled on or After
            </Typography>
            <Typography
              sx={{ fontSize: "13px", color: "#006FFF", fontWeight: "bold" }}
            >
              09 Jan, 2023
            </Typography>
            <Typography
              sx={{ fontSize: "13px", color: "#006FFF", fontWeight: "bold" }}
            >
              23 Jan, 2023
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography
              sx={{
                fontSize: "13px",
                color: "#252525",
                fontWeight: "bold",
                textAlign: "right",
              }}
            >
              Cancellation Charges
            </Typography>
            <Typography
              sx={{
                fontSize: "13px",
                color: "#FF8900",
                fontWeight: "bold",
                textAlign: "right",
              }}
            >
              100%
            </Typography>
            <Typography
              sx={{
                fontSize: "13px",
                color: "#FF8900",
                fontWeight: "bold",
                textAlign: "right",
              }}
            >
              100%
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          padding: "15px",
          borderRadius: "10px",
          boxShadow: "2px 2px 8px gray",
          marginTop: "15px",
        }}
      >
        <Typography
          sx={{ fontSize: "16px", color: "#252525", fontWeight: "bold" }}
        >
          Hotel Norms
        </Typography>
        <ol>
          <li sx={{ fontSize: "14px", color: "#252525", fontWeight: "bold" }}>
            When people think of Goa, they're probably thinking about long,
            sandy beaches, but much of the state is also covered by forest.
          </li>
          <li sx={{ fontSize: "14px", color: "#252525", fontWeight: "bold" }}>
            Around 20% of the land in Goa falls into the beautiful Western Ghats
            of India, a vast mountain range and treasure house of biodiversity.
          </li>
          <li sx={{ fontSize: "14px", color: "#252525", fontWeight: "bold" }}>
            The forests here are teeming with exotic wildlife, including Indian
            giant squirrels, mongoose, Slender Loris, Indian macaques and sloth
            bears.
          </li>
          <li sx={{ fontSize: "14px", color: "#252525", fontWeight: "bold" }}>
            Goa is widely known as India's party district, and is visited by
            thousands of sun-seeking tourists each year.
          </li>
          <li sx={{ fontSize: "14px", color: "#252525", fontWeight: "bold" }}>
            The state has fulfilled popular demand, with close to 7,000 bars
            across the state to choose from – and plenty of cheap alcohol. North
            Goa is generally more lively, although South Goa has its fair share
            of beach parties too.
          </li>
        </ol>
      </Box>
      <Box
        sx={{
          padding: "15px",
          borderRadius: "10px",
          boxShadow: "2px 2px 8px gray",
          marginTop: "15px",
        }}
      >
        <Typography
          sx={{ fontSize: "16px", color: "#252525", fontWeight: "bold" }}
        >
          Term & Conditions:
        </Typography>
        <ul>
          <li sx={{ fontSize: "14px", color: "#252525", fontWeight: "bold" }}>
            I have reviewed and agreed on the Hotel Norms, Cancellation Charges,
            Rates, Commission offered and term & conditions
          </li>
          <li sx={{ fontSize: "14px", color: "#252525", fontWeight: "bold" }}>
            The booking is under cancellation and any cacellation made on this
            booking will attract the charges as mentuioned
          </li>
        </ul>
        <Typography
          sx={{ fontSize: "12px", color: "#FF8900", fontWeight: "bold" }}
        >
          Note: For any additional services, Applicable charges will be paid
          directly at hotel.
        </Typography>
      </Box>
      <Box
        sx={{
          padding: "15px",
          borderRadius: "10px",
          boxShadow: "2px 2px 8px gray",
          marginTop: "15px",
        }}
      >
        <Typography
          sx={{ fontSize: "16px", color: "#252525", fontWeight: "bold" }}
        >
          Payment Option(s)
        </Typography>
        <Typography
          sx={{ fontSize: "14px", color: "#FF8900", fontWeight: "bold" }}
        >
          Important Note: For Online payment, It is advised to use Mozilla
          Firefox or Internet Explorer browsers for making bookings on portal
          and avoid Chrome browser. We are working on Chrome Browser issue with
          our payment gateway merchants.
        </Typography>
        <ul>
          <li sx={{ fontSize: "14px", color: "#252525", fontWeight: "bold" }}>
            Online Payment
          </li>
        </ul>
      </Box>
      <form action="/Reviewbooling">
        <Box textAlign="center" mt={2}>
          <Button className="continue_btn" type="submit" variant="contained">
            Print
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default HotelConfirmationDetail;
