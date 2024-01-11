import React from "react";
import { Grid, Box, Typography, Button } from "@mui/material";
import Link from "@mui/material/Link";
import Rating from "./Rating";

const Hoteldetail = () => {

  return (
    <Box
      p={2}
      backgroundColor="#F5F5F5"
      boxShadow="1px 1px 8px gray"
      borderRadius="10px"
    >
      <Box display="flex">
        <Grid md={7} sm={6}>
          <Box display="flex">
            <Box sx={{ width: "20%", height: "30%" }}>
            </Box>
            <Box px={1}>
              <Typography className="hotel_name">
                WelcomHotel Dwarka - Member ITC Hotel Group
              </Typography>
              <Rating />
              <Typography p={0}>
                <Link sx={{ fontSize: "13px" }}>More Details</Link>
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid md={5} sm={6}>
          <Typography
            color="#006FFF"
            fontSize="12px"
            fontWeight="bold"
            display="flex"
            justifyContent="center"
          >
            Offer Price: ₹354654
          </Typography>
          <Typography
            color="#FF8900"
            fontSize="12px"
            fontWeight="bold"
            display="flex"
            justifyContent="center"
          >
            Publisher Price: ₹354654
          </Typography>
          <Box display="flex" justifyContent="center" mt={2}>
            <form action="./HotelBooknow">
              <Button
                variant="contained"
                type="submit"
              //  onClick={OpenNewpage}
              >
                <Typography
                  color="white"
                  fontSize="10px"
                  display="flex"
                  justifyContent="center"
                >
                  Book Now
                </Typography>
              </Button>
            </form>
          </Box>
        </Grid>
      </Box>
    </Box>
  );
};

export default Hoteldetail;
