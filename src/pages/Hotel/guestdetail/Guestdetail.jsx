import React, { useEffect, useState } from "react";
import Sailsummary from "./Sailsummary";
import Hoteldescription from "./Hoteldescription";
import "./guestdetail.css";

const Guestdetail = () => {
  const [toggle, setToggle] = useState(false);
  const [CouponAmount, setCouponAmount] = useState(null);
  const setCouponAmountFun = (e) => {
    setCouponAmount(e);
  };

  const toggleState = (e) => {
    setToggle(e);
    // console.warn("toggling state", e);
  };
  useEffect(() => {
    // console.log(CouponAmount, "coupon amount////////");
  }, [CouponAmount]);

  useEffect(() => {
    sessionStorage.removeItem("couponCode")
  }, [])





  return (
    <>
      <div className="mainimgHotelSearch">
      </div>

      <div className="my-4">
        <div className="container">
          <div className="row gy-4">

            <div className="col-lg-9 order-lg-1 order-md-2 order-sm-2">
              <Hoteldescription
                toggleState={toggleState}
                setCouponAmountFun={setCouponAmountFun}
                couponAmount={CouponAmount}
              />
            </div>
            <div className="col-lg-3 order-lg-2 order-md-1 order-sm-1">
              <Sailsummary
                toggle={toggle}
                toggleState={toggleState}
                setCouponAmountFun={setCouponAmountFun}
              />

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
