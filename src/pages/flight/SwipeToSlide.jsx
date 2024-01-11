import React from "react";
import Slider from "react-slick";
import { Box } from "@mui/material";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Typography from "@mui/material/Typography";

const SwipeToSlide = () => {
  const settings = {
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section>
      <div className="container" style={{backgroundColor:"white"}}>
                <Box py={1}>
          <Slider {...settings}>
            {[...Array(15).keys()].map((index) => (
              <div key={index}>
                <div className="price_content">
                  <div>
                    <Typography style={{ textAlign: "center" }}>
                      Dec {22 + index}
                    </Typography>
                  </div>
                 
                  <div style={{ textAlign: "center" }}>Price:</div>
                </div>
              </div>
            ))}
          </Slider>
        </Box>
      </div>
    </section>
  );
};

export default SwipeToSlide;
