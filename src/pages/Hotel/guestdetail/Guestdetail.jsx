import React from "react";
import Sailsummary from "./Sailsummary";
import Hoteldescription from "./Hoteldescription";
import "./guestdetail.css";
import InsideNavbar from "../../../UI/BigNavbar/InsideNavbar";


const Guestdetail = () => {


  return (

    <>
      <div className='mainimgHotelSearch'>
        <InsideNavbar />
      </div>

      <div className="my-4 margin-pecentage">
        <div className="container-fluid">
          <div className="row gy-4">
            <div className="col-lg-9 order-lg-1 order-md-2 order-sm-2">
              <Hoteldescription />
            </div>
            <div className="col-lg-3 order-lg-2 order-md-1 order-sm-1">
              <Sailsummary />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Guestdetail;

{
  /* <Modal
            open={bookingStatus == 1 ? true : false}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
          >
            <Box sx={{ ...style, width: 350 }}>
              <img
                src={successGif}
                alt="sucess gif"
                style={{ width: "100%" }}
              />
              <Typography
                textAlign="center"
                paddingLeft={3}
                paddingTop={2}
                fontWeight="bold"
              >
                Thanku!!Your booking is done..
              </Typography>
            </Box>
          </Modal> */
}
