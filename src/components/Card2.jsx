import * as React from "react";
// import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
// import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

// import img1 from "../images/img1.png";


export default function RecipeReviewCard() {



  return (
    <Card
      sx={{
        maxWidth: 250,
        justifyContent: "center",
        borderRadius: "35px",
        marginLeft: "auto",
      }}
    >
      {/* <img src={img1} width="100%" /> */}
      <Typography
        variant="body2"
        fontSize="13px"
        fontWeight="bold"
        color="black"
        p={2}
        alignContent="center"
        justifyContent="center"
        display="flex"
      >
        Lap of Luxury in India Explore by Luxury brand, themes & top picks
      </Typography>

      <Typography
        variant="body2"
        fontSize="10px"
        color="text.secondary"
        px={2}
        pb={2}
        alignContent="center"
        justifyContent="center"
        display="flex"
      >
        Lap of Luxury in India Explore by Luxury brand, themes & top picks
      </Typography>
    </Card>
  );
}
